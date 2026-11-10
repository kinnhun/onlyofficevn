"use client";

import React from "react";
import { Modal, Button } from "antd";
import {
  SafetyCertificateOutlined,
  CheckOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

type ImageConsentNoticeProps = {
  isOpen: boolean;
  policyVersion: string;
  onAccept: () => void;
  onDecline: () => void;
};

export function ImageConsentNotice({
  isOpen,
  policyVersion,
  onAccept,
  onDecline,
}: ImageConsentNoticeProps) {
  return (
    <Modal
      open={isOpen}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <SafetyCertificateOutlined style={{ color: "#ea580c", fontSize: "20px" }} />
          <span style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>
            Xác nhận xử lý ảnh chụp màn hình ({policyVersion})
          </span>
        </div>
      }
      onCancel={onDecline}
      centered
      width={460}
      footer={[
        <Button
          key="cancel"
          icon={<CloseOutlined />}
          onClick={onDecline}
          style={{ fontWeight: 600 }}
        >
          Hủy tải ảnh
        </Button>,
        <Button
          key="submit"
          type="primary"
          icon={<CheckOutlined />}
          onClick={onAccept}
          style={{
            background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
            border: "none",
            fontWeight: 700,
          }}
        >
          Đồng ý & Tải ảnh
        </Button>,
      ]}
      destroyOnClose
    >
      <div style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6, padding: "8px 0" }}>
        <p style={{ margin: "0 0 12px 0" }}>
          Ảnh chụp màn hình sẽ được hệ thống kiểm tra định dạng, gỡ siêu dữ liệu vị trí (EXIF), lưu
          riêng tư tối đa <strong>7 ngày</strong> và gửi tới mô hình AI hỗ trợ kỹ thuật để đọc thông báo lỗi.
          Khi chuyển phiếu, chỉ kỹ thuật viên được phân công mới có quyền xem ảnh trong thời hạn cho phép.
        </p>
        <div
          style={{
            backgroundColor: "#fff7ed",
            border: "1px solid #fed7aa",
            borderRadius: "8px",
            padding: "10px 12px",
            color: "#9a3412",
            fontSize: "12px",
            lineHeight: 1.5,
            display: "flex",
            gap: "8px",
            alignItems: "flex-start",
          }}
        >
          <InfoCircleOutlined style={{ color: "#ea580c", marginTop: "2px", flexShrink: 0 }} />
          <span>
            <strong>Lưu ý bảo mật:</strong> Vui lòng sử dụng tính năng &ldquo;Che thông tin&rdquo; để tô đen
            mật khẩu, mã OTP, API key hoặc mã bản quyền/tem cào đầy đủ trước khi gửi.
          </span>
        </div>
      </div>
    </Modal>
  );
}
