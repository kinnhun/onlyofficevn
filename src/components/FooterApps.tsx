"use client";

import React from "react";
import { Link } from "@/i18n/routing";

export const appPills = [
  {
    name: "For Windows",
    href: "/download-desktop",
    bg: "#0078d4",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.802" />
      </svg>
    ),
  },
  {
    name: "For Linux",
    href: "/download-desktop",
    bg: "#e95420",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.82 17.58c-.3.51-.78.84-1.35.93-.57.09-1.14-.06-1.59-.42l-2.07-1.65c-.24-.18-.54-.27-.84-.24-.3.03-.57.18-.75.42l-1.5 2.01c-.36.48-.9.78-1.5.81-.6.03-1.17-.21-1.59-.66-.84-.9-1.2-2.16-.96-3.36l.54-2.73c.09-.45.03-.9-.18-1.29-.21-.39-.57-.69-.99-.81l-2.61-.75c-1.17-.33-1.95-1.41-1.95-2.64 0-1.23.78-2.31 1.95-2.64l2.61-.75c.42-.12.78-.42.99-.81.21-.39.27-.84.18-1.29l-.54-2.73c-.24-1.2.12-2.46.96-3.36.42-.45.99-.69 1.59-.66.6.03 1.14.33 1.5.81l1.5 2.01c.18.24.45.39.75.42.3.03.6-.06.84-.24l2.07-1.65c.45-.36 1.02-.51 1.59-.42.57.09 1.05.42 1.35.93.63 1.05.6 2.37-.09 3.42l-1.53 2.34c-.24.39-.33.84-.24 1.29.09.45.36.81.75 1.02l2.37 1.29c1.08.6 1.68 1.77 1.53 3.03-.15 1.23-.96 2.25-2.1 2.64z" />
      </svg>
    ),
  },
  {
    name: "For macOS",
    href: "/download-desktop",
    bg: "#000000",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.43-.59.69-1.12 1.82-.98 2.94 1.07.08 2.13-.45 2.79-1.27z" />
      </svg>
    ),
  },
  {
    name: "For Android",
    href: "/download-desktop#mobile",
    bg: "#3ddc84",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
        <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4128 13.8533 8.0823 12 8.0823s-3.5902.3305-5.1367.8674L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396" />
      </svg>
    ),
  },
  {
    name: "For iOS",
    href: "/download-desktop#mobile",
    bg: "#000000",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
        <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="'Open Sans', sans-serif">
          iOS
        </text>
      </svg>
    ),
  },
];

export default function FooterApps({ title }: { title: string }) {
  return (
    <div style={{ marginBottom: "50px" }}>
      <div
        style={{
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#666666",
          marginBottom: "16px",
        }}
      >
        {title}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        {appPills.map((pill) => (
          <Link
            key={pill.name}
            href={pill.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "6px 14px 6px 8px",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              textDecoration: "none",
              color: "#333333",
              fontSize: "13px",
              fontWeight: 500,
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: pill.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {pill.icon}
            </div>
            <span>{pill.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
