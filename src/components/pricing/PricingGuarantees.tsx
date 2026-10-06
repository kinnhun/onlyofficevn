"use client";

import React from "react";
import { Key, RefreshCw, ShieldAlert, Monitor, Award } from "lucide-react";

export default function PricingGuarantees() {
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
    <section className="pricing-guarantees-section">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="retail-guarantees-grid">
          {guarantees.map((item, idx) => (
            <div key={idx} className="retail-guarantee-card">
              {/* Icon Bubble */}
              <div className="retail-guarantee-icon">
                {item.icon}
              </div>

              {/* Text Info */}
              <div className="retail-guarantee-content">
                <div className="retail-guarantee-title">
                  {item.title}
                </div>
                <div className="retail-guarantee-desc">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
