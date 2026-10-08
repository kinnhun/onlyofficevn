"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import PricingHeroBanner from "@/components/pricing/PricingHeroBanner";
import PricingKeyCards from "@/components/pricing/PricingKeyCards";
import PricingGuarantees from "@/components/pricing/PricingGuarantees";
import PricingAddonsCatalog from "@/components/pricing/PricingAddonsCatalog";
import PricingQuoteModal from "@/components/pricing/PricingQuoteModal";

export default function PricingClientView() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>("OnlyOffice Key Online");

  const handleOpenQuote = (productName?: string) => {
    if (productName) setSelectedProduct(productName);
    setQuoteModalOpen(true);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#ffffff" }}>
      {/* Header */}
      <Header />

      <main style={{ flex: 1, backgroundColor: "#ffffff" }}>
        {/* 1. Hero Banner */}
        <PricingHeroBanner onOpenQuote={() => handleOpenQuote("Tư Vấn Báo Giá Chung")} />

        {/* 2. Key Online Packages */}
        <PricingKeyCards onOpenQuote={handleOpenQuote} />

        {/* 3. 5 Core Guarantees */}
        <PricingGuarantees />

        {/* 4. Wholesale Program */}
        <PricingAddonsCatalog onOpenQuote={handleOpenQuote} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Price Quote Request Modal */}
      <PricingQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultProduct={selectedProduct}
      />
    </div>
  );
}
