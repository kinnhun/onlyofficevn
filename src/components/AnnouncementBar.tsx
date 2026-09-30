"use client";

import React, { useState } from "react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

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
            <span>Back to school with ONLYOFFICE!</span> Get prepared for the new academic year with our special blog posts.
          </div>
          <div className="oo-advent-announce-text-mobile">
            Back to school with ONLYOFFICE!
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

