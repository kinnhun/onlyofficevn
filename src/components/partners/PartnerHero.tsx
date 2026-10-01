"use client";

import React from "react";
import { ShieldCheck, Award, Users, Lock, MessageCircle, FileText } from "lucide-react";

interface PartnerHeroProps {
  onOpenModal: (pkgName?: string) => void;
}

export default function PartnerHero({ onOpenModal }: PartnerHeroProps) {
  return (
    <section
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        padding: "56px 20px 48px",
        textAlign: "center",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#fff7ed",
            color: "#ea580c",
            border: "1px solid #fed7aa",
            padding: "8px 20px",
            borderRadius: "30px",
            fontSize: "12px",
            fontWeight: 800,
            letterSpacing: "0.06em",
            marginBottom: "20px",
            boxShadow: "0 2px 8px rgba(234, 88, 12, 0.08)",
          }}
        >
          <span style={{ fontSize: "14px" }}>🇻🇳</span>
          <span>CHƯƠNG TRÌNH ĐỐI TÁC & ĐẠI LÝ ONLYOFFICE CHÍNH HÃNG TẠI VIỆT NAM</span>
        </div>

        <h1
          style={{
            fontSize: "40px",
            fontWeight: 800,
            color: "#1e293b",
            lineHeight: 1.25,
            margin: "0 0 18px",
            letterSpacing: "-0.02em",
          }}
        >
          Chương Trình Đối Tác & Đại Lý OnlyOffice
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#475569",
            maxWidth: "880px",
            margin: "0 auto 32px",
            lineHeight: 1.6,
          }}
        >
          Giải pháp tối ưu hóa pháp lý & kỹ thuật phần mềm văn phòng <strong>OnlyOffice bản quyền tại Việt Nam</strong> — 
          Phương án thay thế <strong>Microsoft Office crack lậu tối ưu</strong>, tiết kiệm đến <strong>90% chi phí</strong> cho doanh nghiệp.
        </p>

        {/* Highlight Pills */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "14px",
            flexWrap: "wrap",
            marginBottom: "36px",
          }}
        >
          {[
            { icon: <ShieldCheck size={16} color="#2563eb" />, text: "SẢN PHẨM CHÍNH HÃNG" },
            { icon: <Award size={16} color="#d97706" />, text: "BẢO HÀNH VĨNH VIỄN" },
            { icon: <Users size={16} color="#059669" />, text: "ĐỒNG HÀNH LÂU DÀI" },
            { icon: <Lock size={16} color="#dc2626" />, text: "GIÁ SỈ BẢO MẬT ĐẠI LÝ" },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: "20px",
                padding: "6px 14px",
                fontSize: "12px",
                fontWeight: 700,
                color: "#334155",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Main Action Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => onOpenModal("Đăng Ký Tư Vấn Đại Lý Sỉ")}
            style={{
              backgroundColor: "#ff6f3d",
              color: "#ffffff",
              border: "none",
              padding: "15px 32px",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "15px",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(255, 111, 61, 0.35)",
              transition: "background-color 0.2s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ea580c")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff6f3d")}
          >
            <Lock size={18} />
            <span>Nhận Báo Giá Sỉ & Chính Sách Bảo Mật</span>
          </button>

          <a
            href="https://m.me/onlyoffice.official.vn"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "linear-gradient(135deg, #00B2FE 0%, #006AFF 50%, #9B33FF 100%)",
              color: "#ffffff",
              textDecoration: "none",
              padding: "15px 28px",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "15px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 14px rgba(0, 106, 255, 0.35)",
            }}
          >
            <MessageCircle size={18} />
            <span>Nhắn Tin Messenger Ngay</span>
          </a>
        </div>
      </div>
    </section>
  );
}
