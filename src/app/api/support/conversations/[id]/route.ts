import {
  generateCorrelationId,
  resolveSupportOwner,
} from "@/features/ai-assistant/services/security-guard.service";
import {
  acceptImageConsentForConversation,
  deleteConversationAndRevokeAll,
  getConversationBundleForOwner,
  switchOrCreateSupportIssue,
} from "@/features/ai-assistant/services/support-storage.service";
import { getBotSettings } from "@/features/ai-assistant-admin/services/ai-admin-storage.service";
import { withSupportHeaders } from "@/features/ai-assistant/services/http-response.helper";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const correlationId = generateCorrelationId();
  try {
    const { id } = await context.params;
    const { owner, newGuestCookieValue } = await resolveSupportOwner(req);
    const bundle = await getConversationBundleForOwner(id, owner);

    if (!bundle) {
      return withSupportHeaders(
        {
          success: false,
          error: "Không tìm thấy cuộc trò chuyện hoặc bạn không có quyền xem.",
        },
        { status: 404, correlationId, newGuestCookieValue }
      );
    }

    const settings = await getBotSettings();
    return withSupportHeaders(
      {
        success: true,
        ...bundle,
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
  } catch {
    return withSupportHeaders(
      { success: false, error: "Lỗi tải nội dung cuộc trò chuyện." },
      { status: 500, correlationId }
    );
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const correlationId = generateCorrelationId();
  try {
    const { id } = await context.params;
    const { owner, newGuestCookieValue } = await resolveSupportOwner(req);
    const body = (await req.json().catch(() => ({}))) as {
      action?: "accept_consent" | "switch_issue" | "new_issue";
      consentVersion?: string;
      targetIssueId?: string;
      newIssueTitle?: string;
    };

    if (body.action === "accept_consent") {
      const settings = await getBotSettings();
      const version =
        body.consentVersion ||
        settings.consentPolicyVersion ||
        "v1.0-2026-10-29";
      const ok = await acceptImageConsentForConversation(id, owner, version);
      if (!ok) {
        return withSupportHeaders(
          { success: false, error: "Không tìm thấy phiên hội thoại." },
          { status: 404, correlationId, newGuestCookieValue }
        );
      }
      return withSupportHeaders(
        { success: true, consentVersion: version },
        { correlationId, newGuestCookieValue }
      );
    }

    if (body.action === "switch_issue" || body.action === "new_issue") {
      const issue = await switchOrCreateSupportIssue(id, owner, {
        targetIssueId:
          body.action === "switch_issue" ? body.targetIssueId : undefined,
        newIssueTitle: body.newIssueTitle,
      });
      if (!issue) {
        return withSupportHeaders(
          { success: false, error: "Không tìm thấy phiên hội thoại." },
          { status: 404, correlationId, newGuestCookieValue }
        );
      }
      return withSupportHeaders(
        { success: true, activeIssue: issue },
        { correlationId, newGuestCookieValue }
      );
    }

    return withSupportHeaders(
      { success: false, error: "Thao tác cập nhật không hợp lệ." },
      { status: 400, correlationId, newGuestCookieValue }
    );
  } catch {
    return withSupportHeaders(
      { success: false, error: "Lỗi cập nhật cuộc trò chuyện." },
      { status: 500, correlationId }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const correlationId = generateCorrelationId();
  try {
    const { id } = await context.params;
    const { owner, newGuestCookieValue } = await resolveSupportOwner(req);
    const deleted = await deleteConversationAndRevokeAll(
      id,
      owner,
      correlationId
    );
    if (!deleted) {
      return withSupportHeaders(
        {
          success: false,
          error: "Không tìm thấy cuộc trò chuyện hoặc đã bị xóa trước đó.",
        },
        { status: 404, correlationId, newGuestCookieValue }
      );
    }

    return withSupportHeaders(
      {
        success: true,
        message:
          "Đã xóa cuộc trò chuyện, thu hồi quyền truy cập ảnh và xóa dữ liệu phân tích phái sinh.",
      },
      { correlationId, newGuestCookieValue }
    );
  } catch {
    return withSupportHeaders(
      { success: false, error: "Không thể xóa cuộc trò chuyện lúc này." },
      { status: 500, correlationId }
    );
  }
}

