import {
  generateCorrelationId,
  resolveSupportOwner,
} from "@/features/ai-assistant/services/security-guard.service";
import { processSupportMessageTurn } from "@/features/ai-assistant/services/support-orchestrator.service";
import { registerInlineTurnAttachments } from "@/features/ai-assistant/services/support-storage.service";
import {
  checkRateLimit,
  extractClientIp,
  checkDuplicateMessageSpam,
  isGibberishSpam,
} from "@/features/ai-assistant/services/rate-limiter.service";

export const maxDuration = 60;
import { withSupportHeaders } from "@/features/ai-assistant/services/http-response.helper";

export async function POST(req: Request) {
  const correlationId = generateCorrelationId();
  try {
    const { owner, newGuestCookieValue } = await resolveSupportOwner(req);

    // IP Rate Limiting & Anti-Spam protection
    const clientIp = extractClientIp(req);
    const rateCheck = checkRateLimit(clientIp, "messages", {
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
      clientMessageId?: string;
      text?: string;
      attachmentIds?: string[];
      inlineAttachments?: Array<{
        id: string;
        fileName: string;
        mime: string;
        base64: string;
        roleTag?: any;
      }>;
    } | null;

    if (!body || !body.conversationId || !body.clientMessageId) {
      return withSupportHeaders(
        {
          success: false,
          code: "INVALID_REQUEST",
          error: "Thiếu conversationId hoặc clientMessageId.",
        },
        { status: 400, correlationId, newGuestCookieValue }
      );
    }

    const messageText = (body.text || "").trim();

    // 1. Strict length limit: Max 1,000 characters (stops context-stuffing attacks)
    if (messageText.length > 1000) {
      return withSupportHeaders(
        {
          success: false,
          code: "MESSAGE_TOO_LONG",
          error: "Nội dung câu hỏi vượt quá giới hạn 1.000 ký tự. Vui lòng rút ngắn câu hỏi.",
        },
        { status: 400, correlationId, newGuestCookieValue }
      );
    }

    // 2. Duplicate turn spam filter (within 90s from same IP)
    if (messageText && !owner.isAdmin && !owner.isTechnician) {
      const dupCheck = checkDuplicateMessageSpam(clientIp, messageText);
      if (dupCheck.isDuplicate) {
        return withSupportHeaders(
          {
            success: false,
            code: "DUPLICATE_MESSAGE",
            error: dupCheck.message || "Câu hỏi này vừa được gửi.",
          },
          { status: 429, correlationId, newGuestCookieValue }
        );
      }

      // 3. Gibberish / keyboard smash filter
      if (isGibberishSpam(messageText)) {
        return withSupportHeaders(
          {
            success: false,
            code: "GIBBERISH_SPAM",
            error:
              "Dạ câu hỏi của anh/chị dường như chưa rõ ràng hoặc bị dính phím. Anh/chị vui lòng mô tả lỗi ONLYOFFICE cụ thể (ví dụ: lỗi font chữ, in ấn, key kích hoạt...) để em hỗ trợ nhé!",
          },
          { status: 400, correlationId, newGuestCookieValue }
        );
      }
    }

    if (body.inlineAttachments && body.inlineAttachments.length > 0) {
      await registerInlineTurnAttachments(
        owner,
        body.conversationId,
        body.inlineAttachments
      );
    }

    const result = await processSupportMessageTurn({
      owner,
      conversationId: body.conversationId,
      clientMessageId: body.clientMessageId,
      text: body.text || "",
      attachmentIds: Array.isArray(body.attachmentIds) ? body.attachmentIds : [],
      correlationId,
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
        correlationId,
        idempotentReplay: result.idempotentReplay,
        handoffState: result.handoffState,
        suppressedAutoReply: result.suppressedAutoReply,
        jobId: result.jobId,
        userMessage: result.userMessage,
        assistantMessage: result.assistantMessage,
        activeIssue: result.activeIssue,
      },
      { correlationId, newGuestCookieValue }
    );
  } catch (err) {
    console.error("[api/support/messages] POST error:", err);
    return withSupportHeaders(
      {
        success: false,
        code: "MESSAGE_TURN_FAILED",
        error:
          "Hệ thống trợ lý kỹ thuật đang tạm gián đoạn kết nối. Nội dung anh/chị đang soạn được giữ nguyên để thử lại.",
      },
      { status: 500, correlationId }
    );
  }
}

