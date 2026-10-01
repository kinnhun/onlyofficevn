"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const t = useTranslations("announcement");

  if (!visible) return null;

  return (
    <div className="oo-advent-announce en" style={{ position: "relative" }}>
      <a
        className="oo-advent-announce-wrapper en"
        href="https://www.onlyoffice.com/blog/category/back-to-school"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="oo-advent-announce-text en">
          <div className="oo-advent-announce-text-desktop">
            <span>{t("textMobile")}</span> {t("textDesktop")}
          </div>
          <div className="oo-advent-announce-text-mobile">
            {t("textMobile")}
          </div>
        </div>
      </a>
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
