"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  Check,
  Copy,
  ExternalLink,
  Quote,
  Sparkles,
} from "lucide-react";
import {
  BlogPost,
  BlogSection,
  BLOG_CATEGORIES,
  IN_THE_PRESS,
} from "@/components/blog/blogData";
import "./onlyoffice-blog.css";

interface ArticleClientViewProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  locale: string;
  isVi: boolean;
}

export default function ArticleClientView({
  post,
  relatedPosts,
  locale,
  isVi,
}: ArticleClientViewProps) {
  const t = useTranslations("blogPage");
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showFloatingNav, setShowFloatingNav] = useState(false);

  // Reading progress & floating back button tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }
      setShowFloatingNav(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      const hasPreviousPage =
        (window.history.state &&
          typeof window.history.state.idx === "number" &&
          window.history.state.idx > 0) ||
        (document.referrer && document.referrer.includes(window.location.host));

      if (hasPreviousPage) {
        router.back();
      } else {
        router.push("/blog");
      }
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sanitizedHtml = useMemo(() => {
    if (!post.contentHtml) return "";
    let html = post.contentHtml;
    // Rewrite official onlyoffice.com links to internal web routes
    html = html.replace(/https:\/\/www\.onlyoffice\.com\/blog\/category\/[^"'\s]+/gi, `/blog`);
    html = html.replace(/https:\/\/www\.onlyoffice\.com\/blog\/[0-9]{4}\/[0-9]{2}\/([a-zA-Z0-9_-]+)[^"'\s]*/gi, `/blog/$1`);
    html = html.replace(/https:\/\/www\.onlyoffice\.com\/blog\/([a-zA-Z0-9_-]+)[^"'\s]*/gi, `/blog/$1`);
    html = html.replace(/https:\/\/www\.onlyoffice\.com\/blog\/?/gi, `/blog`);
    html = html.replace(/https:\/\/www\.onlyoffice\.com\/download-desktop[^"'\s]*/gi, `/demo`);
    html = html.replace(/https:\/\/www\.onlyoffice\.com\/download[^"'\s]*/gi, `/demo`);
    html = html.replace(/https:\/\/www\.onlyoffice\.com\/word-processor[^"'\s]*/gi, `/soan-thao-van-ban`);
    html = html.replace(/https:\/\/www\.onlyoffice\.com\/sheets[^"'\s]*/gi, `/spreadsheet-editor`);
    html = html.replace(/https:\/\/www\.onlyoffice\.com\/presentation[^"'\s]*/gi, `/thuyet-trinh`);
    html = html.replace(/https:\/\/www\.onlyoffice\.com\/pdf-editor[^"'\s]*/gi, `/chinh-sua-pdf`);
    html = html.replace(/https:\/\/www\.onlyoffice\.com\/form-creator[^"'\s]*/gi, `/tao-bieu-mau`);
    html = html.replace(/https:\/\/www\.onlyoffice\.com\/docs[^"'\s]*/gi, `/docs`);
    html = html.replace(/https:\/\/www\.onlyoffice\.com\/desktop[^"'\s]*/gi, `/demo`);
    html = html.replace(/https:\/\/www\.onlyoffice\.com\/?/gi, `/`);
    return html;
  }, [post.contentHtml]);

  const handleArticleLinkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLElement).closest("a");
    if (!target) return;
    const href = target.getAttribute("href");
    if (!href) return;

    // If it's an internal route starting with /
    if (href.startsWith("/") && !href.startsWith("//")) {
      e.preventDefault();
      router.push(href as any);
    }
  };

  const catInfo = BLOG_CATEGORIES[post.category];
  const catLabel = isVi ? catInfo?.vi || post.categoryName : catInfo?.en || post.categoryName;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Reading Progress Indicator */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${readingProgress}%`,
          height: "3px",
          backgroundColor: "#FF6F3D",
          zIndex: 9999,
          transition: "width 0.1s ease-out",
        }}
      />

      <Header />

      <main className="oo-blog-container" style={{ padding: "32px 0 80px" }}>
        <div className="oo-blog-section-page">
          {/* Top Bar: Back Button & Breadcrumbs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={handleGoBack}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 18px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #DCDCDC",
                borderRadius: "20px",
                fontSize: "13.5px",
                fontWeight: 600,
                color: "#333333",
                cursor: "pointer",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.04)",
                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#FF6F3D";
                e.currentTarget.style.color = "#FF6F3D";
                e.currentTarget.style.backgroundColor = "#FFF9F6";
                e.currentTarget.style.transform = "translateX(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#DCDCDC";
                e.currentTarget.style.color = "#333333";
                e.currentTarget.style.backgroundColor = "#FFFFFF";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <ArrowLeft size={16} />
              <span>{isVi ? "Quay lại trang trước" : "Back to previous page"}</span>
            </button>

            {/* Breadcrumb Navigation */}
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13.5px",
                color: "#666666",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/"
                style={{ color: "#666666", textDecoration: "none" }}
              >
                {isVi ? "Trang chủ" : "Home"}
              </Link>
              <span>/</span>
              <Link
                href="/blog"
                style={{ color: "#666666", textDecoration: "none" }}
              >
                Blog
              </Link>
              <span>/</span>
              <span style={{ color: "#FF6F3D", fontWeight: 600 }}>{catLabel}</span>
            </nav>
          </div>

          {/* Main 2-Column Article Layout (Article on left + Sidebar on right) */}
          <div className="oo-blog-main-block" style={{ alignItems: "flex-start" }}>
            {/* Left Column: Full Article Content */}
            <article
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "5px",
                border: "1px solid #EFEFEF",
                padding: "36px 40px",
                boxShadow: "0px 7px 25px rgba(85, 85, 85, 0.08)",
              }}
            >
              {/* Category Pill */}
              <div style={{ marginBottom: "14px" }}>
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: "#fff0eb",
                    color: "#FF6F3D",
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    padding: "4px 10px",
                    borderRadius: "3px",
                  }}
                >
                  {catLabel}
                </span>
              </div>

              {/* Main Article Title */}
              <h1
                style={{
                  fontSize: "clamp(24px, 3.2vw, 36px)",
                  lineHeight: 1.3,
                  fontWeight: 700,
                  color: "#333333",
                  margin: "0 0 20px",
                  letterSpacing: "-0.015em",
                }}
              >
                {post.title}
              </h1>

              {/* Byline / Metadata Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "16px",
                  paddingBottom: "22px",
                  borderBottom: "1px solid #EAEAEA",
                  marginBottom: "28px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                    fontSize: "13.5px",
                    color: "#777777",
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <Calendar size={14} color="#FF6F3D" />
                    <span>{post.date}</span>
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <User size={14} color="#FF6F3D" />
                    <span>
                      {t("by")} <strong>{post.author}</strong>
                    </span>
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <Clock size={14} color="#919192" />
                    <span>
                      {post.readTime} {t("minRead")}
                    </span>
                  </span>
                </div>

                {/* Share / Copy Link button */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  style={{
                    background: copied ? "#e6f4ea" : "#f5f5f5",
                    color: copied ? "#137333" : "#444444",
                    border: "1px solid #e0e0e0",
                    borderRadius: "3px",
                    padding: "6px 14px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s",
                  }}
                >
                  {copied ? <Check size={14} /> : <Share2 size={14} />}
                  <span>{copied ? (isVi ? "Đã sao chép!" : "Copied!") : (isVi ? "Chia sẻ" : "Share")}</span>
                </button>
              </div>

              {/* Featured Hero Image */}
              {post.image && (
                <div
                  style={{
                    width: "100%",
                    borderRadius: "4px",
                    overflow: "hidden",
                    marginBottom: "32px",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      maxHeight: "440px",
                      objectFit: "cover",
                    }}
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              )}

              {/* Lead Excerpt */}
              <div
                style={{
                  fontSize: "17px",
                  lineHeight: 1.7,
                  color: "#444444",
                  fontWeight: 500,
                  marginBottom: "28px",
                  paddingBottom: "24px",
                  borderBottom: "1px solid #F0F0F0",
                  fontStyle: "italic",
                }}
              >
                {post.excerpt}
              </div>

              {/* Rich HTML Content if available from database */}
              {post.contentHtml ? (
                <div
                  className="blog-html-article"
                  dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                  onClick={handleArticleLinkClick}
                  style={{ fontSize: "16px", lineHeight: 1.8, color: "#333333" }}
                />
              ) : (
                /* Structured Clean Content */
                <div style={{ fontSize: "16px", lineHeight: 1.8, color: "#333333" }}>
                  {post.content.map((p, idx) => (
                    <p key={idx} style={{ marginBottom: "20px" }}>
                      {p}
                    </p>
                  ))}

                  {/* Structured Sections */}
                  {post.sections &&
                    post.sections.map((section: BlogSection) => (
                      <div key={section.id} style={{ margin: "36px 0 28px" }}>
                        <h2
                          style={{
                            fontSize: "22px",
                            lineHeight: 1.4,
                            fontWeight: 700,
                            color: "#333333",
                            marginBottom: "16px",
                          }}
                        >
                          {section.heading}
                        </h2>

                        {section.paragraphs.map((p, pIdx) => (
                          <p key={pIdx} style={{ marginBottom: "16px" }}>
                            {p}
                          </p>
                        ))}

                        {/* Callout Box */}
                        {section.callout && (
                          <div
                            style={{
                              backgroundColor: "#fffaf5",
                              borderLeft: "4px solid #FF6F3D",
                              padding: "16px 20px",
                              margin: "20px 0",
                              borderRadius: "0 4px 4px 0",
                            }}
                          >
                            <div
                              style={{
                                fontWeight: 700,
                                color: "#c2410c",
                                fontSize: "14px",
                                marginBottom: "6px",
                              }}
                            >
                              {section.callout.title}
                            </div>
                            <div style={{ fontSize: "14.5px", color: "#444444" }}>
                              {section.callout.text}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}

              {/* Tags Footer */}
              {post.tags && post.tags.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginTop: "40px",
                    paddingTop: "24px",
                    borderTop: "1px solid #EAEAEA",
                  }}
                >
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#666666" }}>
                    Tags:
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        backgroundColor: "#F5F5F5",
                        color: "#555555",
                        fontSize: "12.5px",
                        padding: "3px 10px",
                        borderRadius: "3px",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Back to previous page & All Blog Posts */}
              <div
                style={{
                  marginTop: "40px",
                  paddingTop: "24px",
                  borderTop: "1px solid #EAEAEA",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  type="button"
                  onClick={handleGoBack}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 22px",
                    backgroundColor: "#FF6F3D",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(255, 111, 61, 0.25)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#E65A28";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#FF6F3D";
                  }}
                >
                  <ArrowLeft size={16} />
                  <span>{isVi ? "Quay lại trang trước" : "Back to previous page"}</span>
                </button>

                <Link
                  href="/blog"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "9px 18px",
                    backgroundColor: "#F8F9FA",
                    color: "#555555",
                    border: "1px solid #DCE0E5",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#EEF2F6";
                    e.currentTarget.style.color = "#111111";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#F8F9FA";
                    e.currentTarget.style.color = "#555555";
                  }}
                >
                  <span>{isVi ? "Về danh sách bài viết Blog" : "All Blog Posts"}</span>
                </Link>
              </div>
            </article>

            {/* Right Column: Sticky Sidebar (Topics & Press) */}
            <aside className="oo-blog-main-sidebar">
              {/* Category Topics Box */}
              <div className="oo-blog-sidebar-box oo-blog-topics-box">
                <h3 className="oo-blog-topics-title">{t("categoryTopics")}</h3>
                <ul className="oo-blog-topics-list">
                  {Object.entries(BLOG_CATEGORIES).map(([key, info]) => (
                    <li key={key}>
                      <Link href={`/blog?category=${key}`} className="oo-blog-topics-link">
                        <img
                          src={info.icon}
                          alt=""
                          className="oo-blog-topics-icon"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                        <span>{isVi ? info.vi : info.en}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ONLYOFFICE in the press */}
              <div className="oo-blog-sidebar-box oo-blog-press-box">
                <h3 className="oo-blog-press-title">{t("inThePress")}</h3>
                <ul className="oo-blog-press-list">
                  {IN_THE_PRESS.map((item) => (
                    <li key={item.id} className="oo-blog-press-item">
                      <Link
                        href={item.url}
                        className="oo-blog-press-link"
                      >
                        {item.title}
                      </Link>
                      <div className="oo-blog-press-date">
                        <Calendar size={12} color="#919192" />
                        <span>{item.date} • {item.source}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/blog?category=for-business"
                  className="oo-blog-view-all-link"
                >
                  <span>{t("viewAllPosts")}</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </aside>
          </div>

          {/* ======================================================== */}
          {/* RELATED POSTS SECTION */}
          {/* ======================================================== */}
          {relatedPosts.length > 0 && (
            <section style={{ marginTop: "64px" }}>
              <div className="oo-blog-category-header">
                <h2 className="oo-blog-category-title">
                  {isVi ? "Bài viết liên quan" : "Related posts"}
                </h2>
              </div>
              <div className="oo-blog-posts-grid">
                {relatedPosts.map((rPost) => (
                  <Link
                    key={rPost.id}
                    href={`/blog/${rPost.slug || rPost.id}`}
                    className="oo-blog-card"
                  >
                    <div className="oo-blog-card-img">
                      <img
                        src={rPost.image}
                        alt={rPost.title}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="oo-blog-card-body">
                      <h3 className="oo-blog-card-title">{rPost.title}</h3>
                      <p className="oo-blog-card-desc">{rPost.excerpt}</p>
                      <div className="oo-blog-card-info">
                        <span className="oo-blog-card-info-item">
                          <Calendar size={13} color="#919192" />
                          <span>{rPost.date}</span>
                        </span>
                        <span className="oo-blog-card-info-item">
                          <User size={13} color="#919192" />
                          <span>{t("by")} {rPost.author}</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Floating Back Button when scrolled down */}
      {showFloatingNav && (
        <button
          type="button"
          onClick={handleGoBack}
          title={isVi ? "Quay lại trang trước" : "Back to previous page"}
          style={{
            position: "fixed",
            bottom: "28px",
            left: "28px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 18px",
            backgroundColor: "#FFFFFF",
            color: "#333333",
            border: "1px solid #D0D0D0",
            borderRadius: "30px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
            fontSize: "13px",
            fontWeight: 700,
            cursor: "pointer",
            zIndex: 900,
            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#FF6F3D";
            e.currentTarget.style.color = "#FFFFFF";
            e.currentTarget.style.backgroundColor = "#FF6F3D";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#D0D0D0";
            e.currentTarget.style.color = "#333333";
            e.currentTarget.style.backgroundColor = "#FFFFFF";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <ArrowLeft size={16} />
          <span>{isVi ? "Quay lại" : "Back"}</span>
        </button>
      )}

      <Footer />
    </div>
  );
}
