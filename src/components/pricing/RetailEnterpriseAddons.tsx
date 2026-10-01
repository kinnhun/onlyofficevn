"use client";

import React, { useState } from "react";
import { ShoppingCart, ZoomIn, Check, Sparkles } from "lucide-react";
import PricingStickerModal from "./PricingStickerModal";

interface RetailEnterpriseAddonsProps {
  onOpenOrder: (productName?: string) => void;
}

export default function RetailEnterpriseAddons({ onOpenOrder }: RetailEnterpriseAddonsProps) {
  const [isStickerZoomOpen, setIsStickerZoomOpen] = useState(false);

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

          {/* Row III: OnlyOffice Key Tem Vật Lý (HIGHLIGHTED WITH ONLYOFFICE ORANGE) */}
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
                  III. ONLYOFFICE KEY TEM VẬT LÝ (VĨNH VIỄN)
                </span>
                <h4 style={{ fontSize: "19px", fontWeight: 800, color: "#333333", margin: "2px 0 0" }}>
                  Tem Cào Hologram 7 Màu Chống Giả
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
                ✨ Dán trực tiếp lên Case PC / Laptop
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                gap: "28px",
                alignItems: "center",
              }}
              className="addon-tem-grid"
            >
              {/* Left: Real Sticker Image */}
              <div>
                <div
                  style={{
                    position: "relative",
                    borderRadius: "10px",
                    overflow: "hidden",
                    border: "1px solid #e5e5e5",
                    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
                    cursor: "pointer",
                    backgroundColor: "#ffffff",
                  }}
                  onClick={() => setIsStickerZoomOpen(true)}
                  title="Nhấp để phóng to tem cào thực tế"
                >
                  <img
                    src="/tem-onlyoffice-mercy-tech.png"
                    alt="Mẫu tem cào Hologram 7 màu OnlyOffice tối ưu bởi Mercy Tech"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      objectFit: "contain",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "8px",
                      right: "8px",
                      backgroundColor: "rgba(51, 51, 51, 0.85)",
                      color: "#ffffff",
                      padding: "4px 8px",
                      borderRadius: "16px",
                      fontSize: "10.5px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <ZoomIn size={12} color="#facc15" />
                    <span>Phóng to</span>
                  </div>
                </div>
                <div style={{ fontSize: "11.5px", color: "#888888", marginTop: "6px", textAlign: "center" }}>
                  Mã Seri chuẩn: <strong>MT-0319227767-0001</strong> • Vùng phủ cào bảo mật nguyên seal
                </div>
              </div>

              {/* Right: 3 Tier Prices */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 14px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e5e5",
                    borderRadius: "8px",
                  }}
                >
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#444444" }}>Từ 1 – 4 Tem</span>
                  <span style={{ fontSize: "20px", fontWeight: 900, color: "#333333" }}>999.000đ<span style={{ fontSize: "12px", color: "#888", fontWeight: 600 }}>/cái</span></span>
                </div>

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
                    <span style={{ fontSize: "14px", fontWeight: 800, color: "#ff6f3d" }}>Từ 5 – 49 Tem</span>
                    <span style={{ marginLeft: "8px", fontSize: "10px", background: "#ff6f3d", color: "#fff", padding: "1px 6px", borderRadius: "10px", fontWeight: 700 }}>ƯU ĐÃI</span>
                  </div>
                  <span style={{ fontSize: "20px", fontWeight: 950, color: "#ff6f3d" }}>899.000đ<span style={{ fontSize: "12px", color: "#888", fontWeight: 600 }}>/cái</span></span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 14px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e5e5",
                    borderRadius: "8px",
                  }}
                >
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#444444" }}>Từ 50 Tem Trở Lên</span>
                  <span style={{ fontSize: "20px", fontWeight: 900, color: "#16a34a" }}>699.000đ<span style={{ fontSize: "12px", color: "#888", fontWeight: 600 }}>/cái</span></span>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenOrder("Tem Cào Hologram 7 Màu OnlyOffice")}
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
                  <span>Đặt Mua Tem Vật Lý</span>
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

      {/* Lightbox Zoom Modal for Sticker */}
      <PricingStickerModal
        isOpen={isStickerZoomOpen}
        onClose={() => setIsStickerZoomOpen(false)}
      />
    </section>
  );
}
