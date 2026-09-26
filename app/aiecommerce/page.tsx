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
  const bookingRef = useRef<HTMLDivElement>(null);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    onConfirm: () => void;
  }>({
    isOpen: false,
    onConfirm: () => {}
  });

  const handleScrollToBooking = () => {
    const formElement = document.getElementById("booking-form") || bookingRef.current;
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
    <main className="font-['Hind_Siliguri',sans-serif] text-[#F8FAFC] bg-[#05070D] overflow-x-hidden selection:bg-indigo-500 selection:text-white pb-16 md:pb-0">
      {/* 1️⃣ Hero Section with Responsive Motion */}
      <AIEcomHero 
        onBookClick={handleScrollToBooking} 
        onWhatsAppClick={handleWhatsAppClick} 
      />

      {/* 2️⃣ Problem vs Solution Comparison */}
      <AIEcomProblem />

      {/* 3️⃣ What We Build (4 Core Pillars) */}
      <AIEcomPillars />

      {/* 4️⃣ Old Way vs AI Way Workflow */}
      <AIEcomWorkflow />

      {/* 5️⃣ Target Audience Profiles (Self-Identification & Qualification) */}
      <AIEcomAudience />

      {/* 6️⃣ Special Offer, Guarantees & Scarcity */}
      <AIEcomOffer onBookClick={handleScrollToBooking} />

      {/* 7️⃣ Interactive FAQ Accordion */}
      <AIEcomFAQ />

      {/* 8️⃣ Final CTA & Direct Lead Booking Form */}
      <AIEcomBooking 
        bookingRef={bookingRef} 
        onWhatsAppClick={handleWhatsAppClick}
        onRequestConfirm={handleRequestConfirm}
      />

      {/* 9️⃣ Mobile Sticky Conversion & Urgency Bar */}
      <AIEcomStickyMobileBar 
        onBookClick={handleScrollToBooking} 
        onWhatsAppClick={handleWhatsAppClick}
      />

      {/* 🔟 Floating Bottom-Right AI Shopping Assistant Chatbot */}
      <AIEcomFloatingChatbot />

      {/* 1️⃣1️⃣ Global Decision Confirmation Modal */}
      <AIEcomConfirmModal 
        isOpen={confirmModal.isOpen}
        onClose={handleCloseConfirmModal}
        onConfirm={confirmModal.onConfirm}
      />
    </main>
  );
}
