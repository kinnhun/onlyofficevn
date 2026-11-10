import fs from "fs/promises";
import path from "path";
import os from "os";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";
import { isLocalMode, getGithubToken, getGithubOwner, getGithubRepo } from "@/lib/github-db";
import type {
  AiTicket,
  AiFaq,
  AiBotSettings,
  TicketStatus,
  ChatLogItem,
  AnalyticsSummary,
  AssignedTech,
} from "../types";
import * as fsSync from "fs";

export function resolveSupportDataDir(): string {
  if (isLocalMode()) {
    const localDir = process.env.LOCAL_DB_DIR || "d:\\mercy\\database local";
    try {
      if (fsSync.existsSync(localDir)) {
        return localDir;
      }
    } catch {
      // Ignore invalid path format on non-Windows OS
    }
  }

  const isServerless =
    Boolean(process.env.VERCEL) ||
    Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME) ||
    process.env.NODE_ENV === "production";

  if (isServerless) {
    const tmpDir = path.join(os.tmpdir(), "onlyoffice-support-data");
    try {
      if (!fsSync.existsSync(tmpDir)) {
        fsSync.mkdirSync(tmpDir, { recursive: true });
      }
      return tmpDir;
    } catch {
      return os.tmpdir();
    }
  }

  const projectDataDir = path.join(process.cwd(), "data");
  try {
    if (!fsSync.existsSync(projectDataDir)) {
      fsSync.mkdirSync(projectDataDir, { recursive: true });
    }
    return projectDataDir;
  } catch {
    return path.join(os.tmpdir(), "onlyoffice-support-data");
  }
}

const DATA_DIR = resolveSupportDataDir();
const DATA_FILE = path.join(DATA_DIR, "ai-assistant-data.json");

type StoragePayload = {
  tickets: AiTicket[];
  faqs: AiFaq[];
  settings: AiBotSettings;
  chatLogs: ChatLogItem[];
};

let knowledgeCacheRevision = 1;
export function getKnowledgeCacheRevision(): number {
  return knowledgeCacheRevision;
}
export function bumpKnowledgeCacheRevision(): void {
  knowledgeCacheRevision += 1;
}

export const DEFAULT_BOT_SETTINGS: AiBotSettings = {
  isOnline: true,
  operatingMode: "ai_full",
  visionEnabled: true,
  commercialPolicyApproved: false,
  offlineNotice:
    "Trợ lý kỹ thuật ONLYOFFICE đang tạm bảo trì hệ thống trong ít phút. Anh/chị vui lòng để lại yêu cầu hỗ trợ hoặc liên hệ Zalo CSKH 0763 068 614 (Mercy Tech Global) để được hỗ trợ.",
  hotlineZalo: "0763 068 614",
  hotlineTech: "0862 497 002",
  supportHours: "08:00 – 17:30 (Thứ 2 – Thứ 7)",
  consentPolicyVersion: "v1.0-2026-10-29",
  imageRetentionDays: 7,
  conversationRetentionDays: 90,
  maxImagesPerTurn: 3,
  maxTurnsPerHour: 40,
  maxSessionBudgetUsd: 0.5,
  modelTextRoute: process.env.AI_ROUTER_MODEL || "test",
  modelVisionRoute:
    process.env.AI_ROUTER_VISION_MODEL || process.env.AI_ROUTER_MODEL || "test",
  routerTimeoutMs: Number(process.env.AI_ROUTER_TIMEOUT_MS) || 25000,
  telegramAlertsEnabled: true,
  telegramChatId: process.env.TELEGRAM_CHAT_ID || "-5113305581",
};

