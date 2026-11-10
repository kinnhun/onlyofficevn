"use client";

import React, { useState } from "react";
import { Avatar, Button, Tag, Tooltip, Image } from "antd";
import {
  CopyOutlined,
  CheckOutlined,
  BookOutlined,
  RobotOutlined,
  UserOutlined,
  CustomerServiceOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  PictureOutlined,
  EyeOutlined,
  BulbOutlined,
  ToolOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import type { ChatMessage } from "../types";
import { MessageContent } from "./MessageContent";

type MessageItemProps = {
  message: ChatMessage;
  onSelectAction?: (actionText: string) => void;
  onOutcomeAction?: (
    messageId: string,
    action: "resolved" | "still_failing" | "attach_another" | "handoff"
  ) => void;
  onFeedback?: (messageId: string, rating: "helpful" | "unhelpful") => void;
  compact?: boolean;
};

const ROLE_TAG_LABELS: Record<string, string> = {
  default: "Ảnh chụp màn hình",
  before: "Ảnh Trước",
  after: "Ảnh Sau",
  desired_sample: "Mẫu mong muốn",
};

export function MessageItem({
  message,
  onSelectAction,
  onOutcomeAction,
  compact = false,
}: MessageItemProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";
  const isTechnician = message.role === "technician";
  const isSystem = message.role === "system";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isSystem) {
    return (
      <div
        role="status"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "8px 0",
        }}
      >
        <div
          style={{
            padding: "6px 14px",
            borderRadius: "10px",
            backgroundColor: "#f0f9ff",
            border: "1px solid #bae6fd",
            color: "#0369a1",
            fontSize: "12px",
            textAlign: "center",
            maxWidth: "480px",
          }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  const cog = message.cognitive;
  const hasImagesInTurn = Boolean(
    message.attachmentsMeta && message.attachmentsMeta.length > 0
  );
  const hasCognitiveCards =
    !isUser &&
    cog &&
    ((hasImagesInTurn &&
      (cog.observed.length > 0 || cog.hypotheses.length > 0)) ||
      Boolean(cog.executedAction));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        alignItems: "flex-start",
        gap: "8px",
        width: "100%",
      }}
    >
      {!isUser && (
        <Avatar
          size={32}
          icon={isTechnician ? <CustomerServiceOutlined /> : <RobotOutlined />}
          style={{
            backgroundColor: isTechnician ? "#10b981" : "#fff7ed",
            color: isTechnician ? "#ffffff" : "#ea580c",
            border: isTechnician ? "1px solid #059669" : "1px solid #fed7aa",
            borderRadius: "8px",
            flexShrink: 0,
            marginTop: "2px",
          }}
        />
      )}

      <div
        style={{
          maxWidth: compact ? "90%" : "82%",
          borderRadius: isUser ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
          padding: compact ? "10px 12px" : "12px 16px",
          backgroundColor: isUser ? "#e6f4ff" : isTechnician ? "#ecfdf5" : "#ffffff",
          color: isUser ? "#0c4a6e" : isTechnician ? "#065f46" : "#111827",
          border: isUser ? "1px solid #91caff" : isTechnician ? "1px solid #a7f3d0" : "1px solid #e5e7eb",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
          fontSize: "13px",
          lineHeight: "1.55",
        }}
      >
        {!isUser && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
              paddingBottom: "6px",
              borderBottom: "1px solid #f3f4f6",
              fontSize: "11px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 700, color: "#111827" }}>
              {isTechnician ? (
                <>
                  <CustomerServiceOutlined style={{ color: "#059669" }} />
                  <span>Kỹ thuật viên Mercy Tech</span>
                </>
              ) : (
                <>
                  <SafetyCertificateOutlined style={{ color: "#ea580c" }} />
                  <span>Trợ lý kỹ thuật ONLYOFFICE</span>
                </>
              )}
            </div>
            <Tag
              color={isTechnician ? "green" : "orange"}
              style={{
                margin: 0,
                fontSize: "10px",
                fontWeight: 700,
                lineHeight: "16px",
                padding: "0 6px",
                borderRadius: "4px",
              }}
            >
              {isTechnician ? "Người thật hỗ trợ" : "Trợ lý AI"}
            </Tag>
          </div>
        )}

        {/* Attached Screenshots */}
        {(() => {
          const attachedItems =
            message.attachmentsMeta && message.attachmentsMeta.length > 0
              ? message.attachmentsMeta
              : (message.attachmentIds || []).map((id, idx) => ({
                  id,
                  fileName: `Ảnh #${idx + 1}`,
                  roleTag: "default" as const,
                  orderIndex: idx,
                  previewUrl: `/api/support/attachments/${id}/access`,
                  status: "ready" as const,
                  expired: false,
                }));

          if (attachedItems.length === 0) return null;

          return (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "10px",
              }}
            >
              <Image.PreviewGroup>
                {attachedItems.map((att, idx) => (
                  <div
                    key={att.id || idx}
                    style={{
                      borderRadius: "10px",
                      overflow: "hidden",
                      border: isUser
                        ? "1px solid #bae0ff"
                        : "1px solid #e2e8f0",
                      backgroundColor: "#ffffff",
                      padding: "6px",
                      maxWidth: attachedItems.length === 1 ? "220px" : "150px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    }}
                  >
                    {att.expired ? (
                      <div
                        style={{
                          padding: "8px",
                          fontSize: "11px",
                          opacity: 0.8,
                          textAlign: "center",
                          color: "#64748b",
                        }}
                      >
                        Ảnh #{idx + 1} đã hết hạn lưu trữ
                      </div>
                    ) : (
                      <div>
                        <Image
                          src={
                            att.previewUrl ||
                            `/api/support/attachments/${att.id}/access`
                          }
                          alt={`${ROLE_TAG_LABELS[att.roleTag] || "Ảnh"} ${idx + 1}`}
                          style={{
                            width: "100%",
                            height:
                              attachedItems.length === 1 ? "140px" : "90px",
                            objectFit: "cover",
                            borderRadius: "6px",
                            display: "block",
                          }}
                          preview={{
                            mask: (
                              <div
                                style={{
                                  fontSize: "11.5px",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  fontWeight: 500,
                                }}
                              >
                                <EyeOutlined /> Phóng to
                              </div>
                            ),
                          }}
                          fallback="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='100'%3E%3Crect width='160' height='100' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='12'%3EẢnh đính kèm%3C/text%3E%3C/svg%3E"
                        />
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: "5px",
                            fontSize: "11px",
                            color: isUser ? "#0958d9" : "#334155",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 600,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth:
                                attachedItems.length === 1
                                  ? "170px"
                                  : "105px",
                            }}
                            title={att.fileName}
                          >
                            #{idx + 1} ·{" "}
                            {ROLE_TAG_LABELS[att.roleTag] || att.fileName}
                          </span>
                          <Tooltip title="Mở ảnh tab mới">
                            <a
                              href={`/api/support/attachments/${att.id}/access`}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                color: "#1677ff",
                                display: "inline-flex",
                                padding: "2px",
                              }}
                            >
                              <EyeOutlined style={{ fontSize: "12px" }} />
                            </a>
                          </Tooltip>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </Image.PreviewGroup>
            </div>
          );
        })()}

        {/* Cognitive Cards (Observed / Hypotheses / Verified Execution) */}
        {hasCognitiveCards && !compact && (
          <div
            style={{
              marginBottom: "10px",
              padding: "8px 12px",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              fontSize: "11.5px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            {cog!.observed.length > 0 && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", color: "#475569" }}>
                <EyeOutlined style={{ color: "#ea580c", marginTop: "2px" }} />
                <div>
                  <strong style={{ color: "#1e293b" }}>Nhìn thấy: </strong>
                  <span>{cog!.observed.join("; ")}</span>
                </div>
              </div>
            )}
            {cog!.hypotheses.length > 0 && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", color: "#475569" }}>
                <BulbOutlined style={{ color: "#d97706", marginTop: "2px" }} />
                <div>
                  <strong style={{ color: "#1e293b" }}>Suy luận: </strong>
                  <span>{cog!.hypotheses.join("; ")}</span>
                </div>
              </div>
            )}
            {cog!.executedAction && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", color: "#065f46" }}>
                <ToolOutlined style={{ color: "#059669", marginTop: "2px" }} />
                <div>
                  <strong>Hệ thống xác thực: </strong>
                  <span>{cog!.executedAction}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Main Message Body */}
        <div style={{ color: isUser ? "#0c4a6e" : "#111827", fontWeight: isUser ? 500 : 400 }}>
          <MessageContent content={message.content} />
        </div>

        {/* Steps (if any) */}
        {!isUser &&
          message.steps &&
          message.steps.length > 0 &&
          !message.content.includes("1.") &&
          !message.content.includes("1/") &&
          !/bước\s*1/i.test(message.content) && (
            <div style={{ marginTop: "10px", paddingTop: "8px", borderTop: "1px solid #f3f4f6" }}>
              <div style={{ fontWeight: 700, fontSize: "12px", color: "#111827", marginBottom: "6px" }}>
                Các bước xử lý:
              </div>
              <ol style={{ paddingLeft: "18px", margin: 0, fontSize: "12px", color: "#374151" }}>
                {message.steps.map((step, idx) => (
                  <li key={idx} style={{ marginBottom: "4px" }}>
                    {step.replace(/^(bước\s*[0-9]+[:.]?\s*|[0-9]+[.)]\s*)/i, "").trim()}
                  </li>
                ))}
              </ol>
            </div>
          )}

        {/* Questions */}
        {!isUser && message.questions && message.questions.length > 0 && (
          <ul style={{ marginTop: "8px", paddingLeft: "18px", margin: "8px 0 0", fontSize: "12px", color: "#111827" }}>
            {message.questions.map((q, idx) => (
              <li key={idx} style={{ marginBottom: "4px" }}>{q}</li>
            ))}
          </ul>
        )}

        {/* Grounded Citations */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div style={{ marginTop: "10px", paddingTop: "8px", borderTop: "1px solid #f3f4f6", fontSize: "11px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 700, color: "#475569", marginBottom: "6px" }}>
              <BookOutlined style={{ color: "#ea580c" }} />
              <span>Nguồn hướng dẫn đã kiểm duyệt:</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {message.sources.map((src) => {
                const keyId = "chunkId" in src ? src.chunkId : src.id;
                return (
                  <span
                    key={keyId}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "2px 8px",
                      borderRadius: "6px",
                      backgroundColor: "#f1f5f9",
                      border: "1px solid #e2e8f0",
                      color: "#1e293b",
                      fontWeight: 500,
                    }}
                  >
                    <strong>{src.title}</strong>
                    {src.section && <span style={{ color: "#64748b" }}>· {src.section}</span>}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Post-Answer Action Buttons */}
        {!isUser &&
          !isTechnician &&
          onOutcomeAction &&
          Boolean(
            (message.steps && message.steps.length > 0) ||
              message.shouldSuggestHandoff ||
              message.nextAction === "guide" ||
              message.nextAction === "handoff" ||
              message.nextAction === "recapture_image"
          ) && (
            <div style={{ marginTop: "10px", paddingTop: "8px", borderTop: "1px solid #f3f4f6" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {Boolean(
                  (message.steps && message.steps.length > 0) ||
                    message.nextAction === "guide"
                ) && (
                  <>
                    <Button
                      size="small"
                      icon={<CheckCircleOutlined style={{ color: "#059669" }} />}
                      onClick={() => onOutcomeAction(message.id, "resolved")}
                      style={{
                        borderRadius: "8px",
                        fontSize: "11px",
                        fontWeight: 700,
                        backgroundColor: message.feedback === "resolved" ? "#059669" : "#ffffff",
                        color: message.feedback === "resolved" ? "#ffffff" : "#111827",
                        borderColor: message.feedback === "resolved" ? "#059669" : "#d1d5db",
                      }}
                    >
                      Đã xử lý được
                    </Button>

                    <Button
                      size="small"
                      icon={<ExclamationCircleOutlined style={{ color: "#d97706" }} />}
                      onClick={() => onOutcomeAction(message.id, "still_failing")}
                      style={{
                        borderRadius: "8px",
                        fontSize: "11px",
                        fontWeight: 700,
                        backgroundColor: message.feedback === "still_failing" ? "#d97706" : "#ffffff",
                        color: message.feedback === "still_failing" ? "#ffffff" : "#111827",
                        borderColor: message.feedback === "still_failing" ? "#d97706" : "#d1d5db",
                      }}
                    >
                      Vẫn còn lỗi
                    </Button>
                  </>
                )}

                <Button
                  size="small"
                  icon={<PictureOutlined style={{ color: "#ea580c" }} />}
                  onClick={() => onOutcomeAction(message.id, "attach_another")}
                  style={{
                    borderRadius: "8px",
                    fontSize: "11px",
                    fontWeight: 700,
                  }}
                >
                  Gửi ảnh khác
                </Button>

                <Button
                  size="small"
                  type={message.shouldSuggestHandoff ? "primary" : "default"}
                  icon={<CustomerServiceOutlined />}
                  onClick={() => onOutcomeAction(message.id, "handoff")}
                  style={{
                    borderRadius: "8px",
                    fontSize: "11px",
                    fontWeight: 700,
                    background: message.shouldSuggestHandoff
                      ? "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)"
                      : "#fff7ed",
                    color: message.shouldSuggestHandoff ? "#ffffff" : "#c2410c",
                    borderColor: message.shouldSuggestHandoff ? "#ea580c" : "#fed7aa",
                  }}
                >
                  Gặp kỹ thuật viên
                </Button>
              </div>
            </div>
          )}

        {/* Fallback legacy action buttons */}
        {!isUser &&
          !onOutcomeAction &&
          message.suggestedActions &&
          message.suggestedActions.length > 0 &&
          onSelectAction && (
            <div style={{ marginTop: "8px", paddingTop: "6px", borderTop: "1px solid #f3f4f6", display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {message.suggestedActions.map((act) => (
                <Button
                  key={act}
                  size="small"
                  onClick={() => onSelectAction(act)}
                  style={{ borderRadius: "8px", fontSize: "11px", fontWeight: 600 }}
                >
                  {act}
                </Button>
              ))}
            </div>
          )}

        {/* Timestamp & Copy */}
        {!isUser && (
          <div
            style={{
              marginTop: "8px",
              paddingTop: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "10.5px",
              color: "#9ca3af",
              borderTop: "1px solid #f3f4f6",
            }}
          >
            <span style={{ fontFamily: "monospace" }}>
              {new Date(message.timestamp).toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <Tooltip title={copied ? "Đã sao chép!" : "Sao chép câu trả lời"}>
              <Button
                type="text"
                size="small"
                icon={copied ? <CheckOutlined style={{ color: "#059669" }} /> : <CopyOutlined />}
                onClick={handleCopy}
                style={{ fontSize: "11px", height: "22px", padding: "0 6px" }}
              >
                {copied ? "Đã chép" : "Sao chép"}
              </Button>
            </Tooltip>
          </div>
        )}
      </div>

      {isUser && (
        <Avatar
          size={32}
          icon={<UserOutlined />}
          style={{
            backgroundColor: "#ea580c",
            color: "#ffffff",
            borderRadius: "8px",
            flexShrink: 0,
            marginTop: "2px",
          }}
        />
      )}
    </div>
  );
}
