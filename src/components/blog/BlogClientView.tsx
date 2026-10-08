"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Search,
  X,
  Calendar,
  User,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  FileText,
  Table2,
  Presentation,
  FileCode2,
  CheckCheck,
} from "lucide-react";
import {
  BlogPost,
  BLOG_CATEGORIES,
  IN_THE_PRESS,
} from "@/components/blog/blogData";
import "./onlyoffice-blog.css";

interface BlogClientViewProps {
  initialPosts: BlogPost[];
  locale: string;
  isVi: boolean;
}

export default function BlogClientView({
  initialPosts,
  locale,
  isVi,
}: BlogClientViewProps) {
  const t = useTranslations("blogPage");

  // State
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [visibleRecentCount, setVisibleRecentCount] = useState<number>(6);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  // Form states
  const [docspaceEmail, setDocspaceEmail] = useState<string>("");
  const [docspaceSuccess, setDocspaceSuccess] = useState<boolean>(false);
  const [newsletterName, setNewsletterName] = useState<string>("");
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterSuccess, setNewsletterSuccess] = useState<boolean>(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut "/" to focus search
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

  // Keep posts in sync with initialPosts from server
  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  // Main hero post (strictly the European Accessibility Act post)
  const mainHeroPost = useMemo(() => {
    return (
      posts.find((p) => p.isMainFeatured || p.slug === "accessibility-conformance") ||
      posts[0]
    );
  }, [posts]);

  // Group posts by category
  const postsByCategory = useMemo(() => {
    const map: Record<string, BlogPost[]> = {
      "back-to-school": [],
      "onlyoffice-16th-anniversary": [],
      "product-releases": [],
      "for-developers": [],
      "for-business": [],
    };

    posts.forEach((p) => {
      if (map[p.category]) {
        map[p.category].push(p);
      }
    });

    return map;
  }, [posts]);

  // Filtered posts for search or category drill-down
  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return posts.filter((p) => {
      const matchesCategory =
        activeCategory === "all" || p.category === activeCategory;
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  // All recent posts (excluding main hero post for standard listing)
  const recentPosts = useMemo(() => {
    return posts.filter((p) => p.id !== mainHeroPost?.id);
  }, [posts, mainHeroPost]);

  const displayedRecentPosts = useMemo(() => {
    return recentPosts.slice(0, visibleRecentCount);
  }, [recentPosts, visibleRecentCount]);

  // Handle Load More
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleRecentCount((prev) => prev + 6);
      setIsLoadingMore(false);
    }, 300);
  };

  // Form submit handlers
  const handleDocSpaceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (docspaceEmail.trim()) {
      setDocspaceSuccess(true);
      setTimeout(() => {
        setDocspaceEmail("");
        setDocspaceSuccess(false);
      }, 4000);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterName("");
        setNewsletterEmail("");
        setNewsletterSuccess(false);
      }, 4000);
    }
  };

  // Helper to render a single post card
  const renderCard = (post: BlogPost, isMain = false) => {
    return (
      <Link
        key={post.id}
        href={`/blog/${post.slug || post.id}`}
        className={`oo-blog-card ${isMain ? "main-post" : ""}`}
      >
        <div className="oo-blog-card-img">
          <img
            src={post.image}
            alt={post.title}
            loading={isMain ? "eager" : "lazy"}
            fetchPriority={isMain ? "high" : "auto"}
            decoding="async"
          />
        </div>
        <div className="oo-blog-card-body">
          <h3 className="oo-blog-card-title">{post.title}</h3>
          <p className="oo-blog-card-desc">{post.excerpt}</p>
          <div className="oo-blog-card-info">
            <span className="oo-blog-card-info-item">
              <Calendar size={13} color="#919192" />
              <span>{post.date}</span>
            </span>
            <span className="oo-blog-card-info-item">
              <User size={13} color="#919192" />
              <span>{t("by")} {post.author}</span>
            </span>
          </div>
        </div>
      </Link>
    );
  };

  // Helper to render a category section
  const renderCategorySection = (catKey: string) => {
    const catInfo = BLOG_CATEGORIES[catKey];
    const catPosts = postsByCategory[catKey]?.slice(0, 3) || [];
    if (catPosts.length === 0) return null;

    const catTitle = isVi ? catInfo?.vi : catInfo?.en;

    return (
      <section key={catKey} className="oo-blog-category-wrapper">
        <div className="oo-blog-category-header">
          <h2 className="oo-blog-category-title">{catTitle}</h2>
          <button
            type="button"
            onClick={() => {
              setActiveCategory(catKey);
              window.scrollTo({ top: 120, behavior: "smooth" });
            }}
            className="oo-blog-view-all-link"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <span>{t("viewAllPosts")}</span>
            <ArrowRight size={14} />
          </button>
        </div>
        <div className="oo-blog-posts-grid">
          {catPosts.map((post) => renderCard(post))}
        </div>
      </section>
    );
  };

  const isFilteredView = searchQuery.trim().length > 0 || activeCategory !== "all";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top Event Announcement Bar */}
      <div className="oo-blog-event-bar">
        <span className="oo-blog-event-badge">EVENT</span>
        <span>{t("eventBarText")}</span>
        <button
          type="button"
          onClick={() => {
            setActiveCategory("back-to-school");
            window.scrollTo({ top: 120, behavior: "smooth" });
          }}
          style={{
            background: "none",
            border: "none",
            color: "#ffffff",
            textDecoration: "underline",
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "13.5px",
          }}
        >
          <span>{t("eventBarLink")}</span>
          <ArrowRight size={13} />
        </button>
      </div>

      <Header />

      <main className="oo-blog-container">
        <div className="oo-blog-section-page">
          {/* Search Input Bar */}
          <div className="oo-blog-search-area">
            <div className="oo-blog-search-input-wrap">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="oo-blog-search-input"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="oo-blog-search-clear"
                  title={t("clearSearch")}
                >
                  <X size={18} />
                </button>
              ) : (
                <div className="oo-blog-search-icon">
                  <Search size={20} />
                </div>
              )}
            </div>
          </div>

          {/* ======================================================== */}
          {/* SEARCH OR CATEGORY FILTERED VIEW */}
          {/* ======================================================== */}
          {isFilteredView ? (
            <div style={{ marginBottom: "60px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "28px",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div>
                  <h2 className="oo-blog-category-title">
                    {searchQuery ? (
                      <>
                        {t("searchResultsFor")}: &ldquo;{searchQuery}&rdquo;
                      </>
                    ) : (
                      <>
                        {isVi
                          ? BLOG_CATEGORIES[activeCategory]?.vi || activeCategory
                          : BLOG_CATEGORIES[activeCategory]?.en || activeCategory}
                      </>
                    )}
                  </h2>
                  <p style={{ margin: "6px 0 0", fontSize: "14px", color: "#666666" }}>
                    {filteredPosts.length} {t("totalArticles")}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="oo-blog-view-all-link"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  <span>{t("allArticles")}</span>
                  <X size={14} />
                </button>
              </div>

              {filteredPosts.length === 0 ? (
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "5px",
                    border: "1px dashed #CCCCCC",
                    padding: "60px 20px",
                    textAlign: "center",
                  }}
                >
                  <Search size={32} color="#AAAAAA" style={{ margin: "0 auto 16px" }} />
                  <h3 style={{ fontSize: "18px", color: "#333333", margin: "0 0 10px" }}>
                    {t("noArticlesFound")}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                    }}
                    className="oo-blog-load-more-btn"
                  >
                    {t("resetFilters")}
                  </button>
                </div>
              ) : (
                <div className="oo-blog-posts-grid">
                  {filteredPosts.map((post) => renderCard(post))}
                </div>
              )}
            </div>
          ) : (
            /* ======================================================== */
            /* DEFAULT AUTHENTIC ONLYOFFICE BLOG HOMEPAGE */
            /* ======================================================== */
            <>
              {/* 1. Main Block (Hero Article + Right Sidebar) */}
              <div className="oo-blog-main-block">
                {/* Left: Main Featured Article */}
                {mainHeroPost && renderCard(mainHeroPost, true)}

                {/* Right: Sidebar (Category Topics & In The Press) */}
                <aside className="oo-blog-main-sidebar">
                  {/* Category Topics Box */}
                  <div className="oo-blog-sidebar-box oo-blog-topics-box">
                    <h3 className="oo-blog-topics-title">{t("categoryTopics")}</h3>
                    <ul className="oo-blog-topics-list">
                      {Object.entries(BLOG_CATEGORIES).map(([key, info]) => (
                        <li key={key}>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveCategory(key);
                              window.scrollTo({ top: 120, behavior: "smooth" });
                            }}
                            className="oo-blog-topics-link"
                            style={{
                              background: "none",
                              border: "none",
                              padding: 0,
                              cursor: "pointer",
                              textAlign: "left",
                              width: "100%",
                            }}
                          >
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
                          </button>
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

              {/* 2. Category Section: Back to school */}
              {renderCategorySection("back-to-school")}

              {/* 3. Category Section: ONLYOFFICE 16th Anniversary */}
              {renderCategorySection("onlyoffice-16th-anniversary")}

              {/* 4. Category Section: Product releases */}
              {renderCategorySection("product-releases")}

              {/* 5. Mid-Page: DocSpace Account Registration Banner */}
              <section className="oo-blog-docspace-banner">
                <div className="oo-blog-docspace-icons">
                  <div
                    className="oo-blog-docspace-icon"
                    style={{ backgroundColor: "#4488ee" }}
                    title="DOCX"
                  >
                    <FileText size={22} color="#ffffff" />
                  </div>
                  <div
                    className="oo-blog-docspace-icon"
                    style={{ backgroundColor: "#33bb55" }}
                    title="XLSX"
                  >
                    <Table2 size={22} color="#ffffff" />
                  </div>
                  <div
                    className="oo-blog-docspace-icon"
                    style={{ backgroundColor: "#f87c25" }}
                    title="PPTX"
                  >
                    <Presentation size={22} color="#ffffff" />
                  </div>
                  <div
                    className="oo-blog-docspace-icon"
                    style={{ backgroundColor: "#ee3344" }}
                    title="PDF"
                  >
                    <FileCode2 size={22} color="#ffffff" />
                  </div>
                </div>

                <h2 className="oo-blog-docspace-title">
                  {isVi ? (
                    <>
                      Tạo tài khoản <span>ONLYOFFICE DocSpace</span> miễn phí của bạn
                    </>
                  ) : (
                    <>
                      Create your free <span>ONLYOFFICE account</span>
                    </>
                  )}
                </h2>
                <p className="oo-blog-docspace-desc">{t("createAccountDesc")}</p>

                {docspaceSuccess ? (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      backgroundColor: "#e6f4ea",
                      color: "#137333",
                      padding: "12px 24px",
                      borderRadius: "4px",
                      fontWeight: 700,
                      fontSize: "14px",
                    }}
                  >
                    <CheckCircle2 size={18} />
                    <span>
                      {isVi
                        ? "Đăng ký thành công! Hãy kiểm tra hòm thư của bạn."
                        : "Success! Check your inbox to activate your account."}
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleDocSpaceSubmit} className="oo-blog-docspace-form">
                    <input
                      type="email"
                      required
                      value={docspaceEmail}
                      onChange={(e) => setDocspaceEmail(e.target.value)}
                      placeholder={t("emailPlaceholder")}
                      className="oo-blog-docspace-input"
                    />
                    <button type="submit" className="oo-blog-docspace-btn">
                      {t("createNow")}
                    </button>
                  </form>
                )}
              </section>

              {/* 6. Category Section: For developers */}
              {renderCategorySection("for-developers")}

              {/* 7. Category Section: For business */}
              {renderCategorySection("for-business")}

              {/* 8. Newsletter Subscription Banner */}
              <section className="oo-blog-newsletter-card">
                <div className="oo-blog-newsletter-grid">
                  <div>
                    <h3 className="oo-blog-newsletter-heading">{t("newsletterTitle")}</h3>
                    <p style={{ margin: "8px 0 0", fontSize: "14px", color: "#666666" }}>
                      {isVi
                        ? "Cập nhật những xu hướng công nghệ văn phòng và bảo mật mới nhất."
                        : "Stay tuned for the latest open-source office releases and news."}
                    </p>
                  </div>

                  <div>
                    {newsletterSuccess ? (
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          backgroundColor: "#e6f4ea",
                          color: "#137333",
                          padding: "14px 24px",
                          borderRadius: "4px",
                          fontWeight: 700,
                          fontSize: "14px",
                        }}
                      >
                        <CheckCheck size={18} />
                        <span>
                          {isVi
                            ? "Cảm ơn bạn đã đăng ký nhận bản tin ONLYOFFICE!"
                            : "Thank you for subscribing to ONLYOFFICE newsletter!"}
                        </span>
                      </div>
                    ) : (
                      <form onSubmit={handleNewsletterSubmit}>
                        <div className="oo-blog-newsletter-form">
                          <input
                            type="text"
                            required
                            value={newsletterName}
                            onChange={(e) => setNewsletterName(e.target.value)}
                            placeholder={t("firstNamePlaceholder")}
                            className="oo-blog-newsletter-input"
                          />
                          <input
                            type="email"
                            required
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            placeholder={t("emailPlaceholder")}
                            className="oo-blog-newsletter-input"
                          />
                          <button type="submit" className="oo-blog-newsletter-btn">
                            {t("subscribe")}
                          </button>
                        </div>
                        <div className="oo-blog-newsletter-disclaimer">
                          {t("newsletterDisclaimer")}
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </section>

              {/* 9. Recent Articles Grid + Load More Posts */}
              <section className="oo-blog-category-wrapper">
                <div className="oo-blog-category-header">
                  <h2 className="oo-blog-category-title">
                    {isVi ? "Bài viết gần đây" : "Recent articles"}
                  </h2>
                </div>
                <div className="oo-blog-posts-grid">
                  {displayedRecentPosts.map((post) => renderCard(post))}
                </div>

                {visibleRecentCount < recentPosts.length && (
                  <div className="oo-blog-load-more-wrap">
                    <button
                      type="button"
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                      className="oo-blog-load-more-btn"
                    >
                      {isLoadingMore ? "..." : t("loadMorePosts")}
                    </button>
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
