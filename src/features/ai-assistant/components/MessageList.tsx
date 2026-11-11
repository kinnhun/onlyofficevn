"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, Row, Col, Tag, Avatar, Spin, Grid } from "antd";
import {
  RobotOutlined,
  DownloadOutlined,
  KeyOutlined,
  FontSizeOutlined,
  PictureOutlined,
  SafetyCertificateOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { MessageItem } from "./MessageItem";
import type { ChatMessage, ProcessingStage } from "../types";

export type MessageListProps = {
  messages: ChatMessage[];
  isLoading: boolean;
  stage?: ProcessingStage;
  onSelectAction?: (actionText: string) => void;
  onTriggerAttachImage?: () => void;
  onOutcomeAction?: (
    messageId: string,
    action: "resolved" | "still_failing" | "attach_another" | "handoff"
  ) => void;
  onFeedback?: (messageId: string, rating: "helpful" | "unhelpful") => void;
};

const STAGE_LABELS: Record<string, string> = {
  validating_image: "Đang kiểm tra ảnh...",
  reading_image: "Đang đọc nội dung ảnh chụp màn hình...",
  searching_knowledge: "Đang tìm hướng dẫn phù hợp...",
  preparing_answer: "Đang chuẩn bị câu trả lời...",
};

type StarterCardItem = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  actionType: "query" | "attach";
  query: string;
};

const STARTER_CARDS: StarterCardItem[] = [
  {
    id: "card_install",
    title: "Cài đặt phần mềm",
    description:
      "Chọn đúng bộ cài Windows, macOS, Linux và xử lý lỗi thiếu DLL hoặc không mở được ứng dụng.",
    icon: <DownloadOutlined style={{ fontSize: 20, color: "#ea580c" }} />,
    actionType: "query",
    query: "Hướng dẫn cài đặt phần mềm ONLYOFFICE phù hợp hệ điều hành",
  },
  {
    id: "card_font",
    title: "Font và tiếng Việt",
    description:
      "Xử lý lỗi font TCVN3/VNI, xung đột bộ gõ Unikey, lệch bảng và canh lề chuẩn Nghị định 30.",
    icon: <FontSizeOutlined style={{ fontSize: 20, color: "#ea580c" }} />,
    actionType: "query",
    query:
      "Văn bản bị lỗi font .VnTime ô vuông hoặc lỗi gõ tiếng Việt thì kiểm tra thế nào?",
  },
  {
    id: "card_key",
    title: "Tài khoản & Demo 7 ngày",
    description:
      "Hướng dẫn dùng thử Demo 7 ngày miễn phí, nhập mã kích hoạt/tem cào Mercy và cài lại máy tính.",
    icon: <KeyOutlined style={{ fontSize: 20, color: "#ea580c" }} />,
    actionType: "query",
    query:
      "Hướng dẫn đăng nhập tài khoản, dùng thử Demo 7 ngày và nhập key/tem cào Mercy",
  },
  {
    id: "card_image",
    title: "Gửi ảnh cần hỗ trợ",
    description:
      "Đính kèm hoặc dán (Ctrl+V) tối đa 3 ảnh màn hình lỗi, so sánh Trước/Sau hoặc mẫu bố cục mong muốn.",
    icon: <PictureOutlined style={{ fontSize: 20, color: "#ea580c" }} />,
    actionType: "attach",
    query: "Em muốn gửi ảnh chụp màn hình lỗi để kiểm tra",
  },
];

