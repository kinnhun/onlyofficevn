import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import EcosystemSection from "@/components/EcosystemSection";
import CollaborationSection from "@/components/CollaborationSection";
import AIAssistantsSection from "@/components/AIAssistantsSection";
import SecuritySection from "@/components/SecuritySection";
import LegalComplianceSection from "@/components/LegalComplianceSection";
import SolutionsSection from "@/components/SolutionsSection";
import CustomersSection from "@/components/CustomersSection";
import RatingsSection from "@/components/RatingsSection";
import LatestNewsSection from "@/components/LatestNewsSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale === "vi";

  const title = isVi
    ? "ONLYOFFICE Vietnam — Bộ Ứng Dụng Văn Phòng Bảo Mật & Thay Thế Microsoft 365"
    : "ONLYOFFICE Vietnam — Secure Online Office Suite & Microsoft 365 Alternative";

  const description = isVi
    ? "Khám phá bộ ứng dụng văn phòng ONLYOFFICE tại Việt Nam: Soạn thảo văn bản DOCX, bảng tính XLSX, bài thuyết trình PPTX, chỉnh sửa PDF và tạo biểu mẫu tương tác. Tương thích 100% MS Office, tự lưu trữ on-premise bảo mật."
    : "Explore ONLYOFFICE office suite in Vietnam: DOCX documents, XLSX spreadsheets, PPTX presentations, PDF editor, and fillable forms. 100% MS Office compatibility with secure on-premise hosting.";

  const canonicalUrl = isVi ? "/" : "/en";

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: isVi
      ? [
          "ONLYOFFICE Vietnam",
          "ONLYOFFICE",
          "bộ ứng dụng văn phòng",
          "văn phòng trực tuyến",
          "phần mềm văn phòng số",
          "thay thế Microsoft 365",
          "thay thế Office 365",
          "soạn thảo văn bản DOCX",
          "bảng tính XLSX",
          "slide thuyết trình PPTX",
          "chỉnh sửa PDF",
          "tạo biểu mẫu OFORM",
          "xem sơ đồ Visio VSDX",
          "mã nguồn mở bảo mật",
          "tự lưu trữ On-Premise",
          "bản quyền ONLYOFFICE",
          "đại lý ONLYOFFICE",
          "Mercy Tech",
        ]
      : [
          "ONLYOFFICE Vietnam",
          "ONLYOFFICE",
          "secure online office suite",
          "office productivity suite",
          "Microsoft 365 alternative",
          "Office 365 alternative",
          "open source office software",
          "DOCX document editor",
          "XLSX spreadsheet editor",
          "PPTX presentation maker",
          "PDF editor and converter",
          "OFORM fillable forms",
          "Visio VSDX diagram viewer",
          "self-hosted office suite",
          "on-premise collaboration",
          "Mercy Tech",
        ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "vi-VN": "/",
        "en-US": "/en",
        "x-default": "/",
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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* <AnnouncementBar /> */}
      <Header />
      <main>
        <HeroSection />
        <EcosystemSection />
        <CollaborationSection />
        <AIAssistantsSection />
        <SecuritySection />
        <LegalComplianceSection />
        <SolutionsSection />
        <CustomersSection />
        <RatingsSection />
        {/* <LatestNewsSection /> */}
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
