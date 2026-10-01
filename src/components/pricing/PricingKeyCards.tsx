"use client";

import React from "react";
import { Key, Check, Sparkles, Laptop, Lock, PhoneCall } from "lucide-react";

interface PricingKeyCardsProps {
  onOpenQuote: (pkgName?: string) => void;
}

export default function PricingKeyCards({ onOpenQuote }: PricingKeyCardsProps) {
  return (
    <section style={{ padding: "36px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Top Showcase: Brand + Laptop Mockup */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e5e5e5",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
            padding: "36px 32px",
            marginBottom: "36px",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "36px",
            alignItems: "center",
          }}
          className="retail-top-banner"
        >
          {/* Left: Branding & Value */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
              <span
                style={{
                  backgroundColor: "#fff7ed",
                  color: "#ff6f3d",
                  border: "1px solid #fed7aa",
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "4px 12px",
                  borderRadius: "20px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Key size={13} color="#ff6f3d" />
                <span>BẢN QUYỀN VĨNH VIỄN THEO MAINBOARD</span>
              </span>
            </div>

            <h2
              style={{
                fontSize: "30px",
                fontWeight: 800,
                color: "#333333",
                lineHeight: 1.25,
                margin: "0 0 12px",
              }}
            >
              ONLYOFFICE Key Online{" "}
              <span style={{ color: "#ff6f3d" }}>Tối Ưu Bởi Mercy Tech</span>
            </h2>

            <p style={{ fontSize: "15px", color: "#666666", lineHeight: 1.6, margin: "0 0 20px" }}>
              Giải pháp bản quyền trọn đời không lo gia hạn hàng năm. Kích hoạt trực tiếp qua mã bản quyền hoặc script tự động trong 30 giây. Reset win hay cài lại máy vẫn giữ nguyên bản quyền chính hãng.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", fontSize: "13px", color: "#444444" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Check size={16} color="#16a34a" />
                <span>Cấp phép theo UUID Main</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Check size={16} color="#16a34a" />
                <span>Xuất Hóa đơn điện tử VAT</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Check size={16} color="#16a34a" />
                <span>Chứng nhận AGPLv3 mộc đỏ</span>
              </div>
            </div>
          </div>

          {/* Right: Laptop Portal Preview */}
          <div>
            <div
              style={{
                backgroundColor: "#222222",
                borderRadius: "12px 12px 4px 4px",
                padding: "10px 10px 4px",
                boxShadow: "0 16px 36px rgba(0, 0, 0, 0.12)",
                maxWidth: "460px",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "6px",
                  padding: "12px",
                  fontSize: "11px",
                }}
              >
                {/* Top Bar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f0f0", paddingBottom: "6px", marginBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 700, color: "#333333" }}>
                    <Laptop size={13} color="#ff6f3d" />
                    <span>ONLYOFFICE Key Management</span>
                  </div>
                  <span style={{ fontSize: "9.5px", color: "#ff6f3d", backgroundColor: "#fff7ed", padding: "1px 6px", borderRadius: "3px", fontWeight: 700 }}>
                    Hệ Thống Quản Lý
                  </span>
                </div>

                {/* 4 Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px", textAlign: "center", marginBottom: "8px" }}>
                  <div style={{ backgroundColor: "#f9f9f9", padding: "4px 2px", borderRadius: "4px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "#333333" }}>320</div>
                    <div style={{ fontSize: "9px", color: "#888888" }}>Tổng key</div>
                  </div>
                  <div style={{ backgroundColor: "#f0fdf4", padding: "4px 2px", borderRadius: "4px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "#16a34a" }}>298</div>
                    <div style={{ fontSize: "9px", color: "#16a34a" }}>Kích hoạt</div>
                  </div>
                  <div style={{ backgroundColor: "#fffbeb", padding: "4px 2px", borderRadius: "4px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "#d97706" }}>22</div>
                    <div style={{ fontSize: "9px", color: "#d97706" }}>Đang chờ</div>
                  </div>
                  <div style={{ backgroundColor: "#fef2f2", padding: "4px 2px", borderRadius: "4px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "#dc2626" }}>0</div>
                    <div style={{ fontSize: "9px", color: "#dc2626" }}>Hết hạn</div>
                  </div>
                </div>

                {/* Sample Device Rows */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {[
                    { uuid: "081C3004-6E30C", comp: "CÔNG TY ABC" },
                    { uuid: "433BBDB-091BC", comp: "CÔNG TY ABC" },
                    { uuid: "D6-A000801", comp: "CÔNG TY ABC" },
                  ].map((row, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: idx % 2 === 0 ? "#fafafa" : "#ffffff",
                        padding: "3px 6px",
                        borderRadius: "4px",
                        fontSize: "9.5px",
                      }}
                    >
                      <span style={{ fontFamily: "monospace", color: "#555" }}>{row.uuid}</span>
                      <span style={{ color: "#777" }}>{row.comp}</span>
                      <span style={{ color: "#16a34a", fontWeight: 700 }}>✓ Đã kích hoạt</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Laptop Base Lip */}
              <div
                style={{
                  height: "6px",
                  backgroundColor: "#444444",
                  borderRadius: "0 0 8px 8px",
                  marginTop: "3px",
                  width: "104%",
                  marginLeft: "-2%",
                }}
              />
            </div>
          </div>
        </div>

        {/* 3 Package Cards (Confidential Quote) */}
        <div>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <h3 style={{ fontSize: "26px", fontWeight: 800, color: "#333333", margin: "0 0 8px" }}>
              Các Gói Bản Quyền Key Online Theo Số Lượng
            </h3>
            <p style={{ fontSize: "14px", color: "#666666", margin: 0 }}>
              Chính sách chiết khấu theo số lượng thiết bị • Vui lòng liên hệ để nhận bảng giá ưu đãi mới nhất
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
              alignItems: "stretch",
            }}
            className="retail-cards-grid"
          >
            {/* Card 1: 1 - 4 Key */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "14px",
                border: "1px solid #e5e5e5",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#888888", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                CÁ NHÂN & MÁY LẺ
              </div>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#333333", margin: "4px 0 16px" }}>
                Từ 1 – 4 Key
              </div>

              {/* Quote Placeholder */}
              <div style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #f0f0f0" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#f9f9f9", padding: "6px 12px", borderRadius: "6px", border: "1px solid #e5e5e5" }}>
                  <Lock size={15} color="#ea580c" />
                  <span style={{ fontSize: "15px", fontWeight: 800, color: "#333333" }}>Liên Hệ Báo Giá</span>
                </div>
                <div style={{ fontSize: "12px", color: "#16a34a", fontWeight: 700, marginTop: "6px" }}>
                  ✓ ĐÃ BAO GỒM 10% VAT
                </div>
              </div>

              {/* Features */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#444444" }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Bản quyền vĩnh viễn theo Mainboard máy</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#444444" }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Kích hoạt nhanh chóng trong 30 giây</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#444444" }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Cài lại win tự động kích hoạt lại</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#444444" }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Hỗ trợ kỹ thuật qua Hotline/Zalo</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => onOpenQuote("Gói Mua Lẻ 1 - 4 Key")}
                style={{
                  width: "100%",
                  backgroundColor: "#ffffff",
                  color: "#333333",
                  border: "1.5px solid #cccccc",
                  borderRadius: "8px",
                  padding: "12px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  transition: "all 0.2s ease",
                }}
              >
                <PhoneCall size={15} color="#ea580c" />
                <span>Nhận Báo Giá Gói 1 – 4 Key</span>
              </button>
            </div>

            {/* Card 2: 5 - 49 Key (POPULAR / HIGHLIGHT CARD) */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "14px",
                border: "2px solid #ff6f3d",
                boxShadow: "0 10px 30px rgba(255, 111, 61, 0.12)",
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "-13px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#ff6f3d",
                  color: "#ffffff",
                  fontSize: "11px",
                  fontWeight: 800,
                  padding: "3px 14px",
                  borderRadius: "20px",
                  letterSpacing: "0.5px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Sparkles size={12} /> DOANH NGHIỆP PHỔ BIẾN
              </span>

              <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#ff6f3d", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                DOANH NGHIỆP VỪA & NHỎ
              </div>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#333333", margin: "4px 0 16px" }}>
                Từ 5 – 49 Key
              </div>

              {/* Quote Placeholder */}
              <div style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #f0f0f0" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#fff7ed", padding: "6px 12px", borderRadius: "6px", border: "1px solid #fed7aa" }}>
                  <Lock size={15} color="#ff6f3d" />
                  <span style={{ fontSize: "15px", fontWeight: 800, color: "#ff6f3d" }}>Giá Chiết Khấu Ưu Đãi</span>
                </div>
                <div style={{ fontSize: "12px", color: "#16a34a", fontWeight: 700, marginTop: "6px" }}>
                  ✓ ĐÃ BAO GỒM 10% VAT • HỖ TRỢ XUẤT HÓA ĐƠN
                </div>
              </div>

              {/* Features */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#333333", fontWeight: 600 }}>
                  <Check size={16} color="#ff6f3d" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Bản quyền vĩnh viễn theo Mainboard máy</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#333333", fontWeight: 600 }}>
                  <Check size={16} color="#ff6f3d" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Cấp tài khoản Portal quản lý key tập trung</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#333333", fontWeight: 600 }}>
                  <Check size={16} color="#ff6f3d" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Xuất giấy chứng nhận bản quyền từng thiết bị</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#333333", fontWeight: 600 }}>
                  <Check size={16} color="#ff6f3d" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Hợp đồng kinh tế & Hóa đơn điện tử VAT</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => onOpenQuote("Gói Doanh Nghiệp 5 - 49 Key")}
                style={{
                  width: "100%",
                  backgroundColor: "#ff6f3d",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "13px",
                  fontSize: "14.5px",
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(255, 111, 61, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <PhoneCall size={16} />
                <span>Nhận Báo Giá Gói 5 – 49 Key</span>
              </button>
            </div>

            {/* Card 3: 50+ Key */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "14px",
                border: "1px solid #e5e5e5",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#888888", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                TỔ CHỨC & TẬP ĐOÀN
              </div>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#333333", margin: "4px 0 16px" }}>
                Từ 50 Key Trở Lên
              </div>

              {/* Quote Placeholder */}
              <div style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #f0f0f0" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#f9f9f9", padding: "6px 12px", borderRadius: "6px", border: "1px solid #e5e5e5" }}>
                  <Lock size={15} color="#16a34a" />
                  <span style={{ fontSize: "15px", fontWeight: 800, color: "#16a34a" }}>Báo Giá Dự Án Riêng</span>
                </div>
                <div style={{ fontSize: "12px", color: "#16a34a", fontWeight: 700, marginTop: "6px" }}>
                  ✓ CHIẾT KHẤU TỐI ĐA CHO DỰ ÁN
                </div>
              </div>

              {/* Features */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#444444" }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Chính sách chiết khấu tốt nhất thị trường</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#444444" }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Hỗ trợ triển khai máy chủ & giải pháp riêng</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#444444" }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Hợp đồng kinh tế mộc đỏ & Bàn giao tận nơi</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#444444" }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Kỹ sư hỗ trợ cài đặt và chuyển giao 24/7</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => onOpenQuote("Gói Dự Án Từ 50 Key Trở Lên")}
                style={{
                  width: "100%",
                  backgroundColor: "#ffffff",
                  color: "#333333",
                  border: "1.5px solid #cccccc",
                  borderRadius: "8px",
                  padding: "12px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <PhoneCall size={15} color="#ea580c" />
                <span>Liên Hệ Báo Giá Từ 50 Key</span>
              </button>
            </div>
          </div>

          <div
            style={{
              marginTop: "20px",
              textAlign: "center",
              fontSize: "13px",
              color: "#666666",
              fontWeight: 600,
            }}
          >
            ★ <strong style={{ color: "#ff6f3d" }}>Lưu ý:</strong> Từ 50 key trở lên hỗ trợ khảo sát và triển khai giải pháp kỹ thuật riêng cho hạ tầng nội bộ của doanh nghiệp.
          </div>
        </div>
      </div>
    </section>
  );
}
