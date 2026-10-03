"use client";

import React from "react";
import { Sparkles, ZoomIn } from "lucide-react";

/** Classical Baroque & Guilloche Corner Flourish with curving scrollwork & spirals */
function BaroqueCornerFlourish({ style }: { style: React.CSSProperties }) {
  return (
    <svg
      width="82"
      height="82"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", zIndex: 4, pointerEvents: "none", ...style }}
    >
      <defs>
        <linearGradient id="cornerGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="35%" stopColor="#f59e0b" />
          <stop offset="70%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#9a3412" />
        </linearGradient>
      </defs>
      {/* Precision corner bracket L-frame */}
      <path d="M 6 36 L 6 8 C 6 6.9 6.9 6 8 6 L 36 6" stroke="#ea580c" strokeWidth="3.5" strokeLinecap="round" />
      {/* Primary classical acanthus wave spiral */}
      <path
        d="M 12 12 C 38 12, 68 22, 88 46 C 74 44, 58 34, 44 40 C 34 44, 34 62, 24 76 C 18 84, 12 92, 8 96"
        stroke="url(#cornerGoldGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Secondary intertwined filigree curve */}
      <path
        d="M 18 18 C 42 18, 66 28, 80 50 C 68 46, 54 38, 44 44 C 36 50, 38 66, 28 80 C 24 86, 20 92, 16 94"
        stroke="url(#cornerGoldGrad)"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Delicate inner counter-scroll */}
      <path d="M 30 30 C 36 22, 48 24, 50 32 C 52 42, 38 46, 32 38 C 28 32, 32 24, 40 25" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      {/* Ornate leaf accent fill */}
      <path d="M 10 10 Q 52 10 74 26 Q 52 24 38 40 Q 22 54 24 76 Q 10 56 10 10 Z" fill="url(#cornerGoldGrad)" opacity="0.2" />
      {/* Rosettes & accent pearls */}
      <circle cx="10" cy="10" r="4.5" fill="#ea580c" />
      <circle cx="10" cy="10" r="2" fill="#fef08a" />
      <circle cx="36" cy="6" r="3" fill="#f59e0b" />
      <circle cx="6" cy="36" r="3" fill="#f59e0b" />
      <circle cx="28" cy="28" r="2.2" fill="#ea580c" />
    </svg>
  );
}

/** Top & Bottom Symmetrical Guilloche Crest with flowing ornamental wave ribbons */
function GuillocheCenterCrest({ style }: { style: React.CSSProperties }) {
  return (
    <svg
      width="170"
      height="30"
      viewBox="0 0 240 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", zIndex: 4, pointerEvents: "none", ...style }}
    >
      <defs>
        <linearGradient id="crestGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ea580c" stopOpacity="0.2" />
          <stop offset="25%" stopColor="#ea580c" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="75%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#ea580c" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Upper flowing wave ribbon */}
      <path
        d="M 10 20 C 40 4, 70 34, 100 20 C 112 14, 116 8, 120 8 C 124 8, 128 14, 140 20 C 170 34, 200 4, 230 20"
        stroke="url(#crestGoldGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Lower intertwined wavy ribbon */}
      <path
        d="M 30 20 C 55 10, 80 30, 105 20 C 114 16, 117 12, 120 12 C 123 12, 126 16, 135 20 C 160 30, 185 10, 210 20"
        stroke="#f59e0b"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Central diamond crest jewel */}
      <path d="M 120 2 L 125 8 L 120 14 L 115 8 Z" fill="#ea580c" stroke="#fef08a" strokeWidth="1" />
      <circle cx="100" cy="20" r="2.5" fill="#f59e0b" />
      <circle cx="140" cy="20" r="2.5" fill="#f59e0b" />
    </svg>
  );
}

