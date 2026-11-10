"use client";

import React, { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { ConfigProvider, Button, Modal } from "antd";
import {
  RobotOutlined,
  MessageOutlined,
  DownloadOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { openMessengerChat } from "@/lib/messenger";
import { usePathname } from "@/i18n/config";

export default function FloatingTrialButton() {
  const locale = useLocale();
  const isVi = locale === "vi";
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState(false);
  const [, setDownloadCount] = useState(0);
  const [footerInView, setFooterInView] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleChatState = (e: any) => {
      if (e?.detail && typeof e.detail.isOpen === "boolean") {
        setIsChatOpen(e.detail.isOpen);
      }
    };
    window.addEventListener("onlyoffice-ai-chat-state", handleChatState as EventListener);
    return () => {
      window.removeEventListener("onlyoffice-ai-chat-state", handleChatState as EventListener);
    };
  }, []);

  const handleOpenAiAssistant = () => {
    window.dispatchEvent(new CustomEvent("open-onlyoffice-ai-chat"));
  };

  useEffect(() => {
    const bottomBar = document.querySelector(".oo-footer-bottom-bar");
    if (!bottomBar) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterInView(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.05,
      }
    );

    observer.observe(bottomBar);
    return () => observer.disconnect();
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "https://onlyoffice.mercytechglobal.com/Setup-OnlyOffice-Mercy.exe";
    link.download = "Setup-OnlyOffice-Mercy.exe";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadCount((prev) => prev + 1);
    setModalOpen(true);
  };

  if (pathname?.includes("tro-ly-onlyoffice") || isChatOpen) {
    return null;
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ea580c",
          fontFamily: "var(--font-open-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
      }}
    >
      {/* Floating Action Stack at Bottom-Right */}
      <div
        className={`oo-floating-trial-container ${footerInView ? "footer-visible" : ""}`}
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "10px",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          opacity: footerInView ? 0 : 1,
          pointerEvents: footerInView ? "none" : "auto",
        }}
      >
        {/* Row 1: Trợ lý AI (Modern Violet AI Gradient) + Liên hệ (Luxury White / Orange) */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Trợ lý AI - Standout AI Purple/Violet Gradient */}
          <Button
            type="primary"
            shape="round"
            size="large"
            icon={<RobotOutlined style={{ fontSize: "16px", color: "#ffffff" }} />}
            onClick={handleOpenAiAssistant}
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
              border: "none",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "14px",
              height: "44px",
              padding: "0 18px",
              boxShadow: "0 8px 22px rgba(139, 92, 246, 0.42)",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
              e.currentTarget.style.boxShadow = "0 12px 28px rgba(139, 92, 246, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 22px rgba(139, 92, 246, 0.42)";
            }}
          >
            <span>{isVi ? "Trợ lý AI" : "AI Assistant"}</span>
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.9)",
                display: "inline-block",
                marginLeft: "2px",
                flexShrink: 0,
              }}
              title="Online 24/7"
            />
          </Button>

          {/* Liên hệ - Clean Luxury White with Orange Accent */}
          <Button
            shape="round"
            size="large"
            icon={<MessageOutlined style={{ fontSize: "16px", color: "#ea580c" }} />}
            href="https://www.messenger.com/t/286163107904324"
            target="_blank"
            onClick={openMessengerChat}
            style={{
              background: "#ffffff",
              borderColor: "#fed7aa",
              borderWidth: "1.5px",
              color: "#ea580c",
              fontWeight: 700,
              fontSize: "14px",
              height: "44px",
              padding: "0 18px",
              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
              e.currentTarget.style.borderColor = "#ea580c";
              e.currentTarget.style.boxShadow = "0 10px 24px rgba(234, 88, 12, 0.2)";
              e.currentTarget.style.background = "#fff7ed";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.borderColor = "#fed7aa";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(0, 0, 0, 0.08)";
              e.currentTarget.style.background = "#ffffff";
            }}
          >
            <span>{isVi ? "Liên hệ" : "Contact"}</span>
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                boxShadow: "0 0 0 2px rgba(234, 88, 12, 0.2)",
                display: "inline-block",
                marginLeft: "2px",
                flexShrink: 0,
              }}
              title="Online"
            />
          </Button>
        </div>

        {/* Row 2: Tải Bản Dùng Thử - Standout ONLYOFFICE Fire Orange Gradient */}
        <Button
          type="primary"
          shape="round"
          size="large"
          icon={<DownloadOutlined style={{ fontSize: "19px", color: "#ffffff" }} />}
          onClick={handleDownload}
          style={{
            background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
            border: "none",
            color: "#ffffff",
            height: "52px",
            padding: "0 28px",
            fontSize: "15.5px",
            fontWeight: 800,
            boxShadow: "0 10px 28px rgba(234, 88, 12, 0.45)",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
            e.currentTarget.style.boxShadow = "0 14px 34px rgba(234, 88, 12, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 10px 28px rgba(234, 88, 12, 0.45)";
          }}
        >
          {isVi ? "Tải Bản Dùng Thử" : "Download Trial"}
        </Button>
      </div>

      {/* Ant Design Modal for Post-Download Instructions */}
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        centered
        width={540}
        styles={{
          body: { padding: "24px" },
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "#fff7ed",
              color: "#ea580c",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "12px",
            }}
          >
            <DownloadOutlined style={{ fontSize: "28px" }} />
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1e293b", margin: "0 0 6px" }}>
            {isVi ? "Đang Tải Công Cụ Kích Hoạt!" : "Downloading Activation Tool!"}
          </h2>
          <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
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
            padding: "16px 18px",
            marginBottom: "20px",
          }}
        >
          <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#334155", marginBottom: "12px" }}>
            {isVi ? "Hướng dẫn kích hoạt 3 bước đơn giản:" : "Simple 3-step activation guide:"}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span
                style={{
                  background: "#ff6f3d",
                  color: "#fff",
                  fontSize: "11px",
                  fontWeight: 700,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                1
              </span>
              <div style={{ fontSize: "13px", color: "#475569", lineHeight: "1.5" }}>
                {isVi ? (
                  <>
                    Mở thư mục <strong>Downloads</strong>, tìm file{" "}
                    <code style={{ background: "#e2e8f0", padding: "2px 6px", borderRadius: "4px" }}>
                      Setup-OnlyOffice-Mercy.exe
                    </code>
                  </>
                ) : (
                  <>Open your <strong>Downloads</strong> folder and locate <code>Setup-OnlyOffice-Mercy.exe</code></>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span
                style={{
                  background: "#ff6f3d",
                  color: "#fff",
                  fontSize: "11px",
                  fontWeight: 700,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                2
              </span>
              <div style={{ fontSize: "13px", color: "#475569", lineHeight: "1.5" }}>
                {isVi ? (
                  <>
                    Nhấp đúp vào file (hoặc chuột phải chọn <strong>Run as administrator</strong>) để khởi chạy trình cài đặt.
                  </>
                ) : (
                  <>Double-click the file (or right-click and select <strong>Run as administrator</strong>).</>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span
                style={{
                  background: "#ff6f3d",
                  color: "#fff",
                  fontSize: "11px",
                  fontWeight: 700,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                3
              </span>
              <div style={{ fontSize: "13px", color: "#475569", lineHeight: "1.5" }}>
                {isVi ? (
                  <>
                    Bấm <strong>Yes</strong> khi xuất hiện hộp thoại UAC. Trình cài đặt sẽ tự động thiết lập OnlyOffice và kích hoạt 7 ngày dùng thử đầy đủ tính năng Enterprise!
                  </>
                ) : (
                  <>Click <strong>Yes</strong> on UAC prompt to start your 7-day full Enterprise trial!</>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            size="large"
            icon={<ReloadOutlined />}
            onClick={handleDownload}
            style={{ flex: 1, borderRadius: "8px", fontWeight: 600, height: "42px" }}
          >
            {isVi ? "Tải Lại .EXE" : "Re-download"}
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<MessageOutlined />}
            href="https://www.messenger.com/t/286163107904324"
            target="_blank"
            onClick={openMessengerChat}
            style={{
              flex: 1,
              borderRadius: "8px",
              fontWeight: 600,
              height: "42px",
              background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
              border: "none",
            }}
          >
            {isVi ? "Liên hệ ngay" : "Contact Now"}
          </Button>
        </div>
      </Modal>
    </ConfigProvider>
  );
}
