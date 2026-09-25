"use client";

import React from "react";
import { SplitHeadline, Button, MagneticElement, SpotlightCard } from "@/components/ui";
import { ArrowUpRight, Calendar, MessageSquare, ShieldCheck, Zap } from "lucide-react";

export default function CTASection() {
  return (
    <section id="contact" className="py-20 sm:py-28 md:py-36 px-5 sm:px-8 md:px-12 lg:px-20 bg-[#05070D] relative z-10 border-t border-slate-800/80 overflow-hidden">
      {/* Ambient background lighting */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[160px] opacity-25 z-0"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 70%)"
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <SpotlightCard 
          spotlightColor="rgba(99, 102, 241, 0.25)"
          className="p-8 sm:p-14 md:p-20 lg:p-24 border-slate-800 bg-gradient-to-b from-[#0B0F19]/90 via-[#070A12] to-[#0B0F19]/80 backdrop-blur-xl text-center flex flex-col items-center relative overflow-hidden shadow-2xl"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-indigo-500/40 bg-[#05070D] mb-8 sm:mb-10 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-bold text-cyan-300 font-ui">
              Limited Intake · 2 Projects for Q2/Q3
            </span>
          </div>

          {/* Main Headline */}
          <div className="mb-8 sm:mb-10 max-w-[950px]">
            <SplitHeadline tag="h2" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display leading-[1.02] tracking-tight justify-center text-center text-[#F8FAFC]">
              Ready To Grow Your Business?
            </SplitHeadline>
            <div className="mt-3 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent font-bold">
              Let&apos;s Build Together.
            </div>
          </div>

          <p className="font-ui text-base sm:text-xl text-slate-300 font-light max-w-[640px] leading-relaxed mb-10 sm:mb-12">
            Whether you need a modern custom website, a full-scale web application, or a 24/7 smart AI chatbot, we ship fast, beautiful code on time and within your budget.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mb-12 sm:mb-14 w-full sm:w-auto">
            <MagneticElement className="w-full sm:w-auto">
              <Button 
                variant="primary" 
                href="/contact" 
                className="w-full sm:w-auto px-9 py-5 text-sm sm:text-base font-bold tracking-wider flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.55)] transition-all duration-300 cursor-pointer min-h-[52px]"
              >
                <span>Book Discovery Call</span>
                <Calendar size={17} className="text-white group-hover:scale-110 transition-transform duration-300" />
              </Button>
            </MagneticElement>

            <MagneticElement className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                href="/pricing" 
                className="w-full sm:w-auto px-8 py-5 text-sm sm:text-base uppercase tracking-wider font-bold font-ui border border-slate-700 bg-[#0B0F19]/80 text-slate-200 hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300 flex items-center justify-center gap-2 min-h-[52px]"
              >
                <span>Calculate Project Scope</span>
                <ArrowUpRight size={16} className="text-cyan-400" />
              </Button>
            </MagneticElement>
          </div>

          {/* SLA Trust Badges */}
          <div className="pt-7 border-t border-slate-800/80 flex flex-wrap justify-center items-center gap-6 md:gap-10 text-xs sm:text-sm font-ui text-slate-400">
            <div className="flex items-center gap-2 text-slate-300">
              <Zap size={15} className="text-cyan-400" />
              <span>4-Hour Feasibility Response</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck size={15} className="text-emerald-400" />
              <span>Strict NDA &amp; 100% IP Ownership</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <MessageSquare size={15} className="text-indigo-400" />
              <span>Direct Founder Engineering</span>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
