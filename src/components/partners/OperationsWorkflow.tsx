"use client";

import React from "react";
import { UserCheck, BookOpen, KeyRound, Receipt, Video, ExternalLink, Trash2, Download, Type, FileCode, Save } from "lucide-react";

export default function OperationsWorkflow() {
  const steps4 = [
    {
      step: "01",
      icon: <UserCheck size={20} color="#ff6f3d" />,
      title: "Cấp Tài Khoản Admin 24/7",
      desc: "Sau khi ký hợp đồng, đại lý được cấp trang Admin nạp sẵn 50 - 200 slots key để tự phát hành bất cứ lúc nào.",
    },
    {
      step: "02",
      icon: <BookOpen size={20} color="#ff6f3d" />,
      title: "Training 1-1 Tuần Đầu",
      desc: "Được kỹ sư Mercy Tech đào tạo 1-1 qua Google Meet / Messenger và hỗ trợ kỹ thuật cài đặt chuẩn hóa 24/7.",
    },
    {
      step: "03",
      icon: <KeyRound size={20} color="#ff6f3d" />,
      title: "Nhập Key Xác Thực Tự Động",
      desc: "Tải file zip chuẩn, nhập Key để tự động xác thực với Server bản quyền. Xem video hướng dẫn bên dưới.",
    },
    {
      step: "04",
      icon: <Receipt size={20} color="#ff6f3d" />,
      title: "Nạp Thêm Key & Hóa Đơn VAT",
      desc: "Chủ động bấm nạp thêm key khi dùng hết, bàn giao đầy đủ Hóa đơn VAT và Hợp đồng mộc đỏ pháp lý.",
    },
  ];

  const steps5 = [
    {
      step: "A",
      icon: <Trash2 size={20} color="#ff6f3d" />,
      title: "Gỡ Sạch Triệt Để Office Lậu",
      desc: "Xóa tệp cài đặt rác, dọn Registry và khóa registry lậu để tránh xung đột hệ thống.",
      bg: "#fff7ed",
      color: "#ea580c",
    },
    {
      step: "B",
      icon: <Download size={20} color="#ea580c" />,
      title: "Cài Đặt OnlyOffice Chuẩn Hóa",
      desc: "Bản phân phối mượt mà, tối ưu tài nguyên phần cứng tốt cho máy tính văn phòng.",
      bg: "#fff7ed",
      color: "#ea580c",
    },
    {
      step: "C",
      icon: <Type size={20} color="#ff6f3d" />,
      title: "Import Bộ Phông Chữ Việt Hóa",
      desc: "Đồng bộ phông chữ TCVN3, VNI, Unicode loại bỏ hoàn toàn hiện tượng vỡ font văn bản cũ.",
      bg: "#fff7ed",
      color: "#ea580c",
    },
    {
      step: "D",
      icon: <FileCode size={20} color="#ea580c" />,
      title: "Mặc Định Định Dạng Microsoft",
      desc: "Thiết lập mặc định lưu file .docx, .xlsx, .pptx đạt độ tương thích tài liệu 99.8%.",
      bg: "#fff7ed",
      color: "#ea580c",
    },
    {
      step: "E",
      icon: <Save size={20} color="#ff6f3d" />,
      title: "Cấu Hình Bảo Toàn Tệp Tin AutoSave",
      desc: "Cài đặt lưu tự động định kỳ 1 phút để tránh mất mát dữ liệu khi mất nguồn điện đột ngột.",
      bg: "#fff7ed",
      color: "#ea580c",
    },
  ];

  return (
    <section className="oo-partner-section">
      {/* 4 Steps Section */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div className="oo-partner-kicker">
          VẬN HÀNH & KỸ THUẬT
        </div>
        <h2 className="oo-partner-heading" style={{ marginTop: "6px" }}>
          Quy Trình Triển Khai & Hướng Dẫn Kỹ Thuật
        </h2>
        <p className="oo-partner-subheading" style={{ maxWidth: "700px", margin: "8px auto 0" }}>
          Chủ động 100% tài khoản Admin xuất Key 24/7 và xác thực trực tuyến với Server bản quyền
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
          gap: "20px",
          marginBottom: "48px",
        }}
      >
        {steps4.map((st, idx) => (
          <div
            key={idx}
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "24px 20px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <span style={{ fontSize: "28px", fontWeight: 900, color: "#ff6f3d" }}>{st.step}</span>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#fff7ed", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {st.icon}
              </div>
            </div>
            <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#1e293b", margin: "0 0 10px" }}>
              {st.title}
            </h3>
            <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
              {st.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Embedded YouTube Video Container */}
      <div className="oo-partner-video-card">
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "#fee2e2",
            color: "#dc2626",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: 800,
            marginBottom: "12px",
          }}
        >
          <Video size={14} />
          <span>VIDEO HƯỚNG DẪN KÍCH HOẠT</span>
        </div>
        <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#1e293b", margin: "0 0 8px" }}>
          Video Hướng Dẫn Kích Hoạt Key Cho Đại Lý
        </h3>
        <p style={{ color: "#64748b", fontSize: "14.5px", marginBottom: "24px" }}>
          Xem hướng dẫn từng bước kích hoạt Key OnlyOffice - Mercy Tech Global
        </p>

        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%",
            height: 0,
            overflow: "hidden",
            maxWidth: "840px",
            margin: "0 auto",
            borderRadius: "14px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            backgroundColor: "#fff7ed",
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/kbMDYtwoCyE"
            title="Hướng Dẫn Kích Hoạt Key OnlyOffice Mercy Tech"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
          />
        </div>

        <div style={{ marginTop: "18px" }}>
          <a
            href="https://www.youtube.com/watch?v=kbMDYtwoCyE"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#dc2626",
              fontWeight: 700,
              fontSize: "14px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>Xem trực tiếp trên kênh YouTube chính thức</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* 5 Steps Client Standardization */}
      <div>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <span
            style={{
              color: "#16a34a",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            QUY CHUẨN KỸ THUẬT DOANH NGHIỆP
          </span>
          <h3 className="oo-partner-heading" style={{ marginTop: "8px" }}>
            Quy Trình 5 Bước Chuẩn Hóa Cấu Hình Trên Máy Trạm
          </h3>
          <p className="oo-partner-subheading" style={{ maxWidth: "680px", margin: "8px auto 0" }}>
            Được chuẩn hóa độc quyền bởi Mercy Tech giúp máy tính vận hành mượt mà, triệt tiêu lỗi font và tương thích tuyệt đối
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
            gap: "18px",
          }}
        >
          {steps5.map((p, idx) => (
            <div
              key={idx}
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "24px 20px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                {p.icon}
              </div>
              <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#1e293b", margin: "0 0 8px" }}>
                {p.step}. {p.title}
              </h4>
              <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.5, margin: 0 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
