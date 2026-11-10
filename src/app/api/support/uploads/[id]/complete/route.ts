import {
  createAttachmentAccessToken,
  generateCorrelationId,
  resolveSupportOwner,
} from "@/features/ai-assistant/services/security-guard.service";
import { completeAttachmentUpload } from "@/features/ai-assistant/services/support-storage.service";
import { withSupportHeaders } from "@/features/ai-assistant/services/http-response.helper";

async function extractBinaryBuffer(req: Request): Promise<Buffer | null> {
  const contentType = (req.headers.get("content-type") || "").toLowerCase();

  if (contentType.includes("multipart/form-data")) {
    const formData = await req.formData();
    const fileField = formData.get("file");
    if (fileField && typeof fileField === "object" && "arrayBuffer" in fileField) {
      const ab = await fileField.arrayBuffer();
      return Buffer.from(ab);
    }
    return null;
  }

  if (contentType.includes("application/json")) {
    const json = (await req.json().catch(() => null)) as {
      base64?: string;
    } | null;
    if (!json?.base64) return null;
    const stripped = json.base64.replace(/^data:[^;]+;base64,/, "");
    return Buffer.from(stripped, "base64");
  }

  const ab = await req.arrayBuffer();
  return Buffer.from(ab);
}

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const correlationId = generateCorrelationId();
  try {
    const { id } = await context.params;
    const { owner, newGuestCookieValue } = await resolveSupportOwner(req);
    const buffer = await extractBinaryBuffer(req);

    if (!buffer || buffer.length === 0) {
      return withSupportHeaders(
        {
          success: false,
          code: "EMPTY_FILE",
          error: "Không nhận được dữ liệu tệp ảnh hợp lệ.",
        },
        { status: 400, correlationId, newGuestCookieValue }
      );
    }

    const result = await completeAttachmentUpload(
      owner,
      id,
      buffer,
      correlationId
    );
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

    const token = createAttachmentAccessToken(
      result.attachment.id,
      owner.ownerKey
    );

    return withSupportHeaders(
      {
        success: true,
        attachment: result.attachment,
        previewUrl: `/api/support/attachments/${result.attachment.id}/access?token=${encodeURIComponent(token)}`,
      },
      { correlationId, newGuestCookieValue }
    );
  } catch {
    return withSupportHeaders(
      {
        success: false,
        code: "UPLOAD_COMPLETE_FAILED",
        error: "Không thể hoàn tất kiểm tra và lưu ảnh chụp màn hình.",
      },
      { status: 500, correlationId }
    );
  }
}

