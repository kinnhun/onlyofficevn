import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import {
  signSessionPayload,
  verifySessionToken,
  type SessionPayload,
} from "@/lib/security";
import { readDB } from "@/lib/github-db";
import type { UserSession } from "@/types/auth.types";
import type { SupportOwnerContext } from "../types/support.types";

export const SUPPORT_GUEST_COOKIE = "mercy-support-guest";
const GUEST_COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 90; // 90 days
const GUEST_COOKIE_MAX_AGE_MS = GUEST_COOKIE_MAX_AGE_SEC * 1000;

type GuestSessionPayload = SessionPayload & {
  guestId: string;
  isSupportGuest: boolean;
};

type AttachmentAccessPayload = SessionPayload & {
  attachmentId: string;
  ownerKey: string;
  purpose: "support_attachment_access";
};

export function generateCorrelationId(): string {
  return `corr_${Date.now().toString(36)}_${randomBytes(5).toString("hex")}`;
}

function parseCookieHeader(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};
  const out: Record<string, string> = {};
  const pairs = cookieHeader.split(";");
  for (const pair of pairs) {
    const eqIdx = pair.indexOf("=");
    if (eqIdx <= 0) continue;
    const rawKey = pair.slice(0, eqIdx).trim();
    const rawVal = pair.slice(eqIdx + 1).trim();
    if (!rawKey) continue;
    try {
      out[rawKey] = decodeURIComponent(rawVal);
    } catch {
      out[rawKey] = rawVal;
    }
  }
  return out;
}

async function readCookieMap(request?: Request): Promise<Record<string, string>> {
  if (request) {
    const headerCookies = parseCookieHeader(request.headers.get("cookie"));
    if (Object.keys(headerCookies).length > 0) {
      return headerCookies;
    }
  }
  try {
    const store = await cookies();
    const result: Record<string, string> = {};
    for (const c of store.getAll()) {
      result[c.name] = c.value;
    }
    return result;
  } catch {
    return {};
  }
}

/**
 * Resolves the authoritative server-side identity for support conversations.
 * Never trusts client-provided userId, role, or dealerId fields.
 */
export async function resolveSupportOwner(request?: Request): Promise<{
  owner: SupportOwnerContext;
  newGuestCookieValue?: string;
}> {
  const cookieMap = await readCookieMap(request);
  const mercyToken = cookieMap["mercy-session"];

  if (mercyToken) {
    const session = verifySessionToken<UserSession & SessionPayload>(mercyToken);
    if (session?.role === "admin") {
      return {
        owner: {
          ownerType: "admin",
          ownerId: "admin",
          ownerKey: "admin:root",
          customerName: "Quản trị viên Mercy Tech",
          isAdmin: true,
          isTechnician: true,
        },
      };
    }

    if (session?.role === "dealer" && (session.dealerId || session.customerId)) {
      const rawDealerId = String(session.dealerId || session.customerId);
      let customerName = session.dealerName || session.customerName;
      let customerEmail: string | undefined;
      let customerPhone: string | undefined;

      try {
        const { data: db } = await readDB();
        const dealer = db.dealerById(rawDealerId);
        const customerAcc = db.customers.find(
          (c: any) =>
            c.id === rawDealerId ||
            c.id === session.customerId ||
            (dealer?.mst && (c.mst === dealer.mst || c.taxCode === dealer.mst))
        );
        customerName = customerAcc?.companyName || customerAcc?.name || dealer?.name || customerName;
        customerEmail = customerAcc?.email;
        customerPhone = customerAcc?.phone || dealer?.contact;
      } catch {
        // Non-fatal fallback to session metadata
      }

      return {
        owner: {
          ownerType: "dealer",
          ownerId: rawDealerId,
          ownerKey: `dealer:${rawDealerId}`,
          dealerId: rawDealerId,
          customerName,
          customerEmail,
          customerPhone,
          isAdmin: false,
          isTechnician: false,
        },
      };
    }

    if (session?.role === "customer" && session.customerId) {
      const custId = String(session.customerId);
      let customerName = session.customerName;
      let customerEmail: string | undefined;
      let customerPhone: string | undefined;
      let detectedDealerRole = false;

      try {
        const { data: db } = await readDB();
        const customerAcc = db.customers.find((c: any) => c.id === custId);
        if (customerAcc) {
          customerName = customerAcc.companyName || customerAcc.name || customerName;
          customerEmail = customerAcc.email;
          customerPhone = customerAcc.phone;
          if (customerAcc.role === "dealer") {
            detectedDealerRole = true;
          }
        }
      } catch {
        // Non-fatal fallback
      }

      if (detectedDealerRole) {
        return {
          owner: {
            ownerType: "dealer",
            ownerId: custId,
            ownerKey: `dealer:${custId}`,
            dealerId: custId,
            customerName,
            customerEmail,
            customerPhone,
            isAdmin: false,
            isTechnician: false,
          },
        };
      }

      return {
        owner: {
          ownerType: "customer",
          ownerId: custId,
          ownerKey: `customer:${custId}`,
          customerName,
          customerEmail,
          customerPhone,
          isAdmin: false,
          isTechnician: false,
        },
      };
    }
  }

  // Fallback to signed guest cookie
  const guestToken = cookieMap[SUPPORT_GUEST_COOKIE];
  if (guestToken) {
    const verifiedGuest = verifySessionToken<GuestSessionPayload>(
      guestToken,
      GUEST_COOKIE_MAX_AGE_MS
    );
    if (
      verifiedGuest &&
      verifiedGuest.isSupportGuest &&
      typeof verifiedGuest.guestId === "string" &&
      verifiedGuest.guestId.startsWith("gst_")
    ) {
      return {
        owner: {
          ownerType: "guest",
          ownerId: verifiedGuest.guestId,
          ownerKey: `guest:${verifiedGuest.guestId}`,
          isAdmin: false,
          isTechnician: false,
        },
      };
    }
  }

  // Issue a new cryptographically signed guest identity
  const newGuestId = `gst_${randomBytes(10).toString("hex")}`;
  const signedGuestValue = signSessionPayload({
    role: "customer",
    guestId: newGuestId,
    isSupportGuest: true,
  });

  return {
    owner: {
      ownerType: "guest",
      ownerId: newGuestId,
      ownerKey: `guest:${newGuestId}`,
      isAdmin: false,
      isTechnician: false,
    },
    newGuestCookieValue: signedGuestValue,
  };
}

