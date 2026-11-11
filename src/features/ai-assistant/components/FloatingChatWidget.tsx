"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ConfigProvider,
  Avatar,
  Button,
  Tag,
  Tooltip,
  Card,
  Alert,
  Spin,
  Popconfirm,
  message as antMessage,
} from "antd";
import {
  RobotOutlined,
  CustomerServiceOutlined,
  FullscreenOutlined,
  CloseOutlined,
  RedoOutlined,
  DeleteOutlined,
  DownloadOutlined,
  FontSizeOutlined,
  KeyOutlined,
  PictureOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { usePathname } from "next/navigation";
import { useSupportChat } from "../hooks/useSupportChat";
import { MessageItem } from "./MessageItem";
import { ChatInput } from "./ChatInput";
import { HandoffModal } from "./HandoffModal";

const STAGE_ANNOUNCEMENTS: Record<string, string> = {
  validating_image: "Đang kiểm tra tệp ảnh...",
  reading_image: "Đang đọc nội dung ảnh chụp màn hình...",
  searching_knowledge: "Đang tra cứu tài liệu kỹ thuật...",
  preparing_answer: "Đang tổng hợp hướng dẫn từng bước...",
};

export function FloatingChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isHandoffOpen, setIsHandoffOpen] = useState(false);

  const launcherButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    conversation,
    activeIssue,
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
  } = useSupportChat(pathname || undefined);

  const closeWidgetAndRestoreFocus = useCallback(() => {
    setIsOpen(false);
    requestAnimationFrame(() => {
      launcherButtonRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
    };
    window.addEventListener("open-onlyoffice-ai-chat", handleOpenChat);
    return () => {
      window.removeEventListener("open-onlyoffice-ai-chat", handleOpenChat);
    };
  }, []);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("onlyoffice-ai-chat-state", { detail: { isOpen } })
    );
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isHandoffOpen) {
        e.preventDefault();
        closeWidgetAndRestoreFocus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isHandoffOpen, closeWidgetAndRestoreFocus]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length, isLoading, isOpen]);

  if (pathname?.includes("/tro-ly-onlyoffice") || pathname?.startsWith("/admin")) {
    return null;
  }

  const handleOutcomeAction = async (
    messageId: string,
    action: "resolved" | "still_failing" | "attach_another" | "handoff"
  ) => {
    if (action === "attach_another") {
      fileInputRef.current?.click();
      return;
    }
    if (action === "handoff") {
      setIsHandoffOpen(true);
      return;
    }
    const res = await submitOutcomeFeedback(messageId, action);
    if (action === "still_failing" && res.shouldSuggestHandoff) {
      setIsHandoffOpen(true);
    }
  };

  const handleDeleteSession = async () => {
    await deleteCurrentConversation();
    antMessage.success("Đã xóa hội thoại và lịch sử chẩn đoán.");
  };

  const handleStartNewIssue = async () => {
    await startNewIssueOrConversation();
    antMessage.info("Đã bắt đầu vấn đề mới.");
  };

  const handoffState = conversation?.handoffState || "ai_active";
  const liveStatusText = isLoading
    ? STAGE_ANNOUNCEMENTS[stage] || "Trợ lý đang xử lý yêu cầu..."
    : "";

  if (pathname?.includes("tro-ly-onlyoffice")) {
    return null;
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ea580c",
          fontFamily: "var(--font-open-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
      }}
    >
      {/* Hidden button for accessible screen reader focus */}
      <button
        ref={launcherButtonRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Mở Trợ lý kỹ thuật ONLYOFFICE"
        style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", border: 0 }}
      >
        <span>Trợ lý kỹ thuật ONLYOFFICE</span>
      </button>

      {/* Floating Chat Window (Desktop 420px, Mobile Adaptive) */}
      {isOpen && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="false"
          aria-label="Trợ lý kỹ thuật ONLYOFFICE"
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            width: "420px",
            maxWidth: "calc(100vw - 32px)",
            height: "640px",
            maxHeight: "calc(100dvh - 48px)",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(0, 0, 0, 0.08)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 100000,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "10px 12px",
              borderBottom: "1px solid #f0f0f0",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0, flex: 1 }}>
              <Avatar
                shape="square"
                size={32}
                icon={<RobotOutlined style={{ fontSize: "17px", color: "#ffffff" }} />}
                style={{
                  backgroundColor: "#ea580c",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <span
                    style={{
                      fontSize: "12.5px",
                      fontWeight: 800,
                      color: "#111827",
                      whiteSpace: "nowrap",
                      letterSpacing: "-0.2px",
                    }}
                  >
                    Trợ lý kỹ thuật ONLYOFFICE
                  </span>
                  <Tag
                    style={{
                      margin: 0,
                      fontSize: "9px",
                      fontWeight: 800,
                      padding: "0 4px",
                      lineHeight: "15px",
                      borderRadius: "4px",
                      background: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
                      color: "#ffffff",
                      border: "none",
                    }}
                  >
                    AI
                  </Tag>
                </div>
                <div
                  style={{
                    fontSize: "10.5px",
                    color: "#6b7280",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Hỗ trợ bởi Mercy Tech · Trợ lý AI
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0px", flexShrink: 0 }}>
              {messages.length > 0 && (
                <>
                  <Popconfirm
                    title="Bắt đầu vấn đề mới?"
                    description="Tạo cuộc hội thoại mới để hỏi vấn đề khác?"
                    onConfirm={() => void handleStartNewIssue()}
                    okText="Đồng ý"
                    cancelText="Hủy"
                    placement="bottomRight"
                  >
                    <Tooltip title="Bắt đầu vấn đề mới">
                      <Button
                        type="text"
                        shape="circle"
                        size="small"
                        icon={<RedoOutlined style={{ fontSize: "13px", color: "#6b7280" }} />}
                      />
                    </Tooltip>
                  </Popconfirm>

                  <Popconfirm
                    title="Xóa hội thoại?"
                    description="Xóa toàn bộ hội thoại và thu hồi quyền truy cập ảnh đã tải lên?"
                    onConfirm={() => void handleDeleteSession()}
                    okText="Xóa"
                    cancelText="Hủy"
                    okButtonProps={{ danger: true }}
                    placement="bottomRight"
                  >
                    <Tooltip title="Xóa hội thoại">
                      <Button
                        type="text"
                        shape="circle"
                        size="small"
                        danger
                        icon={<DeleteOutlined style={{ fontSize: "13px" }} />}
                      />
                    </Tooltip>
                  </Popconfirm>
                </>
              )}
              <Tooltip title="Gặp kỹ thuật viên">
                <Button
                  type="text"
                  shape="circle"
                  size="small"
                  icon={<CustomerServiceOutlined style={{ fontSize: "15px", color: "#ea580c" }} />}
                  onClick={() => setIsHandoffOpen(true)}
                />
              </Tooltip>
              <Tooltip title="Mở toàn màn hình">
                <Button
                  type="text"
                  shape="circle"
                  size="small"
                  icon={<FullscreenOutlined style={{ fontSize: "13px", color: "#6b7280" }} />}
                  href="/tro-ly-onlyoffice"
                />
              </Tooltip>
              <Tooltip title="Đóng (Esc)">
                <Button
                  type="text"
                  shape="circle"
                  size="small"
                  icon={<CloseOutlined style={{ fontSize: "13px", color: "#6b7280" }} />}
                  onClick={closeWidgetAndRestoreFocus}
                />
              </Tooltip>
            </div>
          </div>

          {/* Technician Takeover Banner */}
          {handoffState === "human_active" && (
            <Alert
              message="Kỹ thuật viên đã tiếp quản phiên hỗ trợ này. Trợ lý AI tạm dừng tự động trả lời."
              type="success"
              showIcon
              icon={<UserOutlined />}
              banner
              style={{ fontSize: "11.5px", padding: "6px 12px" }}
            />
          )}

          {handoffState === "handoff_requested" && (
            <Alert
              message={`Phiếu kỹ thuật ${conversation?.assignedTicketId ? `#${conversation.assignedTicketId}` : ""} đang chờ kỹ thuật viên tiếp nhận.`}
              type="warning"
              showIcon
              banner
              style={{ fontSize: "11.5px", padding: "6px 12px" }}
            />
          )}

          {/* Error Notice */}
          {error && (
            <Alert
              message={error}
              type="error"
              closable
              onClose={() => setError(null)}
              showIcon
              style={{ fontSize: "11.5px", margin: "6px 12px" }}
            />
          )}

          {/* Conversation Body */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px",
              backgroundColor: "#f9fafb",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              minHeight: 0,
            }}
          >
            {messages.length === 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {/* Official Greeting Card */}
                <Card
                  size="small"
                  style={{
                    borderRadius: "12px",
                    borderColor: "#e5e7eb",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
                  }}
                  styles={{
                    body: { padding: "12px 14px" },
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "#ea580c",
                      fontSize: "12px",
                      fontWeight: 700,
                      marginBottom: "6px",
                    }}
                  >
                    <RobotOutlined />
                    <span>Trợ lý AI · Mercy Tech</span>
                  </div>
                  <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.55", color: "#1f2937" }}>
                    Chào anh/chị, em là trợ lý AI hỗ trợ ONLYOFFICE của Mercy Tech. Anh/chị
                    có thể mô tả vấn đề hoặc gửi ảnh màn hình để em cùng kiểm tra.
                  </p>
                </Card>

                {/* 4 Official Initial Suggestions */}
                <div>
                  <div
                    style={{
                      fontSize: "11.5px",
                      fontWeight: 700,
                      color: "#6b7280",
                      marginBottom: "8px",
                      paddingLeft: "2px",
                    }}
                  >
                    Gợi ý hỗ trợ nhanh:
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <Button
                      block
                      onClick={() =>
                        void sendTurn(
                          "Hướng dẫn chọn và cài đặt phần mềm ONLYOFFICE đúng hệ điều hành"
                        )
                      }
                      style={{
                        height: "48px",
                        borderRadius: "12px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: "10px",
                        fontWeight: 600,
                        fontSize: "13px",
                        backgroundColor: "#ffffff",
                        borderColor: "#e0f2fe",
                        color: "#0f172a",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
                      }}
                    >
                      <span
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "8px",
                          backgroundColor: "#e0f2fe",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <DownloadOutlined style={{ color: "#0284c7", fontSize: "15px" }} />
                      </span>
                      <span>Cài đặt phần mềm</span>
                    </Button>

                    <Button
                      block
                      onClick={() =>
                        void sendTurn(
                          "Văn bản bị lỗi font tiếng Việt (.VnTime/TCVN3) hoặc gõ tiếng Việt bị nhảy chữ"
                        )
                      }
                      style={{
                        height: "48px",
                        borderRadius: "12px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: "10px",
                        fontWeight: 600,
                        fontSize: "13px",
                        backgroundColor: "#ffffff",
                        borderColor: "#ede9fe",
                        color: "#0f172a",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
                      }}
                    >
                      <span
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "8px",
                          backgroundColor: "#ede9fe",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <FontSizeOutlined style={{ color: "#7c3aed", fontSize: "15px" }} />
                      </span>
                      <span>Font và tiếng Việt</span>
                    </Button>

                    <Button
                      block
                      onClick={() =>
                        void sendTurn(
                          "Hướng dẫn tài khoản Mercy, nhập key kích hoạt hoặc dùng thử 7 ngày"
                        )
                      }
                      style={{
                        height: "48px",
                        borderRadius: "12px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: "10px",
                        fontWeight: 600,
                        fontSize: "13px",
                        backgroundColor: "#ffffff",
                        borderColor: "#fef3c7",
                        color: "#0f172a",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
                      }}
                    >
                      <span
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "8px",
                          backgroundColor: "#fef3c7",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <KeyOutlined style={{ color: "#d97706", fontSize: "15px" }} />
                      </span>
                      <span>Tài khoản/Key Mercy</span>
                    </Button>

                    <Button
                      block
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        height: "48px",
                        borderRadius: "12px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: "10px",
                        fontWeight: 700,
                        fontSize: "13px",
                        background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
                        borderColor: "#fed7aa",
                        color: "#c2410c",
                        boxShadow: "0 1px 3px rgba(234, 88, 12, 0.08)",
                      }}
                    >
                      <span
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "8px",
                          backgroundColor: "#ea580c",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <PictureOutlined style={{ color: "#ffffff", fontSize: "15px" }} />
                      </span>
                      <span>Gửi ảnh cần hỗ trợ</span>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              messages.map((m) => (
                <MessageItem
                  key={m.id}
                  message={m}
                  onSelectAction={(actionText) => void sendTurn(actionText)}
                  onOutcomeAction={handleOutcomeAction}
                  onFeedback={(msgId, rating) =>
                    void submitOutcomeFeedback(msgId, rating)
                  }
                />
              ))
            )}

            {isLoading && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  fontSize: "12px",
                  color: "#4b5563",
                }}
              >
                <Spin size="small" />
                <span>{liveStatusText}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Multimodal Input */}
          <ChatInput
            compact
            isLoading={isLoading}
            onSend={sendTurn}
            onCancel={cancelTurn}
            onOpenHandoff={() => setIsHandoffOpen(true)}
            pendingAttachments={pendingAttachments}
            onAddFiles={addFiles}
            onRemoveAttachment={removePendingAttachment}
            onRetryAttachment={retryPendingAttachment}
            onChangeRoleTag={updatePendingRoleTag}
            onReplaceEditedFile={replaceEditedPendingFile}
            showConsentPrompt={showConsentPrompt}
            consentPolicyVersion={policy.consentPolicyVersion}
            onAcceptConsent={acceptImageConsent}
            onDeclineConsent={declineImageConsent}
            visionEnabled={policy.visionEnabled}
            fileInputRefExternal={fileInputRef}
          />
        </div>
      )}

      <HandoffModal
        isOpen={isHandoffOpen}
        onClose={() => setIsHandoffOpen(false)}
        conversationId={conversation?.id}
        activeIssue={activeIssue}
        defaultCustomerName={ownerProfile.customerName}
        defaultContact={ownerProfile.customerPhone || ownerProfile.customerEmail}
        supportHours={policy.supportHours}
        onSubmitted={markTicketCreated}
      />
    </ConfigProvider>
  );
}

export default FloatingChatWidget;
