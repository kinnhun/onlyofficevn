"use client";

import React from "react";
import { Key, Check, Sparkles, Laptop, Lock, PhoneCall } from "lucide-react";

interface PricingKeyCardsProps {
  onOpenQuote: (pkgName?: string) => void;
}

export default function PricingKeyCards({ onOpenQuote }: PricingKeyCardsProps) {
  return (
    <section className="pricing-key-section">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Top Showcase: Brand + Laptop Mockup */}
        <div className="retail-top-banner">
          {/* Left: Branding & Value */}
          <div className="retail-top-info">
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

            <h2 className="retail-top-title">
              ONLYOFFICE Key Online{" "}
              <span style={{ color: "#ff6f3d" }}>Tối Ưu Bởi Mercy Tech</span>
            </h2>

            <p className="retail-top-desc">
              Giải pháp bản quyền trọn đời không lo gia hạn hàng năm. Kích hoạt trực tiếp qua mã bản quyền hoặc script tự động trong 30 giây. Reset win hay cài lại máy vẫn giữ nguyên bản quyền chính hãng.
            </p>

            <div className="retail-top-features">
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Check size={16} color="#16a34a" style={{ flexShrink: 0 }} />
                <span>Cấp phép theo UUID Main</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Check size={16} color="#16a34a" style={{ flexShrink: 0 }} />
                <span>Xuất Hóa đơn điện tử VAT</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Check size={16} color="#16a34a" style={{ flexShrink: 0 }} />
                <span>Chứng nhận AGPLv3 mộc đỏ</span>
              </div>
            </div>
          </div>

          {/* Right: Laptop Portal Preview */}
          <div className="retail-top-laptop-wrap">
            <div className="retail-laptop-frame">
              <div className="retail-laptop-screen">
                {/* Top Bar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f0f0", paddingBottom: "6px", marginBottom: "8px", flexWrap: "wrap", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 700, color: "#333333" }}>
                    <Laptop size={13} color="#ff6f3d" />
                    <span>ONLYOFFICE Key Management</span>
                  </div>
                  <span style={{ fontSize: "9.5px", color: "#ff6f3d", backgroundColor: "#fff7ed", padding: "1px 6px", borderRadius: "3px", fontWeight: 700 }}>
                    Hệ Thống Quản Lý
                  </span>
                </div>

                {/* 4 Stats */}
                <div className="retail-laptop-stats">
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
              <div className="retail-laptop-base" />
            </div>
          </div>
        </div>

        {/* 3 Package Cards (Confidential Quote) */}
        <div>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <h3 className="retail-packages-title">
              Các Gói Bản Quyền Key Online Theo Số Lượng
            </h3>
            <p className="retail-packages-subtitle">
              Chính sách chiết khấu theo số lượng thiết bị • Vui lòng liên hệ để nhận bảng giá ưu đãi mới nhất
            </p>
          </div>

          <div className="retail-cards-grid">
            {/* Card 1: 1 - 4 Key */}
            <div className="retail-card">
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
                  <span>Hỗ trợ kỹ thuật qua Hotline / Messenger</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => onOpenQuote("Gói Mua Lẻ 1 - 4 Key")}
                className="retail-card-btn retail-card-btn-outline"
              >
                <PhoneCall size={15} color="#ea580c" />
                <span>Nhận Báo Giá Gói 1 – 4 Key</span>
              </button>
            </div>

            {/* Card 2: 5 - 49 Key (POPULAR / HIGHLIGHT CARD) */}
            <div className="retail-card retail-card-popular">
              <span className="retail-card-badge">
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
                className="retail-card-btn retail-card-btn-primary"
              >
                <PhoneCall size={16} />
                <span>Nhận Báo Giá Gói 5 – 49 Key</span>
              </button>
            </div>

            {/* Card 3: 50+ Key */}
            <div className="retail-card">
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
                className="retail-card-btn retail-card-btn-outline"
              >
                <PhoneCall size={15} color="#ea580c" />
                <span>Liên Hệ Báo Giá Từ 50 Key</span>
              </button>
            </div>
          </div>

          <div className="retail-packages-note">
            ★ <strong style={{ color: "#ff6f3d" }}>Lưu ý:</strong> Từ 50 key trở lên hỗ trợ khảo sát và triển khai giải pháp kỹ thuật riêng cho hạ tầng nội bộ của doanh nghiệp.
          </div>
        </div>
      </div>
    </section>
  );
}
