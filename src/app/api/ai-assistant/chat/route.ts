import { NextResponse } from "next/server";
import { processAiMessage, detectUltraViewer } from "@/features/ai-assistant/services/ai-engine.service";
import { sendTelegramHandoffAlert } from "@/features/ai-assistant/services/telegram-handoff.service";
import type { ChatRequest } from "@/features/ai-assistant/types";

export async function POST(req: Request) {
  try {
    const body: ChatRequest = await req.json();
    const rawMessage = (body.message || "").trim();

    if (!rawMessage) {
      return NextResponse.json(
        { error: "Tin nhắn không được để trống." },
        { status: 400 }
      );
    }

    if (rawMessage.length > 4000) {
      return NextResponse.json(
        { error: "Câu hỏi vượt quá giới hạn 4.000 ký tự. Vui lòng rút ngắn nội dung." },
        { status: 400 }
      );
    }

    const uv = detectUltraViewer(rawMessage);
    if (uv.detected && uv.id) {
      sendTelegramHandoffAlert({
        phoneOrZalo: "Gửi qua Live Chat",
        issueDescription: `Khách gửi UltraViewer trong đoạn chat: "${rawMessage.slice(0, 150)}"`,
        ultraViewerId: uv.id,
        ultraViewerPass: uv.pass,
      }).catch(() => {});
    }

    const response = await processAiMessage(rawMessage);
    return NextResponse.json(response);
  } catch (error) {
    console.error("[Chat API Error]", error);
    return NextResponse.json(
      {
        error: "Hệ thống trợ lý AI đang bận hoặc gián đoạn kết nối. Vui lòng thử lại sau giây lát.",
      },
      { status: 500 }
    );
  }
}
