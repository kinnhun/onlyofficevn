"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/routing";

import FooterApps from "./FooterApps";
import FooterCompanyInfo from "./FooterCompanyInfo";

export default function Footer() {
  const t = useTranslations("footer");
  const tBranding = useTranslations("branding");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);

  const switchLocale = (newLocale: "vi" | "en") => {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
  };

  const getSafeBranding = (key: string, fallback: string) => {
    try {
      return tBranding.has(key) ? tBranding(key) : fallback;
    } catch {
      return fallback;
    }
  };

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
        <FooterApps title={t("getFreeApps")} />

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

        {/* Mercy Tech Official Company & Contact Info */}
        <FooterCompanyInfo />

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
              <div>© Ascensio System SIA 2009-2026. {t("rights")}</div>
              <div style={{ marginTop: "6px", color: "#ff6f3d", fontWeight: 700, fontSize: "12px" }}>
                🇻🇳 {getSafeBranding("distributor", "Đơn vị phân phối tại Việt Nam")} • {getSafeBranding("optimizedBy", "Tối ưu bởi Mercy Tech")}
              </div>
              <div style={{ marginTop: "2px", color: "#64748b", fontSize: "11px" }}>
                {getSafeBranding("company", "CÔNG TY TNHH CÔNG NGHỆ MERCY")} • {getSafeBranding("hotlineNamed", "0763.068.614 (Mr. Hùng)")} • {getSafeBranding("email", "ketoan.mercy@gmail.com")}
              </div>
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

