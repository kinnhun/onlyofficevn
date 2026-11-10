import { ONLYOFFICE_KNOWLEDGE_BASE, type KnowledgeEntry } from "../knowledge/onlyoffice-kb";
import { createSupportConversation } from "./support-storage.service";
import { processSupportMessageTurn } from "./support-orchestrator.service";
import { generateCorrelationId, sanitizeAssistantOutput } from "./security-guard.service";
import type { ChatResponse } from "../types";
import type { SupportOwnerContext } from "../types/support.types";

export type UltraViewerDetection = {
  detected: boolean;
  id?: string;
  pass?: string;
};

export function detectUltraViewer(text: string): UltraViewerDetection {
  const clean = (text || "").replace(/[\s\-\.]/g, " ");
  const idMatch =
    clean.match(/(?:id|mã|số)\s*:?\s*(\d{7,10})/i) ||
    clean.match(/(\b\d{2,3}\s*\d{3}\s*\d{3}\b)/);
  const passMatch = clean.match(
    /(?:pass|mật khẩu|mk)\s*:?\s*([a-zA-Z0-9]{4,8})/i
  );

  if (idMatch) {
    const rawId = idMatch[1].replace(/\s+/g, "");
    const rawPass = passMatch ? passMatch[1] : undefined;
    return { detected: true, id: rawId, pass: rawPass };
  }

  return { detected: false };
}

function normalizeVietnamese(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d");
}

export function searchKnowledge(query: string): KnowledgeEntry | null {
  const normQuery = normalizeVietnamese(query || "");
  const words = normQuery.split(/\s+/).filter((w) => w.length > 1);

  let bestEntry: KnowledgeEntry | null = null;
  let maxScore = 0;

  for (const entry of ONLYOFFICE_KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of entry.keywords) {
      const normKw = normalizeVietnamese(kw);
      if (normQuery.includes(normKw)) {
        score += normKw.split(" ").length * 5;
      }
    }
    for (const word of words) {
      if (entry.keywords.some((k) => normalizeVietnamese(k).includes(word))) {
        score += 1;
      }
    }

    if (score > maxScore && score >= 4) {
      maxScore = score;
      bestEntry = entry;
    }
  }

  return bestEntry;
}

/**
 * Legacy single-turn helper kept for backward compatibility with `/api/ai-assistant/chat`.
 * Delegates through the unified support orchestrator & safety pipeline.
 */
export async function processAiMessage(
  userMessage: string,
  ownerOverride?: SupportOwnerContext
): Promise<ChatResponse> {
  const owner: SupportOwnerContext = ownerOverride || {
    ownerType: "guest",
    ownerId: "legacy_api_guest",
    ownerKey: "guest:legacy_api_guest",
    isAdmin: false,
    isTechnician: false,
  };

  const { conversation } = await createSupportConversation(owner, {
    locale: "vi",
  });

  const correlationId = generateCorrelationId();
  const result = await processSupportMessageTurn({
    owner,
    conversationId: conversation.id,
    clientMessageId: `legacy_${Date.now()}`,
    text: userMessage,
    attachmentIds: [],
    correlationId,
  });

  if (!result.ok || !result.assistantMessage) {
    const safeMsg = sanitizeAssistantOutput(
      !result.ok
        ? result.message
        : "Đã ghi nhận yêu cầu. Vui lòng thử lại hoặc bấm Gặp kỹ thuật viên để được hỗ trợ."
    );
    return {
      id: `msg_${Date.now()}`,
      content: safeMsg.text,
      sources: [],
      suggestedActions: [
        "Cài đặt phần mềm",
        "Font và tiếng Việt",
        "Tài khoản/Key Mercy",
        "Gặp kỹ thuật viên",
      ],
    };
  }

  const msg = result.assistantMessage;
  return {
    id: msg.id,
    content: msg.text,
    sources: (msg.sources || []).map((c) => ({
      id: c.chunkId,
      title: c.title,
      section: c.section,
      document: c.articleId,
      url: c.url,
      updatedAt: c.updatedAt,
    })),
    suggestedActions: msg.suggestedActions || [
      "Đã xử lý được",
      "Vẫn còn lỗi",
      "Gửi ảnh khác",
      "Gặp kỹ thuật viên",
    ],
    requiresHandoff: msg.shouldSuggestHandoff,
    cognitive: msg.cognitive,
    nextAction: msg.nextAction,
  };
}
