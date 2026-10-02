"use client";

import React, { useState } from "react";
import { ShieldAlert, Download, Copy, Check, Terminal, Eye, CheckCircle2, AlertTriangle } from "lucide-react";

export default function DemoMercyCheck() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPs, setCopiedPs] = useState(false);
  const [showKey, setShowKey] = useState(false);
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
    <section id="mercy-check" style={{ padding: "40px 20px 50px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header Section */}
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 36px" }}>
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
              letterSpacing: "0.5px",
              marginBottom: "14px",
            }}
          >
            <ShieldAlert size={14} color="#dc2626" />
            <span>CÔNG CỤ BẢO MẬT & RÀ SOÁT BẢN QUYỀN ĐỘC QUYỀN</span>
          </div>

          <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#1e293b", margin: "0 0 12px" }}>
            MercyCheck v2.0 — Rà Soát Bản Quyền & Phát Hiện Crack
          </h2>

          <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
            Công cụ 1-Click độc quyền từ <strong>Mercy Tech</strong>. Tự động kiểm tra bản quyền Windows, MS Office, phát hiện các công cụ crack nguy hiểm ngầm (AutoKMS, sppc.dll Ohook, Adobe GenP, IDM, WinRAR...) và chẩn đoán sức khỏe hệ thống trong 15 giây.
          </p>
        </div>

        {/* 2 Columns: Download Info + Terminal Mock */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "28px",
            alignItems: "stretch",
          }}
        >
          {/* Left Column: Download & Features */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              border: "1.5px solid #e2e8f0",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#16a34a", display: "inline-block" }} />
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#16a34a", textTransform: "uppercase" }}>
                  Phiên bản mới nhất v2.0 sẵn sàng
                </span>
              </div>

              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#1e293b", margin: "0 0 6px" }}>
                Tải Về & Quét Ngay Trên Máy Tính
              </h3>

              <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 20px", lineHeight: 1.5 }}>
                Công cụ dạng <strong>Single-File Portable</strong>, không cần cài đặt, không tạo rác và hoạt động 100% offline bảo mật tuyệt đối.
              </p>

              {/* Main Download BAT */}
              <a
                href="/MercyCheck.bat"
                download="MercyCheck.bat"
                style={{
                  background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                  color: "#ffffff",
                  padding: "14px 20px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 14px rgba(234, 88, 12, 0.35)",
                  marginBottom: "12px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 6px 18px rgba(234, 88, 12, 0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(234, 88, 12, 0.35)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Download size={18} />
                  <span>TẢI MERCYCHECK.BAT</span>
                </div>
                <span style={{ fontSize: "11px", opacity: 0.9, backgroundColor: "rgba(0,0,0,0.15)", padding: "2px 8px", borderRadius: "10px" }}>
                  1-Click • ~44 KB
                </span>
              </a>

              {/* Secondary Buttons */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "22px" }}>
                <a
                  href="/MercyCheck.bat"
                  download="MercyCheck.bat"
                  style={{
                    padding: "9px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    backgroundColor: "#f8fafc",
                    color: "#334155",
                    fontSize: "12px",
                    fontWeight: 700,
                    textDecoration: "none",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <Download size={14} color="#ea580c" />
                  <span>TẢI FILE .ZIP</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  style={{
                    padding: "9px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    backgroundColor: "#f8fafc",
                    color: "#334155",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  {copiedLink ? <Check size={14} color="#16a34a" /> : <Copy size={14} color="#ea580c" />}
                  <span>{copiedLink ? "ĐÃ COPY LINK" : "COPY LINK TẢI"}</span>
                </button>
              </div>

              {/* 4 Feature Points */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "12.5px", color: "#475569", borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#dc2626", fontWeight: 800 }}>!</span>
                  <span><strong>Phát hiện 15+ crack:</strong> AutoKMS, sppc.dll, GenP, IDM, WinRAR...</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <CheckCircle2 size={14} color="#16a34a" />
                  <span><strong>Xác thực License:</strong> Phân loại Digital, Retail, OEM vs KMS lậu</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#2563eb", fontWeight: 800 }}>🛡</span>
                  <span><strong>An toàn bảo mật:</strong> Defender, Firewall, Hosts, Port backdoor</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#ea580c", fontWeight: 800 }}>⚡</span>
                  <span><strong>Sức khỏe phần cứng:</strong> SMART ổ cứng, chai pin, CPU & RAM</span>
                </div>
              </div>
            </div>

            {/* PowerShell 1-liner */}
            <div style={{ marginTop: "20px", paddingTop: "14px", borderTop: "1px solid #f1f5f9" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                <Terminal size={13} color="#ea580c" />
                <span>Chạy nhanh qua PowerShell (IT Admin):</span>
              </div>
              <div
                onClick={handleCopyPs}
                style={{
                  backgroundColor: "#0f172a",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  fontFamily: "monospace",
                  fontSize: "11px",
                  color: "#e2e8f0",
                }}
                title="Bấm để sao chép lệnh PowerShell"
              >
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  <strong style={{ color: "#38bdf8" }}>$ </strong>{psCommand}
                </span>
                <span style={{ marginLeft: "8px", backgroundColor: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: "4px", fontSize: "10px", color: copiedPs ? "#4ade80" : "#cbd5e1" }}>
                  {copiedPs ? "ĐÃ COPY" : "COPY"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Terminal Mock */}
          <div
            style={{
              backgroundColor: "#0c1017",
              borderRadius: "20px",
              border: "1px solid #334155",
              overflow: "hidden",
              boxShadow: "0 16px 40px rgba(0, 0, 0, 0.25)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Terminal Window Header */}
            <div
              style={{
                backgroundColor: "#161c24",
                borderBottom: "1px solid #334155",
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ff5f56", display: "inline-block" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ffbd2e", display: "inline-block" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#27c93f", display: "inline-block" }} />
                <span style={{ fontSize: "11.5px", fontFamily: "monospace", color: "#cbd5e1", marginLeft: "6px" }}>
                  cmd.exe — MercyCheck v2.0 (Admin)
                </span>
              </div>

              {/* Filter Tabs */}
              <div style={{ display: "flex", gap: "4px" }}>
                {(["all", "crack", "license", "security"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setFilterTab(tab)}
                    style={{
                      padding: "2px 8px",
                      borderRadius: "4px",
                      border: "none",
                      backgroundColor: filterTab === tab ? "#06b6d4" : "rgba(255,255,255,0.06)",
                      color: filterTab === tab ? "#0f172a" : "#94a3b8",
                      fontSize: "10.5px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {tab === "all" && "Tất cả"}
                    {tab === "crack" && "Crack"}
                    {tab === "license" && "License"}
                    {tab === "security" && "Bảo mật"}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Log Content */}
            <div
              style={{
                padding: "16px 20px",
                fontFamily: "monospace",
                fontSize: "11.5px",
                lineHeight: 1.6,
                color: "#e2e8f0",
                maxHeight: "420px",
                overflowY: "auto",
                flex: 1,
              }}
            >
              {/* ASCII Header */}
              {(filterTab === "all" || filterTab === "crack") && (
                <div style={{ color: "#38bdf8", marginBottom: "12px", whiteSpace: "pre", fontSize: "10px", lineHeight: 1.2 }}>
{`========================================================================
  MERCY CHECK v2.0 - CONG CU KIEM TRA TOAN DIEN HE THONG
  Cung cap boi Cong Ty TNHH Cong Nghe Mercy | Hotline: 0763.068.614
========================================================================`}
                </div>
              )}

              {/* Section I: Hardware */}
              {(filterTab === "all") && (
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ color: "#67e8f9", fontWeight: 700 }}>[I. THONG TIN PHAN CUNG]</div>
                  <div style={{ paddingLeft: "12px", color: "#94a3b8" }}>
                    <div>• Mainboard   : ASUS PRIME B760M-A D4 (LGA1700)</div>
                    <div>• CPU         : 13th Gen Intel(R) Core(TM) i5-13400 (10 cores, 16 threads)</div>
                    <div>• RAM         : 16.0 GB (3200 MHz, 2 slots)</div>
                    <div>• Luu tru     : KINGSTON NVMe PCIe 4.0 1024 GB (Suc khoe SMART: 99%)</div>
                  </div>
                </div>
              )}

              {/* Section II: License */}
              {(filterTab === "all" || filterTab === "license") && (
                <div style={{ marginBottom: "14px", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "8px" }}>
                  <div style={{ color: "#67e8f9", fontWeight: 700 }}>[II. BAN QUYEN HE THONG]</div>
                  <div style={{ paddingLeft: "12px" }}>
                    <div>• Windows    : Windows 11 Pro 64-bit — <span style={{ color: "#4ade80", fontWeight: 700 }}>Da kich hoat (Retail Digital License)</span></div>
                    <div>• Product Key: {showKey ? <span style={{ color: "#fbbf24" }}>VK7JG-NPHTM-C97JM-9MPGT-3V66T</span> : <span style={{ color: "#94a3b8" }}>XXXXX-XXXXX-XXXXX-XXXXX-3V66T</span>}</div>
                    <div>• MS Office  : <span style={{ color: "#f87171", fontWeight: 700 }}>Office LTSC Pro Plus 2021 — KMS 127.0.0.1 (CRACK NGUY HIEM)</span></div>
                    <div>• OnlyOffice : <span style={{ color: "#4ade80", fontWeight: 700 }}>✓ Da kich hoat (Mercy Tech Certified Vĩnh Viễn)</span></div>
                  </div>
                </div>
              )}

              {/* Section III: Crack Detect */}
              {(filterTab === "all" || filterTab === "crack") && (
                <div style={{ marginBottom: "14px", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "8px" }}>
                  <div style={{ color: "#67e8f9", fontWeight: 700 }}>[III. PHAN MEM CRACK VA NGUY CO AN NINH]</div>
                  <div style={{ paddingLeft: "12px" }}>
                    <div style={{ color: "#f87171" }}>[CRACK] Office Ohook: File sppc.dll gia mao trong thu muc Office</div>
                    <div style={{ color: "#f87171" }}>[CRACK] AutoKMS Scheduled Task chay ngam khi khoi dong Windows</div>
                    <div style={{ color: "#f87171" }}>[CRACK] Adobe GenP: File amtlib.dll bi va can thiep ma doc</div>
                    <div style={{ color: "#4ade80" }}>[ OK  ] ONLYOFFICE Desktop Editors v9.0.4 (Mercy Certified)</div>
                  </div>
                </div>
              )}

              {/* Section IV: Security */}
              {(filterTab === "all" || filterTab === "security") && (
                <div style={{ marginBottom: "14px", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "8px" }}>
                  <div style={{ color: "#67e8f9", fontWeight: 700 }}>[IV. BAO MAT VA CANH BAO HACKTOOL]</div>
                  <div style={{ paddingLeft: "12px", color: "#94a3b8" }}>
                    <div>• Windows Defender : <span style={{ color: "#4ade80" }}>BAT (Real-time Protection)</span></div>
                    <div>• File Hosts        : <span style={{ color: "#fbbf24" }}>Phat hien 2 entry chan may chu kiem tra ban quyen</span></div>
                    <div>• Cong mang (Port)  : <span style={{ color: "#4ade80" }}>Sach (Khong co backdoor 4444)</span></div>
                  </div>
                </div>
              )}

              {/* Conclusion Banner */}
              <div
                style={{
                  marginTop: "12px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(220, 38, 38, 0.15)",
                  border: "1px solid #dc2626",
                  color: "#fca5a5",
                  fontSize: "11px",
                }}
              >
                <div style={{ fontWeight: 800, color: "#f87171", display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                  <AlertTriangle size={14} color="#f87171" />
                  <span>KET LUAN: PHAT HIEN 3 NGUY CO CRACK / MA DOC AN!</span>
                </div>
                <div>
                  May tinh dang be khoa Office bang KMS lau va file hook sppc.dll. Khuyen nghi go bo de tranh ma doc tong tien va chuyen sang ban quyen <strong>OnlyOffice Certified Mercy Tech</strong> hop phap 100%.
                </div>
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div
              style={{
                backgroundColor: "#161c24",
                borderTop: "1px solid #334155",
                padding: "8px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "11px",
                color: "#94a3b8",
              }}
            >
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#38bdf8",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: 0,
                }}
              >
                <Eye size={12} />
                <span>{showKey ? "Ẩn Product Key" : "Hiện Product Key"}</span>
              </button>

              <span style={{ color: "#4ade80", fontWeight: 700 }}>✓ Quét hoàn tất trong 14.8 giây</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
