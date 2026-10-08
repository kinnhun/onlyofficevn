"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Key, Check, Sparkles, Laptop, Lock, PhoneCall } from "lucide-react";

interface PricingKeyCardsProps {
  onOpenQuote: (pkgName?: string) => void;
}

export default function PricingKeyCards({ onOpenQuote }: PricingKeyCardsProps) {
  const t = useTranslations("pricingKeyCards");
  const locale = useLocale();
  const isVi = locale === "vi";

  return (
    <section className="pricing-key-section">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Top Showcase: Brand + Laptop Mockup */}
        <div className="retail-top-banner">
          {/* Left: Branding & Value */}
          <div className="retail-top-info">
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
              <span
                style={{
                  backgroundColor: "#fff7ed",
                  color: "#ff6f3d",
                  border: "1px solid #fed7aa",
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "4px 12px",
                  borderRadius: "20px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Key size={13} color="#ff6f3d" />
                <span>{t("badge")}</span>
              </span>
            </div>

            <h2 className="retail-top-title">
              {t("titlePrefix")}{" "}
              <span style={{ color: "#ff6f3d" }}>{t("titleHighlight")}</span>
            </h2>

            <p className="retail-top-desc">
              {t("desc")}
            </p>

            <div className="retail-top-features">
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Check size={16} color="#16a34a" style={{ flexShrink: 0 }} />
                <span>{t("featUuid")}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Check size={16} color="#16a34a" style={{ flexShrink: 0 }} />
                <span>{t("featVat")}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Check size={16} color="#16a34a" style={{ flexShrink: 0 }} />
                <span>{t("featAgpl")}</span>
              </div>
            </div>
          </div>

          {/* Right: Laptop Portal Preview */}
          <div className="retail-top-laptop-wrap">
            <div className="retail-laptop-frame">
              <div className="retail-laptop-screen">
                {/* Top Bar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f0f0", paddingBottom: "6px", marginBottom: "8px", flexWrap: "wrap", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 700, color: "#333333" }}>
                    <Laptop size={13} color="#ff6f3d" />
                    <span>ONLYOFFICE Key Management</span>
                  </div>
                  <span style={{ fontSize: "9.5px", color: "#ff6f3d", backgroundColor: "#fff7ed", padding: "1px 6px", borderRadius: "3px", fontWeight: 700 }}>
                    {isVi ? "Hệ Thống Quản Lý" : "Management Portal"}
                  </span>
                </div>

                {/* 4 Stats */}
                <div className="retail-laptop-stats">
                  <div style={{ backgroundColor: "#f9f9f9", padding: "4px 2px", borderRadius: "4px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "#333333" }}>320</div>
                    <div style={{ fontSize: "9px", color: "#888888" }}>{isVi ? "Tổng key" : "Total Keys"}</div>
                  </div>
                  <div style={{ backgroundColor: "#f0fdf4", padding: "4px 2px", borderRadius: "4px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "#16a34a" }}>298</div>
                    <div style={{ fontSize: "9px", color: "#16a34a" }}>{isVi ? "Kích hoạt" : "Activated"}</div>
                  </div>
                  <div style={{ backgroundColor: "#fffbeb", padding: "4px 2px", borderRadius: "4px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "#d97706" }}>22</div>
                    <div style={{ fontSize: "9px", color: "#d97706" }}>{isVi ? "Đang chờ" : "Pending"}</div>
                  </div>
                  <div style={{ backgroundColor: "#fef2f2", padding: "4px 2px", borderRadius: "4px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "#dc2626" }}>0</div>
                    <div style={{ fontSize: "9px", color: "#dc2626" }}>{isVi ? "Hết hạn" : "Expired"}</div>
                  </div>
                </div>

                {/* Sample Device Rows */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {[
                    { name: "Dell Latitude 5520", id: "UUID-4F9A-8B2E", status: isVi ? "Hoạt động" : "Active" },
                    { name: "ThinkPad T14 Gen 3", id: "UUID-7C1D-3A4F", status: isVi ? "Hoạt động" : "Active" },
                    { name: "HP EliteBook 840 G8", id: "UUID-2E5B-9C0A", status: isVi ? "Hoạt động" : "Active" },
                  ].map((dev, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "10px", padding: "3px 6px", backgroundColor: "#f9f9f9", borderRadius: "3px" }}>
                      <div>
                        <span style={{ fontWeight: 600, color: "#333333" }}>{dev.name}</span>
                        <span style={{ color: "#999999", marginLeft: "4px", fontSize: "9px" }}>({dev.id})</span>
                      </div>
                      <span style={{ color: "#16a34a", fontWeight: 700, fontSize: "9px" }}>✓ {dev.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Package Cards (Confidential Quote) */}
        <div>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <h3 className="retail-packages-title">
              {isVi ? "Các Gói Bản Quyền Key Online Theo Số Lượng" : "Online License Packages by Volume"}
            </h3>
            <p className="retail-packages-subtitle">
              {isVi
                ? "Chính sách chiết khấu theo số lượng thiết bị • Vui lòng liên hệ để nhận bảng giá ưu đãi mới nhất"
                : "Volume discounts according to fleet size • Contact us to receive official pricing"}
            </p>
          </div>

          <div className="retail-cards-grid">
            {/* Card 1: 1 - 4 Key */}
            <div className="retail-card">
              <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#888888", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {t("tier1Badge")}
              </div>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#333333", margin: "4px 0 16px" }}>
                {isVi ? "Từ 1 – 4 Key" : "1 – 4 Keys"}
              </div>

              {/* Quote Placeholder */}
              <div style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #f0f0f0" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#f9f9f9", padding: "6px 12px", borderRadius: "6px", border: "1px solid #e5e5e5" }}>
                  <Lock size={15} color="#ea580c" />
                  <span style={{ fontSize: "15px", fontWeight: 800, color: "#333333" }}>{t("tier1Price")}</span>
                </div>
                <div style={{ fontSize: "12px", color: "#16a34a", fontWeight: 700, marginTop: "6px" }}>
                  {isVi ? "✓ ĐÃ BAO GỒM 10% VAT" : "✓ 10% VAT INCLUDED"}
                </div>
              </div>

              {/* Features */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#444444" }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{isVi ? "Bản quyền vĩnh viễn theo Mainboard máy" : "Perpetual license per Motherboard"}</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#444444" }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{isVi ? "Kích hoạt nhanh chóng trong 30 giây" : "Instant activation in 30 seconds"}</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#444444" }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{isVi ? "Cài lại win tự động kích hoạt lại" : "Preserved on Windows re-installation"}</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#444444" }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{isVi ? "Hỗ trợ kỹ thuật qua Hotline / Messenger" : "Direct Hotline / Messenger support"}</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => onOpenQuote("Gói Mua Lẻ 1 - 4 Key")}
                className="retail-card-btn retail-card-btn-outline"
              >
                <PhoneCall size={15} color="#ea580c" />
                <span>{isVi ? "Nhận Báo Giá Gói 1 – 4 Key" : "Get 1 – 4 Keys Quote"}</span>
              </button>
            </div>

            {/* Card 2: 5 - 49 Key (POPULAR / HIGHLIGHT CARD) */}
            <div className="retail-card retail-card-popular">
              <span className="retail-card-badge">
                <Sparkles size={12} /> {isVi ? "DOANH NGHIỆP PHỔ BIẾN" : "RECOMMENDED FOR SMB"}
              </span>

              <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#ff6f3d", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {t("tier2Badge")}
              </div>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#333333", margin: "4px 0 16px" }}>
                {isVi ? "Từ 5 – 49 Key" : "5 – 49 Keys"}
              </div>

              {/* Quote Placeholder */}
              <div style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #f0f0f0" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#fff7ed", padding: "6px 12px", borderRadius: "6px", border: "1px solid #fed7aa" }}>
                  <Lock size={15} color="#ff6f3d" />
                  <span style={{ fontSize: "15px", fontWeight: 800, color: "#ff6f3d" }}>{t("tier2Price")}</span>
                </div>
                <div style={{ fontSize: "12px", color: "#16a34a", fontWeight: 700, marginTop: "6px" }}>
                  {isVi ? "✓ ĐÃ BAO GỒM 10% VAT • HỖ TRỢ XUẤT HÓA ĐƠN" : "✓ 10% VAT INCLUDED • VAT INVOICES ISSUED"}
                </div>
              </div>

              {/* Features */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#333333", fontWeight: 600 }}>
                  <Check size={16} color="#ff6f3d" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{isVi ? "Bản quyền vĩnh viễn theo Mainboard máy" : "Perpetual license per Motherboard"}</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#333333", fontWeight: 600 }}>
                  <Check size={16} color="#ff6f3d" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{isVi ? "Cấp tài khoản Portal quản lý key tập trung" : "Centralized Key Management Portal account"}</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#333333", fontWeight: 600 }}>
                  <Check size={16} color="#ff6f3d" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{isVi ? "Xuất giấy chứng nhận bản quyền từng thiết bị" : "Official device authenticity certificates"}</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#333333", fontWeight: 600 }}>
                  <Check size={16} color="#ff6f3d" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{isVi ? "Hợp đồng kinh tế & Hóa đơn điện tử VAT" : "Official Contracts & Electronic VAT Invoices"}</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => onOpenQuote("Gói Doanh Nghiệp 5 - 49 Key")}
                className="retail-card-btn retail-card-btn-primary"
              >
                <PhoneCall size={16} />
                <span>{isVi ? "Nhận Báo Giá Gói 5 – 49 Key" : "Get 5 – 49 Keys Quote"}</span>
              </button>
            </div>

            {/* Card 3: 50+ Key */}
            <div className="retail-card">
              <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#888888", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {t("tier3Badge")}
              </div>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#333333", margin: "4px 0 16px" }}>
                {isVi ? "Từ 50 Key Trở Lên" : "50+ Keys"}
              </div>

              {/* Quote Placeholder */}
              <div style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #f0f0f0" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#f9f9f9", padding: "6px 12px", borderRadius: "6px", border: "1px solid #e5e5e5" }}>
                  <Lock size={15} color="#16a34a" />
                  <span style={{ fontSize: "15px", fontWeight: 800, color: "#16a34a" }}>{t("tier3Price")}</span>
                </div>
                <div style={{ fontSize: "12px", color: "#16a34a", fontWeight: 700, marginTop: "6px" }}>
                  {isVi ? "✓ CHIẾT KHẤU TỐI ĐA CHO DỰ ÁN" : "✓ MAXIMUM WHOLESALE MARGIN"}
                </div>
              </div>

              {/* Features */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#444444" }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{isVi ? "Chính sách chiết khấu tốt nhất thị trường" : "Best-in-market volume pricing"}</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#444444" }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{isVi ? "Hỗ trợ triển khai máy chủ & giải pháp riêng" : "Custom private server / on-premise setup"}</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#444444" }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{isVi ? "Hợp đồng kinh tế mộc đỏ & Bàn giao tận nơi" : "Signed enterprise contract & full delivery"}</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#444444" }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{isVi ? "Kỹ sư hỗ trợ cài đặt và chuyển giao 24/7" : "24/7 engineer migration and onboarding"}</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => onOpenQuote("Gói Dự Án Từ 50 Key Trở Lên")}
                className="retail-card-btn retail-card-btn-outline"
              >
                <PhoneCall size={15} color="#ea580c" />
                <span>{isVi ? "Liên Hệ Báo Giá Từ 50 Key" : "Get 50+ Keys Quote"}</span>
              </button>
            </div>
          </div>

          <div className="retail-packages-note">
            ★ <strong style={{ color: "#ff6f3d" }}>{isVi ? "Lưu ý:" : "Note:"}</strong> {isVi ? "Từ 50 key trở lên hỗ trợ khảo sát và triển khai giải pháp kỹ thuật riêng cho hạ tầng nội bộ của doanh nghiệp." : "50+ key deployments include dedicated on-site IT consultation and custom network architecture."}
          </div>
        </div>
      </div>
    </section>
  );
}
