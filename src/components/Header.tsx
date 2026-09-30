"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface DropdownItem {
  title: string;
  desc?: string;
  href: string;
}

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const headerRef = useRef<HTMLElement>(null);

  const menuData: Record<string, DropdownItem[]> = {
    products: [
      { title: "ONLYOFFICE Docs", desc: "Online document, spreadsheet, and presentation editors", href: "/office-suite" },
      { title: "ONLYOFFICE DocSpace", desc: "Room-based document collaboration and sharing", href: "/docspace" },
      { title: "ONLYOFFICE Desktop Editors", desc: "Free office apps for Windows, macOS, and Linux", href: "/desktop" },
      { title: "ONLYOFFICE Mobile Apps", desc: "Free office apps for iOS and Android", href: "/download-desktop#mobile" },
      { title: "ONLYOFFICE Workspace", desc: "Complete productivity platform for your enterprise", href: "/workspace" },
    ],
    enterprise: [
      { title: "ONLYOFFICE Docs Enterprise", desc: "Scalable online office for enterprise private servers", href: "/docs-enterprise" },
      { title: "ONLYOFFICE DocSpace Enterprise", desc: "Self-hosted secure document collaboration room platform", href: "/docspace-enterprise" },
      { title: "Security & Compliance", desc: "GDPR, HIPAA, multi-layer encryption and audits", href: "/security" },
    ],
    developers: [
      { title: "Developer Edition", desc: "Seamlessly integrate office suite into your SaaS", href: "/developer-edition" },
      { title: "DocSpace for Developers", desc: "Embed collaboration rooms with full API control", href: "/docspace-developer" },
      { title: "API Documentation", desc: "Comprehensive guides, plugins, and SDK documentation", href: "/api-documentation" },
    ],
    pricing: [
      { title: "Docs Enterprise Pricing", desc: "Lifetime and subscription licenses for server", href: "/docs-enterprise-prices" },
      { title: "DocSpace Cloud & On-Premises", desc: "Flexible plans for teams of any size", href: "/docspace-prices" },
      { title: "Developer Edition Pricing", desc: "Tailored pricing for ISVs and SaaS builders", href: "/developer-edition-prices" },
    ],
    partners: [
      { title: "Reseller Program", desc: "Become a partner and distribute ONLYOFFICE solutions", href: "/resellers" },
      { title: "Technology Partners", desc: "Integrate ONLYOFFICE with your own software products", href: "/technology-partners" },
      { title: "Hosting Providers", desc: "Offer ONLYOFFICE SaaS to your customers", href: "/hosting-providers" },
    ],
    resources: [
      { title: "Blog & Updates", desc: "Latest releases, tutorials, and success stories", href: "/blog" },
      { title: "Webinars & Videos", desc: "Interactive demos, tips, and feature walkthroughs", href: "/webinars" },
      { title: "Help Center & Forums", desc: "Get help from the ONLYOFFICE support team and community", href: "/helpcenter" },
      { title: "Events & Conferences", desc: "Meet the ONLYOFFICE team in person worldwide", href: "/events" },
    ],
    download: [
      { title: "Desktop Editors", desc: "Windows, Linux, macOS", href: "/download-desktop" },
      { title: "Mobile Apps", desc: "iOS, Android", href: "/download-desktop#mobile" },
      { title: "Server Solutions", desc: "Docker, DEB, RPM, Kubernetes", href: "/download" },
      { title: "Ready-to-use Connectors", desc: "Nextcloud, ownCloud, Jira, Moodle, etc.", href: "/all-connectors" },
    ],
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "es", name: "Español" },
    { code: "pt", name: "Português" },
    { code: "it", name: "Italiano" },
    { code: "cs", name: "Čeština" },
    { code: "nl", name: "Nederlands" },
    { code: "ja", name: "日本語" },
    { code: "zh", name: "中文" },
    { code: "ru", name: "Русский" },
    { code: "sr", name: "Srpski" },
    { code: "ar", name: "العربية" },
  ];

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
            {["products", "enterprise", "developers", "pricing", "partners", "resources"].map((item) => (
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
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 5L0.535899 0.499999L7.4641 0.5L4 5Z" fill="#444444" />
                  </svg>
                </button>

                {activeMenu === item && (
                  <div className="dropdown-menu">
                    {menuData[item]?.map((subItem) => (
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
                Download
                <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 5L0.535899 0.499999L7.4641 0.5L4 5Z" fill="#444444" />
                </svg>
              </button>

              {activeMenu === "download" && (
                <div className="dropdown-menu">
                  {menuData.download.map((subItem) => (
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

            <Link
              className="oo-header-btn en"
              href="/docspace-registration"
              style={{
                whiteSpace: "nowrap",
                flexWrap: "nowrap",
                width: "auto",
                minWidth: "fit-content",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 16px",
                height: "38px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#333333",
                textDecoration: "none",
                lineHeight: "1",
              }}
            >
              Log in <span style={{ margin: "0 4px", opacity: 0.6 }}>/</span> Sign up
            </Link>
          </div>

          <a className="oo-header-menu-phone-mobile en" href="tel:+37163399867" style={{ marginTop: "12px" }}>
            <span dir="ltr">+371 633 998 67</span>
          </a>
        </nav>

        {/* Right Icon Actions (Search, Phone, Language) */}
        <div className="oo-header-icons en" style={{ position: "relative" }}>
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
                right: 0,
                left: "auto",
                minWidth: "300px",
                padding: "16px",
              }}
            >
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="text"
                  placeholder="Search ONLYOFFICE..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                  autoFocus
                />
                <button
                  className="Button-module-scss-module__VLzsWq__button Button-module-scss-module__VLzsWq__variant-primary"
                  style={{ height: "36px", padding: "0 14px", fontSize: "13px" }}
                >
                  Go
                </button>
              </div>
            </div>
          )}

          {/* Phone Selector */}
          <div className="oo-phone-selector en">
            <button
              className="oo-phone-selector-btn"
              aria-label="Open phone menu"
              onClick={() => {
                setPhoneOpen(!phoneOpen);
                setSearchOpen(false);
                setLangOpen(false);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6.79439 3.00858C6.50199 2.97044 6.24775 3.05949 6.03168 3.27535L3.51483 5.80972C3.38771 5.92405 3.27957 6.07328 3.19068 6.25748C3.10167 6.44169 3.04446 6.62268 3.01907 6.80047C3.01907 6.81317 3.0158 6.85138 3.00944 6.91492C3.00312 6.97835 2.99988 7.06092 2.99988 7.16255C2.99988 7.40398 3.04119 7.79465 3.12385 8.33455C3.20651 8.87445 3.40993 9.535 3.73402 10.3162C4.05817 11.0976 4.54446 11.9836 5.1927 12.9745C5.84091 13.9653 6.7308 15.0198 7.86219 16.1377C8.73931 17.0269 9.57829 17.7637 10.3791 18.3481C11.18 18.9325 11.9204 19.4025 12.6005 19.7582C13.2806 20.1139 13.8971 20.3807 14.4501 20.5586C15.0031 20.7364 15.4798 20.8571 15.8802 20.9206C16.2806 20.9841 16.5952 21.0095 16.824 20.9968C17.0529 20.9841 17.18 20.9778 17.2054 20.9778C17.3834 20.9524 17.5645 20.8952 17.7488 20.8063C17.9331 20.7173 18.0825 20.6094 18.1969 20.4823L20.7329 17.948C20.9109 17.7701 20.9999 17.5669 20.9999 17.3382C20.9999 17.1731 20.9522 17.027 20.8569 16.8999C20.7615 16.7729 20.6439 16.6649 20.5041 16.576L16.6334 14.5371C16.43 14.4227 16.2075 14.391 15.966 14.4418C15.7245 14.4926 15.5211 14.6006 15.3558 14.7657L14.4215 15.6994C14.3961 15.7248 14.3548 15.7471 14.2976 15.7661C14.2404 15.7852 14.1927 15.7947 14.1546 15.7947C13.8876 15.7439 13.5825 15.6296 13.2393 15.4517C12.9342 15.2993 12.5624 15.0643 12.1238 14.7467C11.6853 14.4291 11.18 13.9781 10.608 13.3937C10.0232 12.8221 9.56878 12.3139 9.24457 11.8693C8.92054 11.4248 8.6821 11.0531 8.52956 10.7545C8.37702 10.456 8.28486 10.2273 8.25317 10.0686L8.20547 9.83046C8.20547 9.80505 8.21504 9.76367 8.23407 9.70656C8.25317 9.6494 8.27539 9.60811 8.30084 9.58267L9.40677 8.49655C9.61013 8.26776 9.71182 8.00111 9.71182 7.69619C9.71183 7.48017 9.67372 7.30877 9.59742 7.18173L9.59742 7.16271L7.42369 3.48506C7.25831 3.21819 7.04863 3.05942 6.79439 3.00858Z"
                  fill="#444444"
                />
              </svg>
            </button>

            {phoneOpen && (
              <div
                className="dropdown-menu"
                style={{
                  right: 0,
                  left: "auto",
                  minWidth: "240px",
                  padding: "16px",
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: "8px", fontSize: "14px" }}>Contact Sales</div>
                <div style={{ marginBottom: "8px" }}>
                  <div style={{ fontSize: "12px", color: "#888" }}>Global / Europe</div>
                  <a href="tel:+37163399867" style={{ color: "#ff6f3d", fontWeight: 600, fontSize: "14px" }}>
                    +371 633 998 67
                  </a>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#888" }}>US & Canada</div>
                  <a href="tel:+18002855430" style={{ color: "#ff6f3d", fontWeight: 600, fontSize: "14px" }}>
                    +1 800 285 5430
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="oo-language-selector">
            <button
              className="oo-language-selector-btn"
              aria-label="Select language"
              onClick={() => {
                setLangOpen(!langOpen);
                setSearchOpen(false);
                setPhoneOpen(false);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="oo-language-selector-icon-stroke" cx="12.4999" cy="12.5" r="9" stroke="#444444" />
                <path
                  className="oo-language-selector-icon-stroke"
                  d="M12.4999 7.5C15.0512 7.5 17.3364 8.1001 18.9667 9.04395C20.6099 9.99529 21.4999 11.2348 21.4999 12.5C21.4999 13.7652 20.6099 15.0047 18.9667 15.9561C17.3364 16.8999 15.0512 17.5 12.4999 17.5C9.94851 17.5 7.66337 16.8999 6.03308 15.9561C4.38985 15.0047 3.49988 13.7652 3.49988 12.5C3.49988 11.2348 4.38985 9.99529 6.03308 9.04395C7.66337 8.1001 9.94851 7.5 12.4999 7.5Z"
                  stroke="#444444"
                />
                <path
                  className="oo-language-selector-icon-stroke"
                  d="M17.4999 12.5C17.4999 15.0514 16.8998 17.3365 15.9559 18.9668C15.0046 20.61 13.7651 21.5 12.4999 21.5C11.2347 21.5 9.99517 20.61 9.04382 18.9668C8.09997 17.3365 7.49988 15.0514 7.49988 12.5C7.49988 9.94863 8.09998 7.66349 9.04382 6.0332C9.99517 4.38997 11.2347 3.5 12.4999 3.5C13.7651 3.5 15.0046 4.38997 15.9559 6.0332C16.8998 7.66349 17.4999 9.94863 17.4999 12.5Z"
                  stroke="#444444"
                />
                <path fillRule="evenodd" clipRule="evenodd" d="M20.9999 13H3.99988V12H20.9999V13Z" fill="#444444" />
                <path fillRule="evenodd" clipRule="evenodd" d="M11.9999 21L11.9999 4L12.9999 4L12.9999 21L11.9999 21Z" fill="#444444" />
              </svg>
              <svg className="oo-language-selector-icon-arrow" width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M4 5L0.535899 0.499999L7.4641 0.5L4 5Z" fill="#444444" />
              </svg>
            </button>

            {langOpen && (
              <div
                className="dropdown-menu"
                style={{
                  right: 0,
                  left: "auto",
                  minWidth: "160px",
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    className="dropdown-item"
                    style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer" }}
                    onClick={() => setLangOpen(false)}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