/** Continuous Guilloche Wavy Pattern Running Border for perimeter authenticity */
function GuillocheWavyBorders() {
  return (
    <svg
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 3 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="guillocheWaveH" width="24" height="12" patternUnits="userSpaceOnUse">
          <path d="M 0 6 Q 6 0, 12 6 T 24 6" stroke="#ea580c" strokeWidth="1.2" fill="none" opacity="0.65" />
          <path d="M 0 6 Q 6 12, 12 6 T 24 6" stroke="#f59e0b" strokeWidth="1.2" fill="none" opacity="0.65" />
          <circle cx="12" cy="6" r="1.2" fill="#ea580c" opacity="0.8" />
        </pattern>
        <pattern id="guillocheWaveV" width="12" height="24" patternUnits="userSpaceOnUse">
          <path d="M 6 0 Q 0 6, 6 12 T 6 24" stroke="#ea580c" strokeWidth="1.2" fill="none" opacity="0.65" />
          <path d="M 6 0 Q 12 6, 6 12 T 6 24" stroke="#f59e0b" strokeWidth="1.2" fill="none" opacity="0.65" />
          <circle cx="6" cy="12" r="1.2" fill="#ea580c" opacity="0.8" />
        </pattern>
      </defs>
      {/* Top & Bottom Running Guilloche Wave Borders */}
      <rect x="75" y="9" width="calc(100% - 150px)" height="12" fill="url(#guillocheWaveH)" />
      <rect x="75" y="calc(100% - 21px)" width="calc(100% - 150px)" height="12" fill="url(#guillocheWaveH)" />
      {/* Left & Right Running Guilloche Wave Borders */}
      <rect x="9" y="75" width="12" height="calc(100% - 150px)" fill="url(#guillocheWaveV)" />
      <rect x="calc(100% - 21px)" y="75" width="12" height="calc(100% - 150px)" fill="url(#guillocheWaveV)" />
    </svg>
  );
}

