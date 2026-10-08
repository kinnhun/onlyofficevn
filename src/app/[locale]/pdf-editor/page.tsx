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
  const meta = getToolMetadata("pdf-editor", locale);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
    },
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: `https://onlyofficevietnam.com${meta.canonical}`,
      type: "website",
      images: [
        {
          url: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/pdf-editor/pdf-chinh-sua-noi-dung.png",
          width: 1200,
          height: 630,
          alt: meta.ogTitle,
        },
      ],
    },
  };
}

export default async function PdfEditorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const data = getToolDetailData("pdf-editor", locale);

  return <ToolDetailPage data={data} />;
}
