import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        margin: 0,
        padding: "60px 20px",
        background: "#fffaf5",
        display: "flex",
        minHeight: "70vh",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#1e293b",
      }}
    >
      <div style={{ maxWidth: "480px", padding: "32px 24px" }}>
        <div
          style={{
            fontSize: "72px",
            fontWeight: 800,
            color: "#ff6f3d",
            lineHeight: 1,
            marginBottom: "16px",
          }}
        >
          404
        </div>
        <h1 style={{ fontSize: "22px", fontWeight: 700, margin: "0 0 12px" }}>
          Trang không tồn tại / Page Not Found
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#64748b",
            lineHeight: 1.6,
            marginBottom: "28px",
          }}
        >
          Đường dẫn bạn vừa truy cập không tồn tại hoặc đã được thay đổi địa chỉ.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            background: "#ff6f3d",
            color: "#ffffff",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "0 4px 12px rgba(255, 111, 61, 0.25)",
          }}
        >
          Về trang chủ / Go to Home
        </Link>
      </div>
    </div>
  );
}
