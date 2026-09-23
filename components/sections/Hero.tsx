"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  SplitHeadline, 
  Button, 
  MagneticElement 
} from "@/components/ui";
import { ArrowUpRight, Sparkles, ShieldCheck, Cpu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Enterprise Users" },
  { value: 100, suffix: "%", label: "In-House Engineering" },
  { value: 99, suffix: ".9%", label: "System Uptime SLA" },
];

const capabilityPills = [
  { icon: Cpu, label: "Autonomous AI Agents" },
  { icon: ShieldCheck, label: "Healthcare & FinTech SaaS" },
  { icon: Sparkles, label: "Next.js 16 Web Architecture" },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !heroContentRef.current) return;

    const ctx = gsap.context(() => {
      // Hero elements entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-eyebrow",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.2 }
      )
      .fromTo(
        ".hero-fade-up",
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.12 },
        "-=0.6"
      )
      .fromTo(
        ".hero-pill",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, stagger: 0.08 },
        "-=0.5"
      );

      // Scroll-driven layered 3D parallax
      gsap.to(heroContentRef.current, {
        yPercent: 18,
        scale: 0.95,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Stats counter animation with smooth ease
      if (statsRef.current) {
        const counters = statsRef.current.querySelectorAll(".stat-number");
        counters.forEach((counter) => {
          const target = parseFloat(counter.getAttribute("data-target") || "0");
          gsap.fromTo(
            counter,
            { textContent: "0" },
            {
              textContent: target,
              duration: 2.2,
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: counter,
                start: "top 92%",
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
      className="relative min-h-[100svh] flex flex-col justify-between px-6 md:px-12 lg:px-20 pt-[140px] pb-16 overflow-hidden"
    >
      {/* Ambient background gold glow flares */}
      <div 
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-25 z-0"
        style={{
          background: "radial-gradient(circle, rgba(201, 168, 76, 0.35) 0%, rgba(201, 168, 76, 0.05) 50%, transparent 70%)"
        }}
      />

      {/* Decorative hairline grid lines */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] z-0" />

      {/* MAIN HERO CONTENT (Parallax Target) */}
      <div 
        ref={heroContentRef}
        className="relative z-10 max-w-[1400px] mx-auto w-full flex flex-col items-center text-center my-auto"
      >
        {/* Live Studio Availability Badge */}
        <div className="hero-eyebrow opacity-0 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gold/30 bg-ink-2/80 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(201,168,76,0.08)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-ui text-[11px] font-medium tracking-[0.16em] uppercase text-cream/90">
            Accepting Q2/Q3 Projects <span className="text-gold">·</span> Kolkata & Global
          </span>
        </div>

        {/* Primary Master Headline */}
        <div className="w-full flex flex-col items-center">
          <SplitHeadline 
            tag="h1" 
            className="text-[clamp(44px,7.5vw,110px)] font-display leading-[0.95] tracking-tight text-center justify-center w-full"
            delay={0.3}
          >
            We Architect Software For
          </SplitHeadline>
          
          <div className="mt-3 flex flex-wrap justify-center items-baseline gap-x-[0.25em] font-display text-[clamp(44px,7.5vw,110px)] leading-[0.95] tracking-tight">
             <span className="text-gold italic font-normal">High-Growth</span>
             <span className="text-cream underline decoration-gold/40 decoration-wavy decoration-1 underline-offset-8">Enterprises.</span>
          </div>
        </div>

        {/* High-Impact Subtext */}
        <p className="hero-fade-up opacity-0 text-muted font-ui text-base md:text-xl max-w-[680px] leading-relaxed mt-8 mb-10 mx-auto font-light">
          Stova Media is an elite software engineering studio & AI lab. We design, architect, and ship 
          autonomous AI agents, enterprise web applications, and healthcare SaaS with zero technical debt.
        </p>

        {/* Action CTAs */}
        <div className="hero-fade-up opacity-0 flex flex-wrap justify-center gap-5 items-center mb-12">
          <MagneticElement>
            <Button variant="primary" href="/contact" className="px-10 py-4.5 text-xs font-semibold tracking-wider flex items-center gap-2 group">
              <span>Start Your Project</span>
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </MagneticElement>
          <MagneticElement>
            <Button variant="outline" href="/work" className="px-9 py-4.5 text-xs font-semibold tracking-wider">
              Explore Selected Works
            </Button>
          </MagneticElement>
        </div>

        {/* Capability Pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {capabilityPills.map((pill, idx) => {
            const Icon = pill.icon;
            return (
              <div 
                key={idx}
                className="hero-pill opacity-0 inline-flex items-center gap-2 px-3.5 py-1.5 border border-border/80 bg-card/60 backdrop-blur-sm text-dim hover:text-gold hover:border-gold/40 transition-colors duration-300 rounded-none text-xs font-ui"
              >
                <Icon size={13} className="text-gold" />
                <span>{pill.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STATS STRIP BAR */}
      <div 
        ref={statsRef}
        className="relative z-10 max-w-[1400px] mx-auto w-full pt-10 border-t border-border/70 mt-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center md:items-start group">
              <div className="flex items-baseline">
                <span 
                  className="stat-number font-display text-4xl md:text-5xl lg:text-6xl text-cream tracking-tight group-hover:text-gold transition-colors duration-500" 
                  data-target={stat.value}
                >
                  0
                </span>
                <span className="text-gold font-display text-3xl md:text-4xl ml-1">{stat.suffix}</span>
              </div>
              <span className="text-dim text-[11px] uppercase tracking-[0.22em] font-medium mt-1 font-ui">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
