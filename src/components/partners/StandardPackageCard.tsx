"use client";

import React from "react";
import { Key, Tag, ShieldCheck, Award, Lock, Gift, CheckCircle2 } from "lucide-react";

interface StandardPackageCardProps {
  onOpenModal: (pkgName?: string) => void;
}

export default function StandardPackageCard({ onOpenModal }: StandardPackageCardProps) {
  return (
    <div
      style={{
        background: "linear-gradient(145deg, #ffffff 0%, #f0f7ff 100%)",
        borderRadius: "24px",
        border: "2px solid #3b82f6",
        boxShadow: "0 12px 36px rgba(59, 130, 246, 0.1)",
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
          borderBottom: "1px solid #dbeafe",
          paddingBottom: "20px",
          marginBottom: "28px",
        }}
      >
        <div>
          <div style={{ fontSize: "12px", fontWeight: 800, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            CHƯƠNG TRÌNH ĐỐI TÁC & ĐẠI LÝ
          </div>
          <h3 style={{ fontSize: "30px", fontWeight: 900, color: "#1e3a8a", margin: "6px 0 4px" }}>
            GÓI ĐẠI LÝ TIÊU CHUẨN
          </h3>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#2563eb" }}>
            200 Key Online + 50 Tem Cào Vật Lý Hologram 7 Màu
          </div>
          <div style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>
            Dành cho cửa hàng máy tính & thợ IT khởi động kinh doanh bản quyền bài bản tại khu vực
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <span style={{ background: "#dbeafe", color: "#1e40af", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <ShieldCheck size={14} /> SẢN PHẨM CHÍNH HÃNG
          </span>
          <span style={{ background: "#dbeafe", color: "#1e40af", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <Award size={14} /> BẢO HÀNH VĨNH VIỄN
          </span>
        </div>
      </div>

      {/* Grid 2 components: Key Online + Tem Cào */}
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
            border: "1px solid #bfdbfe",
            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <div style={{ fontSize: "17px", fontWeight: 800, color: "#1d4ed8", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Key size={18} />
              <span>200 KEY ONLINE</span>
            </div>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#2563eb", background: "#eff6ff", padding: "3px 8px", borderRadius: "4px" }}>
              PORTAL 24/7
            </span>
          </div>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#475569", marginBottom: "14px" }}>
            ONLYOFFICE | KEY ONLINE VĨNH VIỄN
          </div>

          <div
            style={{
              background: "#f8fafc",
              border: "1px dashed #93c5fd",
              borderRadius: "8px",
              padding: "12px",
              fontSize: "12px",
              marginBottom: "16px",
              fontFamily: "monospace",
            }}
          >
            <div style={{ color: "#2563eb", fontWeight: 700, marginBottom: "4px" }}>
              XXXX - XXXX - XXXX - XXXX
            </div>
            <div style={{ color: "#64748b" }}>
              Quản lý tập trung trên Portal Đại Lý (Kích hoạt nhanh chóng • Dễ dàng theo dõi)
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", color: "#334155" }}>
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#2563eb" /> Kích hoạt nhanh chóng trên máy khách</div>
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#2563eb" /> Quản lý tập trung trên Portal đại lý</div>
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#2563eb" /> Dễ dàng cập nhật và theo dõi hạn mức</div>
          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "12px",
              background: "#eff6ff",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#1e40af" }}>Đơn giá sỉ đại lý:</span>
            <span style={{ fontSize: "12px", fontWeight: 800, color: "#dc2626", background: "#fee2e2", padding: "4px 8px", borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <Lock size={12} /> Giá sỉ bảo mật
            </span>
          </div>
        </div>

        {/* Component 2: 50 Tem Cào Hologram */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #bfdbfe",
            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <div style={{ fontSize: "17px", fontWeight: 800, color: "#1d4ed8", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Tag size={18} />
              <span>50 TEM CÀO VẬT LÝ</span>
            </div>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#d97706", background: "#fef3c7", padding: "3px 8px", borderRadius: "4px" }}>
              HOLOGRAM 7 MÀU
            </span>
          </div>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#475569", marginBottom: "14px" }}>
            TEM CHÍNH HÃNG ONLYOFFICE BY MERCY TECH
          </div>

          {/* Real High-Res Hologram Scratch Sticker Image */}
          <div
            style={{
              position: "relative",
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: "16px",
              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)",
              border: "1px solid #cbd5e1",
              backgroundColor: "#ffffff",
            }}
          >
            <img
              src="/tem-onlyoffice-mercy-tech.png"
              alt="Mẫu tem cào vật lý 7 màu Hologram OnlyOffice tối ưu bởi Mercy Tech"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "contain",
              }}
            />
            <div
              style={{
                padding: "6px 10px",
                backgroundColor: "#f8fafc",
                borderTop: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "10.5px",
                color: "#475569",
                fontWeight: 600,
              }}
            >
              <span style={{ color: "#ea580c", fontWeight: 700 }}>✨ Tem cào Hologram 7 màu</span>
              <span style={{ color: "#1d4ed8", fontWeight: 700 }}>Seri & Vùng phủ cào</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", color: "#334155" }}>
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#2563eb" /> Tem cào Hologram 7 màu chống giả</div>
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#2563eb" /> Bản quyền vĩnh viễn theo mainboard</div>
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#2563eb" /> Dễ dàng phân phối, bán kèm máy mới</div>
          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "12px",
              background: "#eff6ff",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#1e40af" }}>Đơn giá tem sỉ:</span>
            <span style={{ fontSize: "12px", fontWeight: 800, color: "#dc2626", background: "#fee2e2", padding: "4px 8px", borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <Lock size={12} /> Giá sỉ bảo mật
            </span>
          </div>
        </div>
      </div>

      {/* Financial Strip */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
          borderRadius: "16px",
          padding: "24px 28px",
          color: "#ffffff",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          alignItems: "center",
          marginBottom: "28px",
        }}
      >
        <div>
          <div style={{ fontSize: "11px", color: "#93c5fd", fontWeight: 700, textTransform: "uppercase" }}>TỔNG ĐẦU TƯ GÓI</div>
          <div style={{ fontSize: "18px", fontWeight: 800, color: "#fde047", marginTop: "4px" }}>
            Liên hệ để lấy chính sách
          </div>
        </div>

        <div>
          <div style={{ fontSize: "11px", color: "#93c5fd", fontWeight: 700, textTransform: "uppercase" }}>GIÁ TRỊ BÁN LẺ DỰ KIẾN</div>
          <div style={{ fontSize: "20px", fontWeight: 900, color: "#6ee7b7", marginTop: "4px" }}>
            134,7 – 209,75 TRIỆU
          </div>
        </div>

        <div>
          <div style={{ fontSize: "11px", color: "#93c5fd", fontWeight: 700, textTransform: "uppercase" }}>LỢI NHUẬN SO VỚI VỐN</div>
          <div style={{ fontSize: "22px", fontWeight: 900, color: "#facc15", marginTop: "4px" }}>
            +100 – 175 TRIỆU
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => onOpenModal("Gói Đại Lý Tiêu Chuẩn (200 Key + 50 Tem)")}
            style={{
              background: "#ff6f3d",
              color: "#ffffff",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              fontWeight: 800,
              fontSize: "14px",
              cursor: "pointer",
              width: "100%",
              boxShadow: "0 4px 12px rgba(255, 111, 61, 0.4)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <Lock size={15} />
            <span>Nhận Báo Giá Gói Này</span>
          </button>
        </div>
      </div>

      {/* 5 Đặc Quyền */}
      <div style={{ background: "#ffffff", borderRadius: "16px", padding: "20px 24px", border: "1px solid #bfdbfe" }}>
        <div style={{ fontSize: "15px", fontWeight: 800, color: "#1e3a8a", marginBottom: "14px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <Gift size={18} color="#2563eb" />
          <span>ĐẦU TƯ 1 GÓI — NHẬN TRỌN BỘ 5 ĐẶC QUYỀN ĐẠI LÝ:</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
          {[
            { num: "01", title: "Chứng Nhận Đại Lý", desc: "Mộc đỏ • Đóng khung kính • Gửi bưu phẩm tận nơi" },
            { num: "02", title: "Bộ Cài White-Label", desc: "Tích hợp Logo • Tên shop • Bảo vệ tệp khách" },
            { num: "03", title: "Tặng 03 Key Online", desc: "Nạp Portal đại lý • Thu ngay 1.5 - 2.4 triệu tiền mặt" },
            { num: "04", title: "Kho Marketing VIP", desc: "Hình ảnh • Video • Content đăng bài cập nhật mới" },
            { num: "05", title: "Chứng Nhận Cho Khách", desc: "Hỗ trợ xuất chứng nhận theo từng thiết bị/UUID" },
          ].map((p, idx) => (
            <div key={idx} style={{ padding: "10px 12px", background: "#f8fafc", borderRadius: "8px", borderLeft: "3px solid #3b82f6" }}>
              <div style={{ fontSize: "12px", fontWeight: 800, color: "#2563eb" }}>{p.num}. {p.title}</div>
              <div style={{ fontSize: "11.5px", color: "#64748b", marginTop: "3px", lineHeight: 1.4 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
