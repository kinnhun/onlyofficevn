"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const t = useTranslations("announcement");

  if (!visible) return null;

  return (
    <div className="oo-advent-announce en" style={{ position: "relative" }}>
      <Link
        className="oo-advent-announce-wrapper en"
        href="/partners"
      >
        <div className="oo-advent-announce-text en">
          <div className="oo-advent-announce-text-desktop">
            <span
              style={{
                backgroundColor: "#ffffff",
                color: "#ea580c",
                padding: "2px 8px",
                borderRadius: "4px",
                fontWeight: 700,
                marginRight: "8px",
                fontSize: "11px",
                letterSpacing: "0.3px",
                textTransform: "uppercase",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              CHÍNH THỨC
            </span>
            <span style={{ fontWeight: 700 }}>{t("textMobile")}</span> {t("textDesktop")}
          </div>
          <div className="oo-advent-announce-text-mobile" style={{ fontWeight: 700 }}>
            {t("textMobile")}
          </div>
        </div>
      </Link>
      <button
        onClick={() => setVisible(false)}
        aria-label="Close announcement"
        style={{
          position: "absolute",
          right: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          color: "rgba(255, 255, 255, 0.8)",
          cursor: "pointer",
          fontSize: "16px",
          zIndex: 20,
          padding: "4px 8px",
          lineHeight: 1,
        }}
      >
        ✕
      </button>
    </div>
  );
}
