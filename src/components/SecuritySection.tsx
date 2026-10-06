"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ONLYOFFICE_MESSENGER_URL, openMessengerChat } from "@/lib/messenger";

const MESSENGER_URL = ONLYOFFICE_MESSENGER_URL || "https://www.messenger.com/t/286163107904324";

export default function SecuritySection() {
  const t = useTranslations("securitySection");
  const features = t.raw("features") as string[];

  return (
    <section
      style={{
        backgroundColor: "#333333",
        padding: "55px 0",
        width: "100%",
        color: "#ffffff",
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
        <div
          className="security-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "56px",
            alignItems: "center",
          }}
        >
          {/* Security Visual Mockup */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://static-site.onlyoffice.com/public/images/modules/security-first/secure.png"
              srcSet="https://static-site.onlyoffice.com/public/images/modules/security-first/secure.png 1x, https://static-site.onlyoffice.com/public/images/modules/security-first/secure@2x.png 2x"
              alt="ONLYOFFICE Security Architecture"
              style={{
                width: "100%",
                maxWidth: "600px",
                height: "auto",
                display: "block",
                filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.35))",
              }}
            />
          </div>

          {/* Security Content */}
          <div>
            <h2
              style={{
                fontSize: "40px",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "#ffffff",
                marginBottom: "28px",
              }}
            >
              <span style={{ color: "#ff6f3d" }}>{t("titleHighlight")}</span> {t("titleSuffix")}
            </h2>

            <ul
              style={{
                listStyle: "none",
                margin: "0 0 32px 0",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {features.map((text, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "#ffffff",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#ff6f3d",
                      transform: "rotate(45deg)",
                      marginTop: "7px",
                      flexShrink: 0,
                    }}
                  />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <div style={{ marginBottom: "32px" }}>
              <a
                id="security-first-learn-more"
                href={MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={openMessengerChat}
                style={{
                  color: "#ff6f3d",
                  fontSize: "16px",
                  fontWeight: 600,
                  textDecoration: "underline",
                  transition: "opacity 0.2s",
                  cursor: "pointer",
                }}
              >
                {t("learnMore")}
              </a>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <a
                href="https://www.onlyoffice.com/blog/2018/05/how-onlyoffice-complies-with-gdpr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GDPR Compliance"
                style={{
                  display: "inline-block",
                  width: "80px",
                  height: "80px",
                  backgroundImage:
                    "url(https://static-site.onlyoffice.com/public/images/modules/security-first/features.svg?ver=4)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "0px 0px",
                  backgroundSize: "160px 80px",
                }}
              />
              <a
                href="https://www.onlyoffice.com/blog/2020/10/how-onlyoffice-complies-with-hipaa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HIPAA Compliance"
                style={{
                  display: "inline-block",
                  width: "80px",
                  height: "80px",
                  backgroundImage:
                    "url(https://static-site.onlyoffice.com/public/images/modules/security-first/features.svg?ver=4)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "-80px 0px",
                  backgroundSize: "160px 80px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
