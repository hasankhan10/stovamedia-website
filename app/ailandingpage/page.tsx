"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  AILandingHero,
  AILandingProblem,
  AILandingSolution,
  AILandingWhatYouGet,
  AILandingUrgency,
  AILandingFAQ,
  AILandingBooking,
  AILandingBookingModal,
  AILandingStickyMobileBar
} from "@/components/ailandingpage";

const AILandingFloatingChatbot = dynamic(
  () => import("@/components/ailandingpage/AILandingFloatingChatbot"),
  { ssr: false }
);

const AILandingConfirmModal = dynamic(
  () => import("@/components/ailandingpage/AILandingConfirmModal"),
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
    <main className="font-['Hind_Siliguri',sans-serif] text-slate-900 bg-[#FDFBF7] overflow-x-hidden selection:bg-orange-500 selection:text-white pb-20 sm:pb-24">
      {/* 1️⃣ Hero Section with Motion, Real Picture & Engine Features */}
      <AILandingHero 
        onBookClick={handleOpenBookingModal} 
        onWhatsAppClick={handleWhatsAppClick} 
      />

      {/* 2️⃣ Problem vs Solution Comparison (গল্পটা কি এইরকম?) */}
      <AILandingProblem onBookClick={handleOpenBookingModal} />

      {/* 3️⃣ Stova Media Solution Gap Filling with Resort Preview */}
      <AILandingSolution onBookClick={handleOpenBookingModal} />

      {/* 4️⃣ What You Get — যা যা থাকবে আপনার website-এ */}
      <AILandingWhatYouGet />

      {/* 5️⃣ Urgency & WhatsApp Notification Card & Guarantees */}
      <AILandingUrgency />

      {/* 6️⃣ Interactive FAQ Accordion */}
      <AILandingFAQ />

      {/* 7️⃣ Final CTA with Scenic Panoramic Photography */}
      <AILandingBooking 
        onBookClick={handleOpenBookingModal}
        onWhatsAppClick={handleWhatsAppClick}
      />

      {/* 8️⃣ Sticky Conversion Bar matching document */}
      <AILandingStickyMobileBar 
        onBookClick={handleOpenBookingModal} 
        onWhatsAppClick={handleWhatsAppClick}
      />

      {/* 9️⃣ Floating Bottom-Right Travel AI Assistant Chatbot */}
      <AILandingFloatingChatbot />

      {/* 🔟 Consultation Booking Popup Modal */}
      <AILandingBookingModal 
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        onWhatsAppClick={handleWhatsAppClick}
        onRequestConfirm={handleRequestConfirm}
      />

      {/* 1️⃣1️⃣ Decision Confirmation Modal */}
      <AILandingConfirmModal 
        isOpen={confirmModal.isOpen}
        onClose={handleCloseConfirmModal}
        onConfirm={confirmModal.onConfirm}
      />
    </main>
  );
}
