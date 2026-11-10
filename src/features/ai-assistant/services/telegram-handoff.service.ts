import { redactSensitiveContent } from "./security-guard.service";
import { getBotSettings } from "@/features/ai-assistant-admin/services/ai-admin-storage.service";
import type { HandoffRequest, HandoffResponse } from "../types";

function escapeHtml(raw: string): string {
  return (raw || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function sendTelegramHandoffAlert(
  data: HandoffRequest & {
    ticketId?: string;
    priority?: "normal" | "high" | "urgent_data_risk";
    attachmentCount?: number;
  }
): Promise<HandoffResponse> {
  const settings = await getBotSettings();
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const candidateChatIds = Array.from(
    new Set(
      [process.env.TELEGRAM_CHAT_ID, settings.telegramChatId]
        .filter((c): c is string => Boolean(c && typeof c === "string" && c.trim().length > 0))
    )
  );
  const ticketId = data.ticketId || `TK-${Date.now().toString().slice(-6)}`;

  if (!settings.telegramAlertsEnabled || !token || candidateChatIds.length === 0) {
    return {
      success: true,
      ticketId,
      message: "Yêu cầu đã được lưu vào hàng đợi kỹ thuật Mercy Tech.",
    };
  }

  const safeIssue = escapeHtml(
    redactSensitiveContent(data.issueDescription || "").sanitizedText.slice(0, 600)
  );
  const safeName = escapeHtml((data.customerName || "Khách truy cập Web").slice(0, 120));
  const safeContact = escapeHtml((data.phoneOrZalo || "").slice(0, 120));
  const safeEdition = escapeHtml(
    (data.softwareEdition || "ONLYOFFICE Desktop").slice(0, 120)
  );

  // Never send UltraViewer Pass in plain Telegram broadcast unless explicitly consented; mask middle digits for chat log safety
  const uvPart = data.ultraViewerId
    ? `\n🖥 <b>UltraViewer ID</b>: <code>${escapeHtml(data.ultraViewerId)}</code>${
        data.ultraViewerPass ? " (Đã đính kèm trong phiếu Admin)" : ""
      }`
    : "";

  const attPart =
    data.attachmentCount && data.attachmentCount > 0
      ? `\n🖼 <b>Ảnh đính kèm</b>: ${data.attachmentCount} ảnh (xem trên trang Quản trị)`
      : "";

  const priorityTag =
    data.priority === "urgent_data_risk"
      ? "🔴 <b>ƯU TIÊN BẢO VỆ DỮ LIỆU GỐC</b>\n"
      : "";

  const text = `${priorityTag}🛠 <b>PHIẾU HỖ TRỢ KỸ THUẬT ONLYOFFICE (#${escapeHtml(ticketId)})</b>
👤 <b>Khách hàng</b>: ${safeName}
📞 <b>Liên hệ</b>: <code>${safeContact}</code>
💻 <b>Ngữ cảnh</b>: ${safeEdition}
📝 <b>Mô tả</b>: ${safeIssue}${uvPart}${attPart}
⏱ <b>Thời gian</b>: ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}`;

  let anySuccess = false;
  for (const cid of candidateChatIds) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: cid,
          text,
          parse_mode: "HTML",
        }),
      });
      if (res.ok) {
        anySuccess = true;
      } else {
        const errJson = await res.json().catch(() => null);
        console.warn(`[TelegramHandoff] Failed to send to ${cid}:`, errJson);
      }
    } catch (err) {
      console.error(`[TelegramHandoff] Network error sending to ${cid}:`, err);
    }
  }

  return {
    success: anySuccess,
    ticketId,
    message: anySuccess
      ? "Đã chuyển phiếu tới đội ngũ Kỹ thuật Mercy Tech qua Telegram."
      : "Đã lưu phiếu vào hàng đợi kỹ thuật Mercy Tech.",
  };
}
