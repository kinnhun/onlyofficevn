"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { openMessengerChat } from "@/lib/messenger";
import {
  Download,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  FileText,
  FileSpreadsheet,
  Presentation,
  FileCode,
  CheckSquare,
  Network,
  ShieldCheck,
  Cpu,
  Users2,
  Zap,
  Play,
  Image as ImageIcon,
  Sparkles,
  Layers,
  Palette,
  Clock,
  ExternalLink,
} from "lucide-react";

export interface InteractiveTabItem {
  id: string;
  label: string;
  eyebrow?: string;
  heading: string;
  bullets: string[];
  image: string;
}

export interface BonusCardItem {
  iconType?: "presentation" | "palette" | "users" | "sparkles" | "shield" | "cpu" | "clock" | "image";
  title: string;
  desc: string;
}

export interface ToolDetailData {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  badge: string;
  formatList: string[];
  heroImage: string;
  videoEmbedUrl?: string; // e.g. "https://www.youtube.com/embed/kxMwSea5Nw4?autoplay=1&mute=1&loop=1&playlist=kxMwSea5Nw4"
  heroLayout?: "split" | "centered"; // "centered" matches onlyofficevietnam.com/thuyet-trinh/
  msCompatLabel: string;
  overviewText: string;
  interactiveTabs?: InteractiveTabItem[];
  interactiveTabsHeading?: string;
  interactiveTabsSubheading?: string;
  bonusCards?: BonusCardItem[];
  bonusCardsHeading?: string;
  bonusCardsSubheading?: string;
  features: {
    title: string;
    points: string[];
  }[];
  collaborationBenefits: {
    title: string;
    desc: string;
  }[];
}

const allTools = [
  { slug: "document-editor", titleVi: "Soạn thảo văn bản", titleEn: "Document Editor", icon: FileText, badge: "DOCX / Word" },
  { slug: "spreadsheet-editor", titleVi: "Bảng tính", titleEn: "Spreadsheet Editor", icon: FileSpreadsheet, badge: "XLSX / Excel" },
  { slug: "presentation-editor", titleVi: "Slide thuyết trình", titleEn: "Presentation Editor", icon: Presentation, badge: "PPTX / PowerPoint" },
  { slug: "pdf-editor", titleVi: "Soạn thảo PDF", titleEn: "PDF Editor", icon: FileCode, badge: "PDF / Acrobat" },
  { slug: "form-creator", titleVi: "Tạo biểu mẫu", titleEn: "Form Creator", icon: CheckSquare, badge: "OFORM / Form" },
  { slug: "diagram-viewer", titleVi: "Xem sơ đồ", titleEn: "Diagram Viewer", icon: Network, badge: "VSDX / Visio" },
];

