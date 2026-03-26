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
      {/* BACKGROUND LAYERS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Grid lines */}
        <div 
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }}
        />
        {/* Radial mask for grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_0,var(--ink)_100%)] opacity-40" />
        
        {/* Floating Orbs */}
        <div className="hero-orb absolute top-[5%] -right-[10%] w-[700px] h-[700px] bg-gold/10 rounded-full blur-[120px] animate-float opacity-60" />
        <div className="hero-orb absolute -bottom-[5%] -left-[5%] w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] animate-float-reverse opacity-40" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-[1400px]">
        {/* Label */}
        <div className="hero-fade-up opacity-0" style={{ animationDelay: '0.3s' }}>
          <SectionLabel>Custom Software Agency · Kolkata, India</SectionLabel>
        </div>

        {/* Headline */}
        <div className="mt-8 mb-10">
          <SplitHeadline 
            tag="h1" 
            className="text-[clamp(60px,8vw,112px)] leading-[0.95] tracking-tight"
            delay={0.5}
          >
            We build software For
          </SplitHeadline>
          
          {/* Custom injection for the italicized and stroked words via SplitHeadline's word-inner pattern */}
          <div className="mt-4 flex flex-wrap gap-x-[0.3em] font-display text-[clamp(60px,8vw,112px)] leading-[0.95] tracking-tight">
             <span className="text-gold italic">Serious</span>
             <span className="transparent-text transition-all duration-700 hover:text-outline-gold">Businesses</span>
          </div>
        </div>

        {/* Subtext */}
        <p className="hero-fade-up opacity-0 text-muted font-ui text-base md:text-lg max-w-[540px] leading-relaxed mb-12">
          From Custom software to AI agents — we design, 
          architect, and ship products that last. No shortcuts. No bloat.
        </p>

        {/* CTAs */}
        <div className="hero-fade-up opacity-0 flex flex-wrap gap-6 items-center mb-24">
          <MagneticElement>
            <Button variant="primary" href="#work" className="px-10">See Our Work</Button>
          </MagneticElement>
          <MagneticElement>
            <Button variant="ghost" href="#contact">Let&apos;s Talk →</Button>
          </MagneticElement>
        </div>

        {/* STATS BAR */}
        <div 
          ref={statsRef}
          className="hero-fade-up opacity-0 flex flex-wrap gap-x-16 gap-y-10 pt-12 border-t border-border"
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
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

      <style jsx>{`
        .animate-float {
          animation: float 6s infinite ease-in-out;
        }
        .animate-float-reverse {
          animation: float 8s infinite ease-in-out reverse;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .transparent-text {
          color: transparent;
          -webkit-text-stroke: 1px color-mix(in srgb, var(--cream), transparent 65%);
          cursor: default;
        }
        .transparent-text:hover {
          color: var(--gold);
          -webkit-text-stroke: 1px transparent;
        }
        .hero-fade-up {
          animation: fadeUp 1.2s forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
