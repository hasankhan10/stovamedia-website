"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel, SplitHeadline } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 3, suffix: "+", label: "Products" },
  { value: 50, suffix: "+", label: "Active Users" },
  { value: 4, suffix: "yr", label: "of Experience" },
  { value: 0, suffix: "%", label: "Outsourced" },
];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !statsRef.current) return;

    const ctx = gsap.context(() => {
      const counters = statsRef.current?.querySelectorAll(".stat-number");
      counters?.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target") || "0");
        gsap.fromTo(
          counter,
          { textContent: "0" },
          {
            textContent: target,
            duration: 2,
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: counter,
              start: "top 90%",
            },
            ease: "power3.out",
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-24 md:py-36 px-6 md:px-10 lg:px-20 bg-ink-2 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-32 items-center">
        
        {/* Left: Branding & Message */}
        <div>
          <SectionLabel>Founder-led Studio</SectionLabel>
          <SplitHeadline tag="h2" className="text-4xl lg:text-6xl leading-[1.1]">
            Product-minded engineers only.
          </SplitHeadline>
          <div className="mt-10 space-y-6 text-muted max-w-lg font-ui leading-relaxed">
            <p>
              Stova Media was built on a simple premise: Indian businesses deserve 
              world-class software that performs in real-world conditions.
            </p>
            <p>
              We don&apos;t just write code; we architect solutions. Our founder, 
              Mehedi Hasan, leads every project from discovery to deployment, 
              ensuring zero loss in translation between your vision and the product.
            </p>
            <div className="flex items-center gap-4 pt-6 group">
              <div className="w-14 h-14 rounded-full bg-border flex items-center justify-center font-display text-2xl text-gold border border-border group-hover:border-gold transition-all duration-500">
                M
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg text-cream">Mehedi Hasan</span>
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Founder & Lead Architect</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Modern Stat Grid */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 gap-[1px] bg-border border border-border"
        >
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="bg-ink p-10 md:p-14 flex flex-col items-center justify-center text-center transition-all duration-500 hover:bg-card"
            >
              <div className="flex items-baseline mb-3">
                <span 
                  className="stat-number font-display text-5xl md:text-6xl text-cream" 
                  data-target={stat.value}
                >
                  0
                </span>
                <span className="text-gold font-display text-4xl ml-1">{stat.suffix}</span>
              </div>
              <span className="text-dim text-[10px] uppercase tracking-[0.25em] font-bold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
