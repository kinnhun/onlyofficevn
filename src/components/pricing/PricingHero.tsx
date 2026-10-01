"use client";

import React from "react";
import { ShieldCheck, Diamond, Handshake, ArrowRight, PhoneCall, Sparkles } from "lucide-react";

interface PricingHeroProps {
  onOpenRegister: () => void;
}

export default function PricingHero({ onOpenRegister }: PricingHeroProps) {
  return (
    <section
      style={{
        background: "linear-gradient(180deg, #f0f7ff 0%, #e0effe 50%, #ffffff 100%)",
        padding: "54px 24px 36px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "350px",
          background: "radial-gradient(circle, rgba(2, 132, 199, 0.18) 0%, rgba(255, 111, 61, 0.12) 50%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1240px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Top Badges: Category & 3 Core Guarantees */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {/* Main Category Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#003b8e",
              color: "#ffffff",
              padding: "7px 18px",
              borderRadius: "999px",
              fontSize: "12.5px",
              fontWeight: 800,
              letterSpacing: "0.6px",
              textTransform: "uppercase",
              boxShadow: "0 4px 14px rgba(0, 59, 142, 0.25)",
            }}
          >
            <Sparkles size={14} color="#facc15" />
            <span>CHƯƠNG TRÌNH ĐỐI TÁC & ĐẠI LÝ</span>
          </div>

          {/* 3 Trust Badges */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                backgroundColor: "#ffffff",
                padding: "6px 14px",
                borderRadius: "8px",
                border: "1px solid #bfdbfe",
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                fontSize: "12px",
                fontWeight: 700,
                color: "#1e3a8a",
              }}
            >
              <ShieldCheck size={16} color="#0284c7" />
              <span>SẢN PHẨM CHÍNH HÃNG</span>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                backgroundColor: "#ffffff",
                padding: "6px 14px",
                borderRadius: "8px",
                border: "1px solid #bfdbfe",
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                fontSize: "12px",
                fontWeight: 700,
                color: "#1e3a8a",
              }}
            >
              <Diamond size={16} color="#0284c7" />
              <span>BẢO HÀNH VĨNH VIỄN</span>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                backgroundColor: "#ffffff",
                padding: "6px 14px",
                borderRadius: "8px",
                border: "1px solid #bfdbfe",
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                fontSize: "12px",
                fontWeight: 700,
                color: "#1e3a8a",
              }}
            >
              <Handshake size={16} color="#0284c7" />
              <span>ĐỒNG HÀNH LÂU DÀI</span>
            </div>
          </div>
        </div>

        {/* Hero Title & Subheading */}
        <div style={{ textAlign: "center", maxWidth: "980px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 54px)",
              fontWeight: 900,
              color: "#002b66",
              letterSpacing: "-0.5px",
              lineHeight: 1.15,
              marginBottom: "12px",
              textTransform: "uppercase",
            }}
          >
            GÓI ĐẠI LÝ TIÊU CHUẨN
          </h1>

          <div
            style={{
              fontSize: "clamp(18px, 2.8vw, 26px)",
              fontWeight: 800,
              color: "#0284c7",
              marginBottom: "14px",
              letterSpacing: "-0.2px",
            }}
          >
            200 Key Online + 50 Tem Cào Vật Lý Hologram
          </div>

          <div
            style={{
              display: "inline-block",
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              border: "1px solid #bae6fd",
              padding: "8px 20px",
              borderRadius: "999px",
              fontSize: "14.5px",
              fontWeight: 600,
              color: "#334155",
              boxShadow: "0 2px 8px rgba(2, 132, 199, 0.08)",
              backdropFilter: "blur(6px)",
              marginBottom: "24px",
            }}
          >
            🎯 Dành cho cửa hàng máy tính & thợ IT khởi động kinh doanh bản quyền bài bản tại khu vực
          </div>

          {/* Quick CTA Buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
            <button
              onClick={onOpenRegister}
              style={{
                backgroundColor: "#ff6f3d",
                backgroundImage: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                padding: "14px 28px",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 16px rgba(234, 88, 12, 0.35)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(234, 88, 12, 0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(234, 88, 12, 0.35)";
              }}
            >
              <span>ĐĂNG KÝ GÓI ĐẠI LÝ NGAY</span>
              <ArrowRight size={17} />
            </button>

            <a
              href="https://zalo.me/0763068614"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#ffffff",
                color: "#003b8e",
                border: "1.5px solid #0284c7",
                borderRadius: "10px",
                padding: "14px 24px",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f0f9ff";
                e.currentTarget.style.borderColor = "#0369a1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.borderColor = "#0284c7";
              }}
            >
              <PhoneCall size={17} color="#0284c7" />
              <span>Tư Vấn Zalo: 0763.068.614</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
