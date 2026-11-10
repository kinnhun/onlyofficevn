import * as fs from "fs/promises";
import * as fsSync from "fs";
import * as path from "path";
import { randomBytes } from "crypto";
import {
  resolveSupportDataDir,
  getBotSettings,
  createTicket as createAdminTicket,
} from "@/features/ai-assistant-admin/services/ai-admin-storage.service";
import { inspectAndNormalizeImageBuffer } from "./image-inspector.service";
import {
  canAccessResource,
  redactSensitiveContent,
} from "./security-guard.service";
import type {
  AttachmentRoleTag,
  HandoffState,
  InternalAnalysisSchema,
  IssueFact,
  ProcessingStage,
  SupportAnalysisRecord,
  SupportAttachment,
  SupportConversation,
  SupportEdition,
  SupportFeedbackRecord,
  SupportIssue,
  SupportJobRecord,
  SupportLocale,
  SupportMessage,
  SupportOS,
  SupportOwnerContext,
  SupportProduct,
  SupportTicketRecord,
  SupportUsageAuditLog,
} from "../types/support.types";

function getDataDir(): string {
  return resolveSupportDataDir();
}

function getDbFile(): string {
  return path.join(getDataDir(), "support-chatbot-db.json");
}

function getPrivateUploadDir(): string {
  return path.join(getDataDir(), "support-private-uploads");
}

const DATA_DIR = getDataDir();
const DB_FILE = getDbFile();
const PRIVATE_UPLOAD_DIR = getPrivateUploadDir();

type SupportDatabaseSchema = {
  conversations: SupportConversation[];
  issues: SupportIssue[];
  messages: SupportMessage[];
  attachments: SupportAttachment[];
  analyses: SupportAnalysisRecord[];
  tickets: SupportTicketRecord[];
  feedback: SupportFeedbackRecord[];
  jobs: SupportJobRecord[];
  auditLogs: SupportUsageAuditLog[];
};

const EMPTY_DB: SupportDatabaseSchema = {
  conversations: [],
  issues: [],
  messages: [],
  attachments: [],
  analyses: [],
  tickets: [],
  feedback: [],
  jobs: [],
  auditLogs: [],
};

let storageMutex: Promise<void> = Promise.resolve();

async function withStorageLock<T>(fn: () => Promise<T>): Promise<T> {
  let release!: () => void;
  const next = new Promise<void>((res) => {
    release = res;
  });
  const prev = storageMutex;
  storageMutex = next;
  await prev;
  try {
    return await fn();
  } finally {
    release();
  }
}

let inMemoryDb: SupportDatabaseSchema | null = null;
const inMemoryAttachmentBuffers = new Map<string, Buffer>();
let lastSweepAt = 0;

async function ensureDirs(): Promise<void> {
  try {
    const dataDir = getDataDir();
    const uploadDir = getPrivateUploadDir();
    if (!fsSync.existsSync(dataDir)) {
      await fs.mkdir(dataDir, { recursive: true });
    }
    if (!fsSync.existsSync(uploadDir)) {
      await fs.mkdir(uploadDir, { recursive: true });
    }
  } catch (err) {
    console.warn("[support-storage] ensureDirs non-fatal error:", err);
  }
}

async function readSupportDbUnsafe(): Promise<SupportDatabaseSchema> {
  if (inMemoryDb) {
    return inMemoryDb;
  }
  await ensureDirs();
  try {
    const raw = await fs.readFile(getDbFile(), "utf-8");
    const parsed = JSON.parse(raw) as Partial<SupportDatabaseSchema>;
    inMemoryDb = {
      conversations: parsed.conversations || [],
      issues: parsed.issues || [],
      messages: parsed.messages || [],
      attachments: parsed.attachments || [],
      analyses: parsed.analyses || [],
      tickets: parsed.tickets || [],
      feedback: parsed.feedback || [],
      jobs: parsed.jobs || [],
      auditLogs: parsed.auditLogs || [],
    };
  } catch {
    inMemoryDb = {
      conversations: [],
      issues: [],
      messages: [],
      attachments: [],
      analyses: [],
      tickets: [],
      feedback: [],
      jobs: [],
      auditLogs: [],
    };
  }
  return inMemoryDb;
}

async function writeSupportDbUnsafe(db: SupportDatabaseSchema): Promise<void> {
  inMemoryDb = db;
  try {
    await ensureDirs();
    await fs.writeFile(getDbFile(), JSON.stringify(db, null, 2), "utf-8");
  } catch (err) {
    console.warn("[support-storage] writeSupportDbUnsafe non-fatal write error:", err);
  }
}

