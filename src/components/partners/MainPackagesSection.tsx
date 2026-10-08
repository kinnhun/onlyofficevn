"use client";

import React from "react";
import StandardPackageCard from "./StandardPackageCard";
import ExclusivePackageCard from "./ExclusivePackageCard";

interface MainPackagesSectionProps {
  onOpenModal: (pkgName?: string) => void;
}

export default function MainPackagesSection({ onOpenModal }: MainPackagesSectionProps) {
  return (
    <section className="oo-partner-section">
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <div className="oo-partner-kicker">
          CHƯƠNG TRÌNH ĐỐI TÁC & ĐẠI LÝ CHIẾN LƯỢC
        </div>
        <h2 className="oo-partner-heading" style={{ marginTop: "8px" }}>
          Hai Gói Đại Lý Khởi Nghiệp & Độc Quyền Toàn Diện
        </h2>
        <p className="oo-partner-subheading" style={{ maxWidth: "780px", margin: "10px auto 0" }}>
          Mô hình kinh doanh bản quyền bài bản với <strong>Key Online bản quyền vĩnh viễn</strong> tự động xuất trên <strong>Portal Quản Trị 24/7</strong> và hồ sơ chứng nhận mộc đỏ pháp lý.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <StandardPackageCard onOpenModal={onOpenModal} />
        <ExclusivePackageCard onOpenModal={onOpenModal} />
      </div>
    </section>
  );
}
