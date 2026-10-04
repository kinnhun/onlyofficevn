"use client";

import React from "react";
import { Check, Info, Sparkles, Building, User, Lock, PhoneCall } from "lucide-react";

interface RetailPriceTableProps {
  onOpenModal: (pkgName?: string) => void;
}

export default function RetailPriceTable({ onOpenModal }: RetailPriceTableProps) {
  return (
    <section style={{ maxWidth: "1248px", margin: "64px auto 0", padding: "0 20px" }}>
      <div
        style={{
          background: "#ffffff",
          borderRadius: "24px",
          padding: "48px 36px",
          color: "#1e293b",
          border: "2px solid #e2e8f0",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#fff7ed",
              color: "#ea580c",
              border: "1px solid #fed7aa",
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
          <h2 style={{ fontSize: "32px", fontWeight: 800, margin: "0 0 10px", color: "#1e293b" }}>
            1. Bảng Giá Bán Lẻ Niêm Yết Tham Chiếu
          </h2>
          <p style={{ color: "#64748b", fontSize: "16px", maxWidth: "700px", margin: "0 auto" }}>
            Khung giá chính thức của Mercy Tech làm căn cứ chào giá cho khách hàng doanh nghiệp & dự án (Vui lòng liên hệ để nhận chính sách chiết khấu tốt nhất)
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {/* Plan 1: Cá nhân */}
          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontSize: "13px", fontWeight: 700 }}>
                <User size={16} color="#ff6f3d" />
                <span>GÓI CÁ NHÂN</span>
              </div>
              <div style={{ fontSize: "24px", fontWeight: 800, color: "#1e293b", margin: "14px 0 6px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Lock size={18} color="#ff6f3d" />
                <span>Liên Hệ Báo Giá</span>
              </div>
              <div style={{ fontSize: "13px", color: "#ea580c", fontWeight: 700, marginBottom: "20px" }}>
                Quy mô lắp đặt: Dưới 5 máy
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#334155" }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Cài đặt cấu hình tối ưu phông chữ</span>
                </li>
                <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#334155" }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Bảo hành lỗi vỡ font 12 tháng</span>
                </li>
                <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#334155" }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Hỗ trợ kỹ thuật qua UltraView</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => onOpenModal("Gói Bán Lẻ: Cá Nhân")}
              style={{
                marginTop: "28px",
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                border: "1.5px solid #cbd5e1",
                color: "#1e293b",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#ff6f3d";
                e.currentTarget.style.color = "#ff6f3d";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#cbd5e1";
                e.currentTarget.style.color = "#1e293b";
              }}
            >
              <PhoneCall size={15} color="#ff6f3d" />
              <span>Tư Vấn Gói Cá Nhân</span>
            </button>
          </div>

          {/* Plan 2: HIGHLIGHTED Doanh Nghiệp Vừa */}
          <div
            style={{
              background: "#ffffff",
              border: "2px solid #ff6f3d",
              borderRadius: "16px",
              padding: "32px 28px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 10px 25px rgba(255, 111, 61, 0.1)",
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
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#ea580c", fontSize: "13px", fontWeight: 700 }}>
                <Building size={16} />
                <span>DOANH NGHIỆP VỪA</span>
              </div>
              <div style={{ fontSize: "24px", fontWeight: 800, color: "#ea580c", margin: "14px 0 6px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Lock size={18} color="#ea580c" />
                <span>Giá Ưu Đãi Doanh Nghiệp</span>
              </div>
              <div style={{ fontSize: "13px", color: "#c2410c", fontWeight: 700, marginBottom: "20px" }}>
                Quy mô: Từ 5 — 49 máy
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#1e293b" }}>
                  <Check size={16} color="#ff6f3d" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span><strong>Đầy đủ Hợp đồng & Hóa đơn VAT</strong></span>
                </li>
                <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#1e293b" }}>
                  <Check size={16} color="#ff6f3d" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span><strong>Nghiệm thu đóng mộc đỏ công ty</strong></span>
                </li>
                <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#1e293b" }}>
                  <Check size={16} color="#ff6f3d" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Chứng nhận nguồn gốc AGPLv3 bảo chứng pháp lý</span>
                </li>
                <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#1e293b" }}>
                  <Check size={16} color="#ff6f3d" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Bảo hành toàn diện & hỗ trợ kỹ thuật ưu tiên</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => onOpenModal("Gói Bán Lẻ: Doanh Nghiệp Vừa")}
              style={{
                marginTop: "28px",
                width: "100%",
                padding: "13px",
                borderRadius: "8px",
                backgroundColor: "#ff6f3d",
                border: "none",
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(255, 111, 61, 0.35)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ea580c")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff6f3d")}
            >
              <PhoneCall size={16} />
              <span>Tư Vấn Gói Doanh Nghiệp Vừa</span>
            </button>
          </div>

          {/* Plan 3: Doanh Nghiệp Lớn */}
          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontSize: "13px", fontWeight: 700 }}>
                <Building size={16} color="#ea580c" />
                <span>DOANH NGHIỆP LỚN</span>
              </div>
              <div style={{ fontSize: "24px", fontWeight: 800, color: "#1e293b", margin: "14px 0 6px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Lock size={18} color="#ea580c" />
                <span>Báo Giá Dự Án Riêng</span>
              </div>
              <div style={{ fontSize: "13px", color: "#ea580c", fontWeight: 700, marginBottom: "20px" }}>
                Quy mô: Từ 50 máy trở lên
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#334155" }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span><strong>Xuất hồ sơ đỏ pháp lý tài chính</strong></span>
                </li>
                <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#334155" }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span><strong>IT khảo sát mạng/máy trạm tận nơi</strong></span>
                </li>
                <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#334155" }}>
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Triển khai tự động hóa qua Active Directory/GPO</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => onOpenModal("Gói Bán Lẻ: Doanh Nghiệp Lớn")}
              style={{
                marginTop: "28px",
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                border: "1.5px solid #cbd5e1",
                color: "#1e293b",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#ea580c";
                e.currentTarget.style.color = "#ea580c";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#cbd5e1";
                e.currentTarget.style.color = "#1e293b";
              }}
            >
              <PhoneCall size={15} color="#ea580c" />
              <span>Tư Vấn Gói Doanh Nghiệp Lớn</span>
            </button>
          </div>
        </div>

        <div
          style={{
            marginTop: "32px",
            padding: "16px 20px",
            backgroundColor: "#fff7ed",
            borderRadius: "12px",
            borderLeft: "4px solid #ff6f3d",
            fontSize: "13px",
            color: "#7c2d12",
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <Info size={18} color="#ff6f3d" style={{ flexShrink: 0, marginTop: "2px" }} />
          <span style={{ lineHeight: 1.5 }}>
            <strong>Lưu ý pháp lý thuế:</strong> Sản phẩm bản quyền phần mềm thuộc đối tượng <strong>Không chịu thuế GTGT</strong> theo quy định của Luật Thuế Giá Trị Gia Tăng Việt Nam. Doanh nghiệp được khấu trừ 100% chi phí hợp lý khi quyết toán thuế TNDN.
          </span>
        </div>
      </div>
    </section>
  );
}
