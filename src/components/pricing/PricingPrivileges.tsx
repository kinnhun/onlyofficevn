"use client";

import React from "react";
import { Gift, FileText, MonitorCheck, Key, Video, Stamp, Sparkles } from "lucide-react";

export default function PricingPrivileges() {
  const privileges = [
    {
      num: "01",
      title: "CHỨNG NHẬN ĐẠI LÝ",
      desc: "Mộc đỏ • Đóng khung kính sang trọng",
      details: ["Gửi bưu phẩm tận nơi trên toàn quốc", "Treo trang trọng tại showroom / quầy thu ngân", "Khẳng định đại lý chính hãng, uy tín vượt trội"],
      icon: Stamp,
      color: "#0284c7",
      bgGradient: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
    },
    {
      num: "02",
      title: "BỘ CÀI WHITE-LABEL RIÊNG",
      desc: "Nhúng Logo • Tên shop • Hotline riêng",
      details: ["Tùy biến màn hình khởi động phần mềm", "Khách mở app là thấy thông tin bảo hành shop", "Bảo vệ tuyệt đối 100% tệp khách của shop"],
      icon: MonitorCheck,
      color: "#ea580c",
      bgGradient: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
    },
    {
      num: "03",
      title: "TẶNG THÊM 03 KEY ONLINE",
      desc: "Nạp trực tiếp vào Portal đại lý",
      details: ["Thêm 03 Key Online vĩnh viễn miễn phí", "Bán lẻ thu ngay 1.5 – 2.4 triệu tiền mặt lập tức", "Dùng để kích hoạt demo cho khách trải nghiệm"],
      icon: Key,
      color: "#16a34a",
      bgGradient: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
    },
    {
      num: "04",
      title: "KHO MARKETING VIP HÀNG TUẦN",
      desc: "Hình ảnh • Video • Content đăng bài",
      details: ["Banner thiết kế sẵn chuẩn Facebook, Zalo", "Video review, hướng dẫn cài đặt ngắn cho TikTok", "Bài viết chốt sale tối ưu cập nhật mới hàng tuần"],
      icon: Video,
      color: "#7c3aed",
      bgGradient: "linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)",
    },
    {
      num: "05",
      title: "CHỨNG NHẬN BẢN QUYỀN CHO KHÁCH",
      desc: "Xuất chứng nhận đóng dấu đỏ cho từng khách",
      details: ["Đại lý tự xuất chứng chỉ điện tử cho từng máy", "Hiển thị Key - UUID phần cứng - Ngày kích hoạt", "Khách hàng yên tâm tuyệt đối khi bị thanh tra"],
      icon: FileText,
      color: "#003b8e",
      bgGradient: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
    },
  ];

  return (
    <section style={{ padding: "48px 24px", backgroundColor: "#ffffff" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#ffedd5",
              color: "#c2410c",
              padding: "6px 18px",
              borderRadius: "999px",
              fontSize: "12.5px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "12px",
            }}
          >
            <Gift size={16} color="#ea580c" />
            <span>QUÀ TẶNG & ĐẶC QUYỀN ĐỘC BẢN</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(24px, 3.2vw, 36px)",
              fontWeight: 900,
              color: "#002b66",
              textTransform: "uppercase",
              letterSpacing: "-0.5px",
              marginBottom: "10px",
            }}
          >
            ĐẦU TƯ 1 GÓI — NHẬN TRỌN BỘ 5 ĐẶC QUYỀN ĐẠI LÝ
          </h2>
          <p style={{ fontSize: "15px", color: "#64748b", maxWidth: "700px", margin: "0 auto" }}>
            Mọi công cụ hỗ trợ bán hàng, nhận diện thương hiệu và pháp lý đều được Mercy Tech chuẩn bị sẵn sàng cho đại lý.
          </p>
        </div>

        {/* 5 Privileges Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
          }}
        >
          {privileges.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.num}
                style={{
                  background: "#ffffff",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "16px",
                  padding: "22px 18px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.04)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.borderColor = p.color;
                  e.currentTarget.style.boxShadow = `0 10px 25px rgba(0, 0, 0, 0.08)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(0, 0, 0, 0.04)";
                }}
              >
                {/* Number Badge & Icon */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 900,
                      color: "#ffffff",
                      backgroundColor: p.color,
                      padding: "3px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    {p.num}
                  </span>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: p.bgGradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={20} color={p.color} />
                  </div>
                </div>

                <div style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", marginBottom: "4px", lineHeight: 1.3 }}>
                  {p.title}
                </div>

                <div style={{ fontSize: "12px", fontWeight: 600, color: p.color, marginBottom: "12px" }}>
                  {p.desc}
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: "auto 0 0 0", display: "flex", flexDirection: "column", gap: "6px", borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
                  {p.details.map((detail, idx) => (
                    <li key={idx} style={{ fontSize: "12px", color: "#475569", lineHeight: 1.4, display: "flex", gap: "6px" }}>
                      <span style={{ color: p.color, fontWeight: 700 }}>•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
