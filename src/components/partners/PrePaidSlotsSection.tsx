"use client";

import React from "react";
import { Layers, Lock, MessageCircle, ArrowRight } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

interface PrePaidSlotsSectionProps {
  onOpenModal: (pkgName?: string) => void;
}

export default function PrePaidSlotsSection({ onOpenModal }: PrePaidSlotsSectionProps) {
  const slots = [
    {
      title: "GÓI KHỞI ĐỘNG",
      sub: "Gói Cấp 1 (50 Key)",
      quantity: "Số lượng nạp: 50 Key",
      desc: "Tài khoản Admin xuất key 24/7 • Hỗ trợ kỹ thuật UltraView",
      badge: "CẤP 1",
      badgeBg: "#f1f5f9",
      badgeColor: "#475569",
    },
    {
      title: "GÓI TĂNG TRƯỞNG",
      sub: "Gói Cấp 2 (100 Key)",
      quantity: "Số lượng nạp: 100 Key",
      desc: "Chiết khấu sâu hơn Gói 1 • Ưu tiên hỗ trợ kỹ thuật 24/7",
      badge: "CẤP 2",
      badgeBg: "#e0f2fe",
      badgeColor: "#0369a1",
    },
    {
      title: "GÓI ĐỐI TÁC VIP",
      sub: "Gói Cấp 3 VIP (200 Key)",
      quantity: "Số lượng nạp: Từ 200 Key",
      desc: "Giá sỉ tối ưu nhất hệ thống • Đặc quyền đại lý ưu tiên",
      badge: "VIP",
      badgeBg: "#fff7ed",
      badgeColor: "#ea580c",
    },
  ];

  return (
    <section className="oo-partner-section">
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <div className="oo-partner-kicker">
          NẠP SLOTS LINH HOẠT
        </div>
        <h2 className="oo-partner-heading" style={{ marginTop: "6px" }}>
          Chương Trình Đại Lý Sỉ (Pre-Paid Slots)
        </h2>
        <p className="oo-partner-subheading" style={{ maxWidth: "700px", margin: "8px auto 0" }}>
          Cấp tài khoản Admin 24/7 tự quản lý & xuất key chủ động — Báo giá sỉ bảo mật dành riêng cho Đối tác
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        {slots.map((slot, idx) => (
          <div
            key={idx}
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "28px 24px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12.5px", fontWeight: 800, color: "#64748b", letterSpacing: "0.04em", textTransform: "uppercase" }}>{slot.title}</span>
                <span style={{ fontSize: "11px", fontWeight: 800, background: slot.badgeBg, color: slot.badgeColor, padding: "3px 10px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                  {slot.badge}
                </span>
              </div>

              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: "12px 0 16px" }}>
                {slot.sub}
              </h3>

              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  padding: "16px",
                  marginBottom: "16px",
                }}
              >
                <div style={{ fontSize: "11.5px", color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>VỐN NẠP 1 LẦN:</div>
                <div style={{ fontSize: "14.5px", fontWeight: 800, color: "#ea580c", marginTop: "3px", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                  <Lock size={14} /> Liên hệ để lấy chính sách
                </div>

                <div style={{ fontSize: "11.5px", color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", marginTop: "12px" }}>LỢI NHUẬN RÒNG DỰ KIẾN:</div>
                <div style={{ fontSize: "14.5px", fontWeight: 800, color: "#c2410c", marginTop: "3px", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                  <Lock size={14} /> Liên hệ để lấy chính sách
                </div>
              </div>

              <div style={{ fontSize: "13.5px", color: "#334155", lineHeight: 1.6 }}>
                <div><strong>{slot.quantity}</strong></div>
                <div style={{ color: "#64748b", marginTop: "4px" }}>{slot.desc}</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenModal(slot.sub)}
              style={{
                marginTop: "24px",
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "#ff6f3d",
                border: "none",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(255, 111, 61, 0.25)",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ea580c")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff6f3d")}
            >
              Nhận Báo Giá {slot.sub}
            </button>
          </div>
        ))}
      </div>

      {/* Banner Bảo Mật Giá Sỉ Cho Đại Lý */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "32px 24px",
          textAlign: "center",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "inline-flex", padding: "12px", background: "#fff7ed", borderRadius: "50%", marginBottom: "12px", border: "1px solid #ffedd5" }}>
          <Lock size={22} color="#ea580c" />
        </div>
        <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>
          BẢO MẬT GIÁ SỈ CHO ĐẠI LÝ
        </h3>
        <p style={{ color: "#64748b", fontSize: "14.5px", maxWidth: "680px", margin: "0 auto 20px", lineHeight: 1.6 }}>
          Để bảo vệ quyền lợi Đại lý & Khách hàng, bảng giá sỉ không hiển thị công khai trên website. Vui lòng bấm vào nút bên dưới để liên hệ Mercy Tech nhận file Báo Giá Sỉ Chi Tiết & Chính Sách Chiết Khấu Đại Lý tốt nhất.
        </p>
        <div className="oo-partner-hero-btns" style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
          <button
            type="button"
            className="oo-partner-hero-btn"
            onClick={() => onOpenModal("Báo Giá Sỉ Đại Lý Pre-Paid")}
            style={{
              backgroundColor: "#ffffff",
              border: "1.5px solid #cbd5e1",
              color: "#1e293b",
              padding: "13px 26px",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ff6f3d";
              e.currentTarget.style.color = "#ff6f3d";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#cbd5e1";
              e.currentTarget.style.color = "#1e293b";
            }}
          >
            Mở Popup Nhận Báo Giá Sỉ
          </button>
          <a
            href="https://www.messenger.com/t/286163107904324"
            target="_blank"
            rel="noopener noreferrer"
            onClick={openMessengerChat}
            title="Liên hệ"
            className="oo-partner-hero-btn"
            style={{
              background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
              color: "#ffffff",
              textDecoration: "none",
              padding: "13px 26px",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "14px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 4px 12px rgba(234, 88, 12, 0.25)",
            }}
          >
            <MessageCircle size={16} />
            <span>Liên hệ</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