const INITIAL_FAQS: AiFaq[] = [
  {
    id: "faq_1",
    category: "cai_dat",
    question: "Tải và cài đặt bộ cài All-in-One Mercy trên Windows như thế nào?",
    answer:
      "Trên Windows 10/11 (64-bit), anh/chị tải bộ cài chính thức từ trang Tài khoản Mercy, chạy trình cài đặt để hệ thống tự cấu hình ONLYOFFICE Desktop Editors kèm bộ 3 tiện ích tiếng Việt. Nếu dùng macOS hoặc Linux, vui lòng chọn đúng gói .dmg hoặc .deb/.AppImage tương ứng.",
    status: "published",
    version: "1.0",
    product: "mercy_installer",
    os: "windows",
    audience: "public",
    approvedBy: "Mercy Tech Technical Lead",
    isPinned: true,
    hitCount: 142,
    updatedAt: Date.now() - 86400000 * 2,
  },
  {
    id: "faq_2",
    category: "ban_quyen",
    question: "Kích hoạt bản dùng thử 7 ngày miễn phí ra sao?",
    answer:
      "Trong cửa sổ kích hoạt của bộ cài Mercy trên Windows, anh/chị chọn mục Dùng thử 7 ngày (hoặc để trống ô Mã kích hoạt và bấm Dùng thử 7 ngày). Hệ thống sẽ kích hoạt chế độ trải nghiệm 7 ngày để kiểm tra khả năng tương thích tài liệu thực tế.",
    status: "published",
    version: "1.0",
    product: "mercy_keys",
    os: "windows",
    audience: "public",
    approvedBy: "Mercy Tech Technical Lead",
    isPinned: true,
    hitCount: 98,
    updatedAt: Date.now() - 86400000 * 3,
  },
  {
    id: "faq_3",
    category: "tien_ich",
    question: "Xử lý văn bản cũ bị lỗi font chữ .VnTime hoặc VNI ô vuông như thế nào?",
    answer:
      "Trước hết anh/chị nên tạo bản sao lưu file gốc. Sau đó mở bản sao trong ONLYOFFICE Desktop, bôi đen vùng văn bản bị lỗi mã TCVN3/VNI -> mở tab Plugins (Tiện ích) -> chọn Chuẩn Hóa Font Tiếng Việt để chuyển mã sang Unicode chuẩn.",
    status: "published",
    version: "1.0",
    product: "desktop_editors",
    os: "windows",
    audience: "public",
    approvedBy: "Mercy Tech Technical Lead",
    isPinned: true,
    hitCount: 215,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: "faq_4",
    category: "sua_loi",
    question: "Khắc phục lỗi Unikey nhảy chữ hoặc mất dấu tiếng Việt trong ONLYOFFICE?",
    answer:
      "Anh/chị kiểm tra bảng mã Unikey đang để Unicode dựng sẵn và kiểu gõ Telex/VNI đúng thói quen. Nếu ONLYOFFICE đang chạy quyền cao hơn bộ gõ trên Windows, hãy thoát hẳn Unikey ở khay hệ thống rồi mở lại với cùng quyền người dùng hoặc Run as administrator.",
    status: "published",
    version: "1.0",
    product: "desktop_editors",
    os: "windows",
    audience: "public",
    approvedBy: "Mercy Tech Technical Lead",
    isPinned: false,
    hitCount: 76,
    updatedAt: Date.now() - 86400000 * 4,
  },
  {
    id: "faq_5",
    category: "tien_ich",
    question: "Cách sử dụng tiện ích Đọc Số Thành Chữ trong bảng tính và văn bản?",
    answer:
      "Trong ONLYOFFICE tích hợp tiện ích Mercy, mở tài liệu -> vào tab Plugins -> chọn Đọc Số Thành Chữ -> nhập hoặc chọn ô số tiền cần đọc để chèn dòng chữ tiếng Việt chuẩn kế toán vào vị trí con trỏ.",
    status: "published",
    version: "1.0",
    product: "desktop_editors",
    os: "windows",
    audience: "public",
    approvedBy: "Mercy Tech Technical Lead",
    isPinned: false,
    hitCount: 64,
    updatedAt: Date.now() - 86400000 * 5,
  },
  {
    id: "faq_6",
    category: "sua_loi",
    question: "Khắc phục thông báo thiếu VCRUNTIME140_1.dll hoặc MSVCP140.dll trên Windows?",
    answer:
      "Thông báo này xuất hiện khi Windows thiếu gói Microsoft Visual C++ Redistributable 2015–2022 (x64/x86). Anh/chị cài bổ sung gói Microsoft Visual C++ Redistributable chính thức từ Microsoft hoặc chạy lại trình cài đặt Mercy để nạp thư viện runtime còn thiếu, sau đó mở lại ứng dụng.",
    status: "published",
    version: "1.0",
    product: "desktop_editors",
    os: "windows",
    audience: "public",
    approvedBy: "Mercy Tech Technical Lead",
    isPinned: false,
    hitCount: 51,
    updatedAt: Date.now() - 86400000 * 6,
  },
];

