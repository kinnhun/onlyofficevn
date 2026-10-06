"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { FlagVi } from "@/components/HeaderFlags";
import FooterCompanyInfo from "./FooterCompanyInfo";
import FooterApps from "./FooterApps";

export default function Footer() {
  const t = useTranslations("footer");
  const tBranding = useTranslations("branding");
  const locale = useLocale();
  const isVi = locale === "vi";

  // Accordion state for mobile devices (< 768px)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    apps: false,
    pricing: false,
    solutions: false,
    support: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getSafeBranding = (key: string, fallback: string) => {
    try {
      return tBranding.has(key) ? tBranding(key) : fallback;
    } catch {
      return fallback;
    }
  };

  const navColumns = [
    {
      id: "apps",
      title: isVi ? "Ứng Dụng & Soạn Thảo" : "Apps & Editors",
      links: [
        { label: isVi ? "Soạn thảo văn bản (DOCX)" : "Document Editor (DOCX)", href: "/soan-thao-van-ban" },
        { label: isVi ? "Bảng tính trực tuyến (XLSX)" : "Spreadsheet Editor (XLSX)", href: "/spreadsheet-editor" },
        { label: isVi ? "Trình chiếu thuyết trình (PPTX)" : "Presentation Maker (PPTX)", href: "/thuyet-trinh" },
        { label: isVi ? "Chỉnh sửa & Chuyển đổi PDF" : "PDF Editor & Converter", href: "/chinh-sua-pdf" },
        { label: isVi ? "Tạo biểu mẫu trực tuyến (OFORM)" : "Online Form Creator (OFORM)", href: "/tao-bieu-mau" },
        { label: isVi ? "Xem sơ đồ trực quan (Visio)" : "Diagram Viewer (Visio)", href: "/xem-so-do" },
      ],
    },
    {
      id: "pricing",
      title: isVi ? "Bảng Giá & Bản Quyền" : "Pricing & Licenses",
      links: [
        { label: isVi ? "Bảng giá bản quyền ONLYOFFICE" : "Official ONLYOFFICE Pricing", href: "/pricing" },
        { label: isVi ? "Key Online vĩnh viễn theo Main" : "Lifetime Online Key (Hardware Bound)", href: "/pricing#packages" },
        { label: isVi ? "Tem cào Hologram 7 màu vật lý" : "Physical Hologram Sticker License", href: "/pricing#addons" },
        { label: isVi ? "Chính sách đại lý & phân phối" : "Dealer & Partner Program", href: "/partners" },
        { label: isVi ? "Trải nghiệm bản Demo tương tác" : "Interactive Product Demo", href: "/demo" },
      ],
    },
    {
      id: "solutions",
      title: isVi ? "Giải Pháp Doanh Nghiệp" : "Enterprise Solutions",
      links: [
        { label: isVi ? "Triển khai On-Premises & Private Cloud" : "On-Premises & Private Cloud", href: "/pricing" },
        { label: isVi ? "Hợp thức hóa bản quyền & Kiểm toán IT" : "Software Legalization & IT Audit", href: "/pricing#guarantees" },
        { label: isVi ? "Cộng tác tài liệu thời gian thực" : "Real-time Collaboration", href: "/seamless-collaboration" },
        { label: isVi ? "Cẩm nang & Tin tức công nghệ" : "Tech Insights & Blog", href: "/blog" },
        { label: isVi ? "Tài liệu & Hướng dẫn kỹ thuật" : "Documentation & User Guides", href: "/docs" },
      ],
    },
    {
      id: "support",
      title: isVi ? "Hỗ Trợ & Liên Hệ" : "Support & Contact",
      links: [
        { label: isVi ? "Hotline CSKH: 0763.068.614" : "Hotline Support: 0763.068.614", href: "tel:0763068614", isExternal: true },
        { label: isVi ? "Kỹ sư Mercy Tech hỗ trợ 1-1" : "Mercy Tech 1-on-1 Engineering Support", href: "https://www.messenger.com/t/286163107904324", isExternal: true },
        { label: isVi ? "Email: contact@mercytechglobal.com" : "Email: contact@mercytechglobal.com", href: "mailto:contact@mercytechglobal.com", isExternal: true },
        { label: isVi ? "Trụ sở: 175/3 Nguyễn Thị Be, TP.HCM" : "HQ: 175/3 Nguyen Thi Be, HCMC", href: "#" },
        { label: isVi ? "Trung tâm trợ giúp ONLYOFFICE" : "ONLYOFFICE Help Center", href: "/docs" },
      ],
    },
  ];



  return (
    <footer id="global-footer" className="oo-main-footer">
      <div className="oo-footer-container">
        {/* 1. App Download Pills */}
        <FooterApps title={isVi ? "Tải ứng dụng miễn phí" : "Get Free Apps"} />

        {/* 2. Structured Link Columns with Mobile Accordion */}
        <div className="oo-footer-nav-grid">
          {navColumns.map((col) => {
            const isOpen = !!openSections[col.id];
            return (
              <div key={col.id} className="oo-footer-nav-col">
                <div
                  className="oo-footer-nav-title"
                  onClick={() => toggleSection(col.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                >
                  <span>{col.title}</span>
                  <span className={`oo-footer-nav-chevron ${isOpen ? "open" : ""}`}>
                    <ChevronDown size={16} />
                  </span>
                </div>

                <ul className={`oo-footer-nav-links ${!isOpen ? "collapsed" : ""}`}>
                  {col.links.map((link, idx) => (
                    <li key={idx}>
                      {link.isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="oo-footer-nav-link"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className="oo-footer-nav-link">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* 3. Mercy Tech Official Company & Contact Info */}
        <FooterCompanyInfo />



        {/* 5. Bottom Bar: Language Selector & Official Copyright */}
        <div className="oo-footer-bottom-bar">
          {/* Reusable Language Selector Component */}
          <LanguageSwitcher variant="footer" />

          {/* Copyright & Distributor Branding */}
          <div className="oo-footer-bottom-copyright">
            <div style={{ color: "#334155", fontWeight: 600 }}>
              © Ascensio System SIA 2009-2026. {t("rights")}
            </div>
            <div style={{ color: "#ea580c", fontWeight: 700, fontSize: "12px", marginTop: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
              <FlagVi width={16} height={11} />
              <span>{getSafeBranding("distributor", "Đơn vị phân phối tại Việt Nam")} • {getSafeBranding("optimizedBy", "Tối ưu bởi Mercy Tech")}</span>
            </div>
            <div style={{ color: "#64748b", fontSize: "11px", marginTop: "3px" }}>
              {getSafeBranding("company", "CÔNG TY TNHH CÔNG NGHỆ MERCY")} • {getSafeBranding("mst", "MST: 0319227767")} • {getSafeBranding("hotlineNamed", "0763.068.614 (CSKH MERCY TECH)")} • {getSafeBranding("email", "contact@mercytechglobal.com")}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
