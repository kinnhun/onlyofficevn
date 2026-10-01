"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/routing";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);

  const switchLocale = (newLocale: "vi" | "en") => {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
  };

  const appPills = [
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
          <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
            iOS
          </text>
        </svg>
      ),
    },
  ];

  return (
    <footer
      style={{
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #e0e0e0",
        padding: "60px 0 40px",
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
        {/* GET FREE APPS Section */}
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
            {t("getFreeApps")}
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
                  borderRadius: "6px",
                  color: "#333333",
                  fontSize: "13px",
                  fontWeight: 500,
                  textDecoration: "none",
                  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.03)",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "4px",
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

        {/* 5 Columns of Links matching official structure */}
        <div
          className="footer-columns-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "28px",
            marginBottom: "56px",
          }}
        >
          {/* Column 1: TEMPLATES, CONVERTERS, GET NEWS */}
          <div>
            <h4 style={headingStyle}>TEMPLATES</h4>
            <ul style={listStyle}>
              <li><a href="https://templates.onlyoffice.com/pdf-form-templates" target="_blank" rel="noopener noreferrer" style={linkStyle}>PDF form templates</a></li>
              <li><a href="https://templates.onlyoffice.com/document-templates" target="_blank" rel="noopener noreferrer" style={linkStyle}>Text document templates</a></li>
              <li><a href="https://templates.onlyoffice.com/spreadsheet-templates" target="_blank" rel="noopener noreferrer" style={linkStyle}>Spreadsheet templates</a></li>
              <li><a href="https://templates.onlyoffice.com/presentation-templates" target="_blank" rel="noopener noreferrer" style={linkStyle}>Presentation templates</a></li>
            </ul>

            <h4 style={{ ...headingStyle, marginTop: "24px" }}>CONVERTERS</h4>
            <ul style={listStyle}>
              <li><Link href="/text-file-converter" style={linkStyle}>Convert text files</Link></li>
              <li><Link href="/spreadsheet-converter" style={linkStyle}>Convert spreadsheets</Link></li>
              <li><Link href="/presentation-converter" style={linkStyle}>Convert presentations</Link></li>
              <li><Link href="/pdf-converter" style={linkStyle}>Convert PDFs</Link></li>
            </ul>

            <h4 style={{ ...headingStyle, marginTop: "24px" }}>GET NEWS</h4>
            <ul style={listStyle}>
              <li><a href="https://www.onlyoffice.com/blog" target="_blank" rel="noopener noreferrer" style={linkStyle}>Blog</a></li>
            </ul>
          </div>

          {/* Column 2: FOR EDUCATION, FOR NON-PROFITS, COLLABORATE */}
          <div>
            <h4 style={headingStyle}>FOR EDUCATION</h4>
            <ul style={listStyle}>
              <li><Link href="/office-for-students" style={linkStyle}>For students</Link></li>
              <li><Link href="/office-for-educators" style={linkStyle}>For educators</Link></li>
            </ul>

            <h4 style={{ ...headingStyle, marginTop: "24px" }}>FOR NON-PROFITS</h4>
            <ul style={listStyle}>
              <li><Link href="/nonprofit-organizations" style={linkStyle}>Features and tools</Link></li>
              <li><Link href="/nonprofit-registration" style={linkStyle}>Request free account</Link></li>
            </ul>

            <h4 style={{ ...headingStyle, marginTop: "24px" }}>COLLABORATE</h4>
            <ul style={listStyle}>
              <li><Link href="/contribute" style={linkStyle}>For contributors</Link></li>
              <li><a href="https://helpcenter.onlyoffice.com/guides/become-translator.aspx" target="_blank" rel="noopener noreferrer" style={linkStyle}>For translators</a></li>
              <li><Link href="/influencers" style={linkStyle}>For influencers</Link></li>
              <li><Link href="/vacancies" style={linkStyle}>Vacancies</Link></li>
            </ul>
          </div>

          {/* Column 3: SECURITY, GET HELP */}
          <div>
            <h4 style={headingStyle}>SECURITY</h4>
            <ul style={listStyle}>
              <li><Link href="/security" style={linkStyle}>Features and tools</Link></li>
            </ul>

            {/* Badges */}
            <div style={{ display: "flex", gap: "12px", margin: "10px 0 20px", alignItems: "center" }}>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  backgroundImage: "url(https://static-site.onlyoffice.com/public/images/templates/main/security/features.svg?ver=4)",
                  backgroundPosition: "-80px 0px",
                  backgroundSize: "160px 40px",
                  backgroundRepeat: "no-repeat",
                }}
                title="HIPAA Compliant"
              />
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  backgroundImage: "url(https://static-site.onlyoffice.com/public/images/templates/main/security/features.svg?ver=4)",
                  backgroundPosition: "0px 0px",
                  backgroundSize: "160px 40px",
                  backgroundRepeat: "no-repeat",
                }}
                title="GDPR Compliant"
              />
            </div>

            <h4 style={headingStyle}>GET HELP</h4>
            <ul style={listStyle}>
              <li><a href="https://community.onlyoffice.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>Community</a></li>
              <li><a href="https://helpcenter.onlyoffice.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>Help Center</a></li>
              <li><Link href="/academy" style={linkStyle}>ONLYOFFICE Academy</Link></li>
              <li><Link href="/webinars" style={linkStyle}>Webinars</Link></li>
              <li><Link href="/whitepapers" style={linkStyle}>White papers</Link></li>
              <li><Link href="/support-contact-form" style={linkStyle}>Support contact form</Link></li>
              <li><Link href="/demo-order" style={linkStyle}>Order demo</Link></li>
              <li><Link href="/legalterms" style={linkStyle}>Legal notice</Link></li>
            </ul>
          </div>

          {/* Column 4: COMPARISON */}
          <div>
            <h4 style={headingStyle}>COMPARISON</h4>
            <ul style={listStyle}>
              <li><Link href="/best-microsoft-office-alternative" style={linkStyle}>ONLYOFFICE Docs vs MS Office Online</Link></li>
              <li><Link href="/best-google-docs-alternative" style={linkStyle}>ONLYOFFICE Docs vs Google Docs</Link></li>
              <li><Link href="/best-zoho-docs-alternative" style={linkStyle}>ONLYOFFICE Docs vs Zoho Docs</Link></li>
              <li><Link href="/best-libreoffice-alternative" style={linkStyle}>ONLYOFFICE Docs vs LibreOffice</Link></li>
              <li><Link href="/best-wps-alternative" style={linkStyle}>ONLYOFFICE Docs vs WPS</Link></li>
              <li><Link href="/best-adobe-alternative" style={linkStyle}>ONLYOFFICE Docs vs Adobe Acrobat</Link></li>
              <li><Link href="/best-hancom-alternative" style={linkStyle}>ONLYOFFICE Docs vs Hancom</Link></li>
            </ul>
          </div>

          {/* Column 5: CONTACT US */}
          <div>
            <h4 style={headingStyle}>CONTACT US</h4>
            <ul style={listStyle}>
              <li style={{ fontSize: "12px", color: "#666666", marginBottom: "2px" }}>Sales questions</li>
              <li style={{ marginBottom: "12px" }}>
                <a href="mailto:sales@onlyoffice.com" style={{ ...linkStyle, color: "#ff6f3d", textDecoration: "underline" }}>
                  sales@onlyoffice.com
                </a>
              </li>

              <li style={{ fontSize: "12px", color: "#666666", marginBottom: "2px" }}>Partner inquiries</li>
              <li style={{ marginBottom: "12px" }}>
                <a href="mailto:partners@onlyoffice.com" style={{ ...linkStyle, color: "#ff6f3d", textDecoration: "underline" }}>
                  partners@onlyoffice.com
                </a>
              </li>

              <li style={{ fontSize: "12px", color: "#666666", marginBottom: "2px" }}>Press inquiries</li>
              <li style={{ marginBottom: "16px" }}>
                <a href="mailto:press@onlyoffice.com" style={{ ...linkStyle, color: "#ff6f3d", textDecoration: "underline" }}>
                  press@onlyoffice.com
                </a>
              </li>

              <li>
                <Link href="/call-back-form" style={{ ...linkStyle, color: "#333333", fontWeight: 700 }}>
                  Request a call
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Follow us + Copyright */}
        <div
          style={{
            borderTop: "1px solid #e0e0e0",
            paddingTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {/* Social Icons with official vector styling */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#666666", marginRight: "4px" }}>
              FOLLOW US ON:
            </span>
            {[
              { title: "Email", href: "mailto:sales@onlyoffice.com", icon: "✉" },
              { title: "WordPress", href: "https://www.onlyoffice.com/blog", icon: "W" },
              { title: "X", href: "https://x.com/ONLY_OFFICE", icon: "𝕏" },
              { title: "Discord", href: "https://discord.gg/Hcgtf5n4uF", icon: "💬" },
              { title: "YouTube", href: "https://www.youtube.com/user/onlyofficeTV", icon: "▶" },
              { title: "TikTok", href: "https://www.tiktok.com/@only_office", icon: "♪" },
              { title: "GitHub", href: "https://github.com/ONLYOFFICE", icon: "🐙" },
              { title: "LinkedIn", href: "https://www.linkedin.com/company/ascensio-system-sia/", icon: "in" },
              { title: "Facebook", href: "https://www.facebook.com/pages/OnlyOffice/833032526736775", icon: "f" },
              { title: "Medium", href: "https://medium.com/onlyoffice", icon: "M" },
              { title: "Mastodon", href: "https://fosstodon.org/@onlyoffice", icon: "m" },
              { title: "Telegram", href: "https://t.me/onlyofficeofficial", icon: "✈" },
              { title: "Instagram", href: "https://www.instagram.com/only_office/", icon: "📷" },
            ].map((s) => (
              <a
                key={s.title}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.title}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "26px",
                  height: "26px",
                  borderRadius: "4px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #dcdcdc",
                  color: "#555555",
                  fontSize: "12px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Right Side: Language + Copyright */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div style={{ position: "relative" }}>
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  background: "#ffffff",
                  border: "1px solid #dcdcdc",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  color: "#333333",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>{locale === "vi" ? "🇻🇳 Tiếng Việt" : "🇬🇧 English"}</span>
                <span style={{ fontSize: "10px", color: "#888" }}>▼</span>
              </button>

              {langOpen && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "100%",
                    right: 0,
                    marginBottom: "8px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                    borderRadius: "6px",
                    padding: "6px 0",
                    minWidth: "150px",
                    border: "1px solid #eee",
                    zIndex: 100,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => switchLocale("vi")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 14px",
                      background: locale === "vi" ? "#fff7ed" : "none",
                      border: "none",
                      fontSize: "13px",
                      fontWeight: locale === "vi" ? 700 : 500,
                      color: locale === "vi" ? "#ea580c" : "#333333",
                      cursor: "pointer",
                    }}
                  >
                    <span>🇻🇳 Tiếng Việt</span>
                    {locale === "vi" && <span style={{ color: "#ea580c" }}>✓</span>}
                  </button>
                  <button
                    type="button"
                    onClick={() => switchLocale("en")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 14px",
                      background: locale === "en" ? "#fff7ed" : "none",
                      border: "none",
                      fontSize: "13px",
                      fontWeight: locale === "en" ? 700 : 500,
                      color: locale === "en" ? "#ea580c" : "#333333",
                      cursor: "pointer",
                    }}
                  >
                    <span>🇬🇧 English</span>
                    {locale === "en" && <span style={{ color: "#ea580c" }}>✓</span>}
                  </button>
                </div>
              )}
            </div>

            <div style={{ fontSize: "12px", color: "#888888", textAlign: "right" }}>
              © Ascensio System SIA 2009-2026. {t("rights")}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const headingStyle: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  color: "#333333",
  margin: "0 0 14px",
};

const listStyle: React.CSSProperties = {
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const linkStyle: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: 1.45,
  color: "#444444",
  textDecoration: "none",
  transition: "color 0.2s ease",
};

