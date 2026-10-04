"use client";

import React, { useState, useRef } from "react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { openMessengerChat } from "@/lib/messenger";
import {
  Download,
  MessageCircle,
  Share2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Users,
  FileText,
  Table as TableIcon,
  Presentation,
  Cpu,
  Lock,
  ArrowUpRight,
} from "lucide-react";

export default function DocsHero() {
  const locale = useLocale();
  const isVi = locale === "vi";

  // 3D Mouse Tilt Interactive Physics
  const [rotateX, setRotateX] = useState(4);
  const [rotateY, setRotateY] = useState(-8);
  const [isHovered, setIsHovered] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt calculation
    const rY = ((x - centerX) / centerX) * 12 - 4; // -16deg to +8deg
    const rX = -(((y - centerY) / centerY) * 10) + 4; // -6deg to +14deg

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(4);
    setRotateY(-8);
  };

  return (
    <section
      style={{
        padding: "80px 20px 96px",
        background: "transparent",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Ambient Lighting Orbs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(254, 215, 170, 0.35) 0%, rgba(255, 237, 213, 0.15) 50%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "5%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 111, 61, 0.18) 0%, rgba(254, 215, 170, 0.25) 45%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "56px",
          alignItems: "center",
        }}
        className="oo-3d-hero-grid"
      >
        <style>{`
          @media (min-width: 1040px) {
            .oo-3d-hero-grid {
              grid-template-columns: 0.9fr 1.1fr !important;
            }
          }
          @keyframes levitate3d {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }
          @keyframes pulseBeacon {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.6);
              opacity: 0.4;
            }
          }
          @keyframes cursorBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}</style>

        {/* LEFT COLUMN: High Impact 3D Hero Copy & CTAs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* 3D Glass Pill Tag */}
          <div style={{ alignSelf: "flex-start" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "7px 18px",
                borderRadius: "100px",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 247, 237, 0.9))",
                border: "1.5px solid #fed7aa",
                boxShadow: "0 4px 14px rgba(234, 88, 12, 0.12), inset 0 1px 1px #ffffff",
                backdropFilter: "blur(10px)",
              }}
            >
              <span
                style={{
                  position: "relative",
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  backgroundColor: "#ea580c",
                  display: "inline-block",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: "-3px",
                    borderRadius: "50%",
                    backgroundColor: "#ff6f3d",
                    animation: "pulseBeacon 2s infinite ease-in-out",
                    opacity: 0.6,
                  }}
                />
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#ea580c",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {isVi ? "THẾ HỆ MỚI • ONLYOFFICE DOCS 9.3" : "NEXT-GEN • ONLYOFFICE DOCS 9.3"}
              </span>
            </div>
          </div>

          {/* Heading with 3D Depth Styling */}
          <h1
            style={{
              fontSize: "clamp(32px, 4.4vw, 50px)",
              fontWeight: 900,
              color: "#0f172a",
              lineHeight: 1.14,
              letterSpacing: "-0.8px",
              margin: 0,
            }}
          >
            {isVi ? (
              <>
                BỘ SOẠN THẢO VĂN PHÒNG
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 50%, #c2410c 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 2px 20px rgba(255, 111, 61, 0.25)",
                  }}
                >
                  TOÀN DIỆN &amp; BẢO MẬT
                </span>
              </>
            ) : (
              <>
                ALL-IN-ONE OFFICE SUITE
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 50%, #c2410c 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 2px 20px rgba(255, 111, 61, 0.25)",
                  }}
                >
                  SECURE &amp; COLLABORATIVE
                </span>
              </>
            )}
          </h1>

          {/* Subtitle & Value Promise */}
          <p
            style={{
              fontSize: "16.5px",
              color: "#475569",
              lineHeight: 1.65,
              margin: 0,
              maxWidth: "580px",
            }}
          >
            {isVi
              ? "Tương thích 95%+ mọi định dạng MS Office (.docx, .xlsx, .pptx). Tự chủ triển khai máy chủ riêng hoặc Private Cloud, tối ưu 90% chi phí bản quyền IT cho doanh nghiệp Việt."
              : "100% native MS Office compatibility (.docx, .xlsx, .pptx). Deploy on private on-premises infrastructure with bank-level encryption and full data sovereignty."}
          </p>

          {/* 3D Mini Stats Glass Strip */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "14px",
              padding: "16px 20px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 247, 237, 0.7))",
              border: "1.5px solid #fed7aa",
              boxShadow: "0 10px 28px -6px rgba(234, 88, 12, 0.1), inset 0 1px 2px #ffffff",
              backdropFilter: "blur(12px)",
              margin: "6px 0",
            }}
          >
            <div>
              <div style={{ fontSize: "21px", fontWeight: 900, color: "#ea580c", lineHeight: 1.1 }}>
                95%+
              </div>
              <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 600, marginTop: "2px" }}>
                {isVi ? "Tương thích MS Office" : "MS Office Match"}
              </div>
            </div>
            <div style={{ borderLeft: "1px solid #fed7aa", paddingLeft: "14px" }}>
              <div style={{ fontSize: "21px", fontWeight: 900, color: "#0f172a", lineHeight: 1.1 }}>
                100%
              </div>
              <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 600, marginTop: "2px" }}>
                {isVi ? "Tự chủ dữ liệu nội bộ" : "Data Ownership"}
              </div>
            </div>
            <div style={{ borderLeft: "1px solid #fed7aa", paddingLeft: "14px" }}>
              <div style={{ fontSize: "21px", fontWeight: 900, color: "#16a34a", lineHeight: 1.1 }}>
                0đ
              </div>
              <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 600, marginTop: "2px" }}>
                {isVi ? "Dùng thử 7 ngày" : "7-Day Free Trial"}
              </div>
            </div>
          </div>

          {/* 3D Action Buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
              marginTop: "4px",
            }}
          >
            {/* Primary 3D Download Button */}
            <Link
              href="/demo"
              style={{
                background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                color: "#ffffff",
                padding: "15px 30px",
                borderRadius: "100px",
                fontWeight: 800,
                fontSize: "15.5px",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                boxShadow: "0 14px 30px -6px rgba(234, 88, 12, 0.48), 0 4px 10px rgba(0,0,0,0.06), inset 0 1px 1px rgba(255,255,255,0.4)",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 20px 38px -6px rgba(234, 88, 12, 0.58), inset 0 1px 1px rgba(255,255,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 14px 30px -6px rgba(234, 88, 12, 0.48), 0 4px 10px rgba(0,0,0,0.06), inset 0 1px 1px rgba(255,255,255,0.4)";
              }}
            >
              <Download size={18} strokeWidth={2.6} />
              <span>{isVi ? "Tải miễn phí về Desktop" : "Free Desktop Download"}</span>
            </Link>

            {/* Glass Outline Messenger Consultation */}
            <a
              href="https://www.messenger.com/t/286163107904324"
              target="_blank"
              rel="noopener noreferrer"
              onClick={openMessengerChat}
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                border: "1.5px solid #cbd5e1",
                padding: "14px 26px",
                borderRadius: "100px",
                fontSize: "15px",
                fontWeight: 700,
                color: "#1e293b",
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(15, 23, 42, 0.05), inset 0 1px 1px #ffffff",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = "#ff6f3d";
                e.currentTarget.style.color = "#ea580c";
                e.currentTarget.style.boxShadow = "0 10px 24px rgba(234, 88, 12, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "#cbd5e1";
                e.currentTarget.style.color = "#1e293b";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(15, 23, 42, 0.05)";
              }}
            >
              <MessageCircle size={17} color="#ea580c" />
              <span>{isVi ? "Tư vấn chuyên sâu 1:1" : "1:1 Expert Advice"}</span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D INTERACTIVE UI/UX STAGE */}
        <div
          ref={stageRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            position: "relative",
            minHeight: "560px",
            perspective: "1300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {/* Levitation & 3D Tilt Wrapper */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "680px",
              transformStyle: "preserve-3d",
              transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
              transition: isHovered ? "transform 0.1s ease-out" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              animation: "levitate3d 6s ease-in-out infinite",
            }}
          >
            {/* 3D BASE SHADOW MATTE */}
            <div
              style={{
                position: "absolute",
                inset: "40px 30px -30px",
                background: "radial-gradient(ellipse at center, rgba(234, 88, 12, 0.35) 0%, rgba(15, 23, 42, 0.18) 45%, transparent 70%)",
                filter: "blur(24px)",
                transform: "translateZ(-60px)",
                zIndex: 0,
              }}
            />

            {/* ══ LAYER 1: MAIN 3D EDITOR WINDOW ══ */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                border: "2px solid rgba(254, 215, 170, 0.9)",
                boxShadow: `
                  0 35px 70px -15px rgba(234, 88, 12, 0.18),
                  0 20px 35px -10px rgba(15, 23, 42, 0.14),
                  inset 0 1px 2px #ffffff
                `,
                overflow: "hidden",
                transform: "translateZ(0px)",
              }}
            >
              {/* macOS Chrome Header Bar */}
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  borderBottom: "1.5px solid #f1f5f9",
                  padding: "12px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* 3 Colored Mac Dots */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      width: "11px",
                      height: "11px",
                      borderRadius: "50%",
                      backgroundColor: "#ff5f56",
                      boxShadow: "0 1px 3px rgba(239, 68, 68, 0.5)",
                    }}
                  />
                  <span
                    style={{
                      width: "11px",
                      height: "11px",
                      borderRadius: "50%",
                      backgroundColor: "#ffbd2e",
                      boxShadow: "0 1px 3px rgba(245, 158, 11, 0.5)",
                    }}
                  />
                  <span
                    style={{
                      width: "11px",
                      height: "11px",
                      borderRadius: "50%",
                      backgroundColor: "#27c93f",
                      boxShadow: "0 1px 3px rgba(16, 185, 129, 0.5)",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#1e293b",
                      marginLeft: "10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>Chiến Lược Chuyển Đổi Số 2026.docx</span>
                    <span style={{ fontSize: "10px", color: "#16a34a", backgroundColor: "#f0fdf4", padding: "1px 6px", borderRadius: "4px", fontWeight: 700 }}>
                      Đã lưu
                    </span>
                  </span>
                </div>

                {/* Header Right Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span
                    style={{
                      backgroundColor: "#ff6f3d",
                      color: "#ffffff",
                      fontSize: "11.5px",
                      fontWeight: 800,
                      padding: "5px 14px",
                      borderRadius: "100px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      boxShadow: "0 2px 8px rgba(255, 111, 61, 0.35)",
                    }}
                  >
                    <Share2 size={12} />
                    <span>Chia sẻ</span>
                  </span>
                </div>
              </div>

              {/* Editor Tabs Ribbon */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  padding: "9px 20px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#64748b",
                  borderBottom: "1px solid #f1f5f9",
                  backgroundColor: "#ffffff",
                  whiteSpace: "nowrap",
                }}
              >
                <span>Tập tin</span>
                <span style={{ color: "#ea580c", borderBottom: "2.5px solid #ea580c", paddingBottom: "5px" }}>
                  Trang chủ
                </span>
                <span>Chèn</span>
                <span>Bố cục</span>
                <span>Tham chiếu</span>
                <span>Cộng tác</span>
                <span>Xem</span>
                <span
                  style={{
                    color: "#7c3aed",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    backgroundColor: "#f5f3ff",
                    padding: "1px 8px",
                    borderRadius: "6px",
                  }}
                >
                  <Sparkles size={12} />
                  <span>Trợ lý AI</span>
                </span>
              </div>

              {/* Document Page Content with 3D elements */}
              <div style={{ padding: "26px 30px 24px", backgroundColor: "#ffffff" }}>
                {/* Title & Badge */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div>
                    <h3 style={{ fontSize: "21px", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
                      Kế Hoạch Triển Khai ONLYOFFICE Doanh Nghiệp
                    </h3>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                      Mô hình Private Cloud tích hợp 100% chuẩn văn phòng số Việt Nam
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#16a34a",
                      backgroundColor: "#f0fdf4",
                      border: "1px solid #bbf7d0",
                      padding: "4px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    Bảo mật cấp độ 3
                  </span>
                </div>

                {/* 3D Visual Graph / Performance Board */}
                <div
                  style={{
                    margin: "18px 0 20px",
                    padding: "16px 20px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #fff7ed 0%, #ffffff 50%, #fff7ed 100%)",
                    border: "1.5px solid #fed7aa",
                    boxShadow: "0 4px 14px rgba(234, 88, 12, 0.08)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 800, color: "#ea580c", textTransform: "uppercase" }}>
                      HIỆU QUẢ TỐI ƯU HẠ TẦNG IT
                    </span>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#16a34a" }}>
                      +142% Hiệu suất công việc
                    </span>
                  </div>

                  {/* 3D Bar Comparison */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", color: "#64748b", marginBottom: "3px" }}>
                        <span>Tốc độ mở tài liệu 100MB+</span>
                        <strong style={{ color: "#ea580c" }}>0.8 giây (Siêu tốc)</strong>
                      </div>
                      <div style={{ height: "8px", borderRadius: "100px", backgroundColor: "#fed7aa", overflow: "hidden" }}>
                        <div style={{ width: "94%", height: "100%", background: "linear-gradient(90deg, #ff6f3d, #ea580c)" }} />
                      </div>
                    </div>

                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", color: "#64748b", marginBottom: "3px" }}>
                        <span>Tiết kiệm ngân sách phần mềm</span>
                        <strong style={{ color: "#16a34a" }}>Giảm 90% chi phí dài hạn</strong>
                      </div>
                      <div style={{ height: "8px", borderRadius: "100px", backgroundColor: "#e2e8f0", overflow: "hidden" }}>
                        <div style={{ width: "90%", height: "100%", background: "linear-gradient(90deg, #22c55e, #16a34a)" }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live typing text line with blinking cursor */}
                <div
                  style={{
                    fontSize: "13.5px",
                    color: "#334155",
                    lineHeight: 1.6,
                    padding: "10px 14px",
                    borderRadius: "8px",
                    backgroundColor: "#f8fafc",
                    border: "1px dashed #cbd5e1",
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                  }}
                >
                  <span>
                    Hỗ trợ triển khai On-Premises &amp; cụm Kubernetes cho 50 đến hơn 10.000 kết nối đồng thời
                  </span>
                  <span
                    style={{
                      display: "inline-block",
                      width: "2px",
                      height: "16px",
                      backgroundColor: "#ff6f3d",
                      animation: "cursorBlink 1s infinite",
                    }}
                  />
                </div>
              </div>

              {/* Bottom Live Bar */}
              <div
                style={{
                  backgroundColor: "#fff7ed",
                  borderTop: "1.5px solid #fed7aa",
                  padding: "11px 22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#ff6f3d", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800, border: "2px solid #fff" }}>
                      T
                    </div>
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#16a34a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800, border: "2px solid #fff", marginLeft: "-6px" }}>
                      M
                    </div>
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#7c3aed", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800, border: "2px solid #fff", marginLeft: "-6px" }}>
                      L
                    </div>
                  </div>
                  <span style={{ color: "#334155", fontWeight: 700 }}>
                    Thảo, Minh (Mercy Tech) &amp; 3 người khác đang cộng tác
                  </span>
                </div>
                <span style={{ color: "#ea580c", fontWeight: 800 }}>Real-time Sync</span>
              </div>
            </div>

            {/* ══ LAYER 2: FLOATING 3D W/X/P OFFICE FORMAT CHIPS (Top-Left) ══ */}
            <div
              style={{
                position: "absolute",
                top: "-24px",
                left: "-28px",
                zIndex: 10,
                transform: "translateZ(55px)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {/* Word Badge */}
              <div
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "14px",
                  backgroundColor: "#ffffff",
                  border: "1.5px solid #bfdbfe",
                  boxShadow: "0 14px 28px rgba(37, 99, 235, 0.25), inset 0 1px 1px #fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: "rotate(-6deg)",
                  transition: "transform 0.2s ease",
                }}
              >
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "16px" }}>
                  W
                </div>
              </div>

              {/* Excel Badge */}
              <div
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "14px",
                  backgroundColor: "#ffffff",
                  border: "1.5px solid #bbf7d0",
                  boxShadow: "0 14px 28px rgba(22, 163, 74, 0.25), inset 0 1px 1px #fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "12px",
                  transform: "rotate(4deg)",
                  transition: "transform 0.2s ease",
                }}
              >
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#16a34a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "16px" }}>
                  X
                </div>
              </div>

              {/* PowerPoint Badge */}
              <div
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "14px",
                  backgroundColor: "#ffffff",
                  border: "1.5px solid #fed7aa",
                  boxShadow: "0 14px 28px rgba(234, 88, 12, 0.25), inset 0 1px 1px #fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: "rotate(-3deg)",
                  transition: "transform 0.2s ease",
                }}
              >
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#ea580c", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "16px" }}>
                  P
                </div>
              </div>
            </div>

            {/* ══ LAYER 3: FLOATING 3D COLLABORATION COMMENT WIDGET (Top-Right) ══ */}
            <div
              style={{
                position: "absolute",
                top: "32px",
                right: "-24px",
                zIndex: 12,
                transform: "translateZ(75px)",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 247, 237, 0.95))",
                backdropFilter: "blur(16px)",
                borderRadius: "16px",
                border: "1.5px solid #fed7aa",
                padding: "12px 18px",
                boxShadow: "0 22px 45px -8px rgba(234, 88, 12, 0.24), 0 8px 16px rgba(0,0,0,0.06)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                maxWidth: "260px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "#16a34a",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "14px",
                  flexShrink: 0,
                  boxShadow: "0 2px 8px rgba(22, 163, 74, 0.4)",
                }}
              >
                ✓
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 800, color: "#ea580c", textTransform: "uppercase" }}>
                  ĐỒNG BỘ THÀNH CÔNG
                </div>
                <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#1e293b", marginTop: "1px" }}>
                  48 máy trạm đã kích hoạt bản quyền
                </div>
              </div>
            </div>

            {/* ══ LAYER 4: FLOATING 3D AI ASSISTANT CHIP (Bottom-Left) ══ */}
            <div
              style={{
                position: "absolute",
                bottom: "-20px",
                left: "-20px",
                zIndex: 11,
                transform: "translateZ(65px)",
                background: "linear-gradient(135deg, #ffffff 0%, #fdf4ff 100%)",
                backdropFilter: "blur(16px)",
                borderRadius: "16px",
                border: "1.5px solid #e9d5ff",
                padding: "12px 18px",
                boxShadow: "0 20px 40px -8px rgba(124, 58, 237, 0.25), 0 6px 14px rgba(0,0,0,0.05)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #9333ea, #7c3aed)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 4px 10px rgba(124, 58, 237, 0.35)",
                }}
              >
                <Sparkles size={18} />
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#7c3aed" }}>
                  ONLYOFFICE AI Assistant
                </div>
                <div style={{ fontSize: "11.5px", color: "#64748b" }}>
                  Dịch tài liệu &bull; Tóm tắt báo cáo 30s
                </div>
              </div>
            </div>

            {/* ══ LAYER 5: FLOATING 3D SECURITY BADGE (Bottom-Right) ══ */}
            <div
              style={{
                position: "absolute",
                bottom: "28px",
                right: "-20px",
                zIndex: 10,
                transform: "translateZ(50px)",
                background: "linear-gradient(135deg, #ffffff 0%, #fff7ed 100%)",
                borderRadius: "14px",
                border: "1.5px solid #fed7aa",
                padding: "10px 16px",
                boxShadow: "0 18px 36px -6px rgba(234, 88, 12, 0.2), 0 4px 10px rgba(0,0,0,0.05)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <ShieldCheck size={18} color="#ea580c" />
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#1e293b" }}>
                Nghị định 341/2025/NĐ-CP
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
