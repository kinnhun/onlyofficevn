"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { BlogPost, getBlogPosts } from "@/components/blog/blogData";

export default function BlogPage() {
  const t = useTranslations("blogPage");
  const locale = useLocale();
  const isVi = locale === "vi";

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const posts: BlogPost[] = getBlogPosts(isVi);

  const filteredPosts =
    activeCategory === "all" ? posts : posts.filter((p) => p.category === activeCategory);

  const featuredPost = posts.find((p) => p.featured) || posts[0];

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc", paddingBottom: "80px" }}>
        {/* Hero Section */}
        <section style={{ padding: "64px 20px 40px", textAlign: "center", maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-block",
              background: "#fff7ed",
              color: "#ea580c",
              border: "1px solid #fed7aa",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              marginBottom: "16px",
            }}
          >
            {t("badge")}
          </div>

          <h1
            style={{
              fontSize: "42px",
              fontWeight: 800,
              color: "#1e293b",
              lineHeight: 1.25,
              margin: "0 0 16px",
            }}
          >
            {t("title")}
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#64748b",
              maxWidth: "760px",
              margin: "0 auto 36px",
              lineHeight: 1.6,
            }}
          >
            {t("subtitle")}
          </p>

          {/* Filter Pills */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {[
              { id: "all", label: t("filterAll") },
              { id: "release", label: t("filterRelease") },
              { id: "guides", label: t("filterGuides") },
              { id: "security", label: t("filterSecurity") },
              { id: "stories", label: t("filterStories") },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: activeCategory === cat.id ? "#ff6f3d" : "#ffffff",
                  color: activeCategory === cat.id ? "#ffffff" : "#475569",
                  border: activeCategory === cat.id ? "1px solid #ff6f3d" : "1px solid #cbd5e1",
                  borderRadius: "20px",
                  padding: "8px 18px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: activeCategory === cat.id ? "0 2px 8px rgba(255, 111, 61, 0.3)" : "none",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Post Card */}
        {activeCategory === "all" && featuredPost && (
          <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px 48px" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                borderRadius: "20px",
                padding: "44px 40px",
                color: "#ffffff",
                boxShadow: "0 12px 35px rgba(15, 23, 42, 0.15)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                <span
                  style={{
                    background: "#ff6f3d",
                    color: "#ffffff",
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "4px 12px",
                    borderRadius: "12px",
                    letterSpacing: "0.06em",
                  }}
                >
                  {t("featured")}
                </span>
                <span style={{ fontSize: "13px", color: "#94a3b8" }}>{featuredPost.date}</span>
                <span style={{ fontSize: "13px", color: "#94a3b8" }}>•</span>
                <span style={{ fontSize: "13px", color: "#94a3b8" }}>
                  {featuredPost.readTime} {t("readTime")}
                </span>
              </div>

              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  lineHeight: 1.35,
                  margin: 0,
                  maxWidth: "920px",
                }}
              >
                {featuredPost.title}
              </h2>

              <p
                style={{
                  fontSize: "16px",
                  color: "#cbd5e1",
                  lineHeight: 1.6,
                  margin: 0,
                  maxWidth: "840px",
                }}
              >
                {featuredPost.excerpt}
              </p>

              <div style={{ display: "flex", gap: "16px", marginTop: "12px", flexWrap: "wrap" }}>
                <button
                  onClick={() => setSelectedPost(featuredPost)}
                  style={{
                    backgroundColor: "#ff6f3d",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 24px",
                    fontWeight: 700,
                    fontSize: "14px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>📖</span>
                  <span>{t("readMore")}</span>
                </button>

                <a
                  href="/api/download-trial"
                  download="Kich-Hoat-Demo-OnlyOffice-Mercy.bat"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                    color: "#ffffff",
                    textDecoration: "none",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    borderRadius: "8px",
                    padding: "12px 24px",
                    fontWeight: 700,
                    fontSize: "14px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>⚡</span>
                  <span>{isVi ? "Tải File Kích Hoạt Dùng Thử .BAT" : "Download Trial .BAT Tool"}</span>
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "28px",
            }}
          >
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedPost(post)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.03)";
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span
                      style={{
                        background: "#f1f5f9",
                        color: "#475569",
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: "12px",
                      }}
                    >
                      {post.categoryName}
                    </span>
                    <span style={{ fontSize: "12px", color: "#94a3b8" }}>{post.date}</span>
                  </div>

                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#1e293b",
                      lineHeight: 1.45,
                      margin: "0 0 12px",
                    }}
                  >
                    {post.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "14px",
                      color: "#64748b",
                      lineHeight: 1.6,
                      margin: "0 0 20px",
                    }}
                  >
                    {post.excerpt}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid #f1f5f9",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>
                    {post.author} • {post.readTime} {t("readTime")}
                  </span>
                  <span style={{ color: "#ff6f3d", fontWeight: 700, fontSize: "13px" }}>
                    {t("readMore")} →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Article Detail Modal */}
        {selectedPost && (
          <div
            role="dialog"
            aria-modal="true"
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(6px)",
              zIndex: 10000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
            onClick={() => setSelectedPost(null)}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                maxWidth: "680px",
                width: "100%",
                maxHeight: "85vh",
                overflowY: "auto",
                padding: "36px",
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPost(null)}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#64748b",
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                ✕
              </button>

              <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ background: "#fff7ed", color: "#ea580c", fontSize: "12px", fontWeight: 700, padding: "3px 10px", borderRadius: "12px" }}>
                  {selectedPost.categoryName}
                </span>
                <span style={{ fontSize: "13px", color: "#94a3b8" }}>{selectedPost.date}</span>
                <span style={{ fontSize: "13px", color: "#94a3b8" }}>• {selectedPost.author}</span>
              </div>

              <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#1e293b", margin: "0 0 18px", lineHeight: 1.35 }}>
                {selectedPost.title}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", color: "#334155", fontSize: "15px", lineHeight: 1.7, marginBottom: "28px" }}>
                {selectedPost.content.map((p, idx) => (
                  <p key={idx} style={{ margin: 0 }}>{p}</p>
                ))}
              </div>

              {selectedPost.id === "trial-guide" && (
                <div style={{ background: "#fff7ed", border: "1.5px solid #fed7aa", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
                  <div style={{ fontWeight: 700, color: "#ea580c", marginBottom: "6px" }}>
                    🚀 Tải ngay công cụ kích hoạt bản quyền 7 ngày:
                  </div>
                  <div style={{ fontSize: "13px", color: "#7c2d12", marginBottom: "12px" }}>
                    File script tự động .BAT do Mercy Tech phát triển, an toàn tuyệt đối và tích hợp sẵn license Enterprise dùng thử.
                  </div>
                  <a
                    href="/api/download-trial"
                    download="Kich-Hoat-Demo-OnlyOffice-Mercy.bat"
                    style={{
                      background: "#ff6f3d",
                      color: "#ffffff",
                      textDecoration: "none",
                      padding: "10px 20px",
                      borderRadius: "6px",
                      fontWeight: 700,
                      fontSize: "14px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>📥</span>
                    <span>Tải Kich-Hoat-Demo-OnlyOffice-Mercy.bat</span>
                  </a>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={() => setSelectedPost(null)}
                  style={{
                    background: "#0f172a",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 22px",
                    fontWeight: 600,
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  {isVi ? "Đóng" : "Close"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
