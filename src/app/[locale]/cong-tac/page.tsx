import React from "react";
import { setRequestLocale } from "next-intl/server";
import SeamlessCollaborationPage from "@/components/collaboration/SeamlessCollaborationPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isVi = locale === "vi";

  return {
    title: isVi
      ? "Cộng Tác Liền Mạch Trên Mọi Tài Liệu Văn Phòng — ONLYOFFICE Vietnam"
      : "Collaborate effectively on all kinds of office documents | ONLYOFFICE",
    description: isVi
      ? "Chia sẻ, đồng chỉnh sửa thời gian thực, bình luận, họp video và theo dõi thay đổi mượt mà trên văn bản DOCX, bảng tính XLSX, slide PPTX và tệp PDF cùng ONLYOFFICE."
      : "Share, co-author and communicate in real time to get work done faster on all kinds of office documents with ONLYOFFICE.",
    alternates: {
      canonical: "/cong-tac",
    },
    openGraph: {
      title: isVi
        ? "Cộng Tác Liền Mạch Trên Mọi Tài Liệu Văn Phòng — ONLYOFFICE Vietnam"
        : "Collaborate effectively on all kinds of office documents | ONLYOFFICE",
      description: isVi
        ? "Chia sẻ, đồng chỉnh sửa thời gian thực, bình luận và họp video ngay trong tài liệu với ONLYOFFICE."
        : "Share, co-author and communicate in real time to get work done faster on all kinds of office documents.",
      url: "https://onlyofficevietnam.com/cong-tac",
      type: "website",
      images: [
        {
          url: "https://static-site.onlyoffice.com/public/images/templates/seamless-collaboration/hero/en/sc-header.png",
          width: 1200,
          height: 630,
          alt: "ONLYOFFICE Seamless Collaboration",
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SeamlessCollaborationPage />;
}
