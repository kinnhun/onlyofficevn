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

  return {
    title: `${post.title} | ONLYOFFICE Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
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

  return (
    <ArticleClientView
      post={post}
      relatedPosts={relatedPosts}
      locale={locale}
      isVi={isVi}
    />
  );
}
