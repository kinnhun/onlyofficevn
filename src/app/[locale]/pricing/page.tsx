import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import PricingClientView from "@/components/pricing/PricingClientView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale === "vi";

  return {
    title: isVi
      ? "Bảng Giá Bản Quyền ONLYOFFICE — Key Online & Tem Vật Lý Chính Hãng"
      : "ONLYOFFICE Official Pricing & Licensing in Vietnam",
    description: isVi
      ? "Bảng giá bản quyền ONLYOFFICE vĩnh viễn theo máy (Key Online) và tem vật lý bảo hành chính hãng từ Công ty TNHH Công Nghệ Mercy."
      : "Explore ONLYOFFICE perpetual and subscription licensing packages with official support from Mercy Tech.",
    alternates: {
      canonical: isVi ? "/pricing" : "/en/pricing",
      languages: {
        "vi-VN": "/pricing",
        "en-US": "/en/pricing",
      },
    },
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PricingClientView />;
}
