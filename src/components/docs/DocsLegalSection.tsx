"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Scale, FileCheck, Shield, Receipt, Download, ArrowRight } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

export default function DocsLegalSection() {
  const locale = useLocale();
  const isVi = locale === "vi";

  const legalPillars = [
    {
      title: isVi ? "An tâm pháp lý" : "100% Legal & Compliant",
      desc: isVi
        ? "Đáp ứng mọi tiêu chuẩn bản quyền theo Nghị định 341/2025/NĐ-CP. Đội ngũ nhân sự an tâm thao tác, sử dụng phần mềm hợp pháp mà không lo ngại rủi ro bị rà soát hay xử phạt vi phạm."
        : "Fully compliant with international and Vietnamese software licensing laws. Avoid audits and regulatory penalty risks.",
      icon: Scale,
    },
    {
      title: isVi ? "Bảo vệ dữ liệu doanh nghiệp" : "Enterprise Data Sovereignty",
      desc: isVi
        ? "100% dữ liệu công việc được lưu trữ và quản lý hoàn toàn trong cơ sở dữ liệu nội bộ, đảm bảo quyền kiểm soát tuyệt đối và ngăn chặn rủi ro rò rỉ."
        : "100% of corporate data resides within your private infrastructure, preventing external eavesdropping or data leaks.",
      icon: Shield,
    },
    {
      title: isVi ? "Minh bạch tài chính & Nguồn gốc" : "Direct Certified Authorization",
      desc: isVi
        ? "Phần mềm được cấp phép chính thức từ Ascensio System SIA. Cung cấp trọn bộ hóa đơn, chứng từ hợp lệ, tuân thủ 100% quy định kiểm toán của Bộ Tài chính."
        : "Officially certified licensing from Ascensio System SIA with valid VAT tax invoices and financial auditing documentation.",
      icon: Receipt,
    },
  ];

  return (
    <>
      {/* SECTION 5: LEGAL COMPLIANCE */}
      <section style={{ backgroundColor: "#f8fafc", padding: "84px 20px 88px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "48px",
              alignItems: "center",
            }}
            className="oo-docs-legal-split-responsive"
          >
            <style>{`
              @media (min-width: 960px) {
                .oo-docs-legal-split-responsive {
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
                    backgroundColor: "rgba(255, 111, 61, 0.09)",
                    padding: "5px 14px",
                    borderRadius: "100px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  <Scale size={14} />
                  <span>{isVi ? "Pháp lý" : "Legal Safety"}</span>
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
                {isVi ? (
                  <>
                    Văn Phòng Hợp Pháp
                    <br />
                    Doanh Nghiệp <strong style={{ color: "#ff6f3d" }}>Vững Vàng</strong>
                  </>
                ) : (
                  <>
                    Licensed Software
                    <br />
                    Resilient <strong style={{ color: "#ff6f3d" }}>Enterprise</strong>
                  </>
                )}
              </h2>

              <p style={{ fontSize: "16px", color: "#64748b", margin: "0 0 28px" }}>
                {isVi
                  ? "Cài đặt chính hãng — Sử dụng hợp pháp — Tối ưu bảo mật"
                  : "Genuine license — Lawful operations — Full data control"}
              </p>

              {/* 3 Pillars */}
              <div style={{ display: "flex", flexDirection: "column", gap: "22px", marginBottom: "32px" }}>
                {legalPillars.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "10px",
                          backgroundColor: "#fff7ed",
                          border: "1px solid #fed7aa",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      >
                        <Icon size={18} color="#ea580c" />
                      </div>
                      <div>
                        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1e293b", margin: "0 0 4px" }}>
                          {item.title}
                        </h3>
                        <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Link */}
              <a
                href="#oo-docs-lead-form"
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
                <span>{isVi ? "Đăng ký tư vấn pháp lý" : "Request Compliance Consultation"}</span>
                <ArrowRight size={15} />
              </a>
            </div>

            {/* Right Graphic */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "14px",
                  borderRadius: "20px",
                  border: "1.5px solid #e2e8f0",
                  boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
                  maxWidth: "520px",
                  width: "100%",
                }}
              >
                <img
                  src="https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/nghi-dinh.png"
                  alt="Nghị định 341/2025/NĐ-CP về bản quyền phần mềm"
                  loading="lazy"
                  style={{ width: "100%", height: "auto", borderRadius: "12px", display: "block" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: BIG CTA */}
      <section
        style={{
          background: "linear-gradient(135deg, #fff7ed 0%, #ffffff 50%, #fff7ed 100%)",
          padding: "76px 20px",
          textAlign: "center",
          borderTop: "1px solid #fed7aa",
          borderBottom: "1px solid #fed7aa",
        }}
      >
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <img
            src="https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/logo.svg"
            alt="ONLYOFFICE"
            style={{ height: "36px", margin: "0 auto 24px", display: "block" }}
          />

          <h2
            style={{
              fontSize: "clamp(26px, 3.6vw, 40px)",
              fontWeight: 800,
              color: "#1e293b",
              lineHeight: 1.28,
              margin: "0 0 16px",
            }}
          >
            {isVi ? (
              <>
                Bộ Soạn Thảo Văn Phòng Toàn Diện
                <br />
                Cho Mọi Công Việc Của Bạn
              </>
            ) : (
              <>
                All-in-One Office Editing Suite
                <br />
                Powering Enterprise Productivity
              </>
            )}
          </h2>

          <p style={{ fontSize: "17px", color: "#64748b", margin: "0 0 32px" }}>
            {isVi ? (
              <>
                Gia nhập nhóm <strong style={{ color: "#ff6f3d" }}>21 TRIỆU NGƯỜI DÙNG</strong> của ONLYOFFICE ngay hôm nay
              </>
            ) : (
              <>
                Join over <strong style={{ color: "#ff6f3d" }}>21 MILLION USERS</strong> worldwide today
              </>
            )}
          </p>

          <Link
            href="/demo"
            style={{
              background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
              color: "#ffffff",
              padding: "14px 32px",
              borderRadius: "100px",
              fontWeight: 800,
              fontSize: "15.5px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              boxShadow: "0 6px 24px rgba(255, 111, 61, 0.4)",
            }}
          >
            <Download size={18} strokeWidth={2.4} />
            <span>{isVi ? "Tải miễn phí về Desktop" : "Free Desktop Download"}</span>
          </Link>
        </div>
      </section>
    </>
  );
}
