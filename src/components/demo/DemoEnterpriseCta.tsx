"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ShieldCheck, Server, Headphones, FileText, ArrowRight, DollarSign, MessageCircle, Phone, Sparkles } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

interface DemoEnterpriseCtaProps {
  onOpenQuote: () => void;
}

export default function DemoEnterpriseCta({ onOpenQuote }: DemoEnterpriseCtaProps) {
  const t = useTranslations("demo.enterpriseCta");

  return (
    <section className="demo-ent-section">
      <style>{`
        .demo-ent-section {
          padding: 40px 20px 80px;
          background-color: #ffffff;
        }
        .demo-ent-card {
          max-width: 1280px;
          margin: 0 auto;
          background: linear-gradient(135deg, #ffffff 0%, #fffbf7 50%, #fff7ed 100%);
          border-radius: 28px;
          border: 2px solid #fed7aa;
          padding: 54px 40px;
          color: #0f172a;
          box-shadow: 0 16px 45px rgba(234, 88, 12, 0.08);
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }
        .demo-ent-pillars {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 42px;
          text-align: left;
        }
        .demo-ent-actions {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .demo-ent-section {
            padding: 30px 12px 48px !important;
          }
          .demo-ent-card {
            padding: 24px 14px !important;
            border-radius: 20px !important;
          }
          .demo-ent-pillars {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
            margin-bottom: 28px !important;
          }
          .demo-ent-actions {
            flex-direction: column !important;
            width: 100% !important;
            gap: 10px !important;
          }
          .demo-ent-actions > * {
            width: 100% !important;
            justify-content: center !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
      <div className="demo-ent-card">
        {/* Subtle orange ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 111, 61, 0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "880px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 18px",
              borderRadius: "9999px",
              backgroundColor: "#ffffff",
              border: "1.5px solid #fed7aa",
              fontSize: "12px",
              fontWeight: 800,
              color: "#ea580c",
              marginBottom: "18px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              boxShadow: "0 2px 8px rgba(234, 88, 12, 0.08)",
            }}
          >
            <Sparkles size={14} color="#ea580c" />
            <span>{t("badge")}</span>
          </div>

          {/* Heading */}
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 38px)",
              fontWeight: 800,
              lineHeight: 1.25,
              color: "#0f172a",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            {t("titlePrefix")}
            <span
              style={{
                background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              {t("titleHighlight")}
            </span>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 16.5px)",
              lineHeight: 1.65,
              color: "#475569",
              marginBottom: "40px",
              fontWeight: 500,
            }}
          >
            {t("subtitle")}
          </p>

          {/* 4 Value Pillars Grid */}
          <div className="demo-ent-pillars">
            {/* Pillar 1 */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1.5px solid #fed7aa",
                borderRadius: "18px",
                padding: "24px 20px",
                boxShadow: "0 4px 14px rgba(234, 88, 12, 0.05)",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "#fff7ed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <ShieldCheck size={24} color="#ea580c" />
              </div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", marginBottom: "6px" }}>
                {t("pillars.p1Title")}
              </div>
              <div style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.55 }}>
                {t("pillars.p1Desc")}
              </div>
            </div>

            {/* Pillar 2 */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1.5px solid #e2e8f0",
                borderRadius: "18px",
                padding: "24px 20px",
                boxShadow: "0 4px 14px rgba(15, 23, 42, 0.03)",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "#eff6ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <Server size={24} color="#2563eb" />
              </div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", marginBottom: "6px" }}>
                {t("pillars.p2Title")}
              </div>
              <div style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.55 }}>
                {t("pillars.p2Desc")}
              </div>
            </div>

            {/* Pillar 3 */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1.5px solid #e2e8f0",
                borderRadius: "18px",
                padding: "24px 20px",
                boxShadow: "0 4px 14px rgba(15, 23, 42, 0.03)",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "#f0fdf4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <DollarSign size={24} color="#16a34a" />
              </div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", marginBottom: "6px" }}>
                {t("pillars.p3Title")}
              </div>
              <div style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.55 }}>
                {t("pillars.p3Desc")}
              </div>
            </div>

            {/* Pillar 4 */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1.5px solid #e2e8f0",
                borderRadius: "18px",
                padding: "24px 20px",
                boxShadow: "0 4px 14px rgba(15, 23, 42, 0.03)",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "#fdf2f8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <Headphones size={24} color="#db2777" />
              </div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", marginBottom: "6px" }}>
                {t("pillars.p4Title")}
              </div>
              <div style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.55 }}>
                {t("pillars.p4Desc")}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="demo-ent-actions">
            {/* Quote Modal Trigger Button */}
            <button
              type="button"
              onClick={onOpenQuote}
              style={{
                background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                color: "#ffffff",
                border: "none",
                borderRadius: "14px",
                padding: "16px 34px",
                fontSize: "15px",
                fontWeight: 800,
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(234, 88, 12, 0.35)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 28px rgba(234, 88, 12, 0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(234, 88, 12, 0.35)";
              }}
            >
              <FileText size={18} />
              <span>{t("quoteBtn")}</span>
              <ArrowRight size={17} />
            </button>

            {/* Messenger Chat Button */}
            <a
              href="https://www.messenger.com/t/286163107904324"
              target="_blank"
              rel="noopener noreferrer"
              onClick={openMessengerChat}
              style={{
                backgroundColor: "#ffffff",
                color: "#ea580c",
                border: "1.5px solid #fed7aa",
                borderRadius: "14px",
                padding: "15px 26px",
                fontSize: "14.5px",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                cursor: "pointer",
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(234, 88, 12, 0.08)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#fff7ed";
                e.currentTarget.style.borderColor = "#ff6f3d";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.borderColor = "#fed7aa";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <MessageCircle size={18} color="#ea580c" />
              <span>{t("chatBtn")}</span>
            </a>

            {/* Direct Hotline */}
            <a
              href="tel:0763068614"
              style={{
                color: "#ea580c",
                fontSize: "14px",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "10px 16px",
              }}
            >
              <Phone size={15} color="#ea580c" />
              <span>{t("hotline")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
