"use client";

import React, { useState, useEffect } from "react";
import { X, ShoppingBag, ShieldCheck, CheckCircle2, PhoneCall } from "lucide-react";

interface RetailOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

export default function RetailOrderModal({ isOpen, onClose, defaultProduct }: RetailOrderModalProps) {
  const [product, setProduct] = useState<string>("key-online");
  const [quantity, setQuantity] = useState<number>(1);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [needVat, setNeedVat] = useState(false);
  const [taxCode, setTaxCode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (defaultProduct) {
      if (defaultProduct.toLowerCase().includes("tem")) setProduct("tem-vat-ly");
      else setProduct("key-online");
    }
  }, [defaultProduct]);

  if (!isOpen) return null;

  // Pricing calculation
  const calculateTotal = () => {
    const q = Math.max(1, quantity);
    let unitPrice = 0;

    if (product === "key-online") {
      if (q >= 50) unitPrice = 499000;
      else if (q >= 5) unitPrice = 699000;
      else unitPrice = 799000;
    } else if (product === "tem-vat-ly") {
      if (q >= 50) unitPrice = 699000;
      else if (q >= 5) unitPrice = 899000;
      else unitPrice = 999000;
    }

    return { unitPrice, total: unitPrice * q };
  };

  const { unitPrice, total } = calculateTotal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = `[ĐẶT HÀNG MUA LẺ ONLYOFFICE / MERCY TECH]%0A` +
      `Sản phẩm: ${product}%0A` +
      `Số lượng: ${quantity}%0A` +
      `Đơn giá: ${unitPrice.toLocaleString("vi-VN")}đ%0A` +
      `Tổng tiền (gồm VAT): ${total.toLocaleString("vi-VN")}đ%0A` +
      `Khách hàng: ${fullName}%0A` +
      `SĐT liên hệ: ${phone}%0A` +
      (company ? `Công ty: ${company}%0A` : "") +
      (needVat ? `MST xuất VAT: ${taxCode}%0A` : "") +
      (address ? `Địa chỉ giao: ${address}%0A` : "");

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
        backgroundColor: "rgba(15, 23, 42, 0.8)",
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
          maxWidth: "580px",
          width: "100%",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.35)",
          position: "relative",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #0284c7 0%, #003b8e 100%)",
            color: "#ffffff",
            padding: "18px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: "18px", fontWeight: 900, display: "flex", alignItems: "center", gap: "8px" }}>
              <ShoppingBag size={20} />
              <span>ĐẶT MUA BẢN QUYỀN CHÍNH HÃNG</span>
            </div>
            <div style={{ fontSize: "12px", color: "#bfdbfe", marginTop: "2px" }}>
              Đầy đủ Hóa đơn VAT • Cấp theo Main-UUID vĩnh viễn • Hỗ trợ kỹ thuật 24/7
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

        {/* Modal Body */}
        <div style={{ padding: "24px", overflowY: "auto", flex: 1 }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "30px 10px" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "#dcfce7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <CheckCircle2 size={36} color="#16a34a" />
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 900, color: "#16a34a", margin: "0 0 8px" }}>
                GỬI YÊU CẦU ĐẶT HÀNG THÀNH CÔNG!
              </h3>
              <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6, margin: "0 0 20px" }}>
                Hệ thống đang mở kết nối liên hệ với chuyên viên Mercy Tech (Hotline: <strong>0763.068.614</strong>) để bàn giao key và hóa đơn VAT ngay lập tức.
              </p>
              <button
                type="button"
                onClick={onClose}
                style={{
                  backgroundColor: "#ea580c",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 24px",
                  fontWeight: 800,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Hoàn tất
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Product Selector */}
              <div>
                <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>
                  1. Chọn sản phẩm:
                </label>
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "13.5px",
                    fontWeight: 700,
                    color: "#0f172a",
                    outline: "none",
                  }}
                >
                  <option value="key-online">🔑 OnlyOffice Key Online Vĩnh Viễn Theo Main (Từ 499k - 799k)</option>
                  <option value="tem-vat-ly">✨ OnlyOffice Tem Cào Hologram 7 Màu (Từ 699k - 999k)</option>
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>
                  2. Số lượng:
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    style={{
                      width: "120px",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: "1.5px solid #cbd5e1",
                      fontSize: "15px",
                      fontWeight: 800,
                      textAlign: "center",
                    }}
                  />
                  <div style={{ fontSize: "12px", color: "#64748b" }}>
                    (Đơn giá tự động giảm theo bậc: 1–4, 5–49, hoặc từ 50 trở lên)
                  </div>
                </div>
              </div>

              {/* Price Calculation Box */}
              <div
                style={{
                  backgroundColor: "#f0f9ff",
                  border: "1.5px solid #bae6fd",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: "11.5px", color: "#64748b", fontWeight: 600 }}>Đơn giá áp dụng:</div>
                  <div style={{ fontSize: "14px", fontWeight: 800, color: "#003b8e" }}>
                    {unitPrice.toLocaleString("vi-VN")}đ/cái
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "11.5px", color: "#64748b", fontWeight: 600 }}>TỔNG THANH TOÁN (ĐÃ GỒM VAT):</div>
                  <div style={{ fontSize: "22px", fontWeight: 950, color: "#ea580c" }}>
                    {total.toLocaleString("vi-VN")}đ
                  </div>
                </div>
              </div>

              {/* Customer Contact */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>
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
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "13px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>
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
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "13px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* VAT Checkbox & Company */}
              <div>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12.5px", fontWeight: 700, color: "#003b8e", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={needVat}
                    onChange={(e) => setNeedVat(e.target.checked)}
                  />
                  <span>Yêu cầu xuất Hóa đơn GTGT (VAT điện tử)</span>
                </label>
                {needVat && (
                  <div style={{ marginTop: "8px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <input
                      type="text"
                      placeholder="Tên công ty xuất hóa đơn"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      style={{ padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px" }}
                    />
                    <input
                      type="text"
                      placeholder="Mã số thuế"
                      value={taxCode}
                      onChange={(e) => setTaxCode(e.target.value)}
                      style={{ padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px" }}
                    />
                  </div>
                )}
              </div>

              {/* Address (for physical delivery) */}
              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>
                  Địa chỉ nhận hàng (nếu là tem/hộp vật lý):
                </label>
                <input
                  type="text"
                  placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "13px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "14px",
                  fontSize: "15px",
                  fontWeight: 900,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 6px 18px rgba(234, 88, 12, 0.35)",
                  marginTop: "6px",
                }}
              >
                <PhoneCall size={18} />
                <span>Xác Nhận Đặt Mua & Liên Hệ Ngay</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
