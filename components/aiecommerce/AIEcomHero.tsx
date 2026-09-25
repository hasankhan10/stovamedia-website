"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticElement, SpotlightCard } from "@/components/ui";
import { Sparkles, Bot, ArrowRight, MessageSquare, ShieldCheck, Award, Search, TrendingUp, Cpu, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface AIEcomHeroProps {
  onBookClick: () => void;
}

export default function AIEcomHero({ onBookClick }: AIEcomHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const chatCardRef = useRef<HTMLDivElement>(null);

  const handleOpenDemoChat = () => {
    window.dispatchEvent(new Event("stova_open_aichat"));
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(".hero-badge-node", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.1 })
        .fromTo(".hero-title-node", { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.5")
        .fromTo(".hero-sub-node", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
        .fromTo(".hero-cta-node", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, "-=0.5")
        .fromTo(chatCardRef.current, { x: 40, opacity: 0, scale: 0.95 }, { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }, "-=0.6");

      if (contentRef.current) {
        gsap.to(contentRef.current, {
          yPercent: 12,
          opacity: 0.4,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 }
        });
      }
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        [".hero-badge-node", ".hero-title-node", ".hero-sub-node", ".hero-cta-node", chatCardRef.current],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power2.out" }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[92svh] flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-20 pt-[60px] md:pt-[90px] pb-16 md:pb-24 overflow-hidden border-b border-slate-800/80"
    >
      <div 
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] md:w-[700px] h-[550px] md:h-[700px] rounded-full opacity-20 z-0"
        style={{ background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 70%)" }}
      />

      <div 
        ref={contentRef}
        className="max-w-[1300px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10"
      >
        {/* Left Headline */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Brand Logo Row */}
          <div className="hero-badge-node flex items-center gap-3 mb-6">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full blur opacity-40 group-hover:opacity-80 transition duration-300" />
                <Image 
                  src="/logo.jpeg" 
                  alt="Stova Media Logo" 
                  width={220} 
                  height={60} 
                  className="relative h-11 sm:h-13 md:h-14 w-auto object-contain rounded-full border border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.4)]" 
                  priority
                />
              </div>
            </Link>
            <span className="h-4 w-px bg-slate-800" />
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-indigo-500/40 bg-[#0B0F19]/90 rounded-full shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span className="text-[11px] sm:text-xs uppercase font-ui tracking-wider font-semibold text-cyan-300">
                AI E-Commerce Architecture
              </span>
            </div>
          </div>

          <h1 className="hero-title-node text-3xl sm:text-5xl md:text-6xl lg:text-[58px] font-bold leading-[1.22] tracking-tight text-[#F8FAFC] mb-6 sm:mb-8">
            আপনার Website-এ Customer আসছে, কিন্তু{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent underline decoration-cyan-400/40 decoration-wavy decoration-1 underline-offset-8">
              Product খুঁজে না পেয়ে
            </span>{" "}
            <span className="text-red-600">চলে যাচ্ছে না তো?</span>
          </h1>

          <p className="hero-sub-node text-base sm:text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-8 sm:mb-10 max-w-2xl">
            এবার আনুন এমন একটা <strong className="text-white font-medium">AI-Powered E-commerce Platform</strong>, যেটা প্রতিটা Customer-কে বোঝে, ঠিক Product দেখায়, আর কিনতে সাহায্য করে — একদম নিজের একজন দক্ষ <span className="text-cyan-400 font-medium">24/7 Digital Sales Assistant</span>-এর মতো।
          </p>

          <div className="hero-cta-node flex flex-wrap items-center gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
            <MagneticElement className="w-full sm:w-auto">
              <button 
                onClick={onBookClick} 
                className="w-full sm:w-auto px-9 py-5 text-sm sm:text-base md:text-lg font-bold tracking-wider flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.55)] transition-all duration-300 cursor-pointer min-h-[52px] rounded-2xl"
              >
                <span>Free Consultation Book করুন</span>
                <ArrowRight size={18} />
              </button>
            </MagneticElement>

            <MagneticElement className="w-full sm:w-auto">
              <a 
                href="https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20want%20to%20know%20more%20about%20your%20AI%20E-commerce%20Platform"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-5 text-sm sm:text-base uppercase tracking-wider font-bold font-ui border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-900/40 transition-all duration-300 flex items-center justify-center gap-2.5 shadow-sm min-h-[52px] rounded-2xl"
              >
                <MessageSquare size={17} />
                <span>WhatsApp-এ কথা বলুন</span>
              </a>
            </MagneticElement>
          </div>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6 text-sm sm:text-base font-ui text-slate-300">
            <span className="flex items-center gap-2 text-slate-200">
              <ShieldCheck size={18} className="text-emerald-400 flex-shrink-0" /> ১০০% Approval না পাওয়া পর্যন্ত Final Payment নেই
            </span>
            <span className="flex items-center gap-2 text-slate-200">
              <Award size={18} className="text-cyan-400 flex-shrink-0" /> Dr. Paul&apos;s Website Partner
            </span>
          </div>
        </div>

        {/* Right Feature Showcase & Live Trigger Card */}
        <div className="lg:col-span-5 w-full">
          <div ref={chatCardRef}>
            <SpotlightCard 
              spotlightColor="rgba(99, 102, 241, 0.22)"
              className="p-6 sm:p-8 md:p-9 border-indigo-500/40 bg-gradient-to-b from-[#0C111F]/95 via-[#070A14]/95 to-[#090D1A]/95 shadow-2xl relative rounded-3xl backdrop-blur-xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                    <Bot size={22} className="animate-pulse" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#05070D]" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      AI E-Commerce Core
                    </h3>
                    <p className="text-xs text-cyan-400 uppercase tracking-wider font-ui font-medium">
                      24/7 Autonomous Sales Engine
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-[11px] bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-ui font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live System
                </span>
              </div>

              {/* 3 Core Highlights */}
              <div className="space-y-3.5 mb-7">
                {[
                  {
                    icon: Bot,
                    title: "24/7 AI Sales Assistant",
                    desc: "কাস্টমারের যেকোনো প্রশ্নের উত্তর দিয়ে সরাসরি সেলস ক্লোজ করে।",
                    accent: "text-indigo-400 bg-indigo-950/60 border-indigo-500/30"
                  },
                  {
                    icon: Search,
                    title: "Smart Semantic Search",
                    desc: "কাস্টমারের প্রয়োজন ও ভাষার অর্থ বুঝে সঠিক প্রোডাক্ট খুঁজে দেয়।",
                    accent: "text-cyan-400 bg-cyan-950/60 border-cyan-500/30"
                  },
                  {
                    icon: TrendingUp,
                    title: "Autonomous Product SEO",
                    desc: "গুগল সার্চ র‍্যাংকিং বাড়ানোর জন্য অটো-অপ্টিমাইজড মেটা ও স্কিমা।",
                    accent: "text-emerald-400 bg-emerald-950/60 border-emerald-500/30"
                  }
                ].map((f, idx) => {
                  const Icon = f.icon;
                  return (
                    <div key={idx} className="p-3.5 sm:p-4 bg-[#05070D]/80 border border-slate-800/90 rounded-2xl flex items-start gap-3.5 hover:border-slate-700 transition-colors">
                      <div className={`p-2.5 rounded-xl border ${f.accent} shrink-0 mt-0.5`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-white mb-0.5">{f.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Interactive Demo Trigger Button */}
              <button
                onClick={handleOpenDemoChat}
                className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all duration-300 cursor-pointer hover:brightness-110 active:scale-[0.98] font-['Hind_Siliguri',sans-serif]"
              >
                <Zap size={16} className="text-amber-300 fill-amber-300 animate-pulse" />
                <span>AI শপিং অ্যাসিস্ট্যান্ট লাইভ ডেমো ট্রাই করুন →</span>
              </button>

              {/* Bottom Micro Metrics */}
              <div className="mt-5 pt-3.5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-ui">
                <span className="flex items-center gap-1.5 text-indigo-400">
                  <Cpu size={14} /> Sub-0.4s Fast Engine
                </span>
                <span className="text-emerald-400 font-semibold">
                  3.4x Higher Conversion
                </span>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
