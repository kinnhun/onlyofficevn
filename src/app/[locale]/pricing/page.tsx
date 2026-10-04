"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import PricingHeroBanner from "@/components/pricing/PricingHeroBanner";
import PricingKeyCards from "@/components/pricing/PricingKeyCards";
import PricingGuarantees from "@/components/pricing/PricingGuarantees";
import PricingAddonsCatalog from "@/components/pricing/PricingAddonsCatalog";
import PricingQuoteModal from "@/components/pricing/PricingQuoteModal";

export default function PricingPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>("OnlyOffice Key Online");

  const handleOpenQuote = (productName?: string) => {
    if (productName) setSelectedProduct(productName);
    setQuoteModalOpen(true);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#ffffff" }}>
      {/* Header (4 items, no search, no call icon) */}
      <Header />

      <main style={{ flex: 1, backgroundColor: "#ffffff" }}>
        {/* 1. Hero Banner: Homepage Palette, Distributor Badge, Quick Contact */}
        <PricingHeroBanner onOpenQuote={() => handleOpenQuote("Tư Vấn Báo Giá Chung")} />

        {/* 2. Key Online Packages: Laptop Portal Preview + 3 Confidential Quote Tiers */}
        <PricingKeyCards onOpenQuote={handleOpenQuote} />

        {/* 3. 5 Core Guarantees: Main UUID, Machine Swap, Force Majeure, Key Portal, AGPLv3 Certificate */}
        <PricingGuarantees />

        {/* 4. OnlyOffice Physical License & Wholesale Program: Hologram Sticker & Dealer Club */}
        <PricingAddonsCatalog onOpenQuote={handleOpenQuote} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Confidential Price Quote Request Modal */}
      <PricingQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultProduct={selectedProduct}
      />
    </div>
  );
}
