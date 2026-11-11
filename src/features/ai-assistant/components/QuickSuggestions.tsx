"use client";

import React, { useRef } from "react";
import { Button, Grid } from "antd";
import {
  DownloadOutlined,
  FontSizeOutlined,
  KeyOutlined,
  PictureOutlined,
  TableOutlined,
  LaptopOutlined,
  CustomerServiceOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

export type QuickSuggestionsProps = {
  onSelect: (question: string) => void;
  onAttachImage?: () => void;
  disabled?: boolean;
};

const SUGGESTIONS = [
  {
    label: "Cài đặt phần mềm",
    icon: <DownloadOutlined style={{ color: "#ea580c" }} />,
    query: "Hướng dẫn chọn và cài đặt phần mềm ONLYOFFICE đúng hệ điều hành",
  },
  {
    label: "Font và tiếng Việt",
    icon: <FontSizeOutlined style={{ color: "#ea580c" }} />,
    query: "Văn bản mở lên bị lỗi font .VnTime ô vuông thì xử lý thế nào?",
  },
  {
    label: "Tài khoản & Demo 7 ngày",
    icon: <KeyOutlined style={{ color: "#ea580c" }} />,
    query:
      "Hướng dẫn đăng nhập tài khoản Mercy, nhập key hoặc dùng thử Demo 7 ngày",
  },
  {
    label: "Lỗi gõ tiếng Việt",
    icon: <LaptopOutlined style={{ color: "#ea580c" }} />,
    query:
      "Khắc phục lỗi gõ tiếng Việt bị nhảy chữ hoặc mất dấu trong ONLYOFFICE",
  },
  {
    label: "Công thức bảng tính",
    icon: <TableOutlined style={{ color: "#ea580c" }} />,
    query:
      "Bảng tính báo lỗi công thức hoặc sai định dạng ngày tháng số tiền",
  },
  {
    label: "Gặp kỹ thuật viên",
    icon: <CustomerServiceOutlined style={{ color: "#ea580c" }} />,
    query: "Tôi cần chuyển kỹ thuật viên hỗ trợ kiểm tra trực tiếp",
  },
];

export function QuickSuggestions({
  onSelect,
  onAttachImage,
  disabled,
}: QuickSuggestionsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const screens = Grid.useBreakpoint();
  const isSm = Object.keys(screens).length > 0 ? Boolean(screens.sm) : true;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -240 : 240;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div
      style={{
        padding: isSm ? "8px 18px" : "8px 12px",
        borderTop: "1px solid #e2e8f0",
        backgroundColor: "#f8fafc",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          maxWidth: "880px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontSize: "11.5px",
            fontWeight: 700,
            color: "#64748b",
            flexShrink: 0,
          }}
        >
          Gợi ý:
        </span>

        <div
          ref={scrollRef}
          className="no-scrollbar"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            overflowX: "auto",
            padding: "2px 0",
          }}
        >
          {onAttachImage && (
            <Button
              shape="round"
              size="small"
              disabled={disabled}
              icon={<PictureOutlined />}
              onClick={onAttachImage}
              style={{
                backgroundColor: "#fff7ed",
                borderColor: "#fdba74",
                color: "#c2410c",
                fontWeight: 700,
                fontSize: "12px",
                height: "30px",
                padding: "0 12px",
                flexShrink: 0,
              }}
            >
              Gửi ảnh cần hỗ trợ
            </Button>
          )}

          {SUGGESTIONS.map((item) => (
            <Button
              key={item.label}
              shape="round"
              size="small"
              disabled={disabled}
              icon={item.icon}
              onClick={() => onSelect(item.query)}
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#e2e8f0",
                color: "#334155",
                fontWeight: 600,
                fontSize: "12px",
                height: "30px",
                padding: "0 12px",
                flexShrink: 0,
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>

        {isSm && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              flexShrink: 0,
            }}
          >
            <Button
              type="text"
              shape="circle"
              size="small"
              icon={<LeftOutlined style={{ fontSize: 11, color: "#64748b" }} />}
              onClick={() => scroll("left")}
              aria-label="Cuộn gợi ý sang trái"
            />
            <Button
              type="text"
              shape="circle"
              size="small"
              icon={<RightOutlined style={{ fontSize: 11, color: "#64748b" }} />}
              onClick={() => scroll("right")}
              aria-label="Cuộn gợi ý sang phải"
            />
          </div>
        )}
      </div>
    </div>
  );
}