const INITIAL_TICKETS: AiTicket[] = [
  {
    id: "TK-849201",
    customerName: "Anh Hoàng (Kế toán Tổng hợp)",
    phoneOrZalo: "0912.839.421",
    softwareEdition: "ONLYOFFICE Desktop Windows (64-bit)",
    product: "desktop_editors",
    os: "windows",
    issueCategory: "font_chu",
    assignedTech: "chua_nhan",
    issueDescription:
      "Cần hỗ trợ cài đặt bộ 3 plugin và chuyển đổi font văn bản Word cũ bị lỗi ô vuông TCVN3",
    ultraViewerId: "48 291 034",
    ultraViewerPass: "8392",
    status: "pending",
    createdAt: Date.now() - 12 * 60 * 1000,
    conversationSnippet:
      "Khách: 'File Word của mình mở lên chữ bị mã hóa ô vuông, có sửa được không?'\nBot: 'Dạ anh/chị tạo bản sao lưu trước rồi dùng tiện ích Chuẩn Hóa Font Tiếng Việt...'\nKhách: 'Mình nhờ kỹ thuật kiểm tra giúp qua UltraViewer nhé!'",
  },
  {
    id: "TK-849188",
    customerName: "Chị Thảo (Hành chính Cty An Phát)",
    phoneOrZalo: "0987.214.590",
    softwareEdition: "ONLYOFFICE Desktop Windows",
    product: "mercy_keys",
    os: "windows",
    issueCategory: "ban_quyen",
    assignedTech: "kien_it",
    issueDescription:
      "Cần kích hoạt bản dùng thử 7 ngày và hướng dẫn kiểm tra chứng nhận dịch vụ Mercy",
    ultraViewerId: "12 904 811",
    ultraViewerPass: "5512",
    status: "in_progress",
    createdAt: Date.now() - 42 * 60 * 1000,
    notes: "Kiên IT đang kết nối UltraViewer hỗ trợ cài đặt",
    conversationSnippet:
      "Khách: 'Cho mình hỏi dùng thử 7 ngày có đủ tính năng không?'\nBot: 'Dạ bản dùng thử 7 ngày hỗ trợ đầy đủ các tính năng soạn thảo và bộ tiện ích tiếng Việt...'",
  },
  {
    id: "TK-849175",
    customerName: "Anh Hải (Trường Tiểu học Lê Quý Đôn)",
    phoneOrZalo: "0945.312.879",
    softwareEdition: "ONLYOFFICE Desktop Windows",
    product: "desktop_editors",
    os: "windows",
    issueCategory: "unikey",
    assignedTech: "chua_nhan",
    issueDescription: "Gõ tiếng Việt nhảy chữ w thành ưw trong bảng tính giáo viên",
    ultraViewerId: "62 401 928",
    ultraViewerPass: "7714",
    status: "pending",
    createdAt: Date.now() - 65 * 60 * 1000,
    conversationSnippet:
      "Khách: 'Bị lỗi gõ chữ w nhảy thành ưw khi đánh văn bản, hỗ trợ giúp mình với ạ'",
  },
  {
    id: "TK-849162",
    customerName: "Chị Hương (Văn phòng Luật Sư Á Châu)",
    phoneOrZalo: "0934.789.201",
    softwareEdition: "ONLYOFFICE Desktop Windows",
    product: "desktop_editors",
    os: "windows",
    issueCategory: "dll",
    assignedTech: "chua_nhan",
    issueDescription: "Báo lỗi thiếu file MSVCP140.dll khi khởi động trên máy tính Windows 10",
    ultraViewerId: "35 889 012",
    ultraViewerPass: "2048",
    status: "pending",
    createdAt: Date.now() - 95 * 60 * 1000,
    conversationSnippet:
      "Khách: 'Mở ứng dụng lên hiện popup System Error MSVCP140.dll not found'",
  },
];

