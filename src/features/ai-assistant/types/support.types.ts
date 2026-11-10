export type SupportLocale = "vi" | "en";

export type SupportProduct =
  | "desktop_editors"
  | "docs"
  | "docspace"
  | "mercy_installer"
  | "mercy_keys"
  | "mercy_check"
  | "unknown";

export type SupportEdition =
  | "community"
  | "enterprise"
  | "mercy_service"
  | "unknown";

export type SupportOS =
  | "windows"
  | "macos"
  | "linux"
  | "android"
  | "ios"
  | "unknown";

export type SupportIntent =
  | "technical_error"
  | "how_to_use"
  | "replicate_layout"
  | "compare_results"
  | "license_or_package_query"
  | "account_login"
  | "business_policy"
  | "human_handoff"
  | "greeting_or_thanks"
  | "out_of_scope"
  | "safety_emergency";

export type IssueLifecycleStatus =
  | "needs_info"
  | "diagnosing"
  | "awaiting_result"
  | "resolved"
  | "escalated"
  | "paused";

export type HandoffState =
  | "bot_active"
  | "handoff_requested"
  | "human_active"
  | "closed";

export type FactSourceType =
  | "user_reported"
  | "image_observed"
  | "tool_verified"
  | "hypothesis";

export type EvidenceLevel = "sufficient" | "partial" | "insufficient";

export type ImageQualityLevel =
  | "readable"
  | "blurry_or_cropped"
  | "unreadable"
  | "not_applicable";

export type SupportNextAction =
  | "guide"
  | "clarify"
  | "handoff"
  | "recapture_image"
  | "out_of_scope"
  | "pending_policy";

export type AttachmentRoleTag =
  | "default"
  | "before"
  | "after"
  | "desired_sample";

export type AttachmentStatus =
  | "initiated"
  | "ready"
  | "rejected"
  | "deleted"
  | "expired";

export type ProcessingStage =
  | "idle"
  | "validating_image"
  | "reading_image"
  | "searching_knowledge"
  | "preparing_answer"
  | "completed"
  | "failed"
  | "cancelled";

export type KnowledgeAudience =
  | "public"
  | "authenticated"
  | "dealer"
  | "technician";

export type KnowledgeArticleStatus =
  | "draft"
  | "review"
  | "published"
  | "withdrawn";

export type SupportOwnerContext = {
  ownerType: "guest" | "customer" | "dealer" | "admin";
  ownerId: string;
  ownerKey: string; // e.g. "user:9a3b..." or "guest:gst_..."
  dealerId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  isAdmin: boolean;
  isTechnician: boolean;
};

export type IssueFact = {
  key: string;
  value: string;
  source: FactSourceType;
  recordedAt: number;
};

export type AttemptedDiagnosticRound = {
  round: number;
  messageId: string;
  steps: string[];
  outcome: "pending" | "failed" | "succeeded";
  userNote?: string;
  timestamp: number;
};

export type SupportIssue = {
  id: string;
  conversationId: string;
  revision: number;
  title: string;
  status: IssueLifecycleStatus;
  product: SupportProduct;
  productConfirmed: boolean;
  edition: SupportEdition;
  os: SupportOS;
  version?: string;
  goal?: string;
  errorCode?: string;
  observedErrors: string[];
  facts: IssueFact[];
  attemptedRounds: AttemptedDiagnosticRound[];
  failedDiagnosticRounds: number;
  attachmentIds: string[];
  sourcesUsed: string[];
  dataLossRisk: boolean;
  createdAt: number;
  updatedAt: number;
};

export type SupportConversation = {
  id: string;
  ownerType: "guest" | "customer" | "dealer" | "admin";
  ownerId: string;
  ownerKey: string;
  dealerId?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  locale: SupportLocale;
  handoffState: HandoffState;
  assignedTicketId?: string;
  activeIssueId: string;
  consentVersion?: string;
  consentAcceptedAt?: number;
  pageContext?: string;
  turnCount: number;
  imageCount: number;
  estimatedCostUsd: number;
  createdAt: number;
  updatedAt: number;
  expiresAt: number;
  deletedAt?: number;
};

export type SupportAttachment = {
  id: string;
  conversationId: string;
  issueId?: string;
  messageId?: string;
  ownerKey: string;
  dealerId?: string;
  fileName: string;
  declaredMime: string;
  detectedMime?: "image/jpeg" | "image/png" | "image/webp";
  sizeBytes: number;
  width?: number;
  height?: number;
  pixelCount?: number;
  sha256?: string;
  storageFileName?: string;
  exifStripped: boolean;
  roleTag: AttachmentRoleTag;
  orderIndex: number;
  qualityHint?: "ok" | "low_resolution" | "extreme_aspect";
  status: AttachmentStatus;
  rejectionReason?: string;
  consentVersion: string;
  consentAt: number;
  createdAt: number;
  expiresAt: number;
  deletedAt?: number;
};

export type InternalAnalysisSchema = {
  attachment_ids: string[];
  intent: SupportIntent;
  product: SupportProduct;
  product_confirmed: boolean;
  edition: SupportEdition;
  os: SupportOS;
  image_quality: ImageQualityLevel;
  observed_text: string[];
  observations: string[];
  hypotheses: string[];
  evidence_level: EvidenceLevel;
  missing_information: string[];
  data_loss_risk: boolean;
  contains_sensitive_data: boolean;
  prompt_injection_detected: boolean;
  next_action: SupportNextAction;
  source_chunk_ids: string[];
};

