"use client";

import React from "react";
import { ShieldCheck, FileText, CheckCircle2, MessageCircle, PhoneCall, Sparkles } from "lucide-react";

interface PricingHeroBannerProps {
  onOpenQuote: () => void;
}

export default function PricingHeroBanner({ onOpenQuote }: PricingHeroBannerProps) {
  return (
    <section
      style={{
        padding: "56px 24px 36px",
        background: "linear-gradient(180deg, #fff7ed 0%, #fafafa 60%, #ffffff 100%)",
        borderBottom: "1px solid #f0f0f0",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Official Distributor Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 18px",
            borderRadius: "9999px",
            backgroundColor: "#ffffff",
            border: "1px solid #fed7aa",
            marginBottom: "20px",
            boxShadow: "0 2px 8px rgba(234, 88, 12, 0.08)",
          }}
        >
          <span style={{ fontSize: "14px" }}>🇻🇳</span>
          <span
            style={{
              fontSize: "12.5px",
              fontWeight: 800,
              color: "#ea580c",
              letterSpacing: "0.4px",
              textTransform: "uppercase",
            }}
          >
            ĐƠN VỊ PHÂN PHỐI CHÍNH THỨC TẠI VIỆT NAM
          </span>
          <span style={{ color: "#cbd5e1", fontSize: "14px" }}>•</span>
          <span
            style={{
              fontSize: "12.5px",
              fontWeight: 700,
              color: "#475569",
            }}
          >
            CÔNG TY TNHH CÔNG NGHỆ MERCY
          </span>
        </div>

        {/* Main Heading */}
        <h1
          style={{
            fontSize: "44px",
            fontWeight: 800,
            lineHeight: 1.25,
            color: "#333333",
            margin: "0 0 16px",
            letterSpacing: "-0.02em",
          }}
        >
          Bảng Giá & Chính Sách Bản Quyền{" "}
          <span style={{ color: "#ff6f3d" }}>ONLYOFFICE</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "17px",
            lineHeight: 1.6,
            color: "#666666",
            maxWidth: "800px",
            margin: "0 auto 28px",
          }}
        >
          Chính sách giá ưu đãi bảo mật theo quy mô thiết bị và đối tác. Cấp phép vĩnh viễn theo Mainboard máy tính, đầy đủ hóa đơn điện tử VAT, hợp đồng kinh tế và chứng nhận nguồn gốc mộc đỏ của Công ty TNHH Công Nghệ Mercy.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "14px",
            flexWrap: "wrap",
            marginBottom: "32px",
          }}
        >
          <button
            type="button"
            onClick={onOpenQuote}
            style={{
              backgroundColor: "#ff6f3d",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              padding: "14px 28px",
              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 14px rgba(255, 111, 61, 0.3)",
              transition: "background-color 0.2s ease, transform 0.1s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ff8559")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff6f3d")}
          >
            <PhoneCall size={18} />
            <span>Liên Hệ Nhận Báo Giá Ưu Đãi</span>
          </button>

          <a
            href="https://zalo.me/0763068614"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#ffffff",
              color: "#333333",
              border: "1.5px solid #d4d4d8",
              borderRadius: "6px",
              padding: "13px 24px",
              fontSize: "15px",
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "border-color 0.2s ease, background-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ff6f3d";
              e.currentTarget.style.color = "#ff6f3d";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#d4d4d8";
              e.currentTarget.style.color = "#333333";
            }}
          >
            <MessageCircle size={18} color="#0068ff" />
            <span>Chat Zalo Báo Giá (0763.068.614)</span>
          </a>
        </div>

        {/* 3 Core Trust Badges */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "24px",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "12px 24px",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e5e5e5",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 700, color: "#333333" }}>
            <CheckCircle2 size={16} color="#16a34a" />
            <span>Xuất Hóa Đơn VAT Điện Tử</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 700, color: "#333333" }}>
            <FileText size={16} color="#ff6f3d" />
            <span>Hợp Đồng & Biên Bản Mộc Đỏ</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 700, color: "#333333" }}>
            <ShieldCheck size={16} color="#2563eb" />
            <span>Bản Quyền Vĩnh Viễn Theo Main</span>
          </div>
        </div>
      </div>
    </section>
  );
}
