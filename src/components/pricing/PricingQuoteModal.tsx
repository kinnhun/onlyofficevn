"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X, CheckCircle2, MessageCircle } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

interface PricingQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

export default function PricingQuoteModal({ isOpen, onClose, defaultProduct }: PricingQuoteModalProps) {
  const t = useTranslations("pricingQuoteModal");

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
      if (lower.includes("portal") || lower.includes("quản trị")) setProduct("portal-quan-tri");
      else if (lower.includes("enterprise") || lower.includes("server") || lower.includes("máy chủ")) setProduct("docs-enterprise");
      else if (lower.includes("đại lý") || lower.includes("sỉ") || lower.includes("reseller")) setProduct("dai-ly-si");
      else setProduct("key-online");
    }
  }, [defaultProduct]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

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
      openMessengerChat();
    }, 600);
  };

  return (
    <div className="pricing-modal-backdrop" onClick={onClose}>
      <div className="pricing-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="pricing-modal-header">
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#ff6f3d", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {t("badge")}
            </div>
            <h3 style={{ fontSize: "19px", fontWeight: 800, color: "#333333", margin: "2px 0 0" }}>
              {t("title")}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ"
            style={{
              background: "#f4f4f5",
              border: "none",
              borderRadius: "50%",
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#666666",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="pricing-modal-body">
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
                {t("successTitle")}
              </h4>
              <p style={{ fontSize: "14px", color: "#666666", lineHeight: 1.6, margin: "0 0 20px" }}>
                {t("successDesc")}
              </p>
              <button
                type="button"
                onClick={onClose}
                style={{
                  backgroundColor: "#ff6f3d",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "12px 24px",
                  fontWeight: 700,
                  fontSize: "14.5px",
                  cursor: "pointer",
                }}
              >
                {t("closeBtn")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Product */}
              <div>
                <label style={{ fontSize: "13px", fontWeight: 700, color: "#333333", display: "block", marginBottom: "6px" }}>
                  {t("productLabel")}
                </label>
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="pricing-modal-input"
                >
                  <option value="key-online">
                    {t("products.keyOnline")}
                  </option>
                  <option value="portal-quan-tri">
                    {t("products.portal")}
                  </option>
                  <option value="docs-enterprise">
                    {t("products.enterprise")}
                  </option>
                  <option value="dai-ly-si">
                    {t("products.reseller")}
                  </option>
                </select>
              </div>

              {/* Quantity Tier */}
              <div>
                <label style={{ fontSize: "13px", fontWeight: 700, color: "#333333", display: "block", marginBottom: "6px" }}>
                  {t("quantityLabel")}
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="pricing-modal-input"
                >
                  <option value="1-4">
                    {t("quantities.tier1")}
                  </option>
                  <option value="5-49">
                    {t("quantities.tier2")}
                  </option>
                  <option value="50+">
                    {t("quantities.tier3")}
                  </option>
                  <option value="dai-ly">
                    {t("quantities.tier4")}
                  </option>
                </select>
              </div>

              {/* Contact Inputs */}
              <div className="pricing-modal-2col">
                <div>
                  <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#333333", display: "block", marginBottom: "4px" }}>
                    {t("fullNameLabel")}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t("fullNamePlaceholder")}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pricing-modal-input"
                  />
                </div>
                <div>
                  <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#333333", display: "block", marginBottom: "4px" }}>
                    {t("phoneLabel")}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={t("phonePlaceholder")}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pricing-modal-input"
                  />
                </div>
              </div>

              {/* Company & VAT */}
              <div>
                <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#333333", display: "block", marginBottom: "4px" }}>
                  {t("companyLabel")}
                </label>
                <input
                  type="text"
                  placeholder={t("companyPlaceholder")}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="pricing-modal-input"
                />
              </div>

              <div>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 600, color: "#333333", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={needVat}
                    onChange={(e) => setNeedVat(e.target.checked)}
                    style={{ width: "16px", height: "16px", accentColor: "#ff6f3d" }}
                  />
                  <span>
                    {t("vatCheckbox")}
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="pricing-modal-submit"
              >
                <MessageCircle size={18} />
                <span>{t("submitBtn")}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