export function getGuestCookieOptions() {
  return {
    name: SUPPORT_GUEST_COOKIE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: GUEST_COOKIE_MAX_AGE_SEC,
    path: "/",
  };
}

export function canAccessResource(
  owner: SupportOwnerContext,
  resourceOwnerKey: string,
  resourceDealerId?: string
): boolean {
  if (owner.isAdmin || owner.isTechnician) return true;
  if (!resourceOwnerKey) return false;
  if (owner.ownerKey === resourceOwnerKey) return true;
  if (
    owner.ownerType === "dealer" &&
    owner.dealerId &&
    resourceDealerId &&
    owner.dealerId === resourceDealerId &&
    resourceOwnerKey === `dealer:${resourceDealerId}`
  ) {
    return true;
  }
  return false;
}

export function createAttachmentAccessToken(
  attachmentId: string,
  ownerKey: string
): string {
  return signSessionPayload({
    role: "customer",
    attachmentId,
    ownerKey,
    purpose: "support_attachment_access",
  });
}

export function verifyAttachmentAccessToken(
  token: string | null | undefined,
  expectedAttachmentId: string,
  expectedOwnerKey: string,
  maxAgeMs: number = 15 * 60 * 1000 // 15 minutes short-lived URL
): boolean {
  if (!token) return false;
  const payload = verifySessionToken<AttachmentAccessPayload>(token, maxAgeMs);
  if (!payload || payload.purpose !== "support_attachment_access") return false;
  if (payload.attachmentId !== expectedAttachmentId) return false;
  if (expectedOwnerKey === "admin:root") return true;
  return payload.ownerKey === expectedOwnerKey;
}

// ─── Sensitive Data Redaction ───
export type RedactionResult = {
  sanitizedText: string;
  containsSensitiveData: boolean;
  detectedTypes: Array<"password" | "otp" | "api_key" | "license_key" | "sticker_code">;
};

