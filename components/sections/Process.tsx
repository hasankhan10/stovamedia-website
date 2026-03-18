"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel, SplitHeadline } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { number: "01", title: "Discovery & Scoping", desc: "Understanding your business goals, target audience, and the technical terrain." },
  { number: "02", title: "Design & Architecture", desc: "Crafting a user-first interface and a scalable, secure software blueprint." },
  { number: "03", title: "Build & Iterate", desc: "Rapid development cycles with weekly demos. You see progress in real-time." },
  { number: "04", title: "Launch & Support", desc: "Seamless deployment and ongoing maintenance to keep your product sharp." },
];

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 200px",
          end: "bottom 80%",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={containerRef} className="py-24 md:py-36 px-6 md:px-10 lg:px-20 bg-transparent">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 relative">
        
        {/* Left: Sticky Header */}
        <div className="md:sticky md:top-32 h-fit">
          <SectionLabel>Our Workflow</SectionLabel>
          <SplitHeadline tag="h2" className="text-4xl lg:text-5xl leading-tight">
            From idea to shipped.
          </SplitHeadline>
          <p className="mt-6 text-muted font-ui text-sm max-w-xs leading-relaxed">
            A focused, transparent process designed to eliminate waste and deliver results.
          </p>
        </div>

        {/* Right: Sequential Steps */}
        <div className="relative pl-8 md:pl-16">
          {/* Vertical Progress Line */}
          <div className="absolute left-0 h-full w-[2px] bg-border/40">
            <div ref={lineRef} className="w-full h-0 bg-gold origin-top" />
          </div>

          <div className="flex flex-col">
            {steps.map((step, i) => (
              <div 
                key={i} 
                className="group relative border-b border-border/50 py-10 transition-all duration-500 hover:pl-4 first:pt-0 last:border-none"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <span className="font-display text-sm text-gold tracking-widest mt-1">{step.number}</span>
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-display mb-3 transition-colors duration-500 group-hover:text-gold uppercase tracking-wider">
                      {step.title}
                    </h3>
                    <p className="text-dim text-sm max-w-lg leading-relaxed group-hover:text-muted transition-colors duration-500">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
