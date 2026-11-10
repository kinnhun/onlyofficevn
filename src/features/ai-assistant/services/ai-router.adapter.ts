import { getBotSettings, getEffectiveRouterConfig } from "@/features/ai-assistant-admin/services/ai-admin-storage.service";
import type {
  EvidenceLevel,
  ImageQualityLevel,
  InternalAnalysisSchema,
  SupportEdition,
  SupportIntent,
  SupportNextAction,
  SupportOS,
  SupportProduct,
} from "../types/support.types";

export const PROMPT_SCHEMA_VERSION = "mercy-oo-support-v1.0-2026-10-29";

export type StructuredModelTurnOutput = {
  analysis: InternalAnalysisSchema;
  reply_text: string;
  steps: string[];
  questions: string[];
  verification_prompt?: string;
};

export type RouterUsageMetrics = {
  modelRoute: string;
  latencyMs: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  usageEstimated: boolean;
  estimatedCostUsd: number;
};

export type RouterCallResult =
  | {
      ok: true;
      data: StructuredModelTurnOutput;
      usage: RouterUsageMetrics;
      repairedSchema: boolean;
    }
  | {
      ok: false;
      reason:
        | "VISION_DISABLED"
        | "ROUTER_UNCONFIGURED"
        | "ROUTER_UNAUTHORIZED"
        | "ROUTER_TIMEOUT"
        | "ROUTER_HTTP_ERROR"
        | "VISION_UNSUPPORTED"
        | "SCHEMA_INVALID";
      visionUnavailable: boolean;
      httpStatus?: number;
      latencyMs: number;
      modelRoute: string;
      detail: string;
    };

export type ChatCompletionTransportRequest = {
  url: string;
  apiKey: string;
  timeoutMs: number;
  body: Record<string, unknown>;
};

export type ChatCompletionTransportResponse = {
  ok: boolean;
  status: number;
  json?: Record<string, unknown>;
  rawText?: string;
};

type CustomTransportFn = (
  req: ChatCompletionTransportRequest
) => Promise<ChatCompletionTransportResponse>;

let customTransportOverride: CustomTransportFn | null = null;

/**
 * Allows deterministic server-side integration tests for malformed schema, timeouts, and vision errors.
 */
export function setAiRouterTransportForTesting(
  fn: CustomTransportFn | null
): void {
  customTransportOverride = fn;
}

const VALID_INTENTS = new Set<SupportIntent>([
  "technical_error",
  "how_to_use",
  "replicate_layout",
  "compare_results",
  "license_or_package_query",
  "account_login",
  "business_policy",
  "human_handoff",
  "greeting_or_thanks",
  "out_of_scope",
  "safety_emergency",
]);

const VALID_PRODUCTS = new Set<SupportProduct>([
  "desktop_editors",
  "docs",
  "docspace",
  "mercy_installer",
  "mercy_keys",
  "mercy_check",
  "unknown",
]);

const VALID_EDITIONS = new Set<SupportEdition>([
  "community",
  "enterprise",
  "mercy_service",
  "unknown",
]);

const VALID_OS = new Set<SupportOS>([
  "windows",
  "macos",
  "linux",
  "android",
  "ios",
  "unknown",
]);

const VALID_IMAGE_QUALITY = new Set<ImageQualityLevel>([
  "readable",
  "blurry_or_cropped",
  "unreadable",
  "not_applicable",
]);

const VALID_EVIDENCE = new Set<EvidenceLevel>([
  "sufficient",
  "partial",
  "insufficient",
]);

const VALID_NEXT_ACTIONS = new Set<SupportNextAction>([
  "guide",
  "clarify",
  "handoff",
  "recapture_image",
  "out_of_scope",
  "pending_policy",
]);

function extractJsonObjectString(raw: string): string | null {
  const trimmed = (raw || "").trim();
  if (!trimmed) return null;

  // Strip ```json ... ``` fences if present
  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenceMatch ? fenceMatch[1].trim() : trimmed;

  const firstBrace = candidate.indexOf("{");
  const lastBrace = candidate.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    return null;
  }
  return candidate.slice(firstBrace, lastBrace + 1);
}

