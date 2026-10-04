"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function HeroSection() {
  const t = useTranslations("hero");
  const tBranding = useTranslations("branding");

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
              <span style={{ fontSize: "14px" }}>🇻🇳</span>
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
              gap: "16px",
            }}
          >
            <Link
              id="hero-get-it-now"
              className="Button-module-scss-module__VLzsWq__button Button-module-scss-module__VLzsWq__variant-primary home-hero-btn"
              href="/download?from=default#docs-enterprise"
              style={{
                backgroundColor: "#ff6f3d",
                color: "#ffffff",
                minHeight: "54px",
                padding: "15px 32px",
                borderRadius: "9px",
                fontWeight: 600,
                fontSize: "16px",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(255, 111, 61, 0.3)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {t("btnGetItNow")}
            </Link>

            <Link
              id="hero-see-it-in-action"
              className="Button-module-scss-module__VLzsWq__button Button-module-scss-module__VLzsWq__variant-secondary home-hero-btn"
              href="/docspace-registration?from=default"
              style={{
                backgroundColor: "#444444",
                color: "#ffffff",
                minHeight: "54px",
                padding: "15px 32px",
                borderRadius: "9px",
                fontWeight: 600,
                fontSize: "16px",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#ffffff", fontWeight: 600 }}>{t("btnSeeInAction")}</span>
            </Link>
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
