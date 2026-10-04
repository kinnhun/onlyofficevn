"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Search,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Building2,
  Clock,
  Calendar,
  User,
  ArrowRight,
  Download,
  CheckCircle2,
  X,
  Phone,
  MessageCircle,
  FileText,
  Laptop,
  Layers,
  ChevronRight,
  ChevronLeft,
  Bookmark,
  BookmarkCheck,
  LayoutGrid,
  List,
  ArrowUpDown,
  ArrowUp,
} from "lucide-react";

import { BlogPost } from "@/components/blog/blogData";
import { openMessengerChat } from "@/lib/messenger";

export default function BlogPage() {
  const t = useTranslations("blogPage");
  const locale = useLocale();
  const isVi = locale === "vi";

  // Filter & Search states
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Interaction states
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  // Data states
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Pagination states (12 items per page)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const POSTS_PER_PAGE = 12;

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fetch posts strictly from MongoDB via API
  useEffect(() => {
    let isMounted = true;
    async function fetchDbPosts() {
      try {
        setLoading(true);
        const res = await fetch(`/api/blog?locale=${locale}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && isMounted) {
            setPosts(json.data);
          }
        }
      } catch (err) {
        console.error("Lỗi khi tải bài viết từ MongoDB:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchDbPosts();
    return () => {
      isMounted = false;
    };
  }, [locale]);

  // Load Saved Bookmarks from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("mercy_blog_bookmarks");
      if (stored) {
        setSavedIds(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  // Listen for scroll for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut: Press "/" to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, sortBy]);

  // Bookmark toggle action
  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("mercy_blog_bookmarks", JSON.stringify(next));
      } catch {
        // ignore
      }
      setToastMessage(
        exists
          ? isVi
            ? "Đã bỏ lưu bài viết"
            : "Removed from bookmarks"
          : isVi
          ? "Đã lưu vào danh sách đọc"
          : "Saved to bookmarks"
      );
      setTimeout(() => setToastMessage(null), 2000);
      return next;
    });
  };

  // Group raw MongoDB categories into 5 clean, distinct themes (no duplicates)
  const mapCategoryToGroup = (cat: string): string => {
    if (["guides", "huong-dan-su-dung"].includes(cat)) return "guides";
    if (["security", "case-study-bao-mat-cong-nghe", "stories"].includes(cat)) return "security";
    if (["ban-quyen-chi-phi", "thong-tin-phap-ly-cong-nghe"].includes(cat)) return "license";
    return "news"; // release, tin-tong-hop, so-sanh-thay-the, phan-mem-van-phong-tong-hop-tin-moi
  };

  // Helper for Category Details
  const getCategoryDetails = (cat: string) => {
    const group = mapCategoryToGroup(cat);
    switch (group) {
      case "guides":
        return {
          icon: <BookOpen size={13} color="#ea580c" />,
          color: "#ea580c",
          bgColor: "#fff7ed",
          borderColor: "#fed7aa",
          label: isVi ? "Hướng dẫn" : "Guides",
        };
      case "security":
        return {
          icon: <ShieldCheck size={13} color="#16a34a" />,
          color: "#16a34a",
          bgColor: "#f0fdf4",
          borderColor: "#bbf7d0",
          label: isVi ? "Bảo mật" : "Security",
        };
      case "license":
        return {
          icon: <FileText size={13} color="#ea580c" />,
          color: "#c2410c",
          bgColor: "#fff7ed",
          borderColor: "#fed7aa",
          label: isVi ? "Bản quyền" : "Licensing",
        };
      case "news":
      default:
        return {
          icon: <Layers size={13} color="#ea580c" />,
          color: "#ea580c",
          bgColor: "#fff7ed",
          borderColor: "#fed7aa",
          label: isVi ? "Tin tức & So sánh" : "News & Tech",
        };
    }
  };

  // 5 Clean Unified Category Tabs
  const categoryTabs = useMemo(() => {
    const counts = { all: posts.length, guides: 0, security: 0, license: 0, news: 0 };
    posts.forEach((p) => {
      const g = mapCategoryToGroup(p.category) as keyof typeof counts;
      if (counts[g] !== undefined) {
        counts[g]++;
      }
    });

    return [
      { id: "all", label: isVi ? "Tất cả" : "All", count: counts.all },
      { id: "guides", label: isVi ? "Hướng dẫn" : "Guides", count: counts.guides },
      { id: "security", label: isVi ? "Bảo mật" : "Security", count: counts.security },
      { id: "license", label: isVi ? "Bản quyền" : "Licensing", count: counts.license },
      { id: "news", label: isVi ? "Tin tức & So sánh" : "News & Tech", count: counts.news },
    ];
  }, [posts, isVi]);

  // Filtered Posts Pipeline
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      let matchCategory = false;
      if (activeCategory === "all") {
        matchCategory = true;
      } else if (activeCategory === "saved") {
        matchCategory = savedIds.includes(post.id);
      } else {
        matchCategory = mapCategoryToGroup(post.category) === activeCategory;
      }

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });
  }, [posts, activeCategory, searchQuery, savedIds]);

  // Sorted Posts Pipeline
  const sortedPosts = useMemo(() => {
    const list = [...filteredPosts];
    switch (sortBy) {
      case "oldest":
        return list.reverse();
      case "quick":
        return list.sort((a, b) => (parseInt(a.readTime) || 5) - (parseInt(b.readTime) || 5));
      case "deep":
        return list.sort((a, b) => (parseInt(b.readTime) || 5) - (parseInt(a.readTime) || 5));
      case "alpha":
        return list.sort((a, b) => a.title.localeCompare(b.title));
      case "newest":
      default:
        return list;
    }
  }, [filteredPosts, sortBy]);

  // Paginated Posts Pipeline
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return sortedPosts.slice(start, start + POSTS_PER_PAGE);
  }, [sortedPosts, currentPage]);

  // Featured post spotlight
  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0];
  }, [posts]);

  // Newsletter Submit
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail("");
      }, 3500);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8fafc",
        fontFamily: "var(--font-open-sans), sans-serif",
      }}
    >
      <Header />

      <main style={{ flex: 1, paddingBottom: "80px" }}>
        {/* ============================================================ */}
        {/* CLEAN, MINIMALIST HERO SECTION */}
        {/* ============================================================ */}
        <section
          style={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #fed7aa",
            padding: "44px 20px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            {/* Clean Title */}
            <h1
              style={{
                fontSize: "clamp(26px, 3.6vw, 38px)",
                fontWeight: 800,
                color: "#1e293b",
                margin: "0 0 10px",
                letterSpacing: "-0.5px",
              }}
            >
              {t("title")}
            </h1>

            {/* Subtitle - 1 short, clean line */}
            <p
              style={{
                fontSize: "15px",
                color: "#64748b",
                margin: "0 0 24px",
                lineHeight: 1.5,
              }}
            >
              {t("subtitle")}
            </p>

            {/* Clean, Compact Search Bar */}
            <div
              style={{
                maxWidth: "520px",
                margin: "0 auto 24px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  pointerEvents: "none",
                }}
              >
                <Search size={18} color="#ea580c" />
              </div>

              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                style={{
                  width: "100%",
                  padding: "13px 44px 13px 44px",
                  fontSize: "14px",
                  borderRadius: "12px",
                  border: "1.5px solid #fed7aa",
                  backgroundColor: "#ffffff",
                  outline: "none",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  color: "#1e293b",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#ea580c";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(234, 88, 12, 0.12)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#fed7aa";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
                }}
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#94a3b8",
                    display: "flex",
                    alignItems: "center",
                    padding: "2px",
                  }}
                  title={isVi ? "Xóa tìm kiếm" : "Clear"}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* 5 CLEAN UNIFIED CATEGORY PILLS (Single row, zero clutter) */}
            <div
              style={{
                display: "inline-flex",
                gap: "6px",
                flexWrap: "wrap",
                justifyContent: "center",
                backgroundColor: "#fffaf5",
                padding: "5px",
                borderRadius: "14px",
                border: "1px solid #fed7aa",
              }}
            >
              {categoryTabs.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      background: isActive
                        ? "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)"
                        : "transparent",
                      color: isActive ? "#ffffff" : "#475569",
                      border: "none",
                      borderRadius: "10px",
                      padding: "7px 14px",
                      fontSize: "13px",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "all 0.15s ease",
                      boxShadow: isActive ? "0 2px 8px rgba(234, 88, 12, 0.22)" : "none",
                    }}
                  >
                    <span>{cat.label}</span>
                    <span
                      style={{
                        backgroundColor: isActive ? "rgba(255, 255, 255, 0.25)" : "#f1f5f9",
                        color: isActive ? "#ffffff" : "#64748b",
                        fontSize: "11px",
                        fontWeight: 800,
                        padding: "1px 6px",
                        borderRadius: "8px",
                      }}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}

              {/* Bookmarks tab (if saved articles exist) */}
              {savedIds.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveCategory(activeCategory === "saved" ? "all" : "saved")}
                  style={{
                    background:
                      activeCategory === "saved"
                        ? "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)"
                        : "transparent",
                    color: activeCategory === "saved" ? "#ffffff" : "#475569",
                    border: "none",
                    borderRadius: "10px",
                    padding: "7px 14px",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.15s ease",
                    boxShadow: activeCategory === "saved" ? "0 2px 8px rgba(234, 88, 12, 0.22)" : "none",
                  }}
                >
                  <Bookmark size={13} />
                  <span>{t("savedArticles")}</span>
                  <span
                    style={{
                      backgroundColor: activeCategory === "saved" ? "rgba(255, 255, 255, 0.25)" : "#f1f5f9",
                      color: activeCategory === "saved" ? "#ffffff" : "#64748b",
                      fontSize: "11px",
                      fontWeight: 800,
                      padding: "1px 6px",
                      borderRadius: "8px",
                    }}
                  >
                    {savedIds.length}
                  </span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* EDITORIAL SPOTLIGHT (Only on main landing without search) */}
        {/* ============================================================ */}
        {!searchQuery && activeCategory === "all" && featuredPost && (
          <section style={{ maxWidth: "1200px", margin: "28px auto 0", padding: "0 20px" }}>
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "18px",
                border: "1px solid #fed7aa",
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(234, 88, 12, 0.05)",
                display: "grid",
                gridTemplateColumns: "1.2fr 0.8fr",
                alignItems: "center",
              }}
              className="blog-main-grid"
            >
              {/* Left Column: Featured Overview */}
              <div style={{ padding: "32px 36px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <span
                    style={{
                      backgroundColor: "#fff7ed",
                      color: "#ea580c",
                      border: "1px solid #fed7aa",
                      fontSize: "11px",
                      fontWeight: 800,
                      padding: "3px 8px",
                      borderRadius: "6px",
                      textTransform: "uppercase",
                    }}
                  >
                    {t("featured")}
                  </span>
                  <span style={{ fontSize: "12px", color: "#94a3b8" }}>{featuredPost.date}</span>
                </div>

                <Link href={`/blog/${featuredPost.id}`} style={{ textDecoration: "none" }}>
                  <h2
                    style={{
                      fontSize: "clamp(18px, 2.2vw, 24px)",
                      fontWeight: 800,
                      color: "#1e293b",
                      lineHeight: 1.35,
                      margin: "0 0 12px",
                      transition: "color 0.15s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ea580c")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#1e293b")}
                  >
                    {featuredPost.title}
                  </h2>
                </Link>

                <p
                  style={{
                    fontSize: "14px",
                    color: "#64748b",
                    lineHeight: 1.6,
                    margin: "0 0 20px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {featuredPost.excerpt}
                </p>

                <Link
                  href={`/blog/${featuredPost.id}`}
                  style={{
                    backgroundColor: "#ea580c",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    fontWeight: 700,
                    fontSize: "13.5px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: "0 2px 8px rgba(234, 88, 12, 0.25)",
                  }}
                >
                  <span>{t("readMore")}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Right Column: Featured Image */}
              {featuredPost.image && (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "220px",
                    maxHeight: "300px",
                    overflow: "hidden",
                    backgroundColor: "#fff7ed",
                  }}
                >
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* MAIN ARTICLES CONTENT AREA (70%) + STICKY SIDEBAR (30%) */}
        {/* ============================================================ */}
        <section style={{ maxWidth: "1200px", margin: "32px auto 0", padding: "0 20px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 320px",
              gap: "32px",
              alignItems: "flex-start",
            }}
            className="blog-main-grid"
          >
            {/* ---------------- LEFT: ARTICLES LIST & TOOLBAR ---------------- */}
            <div>
              {/* Minimalist Control Bar */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #e2e8f0",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {/* Result Count */}
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>
                  {loading ? (
                    <span style={{ color: "#ea580c" }}>{isVi ? "Đang tải bài viết..." : "Loading articles..."}</span>
                  ) : (
                    <span>
                      {sortedPosts.length} {t("totalArticles").toLowerCase()}
                      {searchQuery && (
                        <span style={{ color: "#ea580c" }}> &quot;{searchQuery}&quot;</span>
                      )}
                    </span>
                  )}
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ea580c",
                        fontSize: "12px",
                        fontWeight: 700,
                        marginLeft: "8px",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      {t("resetFilters")}
                    </button>
                  )}
                </div>

                {/* Right: Sort Dropdown + View Toggle */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {/* Sort By Dropdown */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #fed7aa",
                      borderRadius: "8px",
                      padding: "4px 8px",
                    }}
                  >
                    <ArrowUpDown size={12} color="#ea580c" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      style={{
                        border: "none",
                        outline: "none",
                        backgroundColor: "transparent",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#334155",
                        cursor: "pointer",
                      }}
                    >
                      <option value="newest">{t("sortNewest")}</option>
                      <option value="oldest">{t("sortOldest")}</option>
                      <option value="quick">{t("sortQuickRead")}</option>
                      <option value="deep">{t("sortDeepDive")}</option>
                      <option value="alpha">{t("sortAlpha")}</option>
                    </select>
                  </div>

                  {/* View Mode Toggle: Grid vs List */}
                  <div
                    style={{
                      display: "inline-flex",
                      backgroundColor: "#ffffff",
                      border: "1px solid #fed7aa",
                      borderRadius: "8px",
                      padding: "2px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setViewMode("grid")}
                      style={{
                        border: "none",
                        background: viewMode === "grid" ? "#ea580c" : "transparent",
                        color: viewMode === "grid" ? "#ffffff" : "#64748b",
                        borderRadius: "6px",
                        padding: "5px 7px",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      title={t("viewGrid")}
                    >
                      <LayoutGrid size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("list")}
                      style={{
                        border: "none",
                        background: viewMode === "list" ? "#ea580c" : "transparent",
                        color: viewMode === "list" ? "#ffffff" : "#64748b",
                        borderRadius: "6px",
                        padding: "5px 7px",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      title={t("viewList")}
                    >
                      <List size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Empty state when no posts match */}
              {!loading && sortedPosts.length === 0 && (
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "14px",
                    border: "1px dashed #fed7aa",
                    padding: "40px 20px",
                    textAlign: "center",
                  }}
                >
                  <Search size={24} color="#ea580c" style={{ margin: "0 auto 10px" }} />
                  <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#1e293b", margin: "0 0 6px" }}>
                    {t("noArticlesFound")}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                    }}
                    style={{
                      backgroundColor: "#ea580c",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 16px",
                      fontSize: "13px",
                      fontWeight: 700,
                      cursor: "pointer",
                      marginTop: "10px",
                    }}
                  >
                    {t("clearAll")}
                  </button>
                </div>
              )}

              {/* VIEW 1: CLEAN GRID MODE */}
              {!loading && viewMode === "grid" && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {paginatedPosts.map((post) => {
                    const catDetails = getCategoryDetails(post.category);
                    const isSaved = savedIds.includes(post.id);

                    return (
                      <Link
                        key={post.id}
                        href={`/blog/${post.id}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <article
                          style={{
                            flex: 1,
                            backgroundColor: "#ffffff",
                            borderRadius: "14px",
                            border: "1px solid #e2e8f0",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.02)",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            position: "relative",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.boxShadow = "0 8px 20px rgba(234, 88, 12, 0.09)";
                            e.currentTarget.style.borderColor = "#fed7aa";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.02)";
                            e.currentTarget.style.borderColor = "#e2e8f0";
                          }}
                        >
                          <div>
                            {/* Card Image */}
                            {post.image && (
                              <div
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  aspectRatio: "16 / 9",
                                  overflow: "hidden",
                                  backgroundColor: "#fff7ed",
                                }}
                              >
                                <img
                                  src={post.image}
                                  alt={post.title}
                                  loading="lazy"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                  }}
                                />

                                {/* Category Badge */}
                                <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 2 }}>
                                  <span
                                    style={{
                                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                                      color: catDetails.color,
                                      border: `1px solid ${catDetails.borderColor}`,
                                      fontSize: "11px",
                                      fontWeight: 800,
                                      padding: "2px 8px",
                                      borderRadius: "8px",
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "4px",
                                    }}
                                  >
                                    {catDetails.icon}
                                    <span>{catDetails.label}</span>
                                  </span>
                                </div>

                                {/* Bookmark Icon */}
                                <button
                                  type="button"
                                  onClick={(e) => toggleSave(post.id, e)}
                                  style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    zIndex: 3,
                                    width: "28px",
                                    height: "28px",
                                    borderRadius: "50%",
                                    backgroundColor: isSaved ? "#ffffff" : "rgba(255, 255, 255, 0.9)",
                                    border: isSaved ? "1.5px solid #ea580c" : "1px solid rgba(0,0,0,0.06)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    color: isSaved ? "#ea580c" : "#64748b",
                                  }}
                                  title={isSaved ? t("removeBookmark") : t("saveArticle")}
                                >
                                  {isSaved ? <BookmarkCheck size={14} color="#ea580c" /> : <Bookmark size={13} />}
                                </button>
                              </div>
                            )}

                            {/* Card Body */}
                            <div style={{ padding: "16px 18px 12px" }}>
                              {/* Date */}
                              <div style={{ fontSize: "11.5px", color: "#94a3b8", marginBottom: "6px" }}>
                                {post.date}
                              </div>

                              {/* Title */}
                              <h3
                                style={{
                                  fontSize: "15px",
                                  fontWeight: 800,
                                  color: "#1e293b",
                                  lineHeight: 1.4,
                                  margin: "0 0 8px",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                              >
                                {post.title}
                              </h3>

                              {/* Short Excerpt */}
                              <p
                                style={{
                                  fontSize: "12.5px",
                                  color: "#64748b",
                                  lineHeight: 1.5,
                                  margin: 0,
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                              >
                                {post.excerpt}
                              </p>
                            </div>
                          </div>

                          {/* Card Footer: Read Time & Read Arrow */}
                          <div
                            style={{
                              borderTop: "1px solid #f8fafc",
                              padding: "10px 18px 12px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              fontSize: "11.5px",
                              color: "#64748b",
                            }}
                          >
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                              <Clock size={11} color="#ea580c" /> {post.readTime} {t("readTime")}
                            </span>

                            <span
                              style={{
                                color: "#ea580c",
                                fontWeight: 700,
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "3px",
                              }}
                            >
                              <span>{t("readMore")}</span>
                              <ArrowRight size={12} />
                            </span>
                          </div>
                        </article>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* VIEW 2: COMPACT LIST MODE */}
              {!loading && viewMode === "list" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {paginatedPosts.map((post) => {
                    const catDetails = getCategoryDetails(post.category);
                    const isSaved = savedIds.includes(post.id);

                    return (
                      <Link
                        key={post.id}
                        href={`/blog/${post.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <article
                          className="blog-compact-card"
                          style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "12px",
                            border: "1px solid #e2e8f0",
                            padding: "14px 16px",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#fed7aa";
                            e.currentTarget.style.boxShadow = "0 4px 12px rgba(234, 88, 12, 0.06)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "#e2e8f0";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          {/* Left: Compact Thumbnail */}
                          {post.image && (
                            <div
                              style={{
                                width: "100%",
                                aspectRatio: "16 / 10",
                                borderRadius: "8px",
                                overflow: "hidden",
                                backgroundColor: "#fff7ed",
                              }}
                            >
                              <img
                                src={post.image}
                                alt={post.title}
                                loading="lazy"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              />
                            </div>
                          )}

                          {/* Right: Content details */}
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                              <span
                                style={{
                                  color: catDetails.color,
                                  fontSize: "11px",
                                  fontWeight: 800,
                                }}
                              >
                                {catDetails.label}
                              </span>

                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ fontSize: "11.5px", color: "#94a3b8" }}>{post.date}</span>
                                <button
                                  type="button"
                                  onClick={(e) => toggleSave(post.id, e)}
                                  style={{
                                    border: "none",
                                    background: "none",
                                    cursor: "pointer",
                                    color: isSaved ? "#ea580c" : "#94a3b8",
                                    padding: "2px",
                                  }}
                                  title={isSaved ? t("removeBookmark") : t("saveArticle")}
                                >
                                  {isSaved ? <BookmarkCheck size={14} color="#ea580c" /> : <Bookmark size={13} />}
                                </button>
                              </div>
                            </div>

                            <h3
                              style={{
                                fontSize: "15px",
                                fontWeight: 800,
                                color: "#1e293b",
                                margin: "0 0 6px",
                                lineHeight: 1.35,
                              }}
                            >
                              {post.title}
                            </h3>

                            <p
                              style={{
                                fontSize: "12.5px",
                                color: "#64748b",
                                lineHeight: 1.5,
                                margin: 0,
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {post.excerpt}
                            </p>
                          </div>
                        </article>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Clean Pagination Controls */}
              {totalPages > 1 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    marginTop: "36px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage((prev) => Math.max(prev - 1, 1));
                      window.scrollTo({ top: 320, behavior: "smooth" });
                    }}
                    disabled={currentPage === 1}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      border: "1px solid #fed7aa",
                      backgroundColor: currentPage === 1 ? "#f8fafc" : "#ffffff",
                      color: currentPage === 1 ? "#94a3b8" : "#ea580c",
                      cursor: currentPage === 1 ? "not-allowed" : "pointer",
                      fontSize: "12.5px",
                      fontWeight: 700,
                    }}
                  >
                    <ChevronLeft size={15} />
                    <span>{t("previous")}</span>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                    })
                    .map((page, index, arr) => {
                      const prevPage = arr[index - 1];
                      const showEllipsis = prevPage && page - prevPage > 1;
                      const isActive = currentPage === page;

                      return (
                        <React.Fragment key={page}>
                          {showEllipsis && <span style={{ color: "#94a3b8", padding: "0 2px" }}>...</span>}
                          <button
                            type="button"
                            onClick={() => {
                              setCurrentPage(page);
                              window.scrollTo({ top: 320, behavior: "smooth" });
                            }}
                            style={{
                              width: "34px",
                              height: "34px",
                              borderRadius: "8px",
                              border: isActive ? "none" : "1px solid #fed7aa",
                              background: isActive ? "#ea580c" : "#ffffff",
                              color: isActive ? "#ffffff" : "#475569",
                              fontSize: "13px",
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      );
                    })}

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                      window.scrollTo({ top: 320, behavior: "smooth" });
                    }}
                    disabled={currentPage === totalPages}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      border: "1px solid #fed7aa",
                      backgroundColor: currentPage === totalPages ? "#f8fafc" : "#ffffff",
                      color: currentPage === totalPages ? "#94a3b8" : "#ea580c",
                      cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                      fontSize: "12.5px",
                      fontWeight: 700,
                    }}
                  >
                    <span>{t("next")}</span>
                    <ChevronRight size={15} />
                  </button>
                </div>
              )}
            </div>

            {/* ---------------- RIGHT: CLEAN SIDEBAR ---------------- */}
            <aside style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Widget 1: Free Enterprise 7-Day Trial Box */}
              <div
                style={{
                  background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                  borderRadius: "16px",
                  padding: "24px 20px",
                  color: "#ffffff",
                  boxShadow: "0 4px 16px rgba(234, 88, 12, 0.2)",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(255, 255, 255, 0.2)",
                    padding: "2px 8px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: 800,
                    marginBottom: "10px",
                  }}
                >
                  {t("trialBadge")}
                </div>

                <h3 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 8px", lineHeight: 1.35 }}>
                  {isVi ? "Dùng thử 7 ngày ONLYOFFICE Docs" : "Try 7 Days ONLYOFFICE Docs"}
                </h3>

                <p style={{ fontSize: "12.5px", color: "#ffedd5", lineHeight: 1.5, margin: "0 0 16px" }}>
                  {isVi
                    ? "Mở khóa toàn bộ tính năng Enterprise On-Premises với script .BAT tự động."
                    : "Unlock all Enterprise features with our automated .BAT script tool."}
                </p>

                <a
                  href="/api/download-trial"
                  download="Kich-Hoat-Demo-OnlyOffice-Mercy.bat"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#c2410c",
                    textDecoration: "none",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    fontWeight: 800,
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <Download size={14} />
                  <span>{t("downloadTrial")}</span>
                </a>
              </div>

              {/* Widget 2: Newsletter Box */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  padding: "20px",
                  border: "1px solid #fed7aa",
                }}
              >
                <div style={{ fontSize: "11px", fontWeight: 800, color: "#ea580c", textTransform: "uppercase", marginBottom: "4px" }}>
                  {t("newsletterTitle")}
                </div>
                <p style={{ fontSize: "12.5px", color: "#64748b", lineHeight: 1.5, margin: "0 0 12px" }}>
                  {isVi ? "Nhận cẩm nang quản trị IT và tin tức bản quyền mới nhất." : "Receive tech guides and license updates directly to your inbox."}
                </p>

                {newsletterSubscribed ? (
                  <div
                    style={{
                      backgroundColor: "#dcfce7",
                      color: "#166534",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <CheckCircle2 size={14} color="#16a34a" />
                    <span>{t("newsletterSuccess")}</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder={t("newsletterPlaceholder")}
                      style={{
                        padding: "9px 12px",
                        borderRadius: "6px",
                        border: "1px solid #cbd5e1",
                        fontSize: "12.5px",
                        outline: "none",
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#ea580c",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "9px",
                        fontSize: "12.5px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      {t("newsletterBtn")}
                    </button>
                  </form>
                )}
              </div>

              {/* Widget 3: Hotline Support */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  padding: "20px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div style={{ fontSize: "13px", fontWeight: 800, color: "#1e293b", marginBottom: "10px" }}>
                  {isVi ? "Hỗ Trợ Kỹ Thuật 24/7" : "Technical Support"}
                </div>
                <a
                  href="tel:0763068614"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#ea580c",
                    fontWeight: 800,
                    fontSize: "13.5px",
                    textDecoration: "none",
                    marginBottom: "8px",
                  }}
                >
                  <Phone size={14} /> 0763.068.614
                </a>
                <a
                  href="https://m.me/onlyoffice.official.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={openMessengerChat}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#0284c7",
                    fontWeight: 700,
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                >
                  <MessageCircle size={13} /> Facebook Messenger
                </a>
              </div>
            </aside>
          </div>
        </section>

        {/* ============================================================ */}
        {/* INTERACTIVE TOAST NOTIFICATION */}
        {/* ============================================================ */}
        {toastMessage && (
          <div
            style={{
              position: "fixed",
              bottom: "24px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#1e293b",
              color: "#ffffff",
              padding: "10px 20px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 700,
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              zIndex: 99999,
            }}
          >
            <CheckCircle2 size={15} color="#10b981" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ============================================================ */}
        {/* FLOATING BACK TO TOP BUTTON */}
        {/* ============================================================ */}
        {showScrollTop && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              position: "fixed",
              bottom: "24px",
              right: "24px",
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              color: "#ea580c",
              border: "1.5px solid #fed7aa",
              boxShadow: "0 4px 14px rgba(234, 88, 12, 0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 9000,
            }}
            title={isVi ? "Lên đầu trang" : "Back to top"}
          >
            <ArrowUp size={18} />
          </button>
        )}
      </main>

      <Footer />
    </div>
  );
}
