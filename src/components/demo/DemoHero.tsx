"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { FileText, Download, ShieldAlert, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function DemoHero() {
  const t = useTranslations("demo.hero");

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      style={{
        padding: "56px 20px 36px",
        textAlign: "center",
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255, 111, 61, 0.12), transparent 70%), linear-gradient(180deg, #fffbf7 0%, #ffffff 100%)",
        borderBottom: "1px solid #f1f5f9",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Official Distributor Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "7px 20px",
            borderRadius: "9999px",
            backgroundColor: "#ffffff",
            border: "1.5px solid #fed7aa",
            marginBottom: "20px",
            boxShadow: "0 4px 14px rgba(234, 88, 12, 0.08)",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#16a34a",
              display: "inline-block",
              boxShadow: "0 0 0 2px rgba(22, 163, 74, 0.2)",
            }}
          />
          <span
            style={{
              fontSize: "12px",
              fontWeight: 800,
              color: "#ea580c",
              letterSpacing: "0.4px",
              textTransform: "uppercase",
            }}
          >
            {t("distributorBadge")}
          </span>
        </div>

        {/* Main Heading */}
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 800,
            lineHeight: 1.2,
            color: "#0f172a",
            margin: "0 0 18px",
            letterSpacing: "-0.025em",
          }}
        >
          {t("title")}
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
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(15px, 2vw, 17px)",
            lineHeight: 1.65,
            color: "#475569",
            maxWidth: "780px",
            margin: "0 auto 32px",
            fontWeight: 500,
          }}
        >
          {t("subtitle")}
        </p>

        {/* 3 Quick Jump Action Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "14px",
            maxWidth: "960px",
            margin: "0 auto 36px",
          }}
        >
          {/* Card 1: Cloud Suite Demo */}
          <button
            type="button"
            onClick={() => scrollTo("demo-online")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "16px 20px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              border: "1.5px solid #e2e8f0",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              textAlign: "left",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ff6f3d";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 24px rgba(255, 111, 61, 0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(15, 23, 42, 0.04)";
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "#fff7ed",
                border: "1px solid #fed7aa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <FileText size={22} color="#ea580c" />
            </div>
            <div>
              <div style={{ fontSize: "14.5px", fontWeight: 700, color: "#0f172a", marginBottom: "2px" }}>
                {t("card1Title")}
              </div>
              <div style={{ fontSize: "12.5px", color: "#64748b" }}>
                {t("card1Sub")}
              </div>
            </div>
          </button>

          {/* Card 2: PC 7-day Trial */}
          <button
            type="button"
            onClick={() => scrollTo("demo-pc")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "16px 20px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              border: "1.5px solid #e2e8f0",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              textAlign: "left",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ff6f3d";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 24px rgba(255, 111, 61, 0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(15, 23, 42, 0.04)";
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "#fff7ed",
                border: "1px solid #fed7aa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Download size={22} color="#ea580c" />
            </div>
            <div>
              <div style={{ fontSize: "14.5px", fontWeight: 700, color: "#0f172a", marginBottom: "2px" }}>
                {t("card2Title")}
              </div>
              <div style={{ fontSize: "12.5px", color: "#64748b" }}>
                {t("card2Sub")}
              </div>
            </div>
          </button>

          {/* Card 3: MercyCheck */}
          <button
            type="button"
            onClick={() => scrollTo("mercy-check")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "16px 20px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              border: "1.5px solid #e2e8f0",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              textAlign: "left",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#dc2626";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 24px rgba(220, 38, 38, 0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(15, 23, 42, 0.04)";
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <ShieldAlert size={22} color="#dc2626" />
            </div>
            <div>
              <div style={{ fontSize: "14.5px", fontWeight: 700, color: "#0f172a", marginBottom: "2px" }}>
                {t("card3Title")}
              </div>
              <div style={{ fontSize: "12.5px", color: "#64748b" }}>
                {t("card3Sub")}
              </div>
            </div>
          </button>
        </div>

        {/* Feature Guarantees Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "24px",
            padding: "14px 20px",
            borderRadius: "14px",
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            maxWidth: "960px",
            margin: "0 auto",
            fontSize: "13px",
            color: "#475569",
            fontWeight: 600,
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
            <CheckCircle2 size={16} color="#16a34a" />
            <span>{t("noAccount")}</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
            <CheckCircle2 size={16} color="#16a34a" />
            <span>{t("msCompat")}</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
            <ShieldCheck size={16} color="#ea580c" />
            <span>{t("security")}</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
            <Zap size={16} color="#ea580c" />
            <span>{t("speed")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
