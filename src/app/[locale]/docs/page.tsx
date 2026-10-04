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

  return {
    title: isVi
      ? "ONLYOFFICE Docs — Bộ Soạn Thảo Văn Phòng Toàn Diện | ONLYOFFICE Vietnam"
      : "ONLYOFFICE Docs — Comprehensive Office Suite | ONLYOFFICE Vietnam",
    description: isVi
      ? "ONLYOFFICE Docs tại Việt Nam — Bộ công cụ văn phòng bảo mật, tương thích 95%+ MS Office, hỗ trợ tiếng Việt, tối ưu chi phí bản quyền bởi Mercy Tech."
      : "ONLYOFFICE Docs in Vietnam — Enterprise-grade office suite with 95%+ MS Office compatibility, multi-format editors, and private cloud deployment.",
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
