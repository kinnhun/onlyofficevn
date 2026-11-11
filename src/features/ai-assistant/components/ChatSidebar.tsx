"use client";

import React, { useState, useMemo } from "react";
import {
  Button,
  Input,
  Tag,
  Empty,
  Tooltip,
  message as antMessage,
} from "antd";
import {
  RobotOutlined,
  PlusOutlined,
  DownloadOutlined,
  KeyOutlined,
  FontSizeOutlined,
  CalculatorOutlined,
  TableOutlined,
  LaptopOutlined,
  SafetyCertificateOutlined,
  CustomerServiceOutlined,
  ArrowLeftOutlined,
  CloseOutlined,
  SearchOutlined,
  PictureOutlined,
  CopyOutlined,
  CheckOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import Link from "next/link";

export type ChatSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  onSelectTopic: (topicQuery: string) => void;
  onTriggerAttachImage?: () => void;
  onOpenHandoff: () => void;
  hotlineZalo?: string;
  hotlineTech?: string;
  supportHours?: string;
  showCloseButton?: boolean;
};

type TopicItem = {
  id: string;
  categoryLabel: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  query: string;
  badge?: string;
  badgeColor?: string;
};

const TOPICS: TopicItem[] = [
  {
    id: "t_install",
    categoryLabel: "Cài đặt & Cập nhật",
    title: "Chọn bộ cài đúng hệ điều hành",
    desc: "Windows (.exe), macOS (.dmg) & Linux",
    icon: <DownloadOutlined style={{ fontSize: 16 }} />,
    query:
      "Hướng dẫn chọn và cài đặt phần mềm ONLYOFFICE đúng hệ điều hành máy tính",
    badge: "OS",
    badgeColor: "blue",
  },
  {
    id: "t_account_key",
    categoryLabel: "Tài khoản & Key Mercy",
    title: "Tài khoản, Key & Demo 7 ngày",
    desc: "Đăng nhập, nhập key kích hoạt hoặc cài lại máy",
    icon: <KeyOutlined style={{ fontSize: 16 }} />,
    query:
      "Hướng dẫn đăng nhập tài khoản Mercy, nhập key kích hoạt hoặc bản Demo 7 ngày",
    badge: "Demo 7 ngày",
    badgeColor: "orange",
  },
  {
    id: "t_font",
    categoryLabel: "Văn bản & Tiếng Việt",
    title: "Lỗi font .VnTime / TCVN3 / VNI",
    desc: "Sao lưu file gốc & chuyển mã Unicode an toàn",
    icon: <FontSizeOutlined style={{ fontSize: 16 }} />,
    query:
      "Văn bản mở lên bị lỗi font .VnTime ô vuông thì kiểm tra và chuyển mã thế nào?",
    badge: "Phổ biến",
    badgeColor: "volcano",
  },
  {
    id: "t_unikey",
    categoryLabel: "Văn bản & Tiếng Việt",
    title: "Lỗi gõ tiếng Việt (Unikey / macOS)",
    desc: "Khắc phục nhảy chữ, mất dấu tiếng Việt",
    icon: <LaptopOutlined style={{ fontSize: 16 }} />,
    query:
      "Khắc phục lỗi gõ tiếng Việt bị mất dấu hoặc nhảy chữ trong ONLYOFFICE",
  },
  {
    id: "t_spreadsheet",
    categoryLabel: "Bảng tính & Plugin",
    title: "Công thức, ngày tháng & Đọc số",
    desc: "Dấu phân cách công thức, định dạng số & plugin",
    icon: <TableOutlined style={{ fontSize: 16 }} />,
    query:
      "Bảng tính bị lỗi công thức dấu phẩy/chấm phẩy hoặc sai định dạng ngày tháng",
  },
  {
    id: "t_number_words",
    categoryLabel: "Bảng tính & Plugin",
    title: "Plugin Đọc số tiền & Công thức Toán",
    desc: "Hướng dẫn bật tiện ích trên bộ cài Mercy",
    icon: <CalculatorOutlined style={{ fontSize: 16 }} />,
    query:
      "Cách kiểm tra và sử dụng tiện ích Đọc Số Thành Chữ hoặc công thức toán học",
  },
  {
    id: "t_dll",
    categoryLabel: "Cài đặt & Cập nhật",
    title: "Thiếu VCRUNTIME140_1.dll / Không mở được",
    desc: "Cài bổ sung Visual C++ Redistributable chính thức",
    icon: <SafetyCertificateOutlined style={{ fontSize: 16 }} />,
    query:
      "Mở phần mềm báo lỗi thiếu file VCRUNTIME140_1.dll hoặc không khởi động được",
  },
  {
    id: "t_docs_docspace",
    categoryLabel: "Docs & DocSpace",
    title: "Phân biệt Desktop, Docs & DocSpace",
    desc: "Cộng tác trực tuyến, plugin AI & kết nối máy chủ",
    icon: <AppstoreOutlined style={{ fontSize: 16 }} />,
    query:
      "Phân biệt ONLYOFFICE Desktop Editors, Docs và DocSpace như thế nào?",
  },
];

