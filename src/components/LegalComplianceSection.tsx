"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";
import {
  X,
  ExternalLink,
  PhoneCall,
  ZoomIn,
  ArrowRight,
  ShieldCheck,
  Scale,
  Receipt,
  Copy,
  Check,
} from "lucide-react";

export default function LegalComplianceSection() {
  const locale = useLocale();
  const isVi = locale === "vi";
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [copiedMst, setCopiedMst] = useState(false);

  const handleCopyMst = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText("0319227767");
    setCopiedMst(true);
    setTimeout(() => setCopiedMst(false), 2000);
  };

  const metrics = [
    {
      val: "100%",
      label: isVi ? "Bản quyền chính hãng" : "Genuine License",
      sub: isVi ? "Kích hoạt từ ONLYOFFICE" : "Direct ONLYOFFICE activation",
      icon: ShieldCheck,
    },
    {
      val: "0",
      label: isVi ? "Rủi ro thanh tra SHTT" : "Zero Audit Risk",
      sub: isVi ? "Tuân thủ Luật SHTT Việt Nam" : "Compliant with Vietnam IP Law",
      icon: Scale,
    },
    {
      val: "100%",
      label: isVi ? "Khấu trừ thuế TNDN" : "Tax Deductible",
      sub: isVi ? "Hóa đơn VAT chuẩn Cục Thuế" : "Official tax-compliant VAT invoice",
      icon: Receipt,
    },
  ];

  const steps = [
    {
      num: "01",
      title: isVi
        ? "Ủy quyền chính hãng Ascensio System SIA"
        : "Official Ascensio System SIA Authorization",
      text: isVi
        ? "Chứng thư pháp lý quốc tế cấp trực tiếp cho Mercy Technology từ trụ sở chính ONLYOFFICE tại Riga (Latvia). Khách hàng có thể xác minh tức thì trên cổng đối tác toàn cầu."
        : "International legal certificate issued directly to Mercy Technology from ONLYOFFICE HQ in Riga, Latvia — verifiable anytime on the global partner portal.",
    },
    {
      num: "02",
      title: isVi
        ? "Miễn trừ hoàn toàn rủi ro thanh tra SHTT"
        : "Complete IP Audit Risk Elimination",
      text: isVi
        ? "Bộ hồ sơ mộc đỏ đầy đủ và chặt chẽ theo Luật Sở hữu Trí tuệ Việt Nam số 50/2005/QH11 — doanh nghiệp hoàn toàn yên tâm và tự tin trước mọi đợt kiểm tra liên ngành."
        : "Full certified documentation per Vietnam IP Law No. 50/2005/QH11 — ensuring corporate peace of mind during any inter-ministerial software audit.",
    },
    {
      num: "03",
      title: isVi
        ? "Hóa đơn VAT & khấu trừ thuế TNDN 100%"
        : "VAT Invoices & 100% Tax Deductible",
      text: isVi
        ? "Hóa đơn điện tử chuẩn Tổng Cục Thuế, hợp đồng kinh tế và biên bản bàn giao mộc đỏ trong vòng 24 giờ. Toàn bộ chi phí được tính là chi phí hợp lý khi quyết toán thuế."
        : "Official e-invoices, commercial contracts, and handover minutes within 24h. 100% recognized as eligible deductible business expenses.",
    },
  ];

  return (
    <section
      id="an-tam-phap-ly"
      style={{
        backgroundColor: "#ffffff",
        color: "#1e293b",
        padding: "80px 0 88px",
        borderTop: "1px solid #eef2f6",
        borderBottom: "1px solid #eef2f6",
        fontFamily: "'Open Sans', sans-serif",
      }}
    >
      <style>{`
        .legal-white-grid {
          display: grid;
          grid-template-columns: 440px 1fr;
          gap: 56px;
          align-items: start;
        }
        .legal-white-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 1024px) {
          .legal-white-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
        @media (max-width: 640px) {
          .legal-white-metrics {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      `}</style>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* ================= HEADER ================= */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "999px",
              backgroundColor: "#fff7ed",
              border: "1px solid #ffedd5",
              marginBottom: "18px",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "#16a34a",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#ea580c",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {isVi ? "ĐỐI TÁC ỦY QUYỀN CHÍNH THỨC" : "OFFICIALLY AUTHORIZED PARTNER"}
            </span>
          </div>

          {/* Heading */}
          <h2
            style={{
              fontSize: "clamp(30px, 3.8vw, 44px)",
              fontWeight: 700,
              fontFamily: "'Open Sans', sans-serif",
              color: "#0f172a",
              lineHeight: 1.25,
              letterSpacing: "-0.015em",
              margin: "0 0 14px",
            }}
          >
            {isVi ? (
              <>
                Bản quyền chính hãng.{" "}
                <span style={{ color: "#ff6f3d" }}>Pháp lý vững chắc.</span>
              </>
            ) : (
              <>
                Genuine Licensing.{" "}
                <span style={{ color: "#ff6f3d" }}>Solid Legal Ground.</span>
              </>
            )}
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "16px",
              color: "#64748b",
              maxWidth: "640px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            {isVi
              ? "Mercy Technology — đại diện thương mại duy nhất được Ascensio System SIA (Latvia) ủy quyền phân phối ONLYOFFICE tại Việt Nam."
              : "Mercy Technology — the sole commercial representative authorized by Ascensio System SIA (Latvia) to distribute ONLYOFFICE in Vietnam."}
          </p>
        </div>

        {/* ================= 2-COLUMN MAIN CONTENT ================= */}
        <div className="legal-white-grid">
          {/* ================= LEFT: CERTIFICATE CARD ================= */}
          <div>
            <div
              style={{
                borderRadius: "16px",
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 20px -2px rgba(15, 23, 42, 0.06)",
                padding: "16px",
                position: "relative",
              }}
            >
              {/* Header meta inside card */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #f1f5f9",
                  fontSize: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ color: "#64748b" }}>{isVi ? "Chứng nhận bởi:" : "Certified by:"}</span>
                  <strong style={{ color: "#0f172a" }}>Ascensio System SIA</strong>
                </div>
                <span
                  style={{
                    color: "#16a34a",
                    fontWeight: 700,
                    fontSize: "11.5px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#16a34a" }} />
                  {isVi ? "Đã xác thực" : "Verified"}
                </span>
              </div>

              {/* Certificate image with click to zoom */}
              <div
                onClick={() => setIsZoomOpen(true)}
                style={{
                  position: "relative",
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: "1px solid #e2e8f0",
                  cursor: "pointer",
                  backgroundColor: "#f8fafc",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px -4px rgba(15, 23, 42, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/chung-nhan-onlyoffice-partner.png"
                  alt={
                    isVi
                      ? "Chứng nhận đối tác ủy quyền ONLYOFFICE - Mercy Technology"
                      : "ONLYOFFICE Authorized Partner Certificate - Mercy Technology"
                  }
                  style={{ width: "100%", height: "auto", display: "block" }}
                />

                {/* Subtle hover overlay button */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(15, 23, 42, 0.35)",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    padding: "16px",
                    opacity: 0,
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0";
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 16px",
                      borderRadius: "999px",
                      backgroundColor: "#ffffff",
                      color: "#0f172a",
                      fontSize: "13px",
                      fontWeight: 700,
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <ZoomIn size={15} color="#ea580c" />
                    <span>{isVi ? "Xem bản gốc mộc đỏ" : "View original certificate"}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Entity & MST Strip */}
              <div
                style={{
                  marginTop: "12px",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #edf2f7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "12.5px",
                }}
              >
                <div>
                  <div style={{ color: "#64748b", fontSize: "11px" }}>{isVi ? "Đại diện thương mại" : "Representative"}</div>
                  <strong style={{ color: "#0f172a", fontSize: "12.5px" }}>Mercy Technology Co., Ltd</strong>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ color: "#64748b", fontSize: "11.5px" }}>MST:</span>
                  <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#ea580c", fontSize: "13px" }}>
                    0319227767
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyMst}
                    title={isVi ? "Sao chép MST" : "Copy Tax ID"}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px",
                      color: copiedMst ? "#16a34a" : "#94a3b8",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    {copiedMst ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Verification link underneath */}
            <div
              style={{
                marginTop: "12px",
                textAlign: "center",
              }}
            >
              {/* <a
                href="https://www.onlyoffice.com/partners.aspx"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "12.5px",
                  color: "#64748b",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontWeight: 600,
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ea580c";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#64748b";
                }}
              >
                <span>{isVi ? "Tra cứu đối tác trên cổng ONLYOFFICE toàn cầu" : "Verify on global partner portal"}</span>
                <ExternalLink size={12} />
              </a> */}
            </div>
          </div>

          {/* ================= RIGHT: STATS & STEPS ================= */}
          <div>
            {/* Stats row - clean light boxes */}
            <div className="legal-white-metrics" style={{ marginBottom: "36px" }}>
              {metrics.map((stat, i) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={i}
                    style={{
                      padding: "18px 16px",
                      borderRadius: "12px",
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        backgroundColor: "#ffffff",
                        border: "1px solid #e2e8f0",
                        color: "#ea580c",
                        marginBottom: "8px",
                      }}
                    >
                      <IconComponent size={16} />
                    </div>
                    <div
                      style={{
                        fontSize: "28px",
                        fontWeight: 700,
                        fontFamily: "'Open Sans', sans-serif",
                        color: "#0f172a",
                        lineHeight: 1.1,
                        letterSpacing: "-0.02em",
                        marginBottom: "4px",
                      }}
                    >
                      {stat.val}
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", marginBottom: "2px" }}>
                      {stat.label}
                    </div>
                    <div style={{ fontSize: "11.5px", color: "#64748b", lineHeight: 1.35 }}>
                      {stat.sub}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Steps 01, 02, 03 - clean list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {steps.map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "18px",
                    paddingBottom: i < steps.length - 1 ? "20px" : "0",
                    borderBottom: i < steps.length - 1 ? "1px solid #f1f5f9" : "none",
                  }}
                >
                  {/* Number pill */}
                  <div style={{ flexShrink: 0 }}>
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "8px",
                        backgroundColor: i === 0 ? "#fff7ed" : "#f8fafc",
                        border: i === 0 ? "1px solid #ffedd5" : "1px solid #e2e8f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "13px",
                        fontWeight: 800,
                        color: i === 0 ? "#ea580c" : "#475569",
                        fontFamily: "monospace",
                      }}
                    >
                      {step.num}
                    </div>
                  </div>

                  {/* Text content */}
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#0f172a",
                        margin: "0 0 6px",
                        lineHeight: 1.4,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#64748b",
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA action buttons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                flexWrap: "wrap",
                marginTop: "36px",
                paddingTop: "24px",
                borderTop: "1px solid #f1f5f9",
              }}
            >
              <a
                href="https://m.me/onlyoffice.official.vn"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "13px 26px",
                  borderRadius: "8px",
                  backgroundColor: "#ff6f3d",
                  color: "#ffffff",
                  fontSize: "14.5px",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "background-color 0.2s ease, transform 0.15s ease",
                  boxShadow: "0 2px 8px rgba(255, 111, 61, 0.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#ea580c";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#ff6f3d";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <PhoneCall size={16} />
                <span>{isVi ? "Tư vấn pháp lý 1:1" : "1:1 Legal Consultation"}</span>
                <ArrowRight size={15} />
              </a>

              <button
                type="button"
                onClick={() => setIsZoomOpen(true)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "13px 22px",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  color: "#334155",
                  border: "1px solid #cbd5e1",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#94a3b8";
                  e.currentTarget.style.backgroundColor = "#f8fafc";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#cbd5e1";
                  e.currentTarget.style.backgroundColor = "#ffffff";
                }}
              >
                <ZoomIn size={15} color="#ea580c" />
                <span>{isVi ? "Xem chứng nhận gốc" : "View certificate"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= LIGHTBOX MODAL ================= */}
      {isZoomOpen && (
        <div
          onClick={() => setIsZoomOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "880px",
              width: "100%",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              maxHeight: "92vh",
              overflowY: "auto",
              border: "1px solid #e2e8f0",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "14px",
                paddingBottom: "12px",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>
                  {isVi
                    ? "Chứng nhận đối tác ủy quyền — Ascensio System SIA"
                    : "Official Partner Certification — Ascensio System SIA"}
                </div>
                <div style={{ fontSize: "12px", color: "#64748b" }}>
                  {isVi ? "Cấp cho: CÔNG TY TNHH CÔNG NGHỆ MERCY • MST: 0319227767" : "Issued to: MERCY TECHNOLOGY CO., LTD • Tax ID: 0319227767"}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  backgroundColor: "#f1f5f9",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#475569",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e2e8f0";
                  e.currentTarget.style.color = "#0f172a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f1f5f9";
                  e.currentTarget.style.color = "#475569";
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Document display */}
            <div
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid #e2e8f0",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/chung-nhan-onlyoffice-partner.png"
                alt="ONLYOFFICE Official Partner Certification"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>

            {/* Modal Footer */}
            <div
              style={{
                marginTop: "14px",
                padding: "10px 14px",
                borderRadius: "8px",
                backgroundColor: "#fff7ed",
                border: "1px solid #fed7aa",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "12.5px",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <span style={{ color: "#9a3412" }}>
                <strong>{isVi ? "Doanh nghiệp thụ quyền:" : "Company:"}</strong> CÔNG TY TNHH CÔNG NGHỆ MERCY • MST: 0319227767
              </span>

              <a
                href="https://m.me/onlyoffice.official.vn"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#ea580c",
                  fontWeight: 700,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>{isVi ? "Yêu cầu bản sao có dấu mộc đỏ" : "Request certified copy"}</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
