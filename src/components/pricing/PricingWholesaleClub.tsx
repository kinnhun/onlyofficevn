"use client";

import React from "react";
import { Briefcase, Lock } from "lucide-react";

interface PricingWholesaleClubProps {
  onOpenQuote: (productName?: string) => void;
}

export default function PricingWholesaleClub({ onOpenQuote }: PricingWholesaleClubProps) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
        borderRadius: "16px",
        padding: "36px 40px",
        color: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "24px",
        boxShadow: "0 10px 30px rgba(234, 88, 12, 0.22)",
        marginTop: "0",
      }}
    >
      <div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.35)",
            padding: "4px 12px",
            borderRadius: "14px",
            fontSize: "11.5px",
            fontWeight: 800,
            color: "#ffffff",
            marginBottom: "10px",
          }}
        >
          <Briefcase size={14} color="#ffffff" />
          <span>CHƯƠNG TRÌNH ĐỐI TÁC ĐẠI LÝ & CỬA HÀNG MÁY TÍNH</span>
        </div>
        <h3 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 8px", color: "#ffffff" }}>
          Nhập Sỉ OnlyOffice Để Phân Phối Cùng Mercy Tech
        </h3>
        <p style={{ fontSize: "14.5px", color: "#ffedd5", margin: 0, maxWidth: "680px", lineHeight: 1.6 }}>
          Chính sách chiết khấu sỉ cực cao dành riêng cho Đại lý & Kỹ thuật viên IT. Cung cấp bộ cài White-label riêng, kho Marketing hàng tuần, Hợp đồng mộc đỏ và hỗ trợ kỹ thuật trực tiếp.
        </p>
      </div>

      <button
        type="button"
        onClick={() => onOpenQuote("Gói Đại Lý Phân Phối Sỉ")}
        style={{
          backgroundColor: "#ffffff",
          color: "#ea580c",
          border: "none",
          borderRadius: "8px",
          padding: "14px 28px",
          fontSize: "15px",
          fontWeight: 800,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
        }}
      >
        <Lock size={16} color="#ea580c" />
        <span>Nhận Bảng Giá Sỉ Đại Lý</span>
      </button>
    </div>
  );
}
