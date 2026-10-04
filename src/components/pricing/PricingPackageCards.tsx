"use client";

import React from "react";
import { Key, ShieldCheck, CheckCircle2, Plus, Laptop, Layers, Sparkles, QrCode } from "lucide-react";

export default function PricingPackageCards() {
  return (
    <section style={{ padding: "20px 24px 40px", backgroundColor: "#ffffff" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        {/* Container for the 2 cards connected by a Plus sign */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: "20px",
          }}
          className="pricing-package-grid"
        >
          {/* Card 1: 200 KEY ONLINE */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              border: "2px solid #0284c7",
              boxShadow: "0 10px 30px rgba(2, 132, 199, 0.12)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            {/* Header Badge */}
            <div
              style={{
                background: "linear-gradient(135deg, #003b8e 0%, #0284c7 100%)",
                color: "#ffffff",
                padding: "16px 20px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "22px", fontWeight: 900, letterSpacing: "0.5px" }}>
                200 KEY ONLINE
              </div>
              <div style={{ fontSize: "12px", opacity: 0.9, fontWeight: 600, letterSpacing: "0.2px" }}>
                ONLYOFFICE | KEY ONLINE VĨNH VIỄN
              </div>
            </div>

            {/* Content Body */}
            <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
              {/* Mockup Portal UI */}
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  borderRadius: "10px",
                  padding: "12px",
                  marginBottom: "16px",
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 700, color: "#1e293b" }}>
                    <Laptop size={14} color="#ff6f3d" />
                    <span>MERCY KEYS PORTAL</span>
                  </div>
                  <span style={{ fontSize: "10px", color: "#64748b", fontWeight: 600 }}>Đại lý: Quản lý tập trung</span>
                </div>

                {/* Status Bar */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px", textAlign: "center", marginBottom: "10px" }}>
                  <div style={{ background: "#fff7ed", padding: "4px 2px", borderRadius: "4px" }}>
                    <div style={{ fontSize: "12px", fontWeight: 800, color: "#ea580c" }}>320</div>
                    <div style={{ fontSize: "9px", color: "#64748b" }}>Tổng key</div>
                  </div>
                  <div style={{ background: "#f0fdf4", padding: "4px 2px", borderRadius: "4px" }}>
                    <div style={{ fontSize: "12px", fontWeight: 800, color: "#16a34a" }}>298</div>
                    <div style={{ fontSize: "9px", color: "#64748b" }}>Đã kích hoạt</div>
                  </div>
                  <div style={{ background: "#fffbeb", padding: "4px 2px", borderRadius: "4px" }}>
                    <div style={{ fontSize: "12px", fontWeight: 800, color: "#d97706" }}>22</div>
                    <div style={{ fontSize: "9px", color: "#64748b" }}>Đang chờ</div>
                  </div>
                  <div style={{ background: "#fef2f2", padding: "4px 2px", borderRadius: "4px" }}>
                    <div style={{ fontSize: "12px", fontWeight: 800, color: "#dc2626" }}>0</div>
                    <div style={{ fontSize: "9px", color: "#64748b" }}>Hết hạn</div>
                  </div>
                </div>

                {/* Sample Key Record */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "10.5px", background: "#ffffff", padding: "5px 8px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                  <span style={{ fontFamily: "monospace", color: "#334155", fontWeight: 600 }}>MT-0319227767-0001</span>
                  <span style={{ color: "#16a34a", fontWeight: 700, background: "#dcfce7", padding: "1px 6px", borderRadius: "3px", fontSize: "10px" }}>✓ Đã kích hoạt</span>
                </div>
              </div>

              {/* Key Format Box */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  background: "#f1f5f9",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px dashed #0284c7",
                  marginBottom: "16px",
                  fontFamily: "monospace",
                  fontWeight: 800,
                  fontSize: "14px",
                  color: "#003b8e",
                  letterSpacing: "1px",
                }}
              >
                <Key size={16} color="#ea580c" />
                <span>XXXX - XXXX - XXXX - XXXX</span>
              </div>

              {/* Bullet Features */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "#1e293b", fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#0284c7" style={{ flexShrink: 0 }} />
                  <span>Kích hoạt nhanh chóng trong 30 giây</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "#1e293b", fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#0284c7" style={{ flexShrink: 0 }} />
                  <span>Quản lý tập trung trên Portal đại lý</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "#1e293b", fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#0284c7" style={{ flexShrink: 0 }} />
                  <span>Dễ dàng cập nhật, gia hạn và theo dõi</span>
                </li>
              </ul>

              {/* Price footer */}
              <div style={{ marginTop: "auto", borderTop: "1px solid #f1f5f9", paddingTop: "14px", textAlign: "center" }}>
                <div style={{ fontSize: "13px", color: "#64748b", fontWeight: 600, marginBottom: "4px" }}>
                  Đơn giá đại lý: <strong style={{ color: "#ea580c", fontSize: "15px" }}>99.000đ/key</strong>
                </div>
                <div
                  style={{
                    background: "linear-gradient(135deg, #003b8e 0%, #0284c7 100%)",
                    color: "#ffffff",
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "18px",
                    fontWeight: 900,
                    letterSpacing: "0.2px",
                  }}
                >
                  Tổng: 19.800.000đ
                </div>
              </div>
            </div>
          </div>

          {/* Plus Sign Connector */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "#0284c7",
              color: "#ffffff",
              boxShadow: "0 4px 16px rgba(2, 132, 199, 0.4)",
              margin: "0 auto",
            }}
          >
            <Plus size={26} strokeWidth={3.5} />
          </div>

          {/* Card 2: PORTAL QUẢN TRỊ ĐẠI LÝ 24/7 */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              border: "2px solid #fed7aa",
              boxShadow: "0 10px 30px rgba(234, 88, 12, 0.08)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            {/* Header Badge */}
            <div
              style={{
                background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                color: "#ffffff",
                padding: "16px 20px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "22px", fontWeight: 900, letterSpacing: "0.5px" }}>
                PORTAL QUẢN TRỊ 24/7
              </div>
              <div style={{ fontSize: "12px", opacity: 0.9, fontWeight: 600, letterSpacing: "0.2px" }}>
                TỰ ĐỘNG XUẤT KEY & BẢO HÀNH TRỌN ĐỜI
              </div>
            </div>

            {/* Content Body */}
            <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
              <div
                style={{
                  background: "#fffaf5",
                  border: "1px solid #fed7aa",
                  borderRadius: "12px",
                  padding: "16px",
                  marginBottom: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", borderBottom: "1px solid #fed7aa", paddingBottom: "6px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "#ea580c" }}>Portal Đại Lý Mercy Tech</span>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#16a34a", background: "#dcfce7", padding: "2px 6px", borderRadius: "4px" }}>● Trực tuyến 24/7</span>
                </div>
                <div style={{ fontSize: "12.5px", color: "#64748b", lineHeight: 1.5 }}>
                  Tài khoản Admin riêng: Tự xuất key tức thì, theo dõi tồn kho và cấp lại bản quyền tự động khi khách cài lại Windows.
                </div>
              </div>

              {/* Features List */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "#1e293b", fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#ff6f3d" style={{ flexShrink: 0 }} />
                  <span>Tự động xuất key 24/7 không cần chờ duyệt thủ công</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "#1e293b", fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#ff6f3d" style={{ flexShrink: 0 }} />
                  <span>Quản lý tập trung UUID Mainboard máy khách hàng</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "#1e293b", fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#ff6f3d" style={{ flexShrink: 0 }} />
                  <span>Cấp lại key miễn phí 100% khi máy khách cài lại Windows</span>
                </li>
              </ul>

              {/* Footer */}
              <div style={{ marginTop: "auto", borderTop: "1px solid #f1f5f9", paddingTop: "14px", textAlign: "center" }}>
                <div style={{ fontSize: "13px", color: "#64748b", fontWeight: 600, marginBottom: "4px" }}>
                  Hạ tầng hệ thống: <strong style={{ color: "#ea580c", fontSize: "15px" }}>Tặng kèm trọn đời</strong>
                </div>
                <div
                  style={{
                    background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                    color: "#ffffff",
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "16px",
                    fontWeight: 800,
                    letterSpacing: "0.2px",
                  }}
                >
                  Kích Hoạt Tức Thì
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
