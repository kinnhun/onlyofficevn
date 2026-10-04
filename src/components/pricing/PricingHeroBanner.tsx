"use client";

import { ShieldCheck, FileText, CheckCircle2, PhoneCall, MessageCircle } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

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

        {/* Dual CTA Buttons: Quote Form + Messenger Direct */}
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
          {/* Button 1: Open Confidential Quote Form Modal */}
          <button
            type="button"
            onClick={onOpenQuote}
            title="Nhập form nhận báo giá ưu đãi chính hãng"
            style={{
              backgroundColor: "#ff6f3d",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              padding: "14px 28px",
              fontSize: "15.5px",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              boxShadow: "0 4px 14px rgba(255, 111, 61, 0.35)",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f25626";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 111, 61, 0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#ff6f3d";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(255, 111, 61, 0.35)";
            }}
          >
            <PhoneCall size={18} style={{ flexShrink: 0 }} />
            <span>Liên Hệ Nhận Báo Giá Ưu Đãi</span>
          </button>

          {/* Button 2: Direct Contact */}
          <a
            href="https://m.me/onlyoffice.official.vn"
            target="_blank"
            rel="noopener noreferrer"
            onClick={openMessengerChat}
            title="Liên hệ"
            style={{
              background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              padding: "14px 28px",
              fontSize: "15.5px",
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              boxShadow: "0 4px 14px rgba(234, 88, 12, 0.35)",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #f9571f 0%, #c2410c 100%)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(234, 88, 12, 0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(234, 88, 12, 0.35)";
            }}
          >
            <MessageCircle size={19} color="#ffffff" style={{ flexShrink: 0 }} />
            <span>Liên hệ</span>
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
            <ShieldCheck size={16} color="#ff6f3d" />
            <span>Bản Quyền Vĩnh Viễn Theo Main</span>
          </div>
        </div>
      </div>
    </section>
  );
}
