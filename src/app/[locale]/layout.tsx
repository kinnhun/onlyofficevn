import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import FloatingTrialButton from "@/components/FloatingTrialButton";
import JsonLd from "@/components/seo/JsonLd";
import { Open_Sans } from "next/font/google";
import "../globals.css";

const openSans = Open_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-open-sans",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale === "vi";

  const siteTitleDefault = isVi
    ? "ONLYOFFICE Vietnam — Văn Phòng Trực Tuyến & Bộ Ứng Dụng Soạn Thảo Bảo Mật"
    : "ONLYOFFICE — Secure Online Office Suite & Microsoft 365 Alternative";

  const siteDescription = isVi
    ? "ONLYOFFICE cung cấp giải pháp văn phòng trực tuyến và ngoại tuyến bảo mật toàn diện: soạn thảo văn bản DOCX, bảng tính XLSX, thuyết trình PPTX, chỉnh sửa PDF, tạo biểu mẫu tương tác và xem sơ đồ Visio. Tương thích 100% Microsoft Office, tích hợp AI và tự do triển khai On-Premise."
    : "ONLYOFFICE provides a secure online and offline productivity suite: DOCX document editor, XLSX spreadsheets, PPTX presentations, PDF editor, fillable forms, and Visio viewer. 100% MS Office compatibility with AI assistant and on-premise deployment.";

  const keywords = isVi
    ? [
        "ONLYOFFICE",
        "ONLYOFFICE Vietnam",
        "văn phòng trực tuyến",
        "bộ ứng dụng văn phòng",
        "soạn thảo văn bản DOCX",
        "bảng tính XLSX",
        "slide thuyết trình PPTX",
        "chỉnh sửa PDF",
        "tạo biểu mẫu OFORM",
        "xem sơ đồ Visio VSDX",
        "thay thế Microsoft 365",
        "văn phòng số doanh nghiệp",
        "tự lưu trữ On-Premise",
        "mã nguồn mở bảo mật",
      ]
    : [
        "ONLYOFFICE",
        "ONLYOFFICE Vietnam",
        "secure online office",
        "office productivity suite",
        "DOCX document editor",
        "XLSX spreadsheet editor",
        "PPTX presentation maker",
        "PDF editor and converter",
        "OFORM fillable forms",
        "Visio VSDX diagram viewer",
        "Microsoft 365 alternative",
        "self-hosted office suite",
        "open source office software",
      ];

  const canonicalUrl = isVi ? "/" : "/en";

  return {
    metadataBase: new URL("https://onlyoffice.vn"),
    title: {
      default: siteTitleDefault,
      template: "%s | ONLYOFFICE Vietnam",
    },
    description: siteDescription,
    keywords,
    authors: [{ name: "ONLYOFFICE Vietnam" }, { name: "Mercy Tech" }],
    creator: "Mercy Tech Co., Ltd",
    publisher: "ONLYOFFICE Vietnam",
    applicationName: "ONLYOFFICE Docs",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "vi-VN": "/",
        "en-US": "/en",
        "x-default": "/",
      },
    },
    icons: {
      icon: [
        { url: "https://static-site.onlyoffice.com/public/images/favicons/favicon32.png", sizes: "32x32", type: "image/png" },
        { url: "https://static-site.onlyoffice.com/public/images/favicons/favicon150.png", sizes: "150x150", type: "image/png" },
      ],
      shortcut: "https://static-site.onlyoffice.com/public/images/favicons/favicon32.png",
      apple: "https://static-site.onlyoffice.com/public/images/favicons/favicon150.png",
    },
    openGraph: {
      type: "website",
      locale: isVi ? "vi_VN" : "en_US",
      alternateLocale: [isVi ? "en_US" : "vi_VN"],
      url: `https://onlyoffice.vn${canonicalUrl}`,
      siteName: "ONLYOFFICE Vietnam",
      title: siteTitleDefault,
      description: siteDescription,
      images: [
        {
          url: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-document.jpg",
          width: 1200,
          height: 630,
          alt: "ONLYOFFICE Vietnam — Bộ Ứng Dụng Văn Phòng Bảo Mật",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ONLY_OFFICE",
      creator: "@ONLY_OFFICE",
      title: siteTitleDefault,
      description: siteDescription,
      images: [
        "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-document.jpg",
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "vi" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir="ltr" className={openSans.variable} suppressHydrationWarning>
      <head>
        <JsonLd locale={locale} />
      </head>
      <body className={openSans.className} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <div id="__next">
            <div className="layout">{children}</div>
            <FloatingTrialButton />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
