"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import DemoHero from "@/components/demo/DemoHero";
import DemoOnlineSuite from "@/components/demo/DemoOnlineSuite";
import DemoPcActivation from "@/components/demo/DemoPcActivation";
import DemoMercyCheck from "@/components/demo/DemoMercyCheck";
import DemoEnterpriseCta from "@/components/demo/DemoEnterpriseCta";
import PricingQuoteModal from "@/components/pricing/PricingQuoteModal";

export default function DemoClientView() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>("OnlyOffice Docs Enterprise");

  const handleOpenQuote = (productName?: string) => {
    if (productName) setSelectedProduct(productName);
    setQuoteModalOpen(true);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#ffffff" }}>
      {/* Global Navigation Header */}
      <Header />

      <main style={{ flex: 1, backgroundColor: "#ffffff" }}>
        {/* 1. Hero: Title, Official Badge, 3 Quick Jump Anchors */}
        <DemoHero />

        {/* 2. Interactive Online Cloud Suite: Word, Excel, PDF Form, Real-time Collaboration */}
        <DemoOnlineSuite onOpenQuote={() => handleOpenQuote("Tư Vấn Máy Chủ Riêng")} />

        {/* 3. 1-Click 7-Day PC Trial Activation: .BAT tool, ZIP, and detailed modal guide */}
        <DemoPcActivation />

        {/* 4. MercyCheck Security Scanner: Audit crack risk vs 100% legal OnlyOffice licensing */}
        <DemoMercyCheck />

        {/* 5. Enterprise Conversion Call-To-Action */}
        <DemoEnterpriseCta onOpenQuote={() => handleOpenQuote("OnlyOffice Docs Enterprise")} />
      </main>

      {/* Global Footer */}
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
