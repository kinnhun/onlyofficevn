import React from "react";
import { setRequestLocale } from "next-intl/server";
import { getBlogPosts } from "@/components/blog/blogData";
import BlogClientView from "@/components/blog/BlogClientView";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale === "vi";

  return {
    title: isVi
      ? "ONLYOFFICE Blog — Tin tức, Cập nhật sản phẩm & Mẹo sử dụng"
      : "ONLYOFFICE Blog — Official News, Updates & Tutorials",
    description: isVi
      ? "Khám phá các bản phát hành mới nhất của ONLYOFFICE Docs, hướng dẫn kỹ thuật, so sánh tính năng và câu chuyện thành công từ cộng đồng nguồn mở."
      : "Discover the latest releases of ONLYOFFICE Docs, technical tutorials, feature comparisons, and success stories from the open-source community.",
    openGraph: {
      title: isVi ? "ONLYOFFICE Blog" : "ONLYOFFICE Blog",
      description: isVi
        ? "Blog chính thức của ONLYOFFICE tại Việt Nam: Cập nhật phần mềm văn phòng số bảo mật và tối ưu chi phí."
        : "Official ONLYOFFICE Blog: Secure, private open-source office suite updates and tips.",
      images: [
        {
          url: "https://static-blog.onlyoffice.com/wp-content/uploads/2026/10/01164202/IMG_6017.png",
          width: 1200,
          height: 630,
          alt: "ONLYOFFICE Blog",
        },
      ],
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isVi = locale === "vi";
  const initialPosts = getBlogPosts(isVi);

  return (
    <BlogClientView
      initialPosts={initialPosts}
      locale={locale}
      isVi={isVi}
    />
  );
}