function toStringArray(val: unknown, maxItems = 8): string[] {
  if (!Array.isArray(val)) return [];
  return val
    .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    .map((s) => s.trim().slice(0, 500))
    .slice(0, maxItems);
}

export function validateStructuredModelOutput(
  rawContent: string,
  expectedAttachmentIds: string[]
): { ok: true; value: StructuredModelTurnOutput } | { ok: false; error: string } {
  const trimmedRaw = (rawContent || "").trim();
  const jsonSlice = extractJsonObjectString(trimmedRaw);

  if (!jsonSlice) {
    // If a model on 9Router replies with clean natural text (whether text-only or vision, >= 20 chars), accept it gracefully!
    if (
      trimmedRaw.length >= 20 &&
      !trimmedRaw.startsWith("{") &&
      !/^<(!doctype|html)/i.test(trimmedRaw)
    ) {
      const stepMatches = Array.from(
        trimmedRaw.matchAll(/(?:^|\n)\s*(?:[0-9]+[.)]|Bước\s*[0-9]+:?)\s*([^\n]+)/gi)
      )
        .map((m) => m[1]?.trim())
        .filter((s) => Boolean(s) && s.length >= 5)
        .slice(0, 4);

      return {
        ok: true,
        value: {
          analysis: {
            attachment_ids: expectedAttachmentIds,
            intent: expectedAttachmentIds.length > 0 ? "technical_error" : "how_to_use",
            product: "unknown",
            product_confirmed: false,
            edition: "unknown",
            os: "unknown",
            image_quality: expectedAttachmentIds.length > 0 ? "readable" : "not_applicable",
            observed_text: [],
            observations:
              expectedAttachmentIds.length > 0
                ? ["Phân tích trực tiếp từ ảnh chụp màn hình bằng mô hình AI"]
                : [],
            hypotheses: [],
            evidence_level: "sufficient",
            missing_information: [],
            data_loss_risk: false,
            contains_sensitive_data: false,
            prompt_injection_detected: false,
            next_action: stepMatches.length > 0 ? "guide" : "clarify",
            source_chunk_ids: [],
          },
          reply_text: trimmedRaw,
          steps: stepMatches,
          questions: [],
        },
      };
    }
    return { ok: false, error: "Response does not contain a JSON object or valid text" };
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(jsonSlice) as Record<string, unknown>;
  } catch (err: unknown) {
    return {
      ok: false,
      error: `Invalid JSON syntax: ${err instanceof Error ? err.message : "parse error"}`,
    };
  }

  const rawAnalysis =
    parsed.analysis && typeof parsed.analysis === "object"
      ? (parsed.analysis as Record<string, unknown>)
      : parsed;

  const replyCandidate =
    typeof parsed.reply_text === "string"
      ? parsed.reply_text
      : typeof parsed.reply === "string"
      ? parsed.reply
      : typeof parsed.answer === "string"
      ? parsed.answer
      : typeof parsed.message === "string"
      ? parsed.message
      : "";
  const replyText = replyCandidate.trim();
  if (!replyText || replyText.length < 4) {
    return { ok: false, error: "Missing or empty reply_text field" };
  }

  const intentCandidate = String(rawAnalysis.intent || "").trim().toLowerCase();
  let intentRaw: SupportIntent = "how_to_use";
  if (VALID_INTENTS.has(intentCandidate as SupportIntent)) {
    intentRaw = intentCandidate as SupportIntent;
  } else if (/\b(price|pricing|cost|fee|buy|mua|gia|policy|commercial|sale|sales)\b/i.test(intentCandidate)) {
    intentRaw = "business_policy";
  } else if (/\b(license|package|key|sticker|active|activation)\b/i.test(intentCandidate)) {
    intentRaw = "license_or_package_query";
  } else if (/\b(greet|hello|hi|thanks|chao|cam on)\b/i.test(intentCandidate)) {
    intentRaw = "greeting_or_thanks";
  } else if (/\b(handoff|human|agent|operator|technician|ky thuat)\b/i.test(intentCandidate)) {
    intentRaw = "human_handoff";
  } else if (/\b(login|sign|auth|password|account|mat khau)\b/i.test(intentCandidate)) {
    intentRaw = "account_login";
  } else if (/\b(error|bug|issue|crash|fail|broken|loi|troubleshoot)\b/i.test(intentCandidate)) {
    intentRaw = "technical_error";
  } else if (/\b(safe|harm|emergency|suicide)\b/i.test(intentCandidate)) {
    intentRaw = "safety_emergency";
  } else if (/\b(scope|out_of_scope|unrelated)\b/i.test(intentCandidate)) {
    intentRaw = "out_of_scope";
  } else {
    intentRaw = "how_to_use";
  }

  const prodCandidate = String(rawAnalysis.product || "unknown").trim().toLowerCase();
  const productRaw: SupportProduct = VALID_PRODUCTS.has(prodCandidate as SupportProduct)
    ? (prodCandidate as SupportProduct)
    : prodCandidate.includes("desktop") || prodCandidate === "onlyoffice"
    ? "desktop_editors"
    : prodCandidate.includes("install")
    ? "mercy_installer"
    : prodCandidate.includes("key") || prodCandidate.includes("license")
    ? "mercy_keys"
    : "unknown";

  const edCandidate = String(rawAnalysis.edition || "unknown").trim().toLowerCase();
  const editionRaw: SupportEdition = VALID_EDITIONS.has(edCandidate as SupportEdition)
    ? (edCandidate as SupportEdition)
    : edCandidate.includes("mercy")
    ? "mercy_service"
    : "unknown";

  const osCandidate = String(rawAnalysis.os || "unknown").trim().toLowerCase();
  const osRaw: SupportOS = VALID_OS.has(osCandidate as SupportOS)
    ? (osCandidate as SupportOS)
    : osCandidate.startsWith("win")
    ? "windows"
    : osCandidate.startsWith("mac") || osCandidate === "osx"
    ? "macos"
    : osCandidate.includes("ubuntu") || osCandidate.includes("debian")
    ? "linux"
    : "unknown";

  const rawQual = String(
    rawAnalysis.image_quality ||
      (expectedAttachmentIds.length > 0 ? "readable" : "not_applicable")
  ).toLowerCase();
  const qualityMapped =
    rawQual === "clear" || rawQual === "good" || rawQual === "ok"
      ? "readable"
      : rawQual === "blurry" || rawQual === "cropped" || rawQual === "low_res"
      ? "blurry_or_cropped"
      : rawQual === "none" || rawQual === ""
      ? "not_applicable"
      : rawQual;
  const qualityRaw: ImageQualityLevel = VALID_IMAGE_QUALITY.has(
    qualityMapped as ImageQualityLevel
  )
    ? (qualityMapped as ImageQualityLevel)
    : expectedAttachmentIds.length > 0
    ? "readable"
    : "not_applicable";

  const rawEv = String(rawAnalysis.evidence_level || "sufficient").toLowerCase();
  const evMapped =
    rawEv === "observed_from_image" || rawEv === "confirmed" || rawEv === "high"
      ? "sufficient"
      : rawEv === "medium" || rawEv === "inferred"
      ? "partial"
      : rawEv === "low" || rawEv === "none"
      ? "insufficient"
      : rawEv;
  const evidenceRaw: EvidenceLevel = VALID_EVIDENCE.has(evMapped as EvidenceLevel)
    ? (evMapped as EvidenceLevel)
    : "sufficient";

  const nextCandidate = String(rawAnalysis.next_action || "guide").trim().toLowerCase();
  const nextActionRaw: SupportNextAction = VALID_NEXT_ACTIONS.has(
    nextCandidate as SupportNextAction
  )
    ? (nextCandidate as SupportNextAction)
    : "guide";

  const analysis: InternalAnalysisSchema = {
    attachment_ids: expectedAttachmentIds,
    intent: intentRaw,
    product: productRaw,
    product_confirmed: Boolean(rawAnalysis.product_confirmed),
    edition: editionRaw,
    os: osRaw,
    image_quality: qualityRaw,
    observed_text: toStringArray(rawAnalysis.observed_text, 10),
    observations: toStringArray(rawAnalysis.observations, 8),
    hypotheses: toStringArray(rawAnalysis.hypotheses, 5),
    evidence_level: evidenceRaw,
    missing_information: toStringArray(rawAnalysis.missing_information, 4),
    data_loss_risk: Boolean(rawAnalysis.data_loss_risk),
    contains_sensitive_data: Boolean(rawAnalysis.contains_sensitive_data),
    prompt_injection_detected: Boolean(rawAnalysis.prompt_injection_detected),
    next_action: nextActionRaw,
    source_chunk_ids: toStringArray(rawAnalysis.source_chunk_ids, 6),
  };

  return {
    ok: true,
    value: {
      analysis,
      reply_text: replyText,
      steps: toStringArray(parsed.steps, 3),
      questions: toStringArray(parsed.questions, 2),
      verification_prompt:
        typeof parsed.verification_prompt === "string"
          ? parsed.verification_prompt.trim().slice(0, 300)
          : undefined,
    },
  };
}

