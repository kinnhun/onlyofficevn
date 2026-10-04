import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale === "vi";

  const title = isVi
    ? "Bảng Giá Bản Quyền ONLYOFFICE Chính Hãng"
    : "ONLYOFFICE Official Pricing & Licensing";

  const description = isVi
    ? "Báo giá bản quyền ONLYOFFICE Docs Enterprise, Home Server và Developer Edition chính hãng tại Việt Nam. Cấp phép vĩnh viễn, đầy đủ hóa đơn VAT, hỗ trợ kỹ thuật trực tiếp bởi Mercy Tech."
    : "Official pricing for ONLYOFFICE Docs Enterprise, Home Server, and Developer Edition in Vietnam. Lifetime perpetual licensing with full compliance and enterprise support.";

  const canonicalUrl = isVi ? "/pricing" : "/en/pricing";

  return {
    title,
    description,
    keywords: isVi
      ? ["báo giá ONLYOFFICE", "bảng giá bản quyền ONLYOFFICE", "ONLYOFFICE Enterprise giá", "mua bản quyền văn phòng", "Mercy Tech"]
      : ["ONLYOFFICE pricing", "ONLYOFFICE license cost", "ONLYOFFICE Enterprise quote", "buy office suite", "Mercy Tech"],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "vi-VN": "/pricing",
        "en-US": "/en/pricing",
        "x-default": "/pricing",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://onlyoffice.vn${canonicalUrl}`,
      siteName: "ONLYOFFICE Vietnam",
      locale: isVi ? "vi_VN" : "en_US",
      type: "website",
      images: [
        {
          url: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-document.jpg",
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
      images: ["https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-document.jpg"],
    },
  };
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
