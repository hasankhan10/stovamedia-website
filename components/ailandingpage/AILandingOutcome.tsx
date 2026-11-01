"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SpotlightCard } from "@/components/ui";
import { PhoneCall, ArrowRight, Bell, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AILandingOutcome({ onBookClick }: { onBookClick?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(
        ".outcome-card-anim",
        { scale: 0.94, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        ".outcome-card-anim",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 550px" }}
      className="py-16 sm:py-24 md:py-28 px-5 sm:px-8 md:px-12 lg:px-20 bg-white relative z-10 border-b border-slate-200/80 overflow-hidden"
    >
      {/* Background ambient light */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] rounded-full opacity-40 z-0"
        style={{ background: "radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(99, 102, 241, 0.05) 50%, transparent 70%)" }}
      />

      <div className="max-w-[1100px] mx-auto relative z-10">
        <div className="outcome-card-anim">
          <SpotlightCard 
            spotlightColor="rgba(16, 185, 129, 0.12)"
            className="p-8 sm:p-12 md:p-16 border-emerald-200/90 bg-gradient-to-br from-emerald-50/50 via-white to-cyan-50/40 rounded-3xl shadow-[0_20px_60px_rgba(16,185,129,0.08)] relative overflow-hidden text-center"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-bold uppercase tracking-widest font-ui rounded-full shadow-2xs mb-6">
              <Sparkles size={14} className="text-emerald-600" />
              <span>The Transformation Outcome</span>
            </div>

            {/* Sub-label */}
            <h3 className="font-['Noto_Sans_Bengali','Noto_Sans',sans-serif] text-slate-700 text-lg sm:text-2xl md:text-3xl font-medium mb-5">
              এরপর আপনার ফোনে <strong className="text-indigo-600 font-bold">এই কথাটাই আসবে</strong>:
            </h3>

            {/* Main Phone Call / WhatsApp Lead Callout */}
            <div className="my-6 max-w-2xl mx-auto p-6 sm:p-8 bg-white border-2 border-emerald-300 rounded-3xl shadow-[0_12px_40px_rgba(16,185,129,0.14)] relative group hover:border-emerald-400 transition-all">
              {/* Notification Pill */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#25D366] text-white text-[11px] sm:text-xs font-bold uppercase font-ui tracking-wider rounded-full shadow-sm flex items-center gap-1.5">
                <Bell size={12} className="animate-bounce" />
                <span>New WhatsApp Lead Alert</span>
              </div>

              <div className="flex items-center justify-center gap-4 sm:gap-6 mt-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shrink-0 animate-pulse">
                  <PhoneCall size={30} />
                </div>
                <div className="text-left">
                  <div className="font-['Anek_Bangla','Amar_Bangla',sans-serif] text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                    &ldquo;<span className="text-emerald-600">দাদা, ২টো seat confirm করুন।</span>&rdquo; 📞
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 font-ui font-semibold mt-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Verified Customer Booking Request
                  </p>
                </div>
              </div>
            </div>

            {/* Punchline */}
            <p className="font-['Anek_Bangla','Amar_Bangla',sans-serif] text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mt-6 mb-8">
              নিজের <span className="text-green-700 font-extrabold">lead</span> আর{" "}
              <span className="text-red-500 font-extrabold">
                হাতছাড়া হতে দেবেন না
              </span>
              ।
            </p>

            {/* CTA Trigger */}
            {onBookClick && (
              <button
                onClick={onBookClick}
                className="px-9 py-4.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-bold text-sm sm:text-base tracking-wider rounded-2xl shadow-[0_4px_25px_rgba(99,102,241,0.35)] hover:shadow-[0_8px_35px_rgba(6,182,212,0.45)] transition active:scale-98 inline-flex items-center gap-2.5 cursor-pointer font-['Hind_Siliguri',sans-serif]"
              >
                <span>আপনার ট্যুর এজেন্সির জন্য স্লট বুক করুন</span>
                <ArrowRight size={18} />
              </button>
            )}
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
