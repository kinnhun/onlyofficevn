import React from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DocsSection from "@/components/DocsSection";
import CollaborationSection from "@/components/CollaborationSection";
import AIAssistantsSection from "@/components/AIAssistantsSection";
import SecuritySection from "@/components/SecuritySection";
import SolutionsSection from "@/components/SolutionsSection";
import CustomersSection from "@/components/CustomersSection";
import RatingsSection from "@/components/RatingsSection";
import LatestNewsSection from "@/components/LatestNewsSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <HeroSection />
        <DocsSection />
        <CollaborationSection />
        <AIAssistantsSection />
        <SecuritySection />
        <SolutionsSection />
        <CustomersSection />
        <RatingsSection />
        <LatestNewsSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
