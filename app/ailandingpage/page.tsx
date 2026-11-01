"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  AILandingHero,
  AILandingProblem,
  AILandingSolution,
  AILandingWhatYouGet,
  AILandingOutcome,
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
    <main className="font-['Hind_Siliguri',sans-serif] text-slate-900 bg-white overflow-x-hidden selection:bg-indigo-500 selection:text-white pb-16 md:pb-0">
      {/* 1️⃣ Hero Section with Motion & Urgency Tag */}
      <AILandingHero 
        onBookClick={handleOpenBookingModal} 
        onWhatsAppClick={handleWhatsAppClick} 
      />

      {/* 2️⃣ Problem vs Solution Comparison (গল্পটা কি এইরকম?) */}
      <AILandingProblem onBookClick={handleOpenBookingModal} />

      {/* 3️⃣ Stova Media Solution Gap Filling */}
      <AILandingSolution onBookClick={handleOpenBookingModal} />

      {/* 4️⃣ What You Get — যা যা থাকবে আপনার website-এ */}
      <AILandingWhatYouGet onBookClick={handleOpenBookingModal} />

      {/* 5️⃣ Outcome Section ("দাদা, ২টো seat confirm করুন।" 📞) */}
      <AILandingOutcome onBookClick={handleOpenBookingModal} />

      {/* 6️⃣ Urgency Section (সারা বছরের সবচেয়ে বড় booking season) */}
      <AILandingUrgency onBookClick={handleOpenBookingModal} />

      {/* 7️⃣ Interactive FAQ Accordion */}
      <AILandingFAQ onBookClick={handleOpenBookingModal} />

      {/* 8️⃣ Final CTA & Value Proposition Section */}
      <AILandingBooking 
        onBookClick={handleOpenBookingModal}
        onWhatsAppClick={handleWhatsAppClick}
      />

      {/* 9️⃣ Mobile Sticky Conversion & Scarcity Bar */}
      <AILandingStickyMobileBar 
        onBookClick={handleOpenBookingModal} 
        onWhatsAppClick={handleWhatsAppClick}
      />

      {/* 🔟 Floating Bottom-Right Travel AI Assistant Chatbot */}
      <AILandingFloatingChatbot />

      {/* 1️⃣1️⃣ Consultation Booking Popup Modal */}
      <AILandingBookingModal 
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        onWhatsAppClick={handleWhatsAppClick}
        onRequestConfirm={handleRequestConfirm}
      />

      {/* 1️⃣2️⃣ Decision Confirmation Modal */}
      <AILandingConfirmModal 
        isOpen={confirmModal.isOpen}
        onClose={handleCloseConfirmModal}
        onConfirm={confirmModal.onConfirm}
      />
    </main>
  );
}
