import {
  generateCorrelationId,
  resolveSupportOwner,
} from "@/features/ai-assistant/services/security-guard.service";
import { initiateAttachmentUpload } from "@/features/ai-assistant/services/support-storage.service";
import { withSupportHeaders } from "@/features/ai-assistant/services/http-response.helper";
import {
  checkRateLimit,
  extractClientIp,
} from "@/features/ai-assistant/services/rate-limiter.service";
import type { AttachmentRoleTag } from "@/features/ai-assistant/types/support.types";

export async function POST(req: Request) {
  const correlationId = generateCorrelationId();
  try {
    const { owner, newGuestCookieValue } = await resolveSupportOwner(req);

    // IP Rate Limiting & Anti-Spam protection for uploads
    const clientIp = extractClientIp(req);
    const rateCheck = checkRateLimit(clientIp, "uploads", {
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
    const body = (await req.json().catch(() => null)) as {
      conversationId?: string;
      fileName?: string;
      declaredMime?: string;
      sizeBytes?: number;
      roleTag?: AttachmentRoleTag;
      orderIndex?: number;
      consentAccepted?: boolean;
      consentVersion?: string;
    } | null;

    if (!body || !body.conversationId || typeof body.sizeBytes !== "number") {
      return withSupportHeaders(
        {
          success: false,
          code: "INVALID_REQUEST",
          error: "Thiếu thông tin phiên hội thoại hoặc kích thước ảnh.",
        },
        { status: 400, correlationId, newGuestCookieValue }
      );
    }

    const result = await initiateAttachmentUpload(owner, {
      conversationId: body.conversationId,
      fileName: body.fileName || "screenshot.png",
      declaredMime: body.declaredMime || "image/png",
      sizeBytes: body.sizeBytes,
      roleTag: body.roleTag,
      orderIndex: body.orderIndex,
      consentAccepted: body.consentAccepted,
      consentVersion: body.consentVersion,
    });

    if (!result.ok) {
      return withSupportHeaders(
        {
          success: false,
          code: result.code,
          error: result.message,
        },
        { status: result.status, correlationId, newGuestCookieValue }
      );
    }

    return withSupportHeaders(
      {
        success: true,
        attachmentId: result.attachment.id,
        uploadUrl: `/api/support/uploads/${result.attachment.id}/complete`,
        attachment: result.attachment,
      },
      { status: 201, correlationId, newGuestCookieValue }
    );
  } catch {
    return withSupportHeaders(
      {
        success: false,
        code: "UPLOAD_INIT_FAILED",
        error: "Không thể khởi tạo phiên tải ảnh. Vui lòng thử lại.",
      },
      { status: 500, correlationId }
    );
  }
}

