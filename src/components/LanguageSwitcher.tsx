"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { ChevronDown, Check } from "lucide-react";
import { FlagVi, FlagEn } from "@/components/HeaderFlags";
import {
  locales,
  localeNames,
  localeShortNames,
  type Locale,
  useRouter,
  usePathname,
} from "@/i18n/config";

export interface LanguageSwitcherProps {
  /**
   * Kiểu hiển thị:
   * - "header": Kiểu dropdown dành cho Header desktop
   * - "footer": Kiểu dropup thanh lịch dành cho Footer
   * - "mobile": Kiểu danh sách nút 2 cột dành cho Mobile Drawer
   * - "compact": Kiểu gọn nhẹ cờ + mã ngắn
   */
  variant?: "header" | "footer" | "mobile" | "compact";
  /** Hướng mở menu (mặc định: down cho header, up cho footer) */
  dropDirection?: "down" | "up";
  /** ClassName bổ sung */
  className?: string;
  /** Callback khi đổi ngôn ngữ */
  onLocaleChange?: (newLocale: Locale) => void;
}

export default function LanguageSwitcher({
  variant = "header",
  dropDirection,
  className = "",
  onLocaleChange,
}: LanguageSwitcherProps) {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const direction = dropDirection || (variant === "footer" ? "up" : "down");

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSelectLocale = (newLocale: Locale) => {
    if (newLocale !== currentLocale) {
      try {
        localStorage.setItem("NEXT_LOCALE", newLocale);
        document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
      } catch {
        // ignore localStorage errors
      }
      router.replace(pathname, { locale: newLocale });
      onLocaleChange?.(newLocale);
    }
    setIsOpen(false);
  };

  const renderFlag = (locale: Locale, width = 20, height = 14) => {
    return locale === "vi" ? (
      <FlagVi width={width} height={height} />
    ) : (
      <FlagEn width={width} height={height} />
    );
  };

  // 1. Mobile Drawer Variant (Segmented toggle buttons)
  if (variant === "mobile") {
    return (
      <div
        className={`oo-language-switcher-mobile ${className}`}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
          width: "100%",
        }}
      >
        {locales.map((loc) => {
          const isActive = loc === currentLocale;
          return (
            <button
              key={loc}
              type="button"
              onClick={() => handleSelectLocale(loc)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "10px 14px",
                borderRadius: "8px",
                border: isActive ? "2px solid #ea580c" : "1.5px solid #e2e8f0",
                backgroundColor: isActive ? "#fff7ed" : "#ffffff",
                color: isActive ? "#ea580c" : "#334155",
                fontWeight: isActive ? 700 : 500,
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {renderFlag(loc)}
              <span>{localeNames[loc]}</span>
              {isActive && <Check size={16} strokeWidth={2.5} color="#ea580c" />}
            </button>
          );
        })}
      </div>
    );
  }

  // 2. Compact Variant
  if (variant === "compact") {
    return (
      <div
        ref={containerRef}
        className={`oo-language-switcher-compact ${className}`}
        style={{ position: "relative", display: "inline-block" }}
      >
        <button
          type="button"
          aria-label="Chọn ngôn ngữ"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 8px",
            borderRadius: "6px",
            border: "1px solid #e2e8f0",
            backgroundColor: "#ffffff",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: 600,
            color: "#334155",
          }}
        >
          {renderFlag(currentLocale, 16, 11)}
          <span>{localeShortNames[currentLocale]}</span>
          <ChevronDown
            size={12}
            style={{
              transition: "transform 0.2s ease",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              color: "#64748b",
            }}
          />
        </button>

        {isOpen && (
          <div
            role="listbox"
            style={{
              position: "absolute",
              [direction === "up" ? "bottom" : "top"]: "calc(100% + 4px)",
              right: 0,
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e2e8f0",
              padding: "4px",
              minWidth: "120px",
              zIndex: 1050,
            }}
          >
            {locales.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => handleSelectLocale(loc)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "6px 8px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: loc === currentLocale ? "#fff7ed" : "transparent",
                  color: loc === currentLocale ? "#ea580c" : "#334155",
                  fontSize: "12px",
                  fontWeight: loc === currentLocale ? 700 : 500,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  {renderFlag(loc, 16, 11)}
                  <span>{localeNames[loc]}</span>
                </span>
                {loc === currentLocale && <Check size={14} color="#ea580c" strokeWidth={2.5} />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 3. Header & Footer Variants
  const isFooter = variant === "footer";

  return (
    <div
      ref={containerRef}
      className={`oo-language-switcher oo-language-switcher--${variant} ${className}`}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        flexShrink: 0,
        whiteSpace: "nowrap",
      }}
    >
      <button
        type="button"
        className={`oo-lang-dropdown-btn ${isOpen ? "open" : ""}`}
        aria-label="Chọn ngôn ngữ / Select language"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          height: isFooter ? "36px" : "38px",
          padding: isFooter ? "0 12px" : "0 14px",
          borderRadius: isFooter ? "6px" : "8px",
          border: isFooter ? "1px solid #dcdcdc" : "1.5px solid #e2e8f0",
          backgroundColor: "#ffffff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#1e293b",
          fontSize: isFooter ? "13px" : "13.5px",
          fontWeight: 600,
          whiteSpace: "nowrap",
          flexShrink: 0,
          transition: "all 0.2s ease",
          boxShadow: isFooter ? "none" : "0 1px 2px rgba(0,0,0,0.02)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#cbd5e1";
          e.currentTarget.style.backgroundColor = "#f8fafc";
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = isFooter ? "#dcdcdc" : "#e2e8f0";
            e.currentTarget.style.backgroundColor = "#ffffff";
          }
        }}
      >
        {renderFlag(currentLocale)}
        <span style={{ fontWeight: 600, lineHeight: "1" }}>
          <span className="oo-lang-btn-text-full">{localeNames[currentLocale]}</span>
          <span className="oo-lang-btn-text-short">{localeShortNames[currentLocale]}</span>
        </span>
        <ChevronDown
          size={14}
          style={{
            transition: "transform 0.2s ease",
            transform: isOpen
              ? direction === "up"
                ? "rotate(0deg)"
                : "rotate(180deg)"
              : direction === "up"
              ? "rotate(180deg)"
              : "rotate(0deg)",
            color: "#64748b",
          }}
        />
      </button>

      {isOpen && (
        <div
          className="oo-lang-dropdown-menu"
          role="listbox"
          style={{
            position: "absolute",
            [direction === "up" ? "bottom" : "top"]: isFooter ? "calc(100% + 6px)" : "calc(100% + 8px)",
            [isFooter ? "left" : "right"]: 0,
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e2e8f0",
            padding: "6px",
            minWidth: "165px",
            zIndex: 1050,
            animation: "fadeIn 0.15s ease-out",
          }}
        >
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
            Ngôn ngữ / Language
          </div>

          {locales.map((loc) => {
            const isActive = loc === currentLocale;
            return (
              <button
                key={loc}
                type="button"
                className={`oo-lang-dropdown-item ${isActive ? "active" : ""}`}
                onClick={() => handleSelectLocale(loc)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "9px 12px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: isActive ? "#fff7ed" : "transparent",
                  color: isActive ? "#ea580c" : "#1e293b",
                  cursor: "pointer",
                  fontSize: "13.5px",
                  transition: "background 0.15s ease",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "#f8fafc";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {renderFlag(loc)}
                  <span style={{ fontWeight: isActive ? 700 : 500 }}>
                    {localeNames[loc]}
                  </span>
                </span>
                {isActive ? (
                  <Check size={16} color="#ea580c" strokeWidth={2.5} />
                ) : (
                  <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600 }}>
                    {localeShortNames[loc]}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
