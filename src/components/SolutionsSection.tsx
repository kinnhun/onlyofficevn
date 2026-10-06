"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ONLYOFFICE_MESSENGER_URL, openMessengerChat } from "@/lib/messenger";

const MESSENGER_URL = ONLYOFFICE_MESSENGER_URL || "https://www.messenger.com/t/286163107904324";

export default function SolutionsSection() {
  const t = useTranslations("solutionsSection");

  const topSolutions = [
    {
      title: t("items.docspace.title"),
      desc: t("items.docspace.desc"),
      linkText: t("items.docspace.btn"),
      img: "https://static-site.onlyoffice.com/public/images/templates/main/get-started/docspace.svg",
    },
    {
      title: t("items.platform.title"),
      desc: t("items.platform.desc"),
      linkText: t("items.platform.btn"),
      img: "https://static-site.onlyoffice.com/public/images/templates/main/get-started/connectors.svg",
    },
    {
      title: t("items.developers.title"),
      desc: t("items.developers.desc"),
      linkText: t("items.developers.btn"),
      img: "https://static-site.onlyoffice.com/public/images/templates/main/get-started/developers.svg",
    },
  ];

  const bottomSolutions = [
    {
      title: t("items.pc.title"),
      desc: t("items.pc.desc"),
      linkText: t("items.pc.btn"),
      img: "https://static-site.onlyoffice.com/public/images/templates/main/get-started/from-pc.svg",
    },
    {
      title: t("items.mobile.title"),
      desc: t("items.mobile.desc"),
      linkText: t("items.mobile.btn"),
      img: "https://static-site.onlyoffice.com/public/images/templates/main/get-started/from-mobile.svg",
    },
  ];

  return (
    <section
      style={{
        background:
          "linear-gradient(180deg, #f8f9f9 43.75%, rgba(248, 249, 249, 0) 100%), #ffffff",
        padding: "88px 0 80px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 24px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            fontSize: "36px",
            fontWeight: 700,
            lineHeight: 1.3,
            color: "#1e293b",
            textAlign: "center",
            marginBottom: "56px",
          }}
        >
          {t("title")}
        </h2>

        {/* Top 3 Cards Grid */}
        <div
          className="solutions-top-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
            marginBottom: "28px",
          }}
        >
          {topSolutions.map((item, i) => (
            <div
              key={i}
              onClick={openMessengerChat}
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                padding: "36px 28px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
                transition: "all 0.25s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(234, 88, 12, 0.08)";
                e.currentTarget.style.borderColor = "#fed7aa";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.03)";
                e.currentTarget.style.borderColor = "#e2e8f0";
              }}
            >
              <div>
                <div
                  style={{
                    height: "120px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ maxHeight: "100px", maxWidth: "100%", objectFit: "contain" }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#1e293b",
                    marginBottom: "12px",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#64748b",
                    lineHeight: 1.6,
                    marginBottom: "24px",
                  }}
                >
                  {item.desc}
                </p>
              </div>

              <a
                href={MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={openMessengerChat}
                style={{
                  color: "#ff6f3d",
                  fontWeight: 600,
                  fontSize: "14px",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                {item.linkText}
              </a>
            </div>
          ))}
        </div>

        {/* Bottom 2 Cards Grid */}
        <div
          className="solutions-bottom-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "28px",
            maxWidth: "880px",
            margin: "0 auto",
          }}
        >
          {bottomSolutions.map((item, i) => (
            <div
              key={i}
              onClick={openMessengerChat}
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                padding: "36px 28px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
                transition: "all 0.25s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(234, 88, 12, 0.08)";
                e.currentTarget.style.borderColor = "#fed7aa";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.03)";
                e.currentTarget.style.borderColor = "#e2e8f0";
              }}
            >
              <div>
                <div
                  style={{
                    height: "120px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ maxHeight: "100px", maxWidth: "100%", objectFit: "contain" }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#1e293b",
                    marginBottom: "12px",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#64748b",
                    lineHeight: 1.6,
                    marginBottom: "24px",
                  }}
                >
                  {item.desc}
                </p>
              </div>

              <a
                href={MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={openMessengerChat}
                style={{
                  color: "#ff6f3d",
                  fontWeight: 600,
                  fontSize: "14px",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                {item.linkText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
