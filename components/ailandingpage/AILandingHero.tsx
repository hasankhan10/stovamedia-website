"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  ShieldCheck,
  Award,
  Clock
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface AILandingHeroProps {
  onBookClick: () => void;
}

export default function AILandingHero({ onBookClick }: AILandingHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(".hero-badge-node", { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.1 })
        .fromTo(".hero-title-node", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.4")
        .fromTo(".hero-sub-node", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
        .fromTo(".hero-cta-node", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5");
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        [".hero-badge-node", ".hero-title-node", ".hero-sub-node", ".hero-cta-node"],
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
      {/* 1️⃣ Full-Bleed Photographic Background Image with Traveler (100% Maximum Vivid Opacity) */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/travel/hero-traveler.jpg" 
          alt="Traveler on rock peak overlooking mountain valley and river" 
          fill
          priority
          unoptimized
          className="object-cover object-[70%_center] sm:object-center opacity-100" 
        />
        {/* Subtle, non-intrusive bottom fade to seamlessly blend with page flow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-black/10 opacity-70" />
      </div>

      {/* 2️⃣ Main Hero Body Container — Centered in Middle & Compact Height */}
      <div className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-16 pt-8 sm:pt-12 md:pt-14 pb-8 sm:pb-10 max-w-[1050px] mx-auto w-full flex flex-col items-center text-center">
        {/* Frosted Glass Content Panel for High Contrast over 100% Vivid Background */}
        <div className="w-full max-w-3xl mx-auto p-5 sm:p-8 md:p-9 rounded-3xl bg-white/90 sm:bg-white/85 border border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.12)] flex flex-col items-center">
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

          {/* Subtext with Color Coding — Centered & Clean */}
          <p className="hero-sub-node text-slate-700 text-sm sm:text-base md:text-lg font-normal leading-relaxed mb-6 max-w-xl mx-auto">
            সাধারণ Facebook পেজে traveler-রা আর আস্থা পায় না। West Bengal-এর প্রথম{" "}
            <span className="text-[#1D4ED8] font-bold">Scrolling Animation</span> ও{" "}
            <span className="text-emerald-700 font-bold">24/7 AI Assistant</span> দিয়ে আপনার এজেন্সির বুকিং বাড়ান বহুগুণ।
          </p>

          {/* CTA Button — Centered */}
          <div className="hero-cta-node flex items-center justify-center w-full sm:w-auto mb-3">
            {/* Primary Orange Button */}
            <button
              onClick={onBookClick}
              className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#D94E07] hover:to-[#EA580C] text-white font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 active:scale-[0.98] transition cursor-pointer font-['Hind_Siliguri',sans-serif]"
            >
              <Calendar size={18} />
              <span>আপনার ফ্রি স্লট বুক করুন →</span>
            </button>
          </div>

          {/* Urgency Badge — Centered */}
          <div className="flex items-center justify-center gap-2 text-rose-700 text-xs sm:text-sm font-semibold">
            <Clock size={15} className="text-rose-600 shrink-0" />
            <span>সীমিত স্লট • পুজো অফার মাত্র এক সপ্তাহের জন্য</span>
          </div>
        </div>

        {/* Hero Bottom Trust Bar — Centered & Clean */}
        <div className="w-full max-w-3xl pt-3 mt-4 border-t border-[#EAE4D9]/80 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-800 font-medium text-center bg-white/85 backdrop-blur-xs rounded-xl px-4 py-2.5 shadow-2xs">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
            <span>100% স্যাটিসফ্যাকশন না পাওয়া পর্যন্ত ফাইনাল পেমেন্ট নেই</span>
          </span>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <Award size={16} className="text-orange-600 shrink-0" />
            <span>কোনো টেকনিক্যাল জ্ঞান প্রয়োজন নেই</span>
          </span>
        </div>
      </div>
    </section>
  );
}
