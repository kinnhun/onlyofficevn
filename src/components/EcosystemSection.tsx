"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import {
  ArrowRight,
  Monitor,
  Laptop,
  Smartphone,
  ShieldCheck,
  Users,
  Share2,
  ClipboardList,
  Lock,
  SlidersHorizontal,
  Sparkles,
  CheckCircle2,
  Zap,
  Layers,
  MessageCircle,
  Download,
  Building2,
  HardDrive,
  FileCheck,
} from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

export default function EcosystemSection() {
  const [activeTab, setActiveTab] = useState<"docs" | "docspace" | "desktop">("docs");
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const locale = useLocale();
  const isVi = locale === "vi";

  // Tab 1: ONLYOFFICE Docs (6 Rich Tools)
  const docsItems = [
    {
      id: "document",
      category: isVi ? "VĂN BẢN & BIÊN TẬP" : "DOCUMENT & WORD",
      title: isVi ? "Văn bản tài liệu" : "Document Editor",
      desc: isVi
        ? "Soạn thảo và định dạng văn bản chuyên nghiệp với khả năng tương thích hoàn hảo mọi định dạng như DOCX hay PDF. Tích hợp AI mạnh mẽ hỗ trợ dịch thuật, xử lý tài liệu thông minh, mượt mà và liền mạch ngay trên một giao diện."
        : "Professional document editing with 100% seamless MS Word compatibility. Integrated AI powers smart translation, content drafting, and effortless teamwork.",
      img: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-document.jpg",
      href: "/document-editor",
      badge: "DOCX • Word",
      badgeColor: "#2563eb",
      mockupFile: "Hop_dong_kinh_te.docx",
      features: isVi
        ? ["Tương thích 100% Word", "AI dịch thuật & tóm tắt", "Soát lỗi chính tả thông minh"]
        : ["100% Word Compatibility", "Integrated AI Translator", "Smart Spelling & Grammar"],
    },
    {
      id: "spreadsheet",
      category: isVi ? "BẢNG TÍNH & DỮ LIỆU" : "SPREADSHEET & DATA",
      title: isVi ? "Trang tính" : "Spreadsheet Editor",
      desc: isVi
        ? "Phân tích, xử lý dữ liệu tối ưu với hơn 400 hàm tính toán phức tạp, bảng Pivot và tự động hóa quy trình bằng Macro. Chế độ Personal Sheet Views cho phép lọc số liệu mà không làm gián đoạn màn hình của đồng nghiệp."
        : "Analyze and organize data with over 400 formulas, Pivot Tables, and automated JavaScript macros. Personal Sheet Views allow custom filtering without disturbing colleagues.",
      img: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-bang-tinh.jpg",
      href: "/spreadsheet-editor",
      badge: "XLSX • Excel",
      badgeColor: "#059669",
      mockupFile: "Bao_cao_tai_chinh_Q3.xlsx",
      features: isVi
        ? ["400+ Hàm tính toán nâng cao", "Bảng Pivot & Biểu đồ động", "Sheet Views lọc riêng biệt"]
        : ["400+ Advanced Formulas", "Dynamic Pivot Tables", "Personal Sheet Views"],
    },
    {
      id: "presentation",
      category: isVi ? "TRÌNH CHIẾU SÁNG TẠO" : "PRESENTATION & SLIDES",
      title: isVi ? "Slide thuyết trình" : "Presentation Editor",
      desc: isVi
        ? "Thu hút mọi ánh nhìn với công cụ thiết kế trực quan, kho hiệu ứng chuyển động phong phú và chế độ Presenter View chuyên nghiệp. Tự do chèn đa phương tiện, phát GIF trực tiếp và đồng chỉnh sửa theo thời gian thực."
        : "Captivate your audience with dynamic slide animations, rich media embeds, direct GIF playback, and professional Presenter View. Collaborate in real time without lag.",
      img: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-ppt.jpg",
      href: "/presentation-editor",
      badge: "PPTX • PowerPoint",
      badgeColor: "#ea580c",
      mockupFile: "Pitch_Deck_Doanh_Nghiep.pptx",
      features: isVi
        ? ["Phát GIF động trực tiếp", "Chế độ Diễn giả Presenter View", "Hiệu ứng chuyển cảnh 3D mượt mà"]
        : ["Direct GIF Playback", "Presenter View Mode", "Smooth 3D Transitions"],
    },
    {
      id: "form",
      category: isVi ? "BIỂU MẪU SỐ HÓA" : "FORMS & CONTRACTS",
      title: isVi ? "Tạo biểu mẫu" : "Form Creator",
      desc: isVi
        ? "Biến bất kỳ tài liệu Word nào thành biểu mẫu PDF tương tác với đa dạng trường điền (checkbox, dropdown, ngày tháng). Hỗ trợ điền trực tuyến đa thiết bị và xác thực bằng chữ ký số đảm bảo tính pháp lý và bảo mật cao."
        : "Turn standard documents into interactive fillable PDF forms with checkboxes, dropdowns, and date pickers. Compliant digital signatures built in.",
      img: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-bieu-mau.jpg",
      href: "/form-creator",
      badge: "OFORM • Form PDF",
      badgeColor: "#7c3aed",
      mockupFile: "Phieu_khao_sat_y_kien.oform",
      features: isVi
        ? ["Trường điền dữ liệu thông minh", "Xác thực chữ ký số điện tử", "Xuất PDF chuẩn bảo mật"]
        : ["Interactive Form Fields", "Legally Binding E-Signatures", "Standard PDF Export"],
    },
    {
      id: "pdf",
      category: isVi ? "BIÊN TẬP FILE PDF" : "PDF EDITOR & CONVERTER",
      title: isVi ? "Tạo và chỉnh sửa PDF" : "PDF Editor & Converter",
      desc: isVi
        ? "Chỉnh sửa trực tiếp nội dung văn bản, hình ảnh trong tệp PDF dễ dàng như đang thao tác trên Word. Chuyển đổi hai chiều PDF sang DOCX nhanh chóng đáp ứng mọi nhu cầu xử lý tài liệu khắt khe nhất."
        : "Directly edit text and imagery in PDF files just like in a Word document. Convert two-way between PDF and DOCX in seconds with zero formatting loss.",
      img: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-pdf.jpg",
      href: "/pdf-editor",
      badge: "PDF • Converter",
      badgeColor: "#dc2626",
      mockupFile: "Tai_lieu_huong_dan.pdf",
      features: isVi
        ? ["Sửa trực tiếp text & hình ảnh", "Chuyển đổi PDF ↔ DOCX 1 chạm", "Đóng dấu Watermark & Bảo mật"]
        : ["Direct Text & Image Editing", "1-Click PDF ↔ DOCX Conversion", "Dynamic Watermark & Protect"],
    },
    {
      id: "diagram",
      category: isVi ? "TRÌNH XEM BẢN VẼ" : "DIAGRAM & VISIO",
      title: isVi ? "Xem sơ đồ" : "Diagram & Visio Viewer",
      desc: isVi
        ? "Đọc và truy xuất chi tiết các tệp sơ đồ phức tạp (định dạng VSDX) với tốc độ tải cực nhanh mà không cần cài đặt phần mềm bên thứ ba. Trải nghiệm xem mượt mà và đồng nhất trên mọi nền tảng."
        : "Open and inspect complex Microsoft Visio (VSDX) diagrams natively in your browser with lightning-fast rendering and zero third-party software needed.",
      img: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-xem-so-do.jpg",
      href: "/diagram-viewer",
      badge: "VSDX • Visio",
      badgeColor: "#0284c7",
      mockupFile: "So_do_ha_tang_cloud.vsdx",
      features: isVi
        ? ["Mở file Visio VSDX siêu tốc", "Không cần cài phần mềm thứ 3", "Hiển thị sắc nét từng chi tiết"]
        : ["Fast Visio VSDX Rendering", "Zero Installation Required", "Vector Crisp Detail Display"],
    },
  ];

  // Tab 2: ONLYOFFICE DocSpace (5 Rooms)
  const docspaceItems = [
    {
      id: "collab",
      tag: "Collaboration Room",
      color: "#059669",
      bgLight: "rgba(5, 150, 105, 0.08)",
      title: isVi ? "Phòng Làm Việc Chung" : "Collaboration Room",
      desc: isVi
        ? "Cả đội cùng viết, sửa văn bản và tính toán bảng biểu theo thời gian thực. Tích hợp sẵn khung chat, để lại bình luận trực tiếp ngay trên tài liệu để đẩy nhanh tiến độ dự án."
        : "Real-time co-authoring, Track Changes, live chat, and inline commenting for agile team workflows.",
      img: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docspace-page/collaboration_rooms.jpg",
      icon: Users,
      features: isVi
        ? ["Đồng soạn thảo đa người dùng", "Bình luận & Chat trực tiếp", "Lịch sử phiên bản rõ ràng"]
        : ["Real-time Co-authoring", "Built-in Chat & Comments", "Full Version History"],
    },
    {
      id: "public",
      tag: "Public Room",
      color: "#ea580c",
      bgLight: "rgba(234, 88, 12, 0.08)",
      title: isVi ? "Phòng Chia Sẻ Đối Tác" : "Public Room",
      desc: isVi
        ? "Mời đối tác bên ngoài xem hoặc chỉnh sửa tài liệu qua liên kết nhanh mà không phải đăng ký tài khoản. Dễ dàng nhúng phòng này trực tiếp vào website của doanh nghiệp."
        : "Share files with external partners via password-protected links without requiring account sign-up. Easily embeddable.",
      img: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docspace-page/public_rooms.jpg",
      icon: Share2,
      features: isVi
        ? ["Không bắt buộc đăng ký tài khoản", "Nhúng trực tiếp vào website", "Bảo vệ liên kết bằng mật khẩu"]
        : ["No Account Sign-up Required", "Direct Website Embedding", "Password-Protected Links"],
    },
    {
      id: "form-fill",
      tag: "Form Filling Room",
      color: "#7c3aed",
      bgLight: "rgba(124, 58, 237, 0.08)",
      title: isVi ? "Phòng Thu Thập Dữ Liệu" : "Form Filling Room",
      desc: isVi
        ? "Tự động hóa quy trình thu thập thông tin bằng cách gửi biểu mẫu PDF trực tuyến cho đối tác. Toàn bộ dữ liệu sẽ tự động tập hợp và phân tích vào một bảng tính duy nhất."
        : "Automate surveys and contract approvals. Collected submissions automatically consolidate into a central spreadsheet.",
      img: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docspace-page/form_fill_rooms.jpg",
      icon: ClipboardList,
      features: isVi
        ? ["Thu thập dữ liệu tự động", "Tổng hợp về 1 bảng tính", "Tiết kiệm 80% thời gian xử lý"]
        : ["Automated Data Ingestion", "Auto-consolidated Spreadsheet", "Saves 80% Admin Time"],
    },
    {
      id: "vdr",
      tag: "Virtual Data Room (VDR)",
      color: "#dc2626",
      bgLight: "rgba(220, 38, 38, 0.08)",
      title: isVi ? "Phòng Lưu Trữ Tối Mật" : "Virtual Data Room",
      desc: isVi
        ? "Bảo vệ tuyệt đối các tài liệu tài chính, pháp lý nhạy cảm. Hệ thống tự động đóng dấu watermark động, cài đặt thời hạn file và chặn hoàn toàn quyền tải xuống, sao chép hoặc in ấn."
        : "Bank-grade digital vault with automatic dynamic watermarks, time-limited access, and copy/download restrictions.",
      img: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docspace-page/virtual_data_rooms.jpg",
      icon: Lock,
      features: isVi
        ? ["Watermark động chống chụp ảnh", "Chặn copy, in & tải xuống", "Cài đặt thời hạn tự hủy file"]
        : ["Dynamic Watermark Guard", "Strict Copy & Print Lock", "Self-expiring Access Rights"],
    },
    {
      id: "custom",
      tag: "Custom Room",
      color: "#0284c7",
      bgLight: "rgba(2, 132, 199, 0.08)",
      title: isVi ? "Phòng Tùy Chỉnh Linh Hoạt" : "Custom Room",
      desc: isVi
        ? "Linh hoạt tùy chỉnh quyền truy cập chuyên sâu phù hợp với mọi phòng ban. Có thể phân quyền xem, bình luận, chỉnh sửa cho người khác với độ chi tiết cấp độ quản trị viên."
        : "Tailored granular permission tiers (Viewer, Reviewer, Commenter, Editor, Administrator) adapted for any enterprise structure.",
      img: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docspace-page/custom_rooms.jpg",
      icon: SlidersHorizontal,
      features: isVi
        ? ["Phân quyền 6 cấp độ chi tiết", "Phù hợp mọi mô hình phòng ban", "Nhật ký kiểm toán minh bạch"]
        : ["6 Granular Permission Tiers", "Fits Any Department Flow", "Transparent Audit Trail"],
    },
  ];

  // Tab 3: ONLYOFFICE Desktop (4 Platforms)
  const desktopItems = [
    {
      id: "win",
      platform: "Windows",
      title: isVi ? "ONLYOFFICE cho Windows" : "ONLYOFFICE for Windows",
      badge: "Windows 7 / 8 / 10 / 11 (64-bit / 32-bit)",
      packageType: ".exe / .msi",
      desc: isVi
        ? "Bộ ứng dụng cài đặt trực tiếp trọn gói, chạy 100% mượt mà, đầy đủ tính năng kể cả khi không có kết nối internet. Tương thích tuyệt đối với hệ thống văn phòng Microsoft."
        : "Native desktop suite for Windows 7/8/10/11 with full offline capability and 100% Microsoft Office compatibility.",
      icon: Monitor,
      features: isVi
        ? ["100% Ngoại tuyến bảo mật", "Hỗ trợ phím tắt Windows chuẩn", "Không yêu cầu kết nối mạng"]
        : ["100% Offline Secure", "Native Windows Shortcuts", "Zero Cloud Reliance Needed"],
    },
    {
      id: "mac",
      platform: "macOS",
      title: isVi ? "ONLYOFFICE cho macOS" : "ONLYOFFICE for macOS",
      badge: "macOS 10.12+ (Apple Silicon & Intel)",
      packageType: ".dmg / .pkg",
      desc: isVi
        ? "Tối ưu hóa hoàn hảo cho chip Apple Silicon M1/M2/M3/M4 và Intel, giao diện Retina sắc nét, phím tắt quen thuộc chuẩn macOS cùng khả năng đa nhiệm mượt mà."
        : "Optimized for Apple Silicon (M1/M2/M3/M4) and Intel Macs with crisp Retina rendering and macOS native shortcuts.",
      icon: Laptop,
      features: isVi
        ? ["Tối ưu chip Apple M1/M2/M3/M4", "Hiển thị Retina siêu nét", "Dark Mode & Gestures macOS"]
        : ["Optimized for Apple Silicon", "Retina Native Rendering", "macOS Dark Mode & Gestures"],
    },
    {
      id: "linux",
      platform: "Linux",
      title: isVi ? "ONLYOFFICE cho Linux" : "ONLYOFFICE for Linux",
      badge: "Ubuntu, Debian, Fedora, Arch, CentOS",
      packageType: "DEB, RPM, Snap, Flatpak, AppImage",
      desc: isVi
        ? "Hỗ trợ chuẩn mực các bản phân phối Linux hàng đầu. Mã nguồn mở bảo mật hàng đầu, kiểm soát toàn diện mã nguồn và dữ liệu nội bộ."
        : "Available in deb, rpm, snap, flatpak, and appimage packages across all major distributions.",
      icon: Monitor,
      features: isVi
        ? ["Mã nguồn mở an toàn tuyệt đối", "Đa dạng định dạng gói cài đặt", "Tối ưu tài nguyên hệ thống"]
        : ["100% Open-Source Security", "Universal Package Support", "Lightweight System Footprint"],
    },
    {
      id: "mobile",
      platform: "Mobile",
      title: isVi ? "ONLYOFFICE Mobile (iOS & Android)" : "Mobile Apps for iOS & Android",
      badge: "iOS (iPhone / iPad) & Android Phone / Tablet",
      packageType: "App Store / Google Play",
      desc: isVi
        ? "Làm việc, ghi chú và xem văn bản mượt mà trên iPhone, iPad và điện thoại Android mọi lúc mọi nơi. Đồng bộ hóa liền mạch với đám mây cá nhân."
        : "Review, edit, and co-author on the go with free native mobile apps for iOS and Android.",
      icon: Smartphone,
      features: isVi
        ? ["Giao diện chạm vuốt trực quan", "Hỗ trợ bút Apple Pencil / S-Pen", "Đồng bộ đám mây liên tục"]
        : ["Intuitive Touch UI", "Apple Pencil & Stylus Support", "Seamless Cloud Sync"],
    },
  ];

  return (
    <section
      id="oo-features"
      style={{
        padding: "clamp(56px, 6vw, 96px) 16px clamp(64px, 7vw, 108px)",
        position: "relative",
        background:
          "radial-gradient(900px circle at 50% -10%, rgba(255, 111, 61, 0.08) 0%, transparent 70%), radial-gradient(700px circle at 10% 50%, rgba(255, 146, 86, 0.05) 0%, transparent 60%), radial-gradient(800px circle at 90% 70%, rgba(255, 111, 61, 0.06) 0%, transparent 70%)",
        borderTop: "1px solid rgba(255, 111, 61, 0.15)",
        borderBottom: "1px solid rgba(255, 111, 61, 0.15)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", boxSizing: "border-box", position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          {/* Badge: HỆ SINH THÁI DOANH NGHIỆP THÔNG MINH */}
          <div style={{ display: "inline-block", marginBottom: "16px" }}>
            <span
              style={{
                fontSize: "12.5px",
                fontWeight: 700,
                color: "#ea580c",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 247, 237, 0.9))",
                border: "1px solid rgba(255, 111, 61, 0.3)",
                padding: "8px 20px",
                borderRadius: "100px",
                letterSpacing: "0.06em",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 16px rgba(255, 111, 61, 0.12), inset 0 1px 0 rgba(255, 255, 255, 1)",
              }}
            >
              <Sparkles size={14} color="#ea580c" />
              <span>{isVi ? "HỆ SINH THÁI DOANH NGHIỆP TOÀN DIỆN" : "ENTERPRISE DIGITAL ECOSYSTEM"}</span>
            </span>
          </div>

          {/* Headline with luxury gradient text */}
          <h2
            style={{
              fontSize: "clamp(30px, 4.2vw, 46px)",
              fontWeight: 800,
              color: "#1e293b",
              lineHeight: 1.25,
              margin: "0 0 16px",
              letterSpacing: "-0.5px",
            }}
          >
            {isVi ? (
              <>
                Soạn Thảo, Quản Trị &amp; Vận Hành:
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #FF6F3D 0%, #EA580C 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Mượt mà trên một nền tảng hợp nhất.
                </span>
              </>
            ) : (
              <>
                Editing, Management &amp; Collaboration:
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #FF6F3D 0%, #EA580C 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Seamless on a single unified platform.
                </span>
              </>
            )}
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "16.5px",
              color: "#64748b",
              maxWidth: "760px",
              margin: "0 auto 28px",
              lineHeight: 1.65,
              fontWeight: 500,
            }}
          >
            {isVi
              ? "Bộ giải pháp văn phòng đám mây và ngoại tuyến hàng đầu — tương thích 100% định dạng Microsoft Office, tích hợp Trợ lý AI và tự do triển khai On-Premise an toàn tuyệt đối."
              : "Leading cloud and offline office suite — 100% Microsoft Office compatibility, built-in AI Assistant, and secure On-Premise deployment."}
          </p>

          {/* Enterprise Trust Highlights Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {[
              { text: isVi ? "10M+ Người dùng tin cậy" : "10M+ Trusted Users", icon: Users },
              { text: isVi ? "Tương thích 100% MS Office" : "100% MS Office Fidelity", icon: ShieldCheck },
              { text: isVi ? "Tự lưu trữ (Self-Hosted) an toàn" : "Secure Self-Hosted Deployment", icon: HardDrive },
              { text: isVi ? "Trợ lý AI tích hợp sẵn" : "Integrated Smart AI", icon: Zap },
            ].map((highlight, idx) => {
              const Icon = highlight.icon;
              return (
                <div
                  key={idx}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 14px",
                    borderRadius: "100px",
                    background: "rgba(255, 255, 255, 0.75)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(226, 232, 240, 0.8)",
                    fontSize: "12.5px",
                    fontWeight: 600,
                    color: "#475569",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.02)",
                  }}
                >
                  <Icon size={13} color="#ea580c" />
                  <span>{highlight.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tab Switcher: Apple/Dock-Style Floating Glassmorphism (NO BLACK / NO DARK SLATE) */}
        {/* Tab Switcher: Apple/Dock-Style Floating Glassmorphism on Desktop, Sleek Segmented Card on Mobile */}
        <div role="tablist" className="ecosystem-tabs-wrapper">
          <div className="ecosystem-tabs-container">
            {/* Pill 1: ONLYOFFICE Docs */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "docs"}
              onClick={() => setActiveTab("docs")}
              className={`ecosystem-tab-btn ${activeTab === "docs" ? "active" : ""}`}
            >
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: activeTab === "docs" ? "#ffffff" : "#ea580c",
                    display: "inline-block",
                    boxShadow: activeTab === "docs" ? "0 0 8px rgba(255, 255, 255, 0.9)" : "none",
                  }}
                />
                <span>ONLYOFFICE Docs</span>
              </div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: "100px",
                  backgroundColor: activeTab === "docs" ? "rgba(255, 255, 255, 0.25)" : "rgba(234, 88, 12, 0.1)",
                  color: activeTab === "docs" ? "#ffffff" : "#ea580c",
                }}
              >
                6
              </span>
            </button>

            {/* Pill 2: ONLYOFFICE DocSpace */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "docspace"}
              onClick={() => setActiveTab("docspace")}
              className={`ecosystem-tab-btn ${activeTab === "docspace" ? "active" : ""}`}
            >
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: activeTab === "docspace" ? "#ffffff" : "#ea580c",
                    display: "inline-block",
                    boxShadow: activeTab === "docspace" ? "0 0 8px rgba(255, 255, 255, 0.9)" : "none",
                  }}
                />
                <span>ONLYOFFICE DocSpace</span>
              </div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: "100px",
                  backgroundColor: activeTab === "docspace" ? "rgba(255, 255, 255, 0.25)" : "rgba(234, 88, 12, 0.1)",
                  color: activeTab === "docspace" ? "#ffffff" : "#ea580c",
                }}
              >
                5
              </span>
            </button>

            {/* Pill 3: ONLYOFFICE Desktop */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "desktop"}
              onClick={() => setActiveTab("desktop")}
              className={`ecosystem-tab-btn ${activeTab === "desktop" ? "active" : ""}`}
            >
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: activeTab === "desktop" ? "#ffffff" : "#ea580c",
                    display: "inline-block",
                    boxShadow: activeTab === "desktop" ? "0 0 8px rgba(255, 255, 255, 0.9)" : "none",
                  }}
                />
                <span>ONLYOFFICE Desktop</span>
              </div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: "100px",
                  backgroundColor: activeTab === "desktop" ? "rgba(255, 255, 255, 0.25)" : "rgba(234, 88, 12, 0.1)",
                  color: activeTab === "desktop" ? "#ffffff" : "#ea580c",
                }}
              >
                4
              </span>
            </button>
          </div>
        </div>

        {/* TAB 1: ONLYOFFICE Docs (3x2 Grid of 6 Ultra-Luxurious 3D Cards) */}
        {activeTab === "docs" && (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
                gap: "28px",
              }}
            >
              {docsItems.map((item) => {
                const isHovered = hoveredCardId === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onMouseEnter={() => setHoveredCardId(item.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    style={{
                      background: "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 252, 249, 0.94) 100%)",
                      backdropFilter: "blur(16px)",
                      borderRadius: "22px",
                      border: isHovered
                        ? "1.5px solid rgba(255, 111, 61, 0.45)"
                        : "1.5px solid rgba(255, 255, 255, 0.95)",
                      padding: "22px",
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: isHovered
                        ? "0 22px 48px -10px rgba(255, 111, 61, 0.22), 0 0 0 1px rgba(255, 111, 61, 0.15), inset 0 1px 0 rgba(255, 255, 255, 1)"
                        : "0 10px 30px -5px rgba(234, 88, 12, 0.06), 0 2px 8px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 1)",
                      transform: isHovered ? "translateY(-8px) scale(1.012)" : "translateY(0) scale(1)",
                      transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Top Accent Gradient Border Line */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: isHovered
                          ? "linear-gradient(90deg, #FF9256 0%, #FF6F3D 50%, #EA580C 100%)"
                          : "transparent",
                        transition: "all 0.3s ease",
                      }}
                    />

                    {/* Mockup Frame around Photo with macOS dots and floating format badge */}
                    <div
                      style={{
                        borderRadius: "14px",
                        overflow: "hidden",
                        marginBottom: "20px",
                        backgroundColor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 4px 16px rgba(15, 23, 42, 0.06)",
                        position: "relative",
                      }}
                    >
                      {/* Window header */}
                      <div
                        style={{
                          height: "30px",
                          backgroundColor: "#f1f5f9",
                          borderBottom: "1px solid #e2e8f0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0 12px",
                        }}
                      >
                        {/* 3 macOS dots */}
                        <div style={{ display: "flex", gap: "6px" }}>
                          <span style={{ width: "9px", height: "9px", borderRadius: "50%", backgroundColor: "#ff5f56", display: "inline-block" }} />
                          <span style={{ width: "9px", height: "9px", borderRadius: "50%", backgroundColor: "#ffbd2e", display: "inline-block" }} />
                          <span style={{ width: "9px", height: "9px", borderRadius: "50%", backgroundColor: "#27c93f", display: "inline-block" }} />
                        </div>

                        {/* File title */}
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "#64748b",
                            fontFamily: "monospace",
                            letterSpacing: "0.2px",
                          }}
                        >
                          {item.mockupFile}
                        </div>

                        <div style={{ width: "36px" }} />
                      </div>

                      {/* Image container with smooth hover zoom */}
                      <div
                        style={{
                          aspectRatio: "900 / 650",
                          overflow: "hidden",
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#ffffff",
                        }}
                      >
                        <img
                          src={item.img}
                          alt={item.title}
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                            transform: isHovered ? "scale(1.05)" : "scale(1)",
                            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                          }}
                        />

                        {/* Floating Format Badge */}
                        <div
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            background: "rgba(255, 255, 255, 0.92)",
                            backdropFilter: "blur(10px)",
                            border: `1.5px solid ${item.badgeColor}33`,
                            padding: "4px 10px",
                            borderRadius: "100px",
                            fontSize: "11.5px",
                            fontWeight: 800,
                            color: item.badgeColor,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                          }}
                        >
                          <span
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              backgroundColor: item.badgeColor,
                              display: "inline-block",
                            }}
                          />
                          <span>{item.badge}</span>
                        </div>
                      </div>
                    </div>

                    {/* Category Eyebrow */}
                    <div
                      style={{
                        fontSize: "11.5px",
                        fontWeight: 800,
                        color: "#ea580c",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        marginBottom: "8px",
                      }}
                    >
                      {item.category}
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: "19px",
                        fontWeight: 800,
                        color: "#1e293b",
                        margin: "0 0 10px",
                        lineHeight: 1.35,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{item.title}</span>
                      <ArrowRight
                        size={17}
                        color="#ea580c"
                        style={{
                          transform: isHovered ? "translateX(4px)" : "translateX(0)",
                          transition: "transform 0.25s ease",
                        }}
                      />
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: "13.5px",
                        color: "#64748b",
                        lineHeight: 1.68,
                        margin: "0 0 18px",
                        flex: 1,
                      }}
                    >
                      {item.desc}
                    </p>

                    {/* Micro-Features Checklist */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        marginBottom: "20px",
                        padding: "10px 12px",
                        borderRadius: "12px",
                        backgroundColor: "rgba(255, 247, 237, 0.6)",
                        border: "1px solid rgba(254, 215, 170, 0.6)",
                      }}
                    >
                      {item.features.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "7px",
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#334155",
                          }}
                        >
                          <CheckCircle2 size={13} color="#16a34a" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Luxury Action Button */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        padding: "10px 18px",
                        borderRadius: "100px",
                        fontSize: "13.5px",
                        fontWeight: 700,
                        background: isHovered
                          ? "linear-gradient(135deg, #FF9256 0%, #FF6F3D 100%)"
                          : "rgba(255, 111, 61, 0.08)",
                        color: isHovered ? "#ffffff" : "#ea580c",
                        border: isHovered
                          ? "1px solid transparent"
                          : "1px solid rgba(255, 111, 61, 0.25)",
                        boxShadow: isHovered ? "0 6px 18px rgba(255, 111, 61, 0.35)" : "none",
                        transition: "all 0.25s ease",
                        marginTop: "auto",
                      }}
                    >
                      <span>{isVi ? "Khám phá chi tiết công cụ" : "Explore Feature"}</span>
                      <ArrowRight size={14} />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Bottom Luxury Banner: Explore ONLYOFFICE Docs & Integration */}
            <div
              style={{
                marginTop: "48px",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 247, 237, 0.95) 100%)",
                backdropFilter: "blur(14px)",
                borderRadius: "20px",
                border: "1.5px solid rgba(255, 111, 61, 0.25)",
                padding: "28px 32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "24px",
                flexWrap: "wrap",
                boxShadow: "0 12px 32px -6px rgba(234, 88, 12, 0.1)",
              }}
            >
              <div style={{ maxWidth: "680px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#ea580c",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "6px",
                  }}
                >
                  <Building2 size={14} color="#ea580c" />
                  <span>{isVi ? "TÍCH HỢP HỆ THỐNG DOANH NGHIỆP" : "ENTERPRISE READY"}</span>
                </div>
                <h4 style={{ fontSize: "18px", fontWeight: 800, color: "#1e293b", margin: "0 0 6px" }}>
                  {isVi
                    ? "Tương thích hoàn hảo với Nextcloud, ownCloud, Confluence, Jira, Redmine & Moodle"
                    : "Native connectors for Nextcloud, ownCloud, Confluence, Jira, Redmine & Moodle"}
                </h4>
                <p style={{ fontSize: "14px", color: "#64748b", margin: 0, lineHeight: 1.6 }}>
                  {isVi
                    ? "Nhúng trực tiếp bộ công cụ biên tập tài liệu ONLYOFFICE Docs vào đám mây doanh nghiệp của bạn chỉ với vài cú nhấp chuột."
                    : "Embed ONLYOFFICE Docs into your existing private cloud infrastructure with official open-source connectors."}
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                <Link
                  href="/docs"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14.5px",
                    fontWeight: 700,
                    color: "#ffffff",
                    background: "linear-gradient(135deg, #FF9256 0%, #FF6F3D 50%, #EA580C 100%)",
                    padding: "12px 26px",
                    borderRadius: "100px",
                    textDecoration: "none",
                    boxShadow: "0 8px 24px rgba(255, 111, 61, 0.35)",
                    transition: "all 0.25s ease",
                  }}
                >
                  <span>{isVi ? "Xem trang tổng quan ONLYOFFICE Docs" : "Explore All ONLYOFFICE Docs"}</span>
                  <ArrowRight size={15} />
                </Link>

                <a
                      href="https://www.messenger.com/t/286163107904324"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={openMessengerChat}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14.5px",
                    fontWeight: 700,
                    color: "#334155",
                    backgroundColor: "#ffffff",
                    border: "1.5px solid #cbd5e1",
                    padding: "11px 22px",
                    borderRadius: "100px",
                    textDecoration: "none",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <MessageCircle size={16} color="#ea580c" />
                  <span>{isVi ? "Tư Vấn Kỹ Thuật 1:1" : "Technical Consultation"}</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ONLYOFFICE DocSpace (5 Room Cards - 3D Luxurious Styling) */}
        {activeTab === "docspace" && (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
                gap: "28px",
              }}
            >
              {docspaceItems.map((room) => {
                const IconComponent = room.icon;
                const isHovered = hoveredCardId === room.id;
                return (
                  <div
                    key={room.id}
                    onMouseEnter={() => setHoveredCardId(room.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    style={{
                      background: "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 252, 249, 0.94) 100%)",
                      backdropFilter: "blur(16px)",
                      borderRadius: "22px",
                      border: isHovered
                        ? `1.5px solid ${room.color}88`
                        : "1.5px solid rgba(255, 255, 255, 0.95)",
                      padding: "22px",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: isHovered
                        ? `0 22px 48px -10px ${room.color}33, 0 0 0 1px ${room.color}22, inset 0 1px 0 rgba(255, 255, 255, 1)`
                        : "0 10px 30px -5px rgba(234, 88, 12, 0.06), 0 2px 8px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 1)",
                      transform: isHovered ? "translateY(-8px) scale(1.012)" : "translateY(0) scale(1)",
                      transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Top Accent Line */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: isHovered
                          ? `linear-gradient(90deg, ${room.color} 0%, #FF6F3D 100%)`
                          : "transparent",
                        transition: "all 0.3s ease",
                      }}
                    />

                    {/* Photo with Mockup frame */}
                    <div
                      style={{
                        borderRadius: "14px",
                        overflow: "hidden",
                        marginBottom: "18px",
                        backgroundColor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          height: "28px",
                          backgroundColor: "#f1f5f9",
                          borderBottom: "1px solid #e2e8f0",
                          display: "flex",
                          alignItems: "center",
                          padding: "0 10px",
                          gap: "5px",
                        }}
                      >
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#ff5f56", display: "inline-block" }} />
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#ffbd2e", display: "inline-block" }} />
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#27c93f", display: "inline-block" }} />
                      </div>

                      <div style={{ aspectRatio: "900 / 650", overflow: "hidden" }}>
                        <img
                          src={room.img}
                          alt={room.title}
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                            transform: isHovered ? "scale(1.05)" : "scale(1)",
                            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                          }}
                        />
                      </div>
                    </div>

                    {/* Tag badge with room-specific color */}
                    <div style={{ display: "inline-flex", alignSelf: "flex-start", marginBottom: "12px" }}>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: room.color,
                          backgroundColor: room.bgLight,
                          border: `1px solid ${room.color}33`,
                          padding: "5px 12px",
                          borderRadius: "100px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <IconComponent size={13} />
                        <span>{room.tag}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 style={{ fontSize: "19px", fontWeight: 800, color: "#1e293b", margin: "0 0 10px", lineHeight: 1.35 }}>
                      {room.title}
                    </h3>

                    {/* Description */}
                    <p style={{ fontSize: "13.5px", color: "#64748b", lineHeight: 1.68, margin: "0 0 18px", flex: 1 }}>
                      {room.desc}
                    </p>

                    {/* Micro-Features Checklist */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        marginBottom: "20px",
                        padding: "10px 12px",
                        borderRadius: "12px",
                        backgroundColor: "rgba(255, 247, 237, 0.6)",
                        border: "1px solid rgba(254, 215, 170, 0.6)",
                      }}
                    >
                      {room.features.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "7px",
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#334155",
                          }}
                        >
                          <CheckCircle2 size={13} color={room.color} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Messenger Trigger CTA */}
                    <a
                          href="https://www.messenger.com/t/286163107904324"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={openMessengerChat}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        padding: "11px 18px",
                        borderRadius: "100px",
                        fontSize: "13.5px",
                        fontWeight: 700,
                        background: isHovered
                          ? "linear-gradient(135deg, #FF9256 0%, #FF6F3D 100%)"
                          : "rgba(255, 111, 61, 0.08)",
                        color: isHovered ? "#ffffff" : "#ea580c",
                        border: isHovered
                          ? "1px solid transparent"
                          : "1px solid rgba(255, 111, 61, 0.25)",
                        textDecoration: "none",
                        boxShadow: isHovered ? "0 6px 18px rgba(255, 111, 61, 0.35)" : "none",
                        transition: "all 0.25s ease",
                        marginTop: "auto",
                      }}
                    >
                      <MessageCircle size={15} />
                      <span>{isVi ? "Tư vấn triển khai DocSpace" : "Consult DocSpace Setup"}</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: ONLYOFFICE Desktop (4 Platforms - 3D Luxurious Styling) */}
        {activeTab === "desktop" && (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                gap: "24px",
              }}
            >
              {desktopItems.map((item) => {
                const IconComp = item.icon;
                const isHovered = hoveredCardId === item.id;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredCardId(item.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    style={{
                      background: "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 252, 249, 0.94) 100%)",
                      backdropFilter: "blur(16px)",
                      borderRadius: "22px",
                      border: isHovered
                        ? "1.5px solid rgba(255, 111, 61, 0.45)"
                        : "1.5px solid rgba(255, 255, 255, 0.95)",
                      padding: "26px 22px",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: isHovered
                        ? "0 22px 48px -10px rgba(255, 111, 61, 0.22), inset 0 1px 0 rgba(255, 255, 255, 1)"
                        : "0 10px 30px -5px rgba(234, 88, 12, 0.06), 0 2px 8px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 1)",
                      transform: isHovered ? "translateY(-8px) scale(1.012)" : "translateY(0) scale(1)",
                      transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Top Accent Line */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: isHovered
                          ? "linear-gradient(90deg, #FF9256 0%, #FF6F3D 50%, #EA580C 100%)"
                          : "transparent",
                        transition: "all 0.3s ease",
                      }}
                    />

                    {/* 3D Frosted Icon container */}
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "16px",
                        backgroundColor: "#fff7ed",
                        border: "1.5px solid #fed7aa",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "18px",
                        boxShadow: "0 6px 18px rgba(234, 88, 12, 0.12)",
                      }}
                    >
                      <IconComp size={28} color="#ea580c" />
                    </div>

                    {/* OS Compatibility Pill */}
                    <div
                      style={{
                        fontSize: "11.5px",
                        fontWeight: 700,
                        color: "#ea580c",
                        backgroundColor: "rgba(234, 88, 12, 0.09)",
                        border: "1px solid rgba(234, 88, 12, 0.25)",
                        padding: "4px 10px",
                        borderRadius: "8px",
                        alignSelf: "flex-start",
                        marginBottom: "12px",
                      }}
                    >
                      {item.badge}
                    </div>

                    {/* Title */}
                    <h3 style={{ fontSize: "18.5px", fontWeight: 800, color: "#1e293b", margin: "0 0 10px", lineHeight: 1.35 }}>
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p style={{ fontSize: "13.5px", color: "#64748b", lineHeight: 1.65, margin: "0 0 18px", flex: 1 }}>
                      {item.desc}
                    </p>

                    {/* Features List */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        marginBottom: "22px",
                        padding: "10px 12px",
                        borderRadius: "12px",
                        backgroundColor: "rgba(255, 247, 237, 0.6)",
                        border: "1px solid rgba(254, 215, 170, 0.6)",
                      }}
                    >
                      {item.features.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "7px",
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#334155",
                          }}
                        >
                          <CheckCircle2 size={13} color="#16a34a" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Package Type Tag */}
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#94a3b8",
                        marginBottom: "12px",
                        fontFamily: "monospace",
                      }}
                    >
                      Định dạng: {item.packageType}
                    </div>

                    {/* Download CTA */}
                    <Link
                      href="/demo"
                      style={{
                        background: "linear-gradient(135deg, #FF9256 0%, #FF6F3D 50%, #EA580C 100%)",
                        color: "#ffffff",
                        padding: "12px 18px",
                        borderRadius: "100px",
                        fontWeight: 700,
                        fontSize: "13.5px",
                        textDecoration: "none",
                        textAlign: "center",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        boxShadow: "0 6px 18px rgba(255, 111, 61, 0.35)",
                        transition: "all 0.25s ease",
                      }}
                    >
                      <Download size={15} />
                      <span>{isVi ? "Tải & Dùng thử 7 ngày" : "Download & 7-Day Trial"}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