function makeId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${randomBytes(4).toString("hex")}`;
}

function recoverServerlessConversationIfMissingUnsafe(
  db: SupportDatabaseSchema,
  conversationId: string,
  owner: SupportOwnerContext,
  retentionDays: number
): SupportConversation | null {
  const existing = db.conversations.find((c) => c.id === conversationId);
  if (existing) {
    return existing;
  }
  if (!/^conv_[a-z0-9]{7,12}_[a-f0-9]{8}$/.test(conversationId)) {
    return null;
  }
  const now = Date.now();
  const issueId = makeId("iss");
  const activeIssue: SupportIssue = {
    id: issueId,
    conversationId,
    revision: 1,
    title: "Hỗ trợ kỹ thuật ONLYOFFICE",
    status: "needs_info",
    product: "unknown",
    productConfirmed: false,
    edition: "unknown",
    os: "unknown",
    observedErrors: [],
    facts: [],
    attemptedRounds: [],
    failedDiagnosticRounds: 0,
    attachmentIds: [],
    sourcesUsed: [],
    dataLossRisk: false,
    createdAt: now,
    updatedAt: now,
  };
  const conversation: SupportConversation = {
    id: conversationId,
    ownerType: owner.ownerType,
    ownerId: owner.ownerId,
    ownerKey: owner.ownerKey,
    dealerId: owner.dealerId,
    customerName: owner.customerName,
    customerPhone: owner.customerPhone,
    customerEmail: owner.customerEmail,
    locale: "vi",
    handoffState: "bot_active",
    activeIssueId: issueId,
    turnCount: 0,
    imageCount: 0,
    estimatedCostUsd: 0,
    createdAt: now,
    updatedAt: now,
    expiresAt: now + (retentionDays || 90) * 86_400_000,
  };
  db.issues.push(activeIssue);
  db.conversations.push(conversation);
  return conversation;
}

async function sweepExpiredRecordsUnsafe(db: SupportDatabaseSchema): Promise<boolean> {
  const now = Date.now();
  if (now - lastSweepAt < 60_000) return false;
  lastSweepAt = now;
  let dirty = false;

  for (const att of db.attachments) {
    if (att.status === "ready" && now > att.expiresAt) {
      att.status = "expired";
      dirty = true;
      if (att.storageFileName) {
        const fullPath = path.join(PRIVATE_UPLOAD_DIR, att.storageFileName);
        await fs.unlink(fullPath).catch(() => {});
      }
    }
  }

  const expiredConvIds = new Set(
    db.conversations
      .filter((c) => !c.deletedAt && now > c.expiresAt)
      .map((c) => c.id)
  );
  if (expiredConvIds.size > 0) {
    for (const att of db.attachments) {
      if (expiredConvIds.has(att.conversationId) && att.storageFileName) {
        await fs
          .unlink(path.join(PRIVATE_UPLOAD_DIR, att.storageFileName))
          .catch(() => {});
      }
    }
    db.conversations = db.conversations.filter((c) => !expiredConvIds.has(c.id));
    db.issues = db.issues.filter((i) => !expiredConvIds.has(i.conversationId));
    db.messages = db.messages.filter((m) => !expiredConvIds.has(m.conversationId));
    db.analyses = db.analyses.filter((a) => !expiredConvIds.has(a.conversationId));
    dirty = true;
  }

  return dirty;
}

export function inferHintProductFromPageContext(pageContext?: string): SupportProduct {
  if (!pageContext) return "unknown";
  const p = pageContext.toLowerCase();
  if (p.includes("/dealers/stickers") || p.includes("/portal") || p.includes("keys")) {
    return "mercy_keys";
  }
  if (p.includes("/check") || p.includes("verify")) {
    return "mercy_check";
  }
  if (p.includes("/download") || p.includes("cai-dat")) {
    return "mercy_installer";
  }
  return "unknown";
}

export async function createSupportConversation(
  owner: SupportOwnerContext,
  params?: {
    locale?: SupportLocale;
    pageContext?: string;
    consentVersion?: string;
  }
): Promise<{ conversation: SupportConversation; activeIssue: SupportIssue }> {
  return withStorageLock(async () => {
    const db = await readSupportDbUnsafe();
    await sweepExpiredRecordsUnsafe(db);
    const settings = await getBotSettings();
    const now = Date.now();
    const retentionDays = settings.conversationRetentionDays || 90;

    const conversationId = makeId("conv");
    const issueId = makeId("iss");

    const activeIssue: SupportIssue = {
      id: issueId,
      conversationId,
      revision: 1,
      title: "Hỗ trợ kỹ thuật ONLYOFFICE",
      status: "needs_info",
      product: inferHintProductFromPageContext(params?.pageContext),
      productConfirmed: false,
      edition: "unknown",
      os: "unknown",
      observedErrors: [],
      facts: [],
      attemptedRounds: [],
      failedDiagnosticRounds: 0,
      attachmentIds: [],
      sourcesUsed: [],
      dataLossRisk: false,
      createdAt: now,
      updatedAt: now,
    };

    const conversation: SupportConversation = {
      id: conversationId,
      ownerType: owner.ownerType,
      ownerId: owner.ownerId,
      ownerKey: owner.ownerKey,
      dealerId: owner.dealerId,
      customerName: owner.customerName,
      customerPhone: owner.customerPhone,
      customerEmail: owner.customerEmail,
      locale: params?.locale || "vi",
      handoffState: "bot_active",
      activeIssueId: issueId,
      consentVersion: params?.consentVersion,
      consentAcceptedAt: params?.consentVersion ? now : undefined,
      pageContext: params?.pageContext,
      turnCount: 0,
      imageCount: 0,
      estimatedCostUsd: 0,
      createdAt: now,
      updatedAt: now,
      expiresAt: now + retentionDays * 86_400_000,
    };

    db.issues.push(activeIssue);
    db.conversations.push(conversation);
    await writeSupportDbUnsafe(db);

    return { conversation, activeIssue };
  });
}

export async function listConversationsForOwner(
  owner: SupportOwnerContext
): Promise<SupportConversation[]> {
  return withStorageLock(async () => {
    const db = await readSupportDbUnsafe();
    if (await sweepExpiredRecordsUnsafe(db)) {
      await writeSupportDbUnsafe(db);
    }
    if (owner.ownerType === "guest") {
      // Guests only inspect active conversations tied to their signed guest cookie
      return db.conversations
        .filter((c) => !c.deletedAt && c.ownerKey === owner.ownerKey)
        .sort((a, b) => b.updatedAt - a.updatedAt)
        .slice(0, 10);
    }
    return db.conversations
      .filter((c) => !c.deletedAt && canAccessResource(owner, c.ownerKey, c.dealerId))
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, 30);
  });
}

export async function getConversationBundleForOwner(
  conversationId: string,
  owner: SupportOwnerContext
): Promise<{
  conversation: SupportConversation;
  issues: SupportIssue[];
  activeIssue: SupportIssue;
  messages: SupportMessage[];
  attachments: SupportAttachment[];
} | null> {
  return withStorageLock(async () => {
    const db = await readSupportDbUnsafe();
    if (await sweepExpiredRecordsUnsafe(db)) {
      await writeSupportDbUnsafe(db);
    }
    const conv = db.conversations.find((c) => c.id === conversationId);
    if (!conv || conv.deletedAt) return null;
    if (!canAccessResource(owner, conv.ownerKey, conv.dealerId)) {
      return null;
    }

    const issues = db.issues.filter((i) => i.conversationId === conversationId);
    let activeIssue = issues.find((i) => i.id === conv.activeIssueId) || issues[0];
    if (!activeIssue) {
      const now = Date.now();
      activeIssue = {
        id: makeId("iss"),
        conversationId,
        revision: 1,
        title: "Hỗ trợ kỹ thuật ONLYOFFICE",
        status: "needs_info",
        product: "unknown",
        productConfirmed: false,
        edition: "unknown",
        os: "unknown",
        observedErrors: [],
        facts: [],
        attemptedRounds: [],
        failedDiagnosticRounds: 0,
        attachmentIds: [],
        sourcesUsed: [],
        dataLossRisk: false,
        createdAt: now,
        updatedAt: now,
      };
      conv.activeIssueId = activeIssue.id;
      db.issues.push(activeIssue);
      issues.push(activeIssue);
      await writeSupportDbUnsafe(db);
    }

    const attachments = db.attachments.filter(
      (a) => a.conversationId === conversationId && a.status !== "deleted"
    );
    const attMap = new Map(attachments.map((a) => [a.id, a]));

    const messages = db.messages
      .filter((m) => m.conversationId === conversationId)
      .sort((a, b) => a.createdAt - b.createdAt)
      .map((m) => ({
        ...m,
        attachmentsMeta: m.attachmentIds.map((aid) => {
          const att = attMap.get(aid);
          const isExpired =
            !att || att.status === "expired" || Date.now() > att.expiresAt;
          return {
            id: aid,
            fileName: att?.fileName || "screenshot.png",
            roleTag: att?.roleTag || "default",
            orderIndex: att?.orderIndex ?? 0,
            status: isExpired ? "expired" : att?.status || "deleted",
            width: att?.width,
            height: att?.height,
            expired: isExpired,
          };
        }),
      }));

    return {
      conversation: conv,
      issues,
      activeIssue,
      messages,
      attachments,
    };
  });
}

export async function ensureOrRecoverConversationForOwner(
  conversationId: string,
  owner: SupportOwnerContext
): Promise<{
  conversation: SupportConversation;
  issues: SupportIssue[];
  activeIssue: SupportIssue;
  messages: SupportMessage[];
  attachments: SupportAttachment[];
} | null> {
  await withStorageLock(async () => {
    const db = await readSupportDbUnsafe();
    if (!db.conversations.some((c) => c.id === conversationId)) {
      const settings = await getBotSettings();
      const recovered = recoverServerlessConversationIfMissingUnsafe(
        db,
        conversationId,
        owner,
        settings.conversationRetentionDays || 90
      );
      if (recovered) {
        await writeSupportDbUnsafe(db);
      }
    }
  });
  return getConversationBundleForOwner(conversationId, owner);
}

export async function switchOrCreateSupportIssue(
  conversationId: string,
  owner: SupportOwnerContext,
  options: { targetIssueId?: string; newIssueTitle?: string }
): Promise<SupportIssue | null> {
  return withStorageLock(async () => {
    const db = await readSupportDbUnsafe();
    const settings = await getBotSettings();
    if (!db.conversations.some((c) => c.id === conversationId)) {
      recoverServerlessConversationIfMissingUnsafe(db, conversationId, owner, settings.conversationRetentionDays || 90);
    }
    const conv = db.conversations.find((c) => c.id === conversationId && !c.deletedAt);
    if (!conv || !canAccessResource(owner, conv.ownerKey, conv.dealerId)) {
      return null;
    }

    const now = Date.now();
    const currentActive = db.issues.find((i) => i.id === conv.activeIssueId);
    if (
      currentActive &&
      currentActive.status !== "resolved" &&
      currentActive.status !== "escalated"
    ) {
      currentActive.status = "paused";
      currentActive.revision += 1;
      currentActive.updatedAt = now;
    }

    if (options.targetIssueId) {
      const target = db.issues.find(
        (i) => i.id === options.targetIssueId && i.conversationId === conversationId
      );
      if (target) {
        if (target.status === "paused") {
          target.status = "diagnosing";
        }
        target.revision += 1;
        target.updatedAt = now;
        conv.activeIssueId = target.id;
        conv.updatedAt = now;
        await writeSupportDbUnsafe(db);
        return target;
      }
    }

    const created: SupportIssue = {
      id: makeId("iss"),
      conversationId,
      revision: 1,
      title: (options.newIssueTitle || "Vấn đề kỹ thuật mới").slice(0, 120),
      status: "needs_info",
      product: "unknown",
      productConfirmed: false,
      edition: "unknown",
      os: "unknown",
      observedErrors: [],
      facts: [],
      attemptedRounds: [],
      failedDiagnosticRounds: 0,
      attachmentIds: [],
      sourcesUsed: [],
      dataLossRisk: false,
      createdAt: now,
      updatedAt: now,
    };
    db.issues.push(created);
    conv.activeIssueId = created.id;
    conv.updatedAt = now;
    await writeSupportDbUnsafe(db);
    return created;
  });
}

export async function acceptImageConsentForConversation(
  conversationId: string,
  owner: SupportOwnerContext,
  consentVersion: string
): Promise<boolean> {
  return withStorageLock(async () => {
    const db = await readSupportDbUnsafe();
    const conv = db.conversations.find((c) => c.id === conversationId && !c.deletedAt);
    if (!conv || !canAccessResource(owner, conv.ownerKey, conv.dealerId)) {
      return false;
    }
    conv.consentVersion = consentVersion;
    conv.consentAcceptedAt = Date.now();
    conv.updatedAt = Date.now();
    await writeSupportDbUnsafe(db);
    return true;
  });
}

export async function initiateAttachmentUpload(
  owner: SupportOwnerContext,
  params: {
    conversationId: string;
    fileName: string;
    declaredMime: string;
    sizeBytes: number;
    roleTag?: AttachmentRoleTag;
    orderIndex?: number;
    consentAccepted?: boolean;
    consentVersion?: string;
  }
): Promise<
  | { ok: true; attachment: SupportAttachment }
  | { ok: false; status: number; code: string; message: string }
> {
  return withStorageLock(async () => {
    const db = await readSupportDbUnsafe();
    const settings = await getBotSettings();
    if (!db.conversations.some((c) => c.id === params.conversationId)) {
      recoverServerlessConversationIfMissingUnsafe(db, params.conversationId, owner, settings.conversationRetentionDays || 90);
    }
    const conv = db.conversations.find(
      (c) => c.id === params.conversationId && !c.deletedAt
    );
    if (!conv || !canAccessResource(owner, conv.ownerKey, conv.dealerId)) {
      return {
        ok: false,
        status: 404,
        code: "CONVERSATION_NOT_FOUND",
        message: "Không tìm thấy phiên hội thoại hoặc bạn không có quyền truy cập.",
      };
    }

    const activePolicyVersion =
      settings.consentPolicyVersion || "v1.0-2026-10-29";
    if (params.consentAccepted) {
      conv.consentVersion = params.consentVersion || activePolicyVersion;
      conv.consentAcceptedAt = Date.now();
    }
    if (conv.consentVersion !== activePolicyVersion) {
      return {
        ok: false,
        status: 400,
        code: "CONSENT_REQUIRED",
        message:
          "Vui lòng xác nhận thông báo xử lý ảnh chụp màn hình trước khi tải ảnh lên.",
      };
    }

    if (params.sizeBytes <= 0 || params.sizeBytes > 8 * 1024 * 1024) {
      return {
        ok: false,
        status: 413,
        code: "FILE_TOO_LARGE",
        message: "Mỗi ảnh chỉ được tối đa 8 MB. Vui lòng chọn hoặc cắt gọn vùng ảnh cần kiểm tra.",
      };
    }

    const allowedDeclared = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedDeclared.includes((params.declaredMime || "").toLowerCase())) {
      return {
        ok: false,
        status: 415,
        code: "UNSUPPORTED_MEDIA_TYPE",
        message:
          "Chỉ hỗ trợ ảnh tĩnh định dạng PNG, JPG/JPEG hoặc WebP tĩnh. Không nhận PDF, video, GIF động hay tệp thực thi.",
      };
    }

    const now = Date.now();
    const retentionDays = settings.imageRetentionDays || 7;
    const attachment: SupportAttachment = {
      id: makeId("att"),
      conversationId: conv.id,
      issueId: conv.activeIssueId,
      ownerKey: conv.ownerKey,
      dealerId: conv.dealerId,
      fileName: (params.fileName || "screenshot.png").slice(0, 180),
      declaredMime: params.declaredMime.toLowerCase(),
      sizeBytes: params.sizeBytes,
      exifStripped: false,
      roleTag: params.roleTag || "default",
      orderIndex: params.orderIndex ?? 0,
      status: "initiated",
      consentVersion: conv.consentVersion,
      consentAt: conv.consentAcceptedAt || now,
      createdAt: now,
      expiresAt: now + retentionDays * 86_400_000,
    };

    db.attachments.push(attachment);
    await writeSupportDbUnsafe(db);
    return { ok: true, attachment };
  });
}

export async function completeAttachmentUpload(
  owner: SupportOwnerContext,
  attachmentId: string,
  rawBuffer: Buffer,
  correlationId: string
): Promise<
  | { ok: true; attachment: SupportAttachment }
  | { ok: false; status: number; code: string; message: string }
> {
  return withStorageLock(async () => {
    const db = await readSupportDbUnsafe();
    const att = db.attachments.find((a) => a.id === attachmentId);
    if (!att || att.status === "deleted") {
      return {
        ok: false,
        status: 404,
        code: "ATTACHMENT_NOT_FOUND",
        message: "Không tìm thấy phiên tải ảnh hoặc bạn không có quyền truy cập.",
      };
    }
    if (!canAccessResource(owner, att.ownerKey, att.dealerId)) {
      db.auditLogs.push({
        id: makeId("aud"),
        correlationId,
        conversationId: att.conversationId,
        ownerKey: owner.ownerKey,
        action: "unauthorized_access_blocked",
        detail: `Blocked upload completion on ${attachmentId}`,
        createdAt: Date.now(),
      });
      await writeSupportDbUnsafe(db);
      return {
        ok: false,
        status: 404,
        code: "ATTACHMENT_NOT_FOUND",
        message: "Không tìm thấy phiên tải ảnh.",
      };
    }

    if (att.status === "ready") {
      return { ok: true, attachment: att };
    }

    const inspection = inspectAndNormalizeImageBuffer(rawBuffer);
    if (!inspection.valid) {
      att.status = "rejected";
      att.rejectionReason = `${inspection.errorCode}: ${inspection.userMessageVi}`;
      db.auditLogs.push({
        id: makeId("aud"),
        correlationId,
        conversationId: att.conversationId,
        ownerKey: owner.ownerKey,
        action: "image_rejected",
        errorCode: inspection.errorCode,
        detail: inspection.userMessageVi,
        createdAt: Date.now(),
      });
      await writeSupportDbUnsafe(db);
      const status =
        inspection.errorCode === "FILE_TOO_LARGE" ||
        inspection.errorCode === "PIXEL_LIMIT_EXCEEDED"
          ? 413
          : 415;
      return {
        ok: false,
        status,
        code: inspection.errorCode,
        message: inspection.userMessageVi,
      };
    }

    const ext =
      inspection.detectedMime === "image/png"
        ? "png"
        : inspection.detectedMime === "image/webp"
        ? "webp"
        : "jpg";
    const storageFileName = `${att.id}.${ext}`;
    inMemoryAttachmentBuffers.set(att.id, inspection.normalizedBuffer);
    try {
      await ensureDirs();
      const fullFilePath = path.join(getPrivateUploadDir(), storageFileName);
      await fs.writeFile(fullFilePath, inspection.normalizedBuffer);
    } catch (err) {
      console.warn("[support-storage] Non-fatal image write error, buffer preserved in memory:", err);
    }

    att.detectedMime = inspection.detectedMime;
    att.sizeBytes = inspection.normalizedBuffer.length;
    att.width = inspection.width;
    att.height = inspection.height;
    att.pixelCount = inspection.pixelCount;
    att.sha256 = inspection.sha256;
    att.storageFileName = storageFileName;
    att.exifStripped = inspection.exifStripped;
    att.qualityHint = inspection.qualityHint;
    att.status = "ready";

    const conv = db.conversations.find((c) => c.id === att.conversationId);
    if (conv) {
      conv.imageCount += 1;
      conv.updatedAt = Date.now();
    }

    db.auditLogs.push({
      id: makeId("aud"),
      correlationId,
      conversationId: att.conversationId,
      ownerKey: owner.ownerKey,
      action: "image_upload",
      detail: `${att.detectedMime} ${att.width}x${att.height} (${att.sizeBytes} bytes, exifStripped=${att.exifStripped})`,
      createdAt: Date.now(),
    });

    await writeSupportDbUnsafe(db);
    return { ok: true, attachment: att };
  });
}

export async function readAuthorizedAttachmentBytes(
  attachmentId: string,
  owner: SupportOwnerContext
): Promise<
  | { ok: true; attachment: SupportAttachment; buffer: Buffer }
  | { ok: false; status: 404 | 410; message: string }
> {
  return withStorageLock(async () => {
    const db = await readSupportDbUnsafe();
    const att = db.attachments.find((a) => a.id === attachmentId);
    if (!att || att.status === "deleted") {
      return { ok: false, status: 404, message: "Tệp ảnh không tồn tại hoặc đã bị xóa." };
    }
    if (!canAccessResource(owner, att.ownerKey, att.dealerId)) {
      return { ok: false, status: 404, message: "Tệp ảnh không tồn tại." };
    }
    if (att.status === "expired" || Date.now() > att.expiresAt) {
      if (att.status !== "expired") {
        att.status = "expired";
        if (att.storageFileName) {
          await fs
            .unlink(path.join(PRIVATE_UPLOAD_DIR, att.storageFileName))
            .catch(() => {});
        }
        await writeSupportDbUnsafe(db);
      }
      return {
        ok: false,
        status: 410,
        message: "Ảnh chụp màn hình đã hết hạn lưu trữ (sau 7 ngày).",
      };
    }
    if (att.status !== "ready" || !att.storageFileName) {
      return { ok: false, status: 404, message: "Tệp ảnh chưa sẵn sàng." };
    }

    const memBuf = inMemoryAttachmentBuffers.get(attachmentId);
    if (memBuf) {
      return { ok: true, attachment: att, buffer: memBuf };
    }
    try {
      const buf = await fs.readFile(
        path.join(getPrivateUploadDir(), att.storageFileName)
      );
      inMemoryAttachmentBuffers.set(attachmentId, buf);
      return { ok: true, attachment: att, buffer: buf };
    } catch {
      return { ok: false, status: 404, message: "Không tìm thấy tệp lưu trữ." };
    }
  });
}

export async function registerInlineTurnAttachments(
  owner: SupportOwnerContext,
  conversationId: string,
  attachments: Array<{
    id: string;
    fileName: string;
    mime: string;
    base64: string;
    roleTag?: AttachmentRoleTag;
  }>
): Promise<void> {
  if (!attachments || attachments.length === 0) return;
  await withStorageLock(async () => {
    const db = await readSupportDbUnsafe();
    const settings = await getBotSettings();
    const now = Date.now();
    const retentionDays = settings.imageRetentionDays || 7;
    for (const item of attachments) {
      if (!item.base64) continue;
      const cleanB64 = item.base64.replace(/^data:[^;]+;base64,/, "");
      const buf = Buffer.from(cleanB64, "base64");
      const inspection = inspectAndNormalizeImageBuffer(buf);
      const readyBuffer = inspection.valid ? inspection.normalizedBuffer : buf;
      inMemoryAttachmentBuffers.set(item.id, readyBuffer);

      let att = db.attachments.find((a) => a.id === item.id);
      if (!att) {
        att = {
          id: item.id,
          conversationId,
          issueId: "iss_turn",
          ownerKey: owner.ownerKey,
          dealerId: owner.dealerId,
          fileName: item.fileName || "screenshot.png",
          declaredMime: item.mime || "image/jpeg",
          detectedMime: inspection.valid ? inspection.detectedMime : "image/jpeg",
          sizeBytes: readyBuffer.length,
          width: inspection.valid ? inspection.width : 1200,
          height: inspection.valid ? inspection.height : 800,
          pixelCount: inspection.valid ? inspection.pixelCount : 960000,
          sha256: inspection.valid ? inspection.sha256 : "",
          storageFileName: `${item.id}.jpg`,
          exifStripped: true,
          roleTag: item.roleTag || "default",
          orderIndex: 0,
          status: "ready",
          consentVersion: "v1.0-2026-10-29",
          consentAt: now,
          createdAt: now,
          expiresAt: now + retentionDays * 86_400_000,
        };
        db.attachments.push(att);
      } else {
        att.status = "ready";
        att.sizeBytes = readyBuffer.length;
      }
    }
    await writeSupportDbUnsafe(db);
  });
}

export async function validateTurnAttachments(
  owner: SupportOwnerContext,
  conversationId: string,
  attachmentIds: string[]
): Promise<
  | { ok: true; attachments: Array<{ meta: SupportAttachment; buffer: Buffer }> }
  | { ok: false; status: number; code: string; message: string }
> {
  if (!attachmentIds || attachmentIds.length === 0) {
    return { ok: true, attachments: [] };
  }
  const settings = await getBotSettings();
  const maxPerTurn = settings.maxImagesPerTurn || 3;
  if (attachmentIds.length > maxPerTurn) {
    return {
      ok: false,
      status: 400,
      code: "TOO_MANY_IMAGES",
      message: `Mỗi lượt gửi hỗ trợ tối đa ${maxPerTurn} ảnh chụp màn hình.`,
    };
  }

  const loaded: Array<{ meta: SupportAttachment; buffer: Buffer }> = [];
  let totalBytes = 0;

  for (const id of attachmentIds) {
    const res = await readAuthorizedAttachmentBytes(id, owner);
    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        code: res.status === 410 ? "ATTACHMENT_EXPIRED" : "ATTACHMENT_NOT_FOUND",
        message: res.message,
      };
    }
    if (res.attachment.conversationId !== conversationId) {
      return {
        ok: false,
        status: 400,
        code: "ATTACHMENT_CONVERSATION_MISMATCH",
        message: "Ảnh đính kèm không thuộc cuộc hội thoại hiện tại.",
      };
    }
    totalBytes += res.buffer.length;
    loaded.push({ meta: res.attachment, buffer: res.buffer });
  }

  if (totalBytes > 20 * 1024 * 1024) {
    return {
      ok: false,
      status: 413,
      code: "TURN_PAYLOAD_TOO_LARGE",
      message: "Tổng dung lượng ảnh trong một lượt vượt quá 20 MB.",
    };
  }

  loaded.sort((a, b) => a.meta.orderIndex - b.meta.orderIndex);
  return { ok: true, attachments: loaded };
}

export async function checkConversationQuota(
  owner: SupportOwnerContext,
  conversationId: string
): Promise<{
  allowed: boolean;
  reason?: string;
}> {
  if (owner.isAdmin || owner.isTechnician) return { allowed: true };

  return withStorageLock(async () => {
    const db = await readSupportDbUnsafe();
    const settings = await getBotSettings();
    const maxTurnsPerHour = settings.maxTurnsPerHour || 15;
    const maxBudgetUsd = settings.maxSessionBudgetUsd || 0.2;

    const conv = db.conversations.find((c) => c.id === conversationId);
    if (conv && conv.estimatedCostUsd >= maxBudgetUsd) {
      return {
        allowed: false,
        reason:
          "Phiên hỗ trợ tự động đã chạm ngưỡng chi phí xử lý an toàn. Anh/chị vẫn có thể bấm 'Gặp kỹ thuật viên' để chuyển phiếu miễn phí sang đội ngũ Mercy Tech.",
      };
    }

    const oneHourAgo = Date.now() - 3600_000;
    const recentUserTurns = db.messages.filter(
      (m) =>
        m.conversationId === conversationId &&
        m.role === "user" &&
        m.createdAt >= oneHourAgo
    ).length;

    if (recentUserTurns >= maxTurnsPerHour) {
      return {
        allowed: false,
        reason:
          "Anh/chị đã gửi vượt giới hạn lượt hỏi tự động trong giờ qua. Vui lòng thử lại sau ít phút hoặc bấm 'Gặp kỹ thuật viên' để được tiếp nhận trực tiếp.",
      };
    }

    return { allowed: true };
  });
}

export async function findIdempotentTurnResult(
  conversationId: string,
  clientMessageId: string
): Promise<{
  userMessage: SupportMessage;
  assistantMessage?: SupportMessage;
  job?: SupportJobRecord;
} | null> {
  return withStorageLock(async () => {
    const db = await readSupportDbUnsafe();
    const userMsg = db.messages.find(
      (m) =>
        m.conversationId === conversationId &&
        m.role === "user" &&
        m.clientMessageId === clientMessageId
    );
    if (!userMsg) return null;

    const assistantMsg = db.messages.find(
      (m) =>
        m.conversationId === conversationId &&
        (m.role === "assistant" || m.role === "system") &&
        m.clientMessageId === `${clientMessageId}:reply`
    );
    const job = db.jobs.find(
      (j) =>
        j.conversationId === conversationId &&
        j.clientMessageId === clientMessageId
    );

    // Ensure attachmentsMeta is hydrated on idempotent replay
    const userWithMeta: SupportMessage = {
      ...userMsg,
      attachmentsMeta:
        userMsg.attachmentsMeta && userMsg.attachmentsMeta.length > 0
          ? userMsg.attachmentsMeta
          : (userMsg.attachmentIds || []).map((aid) => {
              const att = db.attachments.find((a) => a.id === aid);
              const isExpired =
                !att || att.status === "expired" || Date.now() > (att?.expiresAt || 0);
              return {
                id: aid,
                fileName: att?.fileName || "screenshot.png",
                roleTag: att?.roleTag || "default",
                orderIndex: att?.orderIndex ?? 0,
                status: isExpired ? ("expired" as const) : att?.status || ("ready" as const),
                width: att?.width,
                height: att?.height,
                expired: isExpired,
                previewUrl: `/api/support/attachments/${aid}/access`,
              };
            }),
    };

    return { userMessage: userWithMeta, assistantMessage: assistantMsg, job };
  });
}

export async function createOrUpdateSupportJob(
  params: {
    jobId?: string;
    conversationId: string;
    issueId: string;
    clientMessageId: string;
    ownerKey: string;
    stage: ProcessingStage;
    resultMessageId?: string;
    error?: string;
  }
): Promise<SupportJobRecord> {
  return withStorageLock(async () => {
    const db = await readSupportDbUnsafe();
    const now = Date.now();
    let job = params.jobId
      ? db.jobs.find((j) => j.id === params.jobId)
      : db.jobs.find(
          (j) =>
            j.conversationId === params.conversationId &&
            j.clientMessageId === params.clientMessageId
        );

    if (job) {
      if (!job.cancelled) {
        job.stage = params.stage;
      }
      if (params.resultMessageId) job.resultMessageId = params.resultMessageId;
      if (params.error) job.error = params.error;
      job.updatedAt = now;
    } else {
      job = {
        id: params.jobId || makeId("job"),
        conversationId: params.conversationId,
        issueId: params.issueId,
        clientMessageId: params.clientMessageId,
        ownerKey: params.ownerKey,
        stage: params.stage,
        cancelled: false,
        resultMessageId: params.resultMessageId,
        error: params.error,
        createdAt: now,
        updatedAt: now,
      };
      db.jobs.push(job);
    }

    await writeSupportDbUnsafe(db);
    return job;
  });
}

export async function getSupportJobForOwner(
  jobId: string,
  owner: SupportOwnerContext
): Promise<SupportJobRecord | null> {
  return withStorageLock(async () => {
    const db = await readSupportDbUnsafe();
    const job = db.jobs.find((j) => j.id === jobId);
    if (!job) return null;
    if (!canAccessResource(owner, job.ownerKey)) return null;
    return job;
  });
}

export async function persistTurnOutcome(params: {
  conversationId: string;
  issueId: string;
  expectedIssueRevision: number;
  locale: SupportLocale;
  userMessage: Omit<SupportMessage, "id" | "createdAt">;
  assistantMessage?: Omit<SupportMessage, "id" | "createdAt">;
  analysisRecord?: Omit<SupportAnalysisRecord, "id" | "createdAt" | "messageId">;
  issuePatch?: {
    title?: string;
    status?: SupportIssue["status"];
    product?: SupportProduct;
    productConfirmed?: boolean;
    edition?: SupportEdition;
    os?: SupportOS;
    version?: string;
    goal?: string;
    errorCode?: string;
    newObservedErrors?: string[];
    newFacts?: IssueFact[];
    newDiagnosticSteps?: string[];
    markPreviousPendingRoundFailed?: boolean;
    newSourcesUsed?: string[];
    dataLossRisk?: boolean;
  };
  estimatedCostDeltaUsd?: number;
  auditEntry?: Omit<SupportUsageAuditLog, "id" | "createdAt">;
}): Promise<{
  savedUserMessage: SupportMessage;
  savedAssistantMessage?: SupportMessage;
  updatedIssue: SupportIssue;
  updatedConversation: SupportConversation;
  staleRevisionSkipped: boolean;
}> {
  return withStorageLock(async () => {
    const db = await readSupportDbUnsafe();
    const now = Date.now();
    const conv = db.conversations.find((c) => c.id === params.conversationId);
    if (!conv || conv.deletedAt) {
      throw new Error("CONVERSATION_DELETED_OR_MISSING");
    }

    const issue = db.issues.find((i) => i.id === params.issueId);
    if (!issue) {
      throw new Error("ISSUE_MISSING");
    }

    // Check idempotency again inside mutex
    const existingUser = db.messages.find(
      (m) =>
        m.conversationId === params.conversationId &&
        m.role === "user" &&
        m.clientMessageId === params.userMessage.clientMessageId
    );
    if (existingUser) {
      const existingAssistant = db.messages.find(
        (m) =>
          m.conversationId === params.conversationId &&
          m.clientMessageId === `${params.userMessage.clientMessageId}:reply`
      );
      if (!existingUser.attachmentsMeta && existingUser.attachmentIds?.length) {
        existingUser.attachmentsMeta = existingUser.attachmentIds.map((aid) => {
          const att = db.attachments.find((a) => a.id === aid);
          const isExpired =
            !att || att.status === "expired" || Date.now() > (att?.expiresAt || 0);
          return {
            id: aid,
            fileName: att?.fileName || "screenshot.png",
            roleTag: att?.roleTag || "default",
            orderIndex: att?.orderIndex ?? 0,
            status: isExpired ? ("expired" as const) : att?.status || ("ready" as const),
            width: att?.width,
            height: att?.height,
            expired: isExpired,
            previewUrl: `/api/support/attachments/${aid}/access`,
          };
        });
      }
      return {
        savedUserMessage: existingUser,
        savedAssistantMessage: existingAssistant,
        updatedIssue: issue,
        updatedConversation: conv,
        staleRevisionSkipped: false,
      };
    }

    const userAttachmentsMeta =
      params.userMessage.attachmentsMeta && params.userMessage.attachmentsMeta.length > 0
        ? params.userMessage.attachmentsMeta.map((m) => ({
            ...m,
            previewUrl: m.previewUrl || `/api/support/attachments/${m.id}/access`,
          }))
        : (params.userMessage.attachmentIds || []).map((aid) => {
            const att = db.attachments.find((a) => a.id === aid);
            const isExpired =
              !att || att.status === "expired" || Date.now() > (att?.expiresAt || 0);
            return {
              id: aid,
              fileName: att?.fileName || "screenshot.png",
              roleTag: att?.roleTag || "default",
              orderIndex: att?.orderIndex ?? 0,
              status: isExpired ? ("expired" as const) : att?.status || ("ready" as const),
              width: att?.width,
              height: att?.height,
              expired: isExpired,
              previewUrl: `/api/support/attachments/${aid}/access`,
            };
          });

    const savedUserMessage: SupportMessage = {
      ...params.userMessage,
      id: makeId("msg"),
      text: redactSensitiveContent(params.userMessage.text).sanitizedText,
      attachmentsMeta: userAttachmentsMeta,
      createdAt: now,
    };
    db.messages.push(savedUserMessage);

    for (const aid of savedUserMessage.attachmentIds) {
      const att = db.attachments.find((a) => a.id === aid);
      if (att) {
        att.messageId = savedUserMessage.id;
        att.issueId = issue.id;
      }
      if (!issue.attachmentIds.includes(aid)) {
        issue.attachmentIds.push(aid);
      }
    }

    // Revision snapshot guard: do NOT overwrite issue state if user switched/modified issue mid-flight
    const staleRevisionSkipped = issue.revision !== params.expectedIssueRevision;

    if (!staleRevisionSkipped && params.issuePatch) {
      const p = params.issuePatch;
      if (p.title && issue.title === "Hỗ trợ kỹ thuật ONLYOFFICE") {
        issue.title = p.title.slice(0, 120);
      }
      if (p.product && p.product !== "unknown") {
        issue.product = p.product;
      }
      if (p.productConfirmed !== undefined) {
        issue.productConfirmed = p.productConfirmed;
      }
      if (p.edition && p.edition !== "unknown") {
        issue.edition = p.edition;
      }
      if (p.os && p.os !== "unknown") {
        issue.os = p.os;
      }
      if (p.version) issue.version = p.version;
      if (p.goal) issue.goal = p.goal;
      if (p.errorCode) issue.errorCode = p.errorCode;
      if (p.dataLossRisk) issue.dataLossRisk = true;

      if (p.newObservedErrors) {
        for (const err of p.newObservedErrors) {
          if (err && !issue.observedErrors.includes(err)) {
            issue.observedErrors.push(err);
          }
        }
      }

      if (p.newFacts) {
        for (const f of p.newFacts) {
          const existingIdx = issue.facts.findIndex((x) => x.key === f.key);
          if (existingIdx >= 0) {
            issue.facts[existingIdx] = f;
          } else {
            issue.facts.push(f);
          }
        }
      }

      if (p.newSourcesUsed) {
        for (const s of p.newSourcesUsed) {
          if (s && !issue.sourcesUsed.includes(s)) {
            issue.sourcesUsed.push(s);
          }
        }
      }

      // If previous round was awaiting_result and user reports it still failed, increment failedDiagnosticRounds!
      if (p.markPreviousPendingRoundFailed) {
        const lastPending = [...issue.attemptedRounds]
          .reverse()
          .find((r) => r.outcome === "pending");
        if (lastPending) {
          lastPending.outcome = "failed";
          lastPending.userNote = savedUserMessage.text.slice(0, 200);
          issue.failedDiagnosticRounds += 1;
        }
      }

      if (p.status && issue.status !== "resolved") {
        // Never auto-mark "resolved" here — only customer confirmation via feedback can mark "resolved"!
        issue.status = p.status === "resolved" ? "awaiting_result" : p.status;
      }

      issue.revision += 1;
      issue.updatedAt = now;
    }

    let savedAssistantMessage: SupportMessage | undefined;
    if (params.assistantMessage) {
      savedAssistantMessage = {
        ...params.assistantMessage,
        id: makeId("msg"),
        issueRevision: issue.revision,
        createdAt: now + 20,
      };
      db.messages.push(savedAssistantMessage);

      // Record meaningful diagnostic steps round if guided
      if (
        !staleRevisionSkipped &&
        params.issuePatch?.newDiagnosticSteps &&
        params.issuePatch.newDiagnosticSteps.length > 0
      ) {
        issue.attemptedRounds.push({
          round: issue.attemptedRounds.length + 1,
          messageId: savedAssistantMessage.id,
          steps: params.issuePatch.newDiagnosticSteps,
          outcome: "pending",
          timestamp: now + 20,
        });
      }
    }

    if (params.analysisRecord) {
      db.analyses.push({
        ...params.analysisRecord,
        id: makeId("ana"),
        messageId: savedUserMessage.id,
        createdAt: now + 10,
      });
    }

    conv.locale = params.locale;
    conv.turnCount += 1;
    conv.estimatedCostUsd = Number(
      (conv.estimatedCostUsd + (params.estimatedCostDeltaUsd || 0)).toFixed(6)
    );
    conv.updatedAt = now + 20;

    if (params.auditEntry) {
      db.auditLogs.push({
        ...params.auditEntry,
        id: makeId("aud"),
        createdAt: now + 25,
      });
    }

    await writeSupportDbUnsafe(db);
    return {
      savedUserMessage,
      savedAssistantMessage,
      updatedIssue: issue,
      updatedConversation: conv,
      staleRevisionSkipped,
    };
  });
}

export async function recordSupportFeedback(
  owner: SupportOwnerContext,
  params: {
    conversationId: string;
    messageId: string;
    outcome: "resolved" | "still_failing" | "helpful" | "unhelpful";
    note?: string;
  }
): Promise<{
  feedback: SupportFeedbackRecord;
  issue: SupportIssue;
  shouldSuggestHandoff: boolean;
} | null> {
  return withStorageLock(async () => {
    const db = await readSupportDbUnsafe();
    const conv = db.conversations.find(
      (c) => c.id === params.conversationId && !c.deletedAt
    );
    if (!conv || !canAccessResource(owner, conv.ownerKey, conv.dealerId)) {
      return null;
    }

    const msg = db.messages.find(
      (m) => m.id === params.messageId && m.conversationId === conv.id
    );
    const issue =
      db.issues.find((i) => i.id === (msg?.issueId || conv.activeIssueId)) ||
      db.issues.find((i) => i.conversationId === conv.id);
    if (!issue) return null;

    const now = Date.now();
    if (msg) {
      msg.feedback = params.outcome;
      if (params.note) msg.feedbackNote = params.note.slice(0, 300);
    }

    if (params.outcome === "resolved") {
      // Explicit customer confirmation -> ONLY place allowed to set status = "resolved"
      issue.status = "resolved";
      const pendingRound = [...issue.attemptedRounds]
        .reverse()
        .find((r) => r.outcome === "pending");
      if (pendingRound) pendingRound.outcome = "succeeded";
      issue.revision += 1;
      issue.updatedAt = now;
    } else if (params.outcome === "still_failing") {
      const pendingRound = [...issue.attemptedRounds]
        .reverse()
        .find((r) => r.outcome === "pending");
      if (pendingRound) {
        pendingRound.outcome = "failed";
        pendingRound.userNote = params.note;
        issue.failedDiagnosticRounds += 1;
      } else {
        issue.failedDiagnosticRounds += 1;
      }
      issue.status = "diagnosing";
      issue.revision += 1;
      issue.updatedAt = now;
    }

    const record: SupportFeedbackRecord = {
      id: makeId("fbk"),
      conversationId: conv.id,
      issueId: issue.id,
      messageId: params.messageId,
      outcome: params.outcome,
      note: params.note?.slice(0, 300),
      createdAt: now,
    };
    db.feedback.push(record);
    conv.updatedAt = now;

    await writeSupportDbUnsafe(db);
    return {
      feedback: record,
      issue,
      shouldSuggestHandoff: issue.failedDiagnosticRounds >= 2,
    };
  });
}

export async function createSupportTicketIdempotent(
  owner: SupportOwnerContext,
  params: {
    idempotencyKey: string;
    conversationId?: string;
    customerName?: string;
    contactChannel: "phone_zalo" | "email";
    contactValue: string;
    issueDescription: string;
    product?: SupportProduct;
    edition?: SupportEdition;
    os?: SupportOS;
    version?: string;
    ultraViewerId?: string;
    ultraViewerPass?: string;
    externalNotifyConsent?: boolean;
    correlationId: string;
  }
): Promise<{
  ticket: SupportTicketRecord;
  createdNew: boolean;
}> {
  return withStorageLock(async () => {
    const db = await readSupportDbUnsafe();
    const cleanKey = (params.idempotencyKey || "").trim();

    if (cleanKey) {
      const existing = db.tickets.find(
        (t) => t.idempotencyKey === cleanKey && t.ownerKey === owner.ownerKey
      );
      if (existing) {
        return { ticket: existing, createdNew: false };
      }
    }

    let conv = params.conversationId
      ? db.conversations.find(
          (c) => c.id === params.conversationId && !c.deletedAt
        )
      : undefined;
    if (conv && !canAccessResource(owner, conv.ownerKey, conv.dealerId)) {
      conv = undefined;
    }

    const issue = conv
      ? db.issues.find((i) => i.id === conv!.activeIssueId)
      : undefined;

    const now = Date.now();
    const ticketId = `TK-${now.toString().slice(-6)}${Math.floor(Math.random() * 90 + 10)}`;
    const priority: SupportTicketRecord["priority"] = issue?.dataLossRisk
      ? "urgent_data_risk"
      : "normal";

    const ticket: SupportTicketRecord = {
      id: ticketId,
      idempotencyKey: cleanKey || makeId("idem"),
      conversationId: conv?.id || "standalone",
      issueId: issue?.id || "standalone",
      ownerKey: owner.ownerKey,
      dealerId: owner.dealerId,
      language: conv?.locale || "vi",
      product: params.product || issue?.product || "unknown",
      edition: params.edition || issue?.edition || "unknown",
      os: params.os || issue?.os || "unknown",
      version: params.version || issue?.version,
      goal: issue?.goal,
      customerName:
        (params.customerName || owner.customerName || "Khách hàng Website").trim(),
      contactChannel: params.contactChannel,
      contactValue: params.contactValue.trim(),
      issueDescription: redactSensitiveContent(params.issueDescription.trim())
        .sanitizedText,
      errorCode: issue?.errorCode,
      attachmentIds: issue?.attachmentIds || [],
      attemptedSteps: (issue?.attemptedRounds || []).map((r) => ({
        round: r.round,
        steps: r.steps,
        outcome: r.outcome,
      })),
      sourcesUsed: issue?.sourcesUsed || [],
      missingInformation: [],
      priority,
      ultraViewerId: params.ultraViewerId?.trim(),
      ultraViewerPass: params.ultraViewerPass?.trim(),
      externalNotifyConsent: Boolean(params.externalNotifyConsent),
      status: "pending",
      assignedTech: "chua_nhan",
      createdAt: now,
      updatedAt: now,
    };

    db.tickets.unshift(ticket);

    if (conv) {
      conv.handoffState = "handoff_requested";
      conv.assignedTicketId = ticket.id;
      conv.updatedAt = now;
    }
    if (issue) {
      issue.status = "escalated";
      issue.revision += 1;
      issue.updatedAt = now;
    }

    db.auditLogs.push({
      id: makeId("aud"),
      correlationId: params.correlationId,
      conversationId: conv?.id,
      ownerKey: owner.ownerKey,
      action: "ticket_created",
      detail: `Created ticket ${ticket.id} (priority=${priority})`,
      createdAt: now,
    });

    await writeSupportDbUnsafe(db);

    // Sync into Admin Ticket Queue seamlessly
    const recentMsgs = conv
      ? db.messages
          .filter((m) => m.conversationId === conv!.id)
          .slice(-6)
          .map(
            (m) =>
              `${m.role === "user" ? "Khách" : "Bot"}: ${m.text.slice(0, 180)}`
          )
          .join("\n")
      : undefined;

    await createAdminTicket({
      id: ticket.id,
      conversationId: conv?.id,
      issueId: issue?.id,
      customerName: ticket.customerName,
      phoneOrZalo: ticket.contactValue,
      softwareEdition: `${ticket.product} (${ticket.os})`,
      product: ticket.product,
      os: ticket.os,
      issueDescription: ticket.issueDescription,
      issueCategory:
        ticket.product === "mercy_keys"
          ? "ban_quyen"
          : ticket.issueDescription.toLowerCase().includes("font")
          ? "font_chu"
          : ticket.issueDescription.toLowerCase().includes("unikey")
          ? "unikey"
          : ticket.issueDescription.toLowerCase().includes("dll")
          ? "dll"
          : "cai_dat",
      ultraViewerId: ticket.ultraViewerId,
      ultraViewerPass: ticket.ultraViewerPass,
      attachmentIds: ticket.attachmentIds,
      attemptedStepsSummary: ticket.attemptedSteps.flatMap((s) => s.steps),
      diagnosticSummary: [
        `Sản phẩm: ${ticket.product} | Hệ điều hành: ${ticket.os} | Gói: ${ticket.edition}`,
        issue?.observedErrors.length
          ? `Lỗi ghi nhận: ${issue.observedErrors.join("; ")}`
          : null,
        issue?.dataLossRisk ? "CẢNH BÁO: Có nguy cơ ảnh hưởng tệp tài liệu gốc" : null,
      ]
        .filter(Boolean)
        .join("\n"),
      priority,
      conversationSnippet: recentMsgs,
    }).catch(() => {});

    return { ticket, createdNew: true };
  });
}

export async function syncConversationHandoffFromTicket(params: {
  ticketId: string;
  status: "pending" | "in_progress" | "resolved";
  assignedTech?: "kien_it" | "cskh_mercy" | "chua_nhan";
  technicianReply?: string;
}): Promise<void> {
  await withStorageLock(async () => {
    const db = await readSupportDbUnsafe();
    const ticket = db.tickets.find((t) => t.id === params.ticketId);
    const now = Date.now();
    if (ticket) {
      ticket.status = params.status;
      if (params.assignedTech) ticket.assignedTech = params.assignedTech;
      ticket.updatedAt = now;
      if (params.status === "resolved") ticket.resolvedAt = now;
    }

    const conv = db.conversations.find(
      (c) =>
        c.assignedTicketId === params.ticketId ||
        (ticket && c.id === ticket.conversationId)
    );
    if (!conv || conv.deletedAt) {
      if (ticket) await writeSupportDbUnsafe(db);
      return;
    }

    let nextState: HandoffState = conv.handoffState;
    if (
      params.status === "in_progress" ||
      (params.assignedTech && params.assignedTech !== "chua_nhan")
    ) {
      nextState = "human_active";
    } else if (params.status === "resolved") {
      nextState = "closed";
    } else if (params.status === "pending") {
      nextState = "handoff_requested";
    }

    const stateChanged = conv.handoffState !== nextState;
    conv.handoffState = nextState;
    conv.updatedAt = now;

    if (params.technicianReply && params.technicianReply.trim()) {
      db.messages.push({
        id: makeId("msg"),
        conversationId: conv.id,
        issueId: conv.activeIssueId,
        issueRevision: 1,
        clientMessageId: `tech_${now}`,
        role: "technician",
        text: params.technicianReply.trim(),
        attachmentIds: [],
        createdAt: now,
      });
    } else if (stateChanged && nextState === "human_active") {
      const techLabel =
        params.assignedTech === "kien_it"
          ? "Kỹ thuật viên Kiên IT"
          : "Chuyên viên hỗ trợ Mercy Tech";
      db.messages.push({
        id: makeId("msg"),
        conversationId: conv.id,
        issueId: conv.activeIssueId,
        issueRevision: 1,
        clientMessageId: `sys_takeover_${now}`,
        role: "system",
        text: `${techLabel} đã tiếp nhận phiếu hỗ trợ #${params.ticketId}. Trợ lý AI tạm dừng phản hồi tự động để kỹ thuật viên trao đổi trực tiếp cùng anh/chị.`,
        attachmentIds: [],
        createdAt: now,
      });
    }

    await writeSupportDbUnsafe(db);
  });
}