async function executeTransportWithPolicy(
  req: ChatCompletionTransportRequest
): Promise<ChatCompletionTransportResponse> {
  if (customTransportOverride) {
    return customTransportOverride(req);
  }

  // Max 1 retry on 5xx or transient network failure; 0 retries on 4xx
  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), req.timeoutMs);

    try {
      const response = await fetch(req.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${req.apiKey}`,
        },
        body: JSON.stringify(req.body),
        signal: controller.signal,
      });

      clearTimeout(timer);
      const rawText = await response.text();
      let json: Record<string, unknown> | undefined;
      try {
        json = JSON.parse(rawText) as Record<string, unknown>;
      } catch {
        json = undefined;
      }

      if (response.ok) {
        return { ok: true, status: response.status, json, rawText };
      }

      // 4xx -> Never retry
      if (response.status >= 400 && response.status < 500) {
        return { ok: false, status: response.status, json, rawText };
      }

      // 5xx -> Retry once if attempt === 0
      if (attempt === 0) {
        continue;
      }
      return { ok: false, status: response.status, json, rawText };
    } catch (err: unknown) {
      clearTimeout(timer);
      const isAbort =
        err instanceof Error &&
        (err.name === "AbortError" || err.message.includes("aborted"));
      if (isAbort) {
        return { ok: false, status: 408, rawText: "TIMEOUT" };
      }
      if (attempt === 0) {
        continue;
      }
      return {
        ok: false,
        status: 503,
        rawText: err instanceof Error ? err.message : "NETWORK_ERROR",
      };
    }
  }

  return { ok: false, status: 503, rawText: "UNREACHABLE" };
}

function computeUsageMetrics(
  json: Record<string, unknown> | undefined,
  modelRoute: string,
  latencyMs: number,
  approxPromptChars: number,
  approxOutputChars: number,
  imageCount: number
): RouterUsageMetrics {
  const usageObj =
    json?.usage && typeof json.usage === "object"
      ? (json.usage as Record<string, unknown>)
      : undefined;

  const hasProviderTokens =
    usageObj &&
    typeof usageObj.prompt_tokens === "number" &&
    typeof usageObj.completion_tokens === "number";

  const promptTokens = hasProviderTokens
    ? Number(usageObj!.prompt_tokens)
    : Math.ceil(approxPromptChars / 4) + imageCount * 765;
  const completionTokens = hasProviderTokens
    ? Number(usageObj!.completion_tokens)
    : Math.ceil(approxOutputChars / 4);
  const totalTokens = promptTokens + completionTokens;

  // Conservative cost estimation ($0.0015 / 1k prompt, $0.004 / 1k completion)
  const estimatedCostUsd = Number(
    ((promptTokens / 1000) * 0.0015 + (completionTokens / 1000) * 0.004).toFixed(
      6
    )
  );

  return {
    modelRoute,
    latencyMs,
    promptTokens,
    completionTokens,
    totalTokens,
    usageEstimated: !hasProviderTokens,
    estimatedCostUsd,
  };
}

function extractAssistantText(json: Record<string, unknown> | undefined): string {
  if (!json) return "";
  const choices = Array.isArray(json.choices) ? json.choices : [];
  if (choices.length === 0) return "";
  const first = choices[0] as Record<string, unknown>;
  const message =
    first.message && typeof first.message === "object"
      ? (first.message as Record<string, unknown>)
      : undefined;
  if (!message) return "";
  if (typeof message.content === "string") {
    return message.content;
  }
  if (Array.isArray(message.content)) {
    return message.content
      .map((part) =>
        part && typeof part === "object" && typeof (part as Record<string, unknown>).text === "string"
          ? String((part as Record<string, unknown>).text)
          : ""
      )
      .join("\n");
  }
  return "";
}

export async function invokeAiRouterStructured(params: {
  systemPrompt: string;
  userPrompt: string;
  attachments?: Array<{
    id: string;
    mime: "image/jpeg" | "image/png" | "image/webp";
    roleTag: string;
    buffer: Buffer;
  }>;
}): Promise<RouterCallResult> {
  const startedAt = Date.now();
  const [settings, routerCfg] = await Promise.all([
    getBotSettings(),
    getEffectiveRouterConfig(),
  ]);
  const attachments = params.attachments || [];
  const hasImages = attachments.length > 0;

  const baseUrl = routerCfg.baseUrl;
  const apiKey = routerCfg.apiKey;
  const modelRoute = hasImages
    ? routerCfg.modelVisionRoute
    : routerCfg.modelTextRoute;

  const timeoutMs = Math.max(routerCfg.timeoutMs, 25000);

  if (settings.operatingMode === "faq_only") {
    return {
      ok: false,
      reason: "ROUTER_UNCONFIGURED",
      visionUnavailable: hasImages,
      latencyMs: Date.now() - startedAt,
      modelRoute,
      detail: "Operating mode is set to faq_only by administrator.",
    };
  }

  // 1. Check Admin vision / mode switches BEFORE calling upstream
  if (
    hasImages &&
    (settings.visionEnabled === false || settings.operatingMode === "text_only")
  ) {
    return {
      ok: false,
      reason: "VISION_DISABLED",
      visionUnavailable: true,
      latencyMs: Date.now() - startedAt,
      modelRoute,
      detail: "Image analysis is currently disabled by administrator configuration.",
    };
  }

  // 2. Check missing or unconfigured placeholder key (unless custom test transport is active)
  if (!customTransportOverride && !routerCfg.hasValidKey) {
    return {
      ok: false,
      reason: "ROUTER_UNCONFIGURED",
      visionUnavailable: hasImages,
      latencyMs: Date.now() - startedAt,
      modelRoute,
      detail:
        "AI_ROUTER_API_KEY is missing or still set to placeholder value on server.",
    };
  }

  // 3. Build OpenAI-compatible payload (multimodal content array when images exist)
  const userMessageContent = hasImages
    ? [
        { type: "text", text: params.userPrompt },
        ...attachments.map((att) => ({
          type: "image_url",
          image_url: {
            url: `data:${att.mime};base64,${att.buffer.toString("base64")}`,
            detail: "high",
          },
        })),
      ]
    : params.userPrompt;

  const url = `${baseUrl}/chat/completions`;
  const firstRes = await executeTransportWithPolicy({
    url,
    apiKey: apiKey || "test-key",
    timeoutMs,
    body: {
      model: modelRoute,
      temperature: 0.15,
      max_tokens: 1200,
      messages: [
        { role: "system", content: params.systemPrompt },
        { role: "user", content: userMessageContent },
      ],
    },
  });

  const latencyMs = Date.now() - startedAt;

  if (!firstRes.ok) {
    if (firstRes.status === 401 || firstRes.status === 403) {
      return {
        ok: false,
        reason: "ROUTER_UNAUTHORIZED",
        visionUnavailable: hasImages,
        httpStatus: firstRes.status,
        latencyMs,
        modelRoute,
        detail: "AI Router rejected API key (HTTP 401/403).",
      };
    }
    if (firstRes.status === 408) {
      return {
        ok: false,
        reason: "ROUTER_TIMEOUT",
        visionUnavailable: hasImages,
        httpStatus: 408,
        latencyMs,
        modelRoute,
        detail: `AI Router exceeded ${timeoutMs}ms timeout.`,
      };
    }
    const rawLower = (firstRes.rawText || "").toLowerCase();
    if (
      hasImages &&
      (rawLower.includes("image") ||
        rawLower.includes("vision") ||
        rawLower.includes("multimodal"))
    ) {
      return {
        ok: false,
        reason: "VISION_UNSUPPORTED",
        visionUnavailable: true,
        httpStatus: firstRes.status,
        latencyMs,
        modelRoute,
        detail: "Configured model route does not support image_url input.",
      };
    }
    return {
      ok: false,
      reason: "ROUTER_HTTP_ERROR",
      visionUnavailable: hasImages,
      httpStatus: firstRes.status,
      latencyMs,
      modelRoute,
      detail: `AI Router HTTP ${firstRes.status}`,
    };
  }

  const rawAssistant = extractAssistantText(firstRes.json);
  const attachmentIds = attachments.map((a) => a.id);
  const firstValidation = validateStructuredModelOutput(
    rawAssistant,
    attachmentIds
  );

  if (firstValidation.ok) {
    return {
      ok: true,
      data: firstValidation.value,
      usage: computeUsageMetrics(
        firstRes.json,
        modelRoute,
        latencyMs,
        params.systemPrompt.length + params.userPrompt.length,
        rawAssistant.length,
        attachments.length
      ),
      repairedSchema: false,
    };
  }

  // 4. One-attempt JSON Schema Repair (Section 18.2) — text-only repair of the malformed output
  const repairRes = await executeTransportWithPolicy({
    url,
    apiKey: apiKey || "test-key",
    timeoutMs: Math.min(timeoutMs, 6000),
    body: {
      model: settings.modelTextRoute || process.env.AI_ROUTER_MODEL || modelRoute,
      temperature: 0,
      max_tokens: 1000,
      messages: [
        {
          role: "system",
          content:
            "Convert the provided draft into strictly valid JSON matching { \"analysis\": { \"intent\", \"product\", \"product_confirmed\", \"edition\", \"os\", \"image_quality\", \"observed_text\", \"observations\", \"hypotheses\", \"evidence_level\", \"missing_information\", \"data_loss_risk\", \"contains_sensitive_data\", \"prompt_injection_detected\", \"next_action\", \"source_chunk_ids\" }, \"reply_text\": string, \"steps\": string[], \"questions\": string[] }. Output JSON ONLY.",
        },
        {
          role: "user",
          content: `Validation error: ${firstValidation.error}\n\nMalformed draft:\n${rawAssistant.slice(0, 3000)}`,
        },
      ],
    },
  });

  if (repairRes.ok) {
    const repairedText = extractAssistantText(repairRes.json);
    const secondValidation = validateStructuredModelOutput(
      repairedText,
      attachmentIds
    );
    if (secondValidation.ok) {
      return {
        ok: true,
        data: secondValidation.value,
        usage: computeUsageMetrics(
          repairRes.json,
          modelRoute,
          Date.now() - startedAt,
          params.systemPrompt.length + params.userPrompt.length,
          repairedText.length,
          attachments.length
        ),
        repairedSchema: true,
      };
    }
  }

  return {
    ok: false,
    reason: "SCHEMA_INVALID",
    visionUnavailable: hasImages,
    latencyMs: Date.now() - startedAt,
    modelRoute,
    detail: firstValidation.error,
  };
}

export async function testAiRouterLiveConnection(overrides?: {
  baseUrl?: string;
  apiKey?: string;
  model?: string;
}): Promise<{
  ok: boolean;
  status: number;
  latencyMs: number;
  baseUrl: string;
  modelTested: string;
  keySource: string;
  availableModels: string[];
  sampleReply?: string;
  errorDetail?: string;
}> {
  const startedAt = Date.now();
  const effective = await getEffectiveRouterConfig();

  const baseUrl = (overrides?.baseUrl || effective.baseUrl)
    .trim()
    .replace(/\/+$/, "");
  const draftKey = (overrides?.apiKey || "").trim();
  const apiKey =
    draftKey && draftKey !== "your-9router-api-key" ? draftKey : effective.apiKey;
  const keySource =
    draftKey && draftKey !== "your-9router-api-key"
      ? "draft_input"
      : effective.source;

  let modelToTest = (overrides?.model || effective.modelTextRoute || "test").trim();
  const availableModels: string[] = [];

  if (!apiKey) {
    return {
      ok: false,
      status: 401,
      latencyMs: Date.now() - startedAt,
      baseUrl,
      modelTested: modelToTest,
      keySource: "unconfigured",
      availableModels: [],
      errorDetail:
        "Chưa có API Key thật của 9Router (hiện đang để trống hoặc vẫn là chữ mẫu 'your-9router-api-key'). Vui lòng mở trang quản trị 9Router -> mục API Keys -> tạo key thật và dán vào ô API Key.",
    };
  }

  // Step 1: Fetch /models to discover valid combos/models on 9Router
  try {
    const modelsCtrl = new AbortController();
    const t1 = setTimeout(() => modelsCtrl.abort(), 6000);
    const modelsRes = await fetch(`${baseUrl}/models`, {
      method: "GET",
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: modelsCtrl.signal,
    });
    clearTimeout(t1);
    if (modelsRes.ok) {
      const mJson = (await modelsRes.json().catch(() => null)) as {
        data?: Array<{ id?: string }>;
      } | null;
      if (Array.isArray(mJson?.data)) {
        for (const item of mJson.data) {
          if (typeof item?.id === "string" && item.id.trim()) {
            availableModels.push(item.id.trim());
          }
        }
      }
      if (
        availableModels.length > 0 &&
        !availableModels.includes(modelToTest) &&
        modelToTest === "test"
      ) {
        modelToTest = availableModels[0];
      }
    } else if (modelsRes.status === 401 || modelsRes.status === 403) {
      const rawErr = await modelsRes.text().catch(() => "");
      return {
        ok: false,
        status: modelsRes.status,
        latencyMs: Date.now() - startedAt,
        baseUrl,
        modelTested: modelToTest,
        keySource,
        availableModels: [],
        errorDetail: `Máy chủ 9Router từ chối API Key (HTTP ${modelsRes.status}): ${rawErr || "API key không hợp lệ hoặc chưa cấp quyền remote access"}`,
      };
    }
  } catch (err) {
    return {
      ok: false,
      status: 503,
      latencyMs: Date.now() - startedAt,
      baseUrl,
      modelTested: modelToTest,
      keySource,
      availableModels: [],
      errorDetail: `Không thể kết nối mạng tới ${baseUrl}: ${err instanceof Error ? err.message : "Network timeout"}`,
    };
  }

  // Step 2: Smoke test POST /chat/completions
  const chatRes = await executeTransportWithPolicy({
    url: `${baseUrl}/chat/completions`,
    apiKey,
    timeoutMs: 9000,
    body: {
      model: modelToTest,
      temperature: 0.1,
      max_tokens: 120,
      messages: [
        {
          role: "user",
          content:
            "Trả lời ngắn gọn 1 câu tiếng Việt xác nhận kết nối trợ lý AI ONLYOFFICE Mercy Tech hoạt động tốt.",
        },
      ],
    },
  });

  const latencyMs = Date.now() - startedAt;
  if (!chatRes.ok) {
    return {
      ok: false,
      status: chatRes.status,
      latencyMs,
      baseUrl,
      modelTested: modelToTest,
      keySource,
      availableModels,
      errorDetail: `Gọi /chat/completions với model '${modelToTest}' thất bại (HTTP ${chatRes.status}): ${(chatRes.rawText || "").slice(0, 260)}`,
    };
  }

  const reply = extractAssistantText(chatRes.json);
  return {
    ok: true,
    status: chatRes.status,
    latencyMs,
    baseUrl,
    modelTested: modelToTest,
    keySource,
    availableModels,
    sampleReply: reply.slice(0, 300),
  };
}

