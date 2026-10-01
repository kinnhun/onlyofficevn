"use client";

import { ShieldCheck, FileText, CheckCircle2, PhoneCall } from "lucide-react";

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

          {/* Button 2: Direct Messenger Chat */}
          <a
            href="https://m.me/onlyoffice.official.vn"
            target="_blank"
            rel="noopener noreferrer"
            title="Nhắn tin trực tiếp qua Facebook Messenger"
            style={{
              backgroundColor: "#ffffff",
              color: "#1e293b",
              border: "1.5px solid #e2e8f0",
              borderRadius: "10px",
              padding: "13px 26px",
              fontSize: "15.5px",
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#0084FF";
              e.currentTarget.style.backgroundColor = "#f0f7ff";
              e.currentTarget.style.color = "#0066cc";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 132, 255, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.backgroundColor = "#ffffff";
              e.currentTarget.style.color = "#1e293b";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M12 2C6.477 2 2 6.145 2 11.258C2 14.172 3.455 16.78 5.735 18.442V22L9.153 20.124C10.058 20.375 11.017 20.511 12 20.511C17.523 20.511 22 16.366 22 11.258C22 6.145 17.523 2 12 2ZM13.066 14.443L10.459 11.663L5.371 14.443L10.967 8.5L13.64 11.28L18.663 8.5L13.066 14.443Z"
                fill="url(#messenger-hero-grad)"
              />
              <defs>
                <linearGradient
                  id="messenger-hero-grad"
                  x1="2"
                  y1="2"
                  x2="22"
                  y2="22"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#00B2FE" />
                  <stop offset="0.5" stopColor="#006AFF" />
                  <stop offset="1" stopColor="#9B33FF" />
                </linearGradient>
              </defs>
            </svg>
            <span>Chat Messenger Báo Giá</span>
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
