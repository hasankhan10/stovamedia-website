"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, ArrowRight } from "lucide-react";

interface AILandingStickyMobileBarProps {
  onBookClick: () => void;
  onWhatsAppClick?: (url: string) => void;
}

export default function AILandingStickyMobileBar({ onBookClick, onWhatsAppClick }: AILandingStickyMobileBarProps) {
  const [visible, setVisible] = useState(false);
  const whatsAppUrl = "https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20want%20to%20claim%20a%20Free%20Consultation%20Slot%20for%20Travel%20Business";

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isOver = window.scrollY > 250;
          setVisible((prev) => (prev !== isOver ? isOver : prev));
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
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-full bg-[#EA580C] text-white shadow-[0_-8px_30px_rgba(234,88,12,0.35)] py-3 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          {/* Left + Text */}
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
            className="flex items-center gap-3 hover:opacity-95 transition cursor-pointer"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-sm">
              <MessageSquare size={20} className="fill-white" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 text-left font-ui">
              <span className="font-extrabold text-sm sm:text-base tracking-wide">
                Book Now on WhatsApp
              </span>
              <span className="hidden sm:inline opacity-70">|</span>
              <span className="text-xs sm:text-base font-semibold text-white/95">
                +91 94320 53261
              </span>
            </div>
          </a>

          {/* Right Circular Arrow Button */}
          <button
            onClick={onBookClick}
            aria-label="Book Consultation Slot"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#EA580C] hover:bg-orange-50 transition flex items-center justify-center shadow-md active:scale-95 cursor-pointer shrink-0"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
