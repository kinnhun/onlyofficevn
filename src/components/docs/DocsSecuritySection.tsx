"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { ShieldCheck, CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

export default function DocsSecuritySection() {
  const locale = useLocale();
  const isVi = locale === "vi";

  const securityPoints = [
    isVi ? "Mã nguồn mở công khai trên GitHub" : "100% Open source codebase audited on GitHub",
    isVi ? "Tuân thủ các tiêu chuẩn bảo mật quốc tế (GDPR, HIPAA, ISO 27001)" : "Fully compliant with GDPR, HIPAA, and ISO 27001 standards",
    isVi ? "3 lớp mã hóa: khi lưu trữ, khi truyền tải, đầu cuối (end-to-end)" : "Triple-layer encryption: at rest, in transit, and end-to-end",
    isVi ? "Công cụ giám sát và kiểm soát truy cập (JWT, HTTPS, 2FA)" : "Enterprise access control with JWT tokens, HTTPS, and 2FA",
    isVi ? "Phân quyền tài liệu chi tiết (Xem, Sửa, Lọc dữ liệu, Điền mẫu)" : "Granular permissions: View, Review, Comment, Modify, Form-fill",
    isVi ? "Hỗ trợ AI model local — dữ liệu không rời khỏi server riêng" : "Local offline AI models — confidential data never leaves your perimeter",
  ];

  const awards = [
    {
      name: "Slashdot Leader Fall 2025",
      img: "https://static-site.onlyoffice.com/public/images/templates/main/rating/awards/slashdot-2025.svg?ver=3",
    },
    {
      name: "Capterra Top 20",
      img: "https://static-site.onlyoffice.com/public/images/templates/main/rating/awards/capterra-2024.svg",
    },
    {
      name: "Tekpon Top Collaboration",
      img: "https://static-site.onlyoffice.com/public/images/templates/main/rating/awards/top-team-collaboration-software-q3-2025.svg",
    },
    {
      name: "Cloud Insider Gold 2025",
      img: "https://static-site.onlyoffice.com/public/images/templates/main/rating/awards/cloudaward-2025.jpg",
    },
    {
      name: "OMR Top Rated",
      img: "https://static-site.onlyoffice.com/public/images/templates/main/rating/awards/office-suites-2023.svg",
    },
    {
      name: "SourceForge Leader Winter 2026",
      img: "https://static-site.onlyoffice.com/public/images/templates/main/rating/awards/leader-sourceforge-winter-2026.svg",
    },
  ];

  return (
    <section
      style={{
        backgroundColor: "#fffbf7",
        padding: "84px 20px 88px",
        borderTop: "1px solid #fed7aa",
        borderBottom: "1px solid #fed7aa",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Split Grid: Left Text & List, Right Visual */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
            alignItems: "center",
          }}
          className="oo-docs-sec-split-responsive"
        >
          <style>{`
            @media (min-width: 960px) {
              .oo-docs-sec-split-responsive {
                grid-template-columns: 1.1fr 0.9fr !important;
              }
            }
          `}</style>

          {/* Left Content */}
          <div>
            <div style={{ alignSelf: "flex-start", marginBottom: "14px" }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#ff6f3d",
                  backgroundColor: "rgba(255, 111, 61, 0.1)",
                  padding: "5px 14px",
                  borderRadius: "100px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                <ShieldCheck size={14} />
                <span>{isVi ? "Bảo mật" : "Enterprise Security"}</span>
              </span>
            </div>

            <h2
              style={{
                fontSize: "clamp(26px, 3.6vw, 38px)",
                fontWeight: 800,
                color: "#1e293b",
                lineHeight: 1.25,
                margin: "0 0 10px",
              }}
            >
              {isVi ? "Tự Chủ Bảo Mật" : "Complete Security Sovereignty"}
            </h2>

            <p style={{ fontSize: "16px", color: "#64748b", margin: "0 0 24px" }}>
              {isVi
                ? "Hạ tầng bảo mật đạt chuẩn doanh nghiệp quốc tế, trao quyền kiểm soát 100% dữ liệu vào tay bạn."
                : "Bank-grade enterprise security architecture giving your organization 100% ownership of your data."}
            </p>

            {/* List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px" }}>
              {securityPoints.map((point, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <CheckCircle2 size={18} color="#ea580c" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontSize: "15px", color: "#334155", fontWeight: 600, lineHeight: 1.5 }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <a
                href="https://www.messenger.com/t/286163107904324"
                target="_blank"
                rel="noopener noreferrer"
                onClick={openMessengerChat}
                style={{
                  background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                  color: "#ffffff",
                  padding: "12px 24px",
                  borderRadius: "100px",
                  fontWeight: 700,
                  fontSize: "14.5px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(255, 111, 61, 0.3)",
                }}
              >
                <MessageCircle size={16} />
                <span>{isVi ? "Tư vấn kiến trúc bảo mật" : "Consult Security Architecture"}</span>
              </a>

              <Link
                href="/demo"
                style={{
                  fontSize: "14.5px",
                  fontWeight: 700,
                  color: "#ff6f3d",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  textDecoration: "none",
                }}
              >
                <span>{isVi ? "Trải nghiệm bản quyền" : "Try licensed edition"}</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "20px",
                borderRadius: "20px",
                border: "1.5px solid #fed7aa",
                boxShadow: "0 16px 40px rgba(255, 111, 61, 0.12)",
                maxWidth: "500px",
                width: "100%",
              }}
            >
              <img
                src="https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/secure.png"
                alt="ONLYOFFICE Docs Security Architecture"
                loading="lazy"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>
        </div>

        {/* Awards Badges Row */}
        <div style={{ marginTop: "60px", paddingTop: "40px", borderTop: "1px solid #fed7aa", textAlign: "center" }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "#64748b", margin: "0 0 24px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {isVi ? "Được đánh giá cao bởi chuyên gia và tổ chức uy tín" : "Top rated by industry experts & software reviewers"}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "28px",
              flexWrap: "wrap",
            }}
          >
            {awards.map((award, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "12px 18px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  width: "130px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                }}
              >
                <img
                  src={award.img}
                  alt={award.name}
                  loading="lazy"
                  style={{ maxHeight: "55px", maxWidth: "80px", objectFit: "contain" }}
                />
                <span style={{ fontSize: "10px", color: "#64748b", fontWeight: 600, textAlign: "center", lineHeight: 1.3 }}>
                  {award.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
