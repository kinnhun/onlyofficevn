"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type {
  AttachmentRoleTag,
  ProcessingStage,
  SupportConversation,
  SupportIssue,
  SupportMessage,
} from "../types/support.types";
import type { ChatMessage } from "../types";

export type PendingClientAttachment = {
  localId: string;
  file: File;
  previewObjectUrl: string;
  fileName: string;
  sizeBytes: number;
  roleTag: AttachmentRoleTag;
  status: "awaiting_consent" | "uploading" | "ready" | "error";
  serverAttachmentId?: string;
  serverPreviewUrl?: string;
  errorMessage?: string;
};

export type SupportPolicyClientInfo = {
  consentPolicyVersion: string;
  visionEnabled: boolean;
  supportHours: string;
  hotlineZalo: string;
  hotlineTech: string;
};

const ACTIVE_CONV_STORAGE_KEY = "mercy_support_active_conv_v1";
const CONSENT_STORAGE_KEY = "mercy_support_img_consent_version";

function mapSupportMessageToChatMessage(m: SupportMessage): ChatMessage {
  const rawMeta =
    m.attachmentsMeta && m.attachmentsMeta.length > 0
      ? m.attachmentsMeta
      : (m.attachmentIds || []).map((aid, idx) => ({
          id: aid,
          fileName: `Ảnh #${idx + 1}`,
          roleTag: "default" as const,
          orderIndex: idx,
          status: "ready" as const,
        }));

  const attachmentsMeta = rawMeta.map((meta) => ({
    ...meta,
    previewUrl:
      (meta as { previewUrl?: string }).previewUrl ||
      `/api/support/attachments/${meta.id}/access`,
  }));

  return {
    id: m.id,
    role: m.role,
    content: m.text,
    timestamp: m.createdAt,
    status: "success",
    sources: (m.sources || []).map((c) => ({
      id: c.chunkId,
      title: c.title,
      section: c.section,
      document: c.articleId,
      url: c.url,
      updatedAt: c.updatedAt,
    })),
    suggestedActions: m.suggestedActions,
    feedback: m.feedback,
    attachmentIds: m.attachmentIds,
    attachmentsMeta: attachmentsMeta.length > 0 ? attachmentsMeta : undefined,
    cognitive: m.cognitive,
    nextAction: m.nextAction,
    questions: m.questions,
    steps: m.steps,
    citations: m.sources,
    ticket: m.ticket,
    shouldSuggestHandoff: m.shouldSuggestHandoff,
  };
}

async function downscaleImageIfOversized(file: File): Promise<File> {
  try {
    const url = URL.createObjectURL(file);
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });
    URL.revokeObjectURL(url);

    const maxDim = 1600;
    let { width, height } = img;
    if (width <= maxDim && height <= maxDim && file.size <= 1.5 * 1024 * 1024) {
      return file;
    }

    if (width > maxDim || height > maxDim) {
      if (width > height) {
        height = Math.round((height * maxDim) / width);
        width = maxDim;
      } else {
        width = Math.round((width * maxDim) / height);
        height = maxDim;
      }
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(img, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.88)
    );
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
  } catch {
    return file;
  }
}

async function inspectImageDimensionsBrowser(
  file: File
): Promise<{ width: number; height: number } | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      URL.revokeObjectURL(url);
      resolve({ width: w, height: h });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });
}

