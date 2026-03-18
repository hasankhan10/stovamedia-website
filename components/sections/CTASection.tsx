"use client";

import React from "react";
import { SplitHeadline, Button, MagneticElement } from "@/components/ui";
import { cn } from "@/lib/utils";

export default function CTASection() {
  return (
    <section id="contact" className="py-24 md:py-36 px-6 md:px-10 lg:px-20 bg-ink overflow-hidden">
      <div className="relative p-12 md:p-24 lg:p-32 bg-card border border-border text-center overflow-hidden flex flex-col items-center">
        
        {/* Background Decorative Grid */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Eyebrow Label with decorative lines */}
        <div className="relative flex items-center justify-center gap-6 mb-12">
          <div className="w-10 md:w-20 h-[1.5px] bg-gold-glow border-t border-gold/40" />
          <span className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] font-bold text-gold select-none">
            Let&apos;s Build Together
          </span>
          <div className="w-10 md:w-20 h-[1.5px] bg-gold-glow border-t border-gold/40" />
        </div>

        {/* Main Header */}
        <div className="mb-16">
          <SplitHeadline tag="h2" className="text-4xl md:text-6xl lg:text-8xl leading-none">
            Have a product idea?
          </SplitHeadline>
          <div className="mt-4 text-4xl md:text-6xl lg:text-8xl font-display italic text-gold">
            Let&apos;s build it.
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-10">
          <MagneticElement>
            <Button variant="primary" href="/contact" className="px-12 py-5 text-sm">
              Start a Conversation
            </Button>
          </MagneticElement>
          <MagneticElement>
            <Button variant="outline" href="/work" className="px-12 py-5 text-sm">
              See Our Work
            </Button>
          </MagneticElement>
        </div>

        {/* Pulsing Dot Footer */}
        <div className="absolute bottom-8 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <span className="text-[9px] uppercase tracking-widest font-semibold text-muted/60">
            Available starting April 2026
          </span>
        </div>

      </div>
    </section>
  );
}
