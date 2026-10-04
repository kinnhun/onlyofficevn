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
  const meta = getToolMetadata("diagram-viewer", locale);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
    },
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: `https://onlyoffice.vn${meta.canonical}`,
      type: "website",
      images: [
        {
          url: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-xem-so-do.jpg",
          width: 1200,
          height: 630,
          alt: meta.ogTitle,
        },
      ],
    },
  };
}

export default async function DiagramViewerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const data = getToolDetailData("diagram-viewer", locale);

  return <ToolDetailPage data={data} />;
}
