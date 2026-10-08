"use client";

import React from "react";
import { Key, ShieldCheck, Award, Lock, Gift, CheckCircle2 } from "lucide-react";

interface StandardPackageCardProps {
  onOpenModal: (pkgName?: string) => void;
}

export default function StandardPackageCard({ onOpenModal }: StandardPackageCardProps) {
  return (
    <div
      className="oo-partner-pkg-card"
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
        position: "relative",
        padding: "36px 32px",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div className="oo-partner-pkg-header">
        <div>
          <div className="oo-partner-kicker">
            CHƯƠNG TRÌNH ĐỐI TÁC TIÊU CHUẨN
          </div>
          <h3 style={{ fontSize: "clamp(22px, 3.5vw, 26px)", fontWeight: 800, color: "#0f172a", margin: "4px 0 6px" }}>
            Gói Đại Lý Tiêu Chuẩn
          </h3>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#ff6f3d" }}>
            200 Key Online Bản Quyền Vĩnh Viễn
          </div>
          <div style={{ fontSize: "13.5px", color: "#64748b", marginTop: "6px", lineHeight: 1.5, maxWidth: "600px" }}>
            Phù hợp cho cửa hàng máy tính & thợ IT khởi động kinh doanh bản quyền bài bản tại khu vực
          </div>
        </div>

        <div className="oo-partner-pkg-badges">
          <span style={{ background: "#f8fafc", color: "#334155", border: "1px solid #e2e8f0", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <ShieldCheck size={15} color="#ff6f3d" /> CHÍNH HÃNG
          </span>
          <span style={{ background: "#f8fafc", color: "#334155", border: "1px solid #e2e8f0", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Award size={15} color="#ff6f3d" /> BẢO HÀNH VĨNH VIỄN
          </span>
        </div>
      </div>

      {/* Grid 2 components: Key Online + He Thong Portal Quan Tri */}
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
            background: "#f8fafc",
            borderRadius: "14px",
            padding: "22px 20px",
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <div style={{ fontSize: "14.5px", fontWeight: 800, color: "#0f172a", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Key size={16} color="#ff6f3d" />
              <span>200 KEY ONLINE VĨNH VIỄN</span>
            </div>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#475569", background: "#ffffff", border: "1px solid #e2e8f0", padding: "3px 8px", borderRadius: "6px" }}>
              PORTAL 24/7
            </span>
          </div>
          <div style={{ fontSize: "12.5px", color: "#64748b", marginBottom: "14px", lineHeight: 1.5 }}>
            Bản quyền vĩnh viễn theo mã phần cứng UUID Mainboard máy tính khách hàng.
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13.5px", color: "#334155" }}>
            <div style={{ display: "flex", gap: "8px", lineHeight: 1.5 }}>
              <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
              <span>Kích hoạt nhanh chóng trong 30 giây trên máy khách</span>
            </div>
            <div style={{ display: "flex", gap: "8px", lineHeight: 1.5 }}>
              <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
              <span>Bản quyền trọn đời không phát sinh phí gia hạn hàng năm</span>
            </div>
            <div style={{ display: "flex", gap: "8px", lineHeight: 1.5 }}>
              <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
              <span>Tương thích hoàn toàn Word, Excel, PowerPoint 100%</span>
            </div>
          </div>
        </div>

        {/* Component 2: Portal Quản Trị Đại Lý 24/7 */}
        <div
          style={{
            background: "#f8fafc",
            borderRadius: "14px",
            padding: "22px 20px",
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <div style={{ fontSize: "14.5px", fontWeight: 800, color: "#0f172a", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <ShieldCheck size={16} color="#ff6f3d" />
              <span>PORTAL QUẢN TRỊ 24/7</span>
            </div>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#475569", background: "#ffffff", border: "1px solid #e2e8f0", padding: "3px 8px", borderRadius: "6px" }}>
              ADMIN RIÊNG
            </span>
          </div>
          <div style={{ fontSize: "12.5px", color: "#64748b", marginBottom: "14px", lineHeight: 1.5 }}>
            Tài khoản Admin riêng: Tự xuất key tức thì, theo dõi tồn kho và cấp lại bản quyền tự động.
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13.5px", color: "#334155" }}>
            <div style={{ display: "flex", gap: "8px", lineHeight: 1.5 }}>
              <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
              <span>Tự động xuất key 24/7 không cần chờ duyệt</span>
            </div>
            <div style={{ display: "flex", gap: "8px", lineHeight: 1.5 }}>
              <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
              <span>Quản lý danh sách máy khách & UUID Mainboard</span>
            </div>
            <div style={{ display: "flex", gap: "8px", lineHeight: 1.5 }}>
              <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
              <span>Cấp lại key miễn phí trọn đời khi máy cài lại Windows</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Strip */}
      <div
        style={{
          background: "#f8fafc",
          borderRadius: "14px",
          padding: "18px 22px",
          border: "1px solid #e2e8f0",
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
            Chính Sách Chiết Khấu Sỉ & Hợp Đồng Đại Lý
          </div>
          <div style={{ fontSize: "13px", color: "#64748b", marginTop: "2px" }}>
            Giá sỉ bảo mật dành riêng cho đại lý — Tối ưu biên lợi nhuận
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpenModal("Gói Đại Lý Tiêu Chuẩn (200 Key Online Vĩnh Viễn)")}
          style={{
            background: "#ff6f3d",
            color: "#ffffff",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: 700,
            fontSize: "14px",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(255, 111, 61, 0.25)",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ea580c")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff6f3d")}
        >
          <Lock size={15} />
          <span>Nhận Báo Giá Gói Này</span>
        </button>
      </div>

      {/* 5 Đặc Quyền */}
      <div style={{ background: "#ffffff", borderRadius: "14px", padding: "18px 20px", border: "1px solid #e2e8f0" }}>
        <div style={{ fontSize: "12.5px", fontWeight: 800, color: "#1e293b", marginBottom: "14px", display: "inline-flex", alignItems: "center", gap: "6px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
          <Gift size={16} color="#ff6f3d" />
          <span>ĐẶC QUYỀN ĐẠI LÝ KÈM THEO:</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: "10px" }}>
          {[
            { num: "01", title: "Chứng Nhận Đại Lý", desc: "Mộc đỏ pháp lý gửi tận nơi" },
            { num: "02", title: "Bộ Cài White-Label", desc: "Tích hợp tên shop / IT" },
            { num: "03", title: "Tặng 03 Key Online", desc: "Nạp Portal dùng thử" },
            { num: "04", title: "Kho Marketing VIP", desc: "Banner, video & content bài bản" },
            { num: "05", title: "Chứng Nhận Khách Hàng", desc: "Xuất theo UUID thiết bị" },
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
