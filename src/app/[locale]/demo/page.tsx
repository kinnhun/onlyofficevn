import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import DemoClientView from "@/components/demo/DemoClientView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale === "vi";

  return {
    title: isVi
      ? "Dùng Thử & Trải Nghiệm ONLYOFFICE Enterprise — Tải Tool 7 Ngày Tự Động"
      : "Try & Experience ONLYOFFICE Enterprise — 7-Day Free Trial",
    description: isVi
      ? "Trải nghiệm trực tuyến bộ công cụ ONLYOFFICE Docs (Word, Excel, PowerPoint, PDF) và tải công cụ kích hoạt 7 ngày tự động trên máy tính."
      : "Experience ONLYOFFICE Docs online (Word, Excel, PowerPoint, PDF) and download our automated 7-day trial activation tool.",
    alternates: {
      canonical: isVi ? "/demo" : "/en/demo",
      languages: {
        "vi-VN": "/demo",
        "en-US": "/en/demo",
      },
    },
  };
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DemoClientView />;
}
