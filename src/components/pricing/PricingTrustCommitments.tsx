"use client";

import React from "react";
import { Receipt, Monitor, Users, Headphones, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function PricingTrustCommitments() {
  const commitments = [
    {
      icon: Receipt,
      title: "HÓA ĐƠN VAT",
      desc: "Đầy đủ - minh bạch 100%",
    },
    {
      icon: Monitor,
      title: "PORTAL QUẢN LÝ KEY",
      desc: "Chủ động - dễ sử dụng",
    },
    {
      icon: Users,
      title: "TRAINING ĐẠI LÝ",
      desc: "Hỗ trợ kịch bản bán hàng",
    },
    {
      icon: Headphones,
      title: "HỖ TRỢ KỸ THUẬT",
      desc: "Nhanh chóng - tận tâm 24/7",
    },
    {
      icon: ShieldAlert,
      title: "HỖ TRỢ BẤT KHẢ KHÁNG",
      desc: "Đồng hành xử lý cùng đại lý",
    },
  ];

  return (
    <section style={{ backgroundColor: "#001b3d", color: "#ffffff", padding: "32px 24px", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            alignItems: "center",
          }}
        >
          {commitments.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(2, 132, 199, 0.2)",
                    color: "#38bdf8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 800, color: "#ffffff", letterSpacing: "0.2px" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8" }}>{item.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer sub-branding */}
        <div
          style={{
            textAlign: "center",
            marginTop: "24px",
            paddingTop: "16px",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            fontSize: "12px",
            color: "#64748b",
            letterSpacing: "1.5px",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          MERCY TECH GLOBAL • ĐƠN VỊ PHÂN PHỐI ONLYOFFICE TẠI VIỆT NAM
        </div>
      </div>
    </section>
  );
}
