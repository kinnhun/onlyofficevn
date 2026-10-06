"use client";

import React from "react";
import { FileText, Laptop, Users, Headphones, ShieldCheck } from "lucide-react";

export default function PartnerCommitments() {
  const commitments = [
    { icon: <FileText size={24} color="#ffffff" />, title: "HÓA ĐƠN VAT", desc: "Đầy đủ - Minh bạch" },
    { icon: <Laptop size={24} color="#ffffff" />, title: "PORTAL QUẢN LÝ KEY", desc: "Chủ động - Dễ sử dụng" },
    { icon: <Users size={24} color="#ffffff" />, title: "TRAINING ĐẠI LÝ", desc: "Hỗ trợ bán hàng" },
    { icon: <Headphones size={24} color="#ffffff" />, title: "HỖ TRỢ KỸ THUẬT", desc: "Nhanh chóng - Tận tâm" },
    { icon: <ShieldCheck size={24} color="#ffffff" />, title: "BẤT KHẢ KHÁNG", desc: "Đồng hành xử lý cùng đại lý" },
  ];

  return (
    <section className="oo-partner-section" style={{ maxWidth: "1248px", margin: "64px auto 0", padding: "0 20px" }}>
      <div
        className="oo-partner-commitments-grid"
        style={{
          background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
          borderRadius: "20px",
          padding: "36px 28px",
          color: "#ffffff",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "24px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(234, 88, 12, 0.22)",
        }}
      >
        {commitments.map((c, idx) => (
          <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(255, 255, 255, 0.2)", border: "1px solid rgba(255, 255, 255, 0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {c.icon}
            </div>
            <div style={{ fontSize: "13.5px", fontWeight: 800, color: "#ffffff", letterSpacing: "0.04em" }}>
              {c.title}
            </div>
            <div style={{ fontSize: "12.5px", color: "#ffedd5" }}>
              {c.desc}
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "14px", fontSize: "11px", color: "#64748b", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>
        MERCY TECH GLOBAL — ĐƠN VỊ PHÂN PHỐI BẢN QUYỀN ONLYOFFICE TẠI VIỆT NAM
      </div>
    </section>
  );
}
