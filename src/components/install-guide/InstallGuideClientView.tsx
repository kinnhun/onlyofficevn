"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Download,
  Key,
  Tag,
  RefreshCw,
  CheckCircle2,
  PhoneCall,
  Laptop,
  Layers,
  Sparkles,
  ShieldCheck,
  Maximize2,
  X,
  ExternalLink,
  Link2,
  Copy,
  Check,
  ChevronDown,
  Info,
  AlertTriangle,
  Gift,
  FileCheck2,
  QrCode,
  Zap,
} from "lucide-react";

interface GuideStepItem {
  num: string;
  title: string;
  badge: string;
  desc: string;
  subPoints?: string[];
  tip: string;
  icon: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;
  actionBtn?: {
    text: string;
    href: string;
    download?: boolean;
  };
  images?: {
    src: string;
    alt: string;
    caption: string;
  }[];
}

export default function InstallGuideClientView() {
  const [activeTab, setActiveTab] = useState<"standard" | "transfer" | "trial">("standard");
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; caption?: string } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedGuide, setCopiedGuide] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const OFFICIAL_SETUP_URL = "https://onlyofficevietnam.com/Setup-OnlyOffice-Mercy.exe";

  const OFFICIAL_GUIDE_URL = "https://onlyofficevietnam.com/huong-dan-cai-dat";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(OFFICIAL_SETUP_URL);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopyGuideLink = async () => {
    try {
      await navigator.clipboard.writeText(OFFICIAL_GUIDE_URL);
      setCopiedGuide(true);
      setTimeout(() => setCopiedGuide(false), 2500);
    } catch {
      // Fallback
    }
  };

  // ══════════════════════════════════════════════════════════════════
  // TAB 1: BỘ CÀI BÌNH THƯỜNG (CÀI MỚI / KEY 1 MÁY / TEM CÀO)
  // ══════════════════════════════════════════════════════════════════
  const standardSteps: GuideStepItem[] = [
    {
      num: "01",
      title: "Bước 1: Truy Cập Website Hoặc Quét Mã QR",
      badge: "Cổng Hướng Dẫn",
      desc: "Quét mã QR hoặc mở trình duyệt web truy cập trực tiếp vào liên kết chính thức: onlyofficevietnam.com/huong-dan-cai-dat để xem đầy đủ quy trình cài đặt và tải tệp bộ cài mới nhất.",
      tip: "Trang web được tối ưu nén tải tức thì trên cả máy tính và điện thoại thông minh.",
      icon: QrCode,
      actionBtn: {
        text: "Tải Bộ Cài Đặt Ngay (.exe)",
        href: "/Setup-OnlyOffice-Mercy.exe",
        download: true,
      },
    },
    {
      num: "02",
      title: "Bước 2: Tải Bộ Cài Đặt Setup-OnlyOffice-Mercy.exe",
      badge: "Bộ Cài 1-Click",
      desc: "Bấm vào nút màu cam 'TẢI BỘ CÀI ĐẶT (.EXE)' để tải tệp cài đặt chính thức về máy tính. Bộ cài có dung lượng nhỏ gọn (~5.2 MB), tải xong sau 2-3 giây.",
      tip: "Tệp cài đặt là file thực thi .exe độc lập, không cần giải nén ZIP phức tạp, tự động tương thích Windows 7, 8, 10, 11 (cả 32-bit và 64-bit).",
      icon: Download,
      actionBtn: {
        text: "Tải Bộ Cài Đặt Ngay (.exe)",
        href: "/Setup-OnlyOffice-Mercy.exe",
        download: true,
      },
    },
    {
      num: "03",
      title: "Bước 3: Mở File Cài Đặt & Vượt Qua Cảnh Báo Windows",
      badge: "Khởi Chạy",
      desc: "Mở thư mục Downloads ➔ Nhấp đúp chuột vào file 'Setup-OnlyOffice-Mercy.exe' vừa tải về. Bộ cài sẽ mở ra giao diện đồ họa hiện đại.",
      subPoints: [
        "Nếu Windows hiển thị màn hình bảo vệ Windows SmartScreen ('Windows protected your PC' màu xanh dương).",
        "Bạn chỉ cần bấm vào dòng chữ gạch chân: 'More info' (Thông tin thêm).",
        "Sau đó nhấp vào nút: 'Run anyway' (Vẫn chạy) để bắt đầu cài đặt.",
      ],
      tip: "Đây là thông báo bảo mật mặc định thông thường của hệ điều hành Windows khi mở ứng dụng cài đặt mới tải về lần đầu.",
      icon: Laptop,
    },
    {
      num: "04",
      title: "Bước 4: Nhập Mã Bản Quyền & Bấm Kích Hoạt Vĩnh Viễn",
      badge: "Kích Hoạt Tự Động",
      desc: "Trên cửa sổ bộ cài, chọn tab phù hợp với loại bản quyền bạn đang sở hữu và bấm nút 'CÀI ĐẶT & KÍCH HOẠT BẢN QUYỀN':",
      subPoints: [
        "Trường hợp có Thẻ Tem Cào: Nhập Số Seri (in nổi bên trên) và 12 số cào bí mật (dưới lớp nhũ bạc) vào ô tương ứng.",
        "Trường hợp có Key Online: Dán chuỗi Product Key (dạng ONLY-XXXX-XXXX...) vào ô nhập.",
        "Trường hợp Dùng Thử: Để trống hoàn toàn ô nhập Key và bấm nút 'Cài Đặt & Dùng Thử 7 Ngày Miễn Phí'.",
        "Bộ cài sẽ tự động thiết lập bản quyền gắn liền phần cứng (Mainboard), chuẩn hóa font Times New Roman 14pt (Nghị định 30) và xuất biểu tượng Word, Excel, PowerPoint ra Desktop.",
      ],
      tip: "Quá trình cài đặt chỉ mất từ 30 đến 60 giây. Khi hoàn tất, phần mềm sẽ tự động mở lên cho bạn bắt đầu soạn thảo ngay!",
      icon: CheckCircle2,
      images: [
        {
          src: "/images/bo-cai-tem-vat-ly.png",
          alt: "Giao diện bộ cài OnlyOffice - Tab Nhập Tem Cào Vật Lý",
          caption: "Giao diện bộ cài thực tế: Nhập Seri in nổi bên trái và 12 số bí mật cào được bên phải.",
        },
        {
          src: "/images/bo-cai-key-online.png",
          alt: "Giao diện bộ cài OnlyOffice - Tab Nhập Key Bản Quyền Online",
          caption: "Tab Key Online: Dán mã bản quyền trực tiếp vào ô nhập để kích hoạt vĩnh viễn.",
        },
      ],
    },
  ];

  // ══════════════════════════════════════════════════════════════════
  // TAB 2: BỘ CÀI ĐỔI MÁY (CHUYỂN SANG MÁY MỚI - KEY MCT5)
  // ══════════════════════════════════════════════════════════════════
  const transferSteps: GuideStepItem[] = [
    {
      num: "01",
      title: "Bước 1: Mở Lại Bộ Cài Đặt Trên Máy Tính Cũ",
      badge: "Mở Bộ Cài Máy Cũ",
      desc: "Sử dụng lại tệp 'Setup-OnlyOffice-Mercy.exe' đã tải trước đó trên máy tính cũ của bạn, hoặc truy cập onlyofficevietnam.com/huong-dan-cai-dat để tải lại.",
      tip: "Bạn không cần gỡ phần mềm OnlyOffice trước, chỉ cần mở trực tiếp file Setup-OnlyOffice-Mercy.exe.",
      icon: Laptop,
    },
    {
      num: "02",
      title: "Bước 2: Bấm Nút 'GỠ KEY' Để Giải Phóng Bản Quyền",
      badge: "Giải Phóng Slot Đổi Máy",
      desc: "Trên cửa sổ bộ cài, nhấp vào nút 'Gỡ Key' (Deactivate License) và bấm Xác nhận theo chỉ dẫn trên màn hình:",
      subPoints: [
        "Hệ thống sẽ kết nối với máy chủ bản quyền Mercy Tech để vô hiệu hóa bản quyền trên chiếc máy cũ này.",
        "Một lượt chuyển đổi máy sẽ được hoàn trả vào tài khoản mã Key của bạn (Key chuyển máy MCT5 hỗ trợ đổi máy lên đến 5 lần).",
        "Màn hình sẽ hiển thị thông báo: 'Đã gỡ bản quyền khỏi máy cũ thành công. Bạn có thể kích hoạt trên máy mới ngay bây giờ'.",
      ],
      tip: "Việc gỡ Key trên máy cũ là bước chuẩn mực giúp bảo toàn trọn vẹn số lượt chuyển đổi và tránh xung đột bản quyền.",
      icon: RefreshCw,
      images: [
        {
          src: "/images/to-huong-dan-cai-dat-va-doi-may.jpg",
          alt: "Tờ hướng dẫn cài đặt và đổi máy OnlyOffice 2 mặt chính hãng Mercy Tech",
          caption: "Mặt sau tờ hướng dẫn: Quy trình 4 bước gỡ key và chuyển bản quyền OnlyOffice sang máy mới.",
        },
      ],
    },
    {
      num: "03",
      title: "Bước 3: Tải & Cài Đặt ONLYOFFICE Trên Máy Tính Mới",
      badge: "Cài Đặt Máy Mới",
      desc: "Mở chiếc máy tính mới của bạn, truy cập vào onlyofficevietnam.com/huong-dan-cai-dat và tải bộ cài đặt 'Setup-OnlyOffice-Mercy.exe' về máy mới.",
      tip: "Máy tính mới cần có kết nối Internet để bộ cài xác thực mã bản quyền với máy chủ.",
      icon: Download,
      actionBtn: {
        text: "Tải Bộ Cài Cho Máy Mới (.exe)",
        href: "/Setup-OnlyOffice-Mercy.exe",
        download: true,
      },
    },
    {
      num: "04",
      title: "Bước 4: Nhập Lại Product Key Để Tiếp Tục Sử Dụng",
      badge: "Kích Hoạt Lại Thành Công",
      desc: "Mở bộ cài trên máy tính mới ➔ Nhập lại đúng dãy Product Key đã được cấp trước đó (dạng MCT5-XXXX-XXXX...) ➔ Bấm 'KÍCH HOẠT LẠI BẢN QUYỀN'.",
      subPoints: [
        "Bản quyền ONLYOFFICE vĩnh viễn sẽ ngay lập tức được chuyển sang chiếc máy tính mới.",
        "Toàn bộ chuẩn font Times New Roman 14pt (Nghị định 30) sẽ được thiết lập tự động.",
        "Bạn tiếp tục làm việc bình thường mà không phải trả thêm bất kỳ khoản chi phí nào.",
      ],
      tip: "Lưu ý quan trọng: Nếu máy cũ bị hỏng phần cứng hoặc không thể bật lên để gỡ Key, đừng ngần ngại gọi Hotline/Zalo kỹ thuật 0763 068 614 để được hỗ trợ reset thủ công siêu tốc!",
      icon: CheckCircle2,
      images: [
        {
          src: "/images/hop-va-the-key-onlyoffice-retail.jpg",
          alt: "Hộp sản phẩm Retail Box và Thẻ Key OnlyOffice chính hãng",
          caption: "Hộp Retail và Thẻ Key cứng: Mã Product Key dùng để kích hoạt lại trên máy tính mới.",
        },
      ],
    },
  ];

  // ══════════════════════════════════════════════════════════════════
  // TAB 3: DÙNG THỬ 7 NGÀY MIỄN PHÍ
  // ══════════════════════════════════════════════════════════════════
  const trialSteps: GuideStepItem[] = [
    {
      num: "01",
      title: "Bước 1: Tải Bộ Cài Đặt Setup-OnlyOffice-Mercy.exe",
      badge: "Miễn Phí 100%",
      desc: "Tải file cài đặt chính thức về máy tính của bạn hoàn toàn miễn phí, không yêu cầu thẻ tín dụng hay thông tin thanh toán.",
      tip: "Dung lượng bộ cài chỉ ~5.2 MB, tải xong ngay trong chớp mắt.",
      icon: Download,
      actionBtn: {
        text: "Tải Bản Dùng Thử Ngay (.exe)",
        href: "/Setup-OnlyOffice-Mercy.exe",
        download: true,
      },
    },
    {
      num: "02",
      title: "Bước 2: Mở Bộ Cài & ĐỂ TRỐNG Ô KEY (Không Cần Nhập Gì)",
      badge: "Kích Hoạt Tự Động",
      desc: "Mở file 'Setup-OnlyOffice-Mercy.exe' lên. Bạn chỉ cần để trống hoàn toàn ô nhập Key hoặc ô Tem cào.",
      tip: "Hệ thống đã lập trình thông minh: Khi để trống Key, phần mềm sẽ tự động hiểu bạn muốn Dùng thử 7 ngày miễn phí đầy đủ tính năng.",
      icon: Gift,
      images: [
        {
          src: "/images/bo-cai-key-online.png",
          alt: "Giao diện bộ cài để trống key để dùng thử 7 ngày",
          caption: "Gợi ý hiển thị: 'ĐỂ TRỐNG NẾU BẠN MUỐN DÙNG THỬ 7 NGÀY (MIỄN PHÍ)...'",
        },
      ],
    },
    {
      num: "03",
      title: "Bước 3: Bấm 'CÀI ĐẶT & DÙNG THỬ 7 NGÀY' Và Trải Nghiệm",
      badge: "Trải Nghiệm Đầy Đủ",
      desc: "Nhấp vào nút màu cam '⚡ CÀI ĐẶT & DÙNG THỬ 7 NGÀY (MIỄN PHÍ)'. Phần mềm sẽ tự động cài đặt và cấp 7 ngày trải nghiệm mượt mà:",
      subPoints: [
        "Đầy đủ 100% tính năng Word (DOCX), Excel (XLSX), PowerPoint (PPTX), PDF và Form.",
        "Tương thích rất tốt với các tài liệu Microsoft Office, mở file mượt mà không lỗi font.",
        "Tích hợp sẵn chuẩn thể thức văn bản Times New Roman 14pt theo Nghị định 30/2020/NĐ-CP.",
        "Có thể nâng cấp lên bản quyền vĩnh viễn bất kỳ lúc nào bằng cách nhập Key hoặc Tem cào mà không mất dữ liệu.",
      ],
      tip: "Sau khi cài xong, bạn có thể kiểm tra số ngày dùng thử còn lại tại góc dưới màn hình ứng dụng.",
      icon: CheckCircle2,
    },
  ];

  const currentSteps =
    activeTab === "standard"
      ? standardSteps
      : activeTab === "transfer"
      ? transferSteps
      : trialSteps;

  const faqs = [
    {
      q: "Cài đặt ONLYOFFICE có làm mất dữ liệu Word, Excel hoặc các phần mềm cũ trên máy không?",
      a: "Hoàn toàn KHÔNG! ONLYOFFICE hoạt động hoàn toàn độc lập, không ghi đè, không xóa và không ảnh hưởng đến bất kỳ tệp tài liệu hay phần mềm nào đã cài trước đó trên máy tính của bạn. Tất cả tài liệu Word (.docx, .doc), Excel (.xlsx, .xls) cũ sẽ được mở mượt mà và giữ nguyên vẹn định dạng.",
    },
    {
      q: "Bộ cài đặt báo lỗi Windows SmartScreen 'Windows protected your PC' thì xử lý thế nào?",
      a: "Đây là cơ chế cảnh báo bảo mật mặc định của Microsoft Windows khi bạn mở một file cài đặt mới tải từ Internet. Bạn chỉ cần bấm vào dòng chữ 'More info' (Thông tin thêm), sau đó bấm nút 'Run anyway' (Vẫn chạy) là phần mềm sẽ khởi chạy bình thường 100%.",
    },
    {
      q: "Khác biệt giữa Bản Cài Thường (Key 1 Máy) và Bản Đổi Máy (Mã MCT5) là gì?",
      a: "Bản Cài Thường (Key 1 Máy / Tem cào vật lý) là bản quyền vĩnh viễn gắn liền với phần cứng (Mainboard) của 1 máy tính duy nhất, phù hợp cho cá nhân hoặc văn phòng dùng cố định. Trong khi đó, Bản Đổi Máy (Mã MCT5) cho phép bạn chuyển đổi bản quyền sang máy tính mới lên đến 5 lần (đổi máy khi mua máy mới, nâng cấp thiết bị...).",
    },
    {
      q: "Nếu máy cũ bị hỏng, mất cắp hoặc cài lại Win mà chưa kịp gỡ Key thì làm sao đổi sang máy mới?",
      a: "Quý khách hoàn toàn yên tâm! Trường hợp máy cũ bị sự cố phần cứng không thể mở lên để bấm nút 'Gỡ Key', bạn chỉ cần liên hệ Hotline/Zalo Kỹ thuật: 0763 068 614 (Mercy Tech Global). Đội ngũ kỹ thuật viên sẽ xác minh mã Key của bạn và hỗ trợ giải phóng bản quyền từ xa trên máy chủ chỉ trong 5-15 phút.",
    },
    {
      q: "ONLYOFFICE có tích hợp sẵn font chữ tiếng Việt và chuẩn văn bản Nghị định 30 không?",
      a: "Có! Bộ cài đặt của Mercy Tech Global đã được tích hợp gói tự động tối ưu giao diện tiếng Việt và thiết lập sẵn mẫu văn bản chuẩn font Times New Roman 14pt theo đúng quy định của Nghị định 30/2020/NĐ-CP của Chính phủ về công tác văn thư, giúp bạn soạn thảo chuẩn ngay từ lần đầu mở máy.",
    },
  ];

  return (
    <div className="ig-page">
      {/* 1. Header Navigation */}
      <Header />

      {/* 2. Main Content */}
      <main style={{ flex: 1, paddingBottom: "80px" }}>
        {/* ═══════════════════════════════════════════════════════════
            TOP HERO BANNER (ONLYOFFICE BRAND LUXURY)
        ═══════════════════════════════════════════════════════════ */}
        <section className="ig-hero-section">
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            {/* Top Badge */}
            <div className="ig-hero-badge">
              <ShieldCheck size={16} color="#ea580c" />
              <span>HƯỚNG DẪN CHÍNH THỨC • ONLYOFFICE VIỆT NAM (MERCY TECH)</span>
            </div>

            {/* Title */}
            <h1 className="ig-hero-title">
              Hướng Dẫn Cài Đặt &amp; Chuyển Đổi Bản Quyền <span>ONLYOFFICE</span>
            </h1>

            {/* Subtitle */}
            <p className="ig-hero-subtitle">
              Cài đặt nhanh chóng chỉ trong 4 bước đơn giản. Tự động chuẩn hóa font chữ Times New Roman 14pt (Nghị định 30/2020/NĐ-CP)
              và quy trình chuyển đổi sang máy tính mới trong 30 giây.
            </p>

            {/* Feature Pills */}
            <div className="ig-pills-row">
              <span className="ig-pill">
                <Zap size={14} color="#ea580c" /> Bộ cài đồ họa 1-Click tự động
              </span>
              <span className="ig-pill">
                <ShieldCheck size={14} color="#16a34a" /> Kích hoạt vĩnh viễn không gia hạn
              </span>
              <span className="ig-pill">
                <FileCheck2 size={14} color="#2563eb" /> Chuẩn Font Nghị Định 30/2020/NĐ-CP
              </span>
              <span className="ig-pill">
                <RefreshCw size={14} color="#d97706" /> Đổi sang máy mới đến 5 lần (MCT5)
              </span>
            </div>

            {/* Hero CTAs */}
            <div className="ig-hero-ctas">
              <a
                href="/Setup-OnlyOffice-Mercy.exe"
                download="Setup-OnlyOffice-Mercy.exe"
                className="ig-btn-primary"
              >
                <Download size={20} />
                <span>TẢI BỘ CÀI ĐẶT (.EXE)</span>
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="ig-btn-outline"
                title="Sao chép link tải trực tiếp file exe"
              >
                {copiedLink ? <Check size={18} color="#16a34a" /> : <Link2 size={18} color="#ea580c" />}
                <span>{copiedLink ? "ĐÃ COPY LINK TẢI!" : "COPY LINK TẢI (.EXE)"}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyGuideLink}
                className="ig-btn-copy-guide"
                title="Sao chép đường link trang hướng dẫn cài đặt (URL)"
              >
                {copiedGuide ? <Check size={18} color="#16a34a" /> : <Link2 size={18} color="#ea580c" />}
                <span>{copiedGuide ? "ĐÃ COPY LINK HƯỚNG DẪN!" : "COPY LINK HƯỚNG DẪN"}</span>
              </button>
            </div>

            <p style={{ margin: "10px 0 0", fontSize: "12.5px", color: "#64748b" }}>
              Tương thích Windows 7, 8, 10, 11 (32-bit &amp; 64-bit) • Dung lượng nhẹ ~5.2 MB • 100% Sạch vi-rút
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            MAIN WRAPPER WITH 2-COLUMN GRID
        ═══════════════════════════════════════════════════════════ */}
        <div className="ig-container">
          {/* TAB SWITCHER: 2 BIG PARTS (Standard vs Transfer) + Trial */}
          <div className="ig-tabs-card">
            <div className="ig-tabs-heading">
              <Layers size={16} color="#ea580c" />
              <span>CHỌN PHƯƠNG THỨC BẠN MUỐN XEM HƯỚNG DẪN:</span>
            </div>

            <div className="ig-tabs-grid">
              {/* TAB 1: BỘ CÀI BÌNH THƯỜNG */}
              <button
                type="button"
                onClick={() => setActiveTab("standard")}
                className={`ig-tab-btn ${activeTab === "standard" ? "active-standard" : ""}`}
              >
                <div className="ig-tab-icon">
                  <Tag size={20} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="ig-tab-title">
                    <span>1. Bộ Cài Bình Thường</span>
                    <span className="ig-tab-badge">Phổ Biến</span>
                  </div>
                  <div className="ig-tab-desc">
                    Cài mới lần đầu bằng Tem Cào Vật Lý, Thẻ Cứng hoặc Key Bản Quyền Online.
                  </div>
                </div>
              </button>

              {/* TAB 2: BỘ CÀI ĐỔI MÁY (MCT5) */}
              <button
                type="button"
                onClick={() => setActiveTab("transfer")}
                className={`ig-tab-btn ${activeTab === "transfer" ? "active-transfer" : ""}`}
              >
                <div className="ig-tab-icon">
                  <RefreshCw size={20} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="ig-tab-title">
                    <span>2. Hướng Dẫn Đổi Máy</span>
                    <span className="ig-tab-badge">Key MCT5 (5 Máy)</span>
                  </div>
                  <div className="ig-tab-desc">
                    Quy trình gỡ Key trên máy tính cũ và chuyển bản quyền sang máy tính mới.
                  </div>
                </div>
              </button>

              {/* TAB 3: DÙNG THỬ 7 NGÀY */}
              <button
                type="button"
                onClick={() => setActiveTab("trial")}
                className={`ig-tab-btn ${activeTab === "trial" ? "active-trial" : ""}`}
              >
                <div className="ig-tab-icon">
                  <Gift size={20} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="ig-tab-title">
                    <span>3. Dùng Thử 7 Ngày</span>
                    <span className="ig-tab-badge">Miễn Phí</span>
                  </div>
                  <div className="ig-tab-desc">
                    Không cần mã Key, trải nghiệm đầy đủ 100% tính năng văn phòng ngay lập tức.
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              GRID 2 CỘT: CỘT CHÍNH (8 COLS) + SIDEBAR STICKY (4 COLS)
          ═══════════════════════════════════════════════════════════ */}
          <div className="ig-main-grid">
            {/* ═══ CỘT TRÁI: TIMELINE HƯỚNG DẪN & ẢNH MINH HỌA (8 COLS) ═══ */}
            <div>
              {/* SHOWCASE THẺ CÀO & TỜ HƯỚNG DẪN NẾU Ở TAB 1 HOẶC TAB 2 */}
              {activeTab === "standard" && (
                <div className="ig-card">
                  <div className="ig-card-header">
                    <div className="ig-card-header-left">
                      <div className="ig-card-icon-wrap">
                        <Tag size={20} />
                      </div>
                      <div>
                        <h3 className="ig-card-title">
                          Mẫu Thẻ Tem Cào &amp; Hộp OnlyOffice Retail Chính Hãng
                        </h3>
                        <div className="ig-card-subtitle">
                          Bộ sản phẩm đóng gói tiêu chuẩn phân phối chính hãng bởi Mercy Tech Global
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", background: "#f1f5f9", padding: "4px 12px", borderRadius: "9999px" }}>
                      Ảnh Thực Tế
                    </span>
                  </div>

                  {/* 2 Ảnh Showcase */}
                  <div className="ig-showcase-grid">
                    {/* Thẻ cào */}
                    <div
                      onClick={() =>
                        setSelectedImage({
                          src: "/images/mau-tem-cao-vat-ly.png",
                          alt: "Mẫu tem cào vật lý OnlyOffice chính hãng viền 7 màu",
                          caption: "Thẻ tem cào: Số Seri in nổi bên trên, Mã bí mật 12 số dưới lớp phủ cào bạc.",
                        })
                      }
                      className="ig-image-card"
                    >
                      <div className="ig-image-titlebar">
                        <div className="ig-window-dots">
                          <span className="ig-dot-red" />
                          <span className="ig-dot-yellow" />
                          <span className="ig-dot-green" />
                        </div>
                        <span>Mau-Tem-Cao-Vat-Ly.png</span>
                      </div>
                      <div className="ig-image-wrapper">
                        <img
                          src="/images/mau-tem-cao-vat-ly.png"
                          alt="Mẫu tem cào vật lý OnlyOffice chính hãng"
                        />
                        <div className="ig-image-zoom-overlay">
                          <span className="ig-zoom-pill">
                            <Maximize2 size={14} /> BẤM PHÓNG TO
                          </span>
                        </div>
                      </div>
                      <div className="ig-image-caption">
                        <strong>1. Thẻ Tem Cào Chống Giả:</strong> Viền Hologram 7 màu, số Seri in nổi và vùng phủ cào bạc.
                      </div>
                    </div>

                    {/* Hộp Retail Box */}
                    <div
                      onClick={() =>
                        setSelectedImage({
                          src: "/images/hop-va-the-key-onlyoffice-retail.jpg",
                          alt: "Hộp OnlyOffice Retail Box và thẻ cứng Product Key",
                          caption: "Trọn bộ Hộp OnlyOffice Retail Box và Thẻ Card cứng Product Key.",
                        })
                      }
                      className="ig-image-card"
                    >
                      <div className="ig-image-titlebar">
                        <div className="ig-window-dots">
                          <span className="ig-dot-red" />
                          <span className="ig-dot-yellow" />
                          <span className="ig-dot-green" />
                        </div>
                        <span>Retail-Box-And-Card.jpg</span>
                      </div>
                      <div className="ig-image-wrapper">
                        <img
                          src="/images/hop-va-the-key-onlyoffice-retail.jpg"
                          alt="Hộp OnlyOffice Retail Box và thẻ cứng Product Key"
                        />
                        <div className="ig-image-zoom-overlay">
                          <span className="ig-zoom-pill">
                            <Maximize2 size={14} /> BẤM PHÓNG TO
                          </span>
                        </div>
                      </div>
                      <div className="ig-image-caption">
                        <strong>2. Hộp Box &amp; Thẻ Card Cứng:</strong> Đóng gói sang trọng kèm mã Product Key Retail.
                      </div>
                    </div>
                  </div>

                  <p style={{ margin: "14px 0 0", fontSize: "12px", color: "#64748b", fontStyle: "italic", textAlign: "center" }}>
                    💡 Nhấp chuột vào từng ảnh trên để phóng to xem chi tiết số Seri và vị trí vùng phủ cào.
                  </p>
                </div>
              )}

              {/* SHOWCASE TỜ RƠI 2 MẶT KHI Ở TAB ĐỔI MÁY */}
              {activeTab === "transfer" && (
                <div className="ig-card" style={{ background: "linear-gradient(180deg, #fffbeb 0%, #ffffff 100%)", borderColor: "#fde68a" }}>
                  <div className="ig-card-header" style={{ borderColor: "#fef3c7" }}>
                    <div className="ig-card-header-left">
                      <div className="ig-card-icon-wrap" style={{ background: "#fef3c7", color: "#d97706" }}>
                        <RefreshCw size={20} />
                      </div>
                      <div>
                        <h3 className="ig-card-title">
                          Tờ Hướng Dẫn Chuyển Đổi Máy (Mặt Trước &amp; Mặt Sau)
                        </h3>
                        <div className="ig-card-subtitle">
                          Tờ hướng dẫn kích hoạt đi kèm trong hộp bán lẻ của OnlyOffice Mercy Tech
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 800, color: "#92400e", background: "#fef3c7", padding: "4px 12px", borderRadius: "9999px" }}>
                      Quy Chuẩn Hãng
                    </span>
                  </div>

                  <div
                    onClick={() =>
                      setSelectedImage({
                        src: "/images/to-huong-dan-cai-dat-va-doi-may.jpg",
                        alt: "Tờ hướng dẫn cài đặt và đổi máy OnlyOffice 2 mặt chính hãng",
                        caption: "Tờ rơi hướng dẫn: Mặt 1 là 4 bước cài đặt mới, Mặt 2 là 4 bước gỡ key và chuyển máy.",
                      })
                    }
                    className="ig-image-card"
                    style={{ background: "#ffffff" }}
                  >
                    <div className="ig-image-titlebar">
                      <div className="ig-window-dots">
                        <span className="ig-dot-red" />
                        <span className="ig-dot-yellow" />
                        <span className="ig-dot-green" />
                      </div>
                      <span>To-Huong-Dan-Cai-Dat-Va-Doi-May.jpg</span>
                    </div>
                    <div className="ig-image-wrapper" style={{ background: "#ffffff", padding: "16px" }}>
                      <img
                        src="/images/to-huong-dan-cai-dat-va-doi-may.jpg"
                        alt="Tờ hướng dẫn cài đặt và đổi máy OnlyOffice 2 mặt chính hãng"
                        style={{ maxHeight: "360px" }}
                      />
                      <div className="ig-image-zoom-overlay">
                        <span className="ig-zoom-pill">
                          <Maximize2 size={14} /> BẤM PHÓNG TO TOÀN MÀN HÌNH
                        </span>
                      </div>
                    </div>
                    <div className="ig-image-caption" style={{ background: "#fef3c7", color: "#78350f" }}>
                      📄 <strong>Tờ Hướng Dẫn Thực Tế:</strong> Mặt 1 là 4 bước cài đặt, Mặt 2 là 4 bước chuyển đổi máy. Nhấp ảnh để phóng to!
                    </div>
                  </div>

                  {/* Callout Lưu Ý Quan Trọng khi Đổi Máy */}
                  <div style={{ marginTop: "16px", padding: "14px 18px", borderRadius: "12px", background: "#fef3c7", border: "1px solid #fde68a", fontSize: "13px", color: "#78350f", lineHeight: "1.6" }}>
                    <div style={{ fontWeight: 800, display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", color: "#92400e" }}>
                      <AlertTriangle size={18} color="#d97706" />
                      <span>LƯU Ý QUAN TRỌNG KHI ĐỔI MÁY:</span>
                    </div>
                    <ul style={{ margin: "0", paddingLeft: "20px" }}>
                      <li style={{ marginBottom: "4px" }}>
                        Nên thực hiện thao tác <strong>gỡ Key trên máy cũ</strong> trước khi kích hoạt trên máy mới để máy chủ tự động thu hồi và cấp lại slot đổi máy.
                      </li>
                      <li>
                        Nếu máy tính cũ bị cháy hỏng phần cứng, mất cắp hoặc lỗi Windows không mở được để gỡ Key: Quý khách đừng lo lắng! Vui lòng liên hệ Hotline/Zalo kỹ thuật <strong>0763 068 614</strong> để được hỗ trợ reset bản quyền trên máy chủ trong 5-15 phút.
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* TIMELINE CÁC BƯỚC THEO TAB HIỆN TẠI */}
              <div className="ig-card">
                <div className="ig-card-header">
                  <div>
                    <h3 className="ig-card-title">
                      {activeTab === "standard"
                        ? "Quy Trình 4 Bước Cài Đặt Bộ Cài Bình Thường"
                        : activeTab === "transfer"
                        ? "Quy Trình 4 Bước Chuyển Đổi Bản Quyền Sang Máy Mới"
                        : "Quy Trình 3 Bước Cài Đặt Dùng Thử 7 Ngày Miễn Phí"}
                    </h3>
                    <div className="ig-card-subtitle">
                      Làm theo đúng thứ tự các bước bên dưới để hoàn tất cài đặt trong 2 phút
                    </div>
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "#ea580c", background: "#ffedd5", padding: "4px 12px", borderRadius: "9999px" }}>
                    {currentSteps.length} Bước Đơn Giản
                  </span>
                </div>

                {/* Step List Timeline */}
                <div className="ig-timeline">
                  {currentSteps.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <div key={idx} className="ig-step-item">
                        {/* Step Number Circle */}
                        <div className="ig-step-num">{step.num}</div>

                        {/* Step Card Content */}
                        <div className="ig-step-content">
                          <div className="ig-step-header">
                            <h4 className="ig-step-title">
                              <Icon size={18} color="#ea580c" />
                              <span>{step.title}</span>
                            </h4>
                            <span className="ig-step-badge">{step.badge}</span>
                          </div>

                          <div className="ig-step-desc">{step.desc}</div>

                          {/* Subpoints if any */}
                          {step.subPoints && step.subPoints.length > 0 && (
                            <div className="ig-step-subpoints">
                              {step.subPoints.map((pt, pIdx) => (
                                <div key={pIdx} className="ig-step-subpoint-item">
                                  <div className="ig-subpoint-idx">{pIdx + 1}</div>
                                  <div>{pt}</div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Step Tip Callout */}
                          <div className="ig-step-tip">
                            <Sparkles size={16} color="#ea580c" style={{ flexShrink: 0, marginTop: "2px" }} />
                            <div>
                              <strong>Mẹo &amp; Lưu ý:</strong> {step.tip}
                            </div>
                          </div>

                          {/* Step Action Button */}
                          {step.actionBtn && (
                            <div style={{ marginTop: "12px" }}>
                              <a
                                href={step.actionBtn.href}
                                download={step.actionBtn.download}
                                className="ig-btn-primary"
                                style={{ padding: "10px 20px", fontSize: "13px" }}
                              >
                                <Download size={16} />
                                <span>{step.actionBtn.text}</span>
                              </a>
                            </div>
                          )}

                          {/* Step Images with Click-to-Zoom Lightbox */}
                          {step.images && step.images.length > 0 && (
                            <div className="ig-showcase-grid" style={{ marginTop: "14px" }}>
                              {step.images.map((img, iIdx) => (
                                <div
                                  key={iIdx}
                                  onClick={() => setSelectedImage(img)}
                                  className="ig-image-card"
                                >
                                  <div className="ig-image-titlebar">
                                    <div className="ig-window-dots">
                                      <span className="ig-dot-red" />
                                      <span className="ig-dot-yellow" />
                                      <span className="ig-dot-green" />
                                    </div>
                                    <span>Setup-OnlyOffice-Mercy.exe</span>
                                  </div>
                                  <div className="ig-image-wrapper">
                                    <img src={img.src} alt={img.alt} />
                                    <div className="ig-image-zoom-overlay">
                                      <span className="ig-zoom-pill">
                                        <Maximize2 size={13} /> BẤM PHÓNG TO
                                      </span>
                                    </div>
                                  </div>
                                  <div className="ig-image-caption">{img.caption}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ═══════════════════════════════════════════════════════════
                  VIDEO TUTORIAL EMBED (RESPONSIVE DESKTOP MOCKUP)
              ═══════════════════════════════════════════════════════════ */}
              <div className="ig-card">
                <div className="ig-card-header">
                  <div className="ig-card-header-left">
                    <div className="ig-card-icon-wrap">
                      <Laptop size={20} />
                    </div>
                    <div>
                      <h3 className="ig-card-title">
                        Video Hướng Dẫn Thao Tác Trực Tiếp Trên Màn Hình Máy Tính
                      </h3>
                      <div className="ig-card-subtitle">
                        Xem thực tế từng bước tải về, nhập tem cào/mã key và tự động mở ứng dụng Word, Excel
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "#ffffff", background: "#0f172a", padding: "4px 12px", borderRadius: "9999px" }}>
                    Video Hướng Dẫn
                  </span>
                </div>

                {/* macOS / Windows Window Mockup for YouTube Embed */}
                <div className="ig-video-frame">
                  <div style={{ background: "#0f172a", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #1e293b" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span className="ig-dot-red" />
                      <span className="ig-dot-yellow" />
                      <span className="ig-dot-green" />
                      <span style={{ fontSize: "12px", color: "#94a3b8", fontFamily: "monospace", marginLeft: "8px" }}>
                        huong_dan_cai_dat_onlyoffice.mp4
                      </span>
                    </div>
                    <span style={{ fontSize: "10px", color: "#fb923c", fontWeight: 800, textTransform: "uppercase", background: "#431407", border: "1px solid #9a3412", padding: "2px 8px", borderRadius: "4px" }}>
                      Mercy Tech Official
                    </span>
                  </div>

                  {/* Responsive Iframe Container (16:9) */}
                  <div className="ig-video-responsive">
                    <iframe
                      src="https://www.youtube.com/embed/Iv552_svAJY?autoplay=0&rel=0"
                      title="Video Hướng Dẫn Cài Đặt OnlyOffice - Mercy Tech"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "10px", fontSize: "12.5px", color: "#64748b", marginTop: "12px" }}>
                  <span>Thời lượng: ~2 phút • Độ phân giải: Full HD 1080p • Có phụ đề tiếng Việt</span>
                  <a
                    href="https://www.youtube.com/watch?v=Iv552_svAJY"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#ff6f3d", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}
                  >
                    <span>Mở xem trên YouTube</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              {/* ═══════════════════════════════════════════════════════════
                  SEO AUTHORITY SECTION: SO SÁNH & CẨM NĂNG KỸ THUẬT
              ═══════════════════════════════════════════════════════════ */}
              <div className="ig-card">
                <div className="ig-card-header">
                  <div>
                    <h3 className="ig-card-title">
                      So Sánh: Bộ Cài Bình Thường (Key 1 Máy) vs. Bộ Cài Đổi Máy (Mã MCT5)
                    </h3>
                    <div className="ig-card-subtitle">
                      Chi tiết khác biệt về tính năng, cơ chế khóa bản quyền và quyền lợi kỹ thuật
                    </div>
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "#c2410c", background: "#ffedd5", padding: "4px 12px", borderRadius: "9999px" }}>
                    Bảng So Sánh
                  </span>
                </div>

                <div className="ig-table-wrap">
                  <table className="ig-seo-table">
                    <thead>
                      <tr>
                        <th>Tiêu Chí Kỹ Thuật</th>
                        <th style={{ color: "#ea580c" }}>Bản Cài Thường (1 Máy)</th>
                        <th style={{ color: "#d97706" }}>Bản Đổi Máy (Mã MCT5)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Số lượng máy hỗ trợ</strong></td>
                        <td>01 Máy tính cố định</td>
                        <td><strong style={{ color: "#d97706" }}>Chuyển đổi đến 05 máy tính</strong></td>
                      </tr>
                      <tr>
                        <td><strong>Cơ chế khóa bản quyền</strong></td>
                        <td>Khóa chặt theo Mainboard phần cứng</td>
                        <td>Quản lý lượt đổi máy qua máy chủ Mercy Tech</td>
                      </tr>
                      <tr>
                        <td><strong>Quy trình chuyển máy mới</strong></td>
                        <td>Không hỗ trợ (Cần mua key mới)</td>
                        <td><strong style={{ color: "#16a34a" }}>Bấm 'Gỡ Key' ➔ Kích hoạt trên máy mới</strong></td>
                      </tr>
                      <tr>
                        <td><strong>Hình thức nhận bản quyền</strong></td>
                        <td>Tem cào Hologram hoặc Key Online</td>
                        <td>Thẻ Card Retail cứng hoặc Key MCT5</td>
                      </tr>
                      <tr>
                        <td><strong>Thời hạn sử dụng</strong></td>
                        <td>Vĩnh viễn (Trọn đời)</td>
                        <td>Vĩnh viễn (Trọn đời)</td>
                      </tr>
                      <tr>
                        <td><strong>Chuẩn font Nghị định 30</strong></td>
                        <td>Có sẵn Times New Roman 14pt</td>
                        <td>Có sẵn Times New Roman 14pt</td>
                      </tr>
                      <tr>
                        <td><strong>Hỗ trợ UltraViewer từ xa</strong></td>
                        <td>Miễn phí trong 15 phút</td>
                        <td>Miễn phí 15p + Hỗ trợ reset slot khi máy hỏng</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* System Requirements Grid */}
                <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #f1f5f9" }}>
                  <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Laptop size={18} color="#ea580c" />
                    <span>Yêu Cầu Cấu Hình Máy Tính Để Chạy Mượt ONLYOFFICE</span>
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                    <div style={{ padding: "12px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                      <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Hệ Điều Hành</div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", marginTop: "2px" }}>Windows 7 / 8 / 10 / 11</div>
                      <div style={{ fontSize: "11px", color: "#16a34a", marginTop: "2px" }}>32-bit &amp; 64-bit</div>
                    </div>
                    <div style={{ padding: "12px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                      <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Bộ Vi Xử Lý (CPU)</div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", marginTop: "2px" }}>Dual Core 1.6 GHz trở lên</div>
                      <div style={{ fontSize: "11px", color: "#475569", marginTop: "2px" }}>Intel Core i3/i5/i7 hoặc AMD</div>
                    </div>
                    <div style={{ padding: "12px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                      <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Bộ Nhớ RAM</div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", marginTop: "2px" }}>Tối thiểu 2 GB</div>
                      <div style={{ fontSize: "11px", color: "#475569", marginTop: "2px" }}>Khuyên dùng 4 GB – 8 GB</div>
                    </div>
                    <div style={{ padding: "12px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                      <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Dung Lượng Ổ Cứng</div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", marginTop: "2px" }}>Trống từ 500 MB</div>
                      <div style={{ fontSize: "11px", color: "#16a34a", marginTop: "2px" }}>Tệp bộ cài chỉ ~5.2 MB</div>
                    </div>
                  </div>
                </div>

                {/* Troubleshooting 4 Cards */}
                <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #f1f5f9" }}>
                  <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", marginBottom: "4px" }}>
                    Cẩm Nang Xử Lý 4 Sự Cố Thường Gặp Khi Cài Đặt
                  </h4>
                  <p style={{ fontSize: "12.5px", color: "#64748b", marginBottom: "12px" }}>
                    Các giải pháp kỹ thuật đã được đội ngũ Mercy Tech tối ưu sẵn sàng
                  </p>
                  <div className="ig-trouble-grid">
                    <div className="ig-trouble-card">
                      <div className="ig-trouble-title">
                        <Info size={16} color="#ea580c" />
                        <span>1. Bị chặn bởi SmartScreen màn hình xanh</span>
                      </div>
                      <div className="ig-trouble-desc">
                        Bấm vào dòng chữ gạch chân <u>More info</u> ➔ Bấm nút <u>Run anyway</u>. Bộ cài sạch 100%, không chứa mã độc hay quảng cáo rác.
                      </div>
                    </div>
                    <div className="ig-trouble-card">
                      <div className="ig-trouble-title">
                        <FileCheck2 size={16} color="#2563eb" />
                        <span>2. Font chữ và chuẩn văn bản Nghị định 30</span>
                      </div>
                      <div className="ig-trouble-desc">
                        Phần mềm tự động đồng bộ font Times New Roman cỡ chữ 14pt chuẩn thể thức văn bản hành chính Việt Nam, không lo bị lỗi ô vuông khi đọc file cũ.
                      </div>
                    </div>
                    <div className="ig-trouble-card">
                      <div className="ig-trouble-title">
                        <AlertTriangle size={16} color="#d97706" />
                        <span>3. Máy cũ hỏng không bấm được 'Gỡ Key'</span>
                      </div>
                      <div className="ig-trouble-desc">
                        Chỉ cần nhắn tin Zalo hoặc gọi Hotline <strong>0763 068 614</strong>, cung cấp mã Key MCT5 để kỹ thuật viên giải phóng bản quyền từ xa trong 5 phút.
                      </div>
                    </div>
                    <div className="ig-trouble-card">
                      <div className="ig-trouble-title">
                        <ShieldCheck size={16} color="#16a34a" />
                        <span>4. Kích hoạt vĩnh viễn không mất phí hàng năm</span>
                      </div>
                      <div className="ig-trouble-desc">
                        Mua một lần dùng trọn đời, không bao giờ bị khóa tính năng, không phát sinh chi phí gia hạn hàng tháng/hàng năm như Microsoft 365.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ═══════════════════════════════════════════════════════════
                  FAQ ACCORDION: CÂU HỎI THƯỜNG GẶP KHI CÀI ĐẶT
              ═══════════════════════════════════════════════════════════ */}
              <div className="ig-card">
                <div className="ig-card-header">
                  <div>
                    <h3 className="ig-card-title">
                      Câu Hỏi Thường Gặp Khi Cài Đặt &amp; Kích Hoạt (FAQ)
                    </h3>
                    <div className="ig-card-subtitle">
                      Giải đáp nhanh các băn khoăn phổ biến nhất của quý khách hàng và kỹ thuật viên
                    </div>
                  </div>
                </div>

                <div className="ig-faq-list">
                  {faqs.map((faq, fIdx) => {
                    const isOpen = openFaqIndex === fIdx;
                    return (
                      <div key={fIdx} className="ig-faq-item">
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                          className="ig-faq-btn"
                        >
                          <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#ffedd5", color: "#c2410c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, flexShrink: 0 }}>
                              ?
                            </span>
                            <span>{faq.q}</span>
                          </span>
                          <ChevronDown
                            size={18}
                            color="#64748b"
                            style={{
                              transition: "transform 0.2s",
                              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                              flexShrink: 0,
                            }}
                          />
                        </button>
                        {isOpen && <div className="ig-faq-ans">{faq.a}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ═══ CỘT PHẢI: STICKY SIDEBAR TẢI NHANH & HỖ TRỢ (4 COLS) ═══ */}
            <div className="ig-sidebar">
              {/* CARD 1: PRIMARY DOWNLOAD WIDGET */}
              <div className="ig-side-card ig-download-side-card">
                <div className="ig-side-download-icon">
                  <Download size={28} />
                </div>

                <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 800, color: "#c2410c", background: "#ffedd5", border: "1px solid #fed7aa", padding: "4px 12px", borderRadius: "9999px", textTransform: "uppercase" }}>
                  BẢN CÀI ĐỒ HỌA MỚI 2026
                </span>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: "10px 0 6px" }}>
                  Setup-OnlyOffice-Mercy.exe
                </h3>
                <p style={{ fontSize: "12.5px", color: "#475569", lineHeight: "1.5", margin: "0 0 16px" }}>
                  Tải tệp cài đặt chính thức dạng <strong>.exe</strong> chạy 1-click tự động, tích hợp sẵn cả 2 chế độ Tem cào và Key online.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <a
                    href="/Setup-OnlyOffice-Mercy.exe"
                    download="Setup-OnlyOffice-Mercy.exe"
                    className="ig-btn-primary"
                    style={{ width: "100%", justifyContent: "center", boxSizing: "border-box" }}
                  >
                    <Download size={18} />
                    <span>TẢI BỘ CÀI ĐẶT (.EXE)</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="ig-btn-outline"
                    style={{ width: "100%", justifyContent: "center", boxSizing: "border-box" }}
                  >
                    {copiedLink ? <Check size={16} color="#16a34a" /> : <Link2 size={16} color="#ea580c" />}
                    <span>{copiedLink ? "ĐÃ COPY LINK TẢI!" : "COPY LINK TẢI TRỰC TIẾP"}</span>
                  </button>
                </div>

                <div style={{ marginTop: "14px", padding: "10px", background: "#ffffff", borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "12px", color: "#334155", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                  <ShieldCheck size={16} color="#16a34a" />
                  <span>Dung lượng siêu nhẹ ~5.2 MB • Sạch 100%</span>
                </div>
              </div>

              {/* CARD 2: QR CODE TẢI NHANH QUA ĐIỆN THOẠI */}
              <div className="ig-side-card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.4px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "12px" }}>
                  <QrCode size={18} color="#ea580c" />
                  <span>Quét QR Tải Nhanh Trên Điện Thoại</span>
                </div>

                {/* QR Code Graphic Frame */}
                <div style={{ padding: "12px", background: "#f8fafc", borderRadius: "14px", border: "1px solid #e2e8f0", display: "inline-block", margin: "0 auto 10px" }}>
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https%3A%2F%2Fonlyofficevietnam.com%2Fhuong-dan-cai-dat"
                    alt="Mã QR xem trang hướng dẫn cài đặt ONLYOFFICE"
                    style={{ width: "140px", height: "140px", display: "block" }}
                    loading="lazy"
                  />
                </div>

                <div style={{ fontSize: "12.5px", color: "#64748b", lineHeight: "1.5" }}>
                  Mở Camera hoặc Zalo quét mã để xem trang hướng dẫn:
                  <div style={{ fontFamily: "monospace", color: "#ea580c", fontWeight: 700, marginTop: "4px" }}>
                    onlyofficevietnam.com/huong-dan-cai-dat
                  </div>
                </div>
              </div>

              {/* CARD 3: WINDOWS SMARTSCREEN GUIDE */}
              <div className="ig-side-card">
                <div style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.4px", display: "flex", alignItems: "center", gap: "8px", paddingBottom: "10px", borderBottom: "1px solid #f1f5f9", marginBottom: "12px" }}>
                  <Info size={18} color="#ea580c" />
                  <span>Nếu Hiện Bảng Cảnh Báo Windows?</span>
                </div>

                <p style={{ fontSize: "12.5px", color: "#475569", lineHeight: "1.55", margin: "0 0 10px" }}>
                  Đừng lo lắng! Đây là cơ chế kiểm tra file tải từ mạng của Windows SmartScreen:
                </p>

                <div style={{ padding: "12px", borderRadius: "10px", background: "#fff7ed", border: "1px solid #fed7aa", fontSize: "12.5px", color: "#7c2d12" }}>
                  <div style={{ fontWeight: 800, marginBottom: "4px" }}>👉 Thao tác trong 2 giây:</div>
                  <ol style={{ margin: "0", paddingLeft: "18px", lineHeight: "1.5" }}>
                    <li>Bấm vào dòng chữ <u>"More info"</u> (Thông tin thêm).</li>
                    <li>Bấm nút <u>"Run anyway"</u> (Vẫn chạy).</li>
                  </ol>
                </div>
              </div>

              {/* CARD 4: TRỢ GIÚP KỸ THUẬT VIÊN TRỰC CHIẾN (15 PHÚT) */}
              <div className="ig-side-card">
                <div style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.4px", display: "flex", alignItems: "center", gap: "8px", paddingBottom: "10px", borderBottom: "1px solid #f1f5f9", marginBottom: "12px" }}>
                  <PhoneCall size={18} color="#ea580c" />
                  <span>Cần Kỹ Thuật Viên Cài Giúp?</span>
                </div>

                <p style={{ fontSize: "12.5px", color: "#475569", lineHeight: "1.55", margin: "0 0 12px" }}>
                  Đội ngũ CSKH &amp; Kỹ thuật Mercy Tech luôn sẵn sàng hỗ trợ bạn cài đặt từ xa qua UltraViewer hoặc AnyDesk hoàn toàn miễn phí trong 15 phút:
                </p>

                <div style={{ padding: "12px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0", fontSize: "12.5px", color: "#334155", display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>Hotline / Zalo:</span>
                    <strong style={{ color: "#ea580c", fontSize: "14px", fontFamily: "monospace" }}>0763 068 614</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>Giờ trực chiến:</span>
                    <span style={{ fontWeight: 600 }}>08:00 – 17:30 (T2 – T7)</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>Hỗ trợ UltraViewer:</span>
                    <span style={{ color: "#16a34a", fontWeight: 700 }}>Miễn phí 100%</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyGuideLink}
                  className="ig-btn-outline"
                  style={{ width: "100%", justifyContent: "center", fontSize: "12.5px", padding: "10px 14px", boxSizing: "border-box" }}
                  title="Sao chép đường link trang hướng dẫn cài đặt (URL)"
                >
                  {copiedGuide ? <Check size={15} color="#16a34a" /> : <Link2 size={15} color="#475569" />}
                  <span>{copiedGuide ? "ĐÃ COPY LINK HƯỚNG DẪN!" : "Sao Chép Link Hướng Dẫn"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* ═══════════════════════════════════════════════════════════
          FULLSCREEN IMAGE LIGHTBOX MODAL
      ═══════════════════════════════════════════════════════════ */}
      {selectedImage && (
        <div className="ig-modal-backdrop" onClick={() => setSelectedImage(null)}>
          <div className="ig-modal-box" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="ig-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="ig-dot-red" />
                <span className="ig-dot-yellow" />
                <span className="ig-dot-green" />
                <span style={{ marginLeft: "8px", fontSize: "13px" }}>{selectedImage.alt}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="ig-modal-close-btn"
                title="Đóng xem ảnh"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Image Box */}
            <div className="ig-modal-img-wrap">
              <img src={selectedImage.src} alt={selectedImage.alt} />
            </div>

            {/* Modal Caption */}
            {selectedImage.caption && (
              <div className="ig-modal-caption">
                💡 {selectedImage.caption}
              </div>
            )}

            {/* Modal Footer */}
            <div style={{ padding: "10px 20px", background: "#0f172a", borderTop: "1px solid #1e293b", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "11.5px", color: "#94a3b8" }}>
              <span>Bấm bất kỳ đâu ngoài ảnh hoặc nút (X) để đóng cửa sổ</span>
              <a
                href={selectedImage.src}
                target="_blank"
                rel="noreferrer"
                style={{ color: "#fb923c", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}
              >
                <span>Mở ảnh gốc trong tab mới</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
