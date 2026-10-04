"use client";

import React from "react";
import { Key, ShieldCheck, Award, Lock, Gift, CheckCircle2 } from "lucide-react";

interface StandardPackageCardProps {
  onOpenModal: (pkgName?: string) => void;
}

export default function StandardPackageCard({ onOpenModal }: StandardPackageCardProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "24px",
        border: "2px solid #fed7aa",
        boxShadow: "0 12px 36px rgba(234, 88, 12, 0.08)",
        padding: "36px",
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          borderBottom: "1px solid #fed7aa",
          paddingBottom: "20px",
          marginBottom: "28px",
        }}
      >
        <div>
          <div style={{ fontSize: "12px", fontWeight: 800, color: "#ea580c", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            CHƯƠNG TRÌNH ĐỐI TÁC & ĐẠI LÝ
          </div>
          <h3 style={{ fontSize: "30px", fontWeight: 900, color: "#1e293b", margin: "6px 0 4px" }}>
            GÓI ĐẠI LÝ TIÊU CHUẨN
          </h3>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#ea580c" }}>
            200 Key Online Bản Quyền Vĩnh Viễn
          </div>
          <div style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>
            Dành cho cửa hàng máy tính & thợ IT khởi động kinh doanh bản quyền bài bản tại khu vực
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <span style={{ background: "#fff7ed", color: "#ea580c", border: "1px solid #fed7aa", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <ShieldCheck size={14} color="#ff6f3d" /> SẢN PHẨM CHÍNH HÃNG
          </span>
          <span style={{ background: "#fff7ed", color: "#ea580c", border: "1px solid #fed7aa", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <Award size={14} color="#ff6f3d" /> BẢO HÀNH VĨNH VIỄN
          </span>
        </div>
      </div>

      {/* Grid 2 components: Key Online + He Thong Portal Quan Tri */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          marginBottom: "28px",
        }}
      >
        {/* Component 1: 200 Key Online */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #fed7aa",
            boxShadow: "0 4px 12px rgba(234, 88, 12, 0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <div style={{ fontSize: "17px", fontWeight: 800, color: "#ea580c", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Key size={18} color="#ff6f3d" />
              <span>200 KEY ONLINE VĨNH VIỄN</span>
            </div>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#ea580c", background: "#fff7ed", border: "1px solid #fed7aa", padding: "3px 8px", borderRadius: "4px" }}>
              PORTAL 24/7
            </span>
          </div>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#475569", marginBottom: "14px" }}>
            ONLYOFFICE | KEY ONLINE VĨNH VIỄN THEO MAINBOARD
          </div>

          <div
            style={{
              background: "#fffaf5",
              border: "1px dashed #fed7aa",
              borderRadius: "8px",
              padding: "12px",
              fontSize: "12px",
              marginBottom: "16px",
              fontFamily: "monospace",
            }}
          >
            <div style={{ color: "#ea580c", fontWeight: 700, marginBottom: "4px" }}>
              XXXX - XXXX - XXXX - XXXX
            </div>
            <div style={{ color: "#64748b" }}>
              Kích hoạt tự động theo mã phần cứng UUID Mainboard máy tính khách hàng
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", color: "#334155" }}>
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#ff6f3d" /> Kích hoạt nhanh chóng trong 30 giây trên máy khách</div>
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#ff6f3d" /> Bản quyền trọn đời không phát sinh phí gia hạn hàng năm</div>
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#ff6f3d" /> Tương thích hoàn toàn Word, Excel, PowerPoint 100%</div>
          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "12px",
              background: "#fff7ed",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #ffedd5",
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#7c2d12" }}>Đơn giá sỉ đại lý:</span>
            <span style={{ fontSize: "12px", fontWeight: 800, color: "#c2410c", background: "#ffedd5", padding: "4px 8px", borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <Lock size={12} /> Giá sỉ bảo mật
            </span>
          </div>
        </div>

        {/* Component 2: Portal Quản Trị Đại Lý 24/7 */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #fed7aa",
            boxShadow: "0 4px 12px rgba(234, 88, 12, 0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <div style={{ fontSize: "17px", fontWeight: 800, color: "#ea580c", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <ShieldCheck size={18} color="#ff6f3d" />
              <span>PORTAL QUẢN TRỊ 24/7</span>
            </div>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#c2410c", background: "#ffedd5", padding: "3px 8px", borderRadius: "4px" }}>
              ADMIN RIÊNG
            </span>
          </div>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#475569", marginBottom: "14px" }}>
            HỆ THỐNG XUẤT KEY CHỦ ĐỘNG & BẢO HÀNH TỰ ĐỘNG
          </div>

          {/* Portal Interface Dashboard Preview Box */}
          <div
            style={{
              background: "#fffaf5",
              border: "1px solid #fed7aa",
              borderRadius: "10px",
              padding: "14px",
              marginBottom: "16px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", borderBottom: "1px solid #fed7aa", paddingBottom: "6px" }}>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#ea580c" }}>Portal Đại Lý Mercy Tech</span>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#16a34a", background: "#dcfce7", padding: "2px 6px", borderRadius: "4px" }}>● Trực tuyến 24/7</span>
            </div>
            <div style={{ fontSize: "12px", color: "#64748b", lineHeight: 1.5 }}>
              Tài khoản Admin riêng: Tự xuất key tức thì, theo dõi tồn kho và cấp lại bản quyền tự động khi khách cài lại Windows.
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", color: "#334155" }}>
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#ff6f3d" /> Tự động xuất key 24/7 không cần chờ duyệt</div>
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#ff6f3d" /> Quản lý danh sách máy khách & UUID Mainboard</div>
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#ff6f3d" /> Cấp lại key miễn phí trọn đời khi máy cài lại Win</div>
          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "12px",
              background: "#fff7ed",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #ffedd5",
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#7c2d12" }}>Hạ tầng Portal:</span>
            <span style={{ fontSize: "12px", fontWeight: 800, color: "#c2410c", background: "#ffedd5", padding: "4px 8px", borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <Award size={12} /> Tặng kèm trọn đời
            </span>
          </div>
        </div>
      </div>

      {/* Financial Strip - Primary Orange Gradient */}
      <div
        style={{
          background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
          borderRadius: "16px",
          padding: "24px 28px",
          color: "#ffffff",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          alignItems: "center",
          marginBottom: "28px",
          boxShadow: "0 6px 20px rgba(234, 88, 12, 0.25)",
        }}
      >
        <div>
          <div style={{ fontSize: "11px", color: "#ffedd5", fontWeight: 700, textTransform: "uppercase" }}>TỔNG ĐẦU TƯ GÓI</div>
          <div style={{ fontSize: "18px", fontWeight: 800, color: "#fef08a", marginTop: "4px" }}>
            Liên hệ để lấy chính sách
          </div>
        </div>

        <div>
          <div style={{ fontSize: "11px", color: "#ffedd5", fontWeight: 700, textTransform: "uppercase" }}>GIÁ TRỊ BÁN LẺ DỰ KIẾN</div>
          <div style={{ fontSize: "17px", fontWeight: 800, color: "#fef08a", marginTop: "4px" }}>
            Liên hệ nhận chính sách
          </div>
        </div>

        <div>
          <div style={{ fontSize: "11px", color: "#ffedd5", fontWeight: 700, textTransform: "uppercase" }}>LỢI NHUẬN SO VỚI VỐN</div>
          <div style={{ fontSize: "17px", fontWeight: 800, color: "#ffffff", marginTop: "4px" }}>
            Biên độ lợi nhuận tối đa
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => onOpenModal("Gói Đại Lý Tiêu Chuẩn (200 Key Online Vĩnh Viễn)")}
            style={{
              background: "#ffffff",
              color: "#c2410c",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              fontWeight: 800,
              fontSize: "14px",
              cursor: "pointer",
              width: "100%",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Lock size={15} />
            <span>Nhận Báo Giá Gói Này</span>
          </button>
        </div>
      </div>

      {/* 5 Đặc Quyền */}
      <div style={{ background: "#ffffff", borderRadius: "16px", padding: "20px 24px", border: "1px solid #fed7aa" }}>
        <div style={{ fontSize: "15px", fontWeight: 800, color: "#7c2d12", marginBottom: "14px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <Gift size={18} color="#ff6f3d" />
          <span>ĐẦU TƯ 1 GÓI — NHẬN TRỌN BỘ 5 ĐẶC QUYỀN ĐẠI LÝ:</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
          {[
            { num: "01", title: "Chứng Nhận Đại Lý", desc: "Mộc đỏ • Đóng khung kính • Gửi bưu phẩm tận nơi" },
            { num: "02", title: "Bộ Cài White-Label", desc: "Tích hợp Logo • Tên shop • Bảo vệ tệp khách" },
            { num: "03", title: "Tặng 03 Key Online", desc: "Nạp Portal đại lý • Hỗ trợ hoàn vốn ngay khi bán lẻ" },
            { num: "04", title: "Kho Marketing VIP", desc: "Hình ảnh • Video • Content đăng bài cập nhật mới" },
            { num: "05", title: "Chứng Nhận Cho Khách", desc: "Hỗ trợ xuất chứng nhận theo từng thiết bị/UUID" },
          ].map((p, idx) => (
            <div key={idx} style={{ padding: "10px 12px", background: "#fffaf5", borderRadius: "8px", borderLeft: "3px solid #ff6f3d" }}>
              <div style={{ fontSize: "12px", fontWeight: 800, color: "#ea580c" }}>{p.num}. {p.title}</div>
              <div style={{ fontSize: "11.5px", color: "#64748b", marginTop: "3px", lineHeight: 1.4 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
