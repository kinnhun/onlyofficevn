import { NextResponse } from "next/server";
import { sendTelegramHandoffAlert } from "@/features/ai-assistant/services/telegram-handoff.service";
import { createTicket } from "@/features/ai-assistant-admin/services/ai-admin-storage.service";
import type { HandoffRequest } from "@/features/ai-assistant/types";

export async function POST(req: Request) {
  try {
    const data: HandoffRequest = await req.json();

    if (!data.phoneOrZalo || !data.phoneOrZalo.trim()) {
      return NextResponse.json(
        { error: "Vui lòng cung cấp Số điện thoại hoặc Zalo để kỹ thuật viên liên hệ." },
        { status: 400 }
      );
    }

    if (!data.issueDescription || !data.issueDescription.trim()) {
      return NextResponse.json(
        { error: "Vui lòng mô tả ngắn gọn vấn đề máy tính cần hỗ trợ." },
        { status: 400 }
      );
    }

    // Persist ticket into admin management storage
    const savedTicket = await createTicket({
      customerName: data.customerName || "Khách truy cập Web",
      phoneOrZalo: data.phoneOrZalo.trim(),
      softwareEdition: data.softwareEdition || "OnlyOffice Desktop Windows",
      issueDescription: data.issueDescription.trim(),
      ultraViewerId: data.ultraViewerId?.trim(),
      ultraViewerPass: data.ultraViewerPass?.trim(),
    });

    const result = await sendTelegramHandoffAlert(data);
    return NextResponse.json({ ...result, ticketId: savedTicket.id });
  } catch (error) {
    return NextResponse.json(
      { error: "Không thể gửi yêu cầu hỗ trợ lúc này. Vui lòng liên hệ Hotline Zalo 0763 068 614." },
      { status: 500 }
    );
  }
}
