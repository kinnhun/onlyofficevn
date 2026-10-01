"use client";

import React, { useState, useEffect } from "react";
import { X, PhoneCall, CheckCircle2, ShieldCheck, MessageCircle } from "lucide-react";

interface PricingQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

export default function PricingQuoteModal({ isOpen, onClose, defaultProduct }: PricingQuoteModalProps) {
  const [product, setProduct] = useState<string>("key-online");
  const [quantity, setQuantity] = useState<string>("5-49");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [needVat, setNeedVat] = useState(false);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (defaultProduct) {
      const lower = defaultProduct.toLowerCase();
      if (lower.includes("tem")) setProduct("tem-vat-ly");
      else if (lower.includes("enterprise") || lower.includes("server")) setProduct("docs-enterprise");
      else if (lower.includes("đại lý") || lower.includes("sỉ")) setProduct("dai-ly-si");
      else setProduct("key-online");
    }
  }, [defaultProduct]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = `[YÊU CẦU BÁO GIÁ BẢN QUYỀN ONLYOFFICE]%0A` +
      `Sản phẩm quan tâm: ${product}%0A` +
      `Số lượng dự kiến: ${quantity}%0A` +
      `Khách hàng: ${fullName}%0A` +
      `SĐT liên hệ: ${phone}%0A` +
      (company ? `Công ty / Cửa hàng: ${company}%0A` : "") +
      (needVat ? `Yêu cầu: Xuất hóa đơn VAT%0A` : "") +
      (note ? `Ghi chú: ${note}%0A` : "");

    setTimeout(() => {
      window.open("https://m.me/onlyoffice.official.vn", "_blank");
    }, 600);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(30, 41, 59, 0.75)",
        backdropFilter: "blur(5px)",
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
          borderRadius: "16px",
          maxWidth: "540px",
          width: "100%",
          overflow: "hidden",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
          position: "relative",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          border: "1px solid #e5e5e5",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #f0f0f0",
            padding: "20px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#ff6f3d", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              BẢO MẬT & CHIẾT KHẤU TỐI ĐA
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#333333", margin: "2px 0 0" }}>
              Yêu Cầu Nhận Báo Giá Ưu Đãi
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "#f4f4f5",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#666666",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "24px", overflowY: "auto", flex: 1 }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "30px 10px" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "#dcfce7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <CheckCircle2 size={32} color="#16a34a" />
              </div>
              <h4 style={{ fontSize: "19px", fontWeight: 800, color: "#16a34a", margin: "0 0 8px" }}>
                GỬI YÊU CẦU THÀNH CÔNG!
              </h4>
              <p style={{ fontSize: "14px", color: "#666666", lineHeight: 1.6, margin: "0 0 20px" }}>
                Hệ thống đang mở kết nối Messenger với chuyên viên tư vấn Mercy Tech (Hotline: <strong>0763.068.614</strong>) để gửi bảng giá chiết khấu chi tiết cho quý khách.
              </p>
              <button
                type="button"
                onClick={onClose}
                style={{
                  backgroundColor: "#ff6f3d",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "10px 24px",
                  fontWeight: 700,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Đóng cửa sổ
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Product */}
              <div>
                <label style={{ fontSize: "13px", fontWeight: 700, color: "#333333", display: "block", marginBottom: "6px" }}>
                  1. Sản phẩm quan tâm:
                </label>
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    border: "1.5px solid #d4d4d8",
                    fontSize: "13.5px",
                    fontWeight: 600,
                    color: "#333333",
                    outline: "none",
                  }}
                >
                  <option value="key-online">🔑 OnlyOffice Key Online (Vĩnh viễn theo Mainboard)</option>
                  <option value="tem-vat-ly">✨ OnlyOffice Tem Cào Hologram 7 Màu (Vật lý dán PC/Laptop)</option>
                  <option value="docs-enterprise">🏢 OnlyOffice Docs Enterprise (Máy chủ riêng / On-premise)</option>
                  <option value="dai-ly-si">💼 Gói Đại Lý Sỉ / Phân phối cho cửa hàng máy tính</option>
                </select>
              </div>

              {/* Quantity Tier */}
              <div>
                <label style={{ fontSize: "13px", fontWeight: 700, color: "#333333", display: "block", marginBottom: "6px" }}>
                  2. Số lượng dự kiến:
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    border: "1.5px solid #d4d4d8",
                    fontSize: "13.5px",
                    color: "#333333",
                    outline: "none",
                  }}
                >
                  <option value="1-4">Từ 1 – 4 thiết bị (Cá nhân / Máy lẻ)</option>
                  <option value="5-49">Từ 5 – 49 thiết bị (Doanh nghiệp vừa & nhỏ)</option>
                  <option value="50+">Từ 50 thiết bị trở lên (Dự án / Số lượng lớn)</option>
                  <option value="dai-ly">Số lượng sỉ định kỳ cho cửa hàng máy tính</option>
                </select>
              </div>

              {/* Contact Inputs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#333333", display: "block", marginBottom: "4px" }}>
                    Họ và tên *:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "6px",
                      border: "1px solid #d4d4d8",
                      fontSize: "13px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#333333", display: "block", marginBottom: "4px" }}>
                    Số điện thoại liên hệ *:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="09xx xxx xxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "6px",
                      border: "1px solid #d4d4d8",
                      fontSize: "13px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* Company & VAT */}
              <div>
                <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#333333", display: "block", marginBottom: "4px" }}>
                  Tên Công ty / Cửa hàng máy tính:
                </label>
                <input
                  type="text"
                  placeholder="Công ty ABC / Vi tính XYZ (nếu có)"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "6px",
                    border: "1px solid #d4d4d8",
                    fontSize: "13px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12.5px", fontWeight: 600, color: "#333333", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={needVat}
                    onChange={(e) => setNeedVat(e.target.checked)}
                  />
                  <span>Doanh nghiệp có nhu cầu xuất Hóa đơn điện tử VAT</span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                style={{
                  backgroundColor: "#ff6f3d",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "13px",
                  fontSize: "14.5px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 14px rgba(255, 111, 61, 0.3)",
                  marginTop: "6px",
                }}
              >
                <MessageCircle size={18} />
                <span>Gửi Yêu Cầu & Kết Nối Messenger Báo Giá</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
