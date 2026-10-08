import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale === "vi";

  const title = isVi
    ? "Trải Nghiệm Dùng Thử ONLYOFFICE Trực Tuyến & 7 Ngày PC"
    : "Live Interactive Demo & 7-Day PC Trial";

  const description = isVi
    ? "Trải nghiệm trực tuyến bộ công cụ ONLYOFFICE Docs trên trình duyệt hoặc tải công cụ kích hoạt bản quyền 7 ngày Enterprise trên máy tính cá nhân hoàn toàn miễn phí cùng Mercy Tech."
    : "Experience ONLYOFFICE Docs online interactive suite in your browser or activate full 7-day Enterprise trial on your local PC with Mercy Tech.";

  const canonicalUrl = isVi ? "/demo" : "/en/demo";

  return {
    title,
    description,
    keywords: isVi
      ? ["dùng thử ONLYOFFICE", "demo ONLYOFFICE trực tuyến", "kích hoạt 7 ngày ONLYOFFICE", "test ONLYOFFICE", "Mercy Tech"]
      : ["ONLYOFFICE demo", "online office demo", "7-day trial ONLYOFFICE", "test office suite", "Mercy Tech"],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "vi-VN": "/demo",
        "en-US": "/en/demo",
        "x-default": "/demo",
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

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
