"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Building2, MapPin, Phone, Mail, ShieldCheck, ArrowRight, MessageCircle } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";
import { FlagVi } from "@/components/HeaderFlags";

export default function FooterCompanyInfo() {
  const tBranding = useTranslations("branding");

  // Helper with fallback to guarantee no crash if i18n cache is stale
  const getSafe = (key: string, fallback: string) => {
    try {
      return tBranding.has(key) ? tBranding(key) : fallback;
    } catch {
      return fallback;
    }
  };

  const distributor = getSafe("distributor", "Đơn vị phân phối tại Việt Nam");
  const optimizedBy = getSafe("optimizedBy", "Tối ưu bởi Mercy Tech");
  const company = getSafe("company", "CÔNG TY TNHH CÔNG NGHỆ MERCY");
  const mst = getSafe("mst", "MST: 0319227767");
  const hotlineNamed = getSafe("hotlineNamed", "0763.068.614 (CSKH MERCY TECH)");
  const email = getSafe("email", "contact@mercytechglobal.com");
  const address = getSafe(
    "address",
    "175/3 Đường Nguyễn Thị Be, Ấp 33, Xã Đông Thạnh, Thành phố Hồ Chí Minh, Việt Nam"
  );
  const mission = getSafe(
    "mission",
    "CÔNG TY TNHH CÔNG NGHỆ MERCY tiên phong cung cấp giải pháp văn phòng số OnlyOffice chuẩn hóa tại Việt Nam. Hợp thức hóa bản quyền và tối ưu 90% chi phí IT dài hạn."
  );

  return (
    <div className="oo-footer-company-card">
      {/* Top Tagline / Authority Bar */}
      <div className="oo-footer-company-top">
        <div className="oo-footer-company-badge">
          <FlagVi width={20} height={14} />
          <span className="oo-footer-company-badge-text">
            {distributor} • {optimizedBy}
          </span>
        </div>

        <div className="oo-footer-company-verify">
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontWeight: 700 }}>
            <ShieldCheck size={15} style={{ color: "#ea580c" }} />
            {mst}
          </span>
          <span style={{ color: "#fdba74" }}>•</span>
          <span style={{ fontWeight: 600 }}>Chính Hãng 100%</span>
        </div>
      </div>

      {/* Main Content Grid: Company Mission (Left) & Contact Details (Right) */}
      <div className="oo-footer-company-grid">
        {/* Left Column: Company & Mission */}
        <div className="oo-footer-company-left">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <Building2 size={20} style={{ color: "#ea580c", flexShrink: 0 }} />
            <h3
              style={{
                margin: 0,
                fontSize: "16px",
                fontWeight: 800,
                color: "#1e293b",
                letterSpacing: "-0.01em",
              }}
            >
              {company}
            </h3>
          </div>

          <p
            style={{
              margin: "0 0 16px",
              fontSize: "13.5px",
              lineHeight: 1.65,
              color: "#475569",
            }}
          >
            {mission}
          </p>

          {/* Key Value Points */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12.5px", color: "#334155" }}>
              <span style={{ color: "#ea580c", fontWeight: 700 }}>✓</span>
              <span>Hợp thức hóa bản quyền văn phòng số và hỗ trợ kiểm toán IT</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12.5px", color: "#334155" }}>
              <span style={{ color: "#ea580c", fontWeight: 700 }}>✓</span>
              <span>Triển khai On-Premises & Private Cloud chuẩn hóa bảo mật</span>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Contact Card */}
        <div className="oo-footer-company-right">
          {/* Address */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <MapPin size={16} style={{ color: "#ea580c", marginTop: "2px", flexShrink: 0 }} />
            <div style={{ fontSize: "12.5px", lineHeight: 1.5, color: "#334155" }}>
              <strong style={{ color: "#0f172a" }}>Trụ sở: </strong>
              <span>{address}</span>
            </div>
          </div>

          {/* Hotline */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Phone size={16} style={{ color: "#ea580c", flexShrink: 0 }} />
            <div style={{ fontSize: "12.5px", color: "#334155" }}>
              <strong style={{ color: "#0f172a" }}>Hotline: </strong>
              <a
                href="tel:0763068614"
                style={{
                  color: "#ea580c",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                0763.068.614
              </a>
              <span style={{ color: "#64748b", marginLeft: "4px" }}>(CSKH MERCY TECH)</span>
            </div>
          </div>

          {/* Email */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Mail size={16} style={{ color: "#ea580c", flexShrink: 0 }} />
            <div style={{ fontSize: "12.5px", color: "#334155" }}>
              <strong style={{ color: "#0f172a" }}>Email: </strong>
              <a
                href={`mailto:${email}`}
                style={{
                  color: "#0369a1",
                  fontWeight: 600,
                  textDecoration: "underline",
                }}
              >
                {email}
              </a>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="oo-footer-company-actions">
            <Link
              href="/partners"
              className="oo-footer-btn-partner"
            >
              <span>Hợp tác phân phối</span>
              <ArrowRight size={13} style={{ flexShrink: 0 }} />
            </Link>

            <a
              href="https://www.messenger.com/t/286163107904324"
              target="_blank"
              rel="noopener noreferrer"
              onClick={openMessengerChat}
              className="oo-footer-btn-contact"
            >
              <MessageCircle size={14} style={{ flexShrink: 0 }} />
              <span>Liên hệ</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
