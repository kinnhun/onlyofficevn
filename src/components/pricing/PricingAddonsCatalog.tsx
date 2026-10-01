"use client";

import React, { useState } from "react";
import { ZoomIn, Lock, PhoneCall } from "lucide-react";
import PricingStickerModal from "./PricingStickerModal";
import PricingWholesaleClub from "./PricingWholesaleClub";

interface PricingAddonsCatalogProps {
  onOpenQuote: (productName?: string) => void;
}

export default function PricingAddonsCatalog({ onOpenQuote }: PricingAddonsCatalogProps) {
  const [isStickerZoomOpen, setIsStickerZoomOpen] = useState(false);

  return (
    <section style={{ padding: "0 20px 48px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Container */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e5e5e5",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
            overflow: "hidden",
            marginBottom: "36px",
          }}
        >
          {/* Header */}
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
                BẢN QUYỀN VẬT LÝ ONLYOFFICE CHÍNH HÃNG
              </div>
              <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#333333", margin: "4px 0 0" }}>
                Tem Cào Hologram 7 Màu Dán Case Máy Tính / Laptop
              </h3>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
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

          {/* Rows */}
          <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: "22px" }}>
            {/* OnlyOffice Key Tem Vật Lý */}
            <div
              style={{
                borderRadius: "14px",
                border: "2px solid #fed7aa",
                backgroundColor: "#fffdfc",
                padding: "24px",
                boxShadow: "0 6px 20px rgba(255, 111, 61, 0.06)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
                <div>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#ff6f3d", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    BẢN QUYỀN VĨNH VIỄN THEO MAINBOARD
                  </span>
                  <h4 style={{ fontSize: "19px", fontWeight: 800, color: "#333333", margin: "2px 0 0" }}>
                    Tem Cào Hologram 7 Màu Chống Giả Nguyên Seal
                  </h4>
                </div>

                <span
                  style={{
                    fontSize: "11.5px",
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

                {/* Right: Confidential Tier Quotes */}
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
                    <span style={{ fontSize: "13px", fontWeight: 800, color: "#ea580c", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <Lock size={13} /> Liên hệ báo giá
                    </span>
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
                    <span style={{ fontSize: "13px", fontWeight: 800, color: "#ea580c", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <Lock size={13} /> Chiết khấu ưu đãi
                    </span>
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
                    <span style={{ fontSize: "13px", fontWeight: 800, color: "#16a34a", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <Lock size={13} /> Báo giá sỉ tối đa
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenQuote("Tem Cào Hologram 7 Màu")}
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
                    <PhoneCall size={16} />
                    <span>Nhận Báo Giá Tem Vật Lý</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Note */}
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
              ★ <strong style={{ color: "#ff6f3d" }}>Chính sách dự án:</strong> Đơn hàng từ 50 máy trở lên có chính sách báo giá riêng và hỗ trợ khảo sát hạ tầng miễn phí.
            </div>
          </div>
        </div>

        {/* Agency Dealer Partner Showcase */}
        <PricingWholesaleClub onOpenQuote={onOpenQuote} />
      </div>

      {/* Lightbox Zoom Modal for Sticker */}
      <PricingStickerModal
        isOpen={isStickerZoomOpen}
        onClose={() => setIsStickerZoomOpen(false)}
      />
    </section>
  );
}
