import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import InstallGuideClientView from "@/components/install-guide/InstallGuideClientView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale === "vi";

  const title = isVi
    ? "Hướng Dẫn Cài Đặt ONLYOFFICE & Đổi Máy (MCT5) Mới Nhất 2026"
    : "ONLYOFFICE Installation Guide & Multi-Device Transfer (MCT5) 2026";

  const description = isVi
    ? "Hướng dẫn 4 bước cài đặt và kích hoạt bản quyền ONLYOFFICE trên máy tính Windows. Quy trình gỡ key chuyển sang máy mới (Key MCT5), chuẩn font Times New Roman Nghị định 30."
    : "Comprehensive step-by-step guide to install and activate ONLYOFFICE on Windows. Includes multi-device license transfer instructions (MCT5 key) and video tutorial.";

  const canonicalUrl = isVi ? "/huong-dan-cai-dat" : "/en/huong-dan-cai-dat";

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: isVi
      ? [
          "hướng dẫn cài đặt onlyoffice",
          "cách cài onlyoffice trên máy tính",
          "cách cài onlyoffice",
          "tải bộ cài onlyoffice",
          "hướng dẫn đổi máy onlyoffice",
          "gỡ key onlyoffice",
          "key đổi máy onlyoffice",
          "onlyoffice mct5",
          "kích hoạt bản quyền onlyoffice",
          "onlyoffice vĩnh viễn",
          "lỗi font onlyoffice",
          "nghị định 30 onlyoffice",
          "setup onlyoffice mercy",
          "onlyoffice vietnam",
        ]
      : [
          "onlyoffice installation guide",
          "how to install onlyoffice",
          "transfer onlyoffice license",
          "deactivate onlyoffice key",
          "onlyoffice mct5 transfer",
          "onlyoffice vietnam setup",
        ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        vi: "https://onlyofficevietnam.com/huong-dan-cai-dat",
        en: "https://onlyofficevietnam.com/en/huong-dan-cai-dat",
        "x-default": "https://onlyofficevietnam.com/huong-dan-cai-dat",
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "ONLYOFFICE Vietnam",
      locale: isVi ? "vi_VN" : "en_US",
      type: "article",
      images: [
        {
          url: "https://onlyofficevietnam.com/images/mau-tem-cao-vat-ly.png",
          width: 1200,
          height: 630,
          alt: "Hướng Dẫn Cài Đặt ONLYOFFICE Vietnam & Quy Trình Đổi Máy MCT5",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://onlyofficevietnam.com/images/mau-tem-cao-vat-ly.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function HuongDanCaiDatSeoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isVi = locale === "vi";

  // ══════════════════════════════════════════════════════════════════
  // GOOGLE RICH RESULTS SCHEMA GRAPH:
  // 1. HowTo (Step-by-step Rich Cards on SERP)
  // 2. VideoObject (Video Carousel & Timestamps)
  // 3. FAQPage (Expandable SERP Snippets for Max Click-Through Rate)
  // 4. SoftwareApplication (Star Ratings, Compatibility, Price)
  // 5. BreadcrumbList (Clean Breadcrumb Navigation Hierarchy)
  // ══════════════════════════════════════════════════════════════════
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. BREADCRUMBLIST
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: isVi ? "Trang Chủ" : "Home",
            item: "https://onlyofficevietnam.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: isVi ? "Hướng Dẫn Cài Đặt & Đổi Máy" : "Installation & License Transfer Guide",
            item: "https://onlyofficevietnam.com/huong-dan-cai-dat",
          },
        ],
      },

      // 2. HOWTO SCHEMA
      {
        "@type": "HowTo",
        name: isVi
          ? "Hướng dẫn cài đặt ONLYOFFICE và quy trình đổi máy mới (Mã MCT5)"
          : "How to install ONLYOFFICE and transfer license to a new PC (MCT5)",
        description: isVi
          ? "Quy trình 4 bước cài đặt mới và chuyển đổi bản quyền phần mềm ONLYOFFICE giữa các máy tính trong 30 giây."
          : "4-step procedure to install and transfer ONLYOFFICE software license across devices.",
        image: "https://onlyofficevietnam.com/images/mau-tem-cao-vat-ly.png",
        totalTime: "PT3M",
        estimatedCost: {
          "@type": "MonetaryAmount",
          currency: "VND",
          value: "0",
        },
        tool: [
          {
            "@type": "HowToTool",
            name: "Setup-OnlyOffice-Mercy.exe (Bộ cài đặt đồ họa tự động)",
          },
        ],
        step: [
          {
            "@type": "HowToStep",
            name: "Bước 01: Truy cập trang hướng dẫn hoặc quét mã QR",
            text: "Truy cập onlyofficevietnam.com/huong-dan-cai-dat trên trình duyệt hoặc quét mã QR bằng camera điện thoại.",
            url: "https://onlyofficevietnam.com/huong-dan-cai-dat#step-1",
            image: "https://onlyofficevietnam.com/images/mau-tem-cao-vat-ly.png",
          },
          {
            "@type": "HowToStep",
            name: "Bước 02: Tải bộ cài đặt Setup-OnlyOffice-Mercy.exe",
            text: "Nhấp vào nút Tải Bộ Cài Đặt (.exe) dung lượng ~5.2 MB về thư mục Downloads của máy tính.",
            url: "https://onlyofficevietnam.com/huong-dan-cai-dat#step-2",
          },
          {
            "@type": "HowToStep",
            name: "Bước 03: Mở file cài đặt và vượt qua bảo vệ Windows SmartScreen",
            text: "Nhấp đúp chuột vào file vừa tải. Nếu Windows hiển thị màn hình bảo vệ màu xanh, bấm 'More info' và chọn 'Run anyway'.",
            url: "https://onlyofficevietnam.com/huong-dan-cai-dat#step-3",
          },
          {
            "@type": "HowToStep",
            name: "Bước 04: Nhập mã bản quyền và kích hoạt vĩnh viễn",
            text: "Nhập Số Seri & 12 số cào hoặc dán Product Key (hoặc để trống nếu dùng thử 7 ngày) rồi bấm Cài Đặt & Kích Hoạt.",
            url: "https://onlyofficevietnam.com/huong-dan-cai-dat#step-4",
            image: "https://onlyofficevietnam.com/images/bo-cai-tem-vat-ly.png",
          },
        ],
      },

      // 3. VIDEOOBJECT SCHEMA
      {
        "@type": "VideoObject",
        name: isVi
          ? "Video Hướng Dẫn Cài Đặt & Kích Hoạt ONLYOFFICE Chi Tiết"
          : "ONLYOFFICE Installation & Activation Video Tutorial",
        description: isVi
          ? "Video thao tác trực tiếp trên màn hình máy tính: tải bộ cài đặt, nhập mã tem cào/key online và mở ứng dụng Word, Excel."
          : "Step-by-step screen walkthrough of downloading, activating, and launching ONLYOFFICE.",
        thumbnailUrl: ["https://i.ytimg.com/vi/Iv552_svAJY/hqdefault.jpg"],
        uploadDate: "2026-01-15T08:00:00+07:00",
        duration: "PT2M15S",
        embedUrl: "https://www.youtube.com/embed/Iv552_svAJY",
        contentUrl: "https://www.youtube.com/watch?v=Iv552_svAJY",
        publisher: {
          "@type": "Organization",
          name: "ONLYOFFICE Vietnam (Mercy Tech Global)",
          logo: {
            "@type": "ImageObject",
            url: "https://onlyofficevietnam.com/logo.svg",
          },
        },
      },

      // 4. FAQPAGE SCHEMA (MEGA GOOGLE SERP RICH SNIPPET)
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Cài đặt ONLYOFFICE có làm mất dữ liệu Word, Excel hoặc các phần mềm cũ trên máy không?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Hoàn toàn không. ONLYOFFICE hoạt động độc lập, không ghi đè, không xóa và không ảnh hưởng đến bất kỳ tệp tài liệu hay phần mềm nào đã cài trước đó. Mọi file Word (.docx), Excel (.xlsx), PowerPoint (.pptx) cũ đều mở mượt mà và giữ nguyên vẹn định dạng.",
            },
          },
          {
            "@type": "Question",
            name: "Bộ cài đặt báo lỗi Windows SmartScreen 'Windows protected your PC' thì xử lý thế nào?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Đây là cơ chế bảo vệ mặc định của Microsoft Windows khi mở file cài đặt mới tải từ Internet. Bạn chỉ cần bấm vào dòng chữ 'More info' (Thông tin thêm), sau đó bấm nút 'Run anyway' (Vẫn chạy) là phần mềm sẽ khởi chạy bình thường 100%.",
            },
          },
          {
            "@type": "Question",
            name: "Khác biệt giữa Bản Cài Thường (Key 1 Máy) và Bản Đổi Máy (Mã MCT5) là gì?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Bản Cài Thường (Key 1 Máy / Tem cào vật lý) là bản quyền vĩnh viễn gắn liền với phần cứng (Mainboard) của 1 máy tính duy nhất. Trong khi đó, Bản Đổi Máy (Mã MCT5) cho phép bạn gỡ key và chuyển đổi bản quyền sang máy tính mới lên đến 5 lần khi đổi thiết bị.",
            },
          },
          {
            "@type": "Question",
            name: "Nếu máy cũ bị hỏng, mất cắp hoặc cài lại Win mà chưa kịp gỡ Key thì làm sao đổi sang máy mới?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Trường hợp máy tính cũ bị sự cố phần cứng không thể mở lên để gỡ Key, bạn chỉ cần liên hệ Hotline/Zalo Kỹ thuật: 0763 068 614 (Mercy Tech Global). Kỹ thuật viên sẽ hỗ trợ giải phóng bản quyền từ xa trên máy chủ chỉ trong 5-15 phút.",
            },
          },
          {
            "@type": "Question",
            name: "ONLYOFFICE có tích hợp sẵn font chữ tiếng Việt và chuẩn văn bản Nghị định 30 không?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Có. Bộ cài đặt của Mercy Tech Global đã được tích hợp sẵn gói tối ưu giao diện tiếng Việt và thiết lập mẫu văn bản chuẩn font Times New Roman 14pt theo đúng quy định của Nghị định 30/2020/NĐ-CP của Chính phủ về công tác văn thư.",
            },
          },
        ],
      },

      // 5. SOFTWAREAPPLICATION SCHEMA
      {
        "@type": "SoftwareApplication",
        name: "ONLYOFFICE Desktop Editors",
        operatingSystem: "Windows 7, Windows 8, Windows 10, Windows 11 (32-bit & 64-bit)",
        applicationCategory: "BusinessApplication",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "VND",
          availability: "https://schema.org/InStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "128",
          bestRating: "5",
          worstRating: "1",
        },
        author: {
          "@type": "Organization",
          name: "Mercy Tech Global",
          url: "https://onlyofficevietnam.com",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <InstallGuideClientView />
    </>
  );
}
