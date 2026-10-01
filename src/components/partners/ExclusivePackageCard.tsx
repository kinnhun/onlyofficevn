"use client";

import React from "react";
import { Key, Tag, Sparkles, Globe, Lock, Gift, CheckCircle2 } from "lucide-react";

interface ExclusivePackageCardProps {
  onOpenModal: (pkgName?: string) => void;
}

export default function ExclusivePackageCard({ onOpenModal }: ExclusivePackageCardProps) {
  return (
    <div
      style={{
        background: "linear-gradient(145deg, #ffffff 0%, #fff7ed 100%)",
        borderRadius: "24px",
        border: "2px solid #ea580c",
        boxShadow: "0 12px 36px rgba(234, 88, 12, 0.12)",
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
            CHƯƠNG TRÌNH ĐỐI TÁC CAO CẤP
          </div>
          <h3 style={{ fontSize: "30px", fontWeight: 900, color: "#9a3412", margin: "6px 0 4px" }}>
            GÓI KHỞI NGHIỆP ĐỘC QUYỀN TUYẾN
          </h3>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#ea580c" }}>
            200 Key Online + 500 Tem Cào Vật Lý Hologram 7 Màu
          </div>
          <div style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>
            Dành cho đại lý muốn triển khai kinh doanh ONLYOFFICE bài bản tại khu vực độc quyền riêng
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <span style={{ background: "#fed7aa", color: "#9a3412", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <Sparkles size={14} /> ĐỘC QUYỀN TUYẾN 1 NĂM
          </span>
          <span style={{ background: "#fed7aa", color: "#9a3412", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <Globe size={14} /> TẶNG WEBSITE RIÊNG
          </span>
        </div>
      </div>

      {/* Grid 2 components: Key Online + 500 Tem Cào */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          marginBottom: "28px",
        }}
      >
        {/* 200 Key Online */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #fed7aa",
            boxShadow: "0 4px 12px rgba(234, 88, 12, 0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <div style={{ fontSize: "17px", fontWeight: 800, color: "#c2410c", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Key size={18} />
              <span>200 KEY ONLINE VĨNH VIỄN</span>
            </div>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#ea580c", background: "#fff7ed", padding: "3px 8px", borderRadius: "4px" }}>
              THEO THIẾT BỊ
            </span>
          </div>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#475569", marginBottom: "14px" }}>
            KÍCH HOẠT NHANH TRÊN PORTAL ĐẠI LÝ
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", color: "#334155" }}>
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#ea580c" /> Key bản quyền vĩnh viễn theo thiết bị máy tính</div>
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#ea580c" /> Kích hoạt nhanh chóng trên Portal Đại Lý</div>
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#ea580c" /> Dễ dàng cập nhật và phân quyền nhân viên IT</div>
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
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#9a3412" }}>Đơn giá sỉ đại lý:</span>
            <span style={{ fontSize: "12px", fontWeight: 800, color: "#dc2626", background: "#fee2e2", padding: "4px 8px", borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <Lock size={12} /> Giá sỉ bảo mật
            </span>
          </div>
        </div>

        {/* 500 Tem Cào */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #fed7aa",
            boxShadow: "0 4px 12px rgba(234, 88, 12, 0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <div style={{ fontSize: "17px", fontWeight: 800, color: "#c2410c", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Tag size={18} />
              <span>500 TEM CÀO VẬT LÝ</span>
            </div>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#b45309", background: "#fef3c7", padding: "3px 8px", borderRadius: "4px" }}>
              SỐ LƯỢNG LỚN
            </span>
          </div>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#475569", marginBottom: "14px" }}>
            TEM CHÍNH HÃNG ONLYOFFICE HOLOGRAM 7 MÀU
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", color: "#334155" }}>
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#ea580c" /> Tem chính hãng ONLYOFFICE chống giả cao cấp</div>
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#ea580c" /> Tăng độ tin cậy và giá trị khi bán kèm máy ráp mới</div>
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#ea580c" /> Dễ dàng phân phối sỉ lẻ tại địa bàn độc quyền</div>
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
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#9a3412" }}>Đơn giá tem sỉ số lượng:</span>
            <span style={{ fontSize: "12px", fontWeight: 800, color: "#dc2626", background: "#fee2e2", padding: "4px 8px", borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <Lock size={12} /> Giá sỉ bảo mật
            </span>
          </div>
        </div>
      </div>

      {/* Financial Strip */}
      <div
        style={{
          background: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
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
          <div style={{ fontSize: "11px", color: "#ffedd5", fontWeight: 700, textTransform: "uppercase" }}>TỔNG ĐẦU TƯ GÓI</div>
          <div style={{ fontSize: "18px", fontWeight: 800, color: "#fef08a", marginTop: "4px" }}>
            Liên hệ để lấy chính sách
          </div>
        </div>

        <div>
          <div style={{ fontSize: "11px", color: "#ffedd5", fontWeight: 700, textTransform: "uppercase" }}>GIÁ TRỊ BÁN LẺ DỰ KIẾN</div>
          <div style={{ fontSize: "20px", fontWeight: 900, color: "#fef08a", marginTop: "4px" }}>
            539,3 – 759,3 TRIỆU
          </div>
        </div>

        <div>
          <div style={{ fontSize: "11px", color: "#ffedd5", fontWeight: 700, textTransform: "uppercase" }}>LỢI NHUẬN SO VỚI VỐN</div>
          <div style={{ fontSize: "22px", fontWeight: 900, color: "#ffffff", marginTop: "4px" }}>
            +445 – 665 TRIỆU
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => onOpenModal("Gói Khởi Nghiệp Độc Quyền Tuyến")}
            style={{
              background: "#ffffff",
              color: "#c2410c",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              fontWeight: 900,
              fontSize: "14px",
              cursor: "pointer",
              width: "100%",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <Lock size={15} />
            <span>Nhận Báo Giá Độc Quyền</span>
          </button>
        </div>
      </div>

      {/* 8 Đặc Quyền VIP */}
      <div style={{ background: "#ffffff", borderRadius: "16px", padding: "20px 24px", border: "1px solid #fed7aa" }}>
        <div style={{ fontSize: "15px", fontWeight: 800, color: "#9a3412", marginBottom: "14px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <Gift size={18} color="#ea580c" />
          <span>ĐẦU TƯ 1 GÓI — NHẬN TRỌN BỘ 8 ĐẶC QUYỀN ĐẠI LÝ VIP:</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
          {[
            { num: "01", title: "Độc Quyền Tuyến 1 Năm", desc: "Hợp đồng mộc đỏ • Không cấp đại lý thứ 2 cùng tuyến" },
            { num: "02", title: "Website + Domain + Hosting", desc: "Tặng .COM + Hosting 10GB năm đầu (Trị giá 10.8tr)" },
            { num: "03", title: "Bộ Cài White-Label Riêng", desc: "Logo • Tên shop • Hotline đại lý bảo vệ tệp khách" },
            { num: "04", title: "Tặng Thêm 10 Key Online", desc: "Bán lẻ thu ngay 5 - 8 triệu tiền mặt" },
            { num: "05", title: "Kho Marketing VIP Hàng Tuần", desc: "Hình ảnh • Video • Content • File thiết kế in ấn" },
            { num: "06", title: "Chứng Nhận Cho Khách", desc: "Hỗ trợ xuất chứng nhận theo từng máy (Key-UUID)" },
            { num: "07", title: "Chứng Nhận Đại Lý Khung Kính", desc: "Mộc đỏ • Đóng khung kính gửi bưu phẩm tận nơi" },
            { num: "08", title: "Trợ Giá Microsoft Box", desc: "Giảm 100k - 200k/hộp Win Pro USB FPP & Office 2024" },
          ].map((p, idx) => (
            <div key={idx} style={{ padding: "10px 12px", background: "#fff7ed", borderRadius: "8px", borderLeft: "3px solid #ea580c" }}>
              <div style={{ fontSize: "12px", fontWeight: 800, color: "#ea580c" }}>{p.num}. {p.title}</div>
              <div style={{ fontSize: "11.5px", color: "#64748b", marginTop: "3px", lineHeight: 1.4 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