export async function deleteConversationAndRevokeAll(
  conversationId: string,
  owner: SupportOwnerContext,
  correlationId: string
): Promise<boolean> {
  return withStorageLock(async () => {
    const db = await readSupportDbUnsafe();
    const conv = db.conversations.find((c) => c.id === conversationId && !c.deletedAt);
    if (!conv || !canAccessResource(owner, conv.ownerKey, conv.dealerId)) {
      return false;
    }

    const now = Date.now();
    conv.deletedAt = now;
    conv.updatedAt = now;

    // Cancel any running jobs for this conversation
    for (const job of db.jobs) {
      if (job.conversationId === conversationId && job.stage !== "completed") {
        job.cancelled = true;
        job.stage = "cancelled";
        job.updatedAt = now;
      }
    }

    // Revoke and physically delete all private image files
    for (const att of db.attachments) {
      if (att.conversationId === conversationId && att.status !== "deleted") {
        att.status = "deleted";
        att.deletedAt = now;
        if (att.storageFileName) {
          await fs
            .unlink(path.join(PRIVATE_UPLOAD_DIR, att.storageFileName))
            .catch(() => {});
        }
      }
    }

    // Purge derived messages, issues, and image analyses for this conversation
    db.messages = db.messages.filter((m) => m.conversationId !== conversationId);
    db.issues = db.issues.filter((i) => i.conversationId !== conversationId);
    db.analyses = db.analyses.filter((a) => a.conversationId !== conversationId);
    db.feedback = db.feedback.filter((f) => f.conversationId !== conversationId);

    db.auditLogs.push({
      id: makeId("aud"),
      correlationId,
      conversationId,
      ownerKey: owner.ownerKey,
      action: "conversation_deleted",
      detail: "Conversation, private attachments, and derived analyses deleted by owner",
      createdAt: now,
    });

    await writeSupportDbUnsafe(db);
    return true;
  });
}

