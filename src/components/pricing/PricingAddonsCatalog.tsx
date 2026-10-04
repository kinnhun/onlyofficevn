"use client";

import React from "react";
import PricingWholesaleClub from "./PricingWholesaleClub";

interface PricingAddonsCatalogProps {
  onOpenQuote: (productName?: string) => void;
}

export default function PricingAddonsCatalog({ onOpenQuote }: PricingAddonsCatalogProps) {
  return (
    <section style={{ padding: "0 20px 48px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Agency Dealer Partner Showcase */}
        <PricingWholesaleClub onOpenQuote={onOpenQuote} />
      </div>
    </section>
  );
}
