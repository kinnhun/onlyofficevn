"use client";

import React from "react";
import { Select, Button, Tag, Spin } from "antd";
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  RedoOutlined,
  CheckCircleFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import type { PendingClientAttachment } from "../hooks/useSupportChat";
import type { AttachmentRoleTag } from "../types/support.types";

type AttachmentPreviewBarProps = {
  items: PendingClientAttachment[];
  onRemove: (localId: string) => void;
  onRetry: (localId: string) => void;
  onEditImage: (item: PendingClientAttachment) => void;
  onChangeRoleTag: (localId: string, roleTag: AttachmentRoleTag) => void;
  compact?: boolean;
};

export function AttachmentPreviewBar({
  items,
  onRemove,
  onRetry,
  onEditImage,
  onChangeRoleTag,
  compact = false,
}: AttachmentPreviewBarProps) {
  if (items.length === 0) return null;

  return (
    <div
      aria-label="Danh sách ảnh đính kèm trước khi gửi"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        paddingBottom: "8px",
      }}
    >
      {items.map((item, idx) => (
        <div
          key={item.localId}
          style={{
            position: "relative",
            borderRadius: "10px",
            border: item.status === "error" ? "1px solid #fca5a5" : "1px solid #e5e7eb",
            backgroundColor: item.status === "error" ? "#fef2f2" : "#ffffff",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            width: compact ? "100%" : "auto",
            minWidth: compact ? "100%" : "250px",
            maxWidth: "100%",
          }}
        >
          {/* Thumbnail */}
          <div
            style={{
              position: "relative",
              width: "48px",
              height: "48px",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "#f3f4f6",
              border: "1px solid #e5e7eb",
              flexShrink: 0,
            }}
          >
            <img
              src={item.previewObjectUrl}
              alt={`Ảnh xem trước ${idx + 1}: ${item.fileName}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {item.status === "uploading" && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(17, 24, 39, 0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Spin size="small" />
              </div>
            )}
          </div>

          {/* Details */}
          <div style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "4px" }}>
              <span
                style={{
                  fontSize: "11.5px",
                  fontWeight: 700,
                  color: "#111827",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "150px",
                }}
              >
                #{idx + 1} · {item.fileName}
              </span>
              <Button
                type="text"
                size="small"
                danger
                icon={<DeleteOutlined style={{ fontSize: "12px" }} />}
                onClick={() => onRemove(item.localId)}
                style={{ width: "20px", height: "20px", padding: 0 }}
                title={`Xóa ảnh ${item.fileName}`}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
              <Select
                size="small"
                value={item.roleTag}
                onChange={(val) => onChangeRoleTag(item.localId, val as AttachmentRoleTag)}
                style={{ width: "125px", fontSize: "11px" }}
                options={[
                  { value: "default", label: "Ảnh lỗi / màn hình" },
                  { value: "before", label: "Ảnh Trước" },
                  { value: "after", label: "Ảnh Sau" },
                  { value: "desired_sample", label: "Mẫu mong muốn" },
                ]}
              />

              <Button
                size="small"
                icon={<EyeInvisibleOutlined style={{ color: "#ea580c" }} />}
                onClick={() => onEditImage(item)}
                style={{ fontSize: "11px", padding: "0 6px", height: "24px" }}
              >
                Che/Xoay
              </Button>
            </div>

            {/* Status Tags */}
            {item.status === "ready" && (
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Tag color="success" icon={<CheckCircleFilled />} style={{ margin: 0, fontSize: "10px", lineHeight: "16px" }}>
                  Đã kiểm tra & gỡ EXIF
                </Tag>
              </div>
            )}
            {item.status === "uploading" && (
              <span style={{ fontSize: "10.5px", color: "#ea580c", fontWeight: 600 }}>
                Đang kiểm tra định dạng...
              </span>
            )}
            {item.status === "awaiting_consent" && (
              <span style={{ fontSize: "10.5px", color: "#d97706", fontWeight: 600 }}>
                Chờ xác nhận xử lý ảnh...
              </span>
            )}
            {item.status === "error" && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "4px" }}>
                <span style={{ fontSize: "10.5px", color: "#dc2626", display: "flex", alignItems: "center", gap: "3px" }}>
                  <ExclamationCircleFilled />
                  <span style={{ maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.errorMessage || "Lỗi tải ảnh"}
                  </span>
                </span>
                <Button
                  type="link"
                  size="small"
                  danger
                  icon={<RedoOutlined />}
                  onClick={() => onRetry(item.localId)}
                  style={{ padding: 0, height: "auto", fontSize: "11px", fontWeight: 700 }}
                >
                  Thử lại
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
