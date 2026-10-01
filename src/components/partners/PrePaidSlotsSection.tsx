"use client";

import React from "react";
import { Layers, Lock, MessageCircle, ArrowRight } from "lucide-react";

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
      title: "GÓI VIP ĐẮT HÀNG",
      sub: "Gói Cấp 3 VIP (200 Key)",
      quantity: "Số lượng nạp: Từ 200 Key",
      desc: "Giá vốn rẻ nhất hệ thống • Đặc quyền đại lý độc quyền",
      badge: "SIÊU LÃI",
      badgeBg: "#fee2e2",
      badgeColor: "#dc2626",
    },
  ];

  return (
    <section style={{ maxWidth: "1248px", margin: "72px auto 0", padding: "0 20px" }}>
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <span
          style={{
            color: "#ff6f3d",
            fontSize: "12px",
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          MỤC 2. NẠP SLOTS LINH HOẠT
        </span>
        <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#1e293b", marginTop: "8px" }}>
          2. Chương Trình Đại Lý Sỉ (Pre-Paid Slots)
        </h2>
        <p style={{ color: "#64748b", fontSize: "16px", maxWidth: "700px", margin: "10px auto 0" }}>
          Cấp tài khoản Admin 24/7 tự quản lý & kích hoạt key — Báo giá sỉ bảo mật dành riêng cho Đối tác
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          marginBottom: "36px",
        }}
      >
        {slots.map((slot, idx) => (
          <div
            key={idx}
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "32px 28px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", fontWeight: 800, color: "#64748b" }}>{slot.title}</span>
                <span style={{ fontSize: "11px", fontWeight: 800, background: slot.badgeBg, color: slot.badgeColor, padding: "3px 10px", borderRadius: "12px" }}>
                  {slot.badge}
                </span>
              </div>

              <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#1e293b", margin: "10px 0 16px" }}>
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
                <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>VỐN NẠP 1 LẦN:</div>
                <div style={{ fontSize: "15px", fontWeight: 800, color: "#dc2626", marginTop: "2px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <Lock size={14} /> Liên hệ để lấy chính sách
                </div>

                <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 600, marginTop: "12px" }}>LỢI NHUẬN RÒNG DỰ KIẾN:</div>
                <div style={{ fontSize: "15px", fontWeight: 800, color: "#16a34a", marginTop: "2px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
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
                backgroundColor: "#1e293b",
                border: "none",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ff6f3d")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1e293b")}
            >
              Nhận Báo Giá {slot.sub}
            </button>
          </div>
        ))}
      </div>

      {/* Banner Bảo Mật Giá Sỉ Cho Đại Lý */}
      <div
        style={{
          background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
          border: "2px dashed #fdba74",
          borderRadius: "16px",
          padding: "32px",
          textAlign: "center",
        }}
      >
        <div style={{ display: "inline-flex", padding: "10px", background: "#fed7aa", borderRadius: "50%", marginBottom: "10px" }}>
          <Lock size={24} color="#c2410c" />
        </div>
        <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#9a3412", margin: "0 0 8px" }}>
          BẢO MẬT GIÁ SỈ CHO ĐẠI LÝ
        </h3>
        <p style={{ color: "#7c2d12", fontSize: "15px", maxWidth: "680px", margin: "0 auto 20px", lineHeight: 1.6 }}>
          Để bảo vệ quyền lợi Đại lý & Khách hàng, bảng giá sỉ không hiển thị công khai trên website. Vui lòng bấm vào nút bên dưới để nhắn tin Messenger cho Mercy Tech nhận file Báo Giá Sỉ Chi Tiết & Chính Sách Chiết Khấu Đại Lý tốt nhất.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => onOpenModal("Báo Giá Sỉ Đại Lý Pre-Paid")}
            style={{
              backgroundColor: "#ea580c",
              color: "#ffffff",
              border: "none",
              padding: "13px 26px",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Mở Popup Nhận Báo Giá Sỉ
          </button>
          <a
            href="https://m.me/onlyoffice.official.vn"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "linear-gradient(135deg, #00B2FE 0%, #006AFF 50%, #9B33FF 100%)",
              color: "#ffffff",
              textDecoration: "none",
              padding: "13px 26px",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "14px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 4px 12px rgba(0, 106, 255, 0.3)",
            }}
          >
            <MessageCircle size={16} />
            <span>Nhận Báo Giá Sỉ Qua Messenger</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
