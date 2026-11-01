"use client";

import React from "react";
import Image from "next/image";
import { MessageSquare, Clock } from "lucide-react";

interface AILandingBookingProps {
  onBookClick?: () => void;
  onWhatsAppClick?: (url: string) => void;
}

export default function AILandingBooking({ 
  onWhatsAppClick 
}: AILandingBookingProps) {
  const whatsAppUrl = "https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20want%20to%20claim%20a%20Free%20Consultation%20Slot%20for%20Travel%20Business";

  return (
    <section 
      id="booking"
      className="relative py-20 sm:py-28 md:py-36 px-5 sm:px-8 md:px-12 lg:px-20 overflow-hidden font-['Hind_Siliguri',sans-serif] text-center"
    >
      {/* Background Scenic Panoramic Photography with Soft Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/travel/final-cta-bg.jpg" 
          alt="Panoramic mountain landscape" 
          fill 
          className="object-cover" 
          priority
        />
        <div className="absolute inset-0 bg-[#FDFBF7]/85 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10 flex flex-col items-center space-y-6 sm:space-y-7">
        <h2 className="font-['Anek_Bangla',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold leading-[1.22] text-slate-900 max-w-3xl mx-auto">
          আপনার ব্যবসাকে এই season-েই একটি নতুন রূপ দিন
        </h2>

        <p className="text-slate-700 text-sm sm:text-base md:text-lg font-ui font-medium max-w-2xl mx-auto">
          West Bengal&apos;s first scrolling animation and AI assistant travel website.
        </p>

        {/* Competitor Callout in Vibrant Red */}
        <div className="font-['Anek_Bangla',sans-serif] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#DC2626] tracking-tight">
          Competitor-কে আর একটাও lead দেবেন না !
        </div>

        {/* Big Green WhatsApp CTA Button */}
        <div className="pt-3 w-full max-w-md mx-auto">
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
            className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base md:text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer active:scale-[0.98] font-['Hind_Siliguri',sans-serif]"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <MessageSquare size={16} className="fill-white" />
            </div>
            <span>+91 94320 53261 এ এখনই কথা বলুন →</span>
          </a>
        </div>

        {/* Urgency Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-slate-200/90 text-rose-600 text-xs sm:text-sm font-semibold shadow-xs font-ui">
          <Clock size={14} className="text-rose-600 shrink-0" />
          <span>Limited Slots | Puja Offer – One Week Only!</span>
        </div>
      </div>
    </section>
  );
}
