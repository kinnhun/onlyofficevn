"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { openMessengerChat } from "@/lib/messenger";
import { Download, MessageCircle, ArrowRight, FileSpreadsheet, Layers, Sparkles, Shield, Cpu, MonitorSmartphone } from "lucide-react";

export default function DocsFeaturesGrid() {
  const locale = useLocale();
  const isVi = locale === "vi";

  const features = [
    {
      id: "compatibility",
      href: "/docs/tuong-thich-dinh-dang",
      tag: isVi ? "Đa định dạng" : "Multi-format",
      title: isVi ? "Tương thích linh hoạt với mọi loại tài liệu" : "Universal File Format Compatibility",
      desc: isVi
        ? "Thao tác mượt mà và tương thích đa dạng file DOCX, DOC, DOCM, DOTX, DjVu, EPUB, FB2, HTML, ODT, OTT, PDF, PDF/A, RTF, TXT, XML, XPS, HWP, HWPX, Pages..."
        : "Seamlessly work with DOCX, DOC, XLSX, PPTX, PDF, EPUB, ODF, RTF, and dozens of legacy or specialized enterprise formats without layout breaking.",
      img: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/qt-tuong-thich.jpg",
      icon: FileSpreadsheet,
    },
    {
      id: "all-in-one",
      href: "/docs/xu-ly-tron-bo",
      tag: isVi ? "Đa nền tảng" : "Comprehensive",
      title: isVi ? "Xử lý trọn bộ tài liệu trên 1 nền tảng" : "Complete Document Suite on 1 Platform",
      desc: isVi
        ? "Đủ bộ soạn thảo văn bản, bảng tính, thuyết trình tích hợp thêm biểu mẫu, PDF, Ebook và trình xem sơ đồ."
        : "A complete unified ecosystem: word processor, advanced spreadsheet, presentation maker, fillable form designer, and native diagram viewer.",
      img: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/qt-xu-ly-tron-bo.jpg",
      icon: Layers,
    },
    {
      id: "collaboration",
      href: "/docs/cong-tac",
      tag: isVi ? "Cộng tác" : "Collaboration",
      title: isVi ? "Cộng tác linh hoạt ngay trên tài liệu" : "Dynamic Team Co-Authoring & Review",
      desc: isVi
        ? "Cùng chỉnh sửa, bình luận, chat và gọi video trực tiếp qua plugin trong quá trình làm việc."
        : "Real-time or paragraph-locking collaboration modes, Track Changes, live chat, audio/video conferencing calls, and mention notifications.",
      img: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/qt-cong-tac.jpg",
      icon: Sparkles,
    },
    {
      id: "security",
      href: "/docs/bao-mat",
      tag: isVi ? "Bảo mật" : "Security",
      title: isVi ? "Phân quyền linh hoạt, bảo mật không lỗ hổng" : "Granular Permissions & Enterprise Security",
      desc: isVi
        ? "Giới hạn truy cập/sao chép/in ấn, đóng dấu bản quyền, chữ ký số, đặt mật khẩu và mã hóa đầu cuối chặt chẽ."
        : "Strict document restrictions: deny copy/download/print, digital signature verification, watermarks, and end-to-end client encryption.",
      img: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/qt-phan-quyen.jpg",
      icon: Shield,
    },
    {
      id: "ai",
      href: "/docs/ai",
      tag: "AI",
      title: isVi ? "Tăng tốc công việc với AI" : "AI-Powered Productivity Assistants",
      desc: isVi
        ? "Kết nối linh hoạt với mọi trợ lý AI để tóm tắt, dịch, viết email và tạo nội dung ngay trong tài liệu."
        : "Directly integrate OpenAI, Claude, DeepSeek, or private local LLMs to generate text, translate languages, build tables, and summarize notes.",
      img: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/qt-ai.jpg",
      icon: Cpu,
    },
    {
      id: "cross-device",
      href: "/docs/da-thiet-bi",
      tag: isVi ? "Đa thiết bị" : "Cross-Device",
      title: isVi ? "Làm việc ở bất cứ đâu" : "Work from Anywhere, Any Device",
      desc: isVi
        ? "Truy cập và xử lý tài liệu trên web, máy tính Windows/Mac/Linux và điện thoại."
        : "Seamless synchronization across Web cloud browsers, Windows/macOS/Linux desktops, and Android/iOS smartphones and tablets.",
      img: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/qt-moi-noi.jpg",
      icon: MonitorSmartphone,
    },
  ];

  return (
    <section
      style={{
        background: "transparent",
        padding: "80px 20px 84px",
        borderTop: "1px solid rgba(226, 232, 240, 0.6)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Section Heading */}
        <div style={{ textAlign: "center", maxWidth: "900px", margin: "0 auto 48px" }}>
          <div style={{ display: "inline-block", marginBottom: "14px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#ff6f3d",
                backgroundColor: "rgba(255, 111, 61, 0.09)",
                border: "1px solid rgba(255, 111, 61, 0.2)",
                padding: "6px 16px",
                borderRadius: "100px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {isVi ? "TÍNH NĂNG VƯỢT TRỘI" : "KEY CAPABILITIES"}
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(26px, 3.6vw, 38px)",
              fontWeight: 800,
              color: "#1e293b",
              lineHeight: 1.25,
              marginBottom: "12px",
              letterSpacing: "-0.4px",
            }}
          >
            {isVi ? "Làm Việc Quen Tay — Tối Ưu Hiệu Quả" : "Familiar Experience — Peak Productivity"}
          </h2>
          <p style={{ fontSize: "16.5px", color: "#64748b", margin: 0, lineHeight: 1.6 }}>
            {isVi ? (
              <>
                95% tương thích MS Office và{" "}
                <strong style={{ color: "#ff6f3d", fontWeight: 800 }}>HƠN THẾ</strong>
              </>
            ) : (
              <>
                95%+ Native MS Office compatibility and <strong style={{ color: "#ff6f3d" }}>BEYOND</strong>
              </>
            )}
          </p>
        </div>

        {/* 6 Cards Grid (3x2) - Each links to its dedicated full page */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {features.map((item, idx) => (
            <Link
              key={item.id}
              href={item.href}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.94)",
                backdropFilter: "blur(8px)",
                borderRadius: "18px",
                border: idx === 0 ? "2px solid #ff6f3d" : "1.5px solid #ececec",
                padding: "20px 22px 24px",
                display: "flex",
                flexDirection: "column",
                boxShadow: idx === 0 ? "0 8px 24px rgba(255, 111, 61, 0.12)" : "0 4px 16px rgba(15, 23, 42, 0.04)",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                textDecoration: "none",
                color: "inherit",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "#ff6f3d";
                e.currentTarget.style.boxShadow = "0 16px 36px rgba(255, 111, 61, 0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = idx === 0 ? "#ff6f3d" : "#ececec";
                e.currentTarget.style.boxShadow = idx === 0 ? "0 8px 24px rgba(255, 111, 61, 0.12)" : "0 4px 16px rgba(15, 23, 42, 0.04)";
              }}
            >
              {/* Image Preview */}
              <div
                style={{
                  aspectRatio: "900 / 738",
                  backgroundColor: "#f8fafc",
                  borderRadius: "12px",
                  overflow: "hidden",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #f1f5f9",
                  position: "relative",
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>

              {/* Tag Badge */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <span
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 700,
                    color: "#ff6f3d",
                    backgroundColor: "rgba(255, 111, 61, 0.09)",
                    border: "1px solid rgba(255, 111, 61, 0.18)",
                    padding: "4px 10px",
                    borderRadius: "100px",
                  }}
                >
                  {item.tag}
                </span>

                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#ea580c",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  {isVi ? "Xem trang chi tiết" : "View detail"}
                  <ArrowRight size={13} color="#ff6f3d" />
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "17.5px",
                  fontWeight: 800,
                  color: "#1e293b",
                  margin: "0 0 10px",
                  lineHeight: 1.35,
                }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "13.5px",
                  color: "#64748b",
                  lineHeight: 1.68,
                  margin: "0 0 14px",
                  flex: 1,
                }}
              >
                {item.desc}
              </p>

              {/* Action pill */}
              <div
                style={{
                  borderTop: "1px solid #f1f5f9",
                  paddingTop: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "12.5px",
                  color: "#ff6f3d",
                  fontWeight: 700,
                }}
              >
                <span>{isVi ? "Khám phá giải pháp chi tiết" : "Explore full solution"}</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Section Bottom CTAs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            marginTop: "44px",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/demo"
            style={{
              background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "100px",
              fontWeight: 700,
              fontSize: "14.5px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(255, 111, 61, 0.35)",
            }}
          >
            <Download size={15} strokeWidth={2.4} />
            <span>{isVi ? "Tải miễn phí về Desktop" : "Free Desktop Download"}</span>
          </Link>

          <a
            href="https://m.me/onlyoffice.official.vn"
            target="_blank"
            rel="noopener noreferrer"
            onClick={openMessengerChat}
            style={{
              backgroundColor: "#ffffff",
              border: "1.5px solid #cbd5e1",
              padding: "11px 22px",
              borderRadius: "100px",
              fontSize: "14.5px",
              fontWeight: 600,
              color: "#334155",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
            }}
          >
            <MessageCircle size={15} color="#ea580c" />
            <span>{isVi ? "Tư vấn 1:1" : "1:1 Consultation"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
