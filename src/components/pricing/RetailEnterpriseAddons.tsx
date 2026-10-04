"use client";

import React from "react";
import { ShoppingCart, Check, Sparkles } from "lucide-react";

interface RetailEnterpriseAddonsProps {
  onOpenOrder: (productName?: string) => void;
}

export default function RetailEnterpriseAddons({ onOpenOrder }: RetailEnterpriseAddonsProps) {

  return (
    <section style={{ padding: "0 0 40px" }}>
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e5e5e5",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
        }}
      >
        {/* Section Header */}
        <div
          style={{
            padding: "28px 32px 20px",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#ff6f3d", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              DANH MỤC MỞ RỘNG
            </div>
            <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#333333", margin: "4px 0 0" }}>
              Bảng Giá Ưu Đãi Doanh Nghiệp & Đại Lý
            </h3>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "#f9f9f9",
              border: "1px solid #e5e5e5",
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "12.5px",
              color: "#555555",
              fontWeight: 600,
            }}
          >
            <span style={{ color: "#16a34a", fontWeight: 700 }}>✓ Đầy đủ Hóa đơn VAT</span>
            <span>•</span>
            <span>Hỗ trợ kỹ thuật 24/7</span>
          </div>
        </div>

        {/* Section Rows */}
        <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Row I: Windows 11 Pro USB FPP */}
          <div
            style={{
              borderRadius: "12px",
              border: "1px solid #e5e5e5",
              padding: "20px 24px",
              backgroundColor: "#fafafa",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "center",
              gap: "24px",
            }}
            className="addon-row-grid"
          >
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              {/* USB Graphic */}
              <div
                style={{
                  width: "100px",
                  height: "38px",
                  background: "linear-gradient(135deg, #0078d4 0%, #004e8c 100%)",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 10px",
                  gap: "6px",
                  position: "relative",
                  boxShadow: "0 2px 8px rgba(0, 120, 212, 0.2)",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    right: "-10px",
                    width: "10px",
                    height: "20px",
                    backgroundColor: "#cbd5e1",
                    borderRadius: "0 2px 2px 0",
                  }}
                />
                <span style={{ fontSize: "9.5px", fontWeight: 800, color: "#ffffff", letterSpacing: "0.2px" }}>
                  Windows Pro
                </span>
              </div>

              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#0078d4", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  I. BẢN QUYỀN WINDOWS 11 PRO (VĨNH VIỄN)
                </div>
                <div style={{ fontSize: "17px", fontWeight: 800, color: "#333333", marginTop: "2px" }}>
                  Windows Pro 10/11 USB FPP
                </div>
                <div style={{ fontSize: "13px", color: "#666666", marginTop: "2px" }}>
                  Hộp USB FPP cao cấp – <strong style={{ color: "#ea580c" }}>ĐỔI ĐƯỢC MÁY KHI NÂNG CẤP</strong>
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "26px", fontWeight: 900, color: "#333333" }}>
                2.900.000đ<span style={{ fontSize: "14px", fontWeight: 600, color: "#888888" }}>/hộp</span>
              </div>
              <button
                type="button"
                onClick={() => onOpenOrder("Windows Pro 10/11 USB FPP (2.900.000đ)")}
                style={{
                  marginTop: "6px",
                  backgroundColor: "#ffffff",
                  color: "#333333",
                  border: "1px solid #cccccc",
                  borderRadius: "6px",
                  padding: "6px 16px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Đặt mua
              </button>
            </div>
          </div>

          {/* Row II: Microsoft Office Home & Business 2024 */}
          <div
            style={{
              borderRadius: "12px",
              border: "1px solid #e5e5e5",
              padding: "20px 24px",
              backgroundColor: "#fafafa",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "center",
              gap: "24px",
            }}
            className="addon-row-grid"
          >
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              {/* Office Box Graphic */}
              <div
                style={{
                  width: "100px",
                  height: "56px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #d4d4d8",
                  borderRadius: "6px",
                  padding: "6px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                  flexShrink: 0,
                }}
              >
                <div style={{ fontSize: "8.5px", fontWeight: 800, color: "#16a34a" }}>
                  Office 2024
                </div>
                <div style={{ display: "flex", gap: "2px", justifyContent: "flex-end" }}>
                  <span style={{ fontSize: "7px", background: "#0284c7", color: "#fff", padding: "1px 2px", borderRadius: "2px", fontWeight: 700 }}>W</span>
                  <span style={{ fontSize: "7px", background: "#16a34a", color: "#fff", padding: "1px 2px", borderRadius: "2px", fontWeight: 700 }}>X</span>
                  <span style={{ fontSize: "7px", background: "#ea580c", color: "#fff", padding: "1px 2px", borderRadius: "2px", fontWeight: 700 }}>P</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  II. BẢN QUYỀN MICROSOFT OFFICE (VĨNH VIỄN)
                </div>
                <div style={{ fontSize: "17px", fontWeight: 800, color: "#333333", marginTop: "2px" }}>
                  Office Home & Business 2024 Full Box
                </div>
                <div style={{ fontSize: "13px", color: "#666666", marginTop: "2px" }}>
                  Hộp vật lý – <strong style={{ color: "#ea580c" }}>ĐỔI ĐƯỢC MÁY KHI NÂNG CẤP</strong>
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "26px", fontWeight: 900, color: "#333333" }}>
                4.500.000đ<span style={{ fontSize: "14px", fontWeight: 600, color: "#888888" }}>/hộp</span>
              </div>
              <button
                type="button"
                onClick={() => onOpenOrder("Office Home & Business 2024 Full Box (4.500.000đ)")}
                style={{
                  marginTop: "6px",
                  backgroundColor: "#ffffff",
                  color: "#333333",
                  border: "1px solid #cccccc",
                  borderRadius: "6px",
                  padding: "6px 16px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Đặt mua
              </button>
            </div>
          </div>

          {/* Row III: Portal Quản Trị Đại Lý 24/7 */}
          <div
            style={{
              borderRadius: "14px",
              border: "2px solid #fed7aa",
              backgroundColor: "#fffdfc",
              padding: "24px",
              boxShadow: "0 6px 20px rgba(255, 111, 61, 0.08)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: 800, color: "#ff6f3d", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  III. PORTAL QUẢN TRỊ ĐẠI LÝ 24/7 (ADMIN PRO)
                </span>
                <h4 style={{ fontSize: "19px", fontWeight: 800, color: "#333333", margin: "2px 0 0" }}>
                  Hệ Thống Xuất Key Tự Động & Quản Lý Tập Trung
                </h4>
              </div>

              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  backgroundColor: "#fff7ed",
                  color: "#ea580c",
                  border: "1px solid #fed7aa",
                  padding: "4px 10px",
                  borderRadius: "12px",
                }}
              >
                ⚡ Tự động 24/7 không cần chờ duyệt
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                gap: "28px",
                alignItems: "center",
              }}
              className="addon-portal-grid"
            >
              {/* Left: Portal Description */}
              <div
                style={{
                  backgroundColor: "#fffaf5",
                  border: "1px solid #fed7aa",
                  borderRadius: "10px",
                  padding: "16px",
                  fontSize: "13px",
                  color: "#475569",
                  lineHeight: 1.6,
                }}
              >
                <div style={{ fontWeight: 800, color: "#ea580c", marginBottom: "6px" }}>
                  Tài Khoản Admin Portal Đại Lý Riêng Biệt:
                </div>
                <div>• Cấp và xuất key bản quyền tự động tức thì cho khách hàng</div>
                <div>• Theo dõi số lượng máy kích hoạt và UUID Mainboard</div>
                <div>• Tính năng tự động cấp lại bản quyền miễn phí khi cài lại Win</div>
              </div>

              {/* Right: Action */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 14px",
                    backgroundColor: "#fff7ed",
                    border: "1.5px solid #ff6f3d",
                    borderRadius: "8px",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "14px", fontWeight: 800, color: "#ff6f3d" }}>Portal Phân Phối Đại Lý</span>
                  </div>
                  <span style={{ fontSize: "16px", fontWeight: 900, color: "#ea580c" }}>Tặng Kèm Trọn Đời</span>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenOrder("Tài Khoản Portal Quản Trị Đại Lý 24/7")}
                  style={{
                    marginTop: "6px",
                    backgroundColor: "#ff6f3d",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px",
                    fontSize: "14px",
                    fontWeight: 800,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    boxShadow: "0 4px 12px rgba(255, 111, 61, 0.25)",
                  }}
                >
                  <ShoppingCart size={16} />
                  <span>Đăng Ký Tài Khoản Portal</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Note */}
          <div
            style={{
              padding: "12px 16px",
              backgroundColor: "#f9f9f9",
              border: "1px dashed #d4d4d8",
              borderRadius: "8px",
              textAlign: "center",
              fontSize: "13px",
              fontWeight: 700,
              color: "#555555",
            }}
          >
            ★ <strong style={{ color: "#ff6f3d" }}>Chính sách chiết khấu:</strong> Đơn hàng từ 50 máy trở lên có chính sách báo giá dự án ưu đãi đặc biệt.
          </div>
        </div>
      </div>
    </section>
  );
}
