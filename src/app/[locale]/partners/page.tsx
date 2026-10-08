import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import PartnersClientView from "@/components/partners/PartnersClientView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale === "vi";

  return {
    title: isVi
      ? "Chương Trình Đối Tác & Đại Lý Phân Phối ONLYOFFICE Tại Việt Nam"
      : "ONLYOFFICE Reseller & Partner Program in Vietnam",
    description: isVi
      ? "Đăng ký trở thành đại lý phân phối chính thức ONLYOFFICE tại Việt Nam cùng Công ty TNHH Công Nghệ Mercy. Chiết khấu cao, hỗ trợ kỹ thuật và marketing toàn diện."
      : "Join the official ONLYOFFICE partner and reseller network in Vietnam with Mercy Tech. Attractive profit margins and comprehensive technical support.",
    alternates: {
      canonical: isVi ? "/partners" : "/en/partners",
      languages: {
        "vi-VN": "/partners",
        "en-US": "/en/partners",
      },
    },
  };
}

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PartnersClientView />;
}
