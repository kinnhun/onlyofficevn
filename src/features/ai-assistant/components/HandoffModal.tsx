"use client";

import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Button, Alert, Checkbox } from "antd";
import {
  CustomerServiceOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import type { SupportIssue } from "../types/support.types";

type HandoffModalProps = {
  isOpen: boolean;
  onClose: () => void;
  conversationId?: string;
  activeIssue?: SupportIssue | null;
  defaultCustomerName?: string;
  defaultContact?: string;
  supportHours?: string;
  onSubmitted?: (ticketId: string) => void;
};

export function HandoffModal({
  isOpen,
  onClose,
  conversationId,
  activeIssue,
  defaultCustomerName = "",
  defaultContact = "",
  supportHours = "08:00 – 17:30 (Thứ 2 – Thứ 7)",
  onSubmitted,
}: HandoffModalProps) {
  const [customerName, setCustomerName] = useState(defaultCustomerName);
  const [contactChannel, setContactChannel] = useState<"phone_zalo" | "email">(
    defaultContact.includes("@") ? "email" : "phone_zalo"
  );
  const [contactValue, setContactValue] = useState(defaultContact);
  const [issueDescription, setIssueDescription] = useState("");
  const [ultraViewerId, setUltraViewerId] = useState("");
  const [ultraViewerPass, setUltraViewerPass] = useState("");
  const [externalNotifyConsent, setExternalNotifyConsent] = useState(true);

  const [idempotencyKey, setIdempotencyKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{
    ticketId: string;
    supportHours: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setSubmittedTicket(null);
    setErrorMsg("");
    setIdempotencyKey(
      `tkt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    );
    if (defaultCustomerName && !customerName) {
      setCustomerName(defaultCustomerName);
    }
    if (defaultContact && !contactValue) {
      setContactValue(defaultContact);
      setContactChannel(defaultContact.includes("@") ? "email" : "phone_zalo");
    }
    if (activeIssue && !issueDescription) {
      const autoSummary = [
        activeIssue.title !== "Hỗ trợ kỹ thuật ONLYOFFICE"
          ? activeIssue.title
          : "",
        activeIssue.observedErrors.length > 0
          ? `Biểu hiện ghi nhận: ${activeIssue.observedErrors.join("; ")}`
          : "",
      ]
        .filter(Boolean)
        .join(" — ");
      if (autoSummary) setIssueDescription(autoSummary);
    }
  }, [
    isOpen,
    defaultCustomerName,
    defaultContact,
    activeIssue,
    customerName,
    contactValue,
    issueDescription,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactValue.trim() || !issueDescription.trim()) {
      setErrorMsg(
        "Vui lòng nhập thông tin liên hệ (SĐT/Zalo hoặc Email) và mô tả ngắn gọn vấn đề."
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/support/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idempotencyKey,
          conversationId,
          customerName: customerName.trim(),
          contactChannel,
          contactValue: contactValue.trim(),
          issueDescription: issueDescription.trim(),
          product: activeIssue?.product,
          edition: activeIssue?.edition,
          os: activeIssue?.os,
          ultraViewerId: ultraViewerId.trim() || undefined,
          ultraViewerPass: ultraViewerPass.trim() || undefined,
          externalNotifyConsent,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Chưa thể lưu phiếu hỗ trợ. Vui lòng thử lại.");
        return;
      }

      setSubmittedTicket({
        ticketId: data.ticketId,
        supportHours: data.supportHours || supportHours,
      });
      onSubmitted?.(data.ticketId);
    } catch {
      setErrorMsg("Kết nối tạm gián đoạn. Vui lòng thử bấm Gửi lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={540}
      styles={{
        body: { padding: 0, overflow: "hidden", borderRadius: "16px" },
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 20px",
          backgroundColor: "#fff7ed",
          borderBottom: "1px solid #fed7aa",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            backgroundColor: "#ea580c",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            flexShrink: 0,
          }}
        >
          <CustomerServiceOutlined />
        </div>
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "15px",
              fontWeight: 800,
              color: "#1e293b",
            }}
          >
            Chuyển phiếu sang Kỹ thuật viên Mercy Tech
          </h3>
          <p
            style={{
              margin: "2px 0 0 0",
              fontSize: "12px",
              color: "#64748b",
            }}
          >
            Đính kèm tự động lịch sử chẩn đoán & ảnh chụp màn hình để không phải kể lại từ đầu
          </p>
        </div>
      </div>

      {submittedTicket ? (
        <div style={{ padding: "28px 24px", textAlign: "center" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              backgroundColor: "#dcfce7",
              color: "#16a34a",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              marginBottom: "16px",
            }}
          >
            <CheckCircleOutlined />
          </div>
          <h4 style={{ margin: "0 0 8px 0", fontSize: "18px", fontWeight: 800, color: "#1e293b" }}>
            Đã lưu phiếu hỗ trợ #{submittedTicket.ticketId}
          </h4>
          <p style={{ margin: "0 auto 12px auto", fontSize: "13px", color: "#475569", lineHeight: "1.6", maxWidth: "420px" }}>
            Kỹ thuật viên Mercy Tech sẽ tiếp nhận hồ sơ chẩn đoán và liên hệ phản hồi qua{" "}
            <strong style={{ color: "#0f172a" }}>{contactValue}</strong>.
          </p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "8px",
              backgroundColor: "#f1f5f9",
              color: "#1e293b",
              fontSize: "12px",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            <ClockCircleOutlined style={{ color: "#ea580c" }} />
            <span>Giờ làm việc kỹ thuật: {submittedTicket.supportHours}</span>
          </div>
          <p style={{ margin: "0 0 20px 0", fontSize: "11px", color: "#64748b" }}>
            Nếu gửi ngoài giờ làm việc, phiếu được xếp hàng ưu tiên xử lý vào đầu ca sáng tiếp theo.
            Zalo CSKH chính thức: <strong>0763 068 614</strong> (Mercy Tech Global).
          </p>
          <Button
            type="primary"
            size="large"
            onClick={onClose}
            style={{
              background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
              border: "none",
              borderRadius: "10px",
              fontWeight: 700,
              padding: "0 24px",
            }}
          >
            Đóng và quay lại hội thoại
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
          {errorMsg && (
            <Alert message={errorMsg} type="error" showIcon style={{ fontSize: "12px" }} />
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#1e293b", marginBottom: "4px" }}>
                Tên xưng hô / Đơn vị
              </label>
              <Input
                placeholder="Ví dụ: Anh Minh - Kế toán"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                style={{ borderRadius: "8px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#1e293b", marginBottom: "4px" }}>
                Kênh nhận phản hồi <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <div style={{ display: "flex", gap: "6px" }}>
                <Select
                  value={contactChannel}
                  onChange={(val) => setContactChannel(val)}
                  style={{ width: "105px" }}
                  options={[
                    { value: "phone_zalo", label: "SĐT/Zalo" },
                    { value: "email", label: "Email" },
                  ]}
                />
                <Input
                  required
                  placeholder={contactChannel === "email" ? "ten@congty.vn" : "09xxxxxxxx"}
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  style={{ borderRadius: "8px", flex: 1 }}
                />
              </div>
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#1e293b", marginBottom: "4px" }}>
              Tóm tắt vấn đề cần hỗ trợ <span style={{ color: "#dc2626" }}>*</span>
            </label>
            <Input.TextArea
              rows={3}
              required
              placeholder="Mô tả lỗi hoặc yêu cầu cần kỹ thuật viên kiểm tra..."
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              style={{ borderRadius: "8px" }}
            />
          </div>

          <div
            style={{
              padding: "12px",
              backgroundColor: "#f8fafc",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ fontSize: "11.5px", fontWeight: 700, color: "#1e293b" }}>
              Tùy chọn điều khiển từ xa UltraViewer (chỉ điền khi cần kỹ thuật vào máy):
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <Input
                placeholder="UltraViewer ID (tùy chọn)"
                value={ultraViewerId}
                onChange={(e) => setUltraViewerId(e.target.value)}
                style={{ fontFamily: "monospace", borderRadius: "6px", fontSize: "12px" }}
              />
              <Input
                placeholder="Mật khẩu tạm (tùy chọn)"
                value={ultraViewerPass}
                onChange={(e) => setUltraViewerPass(e.target.value)}
                style={{ fontFamily: "monospace", borderRadius: "6px", fontSize: "12px" }}
              />
            </div>
          </div>

          <Checkbox
            checked={externalNotifyConsent}
            onChange={(e) => setExternalNotifyConsent(e.target.checked)}
            style={{ fontSize: "11.5px", color: "#64748b" }}
          >
            Đồng ý gửi thông báo phiếu hỗ trợ tới kênh trực kỹ thuật nội bộ của Mercy Tech
            (không đính kèm mật khẩu tài khoản hay mã kích hoạt đầy đủ).
          </Checkbox>

          <div
            style={{
              paddingTop: "12px",
              borderTop: "1px solid #f1f5f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: "11.5px", color: "#64748b", display: "flex", alignItems: "center", gap: "4px" }}>
              <SafetyCertificateOutlined style={{ color: "#ea580c" }} />
              <span>Giờ trực: {supportHours}</span>
            </span>

            <div style={{ display: "flex", gap: "8px" }}>
              <Button onClick={onClose} style={{ borderRadius: "8px", fontWeight: 600 }}>
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                style={{
                  background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 700,
                }}
              >
                {isSubmitting ? "Đang tạo phiếu..." : "Tạo phiếu hỗ trợ"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </Modal>
  );
}
