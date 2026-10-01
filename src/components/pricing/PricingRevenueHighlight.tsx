"use client";

import React from "react";
import { Coins, TrendingUp, DollarSign, Sparkles, ArrowUpRight, Zap, Award } from "lucide-react";

export default function PricingRevenueHighlight() {
  return (
    <section
      style={{
        padding: "40px 24px",
        background: "linear-gradient(180deg, #00224f 0%, #003b8e 50%, #00224f 100%)",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glowing orbs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "15%",
          width: "350px",
          height: "350px",
          background: "radial-gradient(circle, rgba(255, 111, 61, 0.25) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "15%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1240px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Section Heading */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: "#fde047",
              padding: "6px 18px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            <Sparkles size={15} color="#fde047" />
            <span>HIỆU QUẢ KINH DOANH VƯỢT TRỘI</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(26px, 3.5vw, 40px)",
              fontWeight: 900,
              letterSpacing: "-0.5px",
              marginBottom: "10px",
              color: "#ffffff",
              textTransform: "uppercase",
            }}
          >
            BỨT PHÁ DOANH THU & LỢI NHUẬN CÙNG MERCY TECH
          </h2>
          <p style={{ fontSize: "16px", color: "#bfdbfe", maxWidth: "750px", margin: "0 auto", lineHeight: 1.5 }}>
            Tối ưu dòng tiền vượt bậc cho cửa hàng máy tính và kỹ thuật viên IT. Thu hồi vốn siêu tốc chỉ sau vài tuần mở bán!
          </p>
        </div>

        {/* 3 Mega Financial Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
            marginBottom: "36px",
          }}
        >
          {/* Block 1: Vốn đầu tư */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
              backdropFilter: "blur(12px)",
              border: "1.5px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "20px",
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#93c5fd",
                }}
              >
                <Coins size={28} />
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  TỔNG ĐẦU TƯ GÓI
                </div>
                <div style={{ fontSize: "12px", color: "#cbd5e1" }}>Vốn nhập hàng 1 lần</div>
              </div>
            </div>

            <div
              style={{
                fontSize: "clamp(28px, 3.2vw, 38px)",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-0.5px",
                marginBottom: "14px",
                lineHeight: 1.1,
              }}
            >
              34.750.000đ
            </div>

            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                borderRadius: "10px",
                padding: "12px",
                fontSize: "12.5px",
                color: "#e2e8f0",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                marginTop: "auto",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>• 200 Key Online (99k/key):</span>
                <strong>19.800.000đ</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>• 50 Tem Hologram (299k/tem):</span>
                <strong>14.950.000đ</strong>
              </div>
            </div>
          </div>

          {/* Block 2: Giá trị bán lẻ dự kiến */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(2, 132, 199, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)",
              backdropFilter: "blur(12px)",
              border: "1.5px solid rgba(56, 189, 248, 0.4)",
              borderRadius: "20px",
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 15px 35px rgba(2, 132, 199, 0.25)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  backgroundColor: "rgba(56, 189, 248, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#38bdf8",
                }}
              >
                <TrendingUp size={28} />
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  GIÁ TRỊ BÁN LẺ DỰ KIẾN
                </div>
                <div style={{ fontSize: "12px", color: "#cbd5e1" }}>Tổng doanh thu thu về</div>
              </div>
            </div>

            <div
              style={{
                fontSize: "clamp(26px, 3vw, 36px)",
                fontWeight: 900,
                color: "#38bdf8",
                letterSpacing: "-0.5px",
                marginBottom: "14px",
                lineHeight: 1.1,
              }}
            >
              134,7 – 209,75 TRIỆU
            </div>

            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                borderRadius: "10px",
                padding: "12px",
                fontSize: "12.5px",
                color: "#e2e8f0",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                marginTop: "auto",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>• Bán 200 Key (499k - 699k):</span>
                <strong style={{ color: "#38bdf8" }}>99,8 – 139,8 Tr</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>• Bán 50 Tem (699k - 1,399 Tr):</span>
                <strong style={{ color: "#38bdf8" }}>34,9 – 69,95 Tr</strong>
              </div>
            </div>
          </div>

          {/* Block 3: Chênh lệch Doanh thu - LỢI NHUẬN RÒNG (SUPER HIGHLIGHT) */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(234, 88, 12, 0.25) 0%, rgba(22, 163, 74, 0.25) 100%)",
              backdropFilter: "blur(12px)",
              border: "2px solid #4ade80",
              borderRadius: "20px",
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 18px 45px rgba(22, 163, 74, 0.35)",
              position: "relative",
            }}
          >
            {/* Top Hot Pill */}
            <div
              style={{
                position: "absolute",
                top: "-13px",
                right: "20px",
                backgroundColor: "#22c55e",
                color: "#052e16",
                fontWeight: 900,
                fontSize: "11px",
                padding: "4px 12px",
                borderRadius: "999px",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                boxShadow: "0 4px 10px rgba(34, 197, 94, 0.4)",
              }}
            >
              LÃI RÒNG ĐÚT TÚI
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  backgroundColor: "rgba(74, 222, 128, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#4ade80",
                }}
              >
                <DollarSign size={28} />
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 800, color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  CHÊNH LỆCH DOANH THU SO VỚI VỐN
                </div>
                <div style={{ fontSize: "12px", color: "#dcfce7" }}>Tỷ suất sinh lời ROI: +387% – 603%</div>
              </div>
            </div>

            <div
              style={{
                fontSize: "clamp(30px, 3.6vw, 42px)",
                fontWeight: 900,
                color: "#4ade80",
                letterSpacing: "-0.5px",
                marginBottom: "14px",
                textShadow: "0 2px 10px rgba(74, 222, 128, 0.4)",
                lineHeight: 1.1,
              }}
            >
              +100 – 175 TRIỆU
            </div>

            <div
              style={{
                backgroundColor: "rgba(5, 46, 22, 0.5)",
                border: "1px solid rgba(74, 222, 128, 0.4)",
                borderRadius: "10px",
                padding: "12px",
                fontSize: "13px",
                color: "#f0fdf4",
                fontWeight: 600,
                lineHeight: 1.45,
                marginTop: "auto",
              }}
            >
              🔥 Chỉ cần cài đặt / bán lẻ <strong style={{ color: "#facc15" }}>25 – 35 thiết bị đầu tiên</strong> là bạn đã hòa vốn 100%! Toàn bộ 215 thiết bị còn lại là lợi nhuận ròng thuần túy!
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Comparison Table */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            padding: "20px 24px",
            overflowX: "auto",
          }}
        >
          <div style={{ fontSize: "15px", fontWeight: 800, color: "#fde047", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Award size={18} color="#fde047" />
            <span>BẢNG SO SÁNH GIÁ VỐN & BIÊN LỢI NHUẬN TỪNG SẢN PHẨM</span>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13.5px", textAlign: "left", minWidth: "600px" }}>
            <thead>
              <tr style={{ borderBottom: "1.5px solid rgba(255, 255, 255, 0.2)", color: "#93c5fd" }}>
                <th style={{ padding: "10px 12px" }}>Hạng mục sản phẩm</th>
                <th style={{ padding: "10px 12px" }}>Số lượng</th>
                <th style={{ padding: "10px 12px" }}>Giá vốn đại lý</th>
                <th style={{ padding: "10px 12px" }}>Giá bán lẻ thị trường</th>
                <th style={{ padding: "10px 12px", color: "#4ade80" }}>Lợi nhuận ròng / máy</th>
                <th style={{ padding: "10px 12px", color: "#fde047" }}>Tỷ lệ sinh lời</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                <td style={{ padding: "12px", fontWeight: 700, color: "#ffffff" }}>Key Online Vĩnh Viễn</td>
                <td style={{ padding: "12px" }}>200 Key</td>
                <td style={{ padding: "12px", color: "#ea580c", fontWeight: 700 }}>99.000đ</td>
                <td style={{ padding: "12px" }}>499.000đ – 699.000đ</td>
                <td style={{ padding: "12px", color: "#4ade80", fontWeight: 800 }}>+400.000đ – 600.000đ</td>
                <td style={{ padding: "12px", color: "#fde047", fontWeight: 800 }}>Gấp 5 – 7 lần vốn</td>
              </tr>
              <tr>
                <td style={{ padding: "12px", fontWeight: 700, color: "#ffffff" }}>Tem Cào Hologram 7 Màu</td>
                <td style={{ padding: "12px" }}>50 Tem</td>
                <td style={{ padding: "12px", color: "#ea580c", fontWeight: 700 }}>299.000đ</td>
                <td style={{ padding: "12px" }}>699.000đ – 1.399.000đ</td>
                <td style={{ padding: "12px", color: "#4ade80", fontWeight: 800 }}>+400.000đ – 1.100.000đ</td>
                <td style={{ padding: "12px", color: "#fde047", fontWeight: 800 }}>Gấp 2.3 – 4.6 lần vốn</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
