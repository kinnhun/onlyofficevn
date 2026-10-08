import React from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getBlogPosts, getBlogPostById } from "@/components/blog/blogData";
import ArticleClientView from "@/components/blog/ArticleClientView";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const locales = ["vi", "en"];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const isVi = locale === "vi";
    const posts = getBlogPosts(isVi);
    for (const post of posts) {
      params.push({
        locale,
        slug: post.slug || post.id,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const isVi = locale === "vi";
  const post = getBlogPostById(slug, isVi);

  if (!post) {
    return {
      title: isVi ? "Bài viết không tìm thấy | ONLYOFFICE" : "Article Not Found | ONLYOFFICE",
    };
  }

  const baseUrl = "https://onlyoffice.vn";
  const currentPath = isVi ? `/blog/${slug}` : `/en/blog/${slug}`;

  return {
    title: `${post.title} | ONLYOFFICE Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `${baseUrl}${currentPath}`,
      languages: {
        vi: `${baseUrl}/blog/${slug}`,
        en: `${baseUrl}/en/blog/${slug}`,
        "x-default": `${baseUrl}/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${baseUrl}${currentPath}`,
      siteName: "ONLYOFFICE Vietnam",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const isVi = locale === "vi";
  const post = getBlogPostById(slug, isVi);

  if (!post) {
    notFound();
  }

  const allPosts = getBlogPosts(isVi);
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && (p.category === post.category || p.featured))
    .slice(0, 3);

  const baseUrl = "https://onlyoffice.vn";
  const currentUrl = `${baseUrl}${isVi ? "" : "/en"}/blog/${slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [post.image],
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "ONLYOFFICE Vietnam",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/logo/logo-onlyoffice.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": currentUrl,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isVi ? "Trang chủ" : "Home",
        item: `${baseUrl}${isVi ? "" : "/en"}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}${isVi ? "" : "/en"}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: currentUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ArticleClientView
        post={post}
        relatedPosts={relatedPosts}
        locale={locale}
        isVi={isVi}
      />
    </>
  );
}
