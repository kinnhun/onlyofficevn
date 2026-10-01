"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

import FooterCompanyInfo from "./FooterCompanyInfo";

export default function Footer() {
  const t = useTranslations("footer");
  const tBranding = useTranslations("branding");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);

  const switchLocale = (newLocale: "vi" | "en") => {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
  };

  const getSafeBranding = (key: string, fallback: string) => {
    try {
      return tBranding.has(key) ? tBranding(key) : fallback;
    } catch {
      return fallback;
    }
  };

  return (
    <footer
      style={{
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #e0e0e0",
        padding: "48px 0 36px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Mercy Tech Official Company & Contact Info */}
        <FooterCompanyInfo />

        {/* Bottom Bar: Language Selector & Official Copyright */}
        <div
          style={{
            borderTop: "1px solid #e0e0e0",
            paddingTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {/* Language Selector */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              style={{
                background: "#ffffff",
                border: "1px solid #dcdcdc",
                borderRadius: "6px",
                padding: "6px 12px",
                color: "#333333",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>{locale === "vi" ? "🇻🇳 Tiếng Việt" : "🇬🇧 English"}</span>
              <span style={{ fontSize: "10px", color: "#888" }}>▼</span>
            </button>

            {langOpen && (
              <div
                style={{
                  position: "absolute",
                  bottom: "100%",
                  left: 0,
                  marginBottom: "8px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                  borderRadius: "6px",
                  padding: "6px 0",
                  minWidth: "150px",
                  border: "1px solid #eee",
                  zIndex: 100,
                }}
              >
                <button
                  type="button"
                  onClick={() => switchLocale("vi")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    textAlign: "left",
                    padding: "8px 14px",
                    background: locale === "vi" ? "#fff7ed" : "none",
                    border: "none",
                    fontSize: "13px",
                    fontWeight: locale === "vi" ? 700 : 500,
                    color: locale === "vi" ? "#ea580c" : "#333333",
                    cursor: "pointer",
                  }}
                >
                  <span>🇻🇳 Tiếng Việt</span>
                  {locale === "vi" && <span style={{ color: "#ea580c" }}>✓</span>}
                </button>
                <button
                  type="button"
                  onClick={() => switchLocale("en")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    textAlign: "left",
                    padding: "8px 14px",
                    background: locale === "en" ? "#fff7ed" : "none",
                    border: "none",
                    fontSize: "13px",
                    fontWeight: locale === "en" ? 700 : 500,
                    color: locale === "en" ? "#ea580c" : "#333333",
                    cursor: "pointer",
                  }}
                >
                  <span>🇬🇧 English</span>
                  {locale === "en" && <span style={{ color: "#ea580c" }}>✓</span>}
                </button>
              </div>
            )}
          </div>

          {/* Copyright & Distributor Branding */}
          <div style={{ fontSize: "12px", color: "#888888", textAlign: "right" }}>
            <div>© Ascensio System SIA 2009-2026. {t("rights")}</div>
            <div style={{ marginTop: "6px", color: "#ff6f3d", fontWeight: 700, fontSize: "12px" }}>
              🇻🇳 {getSafeBranding("distributor", "Đơn vị phân phối tại Việt Nam")} • {getSafeBranding("optimizedBy", "Tối ưu bởi Mercy Tech")}
            </div>
            <div style={{ marginTop: "2px", color: "#64748b", fontSize: "11px" }}>
              {getSafeBranding("company", "CÔNG TY TNHH CÔNG NGHỆ MERCY")} • {getSafeBranding("hotlineNamed", "0763.068.614 (CSKH MERCY TECH)")} • {getSafeBranding("email", "contact@mercytechglobal.com")}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
