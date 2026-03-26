"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitHeadline, SectionLabel, RevealOnScroll } from "@/components/ui";
import Image from "next/image";
import CTASection from "@/components/sections/CTASection";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const values = [
  { number: "01", title: "Honesty", desc: "We tell you what won't work. We push back if we see waste. We value the long-term relationship over the immediate bill." },
  { number: "02", title: "Craft", desc: "Design-first. Performance-led. Every pixel must have a purpose. Every line of code must be performant." },
  { number: "03", title: "Business-first", desc: "Software doesn't exist in a vacuum. We focus on your ROI, not just functional specs." },
  { number: "04", title: "Zero Outsourcing", desc: "100% in-house in Kolkata. No loss in quality. No breakdown in communication." },
];

const timeline = [
  { year: "2023", event: "Founded during the peak shifts of Indian clinical ops." },
  { year: "2024", event: "Our first high-fidelity dashboard delivered for enterprise." },
  { year: "2025", event: "Mr Compounder launched. Reaching 50+ clinics." },
  { year: "2026", event: "Stova Media brand established in Kolkata." }
];

export default function AboutPage() {
  const timelineRef = useRef<HTMLElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current || !timelineLineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(timelineLineRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="pt-32 min-h-screen bg-ink">
      <div className="px-6 md:px-10 lg:px-20 mb-32 flex flex-col items-center text-center">
        <SectionLabel className="justify-center">Our Story</SectionLabel>
        <SplitHeadline tag="h1" className="text-5xl md:text-7xl lg:text-8xl leading-none text-center">
          Founder-led. Product-minded. Kolkata-based.
        </SplitHeadline>
      </div>

      {/* Founder Bio */}
      <section className="px-6 md:px-10 lg:px-20 py-24 border-y border-border grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-20">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="relative w-44 h-44 rounded-full overflow-hidden border-2 border-gold mb-8 shadow-2xl shadow-gold/10">
            <Image 
              src="/founder.jpeg" 
              alt="Mehedi Hasan" 
              fill 
              className="object-cover" 
            />
          </div>
          <div>
            <h3 className="font-display text-2xl mb-1">Mehedi Hasan</h3>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold">Founder & Lead Architect</span>
          </div>
        </div>
        <div className="relative pl-12 border-l-2 border-gold/40">
          <p className="text-xl md:text-2xl font-ui leading-relaxed text-cream/90 max-w-3xl italic">
            &ldquo;We don&apos;t just build apps. We build business systems. 
            I saw too many Indian clinics struggling with manual processes 
            and broken tech, so I built something that actually works 
            in rural and semi-urban conditions. Stova Media was born to 
            bring that same pragmatic, performant architecture to every 
            business we partner with.&rdquo;
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-6 md:px-10 lg:px-20 py-24 md:py-40">
        <RevealOnScroll>
          <SectionLabel>Our Values</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-display mb-20">How we operate.</h2>
        </RevealOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {values.map((v) => (
            <div key={v.number} className="bg-ink p-10 flex flex-col gap-6 hover:bg-card transition-all duration-700">
              <span className="font-display text-sm text-gold tracking-widest">{v.number}</span>
              <h3 className="font-display text-2xl uppercase tracking-wider">{v.title}</h3>
              <p className="text-sm text-muted font-ui leading-relaxed italic">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline with progress scrub */}
      <section ref={timelineRef} className="px-6 md:px-10 lg:px-20 py-24 md:py-40 relative">
        <SectionLabel className="justify-center mb-32">Our Evolution</SectionLabel>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical scrub line in center */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-border/40 top-0">
            <div ref={timelineLineRef} className="w-full h-0 bg-gold origin-top" />
          </div>

          <div className="space-y-32">
            {timeline.map((item, i) => (
              <RevealOnScroll key={i}>
                <div className={cn(
                  "flex flex-col md:flex-row items-center justify-between gap-12 relative w-full",
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                )}>
                  <div className="flex-1 text-center md:text-left">
                    <span className="font-display text-4xl md:text-7xl text-gold/20 mb-4 block group-hover:text-gold/50 transition-all">{item.year}</span>
                    <p className="font-display text-xl md:text-2xl text-cream max-w-xs mx-auto md:mx-0 leading-tight">
                      {item.event}
                    </p>
                  </div>
                  {/* Central Dot */}
                  <div className="w-8 h-8 rounded-full bg-ink border-4 border-gold z-10 shrink-0" />
                  <div className="flex-1" />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
