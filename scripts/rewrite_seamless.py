import os

content = '''"use client";

import React, { useRef, useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { openMessengerChat } from "@/lib/messenger";
import {
  Sparkles,
  Share2,
  Users2,
  MessageSquare,
  Video,
  GitCommit,
  GitCompare,
  History,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  Layers,
  Check,
  ChevronRight,
} from "lucide-react";

interface FeatureSectionConfig {
  id: string;
  key: string;
  imageUrl: string;
  imageUrl2x: string;
}

const featuresList: FeatureSectionConfig[] = [
  {
    id: "share",
    key: "share",
    imageUrl: "https://static-site.onlyoffice.com/public/images/templates/seamless-collaboration/features/en/share-docs-providing-flexible-permissions.png",
    imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/seamless-collaboration/features/en/share-docs-providing-flexible-permissions@2x.png",
  },
  {
    id: "coedit",
    key: "coedit",
    imageUrl: "https://static-site.onlyoffice.com/public/images/templates/seamless-collaboration/features/en/co-edit-without-stress.png",
    imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/seamless-collaboration/features/en/co-edit-without-stress@2x.png",
  },
  {
    id: "comment",
    key: "comment",
    imageUrl: "https://static-site.onlyoffice.com/public/images/templates/seamless-collaboration/features/en/comment-mention.png",
    imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/seamless-collaboration/features/en/comment-mention@2x.png",
  },
  {
    id: "communicate",
    key: "communicate",
    imageUrl: "https://static-site.onlyoffice.com/public/images/templates/seamless-collaboration/features/en/communicate.png",
    imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/seamless-collaboration/features/en/communicate@2x.png",
  },
  {
    id: "track-changes",
    key: "trackChanges",
    imageUrl: "https://static-site.onlyoffice.com/public/images/templates/seamless-collaboration/features/en/track-changes.png",
    imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/seamless-collaboration/features/en/track-changes@2x.png",
  },
  {
    id: "compare-combine",
    key: "compareCombine",
    imageUrl: "https://static-site.onlyoffice.com/public/images/templates/seamless-collaboration/features/en/compare-combine.png",
    imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/seamless-collaboration/features/en/compare-combine@2x.png",
  },
  {
    id: "manage-versions",
    key: "manageVersions",
    imageUrl: "https://static-site.onlyoffice.com/public/images/templates/seamless-collaboration/features/en/manage-versions.png",
    imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/seamless-collaboration/features/en/manage-versions@2x.png",
  },
];

const tabsNavigation = [
  { id: "share", key: "share", icon: Share2 },
  { id: "coedit", key: "coedit", icon: Users2 },
  { id: "comment", key: "comment", icon: MessageSquare },
  { id: "communicate", key: "communicate", icon: Video },
  { id: "track-changes", key: "trackChanges", icon: GitCommit },
  { id: "compare-combine", key: "compareCombine", icon: GitCompare },
  { id: "manage-versions", key: "manageVersions", icon: History },
];

export default function SeamlessCollaborationPage() {
  const t = useTranslations("seamlessCollaboration");

  // Active section tracker
  const [activeTab, setActiveTab] = useState("share");

  // 3D Tilt state for hero preview
  const [rotateX, setRotateX] = useState(3);
  const [rotateY, setRotateY] = useState(-6);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateY(((x - centerX) / centerX) * 8);
    setRotateX(-(((y - centerY) / centerY) * 6));
  };

  const handleMouseLeave = () => {
    setRotateX(3);
    setRotateY(-6);
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (const feat of featuresList) {
        const el = document.getElementById(feat.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(feat.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", overflowX: "hidden", backgroundColor: "#fff" }}>
      <Header />

      <main style={{ minHeight: "100vh", position: "relative" }}>
        {/* HERO SECTION */}
        <section
          style={{
            position: "relative",
            padding: "56px 20px 64px",
            backgroundImage: "url(https://static-site.onlyoffice.com/public/images/templates/seamless-collaboration/hero/sc-bg.svg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
            backgroundSize: "cover",
            backgroundColor: "#fff8f5",
            borderBottom: "1px solid #fee8de",
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
                marginBottom: "24px",
                flexWrap: "wrap",
              }}
            >
              <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>
                {t("breadcrumb.home")}
              </Link>
              <span>/</span>
              <Link href="/docs" style={{ color: "#64748b", textDecoration: "none" }}>
                {t("breadcrumb.docs")}
              </Link>
              <span>/</span>
              <span style={{ color: "#ff6f3d", fontWeight: 700 }}>
                {t("breadcrumb.current")}
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "48px",
                alignItems: "center",
              }}
            >
              {/* Left Column: Heading, Subtitle & Action */}
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 14px",
                    borderRadius: "100px",
                    backgroundColor: "rgba(255, 111, 61, 0.12)",
                    border: "1px solid rgba(255, 111, 61, 0.25)",
                    marginBottom: "18px",
                  }}
                >
                  <Sparkles size={16} color="#ff6f3d" />
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#ff6f3d",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {t("hero.badge")}
                  </span>
                </div>

                <h1
                  style={{
                    fontSize: "clamp(28px, 4.4vw, 48px)",
                    fontWeight: 800,
                    color: "#1e293b",
                    lineHeight: 1.18,
                    marginBottom: "20px",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {t("hero.titlePrefix")}{" "}
                  <span style={{ color: "#ff6f3d" }}>{t("hero.titleHighlight")}</span>{" "}
                  {t("hero.titleSuffix")}
                </h1>

                <p
                  style={{
                    fontSize: "17.5px",
                    lineHeight: 1.65,
                    color: "#475569",
                    marginBottom: "32px",
                    fontWeight: 500,
                    maxWidth: "580px",
                  }}
                >
                  {t("hero.subtitle")}
                </p>

                {/* CTA Action Buttons */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "14px",
                    alignItems: "center",
                    marginBottom: "28px",
                  }}
                >
                  <Link
                    href="/demo"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      padding: "14px 28px",
                      borderRadius: "8px",
                      backgroundColor: "#ff6f3d",
                      color: "#fff",
                      fontSize: "15.5px",
                      fontWeight: 700,
                      textDecoration: "none",
                      boxShadow: "0 8px 24px -4px rgba(255, 111, 61, 0.4)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <span>{t("hero.startFree")}</span>
                    <ArrowRight size={18} />
                  </Link>

                  <button
                    onClick={openMessengerChat}
                    type="button"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      padding: "13px 24px",
                      borderRadius: "8px",
                      backgroundColor: "#ffffff",
                      color: "#0f172a",
                      fontSize: "15px",
                      fontWeight: 600,
                      border: "1.5px solid #cbd5e1",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <span>{t("hero.contactSales")}</span>
                  </button>
                </div>

                {/* Quick Trust Highlights */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    fontSize: "13px",
                    color: "#64748b",
                    fontWeight: 600,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <CheckCircle2 size={16} color="#16a34a" />
                    <span>{t("hero.trustSync")}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <CheckCircle2 size={16} color="#16a34a" />
                    <span>{t("hero.trustLock")}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <CheckCircle2 size={16} color="#16a34a" />
                    <span>{t("hero.trustVideo")}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Graphic Preview */}
              <div
                ref={stageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  perspective: "1000px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                    transition: "transform 0.15s ease-out",
                    width: "100%",
                    maxWidth: "600px",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 24px 60px -15px rgba(255, 111, 61, 0.25), 0 10px 25px -5px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(255, 111, 61, 0.2)",
                    backgroundColor: "#fff",
                  }}
                >
                  <img
                    src="https://static-site.onlyoffice.com/public/images/templates/seamless-collaboration/hero/en/sc-header.png"
                    srcSet="https://static-site.onlyoffice.com/public/images/templates/seamless-collaboration/hero/en/sc-header@2x.png 2x"
                    alt={t("hero.alt")}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STICKY EDITORS NAVIGATION TABS */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 40,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid #e2e8f0",
            boxShadow: "0 4px 16px -2px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "0 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              overflowX: "auto",
              scrollbarWidth: "none",
              whiteSpace: "nowrap",
            }}
          >
            {tabsNavigation.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  type="button"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "16px 14px",
                    fontSize: "14px",
                    fontWeight: isActive ? 700 : 600,
                    color: isActive ? "#ff6f3d" : "#475569",
                    border: "none",
                    background: "transparent",
                    borderBottom: isActive ? "3px solid #ff6f3d" : "3px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={15} color={isActive ? "#ff6f3d" : "#64748b"} />
                  <span>{t(`tabs.${tab.key}`)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FEATURES SHOWCASE (7 DEEP-DIVE SECTIONS) */}
        <section style={{ padding: "64px 20px 80px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "84px" }}>
            {featuresList.map((feat, index) => {
              const isEven = index % 2 === 1;
              const points = (t.raw(`features.${feat.key}.points`) as string[]) || [];

              return (
                <div
                  key={feat.id}
                  id={feat.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "48px",
                    alignItems: "center",
                    padding: "24px 0",
                  }}
                >
                  {/* Text Content */}
                  <div style={{ order: isEven ? 2 : 1 }}>
                    <div
                      style={{
                        display: "inline-block",
                        fontSize: "12px",
                        fontWeight: 800,
                        color: "#ea580c",
                        letterSpacing: "0.08em",
                        marginBottom: "12px",
                      }}
                    >
                      {t(`features.${feat.key}.badge`)}
                    </div>

                    <h2
                      style={{
                        fontSize: "clamp(24px, 3.2vw, 34px)",
                        fontWeight: 800,
                        color: "#0f172a",
                        lineHeight: 1.25,
                        marginBottom: "18px",
                      }}
                    >
                      {t(`features.${feat.key}.title`)}
                    </h2>

                    <p
                      style={{
                        fontSize: "16px",
                        lineHeight: 1.68,
                        color: "#475569",
                        marginBottom: "24px",
                        fontWeight: 500,
                      }}
                    >
                      {t(`features.${feat.key}.desc`)}
                    </p>

                    {/* Bullet Points */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
                      {points.map((point, pIndex) => (
                        <div key={pIndex} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                          <div
                            style={{
                              marginTop: "3px",
                              flexShrink: 0,
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              backgroundColor: "rgba(255, 111, 61, 0.12)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Check size={12} color="#ea580c" strokeWidth={3} />
                          </div>
                          <span style={{ fontSize: "14.5px", color: "#334155", lineHeight: 1.5, fontWeight: 500 }}>
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/demo"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        color: "#ff6f3d",
                        fontSize: "14.5px",
                        fontWeight: 700,
                        textDecoration: "underline",
                      }}
                    >
                      <span>{t(`features.${feat.key}.tryNow`)}</span>
                      <ChevronRight size={16} />
                    </Link>
                  </div>

                  {/* Image Graphic */}
                  <div
                    style={{
                      order: isEven ? 1 : 2,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        borderRadius: "14px",
                        overflow: "hidden",
                        boxShadow: "0 20px 48px -12px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04)",
                        border: "1px solid #e2e8f0",
                        backgroundColor: "#f8fafc",
                        transition: "transform 0.25s ease, box-shadow 0.25s ease",
                      }}
                    >
                      <img
                        src={feat.imageUrl}
                        srcSet={`${feat.imageUrl2x} 2x`}
                        alt={t(`features.${feat.key}.title`)}
                        loading="lazy"
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* COMPARISON MATRIX (ONLYOFFICE vs OTHERS) */}
        <section
          style={{
            padding: "80px 20px",
            backgroundColor: "#f8fafc",
            borderTop: "1px solid #e2e8f0",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 48px" }}>
              <div
                style={{
                  display: "inline-block",
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#ea580c",
                  letterSpacing: "0.08em",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                }}
              >
                {t("matrix.badge")}
              </div>
              <h2
                style={{
                  fontSize: "clamp(26px, 3.5vw, 36px)",
                  fontWeight: 800,
                  color: "#0f172a",
                  lineHeight: 1.25,
                  marginBottom: "16px",
                }}
              >
                {t("matrix.title")}
              </h2>
              <p style={{ fontSize: "16px", color: "#64748b", lineHeight: 1.6 }}>
                {t("matrix.subtitle")}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {[
                {
                  icon: Zap,
                  title: t("matrix.card1Title"),
                  desc: t("matrix.card1Desc"),
                },
                {
                  icon: Lock,
                  title: t("matrix.card2Title"),
                  desc: t("matrix.card2Desc"),
                },
                {
                  icon: Layers,
                  title: t("matrix.card3Title"),
                  desc: t("matrix.card3Desc"),
                },
                {
                  icon: Video,
                  title: t("matrix.card4Title"),
                  desc: t("matrix.card4Desc"),
                },
              ].map((card, cIndex) => {
                const CardIcon = card.icon;
                return (
                  <div
                    key={cIndex}
                    style={{
                      padding: "32px 24px",
                      borderRadius: "12px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "10px",
                        backgroundColor: "rgba(255, 111, 61, 0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <CardIcon size={24} color="#ea580c" />
                    </div>
                    <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", marginBottom: "12px" }}>
                      {card.title}
                    </h3>
                    <p style={{ fontSize: "14.5px", color: "#64748b", lineHeight: 1.6, flexGrow: 1 }}>
                      {card.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* BOTTOM ENTERPRISE TRIAL & MERCY TECH CTA */}
        <section
          style={{
            padding: "80px 20px 88px",
            backgroundColor: "#0f172a",
            color: "#ffffff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle background glow */}
          <div
            style={{
              position: "absolute",
              top: "-50%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 111, 61, 0.15)",
              filter: "blur(120px)",
              pointerEvents: "none",
            }}
          />

          <div style={{ maxWidth: "960px", margin: "0 auto", textAlign: "center", position: "relative" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "100px",
                backgroundColor: "rgba(255, 111, 61, 0.2)",
                border: "1px solid rgba(255, 111, 61, 0.4)",
                marginBottom: "20px",
              }}
            >
              <ShieldCheck size={16} color="#ff6f3d" />
              <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#ff6f3d", letterSpacing: "0.06em" }}>
                {t("cta.badge")}
              </span>
            </div>

            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.25,
                marginBottom: "20px",
              }}
            >
              {t("cta.title")}
            </h2>

            <p
              style={{
                fontSize: "17px",
                color: "#94a3b8",
                lineHeight: 1.65,
                maxWidth: "720px",
                margin: "0 auto 36px",
              }}
            >
              {t("cta.subtitle")}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                href="/demo"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "15px 32px",
                  borderRadius: "8px",
                  backgroundColor: "#ff6f3d",
                  color: "#ffffff",
                  fontSize: "16px",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 8px 24px rgba(255, 111, 61, 0.4)",
                  transition: "all 0.2s ease",
                }}
              >
                <span>{t("cta.buttonTrial")}</span>
                <ArrowRight size={18} />
              </Link>

              <button
                onClick={openMessengerChat}
                type="button"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 28px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  color: "#ffffff",
                  fontSize: "15.5px",
                  fontWeight: 600,
                  border: "1.5px solid rgba(255, 255, 255, 0.2)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <span>{t("cta.buttonConsult")}</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
'''

target_file = r"d:\mercy\testCloneGiaoDien\web\src\components\collaboration\SeamlessCollaborationPage.tsx"
with open(target_file, "w", encoding="utf-8") as f:
    f.write(content)

print("SeamlessCollaborationPage.tsx rewritten successfully with useTranslations!")
