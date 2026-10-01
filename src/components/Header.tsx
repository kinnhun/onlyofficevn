"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/routing";

interface DropdownItem {
  title: string;
  desc?: string;
  href: string;
}

export default function Header() {
  const tHeader = useTranslations("header");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const headerRef = useRef<HTMLElement>(null);

  const getMenuData = (category: string): DropdownItem[] => {
    switch (category) {
      case "products":
        return [
          { title: tHeader("menus.products.docs.title"), desc: tHeader("menus.products.docs.desc"), href: "/office-suite" },
          { title: tHeader("menus.products.docspace.title"), desc: tHeader("menus.products.docspace.desc"), href: "/docspace" },
          { title: tHeader("menus.products.desktop.title"), desc: tHeader("menus.products.desktop.desc"), href: "/desktop" },
          { title: tHeader("menus.products.mobile.title"), desc: tHeader("menus.products.mobile.desc"), href: "/download-desktop#mobile" },
          { title: tHeader("menus.products.workspace.title"), desc: tHeader("menus.products.workspace.desc"), href: "/workspace" },
        ];
      case "enterprise":
        return [
          { title: tHeader("menus.enterprise.docsEnterprise.title"), desc: tHeader("menus.enterprise.docsEnterprise.desc"), href: "/docs-enterprise" },
          { title: tHeader("menus.enterprise.docspaceEnterprise.title"), desc: tHeader("menus.enterprise.docspaceEnterprise.desc"), href: "/docspace-enterprise" },
          { title: tHeader("menus.enterprise.security.title"), desc: tHeader("menus.enterprise.security.desc"), href: "/security" },
        ];
      case "developers":
        return [
          { title: tHeader("menus.developers.developerEdition.title"), desc: tHeader("menus.developers.developerEdition.desc"), href: "/developer-edition" },
          { title: tHeader("menus.developers.docspaceDeveloper.title"), desc: tHeader("menus.developers.docspaceDeveloper.desc"), href: "/docspace-developer" },
          { title: tHeader("menus.developers.apiDocs.title"), desc: tHeader("menus.developers.apiDocs.desc"), href: "/api-documentation" },
        ];
      case "pricing":
        return [
          { title: tHeader("menus.pricing.docsPrices.title"), desc: tHeader("menus.pricing.docsPrices.desc"), href: "/docs-enterprise-prices" },
          { title: tHeader("menus.pricing.docspacePrices.title"), desc: tHeader("menus.pricing.docspacePrices.desc"), href: "/docspace-prices" },
          { title: tHeader("menus.pricing.developerPrices.title"), desc: tHeader("menus.pricing.developerPrices.desc"), href: "/developer-edition-prices" },
        ];
      case "partners":
        return [
          { title: tHeader("menus.partners.resellers.title"), desc: tHeader("menus.partners.resellers.desc"), href: "/resellers" },
          { title: tHeader("menus.partners.techPartners.title"), desc: tHeader("menus.partners.techPartners.desc"), href: "/technology-partners" },
          { title: tHeader("menus.partners.hosting.title"), desc: tHeader("menus.partners.hosting.desc"), href: "/hosting-providers" },
        ];
      case "resources":
        return [
          { title: tHeader("menus.resources.blog.title"), desc: tHeader("menus.resources.blog.desc"), href: "/blog" },
          { title: tHeader("menus.resources.webinars.title"), desc: tHeader("menus.resources.webinars.desc"), href: "/webinars" },
          { title: tHeader("menus.resources.helpcenter.title"), desc: tHeader("menus.resources.helpcenter.desc"), href: "/helpcenter" },
          { title: tHeader("menus.resources.events.title"), desc: tHeader("menus.resources.events.desc"), href: "/events" },
        ];
      case "download":
        return [
          { title: tHeader("menus.download.desktop.title"), desc: tHeader("menus.download.desktop.desc"), href: "/download-desktop" },
          { title: tHeader("menus.download.mobile.title"), desc: tHeader("menus.download.mobile.desc"), href: "/download-desktop#mobile" },
          { title: tHeader("menus.download.server.title"), desc: tHeader("menus.download.server.desc"), href: "/download" },
          { title: tHeader("menus.download.connectors.title"), desc: tHeader("menus.download.connectors.desc"), href: "/all-connectors" },
        ];
      default:
        return [];
    }
  };

  const switchLocale = (newLocale: "vi" | "en") => {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
  };

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
        setSearchOpen(false);
        setPhoneOpen(false);
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      ref={headerRef}
      className="oo-header en oo-header--space-between"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "#ffffff",
        borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
        width: "100%",
      }}
    >
      <div
        className="oo-header-container"
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "64px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Mobile Hamburger Button */}
        <button
          className="oo-header-hamburger en"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14" fill="none">
            <rect width="20" height="2" fill="#444444" />
            <rect y="6" width="20" height="2" fill="#444444" />
            <rect y="12" width="20" height="2" fill="#444444" />
          </svg>
        </button>

        {/* Logo */}
        <Link className="oo-header-logo en" aria-label="Go to homepage" href="/"></Link>

        {/* Navigation Menu */}
        <nav
          className={`oo-header-nav en ${mobileOpen ? "mobile-open" : ""}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
            marginLeft: "28px",
          }}
        >
          {mobileOpen && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontWeight: 700, fontSize: "16px", color: "#ff6f3d" }}>MENU</span>
              <button
                onClick={() => setMobileOpen(false)}
                style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>
          )}

          <div
            className="oo-header-menu en"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {(["products", "enterprise", "developers", "pricing", "partners", "resources"] as const).map((item) => (
              <div
                key={item}
                className={`oo-menu-item oo-menu-item--${item} en`}
                onMouseEnter={() => !mobileOpen && setActiveMenu(item)}
                onMouseLeave={() => !mobileOpen && setActiveMenu(null)}
              >
                <button
                  id={`oo-menu-item-btn-${item}`}
                  className="oo-menu-item-btn"
                  onClick={() => setActiveMenu(activeMenu === item ? null : item)}
                >
                  {tHeader(item)}
                  <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 5L0.535899 0.499999L7.4641 0.5L4 5Z" fill="#444444" />
                  </svg>
                </button>

                {activeMenu === item && (
                  <div className="dropdown-menu">
                    {getMenuData(item).map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="dropdown-item"
                        onClick={() => {
                          setActiveMenu(null);
                          setMobileOpen(false);
                        }}
                      >
                        <div style={{ fontWeight: 600 }}>{subItem.title}</div>
                        {subItem.desc && (
                          <div style={{ fontSize: "12px", color: "#777", marginTop: "2px" }}>{subItem.desc}</div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="oo-header-btns en" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", gap: "12px" }}>
            <div
              className="oo-menu-item oo-menu-item--download en oo-menu-item--position-2"
              onMouseEnter={() => !mobileOpen && setActiveMenu("download")}
              onMouseLeave={() => !mobileOpen && setActiveMenu(null)}
            >
              <button
                id="oo-menu-item-btn-download"
                className="oo-menu-item-btn"
                onClick={() => setActiveMenu(activeMenu === "download" ? null : "download")}
              >
                {tHeader("download")}
                <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 5L0.535899 0.499999L7.4641 0.5L4 5Z" fill="#444444" />
                </svg>
              </button>

              {activeMenu === "download" && (
                <div className="dropdown-menu">
                  {getMenuData("download").map((subItem) => (
                    <Link
                      key={subItem.title}
                      href={subItem.href}
                      className="dropdown-item"
                      onClick={() => {
                        setActiveMenu(null);
                        setMobileOpen(false);
                      }}
                    >
                      <div style={{ fontWeight: 600 }}>{subItem.title}</div>
                      {subItem.desc && (
                        <div style={{ fontSize: "12px", color: "#777", marginTop: "2px" }}>{subItem.desc}</div>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a
              className="oo-header-btn en"
              href="https://m.me/onlyoffice.official.vn"
              target="_blank"
              rel="noopener noreferrer"
              title="Liên hệ qua Messenger"
              style={{
                whiteSpace: "nowrap",
                flexWrap: "nowrap",
                width: "auto",
                minWidth: "fit-content",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "7px",
                padding: "0 16px",
                height: "38px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#333333",
                textDecoration: "none",
                lineHeight: "1",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <path
                  d="M12 2C6.477 2 2 6.145 2 11.258C2 14.172 3.455 16.78 5.735 18.442V22L9.153 20.124C10.058 20.375 11.017 20.511 12 20.511C17.523 20.511 22 16.366 22 11.258C22 6.145 17.523 2 12 2ZM13.066 14.443L10.459 11.663L5.371 14.443L10.967 8.5L13.64 11.28L18.663 8.5L13.066 14.443Z"
                  fill="#0084FF"
                />
              </svg>
              {tCommon("contact")}
            </a>
          </div>

          <a className="oo-header-menu-phone-mobile en" href="tel:+37163399867" style={{ marginTop: "12px" }}>
            <span dir="ltr">+371 633 998 67</span>
          </a>
        </nav>

        {/* Right Icon Actions (Search, Phone, Language) */}
        <div className="oo-header-icons en" style={{ position: "relative", display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Search Button */}
          <button
            className="oo-header-search-btn en"
            aria-label="Open search"
            onClick={() => {
              setSearchOpen(!searchOpen);
              setPhoneOpen(false);
              setLangOpen(false);
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.03695 10.0682C2.44111 14.1003 6.0434 17.0419 10.0829 16.6385C10.9612 16.5508 11.7878 16.3122 12.5396 15.951C12.9579 15.75 13.466 15.8015 13.7948 16.1292L18.9818 21.2983C19.3714 21.6865 20.0013 21.6873 20.3918 21.3001L21.2855 20.4139C21.6794 20.0234 21.6802 19.387 21.2873 18.9955L16.1217 13.8477C15.7888 13.5159 15.7387 12.9999 15.947 12.5786C16.5352 11.3886 16.8073 10.025 16.6652 8.60736C16.2611 4.57526 12.6588 1.6336 8.61928 2.03699C4.57979 2.44039 1.63278 6.03607 2.03695 10.0682ZM4.1267 9.85949C4.41539 12.7396 6.98846 14.8407 9.87381 14.5526C12.7592 14.2645 14.8642 11.6961 14.5755 8.81605C14.2868 5.93598 11.7137 3.83479 8.82837 4.12293C5.94302 4.41107 3.83801 6.97941 4.1267 9.85949Z"
                fill="#444444"
              />
            </svg>
          </button>

          {/* Search Popup */}
          {searchOpen && (
            <div
              className="dropdown-menu"
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                width: "300px",
                padding: "12px",
                backgroundColor: "#ffffff",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
                borderRadius: "8px",
                zIndex: 1005,
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.open(`https://www.google.com/search?q=site:onlyoffice.com+${encodeURIComponent(searchQuery)}`, "_blank");
                  }
                }}
                style={{ display: "flex", gap: "8px" }}
              >
                <input
                  type="text"
                  placeholder={tCommon("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                  autoFocus
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#ff6f3d",
                    color: "#fff",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  {tCommon("search")}
                </button>
              </form>
            </div>
          )}

          {/* Phone Selector */}
          <div className="oo-phone-selector" style={{ position: "relative" }}>
            <button
              className="oo-phone-selector-btn"
              aria-label="Contact phones"
              onClick={() => {
                setPhoneOpen(!phoneOpen);
                setSearchOpen(false);
                setLangOpen(false);
              }}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M17.4764 15.0118C16.8927 14.4282 16.1554 14.3644 15.5866 14.8203L14.2882 15.859C13.9039 16.1664 13.3755 16.208 12.9515 15.9622C11.666 15.2173 10.3703 14.0768 9.39088 12.9463C8.41142 11.8158 7.74794 10.7027 7.40455 9.38714C7.29119 8.9529 7.4646 8.49089 7.8288 8.19954L9.06351 7.21177C9.68988 6.71067 9.80556 5.95213 9.32486 5.30906L7.49842 2.86475C7.03714 2.2474 6.27364 2.14652 5.62646 2.61054L4.01908 3.76296C3.21666 4.33777 2.76616 5.32635 2.8596 6.31492C3.12597 9.12423 4.88727 12.8395 7.64449 15.6885C10.4017 18.5375 14.1504 20.4851 16.9442 20.9427C17.9257 21.1034 18.9482 20.7303 19.5898 19.9882L20.8711 18.5061C21.4168 17.8748 21.4018 17.1065 20.8358 16.5405L17.4764 15.0118Z"
                  stroke="#444444"
                  strokeWidth="1.5"
                />
              </svg>
            </button>

            {phoneOpen && (
              <div
                className="dropdown-menu"
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  left: "auto",
                  minWidth: "240px",
                  padding: "16px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
                  borderRadius: "8px",
                  zIndex: 1005,
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: "8px", fontSize: "14px" }}>{tCommon("contactSales")}</div>
                <div style={{ marginBottom: "8px" }}>
                  <div style={{ fontSize: "12px", color: "#888" }}>{tCommon("globalEurope")}</div>
                  <a href="tel:+37163399867" style={{ color: "#ff6f3d", fontWeight: 600, fontSize: "14px" }}>
                    +371 633 998 67
                  </a>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#888" }}>{tCommon("usCanada")}</div>
                  <a href="tel:+18002855430" style={{ color: "#ff6f3d", fontWeight: 600, fontSize: "14px" }}>
                    +1 800 285 5430
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="oo-language-selector" style={{ position: "relative" }}>
            <button
              className="oo-language-selector-btn"
              aria-label="Select language"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                background: "#f8f9fa",
                border: "1px solid #e2e8f0",
                cursor: "pointer",
                padding: "6px 10px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 700,
                color: "#333333",
                transition: "all 0.2s ease",
              }}
              onClick={() => {
                setLangOpen(!langOpen);
                setSearchOpen(false);
                setPhoneOpen(false);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              <span>{locale === "vi" ? "VI" : "EN"}</span>
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                <path d="M4 5L0.535899 0.499999L7.4641 0.5L4 5Z" fill="#444444" />
              </svg>
            </button>

            {langOpen && (
              <div
                className="dropdown-menu"
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  right: 0,
                  left: "auto",
                  minWidth: "160px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.12)",
                  borderRadius: "8px",
                  padding: "6px 0",
                  zIndex: 1005,
                  border: "1px solid #e2e8f0",
                }}
              >
                <button
                  type="button"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "9px 14px",
                    background: locale === "vi" ? "#fff7ed" : "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: locale === "vi" ? 700 : 500,
                    color: locale === "vi" ? "#ea580c" : "#333",
                    textAlign: "left",
                  }}
                  onClick={() => switchLocale("vi")}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>🇻🇳</span>
                    <span>Tiếng Việt</span>
                  </span>
                  {locale === "vi" && <span style={{ color: "#ea580c" }}>✓</span>}
                </button>
                <button
                  type="button"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "9px 14px",
                    background: locale === "en" ? "#fff7ed" : "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: locale === "en" ? 700 : 500,
                    color: locale === "en" ? "#ea580c" : "#333",
                    textAlign: "left",
                  }}
                  onClick={() => switchLocale("en")}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>🇬🇧</span>
                    <span>English</span>
                  </span>
                  {locale === "en" && <span style={{ color: "#ea580c" }}>✓</span>}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
