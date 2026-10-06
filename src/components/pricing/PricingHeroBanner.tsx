"use client";

import React from "react";
import { ShieldCheck, FileText, CheckCircle2, PhoneCall, MessageCircle } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

interface PricingHeroBannerProps {
  onOpenQuote: () => void;
}

export default function PricingHeroBanner({ onOpenQuote }: PricingHeroBannerProps) {
  return (
    <section className="pricing-hero-section">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Official Distributor Badge */}
        <div className="pricing-hero-badge">
          <span style={{ fontSize: "14px" }}>🇻🇳</span>
          <span className="pricing-hero-badge-title">
            ĐƠN VỊ PHÂN PHỐI CHÍNH THỨC TẠI VIỆT NAM
          </span>
          <span className="pricing-hero-badge-dot">•</span>
          <span className="pricing-hero-badge-company">
            CÔNG TY TNHH CÔNG NGHỆ MERCY
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="pricing-hero-title">
          Bảng Giá & Chính Sách Bản Quyền{" "}
          <span style={{ color: "#ff6f3d" }}>ONLYOFFICE</span>
        </h1>

        {/* Subtitle */}
        <p className="pricing-hero-subtitle">
          Chính sách giá ưu đãi bảo mật theo quy mô thiết bị và đối tác. Cấp phép vĩnh viễn theo Mainboard máy tính, đầy đủ hóa đơn điện tử VAT, hợp đồng kinh tế và chứng nhận nguồn gốc mộc đỏ của Công ty TNHH Công Nghệ Mercy.
        </p>

        {/* Dual CTA Buttons */}
        <div className="pricing-hero-ctas">
          {/* Button 1: Open Quote Form Modal */}
          <button
            type="button"
            onClick={onOpenQuote}
            className="pricing-hero-btn pricing-hero-btn-primary"
            title="Nhập form nhận báo giá ưu đãi chính hãng"
          >
            <PhoneCall size={18} style={{ flexShrink: 0 }} />
            <span>Liên Hệ Nhận Báo Giá Ưu Đãi</span>
          </button>

          {/* Button 2: Direct Messenger Contact */}
          <a
            href="https://www.messenger.com/t/286163107904324"
            target="_blank"
            rel="noopener noreferrer"
            onClick={openMessengerChat}
            className="pricing-hero-btn pricing-hero-btn-secondary"
            title="Liên hệ tư vấn Messenger"
          >
            <MessageCircle size={19} color="#ffffff" style={{ flexShrink: 0 }} />
            <span>Liên hệ tư vấn</span>
          </a>
        </div>

        {/* 3 Core Trust Badges */}
        <div className="pricing-hero-trust-container">
          <div className="pricing-hero-trust-item">
            <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0 }} />
            <span>Xuất Hóa Đơn VAT Điện Tử</span>
          </div>
          <div className="pricing-hero-trust-item">
            <FileText size={16} color="#ff6f3d" style={{ flexShrink: 0 }} />
            <span>Hợp Đồng & Biên Bản Mộc Đỏ</span>
          </div>
          <div className="pricing-hero-trust-item">
            <ShieldCheck size={16} color="#ff6f3d" style={{ flexShrink: 0 }} />
            <span>Bản Quyền Vĩnh Viễn Theo Main</span>
          </div>
        </div>
      </div>
    </section>
  );
}
