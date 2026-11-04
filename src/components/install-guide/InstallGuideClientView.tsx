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
  Check,
  ChevronDown,
  Info,
  AlertTriangle,
  Gift,
  FileCheck2,
  Zap,
  ArrowRight,
  MonitorCheck,
  HelpCircle,
  Clock,
  MousePointerClick,
  ZoomIn,
  CreditCard,
  KeyRound,
  ShieldAlert,
  Laptop2,
} from "lucide-react";

// Component Icon Logo 3 tầng chính thức của ONLYOFFICE (Xanh dương, Xanh lá, Cam)
function OnlyOfficeLogoIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.9721 23.7059L0.6589 18.7649C-0.219633 18.3335 -0.219633 17.6669 0.6589 17.2748L4.24943 15.5493L10.9339 18.7649C11.8125 19.1963 13.2257 19.1963 14.0661 18.7649L20.7506 15.5493L24.3411 17.2748C25.219 17.7061 25.219 18.3728 24.3411 18.7649L14.0279 23.7059C13.2257 24.0981 11.8125 24.0981 10.9721 23.7059Z"
        fill="#FF6F3D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.9387 17.5916L0.656893 12.6449C-0.218964 12.213 -0.218964 11.5456 0.656893 11.153L4.16032 9.46484L10.9387 12.7234C11.8145 13.1553 13.2235 13.1553 14.0613 12.7234L20.8397 9.46484L24.3431 11.153C25.219 11.5849 25.219 12.2523 24.3431 12.6449L14.0613 17.5916C13.1855 18.0235 11.7765 18.0235 10.9387 17.5916Z"
        fill="#95C038"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.9387 11.5408L0.656893 6.66521C-0.218964 6.23956 -0.218964 5.58175 0.656893 5.1948L10.9387 0.319234C11.8145 -0.106411 13.2235 -0.106411 14.0613 0.319234L24.3431 5.1948C25.219 5.62044 25.219 6.27826 24.3431 6.66521L14.0613 11.5408C13.1855 11.9277 11.7765 11.9277 10.9387 11.5408Z"
        fill="#5DC0E8"
      />
    </svg>
  );
}

