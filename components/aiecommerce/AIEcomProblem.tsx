"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel, SpotlightCard } from "@/components/ui";
import { XCircle, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AIEcomProblem({ onBookClick }: { onBookClick?: () => void }) {
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
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 700px" }}
      className="py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-12 lg:px-20 bg-slate-50/100 relative z-10 border-b border-slate-200/80"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <SectionLabel className="justify-center text-xs sm:text-sm">The Real Friction Point</SectionLabel>
          <h2 className="font-['Anek_Bangla','Amar_Bangla',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 mt-4 mb-6">
            Customer সবসময় জানে না ঠিক কী Search করতে হবে
          </h2>
          <p className="font-['Noto_Sans_Bengali','Noto_Sans',sans-serif] text-slate-600 text-base sm:text-xl md:text-2xl leading-relaxed font-light">
            একজন Customer আপনার Website-এ এসে হয়তো বলবেন না, <span className="text-slate-900 font-medium">&ldquo;আমি এই নির্দিষ্ট প্রোডাক্ট কিনতে চাই।&rdquo;</span> বরং তিনি নিজের ভাষায় বলবেন, <span className="text-cyan-700 font-medium">&ldquo;আমার এমন একটা Product দরকার যেটা আমার সমস্যার সমাধান করবে...&rdquo;</span>
          </p>
        </div>

        {/* Contrast Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Traditional */}
          <div className="problem-left-anim">
            <SpotlightCard 
              spotlightColor="rgba(244, 63, 94, 0.08)"
              className="p-7 sm:p-10 md:p-12 border-rose-200/80 bg-rose-50/40 relative overflow-hidden h-full shadow-[0_4px_25px_rgba(244,63,94,0.04)] rounded-3xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6 text-rose-600">
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center shrink-0">
                    <XCircle size={26} />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">সাধারণ Website (Traditional Search)</h3>
                </div>

                <p className="text-slate-600 leading-relaxed text-sm sm:text-base md:text-lg font-light">
                  Normal Website কাস্টমারকে নিজে স্ক্রল করে 10 টি পেজে প্রোডাক্ট খুঁজতে বাধ্য করে। হতাশ হয়ে Customer ট্যাব বন্ধ করে Competitor এর কাছে চলে যায়।
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-rose-200/60 text-xs sm:text-sm font-bold text-rose-600 uppercase tracking-wider font-ui flex items-center justify-between">
                <span>High Bounce Rate</span>
                <span>Lost Revenue Daily</span>
              </div>
            </SpotlightCard>
          </div>

          {/* AI-Powered */}
          <div className="problem-right-anim">
            <SpotlightCard 
              spotlightColor="rgba(6, 182, 212, 0.1)"
              className="p-7 sm:p-10 md:p-12 border-cyan-200/90 bg-cyan-50/40 relative overflow-hidden h-full shadow-[0_4px_25px_rgba(6,182,212,0.06)] rounded-3xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6 text-cyan-700">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-100 border border-cyan-200 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={26} />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">AI-Powered Website (Smart Intent)</h3>
                </div>

                <p className="text-slate-700 leading-relaxed text-sm sm:text-base md:text-lg font-light">
                  AI-Powered Website কাস্টমারের প্রয়োজন ও বাজেট বুঝে মুহূর্তের মধ্যে সঠিক প্রোডাক্টটি সামনে এনে দেয় এবং অর্ডার কমপ্লিট করায়।
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-cyan-200/70 text-xs sm:text-sm font-bold text-cyan-800 uppercase tracking-wider font-ui flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Sparkles size={16} className="text-indigo-600" /> Higher Conversion
                </span>
                <span>Zero Friction Purchase</span>
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* Appointment Booking CTA Button */}
        {onBookClick && (
          <div className="mt-10 sm:mt-14 flex justify-center">
            <button
              onClick={onBookClick}
              className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-4.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-bold text-sm sm:text-base tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(99,102,241,0.25)] hover:shadow-[0_8px_30px_rgba(6,182,212,0.35)] cursor-pointer rounded-2xl active:scale-[0.98] font-['Hind_Siliguri',sans-serif]"
            >
              <span>Free Consultation Appointment বুক করুন</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
