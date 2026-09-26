"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/components/ui";
import { Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AIEcomWorkflow() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(
        ".workflow-card-node",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        ".workflow-card-node",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 650px" }}
      className="py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-12 lg:px-20 bg-[#070A12] relative z-10 border-b border-slate-800/80"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <SectionLabel className="justify-center text-xs sm:text-sm">Workflow Comparison</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#F8FAFC] mt-4 mb-4">
            পুরোনো পদ্ধতি বনাম AI-পাওয়ার্ড পদ্ধতি
          </h2>
          <p className="text-slate-300 text-base sm:text-lg md:text-xl font-light">
            কীভাবে Modern AI Architecture ড্রপ-অফ রেট কমিয়ে বিক্রির গতি বাড়ায়:
          </p>
        </div>

        <div className="space-y-5 sm:space-y-6">
          {/* Old Way */}
          <div className="workflow-card-node p-5 sm:p-7 md:p-8 border border-slate-800 bg-[#05070D] flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 rounded-3xl">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 bg-rose-950/80 text-rose-400 border border-rose-800/40 text-xs sm:text-sm font-bold uppercase font-ui rounded-full">
                Traditional E-commerce
              </span>
              <span className="text-slate-400 text-xs sm:text-sm font-ui">জটিল ও সময়সাপেক্ষ পদ্ধতি — যেখানে Customer বিরক্ত হয়ে চলে যায়</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-wrap items-center gap-2.5 md:gap-3.5 text-xs sm:text-sm md:text-base text-slate-300">
              {["1. Product Catalogue", "২. Manual Search", "৩. Confusing Filter"].map((s, idx) => (
                <span key={idx} className="px-3.5 py-2 bg-[#0B0F19] border border-slate-800 text-center font-medium rounded-xl">{s}</span>
              ))}
              <span className="px-3.5 py-2 bg-rose-950/40 border border-rose-900/40 text-rose-300 font-bold text-center col-span-2 sm:col-span-1 rounded-xl">৪. ৭৩% Drop-off</span>
            </div>
          </div>

          {/* AI Way */}
          <div className="workflow-card-node p-5 sm:p-7 md:p-8 border-2 border-indigo-500/60 bg-gradient-to-r from-indigo-950/40 via-[#0B0F19] to-cyan-950/30 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 shadow-md rounded-3xl">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold text-xs sm:text-sm uppercase font-ui shadow-sm flex items-center gap-1.5 rounded-full">
                <Sparkles size={14} />
                AI-Powered E-commerce
              </span>
              <span className="text-emerald-400 text-sm sm:text-base md:text-lg font-ui font-extrabold tracking-wide">৩.৪ গুণ দ্রুত কনভার্শন</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-wrap items-center gap-2.5 md:gap-3.5 text-xs sm:text-sm md:text-base text-white font-medium">
              {["1. Customer বলে কী চায়", "২. AI ইন্টেন্ট বোঝে", "৩. সঠিক Product দেখায়"].map((s, idx) => (
                <span key={idx} className="px-3.5 py-2 bg-[#05070D] border border-indigo-500/40 text-center rounded-xl">{s}</span>
              ))}
              <span className="px-3.5 py-2 bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 font-bold text-center col-span-2 sm:col-span-1 rounded-xl">৪. ইনস্ট্যান্ট Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
