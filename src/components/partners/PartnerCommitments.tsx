"use client";

import React from "react";
import { FileText, Laptop, Users, Headphones, ShieldCheck } from "lucide-react";

export default function PartnerCommitments() {
  const commitments = [
    { icon: <FileText size={24} color="#38bdf8" />, title: "HÓA ĐƠN VAT", desc: "Đầy đủ - Minh bạch" },
    { icon: <Laptop size={24} color="#4ade80" />, title: "PORTAL QUẢN LÝ KEY", desc: "Chủ động - Dễ sử dụng" },
    { icon: <Users size={24} color="#facc15" />, title: "TRAINING ĐẠI LÝ", desc: "Hỗ trợ bán hàng" },
    { icon: <Headphones size={24} color="#f472b6" />, title: "HỖ TRỢ KỸ THUẬT", desc: "Nhanh chóng - Tận tâm" },
    { icon: <ShieldCheck size={24} color="#fb923c" />, title: "BẤT KHẢ KHÁNG", desc: "Đồng hành xử lý cùng đại lý" },
  ];

  return (
    <section style={{ maxWidth: "1248px", margin: "64px auto 0", padding: "0 20px" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          borderRadius: "20px",
          padding: "32px 24px",
          color: "#ffffff",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "24px",
          textAlign: "center",
          borderTop: "3px solid #ff6f3d",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.1)",
        }}
      >
        {commitments.map((c, idx) => (
          <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(255, 255, 255, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {c.icon}
            </div>
            <div style={{ fontSize: "13px", fontWeight: 800, color: "#f8fafc", letterSpacing: "0.04em" }}>
              {c.title}
            </div>
            <div style={{ fontSize: "12px", color: "#94a3b8" }}>
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
