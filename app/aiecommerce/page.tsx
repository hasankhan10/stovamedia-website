"use client";

import React, { useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  AIEcomHero,
  AIEcomProblem,
  AIEcomPillars,
  AIEcomWorkflow,
  AIEcomOffer,
  AIEcomAudience,
  AIEcomFAQ,
  AIEcomBooking,
  AIEcomBookingModal,
  AIEcomStickyMobileBar
} from "@/components/aiecommerce";

const AIEcomFloatingChatbot = dynamic(
  () => import("@/components/aiecommerce/AIEcomFloatingChatbot"),
  { ssr: false }
);

const AIEcomConfirmModal = dynamic(
  () => import("@/components/aiecommerce/AIEcomConfirmModal"),
  { ssr: false }
);

export default function AIEcommercePage() {
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
      {/* 1️⃣ Hero Section with Responsive Motion */}
      <AIEcomHero 
        onBookClick={handleOpenBookingModal} 
        onWhatsAppClick={handleWhatsAppClick} 
      />

      {/* 2️⃣ Problem vs Solution Comparison */}
      <AIEcomProblem onBookClick={handleOpenBookingModal} />

      {/* 3️⃣ What We Build (4 Core Pillars) */}
      <AIEcomPillars onBookClick={handleOpenBookingModal} />

      {/* 4️⃣ Old Way vs AI Way Workflow */}
      <AIEcomWorkflow onBookClick={handleOpenBookingModal} />

      {/* 5️⃣ Target Audience Profiles (Self-Identification & Qualification) */}
      <AIEcomAudience onBookClick={handleOpenBookingModal} />

      {/* 6️⃣ Special Offer, Guarantees & Scarcity */}
      <AIEcomOffer onBookClick={handleOpenBookingModal} />

      {/* 7️⃣ Interactive FAQ Accordion */}
      <AIEcomFAQ onBookClick={handleOpenBookingModal} />

      {/* 8️⃣ Final CTA & Value Proposition Section */}
      <AIEcomBooking 
        onBookClick={handleOpenBookingModal}
        onWhatsAppClick={handleWhatsAppClick}
      />

      {/* 9️⃣ Mobile Sticky Conversion & Urgency Bar */}
      <AIEcomStickyMobileBar 
        onBookClick={handleOpenBookingModal} 
        onWhatsAppClick={handleWhatsAppClick}
      />

      {/* 🔟 Floating Bottom-Right AI Shopping Assistant Chatbot */}
      <AIEcomFloatingChatbot />

      {/* 1️⃣1️⃣ Appointment Booking Popup Modal */}
      <AIEcomBookingModal 
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        onWhatsAppClick={handleWhatsAppClick}
        onRequestConfirm={handleRequestConfirm}
      />

      {/* 1️⃣2️⃣ Global Decision Confirmation Modal */}
      <AIEcomConfirmModal 
        isOpen={confirmModal.isOpen}
        onClose={handleCloseConfirmModal}
        onConfirm={confirmModal.onConfirm}
      />
    </main>
  );
}
