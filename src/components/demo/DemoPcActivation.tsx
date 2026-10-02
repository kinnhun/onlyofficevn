"use client";

import React, { useState } from "react";
import { Download, HelpCircle, X, CheckCircle2, ShieldCheck, Terminal } from "lucide-react";

export default function DemoPcActivation() {
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <section id="demo-pc" style={{ padding: "40px 20px 20px" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "linear-gradient(135deg, #ffffff 0%, #fffbf7 60%, #fff7ed 100%)",
          borderRadius: "24px",
          border: "1.5px solid #fed7aa",
          padding: "36px 32px",
          boxShadow: "0 10px 30px rgba(234, 88, 12, 0.06)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
            alignItems: "center",
          }}
        >
          {/* Left Text */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                borderRadius: "20px",
                backgroundColor: "#fff7ed",
                border: "1px solid #fed7aa",
                fontSize: "11.5px",
                fontWeight: 800,
                color: "#ea580c",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "12px",
              }}
            >
              <Download size={13} color="#ea580c" />
              <span>DÙNG THỬ 7 NGÀY TRÊN MÁY TÍNH</span>
            </div>

            <h2
              style={{
                fontSize: "26px",
                fontWeight: 800,
                color: "#1e293b",
                margin: "0 0 10px",
                lineHeight: 1.3,
              }}
            >
              Tải Công Cụ Kích Hoạt Dùng Thử 7 Ngày (Tự Động 1-Click)
            </h2>

            <p
              style={{
                fontSize: "14px",
                color: "#64748b",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Tự động cài đặt OnlyOffice chính hãng (nếu máy tính chưa có) và tiêm bản quyền dùng thử 7 ngày đầy đủ tính năng Enterprise cùng 3 Plugin dịch thuật & AI tối ưu bởi Mercy Tech!
            </p>
          </div>

          {/* Right Action Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {/* 1-Click BAT Download */}
            <a
              href="/Kich-Hoat-Demo-OnlyOffice-Mercy.bat"
              download="Kich-Hoat-Demo-OnlyOffice-Mercy.bat"
              style={{
                background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                color: "#ffffff",
                padding: "14px 24px",
                borderRadius: "12px",
                fontWeight: 800,
                fontSize: "14px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                boxShadow: "0 4px 14px rgba(234, 88, 12, 0.35)",
                transition: "all 0.2s ease",
                cursor: "pointer",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(234, 88, 12, 0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(234, 88, 12, 0.35)";
              }}
              title="Tải trực tiếp 1 file .bat duy nhất (1-Click, không cần giải nén)"
            >
              <Download size={18} />
              <span>TẢI CÔNG CỤ KÍCH HOẠT (1-CLICK .BAT)</span>
            </a>

            {/* Secondary Buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <a
                href="/Kich-Hoat-Demo-OnlyOffice-Mercy.bat"
                download="Kich-Hoat-Demo-OnlyOffice-Mercy.bat"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#334155",
                  border: "1px solid #cbd5e1",
                  borderRadius: "10px",
                  padding: "10px",
                  fontSize: "12.5px",
                  fontWeight: 700,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  transition: "all 0.2s ease",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#ff6f3d";
                  e.currentTarget.style.color = "#ea580c";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#cbd5e1";
                  e.currentTarget.style.color = "#334155";
                }}
              >
                <Download size={14} color="#ea580c" />
                <span>TẢI DỰ PHÒNG</span>
              </a>

              <button
                type="button"
                onClick={() => setGuideOpen(true)}
                style={{
                  backgroundColor: "#ffffff",
                  color: "#334155",
                  border: "1px solid #cbd5e1",
                  borderRadius: "10px",
                  padding: "10px",
                  fontSize: "12.5px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#ff6f3d";
                  e.currentTarget.style.color = "#ea580c";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#cbd5e1";
                  e.currentTarget.style.color = "#334155";
                }}
              >
                <HelpCircle size={14} color="#ea580c" />
                <span>HƯỚNG DẪN</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Modal */}
      {guideOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 23, 42, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 1000,
          }}
          onClick={() => setGuideOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "28px",
              maxWidth: "520px",
              width: "100%",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1e293b", margin: 0 }}>
                Hướng Dẫn Chạy Công Cụ Kích Hoạt 1-Click
              </h3>
              <button
                type="button"
                onClick={() => setGuideOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "13.5px", color: "#475569" }}>
              <div style={{ display: "flex", gap: "10px" }}>
                <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#ea580c", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0, fontSize: "12px" }}>1</span>
                <div>
                  <strong>Tải file .BAT về máy:</strong> Bấm nút <em>"TẢI CÔNG CỤ KÍCH HOẠT"</em> để lưu file <code>Kich-Hoat-Demo-OnlyOffice-Mercy.bat</code>.
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#ea580c", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0, fontSize: "12px" }}>2</span>
                <div>
                  <strong>Chạy quyền Administrator:</strong> Nhấp đúp chuột vào file (hoặc click chuột phải chọn <em>Run as administrator</em>).
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#ea580c", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0, fontSize: "12px" }}>3</span>
                <div>
                  <strong>Xác nhận UAC:</strong> Bấm <strong>Yes</strong> khi Windows hiển thị hộp thoại xác nhận. Script sẽ tự động cài đặt OnlyOffice và tiêm license dùng thử 7 ngày!
                </div>
              </div>

              <div style={{ padding: "12px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", fontSize: "12.5px", color: "#166534" }}>
                ✓ An toàn tuyệt đối 100%, không chứa mã độc, hỗ trợ kỹ thuật trực tiếp bởi <strong>Mercy Tech</strong> (Hotline: 0763.068.614).
              </div>
            </div>

            <button
              type="button"
              onClick={() => setGuideOpen(false)}
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "10px",
                backgroundColor: "#ea580c",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "13.5px",
                cursor: "pointer",
              }}
            >
              Đã hiểu, đóng cửa sổ
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