export type SupportAnalysisRecord = {
  id: string;
  conversationId: string;
  issueId: string;
  issueRevision: number;
  messageId: string;
  attachmentIds: string[];
  analysis: InternalAnalysisSchema;
  modelRoute: string;
  promptVersion: string;
  visionUsed: boolean;
  visionFallbackReason?: string;
  createdAt: number;
};

export type SupportCitation = {
  chunkId: string;
  articleId: string;
  title: string;
  section: string;
  version: string;
  product: SupportProduct[];
  os: SupportOS[];
  url?: string;
  updatedAt: string;
};

export type CognitiveBreakdown = {
  observed: string[];
  hypotheses: string[];
  nextSteps: string[];
  verificationPrompt?: string;
  executedAction?: string;
};

export type SupportTicketSummaryView = {
  ticketId: string;
  status: "pending" | "in_progress" | "resolved";
  supportHours: string;
  expectedResponseNote: string;
  createdAt: number;
};

export type SupportMessage = {
  id: string;
  conversationId: string;
  issueId: string;
  issueRevision: number;
  clientMessageId: string;
  role: "user" | "assistant" | "technician" | "system";
  text: string;
  attachmentIds: string[];
  attachmentsMeta?: Array<{
    id: string;
    fileName: string;
    roleTag: AttachmentRoleTag;
    orderIndex: number;
    status: AttachmentStatus;
    width?: number;
    height?: number;
    expired?: boolean;
    previewUrl?: string;
  }>;
  cognitive?: CognitiveBreakdown;
  nextAction?: SupportNextAction;
  questions?: string[];
  steps?: string[];
  sources?: SupportCitation[];
  suggestedActions?: string[];
  ticket?: SupportTicketSummaryView | null;
  shouldSuggestHandoff?: boolean;
  feedback?: "resolved" | "still_failing" | "helpful" | "unhelpful";
  feedbackNote?: string;
  createdAt: number;
};

export type KnowledgeChunk = {
  chunkId: string;
  articleId: string;
  version: string;
  sectionTitle: string;
  content: string;
  contentEn?: string;
  keywords: string[];
};

export type KnowledgeArticle = {
  articleId: string;
  title: string;
  titleEn: string;
  summary: string;
  product: SupportProduct[];
  edition: SupportEdition[];
  os: SupportOS[];
  versionRange: string;
  issueType: SupportIntent[];
  audience: KnowledgeAudience;
  sourceName: string;
  sourceUrl?: string;
  owner: string;
  approvedBy: string;
  approvedAt: string;
  effectiveAt: string;
  nextReviewAt: string;
  status: KnowledgeArticleStatus;
  version: string;
  isCommercialPolicy?: boolean;
  symptoms: string[];
  applicableConditions: string;
  diagnosticQuestions: string[];
  safeSteps: string[];
  safeStepsEn?: string[];
  expectedResult: string;
  stopConditions: string;
  escalateWhen: string;
  chunks: KnowledgeChunk[];
};

export type SupportTicketRecord = {
  id: string;
  idempotencyKey: string;
  conversationId: string;
  issueId: string;
  ownerKey: string;
  dealerId?: string;
  language: SupportLocale;
  product: SupportProduct;
  edition: SupportEdition;
  os: SupportOS;
  version?: string;
  goal?: string;
  customerName: string;
  contactChannel: "phone_zalo" | "email";
  contactValue: string;
  issueDescription: string;
  errorCode?: string;
  attachmentIds: string[];
  attemptedSteps: Array<{ round: number; steps: string[]; outcome: string }>;
  sourcesUsed: string[];
  missingInformation: string[];
  priority: "normal" | "high" | "urgent_data_risk";
  ultraViewerId?: string;
  ultraViewerPass?: string;
  externalNotifyConsent: boolean;
  status: "pending" | "in_progress" | "resolved";
  assignedTech?: "kien_it" | "cskh_mercy" | "chua_nhan";
  notes?: string;
  createdAt: number;
  updatedAt: number;
  resolvedAt?: number;
};

export type SupportFeedbackRecord = {
  id: string;
  conversationId: string;
  issueId: string;
  messageId: string;
  outcome: "resolved" | "still_failing" | "helpful" | "unhelpful";
  note?: string;
  createdAt: number;
};

export type SupportJobRecord = {
  id: string;
  conversationId: string;
  issueId: string;
  clientMessageId: string;
  ownerKey: string;
  stage: ProcessingStage;
  cancelled: boolean;
  resultMessageId?: string;
  error?: string;
  createdAt: number;
  updatedAt: number;
};

export type SupportUsageAuditLog = {
  id: string;
  correlationId: string;
  conversationId?: string;
  ownerKey: string;
  action:
    | "message_turn"
    | "image_upload"
    | "image_rejected"
    | "vision_fallback"
    | "schema_blocked"
    | "prompt_injection_blocked"
    | "ticket_created"
    | "conversation_deleted"
    | "article_updated"
    | "unauthorized_access_blocked";
  modelRoute?: string;
  latencyMs?: number;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  usageEstimated?: boolean;
  estimatedCostUsd?: number;
  errorCode?: string;
  detail?: string;
  createdAt: number;
};