export function ChatSidebar({
  onClose,
  onNewChat,
  onSelectTopic,
  onTriggerAttachImage,
  onOpenHandoff,
  hotlineZalo = "0763 068 614",
  hotlineTech = "0862 497 002",
  supportHours = "08:00 – 17:30 (Thứ 2 – Thứ 7)",
  showCloseButton = false,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedZalo, setCopiedZalo] = useState(false);
  const [hoveredTopicId, setHoveredTopicId] = useState<string | null>(null);

  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return TOPICS;
    const q = searchQuery.toLowerCase();
    return TOPICS.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.categoryLabel.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleCopyZaloNumber = () => {
    const cleanPhone = hotlineZalo.replace(/[^0-9]/g, "");
    navigator.clipboard.writeText(cleanPhone);
    setCopiedZalo(true);
    antMessage.success(`Đã sao chép số Zalo CSKH: ${hotlineZalo}`);
    setTimeout(() => setCopiedZalo(false), 2000);
  };

  return (
    <aside
      aria-label="Danh mục hỗ trợ kỹ thuật"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      {/* Top Brand & Action Header */}
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid #e2e8f0",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
            }}
          >
            <img
              src="/mercy_logo.png"
              alt="Mercy Tech"
              style={{
                height: "28px",
                width: "auto",
                display: "block",
                objectFit: "contain",
              }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/logo.svg";
              }}
            />
            <Tag
              color="orange"
              style={{
                margin: 0,
                fontSize: "10px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                borderRadius: "999px",
                padding: "1px 8px",
                border: "1px solid #fed7aa",
              }}
            >
              Hỗ trợ kỹ thuật
            </Tag>
          </Link>

          {showCloseButton && (
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined style={{ color: "#64748b" }} />}
              onClick={onClose}
              aria-label="Đóng danh mục"
            />
          )}
        </div>

        {/* Action Grid: New Issue & Upload Screenshot */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
          }}
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              onNewChat();
              onClose();
            }}
            style={{
              height: "38px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
              border: "none",
              fontWeight: 700,
              fontSize: "12.5px",
              boxShadow: "0 2px 6px rgba(234, 88, 12, 0.22)",
            }}
          >
            Vấn đề mới
          </Button>

          <Button
            icon={<PictureOutlined style={{ color: "#ea580c" }} />}
            onClick={() => {
              onClose();
              onTriggerAttachImage?.();
            }}
            style={{
              height: "38px",
              borderRadius: "10px",
              backgroundColor: "#fff7ed",
              borderColor: "#fed7aa",
              color: "#c2410c",
              fontWeight: 700,
              fontSize: "12.5px",
            }}
          >
            Gửi ảnh lỗi
          </Button>
        </div>

        {/* Ant Design Search Input */}
        <Input
          allowClear
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          prefix={<SearchOutlined style={{ color: "#94a3b8", fontSize: 13 }} />}
          placeholder="Tìm chủ đề: cài đặt, font, key..."
          aria-label="Tìm kiếm chủ đề hỗ trợ"
          style={{
            borderRadius: "10px",
            backgroundColor: "#f8fafc",
            borderColor: "#e2e8f0",
            fontSize: "12.5px",
            height: "36px",
          }}
        />
      </div>

      {/* Scrollable Technical Topics */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            padding: "2px 6px 6px",
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: "#64748b",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <RobotOutlined style={{ color: "#ea580c", fontSize: 13 }} />
            <span>Chủ đề kỹ thuật</span>
          </span>
          <Tag
            style={{
              margin: 0,
              borderRadius: "999px",
              fontSize: "10px",
              backgroundColor: "#f1f5f9",
              borderColor: "#e2e8f0",
              color: "#475569",
              fontWeight: 600,
            }}
          >
            {filteredTopics.length} mục
          </Tag>
        </div>

        {filteredTopics.length === 0 ? (
          <div style={{ padding: "24px 8px" }}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <span style={{ fontSize: "12px", color: "#64748b" }}>
                  Không tìm thấy chủ đề khớp với &ldquo;{searchQuery}&rdquo;
                </span>
              }
            />
          </div>
        ) : (
          filteredTopics.map((topic) => {
            const isHovered = hoveredTopicId === topic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onMouseEnter={() => setHoveredTopicId(topic.id)}
                onMouseLeave={() => setHoveredTopicId(null)}
                onClick={() => {
                  onSelectTopic(topic.query);
                  onClose();
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px",
                  borderRadius: "12px",
                  textAlign: "left",
                  backgroundColor: isHovered ? "#fff7ed" : "#ffffff",
                  border: isHovered
                    ? "1px solid #fdba74"
                    : "1px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                }}
              >
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "9px",
                    backgroundColor: isHovered ? "#ffedd5" : "#f1f5f9",
                    color: isHovered ? "#ea580c" : "#475569",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.18s ease",
                  }}
                >
                  {topic.icon}
                </div>

                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "6px",
                      marginBottom: "2px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12.5px",
                        fontWeight: 700,
                        color: isHovered ? "#c2410c" : "#1e293b",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {topic.title}
                    </span>

                    {topic.badge && (
                      <Tag
                        color={topic.badgeColor || "default"}
                        style={{
                          margin: 0,
                          fontSize: "10px",
                          lineHeight: "16px",
                          padding: "0 5px",
                          borderRadius: "5px",
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {topic.badge}
                      </Tag>
                    )}
                  </div>

                  <div
                    style={{
                      fontSize: "11.5px",
                      color: "#64748b",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {topic.desc}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Bottom Contact & Handoff Footer (Official Zalo CSKH 0763 068 614 - No zalo.me link) */}
      <div
        style={{
          padding: "14px",
          borderTop: "1px solid #e2e8f0",
          backgroundColor: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          flexShrink: 0,
        }}
      >
        <Button
          block
          icon={<CustomerServiceOutlined style={{ color: "#ea580c" }} />}
          onClick={() => {
            onOpenHandoff();
            onClose();
          }}
          style={{
            height: "38px",
            borderRadius: "10px",
            backgroundColor: "#ffffff",
            borderColor: "#fdba74",
            color: "#1e293b",
            fontWeight: 700,
            fontSize: "12.5px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
          }}
        >
          Chuyển phiếu gặp kỹ thuật viên
        </Button>

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "10px 12px",
            border: "1px solid #e2e8f0",
            fontSize: "11.5px",
            color: "#334155",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "6px",
            }}
          >
            <span style={{ fontWeight: 600, color: "#1e293b" }}>
              Zalo CSKH (Mercy Tech Global):
            </span>
            <Tooltip title="Bấm để sao chép số Zalo CSKH">
              <Button
                type="text"
                size="small"
                onClick={handleCopyZaloNumber}
                icon={
                  copiedZalo ? (
                    <CheckOutlined style={{ color: "#16a34a" }} />
                  ) : (
                    <CopyOutlined style={{ color: "#ea580c" }} />
                  )
                }
                style={{
                  padding: "0 6px",
                  height: "22px",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  fontSize: "12px",
                  color: "#c2410c",
                  backgroundColor: "#fff7ed",
                  borderRadius: "6px",
                }}
              >
                {hotlineZalo}
              </Button>
            </Tooltip>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "11px",
              color: "#64748b",
            }}
          >
            <span>Hotline kỹ thuật:</span>
            <a
              href={`tel:${hotlineTech.replace(/[^0-9]/g, "")}`}
              style={{
                fontFamily: "monospace",
                fontWeight: 700,
                color: "#334155",
                textDecoration: "none",
              }}
            >
              {hotlineTech}
            </a>
          </div>

          <div
            style={{
              fontSize: "10.5px",
              color: "#64748b",
              paddingTop: "5px",
              borderTop: "1px solid #f1f5f9",
            }}
          >
            Giờ hỗ trợ trực tiếp: {supportHours}
          </div>
        </div>

        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            fontSize: "12px",
            color: "#475569",
            fontWeight: 600,
            padding: "4px 0 2px",
            textDecoration: "none",
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 11 }} />
          <span>Quay về trang chủ ONLYOFFICE</span>
        </Link>
      </div>
    </aside>
  );
}
