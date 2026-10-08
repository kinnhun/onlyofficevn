import type { Metadata } from "next";
import { getBlogPosts } from "@/components/blog/blogData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const isVi = locale === "vi";

  const posts = getBlogPosts(isVi);
  const post = posts.find((p) => p.id === slug);

  if (!post) {
    return {
      title: isVi ? "Bài Viết" : "Blog Post",
    };
  }

  const title = post.title;
  const description = post.excerpt;
  const canonicalUrl = isVi ? `/blog/${slug}` : `/en/blog/${slug}`;
  const imageUrl = post.image?.startsWith("http")
    ? post.image
    : post.image
    ? `https://onlyofficevietnam.com${post.image}`
    : "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-document.jpg";

  return {
    title,
    description,
    keywords: post.tags || ["ONLYOFFICE", "bộ ứng dụng văn phòng", "Mercy Tech"],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "vi-VN": `/blog/${slug}`,
        "en-US": `/en/blog/${slug}`,
        "x-default": `/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://onlyofficevietnam.com${canonicalUrl}`,
      siteName: "ONLYOFFICE Vietnam",
      locale: isVi ? "vi_VN" : "en_US",
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