const INITIAL_CHAT_LOGS: ChatLogItem[] = [
  {
    id: "log_1",
    sessionId: "ses_89102",
    customerLabel: "Khách hỏi cài đặt & font chữ",
    startedAt: Date.now() - 18 * 60 * 1000,
    messageCount: 4,
    lastMessageSnippet: "File Word của mình mở lên chữ bị mã hóa ô vuông, xử lý thế nào?",
    intentDetected: "technical_error",
    handoffRequested: true,
    rating: "helpful",
    messages: [
      {
        role: "user",
        content: "ONLYOFFICE cài trên Windows 11 thế nào bạn?",
        timestamp: Date.now() - 18 * 60 * 1000,
      },
      {
        role: "assistant",
        content:
          "Trên Windows 10/11 (64-bit), anh/chị có thể tải bộ cài chính thức từ trang Tài khoản Mercy để cài ONLYOFFICE Desktop Editors kèm tiện ích tiếng Việt.",
        timestamp: Date.now() - 18 * 60 * 1000 + 2000,
      },
      {
        role: "user",
        content: "File Word của mình mở lên chữ bị mã hóa ô vuông, xử lý thế nào?",
        timestamp: Date.now() - 14 * 60 * 1000,
      },
      {
        role: "assistant",
        content:
          "Anh/chị nên sao lưu file gốc trước, sau đó mở bản sao trong ONLYOFFICE và dùng tiện ích Chuẩn Hóa Font Tiếng Việt để chuyển mã TCVN3/VNI sang Unicode chuẩn.",
        timestamp: Date.now() - 14 * 60 * 1000 + 1500,
      },
    ],
  },
];

function sanitizeLegacyStrings<T>(obj: T): T {
  const raw = JSON.stringify(obj);
  if (!/100\s*%/i.test(raw)) return obj;
  const cleaned = raw
    .replace(/sửa\s*được\s*100\s*%/gi, "xử lý rất tốt các trường hợp phổ biến")
    .replace(/mở\s*khóa\s*100\s*%/gi, "mở đầy đủ")
    .replace(/100\s*%/g, "đầy đủ");
  try {
    return JSON.parse(cleaned) as T;
  } catch {
    return obj;
  }
}

function deriveEncryptionKey(): Buffer {
  const secret = process.env.LICENSE_SECRET_KEY || "MercyOfficeSecretKey2026";
  return createHash("sha256").update(secret, "utf8").digest();
}

export function encryptRouterSecret(plainText: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", deriveEncryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `v1:${iv.toString("base64")}:${tag.toString("base64")}:${encrypted.toString("base64")}`;
}

export function decryptRouterSecret(cipherText?: string): string {
  if (!cipherText || !cipherText.startsWith("v1:")) return "";
  try {
    const [, ivB64, tagB64, dataB64] = cipherText.split(":");
    if (!ivB64 || !tagB64 || !dataB64) return "";
    const decipher = createDecipheriv(
      "aes-256-gcm",
      deriveEncryptionKey(),
      Buffer.from(ivB64, "base64")
    );
    decipher.setAuthTag(Buffer.from(tagB64, "base64"));
    const dec = Buffer.concat([
      decipher.update(Buffer.from(dataB64, "base64")),
      decipher.final(),
    ]);
    return dec.toString("utf8");
  } catch {
    return "";
  }
}

export function maskSecretForDisplay(secret: string): string {
  const clean = (secret || "").trim();
  if (!clean) return "";
  if (clean.length <= 8) return "••••••••";
  return `${clean.slice(0, 4)}••••••••${clean.slice(-4)}`;
}

function isPlaceholderRouterKey(key: string): boolean {
  const k = (key || "").trim();
  return (
    !k ||
    k === "your-9router-api-key" ||
    k === "REPLACE_WITH_SERVER_SIDE_SECRET" ||
    k === "PASTE_YOUR_API_KEY"
  );
}

