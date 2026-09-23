"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel, SpotlightCard } from "@/components/ui";
import { XCircle, CheckCircle2, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AIEcomProblem() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(".problem-left-anim", { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } });
      gsap.fromTo(".problem-right-anim", { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } });
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        [".problem-left-anim", ".problem-right-anim"],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-12 lg:px-20 bg-[#070A12] relative z-10 border-b border-slate-800/80"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <SectionLabel className="justify-center text-xs sm:text-sm">The Real Friction Point</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#F8FAFC] mt-4 mb-6">
            Customer সবসময় জানে না ঠিক কী Search করতে হবে
          </h2>
          <p className="text-slate-300 text-base sm:text-xl md:text-2xl leading-relaxed font-light">
            একজন Customer আপনার Website-এ এসে হয়তো বলবেন না, <span className="text-white font-medium">&ldquo;আমি এই নির্দিষ্ট প্রোডাক্ট কিনতে চাই।&rdquo;</span> বরং তিনি নিজের ভাষায় বলবেন, <span className="text-cyan-400 font-medium">&ldquo;আমার এমন একটা Product দরকার যেটা আমার সমস্যার সমাধান করবে...&rdquo;</span>
          </p>
        </div>

        {/* Contrast Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Traditional */}
          <div className="problem-left-anim">
            <SpotlightCard 
              spotlightColor="rgba(244, 63, 94, 0.12)"
              className="p-6 sm:p-9 md:p-12 border-rose-950/60 bg-[#0F0A0E]/80 relative overflow-hidden h-full shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6 text-rose-400">
                <XCircle size={26} className="flex-shrink-0" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">সাধারণ Website (Traditional Search)</h3>
              </div>
              
              <div className="p-4 sm:p-5 bg-[#080507] border border-rose-900/30 mb-6 text-sm sm:text-base text-slate-300 font-mono leading-relaxed">
                🔍 Search query: &ldquo;Best light jacket for monsoon rain&rdquo;<br />
                ❌ Result: <strong className="text-rose-400 font-bold">0 products found</strong> (Exact keyword mismatch)
              </div>

              <p className="text-slate-300 leading-relaxed text-sm sm:text-base md:text-lg font-light">
                Normal Website কাস্টমারকে নিজে স্ক্রল করে ২০টি পেজে প্রোডাক্ট খুঁজতে বাধ্য করে। হতাশ হয়ে Customer ট্যাব বন্ধ করে প্রতিদ্বন্দীর কাছে চলে যায়।
              </p>

              <div className="mt-8 pt-4 border-t border-rose-900/30 text-xs sm:text-sm font-bold text-rose-400 uppercase tracking-wider font-ui">
                High Bounce Rate · Lost Revenue Daily
              </div>
            </SpotlightCard>
          </div>

          {/* AI-Powered */}
          <div className="problem-right-anim">
            <SpotlightCard 
              spotlightColor="rgba(6, 182, 212, 0.18)"
              className="p-6 sm:p-9 md:p-12 border-cyan-500/40 bg-[#09111D]/80 relative overflow-hidden h-full shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6 text-cyan-400">
                <CheckCircle2 size={26} className="flex-shrink-0" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">AI-Powered Website (Smart Intent)</h3>
              </div>

              <div className="p-4 sm:p-5 bg-[#050B12] border border-cyan-500/30 mb-6 text-sm sm:text-base text-slate-200 font-mono leading-relaxed">
                🔍 Customer Says: &ldquo;এমন একটা জ্যাকেট লাগবে যা বর্ষায় পরা যাবে&rdquo;<br />
                ✅ AI Action: <strong className="text-cyan-300 font-bold">Recommends Waterproof Breathable Windbreaker</strong>
              </div>

              <p className="text-slate-200 leading-relaxed text-sm sm:text-base md:text-lg font-light">
                AI-Powered Website কাস্টমারের প্রয়োজন ও বাজেট স্বয়ংক্রিয়ভাবে অনুধাবন করে মুহূর্তের মধ্যে সঠিক প্রোডাক্টটি সামনে হাজির করে এবং অর্ডার কমপ্লিট করায়।
              </p>

              <div className="mt-8 pt-4 border-t border-cyan-500/30 text-xs sm:text-sm font-bold text-cyan-400 uppercase tracking-wider font-ui flex items-center gap-2">
                <Sparkles size={16} className="text-indigo-400" /> Higher Conversion · Zero Friction Purchase
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
