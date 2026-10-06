"use client";

import React from "react";
import { FileCheck, Shield, Calendar, Building2 } from "lucide-react";

export default function PartnerOfficialHeader() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
        color: "#ffffff",
        padding: "12px 20px",
        boxShadow: "0 2px 10px rgba(234, 88, 12, 0.2)",
      }}
    >
      <div
        className="oo-partner-official-strip"
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
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.22)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
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
          <span style={{ fontSize: "12.5px", color: "#ffffff", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Shield size={14} color="#fef08a" />
            HIỆU LỰC TOÀN QUỐC
          </span>
        </div>

        <div
          className="oo-partner-official-meta"
          style={{ fontSize: "12.5px", color: "#ffffff", display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Building2 size={14} color="#fef08a" />
            <strong>CÔNG TY TNHH CÔNG NGHỆ MERCY</strong>
          </span>
          <span className="oo-partner-official-sep" style={{ color: "rgba(255, 255, 255, 0.5)" }}>•</span>
          <span>MST: <strong style={{ color: "#fef08a" }}>0319227767</strong></span>
          <span className="oo-partner-official-sep" style={{ color: "rgba(255, 255, 255, 0.5)" }}>•</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Calendar size={14} color="#fef08a" />
            Năm: <strong>2026</strong>
          </span>
        </div>
      </div>
    </section>
  );
}
