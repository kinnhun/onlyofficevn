"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Building2, MapPin, Phone, Mail, ShieldCheck, ArrowRight, MessageCircle } from "lucide-react";

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
  const hotlineNamed = getSafe("hotlineNamed", "0763.068.614 (Mr. Hùng)");
  const email = getSafe("email", "ketoan.mercy@gmail.com");
  const address = getSafe(
    "address",
    "175/3 Đường Nguyễn Thị Be, Ấp 33, Xã Đông Thạnh, Thành phố Hồ Chí Minh, Việt Nam"
  );
  const mission = getSafe(
    "mission",
    "CÔNG TY TNHH CÔNG NGHỆ MERCY tiên phong cung cấp giải pháp văn phòng số OnlyOffice chuẩn hóa tại Việt Nam. Hợp thức hóa bản quyền và tối ưu 90% chi phí IT dài hạn."
  );

  return (
    <div
      style={{
        marginTop: "48px",
        marginBottom: "32px",
        padding: "24px 28px",
        borderRadius: "14px",
        backgroundColor: "#fffaf5",
        border: "1px solid #fed7aa",
        boxShadow: "0 4px 20px -2px rgba(234, 88, 12, 0.06)",
        boxSizing: "border-box",
      }}
    >
      {/* Top Tagline / Authority Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          paddingBottom: "16px",
          marginBottom: "20px",
          borderBottom: "1px solid #ffedd5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "20px" }}>🇻🇳</span>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#c2410c",
              backgroundColor: "#ffedd5",
              padding: "4px 10px",
              borderRadius: "6px",
            }}
          >
            {distributor} • {optimizedBy}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px", color: "#78350f" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontWeight: 700 }}>
            <ShieldCheck size={15} style={{ color: "#ea580c" }} />
            {mst}
          </span>
          <span style={{ color: "#fdba74" }}>•</span>
          <span style={{ fontWeight: 600 }}>Chính Hãng 100%</span>
        </div>
      </div>

      {/* Main Content Grid: Company Mission (Left) & Contact Details (Right) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* Left Column: Company & Mission */}
        <div>
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
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            border: "1px solid #fed7aa",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* Address */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <MapPin size={16} style={{ color: "#ea580c", marginTop: "2px", flexShrink: 0 }} />
            <div style={{ fontSize: "12.5px", lineHeight: 1.5, color: "#334155" }}>
              <strong style={{ color: "#0f172a" }}>Trụ sở: </strong>
              <span>{address}</span>
            </div>
          </div>

          {/* Hotline / Zalo */}
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
              <span style={{ color: "#64748b", marginLeft: "4px" }}>(Mr. Hùng)</span>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "4px",
              paddingTop: "12px",
              borderTop: "1px dashed #fed7aa",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/partners"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                fontWeight: 700,
                color: "#ea580c",
                padding: "8px 14px",
                borderRadius: "6px",
                backgroundColor: "#fff7ed",
                border: "1px solid #fdba74",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <span>Hợp Tác Phân Phối</span>
              <ArrowRight size={13} />
            </Link>

            <a
              href="https://zalo.me/0763068614"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                fontWeight: 700,
                color: "#ffffff",
                padding: "8px 14px",
                borderRadius: "6px",
                backgroundColor: "#ea580c",
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(234, 88, 12, 0.25)",
              }}
            >
              <MessageCircle size={14} />
              <span>Tư Vấn Zalo: 0763.068.614</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
