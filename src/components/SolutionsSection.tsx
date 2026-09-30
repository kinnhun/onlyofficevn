"use client";

import React from "react";
import Link from "next/link";

export default function SolutionsSection() {
  const topSolutions = [
    {
      title: "In ONLYOFFICE DocSpace",
      desc: "Create rooms within your secure DocSpace, invite people, view, edit, and collaborate on all kinds of documents from any desktop or mobile device.",
      linkText: "Start with your free account",
      linkHref: "/docspace-registration",
      img: "https://static-site.onlyoffice.com/public/images/templates/main/get-started/docspace.svg",
    },
    {
      title: "In the platform you use",
      desc: "Connect Docs to edit documents directly from your app. 40+ ready integrations: Box, Moodle, Nextcloud, Odoo, Wordpress, etc.",
      linkText: "Get Docs now",
      linkHref: "/download#docs-enterprise",
      img: "https://static-site.onlyoffice.com/public/images/templates/main/get-started/connectors.svg",
    },
    {
      title: "In the platform you build",
      desc: "Integrate Docs into your service to provide powerful document-editing and building capabilities to your customers under your brand.",
      linkText: "Learn more",
      linkHref: "/developer-edition",
      img: "https://static-site.onlyoffice.com/public/images/templates/main/get-started/developers.svg",
    },
  ];

  const bottomSolutions = [
    {
      title: "From your PC",
      desc: "Edit docs offline with free office apps for Windows, Linux, and macOS",
      linkText: "Download now",
      linkHref: "/download-desktop",
      img: "https://static-site.onlyoffice.com/public/images/templates/main/get-started/from-pc.svg",
    },
    {
      title: "From your mobile devices",
      desc: "Work on documents on the go with free apps for iOS and Android devices",
      linkText: "Install now",
      linkHref: "/download-desktop#mobile",
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
          Get started and choose where to work
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
              }}
            >
              <div>
                <div style={{ height: "120px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ maxHeight: "100px", maxWidth: "100%", objectFit: "contain" }}
                  />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#1e293b", marginBottom: "12px" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.6, marginBottom: "24px" }}>
                  {item.desc}
                </p>
              </div>

              <Link
                href={item.linkHref}
                style={{
                  color: "#ff6f3d",
                  fontWeight: 600,
                  fontSize: "14px",
                  textDecoration: "underline",
                }}
              >
                {item.linkText}
              </Link>
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
              }}
            >
              <div>
                <div style={{ height: "120px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ maxHeight: "100px", maxWidth: "100%", objectFit: "contain" }}
                  />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#1e293b", marginBottom: "12px" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.6, marginBottom: "24px" }}>
                  {item.desc}
                </p>
              </div>

              <Link
                href={item.linkHref}
                style={{
                  color: "#ff6f3d",
                  fontWeight: 600,
                  fontSize: "14px",
                  textDecoration: "underline",
                }}
              >
                {item.linkText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
