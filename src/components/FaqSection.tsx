"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqSection() {
  const t = useTranslations("faqSection");
  const faqs = t.raw("faqs") as FaqItem[];
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

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
            marginBottom: "48px",
          }}
        >
          {t("title")}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndices.includes(index);
            return (
              <div
                key={index}
                style={{
                  border: "1px solid #e5e5e5",
                  borderRadius: "8px",
                  overflow: "hidden",
                  transition: "border-color 0.2s ease",
                }}
              >
                <button
                  onClick={() => toggleIndex(index)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 24px",
                    background: isOpen ? "#fbfbfb" : "#ffffff",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background-color 0.2s ease",
                  }}
                  aria-expanded={isOpen}
                >
                  <span
                    style={{
                      fontSize: "17px",
                      fontWeight: 600,
                      color: isOpen ? "#ff6f3d" : "#333333",
                      lineHeight: 1.4,
                      paddingRight: "16px",
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    style={{
                      fontSize: "22px",
                      fontWeight: 400,
                      color: isOpen ? "#ff6f3d" : "#777777",
                      lineHeight: 1,
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease, color 0.2s ease",
                      flexShrink: 0,
                    }}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: "16px 24px 24px",
                      backgroundColor: "#fbfbfb",
                      borderTop: "1px solid #f0f0f0",
                      fontSize: "15px",
                      lineHeight: 1.7,
                      color: "#555555",
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
