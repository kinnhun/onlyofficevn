"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/routing";
import { Download, Menu, X } from "lucide-react";
import { FlagVi, FlagEn } from "@/components/HeaderFlags";
import HeaderMobileDrawer from "@/components/HeaderMobileDrawer";
import HeaderRightActions from "@/components/HeaderRightActions";

export default function Header() {
  const tHeader = useTranslations("header");
  const tCommon = useTranslations("common");
  const tBranding = useTranslations("branding");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  // Exactly 4 navigation pages requested by user:
  // 1. Trang chủ (/)
  // 2. Bảng Giá (/pricing)
  // 3. Đăng ký đối tác (/partners)
  // 4. Blog (/blog)
  const navItems = [
    {
      key: "home",
      href: "/",
      label: tHeader("home"),
      isActive: pathname === "/",
    },
    {
      key: "pricing",
      href: "/pricing",
      label: tHeader("pricing"),
      isActive: pathname.startsWith("/pricing"),
    },
    {
      key: "partners",
      href: "/partners",
      label: tHeader("partners"),
      isActive: pathname.startsWith("/partners"),
    },
    {
      key: "blog",
      href: "/blog",
      label: tHeader("blog"),
      isActive: pathname.startsWith("/blog"),
    },
  ];

  const switchLocale = (newLocale: "vi" | "en") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header
      className="oo-header en oo-header--space-between"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.04)",
        width: "100%",
      }}
    >
      <div
        className="oo-header-container"
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "68px",
          width: "100%",
          boxSizing: "border-box",
          flexWrap: "nowrap",
          gap: "16px",
        }}
      >
        {/* Mobile Hamburger Button (Strictly hidden on desktop via CSS) */}
        <button
          className="oo-header-hamburger en"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "6px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {mobileOpen ? <X size={22} color="#1e293b" /> : <Menu size={22} color="#1e293b" />}
        </button>

        {/* Logo & Mercy Tech Distributor Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexShrink: 0, whiteSpace: "nowrap" }}>
          <Link
            className="oo-header-logo en"
            aria-label="Go to homepage"
            href="/"
            style={{ margin: 0, flexShrink: 0 }}
          />
          <div
            style={{
              width: "1.5px",
              height: "26px",
              backgroundColor: "#e2e8f0",
              flexShrink: 0,
            }}
          />
          <div
            className="mercy-header-badge"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5px",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#ea580c",
                letterSpacing: "0.2px",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                lineHeight: 1.2,
              }}
            >
              {tBranding("distributor")}
            </span>
            <span
              style={{
                fontSize: "10.5px",
                fontWeight: 600,
                color: "#64748b",
                whiteSpace: "nowrap",
                lineHeight: 1.2,
              }}
            >
              {tBranding("optimizedBy")}
            </span>
          </div>
        </div>

        {/* Desktop 4 Direct Pages Navigation */}
        <nav
          className="oo-header-nav en"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
            marginLeft: "24px",
            minWidth: 0,
            flexWrap: "nowrap",
          }}
        >
          {/* 4 Direct Pages Links */}
          <div
            className="oo-header-menu en"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`oo-main-nav-link ${item.isActive ? "active" : ""}`}
                style={{
                  fontSize: "14.5px",
                  fontWeight: item.isActive ? 700 : 600,
                  color: item.isActive ? "#ea580c" : "#334155",
                  backgroundColor: item.isActive ? "rgba(255, 111, 61, 0.09)" : "transparent",
                  borderColor: item.isActive ? "rgba(255, 111, 61, 0.22)" : "transparent",
                  textDecoration: "none",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  wordBreak: "keep-all",
                  lineHeight: 1.2,
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Action Buttons: Dùng Thử & Liên hệ */}
          <div
            className="oo-header-btns en"
            style={{
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            {/* Direct Free Trial Download Button */}
            <a
              id="oo-menu-item-btn-download"
              href="/api/download-trial"
              download="Kich-Hoat-Demo-OnlyOffice-Mercy.bat"
              className="oo-header-btn-download"
              style={{
                background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                color: "#ffffff",
                padding: "0 18px",
                height: "38px",
                borderRadius: "8px",
                border: "none",
                fontWeight: 700,
                fontSize: "13.5px",
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                cursor: "pointer",
                boxShadow: "0 2px 10px rgba(234, 88, 12, 0.3)",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                flexShrink: 0,
                textDecoration: "none",
                lineHeight: "1",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #f9571f 0%, #c2410c 100%)";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(234, 88, 12, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 10px rgba(234, 88, 12, 0.3)";
              }}
              title={locale === "vi" ? "Tải công cụ kích hoạt dùng thử 7 ngày (.BAT)" : "Download 7-day trial activation tool (.BAT)"}
            >
              <Download size={15} strokeWidth={2.5} style={{ flexShrink: 0 }} />
              <span>{tHeader("download")}</span>
            </a>

            {/* Messenger / Contact Button */}
            <a
              className="mercy-contact-btn en"
              href="https://m.me/onlyoffice.official.vn"
              target="_blank"
              rel="noopener noreferrer"
              title="Liên hệ qua Messenger"
              style={{
                backgroundColor: "#ffffff",
                border: "1.5px solid #e2e8f0",
                borderRadius: "8px",
                whiteSpace: "nowrap",
                flexShrink: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "7px",
                padding: "0 15px",
                height: "38px",
                fontSize: "13.5px",
                fontWeight: 600,
                color: "#1e293b",
                textDecoration: "none",
                lineHeight: "1",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f8fafc";
                e.currentTarget.style.borderColor = "#cbd5e1";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <path
                  d="M12 2C6.477 2 2 6.145 2 11.258C2 14.172 3.455 16.78 5.735 18.442V22L9.153 20.124C10.058 20.375 11.017 20.511 12 20.511C17.523 20.511 22 16.366 22 11.258C22 6.145 17.523 2 12 2ZM13.066 14.443L10.459 11.663L5.371 14.443L10.967 8.5L13.64 11.28L18.663 8.5L13.066 14.443Z"
                  fill="#0084FF"
                />
              </svg>
              <span style={{ fontSize: "13.5px", fontWeight: 600, color: "#1e293b", whiteSpace: "nowrap" }}>{tCommon("contact")}</span>
            </a>
          </div>
        </nav>

        {/* Right Icon Actions (Language Selector only) */}
        <HeaderRightActions
          locale={locale}
          onSwitchLocale={switchLocale}
          tCommon={tCommon}
        />
      </div>

      {/* Mobile Drawer */}
      <HeaderMobileDrawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={navItems}
        locale={locale}
        onSwitchLocale={switchLocale}
        tBranding={tBranding}
        tCommon={tCommon}
        tHeader={tHeader}
        renderFlagVi={() => <FlagVi />}
        renderFlagEn={() => <FlagEn />}
      />
    </header>
  );
}
