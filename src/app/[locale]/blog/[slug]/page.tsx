"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Sparkles,
  BookOpen,
  ShieldCheck,
  Building2,
  Clock,
  Calendar,
  User,
  ArrowRight,
  ArrowLeft,
  Download,
  Share2,
  CheckCircle2,
  Phone,
  MessageCircle,
  FileText,
  Check,
  Tag,
  Copy,
  AlertTriangle,
  Lightbulb,
  Quote,
  ChevronRight,
  ExternalLink,
  Laptop,
  Terminal,
  HelpCircle,
  Layers,
} from "lucide-react";
import {
  BlogPost,
  BlogSection,
} from "@/components/blog/blogData";

export default function BlogPostDetailPage() {
  const locale = useLocale();
  const isVi = locale === "vi";
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [isFromDb, setIsFromDb] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    async function syncWithDb() {
      try {
        setLoading(true);
        const [postRes, allRes] = await Promise.all([
          fetch(`/api/blog/${slug}?locale=${locale}`),
          fetch(`/api/blog?locale=${locale}`),
        ]);

        if (postRes.ok) {
          const postJson = await postRes.json();
          if (postJson.success && postJson.data && isMounted) {
            setPost(postJson.data);
            setIsFromDb(true);
          } else if (isMounted) {
            setPost(null);
          }
        } else if (isMounted) {
          setPost(null);
        }

        if (allRes.ok) {
          const allJson = await allRes.json();
          if (allJson.success && Array.isArray(allJson.data) && isMounted) {
            setAllPosts(allJson.data);
          }
        }
      } catch (err) {
        console.error("Lỗi khi tải chi tiết bài viết từ MongoDB:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (slug) {
      syncWithDb();
    }

    return () => {
      isMounted = false;
    };
  }, [slug, locale]);

  // Find previous and next posts
  const currentIndex = allPosts.findIndex((p) => p.id === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex >= 0 && currentIndex < allPosts.length - 1
      ? allPosts[currentIndex + 1]
      : null;

  // Related posts (same category or others, excluding current)
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return allPosts
      .filter((p) => p.id !== post.id)
      .slice(0, 3);
  }, [allPosts, post]);

  // Reading progress tracker & Active Section Observer
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }

      // Check which section is in view for Table of Contents
      if (post?.sections) {
        const scrollPosition = window.scrollY + 200;
        for (let i = post.sections.length - 1; i >= 0; i--) {
          const sectionEl = document.getElementById(post.sections[i].id);
          if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
            setActiveSectionId(post.sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCopyCode = (code: string, id: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(code);
      setCopiedCodeId(id);
      setTimeout(() => setCopiedCodeId(null), 2500);
    }
  };

  const getCategoryDetails = (cat: string) => {
    switch (cat) {
      case "release":
        return {
          icon: <Sparkles size={14} color="#ea580c" />,
          color: "#ea580c",
          bgColor: "#fff7ed",
          borderColor: "#fed7aa",
          label: isVi ? "Bản phát hành" : "Release",
        };
      case "guides":
      case "huong-dan-su-dung":
        return {
          icon: <BookOpen size={14} color="#d97706" />,
          color: "#d97706",
          bgColor: "#fef3c7",
          borderColor: "#fde68a",
          label: isVi ? "Hướng dẫn sử dụng" : "Guide",
        };
      case "security":
      case "case-study-bao-mat-cong-nghe":
        return {
          icon: <ShieldCheck size={14} color="#16a34a" />,
          color: "#16a34a",
          bgColor: "#f0fdf4",
          borderColor: "#bbf7d0",
          label: isVi ? "Bảo mật & Case Study" : "Security & Case Study",
        };
      case "ban-quyen-chi-phi":
        return {
          icon: <FileText size={14} color="#ea580c" />,
          color: "#ea580c",
          bgColor: "#fff7ed",
          borderColor: "#fed7aa",
          label: isVi ? "Bản quyền & Chi phí" : "License & Pricing",
        };
      case "so-sanh-thay-the":
        return {
          icon: <Layers size={14} color="#c2410c" />,
          color: "#c2410c",
          bgColor: "#fff7ed",
          borderColor: "#fed7aa",
          label: isVi ? "So sánh & Thay thế" : "Comparison",
        };
      case "thong-tin-phap-ly-cong-nghe":
        return {
          icon: <ShieldCheck size={14} color="#0891b2" />,
          color: "#0891b2",
          bgColor: "#ecfeff",
          borderColor: "#a5f3fc",
          label: isVi ? "Pháp lý & Công nghệ" : "Legal & Tech",
        };
      case "phan-mem-van-phong-tong-hop-tin-moi":
        return {
          icon: <Laptop size={14} color="#ea580c" />,
          color: "#ea580c",
          bgColor: "#fff7ed",
          borderColor: "#fed7aa",
          label: isVi ? "Phần mềm văn phòng" : "Office Suite",
        };
      case "stories":
        return {
          icon: <Building2 size={14} color="#ea580c" />,
          color: "#c2410c",
          bgColor: "#fffaf5",
          borderColor: "#fed7aa",
          label: isVi ? "Khách hàng" : "Case Study",
        };
      case "tin-tong-hop":
      default:
        return {
          icon: <Sparkles size={14} color="#ea580c" />,
          color: "#ea580c",
          bgColor: "#fff7ed",
          borderColor: "#fed7aa",
          label: isVi ? "Tin tổng hợp" : "General News",
        };
    }
  };

  // Loading skeleton while fetching directly from MongoDB
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          fontFamily: "var(--font-open-sans), sans-serif",
        }}
      >
        <Header />
        <main style={{ flex: 1, backgroundColor: "#fafaf9", padding: "40px 20px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ height: "24px", width: "160px", backgroundColor: "#ffedd5", borderRadius: "12px", marginBottom: "20px" }} />
            <div style={{ height: "36px", width: "70%", backgroundColor: "#fed7aa", borderRadius: "8px", marginBottom: "24px" }} />
            <div style={{ width: "100%", height: "320px", backgroundColor: "#fff7ed", borderRadius: "18px", border: "1.5px solid #fed7aa", marginBottom: "32px" }} />
            <div style={{ height: "18px", width: "95%", backgroundColor: "#e2e8f0", borderRadius: "4px", marginBottom: "12px" }} />
            <div style={{ height: "18px", width: "85%", backgroundColor: "#e2e8f0", borderRadius: "4px", marginBottom: "12px" }} />
            <div style={{ height: "18px", width: "60%", backgroundColor: "#e2e8f0", borderRadius: "4px" }} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If article not found in MongoDB
  if (!post) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fafaf9",
          fontFamily: "var(--font-open-sans), sans-serif",
        }}
      >
        <Header />
        <main
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 20px",
          }}
        >
          <div
            style={{
              maxWidth: "500px",
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              border: "1px solid #fed7aa",
              padding: "40px",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(234, 88, 12, 0.08)",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "#fff7ed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <HelpCircle size={32} color="#ea580c" />
            </div>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#1e293b",
                marginBottom: "12px",
              }}
            >
              {isVi ? "Bài viết không tồn tại" : "Article Not Found"}
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "#64748b",
                lineHeight: 1.6,
                marginBottom: "24px",
              }}
            >
              {isVi
                ? "Bài viết bạn đang tìm kiếm có thể đã được chuyển đổi hoặc đường dẫn không chính xác."
                : "The requested article could not be found or has been moved."}
            </p>
            <Link
              href="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#ea580c",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              <ArrowLeft size={16} />
              <span>{isVi ? "Quay lại danh sách bài viết" : "Back to Blog"}</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const catDetails = getCategoryDetails(post.category);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        fontFamily: "var(--font-open-sans), sans-serif",
      }}
    >
      {/* Top Sticky Reading Progress Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${readingProgress}%`,
          height: "3.5px",
          background: "linear-gradient(90deg, #ff6f3d, #ea580c)",
          zIndex: 9999,
          transition: "width 0.1s ease-out",
        }}
      />

      <Header />

      <main style={{ flex: 1, backgroundColor: "#fafaf9", paddingBottom: "80px" }}>
        {/* ============================================================ */}
        {/* TOP BREADCRUMB & ARTICLE HERO HEADER */}
        {/* ============================================================ */}
        <section
          style={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #fed7aa",
            padding: "32px 20px 44px",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {/* Breadcrumb Navigation */}
            <nav
              aria-label="Breadcrumb"
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px",
                fontSize: "13px",
                color: "#64748b",
                marginBottom: "20px",
              }}
            >
              <Link
                href="/"
                style={{
                  color: "#64748b",
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ea580c")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
              >
                {isVi ? "Trang chủ" : "Home"}
              </Link>
              <ChevronRight size={14} color="#cbd5e1" />
              <Link
                href="/blog"
                style={{
                  color: "#64748b",
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ea580c")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
              >
                {isVi ? "Blog & Cẩm nang" : "Blog & Guides"}
              </Link>
              <ChevronRight size={14} color="#cbd5e1" />
              <span
                style={{
                  color: catDetails.color,
                  fontWeight: 700,
                  backgroundColor: catDetails.bgColor,
                  padding: "2px 8px",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              >
                {isVi ? post.categoryName : catDetails.label}
              </span>
            </nav>

            {/* Badges Strip: Category + Read Time + Date + MongoDB Indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "16px",
              }}
            >
              {isFromDb && (
                <span
                  style={{
                    backgroundColor: "#ecfdf5",
                    color: "#059669",
                    border: "1px solid #a7f3d0",
                    fontSize: "12px",
                    fontWeight: 800,
                    padding: "4px 12px",
                    borderRadius: "20px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  ● MongoDB Database
                </span>
              )}
              <span
                style={{
                  backgroundColor: catDetails.bgColor,
                  color: catDetails.color,
                  border: `1px solid ${catDetails.borderColor}`,
                  fontSize: "12px",
                  fontWeight: 800,
                  padding: "4px 12px",
                  borderRadius: "20px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {catDetails.icon}
                <span>{isVi ? post.categoryName : catDetails.label}</span>
              </span>

              <span
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontWeight: 600,
                }}
              >
                <Calendar size={14} color="#ea580c" /> {post.date}
              </span>

              <span
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontWeight: 600,
                }}
              >
                <Clock size={14} color="#ea580c" />
                {post.readTime} {isVi ? "phút đọc chi tiết" : "min read"}
              </span>
            </div>

            {/* Main H1 Title */}
            <h1
              style={{
                fontSize: "clamp(24px, 3.5vw, 38px)",
                fontWeight: 900,
                color: "#1e293b",
                lineHeight: 1.35,
                margin: "0 0 20px",
                maxWidth: "960px",
              }}
            >
              {post.title}
            </h1>

            {/* Author Bar & Action Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
                paddingTop: "16px",
                borderTop: "1px solid #f1f5f9",
              }}
            >
              {/* Author Info */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #ff6f3d, #ea580c)",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "16px",
                    boxShadow: "0 4px 10px rgba(234, 88, 12, 0.2)",
                  }}
                >
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 800, color: "#1e293b" }}>
                    {post.author}
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>
                    {post.authorRole || (isVi ? "Chuyên gia ONLYOFFICE" : "ONLYOFFICE Expert")}
                  </div>
                </div>
              </div>

              {/* Actions: Share & Copy Link */}
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  style={{
                    backgroundColor: copiedLink ? "#dcfce7" : "#fff7ed",
                    color: copiedLink ? "#15803d" : "#c2410c",
                    border: "1px solid",
                    borderColor: copiedLink ? "#86efac" : "#fed7aa",
                    borderRadius: "10px",
                    padding: "9px 16px",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.15s ease",
                  }}
                >
                  {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedLink ? (isVi ? "Đã sao chép liên kết!" : "Link Copied!") : (isVi ? "Sao chép link" : "Copy Link")}</span>
                </button>

                <a
                  href="/api/download-trial"
                  download="Kich-Hoat-Demo-OnlyOffice-Mercy.bat"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#c2410c",
                    border: "1.5px solid #fed7aa",
                    borderRadius: "10px",
                    padding: "9px 16px",
                    fontSize: "13px",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <Download size={14} color="#ea580c" />
                  <span>{isVi ? "Tải File .BAT Dùng Thử" : "Download Trial .BAT"}</span>
                </a>
              </div>
            </div>

            {/* Main Featured Hero Image */}
            {post.image && (
              <div
                style={{
                  marginTop: "24px",
                  borderRadius: "18px",
                  overflow: "hidden",
                  border: "1.5px solid #fed7aa",
                  boxShadow: "0 8px 24px rgba(234, 88, 12, 0.08)",
                  maxHeight: "440px",
                  backgroundColor: "#fff7ed",
                }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: "440px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            )}

            {/* Executive Summary Callout Box */}
            {post.summary && (
              <div
                style={{
                  marginTop: "28px",
                  background: "linear-gradient(135deg, #fffaf5 0%, #fff7ed 100%)",
                  border: "1.5px solid #fed7aa",
                  borderRadius: "16px",
                  padding: "20px 24px",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                  boxShadow: "0 4px 16px rgba(234, 88, 12, 0.05)",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    backgroundColor: "#ffedd5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  <Quote size={18} color="#ea580c" />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "#c2410c",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginBottom: "4px",
                    }}
                  >
                    {isVi ? "Tóm tắt bài viết" : "Executive Summary"}
                  </div>
                  <p
                    style={{
                      fontSize: "14.5px",
                      color: "#334155",
                      lineHeight: 1.65,
                      margin: 0,
                      fontWeight: 500,
                    }}
                  >
                    {post.summary}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ============================================================ */}
        {/* MAIN ARTICLE BODY (70%) + STICKY SIDEBAR (30%) */}
        {/* ============================================================ */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "40px auto 0",
            padding: "0 20px",
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: "36px",
            alignItems: "flex-start",
          }}
          className="blog-detail-grid"
        >
          {/* ---------------- LEFT: DEEP ARTICLE CONTENT ---------------- */}
          <article
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
              padding: "36px 32px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
            }}
          >
            {/* Smart Bilingual Reader Notice for English Locale */}
            {!isVi && post.contentHtml && (
              <div
                style={{
                  marginBottom: "24px",
                  backgroundColor: "#fffaf5",
                  border: "1.5px solid #fed7aa",
                  borderRadius: "14px",
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "13.5px",
                  color: "#7c2d12",
                }}
              >
                <Sparkles size={18} color="#ea580c" style={{ flexShrink: 0 }} />
                <span>
                  <strong>Bilingual Note:</strong> This technical guide was authored by ONLYOFFICE Vietnam. Automatic browser translation is fully compatible, or feel free to contact Mercy Tech engineering for an English technical briefing.
                </span>
              </div>
            )}

            {/* If Scraped HTML content exists from WordPress, render full rich article */}
            {post.contentHtml ? (
              <div
                className="blog-html-article"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                style={{ marginBottom: "36px" }}
              />
            ) : (
              <>
                {/* Opening Paragraphs */}
            <div style={{ marginBottom: "32px" }}>
              {post.content.map((p, idx) => (
                <p
                  key={idx}
                  style={{
                    fontSize: "16px",
                    color: "#334155",
                    lineHeight: 1.8,
                    marginBottom: "18px",
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Structured Sections */}
            {post.sections &&
              post.sections.map((section: BlogSection, sIdx: number) => (
                <div
                  key={section.id || sIdx}
                  id={section.id}
                  style={{
                    scrollMarginTop: "100px",
                    marginBottom: "40px",
                    paddingBottom: sIdx < post.sections!.length - 1 ? "32px" : "0",
                    borderBottom:
                      sIdx < post.sections!.length - 1
                        ? "1px solid #f1f5f9"
                        : "none",
                  }}
                >
                  {/* Section Heading */}
                  <h2
                    style={{
                      fontSize: "clamp(20px, 2.2vw, 24px)",
                      fontWeight: 800,
                      color: "#1e293b",
                      lineHeight: 1.4,
                      marginBottom: "16px",
                      position: "relative",
                      paddingLeft: "16px",
                      borderLeft: "4px solid #ea580c",
                    }}
                  >
                    {section.heading}
                  </h2>

                  {/* Paragraphs */}
                  {section.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      style={{
                        fontSize: "15.5px",
                        color: "#334155",
                        lineHeight: 1.8,
                        marginBottom: "16px",
                      }}
                    >
                      {p}
                    </p>
                  ))}

                  {/* Callout Box */}
                  {section.callout && (
                    <div
                      style={{
                        marginTop: "20px",
                        marginBottom: "20px",
                        borderRadius: "14px",
                        padding: "18px 22px",
                        display: "flex",
                        gap: "14px",
                        alignItems: "flex-start",
                        backgroundColor:
                          section.callout.type === "warning"
                            ? "#fff1f2"
                            : section.callout.type === "tip"
                            ? "#f0fdf4"
                            : "#fffaf5",
                        border: "1.5px solid",
                        borderColor:
                          section.callout.type === "warning"
                            ? "#fecdd3"
                            : section.callout.type === "tip"
                            ? "#bbf7d0"
                            : "#fed7aa",
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          backgroundColor:
                            section.callout.type === "warning"
                              ? "#ffe4e6"
                              : section.callout.type === "tip"
                              ? "#dcfce7"
                              : "#ffedd5",
                        }}
                      >
                        {section.callout.type === "warning" && (
                          <AlertTriangle size={18} color="#e11d48" />
                        )}
                        {section.callout.type === "tip" && (
                          <Lightbulb size={18} color="#16a34a" />
                        )}
                        {section.callout.type === "highlight" && (
                          <Sparkles size={18} color="#ea580c" />
                        )}
                        {section.callout.type === "quote" && (
                          <Quote size={18} color="#c2410c" />
                        )}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "13.5px",
                            fontWeight: 800,
                            color:
                              section.callout.type === "warning"
                                ? "#9f1239"
                                : section.callout.type === "tip"
                                ? "#166534"
                                : "#9a3412",
                            marginBottom: "4px",
                          }}
                        >
                          {section.callout.title}
                        </div>
                        <div
                          style={{
                            fontSize: "14px",
                            color: "#334155",
                            lineHeight: 1.6,
                          }}
                        >
                          {section.callout.text}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step-by-Step SOP Guide */}
                  {section.steps && section.steps.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "14px",
                        margin: "24px 0",
                      }}
                    >
                      {section.steps.map((st, stIdx) => (
                        <div
                          key={stIdx}
                          style={{
                            backgroundColor: "#fffaf5",
                            border: "1.5px solid #fed7aa",
                            borderRadius: "14px",
                            padding: "16px 20px",
                            display: "flex",
                            gap: "16px",
                            alignItems: "flex-start",
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: "#ea580c",
                              color: "#ffffff",
                              borderRadius: "8px",
                              padding: "4px 10px",
                              fontSize: "12px",
                              fontWeight: 800,
                              flexShrink: 0,
                              letterSpacing: "0.5px",
                            }}
                          >
                            {st.step}
                          </div>
                          <div>
                            <div
                              style={{
                                fontSize: "15px",
                                fontWeight: 800,
                                color: "#1e293b",
                                marginBottom: "4px",
                              }}
                            >
                              {st.title}
                            </div>
                            <div
                              style={{
                                fontSize: "14px",
                                color: "#475569",
                                lineHeight: 1.6,
                              }}
                            >
                              {st.desc}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Code / Config Snippet */}
                  {section.codeBlock && (
                    <div
                      style={{
                        margin: "24px 0",
                        backgroundColor: "#0f172a",
                        borderRadius: "14px",
                        overflow: "hidden",
                        border: "1px solid #334155",
                        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      {/* Terminal Top Bar */}
                      <div
                        style={{
                          backgroundColor: "#1e293b",
                          padding: "10px 16px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderBottom: "1px solid #334155",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "12.5px",
                            color: "#cbd5e1",
                            fontWeight: 600,
                          }}
                        >
                          <Terminal size={14} color="#ea580c" />
                          <span>
                            {section.codeBlock.filename ||
                              `${section.codeBlock.language.toUpperCase()} Script`}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopyCode(
                              section.codeBlock!.code,
                              `code-${sIdx}`
                            )
                          }
                          style={{
                            backgroundColor:
                              copiedCodeId === `code-${sIdx}`
                                ? "#16a34a"
                                : "#334155",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "6px",
                            padding: "4px 10px",
                            fontSize: "11px",
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            transition: "background-color 0.15s ease",
                          }}
                        >
                          {copiedCodeId === `code-${sIdx}` ? (
                            <>
                              <Check size={12} />
                              <span>{isVi ? "Đã chép!" : "Copied!"}</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>{isVi ? "Sao chép code" : "Copy"}</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Code Content */}
                      <pre
                        style={{
                          padding: "18px 20px",
                          margin: 0,
                          color: "#f8fafc",
                          fontSize: "13px",
                          fontFamily:
                            "Consolas, Monaco, 'Courier New', monospace",
                          lineHeight: 1.6,
                          overflowX: "auto",
                        }}
                      >
                        <code>{section.codeBlock.code}</code>
                      </pre>
                    </div>
                  )}

                  {/* Comparison / Spec Table */}
                  {section.table && (
                    <div
                      style={{
                        margin: "24px 0",
                        overflowX: "auto",
                        borderRadius: "14px",
                        border: "1.5px solid #fed7aa",
                        boxShadow: "0 2px 12px rgba(234, 88, 12, 0.05)",
                      }}
                    >
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          fontSize: "13.5px",
                          textAlign: "left",
                        }}
                      >
                        <thead>
                          <tr
                            style={{
                              backgroundColor: "#fff7ed",
                              borderBottom: "1.5px solid #fed7aa",
                            }}
                          >
                            {section.table.headers.map((h, hIdx) => (
                              <th
                                key={hIdx}
                                style={{
                                  padding: "12px 16px",
                                  color: "#9a3412",
                                  fontWeight: 800,
                                  fontSize: "13px",
                                }}
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row, rIdx) => (
                            <tr
                              key={rIdx}
                              style={{
                                backgroundColor:
                                  rIdx % 2 === 0 ? "#ffffff" : "#fffaf5",
                                borderBottom:
                                  rIdx < section.table!.rows.length - 1
                                    ? "1px solid #ffedd5"
                                    : "none",
                              }}
                            >
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  style={{
                                    padding: "12px 16px",
                                    color: cIdx === 0 ? "#1e293b" : "#475569",
                                    fontWeight: cIdx === 0 ? 700 : 500,
                                  }}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
              </>
            )}

            {/* Original Source Reference Citation */}
            {post.sourceUrl && (
              <div
                style={{
                  marginTop: "24px",
                  marginBottom: "28px",
                  padding: "16px 20px",
                  backgroundColor: "#fffaf5",
                  border: "1px dashed #fed7aa",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "12px",
                  fontSize: "13px",
                  color: "#64748b",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <ExternalLink size={15} color="#ea580c" />
                  <span>
                    {isVi ? "Nguồn bài viết gốc:" : "Original source:"}{" "}
                    <strong style={{ color: "#1e293b" }}>ONLYOFFICE Vietnam</strong>
                  </span>
                </div>
                <a
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#ea580c",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span>{isVi ? "Xem link gốc trên onlyoffice.vn" : "View original on onlyoffice.vn"}</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            )}

            {/* Tags Cloud */}
            {post.tags && post.tags.length > 0 && (
              <div
                style={{
                  paddingTop: "24px",
                  borderTop: "1px solid #f1f5f9",
                  marginBottom: "32px",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#64748b",
                    marginBottom: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Tag size={14} color="#ea580c" />
                  <span>{isVi ? "Thẻ chủ đề liên quan:" : "Related Tags:"}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {post.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        backgroundColor: "#fff7ed",
                        color: "#c2410c",
                        border: "1px solid #fed7aa",
                        padding: "5px 12px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 700,
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Verified Bio Card */}
            <div
              style={{
                backgroundColor: "#fffaf5",
                borderRadius: "16px",
                border: "1.5px solid #fed7aa",
                padding: "24px",
                display: "flex",
                gap: "20px",
                alignItems: "center",
                marginBottom: "36px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #ff6f3d, #ea580c)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  fontWeight: 900,
                  flexShrink: 0,
                  boxShadow: "0 6px 16px rgba(234, 88, 12, 0.2)",
                }}
              >
                {post.author.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <span style={{ fontSize: "16px", fontWeight: 800, color: "#1e293b" }}>
                    {post.author}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "#16a34a",
                      backgroundColor: "#dcfce7",
                      padding: "2px 8px",
                      borderRadius: "10px",
                    }}
                  >
                    ✓ Tác giả xác minh
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "13.5px",
                    color: "#475569",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {isVi
                    ? "Đội ngũ chuyên gia kỹ thuật và chuyển đổi số thuộc Công ty TNHH Công Nghệ Mercy (Mercy Tech). Cung cấp giải pháp bản quyền văn phòng trực tuyến bảo mật, tối ưu hóa chi phí cho doanh nghiệp Việt Nam."
                    : "Technical consulting and digital transformation team at Mercy Technology Co., Ltd. Delivering secure, cost-optimized enterprise office solutions."}
                </p>
              </div>
            </div>

            {/* Prev / Next Article Navigation */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                paddingTop: "24px",
                borderTop: "1px solid #f1f5f9",
                marginBottom: "36px",
              }}
              className="blog-nav-grid"
            >
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.id}`}
                  style={{
                    backgroundColor: "#fafaf9",
                    border: "1px solid #e2e8f0",
                    borderRadius: "14px",
                    padding: "16px",
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#fed7aa";
                    e.currentTarget.style.backgroundColor = "#fffaf5";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.backgroundColor = "#fafaf9";
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#64748b",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginBottom: "6px",
                    }}
                  >
                    <ArrowLeft size={13} color="#ea580c" />
                    <span>{isVi ? "Bài viết trước" : "Previous"}</span>
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "#1e293b",
                      lineHeight: 1.4,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {prevPost.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.id}`}
                  style={{
                    backgroundColor: "#fafaf9",
                    border: "1px solid #e2e8f0",
                    borderRadius: "14px",
                    padding: "16px",
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    textAlign: "right",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#fed7aa";
                    e.currentTarget.style.backgroundColor = "#fffaf5";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.backgroundColor = "#fafaf9";
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#64748b",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: "6px",
                      marginBottom: "6px",
                    }}
                  >
                    <span>{isVi ? "Bài viết tiếp theo" : "Next"}</span>
                    <ArrowRight size={13} color="#ea580c" />
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "#1e293b",
                      lineHeight: 1.4,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {nextPost.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* Bottom Enterprise Trial CTA Banner */}
            <div
              style={{
                background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                borderRadius: "18px",
                padding: "32px 28px",
                color: "#ffffff",
                boxShadow: "0 10px 30px rgba(234, 88, 12, 0.25)",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 900,
                  margin: "0 0 10px",
                }}
              >
                {isVi
                  ? "Trải nghiệm miễn phí 7 ngày ONLYOFFICE Docs Enterprise"
                  : "Experience 7 Days Free ONLYOFFICE Docs Enterprise"}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  opacity: 0.95,
                  lineHeight: 1.6,
                  margin: "0 0 20px",
                  maxWidth: "600px",
                }}
              >
                {isVi
                  ? "Tải công cụ tự động (.BAT) để kích hoạt ngay bản quyền 7 ngày đầy đủ tính năng: AI Assistant, trình chỉnh sửa PDF nâng cao, mã hóa Private Rooms và hỗ trợ kỹ thuật trực tiếp 24/7."
                  : "Download our automated .BAT tool to unlock 7 days of Enterprise features: AI assistant, PDF editor, Private Rooms, and 24/7 technical support."}
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                <a
                  href="/api/download-trial"
                  download="Kich-Hoat-Demo-OnlyOffice-Mercy.bat"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#c2410c",
                    padding: "12px 24px",
                    borderRadius: "10px",
                    fontWeight: 800,
                    fontSize: "14px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Download size={16} />
                  <span>{isVi ? "Tải File Kích Hoạt .BAT" : "Download .BAT Tool"}</span>
                </a>

                <a
                  href="tel:0763068614"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    color: "#ffffff",
                    border: "1.5px solid rgba(255, 255, 255, 0.4)",
                    padding: "11px 20px",
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "14px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Phone size={15} />
                  <span>Hotline: 0763.068.614</span>
                </a>
              </div>
            </div>
          </article>

          {/* ---------------- RIGHT: STICKY SIDEBAR ---------------- */}
          <aside
            style={{
              position: "sticky",
              top: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {/* Widget 1: Table of Contents (Mục lục bài viết) */}
            {post.sections && post.sections.length > 0 && (
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "18px",
                  border: "1.5px solid #fed7aa",
                  padding: "22px 20px",
                  boxShadow: "0 4px 16px rgba(234, 88, 12, 0.05)",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    color: "#1e293b",
                    marginBottom: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    borderBottom: "1px solid #ffedd5",
                    paddingBottom: "10px",
                  }}
                >
                  <FileText size={16} color="#ea580c" />
                  <span>{isVi ? "Mục lục bài viết" : "Table of Contents"}</span>
                </div>
                <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {post.sections.map((sec, sIdx) => {
                    const isActive = activeSectionId === sec.id;
                    return (
                      <a
                        key={sec.id || sIdx}
                        href={`#${sec.id}`}
                        style={{
                          fontSize: "13px",
                          lineHeight: 1.45,
                          color: isActive ? "#ea580c" : "#475569",
                          fontWeight: isActive ? 800 : 500,
                          textDecoration: "none",
                          padding: "6px 10px",
                          borderRadius: "8px",
                          backgroundColor: isActive ? "#fff7ed" : "transparent",
                          borderLeft: isActive ? "3px solid #ea580c" : "3px solid transparent",
                          transition: "all 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) e.currentTarget.style.color = "#ea580c";
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) e.currentTarget.style.color = "#475569";
                        }}
                      >
                        {sec.heading}
                      </a>
                    );
                  })}
                </nav>
              </div>
            )}

            {/* Widget 2: Free 7-Day Trial Download Box */}
            <div
              style={{
                background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                borderRadius: "18px",
                padding: "24px",
                color: "#ffffff",
                boxShadow: "0 8px 24px rgba(234, 88, 12, 0.2)",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  padding: "3px 10px",
                  borderRadius: "12px",
                  fontSize: "11px",
                  fontWeight: 800,
                  marginBottom: "12px",
                }}
              >
                ● 100% MIỄN PHÍ
              </div>
              <h4
                style={{
                  fontSize: "17px",
                  fontWeight: 900,
                  margin: "0 0 8px",
                  lineHeight: 1.35,
                }}
              >
                {isVi ? "Dùng Thử 7 Ngày Enterprise" : "7-Day Free Enterprise Trial"}
              </h4>
              <p
                style={{
                  fontSize: "12.5px",
                  opacity: 0.95,
                  lineHeight: 1.55,
                  margin: "0 0 16px",
                }}
              >
                {isVi
                  ? "Kích hoạt tự động bằng file .BAT. Trải nghiệm đầy đủ trợ lý AI, Private Rooms và kết nối Nextcloud không giới hạn."
                  : "Automated activation via .BAT tool. Test AI features, Private Rooms, and unlimited connections."}
              </p>
              <a
                href="/api/download-trial"
                download="Kich-Hoat-Demo-OnlyOffice-Mercy.bat"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#c2410c",
                  padding: "11px 18px",
                  borderRadius: "10px",
                  fontWeight: 800,
                  fontSize: "13px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Download size={15} />
                <span>{isVi ? "Tải File Kích Hoạt .BAT" : "Download .BAT Tool"}</span>
              </a>
            </div>

            {/* Widget 3: Tech Support 24/7 Hotline */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "18px",
                border: "1.5px solid #fed7aa",
                padding: "20px",
                boxShadow: "0 4px 16px rgba(234, 88, 12, 0.05)",
              }}
            >
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 800,
                  color: "#1e293b",
                  marginBottom: "8px",
                }}
              >
                {isVi ? "Hỗ trợ Kỹ thuật & Tư vấn 24/7" : "Technical Support 24/7"}
              </div>
              <p
                style={{
                  fontSize: "12.5px",
                  color: "#64748b",
                  lineHeight: 1.55,
                  margin: "0 0 14px",
                }}
              >
                {isVi
                  ? "Kỹ sư Mercy Tech sẵn sàng hỗ trợ cài đặt, cấu hình Docker và giải đáp mọi thắc mắc bản quyền."
                  : "Mercy Tech engineers are available to assist with Docker setup and licensing questions."}
              </p>
              <a
                href="tel:0763068614"
                style={{
                  backgroundColor: "#fff7ed",
                  color: "#ea580c",
                  border: "1px solid #fed7aa",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  fontWeight: 800,
                  fontSize: "13.5px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <Phone size={15} />
                <span>Hotline: 0763.068.614</span>
              </a>
            </div>

            {/* Widget 4: Related Articles */}
            {relatedPosts.length > 0 && (
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "18px",
                  border: "1.5px solid #fed7aa",
                  padding: "22px 20px",
                  boxShadow: "0 4px 16px rgba(234, 88, 12, 0.05)",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    color: "#1e293b",
                    marginBottom: "14px",
                    borderBottom: "1px solid #ffedd5",
                    paddingBottom: "10px",
                  }}
                >
                  {isVi ? "Bài viết liên quan" : "Related Articles"}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {relatedPosts.map((relPost) => {
                    const rCat = getCategoryDetails(relPost.category);
                    return (
                      <Link
                        key={relPost.id}
                        href={`/blog/${relPost.id}`}
                        style={{
                          textDecoration: "none",
                          display: "flex",
                          gap: "12px",
                          alignItems: "center",
                          paddingBottom: "12px",
                          borderBottom: "1px solid #f1f5f9",
                        }}
                      >
                        {relPost.image && (
                          <div
                            style={{
                              width: "72px",
                              height: "50px",
                              borderRadius: "8px",
                              overflow: "hidden",
                              flexShrink: 0,
                              backgroundColor: "#f1f5f9",
                              border: "1px solid #fed7aa",
                            }}
                          >
                            <img
                              src={relPost.image}
                              alt={relPost.title}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          </div>
                        )}
                        <div style={{ flex: 1 }}>
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: 700,
                              color: rCat.color,
                              display: "block",
                              marginBottom: "2px",
                            }}
                          >
                            {relPost.categoryName} • {relPost.date}
                          </span>
                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: 700,
                              color: "#1e293b",
                              lineHeight: 1.4,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              transition: "color 0.15s ease",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.color = "#ea580c")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.color = "#1e293b")
                            }
                          >
                            {relPost.title}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
