import {
  generateCorrelationId,
  resolveSupportOwner,
} from "@/features/ai-assistant/services/security-guard.service";
import { toolCreateSupportTicket } from "@/features/ai-assistant/services/tools.service";
import { withSupportHeaders } from "@/features/ai-assistant/services/http-response.helper";
import {
  checkRateLimit,
  extractClientIp,
} from "@/features/ai-assistant/services/rate-limiter.service";
import type {
  SupportEdition,
  SupportOS,
  SupportProduct,
} from "@/features/ai-assistant/types/support.types";

export async function POST(req: Request) {
  const correlationId = generateCorrelationId();
  try {
    const { owner, newGuestCookieValue } = await resolveSupportOwner(req);

    // IP Rate Limiting & Anti-Spam protection for Technician tickets
    const clientIp = extractClientIp(req);
    const rateCheck = checkRateLimit(clientIp, "tickets", {
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
      idempotencyKey?: string;
      conversationId?: string;
      customerName?: string;
      contactChannel?: "phone_zalo" | "email";
      contactValue?: string;
      phoneOrZalo?: string;
      issueDescription?: string;
      product?: SupportProduct;
      edition?: SupportEdition;
      os?: SupportOS;
      version?: string;
      ultraViewerId?: string;
      ultraViewerPass?: string;
      externalNotifyConsent?: boolean;
    } | null;

    const contactValue = (
      body?.contactValue ||
      body?.phoneOrZalo ||
      owner.customerPhone ||
      owner.customerEmail ||
      ""
    ).trim();

    if (!contactValue) {
      return withSupportHeaders(
        {
          success: false,
          code: "CONTACT_REQUIRED",
          error:
            "Vui lòng nhập Số điện thoại/Zalo hoặc Email để kỹ thuật viên Mercy Tech liên hệ phản hồi.",
        },
        { status: 400, correlationId, newGuestCookieValue }
      );
    }

    const issueDescription = (body?.issueDescription || "").trim();
    if (!issueDescription) {
      return withSupportHeaders(
        {
          success: false,
          code: "DESCRIPTION_REQUIRED",
          error: "Vui lòng mô tả ngắn gọn vấn đề cần kỹ thuật viên hỗ trợ.",
        },
        { status: 400, correlationId, newGuestCookieValue }
      );
    }

    const inferredChannel: "phone_zalo" | "email" =
      body?.contactChannel || (contactValue.includes("@") ? "email" : "phone_zalo");

    const idempotencyKey =
      (body?.idempotencyKey || "").trim() ||
      `idem_${body?.conversationId || owner.ownerKey}_${issueDescription.slice(0, 32)}`;

    const created = await toolCreateSupportTicket({
      owner,
      idempotencyKey,
      conversationId: body?.conversationId,
      customerName: body?.customerName,
      contactChannel: inferredChannel,
      contactValue,
      issueDescription,
      product: body?.product,
      edition: body?.edition,
      os: body?.os,
      version: body?.version,
      ultraViewerId: body?.ultraViewerId,
      ultraViewerPass: body?.ultraViewerPass,
      externalNotifyConsent: body?.externalNotifyConsent ?? true,
      correlationId,
    });

    return withSupportHeaders(
      {
        success: true,
        createdNew: created.createdNew,
        ticketId: created.ticket.id,
        ticket: created.ticket,
        supportHours: created.supportHours,
        message: `Đã ghi nhận phiếu hỗ trợ #${created.ticket.id}. Kỹ thuật viên Mercy Tech sẽ tiếp nhận trong khung giờ ${created.supportHours}.`,
      },
      {
        status: created.createdNew ? 201 : 200,
        correlationId,
        newGuestCookieValue,
      }
    );
  } catch {
    return withSupportHeaders(
      {
        success: false,
        code: "TICKET_CREATE_FAILED",
        error:
          "Không thể lưu phiếu hỗ trợ lúc này. Vui lòng liên hệ Zalo CSKH 0763 068 614 (Mercy Tech Global).",
      },
      { status: 500, correlationId }
    );
  }
}

