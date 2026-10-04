"use client";

import React, { useState } from "react";
import { X, CheckCircle2, PhoneCall, ShieldCheck, ArrowRight } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

interface PricingRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingRegistrationModal({ isOpen, onClose }: PricingRegistrationModalProps) {
  const [formData, setFormData] = useState({
    shopName: "",
    contactName: "",
    phone: "",
    location: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
        padding: "20px",
        boxSizing: "border-box",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          maxWidth: "520px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "32px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          position: "relative",
          boxSizing: "border-box",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "#f1f5f9",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#64748b",
          }}
          aria-label="Đóng popup"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "#dcfce7",
                color: "#16a34a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#002b66", marginBottom: "8px" }}>
              ĐĂNG KÝ THÀNH CÔNG!
            </h3>
            <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.5, marginBottom: "20px" }}>
              Chuyên viên đại lý của <strong>Mercy Tech</strong> sẽ liên hệ với bạn trong vòng 15 phút qua điện thoại/tin nhắn để hoàn tất thủ tục bàn giao hợp đồng và tài khoản Portal.
            </p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <a
                href="https://m.me/onlyoffice.official.vn"
                target="_blank"
                rel="noopener noreferrer"
                onClick={openMessengerChat}
                title="Liên hệ ngay"
                style={{
                  background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                  color: "#ffffff",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 4px 12px rgba(234, 88, 12, 0.35)",
                }}
              >
                Liên hệ ngay
              </a>
              <button
                onClick={onClose}
                style={{
                  backgroundColor: "#f1f5f9",
                  color: "#334155",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: "20px" }}>
              <span
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#003b8e",
                  fontSize: "11px",
                  fontWeight: 800,
                  padding: "4px 12px",
                  borderRadius: "999px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                GÓI ĐẠI LÝ TIÊU CHUẨN
              </span>
              <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#002b66", margin: "8px 0 4px" }}>
                ĐĂNG KÝ NHẬN SUẤT ĐẠI LÝ
              </h3>
              <p style={{ fontSize: "13.5px", color: "#64748b" }}>
                Vốn 34.750.000đ • Doanh thu 134,7 – 209,75 Triệu • Lãi ròng +100 – 175 Triệu
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#1e293b", marginBottom: "4px" }}>
                  Tên cửa hàng máy tính / Doanh nghiệp <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Máy Tính Hoàng Gia / Tin Học Tuấn Anh"
                  value={formData.shopName}
                  onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#1e293b", marginBottom: "4px" }}>
                  Họ và tên người liên hệ <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#1e293b", marginBottom: "4px" }}>
                  Số điện thoại liên hệ nhận chính sách <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0912.345.678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#1e293b", marginBottom: "4px" }}>
                  Khu vực kinh doanh (Tỉnh / Thành phố)
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Hà Nội, TP.HCM, Đà Nẵng, Nghệ An..."
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "14px",
                  fontSize: "15px",
                  fontWeight: 800,
                  cursor: "pointer",
                  marginTop: "6px",
                  boxShadow: "0 4px 14px rgba(234, 88, 12, 0.35)",
                }}
              >
                GỬI ĐĂNG KÝ & NHẬN HỢP ĐỒNG ĐẠI LÝ
              </button>

              <div style={{ textAlign: "center", fontSize: "12px", color: "#64748b" }}>
                🔒 Thông tin được bảo mật 100% theo chính sách phân phối Mercy Tech.
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
