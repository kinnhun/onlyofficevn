"use client";

import React from "react";
import { ShieldCheck, Server, Headphones, FileText, ArrowRight, DollarSign, MessageCircle, Phone, Sparkles } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

interface DemoEnterpriseCtaProps {
  onOpenQuote: () => void;
}

export default function DemoEnterpriseCta({ onOpenQuote }: DemoEnterpriseCtaProps) {
  return (
    <section style={{ padding: "40px 20px 80px", backgroundColor: "#ffffff" }}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          background: "linear-gradient(135deg, #ffffff 0%, #fffbf7 50%, #fff7ed 100%)",
          borderRadius: "28px",
          border: "2px solid #fed7aa",
          padding: "54px 40px",
          color: "#0f172a",
          boxShadow: "0 16px 45px rgba(234, 88, 12, 0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle orange ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 111, 61, 0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "880px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 18px",
              borderRadius: "9999px",
              backgroundColor: "#ffffff",
              border: "1.5px solid #fed7aa",
              fontSize: "12px",
              fontWeight: 800,
              color: "#ea580c",
              marginBottom: "18px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              boxShadow: "0 2px 8px rgba(234, 88, 12, 0.08)",
            }}
          >
            <Sparkles size={14} color="#ea580c" />
            <span>GIẢI PHÁP VĂN PHÒNG SỐ CHUẨN DOANH NGHIỆP — MERCY TECH</span>
          </div>

          {/* Heading */}
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 38px)",
              fontWeight: 800,
              lineHeight: 1.25,
              color: "#0f172a",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            Chuyển Đổi Sang ONLYOFFICE —{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              Hợp Pháp Hóa 100% &amp; Tiết Kiệm 70% Chi Phí
            </span>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 16.5px)",
              lineHeight: 1.65,
              color: "#475569",
              marginBottom: "40px",
              fontWeight: 500,
            }}
          >
            Xóa bỏ hoàn toàn nỗi lo bị thanh tra xử phạt bản quyền phần mềm và nguy cơ lây nhiễm mã độc ransomware từ các bản crack lậu. Mercy Tech đồng hành tư vấn lộ trình triển khai bản quyền trọn gói, bảo mật và tiết kiệm nhất cho doanh nghiệp.
          </p>

          {/* 4 Value Pillars Grid (Bright & Clean) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              marginBottom: "42px",
              textAlign: "left",
            }}
          >
            {/* Pillar 1 */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1.5px solid #fed7aa",
                borderRadius: "18px",
                padding: "24px 20px",
                boxShadow: "0 4px 14px rgba(234, 88, 12, 0.05)",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "#fff7ed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <ShieldCheck size={24} color="#ea580c" />
              </div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", marginBottom: "6px" }}>
                100% Hợp Pháp &amp; Có VAT
              </div>
              <div style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.55 }}>
                Đầy đủ hợp đồng kinh tế, hóa đơn VAT điện tử và chứng nhận nguồn gốc AGPLv3 mộc đỏ pháp lý.
              </div>
            </div>

            {/* Pillar 2 */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1.5px solid #e2e8f0",
                borderRadius: "18px",
                padding: "24px 20px",
                boxShadow: "0 4px 14px rgba(15, 23, 42, 0.03)",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "#eff6ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <Server size={24} color="#2563eb" />
              </div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", marginBottom: "6px" }}>
                On-Premise Riêng Biệt
              </div>
              <div style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.55 }}>
                Tự chủ 100% máy chủ tài liệu nội bộ, tương thích sâu với Docker, Nextcloud, OwnCloud.
              </div>
            </div>

            {/* Pillar 3 */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1.5px solid #e2e8f0",
                borderRadius: "18px",
                padding: "24px 20px",
                boxShadow: "0 4px 14px rgba(15, 23, 42, 0.03)",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "#f0fdf4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <DollarSign size={24} color="#16a34a" />
              </div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", marginBottom: "6px" }}>
                Tiết Kiệm Đến 70%
              </div>
              <div style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.55 }}>
                Cấp phép vĩnh viễn theo thiết bị hoặc cụm máy chủ, không phụ thuộc chi phí thuê bao đắt đỏ.
              </div>
            </div>

            {/* Pillar 4 */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1.5px solid #e2e8f0",
                borderRadius: "18px",
                padding: "24px 20px",
                boxShadow: "0 4px 14px rgba(15, 23, 42, 0.03)",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "#fdf2f8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <Headphones size={24} color="#db2777" />
              </div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", marginBottom: "6px" }}>
                Kỹ Sư Hỗ Trợ 24/7
              </div>
              <div style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.55 }}>
                Đội ngũ kỹ thuật Mercy Tech trực tiếp cài đặt, đào tạo chuyển giao và bảo hành kỹ thuật trọn đời.
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            {/* Quote Modal Trigger Button */}
            <button
              type="button"
              onClick={onOpenQuote}
              style={{
                background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                color: "#ffffff",
                border: "none",
                borderRadius: "14px",
                padding: "16px 34px",
                fontSize: "15px",
                fontWeight: 800,
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(234, 88, 12, 0.35)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 28px rgba(234, 88, 12, 0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(234, 88, 12, 0.35)";
              }}
            >
              <FileText size={18} />
              <span>Nhận Báo Giá Doanh Nghiệp</span>
              <ArrowRight size={17} />
            </button>

            {/* Messenger Chat Button */}
            <a
              href="https://m.me/onlyoffice.official.vn"
              target="_blank"
              rel="noopener noreferrer"
              onClick={openMessengerChat}
              style={{
                backgroundColor: "#ffffff",
                color: "#ea580c",
                border: "1.5px solid #fed7aa",
                borderRadius: "14px",
                padding: "15px 26px",
                fontSize: "14.5px",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                cursor: "pointer",
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(234, 88, 12, 0.08)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#fff7ed";
                e.currentTarget.style.borderColor = "#ff6f3d";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.borderColor = "#fed7aa";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <MessageCircle size={18} color="#ea580c" />
              <span>Chat Tư Vấn Ngay</span>
            </a>

            {/* Direct Hotline */}
            <a
              href="tel:0763068614"
              style={{
                color: "#ea580c",
                fontSize: "14px",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "10px 16px",
              }}
            >
              <Phone size={15} color="#ea580c" />
              <span>Hotline: 0763.068.614</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
