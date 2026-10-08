"use client";

import React from "react";
import { ShieldCheck, Award, Users, Lock, MessageCircle, FileText } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";
import { FlagVi } from "@/components/HeaderFlags";

interface PartnerHeroProps {
  onOpenModal: (pkgName?: string) => void;
}

export default function PartnerHero({ onOpenModal }: PartnerHeroProps) {
  return (
    <section className="oo-partner-hero-section">
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#f1f5f9",
            color: "#334155",
            border: "1px solid #e2e8f0",
            padding: "7px 18px",
            borderRadius: "30px",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.04em",
            marginBottom: "20px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)",
            maxWidth: "100%",
            boxSizing: "border-box",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          <FlagVi width={18} height={13} />
          <span>CHƯƠNG TRÌNH ĐỐI TÁC & ĐẠI LÝ ONLYOFFICE TẠI VIỆT NAM</span>
        </div>

        <h1 className="oo-partner-hero-title">
          Chương Trình Đối Tác & Đại Lý OnlyOffice
        </h1>

        <p className="oo-partner-hero-desc">
          Giải pháp tối ưu hóa pháp lý & kỹ thuật phần mềm văn phòng <strong>OnlyOffice bản quyền tại Việt Nam</strong> — 
          Phương án thay thế <strong>Microsoft Office crack lậu tối ưu</strong>, tiết kiệm đến <strong>90% chi phí</strong> cho doanh nghiệp.
        </p>

        {/* Highlight Pills */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "32px",
          }}
        >
          {[
            { icon: <ShieldCheck size={16} color="#ff6f3d" />, text: "Sản Phẩm Chính Hãng" },
            { icon: <Award size={16} color="#ff6f3d" />, text: "Bảo Hành Vĩnh Viễn" },
            { icon: <Users size={16} color="#ff6f3d" />, text: "Hỗ Trợ Kỹ Thuật 24/7" },
            { icon: <Lock size={16} color="#ff6f3d" />, text: "Bảo Hộ Biên Lợi Nhuận" },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "20px",
                padding: "6px 14px",
                fontSize: "12.5px",
                fontWeight: 600,
                color: "#334155",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
              }}
            >
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Main Action Buttons */}
        <div className="oo-partner-hero-btns">
          <button
            type="button"
            className="oo-partner-hero-btn"
            onClick={() => onOpenModal("Đăng Ký Tư Vấn Đại Lý Sỉ")}
            style={{
              backgroundColor: "#ff6f3d",
              color: "#ffffff",
              border: "none",
              boxShadow: "0 4px 14px rgba(255, 111, 61, 0.3)",
              fontWeight: 700,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ea580c")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff6f3d")}
          >
            <Lock size={18} />
            <span>Nhận Báo Giá Sỉ & Chính Sách</span>
          </button>

          <a
            href="https://www.messenger.com/t/286163107904324"
            target="_blank"
            rel="noopener noreferrer"
            onClick={openMessengerChat}
            title="Liên hệ tư vấn"
            className="oo-partner-hero-btn"
            style={{
              backgroundColor: "#ffffff",
              color: "#0f172a",
              border: "1.5px solid #cbd5e1",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
              fontWeight: 600,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
          >
            <MessageCircle size={18} color="#ff6f3d" />
            <span>Tư Vấn Trực Tuyến</span>
          </a>
        </div>
      </div>
    </section>
  );
}
