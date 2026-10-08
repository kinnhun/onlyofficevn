"use client";

import React from "react";
import { FileText, Laptop, Users, Headphones, ShieldCheck } from "lucide-react";

export default function PartnerCommitments() {
  const commitments = [
    { icon: <FileText size={22} color="#ff6f3d" />, title: "HÓA ĐƠN VAT", desc: "Đầy đủ - Minh bạch" },
    { icon: <Laptop size={22} color="#ff6f3d" />, title: "PORTAL QUẢN LÝ KEY", desc: "Chủ động 24/7" },
    { icon: <Users size={22} color="#ff6f3d" />, title: "TRAINING ĐẠI LÝ", desc: "Hỗ trợ bán hàng 1-1" },
    { icon: <Headphones size={22} color="#ff6f3d" />, title: "HỖ TRỢ KỸ THUẬT", desc: "Nhanh chóng - Tận tâm" },
    { icon: <ShieldCheck size={22} color="#ff6f3d" />, title: "ĐỒNG HÀNH PHÁP LÝ", desc: "Bảo vệ đại lý trọn đời" },
  ];

  return (
    <section className="oo-partner-section" style={{ maxWidth: "1248px", margin: "56px auto 0", padding: "0 20px" }}>
      <div
        className="oo-partner-commitments-grid"
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "32px 28px",
          border: "1px solid #e2e8f0",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
          textAlign: "center",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.03)",
        }}
      >
        {commitments.map((c, idx) => (
          <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "12px",
                background: "#fff7ed",
                border: "1px solid #fed7aa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {c.icon}
            </div>
            <div style={{ fontSize: "13px", fontWeight: 800, color: "#1e293b", letterSpacing: "0.02em" }}>
              {c.title}
            </div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>
              {c.desc}
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "14px", fontSize: "11px", color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>
        MERCY TECH GLOBAL — ĐƠN VỊ PHÂN PHỐI BẢN QUYỀN ONLYOFFICE TẠI VIỆT NAM
      </div>
    </section>
  );
}
