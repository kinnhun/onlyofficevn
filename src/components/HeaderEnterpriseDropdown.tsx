"use client";

import React, { useState, useRef } from "react";
import { openMessengerChat } from "@/lib/messenger";

interface HeaderEnterpriseDropdownProps {
  locale: string;
}

export default function HeaderEnterpriseDropdown({ locale }: HeaderEnterpriseDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 180);
  };

  const handleClickItem = (e: React.MouseEvent) => {
    setIsOpen(false);
    openMessengerChat(e);
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top Nav Item Trigger: Exactly matching ONLYOFFICE header */}
      <button
        type="button"
        onClick={handleClickItem}
        aria-expanded={isOpen}
        aria-haspopup="true"
        style={{
          background: "transparent",
          border: "none",
          color: isOpen ? "#ff6f3d" : "#334155",
          fontSize: "14.5px",
          fontWeight: isOpen ? 700 : 600,
          padding: "8px 12px",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          whiteSpace: "nowrap",
          lineHeight: 1.2,
          transition: "color 0.15s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#ff6f3d";
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.color = "#334155";
          }
        }}
      >
        <span>Enterprise</span>
      </button>

      {/* Dropdown Menu Container */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "-60px",
            zIndex: 1100,
            paddingTop: "12px", // bridge to avoid mouse leaving gap
            animation: "ooFadeIn 0.18s ease-out",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "4px",
              boxShadow: "0 14px 36px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06)",
              border: "1px solid #e5e7eb",
              width: "560px",
              boxSizing: "border-box",
            }}
          >
            {/* Top 2 Columns Section */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                padding: "26px 32px 24px",
                columnGap: "32px",
              }}
            >
              {/* COLUMN 1: DOCS ENTERPRISE */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 700,
                    color: "#737373",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: "18px",
                  }}
                >
                  DOCS ENTERPRISE
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {/* Item 1: Why Docs Enterprise */}
                  <a
                    href="https://www.messenger.com/t/286163107904324"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClickItem}
                    style={{
                      textDecoration: "none",
                      color: "#333333",
                      fontSize: "16.5px",
                      fontWeight: 700,
                      lineHeight: "1.3",
                      transition: "color 0.15s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#ff6f3d";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#333333";
                    }}
                  >
                    Why Docs Enterprise
                  </a>

                  {/* Item 2: Pricing */}
                  <a
                    href="https://www.messenger.com/t/286163107904324"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClickItem}
                    style={{
                      textDecoration: "none",
                      color: "#333333",
                      fontSize: "16.5px",
                      fontWeight: 700,
                      lineHeight: "1.3",
                      transition: "color 0.15s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#ff6f3d";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#333333";
                    }}
                  >
                    Pricing
                  </a>

                  {/* Item 3: Get it now */}
                  <a
                    href="https://www.messenger.com/t/286163107904324"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClickItem}
                    style={{
                      textDecoration: "none",
                      color: "#333333",
                      fontSize: "16.5px",
                      fontWeight: 700,
                      lineHeight: "1.3",
                      transition: "color 0.15s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#ff6f3d";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#333333";
                    }}
                  >
                    Get it now
                  </a>
                </div>
              </div>

              {/* COLUMN 2: DOCSPACE ENTERPRISE (With custom ONLYOFFICE icons & vertical divider) */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderLeft: "1px solid #e5e7eb",
                  paddingLeft: "32px",
                }}
              >
                <div
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 700,
                    color: "#737373",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: "18px",
                  }}
                >
                  DOCSPACE ENTERPRISE
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {/* Item 1: Why DocSpace Enterprise with tabs+star icon */}
                  <a
                    href="https://www.messenger.com/t/286163107904324"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClickItem}
                    style={{
                      textDecoration: "none",
                      color: "#333333",
                      fontSize: "16.5px",
                      fontWeight: 700,
                      lineHeight: "1.3",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "color 0.15s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#ff6f3d";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#333333";
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                      <path d="M4 6V4C4 3.45 4.45 3 5 3C5.55 3 6 3.45 6 4V6" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M7 6V4C7 3.45 7.45 3 8 3C8.55 3 9 3.45 9 4V6" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M10 6V4C10 3.45 10.45 3 11 3C11.55 3 12 3.45 12 4V6" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M4 6H15L19 10V20C19 20.55 18.55 21 18 21H12" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M15 6V10H19" stroke="#333333" strokeWidth="1.5" strokeLinejoin="round" />
                      <rect x="3" y="14" width="8" height="8" rx="1" stroke="#ff6f3d" strokeWidth="1.3" fill="#ffffff" />
                      <path d="M7 15.3L7.6 16.8L9.2 16.9L7.9 17.9L8.4 19.4L7 18.5L5.6 19.4L6.1 17.9L4.8 16.9L6.4 16.8L7 15.3Z" fill="#ff6f3d" />
                    </svg>
                    <span>Why DocSpace Enterprise</span>
                  </a>

                  {/* Item 2: Pricing with circled 1 icon */}
                  <a
                    href="https://www.messenger.com/t/286163107904324"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClickItem}
                    style={{
                      textDecoration: "none",
                      color: "#333333",
                      fontSize: "16.5px",
                      fontWeight: 700,
                      lineHeight: "1.3",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "color 0.15s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#ff6f3d";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#333333";
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                      <circle cx="12" cy="12" r="10" stroke="#333333" strokeWidth="1.5" />
                      <circle cx="12" cy="12" r="7.5" stroke="#333333" strokeWidth="0.8" />
                      <path d="M10.8 10.2L12.2 9V15.5M10.5 15.5H13.8" stroke="#ff6f3d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Pricing</span>
                  </a>

                  {/* Item 3: Get it now with download tray icon */}
                  <a
                    href="https://www.messenger.com/t/286163107904324"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClickItem}
                    style={{
                      textDecoration: "none",
                      color: "#333333",
                      fontSize: "16.5px",
                      fontWeight: 700,
                      lineHeight: "1.3",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "color 0.15s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#ff6f3d";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#333333";
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                      <path d="M4 14V17C4 17.55 4.45 18 5 18H19C19.55 18 20 17.55 20 17V14" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2.5 20.5H21.5" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M12 4.5V13.5M12 13.5L8.5 10M12 13.5L15.5 10" stroke="#ff6f3d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Get it now</span>
                  </a>
                </div>
              </div>
            </div>

            {/* BOTTOM BAR: Contact sales & Request demo */}
            <div
              style={{
                borderTop: "1px solid #e5e7eb",
                padding: "16px 32px",
                display: "flex",
                alignItems: "center",
                gap: "48px",
              }}
            >
              {/* Contact sales */}
              <a
                href="https://www.messenger.com/t/286163107904324"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClickItem}
                style={{
                  textDecoration: "none",
                  color: "#333333",
                  fontSize: "14px",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "color 0.15s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ff6f3d";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#333333";
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                  <path d="M4 14C4 9.58 7.58 6 12 6C16.42 6 20 9.58 20 14" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 13C3 12.45 3.45 12 4 12C4.55 12 5 12.45 5 13V17C5 17.55 4.55 18 4 18C3.45 18 3 17.55 3 17V13Z" stroke="#333333" strokeWidth="1.5" />
                  <path d="M19 13C19 12.45 19.45 12 20 12C20.55 12 21 12.45 21 13V17C21 17.55 20.55 18 20 18C19.45 18 19 17.55 19 17V13Z" stroke="#333333" strokeWidth="1.5" />
                  <path d="M6 13.5C6 13.5 7.5 13.8 8.3 14.8C9 15.6 8.8 17.2 7.8 18.2C6.8 19.2 5 19 4.3 18.2C3.5 17.3 3.5 15 4.5 13.5C5.5 12 7.5 10 10.5 9" stroke="#ff6f3d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Contact sales</span>
              </a>

              {/* Request demo */}
              <a
                href="https://www.messenger.com/t/286163107904324"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClickItem}
                style={{
                  textDecoration: "none",
                  color: "#333333",
                  fontSize: "14px",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "color 0.15s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ff6f3d";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#333333";
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                  <path d="M4 19V17C4 15 5.5 13.5 7 13" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M20 19V17C20 15 18.5 13.5 17 13" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M12 4C9.5 7 8.5 11 8.5 15H15.5C15.5 11 14.5 7 12 4Z" stroke="#ff6f3d" strokeWidth="1.6" strokeLinejoin="round" />
                  <circle cx="12" cy="10" r="1.2" fill="#ff6f3d" />
                  <path d="M10.5 18L12 21L13.5 18" stroke="#ff6f3d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Request demo</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
