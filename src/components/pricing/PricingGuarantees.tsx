"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Key, RefreshCw, ShieldAlert, Monitor, Award } from "lucide-react";

export default function PricingGuarantees() {
  const t = useTranslations("pricingGuarantees");

  const guarantees = [
    {
      icon: <Key size={22} color="#ff6f3d" />,
      title: t("g1Title"),
      desc: t("g1Desc"),
    },
    {
      icon: <RefreshCw size={22} color="#ff6f3d" />,
      title: t("g2Title"),
      desc: t("g2Desc"),
    },
    {
      icon: <ShieldAlert size={22} color="#ff6f3d" />,
      title: t("g3Title"),
      desc: t("g3Desc"),
    },
    {
      icon: <Monitor size={22} color="#ff6f3d" />,
      title: t("g4Title"),
      desc: t("g4Desc"),
    },
    {
      icon: <Award size={22} color="#ff6f3d" />,
      title: t("g5Title"),
      desc: t("g5Desc"),
    },
  ];

  return (
    <section className="pricing-guarantees-section">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="retail-guarantees-grid">
          {guarantees.map((item, idx) => (
            <div key={idx} className="retail-guarantee-card">
              {/* Icon Bubble */}
              <div className="retail-guarantee-icon">
                {item.icon}
              </div>

              {/* Text Info */}
              <div className="retail-guarantee-content">
                <div className="retail-guarantee-title">
                  {item.title}
                </div>
                <div className="retail-guarantee-desc">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
