"use client";

import React from "react";
import { TrendingUp, ShieldAlert, CheckCircle2, LockKeyhole } from "lucide-react";

export default function PartnerAdvantages() {
  const advantages = [
    {
      icon: <TrendingUp size={22} color="#ff6f3d" />,
      tag: "CHIẾT KHẤU CAO",
      title: "Lợi Nhuận Vượt Trội",
      desc: "Chính sách chiết khấu sỉ trực tiếp từ đại diện phân phối, tối ưu biên lợi nhuận cho cửa hàng và đại lý trên từng license.",
    },
    {
      icon: <ShieldAlert size={22} color="#ff6f3d" />,
      tag: "CHUẨN PHÁP LÝ",
      title: "Hợp Pháp Hóa Bản Quyền",
      desc: "Cung cấp đầy đủ Hợp đồng, Biên bản nghiệm thu và Hóa đơn VAT điện tử, bảo đảm an toàn pháp lý cho khách hàng doanh nghiệp.",
    },
    {
      icon: <CheckCircle2 size={22} color="#ff6f3d" />,
      tag: "TƯƠNG THÍCH 100%",
      title: "Đầy Đủ Font Tiếng Việt",
      desc: "Tích hợp sẵn bộ font văn phòng chuẩn Việt Nam (VNI, TCVN3, Arial, Times New Roman, Calibri...), mở file .docx, .xlsx mượt mà.",
    },
    {
      icon: <LockKeyhole size={22} color="#ff6f3d" />,
      tag: "BẢO HỘ THỊ TRƯỜNG",
      title: "Bảo Vệ Tệp Khách Hàng",
      desc: "Cam kết bằng văn bản hợp đồng: Mercy Tech tuyệt đối không tiếp cận riêng hay khai thác tệp khách hàng thuộc quyền của đại lý.",
    },
  ];

  return (
    <section className="oo-partner-section">
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div className="oo-partner-kicker">
          ƯU THẾ ĐẮC ĐỊA
        </div>
        <h2 className="oo-partner-heading" style={{ marginTop: "8px" }}>
          Tại Sao Nên Hợp Tác Cùng Mercy Tech?
        </h2>
        <p className="oo-partner-subheading" style={{ maxWidth: "680px", margin: "10px auto 0" }}>
          Nền tảng bảo chứng vững chắc từ pháp lý, kỹ thuật đến cơ chế bảo vệ khách hàng độc quyền cho mọi đối tác
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
          gap: "20px",
        }}
      >
        {advantages.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "28px 24px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.02)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#475569",
                  backgroundColor: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                  padding: "3px 9px",
                  borderRadius: "20px",
                  letterSpacing: "0.04em",
                }}
              >
                {item.tag}
              </span>
            </div>

            <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#1e293b", margin: 0 }}>
              {item.title}
            </h3>
            <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
