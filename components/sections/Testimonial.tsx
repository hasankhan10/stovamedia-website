"use client";

import React from "react";
import { SectionLabel, SpotlightCard } from "@/components/ui";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export default function Testimonial() {
  return (
    <section className="py-20 sm:py-28 md:py-36 px-5 sm:px-8 md:px-12 lg:px-20 text-center flex flex-col items-center relative z-10 overflow-hidden border-t border-slate-800/80 bg-[#070A12]">
      {/* Background ambient lighting */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[140px] opacity-15 z-0"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, transparent 70%)"
        }}
      />

      <div className="relative z-10 max-w-[1100px] mx-auto w-full flex flex-col items-center">
        <SectionLabel className="justify-center">Client Perspective</SectionLabel>
        
        <SpotlightCard 
          spotlightColor="rgba(99, 102, 241, 0.2)"
          className="mt-8 sm:mt-10 p-8 sm:p-12 md:p-16 lg:p-20 border-slate-800 bg-[#0B0F19]/90 backdrop-blur-md relative overflow-hidden text-center w-full shadow-2xl"
        >
          {/* Rating stars */}
          <div className="flex justify-center items-center gap-1.5 mb-7 text-cyan-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" stroke="none" />
            ))}
            <span className="ml-2.5 font-ui text-xs font-semibold tracking-widest text-slate-400 uppercase">
              Verified Client Outcome
            </span>
          </div>

          {/* Quotation */}
          <div className="relative my-6 max-w-[900px] mx-auto">
            <Quote size={48} className="absolute -top-6 -left-6 md:-left-10 text-indigo-500/20 -scale-x-100 select-none pointer-events-none" />
            
            <blockquote className="font-display italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#F8FAFC] leading-[1.25] tracking-tight relative z-10 font-normal">
              &ldquo;They didn&apos;t just build what we asked for — they <span className="text-cyan-400 not-italic font-medium">challenged our assumptions</span> on bloated features, cut our delivery timeline in half, and delivered an enterprise platform that scaled effortlessly.&rdquo;
            </blockquote>
          </div>

          {/* Author */}
          <div className="mt-10 pt-7 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full border border-indigo-500/50 bg-[#05070D] flex items-center justify-center text-cyan-400 font-display text-lg font-bold shadow-[0_0_15px_rgba(6,182,212,0.25)]">
              DR
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-display text-lg text-[#F8FAFC] font-bold">Dr. Rahul S.</span>
                <CheckCircle2 size={16} className="text-emerald-400" />
              </div>
              <p className="font-ui text-xs uppercase tracking-widest text-slate-400 font-light">
                Founder, Clinical OPD &amp; Healthcare Network
              </p>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
