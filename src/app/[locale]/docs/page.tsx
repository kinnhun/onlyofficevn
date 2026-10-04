import React from "react";
import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DocsHero from "@/components/docs/DocsHero";
import DocsFeaturesGrid from "@/components/docs/DocsFeaturesGrid";
import DocsExploreCarousel from "@/components/docs/DocsExploreCarousel";
import DocsSecuritySection from "@/components/docs/DocsSecuritySection";
import DocsLegalSection from "@/components/docs/DocsLegalSection";
import DocsPricingSection from "@/components/docs/DocsPricingSection";
import DocsLeadFormSection from "@/components/docs/DocsLeadFormSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isVi = locale === "vi";

  const title = isVi
    ? "ONLYOFFICE Docs — Bộ Soạn Thảo Văn Phòng Toàn Diện"
    : "ONLYOFFICE Docs — Comprehensive Office Suite";

  const description = isVi
    ? "ONLYOFFICE Docs tại Việt Nam — Bộ công cụ văn phòng bảo mật, tương thích 95%+ MS Office, hỗ trợ tiếng Việt, tối ưu chi phí bản quyền bởi Mercy Tech."
    : "ONLYOFFICE Docs in Vietnam — Enterprise-grade office suite with 95%+ MS Office compatibility, multi-format editors, and private cloud deployment.";

  const canonicalUrl = isVi ? "/docs" : "/en/docs";

  return {
    title,
    description,
    keywords: isVi
      ? ["ONLYOFFICE Docs", "bộ soạn thảo văn phòng", "tài liệu trực tuyến", "DOCX XLSX PPTX", "biểu mẫu OFORM", "chỉnh sửa PDF", "Mercy Tech"]
      : ["ONLYOFFICE Docs", "office suite", "online document editor", "DOCX XLSX PPTX", "fillable forms", "PDF editor", "Mercy Tech"],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "vi-VN": "/docs",
        "en-US": "/en/docs",
        "x-default": "/docs",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://onlyoffice.vn${canonicalUrl}`,
      siteName: "ONLYOFFICE Vietnam",
      locale: isVi ? "vi_VN" : "en_US",
      type: "website",
      images: [
        {
          url: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-document.jpg",
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
      images: ["https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-document.jpg"],
    },
  };
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <DocsHero />
        <DocsFeaturesGrid />
        <DocsExploreCarousel />
        <DocsSecuritySection />
        <DocsLegalSection />
        <DocsPricingSection />
        <DocsLeadFormSection />
      </main>
      <Footer />
    </>
  );
}
