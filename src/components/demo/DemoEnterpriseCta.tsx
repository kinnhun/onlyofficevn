"use client";

import React from "react";
import { ShieldCheck, Server, Headphones, FileText, ArrowRight } from "lucide-react";

interface DemoEnterpriseCtaProps {
  onOpenQuote: () => void;
}

export default function DemoEnterpriseCta({ onOpenQuote }: DemoEnterpriseCtaProps) {
  return (
    <section style={{ padding: "40px 20px 70px", backgroundColor: "#fafafa" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          borderRadius: "28px",
          padding: "48px 36px",
          color: "#ffffff",
          boxShadow: "0 20px 40px rgba(15, 23, 42, 0.25)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow decoration */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(234, 88, 12, 0.25) 0%, rgba(234, 88, 12, 0) 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 16px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 111, 61, 0.15)",
              border: "1px solid rgba(255, 111, 61, 0.3)",
              fontSize: "12px",
              fontWeight: 700,
              color: "#fb923c",
              marginBottom: "16px",
              letterSpacing: "0.4px",
              textTransform: "uppercase",
            }}
          >
            <ShieldCheck size={14} />
            <span>GIẢI PHÁP DOANH NGHIỆP & TỔ CHỨC CHÍNH HÃNG</span>
          </div>

          <h2
            style={{
              fontSize: "32px",
              fontWeight: 800,
              lineHeight: 1.3,
              marginBottom: "14px",
              letterSpacing: "-0.01em",
            }}
          >
            Chuyển Đổi Sang OnlyOffice — Tiết Kiệm 70% Chi Phí &amp; Hợp Pháp Hoá 100%
          </h2>

          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.6,
              color: "#94a3b8",
              marginBottom: "36px",
            }}
          >
            Nói không với nguy cơ bị thanh tra bản quyền và mã độc ransomware từ các bản crack lậu.
            Mercy Tech hỗ trợ tư vấn lộ trình triển khai OnlyOffice bản quyền tối ưu ngân sách cho doanh nghiệp của bạn.
          </p>

          {/* 3 Value Pillars */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              marginBottom: "36px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                padding: "20px",
              }}
            >
              <ShieldCheck size={22} color="#fb923c" style={{ marginBottom: "10px" }} />
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", marginBottom: "6px" }}>
                100% Hợp Pháp &amp; Có VAT
              </div>
              <div style={{ fontSize: "12.5px", color: "#94a3b8", lineHeight: 1.5 }}>
                Đầy đủ hợp đồng phân phối, hóa đơn VAT điện tử hợp lệ phục vụ kiểm toán tài chính và kiểm tra SHTT.
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                padding: "20px",
              }}
            >
              <Server size={22} color="#38bdf8" style={{ marginBottom: "10px" }} />
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", marginBottom: "6px" }}>
                On-Premise / Private Cloud
              </div>
              <div style={{ fontSize: "12.5px", color: "#94a3b8", lineHeight: 1.5 }}>
                Tự chủ 100% dữ liệu văn bản nội bộ, tích hợp hoàn hảo với Nextcloud, OwnCloud hoặc máy chủ riêng.
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                padding: "20px",
              }}
            >
              <Headphones size={22} color="#4ade80" style={{ marginBottom: "10px" }} />
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", marginBottom: "6px" }}>
                Hỗ Trợ Kỹ Thuật Tận Tâm
              </div>
              <div style={{ fontSize: "12.5px", color: "#94a3b8", lineHeight: 1.5 }}>
                Đội ngũ kỹ sư Mercy Tech đồng hành cài đặt, hướng dẫn nhân viên và bảo hành kỹ thuật suốt vòng đời.
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "14px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <button
              type="button"
              onClick={onOpenQuote}
              style={{
                background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                padding: "14px 28px",
                fontSize: "15px",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(234, 88, 12, 0.35)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(234, 88, 12, 0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(234, 88, 12, 0.35)";
              }}
            >
              <FileText size={17} />
              <span>Nhận Báo Giá Doanh Nghiệp</span>
              <ArrowRight size={16} />
            </button>

            <a
              href="https://m.me/onlyoffice.official.vn"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#ffffff",
                border: "1.5px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                padding: "13px 24px",
                fontSize: "14.5px",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.18)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2C6.477 2 2 6.145 2 11.258C2 14.172 3.455 16.78 5.735 18.442V22L9.153 20.124C10.058 20.375 11.017 20.511 12 20.511C17.523 20.511 22 16.366 22 11.258C22 6.145 17.523 2 12 2ZM13.066 14.443L10.459 11.663L5.371 14.443L10.967 8.5L13.64 11.28L18.663 8.5L13.066 14.443Z"
                  fill="#0084FF"
                />
              </svg>
              <span>Chat Messenger Báo Giá</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
