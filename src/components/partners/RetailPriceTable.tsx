"use client";

import React from "react";
import { Check, Info, Sparkles, Building, User, Lock, PhoneCall } from "lucide-react";

interface RetailPriceTableProps {
  onOpenModal: (pkgName?: string) => void;
}

export default function RetailPriceTable({ onOpenModal }: RetailPriceTableProps) {
  return (
    <section className="oo-partner-section">
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <div className="oo-partner-kicker">
          BẢNG GIÁ THAM CHIẾU
        </div>
        <h2 className="oo-partner-heading" style={{ margin: "0 0 8px" }}>
          Bảng Giá Bán Lẻ Tham Chiếu Cho Khách Hàng
        </h2>
        <p className="oo-partner-subheading" style={{ maxWidth: "700px", margin: "0 auto" }}>
          Khung giá niêm yết làm căn cứ đại lý chào giá khách hàng doanh nghiệp & dự án (Liên hệ nhận mức chiết khấu sỉ bảo mật)
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "20px",
        }}
      >
        {/* Plan 1: Cá nhân */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "28px 24px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              <User size={16} color="#ff6f3d" />
              <span>GÓI CÁ NHÂN</span>
            </div>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a", margin: "14px 0 6px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Lock size={18} color="#64748b" />
              <span>Liên Hệ Báo Giá</span>
            </div>
            <div style={{ fontSize: "13px", color: "#64748b", fontWeight: 600, marginBottom: "20px" }}>
              Quy mô lắp đặt: Dưới 5 máy
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#334155", lineHeight: 1.5 }}>
                <Check size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "3px" }} />
                <span>Cài đặt cấu hình tối ưu phông chữ</span>
              </li>
              <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#334155", lineHeight: 1.5 }}>
                <Check size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "3px" }} />
                <span>Bảo hành lỗi vỡ font 12 tháng</span>
              </li>
              <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#334155", lineHeight: 1.5 }}>
                <Check size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "3px" }} />
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
            border: "1.5px solid #ff6f3d",
            borderRadius: "16px",
            padding: "28px 24px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 8px 24px rgba(255, 111, 61, 0.12)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-12px",
              right: "20px",
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
              boxShadow: "0 2px 8px rgba(255, 111, 61, 0.3)",
            }}
          >
            <Sparkles size={12} />
            <span>ĐẮT HÀNG NHẤT</span>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#ea580c", fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              <Building size={16} />
              <span>DOANH NGHIỆP VỪA</span>
            </div>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a", margin: "14px 0 6px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Lock size={18} color="#ea580c" />
              <span>Giá Ưu Đãi Doanh Nghiệp</span>
            </div>
            <div style={{ fontSize: "13px", color: "#ea580c", fontWeight: 700, marginBottom: "20px" }}>
              Quy mô: Từ 5 — 49 máy
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#1e293b", lineHeight: 1.5 }}>
                <Check size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "3px" }} />
                <span><strong>Đầy đủ Hợp đồng & Hóa đơn VAT</strong></span>
              </li>
              <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#1e293b", lineHeight: 1.5 }}>
                <Check size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "3px" }} />
                <span><strong>Nghiệm thu đóng mộc đỏ công ty</strong></span>
              </li>
              <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#1e293b", lineHeight: 1.5 }}>
                <Check size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "3px" }} />
                <span>Chứng nhận nguồn gốc AGPLv3 bảo chứng pháp lý</span>
              </li>
              <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#10b981", lineHeight: 1.5 }}>
                <Check size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "3px" }} />
                <span style={{ color: "#1e293b" }}>Bảo hành toàn diện & hỗ trợ kỹ thuật ưu tiên</span>
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
              fontWeight: 700,
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
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "28px 24px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              <Building size={16} color="#ff6f3d" />
              <span>DOANH NGHIỆP LỚN</span>
            </div>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a", margin: "14px 0 6px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Lock size={18} color="#64748b" />
              <span>Báo Giá Dự Án Riêng</span>
            </div>
            <div style={{ fontSize: "13px", color: "#64748b", fontWeight: 600, marginBottom: "20px" }}>
              Quy mô: Từ 50 máy trở lên
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#334155", lineHeight: 1.5 }}>
                <Check size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "3px" }} />
                <span><strong>Xuất hồ sơ đỏ pháp lý tài chính</strong></span>
              </li>
              <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#10b981", lineHeight: 1.5 }}>
                <Check size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "3px" }} />
                <span style={{ color: "#334155" }}><strong>IT khảo sát mạng/máy trạm tận nơi</strong></span>
              </li>
              <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#334155", lineHeight: 1.5 }}>
                <Check size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "3px" }} />
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
              e.currentTarget.style.borderColor = "#ff6f3d";
              e.currentTarget.style.color = "#ff6f3d";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#cbd5e1";
              e.currentTarget.style.color = "#1e293b";
            }}
          >
            <PhoneCall size={15} color="#ff6f3d" />
            <span>Tư Vấn Gói Doanh Nghiệp Lớn</span>
          </button>
        </div>
      </div>

      <div
        style={{
          marginTop: "28px",
          padding: "16px 20px",
          backgroundColor: "#ffffff",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
          fontSize: "13.5px",
          color: "#475569",
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "#fff7ed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
          <Info size={16} color="#ff6f3d" />
        </div>
        <span style={{ lineHeight: 1.6 }}>
          <strong style={{ color: "#1e293b" }}>Lưu ý pháp lý thuế:</strong> Sản phẩm bản quyền phần mềm thuộc đối tượng <strong style={{ color: "#ea580c" }}>Không chịu thuế GTGT</strong> theo quy định của Luật Thuế Giá Trị Gia Tăng Việt Nam. Doanh nghiệp được khấu trừ 100% chi phí hợp lý khi quyết toán thuế TNDN.
        </span>
      </div>
    </section>
  );
}
