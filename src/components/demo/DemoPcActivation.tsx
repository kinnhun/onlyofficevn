"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Download, HelpCircle, X, CheckCircle2, ShieldCheck, Terminal, Copy, Check, Sparkles, Laptop, FileCheck } from "lucide-react";

export default function DemoPcActivation() {
  const t = useTranslations("demo.pcActivation");

  const [guideOpen, setGuideOpen] = useState(false);
  const [copiedPs, setCopiedPs] = useState(false);

  const psCmd = "$ irm 'https://onlyoffice.mercytechglobal.com/Kich-Hoat-Demo-OnlyOffice-Mercy.bat' | iex";

  const handleCopyPs = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(psCmd);
      setCopiedPs(true);
      setTimeout(() => setCopiedPs(false), 2000);
    }
  };

  return (
    <section id="demo-pc" className="demo-pc-section">
      <style>{`
        .demo-pc-section {
          padding: 40px 20px 48px;
          background-color: #f8fafc;
        }
        .demo-pc-card {
          background: linear-gradient(135deg, #ffffff 0%, #fffbf7 60%, #fff7ed 100%);
          border-radius: 24px;
          border: 1.5px solid #fed7aa;
          padding: 42px 36px;
          box-shadow: 0 12px 36px rgba(234, 88, 12, 0.08);
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }
        .demo-pc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 36px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .demo-pc-action-box {
          background-color: #ffffff;
          border-radius: 20px;
          border: 1.5px solid #fed7aa;
          padding: 28px;
          box-shadow: 0 8px 24px rgba(234, 88, 12, 0.08);
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .demo-pc-section {
            padding: 28px 12px 36px !important;
          }
          .demo-pc-card {
            padding: 22px 14px !important;
            border-radius: 18px !important;
          }
          .demo-pc-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .demo-pc-action-box {
            padding: 18px 14px !important;
            border-radius: 16px !important;
            gap: 14px !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Main Activation Card */}
        <div className="demo-pc-card">
          {/* Subtle glow accent */}
          <div
            style={{
              position: "absolute",
              top: "-60px",
              right: "-60px",
              width: "240px",
              height: "240px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255, 111, 61, 0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div className="demo-pc-grid">
            {/* Left Content Column */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "5px 14px",
                  borderRadius: "9999px",
                  backgroundColor: "#fff7ed",
                  border: "1px solid #fed7aa",
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#ea580c",
                  textTransform: "uppercase",
                  letterSpacing: "0.4px",
                  marginBottom: "14px",
                }}
              >
                <Sparkles size={14} color="#ea580c" />
                <span>{t("badge")}</span>
              </div>

              <h2
                style={{
                  fontSize: "clamp(24px, 3.5vw, 32px)",
                  fontWeight: 800,
                  color: "#0f172a",
                  margin: "0 0 14px",
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                }}
              >
                {t("title")}
                <span style={{ color: "#ea580c" }}>{t("titleHighlight")}</span>
              </h2>

              <p
                style={{
                  fontSize: "15px",
                  color: "#475569",
                  lineHeight: 1.65,
                  margin: "0 0 24px",
                }}
              >
                {t("desc")}
              </p>

              {/* 3 Value Points */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px", color: "#334155", fontWeight: 600 }}>
                  <CheckCircle2 size={17} color="#16a34a" style={{ flexShrink: 0 }} />
                  <span>{t("points.p1")}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px", color: "#334155", fontWeight: 600 }}>
                  <CheckCircle2 size={17} color="#16a34a" style={{ flexShrink: 0 }} />
                  <span>{t("points.p2")}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px", color: "#334155", fontWeight: 600 }}>
                  <CheckCircle2 size={17} color="#16a34a" style={{ flexShrink: 0 }} />
                  <span>{t("points.p3")}</span>
                </div>
              </div>
            </div>

            {/* Right Action Column */}
            <div className="demo-pc-action-box">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Laptop size={18} color="#ea580c" />
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a" }}>
                    {t("platform")}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 700,
                    color: "#16a34a",
                    backgroundColor: "#f0fdf4",
                    padding: "3px 10px",
                    borderRadius: "9999px",
                    border: "1px solid #bbf7d0",
                  }}
                >
                  {t("verified")}
                </span>
              </div>

              {/* Primary Download Button */}
              <a
                href="/Kich-Hoat-Demo-OnlyOffice-Mercy.bat"
                download="Kich-Hoat-Demo-OnlyOffice-Mercy.bat"
                style={{
                  background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                  color: "#ffffff",
                  padding: "16px 24px",
                  borderRadius: "14px",
                  fontWeight: 800,
                  fontSize: "15px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow: "0 6px 20px rgba(234, 88, 12, 0.35)",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 10px 26px rgba(234, 88, 12, 0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(234, 88, 12, 0.35)";
                }}
                title={t("downloadBtn")}
              >
                <Download size={20} strokeWidth={2.5} />
                <span>{t("downloadBtn")}</span>
                <span
                  style={{
                    fontSize: "11px",
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    padding: "2px 7px",
                    borderRadius: "6px",
                    fontWeight: 700,
                  }}
                >
                  ~44 KB
                </span>
              </a>

              {/* Secondary Actions: Backup ZIP + Guide */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <a
                  href="/Kich-Hoat-Demo-OnlyOffice-Mercy.bat"
                  download="Kich-Hoat-Demo-OnlyOffice-Mercy.bat"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#334155",
                    border: "1.5px solid #cbd5e1",
                    borderRadius: "10px",
                    padding: "11px 14px",
                    fontSize: "13px",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "7px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#ea580c";
                    e.currentTarget.style.color = "#ea580c";
                    e.currentTarget.style.backgroundColor = "#fff7ed";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#cbd5e1";
                    e.currentTarget.style.color = "#334155";
                    e.currentTarget.style.backgroundColor = "#ffffff";
                  }}
                >
                  <Download size={15} color="#ea580c" />
                  <span>{t("mirrorBtn")}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setGuideOpen(true)}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#334155",
                    border: "1.5px solid #cbd5e1",
                    borderRadius: "10px",
                    padding: "11px 14px",
                    fontSize: "13px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "7px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#ea580c";
                    e.currentTarget.style.color = "#ea580c";
                    e.currentTarget.style.backgroundColor = "#fff7ed";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#cbd5e1";
                    e.currentTarget.style.color = "#334155";
                    e.currentTarget.style.backgroundColor = "#ffffff";
                  }}
                >
                  <HelpCircle size={15} color="#ea580c" />
                  <span>{t("guideBtn")}</span>
                </button>
              </div>

              {/* PowerShell 1-Liner for IT Admins (Light Mode) */}
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: "10px",
                  backgroundColor: "#f8fafc",
                  color: "#1e293b",
                  fontSize: "12px",
                  fontFamily: "monospace",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                  border: "1.5px solid #cbd5e1",
                }}
              >
                <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  <span style={{ color: "#ea580c", fontWeight: 700 }}>PS&gt; </span>
                  <span style={{ color: "#334155", fontWeight: 600 }}>irm https://onlyoffice.mercytech.../demo.bat | iex</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPs}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #cbd5e1",
                    borderRadius: "6px",
                    color: "#334155",
                    padding: "5px 10px",
                    fontSize: "11px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    flexShrink: 0,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  }}
                >
                  {copiedPs ? <Check size={12} color="#16a34a" /> : <Copy size={12} color="#ea580c" />}
                  <span>{copiedPs ? t("copied") : t("copy")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Modal */}
      {guideOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 23, 42, 0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 100000,
          }}
          onClick={() => setGuideOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              padding: "32px",
              maxWidth: "540px",
              width: "100%",
              boxShadow: "0 24px 48px rgba(15, 23, 42, 0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#fff7ed", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Download size={20} color="#ea580c" />
                </div>
                <h3 style={{ fontSize: "19px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                  {t("guide.title")}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setGuideOpen(false)}
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  padding: "6px",
                  color: "#64748b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px", color: "#334155" }}>
              <div style={{ display: "flex", gap: "12px", padding: "12px", borderRadius: "10px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#ea580c", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0, fontSize: "12px" }}>1</span>
                <div>
                  <strong style={{ color: "#0f172a" }}>{t("guide.step1Title")}</strong> {t("guide.step1Desc")}
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", padding: "12px", borderRadius: "10px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#ea580c", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0, fontSize: "12px" }}>2</span>
                <div>
                  <strong style={{ color: "#0f172a" }}>{t("guide.step2Title")}</strong> {t("guide.step2Desc")}
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", padding: "12px", borderRadius: "10px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#ea580c", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0, fontSize: "12px" }}>3</span>
                <div>
                  <strong style={{ color: "#0f172a" }}>{t("guide.step3Title")}</strong> {t("guide.step3Desc")}
                </div>
              </div>

              <div style={{ padding: "14px", background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: "10px", fontSize: "13px", color: "#166534", lineHeight: 1.5 }}>
                {t("guide.supportNote")}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setGuideOpen(false)}
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "12px",
                background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(234, 88, 12, 0.3)",
              }}
            >
              {t("guide.closeBtn")}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
