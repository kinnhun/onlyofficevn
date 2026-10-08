import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale === "vi";

  const title = isVi
    ? "Chương Trình Đại Lý & Đối Tác Chiến Lược ONLYOFFICE"
    : "ONLYOFFICE Strategic Partner & Reseller Program";

  const description = isVi
    ? "Gia nhập mạng lưới đại lý phân phối chính thức ONLYOFFICE tại Việt Nam: Chiết khấu hấp dẫn, hỗ trợ kỹ thuật chuyên sâu, chứng nhận AGPLv3 và giấy phép chuyển nhượng máy trọn đời."
    : "Join the official ONLYOFFICE distributor network in Vietnam: attractive reseller margins, dedicated technical backing, AGPLv3 certification, and lifetime transfer rights.";

  const canonicalUrl = isVi ? "/partners" : "/en/partners";

  return {
    title,
    description,
    keywords: isVi
      ? ["đại lý ONLYOFFICE", "đối tác ONLYOFFICE", "phân phối ONLYOFFICE Việt Nam", "chính sách đại lý phần mềm", "Mercy Tech"]
      : ["ONLYOFFICE partner", "ONLYOFFICE reseller program", "distributor Vietnam", "software partnership", "Mercy Tech"],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "vi-VN": "/partners",
        "en-US": "/en/partners",
        "x-default": "/partners",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://onlyofficevietnam.com${canonicalUrl}`,
      siteName: "ONLYOFFICE Vietnam",
      locale: isVi ? "vi_VN" : "en_US",
      type: "website",
      images: [
        {
          url: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-document.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-document.jpg"],
    },
  };
}

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
