"use client";

import React from "react";
import { Key, RefreshCw, ShieldAlert, Monitor, Award } from "lucide-react";

export default function RetailKeyGuarantees() {
  const guarantees = [
    {
      icon: <Key size={22} color="#ff6f3d" />,
      title: "KEY CẤP THEO MAIN - UUID",
      desc: "Vĩnh viễn máy, reset máy sẽ được cấp lại chính key đã kích hoạt",
    },
    {
      icon: <RefreshCw size={22} color="#ff6f3d" />,
      title: "ĐỔI MÁY CẦN MUA LẠI MỚI",
      desc: "Mainboard - UUID hỏng hoặc thay mới cần mua mới key",
    },
    {
      icon: <ShieldAlert size={22} color="#ff6f3d" />,
      title: "TRƯỜNG HỢP BẤT KHẢ KHÁNG",
      desc: "Hỏa hoạn, thiên tai... vẫn được hỗ trợ chia sẻ gánh nặng rủi ro",
    },
    {
      icon: <Monitor size={22} color="#ff6f3d" />,
      title: "NỀN TẢNG QUẢN LÝ KEY",
      desc: "Quản lý – theo dõi – cấp lại key nhanh chóng, chuyên nghiệp",
    },
    {
      icon: <Award size={22} color="#ff6f3d" />,
      title: "CHỨNG NHẬN THEO TỪNG MÁY",
      desc: "Xác nhận key hợp lệ theo từng thiết bị, đầy đủ thông tin",
    },
  ];

  return (
    <section style={{ padding: "0 0 40px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "16px",
        }}
        className="retail-guarantees-grid"
      >
        {guarantees.map((item, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e5e5",
              borderRadius: "12px",
              padding: "20px 16px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            {/* Icon Bubble */}
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: "#fff7ed",
                border: "1px solid #fed7aa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "12px",
              }}
            >
              {item.icon}
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: "12.5px",
                fontWeight: 800,
                color: "#333333",
                lineHeight: 1.35,
                marginBottom: "6px",
                minHeight: "34px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.title}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: "12px",
                color: "#666666",
                lineHeight: 1.45,
                marginTop: "auto",
              }}
            >
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