export async function getEffectiveRouterConfig(): Promise<{
  baseUrl: string;
  apiKey: string;
  hasValidKey: boolean;
  maskedKey: string;
  source: "admin_saved" | "env" | "unconfigured";
  modelTextRoute: string;
  modelVisionRoute: string;
  timeoutMs: number;
}> {
  const settings = await getBotSettings();
  const baseUrl = (
    settings.routerBaseUrl ||
    process.env.AI_ROUTER_URL ||
    process.env.OPENROUTER_BASE_URL ||
    ""
  )
    .trim()
    .replace(/\/+$/, "");

  const adminKey = decryptRouterSecret(settings.routerApiKeyEncrypted).trim();
  const envKey = (process.env.AI_ROUTER_API_KEY || process.env.OPENROUTER_API_KEY || "").trim();

  let apiKey = "";
  let source: "admin_saved" | "env" | "unconfigured" = "unconfigured";

  if (!isPlaceholderRouterKey(adminKey)) {
    apiKey = adminKey;
    source = "admin_saved";
  } else if (!isPlaceholderRouterKey(envKey)) {
    apiKey = envKey;
    source = "env";
  }

  return {
    baseUrl,
    apiKey,
    hasValidKey: source !== "unconfigured",
    maskedKey: apiKey ? maskSecretForDisplay(apiKey) : "",
    source,
    modelTextRoute: settings.modelTextRoute || process.env.AI_ROUTER_MODEL || "test",
    modelVisionRoute:
      settings.modelVisionRoute ||
      process.env.AI_ROUTER_VISION_MODEL ||
      settings.modelTextRoute ||
      process.env.AI_ROUTER_MODEL ||
      "test",
    timeoutMs:
      settings.routerTimeoutMs || Number(process.env.AI_ROUTER_TIMEOUT_MS) || 10000,
  };
}

export async function getClientSafeBotSettings(): Promise<AiBotSettings> {
  const raw = await getBotSettings();
  const effective = await getEffectiveRouterConfig();
  const clone: AiBotSettings = {
    ...raw,
    routerBaseUrl: effective.baseUrl,
    hasRouterApiKey: effective.hasValidKey,
    routerApiKeyMasked: effective.maskedKey,
    routerKeySource: effective.source,
  };
  delete clone.routerApiKeyEncrypted;
  return clone;
}

const REMOTE_AI_FILE = "ai-assistant-data.json";
let memoryPayloadCache: {
  payload: StoragePayload;
  loadedAt: number;
  remoteSha: string;
} | null = null;

function buildDefaultPayload(): StoragePayload {
  return {
    tickets: INITIAL_TICKETS,
    faqs: INITIAL_FAQS,
    settings: DEFAULT_BOT_SETTINGS,
    chatLogs: INITIAL_CHAT_LOGS,
  };
}

function normalizeParsedPayload(parsed: Partial<StoragePayload>): StoragePayload {
  const clean = sanitizeLegacyStrings(parsed);
  return {
    tickets: clean.tickets || INITIAL_TICKETS,
    faqs: (clean.faqs || INITIAL_FAQS).map((f: AiFaq) => ({
      status: "published",
      version: "1.0",
      audience: "public",
      ...f,
    })),
    settings: {
      ...DEFAULT_BOT_SETTINGS,
      ...(clean.settings || {}),
    },
    chatLogs: clean.chatLogs || INITIAL_CHAT_LOGS,
  };
}

