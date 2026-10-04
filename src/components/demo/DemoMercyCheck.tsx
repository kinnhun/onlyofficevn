"use client";

import React, { useState } from "react";
import { ShieldAlert, Download, Copy, Check, Terminal, Eye, CheckCircle2, AlertTriangle, ShieldCheck, Zap, Lock } from "lucide-react";

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
    <section id="mercy-check" style={{ padding: "48px 20px 60px", backgroundColor: "#ffffff" }}>
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
            <span>CÔNG CỤ BẢO MẬT & RÀ SOÁT BẢN QUYỀN ĐỘC QUYỀN MERCY TECH</span>
          </div>

          <h2 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 800, color: "#0f172a", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            MercyCheck v2.0 — Rà Soát Bản Quyền &amp; Phát Hiện Crack Ngầm
          </h2>

          <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.65, margin: 0 }}>
            Công cụ 1-Click độc quyền từ <strong>Mercy Tech</strong>. Tự động kiểm tra bản quyền Windows, MS Office, phát hiện các công cụ crack nguy hiểm tiềm ẩn ransomware (AutoKMS, sppc.dll Ohook, Adobe GenP, IDM, WinRAR...) và chẩn đoán sức khỏe hệ thống chỉ trong 15 giây.
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
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#16a34a", display: "inline-block" }} />
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "#16a34a", textTransform: "uppercase" }}>
                    Phiên bản mới nhất v2.0
                  </span>
                </div>
                <span style={{ fontSize: "11.5px", color: "#64748b", fontWeight: 600 }}>Portable • Zero-Install</span>
              </div>

              <h3 style={{ fontSize: "21px", fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>
                Tải Về &amp; Quét Ngay Trên Máy Tính
              </h3>

              <p style={{ fontSize: "13.5px", color: "#64748b", margin: "0 0 22px", lineHeight: 1.6 }}>
                Công cụ dạng <strong>Single-File Portable</strong> (~44 KB), không cần cài đặt, không tạo rác hệ thống và hoạt động 100% offline bảo mật dữ liệu tuyệt đối.
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
                  <span>TẢI MERCYCHECK.BAT</span>
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
                  <span>Tải Bản .ZIP</span>
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
                  <span>{copiedLink ? "Đã copy link" : "Copy link tải"}</span>
                </button>
              </div>

              {/* 4 Feature Points */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "#475569", borderTop: "1px solid #f1f5f9", paddingTop: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <AlertTriangle size={16} color="#dc2626" style={{ flexShrink: 0 }} />
                  <span><strong>Phát hiện 15+ loại crack:</strong> AutoKMS, sppc.dll, GenP, IDM, WinRAR...</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0 }} />
                  <span><strong>Xác thực License:</strong> Phân loại Digital, Retail, OEM vs KMS lậu</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <Lock size={16} color="#ea580c" style={{ flexShrink: 0 }} />
                  <span><strong>An toàn bảo mật:</strong> Defender, Firewall, Hosts, Port backdoor</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <Zap size={16} color="#ea580c" style={{ flexShrink: 0 }} />
                  <span><strong>Sức khỏe phần cứng:</strong> SMART ổ cứng, chai pin, CPU &amp; RAM</span>
                </div>
              </div>
            </div>

            {/* PowerShell 1-liner (Light Mode) */}
            <div style={{ marginTop: "20px", paddingTop: "14px", borderTop: "1px solid #f1f5f9" }}>
              <div style={{ fontSize: "11.5px", fontWeight: 700, color: "#64748b", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                <Terminal size={13} color="#ea580c" />
                <span>Chạy nhanh qua PowerShell (Dành cho Quản trị viên IT):</span>
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
                title="Bấm để sao chép lệnh PowerShell"
              >
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  <strong style={{ color: "#ea580c" }}>PS&gt; </strong>{psCommand}
                </span>
                <span style={{ marginLeft: "8px", backgroundColor: "#ffffff", border: "1px solid #cbd5e1", padding: "3px 8px", borderRadius: "5px", fontSize: "10.5px", color: copiedPs ? "#16a34a" : "#475569", flexShrink: 0, fontWeight: 700 }}>
                  {copiedPs ? "ĐÃ COPY" : "COPY"}
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
                  cmd.exe — MercyCheck v2.0 (Admin Console)
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
                    {tab === "all" && "Tất cả"}
                    {tab === "crack" && "Phát hiện Crack"}
                    {tab === "license" && "Bản quyền"}
                    {tab === "security" && "Bảo mật"}
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
  MERCY CHECK v2.0 - KIEM TRA BAN QUYEN & CANH BAO MA DOC
  Cung cap boi Cong Ty TNHH Cong Nghe Mercy | Hotline: 0763.068.614
========================================================================`}
                </div>
              )}

              {/* Section I: Hardware */}
              {filterTab === "all" && (
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ color: "#0369a1", fontWeight: 800 }}>[I. THONG TIN PHAN CUNG]</div>
                  <div style={{ paddingLeft: "12px", color: "#475569" }}>
                    <div>• Mainboard   : ASUS PRIME B760M-A D4 (LGA1700)</div>
                    <div>• CPU         : 13th Gen Intel(R) Core(TM) i5-13400 (10 cores, 16 threads)</div>
                    <div>• RAM         : 16.0 GB (3200 MHz, 2 slots)</div>
                    <div>• Luu tru     : KINGSTON NVMe PCIe 4.0 1024 GB (Suc khoe SMART: 99% - Tot)</div>
                  </div>
                </div>
              )}

              {/* Section II: License */}
              {(filterTab === "all" || filterTab === "license") && (
                <div style={{ marginBottom: "14px", borderTop: "1px solid #e2e8f0", paddingTop: "10px" }}>
                  <div style={{ color: "#0369a1", fontWeight: 800 }}>[II. BAN QUYEN HE THONG &amp; OFFICE]</div>
                  <div style={{ paddingLeft: "12px" }}>
                    <div>• Windows     : Windows 11 Pro 64-bit — <span style={{ color: "#16a34a", fontWeight: 800 }}>✓ Da kich hoat (Digital License Hop Phap)</span></div>
                    <div>• Product Key : XXXXX-XXXXX-XXXXX-XXXXX-3V66T</div>
                    <div>• MS Office   : <span style={{ color: "#dc2626", fontWeight: 800, backgroundColor: "#fee2e2", padding: "1px 6px", borderRadius: "4px" }}>Office LTSC Pro Plus 2021 — KMS 127.0.0.1 (CRACK LẬU NGUY HIỂM)</span></div>
                    <div>• ONLYOFFICE  : <span style={{ color: "#16a34a", fontWeight: 800 }}>✓ Da kich hoat (Mercy Tech Certified - Vinh Vien)</span></div>
                  </div>
                </div>
              )}

              {/* Section III: Crack Detection */}
              {(filterTab === "all" || filterTab === "crack") && (
                <div style={{ marginBottom: "14px", borderTop: "1px solid #e2e8f0", paddingTop: "10px" }}>
                  <div style={{ color: "#dc2626", fontWeight: 800 }}>[III. PHAT HIEN CONG CU CRACK &amp; MA DOC NGUY HIEM]</div>
                  <div style={{ paddingLeft: "12px", backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "10px", marginTop: "6px" }}>
                    <div style={{ color: "#b91c1c", fontWeight: 700 }}>[!] PHAT HIEN TIEN TRINH: AutoKMS.exe dang chay ngam tai C:\Windows\AutoKMS\</div>
                    <div style={{ color: "#b91c1c", fontWeight: 700 }}>[!] PHAT HIEN FILE DLL: sppc.dll (Ohook hook vao bo nho he thong)</div>
                    <div style={{ color: "#b91c1c", fontWeight: 700 }}>[!] HOSTS FILE BI SUA: 127.0.0.1 kms8.msguides.com bi redirect</div>
                    <div style={{ color: "#ea580c", marginTop: "4px", fontWeight: 800 }}>=&gt; CANH BAO: He thong co nguy co cao bi ransomware va vi pham ban quyen SHTT!</div>
                  </div>
                </div>
              )}

              {/* Section IV: Security */}
              {(filterTab === "all" || filterTab === "security") && (
                <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "10px" }}>
                  <div style={{ color: "#0369a1", fontWeight: 800 }}>[IV. AN TOAN THONG TIN &amp; DEFENDER]</div>
                  <div style={{ paddingLeft: "12px", color: "#475569" }}>
                    <div>• Windows Defender : <span style={{ color: "#dc2626", fontWeight: 700 }}>Bi tat Real-time Protection boi AutoKMS</span></div>
                    <div>• Windows Firewall : Bat (Dang hoat dong)</div>
                    <div>• Port 135/445     : Canh bao: Co the bi khai thac qua mang LAN</div>
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
                Chuẩn bị đón đoàn thanh tra bản quyền phần mềm liên ngành?
              </div>
              <div style={{ fontSize: "13px", color: "#475569", lineHeight: 1.5 }}>
                Mercy Tech cung cấp giải pháp chuyển đổi toàn diện sang <strong>OnlyOffice bản quyền hợp pháp 100%</strong>, kèm Hợp đồng kinh tế, Hóa đơn VAT và Chứng nhận nguồn gốc AGPLv3 đóng dấu mộc đỏ.
              </div>
            </div>
          </div>

          <a
            href="https://m.me/onlyoffice.official.vn"
            target="_blank"
            rel="noopener noreferrer"
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
            <span>Tư Vấn Miễn Trừ Pháp Lý</span>
          </a>
        </div>
      </div>
    </section>
  );
}