export function MessageList({
  messages,
  isLoading,
  stage = "idle",
  onSelectAction,
  onTriggerAttachImage,
  onOutcomeAction,
  onFeedback,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const screens = Grid.useBreakpoint();
  const isSm = Object.keys(screens).length > 0 ? Boolean(screens.sm) : true;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isLoading]);

  if (messages.length === 0) {
    return (
      <div
        style={{
          flex: 1,
          padding: isSm ? "32px 24px" : "20px 14px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflowY: "auto",
          background:
            "linear-gradient(180deg, #ffffff 0%, #f8fafc 55%, #fff7ed 100%)",
        }}
      >
        <div
          style={{
            maxWidth: "780px",
            width: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "22px",
          }}
        >
          {/* Hero AI Icon & Light Badge */}
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                padding: "8px",
                borderRadius: "24px",
                backgroundColor: "#fff7ed",
                border: "1px solid #ffedd5",
                boxShadow: "0 8px 24px rgba(234, 88, 12, 0.12)",
              }}
            >
              <Avatar
                shape="square"
                size={60}
                icon={<RobotOutlined style={{ fontSize: 30, color: "#ffffff" }} />}
                style={{
                  background:
                    "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </div>

            <Tag
              color="orange"
              style={{
                margin: 0,
                padding: "2px 12px",
                borderRadius: "999px",
                fontWeight: 700,
                fontSize: "11.5px",
                border: "1px solid #fdba74",
                backgroundColor: "#fff7ed",
                color: "#c2410c",
              }}
            >
              Trợ lý AI · Hỗ trợ bởi Mercy Tech
            </Tag>
          </div>

          {/* Heading & Friendly Greeting */}
          <div style={{ maxWidth: "600px" }}>
            <h2
              style={{
                margin: "0 0 8px 0",
                fontSize: isSm ? "28px" : "22px",
                fontWeight: 800,
                color: "#1e293b",
                letterSpacing: "-0.02em",
                lineHeight: 1.25,
              }}
            >
              Trợ lý kỹ thuật ONLYOFFICE
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: "#475569",
                lineHeight: 1.6,
              }}
            >
              Chào anh/chị, em là trợ lý AI hỗ trợ ONLYOFFICE của Mercy Tech.
              Anh/chị có thể chọn nhanh chủ đề bên dưới, mô tả tình trạng đang gặp
              hoặc dán ảnh chụp màn hình (<strong>Ctrl + V</strong>) để em cùng kiểm tra.
            </p>
          </div>

          {/* 4 Official Ant Design Starter Cards */}
          <div style={{ width: "100%", textAlign: "left" }}>
            <Row gutter={[14, 14]}>
              {STARTER_CARDS.map((item) => {
                const isHovered = hoveredCard === item.id;
                return (
                  <Col xs={24} sm={12} key={item.id}>
                    <Card
                      hoverable
                      onMouseEnter={() => setHoveredCard(item.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      onClick={() => {
                        if (item.actionType === "attach") {
                          if (onTriggerAttachImage) {
                            onTriggerAttachImage();
                          } else {
                            onSelectAction?.(item.query);
                          }
                        } else {
                          onSelectAction?.(item.query);
                        }
                      }}
                      styles={{
                        body: {
                          padding: "16px 18px",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "14px",
                        },
                      }}
                      style={{
                        height: "100%",
                        borderRadius: "16px",
                        backgroundColor: "#ffffff",
                        borderColor: isHovered ? "#fb923c" : "#e2e8f0",
                        boxShadow: isHovered
                          ? "0 8px 20px rgba(234, 88, 12, 0.10)"
                          : "0 1px 3px rgba(15, 23, 42, 0.04)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "12px",
                          backgroundColor: isHovered ? "#ffedd5" : "#fff7ed",
                          border: "1px solid #fed7aa",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          transition: "background-color 0.2s ease",
                        }}
                      >
                        {item.icon}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "8px",
                            marginBottom: "4px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "14px",
                              fontWeight: 700,
                              color: isHovered ? "#ea580c" : "#1e293b",
                              transition: "color 0.2s ease",
                            }}
                          >
                            {item.title}
                          </span>
                          <ArrowRightOutlined
                            style={{
                              fontSize: 13,
                              color: "#ea580c",
                              opacity: isHovered ? 1 : 0.55,
                              transform: isHovered
                                ? "translateX(3px)"
                                : "translateX(0)",
                              transition: "all 0.2s ease",
                            }}
                          />
                        </div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "12.5px",
                            color: "#64748b",
                            lineHeight: 1.55,
                          }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>

          {/* Privacy & Security Reassurance Pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "999px",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              fontSize: "12px",
              color: "#475569",
            }}
          >
            <SafetyCertificateOutlined
              style={{ color: "#ea580c", fontSize: 14 }}
            />
            <span>
              Bảo mật thông tin: Không cần cung cấp mật khẩu, mã OTP hoặc mã kích
              hoạt đầy đủ
            </span>
          </div>
        </div>
      </div>
    );
  }

  const stageText =
    STAGE_LABELS[stage] ||
    "Đang tìm hướng dẫn phù hợp và chuẩn bị câu trả lời...";

  return (
    <div
      style={{
        flex: 1,
        padding: isSm ? "24px" : "14px",
        overflowY: "auto",
        backgroundColor: "#f8fafc",
      }}
    >
      <div
        style={{
          maxWidth: "880px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {messages.map((msg) => (
          <MessageItem
            key={msg.id}
            message={msg}
            onSelectAction={onSelectAction}
            onOutcomeAction={onOutcomeAction}
            onFeedback={onFeedback}
          />
        ))}

        {isLoading && (
          <div
            role="status"
            aria-live="polite"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <Avatar
              size={32}
              icon={<RobotOutlined />}
              style={{
                backgroundColor: "#fff7ed",
                color: "#ea580c",
                border: "1px solid #fed7aa",
                borderRadius: "8px",
                flexShrink: 0,
              }}
            />
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 16px",
                borderRadius: "14px 14px 14px 2px",
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                color: "#334155",
                fontSize: "12.5px",
                fontWeight: 500,
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
              }}
            >
              <Spin size="small" />
              <span>{stageText}</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
