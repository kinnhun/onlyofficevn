"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";
import { FlagVi, FlagEn } from "@/components/HeaderFlags";

interface HeaderRightActionsProps {
  locale: string;
  onSwitchLocale: (newLocale: "vi" | "en") => void;
  tCommon: (key: string) => string;
}

export default function HeaderRightActions({
  locale,
  onSwitchLocale,
  tCommon,
}: HeaderRightActionsProps) {
  const [langOpen, setLangOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="oo-header-icons en"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
        whiteSpace: "nowrap",
      }}
    >
      {/* Language Selector Dropdown */}
      <div className="oo-lang-dropdown">
        <button
          type="button"
          className={`oo-lang-dropdown-btn ${langOpen ? "open" : ""}`}
          aria-label="Chọn ngôn ngữ / Select language"
          aria-haspopup="listbox"
          aria-expanded={langOpen}
          onClick={() => setLangOpen(!langOpen)}
          style={{
            height: "38px",
            padding: "0 14px",
            borderRadius: "8px",
            border: "1.5px solid #e2e8f0",
            backgroundColor: "#ffffff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#1e293b",
            fontSize: "13.5px",
            fontWeight: 600,
            whiteSpace: "nowrap",
            flexShrink: 0,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#cbd5e1";
            e.currentTarget.style.backgroundColor = "#f8fafc";
          }}
          onMouseLeave={(e) => {
            if (!langOpen) {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.backgroundColor = "#ffffff";
            }
          }}
        >
          {locale === "vi" ? <FlagVi /> : <FlagEn />}
          <span style={{ fontWeight: 600, fontSize: "13.5px", lineHeight: "1" }}>
            <span className="oo-lang-btn-text-full">{locale === "vi" ? "Tiếng Việt" : "English"}</span>
            <span className="oo-lang-btn-text-short">{locale === "vi" ? "VI" : "EN"}</span>
          </span>
          <ChevronDown
            size={14}
            style={{
              transition: "transform 0.2s ease",
              transform: langOpen ? "rotate(180deg)" : "rotate(0deg)",
              color: "#64748b",
            }}
          />
        </button>

        {langOpen && (
          <div className="oo-lang-dropdown-menu" role="listbox">
            <div
              style={{
                padding: "6px 10px 4px",
                fontSize: "11px",
                fontWeight: 700,
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {tCommon("language")}
            </div>
            <button
              type="button"
              className={`oo-lang-dropdown-item ${locale === "vi" ? "active" : ""}`}
              onClick={() => {
                onSwitchLocale("vi");
                setLangOpen(false);
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FlagVi />
                <span style={{ fontWeight: locale === "vi" ? 700 : 500 }}>Tiếng Việt</span>
              </span>
              {locale === "vi" ? (
                <Check size={16} color="#ea580c" strokeWidth={2.5} />
              ) : (
                <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600 }}>VI</span>
              )}
            </button>
            <button
              type="button"
              className={`oo-lang-dropdown-item ${locale === "en" ? "active" : ""}`}
              onClick={() => {
                onSwitchLocale("en");
                setLangOpen(false);
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FlagEn />
                <span style={{ fontWeight: locale === "en" ? 700 : 500 }}>English</span>
              </span>
              {locale === "en" ? (
                <Check size={16} color="#ea580c" strokeWidth={2.5} />
              ) : (
                <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600 }}>EN</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
