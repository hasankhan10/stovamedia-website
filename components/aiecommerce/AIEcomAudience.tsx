"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel, SpotlightCard } from "@/components/ui";
import { TargetAudience } from "./types";
import { ShoppingBag, Building2, Store, Crown, LineChart, Sparkles, Eye, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const targetAudiences: TargetAudience[] = [
  { title: "D2C Brands", desc: "নিজের Brand-এর জন্য হাই-কনভার্টিং ও স্কেলেবল অনলাইন ফ্ল্যাগশিপ স্টোর।", icon: ShoppingBag, tag: "High Conversion", accent: "text-indigo-400" },
  { title: "Manufacturers", desc: "বিশাল Product Catalogue সহজে স্ট্রাকচার্ড ও স্মার্টলি Showcase করার জন্য।", icon: Building2, tag: "Bulk & B2B Ready", accent: "text-cyan-400" },
  { title: "Retail Business", desc: "অফলাইন রিটেল স্টোরকে আল্ট্রা-মডার্ন ডিজিটাল এক্সপেরিয়েন্সে রূপান্তর করার জন্য।", icon: Store, tag: "Omnichannel", accent: "text-emerald-400" },
  { title: "Premium Brands", desc: "ব্র্যান্ডের আভিজাত্যের সাথে সামঞ্জস্যপূর্ণ ₹100,000 টাকার কোয়ালিটির ডিজিটাল লাক্সারি লুক।", icon: Crown, tag: "Luxury UI/UX", accent: "text-purple-400" },
  { title: "Growing E-commerce", desc: "অর্ডার ও ট্রাফিক ভলিউম বাড়ার সাথে সাথে সিস্টেমকে সম্পূর্ণ অটোমেটেড রাখা।", icon: LineChart, tag: "Scale & Speed", accent: "text-sky-400" }
];

export default function AIEcomAudience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealedCards, setRevealedCards] = useState<Record<number, boolean>>({});
  const [smokingCards, setSmokingCards] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(".audience-card-node", { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } });
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(".audience-card-node", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } });
    });

    return () => mm.revert();
  }, []);

  const handleCardTap = (index: number) => {
    if (revealedCards[index]) return;

    // Trigger smoke animation
    setSmokingCards((prev) => ({ ...prev, [index]: true }));
    setRevealedCards((prev) => ({ ...prev, [index]: true }));

    setTimeout(() => {
      setSmokingCards((prev) => ({ ...prev, [index]: false }));
    }, 1000);
  };

  const handleRevealAll = () => {
    const allRevealed: Record<number, boolean> = {};
    const allSmoking: Record<number, boolean> = {};
    targetAudiences.forEach((_, i) => {
      allRevealed[i] = true;
      allSmoking[i] = true;
    });
    setRevealedCards(allRevealed);
    setSmokingCards(allSmoking);
    setTimeout(() => {
      setSmokingCards({});
    }, 1000);
  };

  return (
    <section 
      ref={sectionRef}
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 650px" }}
      className="py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-12 lg:px-20 bg-[#070A12] relative z-10 border-b border-slate-800/80"
    >
      {/* Smoke keyframes style */}
      <style jsx>{`
        @keyframes smokeVanishCloud {
          0% {
            opacity: 0.95;
            transform: scale(0.85) translate(0, 0);
            filter: blur(8px);
          }
          40% {
            opacity: 0.75;
            transform: scale(1.3) translate(var(--tx, 0px), var(--ty, -15px));
            filter: blur(22px);
          }
          100% {
            opacity: 0;
            transform: scale(1.9) translate(var(--tx, 0px), var(--ty, -35px));
            filter: blur(40px);
          }
        }
        @keyframes smokeRingBurst {
          0% {
            transform: scale(0.6);
            opacity: 0.9;
            filter: blur(6px);
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
            filter: blur(35px);
          }
        }
      `}</style>

      <div className="max-w-[1300px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <SectionLabel className="justify-center text-xs sm:text-sm">Target Profiles</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#F8FAFC] mt-4 mb-4">
            কাদের জন্য এই Platform আদর্শ?
          </h2>
          <p className="text-slate-300 text-base sm:text-xl md:text-2xl font-light mb-5">
            যারা সাধারণ রেডিমেড টেমপ্লেট ছেড়ে প্রফেশনাল, হাই-কনভার্টিং ব্র্যান্ড তৈরি করতে চান:
          </p>

          {/* Interactive Hint Banner & Reveal All Button */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2 bg-indigo-950/40 border border-indigo-500/30 rounded-full shadow-inner">
            <span className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-cyan-300 font-['Hind_Siliguri',sans-serif]">
              <Sparkles size={14} className="text-cyan-400 animate-pulse" />
              কার্ডে ট্যাপ করে ডিটেইলস আনলক করুন
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <button
              onClick={handleRevealAll}
              className="text-xs text-indigo-300 hover:text-white underline underline-offset-4 decoration-indigo-400/50 hover:decoration-white font-ui font-semibold transition-colors cursor-pointer"
            >
              সবগুলো একসাথে দেখুন
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {targetAudiences.map((aud, i) => {
            const Icon = aud.icon;
            const isRevealed = !!revealedCards[i];
            const isSmoking = !!smokingCards[i];

            return (
              <div 
                key={i} 
                className="audience-card-node cursor-pointer select-none"
                onClick={() => handleCardTap(i)}
              >
                <SpotlightCard 
                  spotlightColor="rgba(99, 102, 241, 0.22)"
                  className={`relative p-7 sm:p-9 border bg-[#0B0F19]/90 flex flex-col justify-between transition-all duration-500 h-full rounded-3xl shadow-xl overflow-hidden ${
                    isRevealed 
                      ? "border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.2)]" 
                      : "border-slate-800 hover:border-cyan-500/50"
                  }`}
                >
                  {/* Card Content with Blur Transition */}
                  <div className={`transition-all duration-700 ease-out ${
                    isRevealed 
                      ? "filter-none opacity-100 scale-100" 
                      : "filter blur-[7px] opacity-35 scale-[0.98] pointer-events-none"
                  }`}>
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-3.5 border border-slate-800 bg-[#05070D] ${aud.accent} rounded-2xl`}>
                        <Icon size={24} />
                      </div>
                      <span className="text-xs font-ui uppercase tracking-wider font-bold px-3 py-1 border border-slate-800 text-slate-300 bg-[#05070D] rounded-full">
                        {aud.tag}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3.5">{aud.title}</h3>
                    <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-light">{aud.desc}</p>
                  </div>

                  {/* 🌫️ Frosted Smoky Blur Overlay with Tap Prompt (When Hidden) */}
                  {!isRevealed && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-[#070B16]/65 backdrop-blur-[6px] transition-all duration-500 hover:bg-[#070B16]/50">
                      <div className="relative flex flex-col items-center gap-3 text-center">
                        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-indigo-950/80 border border-cyan-400/60 flex items-center justify-center text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.4)] animate-bounce">
                          <Eye size={22} />
                        </div>
                        <span className="font-['Hind_Siliguri',sans-serif] text-sm sm:text-base font-bold text-white bg-slate-900/90 px-4 py-1.5 rounded-full border border-indigo-500/40 shadow-lg tracking-wide flex items-center gap-2">
                          <Sparkles size={14} className="text-cyan-400 animate-pulse" />
                          <span>ট্যাপ করে আনলক করুন</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* 💨 Smoke Vanish Dissipation Burst (Active on Tap) */}
                  {isSmoking && (
                    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-hidden">
                      {/* Smoke Ring Puff */}
                      <div 
                        className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-cyan-400/40 via-indigo-500/30 to-purple-500/40"
                        style={{ animation: "smokeRingBurst 0.9s cubic-bezier(0.1, 0.8, 0.3, 1) forwards" }}
                      />

                      {/* Smoke Vapor Clouds dispersing outward */}
                      {[
                        { tx: "-30px", ty: "-40px", delay: "0s", bg: "radial-gradient(circle, rgba(147, 197, 253, 0.7) 0%, rgba(99, 102, 241, 0.3) 50%, transparent 70%)" },
                        { tx: "35px", ty: "-30px", delay: "0.05s", bg: "radial-gradient(circle, rgba(165, 243, 252, 0.75) 0%, rgba(6, 182, 212, 0.35) 50%, transparent 70%)" },
                        { tx: "-25px", ty: "30px", delay: "0.08s", bg: "radial-gradient(circle, rgba(216, 180, 254, 0.65) 0%, rgba(168, 85, 247, 0.25) 50%, transparent 70%)" },
                        { tx: "30px", ty: "25px", delay: "0.12s", bg: "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(99, 102, 241, 0.4) 60%, transparent 70%)" },
                        { tx: "0px", ty: "-50px", delay: "0.02s", bg: "radial-gradient(circle, rgba(200, 230, 255, 0.85) 0%, rgba(14, 165, 233, 0.3) 60%, transparent 70%)" }
                      ].map((smoke, sIdx) => (
                        <div
                          key={sIdx}
                          className="absolute w-36 h-36 rounded-full"
                          style={{
                            background: smoke.bg,
                            "--tx": smoke.tx,
                            "--ty": smoke.ty,
                            animation: `smokeVanishCloud 0.95s cubic-bezier(0.16, 1, 0.3, 1) ${smoke.delay} forwards`
                          } as React.CSSProperties}
                        />
                      ))}
                    </div>
                  )}
                </SpotlightCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

