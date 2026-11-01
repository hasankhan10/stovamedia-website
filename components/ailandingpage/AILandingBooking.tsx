"use client";

import React from "react";
import Image from "next/image";
import { MessageSquare, Clock } from "lucide-react";

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
      className="relative py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden font-['Hind_Siliguri',sans-serif] text-center flex flex-col justify-center items-center"
    >
      {/* 1️⃣ Full-Bleed Background Panoramic Temple & Mountain Landscape (High Opacity & Vivid Contrast) */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/travel/temple-panoramic.jpg" 
          alt="Panoramic mountain landscape with historic temple" 
          fill 
          priority
          unoptimized
          className="object-cover object-bottom opacity-95" 
        />
        {/* Soft Multi-Stop Film preserving maximum temple & mountain clarity */}
        <div className="absolute inset-0 bg-white/40 sm:bg-white/30 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/70 via-transparent to-[#FDFBF7]/70" />
      </div>

      {/* 2️⃣ Centered Content Panel with Frosted Glass for Maximum Readability */}
      <div className="max-w-[850px] mx-auto relative z-10 flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 rounded-3xl bg-white/85 sm:bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_15px_45px_rgba(0,0,0,0.08)] space-y-4">
        {/* Tag — Centered in Middle */}
        <span className="inline-block px-3.5 py-1 bg-orange-100 border border-orange-200 text-orange-950 text-xs font-bold uppercase tracking-wider font-ui rounded-full shadow-2xs">
          Exclusive Puja Season Offer
        </span>

        {/* Main Headline — Centered in Middle */}
        <h2 className="font-['Anek_Bangla',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold leading-[1.22] text-slate-900 max-w-2xl mx-auto">
          আপনার ব্যবসাকে এই <span className="text-orange-600">season-েই</span> একটি নতুন রূপ দিন
        </h2>

        {/* Subhead */}
        <p className="text-slate-800 text-xs sm:text-sm md:text-base font-ui font-medium max-w-xl mx-auto">
          West Bengal&apos;s first scrolling animation and AI assistant travel website.
        </p>

        {/* Competitor Callout in Vibrant Red — Centered in Middle */}
        <div className="font-['Anek_Bangla',sans-serif] text-xl sm:text-2xl md:text-3xl font-extrabold text-[#DC2626] tracking-tight">
          Competitor-কে আর একটাও <span className="underline decoration-red-400 underline-offset-4">lead দেবেন না !</span>
        </div>

        {/* CTA Buttons Row — Centered in Middle */}
        <div className="pt-2 w-full max-w-md mx-auto flex flex-col gap-3">
          {/* Primary Action Button */}
          {onBookClick && (
            <button 
              onClick={onBookClick}
              className="w-full py-3.5 sm:py-4 px-6 bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#D94E07] hover:to-[#EA580C] text-white font-bold text-sm sm:text-base rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] font-['Hind_Siliguri',sans-serif]"
            >
              <span>এখনই আপনার স্লট বুক করুন →</span>
            </button>
          )}

          {/* Big Green WhatsApp CTA Button (NO phone number text) */}
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
            className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] font-['Hind_Siliguri',sans-serif]"
          >
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <MessageSquare size={14} className="fill-white" />
            </div>
            <span>WhatsApp-এ সরাসরি কথা বলুন →</span>
          </a>
        </div>

        {/* Brand Note & Urgency Pill (NO phone number) — Centered in Middle */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-slate-200 text-rose-700 text-xs sm:text-sm font-semibold shadow-xs font-ui">
            <Clock size={14} className="text-rose-600 shrink-0" />
            <span>সীমিত স্লট • পুজো অফার মাত্র এক সপ্তাহের জন্য</span>
          </div>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-xs sm:text-sm font-bold text-slate-800 font-ui">
            Stova Media
          </span>
        </div>
      </div>
    </section>
  );
}
