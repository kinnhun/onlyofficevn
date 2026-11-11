"use client";

import React, { useState, useRef } from "react";
import {
  ConfigProvider,
  Layout,
  Drawer,
  Popconfirm,
  message as antMessage,
  Button,
  Tag,
  Tooltip,
  Alert,
  Avatar,
  Badge,
  Space,
  Grid,
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
import Link from "next/link";
import { useSupportChat } from "../hooks/useSupportChat";
import { ChatSidebar } from "./ChatSidebar";
import { MessageList } from "./MessageList";
import { QuickSuggestions } from "./QuickSuggestions";
import { ChatInput } from "./ChatInput";
import { HandoffModal } from "./HandoffModal";

const { Header, Sider, Content } = Layout;

export function FullPageChatApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHandoffOpen, setIsHandoffOpen] = useState(false);
  const [copiedTranscript, setCopiedTranscript] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const screens = Grid.useBreakpoint();

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
  const hasBreakpoints = Object.keys(screens).length > 0;
  const isDesktop = hasBreakpoints ? Boolean(screens.lg) : true;
  const isSm = hasBreakpoints ? Boolean(screens.sm) : true;
  const isMd = hasBreakpoints ? Boolean(screens.md) : true;
  const isXl = hasBreakpoints ? Boolean(screens.xl) : true;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ea580c",
          colorBgContainer: "#ffffff",
          colorBgLayout: "#f8fafc",
          colorText: "#1e293b",
          colorTextSecondary: "#64748b",
          borderRadius: 10,
          fontFamily:
            "var(--font-open-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
      }}
    >
      <Layout
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100dvh",
          overflow: "hidden",
          backgroundColor: "#f8fafc",
          zIndex: 1050,
        }}
      >
        {/* Desktop Docked Ant Design Sider */}
        {isDesktop ? (
          <Sider
            width={320}
            theme="light"
            style={{
              height: "100%",
              backgroundColor: "#ffffff",
              borderRight: "1px solid #e2e8f0",
              overflow: "hidden",
            }}
          >
            <ChatSidebar
              isOpen={true}
              onClose={() => setSidebarOpen(false)}
              onNewChat={() => void startNewIssueOrConversation()}
              onSelectTopic={(query) => void sendTurn(query)}
              onTriggerAttachImage={() => fileInputRef.current?.click()}
              onOpenHandoff={() => setIsHandoffOpen(true)}
              hotlineZalo={policy.hotlineZalo}
              hotlineTech={policy.hotlineTech}
              supportHours={policy.supportHours}
              showCloseButton={false}
            />
          </Sider>
        ) : (
          /* Mobile / Tablet Ant Design Drawer */
          <Drawer
            placement="left"
            size={310}
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            closable={false}
            styles={{
              body: { padding: 0, backgroundColor: "#ffffff" },
              header: { display: "none" },
              mask: { backgroundColor: "rgba(15, 23, 42, 0.25)", backdropFilter: "blur(2px)" },
            }}
          >
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
              showCloseButton={true}
            />
          </Drawer>
        )}

        {/* Main Chat Workspace */}
        <Layout
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#ffffff",
            overflow: "hidden",
          }}
        >
          {/* Top Ant Design Header */}
          <Header
            style={{
              height: "64px",
              lineHeight: "normal",
              padding: isSm ? "0 20px" : "0 12px",
              backgroundColor: "#ffffff",
              borderBottom: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              flexShrink: 0,
              zIndex: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                minWidth: 0,
              }}
            >
              {!isDesktop && (
                <Button
                  type="text"
                  icon={<MenuOutlined style={{ fontSize: 18, color: "#334155" }} />}
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Mở danh mục hỗ trợ"
                />
              )}

              <Badge
                dot
                color="#22c55e"
                offset={[-3, 35]}
                styles={{
                  indicator: {
                    width: 10,
                    height: 10,
                    boxShadow: "0 0 0 2px #ffffff",
                  },
                }}
              >
                <Avatar
                  shape="square"
                  size={40}
                  icon={<RobotOutlined style={{ fontSize: 22, color: "#ffffff" }} />}
                  style={{
                    background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </Badge>

              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <h1
                    style={{
                      margin: 0,
                      fontSize: isSm ? "16px" : "14px",
                      fontWeight: 800,
                      color: "#1e293b",
                      letterSpacing: "-0.01em",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Trợ lý kỹ thuật ONLYOFFICE
                  </h1>
                  <Tag
                    color="orange"
                    style={{
                      margin: 0,
                      fontSize: "10.5px",
                      fontWeight: 700,
                      padding: "0 7px",
                      lineHeight: "18px",
                      borderRadius: "6px",
                      border: "1px solid #fdba74",
                      backgroundColor: "#fff7ed",
                      color: "#ea580c",
                    }}
                  >
                    AI
                  </Tag>
                  {activeIssue?.status === "resolved" && (
                    <Tag color="success" icon={<CheckCircleFilled />} style={{ margin: 0 }}>
                      Đã xác nhận xử lý
                    </Tag>
                  )}
                </div>
                <p
                  style={{
                    margin: "2px 0 0 0",
                    fontSize: "11.5px",
                    color: "#64748b",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Hỗ trợ bởi Mercy Tech · Trợ lý AI trực tuyến
                </p>
              </div>
            </div>

            {/* Right Header Actions */}
            <Space size={8} style={{ flexShrink: 0 }}>
              {isXl && (
                <Tooltip title="Zalo CSKH Mercy Tech Global">
                  <Button
                    type="default"
                    icon={<PhoneOutlined style={{ color: "#ea580c" }} />}
                    href={`tel:${(policy.hotlineZalo || "0763068614").replace(/\s+/g, "")}`}
                    style={{
                      fontWeight: 700,
                      borderColor: "#fed7aa",
                      backgroundColor: "#fff7ed",
                      color: "#c2410c",
                    }}
                  >
                    {policy.hotlineZalo || "0763 068 614"}
                  </Button>
                </Tooltip>
              )}

              {messages.length > 0 && (
                <>
                  {isMd && (
                    <Tooltip title="Sao chép toàn bộ nội dung hội thoại">
                      <Button
                        type="default"
                        icon={
                          copiedTranscript ? (
                            <CheckOutlined style={{ color: "#16a34a" }} />
                          ) : (
                            <CopyOutlined />
                          )
                        }
                        onClick={handleCopyTranscript}
                      >
                        {copiedTranscript ? "Đã chép" : "Sao chép"}
                      </Button>
                    </Tooltip>
                  )}

                  {isSm && (
                    <Popconfirm
                      title="Bắt đầu vấn đề mới?"
                      description="Tạo cuộc hội thoại mới để hỏi vấn đề khác?"
                      onConfirm={handleStartNewIssue}
                      okText="Đồng ý"
                      cancelText="Hủy"
                      placement="bottomRight"
                    >
                      <Tooltip title="Tạo phiên hỗ trợ cho vấn đề mới">
                        <Button type="default" icon={<RedoOutlined />}>
                          Vấn đề mới
                        </Button>
                      </Tooltip>
                    </Popconfirm>
                  )}

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
                  boxShadow: "0 2px 8px rgba(234, 88, 12, 0.24)",
                }}
              >
                {isSm ? "Gặp kỹ thuật viên" : "Kỹ thuật"}
              </Button>

              {isDesktop && (
                <Link href="/">
                  <Button type="default" icon={<ArrowLeftOutlined />}>
                    Trang chủ
                  </Button>
                </Link>
              )}
            </Space>
          </Header>

          {/* Status & Error Alerts */}
          {handoffState === "human_active" && (
            <Alert
              title="Kỹ thuật viên Mercy Tech đã tiếp quản phiên hỗ trợ này. Trợ lý AI đã tạm dừng tự động phản hồi."
              type="success"
              showIcon
              banner
              style={{ fontSize: "12.5px", padding: "8px 16px", flexShrink: 0 }}
            />
          )}

          {handoffState === "handoff_requested" && (
            <Alert
              title={`Đã chuyển yêu cầu ${
                conversation?.assignedTicketId
                  ? `(#${conversation.assignedTicketId})`
                  : ""
              } sang kỹ thuật viên kèm tóm tắt chẩn đoán. Giờ làm việc: ${policy.supportHours}.`}
              type="warning"
              showIcon
              banner
              style={{ fontSize: "12.5px", padding: "8px 16px", flexShrink: 0 }}
            />
          )}

          {error && (
            <Alert
              title={error}
              type="error"
              showIcon
              closable
              onClose={() => setError(null)}
              banner
              style={{ fontSize: "12.5px", padding: "8px 16px", flexShrink: 0 }}
            />
          )}

          {/* Main Workspace Content */}
          <Content
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              backgroundColor: "#ffffff",
            }}
          >
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

            <QuickSuggestions
              disabled={isLoading}
              onSelect={(query) => void sendTurn(query)}
              onAttachImage={() => fileInputRef.current?.click()}
            />

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
          </Content>
        </Layout>

        {/* Technician Handoff Modal */}
        <HandoffModal
          isOpen={isHandoffOpen}
          onClose={() => setIsHandoffOpen(false)}
          conversationId={conversation?.id}
          activeIssue={activeIssue}
          defaultCustomerName={ownerProfile.customerName}
          defaultContact={
            ownerProfile.customerPhone || ownerProfile.customerEmail
          }
          supportHours={policy.supportHours}
          onSubmitted={markTicketCreated}
        />
      </Layout>
    </ConfigProvider>
  );
}