export function useSupportChat(pageContext?: string) {
  const [conversation, setConversation] = useState<SupportConversation | null>(
    null
  );
  const [activeIssue, setActiveIssue] = useState<SupportIssue | null>(null);
  const [issues, setIssues] = useState<SupportIssue[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pendingAttachments, setPendingAttachments] = useState<
    PendingClientAttachment[]
  >([]);
  const [policy, setPolicy] = useState<SupportPolicyClientInfo>({
    consentPolicyVersion: "v1.0-2026-10-29",
    visionEnabled: true,
    supportHours: "08:00 – 17:30 (Thứ 2 – Thứ 7)",
    hotlineZalo: "0763 068 614",
    hotlineTech: "0862 497 002",
  });
  const [ownerProfile, setOwnerProfile] = useState<{
    ownerType: string;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
  }>({ ownerType: "guest" });

  const [consentAcceptedVersion, setConsentAcceptedVersion] = useState<
    string | null
  >(null);
  const [showConsentPrompt, setShowConsentPrompt] = useState(false);

  const [stage, setStage] = useState<ProcessingStage>("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const initPromiseRef = useRef<Promise<string | null> | null>(null);

  useEffect(() => {
    try {
      const savedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (savedConsent) {
        setConsentAcceptedVersion(savedConsent);
      }
    } catch {
      // Ignore storage access errors
    }
  }, []);

  const ensureConversation = useCallback(async (): Promise<string | null> => {
    if (conversation?.id) return conversation.id;
    if (initPromiseRef.current) return initPromiseRef.current;

    const promise = (async () => {
      try {
        const storedId =
          typeof window !== "undefined"
            ? sessionStorage.getItem(ACTIVE_CONV_STORAGE_KEY)
            : null;

        if (storedId) {
          const getRes = await fetch(`/api/support/conversations/${storedId}`);
          if (getRes.ok) {
            const data = await getRes.json();
            if (data.success && data.conversation) {
              setConversation(data.conversation);
              setActiveIssue(data.activeIssue || null);
              setIssues(data.issues || []);
              setMessages(
                (data.messages || []).map(mapSupportMessageToChatMessage)
              );
              if (data.policy) setPolicy(data.policy);
              if (data.conversation.consentVersion) {
                setConsentAcceptedVersion(data.conversation.consentVersion);
              }
              return String(data.conversation.id);
            }
          }
        }

        const savedConsent =
          typeof window !== "undefined"
            ? localStorage.getItem(CONSENT_STORAGE_KEY)
            : null;

        const createRes = await fetch("/api/support/conversations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            locale: "vi",
            pageContext:
              pageContext ||
              (typeof window !== "undefined"
                ? window.location.pathname
                : undefined),
            consentAccepted: Boolean(savedConsent),
          }),
        });

        if (!createRes.ok) return null;
        const created = await createRes.json();
        if (created.success && created.conversation) {
          setConversation(created.conversation);
          setActiveIssue(created.activeIssue || null);
          setIssues(created.activeIssue ? [created.activeIssue] : []);
          if (created.policy) setPolicy(created.policy);
          if (created.owner) setOwnerProfile(created.owner);
          try {
            sessionStorage.setItem(
              ACTIVE_CONV_STORAGE_KEY,
              created.conversation.id
            );
          } catch {
            // Ignore storage errors
          }
          return String(created.conversation.id);
        }
        return null;
      } catch {
        return null;
      } finally {
        initPromiseRef.current = null;
      }
    })();

    initPromiseRef.current = promise;
    return promise;
  }, [conversation?.id, pageContext]);

  useEffect(() => {
    void ensureConversation();
  }, [ensureConversation]);

  const uploadSingleAttachment = useCallback(
    async (
      item: PendingClientAttachment,
      convId: string,
      orderIndex: number,
      consentOk: boolean
    ) => {
      setPendingAttachments((prev) =>
        prev.map((p) =>
          p.localId === item.localId
            ? { ...p, status: "uploading", errorMessage: undefined }
            : p
        )
      );

      try {
        const initRes = await fetch("/api/support/uploads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversationId: convId,
            fileName: item.fileName,
            declaredMime: item.file.type || "image/png",
            sizeBytes: item.file.size,
            roleTag: item.roleTag,
            orderIndex,
            consentAccepted: consentOk,
            consentVersion: policy.consentPolicyVersion,
          }),
        });

        const initData = await initRes.json();
        if (!initRes.ok || !initData.success) {
          if (initData.code === "CONSENT_REQUIRED") {
            setShowConsentPrompt(true);
            setPendingAttachments((prev) =>
              prev.map((p) =>
                p.localId === item.localId
                  ? { ...p, status: "awaiting_consent" }
                  : p
              )
            );
            return;
          }
          throw new Error(initData.error || "Không thể khởi tạo tải ảnh.");
        }

        const form = new FormData();
        form.append("file", item.file, item.fileName);

        const compRes = await fetch(initData.uploadUrl, {
          method: "POST",
          body: form,
        });
        const compData = await compRes.json();
        if (!compRes.ok || !compData.success) {
          throw new Error(compData.error || "Tệp ảnh không hợp lệ.");
        }

        setPendingAttachments((prev) =>
          prev.map((p) =>
            p.localId === item.localId
              ? {
                  ...p,
                  status: "ready",
                  serverAttachmentId: compData.attachment.id,
                  serverPreviewUrl: compData.previewUrl,
                  errorMessage: undefined,
                }
              : p
          )
        );
      } catch (err: unknown) {
        const msg =
          err instanceof Error ? err.message : "Tải ảnh thất bại. Hãy thử lại.";
        setPendingAttachments((prev) =>
          prev.map((p) =>
            p.localId === item.localId
              ? { ...p, status: "error", errorMessage: msg }
              : p
          )
        );
      }
    },
    [policy.consentPolicyVersion]
  );

  const addFiles = useCallback(
    async (incomingFiles: FileList | File[]) => {
      setError(null);
      const filesArr = Array.from(incomingFiles);
      if (filesArr.length === 0) return;

      const remainingSlots = 3 - pendingAttachments.length;
      if (remainingSlots <= 0) {
        setError("Mỗi lượt hỗ trợ đính kèm tối đa 3 ảnh chụp màn hình.");
        return;
      }

      const selected = filesArr.slice(0, remainingSlots);
      if (filesArr.length > remainingSlots) {
        setError("Chỉ giữ lại tối đa 3 ảnh trong một lượt gửi.");
      }

      const validatedItems: PendingClientAttachment[] = [];
      let runningTotalBytes = pendingAttachments.reduce(
        (acc, p) => acc + p.sizeBytes,
        0
      );

      for (let rawFile of selected) {
        const file = await downscaleImageIfOversized(rawFile);
        const mime = (file.type || "").toLowerCase();
        if (!["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(mime)) {
          setError(
            `Tệp "${file.name}" không được hỗ trợ. Vui lòng chọn ảnh tĩnh PNG, JPG hoặc WebP (không nhận PDF, video, GIF hay file nén).`
          );
          continue;
        }
        if (file.size > 8 * 1024 * 1024) {
          setError(`Ảnh "${file.name}" vượt quá giới hạn 8 MB/ảnh.`);
          continue;
        }
        if (runningTotalBytes + file.size > 20 * 1024 * 1024) {
          setError("Tổng dung lượng ảnh trong một lượt không vượt quá 20 MB.");
          continue;
        }

        const dims = await inspectImageDimensionsBrowser(file);
        if (!dims || dims.width * dims.height > 30_000_000) {
          setError(
            `Ảnh "${file.name}" không đọc được hoặc vượt quá 30 triệu điểm ảnh.`
          );
          continue;
        }

        runningTotalBytes += file.size;
        const hasValidConsent =
          consentAcceptedVersion === policy.consentPolicyVersion;

        validatedItems.push({
          localId: `loc_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          file,
          previewObjectUrl: URL.createObjectURL(file),
          fileName: file.name || "screenshot.png",
          sizeBytes: file.size,
          roleTag: "default",
          status: hasValidConsent ? "uploading" : "awaiting_consent",
        });
      }

      if (validatedItems.length === 0) return;

      setPendingAttachments((prev) => [...prev, ...validatedItems]);

      if (consentAcceptedVersion !== policy.consentPolicyVersion) {
        setShowConsentPrompt(true);
        return;
      }

      const convId = await ensureConversation();
      if (!convId) {
        setError("Chưa khởi tạo được phiên tải ảnh. Vui lòng thử lại.");
        return;
      }

      const startIdx = pendingAttachments.length;
      await Promise.all(
        validatedItems.map((item, idx) =>
          uploadSingleAttachment(item, convId, startIdx + idx, true)
        )
      );
    },
    [
      consentAcceptedVersion,
      ensureConversation,
      pendingAttachments,
      policy.consentPolicyVersion,
      uploadSingleAttachment,
    ]
  );

  const acceptImageConsent = useCallback(async () => {
    const ver = policy.consentPolicyVersion;
    setConsentAcceptedVersion(ver);
    setShowConsentPrompt(false);
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, ver);
    } catch {
      // Ignore storage errors
    }

    const convId = await ensureConversation();
    if (!convId) return;

    await fetch(`/api/support/conversations/${convId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "accept_consent", consentVersion: ver }),
    }).catch(() => {});

    const waiting = pendingAttachments.filter(
      (p) => p.status === "awaiting_consent"
    );
    await Promise.all(
      waiting.map((item, idx) =>
        uploadSingleAttachment(item, convId, idx, true)
      )
    );
  }, [
    ensureConversation,
    pendingAttachments,
    policy.consentPolicyVersion,
    uploadSingleAttachment,
  ]);

  const declineImageConsent = useCallback(() => {
    setShowConsentPrompt(false);
    setPendingAttachments((prev) => {
      prev.forEach((p) => {
        if (p.status === "awaiting_consent") {
          URL.revokeObjectURL(p.previewObjectUrl);
        }
      });
      return prev.filter((p) => p.status !== "awaiting_consent");
    });
  }, []);

  const removePendingAttachment = useCallback((localId: string) => {
    setPendingAttachments((prev) => {
      const target = prev.find((p) => p.localId === localId);
      if (target) URL.revokeObjectURL(target.previewObjectUrl);
      return prev.filter((p) => p.localId !== localId);
    });
  }, []);

  const retryPendingAttachment = useCallback(
    async (localId: string) => {
      const targetIdx = pendingAttachments.findIndex(
        (p) => p.localId === localId
      );
      if (targetIdx < 0) return;
      const convId = await ensureConversation();
      if (!convId) return;
      await uploadSingleAttachment(
        pendingAttachments[targetIdx],
        convId,
        targetIdx,
        consentAcceptedVersion === policy.consentPolicyVersion
      );
    },
    [
      consentAcceptedVersion,
      ensureConversation,
      pendingAttachments,
      policy.consentPolicyVersion,
      uploadSingleAttachment,
    ]
  );

  const updatePendingRoleTag = useCallback(
    (localId: string, roleTag: AttachmentRoleTag) => {
      setPendingAttachments((prev) =>
        prev.map((p) => (p.localId === localId ? { ...p, roleTag } : p))
      );
    },
    []
  );

  const replaceEditedPendingFile = useCallback(
    async (localId: string, editedFile: File) => {
      const targetIdx = pendingAttachments.findIndex(
        (p) => p.localId === localId
      );
      if (targetIdx < 0) return;
      const old = pendingAttachments[targetIdx];
      URL.revokeObjectURL(old.previewObjectUrl);

      const newPreviewUrl = URL.createObjectURL(editedFile);
      const updatedItem: PendingClientAttachment = {
        ...old,
        file: editedFile,
        sizeBytes: editedFile.size,
        previewObjectUrl: newPreviewUrl,
        status:
          consentAcceptedVersion === policy.consentPolicyVersion
            ? "uploading"
            : "awaiting_consent",
        serverAttachmentId: undefined,
      };

      setPendingAttachments((prev) =>
        prev.map((p) => (p.localId === localId ? updatedItem : p))
      );

      if (consentAcceptedVersion === policy.consentPolicyVersion) {
        const convId = await ensureConversation();
        if (convId) {
          await uploadSingleAttachment(updatedItem, convId, targetIdx, true);
        }
      } else {
        setShowConsentPrompt(true);
      }
    },
    [
      consentAcceptedVersion,
      ensureConversation,
      pendingAttachments,
      policy.consentPolicyVersion,
      uploadSingleAttachment,
    ]
  );

  /**
   * Sends a user turn (text, ready images, or both).
   * Returns `true` if accepted so the input component clears the draft ONLY on success!
   */
  const sendTurn = useCallback(
    async (rawText: string): Promise<boolean> => {
      const trimmed = (rawText || "").trim();
      const readyAttachments = pendingAttachments.filter(
        (p) => p.status === "ready" && p.serverAttachmentId
      );
      const uploadingAny = pendingAttachments.some(
        (p) => p.status === "uploading" || p.status === "awaiting_consent"
      );

      if (uploadingAny) {
        setError("Vui lòng đợi ảnh hoàn tất kiểm tra hoặc xác nhận xử lý ảnh trước khi gửi.");
        return false;
      }
      if (!trimmed && readyAttachments.length === 0) return false;
      if (isLoading) return false;

      setError(null);
      const convId = await ensureConversation();
      if (!convId) {
        setError(
          "Không thể kết nối máy chủ hỗ trợ. Nội dung anh/chị đang soạn vẫn được giữ nguyên."
        );
        return false;
      }

      const clientMessageId = `cmsg_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2, 8)}`;
      const attachmentIds = readyAttachments.map((a) => a.serverAttachmentId!);

      // Optimistically render user bubble
      const tempUserId = `optim_${clientMessageId}`;
      const optimisticUser: ChatMessage = {
        id: tempUserId,
        role: "user",
        content: trimmed || "[Đã gửi ảnh chụp màn hình]",
        timestamp: Date.now(),
        status: "sending",
        attachmentIds,
        attachmentsMeta: readyAttachments.map((a, idx) => ({
          id: a.serverAttachmentId!,
          fileName: a.fileName,
          previewUrl: a.previewObjectUrl,
          roleTag: a.roleTag,
          orderIndex: idx,
          status: "ready",
        })),
      };

      setMessages((prev) => [...prev, optimisticUser]);
      setPendingAttachments([]);
      setIsLoading(true);
      setStage(
        attachmentIds.length > 0 ? "reading_image" : "searching_knowledge"
      );

      abortControllerRef.current = new AbortController();
      const stageTimer = setTimeout(() => {
        setStage("preparing_answer");
      }, 1400);

      try {
        // Read base64 payload for reliable multi-instance serverless delivery
        const inlineAttachments = await Promise.all(
          readyAttachments.map(async (a) => {
            try {
              const ab = await a.file.arrayBuffer();
              const b64 = Buffer.from(ab).toString("base64");
              return {
                id: a.serverAttachmentId!,
                fileName: a.fileName,
                mime: (a.file.type || "image/jpeg").toLowerCase(),
                roleTag: a.roleTag,
                base64: b64,
              };
            } catch {
              return null;
            }
          })
        ).then((arr) => arr.filter(Boolean));

        const res = await fetch("/api/support/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversationId: convId,
            clientMessageId,
            text: trimmed,
            attachmentIds,
            inlineAttachments,
          }),
          signal: abortControllerRef.current.signal,
        });

        clearTimeout(stageTimer);
        const data = await res.json();

        if (!res.ok || !data.success) {
          // Roll back optimistic bubble & restore attachments so user loses nothing!
          setMessages((prev) => prev.filter((m) => m.id !== tempUserId));
          setPendingAttachments(readyAttachments);
          setError(
            data.error ||
              "Chưa gửi được yêu cầu. Nội dung anh/chị đang soạn được giữ lại để thử lại."
          );
          setStage("failed");
          return false;
        }

        const savedUser = mapSupportMessageToChatMessage(data.userMessage);
        const savedAssistant = data.assistantMessage
          ? mapSupportMessageToChatMessage(data.assistantMessage)
          : null;

        // Preserve optimistic preview URL if available so local blob is kept for silky smooth instant display without network re-fetching!
        if (optimisticUser.attachmentsMeta && optimisticUser.attachmentsMeta.length > 0) {
          const optMap = new Map(optimisticUser.attachmentsMeta.map((m) => [m.id, m]));
          const baseMeta =
            savedUser.attachmentsMeta && savedUser.attachmentsMeta.length > 0
              ? savedUser.attachmentsMeta
              : optimisticUser.attachmentsMeta;
          savedUser.attachmentsMeta = baseMeta.map((m) => ({
            ...m,
            previewUrl: optMap.get(m.id)?.previewUrl || m.previewUrl,
          }));
        }

        setMessages((prev) => {
          const withoutTemp = prev.filter((m) => m.id !== tempUserId);
          return savedAssistant
            ? [...withoutTemp, savedUser, savedAssistant]
            : [...withoutTemp, savedUser];
        });

        if (data.activeIssue) {
          setActiveIssue(data.activeIssue);
        }
        if (data.handoffState && conversation) {
          setConversation({ ...conversation, handoffState: data.handoffState });
        }
        setStage("completed");
        return true;
      } catch (err: unknown) {
        clearTimeout(stageTimer);
        setMessages((prev) => prev.filter((m) => m.id !== tempUserId));
        setPendingAttachments(readyAttachments);

        if ((err as Error)?.name === "AbortError") {
          setStage("cancelled");
          setError("Đã hủy lượt gửi theo yêu cầu. Nội dung soạn thảo vẫn được giữ lại.");
        } else {
          setStage("failed");
          setError(
            "Kết nối mạng tạm gián đoạn. Nội dung và ảnh anh/chị vừa chọn vẫn được giữ nguyên để bấm Gửi lại."
          );
        }
        return false;
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [conversation, ensureConversation, isLoading, pendingAttachments]
  );

  const cancelTurn = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  const submitOutcomeFeedback = useCallback(
    async (
      messageId: string,
      outcome: "resolved" | "still_failing" | "helpful" | "unhelpful",
      note?: string
    ): Promise<{ shouldSuggestHandoff: boolean }> => {
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, feedback: outcome } : m))
      );

      if (!conversation?.id) return { shouldSuggestHandoff: false };
      try {
        const res = await fetch("/api/support/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversationId: conversation.id,
            messageId,
            outcome,
            note,
          }),
        });
        const data = await res.json();
        if (data.success && data.activeIssue) {
          setActiveIssue(data.activeIssue);
        }
        return { shouldSuggestHandoff: Boolean(data.shouldSuggestHandoff) };
      } catch {
        return { shouldSuggestHandoff: false };
      }
    },
    [conversation?.id]
  );

  const startNewIssueOrConversation = useCallback(async () => {
    setError(null);
    setPendingAttachments([]);
    try {
      sessionStorage.removeItem(ACTIVE_CONV_STORAGE_KEY);
    } catch {
      // Ignore
    }
    setConversation(null);
    setActiveIssue(null);
    setMessages([]);
    initPromiseRef.current = null;
    await ensureConversation();
  }, [ensureConversation]);

  const deleteCurrentConversation = useCallback(async () => {
    if (!conversation?.id) {
      await startNewIssueOrConversation();
      return;
    }
    try {
      await fetch(`/api/support/conversations/${conversation.id}`, {
        method: "DELETE",
      });
    } catch {
      // Ignore network error and clear client state
    }
    await startNewIssueOrConversation();
  }, [conversation?.id, startNewIssueOrConversation]);

  const markTicketCreated = useCallback((ticketId: string) => {
    setConversation((prev) =>
      prev
        ? {
            ...prev,
            handoffState: "handoff_requested",
            assignedTicketId: ticketId,
          }
        : prev
    );
  }, []);

  return {
    conversation,
    activeIssue,
    issues,
    messages,
    pendingAttachments,
    policy,
    ownerProfile,
    showConsentPrompt,
    stage,
    isLoading,
    error,
    setError,
    addFiles,
    acceptImageConsent,
    declineImageConsent,
    removePendingAttachment,
    retryPendingAttachment,
    updatePendingRoleTag,
    replaceEditedPendingFile,
    sendTurn,
    cancelTurn,
    submitOutcomeFeedback,
    startNewIssueOrConversation,
    deleteCurrentConversation,
    markTicketCreated,
  };
}

