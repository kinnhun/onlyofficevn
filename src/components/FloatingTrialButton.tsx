"use client";

import React, { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { MessageCircle } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

export default function FloatingTrialButton() {
  const locale = useLocale();
  const isVi = locale === "vi";
  const [modalOpen, setModalOpen] = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    };
  }, [modalOpen]);

  const handleDownload = () => {
    // Trigger download
    const link = document.createElement("a");
    link.href = "/api/download-trial";
    link.download = "Kich-Hoat-Demo-OnlyOffice-Mercy.bat";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadCount((prev) => prev + 1);
    setModalOpen(true);
  };

  return (
    <>
      {/* Floating CTA Button at Bottom-Right */}
      <div
        className="oo-floating-trial-container"
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 900,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "8px",
        }}
      >
        {/* Floating Contact Button */}
        <a
          id="btn-floating-contact"
          href="https://m.me/onlyoffice.official.vn"
          target="_blank"
          rel="noopener noreferrer"
          onClick={openMessengerChat}
          title={isVi ? "Liên hệ tư vấn" : "Contact us"}
          aria-label={isVi ? "Liên hệ" : "Contact"}
          style={{
            background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
            color: "#ffffff",
            border: "none",
            borderRadius: "50px",
            padding: "9px 18px",
            fontSize: "13.5px",
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 8px 22px rgba(234, 88, 12, 0.4)",
            textDecoration: "none",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            marginBottom: "2px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px) scale(1.03)";
            e.currentTarget.style.boxShadow = "0 12px 28px rgba(234, 88, 12, 0.55)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 22px rgba(234, 88, 12, 0.4)";
          }}
        >
          <MessageCircle size={18} strokeWidth={2.4} style={{ flexShrink: 0 }} />
          <span style={{ letterSpacing: "0.01em" }}>
            {isVi ? "Liên hệ" : "Contact"}
          </span>
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.8)",
              display: "inline-block",
            }}
            title="Online"
          />
        </a>

        {/* Pulsing Pill Tag */}
        <div
          style={{
            background: "linear-gradient(90deg, #10b981 0%, #059669 100%)",
            color: "#ffffff",
            fontSize: "11px",
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: "20px",
            boxShadow: "0 2px 8px rgba(16, 185, 129, 0.4)",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            animation: "pulse 2s infinite",
            userSelect: "none",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              display: "inline-block",
            }}
          />
          {isVi ? "DÙNG THỬ 7 NGÀY MIỄN PHÍ" : "7-DAY FREE TRIAL"}
        </div>

        {/* Main Floating Button */}
        <button
          id="btn-floating-trial-download"
          onClick={handleDownload}
          aria-label="Download OnlyOffice Trial Tool"
          style={{
            background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
            color: "#ffffff",
            border: "none",
            borderRadius: "50px",
            padding: "14px 24px",
            fontSize: "15px",
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 10px 25px rgba(255, 111, 61, 0.45)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px) scale(1.03)";
            e.currentTarget.style.boxShadow = "0 14px 30px rgba(255, 111, 61, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 10px 25px rgba(255, 111, 61, 0.45)";
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span style={{ letterSpacing: "0.02em" }}>
            {isVi ? "Tải Bản Dùng Thử" : "Download Trial"}
          </span>
        </button>
      </div>

      {/* Instruction Modal after Download */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(6px)",
            zIndex: 100000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              maxWidth: "540px",
              width: "100%",
              padding: "32px",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
              position: "relative",
              animation: "modalFadeIn 0.25s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: "absolute",
                top: "18px",
                right: "18px",
                background: "#f1f5f9",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748b",
                fontSize: "18px",
                fontWeight: 600,
              }}
              title="Đóng"
            >
              ✕
            </button>

            {/* Header Icon */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "#fff7ed",
                  color: "#ea580c",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "12px",
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1e293b", margin: "0 0 6px" }}>
                {isVi ? "Đang Tải Công Cụ Kích Hoạt!" : "Downloading Activation Tool!"}
              </h2>
              <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
                {isVi
                  ? "Cung cấp bởi: Công ty TNHH Công Nghệ Mercy (MST: 0319227767)"
                  : "Provided by Mercy Technology Co., Ltd"}
              </p>
            </div>

            {/* Steps Box */}
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "18px 20px",
                marginBottom: "24px",
              }}
            >
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#334155", marginBottom: "12px" }}>
                {isVi ? "Hướng dẫn kích hoạt 3 bước đơn giản:" : "Simple 3-step activation guide:"}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span
                    style={{
                      background: "#ff6f3d",
                      color: "#fff",
                      fontSize: "12px",
                      fontWeight: 700,
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    1
                  </span>
                  <div style={{ fontSize: "13px", color: "#475569", lineHeight: "1.5" }}>
                    {isVi ? (
                      <>
                        Mở thư mục <strong>Downloads</strong>, tìm file{" "}
                        <code style={{ background: "#e2e8f0", padding: "2px 6px", borderRadius: "4px" }}>
                          Kich-Hoat-Demo-OnlyOffice-Mercy.bat
                        </code>
                      </>
                    ) : (
                      <>Open your <strong>Downloads</strong> folder and locate the downloaded .bat file.</>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span
                    style={{
                      background: "#ff6f3d",
                      color: "#fff",
                      fontSize: "12px",
                      fontWeight: 700,
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    2
                  </span>
                  <div style={{ fontSize: "13px", color: "#475569", lineHeight: "1.5" }}>
                    {isVi ? (
                      <>
                        Nhấp chuột phải vào file, chọn <strong>Run as administrator</strong> (Chạy với quyền Quản trị viên).
                      </>
                    ) : (
                      <>
                        Right-click the file and select <strong>Run as administrator</strong>.
                      </>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span
                    style={{
                      background: "#ff6f3d",
                      color: "#fff",
                      fontSize: "12px",
                      fontWeight: 700,
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    3
                  </span>
                  <div style={{ fontSize: "13px", color: "#475569", lineHeight: "1.5" }}>
                    {isVi ? (
                      <>
                        Bấm <strong>Yes</strong> khi xuất hiện hộp thoại UAC. Script sẽ tự động kích hoạt 7 ngày dùng thử đầy đủ tính năng Enterprise!
                      </>
                    ) : (
                      <>
                        Click <strong>Yes</strong> on UAC prompt. The tool will automatically activate your 7-day full Enterprise trial!
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                onClick={handleDownload}
                style={{
                  flex: "1 1 auto",
                  background: "#475569",
                  color: "#ffffff",
                  border: "none",
                  padding: "12px 18px",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {isVi ? "Tải Lại File .BAT" : "Re-download File"}
              </button>

              <a
                href="https://m.me/onlyoffice.official.vn"
                target="_blank"
                rel="noopener noreferrer"
                onClick={openMessengerChat}
                style={{
                  flex: "1 1 auto",
                  background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                  color: "#ffffff",
                  textDecoration: "none",
                  padding: "12px 18px",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "14px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 14px rgba(234, 88, 12, 0.35)",
                }}
              >
                <MessageCircle size={16} />
                {isVi ? "Liên hệ ngay" : "Contact Now"}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
