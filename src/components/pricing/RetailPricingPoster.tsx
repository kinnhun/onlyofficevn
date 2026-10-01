"use client";

import React from "react";
import { Key, ShieldCheck, Laptop, CheckCircle2, ShoppingCart, Sparkles } from "lucide-react";

interface RetailPricingPosterProps {
  onOpenOrder: (productName?: string) => void;
}

export default function RetailPricingPoster({ onOpenOrder }: RetailPricingPosterProps) {
  return (
    <section style={{ padding: "10px 0 24px" }}>
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          border: "2px solid #bfdbfe",
          boxShadow: "0 12px 36px rgba(2, 132, 199, 0.08)",
          overflow: "hidden",
          padding: "32px 28px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "32px",
            alignItems: "center",
          }}
          className="retail-poster-grid"
        >
          {/* Left Column: Branding + Laptop Mockup Portal */}
          <div>
            {/* Branding Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              {/* OnlyOffice Icon */}
              <div style={{ display: "flex", flexDirection: "column", gap: "2px", width: "24px" }}>
                <div style={{ height: "6px", backgroundColor: "#0284c7", borderRadius: "2px" }} />
                <div style={{ height: "6px", backgroundColor: "#16a34a", borderRadius: "2px" }} />
                <div style={{ height: "6px", backgroundColor: "#ea580c", borderRadius: "2px" }} />
              </div>
              <span style={{ fontSize: "24px", fontWeight: 900, color: "#002b66", letterSpacing: "1px" }}>
                ONLYOFFICE
              </span>
              <span
                style={{
                  backgroundColor: "#0284c7",
                  color: "#ffffff",
                  fontSize: "12px",
                  fontWeight: 800,
                  padding: "4px 10px",
                  borderRadius: "20px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Key size={13} /> KEY ONLINE
              </span>
            </div>

            {/* Main Headline */}
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "20px", fontWeight: 900, color: "#1e3a8a", textTransform: "uppercase" }}>
                BẢN QUYỀN VĨNH VIỄN
              </div>
              <div
                style={{
                  fontSize: "44px",
                  fontWeight: 950,
                  color: "#0284c7",
                  lineHeight: 1.1,
                  letterSpacing: "0.5px",
                }}
              >
                THEO MAIN
              </div>
            </div>

            {/* Mercy Tech Distributor Tag */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <span style={{ fontSize: "14px", fontWeight: 700, color: "#475569" }}>TỐI ƯU BỞI</span>
              <span style={{ fontSize: "20px", fontWeight: 950, color: "#003b8e", letterSpacing: "0.5px" }}>
                mercy <span style={{ color: "#ea580c" }}>TECH</span>
              </span>
            </div>

            <div style={{ fontSize: "11px", fontWeight: 800, color: "#94a3b8", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "22px" }}>
              WORK SMARTER • CREATE TOGETHER
            </div>

            {/* Laptop Mockup with Portal UI */}
            <div
              style={{
                position: "relative",
                maxWidth: "500px",
                margin: "0 auto",
                backgroundColor: "#0f172a",
                borderRadius: "12px 12px 4px 4px",
                padding: "8px 8px 4px",
                boxShadow: "0 16px 36px rgba(0, 0, 0, 0.2)",
              }}
            >
              {/* Laptop Screen Bezel */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "6px",
                  padding: "10px",
                  fontSize: "11px",
                  color: "#1e293b",
                }}
              >
                {/* Portal Top Bar */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #e2e8f0",
                    paddingBottom: "6px",
                    marginBottom: "8px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Laptop size={13} color="#0284c7" />
                    <span style={{ fontWeight: 800, fontSize: "11px", color: "#003b8e" }}>
                      ONLYOFFICE <span style={{ color: "#64748b", fontWeight: 600 }}>Key Management</span>
                    </span>
                  </div>
                  <span style={{ fontSize: "9px", background: "#dbeafe", color: "#1d4ed8", padding: "1px 6px", borderRadius: "3px", fontWeight: 700 }}>
                    Portal Quản Trị
                  </span>
                </div>

                {/* 4 Stat Boxes */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px", marginBottom: "8px" }}>
                  <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", padding: "4px 2px", borderRadius: "4px", textAlign: "center" }}>
                    <div style={{ fontSize: "12px", fontWeight: 900, color: "#1d4ed8" }}>320</div>
                    <div style={{ fontSize: "8.5px", color: "#64748b" }}>Tổng key</div>
                  </div>
                  <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "4px 2px", borderRadius: "4px", textAlign: "center" }}>
                    <div style={{ fontSize: "12px", fontWeight: 900, color: "#16a34a" }}>298</div>
                    <div style={{ fontSize: "8.5px", color: "#64748b" }}>Đã kích hoạt</div>
                  </div>
                  <div style={{ background: "#fffbeb", border: "1px solid #fde68a", padding: "4px 2px", borderRadius: "4px", textAlign: "center" }}>
                    <div style={{ fontSize: "12px", fontWeight: 900, color: "#d97706" }}>22</div>
                    <div style={{ fontSize: "8.5px", color: "#64748b" }}>Đang chờ</div>
                  </div>
                  <div style={{ background: "#fef2f2", border: "1px solid #fecaca", padding: "4px 2px", borderRadius: "4px", textAlign: "center" }}>
                    <div style={{ fontSize: "12px", fontWeight: 900, color: "#dc2626" }}>0</div>
                    <div style={{ fontSize: "8.5px", color: "#64748b" }}>Hết hạn</div>
                  </div>
                </div>

                {/* Key List Rows */}
                <div style={{ display: "flex", flexDirection: "column", gap: "3px", fontSize: "9.5px" }}>
                  {[
                    { id: "081C3004-6E30C", comp: "CÔNG TY ABC" },
                    { id: "433BBDB-091BC", comp: "CÔNG TY ABC" },
                    { id: "D6-A000801", comp: "CÔNG TY ABC" },
                    { id: "94VDBTCC-5F10C", comp: "CÔNG TY ABC" },
                  ].map((row, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "2px 6px",
                        background: idx % 2 === 0 ? "#f8fafc" : "#ffffff",
                        borderRadius: "3px",
                      }}
                    >
                      <span style={{ fontFamily: "monospace", color: "#334155", fontWeight: 600 }}>{row.id}</span>
                      <span style={{ color: "#64748b" }}>{row.comp}</span>
                      <span style={{ color: "#16a34a", fontWeight: 700, fontSize: "9px" }}>✓ Đã kích hoạt</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Laptop Base Bottom Lip */}
              <div
                style={{
                  height: "8px",
                  background: "linear-gradient(180deg, #94a3b8 0%, #cbd5e1 100%)",
                  borderRadius: "0 0 10px 10px",
                  marginTop: "4px",
                  width: "106%",
                  marginLeft: "-3%",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                }}
              />
            </div>
          </div>

          {/* Right Column: BẢNG GIÁ ONLYOFFICE KEY ONLINE */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              border: "2px solid #0284c7",
              boxShadow: "0 10px 30px rgba(2, 132, 199, 0.12)",
              overflow: "hidden",
            }}
          >
            {/* Header Banner */}
            <div
              style={{
                background: "linear-gradient(135deg, #0284c7 0%, #003b8e 100%)",
                color: "#ffffff",
                padding: "16px 20px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "20px", fontWeight: 900, letterSpacing: "0.5px" }}>
                BẢNG GIÁ ONLYOFFICE
              </div>
              <div style={{ fontSize: "14px", fontWeight: 800, color: "#fef08a", marginTop: "2px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                ★ KEY ONLINE VĨNH VIỄN
              </div>
            </div>

            {/* Pricing Tiers Content */}
            <div style={{ padding: "24px 20px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {/* Tier 1: 1 - 4 Key */}
                <div
                  style={{
                    border: "1.5px solid #0284c7",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    textAlign: "center",
                    backgroundColor: "#f8fafc",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                >
                  <div style={{ fontSize: "13px", fontWeight: 800, color: "#003b8e", textTransform: "uppercase" }}>
                    TỪ 1 – 4 KEY
                  </div>
                  <div style={{ fontSize: "28px", fontWeight: 950, color: "#0284c7", margin: "2px 0" }}>
                    799.000đ<span style={{ fontSize: "15px", fontWeight: 700, color: "#64748b" }}>/key</span>
                  </div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#16a34a" }}>
                    (ĐÃ BAO GỒM VAT)
                  </div>
                </div>

                {/* Tier 2: 5 - 49 Key */}
                <div
                  style={{
                    border: "2px solid #003b8e",
                    borderRadius: "12px",
                    padding: "14px 16px",
                    textAlign: "center",
                    backgroundColor: "#eff6ff",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "14px",
                      backgroundColor: "#ea580c",
                      color: "#ffffff",
                      fontSize: "10px",
                      fontWeight: 800,
                      padding: "2px 8px",
                      borderRadius: "10px",
                    }}
                  >
                    PHỔ BIẾN
                  </span>
                  <div style={{ fontSize: "13px", fontWeight: 800, color: "#003b8e", textTransform: "uppercase" }}>
                    TỪ 5 – 49 KEY
                  </div>
                  <div style={{ fontSize: "30px", fontWeight: 950, color: "#003b8e", margin: "2px 0" }}>
                    699.000đ<span style={{ fontSize: "15px", fontWeight: 700, color: "#64748b" }}>/key</span>
                  </div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#16a34a" }}>
                    (ĐÃ BAO GỒM VAT)
                  </div>
                </div>

                {/* Tier 3: Từ 50 Key trở lên */}
                <div
                  style={{
                    border: "1.5px solid #0284c7",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    textAlign: "center",
                    backgroundColor: "#f8fafc",
                  }}
                >
                  <div style={{ fontSize: "13px", fontWeight: 800, color: "#003b8e", textTransform: "uppercase" }}>
                    TỪ 50 KEY TRỞ LÊN
                  </div>
                  <div style={{ fontSize: "28px", fontWeight: 950, color: "#0284c7", margin: "2px 0" }}>
                    499.000đ<span style={{ fontSize: "15px", fontWeight: 700, color: "#64748b" }}>/key</span>
                  </div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#16a34a" }}>
                    (ĐÃ BAO GỒM VAT)
                  </div>
                </div>
              </div>

              {/* Note on 50+ Keys */}
              <div
                style={{
                  marginTop: "14px",
                  padding: "10px 12px",
                  backgroundColor: "#fffbeb",
                  border: "1px dashed #f59e0b",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#b45309",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                ★ Lưu ý: Từ 50 key trở lên hỗ trợ triển khai giải pháp riêng.
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => onOpenOrder("Key Online ONLYOFFICE")}
                style={{
                  marginTop: "16px",
                  width: "100%",
                  background: "linear-gradient(135deg, #0284c7 0%, #003b8e 100%)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "14px",
                  fontSize: "15px",
                  fontWeight: 900,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 6px 18px rgba(2, 132, 199, 0.3)",
                }}
              >
                <ShoppingCart size={18} />
                <span>Đặt Mua Key Online Ngay</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
