"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "@/i18n/routing";
import { X, ChevronRight, Download, Phone, MessageCircle, ChevronDown } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

interface HeaderMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{
    key: string;
    href: string;
    label: string;
    isActive: boolean;
  }>;
  locale: string;
  onSwitchLocale: (newLocale: "vi" | "en") => void;
  tBranding: (key: string) => string;
  tCommon: (key: string) => string;
  tHeader: (key: string) => string;
  renderFlagVi: () => React.ReactNode;
  renderFlagEn: () => React.ReactNode;
}

export default function HeaderMobileDrawer({
  isOpen,
  onClose,
  navItems,
  locale,
  onSwitchLocale,
  tBranding,
  tCommon,
  tHeader,
  renderFlagVi,
  renderFlagEn,
}: HeaderMobileDrawerProps) {
  const [mounted, setMounted] = useState(false);
  const [mobileEnterpriseOpen, setMobileEnterpriseOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("mobile-drawer-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-drawer-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-drawer-open");
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(4px)",
          zIndex: 99998,
        }}
      />

      {/* Drawer Container */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "320px",
          maxWidth: "85vw",
          height: "100vh",
          backgroundColor: "#ffffff",
          zIndex: 99999,
          padding: "20px",
          boxShadow: "4px 0 24px rgba(0, 0, 0, 0.15)",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      >
        {/* Drawer Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 800, fontSize: "16px", color: "#ff6f3d", letterSpacing: "0.5px" }}>
            ONLYOFFICE
          </span>
          <button
            onClick={onClose}
            style={{
              background: "#f1f5f9",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              padding: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Close menu"
          >
            <X size={18} color="#475569" />
          </button>
        </div>

        {/* Distributor Badge */}
        <div
          style={{
            background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
            border: "1px solid #fed7aa",
            borderRadius: "8px",
            padding: "10px 14px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#ea580c", textTransform: "uppercase", letterSpacing: "0.2px" }}>
            🇻🇳 {tBranding("distributor")}
          </div>
          <div style={{ fontSize: "11px", fontWeight: 600, color: "#475569" }}>
            {tBranding("optimizedBy")}
          </div>
        </div>

        {/* Language Selection */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0 12px",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <span style={{ fontSize: "12.5px", fontWeight: 600, color: "#64748b" }}>{tCommon("language")}</span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              onClick={() => onSwitchLocale("vi")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "5px 10px",
                borderRadius: "6px",
                border: locale === "vi" ? "1.5px solid #ff6f3d" : "1px solid #e2e8f0",
                background: locale === "vi" ? "#fff7ed" : "#ffffff",
                color: locale === "vi" ? "#ea580c" : "#333333",
                fontWeight: 600,
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              {renderFlagVi()}
              <span>Tiếng Việt</span>
            </button>
            <button
              type="button"
              onClick={() => onSwitchLocale("en")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "5px 10px",
                borderRadius: "6px",
                border: locale === "en" ? "1.5px solid #ff6f3d" : "1px solid #e2e8f0",
                background: locale === "en" ? "#fff7ed" : "#ffffff",
                color: locale === "en" ? "#ea580c" : "#333333",
                fontWeight: 600,
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              {renderFlagEn()}
              <span>English</span>
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", margin: "4px 0" }}>
          {/* 1. Trang chủ */}
          <Link
            key={navItems[0].key}
            href={navItems[0].href}
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 14px",
              borderRadius: "8px",
              backgroundColor: navItems[0].isActive ? "#fff7ed" : "#f8fafc",
              color: navItems[0].isActive ? "#ea580c" : "#1e293b",
              fontWeight: navItems[0].isActive ? 700 : 600,
              fontSize: "15px",
              textDecoration: "none",
              border: navItems[0].isActive ? "1px solid #fed7aa" : "1px solid #e2e8f0",
              transition: "all 0.15s ease",
            }}
          >
            <span>{navItems[0].label}</span>
            <ChevronRight size={16} color={navItems[0].isActive ? "#ea580c" : "#94a3b8"} />
          </Link>

          {/* 2. Enterprise Dropdown Accordion */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button
              type="button"
              onClick={() => setMobileEnterpriseOpen(!mobileEnterpriseOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 14px",
                borderRadius: "8px",
                backgroundColor: mobileEnterpriseOpen ? "#fff7ed" : "#f8fafc",
                color: mobileEnterpriseOpen ? "#ea580c" : "#1e293b",
                fontWeight: 700,
                fontSize: "15px",
                border: mobileEnterpriseOpen ? "1.5px solid #fed7aa" : "1px solid #e2e8f0",
                cursor: "pointer",
                width: "100%",
                boxSizing: "border-box",
                transition: "all 0.15s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>Enterprise</span>
                <span
                  style={{
                    fontSize: "10.5px",
                    backgroundColor: "#ffedd5",
                    color: "#ea580c",
                    padding: "2px 7px",
                    borderRadius: "4px",
                    fontWeight: 700,
                  }}
                >
                  Messenger
                </span>
              </div>
              <ChevronDown
                size={16}
                color={mobileEnterpriseOpen ? "#ea580c" : "#94a3b8"}
                style={{
                  transform: mobileEnterpriseOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              />
            </button>

            {mobileEnterpriseOpen && (
              <div
                style={{
                  padding: "12px 14px",
                  margin: "4px 0 6px",
                  borderRadius: "10px",
                  backgroundColor: "#fffbf7",
                  border: "1.5px dashed #fed7aa",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <div style={{ fontSize: "10.5px", fontWeight: 800, color: "#94a3b8", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                  DOCS ENTERPRISE
                </div>
                <a
                  href="https://www.messenger.com/t/286163107904324"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    onClose();
                    openMessengerChat(e);
                  }}
                  style={{ fontSize: "13.5px", color: "#334155", padding: "5px 6px", fontWeight: 600, textDecoration: "none" }}
                >
                  • {locale === "vi" ? "Tại sao chọn Docs Enterprise" : "Why Docs Enterprise"}
                </a>
                <a
                  href="https://www.messenger.com/t/286163107904324"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    onClose();
                    openMessengerChat(e);
                  }}
                  style={{ fontSize: "13.5px", color: "#334155", padding: "5px 6px", fontWeight: 600, textDecoration: "none" }}
                >
                  • {locale === "vi" ? "Bảng giá bản quyền" : "Pricing"}
                </a>
                <a
                  href="https://www.messenger.com/t/286163107904324"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    onClose();
                    openMessengerChat(e);
                  }}
                  style={{ fontSize: "13.5px", color: "#334155", padding: "5px 6px", fontWeight: 600, textDecoration: "none" }}
                >
                  • {locale === "vi" ? "Nhận bản quyền ngay" : "Get it now"}
                </a>

                <div style={{ fontSize: "10.5px", fontWeight: 800, color: "#94a3b8", letterSpacing: "0.5px", textTransform: "uppercase", marginTop: "8px" }}>
                  DOCSPACE ENTERPRISE
                </div>
                <a
                  href="https://www.messenger.com/t/286163107904324"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    onClose();
                    openMessengerChat(e);
                  }}
                  style={{ fontSize: "13.5px", color: "#334155", padding: "5px 6px", fontWeight: 600, textDecoration: "none" }}
                >
                  • {locale === "vi" ? "Tại sao chọn DocSpace Enterprise" : "Why DocSpace Enterprise"}
                </a>
                <a
                  href="https://www.messenger.com/t/286163107904324"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    onClose();
                    openMessengerChat(e);
                  }}
                  style={{ fontSize: "13.5px", color: "#334155", padding: "5px 6px", fontWeight: 600, textDecoration: "none" }}
                >
                  • {locale === "vi" ? "Bảng giá DocSpace" : "Pricing"}
                </a>
                <a
                  href="https://www.messenger.com/t/286163107904324"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    onClose();
                    openMessengerChat(e);
                  }}
                  style={{ fontSize: "13.5px", color: "#334155", padding: "5px 6px", fontWeight: 600, textDecoration: "none" }}
                >
                  • {locale === "vi" ? "Kích hoạt dùng thử ngay" : "Get it now"}
                </a>

                <div style={{ borderTop: "1px solid #fed7aa", paddingTop: "8px", marginTop: "6px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <a
                    href="https://www.messenger.com/t/286163107904324"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      onClose();
                      openMessengerChat(e);
                    }}
                    style={{ fontSize: "13px", color: "#ea580c", padding: "4px 6px", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <MessageCircle size={14} />
                    <span>{locale === "vi" ? "Liên hệ tư vấn (Contact sales)" : "Contact sales"}</span>
                  </a>
                  <a
                    href="https://www.messenger.com/t/286163107904324"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      onClose();
                      openMessengerChat(e);
                    }}
                    style={{ fontSize: "13px", color: "#ea580c", padding: "4px 6px", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <span>🚀</span>
                    <span>{locale === "vi" ? "Đăng ký Demo trực tiếp (Request demo)" : "Request demo"}</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* 3. Bảng Giá, Hợp Tác Phân Phối, Blog */}
          {navItems.slice(1).map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 14px",
                borderRadius: "8px",
                backgroundColor: item.isActive ? "#fff7ed" : "#f8fafc",
                color: item.isActive ? "#ea580c" : "#1e293b",
                fontWeight: item.isActive ? 700 : 600,
                fontSize: "15px",
                textDecoration: "none",
                border: item.isActive ? "1px solid #fed7aa" : "1px solid #e2e8f0",
                transition: "all 0.15s ease",
              }}
            >
              <span>{item.label}</span>
              <ChevronRight size={16} color={item.isActive ? "#ea580c" : "#94a3b8"} />
            </Link>
          ))}
        </div>

        {/* Mobile Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "auto", paddingTop: "14px" }}>
          <Link
            href="/demo"
            onClick={onClose}
            style={{
              backgroundColor: "#ff6f3d",
              color: "#ffffff",
              padding: "12px 16px",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(255, 111, 61, 0.35)",
            }}
          >
            <Download size={16} strokeWidth={2.5} />
            <span>{tHeader("download")}</span>
          </Link>

          <a
            href="https://www.messenger.com/t/286163107904324"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              onClose();
              openMessengerChat(e);
            }}
            style={{
              background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
              color: "#ffffff",
              padding: "10px 16px",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "13.5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              textDecoration: "none",
              boxShadow: "0 2px 10px rgba(234, 88, 12, 0.25)",
            }}
          >
            <MessageCircle size={18} strokeWidth={2.4} />
            <span>{tCommon("contact")}</span>
          </a>

          <a
            href="tel:0763068614"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              color: "#ea580c",
              fontWeight: 700,
              fontSize: "14px",
              textDecoration: "none",
              padding: "8px",
            }}
          >
            <Phone size={15} />
            <span>Hotline: 0763.068.614</span>
          </a>
        </div>
      </div>
    </>,
    document.body
  );
}
