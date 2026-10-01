"use client";

import React, { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Modular Partner Subcomponents (< 500 lines each)
import PartnerOfficialHeader from "@/components/partners/PartnerOfficialHeader";
import PartnerHero from "@/components/partners/PartnerHero";
import PartnerAdvantages from "@/components/partners/PartnerAdvantages";
import RetailPriceTable from "@/components/partners/RetailPriceTable";
import MainPackagesSection from "@/components/partners/MainPackagesSection";
import PrePaidSlotsSection from "@/components/partners/PrePaidSlotsSection";
import AffiliateSection from "@/components/partners/AffiliateSection";
import OperationsWorkflow from "@/components/partners/OperationsWorkflow";
import PartnerCommitments from "@/components/partners/PartnerCommitments";
import PartnerRegistrationForm from "@/components/partners/PartnerRegistrationForm";
import QuoteModal from "@/components/partners/QuoteModal";

export default function PartnersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("Gói Đại Lý Tiêu Chuẩn (200 Key + 50 Tem Cào)");

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
      <AnnouncementBar />
      <Header />

      <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc", color: "#1e293b", paddingBottom: "100px" }}>
        {/* Official Document Legal Strip */}
        <PartnerOfficialHeader />

        {/* Hero Section */}
        <PartnerHero onOpenModal={handleOpenModal} />

        {/* 4 Ưu Thế Đắc Địa */}
        <PartnerAdvantages />

        {/* 1. Bảng Giá Bán Lẻ Niêm Yết Công Khai Trực Tín */}
        <RetailPriceTable onOpenModal={handleOpenModal} />

        {/* 2 Gói Đại Lý Chủ Lực (Tiêu Chuẩn & Độc Quyền Tuyến từ Ảnh) */}
        <MainPackagesSection onOpenModal={handleOpenModal} />

        {/* 2. Chương Trình Đại Lý Sỉ (Pre-Paid Slots 50, 100, 200 Key) */}
        <PrePaidSlotsSection onOpenModal={handleOpenModal} />

        {/* 3. Chương Trình Cộng Tác Viên (CTV Giới Thiệu & Bán Hàng) */}
        <AffiliateSection onOpenModal={handleOpenModal} />

        {/* 4. Quy Trình 4 Bước Vận Hành, Video YouTube & 5 Bước Chuẩn Hóa Máy Trạm */}
        <OperationsWorkflow />

        {/* 5 Cam Kết Chân Trang từ Mercy Tech Global */}
        <PartnerCommitments />

        {/* Form Đăng Ký Đại Lý Trực Tiếp */}
        <PartnerRegistrationForm />
      </main>

      {/* Popup Liên Hệ & Báo Giá Sỉ Bảo Mật */}
      <QuoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedPackage={selectedPackage}
      />

      <Footer />
    </>
  );
}
