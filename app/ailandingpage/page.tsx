"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  AILandingHero,
  AILandingProblem,
  AILandingSolution,
  AILandingUrgency,
  AILandingFAQ,
  AILandingBooking,
  AILandingBookingModal
} from "@/components/ailandingpage";

const AILandingFloatingChatbot = dynamic(
  () => import("@/components/ailandingpage/AILandingFloatingChatbot"),
  { ssr: false }
);

const AILandingConfirmModal = dynamic(
  () => import("@/components/ailandingpage/AILandingConfirmModal"),
  { ssr: false }
);

const AILandingMobileStickyBar = dynamic(
  () => import("@/components/ailandingpage/AILandingMobileStickyBar"),
  { ssr: false }
);

export default function AILandingPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    onConfirm: () => void;
  }>({
    isOpen: false,
    onConfirm: () => {}
  });

  const handleOpenBookingModal = useCallback(() => {
    setIsBookingModalOpen(true);
  }, []);

  const handleCloseBookingModal = useCallback(() => {
    setIsBookingModalOpen(false);
  }, []);

  const handleWhatsAppClick = useCallback((url: string) => {
    setConfirmModal({
      isOpen: true,
      onConfirm: () => {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    });
  }, []);

  const handleRequestConfirm = useCallback((action: () => void) => {
    setConfirmModal({
      isOpen: true,
      onConfirm: action
    });
  }, []);

  const handleCloseConfirmModal = useCallback(() => {
    setConfirmModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <main className="font-['Hind_Siliguri',sans-serif] text-slate-900 bg-[#FDFBF7] overflow-x-hidden selection:bg-orange-500 selection:text-white">
      {/* 1️⃣ Hero Section with Motion, Real Picture & Engine Features */}
      <AILandingHero 
        onBookClick={handleOpenBookingModal} 
      />

      {/* 2️⃣ Problem vs Solution Comparison (গল্পটা কি এইরকম?) */}
      <AILandingProblem onBookClick={handleOpenBookingModal} />

      {/* 3️⃣ Unified Engine & Solution Section (Travel AI & Motion Engine + Stova Media Solution + What You Get) */}
      <AILandingSolution onBookClick={handleOpenBookingModal} />

      {/* 4️⃣ Urgency & WhatsApp Notification Card & Guarantees */}
      <AILandingUrgency />

      {/* 6️⃣ Interactive FAQ Accordion */}
      <AILandingFAQ />

      {/* 7️⃣ Final CTA with Scenic Panoramic Photography */}
      <AILandingBooking 
        onBookClick={handleOpenBookingModal}
      />

      {/* 8️⃣ Floating Bottom-Right Travel AI Assistant Chatbot */}
      <AILandingFloatingChatbot />

      {/* 9️⃣ Consultation Booking Popup Modal */}
      <AILandingBookingModal 
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        onWhatsAppClick={handleWhatsAppClick}
        onRequestConfirm={handleRequestConfirm}
      />

      {/* 🔟 Decision Confirmation Modal */}
      <AILandingConfirmModal 
        isOpen={confirmModal.isOpen}
        onClose={handleCloseConfirmModal}
        onConfirm={confirmModal.onConfirm}
      />

      {/* 1️⃣1️⃣ Mobile Sticky Quick Action Bar (Appears on scroll down) */}
      <AILandingMobileStickyBar 
        onBookClick={handleOpenBookingModal}
      />
    </main>
  );
}
