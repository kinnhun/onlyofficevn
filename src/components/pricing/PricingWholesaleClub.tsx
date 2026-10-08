"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Briefcase, Lock } from "lucide-react";

interface PricingWholesaleClubProps {
  onOpenQuote: (productName?: string) => void;
}

export default function PricingWholesaleClub({ onOpenQuote }: PricingWholesaleClubProps) {
  const t = useTranslations("pricingWholesale");

  return (
    <div className="retail-wholesale-banner">
      <div className="retail-wholesale-info">
        <div className="retail-wholesale-badge">
          <Briefcase size={14} color="#ffffff" style={{ flexShrink: 0 }} />
          <span>{t("badge")}</span>
        </div>
        <h3 className="retail-wholesale-title">
          {t("title")}
        </h3>
        <p className="retail-wholesale-desc">
          {t("desc")}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onOpenQuote("Gói Đại Lý Phân Phối Sỉ")}
        className="retail-wholesale-btn"
      >
        <Lock size={16} color="#ea580c" style={{ flexShrink: 0 }} />
        <span>{t("btn")}</span>
      </button>
    </div>
  );
}
