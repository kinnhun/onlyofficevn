import {
  generateCorrelationId,
  resolveSupportOwner,
} from "@/features/ai-assistant/services/security-guard.service";
import { getSupportJobForOwner } from "@/features/ai-assistant/services/support-storage.service";
import { withSupportHeaders } from "@/features/ai-assistant/services/http-response.helper";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const correlationId = generateCorrelationId();
  try {
    const { id } = await context.params;
    const { owner, newGuestCookieValue } = await resolveSupportOwner(req);
    const job = await getSupportJobForOwner(id, owner);

    if (!job) {
      return withSupportHeaders(
        { success: false, error: "Không tìm thấy tiến trình xử lý." },
        { status: 404, correlationId, newGuestCookieValue }
      );
    }

    return withSupportHeaders(
      { success: true, job },
      { correlationId, newGuestCookieValue }
    );
  } catch {
    return withSupportHeaders(
      { success: false, error: "Lỗi truy vấn trạng thái xử lý." },
      { status: 500, correlationId }
    );
  }
}

