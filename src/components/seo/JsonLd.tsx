import React from "react";

export default function JsonLd({ locale }: { locale: string }) {
  const isVi = locale === "vi";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ONLYOFFICE Vietnam",
    alternateName: "ONLYOFFICE",
    url: "https://onlyoffice.vn",
    logo: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/logo/logo-onlyoffice.svg",
    description: isVi
      ? "Nhà cung cấp giải pháp văn phòng trực tuyến và ngoại tuyến bảo mật toàn diện cho doanh nghiệp tại Việt Nam."
      : "Provider of secure cloud and on-premise office productivity suites for modern enterprises.",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: "https://m.me/onlyoffice.official.vn",
        availableLanguage: ["Vietnamese", "English"],
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        url: "https://onlyoffice.vn/pricing",
        availableLanguage: ["Vietnamese", "English"],
      },
    ],
    sameAs: [
      "https://www.facebook.com/onlyoffice.official.vn",
      "https://twitter.com/ONLY_OFFICE",
      "https://www.youtube.com/user/onlyoffice01",
      "https://github.com/ONLYOFFICE",
      "https://www.linkedin.com/company/onlyoffice/",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ONLYOFFICE Vietnam",
    url: "https://onlyoffice.vn",
    inLanguage: isVi ? "vi-VN" : "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://onlyoffice.vn/blog?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ONLYOFFICE Docs",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Windows, macOS, Linux, Android, iOS, Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "VND",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "Microsoft Word (DOCX) Compatible Document Editor",
      "Microsoft Excel (XLSX) Compatible Spreadsheet Editor",
      "Microsoft PowerPoint (PPTX) Compatible Presentation Maker",
      "Adobe Acrobat Compatible PDF Editor & Converter",
      "Interactive Digital Fillable Form Creator (OFORM)",
      "Microsoft Visio (VSDX) Diagram Viewer",
      "Real-time Multi-user Co-authoring and Track Changes",
      "Integrated Generative AI Assistant",
      "Self-Hosted Private Cloud On-Premise Deployment",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </>
  );
}