/** 3D Embossed Gold Seal with Hanging Wavy Satin Ribbons */
function EmbossedGoldSeal() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "-20px",
        right: "-12px",
        zIndex: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
        filter: "drop-shadow(0 12px 24px rgba(194, 65, 12, 0.45))",
      }}
    >
      {/* 3D Scalloped Metallic Medallion */}
      <div
        style={{
          width: "86px",
          height: "86px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, #fef08a 0%, #f59e0b 45%, #b45309 85%, #78350f 100%)",
          boxShadow: "inset 0 2px 5px rgba(255, 255, 255, 0.9), inset 0 -3px 6px rgba(0, 0, 0, 0.45), 0 4px 14px rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "2px dashed #78350f",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(145deg, #d97706 0%, #b45309 60%, #92400e 100%)",
            color: "#ffffff",
            textAlign: "center",
            padding: "2px",
          }}
        >
          <div style={{ fontSize: "7px", fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fef08a" }}>
            ONLYOFFICE
          </div>
          <div style={{ fontSize: "16px", lineHeight: "1", margin: "2px 0" }}>★</div>
          <div style={{ fontSize: "6.5px", fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fef08a" }}>
            VERIFIED
          </div>
          <div style={{ fontSize: "6px", fontWeight: 800, color: "#ffffff", opacity: 0.95 }}>2026 - 2027</div>
        </div>
      </div>

      {/* Hanging Wavy Satin Ribbons */}
      <svg width="70" height="40" viewBox="0 0 80 45" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: "-14px", zIndex: 1 }}>
        <path d="M 22 0 C 26 15, 10 28, 14 43 L 30 36 L 36 43 C 32 26, 36 14, 32 0 Z" fill="url(#ribbonGrad1)" />
        <path d="M 48 0 C 44 14, 48 26, 44 43 L 50 36 L 66 43 C 70 28, 54 15, 58 0 Z" fill="url(#ribbonGrad2)" />
        <defs>
          <linearGradient id="ribbonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#9a3412" />
          </linearGradient>
          <linearGradient id="ribbonGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6f3d" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

interface CertificateOrnateFrameProps {
  children: React.ReactNode;
  isVi: boolean;
  onOpenZoom: () => void;
}

export default function CertificateOrnateFrame({ children, isVi, onOpenZoom }: CertificateOrnateFrameProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      {/* Outer Plaque Container with rich metallic lighting */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "550px",
          padding: "16px",
          borderRadius: "28px",
          background: "linear-gradient(135deg, rgba(254, 215, 170, 0.45) 0%, #ffffff 50%, rgba(251, 146, 60, 0.25) 100%)",
          boxShadow: "0 24px 60px -15px rgba(234, 88, 12, 0.28), 0 0 0 1.5px rgba(251, 146, 60, 0.55)",
        }}
      >
        {/* Authenticity Floating Ribbon Badge */}
        <div
          style={{
            position: "absolute",
            top: "-15px",
            right: "24px",
            zIndex: 6,
            background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
            color: "#ffffff",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "0.06em",
            padding: "6px 18px",
            borderRadius: "50px",
            boxShadow: "0 4px 16px rgba(234, 88, 12, 0.45)",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            textTransform: "uppercase",
          }}
        >
          <Sparkles size={13} />
          <span>{isVi ? "CHỨNG THƯ ỦY QUYỀN CHÍNH THỨC" : "OFFICIAL PARTNER CERTIFIED"}</span>
        </div>

        {/* Multi-layered Guilloche & Baroque Certificate Card */}
        <div
          onClick={onOpenZoom}
          style={{
            position: "relative",
            backgroundColor: "#ffffff",
            borderRadius: "22px",
            border: "2.5px solid #ea580c",
            boxShadow: "inset 0 0 0 3px #fffaf5, inset 0 0 0 5.5px #fdba74, inset 0 0 0 8.5px #fffaf5, inset 0 0 0 10.5px rgba(234, 88, 12, 0.4), 0 10px 32px rgba(0, 0, 0, 0.09)",
            padding: "28px",
            cursor: "pointer",
            overflow: "hidden",
            transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px) scale(1.01)";
            e.currentTarget.style.boxShadow = "inset 0 0 0 3px #fffaf5, inset 0 0 0 5.5px #fdba74, inset 0 0 0 8.5px #fffaf5, inset 0 0 0 10.5px rgba(234, 88, 12, 0.5), 0 25px 55px -10px rgba(234, 88, 12, 0.38)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "inset 0 0 0 3px #fffaf5, inset 0 0 0 5.5px #fdba74, inset 0 0 0 8.5px #fffaf5, inset 0 0 0 10.5px rgba(234, 88, 12, 0.4), 0 10px 32px rgba(0, 0, 0, 0.09)";
          }}
          title={isVi ? "Click để phóng to chứng nhận gốc có mộc đỏ quốc tế" : "Click to inspect certificate"}
        >
          {/* 4 Classical Baroque Corner Flourishes with L-brackets and Curves */}
          <BaroqueCornerFlourish style={{ top: "4px", left: "4px" }} />
          <BaroqueCornerFlourish style={{ top: "4px", right: "4px", transform: "scaleX(-1)" }} />
          <BaroqueCornerFlourish style={{ bottom: "4px", left: "4px", transform: "scaleY(-1)" }} />
          <BaroqueCornerFlourish style={{ bottom: "4px", right: "4px", transform: "scale(-1, -1)" }} />

          {/* Continuous Guilloche Wavy Running Borders */}
          <GuillocheWavyBorders />

          {/* Top & Bottom Symmetrical Ornamental Wave Crests */}
          <GuillocheCenterCrest style={{ top: "6px", left: "50%", transform: "translateX(-50%)" }} />
          <GuillocheCenterCrest style={{ bottom: "6px", left: "50%", transform: "translateX(-50%) scaleY(-1)" }} />

          {/* Inner Certificate Container with nested shadow */}
          <div
            style={{
              position: "relative",
              borderRadius: "12px",
              overflow: "hidden",
              backgroundColor: "#f8fafc",
              border: "1.5px solid #fed7aa",
              boxShadow: "0 4px 18px rgba(0, 0, 0, 0.07)",
              zIndex: 2,
            }}
          >
            {children}

            {/* Quick-Inspect Pill Button */}
            <div
              style={{
                position: "absolute",
                bottom: "12px",
                right: "12px",
                backgroundColor: "rgba(15, 23, 42, 0.88)",
                color: "#ffffff",
                padding: "7px 15px",
                borderRadius: "50px",
                fontSize: "12px",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backdropFilter: "blur(6px)",
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
              }}
            >
              <ZoomIn size={14} color="#fdba74" />
              <span>{isVi ? "Xem Bản Gốc Mộc Đỏ" : "Inspect Certificate"}</span>
            </div>
          </div>
        </div>

        {/* 3D Embossed Gold Seal with Hanging Wavy Ribbons */}
        <EmbossedGoldSeal />
      </div>

      {/* Sub-Trust Information Bar under Certificate */}
      <div
        style={{
          marginTop: "22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
          width: "100%",
          maxWidth: "550px",
          padding: "10px 18px",
          backgroundColor: "#ffffff",
          borderRadius: "14px",
          border: "1.5px solid #fed7aa",
          fontSize: "13px",
          color: "#475569",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <span style={{ color: "#16a34a", fontSize: "16px" }}>✔</span>
          <span style={{ fontWeight: 700, color: "#1e293b" }}>
            {isVi ? "Cấp phép bởi Ascensio System SIA" : "Certified by Ascensio System SIA"}
          </span>
        </div>
        <div style={{ color: "#ea580c", fontWeight: 800, fontSize: "12.5px" }}>MST: 0319227767</div>
      </div>
    </div>
  );
}
