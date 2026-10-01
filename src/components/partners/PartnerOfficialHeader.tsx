"use client";

import React from "react";
import { FileCheck, Shield, Calendar, Building2 } from "lucide-react";

export default function PartnerOfficialHeader() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        color: "#ffffff",
        padding: "16px 20px",
        borderBottom: "3px solid #ff6f3d",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <div
            style={{
              background: "#dc2626",
              color: "#ffffff",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              padding: "4px 10px",
              borderRadius: "4px",
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <FileCheck size={14} />
            <span>VĂN BẢN CHÍNH THỨC</span>
          </div>
          <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Shield size={14} color="#38bdf8" />
            HIỆU LỰC VĨNH VIỄN TOÀN QUỐC
          </span>
        </div>

        <div style={{ fontSize: "12.5px", color: "#cbd5e1", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Building2 size={14} color="#ff865c" />
            <strong>CÔNG TY TNHH CÔNG NGHỆ MERCY</strong>
          </span>
          <span style={{ color: "#64748b" }}>•</span>
          <span>MST: <strong>0319227767</strong></span>
          <span style={{ color: "#64748b" }}>•</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Calendar size={14} color="#94a3b8" />
            Ngày ban hành: <strong>07/07/2026</strong>
          </span>
        </div>
      </div>
    </section>
  );
}
