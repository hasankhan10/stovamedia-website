"use client";

import React, { useRef } from "react";
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

export default function AIEcommercePage() {
  const bookingRef = useRef<HTMLDivElement>(null);

  const handleScrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="font-['Hind_Siliguri',sans-serif] text-[#F8FAFC] bg-[#05070D] overflow-x-hidden selection:bg-indigo-500 selection:text-white pb-24 md:pb-0">
      {/* 1️⃣ Hero Section with Responsive Motion */}
      <AIEcomHero onBookClick={handleScrollToBooking} />

      {/* 2️⃣ Problem vs Solution Comparison */}
      <AIEcomProblem />

      {/* 3️⃣ What We Build (4 Core Pillars) */}
      <AIEcomPillars />

      {/* 4️⃣ Old Way vs AI Way Workflow */}
      <AIEcomWorkflow />

      {/* 5️⃣ Special Offer & Risk Reversals */}
      <AIEcomOffer onBookClick={handleScrollToBooking} />

      {/* 6️⃣ Target Audience Profiles */}
      <AIEcomAudience />

      {/* 7️⃣ Interactive FAQ Accordion */}
      <AIEcomFAQ />

      {/* 8️⃣ Final CTA & Direct Lead Booking Form */}
      <AIEcomBooking bookingRef={bookingRef} />

      {/* 9️⃣ Mobile Sticky Conversion & Urgency Bar */}
      <AIEcomStickyMobileBar onBookClick={handleScrollToBooking} />
    </main>
  );
}
