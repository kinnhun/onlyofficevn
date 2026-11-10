import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { FullPageChatApp } from "@/features/ai-assistant/components/FullPageChatApp";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale === "vi";

  return {
    title: isVi
      ? "Trợ Lý AI ONLYOFFICE — Hỗ Trợ Kỹ Thuật & Cài Đặt 24/7"
      : "ONLYOFFICE AI Assistant — 24/7 Technical Support & Setup",
    description: isVi
      ? "Cổng hỏi đáp và hỗ trợ kỹ thuật tự động 24/7 của Mercy Tech: hướng dẫn tải bộ cài All-in-One, sửa lỗi font .VnTime, dùng thử 7 ngày và kết nối kỹ thuật viên UltraViewer."
      : "24/7 automated technical support & knowledge portal: download setup, fix font issues, 7-day trial, and UltraViewer remote assistance.",
  };
}

export default async function AiSupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FullPageChatApp />;
}

