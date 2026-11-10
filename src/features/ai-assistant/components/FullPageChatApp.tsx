"use client";

import React, { useState, useRef } from "react";
import {
  ConfigProvider,
  Popconfirm,
  message as antMessage,
  Button,
  Tag,
  Tooltip,
  Alert,
  Avatar,
} from "antd";
import {
  DeleteOutlined,
  RedoOutlined,
  CopyOutlined,
  CheckOutlined,
  CustomerServiceOutlined,
  ArrowLeftOutlined,
  PhoneOutlined,
  MenuOutlined,
  RobotOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { useSupportChat } from "../hooks/useSupportChat";
import { ChatSidebar } from "./ChatSidebar";
import { MessageList } from "./MessageList";
import { QuickSuggestions } from "./QuickSuggestions";
import { ChatInput } from "./ChatInput";
import { HandoffModal } from "./HandoffModal";
import Link from "next/link";

export function FullPageChatApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHandoffOpen, setIsHandoffOpen] = useState(false);
  const [copiedTranscript, setCopiedTranscript] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  } = useSupportChat("/tro-ly-onlyoffice");

  const handleCopyTranscript = () => {
    if (messages.length === 0) return;
    const transcript = messages
      .map(
        (m) =>
          `[${
            m.role === "user"
              ? "Khách hàng"
              : m.role === "technician"
              ? "Kỹ thuật viên Mercy Tech"
              : "Trợ lý kỹ thuật ONLYOFFICE (AI)"
          } - ${new Date(m.timestamp).toLocaleTimeString("vi-VN")}]:\n${m.content}\n`
      )
      .join("\n---\n\n");
    navigator.clipboard.writeText(transcript);
    setCopiedTranscript(true);
    antMessage.success("Đã sao chép nội dung hội thoại vào bộ nhớ tạm!");
    setTimeout(() => setCopiedTranscript(false), 2000);
  };

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

  const handleDeleteConversation = async () => {
    await deleteCurrentConversation();
    antMessage.success("Đã xóa hội thoại và lịch sử chẩn đoán.");
  };

  const handleStartNewIssue = async () => {
    await startNewIssueOrConversation();
    antMessage.info("Đã bắt đầu vấn đề mới.");
  };

  const handoffState = conversation?.handoffState || "ai_active";

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ea580c",
          fontFamily: "var(--font-open-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
      }}
    >
      <div className="h-[100dvh] w-screen overflow-hidden flex bg-[#F9FAFB] text-[#101828] font-sans relative">
        {/* Left Sidebar */}
        <ChatSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onNewChat={() => void startNewIssueOrConversation()}
          onSelectTopic={(query) => void sendTurn(query)}
          onTriggerAttachImage={() => fileInputRef.current?.click()}
          onOpenHandoff={() => setIsHandoffOpen(true)}
          hotlineZalo={policy.hotlineZalo}
          hotlineTech={policy.hotlineTech}
          supportHours={policy.supportHours}
        />

        {/* Main Chat Workspace */}
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-white relative">
          {/* Top App Bar */}
          <header className="h-16 px-4 sm:px-6 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 z-10">
            <div className="flex items-center gap-3 min-w-0">
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setSidebarOpen(true)}
                aria-label="Mở danh mục hỗ trợ"
                className="lg:hidden"
              />

              <div className="relative shrink-0">
                <Avatar
                  shape="square"
                  size={40}
                  icon={<RobotOutlined style={{ fontSize: "22px", color: "#ffffff" }} />}
                  style={{
                    backgroundColor: "#ea580c",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"
                  aria-hidden="true"
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-sm sm:text-base font-extrabold text-[#101828] tracking-tight truncate">
                    Trợ lý kỹ thuật ONLYOFFICE
                  </h1>
                  <Tag
                    style={{
                      margin: 0,
                      fontSize: "10px",
                      fontWeight: 800,
                      padding: "0 6px",
                      lineHeight: "16px",
                      borderRadius: "4px",
                      background: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
                      color: "#ffffff",
                      border: "none",
                    }}
                  >
                    AI
                  </Tag>
                  {activeIssue?.status === "resolved" && (
                    <Tag color="success" icon={<CheckCircleFilled />}>
                      Đã xác nhận xử lý
                    </Tag>
                  )}
                </div>
                <p className="text-[11px] text-[#475467] truncate">
                  Hỗ trợ bởi Mercy Tech · Trợ lý AI
                </p>
              </div>
            </div>

            {/* Right Header Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <Button
                type="default"
                icon={<PhoneOutlined style={{ color: "#ea580c" }} />}
                href={`tel:${(policy.hotlineZalo || "0763068614").replace(/\s+/g, "")}`}
                className="hidden xl:inline-flex"
                style={{ fontWeight: 700 }}
                title="Zalo CSKH Mercy Tech Global"
              >
                {policy.hotlineZalo || "0763 068 614"}
              </Button>

              {messages.length > 0 && (
                <>
                  <Tooltip title="Sao chép toàn bộ nội dung hội thoại">
                    <Button
                      type="default"
                      icon={copiedTranscript ? <CheckOutlined style={{ color: "#16a34a" }} /> : <CopyOutlined />}
                      onClick={handleCopyTranscript}
                      className="hidden md:inline-flex"
                    >
                      {copiedTranscript ? "Đã chép" : "Sao chép"}
                    </Button>
                  </Tooltip>

                  <Popconfirm
                    title="Bắt đầu vấn đề mới?"
                    description="Tạo cuộc hội thoại mới để hỏi vấn đề khác?"
                    onConfirm={handleStartNewIssue}
                    okText="Đồng ý"
                    cancelText="Hủy"
                    placement="bottomRight"
                  >
                    <Tooltip title="Tạo phiên hỗ trợ cho vấn đề mới">
                      <Button
                        type="default"
                        icon={<RedoOutlined />}
                        className="hidden sm:inline-flex"
                      >
                        Vấn đề mới
                      </Button>
                    </Tooltip>
                  </Popconfirm>

                  <Popconfirm
                    title="Xóa hội thoại?"
                    description="Xóa toàn bộ hội thoại này và thu hồi quyền truy cập các ảnh chụp màn hình đã tải lên?"
                    onConfirm={handleDeleteConversation}
                    okText="Xóa"
                    cancelText="Hủy"
                    okButtonProps={{ danger: true }}
                    placement="bottomRight"
                  >
                    <Tooltip title="Xóa hội thoại & thu hồi ảnh">
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        aria-label="Xóa hội thoại và ảnh đã tải lên"
                      />
                    </Tooltip>
                  </Popconfirm>
                </>
              )}

              <Button
                type="primary"
                icon={<CustomerServiceOutlined />}
                onClick={() => setIsHandoffOpen(true)}
                style={{
                  background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                  border: "none",
                  fontWeight: 700,
                  boxShadow: "0 2px 8px rgba(234, 88, 12, 0.25)",
                }}
              >
                <span className="hidden sm:inline">Gặp kỹ thuật viên</span>
                <span className="sm:hidden">Kỹ thuật</span>
              </Button>

              <Button
                type="default"
                icon={<ArrowLeftOutlined />}
                href="/"
                className="hidden lg:inline-flex"
              >
                Trang chủ
              </Button>
            </div>
          </header>

          {/* Technician Takeover Banner */}
          {handoffState === "human_active" && (
            <Alert
              message="Kỹ thuật viên Mercy Tech đã tiếp quản phiên hỗ trợ này. Trợ lý AI đã tạm dừng tự động phản hồi."
              type="success"
              showIcon
              banner
              style={{ fontSize: "12px", padding: "8px 16px" }}
            />
          )}

          {handoffState === "handoff_requested" && (
            <Alert
              message={`Đã chuyển yêu cầu ${conversation?.assignedTicketId ? `(#${conversation.assignedTicketId})` : ""} sang kỹ thuật viên kèm tóm tắt chẩn đoán. Giờ làm việc: ${policy.supportHours}.`}
              type="warning"
              showIcon
              banner
              style={{ fontSize: "12px", padding: "8px 16px" }}
            />
          )}

          {/* Global Error Banner (preserves draft) */}
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              closable
              onClose={() => setError(null)}
              banner
              style={{ fontSize: "12px", padding: "8px 16px" }}
            />
          )}

        {/* Scrollable Message List with Official Welcome State */}
        <MessageList
          messages={messages}
          isLoading={isLoading}
          stage={stage}
          onSelectAction={(actionText) => void sendTurn(actionText)}
          onTriggerAttachImage={() => fileInputRef.current?.click()}
          onOutcomeAction={handleOutcomeAction}
          onFeedback={(msgId, rating) =>
            void submitOutcomeFeedback(msgId, rating)
          }
        />

        {/* Quick Suggestion Chips */}
        <QuickSuggestions
          disabled={isLoading}
          onSelect={(query) => void sendTurn(query)}
          onAttachImage={() => fileInputRef.current?.click()}
        />

        {/* Multimodal Input Dock */}
        <ChatInput
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
      </main>

      {/* Technician Handoff Modal */}
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
    </div>
  </ConfigProvider>
  );
}
