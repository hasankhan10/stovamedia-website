"use client";

import React from "react";
import { SectionLabel, SpotlightCard } from "@/components/ui";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export default function Testimonial() {
  return (
    <section className="py-24 md:py-36 px-6 md:px-12 lg:px-20 text-center flex flex-col items-center relative z-10 overflow-hidden border-t border-border/70 bg-ink">
      {/* Ambient background gold glow */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[140px] opacity-15 z-0"
        style={{
          background: "radial-gradient(circle, rgba(201, 168, 76, 0.4) 0%, transparent 70%)"
        }}
      />

      <div className="relative z-10 max-w-[1100px] mx-auto w-full flex flex-col items-center">
        <SectionLabel className="justify-center">Client Perspective</SectionLabel>
        
        <SpotlightCard className="mt-10 p-10 md:p-16 lg:p-20 border-border/80 bg-card/40 backdrop-blur-md relative overflow-hidden text-center w-full shadow-2xl">
          {/* Top Rating stars */}
          <div className="flex justify-center items-center gap-1.5 mb-8 text-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" stroke="none" />
            ))}
            <span className="ml-2 font-ui text-xs font-semibold tracking-widest text-dim uppercase">
              Verified Client Outcome
            </span>
          </div>

          {/* Quotation Body */}
          <div className="relative my-6 max-w-[900px] mx-auto">
            <Quote size={48} className="absolute -top-6 -left-6 md:-left-10 text-gold/15 -scale-x-100 select-none pointer-events-none" />
            
            <blockquote className="font-display italic text-2xl sm:text-3xl md:text-5xl lg:text-5xl text-cream leading-[1.25] tracking-tight relative z-10 font-normal">
              &ldquo;They didn&apos;t just build what we asked for — they <span className="text-gold not-italic font-medium">challenged our assumptions</span> on bloated features, cut our delivery timeline in half, and delivered an enterprise platform that scaled effortlessly.&rdquo;
            </blockquote>
          </div>

          {/* Author attribution */}
          <div className="mt-12 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full border border-gold/40 bg-ink flex items-center justify-center text-gold font-display text-lg font-bold">
              DR
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-display text-lg text-cream">Dr. Rahul S.</span>
                <CheckCircle2 size={15} className="text-gold" />
              </div>
              <p className="font-ui text-xs uppercase tracking-widest text-muted font-light">
                Founder, Clinical OPD & Healthcare Network
              </p>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
