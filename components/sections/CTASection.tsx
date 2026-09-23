"use client";

import React from "react";
import { SplitHeadline, Button, MagneticElement, SpotlightCard } from "@/components/ui";
import { ArrowUpRight, Calendar, MessageSquare, ShieldCheck, Zap } from "lucide-react";

export default function CTASection() {
  return (
    <section id="contact" className="py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-ink relative z-10 border-t border-border/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[160px] opacity-20 z-0"
        style={{
          background: "radial-gradient(circle, rgba(201, 168, 76, 0.45) 0%, transparent 70%)"
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <SpotlightCard className="p-12 md:p-20 lg:p-28 border-border/90 bg-card/60 backdrop-blur-xl text-center flex flex-col items-center relative overflow-hidden shadow-2xl">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-gold/40 bg-ink mb-10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-gold font-ui">
              Limited Intake · 2 Projects for Q2/Q3
            </span>
          </div>

          {/* Main Headline */}
          <div className="mb-12 max-w-[950px]">
            <SplitHeadline tag="h2" className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display leading-[0.98] tracking-tight justify-center text-center">
              Have A Complex Product?
            </SplitHeadline>
            <div className="mt-4 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display italic text-gold font-normal">
              Let&apos;s Engineer It.
            </div>
          </div>

          <p className="font-ui text-base md:text-xl text-muted font-light max-w-[620px] leading-relaxed mb-12">
            Whether you need an autonomous AI workforce, a full-stack SaaS platform, or high-throughput web architecture, we ship production-grade code on time and on budget.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-5 mb-14">
            <MagneticElement>
              <Button 
                variant="primary" 
                href="/contact" 
                className="px-10 py-5 text-xs font-semibold tracking-wider flex items-center gap-2 group shadow-[0_0_30px_rgba(201,168,76,0.25)]"
              >
                <span>Book Discovery Call</span>
                <Calendar size={16} className="text-ink group-hover:scale-110 transition-transform duration-300" />
              </Button>
            </MagneticElement>

            <MagneticElement>
              <Button 
                variant="outline" 
                href="/pricing" 
                className="px-9 py-5 text-xs font-semibold tracking-wider flex items-center gap-2 border-border/80 bg-ink/80 hover:border-gold/50"
              >
                <span>Calculate Project Scope</span>
                <ArrowUpRight size={15} className="text-gold" />
              </Button>
            </MagneticElement>
          </div>

          {/* SLA Trust Badges */}
          <div className="pt-8 border-t border-border/60 flex flex-wrap justify-center items-center gap-8 md:gap-12 text-xs font-ui text-dim">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-gold" />
              <span>4-Hour Feasibility Response</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-gold" />
              <span>Strict NDA & 100% IP Ownership</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare size={14} className="text-gold" />
              <span>Direct Founder Engineering</span>
            </div>
          </div>

        </SpotlightCard>
      </div>
    </section>
  );
}
