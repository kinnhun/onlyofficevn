import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale === "vi";

  const title = isVi
    ? "Tin Tức, Cẩm Nang & Hướng Dẫn ONLYOFFICE"
    : "ONLYOFFICE News, Insights & Guides";

  const description = isVi
    ? "Cập nhật các tin tức công nghệ mới nhất, hướng dẫn triển khai văn phòng bảo mật, so sánh giải pháp và kinh nghiệm tối ưu hóa chi phí phần mềm từ Mercy Tech."
    : "Latest updates, installation guides, software comparisons, and digital transformation insights from Mercy Tech and ONLYOFFICE.";

  const canonicalUrl = isVi ? "/blog" : "/en/blog";

  return {
    title,
    description,
    keywords: isVi
      ? ["tin tức ONLYOFFICE", "hướng dẫn ONLYOFFICE", "cẩm nang văn phòng số", "bảo mật dữ liệu", "Mercy Tech blog"]
      : ["ONLYOFFICE news", "ONLYOFFICE guides", "digital office insights", "data privacy", "Mercy Tech blog"],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "vi-VN": "/blog",
        "en-US": "/en/blog",
        "x-default": "/blog",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://onlyofficevietnam.com${canonicalUrl}`,
      siteName: "ONLYOFFICE Vietnam",
      locale: isVi ? "vi_VN" : "en_US",
      type: "website",
      images: [
        {
          url: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-document.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-document.jpg"],
    },
  };
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
