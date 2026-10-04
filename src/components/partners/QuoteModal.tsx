"use client";

import React, { useState, useEffect } from "react";
import { X, Lock, CheckCircle2, Send, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: string;
}

export default function QuoteModal({ isOpen, onClose, selectedPackage }: QuoteModalProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    company: "",
    city: "",
    packageChoice: selectedPackage,
    note: "",
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, packageChoice: selectedPackage }));
    setFormSubmitted(false);
  }, [selectedPackage, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(6px)",
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          maxWidth: "540px",
          width: "100%",
          maxHeight: "92vh",
          overflowY: "auto",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          position: "relative",
          border: "1px solid #e2e8f0",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
            padding: "24px 28px",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            color: "#ffffff",
            position: "relative",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ"
            style={{
              position: "absolute",
              top: "18px",
              right: "18px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              color: "#ffffff",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={18} />
          </button>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              fontSize: "11px",
              fontWeight: 800,
              padding: "4px 10px",
              borderRadius: "12px",
              marginBottom: "8px",
              letterSpacing: "0.06em",
              border: "1px solid rgba(255, 255, 255, 0.35)",
            }}
          >
            <Lock size={12} />
            <span>BẢO MẬT GIÁ SỈ ĐẠI LÝ</span>
          </div>
          <h3 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 6px", color: "#ffffff" }}>
            Nhận Báo Giá Sỉ & Chính Sách Đại Lý
          </h3>
          <div style={{ fontSize: "13px", color: "#ffedd5" }}>
            Gói yêu cầu: <strong style={{ color: "#ffffff" }}>{selectedPackage}</strong>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "26px" }}>
          {formSubmitted ? (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{ display: "inline-flex", padding: "12px", background: "#dcfce7", borderRadius: "50%", marginBottom: "14px" }}>
                <CheckCircle2 size={40} color="#16a34a" />
              </div>
              <h4 style={{ fontSize: "20px", fontWeight: 800, color: "#16a34a", margin: "0 0 8px" }}>
                Tiếp Nhận Thành Công!
              </h4>
              <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6, marginBottom: "22px" }}>
                Chuyên viên Mercy Tech sẽ gửi file báo giá sỉ bảo mật và gọi/nhắn tin đến số <strong>{formData.phone}</strong> trong ít phút.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <a
                  href="https://m.me/onlyoffice.official.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={openMessengerChat}
                  title="Liên hệ ngay"
                  style={{
                    background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                    color: "#ffffff",
                    padding: "13px",
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "14px",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: "0 4px 12px rgba(234, 88, 12, 0.35)",
                  }}
                >
                  <MessageCircle size={18} />
                  <span>Liên hệ ngay</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    backgroundColor: "#f1f5f9",
                    color: "#475569",
                    border: "none",
                    padding: "10px",
                    borderRadius: "8px",
                    fontWeight: 600,
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Đóng cửa sổ
                </button>
              </div>
            </div>
          ) : (
            <>
              <div
                style={{
                  background: "#fff7ed",
                  border: "1px solid #fed7aa",
                  borderRadius: "10px",
                  padding: "12px 14px",
                  fontSize: "12.5px",
                  color: "#9a3412",
                  lineHeight: 1.5,
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                }}
              >
                <ShieldCheck size={18} color="#ea580c" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>
                  <strong>Chính sách bảo mật:</strong> Để đảm bảo biên lợi nhuận cho đại lý đã ký kết, bảng giá sỉ không công khai. Quý đối tác vui lòng để lại thông tin hoặc kết nối liên hệ để nhận file báo giá.
                </span>
              </div>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Họ và tên của bạn <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    style={modalInputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Số điện thoại liên hệ nhận báo giá <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0912 345 678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={modalInputStyle}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                      Tên shop / Công ty IT
                    </label>
                    <input
                      type="text"
                      placeholder="Shop Tin học / IT"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      style={modalInputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                      Tỉnh / Thành phố
                    </label>
                    <input
                      type="text"
                      placeholder="Khu vực hoạt động"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      style={modalInputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Gói hợp tác quan tâm
                  </label>
                  <select
                    value={formData.packageChoice}
                    onChange={(e) => setFormData({ ...formData, packageChoice: e.target.value })}
                    style={modalInputStyle}
                  >
                    <option value="Gói Đại Lý Tiêu Chuẩn (200 Key Online Vĩnh Viễn)">Gói Đại Lý Tiêu Chuẩn (200 Key Online Vĩnh Viễn)</option>
                    <option value="Gói Khởi Nghiệp Độc Quyền Tuyến (200 Key Online Vĩnh Viễn)">Gói Khởi Nghiệp Độc Quyền Tuyến (200 Key Online Vĩnh Viễn)</option>
                    <option value="Gói Đại Lý Sỉ 50 Key Pre-Paid">Gói Đại Lý Sỉ 50 Key Pre-Paid</option>
                    <option value="Gói Đại Lý Sỉ 100 Key Pre-Paid">Gói Đại Lý Sỉ 100 Key Pre-Paid</option>
                    <option value="Gói Đại Lý Sỉ 200 Key VIP">Gói Đại Lý Sỉ 200 Key VIP</option>
                    <option value="Cộng Tác Viên Giới Thiệu / Bán Hàng">Cộng Tác Viên Giới Thiệu / Bán Hàng</option>
                    <option value="Gói Bán Lẻ Doanh Nghiệp">Gói Bán Lẻ Doanh Nghiệp</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor: "#ff6f3d",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "14px",
                    fontWeight: 700,
                    fontSize: "15px",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(255, 111, 61, 0.35)",
                    marginTop: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ea580c")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff6f3d")}
                >
                  <Send size={16} />
                  <span>{loading ? "Đang gửi..." : "Gửi Yêu Cầu — Nhận Báo Giá Sỉ Bảo Mật"}</span>
                </button>
              </form>

              {/* Fast Actions */}
              <div
                style={{
                  marginTop: "18px",
                  paddingTop: "14px",
                  borderTop: "1px solid #e2e8f0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="https://m.me/onlyoffice.official.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={openMessengerChat}
                  title="Liên hệ ngay"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#ea580c",
                    textDecoration: "none",
                  }}
                >
                  <MessageCircle size={16} />
                  <span>Liên hệ ngay</span>
                </a>
                <a
                  href="tel:0763068614"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#16a34a",
                    textDecoration: "none",
                  }}
                >
                  <Phone size={16} />
                  <span>Hotline: 0763.068.614</span>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const modalInputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "13.5px",
  outline: "none",
  boxSizing: "border-box",
  backgroundColor: "#f8fafc",
  color: "#1e293b",
};
