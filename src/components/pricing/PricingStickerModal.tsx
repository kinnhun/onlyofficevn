"use client";

import React from "react";
import { X, ShieldCheck, QrCode, Sparkles } from "lucide-react";

interface PricingStickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingStickerModal({ isOpen, onClose }: PricingStickerModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(15, 23, 42, 0.85)",
        backdropFilter: "blur(6px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          maxWidth: "800px",
          width: "100%",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.4)",
          position: "relative",
          border: "2px solid #003b8e",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #002b66 0%, #003b8e 100%)",
            color: "#ffffff",
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: "16px", fontWeight: 900, letterSpacing: "0.4px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={18} color="#facc15" />
              <span>MẪU TEM CÀO VẬT LÝ HOLOGRAM 7 MÀU THỰC TẾ</span>
            </div>
            <div style={{ fontSize: "12px", color: "#cbd5e1", marginTop: "2px" }}>
              Bản quyền trọn đời theo máy • Tối ưu bởi CÔNG TY TNHH CÔNG NGHỆ MERCY
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body: High Res Image */}
        <div style={{ padding: "24px", textAlign: "center", backgroundColor: "#f8fafc" }}>
          <img
            src="/tem-onlyoffice-mercy-tech.png"
            alt="Chi tiết mẫu tem OnlyOffice tối ưu bởi Mercy Tech"
            style={{
              width: "100%",
              maxHeight: "480px",
              objectFit: "contain",
              borderRadius: "12px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
              backgroundColor: "#ffffff",
            }}
          />

          {/* Info Badges */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "12px",
              marginTop: "20px",
              textAlign: "left",
            }}
          >
            <div style={{ background: "#ffffff", padding: "10px 14px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 600 }}>Mã Seri chuẩn:</div>
              <div style={{ fontSize: "13px", color: "#003b8e", fontWeight: 800 }}>MT-0319227767-0001</div>
            </div>
            <div style={{ background: "#ffffff", padding: "10px 14px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 600 }}>Công nghệ chống giả:</div>
              <div style={{ fontSize: "13px", color: "#ea580c", fontWeight: 800 }}>Hologram 7 màu phản quang</div>
            </div>
            <div style={{ background: "#ffffff", padding: "10px 14px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 600 }}>Lớp bảo mật:</div>
              <div style={{ fontSize: "13px", color: "#16a34a", fontWeight: 800 }}>Vùng phủ cào chống soi xuyên</div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: "14px 24px",
            backgroundColor: "#ffffff",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "12px", color: "#64748b" }}>
            Đại lý nhận trực tiếp tem vật lý nguyên seal gửi chuyển phát nhanh tận nơi
          </span>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "#003b8e",
              color: "#ffffff",
              border: "none",
              padding: "8px 20px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
