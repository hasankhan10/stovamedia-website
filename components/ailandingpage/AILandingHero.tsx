"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticElement, SpotlightCard } from "@/components/ui";
import {
  Sparkles,
  Bot,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Award,
  Compass,
  MapPin,
  Calendar,
  Zap,
  Flame
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface AILandingHeroProps {
  onBookClick: () => void;
  onWhatsAppClick?: (url: string) => void;
}

export default function AILandingHero({ onBookClick, onWhatsAppClick }: AILandingHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const chatCardRef = useRef<HTMLDivElement>(null);

  const handleOpenDemoChat = () => {
    window.dispatchEvent(new Event("stova_open_travel_aichat"));
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(".hero-badge-node", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.1 })
        .fromTo(".hero-title-node", { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.5")
        .fromTo(".hero-sub-node", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
        .fromTo(".hero-cta-node", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, "-=0.5")
        .fromTo(chatCardRef.current, { x: 40, opacity: 0, scale: 0.95 }, { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }, "-=0.6");

      if (contentRef.current) {
        gsap.to(contentRef.current, {
          yPercent: 12,
          opacity: 0.4,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 }
        });
      }
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        [".hero-badge-node", ".hero-title-node", ".hero-sub-node", ".hero-cta-node", chatCardRef.current],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power2.out" }
      );
    });

    return () => mm.revert();
  }, []);

  const whatsAppUrl = "https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20want%20to%20claim%20a%20Free%20Consultation%20Slot%20for%20Travel%20Business";

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[92svh] flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-20 pt-[60px] md:pt-[90px] pb-16 md:pb-24 overflow-hidden bg-white border-b border-slate-200/80"
    >
      {/* Soft Ambient Light Glows */}
      <div 
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[850px] h-[600px] md:h-[850px] rounded-full opacity-60 z-0"
        style={{ background: "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.04) 50%, transparent 70%)" }}
      />

      <div 
        ref={contentRef}
        className="max-w-[1300px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10"
      >
        {/* Left Headline & Copy */}
        <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* Brand Logo Row */}
          <div className="hero-badge-node flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-60 transition duration-300" />
                <Image 
                  src="/logo.jpeg" 
                  alt="Stova Media Logo" 
                  width={220} 
                  height={60} 
                  className="relative h-11 sm:h-13 md:h-14 w-auto object-contain rounded-full border border-slate-200 shadow-md" 
                  priority
                />
              </div>
            </Link>
            <span className="h-4 w-px bg-slate-300 hidden sm:inline" />
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-indigo-200/80 bg-indigo-50/60 rounded-full shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-600" />
              </span>
              <span className="text-[11px] sm:text-xs uppercase font-ui tracking-wider font-bold text-indigo-700">
                West Bengal&apos;s 1st Travel AI Platform
              </span>
            </div>
          </div>

          {/* Main Hero Headline */}
          <h1 className="hero-title-node font-['Anek_Bangla','Amar_Bangla',sans-serif] text-3xl sm:text-5xl md:text-6xl lg:text-[56px] font-bold leading-[1.22] tracking-tight text-slate-900 mb-6 sm:mb-8 text-center lg:text-left">
            আপনার <span className="text-green-700">tour ভালো</span>। তাহলে{" "}
            <span className="text-blue-700 font-bold">
              booking কেন
            </span>{" "}
            <span className="text-rose-600">competitor-এর কাছে চলে যাচ্ছে?</span>
          </h1>

          {/* Subtitle with Color Coded Words */}
          <div className="hero-sub-node font-['Noto_Sans_Bengali','Noto_Sans',sans-serif] text-base sm:text-xl md:text-2xl text-slate-600 font-light leading-relaxed mb-8 sm:mb-10 max-w-2xl text-center lg:text-left font-medium space-y-4">
            <p>
              প্রতি মাসে নতুন <strong className="text-indigo-600 font-semibold">National ও International package</strong> launch করছেন, <span className="text-emerald-700 font-semibold">service-ও দারুণ</span>। তবুও মনের মতো <span className="text-rose-600 font-semibold">response আসছে না</span>।
            </p>
            <p className="text-sm sm:text-lg md:text-xl text-slate-700 border-l-2 border-indigo-500/50 pl-4 py-0.5">
              কারণটা tour নয়। কারণ হলো আপনার <strong className="text-rose-600 font-bold underline decoration-rose-300 underline-offset-4">online presence</strong>।
            </p>
            <p className="text-xs sm:text-base md:text-lg text-slate-600 font-normal">
              আজকের customer আগে <span className="text-blue-600 font-bold">Google</span> করে, তারপর <span className="text-emerald-600 font-semibold">বুক করে</span>। আর সে যখন আপনাকে খোঁজে, তখন কী পায়? শুধু একটা Facebook page, কিছু <span className="text-red-500 font-semibold">ঘোলা ছবি</span>, <span className="text-red-500 font-semibold">অসম্পূর্ণ তথ্য</span>, আর যেখানে <span className="text-red-600 font-bold">booking-এর কোনো ঠিকঠাক system নেই</span>।
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="hero-cta-node flex flex-col items-center lg:items-start gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
              <MagneticElement className="w-full sm:w-auto">
                <button 
                  onClick={onBookClick} 
                  className="w-full sm:w-auto px-9 py-5 text-sm sm:text-base md:text-lg font-bold tracking-wider flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-[0_4px_25px_rgba(99,102,241,0.35)] hover:shadow-[0_8px_35px_rgba(6,182,212,0.45)] transition-all duration-300 cursor-pointer min-h-[52px] rounded-2xl active:scale-[0.98]"
                >
                  <span>আপনার স্লট বুক করুন</span>
                  <ArrowRight size={18} />
                </button>
              </MagneticElement>

              <MagneticElement className="w-full sm:w-auto">
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
                  className="w-full sm:w-auto px-8 py-5 text-sm sm:text-base uppercase tracking-wider font-bold font-ui border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-all duration-300 flex items-center justify-center gap-2.5 shadow-sm min-h-[52px] rounded-2xl active:scale-[0.98]"
                >
                  <MessageSquare size={17} className="text-[#25D366]" />
                  <span>WhatsApp-এ কথা বলুন</span>
                </a>
              </MagneticElement>
            </div>

            {/* Urgency tag directly under CTA */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold font-['Hind_Siliguri',sans-serif]">
              <Flame size={15} className="text-rose-500 animate-bounce" />
              <span>সীমিত স্লট • পুজো অফার মাত্র এক সপ্তাহের জন্য</span>
            </div>
          </div>

          {/* Social Proof Line */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 sm:gap-6 text-sm sm:text-base font-ui text-slate-600">
            <span className="flex items-center gap-2 text-slate-700 font-semibold">
              <ShieldCheck size={18} className="text-emerald-600 flex-shrink-0" /> <span className="text-green-600">১০০% Approval</span> না পাওয়া পর্যন্ত Final Payment নেই
            </span>
            <span className="flex items-center gap-2 text-slate-700 font-semibold">
              <Award size={18} className="text-cyan-600 flex-shrink-0" /> <span className="text-red-500">Dr. Paul&apos;s</span> Website Partner
            </span>
          </div>
        </div>

        {/* Right Feature Showcase & Live Trigger Card */}
        <div className="lg:col-span-5 w-full">
          <div ref={chatCardRef}>
            <SpotlightCard 
              spotlightColor="rgba(99, 102, 241, 0.08)"
              className="p-6 sm:p-8 md:p-9 border-slate-200/90 bg-white/90 shadow-[0_15px_50px_rgba(0,0,0,0.06)] relative rounded-3xl backdrop-blur-xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-[0_4px_15px_rgba(99,102,241,0.3)]">
                    <Compass size={22} className="animate-spin-slow" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Travel AI & Motion Engine
                    </h3>
                    <p className="text-xs text-indigo-600 uppercase tracking-wider font-ui font-semibold">
                      West Bengal First Time
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-[11px] bg-emerald-50 border border-emerald-200 text-emerald-700 font-ui font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Live System
                </span>
              </div>

              {/* 3 Core Highlights */}
              <div className="space-y-3.5 mb-7">
                {[
                  {
                    icon: Bot,
                    title: "24/7 Travel AI Booking Assistant",
                    desc: "কাস্টমারের প্রশ্নের সঠিক তথ্য দেয় ও প্যাকেজ বুঝিয়ে সরাসরি বুকিং করায়।",
                    accent: "text-indigo-600 bg-indigo-50 border-indigo-100"
                  },
                  {
                    icon: Sparkles,
                    title: "Cinematic Package Animation",
                    desc: "কাস্টমার স্ক্রোল করলেই প্রতিটি ট্যুর প্যাকেজ চোখের সামনে জীবন্ত হয়ে ওঠে।",
                    accent: "text-cyan-700 bg-cyan-50 border-cyan-100"
                  },
                  {
                    icon: Calendar,
                    title: "Hotel, Car, Itinerary & 1-Click Booking",
                    desc: "সবকিছু এক জায়গায় গোছানো — কাস্টমার স্ক্রোল করতেই সহজে সিদ্ধান্ত নেয়।",
                    accent: "text-emerald-700 bg-emerald-50 border-emerald-100"
                  }
                ].map((f, idx) => {
                  const Icon = f.icon;
                  return (
                    <div key={idx} className="p-3.5 sm:p-4 bg-slate-50/70 border border-slate-200/80 rounded-2xl flex items-start gap-3.5 hover:border-indigo-300 hover:bg-white transition-all shadow-xs">
                      <div className={`p-2.5 rounded-xl border ${f.accent} shrink-0 mt-0.5`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-0.5">{f.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed font-semibold">{f.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Interactive Demo Trigger Button */}
              <button
                onClick={handleOpenDemoChat}
                className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_25px_rgba(6,182,212,0.45)] transition-all duration-300 cursor-pointer hover:brightness-105 active:scale-[0.98] font-['Hind_Siliguri',sans-serif]"
              >
                <Zap size={16} className="text-amber-300 fill-amber-300 animate-pulse" />
                <span>Travel AI অ্যাসিস্ট্যান্ট লাইভ ডেমো ট্রাই করুন →</span>
              </button>

              {/* Bottom Micro Metrics */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-ui">
                <span className="flex items-center gap-1.5 text-indigo-600 font-medium">
                  <MapPin size={14} /> Zero Lead Drop
                </span>
                <span className="text-emerald-600 font-bold">
                  3.8x Higher Bookings
                </span>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
