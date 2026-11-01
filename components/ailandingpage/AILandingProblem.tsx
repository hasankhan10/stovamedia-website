"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel, SpotlightCard } from "@/components/ui";
import { XCircle, CheckCircle2, Sparkles, ArrowRight, ShieldAlert } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AILandingProblem({ onBookClick }: { onBookClick?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(
        ".problem-left-anim",
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
      gsap.fromTo(
        ".problem-right-anim",
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        [".problem-left-anim", ".problem-right-anim"],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 700px" }}
      className="py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-12 lg:px-20 bg-slate-50/100 relative z-10 border-b border-slate-200/80"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <SectionLabel className="justify-center text-xs sm:text-sm">The Reality Check</SectionLabel>
          <h2 className="font-['Anek_Bangla','Amar_Bangla',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 mt-4 mb-6">
            গল্পটা কি এইরকম <span className="text-red-500">?</span>
          </h2>
          <p className="font-['Noto_Sans_Bengali','Noto_Sans',sans-serif] text-slate-600 text-base sm:text-xl md:text-2xl leading-relaxed font-light">
            <span className="font-semibold text-green-700">Customer</span> আপনার tour দেখে পছন্দ করেছিল। তারপর আপনার page খুলল... <span className="text-rose-600 font-bold">আর বুক করল না 😕</span>
          </p>
        </div>

        {/* Contrast Grid: Ordinary Facebook Page vs Premium Stova Platform */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Ordinary Facebook Page & Incomplete Setup */}
          <div className="problem-left-anim">
            <SpotlightCard 
              spotlightColor="rgba(244, 63, 94, 0.08)"
              className="p-7 sm:p-10 md:p-12 border-rose-200/80 bg-rose-50/40 relative overflow-hidden h-full shadow-[0_4px_25px_rgba(244,63,94,0.04)] rounded-3xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6 text-rose-600">
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center shrink-0">
                    <XCircle size={26} />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
                    শুধু Facebook Page ও সাধারণ উপস্থিতি
                  </h3>
                </div>

                <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base md:text-lg font-medium">
                  <p>
                    কেন বুক করল না? কারণ <span className="text-red-500 font-bold">হাজার হাজার টাকার tour</span>-এর জন্য শুধু একটা Facebook page, কিছু ঘোলা ছবি আর অসম্পূর্ণ তথ্য দেখে <span className="text-rose-600 font-bold">ভরসা করাটাই হয়ে ওঠে কঠিন</span>।
                  </p>
                  <p className="text-slate-700 bg-rose-100/50 p-3.5 rounded-xl border border-rose-200/60 text-xs sm:text-sm font-semibold">
                    আর সেই booking চলে যায় আপনার <strong className="text-rose-600 font-bold">competitor-এর কাছে</strong> — যার service হয়তো আপনার চেয়ে ভালো নয়, কিন্তু website অনেক বেশি professional!
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-rose-200/60 text-xs sm:text-sm font-bold text-rose-600 uppercase tracking-wider font-ui flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldAlert size={15} /> Trust Deficit
                </span>
                <span>Lost Tour Booking</span>
              </div>
            </SpotlightCard>
          </div>

          {/* Card 2: The Google First Impression Reality */}
          <div className="problem-right-anim">
            <SpotlightCard 
              spotlightColor="rgba(6, 182, 212, 0.1)"
              className="p-7 sm:p-10 md:p-12 border-cyan-200/90 bg-cyan-50/40 relative overflow-hidden h-full shadow-[0_4px_25px_rgba(6,182,212,0.06)] rounded-3xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6 text-cyan-700">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-100 border border-cyan-200 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={26} />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
                    Google First Impression-ই সিদ্ধান্ত নেয়
                  </h3>
                </div>

                <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base md:text-lg font-medium">
                  <p>
                    <span className="text-slate-900 font-bold">সত্যিটা সোজা:</span> <strong className="text-blue-700 font-bold">Google</strong>-এ আপনাকে যেভাবে দেখা যায়, সেটাই আপনার <span className="text-cyan-700 font-bold">প্রথম impression</span>। আর প্রথম impression-ই কাস্টমারের সিদ্ধান্ত তৈরি করে দেয়।
                  </p>
                  <p className="bg-cyan-100/60 p-3.5 rounded-xl border border-cyan-200/80 text-xs sm:text-sm text-cyan-950 font-semibold">
                    যখন আপনার ট্যুর প্যাকেজগুলো সিনেমাটিক মোশনে ভেসে উঠবে, ২৪ ঘণ্টা AI উত্তর দেবে এবং ১ ক্লিকে সিট কনফার্ম হবে — তখন কাস্টমার অন্য কোথাও যাবেই না!
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-cyan-200/70 text-xs sm:text-sm font-bold text-cyan-800 uppercase tracking-wider font-ui flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={16} className="text-indigo-600" /> 100% High Trust
                </span>
                <span className="text-emerald-700 font-bold">Guaranteed Conversion</span>
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* Bottom CTA trigger */}
        {onBookClick && (
          <div className="mt-10 sm:mt-12 text-center">
            <button
              onClick={onBookClick}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-2xl bg-white border border-slate-300 hover:border-indigo-400 text-slate-800 hover:text-indigo-600 font-bold text-xs sm:text-sm tracking-wide shadow-xs hover:shadow-md transition cursor-pointer font-['Hind_Siliguri',sans-serif]"
            >
              <span>নিজের ট্রাভেল ব্যবসাকে প্রফেশনাল রূপ দিন →</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
