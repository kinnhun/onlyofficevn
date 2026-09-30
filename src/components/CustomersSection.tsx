"use client";

import React from "react";
import Link from "next/link";

export default function CustomersSection() {
  const logos = [
    { name: "Unesko", src: "https://static-site.onlyoffice.com/public/images/templates/main/customers/logo/unesko.svg", height: 42 },
    { name: "Fujitsu", src: "https://static-site.onlyoffice.com/public/images/templates/main/customers/logo/fujitsu.svg", height: 36 },
    { name: "Croix-Rouge", src: "https://static-site.onlyoffice.com/public/images/templates/main/customers/logo/croix-rouge.svg", height: 42 },
    { name: "Oracle", src: "https://static-site.onlyoffice.com/public/images/templates/main/customers/logo/oracle.svg", height: 18 },
    { name: "Suzuki", src: "https://static-site.onlyoffice.com/public/images/templates/main/customers/logo/suzuki.svg", height: 38 },
    { name: "Egress", src: "https://static-site.onlyoffice.com/public/images/templates/main/customers/logo/egress.svg", height: 26 },
    { name: "Aarnet", src: "https://static-site.onlyoffice.com/public/images/templates/main/customers/logo/aarnet.svg", height: 32 },
  ];

  const stories = [
    {
      title: "How Kinderhaus Berlin shares and collaborates on sensitive files with ONLYOFFICE DocSpace",
      image: "https://static-site.onlyoffice.com/public/images/templates/main/customers/success-stories/kinderhaus.jpg",
      href: "https://www.onlyoffice.com/blog/2023/11/how-kinderhaus-berlin-is-using-onlyoffice-docspace",
    },
    {
      title: "Why the Guará Linux team chooses ONLYOFFICE Desktop Editors as the default office suite for 22.000 employees of the Military Police of Minas Gerais",
      image: "https://static-site.onlyoffice.com/public/images/templates/main/customers/success-stories/guara-linux.jpg",
      href: "https://www.onlyoffice.com/blog/2024/07/onlyoffice-desktop-editors-on-guara-linux",
    },
    {
      title: "How Czech TV replaced Google Docs and MS Office with ONLYOFFICE and ownCloud",
      image: "https://static-site.onlyoffice.com/public/images/templates/main/customers/success-stories/czech-tv.jpg",
      href: "https://www.onlyoffice.com/blog/2021/04/how-czech-tv-replaced-google-docs-and-ms-office-with-onlyoffice-and-owncloud",
    },
    {
      title: "How SWITCH integrated ONLYOFFICE into SWITCHdrive to create a complete alternative to Office 365",
      image: "https://static-site.onlyoffice.com/public/images/templates/main/customers/success-stories/switch.jpg",
      href: "https://www.onlyoffice.com/blog/2021/02/how-switch-integrated-onlyoffice-into-switchdrive-to-create-a-complete-alternative-to-office-365",
    },
    {
      title: "The City of Hopewell, Virginia: enabling remote work for 500 government employees with ONLYOFFICE",
      image: "https://static-site.onlyoffice.com/public/images/templates/main/customers/success-stories/hopewell.jpg",
      href: "https://www.onlyoffice.com/blog/2020/06/onlyoffice-in-the-city-of-hopewell",
    },
    {
      title: "How Calar Alto Observatory implements ONLYOFFICE for secure & location-independent collaboration",
      image: "https://static-site.onlyoffice.com/public/images/templates/main/customers/success-stories/calar-alto-observatory.jpg",
      href: "https://www.onlyoffice.com/blog/2022/06/how-calar-alto-observatory-implements-onlyoffice",
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
            margin: "0 0 36px",
          }}
        >
          Trusted by more than 21 million users worldwide
        </h2>

        {/* Partner Logos */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "36px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          {logos.map((logo) => (
            <div key={logo.name} style={{ display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.9 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo.src} alt={logo.name} style={{ height: `${logo.height}px`, width: "auto", objectFit: "contain" }} />
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <Link
            id="more-customers"
            href="/customers?from=default"
            style={{
              color: "#ff6f3d",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "underline",
            }}
          >
            More customers
          </Link>
        </div>

        {/* Customer Stories Cards Grid - 2 Column Horizontal Cards */}
        <div
          className="customer-stories-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "28px 36px",
            marginBottom: "36px",
          }}
        >
          {stories.map((story, i) => (
            <a
              key={i}
              href={story.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                textDecoration: "none",
                transition: "opacity 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "200px",
                  height: "114px",
                  flexShrink: 0,
                  borderRadius: "4px",
                  overflow: "hidden",
                  backgroundColor: "#e2e8f0",
                  position: "relative",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                }}
              >
                {/* ONLYOFFICE corner logo badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "8px",
                    left: "8px",
                    zIndex: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#ff6f3d" />
                    <path d="M2 17L12 22L22 17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12L12 17L22 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={story.image}
                  alt={story.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: 1.45,
                    color: "#333333",
                    margin: 0,
                  }}
                >
                  {story.title}
                </h3>
              </div>
            </a>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link
            id="more-success-stories"
            href="/customers?from=default"
            style={{
              color: "#ff6f3d",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "underline",
            }}
          >
            More success stories
          </Link>
        </div>
      </div>
    </section>
  );
}

