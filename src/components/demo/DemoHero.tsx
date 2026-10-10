"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { FileText, Download, ShieldAlert, CheckCircle2, ShieldCheck, Zap, ArrowRight } from "lucide-react";

export default function DemoHero() {
  const t = useTranslations("demo.hero");

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="demo-hero-section">
      <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Official Distributor Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "7px 20px",
            borderRadius: "9999px",
            backgroundColor: "#ffffff",
            border: "1.5px solid #fed7aa",
            marginBottom: "20px",
            boxShadow: "0 4px 14px rgba(234, 88, 12, 0.08)",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#16a34a",
              display: "inline-block",
              boxShadow: "0 0 0 2px rgba(22, 163, 74, 0.2)",
            }}
          />
          <span
            style={{
              fontSize: "12px",
              fontWeight: 800,
              color: "#ea580c",
              letterSpacing: "0.4px",
              textTransform: "uppercase",
            }}
          >
            {t("distributorBadge")}
          </span>
        </div>

        {/* Main Heading */}
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 800,
            lineHeight: 1.2,
            color: "#0f172a",
            margin: "0 0 18px",
            letterSpacing: "-0.025em",
          }}
        >
          {t("title")}
          <span
            style={{
              background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            {t("titleHighlight")}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(15px, 2vw, 17px)",
            lineHeight: 1.65,
            color: "#475569",
            maxWidth: "780px",
            margin: "0 auto 32px",
            fontWeight: 500,
          }}
        >
          {t("subtitle")}
        </p>

        {/* Mobile & Desktop Responsive Styles */}
        <style>{`
          .demo-hero-section {
            padding: 56px 20px 36px;
            text-align: center;
            background: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255, 111, 61, 0.12), transparent 70%), linear-gradient(180deg, #fffbf7 0%, #ffffff 100%);
            border-bottom: 1px solid #f1f5f9;
            position: relative;
            overflow: hidden;
          }
          .demo-hero-action-container {
            max-width: 960px;
            margin: 0 auto 36px;
            display: flex;
            flex-direction: column;
            gap: 14px;
            width: 100%;
            box-sizing: border-box;
          }
          .demo-hero-cta-btn {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            padding: 20px 28px;
            border-radius: 18px;
            background: linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%);
            border: none;
            cursor: pointer;
            box-shadow: 0 10px 28px rgba(234, 88, 12, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.25);
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            text-align: left;
            color: #ffffff;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
          }
          .demo-hero-cta-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 16px 36px rgba(234, 88, 12, 0.48), inset 0 1px 0 rgba(255, 255, 255, 0.35);
          }
          .demo-hero-cta-content {
            display: flex;
            align-items: center;
            gap: 18px;
            position: relative;
            z-index: 1;
            flex: 1;
            min-width: 0;
            box-sizing: border-box;
          }
          .demo-hero-cta-icon {
            width: 52px;
            height: 52px;
            border-radius: 14px;
            background-color: rgba(255, 255, 255, 0.22);
            border: 1.5px solid rgba(255, 255, 255, 0.35);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
          }
          .demo-hero-cta-text {
            flex: 1;
            min-width: 0;
            box-sizing: border-box;
          }
          .demo-hero-cta-title {
            font-size: clamp(18px, 2.5vw, 22px);
            font-weight: 800;
            color: #ffffff;
            letter-spacing: -0.01em;
            line-height: 1.25;
            word-break: break-word;
          }
          .demo-hero-cta-sub {
            font-size: 13.5px;
            color: rgba(255, 255, 255, 0.92);
            margin-top: 4px;
            font-weight: 500;
            line-height: 1.45;
            word-break: break-word;
          }
          .demo-hero-cta-action-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 11px 22px;
            border-radius: 12px;
            background-color: #ffffff;
            color: #ea580c;
            font-weight: 800;
            font-size: 14px;
            flex-shrink: 0;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
            position: relative;
            z-index: 1;
            white-space: nowrap;
            box-sizing: border-box;
          }
          .demo-hero-secondary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 14px;
            width: 100%;
            box-sizing: border-box;
          }
          .demo-hero-guarantees {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 24px;
            padding: 14px 20px;
            border-radius: 14px;
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            max-width: 960px;
            margin: 0 auto;
            font-size: 13px;
            color: "#475569";
            font-weight: 600;
            box-sizing: border-box;
          }

          @media (max-width: 768px) {
            .demo-hero-section {
              padding: 32px 14px 24px !important;
            }
            .demo-hero-action-container {
              gap: 12px !important;
              margin-bottom: 24px !important;
            }
            .demo-hero-cta-btn {
              flex-direction: column !important;
              align-items: stretch !important;
              padding: 18px 14px !important;
              gap: 14px !important;
              border-radius: 16px !important;
            }
            .demo-hero-cta-content {
              align-items: flex-start !important;
              gap: 12px !important;
              width: 100% !important;
            }
            .demo-hero-cta-icon {
              width: 44px !important;
              height: 44px !important;
              min-width: 44px !important;
              border-radius: 12px !important;
            }
            .demo-hero-cta-title {
              font-size: 17.5px !important;
              line-height: 1.3 !important;
            }
            .demo-hero-cta-sub {
              font-size: 12.5px !important;
              line-height: 1.45 !important;
              margin-top: 3px !important;
            }
            .demo-hero-cta-action-badge {
              width: 100% !important;
              padding: 12px 16px !important;
              box-sizing: border-box !important;
              font-size: 14px !important;
              justify-content: center !important;
              margin-top: 2px !important;
            }
            .demo-hero-secondary-grid {
              grid-template-columns: 1fr !important;
              gap: 10px !important;
            }
            .demo-hero-guarantees {
              display: grid !important;
              grid-template-columns: 1fr 1fr !important;
              gap: 10px !important;
              padding: 12px 14px !important;
              font-size: 11.5px !important;
              text-align: left !important;
            }
          }

          @media (max-width: 440px) {
            .demo-hero-guarantees {
              grid-template-columns: 1fr !important;
              gap: 8px !important;
            }
          }
        `}</style>

        {/* Action Section: Big Orange Trial Button on Top + 2 Secondary Options Below */}
        <div className="demo-hero-action-container">
          {/* Primary Action Button: DÙNG THỬ 7 NGÀY (PC) - Big, Orange, On Top */}
          <button
            type="button"
            onClick={() => scrollTo("demo-pc")}
            className="demo-hero-cta-btn"
          >
            {/* Subtle background glow element */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "320px",
                height: "100%",
                background: "radial-gradient(ellipse at 100% 50%, rgba(255, 255, 255, 0.18), transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div className="demo-hero-cta-content">
              <div className="demo-hero-cta-icon">
                <Download size={24} color="#ffffff" strokeWidth={2.5} />
              </div>
              <div className="demo-hero-cta-text">
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: "10.5px",
                      fontWeight: 800,
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                      color: "#ffffff",
                      padding: "2px 8px",
                      borderRadius: "9999px",
                      letterSpacing: "0.4px",
                      textTransform: "uppercase",
                      display: "inline-flex",
                      alignItems: "center",
                      lineHeight: "1.4",
                    }}
                  >
                    ★ KHUYÊN DÙNG • 1-CLICK TỰ ĐỘNG (.BAT)
                  </span>
                  <span
                    style={{
                      fontSize: "10.5px",
                      fontWeight: 700,
                      backgroundColor: "#ffffff",
                      color: "#ea580c",
                      padding: "2px 7px",
                      borderRadius: "9999px",
                      lineHeight: "1.4",
                    }}
                  >
                    MIỄN PHÍ 100%
                  </span>
                </div>
                <div className="demo-hero-cta-title">
                  {t("card2Title").replace(/^[0-9.]+\s*/, "")}
                </div>
                <div className="demo-hero-cta-sub">
                  {t("card2Sub")} — Cài đặt tự động & tiêm bản quyền Enterprise đầy đủ tính năng kèm 3 Plugin AI
                </div>
              </div>
            </div>

            {/* Right Action Badge */}
            <div className="demo-hero-cta-action-badge">
              <span>Tải & Dùng Thử Ngay</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </div>
          </button>

          {/* Secondary 2 Options Row: Cloud Demo & MercyCheck */}
          <div className="demo-hero-secondary-grid">
            {/* Card 1: Cloud Suite Demo */}
            <button
              type="button"
              onClick={() => scrollTo("demo-online")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "16px 20px",
                borderRadius: "16px",
                backgroundColor: "#ffffff",
                border: "1.5px solid #e2e8f0",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#ff6f3d";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 24px rgba(255, 111, 61, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(15, 23, 42, 0.04)";
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "#fff7ed",
                  border: "1px solid #fed7aa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <FileText size={22} color="#ea580c" />
              </div>
              <div>
                <div style={{ fontSize: "14.5px", fontWeight: 700, color: "#0f172a", marginBottom: "2px" }}>
                  {t("card1Title")}
                </div>
                <div style={{ fontSize: "12.5px", color: "#64748b" }}>
                  {t("card1Sub")} — Trải nghiệm trực tiếp trên trình duyệt
                </div>
              </div>
            </button>

            {/* Card 3: MercyCheck */}
            <button
              type="button"
              onClick={() => scrollTo("mercy-check")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "16px 20px",
                borderRadius: "16px",
                backgroundColor: "#ffffff",
                border: "1.5px solid #e2e8f0",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#dc2626";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 24px rgba(220, 38, 38, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(15, 23, 42, 0.04)";
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <ShieldAlert size={22} color="#dc2626" />
              </div>
              <div>
                <div style={{ fontSize: "14.5px", fontWeight: 700, color: "#0f172a", marginBottom: "2px" }}>
                  {t("card3Title").replace(/^3\./, "2.")}
                </div>
                <div style={{ fontSize: "12.5px", color: "#64748b" }}>
                  {t("card3Sub")} — Rà soát rủi ro bảo mật & kiểm tra bản quyền
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Feature Guarantees Strip */}
        <div className="demo-hero-guarantees">
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
            <CheckCircle2 size={16} color="#16a34a" />
            <span>{t("noAccount")}</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
            <CheckCircle2 size={16} color="#16a34a" />
            <span>{t("msCompat")}</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
            <ShieldCheck size={16} color="#ea580c" />
            <span>{t("security")}</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
            <Zap size={16} color="#ea580c" />
            <span>{t("speed")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
