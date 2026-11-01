"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SpotlightCard } from "@/components/ui";
import { Sparkles, Bot, Layers, ArrowRight, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AILandingSolution({ onBookClick }: { onBookClick?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(
        ".solution-card-node",
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        ".solution-card-node",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 650px" }}
      className="py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-12 lg:px-20 bg-white relative z-10 border-b border-slate-200/80"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="solution-card-node">
          <SpotlightCard 
            spotlightColor="rgba(99, 102, 241, 0.08)"
            className="p-8 sm:p-12 md:p-16 border-indigo-200/90 bg-gradient-to-b from-indigo-50/40 via-white to-cyan-50/30 shadow-[0_20px_60px_rgba(99,102,241,0.06)] relative rounded-3xl overflow-hidden"
          >
            {/* Ambient background blur */}
            <div 
              className="pointer-events-none absolute -top-24 right-0 w-80 h-80 rounded-full opacity-30 z-0"
              style={{ background: "radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)" }}
            />

            <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-xs sm:text-sm font-bold uppercase tracking-widest font-ui rounded-full shadow-xs">
                <Sparkles size={14} />
                <span>The Stova Solution</span>
              </div>

              <h2 className="font-['Anek_Bangla','Amar_Bangla',sans-serif] text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.25] text-slate-900">
                <strong className="text-indigo-600 font-extrabold">Stova Media</strong> এই{" "}
                <span className="text-green-700 font-extrabold">
                  gap-টাই পূরণ করে
                </span>
                ।
              </h2>

              <p className="font-['Noto_Sans_Bengali','Noto_Sans',sans-serif] text-slate-700 text-lg sm:text-2xl md:text-3xl font-light leading-relaxed max-w-3xl mx-auto">
                আমরা নিয়ে এসেছি{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 bg-clip-text text-transparent font-bold">
                  West Bengal-এর first-time Scrolling Animation
                </span>{" "}
                ও{" "}
                <strong className="text-cyan-700 font-bold">AI Assistant</strong> যুক্ত{" "}
                <span className="text-emerald-700 font-bold">premium website</span> — শুধু আপনার{" "}
                <span className="text-slate-900 font-bold underline decoration-indigo-400 underline-offset-4">
                  travel business-এর জন্য
                </span>
                ।
              </p>

              {/* 3 Pillar Features preview */}
              <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="p-4 sm:p-5 bg-white border border-slate-200/90 rounded-2xl shadow-2xs space-y-1.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mb-3">
                    <Layers size={20} />
                  </div>
                  <h4 className="font-bold text-base sm:text-lg text-slate-900">Cinematic Scrolling</h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    প্রতিটি পাহাড়, সমুদ্র বা জঙ্গল প্যাকেজ স্ক্রোল করার সাথে সাথে মোশন আর্টে ভেসে উঠবে।
                  </p>
                </div>

                <div className="p-4 sm:p-5 bg-white border border-slate-200/90 rounded-2xl shadow-2xs space-y-1.5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 mb-3">
                    <Bot size={20} />
                  </div>
                  <h4 className="font-bold text-base sm:text-lg text-slate-900">24/7 AI Smart Assistant</h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    রাত ৩টাতেও যদি কোনো কাস্টমার প্যাকেজ সম্পর্কে জানতে চায়, AI সাথে সাথে সঠিক তথ্য দিয়ে লিড লক করবে।
                  </p>
                </div>

                <div className="p-4 sm:p-5 bg-white border border-slate-200/90 rounded-2xl shadow-2xs space-y-1.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-3">
                    <Check size={20} />
                  </div>
                  <h4 className="font-bold text-base sm:text-lg text-slate-900">1-Click Booking Funnel</h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    হোটেল, গাড়ি, ইটেরারি ও প্রাইস এক জায়গায় — পছন্দের প্যাকেজ ১ ক্লিকে সরাসরি আপনার ফোনে বুকিং নোটিফিকেশন পাঠাবে।
                  </p>
                </div>
              </div>

              {/* Action Button */}
              {onBookClick && (
                <div className="pt-6">
                  <button
                    onClick={onBookClick}
                    className="px-9 py-4.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-bold text-sm sm:text-base tracking-wider rounded-2xl shadow-[0_4px_25px_rgba(99,102,241,0.35)] hover:shadow-[0_8px_35px_rgba(6,182,212,0.45)] transition active:scale-98 inline-flex items-center gap-2.5 cursor-pointer font-['Hind_Siliguri',sans-serif]"
                  >
                    <span>আপনার এজেন্সির জন্য এই সিস্টেমটি বুক করুন</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