async function ensureDataFile(): Promise<StoragePayload> {
  const now = Date.now();
  if (memoryPayloadCache && now - memoryPayloadCache.loadedAt < 25_000) {
    return memoryPayloadCache.payload;
  }

  // Remote GitHub DB mode (Vercel Production)
  if (!isLocalMode()) {
    const token = getGithubToken();
    if (token) {
      try {
        const ghUrl = `https://api.github.com/repos/${getGithubOwner()}/${getGithubRepo()}/contents/${REMOTE_AI_FILE}?t=${now}`;
        const res = await fetch(ghUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
          cache: "no-store",
        });
        if (res.ok) {
          const json = (await res.json()) as { content?: string; sha?: string };
          if (json.content) {
            const rawStr = Buffer.from(json.content, "base64").toString("utf-8");
            const payload = normalizeParsedPayload(JSON.parse(rawStr));
            memoryPayloadCache = {
              payload,
              loadedAt: now,
              remoteSha: json.sha || "",
            };
            return payload;
          }
        } else if (res.status === 404) {
          const fallback = memoryPayloadCache?.payload || buildDefaultPayload();
          memoryPayloadCache = { payload: fallback, loadedAt: now, remoteSha: "" };
          return fallback;
        }
      } catch (err) {
        console.warn("[ai-admin-storage] Remote GitHub read fallback:", err);
      }
    }
  }

  // Local / tmp disk fallback
  const dir = resolveSupportDataDir();
  const file = path.join(dir, "ai-assistant-data.json");
  try {
    if (!fsSync.existsSync(dir)) {
      await fs.mkdir(dir, { recursive: true });
    }
    const content = await fs.readFile(file, "utf-8");
    const payload = normalizeParsedPayload(JSON.parse(content));
    memoryPayloadCache = { payload, loadedAt: now, remoteSha: "" };
    return payload;
  } catch {
    const initial = memoryPayloadCache?.payload || buildDefaultPayload();
    memoryPayloadCache = { payload: initial, loadedAt: now, remoteSha: "" };
    try {
      if (!fsSync.existsSync(dir)) {
        await fs.mkdir(dir, { recursive: true });
      }
      await fs.writeFile(file, JSON.stringify(initial, null, 2), "utf-8");
    } catch {
      // Ignore read-only fs errors
    }
    return initial;
  }
}

