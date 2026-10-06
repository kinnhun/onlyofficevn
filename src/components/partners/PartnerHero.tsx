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
            maxWidth: "100%",
            boxSizing: "border-box",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          <FlagVi width={18} height={13} />
          <span>CHƯƠNG TRÌNH ĐỐI TÁC & ĐẠI LÝ ONLYOFFICE CHÍNH HÃNG TẠI VIỆT NAM</span>
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
            marginBottom: "36px",
          }}
        >
          {[
            { icon: <ShieldCheck size={16} color="#ff6f3d" />, text: "SẢN PHẨM CHÍNH HÃNG" },
            { icon: <Award size={16} color="#ea580c" />, text: "BẢO HÀNH VĨNH VIỄN" },
            { icon: <Users size={16} color="#d97706" />, text: "ĐỒNG HÀNH LÂU DÀI" },
            { icon: <Lock size={16} color="#c2410c" />, text: "GIÁ SỈ BẢO MẬT ĐẠI LÝ" },
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
        <div className="oo-partner-hero-btns">
          <button
            type="button"
            className="oo-partner-hero-btn"
            onClick={() => onOpenModal("Đăng Ký Tư Vấn Đại Lý Sỉ")}
            style={{
              backgroundColor: "#ff6f3d",
              color: "#ffffff",
              border: "none",
              boxShadow: "0 4px 16px rgba(255, 111, 61, 0.35)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ea580c")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff6f3d")}
          >
            <Lock size={18} />
            <span>Nhận Báo Giá Sỉ & Chính Sách Bảo Mật</span>
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
              boxShadow: "0 4px 14px rgba(234, 88, 12, 0.35)",
            }}
          >
            <MessageCircle size={18} />
            <span>Liên hệ</span>
          </a>
        </div>
      </div>
    </section>
  );
}
