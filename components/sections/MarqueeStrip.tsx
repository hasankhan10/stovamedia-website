"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MarqueeTrack } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

const primaryTrack = [
  "Autonomous AI Agents",
  "Healthcare SaaS Systems",
  "RAG Knowledge Engines",
  "High-Fidelity Next.js",
  "Custom E-Commerce Engines",
  "Enterprise Cloud Architecture",
  "Real-Time LLM Pipelines",
];

const secondaryTrack = [
  "Sub-Second Page Loads",
  "Zero Tech Debt",
  "SOC-2 Compliant Security",
  "100% In-House Engineering",
  "Weekly Live Sprint Demos",
  "Kolkata & Global Delivery",
  "High-Converting UX/UI",
];

export default function MarqueeStrip() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Scroll velocity skew effect
      let proxy = { skew: 0 };
      let skewSetter = gsap.quickSetter(".marquee-item-skew", "skewX", "deg");
      let clamp = gsap.utils.clamp(-8, 8);

      ScrollTrigger.create({
        onUpdate: (self) => {
          let skew = clamp(self.getVelocity() / -400);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew)
            });
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative border-y border-border/80 bg-ink-2/40 backdrop-blur-md py-8 overflow-hidden z-20"
    >
      {/* Subtle edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-ink to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-ink to-transparent z-10" />

      {/* Row 1: Left to Right */}
      <div className="marquee-item-skew transition-transform duration-200">
        <MarqueeTrack speed={32}>
          {primaryTrack.map((item, i) => (
            <div key={i} className="flex items-center gap-6 md:gap-10">
              <span className="text-xl md:text-2xl lg:text-3xl font-display tracking-tight text-cream/95">
                {item}
              </span>
              <span className="text-gold text-sm md:text-base font-display">✦</span>
            </div>
          ))}
        </MarqueeTrack>
      </div>

      {/* Row 2: Right to Left (Counter-scrolling) */}
      <div className="marquee-item-skew mt-5 transition-transform duration-200">
        <MarqueeTrack speed={42} reverse>
          {secondaryTrack.map((item, i) => (
            <div key={i} className="flex items-center gap-6 md:gap-10">
              <span className="text-lg md:text-xl lg:text-2xl font-ui font-light uppercase tracking-[0.2em] text-muted/70">
                {item}
              </span>
              <span className="text-gold/40 text-xs">■</span>
            </div>
          ))}
        </MarqueeTrack>
      </div>
    </div>
  );
}
