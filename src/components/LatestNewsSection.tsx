"use client";

import React from "react";
import Link from "next/link";

export default function LatestNewsSection() {
  const releases = [
    {
      title: "ONLYOFFICE Docs 9.4 released: license update, Dark Document for sheets, horizontal lines, new slide themes & transitions, and more",
      img: "https://static-site.onlyoffice.com/public/images/templates/main/latest-news/docs-9-4.jpg",
      date: "19 May 2026",
      href: "https://www.onlyoffice.com/blog/2026/05/onlyoffice-docs-9-4",
    },
    {
      title: "ONLYOFFICE DocSpace 3.7 released: file generation & new providers in AI agents, smarter forms, updated editors and license, and more",
      img: "https://static-site.onlyoffice.com/public/images/templates/main/latest-news/menu-blog-2-docspace-3-7.png",
      date: "8 June 2026",
      href: "https://www.onlyoffice.com/blog/2026/06/onlyoffice-docspace-3-7",
    },
  ];

  const webinars = [
    {
      title: "Meet ONLYOFFICE Docs 9.3: What's new?",
      img: "https://static-site.onlyoffice.com/public/images/templates/main/latest-news/docs_9-3.png",
      duration: "18:03",
      type: "Webinar",
      date: "24 February 2026",
      href: "https://www.youtube.com/user/onlyofficeTV",
    },
    {
      title: "How to work with office files in Odoo using ONLYOFFICE",
      img: "https://static-site.onlyoffice.com/public/images/templates/main/latest-news/odoo_webinar.png",
      duration: "10:31",
      type: "Webinar",
      date: "6 November 2025",
      href: "https://www.youtube.com/user/onlyofficeTV",
    },
  ];

  const events = [
    {
      title: "Odoo Experience 2026",
      img: "https://static-site.onlyoffice.com/public/images/templates/main/latest-news/odoo_experience_2026.png",
      date: "September 24–26, 2026",
      location: "Brussels, Belgium",
      href: "https://www.onlyoffice.com/events",
    },
    {
      title: "DSC Europe 26",
      img: "https://static-site.onlyoffice.com/public/images/templates/main/latest-news/dsc_europe_26.png",
      date: "November 23–27, 2026",
      location: "Belgrade, Serbia",
      href: "https://www.onlyoffice.com/events",
    },
  ];

  return (
    <section
      style={{
        backgroundColor: "#f5f5f5",
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
            marginBottom: "48px",
          }}
        >
          Stay up-to-date with the latest from ONLYOFFICE
        </h2>

        <div
          className="news-columns-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {/* Column 1: Releases */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "6px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#666666",
                  marginBottom: "20px",
                }}
              >
                Releases
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {releases.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "140px",
                        borderRadius: "4px",
                        overflow: "hidden",
                        backgroundColor: "#000",
                        marginBottom: "12px",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <h3
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        lineHeight: 1.45,
                        color: "#333333",
                        margin: "0 0 6px",
                      }}
                    >
                      {item.title}
                    </h3>
                    <div style={{ fontSize: "12px", color: "#888888", display: "flex", alignItems: "center", gap: "4px" }}>
                      <span>🕒</span>
                      <span>{item.date}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "24px" }}>
              <a
                href="https://www.onlyoffice.com/blog"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ff6f3d", fontSize: "13px", fontWeight: 600, textDecoration: "underline" }}
              >
                More news here
              </a>
            </div>
          </div>

          {/* Column 2: Webinars */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "6px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#666666",
                  marginBottom: "20px",
                }}
              >
                Webinars
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {webinars.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "140px",
                        borderRadius: "4px",
                        overflow: "hidden",
                        backgroundColor: "#1e293b",
                        position: "relative",
                        marginBottom: "12px",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <span
                        style={{
                          position: "absolute",
                          bottom: "8px",
                          right: "8px",
                          backgroundColor: "#000000",
                          color: "#ffffff",
                          padding: "2px 5px",
                          borderRadius: "2px",
                          fontSize: "11px",
                          fontWeight: 600,
                        }}
                      >
                        {item.duration}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        lineHeight: 1.45,
                        color: "#333333",
                        margin: "0 0 6px",
                      }}
                    >
                      {item.title}
                    </h3>
                    <div style={{ fontSize: "12px", color: "#888888", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span>📹 {item.type}</span>
                      <span>🕒 {item.date}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "24px" }}>
              <a
                href="https://www.youtube.com/user/onlyofficeTV"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ff6f3d", fontSize: "13px", fontWeight: 600, textDecoration: "underline" }}
              >
                More videos here
              </a>
            </div>
          </div>

          {/* Column 3: Events */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "6px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#666666",
                  marginBottom: "20px",
                }}
              >
                Events
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {events.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <h3
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        lineHeight: 1.45,
                        color: "#333333",
                        margin: "0 0 4px",
                      }}
                    >
                      {item.title}
                    </h3>
                    <div style={{ fontSize: "12px", color: "#888888", display: "flex", flexDirection: "column", gap: "2px", marginBottom: "10px" }}>
                      <span>🕒 {item.date}</span>
                      <span>📍 {item.location}</span>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "120px",
                        borderRadius: "4px",
                        overflow: "hidden",
                        backgroundColor: "#1e293b",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "24px" }}>
              <Link
                href="/events"
                style={{ color: "#ff6f3d", fontSize: "13px", fontWeight: 600, textDecoration: "underline" }}
              >
                More events here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

