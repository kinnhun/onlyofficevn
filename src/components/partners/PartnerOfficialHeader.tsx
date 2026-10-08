"use client";

import React from "react";
import { FileCheck, Shield, Calendar, Building2 } from "lucide-react";

export default function PartnerOfficialHeader() {
  return (
    <section
      style={{
        background: "#0f172a",
        color: "#94a3b8",
        padding: "9px 20px",
        borderBottom: "1px solid #1e293b",
      }}
    >
      <div
        className="oo-partner-official-strip"
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
          fontSize: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <span
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              color: "#38bdf8",
              fontSize: "10.5px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              padding: "2px 8px",
              borderRadius: "4px",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Shield size={12} />
            ĐỐI TÁC ỦY QUYỀN
          </span>
          <span style={{ color: "#e2e8f0", fontWeight: 600 }}>
            Chính sách phân phối bản quyền ONLYOFFICE tại Việt Nam
          </span>
        </div>

        <div
          className="oo-partner-official-meta"
          style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", color: "#94a3b8" }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "#cbd5e1" }}>
            <Building2 size={13} color="#94a3b8" />
            <span>MERCY TECH GLOBAL</span>
          </span>
          <span className="oo-partner-official-sep" style={{ color: "#334155" }}>•</span>
          <span>MST: <strong style={{ color: "#e2e8f0" }}>0319227767</strong></span>
          <span className="oo-partner-official-sep" style={{ color: "#334155" }}>•</span>
          <span>Hotline: <strong style={{ color: "#38bdf8" }}>0763.068.614</strong></span>
        </div>
      </div>
    </section>
  );
}
