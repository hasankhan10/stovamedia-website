"use client";

import React, { useRef, useEffect, useState } from "react";
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

const TOTAL_FRAMES = 80;

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
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameIndexRef = useRef(0);

  // Preload all 80 frames on mount
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNumber = String(i).padStart(3, "0");
      img.src = `/ezgif-23352333b8c17f21-jpg/ezgif-frame-${frameNumber}.jpg`;
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    // Draw first frame once it loads
    if (loadedImages[0]) {
      loadedImages[0].onload = () => {
        drawFrame(0);
      };
    }
  }, []);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    // Cover object-fit math
    const hRatio = canvasWidth / imgWidth;
    const vRatio = canvasHeight / imgHeight;
    const ratio = Math.max(hRatio, vRatio);

    const renderWidth = imgWidth * ratio;
    const renderHeight = imgHeight * ratio;
    const offsetX = (canvasWidth - renderWidth) / 2;
    const offsetY = (canvasHeight - renderHeight) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  };

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawFrame(currentFrameIndexRef.current);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const ctx = gsap.context(() => {
      // 1. Initial entrance animations for text elements
      const entryTl = gsap.timeline({ defaults: { ease: "power4.out" } });
      entryTl
        .fromTo(".hero-eyebrow", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.1 })
        .fromTo(".hero-title-node", { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.5")
        .fromTo(".hero-sub-node", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
        .fromTo(".hero-cta-node", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, "-=0.5")
        .fromTo(".hero-pills-node", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4");

      // 2. Frame-by-frame scrubbing animation mapped to scroll progress
      const frameTracker = { frame: 0 };

      gsap.to(frameTracker, {
        frame: TOTAL_FRAMES - 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.25,
          onUpdate: (self) => {
            const frameIndex = Math.min(
              TOTAL_FRAMES - 1,
              Math.max(0, Math.floor(frameTracker.frame))
            );
            currentFrameIndexRef.current = frameIndex;
            drawFrame(frameIndex);
          },
        },
      });

      // 3. Stats Counter trigger on mount / in-view
      if (statsRef.current) {
        const counters = statsRef.current.querySelectorAll(".stat-number");
        counters.forEach((counter) => {
          const target = parseFloat(counter.getAttribute("data-target") || "0");
          gsap.fromTo(
            counter,
            { textContent: "0" },
            {
              textContent: target,
              duration: 2,
              snap: { textContent: 1 },
              ease: "power2.out",
              scrollTrigger: { 
                trigger: containerRef.current, 
                start: "top 80%" 
              },
            }
          );
        });
      }
    }, containerRef);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[260vh] bg-[#05070D]"
    >
      {/* Pinned Viewport Container - Exactly 100svh on all devices */}
      <div 
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-[100svh] min-h-[100svh] max-h-[100svh] overflow-hidden flex flex-col justify-between items-center px-4 sm:px-8 md:px-12 lg:px-20 pt-[72px] sm:pt-[90px] md:pt-[110px] pb-3 sm:pb-6 md:pb-8 border-b border-slate-800/80 z-10"
      >
        {/* Background Image Sequence Canvas */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />

        {/* Ambient Dark Gradient Overlays for optimal contrast & text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070D]/85 via-[#05070D]/45 to-[#05070D]/90 z-0 pointer-events-none" />
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-60"
          style={{
            background: "radial-gradient(circle at center, transparent 20%, rgba(5, 7, 13, 0.85) 80%)"
          }}
        />

        {/* Main Centered Content */}
        <div 
          ref={heroContentRef}
          className="max-w-5xl mx-auto w-full flex-1 flex flex-col items-center justify-center text-center relative z-10 px-1 sm:px-4 py-1"
        >
          {/* Availability Pill */}
          <div className="hero-eyebrow inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-indigo-500/40 bg-[#0B0F19]/90 backdrop-blur-md mb-2.5 sm:mb-4 shadow-[0_0_20px_rgba(99,102,241,0.25)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span className="font-ui text-[11px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase text-cyan-300">
              Accepting Q2/Q3 Projects <span className="text-indigo-400">·</span> Kolkata &amp; Global
            </span>
          </div>

          {/* Master Headline */}
          <h1 className="hero-title-node text-3xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] font-bold leading-[1.08] tracking-tight text-[#F8FAFC] mb-3 sm:mb-5 max-w-4xl drop-shadow-md">
            We Build Custom Software &amp; AI Tools For{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent underline decoration-cyan-400/40 decoration-wavy decoration-1 underline-offset-4 sm:underline-offset-8">
              Growing
            </span>{" "}
            Businesses.
          </h1>

          {/* Subtext in easy, clear English */}
          <p className="hero-sub-node text-sm sm:text-lg md:text-xl lg:text-2xl text-slate-200 font-light leading-relaxed mb-4 sm:mb-6 max-w-3xl drop-shadow px-1">
            Stova Media is a custom software agency &amp; AI studio in Kolkata. We build fast websites, mobile apps, and 24/7 smart AI chatbots that help you win more customers and grow your revenue.
          </p>

          {/* CTAs */}
          <div className="hero-cta-node flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-3 sm:mb-5 w-full sm:w-auto">
            <MagneticElement className="w-full sm:w-auto">
              <Button 
                variant="primary" 
                href="/contact" 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.55)] transition-all duration-300 cursor-pointer min-h-[42px] sm:min-h-[48px]"
              >
                <span>Start Your Project</span>
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </MagneticElement>

            <MagneticElement className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                href="/work" 
                className="w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-wider font-bold font-ui border border-slate-700 bg-[#0B0F19]/85 backdrop-blur-md text-slate-200 hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300 flex items-center justify-center gap-2 min-h-[42px] sm:min-h-[48px]"
              >
                <span>Explore Selected Works</span>
              </Button>
            </MagneticElement>
          </div>

          {/* Capability Pills */}
          <div className="hero-pills-node hidden xs:flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-2xl">
            {capabilityPills.map((pill, idx) => {
              const Icon = pill.icon;
              return (
                <div 
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 border border-slate-800/90 bg-[#0A0E1A]/85 backdrop-blur-md text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors duration-300 text-[10px] sm:text-xs font-ui rounded-full"
                >
                  <Icon size={12} className="text-cyan-400 shrink-0" />
                  <span>{pill.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Strip Bar */}
        <div 
          ref={statsRef}
          className="relative z-10 max-w-[1400px] mx-auto w-full pt-2.5 sm:pt-4 md:pt-5 border-t border-slate-800/80 backdrop-blur-sm bg-[#05070D]/60 rounded-xl px-3 sm:px-6 shrink-0"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 md:gap-6 text-center sm:text-left">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center sm:items-start group py-0.5 sm:py-1">
                <div className="flex items-baseline">
                  <span 
                    className="stat-number font-display text-xl xs:text-2xl sm:text-3xl lg:text-4xl text-[#F8FAFC] tracking-tight group-hover:text-cyan-400 transition-colors duration-500 font-bold" 
                    data-target={stat.value}
                  >
                    {stat.value}
                  </span>
                  <span className="text-indigo-400 font-display text-base xs:text-xl sm:text-2xl ml-0.5 font-bold">{stat.suffix}</span>
                </div>
                <span className="text-slate-300 text-[9px] xs:text-[10px] sm:text-xs uppercase tracking-[0.14em] font-medium font-ui leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
