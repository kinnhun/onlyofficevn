"use client";

import React from "react";
import { Key, Check, Sparkles, Laptop, ShoppingCart, ShieldCheck } from "lucide-react";

interface RetailPricingCardsProps {
  onOpenOrder: (productName?: string) => void;
}

export default function RetailPricingCards({ onOpenOrder }: RetailPricingCardsProps) {
  return (
    <section style={{ padding: "10px 0 36px" }}>
      {/* Top Banner Box: Brand Identity & Portal Showcase */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e5e5e5",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          padding: "32px",
          marginBottom: "36px",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "36px",
          alignItems: "center",
        }}
        className="retail-top-banner"
      >
        {/* Left: Branding & Core Value */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
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
                gap: "5px",
              }}
            >
              <Key size={13} color="#ff6f3d" />
              <span>KEY ONLINE VĨNH VIỄN THEO MAIN</span>
            </span>
          </div>

          <h2
            style={{
              fontSize: "32px",
              fontWeight: 800,
              lineHeight: 1.25,
              color: "#333333",
              margin: "0 0 12px",
            }}
          >
            Bản Quyền Vĩnh Viễn <span style={{ color: "#ff6f3d" }}>OnlyOffice</span>
          </h2>

          <p style={{ fontSize: "15px", color: "#666666", lineHeight: 1.6, margin: "0 0 16px" }}>
            Cấp phép vĩnh viễn theo Mainboard – UUID máy tính. Reset win, cài lại hệ điều hành nhận lại chính key đã kích hoạt. Tối ưu hóa phông chữ văn phòng, bộ gõ Tiếng Việt và pháp lý doanh nghiệp bởi <strong>Công ty TNHH Công Nghệ Mercy</strong>.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "13px", color: "#444444" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Check size={12} color="#16a34a" strokeWidth={3} />
              </div>
              <span>Đầy đủ Hóa đơn VAT</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Check size={12} color="#16a34a" strokeWidth={3} />
              </div>
              <span>Kích hoạt tự động trong 30s</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Check size={12} color="#16a34a" strokeWidth={3} />
              </div>
              <span>Hỗ trợ kỹ thuật 24/7</span>
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
              boxShadow: "0 16px 36px rgba(0, 0, 0, 0.15)",
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
                  Portal Quản Lý
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

      {/* 3 Pricing Columns matching user infographic prices (799k, 699k, 499k) */}
      <div>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h3 style={{ fontSize: "26px", fontWeight: 800, color: "#333333", margin: "0 0 8px" }}>
            Bảng Giá Mua Lẻ OnlyOffice Key Online
          </h3>
          <p style={{ fontSize: "14px", color: "#666666", margin: 0 }}>
            Tất cả đơn giá đã bao gồm 10% thuế GTGT (VAT) • Cấp phép vĩnh viễn không đóng phí duy trì hàng năm
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
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#888888", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              CÁ NHÂN & MÁY LẺ
            </div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "#333333", margin: "4px 0 16px" }}>
              Từ 1 – 4 Key
            </div>

            {/* Price */}
            <div style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #f0f0f0" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                <span style={{ fontSize: "36px", fontWeight: 900, color: "#333333" }}>799.000đ</span>
                <span style={{ fontSize: "14px", color: "#888888", fontWeight: 600 }}>/key</span>
              </div>
              <div style={{ fontSize: "12px", color: "#16a34a", fontWeight: 700, marginTop: "2px" }}>
                ✓ ĐÃ BAO GỒM VAT
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
                <span>Kích hoạt nhanh trong 30 giây</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#444444" }}>
                <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>Cài lại win tự động nhận lại bản quyền</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#444444" }}>
                <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>Hỗ trợ kỹ thuật qua Hotline/Zalo</span>
              </li>
            </ul>

            <button
              type="button"
              onClick={() => onOpenOrder("OnlyOffice Key Online (Gói 1-4 Key)")}
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
                transition: "all 0.2s ease",
              }}
            >
              Đặt Mua 1 – 4 Key
            </button>
          </div>

          {/* Card 2: 5 - 49 Key (POPULAR / HIGHLIGHT CARD - ONLYOFFICE ORANGE) */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              border: "2px solid #ff6f3d",
              boxShadow: "0 10px 30px rgba(255, 111, 61, 0.15)",
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            {/* Popular Badge */}
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
              <Sparkles size={12} /> PHỔ BIẾN NHẤT CHO DOANH NGHIỆP
            </span>

            <div style={{ fontSize: "13px", fontWeight: 700, color: "#ff6f3d", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              DOANH NGHIỆP VỪA & NHỎ
            </div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "#333333", margin: "4px 0 16px" }}>
              Từ 5 – 49 Key
            </div>

            {/* Price */}
            <div style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #f0f0f0" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                <span style={{ fontSize: "38px", fontWeight: 900, color: "#ff6f3d" }}>699.000đ</span>
                <span style={{ fontSize: "14px", color: "#888888", fontWeight: 600 }}>/key</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "2px" }}>
                <span style={{ fontSize: "12px", color: "#16a34a", fontWeight: 700 }}>✓ ĐÃ BAO GỒM VAT</span>
                <span style={{ fontSize: "11px", color: "#ea580c", backgroundColor: "#fff7ed", padding: "1px 6px", borderRadius: "3px", fontWeight: 700 }}>
                  Tiết kiệm 100k/key
                </span>
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
                <span>Xuất Hóa đơn điện tử VAT đầy đủ</span>
              </li>
            </ul>

            <button
              type="button"
              onClick={() => onOpenOrder("OnlyOffice Key Online (Gói 5-49 Key)")}
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
                boxShadow: "0 4px 14px rgba(255, 111, 61, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "background-color 0.2s ease",
              }}
            >
              <ShoppingCart size={16} />
              <span>Đặt Mua 5 – 49 Key</span>
            </button>
          </div>

          {/* Card 3: Từ 50 Key trở lên */}
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
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#888888", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              TỔ CHỨC & TẬP ĐOÀN
            </div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "#333333", margin: "4px 0 16px" }}>
              Từ 50 Key Trở Lên
            </div>

            {/* Price */}
            <div style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #f0f0f0" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                <span style={{ fontSize: "36px", fontWeight: 900, color: "#333333" }}>499.000đ</span>
                <span style={{ fontSize: "14px", color: "#888888", fontWeight: 600 }}>/key</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "2px" }}>
                <span style={{ fontSize: "12px", color: "#16a34a", fontWeight: 700 }}>✓ ĐÃ BAO GỒM VAT</span>
                <span style={{ fontSize: "11px", color: "#15803d", backgroundColor: "#f0fdf4", padding: "1px 6px", borderRadius: "3px", fontWeight: 700 }}>
                  Tiết kiệm 300k/key
                </span>
              </div>
            </div>

            {/* Features */}
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#444444" }}>
                <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>Mức giá tối ưu nhất thị trường</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#444444" }}>
                <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>Hỗ trợ triển khai giải pháp riêng theo yêu cầu</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#444444" }}>
                <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>Hợp đồng kinh tế mộc đỏ & Biên bản bàn giao</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#444444" }}>
                <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>Kỹ sư hỗ trợ cài đặt qua Ultraview/TeamViewer</span>
              </li>
            </ul>

            <button
              type="button"
              onClick={() => onOpenOrder("OnlyOffice Key Online (Gói từ 50 Key)")}
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
              }}
            >
              Liên Hệ Báo Giá Từ 50 Key
            </button>
          </div>
        </div>

        {/* Footnote matching user infographic */}
        <div
          style={{
            marginTop: "16px",
            textAlign: "center",
            fontSize: "13px",
            color: "#666666",
            fontWeight: 600,
          }}
        >
          ★ <strong style={{ color: "#ff6f3d" }}>Lưu ý:</strong> Từ 50 key trở lên hỗ trợ triển khai giải pháp riêng.
        </div>
      </div>
    </section>
  );
}
