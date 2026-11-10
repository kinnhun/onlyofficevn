import {
  generateCorrelationId,
  resolveSupportOwner,
} from "@/features/ai-assistant/services/security-guard.service";
import { recordSupportFeedback } from "@/features/ai-assistant/services/support-storage.service";
import { withSupportHeaders } from "@/features/ai-assistant/services/http-response.helper";

export async function POST(req: Request) {
  const correlationId = generateCorrelationId();
  try {
    const { owner, newGuestCookieValue } = await resolveSupportOwner(req);
    const body = (await req.json().catch(() => null)) as {
      conversationId?: string;
      messageId?: string;
      outcome?: "resolved" | "still_failing" | "helpful" | "unhelpful";
      note?: string;
    } | null;

    if (
      !body ||
      !body.conversationId ||
      !body.messageId ||
      !body.outcome ||
      !["resolved", "still_failing", "helpful", "unhelpful"].includes(
        body.outcome
      )
    ) {
      return withSupportHeaders(
        {
          success: false,
          error: "Thông tin phản hồi kết quả không hợp lệ.",
        },
        { status: 400, correlationId, newGuestCookieValue }
      );
    }

    const res = await recordSupportFeedback(owner, {
      conversationId: body.conversationId,
      messageId: body.messageId,
      outcome: body.outcome,
      note: body.note,
    });

    if (!res) {
      return withSupportHeaders(
        {
          success: false,
          error: "Không tìm thấy phiên hội thoại hoặc tin nhắn cần đánh giá.",
        },
        { status: 404, correlationId, newGuestCookieValue }
      );
    }

    return withSupportHeaders(
      {
        success: true,
        feedback: res.feedback,
        activeIssue: res.issue,
        shouldSuggestHandoff: res.shouldSuggestHandoff,
      },
      { correlationId, newGuestCookieValue }
    );
  } catch {
    return withSupportHeaders(
      { success: false, error: "Không thể ghi nhận phản hồi lúc này." },
      { status: 500, correlationId }
    );
  }
}

