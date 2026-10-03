"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { X, ChevronRight, Download, Phone, MessageCircle } from "lucide-react";

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
  if (!isOpen) return null;

  return (
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
          backgroundColor: "rgba(15, 23, 42, 0.5)",
          backdropFilter: "blur(2px)",
          zIndex: 1001,
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
          zIndex: 1002,
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

        {/* 4 Direct Navigation Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", margin: "4px 0" }}>
          {navItems.map((item) => (
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
            href="https://m.me/onlyoffice.official.vn"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
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
    </>
  );
}
