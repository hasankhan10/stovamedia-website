"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  MessageSquare,
  ShieldCheck,
  Award,
  Bot,
  Clapperboard,
  Luggage,
  Play,
  BarChart3,
  TrendingUp,
  Clock
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface AILandingHeroProps {
  onBookClick: () => void;
  onWhatsAppClick?: (url: string) => void;
}

export default function AILandingHero({ onBookClick, onWhatsAppClick }: AILandingHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const whatsAppUrl = "https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20want%20to%20claim%20a%20Free%20Consultation%20Slot%20for%20Travel%20Business";

  const handleOpenDemoChat = () => {
    window.dispatchEvent(new Event("stova_open_travel_aichat"));
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(".hero-badge-node", { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.1 })
        .fromTo(".hero-title-node", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.4")
        .fromTo(".hero-sub-node", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
        .fromTo(".hero-cta-node", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
        .fromTo(".engine-section-node", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.3");
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        [".hero-badge-node", ".hero-title-node", ".hero-sub-node", ".hero-cta-node", ".engine-section-node"],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative flex flex-col text-slate-900 border-b border-[#EAE4D9]/80 overflow-hidden font-['Hind_Siliguri',sans-serif]"
    >
      {/* 1️⃣ Full-Bleed Photographic Background Image with Traveler (High Opacity & Vivid Contrast) */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/travel/hero-traveler.jpg" 
          alt="Traveler on rock peak overlooking mountain valley and river" 
          fill
          priority
          unoptimized
          className="object-cover object-[70%_center] sm:object-center opacity-95" 
        />
        {/* Balanced Soft Film for Clean Text Contrast while keeping Mountain Landscape & River Vivid */}
        <div className="absolute inset-0 bg-white/45 sm:bg-white/35 backdrop-blur-[0.8px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-[#FDFBF7]/40" />
      </div>

      {/* 2️⃣ Main Hero Body Container — Centered in Middle & Compact Height */}
      <div className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-16 pt-8 sm:pt-12 md:pt-14 pb-8 sm:pb-10 max-w-[1050px] mx-auto w-full flex flex-col items-center text-center">
        {/* Frosted Glass Content Panel for High Contrast over Vivid Background */}
        <div className="w-full max-w-3xl mx-auto p-5 sm:p-8 md:p-9 rounded-3xl bg-white/85 sm:bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_15px_45px_rgba(0,0,0,0.08)] flex flex-col items-center">
          {/* Top Tag & Handwritten Script */}
          <div className="hero-badge-node flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3.5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] font-ui text-xs font-bold uppercase tracking-wider shadow-2xs">
              <span>West Bengal&apos;s 1st Travel AI Platform</span>
            </div>

            <div className="font-['Caveat',cursive] text-xl sm:text-2xl text-slate-800 font-bold -rotate-2 select-none tracking-wide">
              Grow Your Travel Business
            </div>
          </div>

          {/* Main Headline with Vivid Color Coding — Centered */}
          <h1 className="hero-title-node font-['Anek_Bangla',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold leading-[1.22] tracking-tight text-slate-900 mb-3.5">
            আপনার <span className="text-[#EA580C]">tour</span> ভালো। তাহলে{" "}
            <span className="text-[#EA580C]">booking কেন</span>{" "}
            <span className="text-[#DC2626]">competitor-এর কাছে</span>{" "}
            চলে যাচ্ছে?
          </h1>

          {/* Subtext with Color Coding — Centered & Compact */}
          <div className="hero-sub-node text-slate-800 text-sm sm:text-base md:text-[16.5px] font-normal leading-relaxed mb-5 space-y-2">
            <p>
              প্রতি মাসে নতুন <span className="text-[#1D4ED8] font-bold">National ও International package</span> launch করছেন, <span className="text-emerald-700 font-semibold">service-ও দারুণ</span>। তবুও মনের মতো <span className="text-[#DC2626] font-bold">response আসছে না</span>।
            </p>
            <p>
              কারণটা tour নয়। কারণ হলো আপনার <span className="text-[#DC2626] font-bold bg-rose-50/90 px-2 py-0.5 rounded-md border border-rose-200">online presence</span>।
            </p>
            <p className="text-slate-700 text-xs sm:text-sm md:text-[15px]">
              আজকের customer আগে <span className="text-[#1D4ED8] font-bold">Google করে</span>, তারপর বুক করে। আর সে যখন আপনাকে খোঁজে, তখন কী পায়? শুধু একটা Facebook page, কিছু ঘোলা ছবি, <span className="text-[#DC2626] font-semibold">অসম্পূর্ণ তথ্য</span>, আর যেখানে booking-এর কোনো ঠিকঠাক system নেই।
            </p>
          </div>

          {/* CTA Buttons Row — Centered */}
          <div className="hero-cta-node flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-3">
            {/* Primary Orange Button */}
            <button
              onClick={onBookClick}
              className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#D94E07] hover:to-[#EA580C] text-white font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 active:scale-[0.98] transition cursor-pointer font-['Hind_Siliguri',sans-serif]"
            >
              <Calendar size={18} />
              <span>আপনার স্লট বুক করুন →</span>
            </button>

            {/* WhatsApp Button (NO phone number) */}
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
              className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-2xs hover:shadow-sm active:scale-[0.98] transition cursor-pointer font-['Hind_Siliguri',sans-serif]"
            >
              <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                <MessageSquare size={12} className="fill-white" />
              </div>
              <span>WhatsApp-এ কথা বলুন</span>
            </a>
          </div>

          {/* Urgency Badge — Centered */}
          <div className="flex items-center justify-center gap-2 text-rose-700 text-xs sm:text-sm font-semibold">
            <Clock size={15} className="text-rose-600 shrink-0" />
            <span>সীমিত স্লট • পুজো অফার মাত্র এক সপ্তাহের জন্য</span>
          </div>
        </div>

        {/* Hero Bottom Guarantee Bar — Centered & Compact */}
        <div className="w-full max-w-3xl pt-3.5 mt-4 border-t border-[#EAE4D9]/80 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-800 font-medium text-center bg-white/80 backdrop-blur-xs rounded-xl px-4 py-2 shadow-2xs">
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
            <strong className="text-slate-900 font-bold text-emerald-800">100% Approval</strong> না পাওয়া পর্যন্ত Final Payment নেই
          </span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="flex items-center gap-2">
            <Award size={16} className="text-amber-600 shrink-0" />
            <strong className="text-slate-900 font-bold">Dr. Paul&apos;s</strong> Website Partner
          </span>
        </div>
      </div>

      {/* 2️⃣ "Travel AI & Motion Engine" Feature Highlights — Compact & Responsive */}
      <div className="engine-section-node px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-10 bg-[#F8F5EE] border-t border-[#EAE4D9]/80 w-full">
        <div className="max-w-[1100px] mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold uppercase tracking-wider font-ui rounded-full mb-2">
            West Bengal&apos;s First
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 font-['Anek_Bangla',sans-serif] mb-1">
            Travel AI & Motion Engine
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base font-ui font-medium mb-6 sm:mb-8">
            Your Travel Business, Supercharged with AI
          </p>

          {/* 3 Horizontal Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-6 text-left">
            {/* Card 1 */}
            <div className="p-5 sm:p-6 bg-white border border-[#EAE4D9] rounded-2xl shadow-xs hover:border-orange-300 hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 mb-3">
                <Bot size={22} />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-1.5 leading-snug">
                24/7 Travel AI Booking Assistant
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Answers questions, explains packages, helps direct booking.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-5 sm:p-6 bg-white border border-[#EAE4D9] rounded-2xl shadow-xs hover:border-orange-300 hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 mb-3">
                <Clapperboard size={22} />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-1.5 leading-snug">
                Cinematic Package Animation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Packages come alive on scroll.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-5 sm:p-6 bg-white border border-[#EAE4D9] rounded-2xl shadow-xs hover:border-orange-300 hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-3">
                <Luggage size={22} />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-1.5 leading-snug">
                Hotel, Car, Itinerary & 1-Click Booking
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                All organized in one place.
              </p>
            </div>
          </div>

          {/* Action Button: Live Demo Trigger */}
          <div className="flex justify-center mb-5">
            <button
              onClick={handleOpenDemoChat}
              className="px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md flex items-center gap-2 cursor-pointer transition active:scale-[0.98] font-['Hind_Siliguri',sans-serif]"
            >
              <Play size={13} className="fill-white" />
              <span>Travel AI অ্যাসিস্ট্যান্ট লাইভ ডেমো টেস্ট করুন →</span>
            </button>
          </div>

          {/* Bottom Metrics Bar */}
          <div className="flex items-center justify-center gap-5 sm:gap-8 text-xs sm:text-sm font-ui font-semibold text-slate-700">
            <span className="flex items-center gap-1.5 text-slate-800">
              <BarChart3 size={15} className="text-orange-600" />
              <span>Zero Lead Drop</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1.5 text-slate-800">
              <TrendingUp size={15} className="text-emerald-600" />
              <span>3.8x Higher Bookings</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
