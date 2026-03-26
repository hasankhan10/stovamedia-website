"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  SectionLabel, 
  SplitHeadline, 
  Button, 
  MagneticElement 
} from "@/components/ui";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 3, suffix: "+", label: "Products" },
  { value: 50, suffix: "+", label: "Clinic Users" },
  { value: 4, suffix: "yr", label: "of Experience" },
  { value: 0, suffix: "%", label: "Outsourced" },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Fade up animations for sub and CTA
      gsap.fromTo(".hero-fade-up", 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.6,
        }
      );

      // Stats counter animation
      if (statsRef.current) {
        const counters = statsRef.current.querySelectorAll(".stat-number");
        counters.forEach((counter) => {
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
              ease: "power2.out",
            }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-10 lg:px-20 pt-[120px] overflow-hidden"
    >
      {/* CONTENT */}
      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col items-center">
        {/* Label */}
        <div className="hero-fade-up opacity-0 flex justify-center">
          <SectionLabel className="justify-center">Custom Software Agency · Kolkata, India</SectionLabel>
        </div>

        {/* Headline */}
        <div className="mt-8 mb-10 w-full flex flex-col items-center">
          <SplitHeadline 
            tag="h1" 
            className="text-[clamp(48px,8vw,112px)] leading-[0.95] tracking-tight text-center justify-center w-full"
            delay={0.5}
          >
            We build software For
          </SplitHeadline>
          
          {/* Custom injection for the italicized and stroked words */}
          <div className="mt-4 flex flex-wrap justify-center gap-x-[0.3em] font-display text-[clamp(48px,8vw,112px)] leading-[0.95] tracking-tight">
             <span className="text-gold italic">Serious</span>
             <span className="transparent-text transition-all duration-700 hover:text-outline-gold">Businesses</span>
          </div>
        </div>

        {/* Subtext */}
        <p className="hero-fade-up opacity-0 text-muted font-ui text-base md:text-lg max-w-[580px] leading-relaxed mb-12 mx-auto">
          From Custom software to AI agents — we design, 
          architect, and ship products that last. No shortcuts. No bloat.
        </p>

        {/* CTAs */}
        <div className="hero-fade-up opacity-0 flex flex-wrap justify-center gap-6 items-center mb-24">
          <MagneticElement>
            <Button variant="primary" href="/work" className="px-10">See Our Work</Button>
          </MagneticElement>
          <MagneticElement>
            <Button variant="ghost" href="/contact">Let&apos;s Talk →</Button>
          </MagneticElement>
        </div>

        {/* STATS BAR */}
        <div 
          ref={statsRef}
          className="hero-fade-up opacity-0 flex flex-wrap justify-center gap-x-16 gap-y-10 pt-12 border-t border-border w-full"
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="flex items-baseline">
                <span 
                  className="stat-number font-display text-5xl md:text-6xl" 
                  data-target={stat.value}
                >
                  0
                </span>
                <span className="text-gold font-display text-4xl ml-0.5">{stat.suffix}</span>
              </div>
              <span className="text-dim text-[10px] uppercase tracking-[0.2em] font-bold mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
