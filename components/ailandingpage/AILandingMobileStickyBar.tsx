"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, CalendarCheck2 } from "lucide-react";

interface AILandingMobileStickyBarProps {
  onBookClick: () => void;
  onWhatsAppClick?: (url: string) => void;
}

export default function AILandingMobileStickyBar({
  onBookClick,
  onWhatsAppClick,
}: AILandingMobileStickyBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const whatsAppUrl =
    "https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20want%20to%20claim%20a%20Free%20Consultation%20Slot%20for%20Travel%20Business";

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
      <div className="max-w-md mx-auto grid grid-cols-2 gap-2.5 items-center">
        {/* Booking Consultation CTA */}
        <button
          onClick={onBookClick}
          className="w-full py-3 px-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition cursor-pointer"
        >
          <CalendarCheck2 size={16} className="shrink-0" />
          <span className="truncate">স্লট বুক করুন</span>
        </button>

        {/* WhatsApp Instant CTA (Without phone number text) */}
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (onWhatsAppClick) {
              e.preventDefault();
              onWhatsAppClick(whatsAppUrl);
            }
          }}
          className="w-full py-3 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition cursor-pointer"
        >
          <MessageSquare size={16} className="shrink-0 fill-white" />
          <span className="truncate">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

