import React from "react";
import { setRequestLocale } from "next-intl/server";
import ToolDetailPage from "@/components/docs/ToolDetailPage";
import { getToolDetailData, getToolMetadata } from "@/lib/toolsData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const meta = getToolMetadata("presentation-editor", locale);

  const isVi = locale === "vi";
  const canonicalUrl = isVi ? meta.canonical : `/en${meta.canonical}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://onlyofficevietnam.com${canonicalUrl}`,
      languages: {
        vi: `https://onlyofficevietnam.com${meta.canonical}`,
        en: `https://onlyofficevietnam.com/en${meta.canonical}`,
        "x-default": `https://onlyofficevietnam.com${meta.canonical}`,
      },
    },
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: `https://onlyofficevietnam.com${meta.canonical}`,
      type: "website",
      images: [
        {
          url: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-ppt.jpg",
          width: 1200,
          height: 630,
          alt: meta.ogTitle,
        },
      ],
    },
  };
}

export default async function PresentationEditorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const data = getToolDetailData("presentation-editor", locale);

  return <ToolDetailPage data={data} />;
}
