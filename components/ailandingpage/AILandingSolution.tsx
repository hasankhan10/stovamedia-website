"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clapperboard, Bot, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AILandingSolution({ onBookClick }: { onBookClick?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(
        ".solution-header-node",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
      gsap.fromTo(
        ".solution-cards-node",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
      );
      gsap.fromTo(
        ".solution-mockup-node",
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
      );
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        [".solution-header-node", ".solution-cards-node", ".solution-mockup-node"],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-14 sm:py-20 md:py-24 px-5 sm:px-8 md:px-12 lg:px-20 bg-[#FDFBF7] relative z-10 border-b border-[#EAE4D9]/80 font-['Hind_Siliguri',sans-serif]"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="solution-header-node text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider font-ui rounded-full mb-3">
            The Solution
          </span>
          <h2 className="font-['Anek_Bangla',sans-serif] text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
            <span className="text-[#EA580C]">Stova Media</span> এই gap-টাই পূরণ করে।
          </h2>
          <p className="text-slate-700 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            আমরা নিয়ে এসেছি West Bengal-এর first-time <span className="text-[#1D4ED8] font-bold">Scrolling Animation</span> ও <span className="text-cyan-700 font-bold">AI Assistant</span> যুক্ত <span className="text-orange-600 font-bold">premium website</span> — শুধু আপনার <span className="text-emerald-700 font-bold">travel business</span>-এর জন্য।
          </p>
        </div>

        {/* 2-Column Grid: 3 Feature Cards on Left, Travel Resort & UI Mockup on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: 3 Core Solution Highlights */}
          <div className="solution-cards-node lg:col-span-6 space-y-4">
            {/* Card 1: Cinematic Scrolling */}
            <div className="p-5 sm:p-6 bg-[#F8F5EE] border border-[#EAE4D9] rounded-2xl flex items-start gap-4 hover:border-orange-300 transition-all shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-orange-100/80 border border-orange-200 flex items-center justify-center text-orange-600 shrink-0 mt-0.5">
                <Clapperboard size={22} />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-1">Cinematic Scrolling</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  প্রতিটি পাহাড়, সমুদ্র বা ঐতিহ্যবাহী ট্যুর প্যাকেজ স্ক্রোল করার সাথে সাথে মোশন আর্টে ভেসে উঠবে।
                </p>
              </div>
            </div>

            {/* Card 2: 24/7 AI Smart Assistant */}
            <div className="p-5 sm:p-6 bg-[#F8F5EE] border border-[#EAE4D9] rounded-2xl flex items-start gap-4 hover:border-orange-300 transition-all shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-cyan-100/80 border border-cyan-200 flex items-center justify-center text-cyan-700 shrink-0 mt-0.5">
                <Bot size={22} />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-1">
                  24/7 AI Smart Assistant <span className="text-xs font-semibold text-slate-500 font-ui">(even at 3 AM)</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  কাস্টমারের প্রশ্নের সঠিক তথ্য দেবে, প্যাকেজ বুঝিয়ে দেবে এবং সাথে সাথে বুকিংয়ে সাহায্য করবে।
                </p>
              </div>
            </div>

            {/* Card 3: 1-Click Booking Funnel */}
            <div className="p-5 sm:p-6 bg-[#F8F5EE] border border-[#EAE4D9] rounded-2xl flex items-start gap-4 hover:border-orange-300 transition-all shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-amber-100/80 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                <Zap size={22} />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-1">
                  1-Click Booking Funnel
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  with hotel, car, itinerary and price + instant phone notification.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Scenic Travel Preview Mockup Card */}
          <div className="solution-mockup-node lg:col-span-6 w-full flex justify-center">
            <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
              <Image 
                src="/travel/solution-resort.jpg" 
                alt="Luxury resort and mountain tour package preview" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Overlay Interactive Mockup Details */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm font-ui">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Motion Package Live</span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-white/70 shadow-xl text-slate-900">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 font-['Anek_Bangla',sans-serif]">
                    পাহাড় ও চা-বাগান স্পেশাল প্যাকেজ
                  </h4>
                  <span className="text-xs font-bold text-emerald-600 font-ui bg-emerald-50 px-2 py-0.5 rounded-md">
                    Instant Confirm
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-ui mb-2.5">
                  Hotel, Dedicated Car, Sightseeing & Itinerary Included
                </p>
                <button
                  onClick={onBookClick}
                  className="w-full py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm active:scale-98"
                >
                  <span>লাইভ ট্রাভেল ওয়েবসাইট ডেমো দেখুন →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
