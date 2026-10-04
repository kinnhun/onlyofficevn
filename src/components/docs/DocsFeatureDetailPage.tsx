"use client";

import React, { useRef, useState } from "react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { openMessengerChat } from "@/lib/messenger";
import { FeatureDetail, featureDetailMap } from "@/lib/docsFeaturesData";
import {
  Download,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Layers,
  Sparkles,
  Shield,
  Cpu,
  MonitorSmartphone,
  HelpCircle,
  Check,
  ChevronRight,
  Zap,
} from "lucide-react";

interface Props {
  data: FeatureDetail;
  currentSlug: string;
}

const featureIcons: Record<string, any> = {
  "tuong-thich-dinh-dang": FileCheck2,
  "xu-ly-tron-bo": Layers,
  "cong-tac": Sparkles,
  "bao-mat": Shield,
  ai: Cpu,
  "da-thiet-bi": MonitorSmartphone,
};

export default function DocsFeatureDetailPage({ data, currentSlug }: Props) {
  const locale = useLocale();
  const isVi = locale === "vi";

  // 3D Tilt state for hero preview
  const [rotateX, setRotateX] = useState(4);
  const [rotateY, setRotateY] = useState(-8);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateY(((x - centerX) / centerX) * 10);
    setRotateX(-(((y - centerY) / centerY) * 8));
  };

  const handleMouseLeave = () => {
    setRotateX(4);
    setRotateY(-8);
  };

  const CurrentIcon = featureIcons[currentSlug] || Sparkles;
  const allFeatureEntries = Object.values(featureDetailMap);

  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      {/* HERO SECTION */}
      <section
        style={{
          padding: "60px 20px 72px",
          background: "transparent",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {/* Breadcrumbs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13.5px",
              color: "#64748b",
              marginBottom: "24px",
              flexWrap: "wrap",
            }}
          >
            <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>
              {isVi ? "Trang chủ" : "Home"}
            </Link>
            <span>/</span>
            <Link href="/docs" style={{ color: "#64748b", textDecoration: "none" }}>
              ONLYOFFICE Docs
            </Link>
            <span>/</span>
            <span style={{ color: "#ea580c", fontWeight: 700 }}>{data.title}</span>
          </div>

          {/* Hero Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "48px",
              alignItems: "center",
            }}
          >
            {/* Left: Text & CTAs */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  borderRadius: "100px",
                  backgroundColor: "rgba(255, 111, 61, 0.09)",
                  border: "1px solid rgba(255, 111, 61, 0.2)",
                  marginBottom: "16px",
                }}
              >
                <CurrentIcon size={15} color="#ea580c" />
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#ea580c",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {isVi ? data.tag : data.enTag}
                </span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(28px, 4.2vw, 46px)",
                  fontWeight: 800,
                  color: "#0f172a",
                  lineHeight: 1.2,
                  marginBottom: "18px",
                  letterSpacing: "-0.5px",
                }}
              >
                {isVi ? data.title : data.enTitle}
              </h1>

              <p
                style={{
                  fontSize: "17.5px",
                  lineHeight: 1.62,
                  color: "#475569",
                  marginBottom: "28px",
                  fontWeight: 500,
                }}
              >
                {isVi ? data.subtitle : data.enSubtitle}
              </p>

              {/* Supported Formats Pills */}
              <div style={{ marginBottom: "32px" }}>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#94a3b8",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    marginBottom: "8px",
                  }}
                >
                  {isVi ? "Tiêu chuẩn & Định dạng tích hợp:" : "Integrated Standards & Formats:"}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {data.formatBadges.map((badge, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#1e293b",
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
                        backdropFilter: "blur(6px)",
                        padding: "5px 11px",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                <Link
                  href="/demo"
                  style={{
                    background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                    color: "#ffffff",
                    padding: "13px 26px",
                    borderRadius: "100px",
                    fontWeight: 700,
                    fontSize: "15px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    textDecoration: "none",
                    boxShadow: "0 6px 18px rgba(255, 111, 61, 0.35)",
                    transition: "transform 0.18s, box-shadow 0.18s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 10px 24px rgba(255, 111, 61, 0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 6px 18px rgba(255, 111, 61, 0.35)";
                  }}
                >
                  <Zap size={16} />
                  <span>{isVi ? "Trải Nghiệm Online Ngay" : "Try Web Demo"}</span>
                </Link>

                <a
                  href="https://www.messenger.com/t/286163107904324"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={openMessengerChat}
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1.5px solid #cbd5e1",
                    padding: "12px 22px",
                    borderRadius: "100px",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#334155",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    textDecoration: "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                  }}
                >
                  <MessageCircle size={16} color="#ea580c" />
                  <span>{isVi ? "Tư Vấn 1:1 Doanh Nghiệp" : "1:1 Consultation"}</span>
                </a>
              </div>
            </div>

            {/* Right: 3D UI Showcase Image */}
            <div
              ref={stageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                perspective: "1200px",
                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                  transition: "transform 0.12s ease-out",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.2), 0 0 0 1px rgba(226, 232, 240, 0.8)",
                  backgroundColor: "#ffffff",
                  maxWidth: "560px",
                  width: "100%",
                }}
              >
                <img
                  src={data.img}
                  alt={data.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS HIGHLIGHTS STRIP */}
      <section
        style={{
          padding: "36px 20px",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(226, 232, 240, 0.7)",
          borderBottom: "1px solid rgba(226, 232, 240, 0.7)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
            textAlign: "center",
          }}
        >
          {data.stats.map((st, i) => (
            <div key={i}>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "#ff6f3d",
                  lineHeight: 1.1,
                  marginBottom: "6px",
                  letterSpacing: "-0.5px",
                }}
              >
                {st.value}
              </div>
              <div style={{ fontSize: "14px", color: "#64748b", fontWeight: 600 }}>{st.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DETAILED HIGHLIGHTS SECTION */}
      <section
        style={{
          padding: "80px 20px 88px",
          background: "transparent",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "860px", margin: "0 auto 52px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#ff6f3d",
                backgroundColor: "rgba(255, 111, 61, 0.09)",
                border: "1px solid rgba(255, 111, 61, 0.2)",
                padding: "5px 14px",
                borderRadius: "100px",
                textTransform: "uppercase",
              }}
            >
              {isVi ? "CHI TIẾT GIẢI PHÁP" : "DEEP DIVE"}
            </span>
            <h2
              style={{
                fontSize: "clamp(26px, 3.4vw, 36px)",
                fontWeight: 800,
                color: "#0f172a",
                lineHeight: 1.25,
                marginTop: "14px",
                marginBottom: "12px",
              }}
            >
              {isVi ? "Các Điểm Vượt Trội Hàng Đầu" : "Core Technical Capabilities"}
            </h2>
            <p style={{ fontSize: "16.5px", color: "#64748b", margin: 0, lineHeight: 1.6 }}>
              {isVi
                ? "Thiết kế tối ưu cho trải nghiệm làm việc năng suất, an toàn và đồng bộ tối đa."
                : "Engineered for uncompromising corporate productivity and data security."}
            </p>
          </div>

          {/* Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "28px",
            }}
          >
            {data.keyHighlights.map((hl, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.94)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "18px",
                  border: "1.5px solid #ececec",
                  padding: "28px 30px",
                  boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h3
                  style={{
                    fontSize: "18.5px",
                    fontWeight: 800,
                    color: "#1e293b",
                    marginBottom: "12px",
                    lineHeight: 1.35,
                  }}
                >
                  {hl.title}
                </h3>
                <p style={{ fontSize: "14.5px", color: "#64748b", lineHeight: 1.65, marginBottom: "18px" }}>
                  {hl.description}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "auto" }}>
                  {hl.points.map((pt, pIdx) => (
                    <div key={pIdx} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <CheckCircle2 size={16} color="#ff6f3d" style={{ flexShrink: 0, marginTop: "3px" }} />
                      <span style={{ fontSize: "13.5px", color: "#334155", lineHeight: 1.6 }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section
        style={{
          padding: "72px 20px 84px",
          background: "transparent",
          borderTop: "1px solid rgba(226, 232, 240, 0.6)",
        }}
      >
        <div style={{ maxWidth: "1040px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2
              style={{
                fontSize: "clamp(24px, 3.2vw, 34px)",
                fontWeight: 800,
                color: "#0f172a",
                lineHeight: 1.25,
                marginBottom: "10px",
              }}
            >
              {isVi ? "So Sánh Với Giải Pháp Truyền Thống" : "ONLYOFFICE vs Traditional Solutions"}
            </h2>
            <p style={{ fontSize: "15.5px", color: "#64748b", margin: 0 }}>
              {isVi
                ? "Khác biệt rõ rệt về hiệu năng, độ tương thích và quyền kiểm soát dữ liệu."
                : "Clear advantages in compatibility, total cost of ownership, and privacy."}
            </p>
          </div>

          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(8px)",
              borderRadius: "18px",
              border: "1.5px solid #e2e8f0",
              overflow: "hidden",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                  <th style={{ padding: "16px 20px", fontSize: "14px", fontWeight: 700, color: "#475569" }}>
                    {isVi ? "Tiêu chí so sánh" : "Evaluation Metric"}
                  </th>
                  <th style={{ padding: "16px 20px", fontSize: "14px", fontWeight: 800, color: "#ff6f3d" }}>
                    ONLYOFFICE Docs
                  </th>
                  <th style={{ padding: "16px 20px", fontSize: "14px", fontWeight: 600, color: "#64748b" }}>
                    {isVi ? "Phần mềm truyền thống" : "Legacy Solutions"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.comparisonTable.map((row, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: idx === data.comparisonTable.length - 1 ? "none" : "1px solid #f1f5f9",
                      backgroundColor: idx % 2 === 0 ? "transparent" : "rgba(248, 250, 252, 0.5)",
                    }}
                  >
                    <td style={{ padding: "16px 20px", fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>
                      {row.feature}
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "14px", fontWeight: 600, color: "#15803d" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Check size={16} color="#16a34a" strokeWidth={3} />
                        <span>{row.onlyoffice}</span>
                      </div>
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "13.5px", color: "#64748b" }}>
                      {row.traditional}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SWITCHER TO THE OTHER 5 DETAILED ARTICLES / PAGES */}
      <section
        style={{
          padding: "60px 20px 72px",
          background: "transparent",
          borderTop: "1px solid rgba(226, 232, 240, 0.6)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a" }}>
              {isVi ? "Xem Các Chuyên Đề Phân Tích Khác" : "Explore Other Deep Dive Features"}
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "16px",
            }}
          >
            {allFeatureEntries.map((item) => {
              const isCurrent = item.slug === currentSlug;
              const IconComp = featureIcons[item.slug] || Sparkles;
              return (
                <Link
                  key={item.slug}
                  href={`/docs/${item.slug}`}
                  style={{
                    backgroundColor: isCurrent ? "rgba(255, 111, 61, 0.1)" : "rgba(255, 255, 255, 0.9)",
                    border: isCurrent ? "2px solid #ff6f3d" : "1.5px solid #e2e8f0",
                    borderRadius: "14px",
                    padding: "16px 18px",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    boxShadow: isCurrent ? "0 4px 14px rgba(255, 111, 61, 0.15)" : "none",
                    transition: "all 0.2s",
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      backgroundColor: isCurrent ? "#ff6f3d" : "#f1f5f9",
                      color: isCurrent ? "#ffffff" : "#ea580c",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <IconComp size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#ff6f3d", textTransform: "uppercase" }}>
                      {isVi ? item.tag : item.enTag}
                    </div>
                    <div
                      style={{
                        fontSize: "13.5px",
                        fontWeight: 700,
                        color: isCurrent ? "#ea580c" : "#1e293b",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.title}
                    </div>
                  </div>
                  <ChevronRight size={16} color={isCurrent ? "#ea580c" : "#94a3b8"} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* BIG BOTTOM CALL TO ACTION */}
      <section
        style={{
          padding: "68px 20px",
          background: "linear-gradient(135deg, rgba(255, 244, 234, 0.75) 0%, rgba(253, 248, 244, 0.85) 100%)",
          borderTop: "1px solid rgba(226, 232, 240, 0.8)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(26px, 3.4vw, 38px)",
              fontWeight: 800,
              color: "#1e293b",
              marginBottom: "14px",
              lineHeight: 1.3,
            }}
          >
            {isVi ? "Trải Nghiệm ONLYOFFICE Docs Ngay Hôm Nay" : "Experience ONLYOFFICE Docs Today"}
          </h2>
          <p style={{ fontSize: "16.5px", color: "#64748b", marginBottom: "30px", lineHeight: 1.6 }}>
            {isVi
              ? "Tương thích 99% MS Office, bảo mật dữ liệu tuyệt đối và tối ưu chi phí bản quyền doanh nghiệp cùng Mercy Tech."
              : "Enterprise-grade document editing on your private cloud with zero telemetry leakage."}
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
            <Link
              href="/demo"
              style={{
                background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                color: "#ffffff",
                padding: "13px 28px",
                borderRadius: "100px",
                fontWeight: 700,
                fontSize: "15px",
                textDecoration: "none",
                boxShadow: "0 6px 18px rgba(255, 111, 61, 0.35)",
              }}
            >
              {isVi ? "Dùng Thử Web Demo Miễn Phí" : "Try Free Web Demo"}
            </Link>
            <a
              href="https://www.messenger.com/t/286163107904324"
              target="_blank"
              rel="noopener noreferrer"
              onClick={openMessengerChat}
              style={{
                backgroundColor: "#ffffff",
                border: "1.5px solid #cbd5e1",
                padding: "13px 26px",
                borderRadius: "100px",
                fontSize: "15px",
                fontWeight: 700,
                color: "#334155",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
              }}
            >
              <MessageCircle size={16} color="#ea580c" />
              <span>{isVi ? "Nhận Tư Vấn Cấu Hình Qua Messenger" : "Chat on Messenger"}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
