"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel, SpotlightCard } from "@/components/ui";
import { Film, Bot, MapPin, MousePointerClick, CheckCircle2, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AILandingWhatYouGet({ onBookClick }: { onBookClick?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(
        ".whatyouget-card",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        ".whatyouget-card",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 750px" }}
      className="py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-12 lg:px-20 bg-slate-50/100 relative z-10 border-b border-slate-200/80"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <SectionLabel className="justify-center text-xs sm:text-sm">The Core Deliverables</SectionLabel>
          <h2 className="font-['Anek_Bangla','Amar_Bangla',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 mt-4 mb-4">
            যা যা থাকবে <span className="text-green-700">আপনার website-এ</span>
          </h2>
          <p className="font-['Noto_Sans_Bengali','Noto_Sans',sans-serif] text-slate-600 text-base sm:text-xl md:text-2xl leading-relaxed font-light">
            প্রতিটি কম্পোনেন্ট বিশেষভাবে তৈরি যাতে আপনার ট্যুর লিড হাতছাড়া না হয় এবং কাস্টমারের মনে প্রথম দর্শনেই ভরসা জন্মায়:
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Cinematic Animation */}
          <div className="whatyouget-card">
            <SpotlightCard 
              spotlightColor="rgba(99, 102, 241, 0.08)"
              className="p-7 sm:p-9 md:p-10 border-slate-200/90 bg-white relative rounded-3xl h-full flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.04)]"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                    <Film size={24} />
                  </div>
                  <span className="px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider font-ui rounded-full">
                    Motion Experience
                  </span>
                </div>

                <h3 className="font-['Anek_Bangla','Amar_Bangla',sans-serif] text-xl sm:text-2xl font-bold text-slate-900 mb-3 leading-snug">
                  প্রতিটি package <span className="text-indigo-600 font-extrabold">cinematic animation</span>-এ ফুটে উঠবে
                </h3>

                <p className="font-['Noto_Sans_Bengali','Noto_Sans',sans-serif] text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                  আপনার tour আর শুধু স্থির ছবি আর সাধারণ লেখা নয় — customer <span className="text-cyan-700 font-semibold">scroll করলেই</span> package-টা চোখের সামনে <strong className="text-emerald-700 font-bold">জীবন্ত হয়ে উঠবে</strong>।
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-ui font-semibold">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Scroll-Triggered Interactive Presentation</span>
              </div>
            </SpotlightCard>
          </div>

          {/* Card 2: 24/7 AI Assistant */}
          <div className="whatyouget-card">
            <SpotlightCard 
              spotlightColor="rgba(6, 182, 212, 0.08)"
              className="p-7 sm:p-9 md:p-10 border-slate-200/90 bg-white relative rounded-3xl h-full flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.04)]"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
                    <Bot size={24} />
                  </div>
                  <span className="px-3 py-1 bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider font-ui rounded-full">
                    24/7 Booking Engine
                  </span>
                </div>

                <h3 className="font-['Anek_Bangla','Amar_Bangla',sans-serif] text-xl sm:text-2xl font-bold text-slate-900 mb-3 leading-snug">
                  <span className="text-cyan-700 font-extrabold">AI Assistant</span> — <span className="text-indigo-600 font-extrabold">২৪ ঘণ্টা</span> আপনার হয়ে কাজ করবে
                </h3>

                <p className="font-['Noto_Sans_Bengali','Noto_Sans',sans-serif] text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                  Customer-এর প্রশ্নের <span className="text-emerald-700 font-semibold">সঠিক তথ্য দেবে</span>, package বুঝিয়ে দেবে, <span className="text-emerald-700 font-semibold">booking-এ সাহায্য করবে</span>। <span className="text-slate-800 font-semibold">আপনি ঘুমালেও</span> আপনার <strong className="text-emerald-600 font-bold">business জেগে থাকবে</strong>।
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-ui font-semibold">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Zero Late Replies • Instant Lead Capture</span>
              </div>
            </SpotlightCard>
          </div>

          {/* Card 3: Hotel, Car, Itinerary, Price */}
          <div className="whatyouget-card">
            <SpotlightCard 
              spotlightColor="rgba(16, 185, 129, 0.08)"
              className="p-7 sm:p-9 md:p-10 border-slate-200/90 bg-white relative rounded-3xl h-full flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.04)]"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <MapPin size={24} />
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider font-ui rounded-full">
                    Transparent Details
                  </span>
                </div>

                <h3 className="font-['Anek_Bangla','Amar_Bangla',sans-serif] text-xl sm:text-2xl font-bold text-slate-900 mb-3 leading-snug">
                  Hotel, car, itinerary, price — <span className="text-green-700 font-extrabold">সবকিছু এক জায়গায়</span>
                </h3>

                <p className="font-['Noto_Sans_Bengali','Noto_Sans',sans-serif] text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                  এমনভাবে সাজানো যে customer <span className="text-cyan-700 font-semibold">scroll করতে করতেই সিদ্ধান্ত</span> নিয়ে ফেলবে। <span className="text-slate-900 font-semibold">খুঁজতে হবে না, জিজ্ঞেস করতে হবে না, আটকে যেতে হবে না</span>।
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-ui font-semibold">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Day-by-Day Transparent Breakdown</span>
              </div>
            </SpotlightCard>
          </div>

          {/* Card 4: 1-Click Booking */}
          <div className="whatyouget-card">
            <SpotlightCard 
              spotlightColor="rgba(244, 63, 94, 0.08)"
              className="p-7 sm:p-9 md:p-10 border-slate-200/90 bg-white relative rounded-3xl h-full flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.04)]"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                    <MousePointerClick size={24} />
                  </div>
                  <span className="px-3 py-1 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider font-ui rounded-full">
                    Frictionless Conversion
                  </span>
                </div>

                <h3 className="font-['Anek_Bangla','Amar_Bangla',sans-serif] text-xl sm:text-2xl font-bold text-slate-900 mb-3 leading-snug">
                  <span className="text-green-700 font-extrabold">এক ক্লিকেই</span> booking
                </h3>

                <p className="font-['Noto_Sans_Bengali','Noto_Sans',sans-serif] text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                  পছন্দের package <span className="text-emerald-700 font-semibold">এক ক্লিকেই book</span> করে নিতে পারবে আপনার customer। <strong className="text-green-700 font-bold">যত সহজ booking</strong>, <span className="text-red-500 font-bold">তত কম হাতছাড়া lead</span>।
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-ui font-semibold">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Instant WhatsApp & Phone Lead Alerts</span>
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* Action Callout */}
        {onBookClick && (
          <div className="mt-12 text-center">
            <button
              onClick={onBookClick}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-bold text-sm sm:text-base tracking-wide rounded-2xl shadow-[0_4px_25px_rgba(99,102,241,0.35)] transition cursor-pointer active:scale-98 inline-flex items-center gap-2 font-['Hind_Siliguri',sans-serif]"
            >
              <span>এই সব ফিচার সহ আপনার স্লট বুক করুন</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
