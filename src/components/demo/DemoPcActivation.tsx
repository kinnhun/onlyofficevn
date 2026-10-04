"use client";

import React, { useState } from "react";
import { Download, HelpCircle, X, CheckCircle2, ShieldCheck, Terminal, Copy, Check, Sparkles, Laptop, FileCheck } from "lucide-react";

export default function DemoPcActivation() {
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
    <section id="demo-pc" style={{ padding: "40px 20px 48px", backgroundColor: "#f8fafc" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Main Activation Card */}
        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #fffbf7 60%, #fff7ed 100%)",
            borderRadius: "24px",
            border: "1.5px solid #fed7aa",
            padding: "42px 36px",
            boxShadow: "0 12px 36px rgba(234, 88, 12, 0.08)",
            position: "relative",
            overflow: "hidden",
          }}
        >
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "36px",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
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
                <span>BẢN QUYỀN TRẢI NGHIỆM ĐẦY ĐỦ CHO DOANH NGHIỆP</span>
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
                Tải Công Cụ Kích Hoạt Dùng Thử 7 Ngày{" "}
                <span style={{ color: "#ea580c" }}>(Tự Động 1-Click .BAT)</span>
              </h2>

              <p
                style={{
                  fontSize: "15px",
                  color: "#475569",
                  lineHeight: 1.65,
                  margin: "0 0 24px",
                }}
              >
                Script thông minh từ <strong>Mercy Tech</strong> tự động nhận diện cấu hình Windows (x64 / ARM64), tải bản cài đặt OnlyOffice chính hãng mới nhất (nếu máy chưa có) và tiêm license dùng thử 7 ngày đầy đủ tính năng Enterprise kèm trọn bộ 3 Plugin AI &amp; dịch thuật.
              </p>

              {/* 3 Value Points */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px", color: "#334155", fontWeight: 600 }}>
                  <CheckCircle2 size={17} color="#16a34a" style={{ flexShrink: 0 }} />
                  <span>Kích hoạt đầy đủ tính năng Enterprise: Document Server, PDF Editor, AI Assistant</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px", color: "#334155", fontWeight: 600 }}>
                  <CheckCircle2 size={17} color="#16a34a" style={{ flexShrink: 0 }} />
                  <span>An toàn tuyệt đối 100%, mã nguồn mở minh bạch, không crack, không can thiệp hệ thống</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px", color: "#334155", fontWeight: 600 }}>
                  <CheckCircle2 size={17} color="#16a34a" style={{ flexShrink: 0 }} />
                  <span>Hỗ trợ kỹ thuật cài đặt từ xa qua Ultraview / Teamviewer bởi kỹ sư Mercy Tech</span>
                </div>
              </div>
            </div>

            {/* Right Action Column */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                border: "1.5px solid #fed7aa",
                padding: "28px",
                boxShadow: "0 8px 24px rgba(234, 88, 12, 0.08)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Laptop size={18} color="#ea580c" />
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a" }}>
                    Phiên bản Windows 10 / 11
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
                  ✓ Đã kiểm định an toàn
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
                title="Tải trực tiếp file .bat (Tự động 1-Click không cần giải nén)"
              >
                <Download size={20} strokeWidth={2.5} />
                <span>TẢI CÔNG CỤ 1-CLICK (.BAT)</span>
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
                  <span>Tải Dự Phòng</span>
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
                  <span>Xem Hướng Dẫn</span>
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
                  <span>{copiedPs ? "Đã chép" : "Copy"}</span>
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
                  Hướng Dẫn Kích Hoạt 1-Click
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
                  <strong style={{ color: "#0f172a" }}>Tải file .BAT về máy tính:</strong> Bấm nút <em>"TẢI CÔNG CỤ 1-CLICK"</em> để lưu file <code>Kich-Hoat-Demo-OnlyOffice-Mercy.bat</code>.
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", padding: "12px", borderRadius: "10px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#ea580c", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0, fontSize: "12px" }}>2</span>
                <div>
                  <strong style={{ color: "#0f172a" }}>Khởi chạy quyền Administrator:</strong> Nhấp đúp vào file (hoặc click chuột phải chọn <em>Run as administrator</em>).
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", padding: "12px", borderRadius: "10px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#ea580c", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0, fontSize: "12px" }}>3</span>
                <div>
                  <strong style={{ color: "#0f172a" }}>Tự động hoàn tất:</strong> Bấm <strong>Yes</strong> khi Windows hỏi quyền UAC. Script tự động cài đặt OnlyOffice và kích hoạt 7 ngày dùng thử đầy đủ tính năng!
                </div>
              </div>

              <div style={{ padding: "14px", background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: "10px", fontSize: "13px", color: "#166534", lineHeight: 1.5 }}>
                ✓ An toàn tuyệt đối 100%, không chứa mã độc. Kỹ sư <strong>Mercy Tech</strong> sẵn sàng hỗ trợ trực tiếp qua Hotline: <strong>0763.068.614</strong> (24/7).
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
              Đã hiểu, đóng cửa sổ
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