export default function InstallGuideClientView() {
  // Ưu tiên mặc định mở tab "transfer" (Đổi máy) theo đúng yêu cầu
  const [activeTab, setActiveTab] = useState<"transfer" | "standard" | "trial">("transfer");
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; caption?: string } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedGuide, setCopiedGuide] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showTechDetails, setShowTechDetails] = useState(false);

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

  const faqs = [
    {
      q: "Nếu máy cũ bị hỏng, mất cắp hoặc cài lại Win mà chưa kịp gỡ Key thì làm sao?",
      a: "Quý khách hoàn toàn yên tâm! Bạn không cần mở máy cũ, chỉ cần liên hệ Zalo/Hotline: 0763 068 614. Đội ngũ kỹ thuật viên sẽ xác minh và giải phóng bản quyền từ xa trên máy chủ trong 5 phút.",
    },
    {
      q: "Cài đặt ONLYOFFICE có làm mất dữ liệu Word, Excel cũ không?",
      a: "Hoàn toàn KHÔNG! ONLYOFFICE hoạt động độc lập, không ghi đè, không làm ảnh hưởng tài liệu cũ. Mọi file Word (.docx), Excel (.xlsx) đều mở mượt mà và giữ nguyên vẹn định dạng.",
    },
    {
      q: "Hiện bảng cảnh báo màu xanh của Windows (SmartScreen) thì làm sao?",
      a: "Chỉ mất 2 giây: Bạn bấm vào dòng chữ gạch chân 'More info' (Thông tin thêm) ➔ Bấm nút 'Run anyway' (Vẫn chạy) là xong. File sạch 100% không chứa mã độc.",
    },
    {
      q: "Bản quyền đổi máy (Key MCT5) được đổi bao nhiêu lần?",
      a: "Key MCT5 hỗ trợ chuyển đổi linh hoạt qua lại giữa các máy tính lên đến 05 lần, bản quyền vĩnh viễn không mất phí hàng năm.",
    },
  ];

  return (
    <div className="ig-page">
      {/* 1. Header Navigation */}
      <Header />

      {/* 2. Main Content */}
      <main style={{ flex: 1, paddingBottom: "70px" }}>
        {/* ═══════════════════════════════════════════════════════════
            TOP HERO BANNER (VISUAL & ACTION-FOCUSED)
        ═══════════════════════════════════════════════════════════ */}
        <section className="ig-hero-section" style={{ padding: "40px 20px 32px" }}>
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            {/* Top Badge */}
            <div className="ig-hero-badge">
              <OnlyOfficeLogoIcon size={18} />
              <span>HƯỚNG DẪN CHÍNH THỨC • ONLYOFFICE VIỆT NAM (MERCY TECH)</span>
            </div>

            {/* Title */}
            <h1 className="ig-hero-title" style={{ fontSize: "38px", marginBottom: "12px" }}>
              Hướng Dẫn Cài Đặt &amp; Chuyển Đổi Bản Quyền <span>ONLYOFFICE</span>
            </h1>

            {/* Subtitle */}
            <p className="ig-hero-subtitle" style={{ fontSize: "16px", marginBottom: "20px", color: "#475569" }}>
              Bộ công cụ cài đặt ONLYOFFICE tối ưu bởi MERCY TECH
            </p>

            {/* Hero CTAs */}
            <div className="ig-hero-ctas" style={{ gap: "12px" }}>
              <a
                href="/Setup-OnlyOffice-Mercy.exe"
                download="Setup-OnlyOffice-Mercy.exe"
                className="ig-btn-primary"
                style={{ padding: "14px 28px", fontSize: "15px" }}
              >
                <Download size={20} />
                <span>TẢI BỘ CÀI ĐẶT (.EXE)</span>
              </a>

              <a
                href="https://zalo.me/0763068614"
                target="_blank"
                rel="noreferrer"
                className="ig-btn-outline"
                style={{ borderColor: "#ea580c", color: "#ea580c", background: "#fff7ed", padding: "13px 22px" }}
                title="Nhắn Zalo hỗ trợ kỹ thuật nhanh"
              >
                <PhoneCall size={18} color="#ea580c" />
                <span>ZALO KỸ THUẬT: 0763 068 614</span>
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="ig-btn-outline"
                style={{ padding: "13px 20px" }}
                title="Sao chép link tải trực tiếp file exe"
              >
                {copiedLink ? <Check size={18} color="#16a34a" /> : <Link2 size={18} color="#64748b" />}
                <span>{copiedLink ? "ĐÃ COPY LINK!" : "COPY LINK TẢI"}</span>
              </button>
            </div>

            <p style={{ margin: "10px 0 0", fontSize: "12px", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", flexWrap: "wrap" }}>
              <Zap size={14} color="#f59e0b" />
              <span>File nhẹ ~5.2 MB • Chạy 1-Click tự động • Tương thích mọi bản Windows 7, 8, 10, 11</span>
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            MAIN WRAPPER WITH 2-COLUMN GRID
        ═══════════════════════════════════════════════════════════ */}
        <div className="ig-container">
          {/* TAB SWITCHER: ƯU TIÊN BỘ ĐỔI MÁY Ở ĐẦU TIÊN */}
          <div className="ig-tabs-card" style={{ margin: "24px 0" }}>
            <div className="ig-tabs-heading">
              <Layers size={16} color="#ea580c" />
              <span>BẠN ĐANG CẦN LÀM THAO TÁC NÀO? (CHỌN 1 TRONG 3):</span>
            </div>

            <div className="ig-tabs-grid">
              {/* TAB 1: BỘ CÀI ĐỔI MÁY (ƯU TIÊN SỐ 1) */}
              <button
                type="button"
                onClick={() => setActiveTab("transfer")}
                className={`ig-tab-btn ${activeTab === "transfer" ? "active-transfer" : ""}`}
                style={activeTab === "transfer" ? { borderColor: "#f59e0b", background: "#fef3c7" } : {}}
              >
                <div className="ig-tab-icon" style={activeTab === "transfer" ? { background: "#d97706", color: "#fff" } : {}}>
                  <RefreshCw size={22} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="ig-tab-title">
                    <span>1. Đổi Sang Máy Mới</span>
                    <span className="ig-tab-badge" style={{ background: "#ea580c", color: "#fff" }}>Key MCT5</span>
                  </div>
                  <div className="ig-tab-desc">
                    Gỡ key trên máy cũ ➔ Nhập lại key trên máy mới (Hỗ trợ 5 lần đổi).
                  </div>
                </div>
              </button>

              {/* TAB 2: CÀI MỚI LẦN ĐẦU */}
              <button
                type="button"
                onClick={() => setActiveTab("standard")}
                className={`ig-tab-btn ${activeTab === "standard" ? "active-standard" : ""}`}
              >
                <div className="ig-tab-icon">
                  <Tag size={22} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="ig-tab-title">
                    <span>2. Cài Mới Lần Đầu</span>
                    <span className="ig-tab-badge">Tem Cào / Key</span>
                  </div>
                  <div className="ig-tab-desc">
                    Dành cho khách vừa mua Thẻ tem cào hoặc Key bản quyền online.
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
                  <Gift size={22} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="ig-tab-title">
                    <span>3. Dùng Thử 7 Ngày</span>
                    <span className="ig-tab-badge">Miễn Phí</span>
                  </div>
                  <div className="ig-tab-desc">
                    Không cần mã Key, bấm 1 nút là mở full Word, Excel dùng ngay.
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              GRID 2 CỘT: CỘT CHÍNH (8 COLS) + SIDEBAR STICKY (4 COLS)
          ═══════════════════════════════════════════════════════════ */}
          <div className="ig-main-grid">
            {/* ═══ CỘT TRÁI: HƯỚNG DẪN VISUAL THEO TAB ═══ */}
            <div>
              {/* ───────────────────────────────────────────────────────
                  TAB 1: HƯỚNG DẪN CHUYỂN ĐỔI MÁY (KEY MCT5 - 5 MÁY)
              ─────────────────────────────────────────────────────── */}
              {activeTab === "transfer" && (
                <div>
                  {/* Banner Tóm tắt Đổi máy trực quan */}
                  <div
                    style={{
                      background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
                      borderRadius: "18px",
                      border: "2px solid #fde68a",
                      padding: "18px 22px",
                      marginBottom: "24px",
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "14px",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#92400e", fontWeight: 800, fontSize: "14px", textTransform: "uppercase" }}>
                        <RefreshCw size={18} color="#d97706" />
                        <span>QUY TRÌNH ĐỔI MÁY RÕ RÀNG (CHỈ 2 BƯỚC):</span>
                      </div>
                      <div style={{ fontSize: "14.5px", color: "#78350f", marginTop: "4px", fontWeight: 600 }}>
                        Bước 1 trên <strong>MÁY CŨ</strong> (Gỡ Key) ➔ Bước 2 trên <strong>MÁY MỚI</strong> (Nhập lại Key).
                      </div>
                    </div>
                    <span style={{ fontSize: "12px", background: "#f59e0b", color: "#ffffff", padding: "6px 14px", borderRadius: "9999px", fontWeight: 800 }}>
                      HỖ TRỢ ĐỔI 5 LẦN
                    </span>
                  </div>

                  {/* 2 BƯỚC ĐỔI MÁY TƯỜNG MINH */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {/* BƯỚC 1: TRÊN MÁY CŨ */}
                    <div className="ig-card" style={{ borderLeft: "6px solid #d97706", padding: "24px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                        <span style={{ background: "#fef3c7", color: "#92400e", fontSize: "12px", fontWeight: 800, padding: "4px 12px", borderRadius: "8px", textTransform: "uppercase" }}>
                          BƯỚC 1: THỰC HIỆN TRÊN MÁY TÍNH CŨ
                        </span>
                        <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600, display: "flex", alignItems: "center", gap: "5px" }}>
                          <Clock size={13} color="#64748b" />
                          <span>Thời gian: 10 giây</span>
                        </span>
                      </div>

                      <h3 style={{ fontSize: "21px", fontWeight: 800, color: "#0f172a", margin: "0 0 14px" }}>
                        Mở bộ cài đặt lên ➔ Bấm nút <span style={{ color: "#d97706" }}>[GỠ KEY]</span>
                      </h3>

                      {/* Khối Thao tác & Kết quả rõ ràng */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                        <div style={{ padding: "12px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0", fontSize: "14px", color: "#1e293b", lineHeight: "1.6" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 800, color: "#c2410c", marginBottom: "4px" }}>
                            <MousePointerClick size={16} color="#ea580c" />
                            <span>Thao tác bạn cần làm:</span>
                          </div>
                          <div>
                            Mở file <strong>Setup-OnlyOffice-Mercy.exe</strong> trên máy cũ ➔ Nhấp chuột vào nút <strong>"Gỡ Key"</strong> (Deactivate) và chọn <strong>Xác nhận</strong>.
                          </div>
                        </div>

                        <div style={{ padding: "12px 14px", borderRadius: "10px", background: "#ecfdf5", border: "1px solid #a7f3d0", fontSize: "14px", color: "#065f46", lineHeight: "1.6" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 800, color: "#166534", marginBottom: "4px" }}>
                            <MonitorCheck size={16} color="#16a34a" />
                            <span>Hiện tượng trên màn hình:</span>
                          </div>
                          <div>
                            Màn hình sẽ hiển thị: <em>"Đã giải phóng bản quyền khỏi máy cũ thành công!"</em>. Máy chủ Mercy Tech tự động hoàn trả 1 lượt đổi máy vào mã Key của bạn.
                          </div>
                        </div>
                      </div>

                      {/* Ảnh minh họa tờ rơi phóng to */}
                      <div
                        onClick={() =>
                          setSelectedImage({
                            src: "/images/to-huong-dan-cai-dat-va-doi-may.jpg",
                            alt: "Tờ hướng dẫn cài đặt và đổi máy OnlyOffice 2 mặt chính hãng",
                            caption: "Mặt 2 tờ hướng dẫn: Sơ đồ 4 bước bấm Gỡ Key trên máy cũ và kích hoạt trên máy mới.",
                          })
                        }
                        className="ig-image-card"
                        style={{ background: "#ffffff", maxWidth: "600px" }}
                      >
                        <div className="ig-image-titlebar">
                          <div className="ig-window-dots">
                            <span className="ig-dot-red" />
                            <span className="ig-dot-yellow" />
                            <span className="ig-dot-green" />
                          </div>
                          <span>To-Huong-Dan-Doi-May-Mat-Sau.jpg</span>
                        </div>
                        <div className="ig-image-wrapper" style={{ background: "#ffffff", padding: "12px" }}>
                          <img
                            src="/images/to-huong-dan-cai-dat-va-doi-may.jpg"
                            alt="Tờ hướng dẫn đổi máy"
                            style={{ maxHeight: "260px" }}
                          />
                          <div className="ig-image-zoom-overlay">
                            <span className="ig-zoom-pill">
                              <Maximize2 size={14} /> BẤM PHÓNG TO XEM RÕ
                            </span>
                          </div>
                        </div>
                        <div className="ig-image-caption" style={{ background: "#fef3c7", color: "#78350f" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <ZoomIn size={14} color="#d97706" />
                            <span><strong>Bấm vào ảnh để phóng to:</strong> Xem sơ đồ gỡ key trên tờ hướng dẫn thực tế đi kèm trong hộp.</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* BƯỚC 2: TRÊN MÁY MỚI */}
                    <div className="ig-card" style={{ borderLeft: "6px solid #16a34a", padding: "24px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                        <span style={{ background: "#dcfce7", color: "#166534", fontSize: "12px", fontWeight: 800, padding: "4px 12px", borderRadius: "8px", textTransform: "uppercase" }}>
                          BƯỚC 2: THỰC HIỆN TRÊN MÁY TÍNH MỚI
                        </span>
                        <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600, display: "flex", alignItems: "center", gap: "5px" }}>
                          <Clock size={13} color="#64748b" />
                          <span>Thời gian: 20 giây</span>
                        </span>
                      </div>

                      <h3 style={{ fontSize: "21px", fontWeight: 800, color: "#0f172a", margin: "0 0 14px" }}>
                        Tải bộ cài ➔ Nhập lại mã Key ➔ Bấm <span style={{ color: "#16a34a" }}>[KÍCH HOẠT]</span>
                      </h3>

                      {/* Khối Thao tác & Kết quả rõ ràng */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                        <div style={{ padding: "12px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0", fontSize: "14px", color: "#1e293b", lineHeight: "1.6" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 800, color: "#c2410c", marginBottom: "4px" }}>
                            <MousePointerClick size={16} color="#ea580c" />
                            <span>Thao tác bạn cần làm:</span>
                          </div>
                          <ol style={{ margin: "6px 0 0", paddingLeft: "20px" }}>
                            <li style={{ marginBottom: "4px" }}>Mở máy tính mới lên, nhấp vào nút cam bên dưới để tải bộ cài.</li>
                            <li style={{ marginBottom: "4px" }}>Mở file vừa tải lên ➔ Chọn tab <strong>"Key Bản Quyền Online"</strong>.</li>
                            <li>Dán lại đúng dãy mã Key MCT5 (dạng <code>MCT5-XXXX...</code>) rồi bấm nút <strong>"KÍCH HOẠT LẠI BẢN QUYỀN"</strong>.</li>
                          </ol>
                        </div>

                        <div style={{ padding: "12px 14px", borderRadius: "10px", background: "#ecfdf5", border: "1px solid #a7f3d0", fontSize: "14px", color: "#065f46", lineHeight: "1.6" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 800, color: "#166534", marginBottom: "4px" }}>
                            <MonitorCheck size={16} color="#16a34a" />
                            <span>Hiện tượng trên màn hình:</span>
                          </div>
                          <div>
                            Thanh tiến trình chạy 100%. Phần mềm tự động xuất biểu tượng Word, Excel ra Desktop và tự động mở lên cho bạn soạn thảo ngay!
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
                        <a
                          href="/Setup-OnlyOffice-Mercy.exe"
                          download="Setup-OnlyOffice-Mercy.exe"
                          className="ig-btn-primary"
                          style={{ padding: "12px 24px", fontSize: "14px" }}
                        >
                          <Download size={18} />
                          <span>Tải Bộ Cài Cho Máy Mới (.exe)</span>
                        </a>
                      </div>

                      {/* Ảnh minh họa Thẻ Key Retail Box */}
                      <div
                        onClick={() =>
                          setSelectedImage({
                            src: "/images/hop-va-the-key-onlyoffice-retail.jpg",
                            alt: "Hộp OnlyOffice Retail Box và Thẻ Card cứng Product Key",
                            caption: "Thẻ card cứng Product Key: Sử dụng dãy mã Key này để nhập kích hoạt trên máy mới.",
                          })
                        }
                        className="ig-image-card"
                        style={{ maxWidth: "600px" }}
                      >
                        <div className="ig-image-titlebar">
                          <div className="ig-window-dots">
                            <span className="ig-dot-red" />
                            <span className="ig-dot-yellow" />
                            <span className="ig-dot-green" />
                          </div>
                          <span>The-Key-Cung-MCT5.jpg</span>
                        </div>
                        <div className="ig-image-wrapper">
                          <img
                            src="/images/hop-va-the-key-onlyoffice-retail.jpg"
                            alt="Thẻ cứng OnlyOffice"
                            style={{ maxHeight: "240px" }}
                          />
                          <div className="ig-image-zoom-overlay">
                            <span className="ig-zoom-pill">
                              <Maximize2 size={14} /> BẤM PHÓNG TO
                            </span>
                          </div>
                        </div>
                        <div className="ig-image-caption">
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <CreditCard size={14} color="#3b82f6" />
                            <span><strong>Mã Key trên thẻ cứng:</strong> Nhập lại dãy mã này trên máy mới để kích hoạt vĩnh viễn.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* THẺ CẢNH BÁO / CỨU HỘ KHẨN CẤP SIÊU TO RÕ */}
                  <div
                    style={{
                      marginTop: "24px",
                      padding: "20px 24px",
                      borderRadius: "16px",
                      background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
                      border: "2px solid #fed7aa",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "14px",
                        background: "#ea580c",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      <PhoneCall size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: "16.5px", fontWeight: 800, color: "#9a3412", margin: "0 0 6px" }}>
                        Máy tính cũ bị hỏng, mất cắp hoặc cài lại Win không mở được để gỡ Key?
                      </h4>
                      <p style={{ fontSize: "14px", color: "#7c2d12", lineHeight: "1.6", margin: "0 0 12px" }}>
                        <strong>Quý khách đừng lo lắng!</strong> Bạn không cần thao tác gì trên máy cũ. Chỉ cần gửi mã Key cho chuyên viên kỹ thuật qua Zalo, chúng tôi sẽ hỗ trợ giải phóng bản quyền từ xa trên máy chủ trong <strong>5 phút</strong>.
                      </p>
                      <a
                        href="https://zalo.me/0763068614"
                        target="_blank"
                        rel="noreferrer"
                        className="ig-btn-primary"
                        style={{ padding: "10px 20px", fontSize: "13.5px", display: "inline-flex" }}
                      >
                        <PhoneCall size={16} />
                        <span>Chat Zalo Kỹ Thuật: 0763 068 614 (Hỗ trợ 5 phút)</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────────────
                  TAB 2: CÀI MỚI LẦN ĐẦU (TEM CÀO / KEY ONLINE)
              ─────────────────────────────────────────────────────── */}
              {activeTab === "standard" && (
                <div>
                  <div className="ig-card" style={{ padding: "24px" }}>
                    <div className="ig-card-header" style={{ marginBottom: "20px" }}>
                      <div className="ig-card-header-left">
                        <div className="ig-card-icon-wrap">
                          <Tag size={20} />
                        </div>
                        <div>
                          <h3 className="ig-card-title">Cài Mới Lần Đầu Bằng Thẻ Tem Cào Hoặc Key</h3>
                          <div className="ig-card-subtitle">Hướng dẫn từng bước tường minh — làm theo là xong ngay!</div>
                        </div>
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 800, color: "#ea580c", background: "#ffedd5", padding: "4px 12px", borderRadius: "9999px" }}>
                        4 Bước Cài Đặt
                      </span>
                    </div>

                    {/* 4 BƯỚC CÀI ĐẶT TƯỜNG MINH */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                      {/* BƯỚC 1: Tải về */}
                      <div style={{ padding: "18px", borderRadius: "14px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                          <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#ff6f3d", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "14px" }}>
                            1
                          </span>
                          <strong style={{ fontSize: "17px", color: "#0f172a" }}>Tải bộ cài đặt Setup-OnlyOffice-Mercy.exe</strong>
                        </div>

                        <div style={{ marginLeft: "38px" }}>
                          <p style={{ fontSize: "14px", color: "#475569", margin: "0 0 12px", lineHeight: "1.6" }}>
                            Bấm vào nút màu cam bên dưới để tải tệp cài đặt chính thức. Dung lượng siêu nhẹ <strong>~5.2 MB</strong>, tải xong sau 2 giây và nằm trong thư mục <strong>Downloads</strong> của máy tính.
                          </p>

                          <a
                            href="/Setup-OnlyOffice-Mercy.exe"
                            download="Setup-OnlyOffice-Mercy.exe"
                            className="ig-btn-primary"
                            style={{ padding: "10px 22px", fontSize: "13.5px" }}
                          >
                            <Download size={16} />
                            <span>TẢI BỘ CÀI ĐẶT (.EXE)</span>
                          </a>
                        </div>
                      </div>

                      {/* BƯỚC 2: Mở file & Vượt SmartScreen */}
                      <div style={{ padding: "18px", borderRadius: "14px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                          <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#ff6f3d", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "14px" }}>
                            2
                          </span>
                          <strong style={{ fontSize: "17px", color: "#0f172a" }}>Mở file lên (Xử lý nếu hiện bảng xanh Windows)</strong>
                        </div>

                        <div style={{ marginLeft: "38px" }}>
                          <p style={{ fontSize: "14px", color: "#475569", margin: "0 0 10px", lineHeight: "1.6" }}>
                            Nhấp đúp chuột vào file <strong>Setup-OnlyOffice-Mercy.exe</strong> vừa tải.
                          </p>

                          {/* Hướng dẫn SmartScreen siêu rõ */}
                          <div style={{ padding: "14px 16px", background: "#fff7ed", border: "1.5px solid #fed7aa", borderRadius: "10px", fontSize: "13.5px", color: "#7c2d12", lineHeight: "1.6" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 800, marginBottom: "6px", color: "#9a3412" }}>
                              <ShieldAlert size={16} color="#ea580c" />
                              <span>NẾU MÀN HÌNH HIỆN BẢNG XANH "Windows protected your PC":</span>
                            </div>
                            <ol style={{ margin: "0", paddingLeft: "20px" }}>
                              <li style={{ marginBottom: "2px" }}>Bấm vào dòng chữ gạch chân: <strong><u>More info</u></strong> (Thông tin thêm).</li>
                              <li>Bấm vào nút: <strong><u>Run anyway</u></strong> (Vẫn chạy).</li>
                            </ol>
                            <div style={{ fontSize: "12px", color: "#9a3412", marginTop: "6px", fontStyle: "italic", display: "flex", alignItems: "center", gap: "4px" }}>
                              <Info size={12} color="#ea580c" />
                              <span>Đây là cơ chế kiểm tra file tải từ mạng của Windows thông thường, phần mềm sạch 100% không vi-rút.</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* BƯỚC 3: Điền mã bản quyền */}
                      <div style={{ padding: "18px", borderRadius: "14px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                          <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#ff6f3d", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "14px" }}>
                            3
                          </span>
                          <strong style={{ fontSize: "17px", color: "#0f172a" }}>Cào thẻ lấy 12 số &amp; Điền vào bộ cài</strong>
                        </div>

                        <div style={{ marginLeft: "38px" }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "14px" }}>
                            <div style={{ padding: "10px 14px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13.5px", color: "#1e293b", display: "flex", alignItems: "center", gap: "8px" }}>
                              <CreditCard size={16} color="#ea580c" style={{ flexShrink: 0 }} />
                              <div>
                                <strong>Có thẻ tem cào:</strong> Cào nhẹ lớp bạc lấy 12 số ➔ Nhập <strong>Số Seri</strong> (in nổi) vào ô trái, nhập <strong>12 số cào</strong> vào ô phải.
                              </div>
                            </div>
                            <div style={{ padding: "10px 14px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13.5px", color: "#1e293b", display: "flex", alignItems: "center", gap: "8px" }}>
                              <KeyRound size={16} color="#3b82f6" style={{ flexShrink: 0 }} />
                              <div>
                                <strong>Có Key Online:</strong> Nhấp vào tab <em>"Key Bản Quyền Online"</em> và dán dãy Product Key vào ô nhập.
                              </div>
                            </div>
                          </div>

                          {/* 2 Ảnh chụp thực tế: Tem cào & Giao diện bộ cài */}
                          <div className="ig-showcase-grid">
                            <div
                              onClick={() =>
                                setSelectedImage({
                                  src: "/images/mau-tem-cao-vat-ly.png",
                                  alt: "Mẫu tem cào vật lý OnlyOffice chính hãng viền 7 màu",
                                  caption: "Thẻ tem cào: Số Seri in nổi bên trên, 12 số bí mật dưới lớp phủ cào bạc bên dưới.",
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
                                <img src="/images/mau-tem-cao-vat-ly.png" alt="Mẫu tem cào" />
                                <div className="ig-image-zoom-overlay">
                                  <span className="ig-zoom-pill"><Maximize2 size={13} /> BẤM PHÓNG TO</span>
                                </div>
                              </div>
                              <div className="ig-image-caption">1. Vị trí Số Seri &amp; 12 số phủ cào bạc</div>
                            </div>

                            <div
                              onClick={() =>
                                setSelectedImage({
                                  src: "/images/bo-cai-tem-vat-ly.png",
                                  alt: "Giao diện bộ cài OnlyOffice - Tab Nhập Tem Cào",
                                  caption: "Giao diện bộ cài thực tế: Nhập Seri bên trái và 12 số cào bên phải rồi bấm Kích Hoạt.",
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
                                <span>Giao-Dien-Bo-Cai.png</span>
                              </div>
                              <div className="ig-image-wrapper">
                                <img src="/images/bo-cai-tem-vat-ly.png" alt="Giao diện bộ cài" />
                                <div className="ig-image-zoom-overlay">
                                  <span className="ig-zoom-pill"><Maximize2 size={13} /> BẤM PHÓNG TO</span>
                                </div>
                              </div>
                              <div className="ig-image-caption">2. Ô điền Seri và Mã cào trên phần mềm</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* BƯỚC 4: Kích hoạt & hoàn tất */}
                      <div style={{ padding: "18px", borderRadius: "14px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                          <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#16a34a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "14px" }}>
                            4
                          </span>
                          <strong style={{ fontSize: "17px", color: "#0f172a" }}>Bấm "CÀI ĐẶT &amp; KÍCH HOẠT" ➔ Hoàn tất trong 30 giây</strong>
                        </div>

                        <div style={{ marginLeft: "38px" }}>
                          <div style={{ padding: "12px 14px", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "10px", fontSize: "14px", color: "#065f46", lineHeight: "1.6" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 800, marginBottom: "4px" }}>
                              <MonitorCheck size={16} color="#16a34a" />
                              <span>Kết quả sau khi bấm:</span>
                            </div>
                            <div>
                              Thanh tiến trình sẽ tự động cài đặt. Khi hoàn tất 100%, máy tính sẽ tự xuất biểu tượng Word, Excel, PowerPoint ra Desktop và tự động mở lên. Bạn có thể bắt đầu làm việc ngay!
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────────────
                  TAB 3: DÙNG THỬ 7 NGÀY MIỄN PHÍ
              ─────────────────────────────────────────────────────── */}
              {activeTab === "trial" && (
                <div>
                  <div className="ig-card" style={{ padding: "24px" }}>
                    <div className="ig-card-header" style={{ marginBottom: "20px" }}>
                      <div className="ig-card-header-left">
                        <div className="ig-card-icon-wrap" style={{ background: "#ecfdf5", color: "#10b981" }}>
                          <Gift size={20} />
                        </div>
                        <div>
                          <h3 className="ig-card-title">Dùng Thử 7 Ngày Miễn Phí (Không Cần Key)</h3>
                          <div className="ig-card-subtitle">Không cần thẻ tín dụng, trải nghiệm đầy đủ 100% tính năng văn phòng</div>
                        </div>
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 800, color: "#065f46", background: "#d1fae5", padding: "4px 12px", borderRadius: "9999px" }}>
                        100% Free
                      </span>
                    </div>

                    {/* 3 BƯỚC DÙNG THỬ */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                      {/* Bước 1 */}
                      <div style={{ padding: "16px 18px", borderRadius: "12px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                          <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#10b981", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "13px" }}>
                            1
                          </span>
                          <strong style={{ fontSize: "16px", color: "#0f172a" }}>Tải file Setup-OnlyOffice-Mercy.exe về máy</strong>
                        </div>
                        <div style={{ marginLeft: "36px" }}>
                          <a
                            href="/Setup-OnlyOffice-Mercy.exe"
                            download="Setup-OnlyOffice-Mercy.exe"
                            className="ig-btn-primary"
                            style={{ padding: "10px 22px", fontSize: "13.5px" }}
                          >
                            <Download size={16} />
                            <span>TẢI BẢN DÙNG THỬ (.EXE)</span>
                          </a>
                        </div>
                      </div>

                      {/* Bước 2 */}
                      <div style={{ padding: "16px 18px", borderRadius: "12px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                          <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#10b981", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "13px" }}>
                            2
                          </span>
                          <strong style={{ fontSize: "16px", color: "#0f172a" }}>Mở file lên &amp; ĐỂ TRỐNG TOÀN BỘ Ô NHẬP KEY</strong>
                        </div>
                        <p style={{ fontSize: "14px", color: "#475569", margin: "0 0 10px 36px", lineHeight: "1.6" }}>
                          Mở file cài đặt lên. Bạn <strong>không cần gõ bất kỳ ký tự nào</strong> vào ô nhập Key hay ô Tem cào.
                        </p>
                      </div>

                      {/* Bước 3 */}
                      <div style={{ padding: "16px 18px", borderRadius: "12px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                          <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#16a34a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "13px" }}>
                            3
                          </span>
                          <strong style={{ fontSize: "16px", color: "#0f172a" }}>Bấm nút "CÀI ĐẶT &amp; DÙNG THỬ 7 NGÀY (MIỄN PHÍ)"</strong>
                        </div>
                        <div style={{ marginLeft: "36px" }}>
                          <div style={{ padding: "12px 14px", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "10px", fontSize: "14px", color: "#065f46", lineHeight: "1.6" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 800, marginBottom: "4px" }}>
                              <MonitorCheck size={16} color="#16a34a" />
                              <span>Kết quả trải nghiệm:</span>
                            </div>
                            <div>
                              Máy tính sẽ tự động cấp quyền 7 ngày trải nghiệm trọn vẹn toàn bộ tính năng Word (DOCX), Excel (XLSX), PowerPoint (PPTX) và chuẩn font Times New Roman 14pt (Nghị định 30).
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Ảnh bộ cài để trống key */}
                      <div
                        onClick={() =>
                          setSelectedImage({
                            src: "/images/bo-cai-key-online.png",
                            alt: "Giao diện bộ cài để trống key để dùng thử 7 ngày",
                            caption: "Giao diện bộ cài: Để trống ô nhập Key và bấm nút Dùng Thử 7 Ngày.",
                          })
                        }
                        className="ig-image-card"
                        style={{ maxWidth: "560px", marginTop: "8px" }}
                      >
                        <div className="ig-image-titlebar">
                          <div className="ig-window-dots">
                            <span className="ig-dot-red" />
                            <span className="ig-dot-yellow" />
                            <span className="ig-dot-green" />
                          </div>
                          <span>Dung-Thu-De-Trong-Key.png</span>
                        </div>
                        <div className="ig-image-wrapper">
                          <img src="/images/bo-cai-key-online.png" alt="Bộ cài để trống key" />
                          <div className="ig-image-zoom-overlay">
                            <span className="ig-zoom-pill"><Maximize2 size={13} /> BẤM PHÓNG TO</span>
                          </div>
                        </div>
                        <div className="ig-image-caption">Gợi ý trên bộ cài: "ĐỂ TRỐNG NẾU BẠN MUỐN DÙNG THỬ 7 NGÀY (MIỄN PHÍ)"</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ═══════════════════════════════════════════════════════════
                  VIDEO HƯỚNG DẪN 2 PHÚT (THAO TÁC MÀN HÌNH)
              ═══════════════════════════════════════════════════════════ */}
              <div className="ig-card" style={{ marginTop: "24px" }}>
                <div className="ig-card-header">
                  <div className="ig-card-header-left">
                    <div className="ig-card-icon-wrap">
                      <Laptop size={20} />
                    </div>
                    <div>
                      <h3 className="ig-card-title">Video Thao Tác Màn Hình (Xem Là Làm Được Ngay)</h3>
                      <div className="ig-card-subtitle">Video trực quan 2 phút: bấm tải, nhập mã và mở Word/Excel</div>
                    </div>
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "#fff", background: "#0f172a", padding: "4px 12px", borderRadius: "9999px" }}>
                    2 Phút
                  </span>
                </div>

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
                      Full HD
                    </span>
                  </div>

                  <div className="ig-video-responsive">
                    <iframe
                      src="https://www.youtube.com/embed/Iv552_svAJY?autoplay=0&rel=0"
                      title="Video Hướng Dẫn Cài Đặt OnlyOffice - Mercy Tech"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>

              {/* ═══════════════════════════════════════════════════════════
                  KHỐI MỞ RỘNG: SO SÁNH & CẨM NĂNG (GẬP LẠI CHO ĐỠ NGỢP CHỮ)
              ═══════════════════════════════════════════════════════════ */}
              <div style={{ marginTop: "24px" }}>
                <button
                  type="button"
                  onClick={() => setShowTechDetails(!showTechDetails)}
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    borderRadius: "14px",
                    background: "#ffffff",
                    border: "1.5px dashed #cbd5e1",
                    color: "#475569",
                    fontWeight: 700,
                    fontSize: "14px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Info size={18} color="#ea580c" />
                    <span>Xem Bảng So Sánh Kỹ Thuật (1 Máy vs. 5 Máy MCT5) &amp; Cấu Hình Yêu Cầu</span>
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: showTechDetails ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}
                  />
                </button>

                {showTechDetails && (
                  <div className="ig-card" style={{ marginTop: "16px" }}>
                    <h4 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>
                      So Sánh: Bản Cài Thường (1 Máy) vs. Bản Đổi Máy (Mã MCT5)
                    </h4>
                    <div className="ig-table-wrap">
                      <table className="ig-seo-table">
                        <thead>
                          <tr>
                            <th>Tiêu Chí</th>
                            <th style={{ color: "#ea580c" }}>Bản Cài Thường (1 Máy)</th>
                            <th style={{ color: "#d97706" }}>Bản Đổi Máy (Mã MCT5)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><strong>Số lượng máy hỗ trợ</strong></td>
                            <td>01 Máy tính cố định</td>
                            <td><strong style={{ color: "#d97706" }}>Đổi sang máy mới đến 05 lần</strong></td>
                          </tr>
                          <tr>
                            <td><strong>Cơ chế khóa</strong></td>
                            <td>Theo Mainboard máy tính</td>
                            <td>Quản lý lượt đổi trên máy chủ</td>
                          </tr>
                          <tr>
                            <td><strong>Cách đổi máy</strong></td>
                            <td>Không hỗ trợ đổi máy</td>
                            <td><strong style={{ color: "#16a34a" }}>Bấm Gỡ Key ➔ Nhập lại trên máy mới</strong></td>
                          </tr>
                          <tr>
                            <td><strong>Thời hạn sử dụng</strong></td>
                            <td>Vĩnh viễn trọn đời</td>
                            <td>Vĩnh viễn trọn đời</td>
                          </tr>
                          <tr>
                            <td><strong>Chuẩn font Nghị định 30</strong></td>
                            <td>Times New Roman 14pt</td>
                            <td>Times New Roman 14pt</td>
                          </tr>
                          <tr>
                            <td><strong>Hỗ trợ kỹ thuật UltraViewer</strong></td>
                            <td>Miễn phí 15 phút</td>
                            <td>Miễn phí + Hỗ trợ reset khi máy cũ hỏng</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div style={{ marginTop: "16px", fontSize: "13px", color: "#64748b", display: "flex", alignItems: "center", gap: "6px" }}>
                      <Sparkles size={14} color="#ea580c" style={{ flexShrink: 0 }} />
                      <span>Cấu hình yêu cầu: Chạy mượt trên Windows 7, 8, 10, 11 (32-bit &amp; 64-bit), RAM tối thiểu 2GB, ổ cứng trống từ 500MB.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* ═══════════════════════════════════════════════════════════
                  FAQ NHANH GỌN (CÂU HỎI THƯỜNG GẶP)
              ═══════════════════════════════════════════════════════════ */}
              <div className="ig-card" style={{ marginTop: "24px" }}>
                <div className="ig-card-header">
                  <div>
                    <h3 className="ig-card-title">Câu Hỏi Thường Gặp (FAQ)</h3>
                    <div className="ig-card-subtitle">Giải đáp nhanh các thắc mắc hay gặp nhất</div>
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

            {/* ═══ CỘT PHẢI: STICKY SIDEBAR TẢI NHANH & TRỢ GIÚP ═══ */}
            <div className="ig-sidebar">
              {/* CARD 1: PRIMARY DOWNLOAD WIDGET */}
              <div className="ig-side-card ig-download-side-card">
                <div className="ig-side-download-icon">
                  <Download size={28} />
                </div>

                <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 800, color: "#c2410c", background: "#ffedd5", border: "1px solid #fed7aa", padding: "4px 12px", borderRadius: "9999px", textTransform: "uppercase" }}>
                  BẢN CÀI TỰ ĐỘNG 2026
                </span>
                <h3 style={{ fontSize: "19px", fontWeight: 800, color: "#0f172a", margin: "10px 0 6px" }}>
                  Setup-OnlyOffice-Mercy.exe
                </h3>
                <p style={{ fontSize: "12.5px", color: "#475569", lineHeight: "1.5", margin: "0 0 16px" }}>
                  File cài đặt chính thức dạng <strong>.exe</strong> chạy 1-click, tích hợp sẵn cả chế độ Đổi máy, Tem cào và Key online.
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
                  <span>Dung lượng ~5.2 MB • Sạch 100%</span>
                </div>
              </div>

              {/* CARD 2: CẦN KỸ THUẬT VIÊN CÀI HỘ (ULTRAVIEWER) */}
              <div className="ig-side-card" style={{ border: "2px solid #fed7aa", background: "linear-gradient(180deg, #fff7ed 0%, #ffffff 100%)" }}>
                <div style={{ fontSize: "13px", fontWeight: 800, color: "#9a3412", textTransform: "uppercase", letterSpacing: "0.4px", display: "flex", alignItems: "center", gap: "8px", paddingBottom: "10px", borderBottom: "1px solid #fed7aa", marginBottom: "12px" }}>
                  <PhoneCall size={18} color="#ea580c" />
                  <span>Cần Kỹ Thuật Cài Giúp?</span>
                </div>

                <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.55", margin: "0 0 12px" }}>
                  Đội ngũ Mercy Tech luôn sẵn sàng hỗ trợ cài đặt qua <strong>UltraViewer</strong> hoặc <strong>AnyDesk</strong> hoàn toàn miễn phí trong 15 phút:
                </p>

                <div style={{ padding: "12px", borderRadius: "10px", background: "#ffffff", border: "1px solid #fed7aa", fontSize: "12.5px", color: "#334155", display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#64748b" }}>Hotline / Zalo:</span>
                    <strong style={{ color: "#ea580c", fontSize: "15px", fontFamily: "monospace" }}>0763 068 614</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>Thời gian:</span>
                    <span style={{ fontWeight: 600 }}>08:00 – 17:30 (T2 – T7)</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>UltraViewer:</span>
                    <span style={{ color: "#16a34a", fontWeight: 700 }}>Miễn phí 100%</span>
                  </div>
                </div>

                <a
                  href="https://zalo.me/0763068614"
                  target="_blank"
                  rel="noreferrer"
                  className="ig-btn-primary"
                  style={{ width: "100%", justifyContent: "center", fontSize: "13px", padding: "10px 14px", boxSizing: "border-box" }}
                >
                  <PhoneCall size={15} />
                  <span>Nhắn Zalo Kỹ Thuật Ngay</span>
                </a>
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

            <div className="ig-modal-img-wrap">
              <img src={selectedImage.src} alt={selectedImage.alt} />
            </div>

            {selectedImage.caption && (
              <div className="ig-modal-caption" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Sparkles size={16} color="#fb923c" style={{ flexShrink: 0 }} />
                <span>{selectedImage.caption}</span>
              </div>
            )}

            <div style={{ padding: "10px 20px", background: "#0f172a", borderTop: "1px solid #1e293b", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "11.5px", color: "#94a3b8" }}>
              <span>Bấm ra ngoài hoặc nút (X) để đóng</span>
              <a
                href={selectedImage.src}
                target="_blank"
                rel="noreferrer"
                style={{ color: "#fb923c", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}
              >
                <span>Mở ảnh gốc</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
