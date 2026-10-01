"use client";

import React from "react";
import { TrendingUp, ShieldAlert, CheckCircle2, LockKeyhole } from "lucide-react";

export default function PartnerAdvantages() {
  const advantages = [
    {
      icon: <TrendingUp size={24} color="#f59e0b" />,
      tag: "LỢI NHUẬN CỰC KHỦNG",
      title: "Lợi Nhuận Vượt Trội",
      desc: "Chiết khấu sỉ cực cao dành cho Đại lý & Đối tác phân phối. Vui lòng liên hệ Zalo để nhận bảng giá sỉ bảo mật.",
      color: "#f59e0b",
      bg: "#fef3c7",
    },
    {
      icon: <ShieldAlert size={24} color="#dc2626" />,
      tag: "PHÁP LÝ CHUẨN 100%",
      title: "Lá Chắn Pháp Lý Bản Quyền",
      desc: "Cung cấp đầy đủ Hợp đồng, Biên bản bàn giao & Chứng nhận nguồn gốc AGPLv3 đóng dấu mộc đỏ pháp lý của Công ty TNHH Công Nghệ Mercy để khách trình thanh tra miễn phạt.",
      color: "#dc2626",
      bg: "#fee2e2",
    },
    {
      icon: <CheckCircle2 size={24} color="#2563eb" />,
      tag: "TƯƠNG THÍCH HOÀN TOÀN",
      title: "Tương Thích Hoàn Hảo 100%",
      desc: "Tích hợp sẵn bộ phông chữ văn phòng Việt Nam (VNI, TCVN3, Arial, Times New Roman, Calibri...), mở file .docx, .xlsx, .pptx cũ mượt mà, hoàn toàn không bị lỗi vỡ dòng.",
      color: "#2563eb",
      bg: "#dbeafe",
    },
    {
      icon: <LockKeyhole size={24} color="#16a34a" />,
      tag: "BẢO VỆ ĐẠI LÝ",
      title: "Bảo Mật Thông Tin Khách Hàng Tuyệt Đối",
      desc: "Cam kết bằng văn bản hợp đồng về việc bảo mật tuyệt đối dữ liệu và danh tính khách hàng của đại lý. Mercy Tech tuyệt đối không tiếp cận riêng hay thu hút khách của đại lý.",
      color: "#16a34a",
      bg: "#dcfce7",
    },
  ];

  return (
    <section style={{ maxWidth: "1248px", margin: "64px auto 0", padding: "0 20px" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <span
          style={{
            color: "#ea580c",
            fontSize: "12px",
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          ƯU THẾ ĐẮC ĐỊA
        </span>
        <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#1e293b", marginTop: "8px" }}>
          Tại Sao Nên Hợp Tác Cùng Mercy Tech?
        </h2>
        <p style={{ color: "#64748b", fontSize: "16px", maxWidth: "680px", margin: "10px auto 0" }}>
          Nền tảng bảo chứng vững chắc từ pháp lý, kỹ thuật đến cơ chế bảo vệ khách hàng độc quyền cho mọi đối tác
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {advantages.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "32px 26px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  backgroundColor: item.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </div>
              <span
                style={{
                  fontSize: "10.5px",
                  fontWeight: 800,
                  color: item.color,
                  backgroundColor: item.bg,
                  padding: "4px 10px",
                  borderRadius: "20px",
                  letterSpacing: "0.04em",
                }}
              >
                {item.tag}
              </span>
            </div>

            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1e293b", margin: 0 }}>
              {item.title}
            </h3>
            <p style={{ fontSize: "14.5px", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
