import { NextResponse } from "next/server";
import {
  createAttachmentAccessToken,
  generateCorrelationId,
  resolveSupportOwner,
  verifyAttachmentAccessToken,
} from "@/features/ai-assistant/services/security-guard.service";
import { readAuthorizedAttachmentBytes } from "@/features/ai-assistant/services/support-storage.service";
import { withSupportHeaders } from "@/features/ai-assistant/services/http-response.helper";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const correlationId = generateCorrelationId();
  try {
    const { id } = await context.params;
    const { owner, newGuestCookieValue } = await resolveSupportOwner(req);
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get("mode");
    const token = searchParams.get("token");

    // Verify ownership via session (and validate token if provided)
    if (token && !verifyAttachmentAccessToken(token, id, owner.ownerKey)) {
      return withSupportHeaders(
        { success: false, error: "Liên kết xem ảnh đã hết hạn hoặc không hợp lệ." },
        { status: 404, correlationId, newGuestCookieValue }
      );
    }

    const res = await readAuthorizedAttachmentBytes(id, owner);
    if (!res.ok) {
      return withSupportHeaders(
        { success: false, error: res.message },
        { status: res.status, correlationId, newGuestCookieValue }
      );
    }

    if (mode === "meta") {
      const freshToken = createAttachmentAccessToken(id, owner.ownerKey);
      return withSupportHeaders(
        {
          success: true,
          attachment: {
            id: res.attachment.id,
            fileName: res.attachment.fileName,
            detectedMime: res.attachment.detectedMime,
            width: res.attachment.width,
            height: res.attachment.height,
            roleTag: res.attachment.roleTag,
            expiresAt: res.attachment.expiresAt,
          },
          signedUrl: `/api/support/attachments/${id}/access?token=${encodeURIComponent(freshToken)}`,
        },
        { correlationId, newGuestCookieValue }
      );
    }

    const mime = res.attachment.detectedMime || "image/png";
    return new NextResponse(new Uint8Array(res.buffer), {
      status: 200,
      headers: {
        "Content-Type": mime,
        "Content-Length": String(res.buffer.length),
        "Cache-Control": "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
        "Content-Disposition": "inline",
        "X-Correlation-Id": correlationId,
      },
    });
  } catch {
    return withSupportHeaders(
      { success: false, error: "Không thể truy cập tệp ảnh." },
      { status: 500, correlationId }
    );
  }
}