export function redactSensitiveContent(input: string): RedactionResult {
  if (!input) {
    return { sanitizedText: "", containsSensitiveData: false, detectedTypes: [] };
  }

  let text = input;
  const detected = new Set<
    "password" | "otp" | "api_key" | "license_key" | "sticker_code"
  >();

  // 1. API Keys & Bearer Tokens
  const apiKeyPatterns = [
    /\bsk-[A-Za-z0-9_-]{16,}\b/g,
    /\bghp_[A-Za-z0-9]{20,}\b/g,
    /\bgithub_pat_[A-Za-z0-9_]{24,}\b/g,
    /\bAIza[0-9A-Za-z_-]{28,}\b/g,
    /\bBearer\s+[A-Za-z0-9._-]{24,}\b/gi,
  ];
  for (const regex of apiKeyPatterns) {
    if (regex.test(text)) {
      detected.add("api_key");
      text = text.replace(regex, "[ĐÃ_CHE_API_KEY]");
    }
  }

  // 2. Full Mercy License Keys: e.g. 9a3b8c0e1b17a9b5-29102026143012-A1B2-C3D4
  const fullLicenseRegex =
    /\b([A-Za-z0-9]{6,24})-(\d{12,14})-([A-Fa-f0-9]{4})-([A-Fa-f0-9]{4})\b/g;
  if (fullLicenseRegex.test(text)) {
    detected.add("license_key");
    text = text.replace(fullLicenseRegex, (_match, p1, _p2, _p3, p4) => {
      const prefix = String(p1).slice(0, 6);
      return `${prefix}****-********-****-${p4}`;
    });
  }

  // 3. Full 12-digit Physical Sticker Scratch Codes: e.g. 7800-4173-9386
  const stickerCodeRegex = /\b(\d{4})-(\d{4})-(\d{4})\b/g;
  if (stickerCodeRegex.test(text)) {
    detected.add("sticker_code");
    text = text.replace(stickerCodeRegex, "$1-••••-••••");
  }

  // 4. OTP Codes
  const otpRegex =
    /\b(?:mã\s*otp|otp(?:\s*code)?|mã\s*xác\s*thực|verification\s*code)\s*(?:là|:|=|-)?\s*(\d{4,8})\b/gi;
  if (otpRegex.test(text)) {
    detected.add("otp");
    text = text.replace(otpRegex, (match, code) =>
      match.replace(code, "[ĐÃ_CHE_OTP]")
    );
  }

  // 5. Explicit account passwords (excluding explicit UltraViewer 4-digit mention)
  const passwordRegex =
    /\b(?:mật\s*khẩu(?:\s*tài\s*khoản|\s*đăng\s*nhập|\s*email)?|password|login\s*pass)\s*(?:là|:|=)\s*([^\s,;]{4,64})/gi;
  if (passwordRegex.test(text)) {
    detected.add("password");
    text = text.replace(passwordRegex, (match, secret) => {
      if (/ultraview/i.test(text) && /^\d{4,6}$/.test(secret)) {
        return match;
      }
      return match.replace(secret, "[ĐÃ_CHE_MẬT_KHẨU]");
    });
  }

  return {
    sanitizedText: text,
    containsSensitiveData: detected.size > 0,
    detectedTypes: Array.from(detected),
  };
}

// ─── Prompt Injection Detection & Untrusted Wrapping ───
const PROMPT_INJECTION_PATTERNS: RegExp[] = [
  /ignore\s+(?:all\s+)?(?:previous|prior|above)\s+(?:instructions|prompts|rules)/i,
  /disregard\s+(?:all\s+)?(?:system|previous|developer)\s+(?:instructions|prompt|rules)/i,
  /(?:reveal|print|show|dump|output|leak)\s+(?:your\s+|the\s+)?(?:system\s*prompt|developer\s*prompt|hidden\s*instructions|api\s*key)/i,
  /you\s+are\s+now\s+(?:in\s+)?(?:developer\s+mode|dan\s+mode|unrestricted|jailbreak)/i,
  /<\|im_start\|>\s*system/i,
  /\[\s*SYSTEM\s*OVERRIDE\s*\]/i,
  /bỏ\s+qua\s+(?:tất\s+cả\s+|mọi\s+|toàn\s+bộ\s+)?(?:hướng\s+dẫn|quy\s+tắc|lệnh)\s*(?:trước|hệ\s+thống|trên)/i,
  /(?:tiết\s+lộ|hiển\s+thị|in\s+ra|đọc\s+nguyên\s+văn)\s+(?:system\s*prompt|câu\s+lệnh\s+hệ\s+thống|api\s*key|khóa\s+bí\s+mật)/i,
  /(?:xuất|in|liệt\s+kê)\s+(?:toàn\s+bộ\s+|danh\s+sách\s+)?(?:key|mã\s+kích\s+hoạt|khách\s+hàng)\s+của\s+(?:tất\s+cả|đại\s+lý\s+khác|hệ\s+thống)/i,
];

export function detectPromptInjection(texts: Array<string | undefined | null>): {
  detected: boolean;
  matchedSnippet?: string;
} {
  for (const raw of texts) {
    if (!raw) continue;
    for (const pattern of PROMPT_INJECTION_PATTERNS) {
      const m = raw.match(pattern);
      if (m) {
        return { detected: true, matchedSnippet: m[0] };
      }
    }
  }
  return { detected: false };
}

