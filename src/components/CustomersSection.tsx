"use client";

import React from "react";
import { useLocale } from "next-intl";

export default function CustomersSection() {
  const locale = useLocale();
  const isVi = locale === "vi";

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
      title: isVi
        ? "Cách Kinderhaus Berlin chia sẻ và cộng tác trên các tệp tin bảo mật với ONLYOFFICE DocSpace"
        : "How Kinderhaus Berlin shares and collaborates on sensitive files with ONLYOFFICE DocSpace",
      image: "https://static-site.onlyoffice.com/public/images/templates/main/customers/success-stories/kinderhaus.jpg",
    },
    {
      title: isVi
        ? "Lý do đội ngũ Guará Linux chọn ONLYOFFICE Desktop Editors cho 22.000 cán bộ cảnh sát Minas Gerais"
        : "Why the Guará Linux team chooses ONLYOFFICE Desktop Editors as the default office suite for 22.000 employees of the Military Police of Minas Gerais",
      image: "https://static-site.onlyoffice.com/public/images/templates/main/customers/success-stories/guara-linux.jpg",
    },
    {
      title: isVi
        ? "Cách Đài truyền hình Séc (Czech TV) thay thế Google Docs và MS Office bằng ONLYOFFICE và ownCloud"
        : "How Czech TV replaced Google Docs and MS Office with ONLYOFFICE and ownCloud",
      image: "https://static-site.onlyoffice.com/public/images/templates/main/customers/success-stories/czech-tv.jpg",
    },
    {
      title: isVi
        ? "Cách SWITCH tích hợp ONLYOFFICE vào SWITCHdrive để tạo giải pháp thay thế hoàn hảo cho Office 365"
        : "How SWITCH integrated ONLYOFFICE into SWITCHdrive to create a complete alternative to Office 365",
      image: "https://static-site.onlyoffice.com/public/images/templates/main/customers/success-stories/switch.jpg",
    },
    {
      title: isVi
        ? "Thành phố Hopewell, Virginia: Hỗ trợ làm việc từ xa an toàn cho 500 cán bộ chính quyền với ONLYOFFICE"
        : "The City of Hopewell, Virginia: enabling remote work for 500 government employees with ONLYOFFICE",
      image: "https://static-site.onlyoffice.com/public/images/templates/main/customers/success-stories/hopewell.jpg",
    },
    {
      title: isVi
        ? "Cách Đài thiên văn Calar Alto ứng dụng ONLYOFFICE để cộng tác an toàn và linh hoạt từ mọi khoảng cách"
        : "How Calar Alto Observatory implements ONLYOFFICE for secure & location-independent collaboration",
      image: "https://static-site.onlyoffice.com/public/images/templates/main/customers/success-stories/calar-alto-observatory.jpg",
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
          {isVi
            ? "Được tin cậy bởi hơn 21 triệu người dùng trên toàn cầu"
            : "Trusted by more than 21 million users worldwide"}
        </h2>

        {/* Partner Logos */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "36px",
            flexWrap: "wrap",
            marginBottom: "52px",
          }}
        >
          {logos.map((logo) => (
            <div key={logo.name} style={{ display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.9 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo.src} alt={logo.name} style={{ height: `${logo.height}px`, width: "auto", objectFit: "contain" }} />
            </div>
          ))}
        </div>

        {/* Customer Stories Cards Grid - Pure Static Display (No Links) */}
        <div
          className="customer-stories-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "28px 36px",
          }}
        >
          {stories.map((story, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                cursor: "default",
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
