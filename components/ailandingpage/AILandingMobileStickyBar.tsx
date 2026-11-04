"use client";

import React, { useState, useEffect } from "react";
import { CalendarCheck2 } from "lucide-react";

interface AILandingMobileStickyBarProps {
  onBookClick: () => void;
}

export default function AILandingMobileStickyBar({
  onBookClick,
}: AILandingMobileStickyBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Show when user scrolls down beyond 250px
          setIsVisible(scrollY > 250);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      aria-label="Mobile quick action bar"
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] px-3.5 pt-2.5 pb-[calc(0.65rem+env(safe-area-inset-bottom,0px))] transition-all duration-300 ease-in-out font-['Hind_Siliguri',sans-serif] ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-md mx-auto">
        {/* Booking Consultation CTA */}
        <button
          onClick={onBookClick}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm active:scale-95 transition cursor-pointer"
        >
          <CalendarCheck2 size={18} className="shrink-0" />
          <span>ফ্রি কনসালটেশন স্লট বুক করুন →</span>
        </button>
      </div>
    </div>
  );
}

