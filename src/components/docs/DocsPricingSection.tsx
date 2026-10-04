"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Check, Download, MessageCircle, ArrowRight } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

export default function DocsPricingSection() {
  const locale = useLocale();
  const isVi = locale === "vi";

  return (
    <>
      {/* SECTION 7: PRICING FOR DOCS */}
      <section style={{ backgroundColor: "#ffffff", padding: "80px 20px 84px" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "clamp(26px, 3.6vw, 38px)", fontWeight: 800, color: "#1e293b", margin: 0 }}>
              {isVi ? "Bảng Giá ONLYOFFICE Docs" : "ONLYOFFICE Docs Pricing"}
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
              gap: "28px",
            }}
          >
            {/* Card 1: Docs Personal */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1.5px solid #e2e8f0",
                borderRadius: "18px",
                padding: "36px 28px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <div style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", marginBottom: "8px" }}>
                  Docs Personal
                </div>
                <div style={{ fontSize: "36px", fontWeight: 800, color: "#1e293b", marginBottom: "6px" }}>
                  $0
                </div>
                <div style={{ fontSize: "13.5px", color: "#64748b" }}>
                  {isVi ? "Tối ưu cho cá nhân & học tập" : "Optimized for personal desktop use"}
                </div>
              </div>

              <div style={{ height: "1px", backgroundColor: "#f1f5f9", margin: "16px 0 24px" }} />

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
                <li style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", color: "#334155", lineHeight: 1.5 }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{isVi ? "Bộ công cụ soạn thảo Offline đầy đủ" : "Full offline editing tools on desktop"}</span>
                </li>
                <li style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", color: "#334155", lineHeight: 1.5 }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{isVi ? "Tương thích 95% tài liệu MS Office" : "95%+ compatibility with MS Office formats"}</span>
                </li>
                <li style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", color: "#334155", lineHeight: 1.5 }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{isVi ? "Chỉnh sửa file trực tiếp trên máy tính" : "Direct local file storage & privacy"}</span>
                </li>
              </ul>

              <Link
                href="/demo"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#ff6f3d",
                  border: "1.5px solid #ff6f3d",
                  padding: "11px 18px",
                  borderRadius: "100px",
                  fontWeight: 700,
                  fontSize: "14px",
                  textDecoration: "none",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  transition: "all 0.2s ease",
                }}
              >
                <Download size={15} />
                <span>{isVi ? "Tải xuống miễn phí" : "Download Now"}</span>
              </Link>
            </div>

            {/* Card 2: Docs Enterprise (Featured) */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "2px solid #ff6f3d",
                borderRadius: "18px",
                padding: "36px 28px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 16px 40px rgba(255, 111, 61, 0.16)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#ff6f3d",
                  color: "#ffffff",
                  fontSize: "11.5px",
                  fontWeight: 800,
                  padding: "3px 14px",
                  borderRadius: "100px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {isVi ? "PHỔ BIẾN NHẤT" : "MOST POPULAR"}
              </div>

              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <div style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#ff6f3d", marginBottom: "8px" }}>
                  Docs Enterprise
                </div>
                <div style={{ fontSize: "36px", fontWeight: 800, color: "#1e293b", marginBottom: "6px" }}>
                  {isVi ? "Báo giá" : "Custom Quote"}
                </div>
                <div style={{ fontSize: "13.5px", color: "#64748b" }}>
                  {isVi ? "Giải pháp cho doanh nghiệp tự vận hành hạ tầng riêng" : "Self-hosted private cloud cluster"}
                </div>
              </div>

              <div style={{ height: "1px", backgroundColor: "#fed7aa", margin: "16px 0 24px" }} />

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
                <li style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", color: "#334155", lineHeight: 1.5 }}>
                  <Check size={16} color="#ea580c" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{isVi ? "Tùy chọn mua bản quyền theo năm hoặc sở hữu trọn đời" : "Annual subscription or perpetual lifetime license"}</span>
                </li>
                <li style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", color: "#334155", lineHeight: 1.5 }}>
                  <Check size={16} color="#ea580c" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{isVi ? "Phân cấp linh hoạt theo số kết nối đồng thời (50 / 100 / 200+)" : "Flexible scaling (50, 100, 200 to 10,000+ connections)"}</span>
                </li>
                <li style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", color: "#334155", lineHeight: 1.5 }}>
                  <Check size={16} color="#ea580c" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{isVi ? "Tích hợp 3 cấp độ hỗ trợ kỹ thuật chuyên sâu từ NSX" : "Direct level-3 engineer support from manufacturer"}</span>
                </li>
              </ul>

              <a
                href="https://www.messenger.com/t/286163107904324"
                target="_blank"
                rel="noopener noreferrer"
                onClick={openMessengerChat}
                style={{
                  background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                  color: "#ffffff",
                  padding: "12px 18px",
                  borderRadius: "100px",
                  fontWeight: 800,
                  fontSize: "14px",
                  textDecoration: "none",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  boxShadow: "0 4px 14px rgba(255, 111, 61, 0.35)",
                }}
              >
                <MessageCircle size={15} />
                <span>{isVi ? "Báo giá Enterprise" : "Enterprise Quote"}</span>
              </a>
            </div>

            {/* Card 3: Docs Developer */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1.5px solid #e2e8f0",
                borderRadius: "18px",
                padding: "36px 28px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <div style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", marginBottom: "8px" }}>
                  Docs Developer
                </div>
                <div style={{ fontSize: "36px", fontWeight: 800, color: "#1e293b", marginBottom: "6px" }}>
                  {isVi ? "Báo giá" : "Developer Quote"}
                </div>
                <div style={{ fontSize: "13.5px", color: "#64748b" }}>
                  {isVi ? "Tích hợp tối ưu cho nhà phát triển và SaaS" : "API & SDK for SaaS platforms and software developers"}
                </div>
              </div>

              <div style={{ height: "1px", backgroundColor: "#f1f5f9", margin: "16px 0 24px" }} />

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
                <li style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", color: "#334155", lineHeight: 1.5 }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{isVi ? "Nhúng trọn bộ soạn thảo tối ưu cho Web và Di động" : "Embed editors inside web and mobile applications"}</span>
                </li>
                <li style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", color: "#334155", lineHeight: 1.5 }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{isVi ? "Tự động tạo file, chuyển đổi định dạng siêu tốc bằng API" : "Automated file generation and conversion API"}</span>
                </li>
                <li style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", color: "#334155", lineHeight: 1.5 }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{isVi ? "Miễn phí trọn đời toàn bộ các bản cập nhật và nâng cấp" : "Includes lifetime updates and version upgrades"}</span>
                </li>
              </ul>

              <a
                href="https://www.messenger.com/t/286163107904324"
                target="_blank"
                rel="noopener noreferrer"
                onClick={openMessengerChat}
                style={{
                  backgroundColor: "#ffffff",
                  color: "#ff6f3d",
                  border: "1.5px solid #ff6f3d",
                  padding: "11px 18px",
                  borderRadius: "100px",
                  fontWeight: 700,
                  fontSize: "14px",
                  textDecoration: "none",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  transition: "all 0.2s ease",
                }}
              >
                <MessageCircle size={15} />
                <span>{isVi ? "Báo giá Developer" : "Developer Quote"}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: SMALL CONSULT CTA FOR TEAMS > 100 */}
      <section
        style={{
          backgroundColor: "#fff7ed",
          borderTop: "1px solid #fed7aa",
          borderBottom: "1px solid #fed7aa",
          padding: "54px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <img
            src="https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/logo.svg"
            alt="ONLYOFFICE"
            style={{ height: "30px", margin: "0 auto 20px", display: "block" }}
          />

          <p style={{ fontSize: "16px", color: "#334155", lineHeight: 1.7, margin: "0 0 24px", fontWeight: 500 }}>
            {isVi ? (
              <>
                (*) Doanh nghiệp của bạn có trên <strong style={{ color: "#ea580c" }}>100 nhân sự</strong> và muốn kiểm soát 100% dữ liệu nội bộ? Hãy cùng thảo luận trực tiếp với đội ngũ chuyên gia của ONLYOFFICE để xây dựng chính sách tối ưu nhất về cả chi phí lẫn hạ tầng bảo mật.
              </>
            ) : (
              <>
                (*) Does your enterprise have more than <strong style={{ color: "#ea580c" }}>100 members</strong> requiring complete private data control? Talk directly with our senior architects for dedicated licensing discounts and tailored support.
              </>
            )}
          </p>

          <a
            href="https://www.messenger.com/t/286163107904324"
            target="_blank"
            rel="noopener noreferrer"
            onClick={openMessengerChat}
            style={{
              background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
              color: "#ffffff",
              padding: "13px 28px",
              borderRadius: "100px",
              fontWeight: 800,
              fontSize: "15px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              boxShadow: "0 4px 18px rgba(234, 88, 12, 0.35)",
            }}
          >
            <MessageCircle size={16} />
            <span>{isVi ? "Tư vấn 1:1 cùng chuyên gia" : "1:1 Consultation with Senior Expert"}</span>
          </a>
        </div>
      </section>
    </>
  );
}
