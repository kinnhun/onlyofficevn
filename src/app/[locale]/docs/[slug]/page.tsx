import React from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DocsFeatureDetailPage from "@/components/docs/DocsFeatureDetailPage";
import { featureDetailMap } from "@/lib/docsFeaturesData";

export async function generateStaticParams() {
  const slugs = Object.keys(featureDetailMap);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const isVi = locale === "vi";
  const data = featureDetailMap[slug];

  if (!data) {
    return {
      title: "ONLYOFFICE Docs — ONLYOFFICE Vietnam",
    };
  }

  return {
    title: isVi
      ? `${data.title} — ONLYOFFICE Docs | ONLYOFFICE Vietnam`
      : `${data.enTitle} — ONLYOFFICE Docs | ONLYOFFICE Vietnam`,
    description: isVi ? data.desc : data.enDesc,
  };
}

export default async function DocsSubFeaturePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const data = featureDetailMap[slug];
  if (!data) {
    notFound();
  }

  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", position: "relative" }}>
        <DocsFeatureDetailPage data={data} currentSlug={slug} />
      </main>
      <Footer />
    </>
  );
}
