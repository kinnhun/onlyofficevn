"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import PartnerOfficialHeader from "@/components/partners/PartnerOfficialHeader";
import PartnerHero from "@/components/partners/PartnerHero";
import PartnerAdvantages from "@/components/partners/PartnerAdvantages";
import RetailPriceTable from "@/components/partners/RetailPriceTable";
import MainPackagesSection from "@/components/partners/MainPackagesSection";
import PrePaidSlotsSection from "@/components/partners/PrePaidSlotsSection";
import AffiliateSection from "@/components/partners/AffiliateSection";
import OperationsWorkflow from "@/components/partners/OperationsWorkflow";
import PartnerPolicySection from "@/components/partners/PartnerPolicySection";
import PartnerCommitments from "@/components/partners/PartnerCommitments";
import PartnerRegistrationForm from "@/components/partners/PartnerRegistrationForm";
import QuoteModal from "@/components/partners/QuoteModal";

export default function PartnersClientView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("Gói Đại Lý Tiêu Chuẩn (200 Key Online Vĩnh Viễn)");

  const handleOpenModal = (pkgName?: string) => {
    if (pkgName) {
      setSelectedPackage(pkgName);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />

      <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc", color: "#1e293b", paddingBottom: "100px", overflowX: "hidden" }}>
        {/* Official Document Legal Strip */}
        <PartnerOfficialHeader />

        {/* Hero Section */}
        <PartnerHero onOpenModal={handleOpenModal} />

        {/* 4 Ưu Thế Đắc Địa */}
        <PartnerAdvantages />

        {/* 2 Gói Đại Lý Chủ Lực (Tiêu Chuẩn & Độc Quyền Tuyến) */}
        <MainPackagesSection onOpenModal={handleOpenModal} />

        {/* Chương Trình Đại Lý Sỉ (Pre-Paid Slots 50, 100, 200 Key) */}
        <PrePaidSlotsSection onOpenModal={handleOpenModal} />

        {/* Chương Trình Cộng Tác Viên (CTV Giới Thiệu & Bán Hàng) */}
        <AffiliateSection onOpenModal={handleOpenModal} />

        {/* Bảng Giá Bán Lẻ Khuyên Nghị & Tỷ Suất Lợi Nhuận */}
        <RetailPriceTable onOpenModal={handleOpenModal} />

        {/* Quy Trình Vận Hành & Cấp Key Tự Động */}
        <OperationsWorkflow />

        {/* Chính Sách Bảo Vệ Quyền Lợi Tuyến Đại Lý */}
        <PartnerPolicySection onOpenModal={handleOpenModal} />

        {/* 6 Cam Kết Thép Của Mercy Tech */}
        <PartnerCommitments />

        {/* Form Đăng Ký Đại Lý Chính Thức */}
        <PartnerRegistrationForm />
      </main>

      <Footer />

      {/* Quote / Registration Modal */}
      <QuoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedPackage={selectedPackage}
      />
    </>
  );
}
