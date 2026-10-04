"use client";

import React from "react";
import { Key, Sparkles, Globe, Lock, Gift, CheckCircle2 } from "lucide-react";

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
            200 Key Online Vĩnh Viễn + Đặc Quyền Tuyến 1 Năm
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

      {/* Grid 2 components: Key Online + Ha Tang & Dac Quyen Tuyen */}
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
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#ea580c" /> Key bản quyền vĩnh viễn theo UUID Mainboard máy tính</div>
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#ea580c" /> Kích hoạt nhanh chóng trên Portal Đại Lý tự động 24/7</div>
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#ea580c" /> Dễ dàng cập nhật và phân quyền nhân viên kỹ thuật IT</div>
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

        {/* Component 2: Đặc Quyền Tuyến & Hạ Tầng Số Riêng */}
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
              <Globe size={18} />
              <span>HẠ TẦNG SỐ & ĐẶC QUYỀN ĐỊA BÀN</span>
            </div>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#b45309", background: "#fef3c7", padding: "3px 8px", borderRadius: "4px" }}>
              ĐỘC QUYỀN 100%
            </span>
          </div>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#475569", marginBottom: "14px" }}>
            HỢP ĐỒNG MỘC ĐỎ & BẢN QUYỀN KHU VỰC
          </div>

          {/* Exclusive Area Infrastructure Preview Box */}
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
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#ea580c" }}>Cam Kết Độc Quyền Tuyến</span>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#c2410c", background: "#ffedd5", padding: "2px 6px", borderRadius: "4px" }}>Bảo Vệ Thị Phần</span>
            </div>
            <div style={{ fontSize: "12px", color: "#64748b", lineHeight: 1.5 }}>
              Cam kết không mở đại lý thứ 2 cùng tuyến, bàn giao website riêng và chuyển giao toàn bộ đơn khách lẻ phát sinh trong khu vực.
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", color: "#334155" }}>
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#ea580c" /> Hợp đồng độc quyền phân phối 1 năm mộc đỏ pháp lý</div>
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#ea580c" /> Tặng website bán lẻ gắn Domain riêng .COM + Hosting 10GB</div>
            <div style={{ display: "flex", gap: "6px" }}><CheckCircle2 size={16} color="#ea580c" /> Chuyển giao 100% data khách hàng lẻ phát sinh trong khu vực</div>
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
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#9a3412" }}>Hạ tầng & Độc quyền:</span>
            <span style={{ fontSize: "12px", fontWeight: 800, color: "#ea580c", background: "#ffedd5", padding: "4px 8px", borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <Sparkles size={12} /> Bàn giao trọn gói
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
            { num: "04", title: "Tặng Thêm 10 Key Online", desc: "Bán lẻ thu hồi vốn & lợi nhuận trực tiếp" },
            { num: "05", title: "Kho Marketing VIP Hàng Tuần", desc: "Hình ảnh • Video • Content • File thiết kế in ấn" },
            { num: "06", title: "Chứng Nhận Cho Khách", desc: "Hỗ trợ xuất chứng nhận theo từng máy (Key-UUID)" },
            { num: "07", title: "Chứng Nhận Đại Lý Khung Kính", desc: "Mộc đỏ • Đóng khung kính gửi bưu phẩm tận nơi" },
            { num: "08", title: "Hỗ Trợ Kỹ Thuật VIP 24/7", desc: "Kênh hỗ trợ kỹ thuật 1-1 và đào tạo chuyển giao phần mềm" },
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
