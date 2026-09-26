"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button, MagneticElement } from "@/components/ui";
import { 
  ArrowUpRight, 
  Bot, 
  Cpu, 
  ShieldCheck, 
  Zap 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Enterprise Deployments" },
  { value: 100, suffix: "%", label: "In-House Engineering" },
  { value: 99, suffix: ".9%", label: "System Uptime SLA" },
];

const capabilityPills = [
  { icon: Bot, label: "Autonomous AI Agents" },
  { icon: Cpu, label: "Enterprise Web Architecture" },
  { icon: ShieldCheck, label: "Healthcare & FinTech SaaS" },
  { icon: Zap, label: "Sub-Second Latency Systems" },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !heroContentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(".hero-eyebrow", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.1 })
        .fromTo(".hero-title-node", { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.5")
        .fromTo(".hero-sub-node", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
        .fromTo(".hero-cta-node", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, "-=0.5")
        .fromTo(".hero-pills-node", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4");

      gsap.to(heroContentRef.current, {
        yPercent: 10,
        scale: 0.98,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

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
              scrollTrigger: { trigger: counter, start: "top 92%" },
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
      className="relative min-h-[96svh] flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-20 pt-[120px] md:pt-[140px] pb-16 overflow-hidden border-b border-slate-800/80"
    >
      {/* Ambient Lighting */}
      <div 
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[1000px] h-[700px] md:h-[1000px] rounded-full blur-[160px] opacity-25 z-0"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 70%)"
        }}
      />

      {/* Main Centered Content */}
      <div 
        ref={heroContentRef}
        className="max-w-5xl mx-auto w-full flex flex-col items-center text-center relative z-10 my-auto"
      >
        {/* Availability Pill */}
        <div className="hero-eyebrow inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-indigo-500/40 bg-[#0B0F19]/90 backdrop-blur-md mb-6 shadow-[0_0_25px_rgba(99,102,241,0.2)]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
          </span>
          <span className="font-ui text-xs sm:text-sm font-semibold tracking-wider uppercase text-cyan-300">
            Accepting Q2/Q3 Projects <span className="text-indigo-400">·</span> Kolkata &amp; Global
          </span>
        </div>

        {/* Master Headline */}
        <h1 className="hero-title-node text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-[#F8FAFC] mb-6 max-w-4xl">
          We Build Custom Software &amp; AI Tools For{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent underline decoration-cyan-400/40 decoration-wavy decoration-1 underline-offset-8">
            Growing
          </span>{" "}
          Businesses.
        </h1>

        {/* Subtext in easy, clear English */}
        <p className="hero-sub-node text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-8 max-w-3xl">
          Stova Media is a custom software agency &amp; AI studio in Kolkata. We build fast websites, mobile apps, and 24/7 smart AI chatbots that help you win more customers and grow your revenue.
        </p>

        {/* CTAs */}
        <div className="hero-cta-node flex flex-wrap items-center justify-center gap-4 mb-10 w-full sm:w-auto">
          <MagneticElement className="w-full sm:w-auto">
            <Button 
              variant="primary" 
              href="/contact" 
              className="w-full sm:w-auto px-9 py-5 text-sm sm:text-base font-bold tracking-wider flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.55)] transition-all duration-300 cursor-pointer min-h-[52px]"
            >
              <span>Start Your Project</span>
              <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </MagneticElement>

          <MagneticElement className="w-full sm:w-auto">
            <Button 
              variant="outline" 
              href="/work" 
              className="w-full sm:w-auto px-8 py-5 text-sm sm:text-base uppercase tracking-wider font-bold font-ui border border-slate-700 bg-[#0B0F19]/80 text-slate-200 hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300 flex items-center justify-center gap-2 min-h-[52px]"
            >
              <span>Explore Selected Works</span>
            </Button>
          </MagneticElement>
        </div>

        {/* Capability Pills */}
        <div className="hero-pills-node flex flex-wrap justify-center gap-2.5 max-w-3xl">
          {capabilityPills.map((pill, idx) => {
            const Icon = pill.icon;
            return (
              <div 
                key={idx}
                className="inline-flex items-center gap-2 px-3.5 py-2 border border-slate-800 bg-[#0A0E1A]/80 backdrop-blur-sm text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors duration-300 text-xs sm:text-sm font-ui rounded-full"
              >
                <Icon size={14} className="text-cyan-400" />
                <span>{pill.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Strip Bar */}
      <div 
        ref={statsRef}
        className="relative z-10 max-w-[1400px] mx-auto w-full pt-8 md:pt-10 border-t border-slate-800/80 mt-12 md:mt-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 text-center md:text-left">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center md:items-start group">
              <div className="flex items-baseline">
                <span 
                  className="stat-number font-display text-3xl sm:text-4xl lg:text-5xl text-[#F8FAFC] tracking-tight group-hover:text-cyan-400 transition-colors duration-500 font-bold" 
                  data-target={stat.value}
                >
                  0
                </span>
                <span className="text-indigo-400 font-display text-2xl sm:text-3xl ml-1 font-bold">{stat.suffix}</span>
              </div>
              <span className="text-slate-400 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium mt-1 font-ui">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
