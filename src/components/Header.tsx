"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/config";
import { Download, Menu, X, MessageCircle } from "lucide-react";
import { FlagVi, FlagEn } from "@/components/HeaderFlags";
import HeaderMobileDrawer from "@/components/HeaderMobileDrawer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import HeaderRightActions from "@/components/HeaderRightActions";
import HeaderEnterpriseDropdown from "@/components/HeaderEnterpriseDropdown";
import { openMessengerChat } from "@/lib/messenger";

export default function Header() {
  const tHeader = useTranslations("header");
  const tCommon = useTranslations("common");
  const tBranding = useTranslations("branding");
  const locale = useLocale();
  const isVi = locale === "vi";
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  // Exactly 4 navigation pages requested by user:
  // 1. Trang chủ (/)
  // 2. Bảng Giá (/pricing)
  // 3. Hợp Tác Phân Phối (/partners)
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
      label: isVi ? "Đại Lý" : tHeader("partners"),
      isActive: pathname.startsWith("/partners"),
    },
    {
      key: "caidat",
      href: "/huong-dan-cai-dat",
      label: isVi ? "Cài Đặt" : "Installation",
      isActive: pathname.startsWith("/huong-dan-cai-dat") || pathname.startsWith("/caidat"),
    },
    {
      key: "tro-ly-ai",
      href: "/tro-ly-onlyoffice",
      label: isVi ? "Trợ Lý AI" : "AI Assistant",
      isActive: pathname.startsWith("/tro-ly-onlyoffice"),
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
          padding: "0 clamp(12px, 3vw, 28px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "68px",
          width: "100%",
          boxSizing: "border-box",
          flexWrap: "nowrap",
          gap: "12px",
        }}
      >
        {/* Left Side: Mobile Hamburger Button & Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
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
              color: "#1e293b",
            }}
          >
            {mobileOpen ? <X size={22} color="#1e293b" /> : <Menu size={22} color="#1e293b" />}
          </button>

          {/* Logo & Mercy Tech Distributor Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0, whiteSpace: "nowrap" }}>
            <Link
              className="oo-header-logo en"
              aria-label="ONLYOFFICE - Go to homepage"
              href="/"
              style={{
                margin: 0,
                flexShrink: 0,
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <img
                src="/wp-content/themes/onlyoffice-vn/assets/images/logo/logo-onlyoffice.svg"
                alt="ONLYOFFICE"
                width={132}
                height={26}
                style={{
                  height: "26px",
                  width: "auto",
                  maxWidth: "140px",
                  display: "block",
                  objectFit: "contain",
                }}
              />
            </Link>
            <div
              className="mercy-header-divider"
              style={{
                width: "1.5px",
                height: "24px",
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
        </div>

        {/* Desktop 4 Direct Pages Navigation */}
        <nav
          className="desktop-header-nav"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "1 1 auto",
            margin: "0 clamp(4px, 1vw, 16px)",
            minWidth: 0,
          }}
        >
          {/* 4 Direct Pages Links */}
          <div
            className="oo-header-menu en"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(2px, 0.4vw, 6px)",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}
          >
            {/* 1. Trang chủ */}
            <Link
              key={navItems[0].key}
              href={navItems[0].href}
              className={`oo-main-nav-link ${navItems[0].isActive ? "active" : ""}`}
              style={{
                fontSize: "clamp(13px, 0.95vw, 14.5px)",
                fontWeight: navItems[0].isActive ? 700 : 600,
                color: navItems[0].isActive ? "#ea580c" : "#334155",
                backgroundColor: navItems[0].isActive ? "rgba(255, 111, 61, 0.09)" : "transparent",
                borderColor: navItems[0].isActive ? "rgba(255, 111, 61, 0.22)" : "transparent",
                textDecoration: "none",
                padding: "8px clamp(8px, 0.8vw, 13px)",
                borderRadius: "8px",
                display: "inline-flex",
                alignItems: "center",
                whiteSpace: "nowrap",
                flexShrink: 0,
                wordBreak: "keep-all",
                lineHeight: 1.2,
              }}
            >
              {navItems[0].label}
            </Link>

            {/* 2. Enterprise Dropdown (Click goes directly to Messenger) */}
            <HeaderEnterpriseDropdown locale={locale} />

            {/* 3. Bảng Giá, Hợp Tác Phân Phối, Blog */}
            {navItems.slice(1).map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`oo-main-nav-link ${item.isActive ? "active" : ""}`}
                style={{
                  fontSize: "clamp(13px, 0.95vw, 14.5px)",
                  fontWeight: item.isActive ? 700 : 600,
                  color: item.isActive ? "#ea580c" : "#334155",
                  backgroundColor: item.isActive ? "rgba(255, 111, 61, 0.09)" : "transparent",
                  borderColor: item.isActive ? "rgba(255, 111, 61, 0.22)" : "transparent",
                  textDecoration: "none",
                  padding: "8px clamp(8px, 0.8vw, 13px)",
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
        </nav>

        {/* Right Action Buttons & Language Switcher (Grouped in ONE flex container to prevent overlap) */}
        <div
          className="oo-header-right-group"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
        >
          {/* Free Trial / Demo Navigation Button */}
          <Link
            id="oo-menu-item-btn-download"
            href="/demo"
            className="oo-header-btn-download"
            style={{
              background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
              color: "#ffffff",
              padding: "0 clamp(10px, 1.2vw, 16px)",
              height: "38px",
              borderRadius: "8px",
              border: "none",
              fontWeight: 700,
              fontSize: "13px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
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
            title={locale === "vi" ? "Trải nghiệm dùng thử trực tuyến & kích hoạt 7 ngày" : "Online demo & 7-day trial activation"}
          >
            <Download size={15} strokeWidth={2.5} style={{ flexShrink: 0 }} />
            <span>{tHeader("download")}</span>
          </Link>

          {/* Contact Button */}
          <a
            className="mercy-contact-btn en"
            href="https://www.messenger.com/t/286163107904324"
            target="_blank"
            rel="noopener noreferrer"
            onClick={openMessengerChat}
            title={locale === "vi" ? "Liên hệ" : "Contact us"}
            style={{
              background: "#fff7ed",
              border: "1.5px solid #fed7aa",
              borderRadius: "8px",
              whiteSpace: "nowrap",
              flexShrink: 0,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "0 clamp(8px, 0.9vw, 12px)",
              height: "38px",
              fontSize: "13px",
              fontWeight: 700,
              color: "#ea580c",
              textDecoration: "none",
              lineHeight: "1",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ffedd5";
              e.currentTarget.style.borderColor = "#ea580c";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fff7ed";
              e.currentTarget.style.borderColor = "#fed7aa";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <MessageCircle size={15} strokeWidth={2.5} color="#ea580c" style={{ flexShrink: 0 }} />
            <span className="mercy-contact-text">{tCommon("contact")}</span>
          </a>

          {/* Language Switcher */}
          <LanguageSwitcher variant="header" />
        </div>
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
