"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { ShieldAlert, Download, Copy, Check, Terminal, Eye, CheckCircle2, AlertTriangle, ShieldCheck, Zap, Lock } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

export default function DemoMercyCheck() {
  const t = useTranslations("demo.mercyCheck");

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPs, setCopiedPs] = useState(false);
  const [filterTab, setFilterTab] = useState<"all" | "crack" | "license" | "security">("all");

  const psCommand = "$ irm 'https://onlyoffice.mercytechglobal.com/MercyCheck.bat' | iex";

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.origin + "/MercyCheck.bat");
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleCopyPs = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(psCommand);
      setCopiedPs(true);
      setTimeout(() => setCopiedPs(false), 2000);
    }
  };

  return (
    <section id="mercy-check" className="demo-mercy-section">
      <style>{`
        .demo-mercy-section {
          padding: 48px 20px 60px;
          background-color: #ffffff;
        }
        .demo-mercy-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 28px;
          align-items: stretch;
        }
        .demo-mercy-left-card {
          background-color: #ffffff;
          border-radius: 20px;
          border: 1.5px solid #e2e8f0;
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .demo-mercy-section {
            padding: 32px 14px 40px !important;
          }
          .demo-mercy-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .demo-mercy-left-card {
            padding: 20px 16px !important;
            border-radius: 18px !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header Section */}
        <div style={{ textAlign: "center", maxWidth: "840px", margin: "0 auto 36px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 18px",
              borderRadius: "9999px",
              backgroundColor: "#fef2f2",
              border: "1.5px solid #fecaca",
              fontSize: "12px",
              fontWeight: 800,
              color: "#dc2626",
              textTransform: "uppercase",
              letterSpacing: "0.4px",
              marginBottom: "14px",
            }}
          >
            <ShieldAlert size={15} color="#dc2626" />
            <span>{t("badge")}</span>
          </div>

          <h2 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 800, color: "#0f172a", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            {t("title")}
          </h2>

          <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.65, margin: 0 }}>
            {t("desc")}
          </p>
        </div>

        {/* 2 Columns: Download Info + Terminal Mock */}
        <div className="demo-mercy-grid">
          {/* Left Column: Download & Features */}
          <div className="demo-mercy-left-card">
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#16a34a", display: "inline-block" }} />
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "#16a34a", textTransform: "uppercase" }}>
                    {t("version")}
                  </span>
                </div>
                <span style={{ fontSize: "11.5px", color: "#64748b", fontWeight: 600 }}>{t("portable")}</span>
              </div>

              <h3 style={{ fontSize: "21px", fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>
                {t("downloadCardTitle")}
              </h3>

              <p style={{ fontSize: "13.5px", color: "#64748b", margin: "0 0 22px", lineHeight: 1.6 }}>
                {t("downloadCardDesc")}
              </p>

              {/* Main Download BAT */}
              <a
                href="/MercyCheck.bat"
                download="MercyCheck.bat"
                style={{
                  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  color: "#ffffff",
                  padding: "15px 22px",
                  borderRadius: "14px",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: "14.5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 6px 20px rgba(220, 38, 38, 0.35)",
                  marginBottom: "12px",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(220, 38, 38, 0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(220, 38, 38, 0.35)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Download size={20} />
                  <span>{t("downloadBtn")}</span>
                </div>
                <span style={{ fontSize: "11px", backgroundColor: "rgba(0,0,0,0.2)", padding: "3px 9px", borderRadius: "8px", fontWeight: 700 }}>
                  1-Click • ~44 KB
                </span>
              </a>

              {/* Secondary Buttons */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
                <a
                  href="/MercyCheck.bat"
                  download="MercyCheck.bat"
                  style={{
                    padding: "11px 14px",
                    borderRadius: "10px",
                    border: "1.5px solid #cbd5e1",
                    backgroundColor: "#f8fafc",
                    color: "#334155",
                    fontSize: "12.5px",
                    fontWeight: 700,
                    textDecoration: "none",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#dc2626";
                    e.currentTarget.style.color = "#dc2626";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#cbd5e1";
                    e.currentTarget.style.color = "#334155";
                  }}
                >
                  <Download size={14} color="#dc2626" />
                  <span>{t("zipBtn")}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  style={{
                    padding: "11px 14px",
                    borderRadius: "10px",
                    border: "1.5px solid #cbd5e1",
                    backgroundColor: "#f8fafc",
                    color: "#334155",
                    fontSize: "12.5px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#dc2626";
                    e.currentTarget.style.color = "#dc2626";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#cbd5e1";
                    e.currentTarget.style.color = "#334155";
                  }}
                >
                  {copiedLink ? <Check size={14} color="#16a34a" /> : <Copy size={14} color="#dc2626" />}
                  <span>{copiedLink ? t("copiedLink") : t("copyLink")}</span>
                </button>
              </div>

              {/* 4 Feature Points */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "#475569", borderTop: "1px solid #f1f5f9", paddingTop: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <AlertTriangle size={16} color="#dc2626" style={{ flexShrink: 0 }} />
                  <span>
                    <strong>{t("features.f1Title")}</strong> {t("features.f1Desc")}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0 }} />
                  <span>
                    <strong>{t("features.f2Title")}</strong> {t("features.f2Desc")}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <Lock size={16} color="#ea580c" style={{ flexShrink: 0 }} />
                  <span>
                    <strong>{t("features.f3Title")}</strong> {t("features.f3Desc")}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <Zap size={16} color="#ea580c" style={{ flexShrink: 0 }} />
                  <span>
                    <strong>{t("features.f4Title")}</strong> {t("features.f4Desc")}
                  </span>
                </div>
              </div>
            </div>

            {/* PowerShell 1-liner (Light Mode) */}
            <div style={{ marginTop: "20px", paddingTop: "14px", borderTop: "1px solid #f1f5f9" }}>
              <div style={{ fontSize: "11.5px", fontWeight: 700, color: "#64748b", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                <Terminal size={13} color="#ea580c" />
                <span>{t("psLabel")}</span>
              </div>
              <div
                onClick={handleCopyPs}
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  fontFamily: "monospace",
                  fontSize: "12px",
                  color: "#0f172a",
                  border: "1.5px solid #cbd5e1",
                }}
                title={t("psTitle")}
              >
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  <strong style={{ color: "#ea580c" }}>PS&gt; </strong>{psCommand}
                </span>
                <span style={{ marginLeft: "8px", backgroundColor: "#ffffff", border: "1px solid #cbd5e1", padding: "3px 8px", borderRadius: "5px", fontSize: "10.5px", color: copiedPs ? "#16a34a" : "#475569", flexShrink: 0, fontWeight: 700 }}>
                  {copiedPs ? t("copiedLink") : "COPY"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Light Terminal / Inspector Mock */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              border: "1.5px solid #cbd5e1",
              overflow: "hidden",
              boxShadow: "0 12px 36px rgba(15, 23, 42, 0.08)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Terminal Window Header (Light) */}
            <div
              style={{
                backgroundColor: "#f8fafc",
                borderBottom: "1.5px solid #e2e8f0",
                padding: "12px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#ef4444", display: "inline-block" }} />
                <span style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#f59e0b", display: "inline-block" }} />
                <span style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#10b981", display: "inline-block" }} />
                <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#334155", marginLeft: "8px", fontWeight: 700 }}>
                  {t("consoleTitle")}
                </span>
              </div>

              {/* Filter Tabs (Light) */}
              <div style={{ display: "flex", gap: "4px" }}>
                {(["all", "crack", "license", "security"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setFilterTab(tab)}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "6px",
                      border: filterTab === tab ? "none" : "1px solid #cbd5e1",
                      backgroundColor: filterTab === tab ? "#ea580c" : "#ffffff",
                      color: filterTab === tab ? "#ffffff" : "#475569",
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {t(`filterTabs.${tab}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Log Content (Light Clean) */}
            <div
              style={{
                padding: "20px",
                fontFamily: "monospace",
                fontSize: "12px",
                lineHeight: 1.65,
                color: "#1e293b",
                backgroundColor: "#fbfcfe",
                maxHeight: "440px",
                overflowY: "auto",
                flex: 1,
              }}
            >
              {/* ASCII Header */}
              {(filterTab === "all" || filterTab === "crack") && (
                <div style={{ color: "#ea580c", marginBottom: "14px", whiteSpace: "pre", fontSize: "10.5px", lineHeight: 1.25, fontWeight: 700 }}>
{`========================================================================
  MERCY CHECK v2.0 - AUDIT REPORT & MALWARE SCANNER
  Provided by Mercy Technology Co., Ltd. | Hotline: 0763.068.614
========================================================================`}
                </div>
              )}

              {/* Section I: Hardware */}
              {filterTab === "all" && (
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ color: "#0369a1", fontWeight: 800 }}>
                    [I. SYSTEM HARDWARE OVERVIEW]
                  </div>
                  <div style={{ paddingLeft: "12px", color: "#475569" }}>
                    <div>• Mainboard   : ASUS PRIME B760M-A D4 (LGA1700)</div>
                    <div>• CPU         : 13th Gen Intel(R) Core(TM) i5-13400 (10 cores, 16 threads)</div>
                    <div>• RAM         : 16.0 GB (3200 MHz, 2 slots)</div>
                    <div>• Storage     : KINGSTON NVMe PCIe 4.0 1024 GB (SMART Health: 99% - Good)</div>
                  </div>
                </div>
              )}

              {/* Section II: License */}
              {(filterTab === "all" || filterTab === "license") && (
                <div style={{ marginBottom: "14px", borderTop: "1px solid #e2e8f0", paddingTop: "10px" }}>
                  <div style={{ color: "#0369a1", fontWeight: 800 }}>
                    [II. SYSTEM & OFFICE LICENSING]
                  </div>
                  <div style={{ paddingLeft: "12px" }}>
                    <div>
                      • Windows     : Windows 11 Pro 64-bit —{" "}
                      <span style={{ color: "#16a34a", fontWeight: 800 }}>
                        ✓ Activated (Genuine Digital License)
                      </span>
                    </div>
                    <div>• Product Key : XXXXX-XXXXX-XXXXX-XXXXX-3V66T</div>
                    <div>
                      • MS Office   :{" "}
                      <span style={{ color: "#dc2626", fontWeight: 800, backgroundColor: "#fee2e2", padding: "1px 6px", borderRadius: "4px" }}>
                        Office LTSC Pro Plus 2021 — KMS 127.0.0.1 (HIGH-RISK ILLEGAL CRACK)
                      </span>
                    </div>
                    <div>
                      • ONLYOFFICE  :{" "}
                      <span style={{ color: "#16a34a", fontWeight: 800 }}>
                        ✓ Activated (Mercy Tech Certified - Lifetime)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Section III: Crack Detection */}
              {(filterTab === "all" || filterTab === "crack") && (
                <div style={{ marginBottom: "14px", borderTop: "1px solid #e2e8f0", paddingTop: "10px" }}>
                  <div style={{ color: "#dc2626", fontWeight: 800 }}>
                    [III. CRACK & MALWARE DETECTION REPORT]
                  </div>
                  <div style={{ paddingLeft: "12px", backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "10px", marginTop: "6px" }}>
                    <div style={{ color: "#b91c1c", fontWeight: 700 }}>
                      [!] PROCESS DETECTED: AutoKMS.exe running silently at C:\Windows\AutoKMS\
                    </div>
                    <div style={{ color: "#b91c1c", fontWeight: 700 }}>
                      [!] DLL INJECTION DETECTED: sppc.dll (Ohook memory hook in active process)
                    </div>
                    <div style={{ color: "#b91c1c", fontWeight: 700 }}>
                      [!] HOSTS FILE MODIFIED: 127.0.0.1 kms8.msguides.com redirected
                    </div>
                    <div style={{ color: "#ea580c", marginTop: "4px", fontWeight: 800 }}>
                      =&gt; WARNING: High vulnerability to ransomware & intellectual property violation!
                    </div>
                  </div>
                </div>
              )}

              {/* Section IV: Security */}
              {(filterTab === "all" || filterTab === "security") && (
                <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "10px" }}>
                  <div style={{ color: "#0369a1", fontWeight: 800 }}>
                    [IV. CYBERSECURITY & DEFENDER POSTURE]
                  </div>
                  <div style={{ paddingLeft: "12px", color: "#475569" }}>
                    <div>
                      • Windows Defender :{" "}
                      <span style={{ color: "#dc2626", fontWeight: 700 }}>
                        Real-time Protection disabled by AutoKMS
                      </span>
                    </div>
                    <div>
                      • Windows Firewall : Enabled (Active)
                    </div>
                    <div>
                      • Port 135/445     : Warning: Vulnerable to lateral traversal across LAN
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Legal Audit Notice Box */}
        <div
          style={{
            marginTop: "28px",
            padding: "20px 28px",
            borderRadius: "16px",
            backgroundColor: "#fff7ed",
            border: "1.5px solid #fed7aa",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "18px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <ShieldCheck size={28} color="#ea580c" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", marginBottom: "3px" }}>
                {t("legalBanner.title")}
              </div>
              <div style={{ fontSize: "13px", color: "#475569", lineHeight: 1.5 }}>
                {t("legalBanner.desc")}
              </div>
            </div>
          </div>

          <a
            href="https://www.messenger.com/t/286163107904324"
            target="_blank"
            rel="noopener noreferrer"
            onClick={openMessengerChat}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "11px 22px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
              color: "#ffffff",
              fontSize: "13.5px",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(234, 88, 12, 0.25)",
              whiteSpace: "nowrap",
            }}
          >
            <span>{t("legalBanner.btn")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