export function wrapUntrustedData(tagName: string, content: string): string {
  const safeTag = tagName.replace(/[^a-zA-Z0-9_-]/g, "");
  const escaped = (content || "")
    .replace(/<\//g, "< /")
    .replace(new RegExp(`<${safeTag}`, "gi"), `< ${safeTag}`);
  return `<${safeTag}>\n${escaped}\n</${safeTag}>`;
}

// ─── Output Safety & Workspace Rule Validator ───
const DANGEROUS_COMMAND_PATTERNS: RegExp[] = [
  /disable\s+(?:windows\s+)?(?:defender|antivirus|firewall)/i,
  /tắt\s+(?:hoàn\s+toàn\s+)?(?:windows\s+defender|tường\s+lửa|firewall|diệt\s+virus)/i,
  /Set-MpPreference\s+-DisableRealtimeMonitoring\s+\$true/i,
  /netsh\s+advfirewall\s+set\s+allprofiles\s+state\s+off/i,
  /(?:curl|wget|irm|Invoke-RestMethod)\s+https?:\/\/[^\s]+\s*\|\s*(?:bash|sh|iex|Invoke-Expression)/i,
  /\b(?:reg\s+delete|reg\s+add|HKEY_LOCAL_MACHINE|HKEY_CURRENT_USER)\b/i,
  /\b(?:rm\s+-rf\s+\/|del\s+\/[fqs]\s+[c-z]:\\|format\s+[c-z]:)/i,
  /NODE_TLS_REJECT_UNAUTHORIZED\s*=\s*['"]?0/i,
  /--no-check-certificate/i,
];

export function sanitizeAssistantOutput(
  rawText: string,
  options?: {
    locale?: "vi" | "en";
    realTicketId?: string | null;
  }
): {
  text: string;
  blockedUnsafeAdvice: boolean;
  rewrittenRules: string[];
} {
  const locale = options?.locale || "vi";
  let text = (rawText || "").trim();
  const rewrittenRules: string[] = [];

  // 1. Block reckless system-level advice (Section 17.3)
  for (const pattern of DANGEROUS_COMMAND_PATTERNS) {
    if (pattern.test(text)) {
      const safeFallback =
        locale === "en"
          ? "To protect your device and documents, I cannot recommend disabling security protections, editing the Windows Registry, or running unverified scripts. Please create a support ticket or connect with a Mercy Tech technician so we can check safely."
          : "Để bảo đảm an toàn cho thiết bị và dữ liệu tài liệu của anh/chị, em không khuyến nghị tắt phần mềm bảo mật/tường lửa, can thiệp Registry hay chạy lệnh không kiểm chứng. Anh/chị vui lòng bấm **Gặp kỹ thuật viên** để đội ngũ Mercy Tech kiểm tra an toàn ạ.";
      return {
        text: safeFallback,
        blockedUnsafeAdvice: true,
        rewrittenRules: ["dangerous_advice_blocked"],
      };
    }
  }

  // 2. Enforce Workspace Rule 2.5: Never emit clickable zalo.me links
  if (/(?:https?:\/\/)?zalo\.me\/[^\s)]+/i.test(text)) {
    text = text.replace(
      /(?:https?:\/\/)?zalo\.me\/[^\s)]+/gi,
      "Zalo CSKH 0763 068 614 (Mercy Tech Global)"
    );
    rewrittenRules.push("stripped_zalo_me_link");
  }

  // 3. Enforce Workspace Rule 2.11: Never use "100%" or absolute claims; trial is 7 days
  if (/100\s*%/g.test(text)) {
    text = text
      .replace(/tương\s*thích\s*100\s*%/gi, "tương thích rất tốt")
      .replace(/mở\s*mượt\s*(?:mà\s*)?100\s*%/gi, "mở mượt mà hầu hết các file")
      .replace(/sửa\s*được\s*100\s*%/gi, "xử lý hiệu quả hầu hết các trường hợp")
      .replace(/100\s*%\s*tính\s*năng/gi, "đầy đủ các tính năng")
      .replace(/100\s*%\s*compatible/gi, "highly compatible")
      .replace(/100\s*%/g, locale === "en" ? "fully" : "rất tốt");
    rewrittenRules.push("replaced_100_percent_claim");
  }

  if (/(?:demo|dùng\s*thử)\s*30\s*ngày/i.test(text)) {
    text = text.replace(/(?:demo|dùng\s*thử)\s*30\s*ngày/gi, "dùng thử 7 ngày");
    rewrittenRules.push("fixed_trial_7_days");
  }

  // 4. Prevent hallucinated ticket IDs when backend did not create a ticket
  if (!options?.realTicketId) {
    const fakeTicketPattern = /\bTK-\d{5,8}\b/g;
    if (fakeTicketPattern.test(text)) {
      text = text.replace(fakeTicketPattern, "[chưa tạo mã phiếu]");
      rewrittenRules.push("stripped_unverified_ticket_id");
    }
  }

  // 5. Redact any leaked API keys or full license keys in assistant output
  const redacted = redactSensitiveContent(text);
  if (redacted.containsSensitiveData) {
    text = redacted.sanitizedText;
    rewrittenRules.push("redacted_output_secret");
  }

  return {
    text,
    blockedUnsafeAdvice: false,
    rewrittenRules,
  };
}

