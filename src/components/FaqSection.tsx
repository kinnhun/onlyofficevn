"use client";

import React, { useState } from "react";

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export default function FaqSection() {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqs: FaqItem[] = [
    {
      question: "Is ONLYOFFICE really free?",
      answer: (
        <>
          Yes, it is. The source code of ONLYOFFICE solutions is available on GitHub under the GNU AGPL v3 license. We offer a completely free community version of ONLYOFFICE Docs for up to 20 concurrent connections, free desktop applications for Windows, Linux, and macOS, and free mobile apps for iOS and Android. Additionally, ONLYOFFICE DocSpace provides a free Startup cloud plan for teams.
        </>
      ),
    },
    {
      question: "What is ONLYOFFICE used for?",
      answer: (
        <>
          ONLYOFFICE provides a full range of tools to create, edit and collaborate on text documents, spreadsheets, presentations, PDF forms and regular PDF files on web, desktop and mobile platforms. You can use the online editors within the ONLYOFFICE collaborative rooms — DocSpace, or integrate Docs into your existing cloud platform (Nextcloud, ownCloud, Jira, WordPress, etc.).
        </>
      ),
    },
    {
      question: "Is ONLYOFFICE safe to use?",
      answer: (
        <>
          Yes, security is our top priority. ONLYOFFICE complies with international standards, including GDPR and HIPAA. It offers multiple levels of security: at rest and in transit encryption (HTTPS, JWT), Private Rooms with end-to-end encryption, flexible access rights (read-only, review, commenting, filtering, form filling), activity tracking, and self-hosted on-premises deployment ensuring full data sovereignty.
        </>
      ),
    },
    {
      question: "Can I use ONLYOFFICE offline?",
      answer: (
        <>
          Yes, ONLYOFFICE Desktop Editors allows you to create, view, and edit documents completely offline on your PC or laptop without an internet connection. It is 100% free and supports Windows, Linux, and macOS.
        </>
      ),
    },
    {
      question: "Does ONLYOFFICE have ads?",
      answer: (
        <>
          No, ONLYOFFICE does not contain any advertisements, third-party tracking, or monetization through user data in any of its desktop, mobile, or cloud solutions.
        </>
      ),
    },
    {
      question: "Who owns ONLYOFFICE?",
      answer: (
        <>
          ONLYOFFICE is owned and developed by Ascensio System SIA, an international IT company founded in 2009 with headquarters in Riga, Latvia, and offices worldwide.
        </>
      ),
    },
    {
      question: "Who is the CEO of ONLYOFFICE?",
      answer: (
        <>
          Lev Bannov is the founder and CEO of ONLYOFFICE.
        </>
      ),
    },
  ];

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
            textAlign: "left",
            marginBottom: "8px",
          }}
        >
          Frequently Asked Questions
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "#666666",
            textAlign: "left",
            margin: "0 0 36px",
          }}
        >
          Get answers to the most popular questions about ONLYOFFICE
        </p>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={idx}
                style={{
                  borderTop: "1px solid #e5e7eb",
                  borderBottom: idx === faqs.length - 1 ? "1px solid #e5e7eb" : "none",
                  padding: "18px 0",
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "18px",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "#333333",
                      flexShrink: 0,
                      userSelect: "none",
                    }}
                  >
                    {isOpen ? "−" : "+"}
                  </span>

                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#333333",
                    }}
                  >
                    {faq.question}
                  </span>
                </button>

                {isOpen && (
                  <div
                    style={{
                      paddingLeft: "32px",
                      paddingTop: "12px",
                      fontSize: "14px",
                      lineHeight: 1.6,
                      color: "#444444",
                    }}
                  >
                    {faq.answer}
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

