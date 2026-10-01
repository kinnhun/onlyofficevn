"use client";

import React from "react";
import { Check, Info, Sparkles, Building, User } from "lucide-react";

interface RetailPriceTableProps {
  onOpenModal: (pkgName?: string) => void;
}

export default function RetailPriceTable({ onOpenModal }: RetailPriceTableProps) {
  return (
    <section style={{ maxWidth: "1248px", margin: "72px auto 0", padding: "0 20px" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          borderRadius: "24px",
          padding: "48px 36px",
          color: "#ffffff",
          boxShadow: "0 20px 40px rgba(15, 23, 42, 0.15)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "rgba(255, 111, 61, 0.2)",
              color: "#ff865c",
              border: "1px solid rgba(255, 111, 61, 0.4)",
              padding: "4px 16px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              marginBottom: "12px",
            }}
          >
            MỤC 1. BẢNG GIÁ NIÊM YẾT THAM CHIẾU
          </div>
          <h2 style={{ fontSize: "32px", fontWeight: 800, margin: "0 0 10px", color: "#ffffff" }}>
            1. Bảng Giá Bán Lẻ Niêm Yết Công Khai Trực Tín
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "16px", maxWidth: "700px", margin: "0 auto" }}>
            Khung giá chính thức của Mercy Tech dùng làm căn cứ chào giá cho khách hàng doanh nghiệp & dự án
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {/* Plan 1 */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "16px",
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#94a3b8", fontSize: "13px", fontWeight: 700 }}>
                <User size={16} />
                <span>GÓI CÁ NHÂN</span>
              </div>
              <div style={{ fontSize: "36px", fontWeight: 900, color: "#ffffff", margin: "14px 0 6px" }}>
                799.000 ₫ <span style={{ fontSize: "15px", color: "#94a3b8", fontWeight: 500 }}>/ Máy</span>
              </div>
              <div style={{ fontSize: "13px", color: "#38bdf8", fontWeight: 600, marginBottom: "20px" }}>
                Quy mô lắp đặt: Dưới 5 máy
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#e2e8f0" }}>
                  <Check size={16} color="#4ade80" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Cài đặt cấu hình tối ưu phông chữ</span>
                </li>
                <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#e2e8f0" }}>
                  <Check size={16} color="#4ade80" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Bảo hành lỗi vỡ font 12 tháng</span>
                </li>
                <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#e2e8f0" }}>
                  <Check size={16} color="#4ade80" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Hỗ trợ kỹ thuật qua UltraView</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => onOpenModal("Gói Bán Lẻ: Cá Nhân (799k/máy)")}
              style={{
                marginTop: "28px",
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                fontWeight: 700,
                cursor: "pointer",
                transition: "background 0.2s ease",
              }}
            >
              Tư Vấn Gói Cá Nhân
            </button>
          </div>

          {/* Plan 2: HIGHLIGHTED */}
          <div
            style={{
              background: "linear-gradient(180deg, rgba(255, 111, 61, 0.18) 0%, rgba(255, 111, 61, 0.06) 100%)",
              border: "2px solid #ff6f3d",
              borderRadius: "16px",
              padding: "32px 28px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-12px",
                right: "24px",
                backgroundColor: "#ff6f3d",
                color: "#ffffff",
                fontSize: "11px",
                fontWeight: 800,
                padding: "4px 12px",
                borderRadius: "20px",
                letterSpacing: "0.06em",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Sparkles size={12} />
              <span>ĐẮT HÀNG NHẤT</span>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#fed7aa", fontSize: "13px", fontWeight: 700 }}>
                <Building size={16} />
                <span>DOANH NGHIỆP VỪA</span>
              </div>
              <div style={{ fontSize: "36px", fontWeight: 900, color: "#ffedd5", margin: "14px 0 6px" }}>
                699.000 ₫ <span style={{ fontSize: "15px", color: "#fed7aa", fontWeight: 500 }}>/ Máy</span>
              </div>
              <div style={{ fontSize: "13px", color: "#fed7aa", fontWeight: 600, marginBottom: "20px" }}>
                Quy mô: Từ 5 — 49 máy
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#ffffff" }}>
                  <Check size={16} color="#ff865c" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span><strong>Đầy đủ Hợp đồng & Hóa đơn VAT</strong></span>
                </li>
                <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#ffffff" }}>
                  <Check size={16} color="#ff865c" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span><strong>Nghiệm thu đóng mộc đỏ công ty</strong></span>
                </li>
                <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#ffffff" }}>
                  <Check size={16} color="#ff865c" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Chứng nhận nguồn gốc AGPLv3 bảo chứng pháp lý</span>
                </li>
                <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#ffffff" }}>
                  <Check size={16} color="#ff865c" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Bảo hành toàn diện & hỗ trợ kỹ thuật ưu tiên</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => onOpenModal("Gói Bán Lẻ: Doanh Nghiệp Vừa (699k/máy)")}
              style={{
                marginTop: "28px",
                width: "100%",
                padding: "13px",
                borderRadius: "8px",
                backgroundColor: "#ff6f3d",
                border: "none",
                color: "#ffffff",
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(255, 111, 61, 0.4)",
              }}
            >
              Tư Vấn Gói Doanh Nghiệp Vừa
            </button>
          </div>

          {/* Plan 3 */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "16px",
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#94a3b8", fontSize: "13px", fontWeight: 700 }}>
                <Building size={16} />
                <span>DOANH NGHIỆP LỚN</span>
              </div>
              <div style={{ fontSize: "36px", fontWeight: 900, color: "#ffffff", margin: "14px 0 6px" }}>
                499.000 ₫ <span style={{ fontSize: "15px", color: "#94a3b8", fontWeight: 500 }}>/ Máy</span>
              </div>
              <div style={{ fontSize: "13px", color: "#a7f3d0", fontWeight: 600, marginBottom: "20px" }}>
                Quy mô: Từ 50 máy trở lên
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#e2e8f0" }}>
                  <Check size={16} color="#4ade80" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span><strong>Xuất hồ sơ đỏ pháp lý tài chính</strong></span>
                </li>
                <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#e2e8f0" }}>
                  <Check size={16} color="#4ade80" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span><strong>IT khảo sát mạng/máy trạm tận nơi</strong></span>
                </li>
                <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#e2e8f0" }}>
                  <Check size={16} color="#4ade80" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Triển khai tự động hóa qua Active Directory/GPO</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => onOpenModal("Gói Bán Lẻ: Doanh Nghiệp Lớn (499k/máy)")}
              style={{
                marginTop: "28px",
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Tư Vấn Gói Doanh Nghiệp Lớn
            </button>
          </div>
        </div>

        <div
          style={{
            marginTop: "32px",
            padding: "14px 20px",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            borderRadius: "10px",
            borderLeft: "4px solid #38bdf8",
            fontSize: "13px",
            color: "#94a3b8",
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <Info size={18} color="#38bdf8" style={{ flexShrink: 0, marginTop: "2px" }} />
          <span>
            <strong>Lưu ý pháp lý thuế:</strong> Sản phẩm bản quyền phần mềm thuộc đối tượng <strong>Không chịu thuế GTGT</strong> theo quy định của Luật Thuế Giá Trị Gia Tăng Việt Nam. Doanh nghiệp được khấu trừ 100% chi phí hợp lý khi quyết toán thuế TNDN.
          </span>
        </div>
      </div>
    </section>
  );
}
