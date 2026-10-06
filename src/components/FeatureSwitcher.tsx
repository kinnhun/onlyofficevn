"use client";

import React, { useState } from "react";
import Link from "next/link";
import { openMessengerChat } from "@/lib/messenger";

export interface FeatureItem {
  id: string;
  label: React.ReactNode;
  imageUrl: string;
  imageUrl2x: string;
}

interface FeatureSwitcherProps {
  title: React.ReactNode;
  learnMoreText: string;
  learnMoreHref: string;
  items: FeatureItem[];
  imagePosition?: "right" | "left";
  backgroundColor?: string;
}

export default function FeatureSwitcher({
  title,
  learnMoreText,
  learnMoreHref,
  items,
  imagePosition = "right",
  backgroundColor = "#ffffff",
}: FeatureSwitcherProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = items[activeIndex] || items[0];

  return (
    <section
      style={{
        backgroundColor: backgroundColor,
        padding: "88px 0",
        width: "100%",
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
            marginBottom: "52px",
          }}
        >
          {title}
        </h2>

        <div
          className="feature-switcher-grid"
          style={{
            display: "grid",
            gridTemplateColumns: imagePosition === "left" ? "1.4fr 1fr" : "1fr 1.4fr",
            gap: "48px",
            alignItems: "center",
          }}
        >
          {/* Image Preview Box (Desktop) */}
          <div
            className="feature-preview-desktop"
            style={{
              order: imagePosition === "left" ? 1 : 2,
              width: "100%",
              borderRadius: "16px",
              overflow: "hidden",
              backgroundColor: "#ebf3f8",
              padding: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "460px",
              boxSizing: "border-box",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={activeItem.imageUrl}
              src={activeItem.imageUrl}
              srcSet={`${activeItem.imageUrl} 1x, ${activeItem.imageUrl2x} 2x`}
              alt="Feature preview"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "520px",
                objectFit: "contain",
                display: "block",
                transition: "opacity 0.25s ease",
              }}
            />
          </div>

          {/* Interactive Tabs List */}
          <div
            style={{
              order: imagePosition === "left" ? 2 : 1,
              width: "100%",
            }}
          >
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {items.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      style={{
                        width: "100%",
                        padding: "16px 20px",
                        textAlign: "left",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "16px",
                        backgroundColor: isActive ? "#ffffff" : "transparent",
                        color: isActive ? "#ff6f3d" : "#334155",
                        fontWeight: isActive ? 600 : 400,
                        fontSize: "16px",
                        lineHeight: 1.5,
                        border: "none",
                        borderLeft: isActive ? "4px solid #ff6f3d" : "4px solid transparent",
                        borderRadius: "8px",
                        boxShadow: isActive ? "0 6px 20px rgba(0, 0, 0, 0.06)" : "none",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span style={{ flex: 1 }}>{item.label}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{
                          minWidth: "20px",
                          transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.2s ease",
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.0026 13.5436L7.74277 9.29363C7.3518 8.90355 6.71629 8.90192 6.32332 9.28998L6.29591 9.31705C5.90294 9.70511 5.90132 10.3359 6.2923 10.726L11.2836 15.7058C11.5041 15.9258 11.8024 16.0223 12.0911 15.9949C12.3217 15.9768 12.5471 15.8799 12.723 15.7044L17.7078 10.731C18.0988 10.3409 18.0972 9.71014 17.7042 9.32208L17.6768 9.29502C17.2838 8.90696 16.6483 8.90859 16.2573 9.29866L12.0026 13.5436Z"
                          fill={isActive ? "#ff6f3d" : "#64748b"}
                        />
                      </svg>
                    </button>

                    {/* Mobile Accordion preview */}
                    {isActive && (
                      <div
                        className="feature-preview-mobile"
                        style={{
                          margin: "12px 0",
                          borderRadius: "12px",
                          overflow: "hidden",
                          backgroundColor: "#ffffff",
                          border: "1px solid #e2e8f0",
                          padding: "12px",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.imageUrl}
                          srcSet={`${item.imageUrl} 1x, ${item.imageUrl2x} 2x`}
                          alt="Feature preview"
                          style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                          }}
                        />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "44px" }}>
          {learnMoreHref.startsWith("http") ? (
            <a
              href={learnMoreHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={openMessengerChat}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "#ff6f3d",
                fontSize: "16px",
                fontWeight: 600,
                textDecoration: "underline",
                transition: "opacity 0.2s",
                cursor: "pointer",
              }}
            >
              {learnMoreText}
            </a>
          ) : (
            <Link
              href={learnMoreHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "#ff6f3d",
                fontSize: "16px",
                fontWeight: 600,
                textDecoration: "underline",
                transition: "opacity 0.2s",
              }}
            >
              {learnMoreText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
