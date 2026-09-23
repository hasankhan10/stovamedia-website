"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticElement, SpotlightCard } from "@/components/ui";
import { Sparkles, Bot, ArrowRight, MessageSquare, ShieldCheck, Award, Cpu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface AIEcomHeroProps {
  onBookClick: () => void;
}

export default function AIEcomHero({ onBookClick }: AIEcomHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const chatCardRef = useRef<HTMLDivElement>(null);

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
          <div className="hero-badge-node inline-flex items-center gap-2 px-4 py-2 border border-indigo-500/40 bg-[#0B0F19]/90 rounded-full mb-6 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
            </span>
            <span className="text-xs sm:text-sm uppercase font-ui tracking-wider font-semibold text-cyan-300">
              Next-Gen AI E-Commerce Architecture
            </span>
          </div>

          <h1 className="hero-title-node text-3xl sm:text-5xl md:text-6xl lg:text-[58px] font-bold leading-[1.22] tracking-tight text-[#F8FAFC] mb-6 sm:mb-8">
            আপনার Website-এ Customer আসছে, কিন্তু{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent underline decoration-cyan-400/40 decoration-wavy decoration-1 underline-offset-8">
              Product খুঁজে না পেয়ে
            </span>{" "}
            চলে যাচ্ছে না তো?
          </h1>

          <p className="hero-sub-node text-base sm:text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-8 sm:mb-10 max-w-2xl">
            এবার আনুন এমন একটা <strong className="text-white font-medium">AI-Powered E-commerce Platform</strong>, যেটা প্রতিটা Customer-কে বোঝে, ঠিক Product দেখায়, আর কিনতে সাহায্য করে — একদম নিজের একজন দক্ষ <span className="text-cyan-400 font-medium">24/7 Digital Sales Assistant</span>-এর মতো।
          </p>

          <div className="hero-cta-node flex flex-wrap items-center gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
            <MagneticElement className="w-full sm:w-auto">
              <button 
                onClick={onBookClick} 
                className="w-full sm:w-auto px-9 py-5 text-sm sm:text-base md:text-lg font-bold tracking-wider flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.55)] transition-all duration-300 cursor-pointer min-h-[52px]"
              >
                <span>Free Consultation Book করুন</span>
                <ArrowRight size={18} />
              </button>
            </MagneticElement>

            <MagneticElement className="w-full sm:w-auto">
              <a 
                href="https://wa.me/918918928045?text=Hello%20Stova%20Media,%20I%20want%20to%20know%20more%20about%20your%20AI%20E-commerce%20Platform"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-5 text-sm sm:text-base uppercase tracking-wider font-bold font-ui border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-900/40 transition-all duration-300 flex items-center justify-center gap-2.5 shadow-sm min-h-[52px]"
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

        {/* Right Live Assistant Preview */}
        <div className="lg:col-span-5 w-full">
          <div ref={chatCardRef}>
            <SpotlightCard 
              spotlightColor="rgba(99, 102, 241, 0.2)"
              className="p-6 sm:p-8 border-slate-800/90 bg-[#0A0E1A]/90 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-sm">
                    <Bot size={20} />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#05070D]" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-white">AI Sales Assistant</h2>
                    <p className="text-[10px] sm:text-xs text-cyan-400 uppercase tracking-widest font-ui">Active & Live 24/7</p>
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs px-2.5 py-1 border border-indigo-500/40 text-indigo-300 bg-indigo-950/60 font-ui uppercase tracking-wider font-semibold">
                  Live Preview
                </span>
              </div>

              <div className="space-y-4 font-sans text-sm sm:text-base">
                <div className="flex justify-end">
                  <div className="bg-[#13192B] border border-slate-800 p-3.5 sm:p-4 max-w-[88%] text-slate-200 leading-relaxed">
                    &ldquo;আমার চোখের নিচের ডার্ক সার্কেল দূর করার জন্য এমন একটা ক্রিম লাগবে যেটা স্কিন ড্রাই করবে না।&rdquo;
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="bg-gradient-to-br from-[#0F172A] to-[#131B33] border border-indigo-500/40 p-4 sm:p-5 max-w-[95%] shadow-md">
                    <p className="text-cyan-400 font-semibold mb-2 flex items-center gap-1.5 text-sm sm:text-base">
                      <Sparkles size={15} className="text-indigo-400 flex-shrink-0" />
                      AI সাজেস্টেড প্রোডাক্ট:
                    </p>
                    <p className="text-slate-300 leading-relaxed mb-3.5 text-xs sm:text-sm font-light">
                      আপনার স্কিনের হাইড্রেশন বজায় রেখে ডার্ক সার্কেল লাইট করার জন্য আমাদের সেরা <strong className="text-white font-medium">Hydra-Restore Eye Gel Serum</strong> পারফেক্ট হবে।
                    </p>

                    <div className="p-3 sm:p-3.5 bg-[#080B14] border border-slate-800 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-bold text-white text-xs sm:text-sm">Hydra-Restore Eye Serum</p>
                        <p className="text-cyan-400 text-xs sm:text-sm font-mono font-bold">₹899 <span className="text-slate-500 line-through text-[10px] sm:text-xs">₹1,299</span></p>
                      </div>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider">
                        Add To Cart
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-800 flex items-center justify-between text-xs sm:text-sm text-slate-400 font-ui">
                <span className="flex items-center gap-1.5 text-indigo-400"><Cpu size={14} /> Sub-second Semantic Matching</span>
                <span className="text-emerald-400 font-semibold">3.4x Higher Conversion</span>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
