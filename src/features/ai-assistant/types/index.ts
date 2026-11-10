import type {
  AttachmentRoleTag,
  AttachmentStatus,
  CognitiveBreakdown,
  HandoffState,
  IssueLifecycleStatus,
  SupportCitation,
  SupportNextAction,
  SupportTicketSummaryView,
} from "./support.types";

export * from "./support.types";

export type MessageRole = "user" | "assistant" | "technician" | "system";

export type MessageStatus = "sending" | "success" | "error" | "cancelled";

export type IntentType =
  | "install_download"
  | "trial_activation"
  | "plugin_features"
  | "font_error"
  | "vietnamese_typing"
  | "missing_dll"
  | "math_equation"
  | "number_to_text"
  | "certificate_a4"
  | "human_handoff"
  | "general_inquiry";

export type KnowledgeSource = {
  id: string;
  title: string;
  section: string;
  document: string;
  updatedAt: string;
  version?: string;
  url?: string;
};

export type ClientPendingImage = {
  localId: string;
  file: File;
  previewUrl: string;
  fileName: string;
  sizeBytes: number;
  width?: number;
  height?: number;
  rotationDeg: number;
  redacted: boolean;
  roleTag: AttachmentRoleTag;
  uploadStatus: "pending" | "uploading" | "validating" | "ready" | "error";
  uploadedAttachmentId?: string;
  errorMessage?: string;
};

export type MessageAttachmentView = {
  id: string;
  fileName: string;
  previewUrl?: string;
  roleTag: AttachmentRoleTag;
  orderIndex: number;
  status: AttachmentStatus;
  width?: number;
  height?: number;
  expired?: boolean;
};

export type ChatMessage = {
  id: string;
  clientMessageId?: string;
  issueId?: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  status: MessageStatus;
  attachments?: MessageAttachmentView[];
  attachmentIds?: string[];
  attachmentsMeta?: Array<{
    id: string;
    fileName: string;
    previewUrl?: string;
    roleTag: AttachmentRoleTag;
    orderIndex?: number;
    status: AttachmentStatus | string;
    width?: number;
    height?: number;
    expired?: boolean;
  }>;
  cognitive?: CognitiveBreakdown;
  nextAction?: SupportNextAction;
  questions?: string[];
  steps?: string[];
  sources?: KnowledgeSource[] | SupportCitation[];
  citations?: SupportCitation[];
  suggestedActions?: string[];
  ticket?: SupportTicketSummaryView | null;
  shouldSuggestHandoff?: boolean;
  feedback?: "resolved" | "still_failing" | "helpful" | "unhelpful";
  feedbackReason?: string;
};

export type ChatSession = {
  id: string;
  title: string;
  handoffState?: HandoffState;
  issueStatus?: IssueLifecycleStatus;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
};

export type HandoffRequest = {
  idempotencyKey?: string;
  conversationId?: string;
  issueId?: string;
  customerName?: string;
  phoneOrZalo: string;
  contactChannel?: "phone_zalo" | "email";
  softwareEdition?: string;
  product?: string;
  os?: string;
  issueDescription: string;
  ultraViewerId?: string;
  ultraViewerPass?: string;
  conversationSnippet?: string;
  attachmentIds?: string[];
  attemptedStepsSummary?: string[];
  externalNotifyConsent?: boolean;
};

export type HandoffResponse = {
  success: boolean;
  ticketId: string;
  supportHours?: string;
  expectedResponseNote?: string;
  message: string;
};

export type ChatRequest = {
  message: string;
  conversationId?: string;
  issueId?: string;
  clientMessageId?: string;
  attachmentIds?: string[];
  locale?: "vi" | "en";
  pageContext?: string;
  history?: Array<{
    role: MessageRole;
    content: string;
  }>;
};

export type ChatResponse = {
  id: string;
  issueId?: string;
  issueStatus?: IssueLifecycleStatus;
  handoffState?: HandoffState;
  content: string;
  cognitive?: CognitiveBreakdown;
  nextAction?: SupportNextAction;
  questions?: string[];
  steps?: string[];
  sources: KnowledgeSource[];
  suggestedActions: string[];
  detectedIntent?: IntentType;
  requiresHandoff?: boolean;
  shouldSuggestHandoff?: boolean;
  ticket?: SupportTicketSummaryView | null;
};
