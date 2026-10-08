"use client";

import React, { useRef, useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { ChevronLeft, ChevronRight, ArrowRight, Download, MessageCircle } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

export default function DocsExploreCarousel() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const locale = useLocale();
  const isVi = locale === "vi";

  const cards = [
    {
      id: "doc",
      title: isVi ? "Văn bản tài liệu" : "Document Editor",
      desc: isVi
        ? "Soạn thảo và định dạng văn bản chuyên nghiệp với khả năng tương thích hoàn hảo mọi định dạng lỗi như DOCX hay PDF. Tích hợp AI mạnh mẽ hỗ trợ dịch thuật, xử lý tài liệu thông minh, mượt mà và liền mạch ngay trên một giao diện."
        : "Full-featured word processor with perfect DOCX compatibility, complex formatting, academic referencing, and native AI integration.",
      img: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-document.jpg",
      href: "/document-editor",
    },
    {
      id: "sheet",
      title: isVi ? "Trang tính" : "Spreadsheet Editor",
      desc: isVi
        ? "Phân tích, xử lý dữ liệu tối ưu với hơn 400 hàm tính toán phức tạp, bảng Pivot và tự động hóa quy trình bằng Macro. Chế độ Personal Sheet Views cho phép lọc số liệu mà không làm gián đoạn màn hình của đồng nghiệp."
        : "Fast calculations with 400+ math, financial, and statistical formulas. Support for Pivot Tables, conditional formatting, and custom Sheet Views.",
      img: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-bang-tinh.jpg",
      href: "/spreadsheet-editor",
    },
    {
      id: "slide",
      title: isVi ? "Slide thuyết trình" : "Presentation Editor",
      desc: isVi
        ? "Thu hút mọi ánh nhìn với công cụ thiết kế trực quan, kho hiệu ứng chuyển động phong phú và chế độ Presenter View chuyên nghiệp. Tự do chèn đa phương tiện và đồng chỉnh sửa theo thời gian thực."
        : "Create interactive slides with rich multimedia, smooth slide animations, speaker notes, and real-time presenter controls.",
      img: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-ppt.jpg",
      href: "/presentation-editor",
    },
    {
      id: "form",
      title: isVi ? "Tạo biểu mẫu" : "Form Creator",
      desc: isVi
        ? "Biến bất kỳ tài liệu Word nào thành biểu mẫu PDF tương tác với đa dạng trường điền (checkbox, dropdown, ngày tháng). Hỗ trợ điền trực tuyến đa thiết bị và xác thực bằng chữ ký số đảm bảo tính pháp lý và bảo mật cao."
        : "Design digital fillable PDF forms with validation, dropdown selectors, date pickers, and electronic signatures.",
      img: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-bieu-mau.jpg",
      href: "/form-creator",
    },
    {
      id: "pdf",
      title: isVi ? "Tạo và chỉnh sửa PDF" : "PDF Editor & Converter",
      desc: isVi
        ? "Chỉnh sửa trực tiếp nội dung văn bản, hình ảnh trong tệp PDF dễ dàng như đang thao tác trên Word. Chuyển đổi ngược PDF sang DOCX nhanh chóng đáp ứng mọi nhu cầu xử lý tài liệu khắt khe nhất."
        : "Edit text, insert images, annotate, draw, and convert PDFs directly to editable Word documents with one click.",
      img: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-pdf.jpg",
      href: "/pdf-editor",
    },
    {
      id: "diagram",
      title: isVi ? "Xem sơ đồ" : "Diagram & Visio Viewer",
      desc: isVi
        ? "Đọc và truy xuất chi tiết các tệp sơ đồ phức tạp (định dạng VSDX) với tốc độ tải cực nhanh mà không cần cài đặt phần mềm bên thứ ba. Trải nghiệm xem mượt mà và đồng nhất trên mọi nền tảng."
        : "Inspect complex system architectures and diagrams (VSDX format) with crisp vector rendering on any browser.",
      img: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-xem-so-do.jpg",
      href: "/diagram-viewer",
    },
  ];

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const step = 380;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <section style={{ background: "transparent", padding: "80px 20px 88px", overflow: "hidden" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "900px", margin: "0 auto 40px" }}>
          <h2
            style={{
              fontSize: "clamp(26px, 3.6vw, 38px)",
              fontWeight: 800,
              color: "#1e293b",
              lineHeight: 1.25,
              marginBottom: "12px",
            }}
          >
            {isVi ? "Khám Phá Bộ Soạn Thảo Toàn Năng" : "Explore the All-Powerful Office Suite"}
          </h2>
          <p style={{ fontSize: "16px", color: "#64748b", margin: 0 }}>
            {isVi
              ? "Tạo, sửa và quản trị mọi tài liệu, làm việc liền mạch không gián đoạn."
              : "Create, edit, and collaborate on any file with zero workflow interruptions."}
          </p>
        </div>

        {/* Carousel Container */}
        <div style={{ position: "relative" }}>
          {/* Left Arrow Button */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => handleScroll("left")}
              aria-label="Previous tools"
              style={{
                position: "absolute",
                left: "-18px",
                top: "45%",
                transform: "translateY(-50%)",
                zIndex: 10,
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#ff6f3d",
                color: "#ffffff",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 24px rgba(255, 111, 61, 0.4)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Right Arrow Button */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => handleScroll("right")}
              aria-label="Next tools"
              style={{
                position: "absolute",
                right: "-18px",
                top: "45%",
                transform: "translateY(-50%)",
                zIndex: 10,
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#ff6f3d",
                color: "#ffffff",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 24px rgba(255, 111, 61, 0.4)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Scrollable Track */}
          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            style={{
              display: "flex",
              gap: "24px",
              overflowX: "auto",
              scrollBehavior: "smooth",
              padding: "16px 8px 30px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {cards.map((tool) => (
              <div
                key={tool.id}
                style={{
                  flex: "0 0 clamp(290px, 32vw, 380px)",
                  backgroundColor: "#ffffff",
                  borderRadius: "18px",
                  border: "1.5px solid #ececec",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 18px rgba(15, 23, 42, 0.05)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "#ff6f3d";
                  e.currentTarget.style.boxShadow = "0 16px 36px rgba(255, 111, 61, 0.16)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#ececec";
                  e.currentTarget.style.boxShadow = "0 4px 18px rgba(15, 23, 42, 0.05)";
                }}
              >
                {/* Photo */}
                <div
                  style={{
                    aspectRatio: "900 / 738",
                    backgroundColor: "#f8fafc",
                    borderRadius: "12px",
                    overflow: "hidden",
                    marginBottom: "18px",
                    border: "1px solid #f1f5f9",
                  }}
                >
                  <img
                    src={tool.img}
                    alt={tool.title}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>

                <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1e293b", margin: "0 0 10px", lineHeight: 1.35 }}>
                  {tool.title}
                </h3>

                <p style={{ fontSize: "13.5px", color: "#64748b", lineHeight: 1.68, margin: "0 0 18px", flex: 1 }}>
                  {tool.desc}
                </p>

                <Link
                  href={tool.href}
                  style={{
                    color: "#ff6f3d",
                    fontSize: "14px",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "auto",
                  }}
                >
                  <span>{isVi ? "Tìm hiểu thêm" : "Learn more"}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            marginTop: "30px",
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
            href="https://www.messenger.com/t/286163107904324"
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