export default function ToolDetailPage({ data }: { data: ToolDetailData }) {
  const locale = useLocale();
  const isVi = locale === "vi";

  // State for toggling Video vs Image in the Hero
  const [activeMedia, setActiveMedia] = useState<"video" | "image">(
    data.videoEmbedUrl ? "video" : "image"
  );

  // State for interactive tabs
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const isCentered = data.heroLayout === "centered";

  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", position: "relative" }}>
        {/* HERO SECTION FOR TOOL */}
        <section
          style={{
            padding: "56px 20px 72px",
            background: "transparent",
            position: "relative",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            {/* Breadcrumb */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13.5px",
                color: "#64748b",
                marginBottom: isCentered ? "32px" : "28px",
                justifyContent: isCentered ? "center" : "flex-start",
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
              <span style={{ color: "#ea580c", fontWeight: 700 }}>{data.name}</span>
            </div>

            {/* IF CENTERED HERO (like https://onlyofficevietnam.com/thuyet-trinh/) */}
            {isCentered ? (
              <div style={{ maxWidth: "1040px", margin: "0 auto", textAlign: "center" }}>
                {/* Badges */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "18px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12.5px",
                      fontWeight: 700,
                      color: "#ff6f3d",
                      backgroundColor: "rgba(255, 111, 61, 0.09)",
                      border: "1px solid rgba(255, 111, 61, 0.25)",
                      padding: "6px 16px",
                      borderRadius: "100px",
                      letterSpacing: "0.03em",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>🎯</span>
                    <span>{data.badge}</span>
                  </span>
                  <span
                    style={{
                      fontSize: "12.5px",
                      fontWeight: 700,
                      color: "#16a34a",
                      backgroundColor: "rgba(22, 163, 74, 0.09)",
                      border: "1px solid rgba(22, 163, 74, 0.25)",
                      padding: "6px 16px",
                      borderRadius: "100px",
                    }}
                  >
                    {data.msCompatLabel}
                  </span>
                </div>

                {/* Title */}
                <h1
                  style={{
                    fontSize: "clamp(32px, 4.5vw, 54px)",
                    fontWeight: 800,
                    color: "#0f172a",
                    lineHeight: 1.2,
                    marginBottom: "18px",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {data.name}
                </h1>

                {/* Tagline */}
                <p
                  style={{
                    fontSize: "18px",
                    lineHeight: 1.65,
                    color: "#475569",
                    maxWidth: "740px",
                    margin: "0 auto 28px",
                    fontWeight: 500,
                  }}
                >
                  {data.tagline}
                </p>

                {/* Action CTAs */}
                <div
                  className="tool-hero-cta-group"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "14px",
                    flexWrap: "wrap",
                    marginBottom: "32px",
                  }}
                >
                  <Link
                    href="/demo"
                    className="tool-hero-cta-btn"
                    style={{
                      background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                      color: "#ffffff",
                      padding: "14px 30px",
                      borderRadius: "100px",
                      fontWeight: 700,
                      fontSize: "15px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      textDecoration: "none",
                      boxShadow: "0 8px 24px rgba(255, 111, 61, 0.38)",
                    }}
                  >
                    <Zap size={17} />
                    <span>{isVi ? "Trải Nghiệm Online Ngay" : "Try Live Demo"}</span>
                  </Link>

                  <a
                    href="https://www.messenger.com/t/286163107904324"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={openMessengerChat}
                    className="tool-hero-cta-btn"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1.5px solid #cbd5e1",
                      padding: "13px 26px",
                      borderRadius: "100px",
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#334155",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      textDecoration: "none",
                      boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
                    }}
                  >
                    <MessageCircle size={17} color="#ea580c" />
                    <span>{isVi ? "Nhận Tư Vấn 1:1 Doanh Nghiệp" : "1:1 Consultation"}</span>
                  </a>
                </div>

                {/* Media Switcher Buttons (if videoEmbedUrl is available) */}
                {data.videoEmbedUrl && (
                  <div className="tool-media-switcher">
                    <button
                      type="button"
                      onClick={() => setActiveMedia("video")}
                      style={{
                        background:
                          activeMedia === "video"
                            ? "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)"
                            : "transparent",
                        color: activeMedia === "video" ? "#ffffff" : "#64748b",
                        border: "none",
                        borderRadius: "100px",
                        padding: "8px 18px",
                        fontSize: "13.5px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "all 0.2s",
                        boxShadow:
                          activeMedia === "video" ? "0 4px 12px rgba(255, 111, 61, 0.35)" : "none",
                      }}
                    >
                      <Play size={14} fill={activeMedia === "video" ? "#fff" : "transparent"} />
                      <span>{isVi ? "Video Demo Trực Quan" : "Watch Video Demo"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveMedia("image")}
                      style={{
                        background:
                          activeMedia === "image"
                            ? "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)"
                            : "transparent",
                        color: activeMedia === "image" ? "#ffffff" : "#64748b",
                        border: "none",
                        borderRadius: "100px",
                        padding: "8px 18px",
                        fontSize: "13.5px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "all 0.2s",
                        boxShadow:
                          activeMedia === "image" ? "0 4px 12px rgba(255, 111, 61, 0.35)" : "none",
                      }}
                    >
                      <ImageIcon size={14} />
                      <span>{isVi ? "Ảnh Giao Diện Ứng Dụng" : "Interface Screenshot"}</span>
                    </button>
                  </div>
                )}

                {/* Media Container: 16:9 Video or High-res Screenshot */}
                {activeMedia === "video" && data.videoEmbedUrl ? (
                  <div
                    style={{
                      position: "relative",
                      paddingBottom: "56.25%",
                      height: 0,
                      overflow: "hidden",
                      borderRadius: "20px",
                      boxShadow: "0 25px 65px -12px rgba(255, 111, 61, 0.28), 0 12px 36px rgba(15, 23, 42, 0.12)",
                      border: "2px solid rgba(255, 111, 61, 0.35)",
                      backgroundColor: "rgba(255, 247, 237, 0.6)",
                    }}
                  >
                    <iframe
                      src={data.videoEmbedUrl}
                      title={data.name}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: 0,
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 20px 50px -10px rgba(15, 23, 42, 0.14)",
                      border: "1.5px solid #e2e8f0",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <img
                      src={data.heroImage}
                      alt={data.name}
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>
                )}

                {/* Supported Formats */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                    marginTop: "28px",
                  }}
                >
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>
                    {isVi ? "Hỗ trợ chuẩn định dạng:" : "Supported Formats:"}
                  </span>
                  {data.formatList.map((fmt, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#1e293b",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(4px)",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              /* SPLIT HERO LAYOUT (Original 2 columns with Video/Image Switcher) */
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "48px",
                  alignItems: "center",
                }}
              >
                {/* Left Column: Text & Badges */}
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#ff6f3d",
                        backgroundColor: "rgba(255, 111, 61, 0.09)",
                        border: "1px solid rgba(255, 111, 61, 0.2)",
                        padding: "6px 14px",
                        borderRadius: "100px",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {data.badge}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#16a34a",
                        backgroundColor: "rgba(22, 163, 74, 0.09)",
                        border: "1px solid rgba(22, 163, 74, 0.2)",
                        padding: "6px 14px",
                        borderRadius: "100px",
                      }}
                    >
                      {data.msCompatLabel}
                    </span>
                  </div>

                  <h1
                    style={{
                      fontSize: "clamp(30px, 4.2vw, 48px)",
                      fontWeight: 800,
                      color: "#0f172a",
                      lineHeight: 1.2,
                      marginBottom: "18px",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {data.name}
                  </h1>

                  <p
                    style={{
                      fontSize: "18px",
                      lineHeight: 1.6,
                      color: "#475569",
                      marginBottom: "24px",
                      fontWeight: 500,
                    }}
                  >
                    {data.tagline}
                  </p>

                  {/* Formats Pills */}
                  <div style={{ marginBottom: "32px" }}>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: "8px" }}>
                      {isVi ? "Định dạng tương thích chuẩn xác:" : "Supported Standards:"}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {data.formatList.map((fmt, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "#1e293b",
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            backdropFilter: "blur(4px)",
                            padding: "4px 10px",
                            borderRadius: "6px",
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          {fmt}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action CTAs */}
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
                      }}
                    >
                      <Zap size={16} />
                      <span>{isVi ? "Trải Nghiệm Online Ngay" : "Try Live Demo"}</span>
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
                      }}
                    >
                      <MessageCircle size={16} color="#ea580c" />
                      <span>{isVi ? "Tư Vấn 1:1 Doanh Nghiệp" : "1:1 Consultation"}</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Visual Preview with Video Switcher */}
                <div>
                  {data.videoEmbedUrl && (
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(6px)",
                        border: "1px solid #e2e8f0",
                        padding: "4px",
                        borderRadius: "100px",
                        marginBottom: "12px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveMedia("video")}
                        style={{
                          background:
                            activeMedia === "video"
                              ? "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)"
                              : "transparent",
                          color: activeMedia === "video" ? "#ffffff" : "#64748b",
                          border: "none",
                          borderRadius: "100px",
                          padding: "6px 14px",
                          fontSize: "12.5px",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <Play size={12} fill={activeMedia === "video" ? "#fff" : "transparent"} />
                        <span>Video Demo</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveMedia("image")}
                        style={{
                          background:
                            activeMedia === "image"
                              ? "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)"
                              : "transparent",
                          color: activeMedia === "image" ? "#ffffff" : "#64748b",
                          border: "none",
                          borderRadius: "100px",
                          padding: "6px 14px",
                          fontSize: "12.5px",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <ImageIcon size={12} />
                        <span>{isVi ? "Ảnh Chụp" : "Image"}</span>
                      </button>
                    </div>
                  )}

                  {activeMedia === "video" && data.videoEmbedUrl ? (
                    <div
                      style={{
                        position: "relative",
                        paddingBottom: "56.25%",
                        height: 0,
                        overflow: "hidden",
                        borderRadius: "20px",
                        boxShadow: "0 20px 45px -10px rgba(255, 111, 61, 0.25)",
                        border: "2px solid rgba(255, 111, 61, 0.3)",
                        backgroundColor: "rgba(255, 247, 237, 0.6)",
                      }}
                    >
                      <iframe
                        src={data.videoEmbedUrl}
                        title={data.name}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          border: 0,
                        }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        borderRadius: "20px",
                        overflow: "hidden",
                        boxShadow: "0 20px 45px -10px rgba(15, 23, 42, 0.16)",
                        border: "1.5px solid #e2e8f0",
                        backgroundColor: "#ffffff",
                        position: "relative",
                      }}
                    >
                      <img
                        src={data.heroImage}
                        alt={data.name}
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 2: INTERACTIVE TABS (Exact match to onlyofficevietnam.com/thuyet-trinh/ feature tabs) */}
        {data.interactiveTabs && data.interactiveTabs.length > 0 && (
          <section
            style={{
              padding: "72px 20px 84px",
              background: "transparent",
              borderTop: "1px solid rgba(226, 232, 240, 0.6)",
            }}
          >
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 40px" }}>
                <h2
                  style={{
                    fontSize: "clamp(26px, 3.4vw, 36px)",
                    fontWeight: 800,
                    color: "#0f172a",
                    lineHeight: 1.25,
                    marginBottom: "12px",
                  }}
                >
                  {data.interactiveTabsHeading || (isVi ? "Tạo Bản Thuyết Trình Đơn Giản" : "Effortless Presentation Creation")}
                </h2>
                <p style={{ fontSize: "16px", color: "#64748b", margin: 0, lineHeight: 1.6 }}>
                  {data.interactiveTabsSubheading || (isVi
                    ? "Tương thích đa định dạng — hiệu ứng chuyển động đẹp mượt mà"
                    : "Multi-format compatibility with ultra-smooth animation transitions")}
                </p>
              </div>

              {/* Tabs Navigation Segmented Control */}
              <div className="tool-interactive-tabs-container">
                {data.interactiveTabs.map((tab, idx) => {
                  const isActive = activeTabIndex === idx;
                  return (
                    <button
                      key={tab.id || idx}
                      type="button"
                      onClick={() => setActiveTabIndex(idx)}
                      className={`tool-interactive-tab-btn ${isActive ? "active" : ""}`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Active Tab Card */}
              {data.interactiveTabs[activeTabIndex] && (
                <div className="tool-interactive-tab-card">
                  <div className="tool-interactive-tab-grid">
                    {/* Left text column */}
                    <div>
                      {data.interactiveTabs[activeTabIndex].eyebrow && (
                        <span
                          style={{
                            display: "block",
                            fontSize: "12px",
                            fontWeight: 700,
                            letterSpacing: "1.5px",
                            textTransform: "uppercase",
                            color: "#FF6F3D",
                            marginBottom: "14px",
                          }}
                        >
                          {data.interactiveTabs[activeTabIndex].eyebrow}
                        </span>
                      )}
                      <h3
                        style={{
                          fontSize: "clamp(22px, 2.6vw, 30px)",
                          fontWeight: 800,
                          color: "#1e293b",
                          lineHeight: 1.3,
                          margin: "0 0 18px",
                        }}
                      >
                        {data.interactiveTabs[activeTabIndex].heading}
                      </h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                        {data.interactiveTabs[activeTabIndex].bullets.map((bullet, bIdx) => (
                          <div key={bIdx} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                            <span
                              style={{
                                flexShrink: 0,
                                width: "22px",
                                height: "22px",
                                borderRadius: "50%",
                                backgroundColor: "#FF6F3D",
                                color: "#ffffff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "12px",
                                fontWeight: 700,
                                marginTop: "2px",
                              }}
                            >
                              ✓
                            </span>
                            <span style={{ fontSize: "15px", color: "#475569", lineHeight: 1.65 }}>
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right screenshot column */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={data.interactiveTabs[activeTabIndex].image}
                        alt={data.interactiveTabs[activeTabIndex].heading}
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          borderRadius: "14px",
                          boxShadow: "0 14px 40px rgba(0, 0, 0, 0.09)",
                          border: "1.5px solid #f1f5f9",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* SECTION 3: BONUS CARDS (Exact match to onlyofficevietnam.com/thuyet-trinh/ 3-column features) */}
        {data.bonusCards && data.bonusCards.length > 0 && (
          <section
            style={{
              padding: "72px 20px 84px",
              background: "transparent",
              borderTop: "1px solid rgba(226, 232, 240, 0.6)",
            }}
          >
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 48px" }}>
                <h2
                  style={{
                    fontSize: "clamp(26px, 3.4vw, 36px)",
                    fontWeight: 800,
                    color: "#0f172a",
                    lineHeight: 1.25,
                    marginBottom: "12px",
                  }}
                >
                  {data.bonusCardsHeading || (isVi ? "Thiết Kế Đồng Bộ Tuyệt Đối" : "Absolute Consistency & Design")}
                </h2>
                <p style={{ fontSize: "16px", color: "#64748b", margin: 0, lineHeight: 1.6 }}>
                  {data.bonusCardsSubheading || (isVi ? "Tự tin trình chiếu trước đám đông" : "Confidence on stage with smart presenter tools")}
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
                  gap: "32px",
                }}
              >
                {data.bonusCards.map((bonus, bIdx) => (
                  <div
                    key={bIdx}
                    style={{
                      background: "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 252, 249, 0.94) 100%)",
                      backdropFilter: "blur(12px)",
                      borderRadius: "20px",
                      border: "1.5px solid rgba(255, 255, 255, 0.95)",
                      padding: "30px 28px",
                      boxShadow: "0 8px 24px -4px rgba(234, 88, 12, 0.06), 0 2px 6px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 1)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.borderColor = "rgba(255, 111, 61, 0.45)";
                      e.currentTarget.style.boxShadow = "0 20px 40px -10px rgba(255, 111, 61, 0.2), inset 0 1px 0 rgba(255, 255, 255, 1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.95)";
                      e.currentTarget.style.boxShadow = "0 8px 24px -4px rgba(234, 88, 12, 0.06), 0 2px 6px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 1)";
                    }}
                  >
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "14px",
                        backgroundColor: "rgba(255, 111, 61, 0.1)",
                        color: "#FF6F3D",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "18px",
                      }}
                    >
                      {bIdx === 0 ? (
                        <Layers size={24} />
                      ) : bIdx === 1 ? (
                        <Sparkles size={24} />
                      ) : (
                        <Clock size={24} />
                      )}
                    </div>
                    <h3
                      style={{
                        fontSize: "17.5px",
                        fontWeight: 700,
                        color: "#1e293b",
                        margin: "0 0 10px",
                        lineHeight: 1.35,
                      }}
                    >
                      {bonus.title}
                    </h3>
                    <p style={{ fontSize: "14.5px", color: "#64748b", lineHeight: 1.7, margin: 0 }}>
                      {bonus.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 4: DETAILED FEATURES BREAKDOWN */}
        <section
          style={{
            padding: "72px 20px 84px",
            background: "transparent",
            borderTop: "1px solid rgba(226, 232, 240, 0.6)",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 48px" }}>
              <h2
                style={{
                  fontSize: "clamp(26px, 3.4vw, 36px)",
                  fontWeight: 800,
                  color: "#0f172a",
                  lineHeight: 1.25,
                  marginBottom: "12px",
                }}
              >
                {isVi ? "Làm Việc Quen Tay — Tối Ưu Hiệu Quả" : "Familiar UX — Peak Productivity"}
              </h2>
              <p style={{ fontSize: "16px", color: "#64748b", margin: 0, lineHeight: 1.6 }}>
                {data.overviewText}
              </p>
            </div>

            {/* Feature Blocks Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
                gap: "24px",
              }}
            >
              {data.features.map((feat, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 252, 249, 0.94) 100%)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "20px",
                    border: "1.5px solid rgba(255, 255, 255, 0.95)",
                    padding: "28px 30px",
                    boxShadow: "0 8px 24px -4px rgba(234, 88, 12, 0.06), 0 2px 6px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 1)",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.borderColor = "rgba(255, 111, 61, 0.45)";
                    e.currentTarget.style.boxShadow = "0 20px 40px -10px rgba(255, 111, 61, 0.2), inset 0 1px 0 rgba(255, 255, 255, 1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.95)";
                    e.currentTarget.style.boxShadow = "0 8px 24px -4px rgba(234, 88, 12, 0.06), 0 2px 6px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 1)";
                  }}
                >
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 800,
                      color: "#1e293b",
                      marginBottom: "16px",
                      lineHeight: 1.35,
                    }}
                  >
                    {feat.title}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {feat.points.map((pt, pIdx) => (
                      <div key={pIdx} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <CheckCircle2 size={17} color="#ff6f3d" style={{ flexShrink: 0, marginTop: "3px" }} />
                        <span style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6 }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: COLLABORATION & ENTERPRISE VALUES */}
        <section
          style={{
            padding: "64px 20px 72px",
            background: "transparent",
            borderTop: "1px solid rgba(226, 232, 240, 0.6)",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 40px" }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#ff6f3d",
                  backgroundColor: "rgba(255, 111, 61, 0.09)",
                  padding: "4px 12px",
                  borderRadius: "100px",
                  textTransform: "uppercase",
                }}
              >
                {isVi ? "Cộng tác & Kết nối" : "Collaboration & Integration"}
              </span>
              <h2
                style={{
                  fontSize: "clamp(24px, 3.2vw, 34px)",
                  fontWeight: 800,
                  color: "#0f172a",
                  marginTop: "12px",
                  marginBottom: "8px",
                }}
              >
                {isVi ? "Kết Nối Dễ Dàng — Làm Việc Năng Suất" : "Seamless Team Connectivity"}
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                gap: "24px",
              }}
            >
              {data.collaborationBenefits.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(6px)",
                    borderRadius: "16px",
                    border: "1.5px solid #e2e8f0",
                    padding: "24px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(255, 111, 61, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "14px",
                      color: "#ff6f3d",
                    }}
                  >
                    {idx === 0 ? <Users2 size={20} /> : idx === 1 ? <Cpu size={20} /> : <ShieldCheck size={20} />}
                  </div>
                  <h4 style={{ fontSize: "16.5px", fontWeight: 800, color: "#1e293b", margin: "0 0 8px" }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.65, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: SWITCH TO OTHER 5 TOOLS */}
        <section
          style={{
            padding: "60px 20px 72px",
            background: "transparent",
            borderTop: "1px solid rgba(226, 232, 240, 0.6)",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a" }}>
                {isVi ? "Khám Phá Các Công Cụ Khác Trong ONLYOFFICE Docs" : "Explore Other ONLYOFFICE Docs Editors"}
              </h3>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "14px",
              }}
            >
              {allTools.map((tool) => {
                const isCurrent = tool.slug === data.slug;
                const IconComponent = tool.icon;
                return (
                  <Link
                    key={tool.slug}
                    href={`/${tool.slug}`}
                    style={{
                      backgroundColor: isCurrent ? "rgba(255, 111, 61, 0.1)" : "rgba(255, 255, 255, 0.88)",
                      border: isCurrent ? "2px solid #ff6f3d" : "1.5px solid #e2e8f0",
                      borderRadius: "14px",
                      padding: "16px",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.2s",
                      boxShadow: isCurrent ? "0 4px 14px rgba(255, 111, 61, 0.15)" : "none",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        backgroundColor: isCurrent ? "#ff6f3d" : "#f1f5f9",
                        color: isCurrent ? "#ffffff" : "#ff6f3d",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: isCurrent ? "#ea580c" : "#1e293b" }}>
                        {isVi ? tool.titleVi : tool.titleEn}
                      </div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>{tool.badge}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* BOTTOM BIG CTA */}
        <section
          style={{
            padding: "60px 20px",
            background: "linear-gradient(135deg, rgba(255, 244, 234, 0.7) 0%, rgba(253, 248, 244, 0.8) 100%)",
            borderTop: "1px solid rgba(226, 232, 240, 0.8)",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "clamp(24px, 3.4vw, 36px)",
                fontWeight: 800,
                color: "#1e293b",
                marginBottom: "14px",
                lineHeight: 1.3,
              }}
            >
              {isVi ? "Sẵn Sàng Nâng Tầm Văn Phòng Doanh Nghiệp?" : "Ready to Modernize Your Office Suite?"}
            </h2>
            <p style={{ fontSize: "16px", color: "#64748b", marginBottom: "28px" }}>
              {isVi
                ? "Hơn 21 triệu người dùng trên toàn thế giới đã tin tưởng chuyển đổi sang ONLYOFFICE Docs."
                : "Join 21+ million users worldwide deploying ONLYOFFICE Docs across private infrastructure."}
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
                <span>{isVi ? "Liên Hệ Tư Vấn Qua Messenger" : "Contact on Messenger"}</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
