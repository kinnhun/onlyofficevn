"use client";

import React from "react";
import { Key, Sparkles, Globe, Lock, Gift, CheckCircle2 } from "lucide-react";

interface ExclusivePackageCardProps {
  onOpenModal: (pkgName?: string) => void;
}

export default function ExclusivePackageCard({ onOpenModal }: ExclusivePackageCardProps) {
  return (
    <div
      className="oo-partner-pkg-card"
      style={{
        background: "#ffffff",
        border: "1.5px solid #fed7aa",
        borderRadius: "20px",
        boxShadow: "0 6px 24px rgba(234, 88, 12, 0.08)",
        position: "relative",
        padding: "36px 32px",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div className="oo-partner-pkg-header">
        <div>
          <div className="oo-partner-kicker" style={{ backgroundColor: "#fff7ed", color: "#ea580c", borderColor: "#fed7aa" }}>
            CHƯƠNG TRÌNH ĐỐI TÁC CAO CẤP
          </div>
          <h3 style={{ fontSize: "clamp(22px, 3.5vw, 26px)", fontWeight: 800, color: "#0f172a", margin: "4px 0 6px" }}>
            Gói Khởi Nghiệp Độc Quyền Tuyến
          </h3>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#ea580c" }}>
            200 Key Online Vĩnh Viễn + Bảo Hộ Địa Bàn 1 Năm
          </div>
          <div style={{ fontSize: "13.5px", color: "#64748b", marginTop: "6px", lineHeight: 1.5, maxWidth: "600px" }}>
            Dành cho đại lý muốn phát triển thị trường ONLYOFFICE độc quyền tại khu vực riêng
          </div>
        </div>

        <div className="oo-partner-pkg-badges">
          <span style={{ background: "#fff7ed", color: "#ea580c", border: "1px solid #fed7aa", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Sparkles size={15} color="#ea580c" /> ĐỘC QUYỀN 1 NĂM
          </span>
          <span style={{ background: "#fff7ed", color: "#ea580c", border: "1px solid #fed7aa", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Globe size={15} color="#ea580c" /> TẶNG WEBSITE RIÊNG
          </span>
        </div>
      </div>

      {/* Grid 2 components: Key Online + Ha Tang & Dac Quyen Tuyen */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "18px",
          marginBottom: "24px",
        }}
      >
        {/* Component 1: 200 Key Online */}
        <div
          style={{
            background: "#fffaf5",
            borderRadius: "14px",
            padding: "22px 20px",
            border: "1px solid #fed7aa",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <div style={{ fontSize: "14.5px", fontWeight: 800, color: "#0f172a", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Key size={16} color="#ea580c" />
              <span>200 KEY ONLINE VĨNH VIỄN</span>
            </div>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#ea580c", background: "#ffffff", border: "1px solid #fed7aa", padding: "3px 8px", borderRadius: "6px" }}>
              THEO MAINBOARD
            </span>
          </div>
          <div style={{ fontSize: "12.5px", color: "#64748b", marginBottom: "14px", lineHeight: 1.5 }}>
            Key bản quyền trọn đời theo UUID Mainboard máy tính khách hàng.
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13.5px", color: "#334155" }}>
            <div style={{ display: "flex", gap: "8px", lineHeight: 1.5 }}>
              <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
              <span>Kích hoạt nhanh chóng trên Portal Đại Lý tự động 24/7</span>
            </div>
            <div style={{ display: "flex", gap: "8px", lineHeight: 1.5 }}>
              <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
              <span>Phân quyền tài khoản kỹ thuật viên cài đặt máy dễ dàng</span>
            </div>
            <div style={{ display: "flex", gap: "8px", lineHeight: 1.5 }}>
              <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
              <span>Cấp lại key miễn phí khi khách hàng cài lại hệ điều hành</span>
            </div>
          </div>
        </div>

        {/* Component 2: Ha Tang & Dac Quyen Tuyen */}
        <div
          style={{
            background: "#fffaf5",
            borderRadius: "14px",
            padding: "22px 20px",
            border: "1px solid #fed7aa",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <div style={{ fontSize: "14.5px", fontWeight: 800, color: "#0f172a", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={16} color="#ea580c" />
              <span>HẠ TẦNG & ĐỘC QUYỀN TUYẾN</span>
            </div>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#ea580c", background: "#ffffff", border: "1px solid #fed7aa", padding: "3px 8px", borderRadius: "6px" }}>
              ĐẶC QUYỀN VIP
            </span>
          </div>
          <div style={{ fontSize: "12.5px", color: "#64748b", marginBottom: "14px", lineHeight: 1.5 }}>
            Bảo hộ địa bàn độc quyền và hỗ trợ hạ tầng chuyển giao thương hiệu.
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13.5px", color: "#334155" }}>
            <div style={{ display: "flex", gap: "8px", lineHeight: 1.5 }}>
              <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
              <span>Bảo hộ độc quyền địa bàn: Không mở đại lý khác cùng tuyến</span>
            </div>
            <div style={{ display: "flex", gap: "8px", lineHeight: 1.5 }}>
              <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
              <span>Tặng 01 Landing Page bán hàng chuyên nghiệp gắn tên miền</span>
            </div>
            <div style={{ display: "flex", gap: "8px", lineHeight: 1.5 }}>
              <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
              <span>Chuyển giao khách hàng doanh nghiệp phát sinh tại địa bàn</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Strip */}
      <div
        style={{
          background: "#fffaf5",
          borderRadius: "14px",
          padding: "18px 22px",
          border: "1px solid #fed7aa",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "14px",
          marginBottom: "24px",
        }}
      >
        <div>
          <div style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a" }}>
            Chính Sách Độc Quyền & Hợp Đồng Đại Lý VIP
          </div>
          <div style={{ fontSize: "13px", color: "#64748b", marginTop: "2px" }}>
            Cam kết bảo hộ khu vực bằng văn bản có dấu mộc đỏ pháp lý
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpenModal("Gói Khởi Nghiệp Độc Quyền Tuyến (200 Key Online Vĩnh Viễn)")}
          style={{
            background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
            color: "#ffffff",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: 700,
            fontSize: "14px",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(234, 88, 12, 0.25)",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.2s ease",
          }}
        >
          <Lock size={15} />
          <span>Nhận Báo Giá Gói Độc Quyền</span>
        </button>
      </div>

      {/* 5 Đặc Quyền */}
      <div style={{ background: "#ffffff", borderRadius: "14px", padding: "18px 20px", border: "1px solid #e2e8f0" }}>
        <div style={{ fontSize: "12.5px", fontWeight: 800, color: "#1e293b", marginBottom: "14px", display: "inline-flex", alignItems: "center", gap: "6px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
          <Gift size={16} color="#ea580c" />
          <span>5 ĐẶC QUYỀN ĐỘC QUYỀN TUYẾN KÈM THEO:</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: "10px" }}>
          {[
            { num: "01", title: "Bảo Hộ Độc Quyền", desc: "Cam kết văn bản địa bàn" },
            { num: "02", title: "Thiết Kế Web Riêng", desc: "Tặng Landing Page chuẩn SEO" },
            { num: "03", title: "Bàn Giao Khách Khu Vực", desc: "Chuyển lead doanh nghiệp" },
            { num: "04", title: "Bộ Cài Thương Hiệu", desc: "Tên shop & số điện thoại" },
            { num: "05", title: "Hỗ Trợ Kỹ Sư 1-1", desc: "Xử lý ca phức tạp 24/7" },
          ].map((p, idx) => (
            <div key={idx} style={{ padding: "12px 14px", background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#1e293b" }}>{p.num}. {p.title}</div>
              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "3px", lineHeight: 1.4 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
