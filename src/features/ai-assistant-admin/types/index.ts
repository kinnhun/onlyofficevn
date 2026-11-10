export type TicketStatus = "pending" | "in_progress" | "resolved";

export type IssueCategory =
  | "cai_dat"
  | "font_chu"
  | "ban_quyen"
  | "unikey"
  | "dll"
  | "khac";

export type AssignedTech = "kien_it" | "cskh_mercy" | "chua_nhan";

export type AiTicket = {
  id: string;
  conversationId?: string;
  issueId?: string;
  customerName: string;
  phoneOrZalo: string;
  softwareEdition: string;
  product?: string;
  os?: string;
  issueDescription: string;
  issueCategory?: IssueCategory;
  assignedTech?: AssignedTech;
  ultraViewerId?: string;
  ultraViewerPass?: string;
  attachmentIds?: string[];
  attemptedStepsSummary?: string[];
  diagnosticSummary?: string;
  priority?: "normal" | "high" | "urgent_data_risk";
  status: TicketStatus;
  createdAt: number;
  updatedAt?: number;
  resolvedAt?: number;
  notes?: string;
  conversationSnippet?: string;
};

export type FaqCategory = "cai_dat" | "ban_quyen" | "tien_ich" | "sua_loi";

export type FaqArticleStatus = "draft" | "review" | "published" | "withdrawn";

export type AiFaq = {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
  status?: FaqArticleStatus;
  version?: string;
  product?: string;
  os?: string;
  audience?: "public" | "authenticated" | "dealer" | "technician";
  approvedBy?: string;
  isCommercialPolicy?: boolean;
  isPinned?: boolean;
  hitCount?: number;
  updatedAt?: number;
};

export type BotOperatingMode = "ai_full" | "text_only" | "faq_only" | "maintenance";

export type AiBotSettings = {
  isOnline: boolean;
  operatingMode: BotOperatingMode;
  visionEnabled?: boolean;
  commercialPolicyApproved?: boolean;
  offlineNotice: string;
  hotlineZalo: string;
  hotlineTech: string;
  supportHours?: string;
  consentPolicyVersion?: string;
  imageRetentionDays?: number;
  conversationRetentionDays?: number;
  maxImagesPerTurn?: number;
  maxTurnsPerHour?: number;
  maxSessionBudgetUsd?: number;
  routerBaseUrl?: string;
  routerApiKeyEncrypted?: string;
  hasRouterApiKey?: boolean;
  routerApiKeyMasked?: string;
  routerKeySource?: "admin_saved" | "env" | "unconfigured";
  modelTextRoute?: string;
  modelVisionRoute?: string;
  routerTimeoutMs?: number;
  telegramAlertsEnabled: boolean;
  telegramChatId?: string;
  systemPromptPreset?: string;
};

export type ChatLogItem = {
  id: string;
  sessionId: string;
  customerLabel: string;
  startedAt: number;
  messageCount: number;
  lastMessageSnippet: string;
  intentDetected?: string;
  handoffRequested: boolean;
  rating?: "helpful" | "unhelpful";
  messages: Array<{
    role: "user" | "assistant";
    content: string;
    timestamp: number;
  }>;
};

export type AnalyticsSummary = {
  totalChatsToday: number;
  totalChatsThisWeek: number;
  totalTicketsCreated: number;
  resolvedTicketsCount: number;
  satisfactionRate: number;
  categoryBreakdown: Record<string, number>;
  visionUploadsCount?: number;
  visionRejectedCount?: number;
  schemaBlockedCount?: number;
  providerFallbackCount?: number;
};
