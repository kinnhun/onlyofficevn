"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { ShieldCheck, FileText, CheckCircle2, PhoneCall, MessageCircle } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

interface PricingHeroBannerProps {
  onOpenQuote: () => void;
}

export default function PricingHeroBanner({ onOpenQuote }: PricingHeroBannerProps) {
  const tPricing = useTranslations("pricingPage");
  const tBranding = useTranslations("branding");
  const locale = useLocale();
  const isVi = locale === "vi";

  return (
    <section className="pricing-hero-section">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Official Distributor Badge */}
        <div className="pricing-hero-badge">
          <span style={{ fontSize: "14px" }}>🇻🇳</span>
          <span className="pricing-hero-badge-title">
            {tBranding("distributor").toUpperCase()}
          </span>
          <span className="pricing-hero-badge-dot">•</span>
          <span className="pricing-hero-badge-company">
            {tBranding("company")}
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="pricing-hero-title">
          {tPricing("title")}{" "}
          <span style={{ color: "#ff6f3d" }}>ONLYOFFICE</span>
        </h1>

        {/* Subtitle */}
        <p className="pricing-hero-subtitle">
          {tPricing("subtitle")}
        </p>

        {/* Dual CTA Buttons */}
        <div className="pricing-hero-ctas">
          {/* Button 1: Open Quote Form Modal */}
          <button
            type="button"
            onClick={onOpenQuote}
            className="pricing-hero-btn pricing-hero-btn-primary"
            title={isVi ? "Nhập form nhận báo giá ưu đãi chính hãng" : "Submit form for official discounted quote"}
          >
            <PhoneCall size={18} style={{ flexShrink: 0 }} />
            <span>{isVi ? "Liên Hệ Nhận Báo Giá Ưu Đãi" : "Request Custom Quote"}</span>
          </button>

          {/* Button 2: Direct Messenger Contact */}
          <a
            href="https://www.messenger.com/t/286163107904324"
            target="_blank"
            rel="noopener noreferrer"
            onClick={openMessengerChat}
            className="pricing-hero-btn pricing-hero-btn-secondary"
            title={isVi ? "Liên hệ tư vấn Messenger" : "Chat on Messenger"}
          >
            <MessageCircle size={19} color="#ffffff" style={{ flexShrink: 0 }} />
            <span>{isVi ? "Liên hệ tư vấn" : "Live Messenger Support"}</span>
          </a>
        </div>

        {/* 3 Core Trust Badges */}
        <div className="pricing-hero-trust-container">
          <div className="pricing-hero-trust-item">
            <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0 }} />
            <span>{isVi ? "Xuất Hóa Đơn VAT Điện Tử" : "Official Electronic VAT Invoices"}</span>
          </div>
          <div className="pricing-hero-trust-item">
            <FileText size={16} color="#ff6f3d" style={{ flexShrink: 0 }} />
            <span>{isVi ? "Hợp Đồng & Biên Bản Mộc Đỏ" : "Legal Contracts with Red Stamp"}</span>
          </div>
          <div className="pricing-hero-trust-item">
            <ShieldCheck size={16} color="#ff6f3d" style={{ flexShrink: 0 }} />
            <span>{isVi ? "Bản Quyền Vĩnh Viễn Theo Main" : "Perpetual License per Motherboard"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
