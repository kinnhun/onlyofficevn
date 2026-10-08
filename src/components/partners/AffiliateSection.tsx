"use client";

import React from "react";
import { Users, Share2, Briefcase, Lock } from "lucide-react";

interface AffiliateSectionProps {
  onOpenModal: (pkgName?: string) => void;
}

export default function AffiliateSection({ onOpenModal }: AffiliateSectionProps) {
  return (
    <section className="oo-partner-section">
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div className="oo-partner-kicker">
          ĐỐI TÁC GIỚI THIỆU
        </div>
        <h2 className="oo-partner-heading" style={{ marginTop: "6px" }}>
          Chương Trình Cộng Tác Viên (CTV)
        </h2>
        <p className="oo-partner-subheading" style={{ maxWidth: "650px", margin: "8px auto 0" }}>
          Giới thiệu nhận hoa hồng hấp dẫn — <strong>Không cần nhập hàng & Mercy Tech hỗ trợ kỹ thuật trọn gói</strong>
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "20px",
        }}
      >
        {/* Model 1: CTV Giới thiệu */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "24px 20px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 800, color: "#ea580c", textTransform: "uppercase", marginBottom: "8px" }}>
              <Share2 size={16} />
              <span>MÔ HÌNH 1</span>
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#1e293b", margin: "0 0 8px" }}>
              Cộng Tác Viên Giới Thiệu
            </h3>
            <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "20px", lineHeight: 1.5 }}>
              Chỉ cần chuyển tiếp thông tin nhu cầu khách hàng, Mercy Tech sẽ tư vấn, demo, ký hợp đồng và thanh toán hoa hồng cho bạn.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { tier: "Hạng Cấp 1", condition: "Dưới 10 máy / tháng" },
                { tier: "Hạng Cấp 2", condition: "10 — 49 máy / tháng" },
                { tier: "Hạng Cấp 3", condition: "Từ 50 máy / tháng" },
              ].map((row, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px",
                    background: "#f8fafc",
                    borderRadius: "8px",
                    border: "1px solid #f1f5f9",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "14px", color: "#1e293b" }}>{row.tier}</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>{row.condition}</div>
                  </div>
                  <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#ea580c", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <Lock size={12} /> Liên hệ nhận chính sách
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenModal("Đăng Ký: CTV Giới Thiệu")}
            style={{
              marginTop: "24px",
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "#ff6f3d",
              color: "#ffffff",
              border: "none",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(255, 111, 61, 0.3)",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ea580c")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff6f3d")}
          >
            Đăng Ký CTV Giới Thiệu
          </button>
        </div>

        {/* Model 2: CTV Bán hàng */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "24px 20px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 800, color: "#ea580c", textTransform: "uppercase", marginBottom: "8px" }}>
              <Briefcase size={16} />
              <span>MÔ HÌNH 2</span>
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#1e293b", margin: "0 0 8px" }}>
              Cộng Tác Viên Bán Hàng
            </h3>
            <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "20px", lineHeight: 1.5 }}>
              Tự tư vấn, hỗ trợ khảo sát và chốt hợp đồng. Mercy Tech bàn giao tài khoản quản trị key, hồ sơ đỏ và hỗ trợ kỹ thuật tận tình.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { tier: "Hạng Cấp 1", condition: "Dưới 20 máy / tháng" },
                { tier: "Hạng Cấp 2", condition: "20 — 99 máy / tháng" },
                { tier: "Hạng Cấp 3", condition: "Từ 100 máy / tháng" },
              ].map((row, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px",
                    background: "#f8fafc",
                    borderRadius: "8px",
                    border: "1px solid #f1f5f9",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "14px", color: "#1e293b" }}>{row.tier}</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>{row.condition}</div>
                  </div>
                  <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#ea580c", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <Lock size={12} /> Liên hệ nhận chính sách
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenModal("Đăng Ký: CTV Bán Hàng")}
            style={{
              marginTop: "24px",
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "#ea580c",
              color: "#ffffff",
              border: "none",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c2410c")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ea580c")}
          >
            Đăng Ký CTV Bán Hàng
          </button>
        </div>
      </div>
    </section>
  );
}
