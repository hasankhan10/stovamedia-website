"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Clapperboard,
  Bot,
  CalendarDays,
  Zap,
  Play,
  BarChart3,
  TrendingUp,
  Sparkles
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AILandingSolution({ onBookClick }: { onBookClick?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);

  const handleOpenDemoChat = () => {
    window.dispatchEvent(new Event("stova_open_travel_aichat"));
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(
        ".solution-header-node",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );
      gsap.fromTo(
        ".solution-card-node",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
      gsap.fromTo(
        ".solution-preview-node",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
      );
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        [".solution-header-node", ".solution-card-node", ".solution-preview-node"],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
      );
    });

    return () => mm.revert();
  }, []);

  const features = [
    {
      icon: Clapperboard,
      title: "প্রতিটি package cinematic animation-এ ফুটে উঠবে",
      renderDesc: () => (
        <span>
          আপনার tour আর শুধু ছবি আর লেখা নয় — customer scroll করলেই package-টা চোখের সামনে <span className="text-emerald-700 font-bold">জীবন্ত হয়ে উঠবে</span>।
        </span>
      ),
      iconColor: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      icon: Bot,
      title: "AI Assistant — ২৪ ঘণ্টা আপনার হয়ে কাজ করবে",
      renderDesc: () => (
        <span>
          Customer-এর প্রশ্নের <span className="text-emerald-700 font-bold">সঠিক তথ্য দেবে</span>, package বুঝিয়ে দেবে, booking-এ সাহায্য করবে। আপনি ঘুমালেও আপনার <span className="text-orange-600 font-bold">business জেগে থাকবে</span>।
        </span>
      ),
      iconColor: "text-orange-600 bg-orange-50 border-orange-200"
    },
    {
      icon: CalendarDays,
      title: "Hotel, car, itinerary, price — সবকিছু এক জায়গায়",
      renderDesc: () => (
        <span>
          এমনভাবে সাজানো যে customer scroll করতে করতেই <span className="text-emerald-700 font-bold">সিদ্ধান্ত নিয়ে ফেলবে</span>। খুঁজতে হবে না, জিজ্ঞেস করতে হবে না, আটকে যেতে হবে না।
        </span>
      ),
      iconColor: "text-rose-600 bg-rose-50 border-rose-200"
    },
    {
      icon: Zap,
      title: "এক ক্লিকেই booking",
      renderDesc: () => (
        <span>
          পছন্দের package <span className="text-emerald-700 font-bold">এক ক্লিকেই book</span> করে নিতে পারবে আপনার customer। যত সহজ booking, তত কম <span className="text-[#DC2626] font-bold">হাতছাড়া lead</span>।
        </span>
      ),
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-200"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-10 lg:px-16 bg-[#F8F5EE] relative z-10 border-b border-[#EAE4D9]/80 font-['Hind_Siliguri',sans-serif]"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* 1️⃣ Unified Section Header */}
        <div className="solution-header-node text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-orange-100 border border-orange-200 text-orange-900 text-xs font-bold uppercase tracking-wider font-ui rounded-full mb-3 shadow-2xs">
            <Sparkles size={13} className="text-orange-600" />
            <span>Travel AI &amp; Motion Engine</span>
          </div>

          <h2 className="font-['Anek_Bangla',sans-serif] text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-3">
            <span className="text-[#EA580C]">Stova Media</span> এই gap-টাই পূরণ করে
          </h2>

          <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            West Bengal-এর প্রথম <span className="text-[#1D4ED8] font-bold">Scrolling Animation</span> ও <span className="text-emerald-700 font-bold">AI Assistant</span> যুক্ত আধুনিক ট্রাভেল ওয়েবসাইট—যা যা থাকবে আপনার সিস্টেমে:
          </p>
        </div>

        {/* 2️⃣ The 4 Core Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-12">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="solution-card-node p-5 sm:p-6 bg-white border border-[#EAE4D9] rounded-2xl shadow-xs hover:border-orange-300 hover:shadow-md transition-all flex flex-col items-start text-left justify-between"
              >
                <div>
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-3.5 ${item.iconColor}`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-['Anek_Bangla',sans-serif] font-bold text-base sm:text-lg text-slate-900 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <div className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.renderDesc()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3️⃣ Live Interactive Demo & High-Opacity Scenic Mockup Showcase */}
        <div className="solution-preview-node bg-white border border-[#EAE4D9] rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Action & Live Metrics */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-ui uppercase tracking-wider">
                Interactive Live Preview
              </span>

              <h3 className="font-['Anek_Bangla',sans-serif] text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                আপনার এজেন্সির ওয়েবসাইটের লাইভ ডেমো নিজে ট্রাই করুন
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                কাস্টমার যখনই নক করবে, সাথে সাথে এআই সহকারী সম্পূর্ণ প্যাকেজ শিডিউল ও বুকিং তথ্য বুঝিয়ে দেবে।
              </p>

              {/* Action Button: Live Demo Trigger */}
              <div className="pt-2 w-full sm:w-auto">
                <button
                  onClick={handleOpenDemoChat}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transition active:scale-[0.98] font-['Hind_Siliguri',sans-serif]"
                >
                  <Play size={14} className="fill-white" />
                  <span>Travel AI অ্যাসিস্ট্যান্ট লাইভ ডেমো টেস্ট করুন →</span>
                </button>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="flex items-center justify-center lg:justify-start gap-5 sm:gap-8 pt-2 text-xs sm:text-sm font-ui font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 text-slate-800">
                  <BarChart3 size={16} className="text-orange-600" />
                  <span>Zero Lead Drop</span>
                </span>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1.5 text-slate-800">
                  <TrendingUp size={16} className="text-emerald-600" />
                  <span>3.8x Higher Bookings</span>
                </span>
              </div>
            </div>

            {/* Right: High-Opacity Scenic Resort Mockup Card (100% Opacity) */}
            <div className="lg:col-span-6 w-full flex justify-center">
              <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white group bg-slate-100">
                <Image 
                  src="/travel/tea-garden-resort.jpg?v=2" 
                  alt="Luxury resort and mountain tour package preview" 
                  fill 
                  priority
                  unoptimized
                  className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Overlay Interactive Mockup Details */}
                <div className="absolute top-3.5 left-3.5 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm font-ui">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Motion Package Live</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-white/95 backdrop-blur-md rounded-xl border border-white/70 shadow-lg text-slate-900">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-['Anek_Bangla',sans-serif]">
                      পাহাড় ও চা-বাগান স্পেশাল প্যাকেজ
                    </h4>
                    <span className="text-[11px] font-bold text-emerald-700 font-ui bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Instant Confirm
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-ui mb-2">
                    Hotel, Dedicated Car, Sightseeing &amp; Itinerary Included
                  </p>
                  {onBookClick && (
                    <button
                      onClick={onBookClick}
                      className="w-full py-1.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs active:scale-98 font-['Hind_Siliguri',sans-serif]"
                    >
                      <span>লাইভ ট্রাভেল ওয়েবসাইট ডেমো দেখুন →</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
