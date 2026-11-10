import {
  generateCorrelationId,
  resolveSupportOwner,
} from "@/features/ai-assistant/services/security-guard.service";
import {
  createSupportConversation,
  listConversationsForOwner,
} from "@/features/ai-assistant/services/support-storage.service";
import { getBotSettings } from "@/features/ai-assistant-admin/services/ai-admin-storage.service";
import { withSupportHeaders } from "@/features/ai-assistant/services/http-response.helper";
import {
  checkRateLimit,
  extractClientIp,
} from "@/features/ai-assistant/services/rate-limiter.service";
import type { SupportLocale } from "@/features/ai-assistant/types/support.types";

export async function GET(req: Request) {
  const correlationId = generateCorrelationId();
  try {
    const { owner, newGuestCookieValue } = await resolveSupportOwner(req);
    const [conversations, settings] = await Promise.all([
      listConversationsForOwner(owner),
      getBotSettings(),
    ]);
    return withSupportHeaders(
      {
        success: true,
        conversations,
        owner: {
          ownerType: owner.ownerType,
          customerName: owner.customerName,
          customerEmail: owner.customerEmail,
          customerPhone: owner.customerPhone,
        },
        policy: {
          consentPolicyVersion:
            settings.consentPolicyVersion || "v1.0-2026-10-29",
          visionEnabled:
            settings.visionEnabled !== false &&
            settings.operatingMode !== "text_only" &&
            settings.operatingMode !== "faq_only",
          supportHours:
            settings.supportHours || "08:00 – 17:30 (Thứ 2 – Thứ 7)",
          hotlineZalo: settings.hotlineZalo || "0763 068 614",
          hotlineTech: settings.hotlineTech || "0862 497 002",
        },
      },
      { correlationId, newGuestCookieValue }
    );
  } catch (err) {
    console.error("[api/support/conversations] GET error:", err);
    return withSupportHeaders(
      { success: false, error: "Không thể tải danh sách hội thoại." },
      { status: 500, correlationId }
    );
  }
}

export async function POST(req: Request) {
  const correlationId = generateCorrelationId();
  try {
    const { owner, newGuestCookieValue } = await resolveSupportOwner(req);

    // IP Rate Limiting & Anti-Spam protection for new conversations
    const clientIp = extractClientIp(req);
    const rateCheck = checkRateLimit(clientIp, "conversations", {
      bypassAdmin: owner.isAdmin || owner.isTechnician,
    });
    if (!rateCheck.allowed) {
      return withSupportHeaders(
        {
          success: false,
          code: rateCheck.code,
          error: rateCheck.message,
          retryAfterSec: rateCheck.retryAfterSec,
        },
        { status: rateCheck.status, correlationId, newGuestCookieValue }
      );
    }
    const body = (await req.json().catch(() => ({}))) as {
      locale?: SupportLocale;
      pageContext?: string;
      consentAccepted?: boolean;
    };

    const settings = await getBotSettings();
    const policyVersion = settings.consentPolicyVersion || "v1.0-2026-10-29";

    const { conversation, activeIssue } = await createSupportConversation(
      owner,
      {
        locale: body.locale === "en" ? "en" : "vi",
        pageContext:
          typeof body.pageContext === "string"
            ? body.pageContext.slice(0, 200)
            : undefined,
        consentVersion: body.consentAccepted ? policyVersion : undefined,
      }
    );

    return withSupportHeaders(
      {
        success: true,
        conversation,
        activeIssue,
        owner: {
          ownerType: owner.ownerType,
          customerName: owner.customerName,
          customerEmail: owner.customerEmail,
          customerPhone: owner.customerPhone,
        },
        policy: {
          consentPolicyVersion: policyVersion,
          visionEnabled:
            settings.visionEnabled !== false &&
            settings.operatingMode !== "text_only" &&
            settings.operatingMode !== "faq_only",
          imageRetentionDays: settings.imageRetentionDays || 7,
          conversationRetentionDays: settings.conversationRetentionDays || 90,
          supportHours:
            settings.supportHours || "08:00 – 17:30 (Thứ 2 – Thứ 7)",
          hotlineZalo: settings.hotlineZalo || "0763 068 614",
          hotlineTech: settings.hotlineTech || "0862 497 002",
        },
      },
      { status: 201, correlationId, newGuestCookieValue }
    );
  } catch (err) {
    console.error("[api/support/conversations] POST error:", err);
    return withSupportHeaders(
      { success: false, error: "Không thể khởi tạo phiên trò chuyện hỗ trợ." },
      { status: 500, correlationId }
    );
  }
}

