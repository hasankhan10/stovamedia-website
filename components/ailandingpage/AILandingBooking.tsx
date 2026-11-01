"use client";

import React from "react";
import { MessageSquare, ArrowRight, Flame } from "lucide-react";

interface AILandingBookingProps {
  onBookClick?: () => void;
  onWhatsAppClick?: (url: string) => void;
}

export default function AILandingBooking({ 
  onBookClick,
  onWhatsAppClick 
}: AILandingBookingProps) {
  const whatsAppUrl = "https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20want%20to%20claim%20a%20Free%20Consultation%20Slot%20for%20Travel%20Business";

  return (
    <section 
      id="booking"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 450px" }}
      className="py-16 sm:py-20 md:py-24 px-5 sm:px-8 md:px-12 lg:px-20 bg-slate-50/100 relative z-10 overflow-hidden border-t border-slate-200/80"
    >
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[450px] md:h-[600px] rounded-full opacity-40 z-0"
        style={{ background: "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.04) 60%, transparent 70%)" }}
      />

      <div className="max-w-[1100px] mx-auto relative z-10 text-center space-y-7">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-rose-200 bg-rose-50 text-rose-800 text-xs sm:text-sm font-semibold uppercase tracking-wider font-ui rounded-full shadow-2xs">
          <Flame size={14} className="text-rose-500 animate-bounce" />
          <span>পুজো অফার • মাত্র এক সপ্তাহের জন্য</span>
        </div>

        <h2 className="font-['Anek_Bangla','Amar_Bangla',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] text-slate-900 max-w-4xl mx-auto">
          আপনার ব্যবসাকে <span className="text-green-700">এই season-েই</span> একটি{" "}
          <span className="text-indigo-600">নতুন রূপ দিন</span>
        </h2>

        <p className="font-['Noto_Sans_Bengali','Noto_Sans',sans-serif] text-slate-600 text-base sm:text-xl md:text-2xl leading-relaxed font-medium max-w-3xl mx-auto">
          <span className="text-rose-600 font-bold">Competitor-কে</span> আর{" "}
          <strong className="text-red-500 font-extrabold">
            একটাও lead দেবেন না
          </strong>
          । West Bengal-এর প্রথম Scrolling Animation ও AI Assistant যুক্ত ট্রাভেল ওয়েবসাইট দিয়ে প্রতিটি কাস্টমারের পূর্ণ ভরসা জয় করুন।
        </p>

        {/* CTA Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
          {onBookClick && (
            <button
              onClick={onBookClick}
              className="w-full sm:w-auto flex-1 px-8 py-4.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-bold text-sm sm:text-base tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_4px_25px_rgba(99,102,241,0.35)] hover:shadow-[0_8px_35px_rgba(6,182,212,0.45)] cursor-pointer rounded-2xl active:scale-[0.98] font-['Hind_Siliguri',sans-serif] min-h-[52px]"
            >
              <span>এখনই আপনার স্লট বুক করুন</span>
              <ArrowRight size={18} />
            </button>
          )}

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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base tracking-wider transition-all duration-300 shadow-md min-h-[52px] rounded-2xl cursor-pointer active:scale-[0.98] font-ui"
          >
            <MessageSquare size={18} />
            <span>WhatsApp: +91 94320 53261</span>
          </a>
        </div>
      </div>
    </section>
  );
}