export async function recordSupportAuditLog(
  entry: Omit<SupportUsageAuditLog, "id" | "createdAt">
): Promise<void> {
  await withStorageLock(async () => {
    const db = await readSupportDbUnsafe();
    db.auditLogs.push({
      ...entry,
      id: makeId("aud"),
      createdAt: Date.now(),
    });
    if (db.auditLogs.length > 1000) {
      db.auditLogs = db.auditLogs.slice(-1000);
    }
    await writeSupportDbUnsafe(db);
  });
}

export async function getOperationalAuditStats(): Promise<{
  visionUploadsCount: number;
  visionRejectedCount: number;
  schemaBlockedCount: number;
  providerFallbackCount: number;
  satisfactionRateOverride?: number;
}> {
  return withStorageLock(async () => {
    const db = await readSupportDbUnsafe();
    const visionUploadsCount = db.auditLogs.filter(
      (l) => l.action === "image_upload"
    ).length;
    const visionRejectedCount = db.auditLogs.filter(
      (l) => l.action === "image_rejected"
    ).length;
    const schemaBlockedCount = db.auditLogs.filter(
      (l) =>
        l.action === "schema_blocked" || l.action === "prompt_injection_blocked"
    ).length;
    const providerFallbackCount = db.auditLogs.filter(
      (l) => l.action === "vision_fallback"
    ).length;

    const rated = db.feedback.filter(
      (f) => f.outcome === "resolved" || f.outcome === "still_failing"
    );
    const resolved = rated.filter((f) => f.outcome === "resolved").length;
    const satisfactionRateOverride =
      rated.length > 0 ? Math.round((resolved / rated.length) * 100) : undefined;

    return {
      visionUploadsCount,
      visionRejectedCount,
      schemaBlockedCount,
      providerFallbackCount,
      satisfactionRateOverride,
    };
  });
}
