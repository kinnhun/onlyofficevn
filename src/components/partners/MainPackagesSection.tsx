"use client";

import React from "react";
import StandardPackageCard from "./StandardPackageCard";
import ExclusivePackageCard from "./ExclusivePackageCard";

interface MainPackagesSectionProps {
  onOpenModal: (pkgName?: string) => void;
}

export default function MainPackagesSection({ onOpenModal }: MainPackagesSectionProps) {
  return (
    <section style={{ maxWidth: "1248px", margin: "72px auto 0", padding: "0 20px" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <span
          style={{
            color: "#ff6f3d",
            fontSize: "12px",
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          CHƯƠNG TRÌNH ĐỐI TÁC & ĐẠI LÝ CHIẾN LƯỢC
        </span>
        <h2 style={{ fontSize: "34px", fontWeight: 800, color: "#1e293b", marginTop: "8px" }}>
          Hai Gói Đại Lý Khởi Nghiệp & Độc Quyền Toàn Diện
        </h2>
        <p style={{ color: "#64748b", fontSize: "16px", maxWidth: "780px", margin: "10px auto 0" }}>
          Mô hình kinh doanh bản quyền bài bản với <strong>Key Online bản quyền vĩnh viễn</strong> tự động xuất trên <strong>Portal Quản Trị 24/7</strong> và hồ sơ chứng nhận mộc đỏ pháp lý.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
        <StandardPackageCard onOpenModal={onOpenModal} />
        <ExclusivePackageCard onOpenModal={onOpenModal} />
      </div>
    </section>
  );
}
