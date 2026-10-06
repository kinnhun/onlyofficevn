"use client";

import React from "react";
import { Briefcase, Lock } from "lucide-react";

interface PricingWholesaleClubProps {
  onOpenQuote: (productName?: string) => void;
}

export default function PricingWholesaleClub({ onOpenQuote }: PricingWholesaleClubProps) {
  return (
    <div className="retail-wholesale-banner">
      <div className="retail-wholesale-info">
        <div className="retail-wholesale-badge">
          <Briefcase size={14} color="#ffffff" style={{ flexShrink: 0 }} />
          <span>CHƯƠNG TRÌNH ĐỐI TÁC ĐẠI LÝ & CỬA HÀNG MÁY TÍNH</span>
        </div>
        <h3 className="retail-wholesale-title">
          Nhập Sỉ OnlyOffice Để Phân Phối Cùng Mercy Tech
        </h3>
        <p className="retail-wholesale-desc">
          Chính sách chiết khấu sỉ cực cao dành riêng cho Đại lý & Kỹ thuật viên IT. Cung cấp bộ cài White-label riêng, kho Marketing hàng tuần, Hợp đồng mộc đỏ và hỗ trợ kỹ thuật trực tiếp.
        </p>
      </div>

      <button
        type="button"
        onClick={() => onOpenQuote("Gói Đại Lý Phân Phối Sỉ")}
        className="retail-wholesale-btn"
      >
        <Lock size={16} color="#ea580c" style={{ flexShrink: 0 }} />
        <span>Nhận Bảng Giá Sỉ Đại Lý</span>
      </button>
    </div>
  );
}
