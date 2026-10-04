"use client";

import React from "react";
import { Sparkles, X, ExternalLink } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

interface CertificateLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  isVi: boolean;
}

export default function CertificateLightboxModal({
  isOpen,
  onClose,
  isVi,
}: CertificateLightboxModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(15, 23, 42, 0.88)",
        backdropFilter: "blur(8px)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "960px",
          width: "100%",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          padding: "18px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5)",
          maxHeight: "92vh",
          overflowY: "auto",
          border: "2px solid #fdba74",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "12px",
            paddingBottom: "10px",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Sparkles size={18} color="#ea580c" />
            <span style={{ fontSize: "14.5px", fontWeight: 800, color: "#0f172a" }}>
              {isVi
                ? "Giấy Chứng Nhận Đối Tác Ủy Quyền ONLYOFFICE — Hãng Ascensio System SIA"
                : "Official ONLYOFFICE Partner Certificate — Ascensio System SIA"}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              backgroundColor: "#f1f5f9",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#475569",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#ea580c";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f1f5f9";
              e.currentTarget.style.color = "#475569";
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/chung-nhan-onlyoffice-partner.png"
            alt="ONLYOFFICE Official Partner Certification"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <div
          style={{
            marginTop: "12px",
            padding: "10px 14px",
            borderRadius: "8px",
            backgroundColor: "#fff7ed",
            border: "1px solid #fed7aa",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "12.5px",
            color: "#9a3412",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span>
            <strong>Đơn vị ủy quyền:</strong> CÔNG TY TNHH CÔNG NGHỆ MERCY • MST: 0319227767
          </span>
          <a
            href="https://m.me/onlyoffice.official.vn"
            target="_blank"
            rel="noopener noreferrer"
            onClick={openMessengerChat}
            style={{
              color: "#ea580c",
              fontWeight: 700,
              textDecoration: "underline",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span>Yêu cầu bản sao có mộc đỏ</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
