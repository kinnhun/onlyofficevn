"use client";

import React from "react";
import { Sparkles, FileText, Download, ShieldAlert } from "lucide-react";

export default function DemoHero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      style={{
        padding: "52px 20px 32px",
        textAlign: "center",
        background: "linear-gradient(180deg, #fff7ed 0%, #fafafa 60%, #ffffff 100%)",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Official Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 18px",
            borderRadius: "9999px",
            backgroundColor: "#ffffff",
            border: "1px solid #fed7aa",
            marginBottom: "18px",
            boxShadow: "0 2px 8px rgba(234, 88, 12, 0.08)",
          }}
        >
          <Sparkles size={14} color="#ea580c" />
          <span
            style={{
              fontSize: "12px",
              fontWeight: 800,
              color: "#ea580c",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            TRẢI NGHIỆM ĐÁM MÂY CHÍNH HÃNG — MERCY TECH
          </span>
        </div>

        {/* Main Heading */}
        <h1
          style={{
            fontSize: "40px",
            fontWeight: 800,
            lineHeight: 1.25,
            color: "#333333",
            margin: "0 0 16px",
            letterSpacing: "-0.02em",
          }}
        >
          Trải nghiệm Trực tuyến <span style={{ color: "#ff6f3d" }}>OnlyOffice</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.6,
            color: "#666666",
            maxWidth: "720px",
            margin: "0 auto 28px",
          }}
        >
          Hệ thống chạy trực tiếp chính hãng. Chọn các danh mục bên dưới để trải nghiệm ngay khả năng tương thích định dạng Microsoft Office xuất sắc và nhận bản quyền dùng thử 7 ngày.
        </p>

        {/* 3 Quick Jump Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => scrollTo("demo-online")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "9999px",
              backgroundColor: "#ffffff",
              border: "1px solid #cbd5e1",
              fontSize: "13px",
              fontWeight: 700,
              color: "#334155",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ff6f3d";
              e.currentTarget.style.color = "#ea580c";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#cbd5e1";
              e.currentTarget.style.color = "#334155";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <FileText size={15} color="#ff6f3d" />
            <span>Demo Trực Tuyến</span>
          </button>

          <button
            type="button"
            onClick={() => scrollTo("demo-pc")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "9999px",
              backgroundColor: "#ffffff",
              border: "1px solid #cbd5e1",
              fontSize: "13px",
              fontWeight: 700,
              color: "#334155",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ff6f3d";
              e.currentTarget.style.color = "#ea580c";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#cbd5e1";
              e.currentTarget.style.color = "#334155";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Download size={15} color="#ff6f3d" />
            <span>Kích Hoạt Dùng Thử 7 Ngày (PC)</span>
          </button>

          <button
            type="button"
            onClick={() => scrollTo("mercy-check")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "9999px",
              backgroundColor: "#fff7ed",
              border: "1px solid #fed7aa",
              fontSize: "13px",
              fontWeight: 700,
              color: "#ea580c",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(234,88,12,0.1)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#ffedd5";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#fff7ed";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <ShieldAlert size={15} color="#ea580c" />
            <span>Quét Crack Hệ Thống (MercyCheck)</span>
          </button>
        </div>
      </div>
    </section>
  );
}
