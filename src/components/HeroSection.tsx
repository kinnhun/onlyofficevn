"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { ShieldCheck, MessageCircle } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

export default function HeroSection() {
  const t = useTranslations("hero");
  const tBranding = useTranslations("branding");
  const locale = useLocale();
  const isVi = locale === "vi";
  const contactText = isVi ? "Liên hệ ngay để trải nghiệm" : "Contact Now for Live Demo";

  return (
    <section
      className="Section-module-scss-module__LwzKGG__section"
      style={{
        padding: "72px 0 0",
        background: "transparent",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        className="Container-module-scss-module__69tsbq__container"
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
          padding: "0 24px",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <div
          className="Hero-module-scss-module__PeeyJW__hero-wrapper"
          style={{ marginBottom: "56px" }}
        >
          {/* Official Distributor & Optimization Badge */}
          <div className="home-hero-badge">
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <ShieldCheck size={14} color="#ea580c" style={{ flexShrink: 0 }} />
              <span
                style={{
                  fontSize: "12.5px",
                  fontWeight: 700,
                  color: "#ea580c",
                  letterSpacing: "0.2px",
                  textTransform: "uppercase",
                }}
              >
                {tBranding("distributor")}
              </span>
            </div>
            <span className="home-hero-badge-divider" style={{ color: "#cbd5e1", fontSize: "14px" }}>•</span>
            <span
              style={{
                fontSize: "12.5px",
                fontWeight: 600,
                color: "#475569",
              }}
            >
              {tBranding("optimizedBy")}
            </span>
          </div>

          <h1
            className="Heading-module-scss-module__-NGNla__heading Heading-module-scss-module__-NGNla__size-2 Heading-module-scss-module__-NGNla__text-align-center"
            style={{
              fontSize: "clamp(30px, 5.2vw, 48px)",
              fontWeight: 700,
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              color: "#333333",
              margin: "0 0 16px",
            }}
          >
            {t("titlePrefix")} <br />
            <span style={{ color: "#ff6f3d" }}>{t("titleBrand")}</span>
          </h1>

          <p
            className="Text-module-scss-module__bfsDDa__text Text-module-scss-module__bfsDDa__font-weight-700 Text-module-scss-module__bfsDDa__text-align-center"
            style={{
              fontSize: "clamp(15px, 2.2vw, 18px)",
              fontWeight: 600,
              lineHeight: 1.6,
              color: "#475569",
              maxWidth: "760px",
              margin: "0 auto 32px",
            }}
          >
            {t("subtitle")}
          </p>

          <div
            className="Hero-module-scss-module__PeeyJW__hero-btns home-hero-btns"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <a
              id="hero-contact-demo"
              className="Button-module-scss-module__VLzsWq__button Button-module-scss-module__VLzsWq__variant-primary home-hero-btn"
              href="https://www.messenger.com/t/286163107904324"
              target="_blank"
              rel="noopener noreferrer"
              onClick={openMessengerChat}
              style={{
                background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                color: "#ffffff",
                minHeight: "54px",
                padding: "16px 36px",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "16.5px",
                textDecoration: "none",
                boxShadow: "0 6px 20px rgba(255, 111, 61, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                cursor: "pointer",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <MessageCircle size={19} />
              <span>{contactText}</span>
            </a>
          </div>
        </div>

        <div className="Hero-module-scss-module__PeeyJW__hero-image-wrapper" style={{ margin: "0 auto", maxWidth: "1280px" }}>
          <div
            className="Hero-module-scss-module__PeeyJW__hero-image"
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "48.44%",
              backgroundImage:
                "url(https://static-site.onlyoffice.com/public/images/templates/main/hero/hero.png?ver=7)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center top",
            }}
          />
        </div>
      </div>
    </section>
  );
}