async function writeDataFile(
  data: StoragePayload,
  options?: { skipRemoteSync?: boolean }
): Promise<void> {
  memoryPayloadCache = {
    payload: data,
    loadedAt: Date.now(),
    remoteSha: memoryPayloadCache?.remoteSha || "",
  };

  // Write to local / tmp disk
  try {
    const dir = resolveSupportDataDir();
    const file = path.join(dir, "ai-assistant-data.json");
    if (!fsSync.existsSync(dir)) {
      await fs.mkdir(dir, { recursive: true });
    }
    await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("[ai-admin-storage] writeDataFile local non-fatal error:", err);
  }

  // Sync important admin updates (settings, FAQs, tickets) to GitHub DB on production
  if (!isLocalMode() && !options?.skipRemoteSync) {
    const token = getGithubToken();
    if (token) {
      try {
        const baseApi = `https://api.github.com/repos/${getGithubOwner()}/${getGithubRepo()}/contents/${REMOTE_AI_FILE}`;
        let sha = memoryPayloadCache?.remoteSha || "";
        if (!sha) {
          const checkRes = await fetch(`${baseApi}?t=${Date.now()}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github.v3+json",
            },
            cache: "no-store",
          });
          if (checkRes.ok) {
            const checkJson = (await checkRes.json()) as { sha?: string };
            sha = checkJson.sha || "";
          }
        }
        const putRes = await fetch(baseApi, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "chore(ai-assistant): sync admin settings/tickets/faqs",
            content: Buffer.from(JSON.stringify(data, null, 2), "utf-8").toString("base64"),
            ...(sha ? { sha } : {}),
          }),
        });
        if (putRes.ok) {
          const putJson = (await putRes.json()) as { content?: { sha?: string } };
          if (memoryPayloadCache && putJson.content?.sha) {
            memoryPayloadCache.remoteSha = putJson.content.sha;
          }
        }
      } catch (err) {
        console.warn("[ai-admin-storage] Remote GitHub write non-fatal error:", err);
      }
    }
  }
}

export async function getTickets(): Promise<AiTicket[]> {
  const data = await ensureDataFile();
  return data.tickets.sort((a, b) => b.createdAt - a.createdAt);
}

export async function createTicket(
  ticketData: Omit<AiTicket, "id" | "createdAt" | "status"> & { id?: string }
): Promise<AiTicket> {
  const data = await ensureDataFile();
  const id = ticketData.id || `TK-${Date.now().toString().slice(-6)}`;
  const existing = data.tickets.find((t) => t.id === id);
  if (existing) {
    return existing;
  }
  const newTicket: AiTicket = {
    ...ticketData,
    id,
    status: "pending",
    assignedTech: ticketData.assignedTech || "chua_nhan",
    createdAt: Date.now(),
  };
  data.tickets.unshift(newTicket);
  await writeDataFile(data);
  return newTicket;
}

export async function updateTicketStatus(
  id: string,
  status: TicketStatus,
  notes?: string,
  assignedTech?: AssignedTech
): Promise<AiTicket | null> {
  const data = await ensureDataFile();
  const ticket = data.tickets.find((t) => t.id === id);
  if (!ticket) return null;
  ticket.status = status;
  ticket.updatedAt = Date.now();
  if (status === "resolved" && !ticket.resolvedAt) {
    ticket.resolvedAt = Date.now();
  }
  if (notes !== undefined) ticket.notes = notes;
  if (assignedTech !== undefined) ticket.assignedTech = assignedTech;
  await writeDataFile(data);
  return ticket;
}

export async function deleteTicket(id: string): Promise<boolean> {
  const data = await ensureDataFile();
  const prevCount = data.tickets.length;
  data.tickets = data.tickets.filter((t) => t.id !== id);
  if (data.tickets.length !== prevCount) {
    await writeDataFile(data);
    return true;
  }
  return false;
}

export async function getFaqs(): Promise<AiFaq[]> {
  const data = await ensureDataFile();
  return data.faqs.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
}

export async function saveFaq(faq: AiFaq): Promise<boolean> {
  const data = await ensureDataFile();
  const existingIdx = data.faqs.findIndex((f) => f.id === faq.id);
  const updatedFaq: AiFaq = {
    status: "published",
    version: "1.0",
    audience: "public",
    ...faq,
    updatedAt: Date.now(),
  };
  if (existingIdx >= 0) {
    data.faqs[existingIdx] = updatedFaq;
  } else {
    data.faqs.unshift(updatedFaq);
  }
  await writeDataFile(data);
  bumpKnowledgeCacheRevision();
  return true;
}

export async function deleteFaq(id: string): Promise<boolean> {
  const data = await ensureDataFile();
  data.faqs = data.faqs.filter((f) => f.id !== id);
  await writeDataFile(data);
  bumpKnowledgeCacheRevision();
  return true;
}

export async function getBotSettings(): Promise<AiBotSettings> {
  const data = await ensureDataFile();
  return {
    ...DEFAULT_BOT_SETTINGS,
    ...(data.settings || {}),
  };
}

export async function updateBotSettings(
  settings: Partial<AiBotSettings> & {
    newRouterApiKey?: string;
    clearRouterApiKey?: boolean;
  }
): Promise<AiBotSettings> {
  const data = await ensureDataFile();
  const {
    newRouterApiKey,
    clearRouterApiKey,
    hasRouterApiKey: _ignoreHas,
    routerApiKeyMasked: _ignoreMask,
    routerKeySource: _ignoreSrc,
    routerApiKeyEncrypted: _ignoreEncFromClient,
    ...cleanUpdates
  } = settings;

  const merged: AiBotSettings = {
    ...DEFAULT_BOT_SETTINGS,
    ...data.settings,
    ...cleanUpdates,
  };

  if (clearRouterApiKey) {
    delete merged.routerApiKeyEncrypted;
  } else if (typeof newRouterApiKey === "string" && newRouterApiKey.trim().length > 0) {
    merged.routerApiKeyEncrypted = encryptRouterSecret(newRouterApiKey.trim());
  }

  data.settings = merged;
  await writeDataFile(data);
  bumpKnowledgeCacheRevision();
  return getClientSafeBotSettings();
}

export async function appendAdminChatLog(entry: {
  sessionId: string;
  customerLabel: string;
  userText: string;
  assistantText: string;
  intentDetected?: string;
  handoffRequested?: boolean;
}): Promise<void> {
  try {
    const data = await ensureDataFile();
    const now = Date.now();
    const existing = data.chatLogs.find((l) => l.sessionId === entry.sessionId);
    if (existing) {
      existing.messages.push(
        { role: "user", content: entry.userText, timestamp: now },
        { role: "assistant", content: entry.assistantText, timestamp: now + 50 }
      );
      existing.messageCount = existing.messages.length;
      existing.lastMessageSnippet = entry.userText.slice(0, 140);
      if (entry.intentDetected) existing.intentDetected = entry.intentDetected;
      if (entry.handoffRequested) existing.handoffRequested = true;
    } else {
      data.chatLogs.unshift({
        id: `log_${now}_${Math.random().toString(36).slice(2, 6)}`,
        sessionId: entry.sessionId,
        customerLabel: entry.customerLabel,
        startedAt: now,
        messageCount: 2,
        lastMessageSnippet: entry.userText.slice(0, 140),
        intentDetected: entry.intentDetected,
        handoffRequested: Boolean(entry.handoffRequested),
        messages: [
          { role: "user", content: entry.userText, timestamp: now },
          { role: "assistant", content: entry.assistantText, timestamp: now + 50 },
        ],
      });
      if (data.chatLogs.length > 200) {
        data.chatLogs = data.chatLogs.slice(0, 200);
      }
    }
    await writeDataFile(data, { skipRemoteSync: true });
  } catch {
    // Non-fatal logging
  }
}

export async function getChatLogs(): Promise<ChatLogItem[]> {
  const data = await ensureDataFile();
  return (data.chatLogs || []).sort((a, b) => b.startedAt - a.startedAt);
}

export async function getAnalyticsSummary(extraStats?: {
  visionUploadsCount?: number;
  visionRejectedCount?: number;
  schemaBlockedCount?: number;
  providerFallbackCount?: number;
  satisfactionRateOverride?: number;
}): Promise<AnalyticsSummary> {
  const data = await ensureDataFile();
  const tickets = data.tickets || [];
  const chatLogs = data.chatLogs || [];

  const categoryBreakdown: Record<string, number> = {
    "Cài Đặt & Cập Nhật": 0,
    "Font & Tiếng Việt": 0,
    "Tài Khoản & Key Mercy": 0,
    "Bộ Gõ Unikey": 0,
    "Thư Viện DLL / Hệ Thống": 0,
    "Khác / Chuyên Sâu": 0,
  };

  tickets.forEach((t) => {
    if (t.issueCategory === "cai_dat") categoryBreakdown["Cài Đặt & Cập Nhật"]++;
    else if (t.issueCategory === "font_chu") categoryBreakdown["Font & Tiếng Việt"]++;
    else if (t.issueCategory === "ban_quyen") categoryBreakdown["Tài Khoản & Key Mercy"]++;
    else if (t.issueCategory === "unikey") categoryBreakdown["Bộ Gõ Unikey"]++;
    else if (t.issueCategory === "dll") categoryBreakdown["Thư Viện DLL / Hệ Thống"]++;
    else categoryBreakdown["Khác / Chuyên Sâu"]++;
  });

  const ratedLogs = chatLogs.filter((l) => Boolean(l.rating));
  const helpfulLogs = ratedLogs.filter((l) => l.rating === "helpful");
  const computedSatisfaction =
    extraStats?.satisfactionRateOverride ??
    (ratedLogs.length > 0
      ? Math.round((helpfulLogs.length / ratedLogs.length) * 100)
      : 96);

  return {
    totalChatsToday: chatLogs.length,
    totalChatsThisWeek: chatLogs.length,
    totalTicketsCreated: tickets.length,
    resolvedTicketsCount: tickets.filter((t) => t.status === "resolved").length,
    satisfactionRate: computedSatisfaction,
    categoryBreakdown,
    visionUploadsCount: extraStats?.visionUploadsCount ?? 0,
    visionRejectedCount: extraStats?.visionRejectedCount ?? 0,
    schemaBlockedCount: extraStats?.schemaBlockedCount ?? 0,
    providerFallbackCount: extraStats?.providerFallbackCount ?? 0,
  };
}
