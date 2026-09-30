"use client";

import React from "react";

export default function RatingsSection() {
  const awards = [
    {
      title: "Slashdot Leader Fall 2025",
      img: "https://static-site.onlyoffice.com/public/images/templates/main/rating/awards/slashdot-2025.svg?ver=3",
      href: "https://slashdot.org/software/p/ONLYOFFICE/",
    },
    {
      title: "Top 20 Document Management Software",
      img: "https://static-site.onlyoffice.com/public/images/templates/main/rating/awards/capterra-2024.svg",
      href: "https://www.capterra.com/document-management-software/#top-20",
    },
    {
      title: "Top Team Collaboration Software Q3-2025",
      img: "https://static-site.onlyoffice.com/public/images/templates/main/rating/awards/top-team-collaboration-software-q3-2025.svg",
      href: "https://tekpon.com/software/onlyoffice-docs/reviews/",
    },
    {
      title: "GOLD in Cloud Content Management",
      img: "https://static-site.onlyoffice.com/public/images/templates/main/rating/awards/cloudaward-2025.jpg",
      href: "https://www.cloudcomputing-insider.de/gewinner-it-awards-2025-insider-portale-a-ac4cc897108a613cb8661469b11c889f/",
    },
    {
      title: "Top rated office suites",
      img: "https://static-site.onlyoffice.com/public/images/templates/main/rating/awards/office-suites-2023.svg",
      href: "https://omr.com/de/reviews/product/onlyoffice",
    },
    {
      title: "SourceForge Leader Winter 2026",
      img: "https://static-site.onlyoffice.com/public/images/templates/main/rating/awards/leader-sourceforge-winter-2026.svg",
      href: "https://sourceforge.net/software/product/ONLYOFFICE/",
    },
  ];

  const ratings = [
    {
      name: "SourceForge",
      logo: "https://static-site.onlyoffice.com/public/images/templates/main/rating/stars-rating/sourceforge.svg",
      score: "4.7 / 5",
      href: "https://sourceforge.net/software/product/ONLYOFFICE/",
    },
    {
      name: "GetApp",
      logo: "https://static-site.onlyoffice.com/public/images/templates/main/rating/stars-rating/getapp.svg",
      score: "4.5 / 5",
      href: "https://www.getapp.com/collaboration-software/a/onlyoffice-docs/",
    },
    {
      name: "Softpedia",
      logo: "https://static-site.onlyoffice.com/public/images/templates/main/rating/stars-rating/softpedia.svg",
      score: "4.6 / 5",
      href: "https://linux.softpedia.com/get/Office/Office-Suites/ONLYOFFICE-Desktop-Editors-103956.shtml",
    },
    {
      name: "Capterra",
      logo: "https://static-site.onlyoffice.com/public/images/templates/main/rating/stars-rating/capterra.svg",
      score: "4.5 / 5",
      href: "https://www.capterra.com/p/229672/ONLYOFFICE-Docs/",
    },
    {
      name: "Crozdesk",
      logo: "https://static-site.onlyoffice.com/public/images/templates/main/rating/stars-rating/crozdesk.svg",
      score: "89 / 100",
      href: "https://crozdesk.com/software/onlyoffice-docs",
    },
    {
      name: "Tekpon",
      logo: "https://static-site.onlyoffice.com/public/images/templates/main/rating/stars-rating/tekpon.svg",
      score: "4.5 / 5",
      href: "https://tekpon.com/software/onlyoffice-docspace/reviews/#reviews",
    },
  ];

  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        padding: "80px 0 90px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            fontWeight: 700,
            lineHeight: 1.3,
            color: "#333333",
            textAlign: "center",
            marginBottom: "56px",
          }}
        >
          Highly rated by both critics and users
        </h2>

        <div
          className="ratings-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
        >
          {/* Awards Medals Grid (3 cols, clean transparent presentation) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "36px 24px",
            }}
          >
            {awards.map((a, i) => (
              <a
                key={i}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  textAlign: "center",
                  textDecoration: "none",
                  transition: "opacity 0.2s ease",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.img}
                  alt={a.title}
                  style={{
                    height: "64px",
                    width: "auto",
                    objectFit: "contain",
                    marginBottom: "12px",
                  }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    lineHeight: 1.35,
                    color: "#333333",
                    textDecoration: "underline",
                  }}
                >
                  {a.title}
                </span>
              </a>
            ))}
          </div>

          {/* Rating Meters with coral stars and clean dividers */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {ratings.map((r, i) => (
              <a
                key={i}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 0",
                  borderBottom: "1px solid #eaeaea",
                  textDecoration: "none",
                  transition: "opacity 0.2s ease",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.logo}
                  alt={r.name}
                  style={{ height: "22px", width: "auto", objectFit: "contain" }}
                />

                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ display: "flex", gap: "3px", color: "#ff6f3d", fontSize: "15px" }}>
                    {Array.from({ length: 5 }).map((_, starIdx) => (
                      <svg key={starIdx} width="16" height="16" viewBox="0 0 24 24" fill="#ff6f3d" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    ))}
                  </div>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#333333",
                      minWidth: "54px",
                      textAlign: "right",
                    }}
                  >
                    {r.score}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

