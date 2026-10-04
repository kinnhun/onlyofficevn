"use client";

import React, { useState } from "react";
import { Calculator, Clock, TrendingUp, DollarSign, CheckCircle2 } from "lucide-react";

export default function PricingProfitCalculator() {
  const [machinesPerMonth, setMachinesPerMonth] = useState(25);
  const [profitPerMachine, setProfitPerMachine] = useState(500000);

  const monthlyProfit = machinesPerMonth * profitPerMachine;
  const totalInvestment = 34750000;
  const paybackMonths = (totalInvestment / monthlyProfit).toFixed(1);

  return (
    <section style={{ padding: "40px 24px", backgroundColor: "#f8fafc" }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            border: "1.5px solid #e2e8f0",
            padding: "36px 32px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                backgroundColor: "#eff6ff",
                color: "#003b8e",
                padding: "6px 16px",
                borderRadius: "999px",
                fontSize: "12.5px",
                fontWeight: 700,
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              <Calculator size={15} color="#0284c7" />
              <span>CÔNG CỤ TÍNH LỢI NHUẬN THỰC TẾ</span>
            </div>

            <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#002b66", marginBottom: "8px" }}>
              DỰ TOÁN THỜI GIAN THU HỒI VỐN CHO SHOP CỦA BẠN
            </h3>
            <p style={{ fontSize: "14px", color: "#64748b" }}>
              Kéo thanh trượt bên dưới để ước tính lợi nhuận ròng hàng tháng theo quy mô kinh doanh của bạn:
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "32px",
              alignItems: "center",
            }}
          >
            {/* Sliders Control */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Slider 1: Machines per month */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>
                    Số máy cài đặt / bán lẻ mỗi tháng:
                  </span>
                  <span style={{ fontSize: "16px", fontWeight: 800, color: "#0284c7" }}>
                    {machinesPerMonth} máy/tháng
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  step="5"
                  value={machinesPerMonth}
                  onChange={(e) => setMachinesPerMonth(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#0284c7", cursor: "pointer", height: "6px" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
                  <span>5 máy</span>
                  <span>40 máy</span>
                  <span>80 máy</span>
                </div>
              </div>

              {/* Slider 2: Average profit per machine */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>
                    Lợi nhuận mong muốn / máy:
                  </span>
                  <span style={{ fontSize: "16px", fontWeight: 800, color: "#ea580c" }}>
                    {profitPerMachine.toLocaleString("vi-VN")} đ/máy
                  </span>
                </div>
                <input
                  type="range"
                  min="300000"
                  max="1000000"
                  step="50000"
                  value={profitPerMachine}
                  onChange={(e) => setProfitPerMachine(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#ea580c", cursor: "pointer", height: "6px" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
                  <span>300.000đ</span>
                  <span>650.000đ</span>
                  <span>1.000.000đ</span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12.5px", color: "#475569" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <CheckCircle2 size={15} color="#16a34a" />
                  <span>Tổng vốn gói đầu tư: <strong>34.750.000đ</strong> (Cố định 1 lần)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <CheckCircle2 size={15} color="#16a34a" />
                  <span>Số lượng bản quyền sở hữu: <strong>250 máy tính vĩnh viễn</strong></span>
                </div>
              </div>
            </div>

            {/* Results Box */}
            <div
              style={{
                background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                borderRadius: "16px",
                border: "2px solid #86efac",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                boxShadow: "0 6px 20px rgba(34, 197, 94, 0.12)",
              }}
            >
              <div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#166534", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  LỢI NHUẬN RÒNG MỖI THÁNG
                </div>
                <div style={{ fontSize: "28px", fontWeight: 900, color: "#15803d", marginTop: "4px" }}>
                  +{monthlyProfit.toLocaleString("vi-VN")} đ
                </div>
              </div>

              <div style={{ borderTop: "1px solid #bbf7d0", paddingTop: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 700, color: "#166534", textTransform: "uppercase" }}>
                  <Clock size={15} color="#16a34a" />
                  <span>THỜI GIAN THU HỒI TOÀN BỘ VỐN ĐẦU TƯ:</span>
                </div>
                <div style={{ fontSize: "22px", fontWeight: 900, color: "#003b8e", marginTop: "4px" }}>
                  Khoảng {paybackMonths} tháng
                </div>
                <p style={{ fontSize: "12px", color: "#14532d", margin: "6px 0 0", lineHeight: 1.4 }}>
                  Sau khi thu hồi vốn, tất cả key online còn lại mang về <strong>100% dòng tiền thặng dư</strong> cho cửa hàng!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
