"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageSquare, ShieldCheck, Award } from "lucide-react";
import AILandingTimer from "./AILandingTimer";

gsap.registerPlugin(ScrollTrigger);

export default function AILandingUrgency() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(
        ".lead-card-anim",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
      gsap.fromTo(
        ".urgency-text-anim",
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
      gsap.fromTo(
        ".guarantee-cards-anim",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
      );
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        [".lead-card-anim", ".urgency-text-anim", ".guarantee-cards-anim"],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-14 sm:py-20 md:py-24 px-5 sm:px-8 md:px-12 lg:px-20 bg-[#FDFBF7] relative z-10 border-b border-[#EAE4D9]/80 font-['Hind_Siliguri',sans-serif]"
    >
      <div className="max-w-[1200px] mx-auto space-y-12 sm:space-y-16">
        {/* 1️⃣ Top Row: Left WhatsApp Notification Card, Right Urgency Message */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left: WhatsApp Incoming Message Mockup */}
          <div className="lead-card-anim lg:col-span-5 w-full flex justify-center">
            <div className="relative w-full max-w-[420px]">
              {/* Decorative Vibration / Sound Wave SVGs in Orange */}
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 text-orange-400 select-none hidden sm:flex">
                <span className="w-1.5 h-6 rounded-full bg-orange-400/80 animate-pulse" />
                <span className="w-1.5 h-10 rounded-full bg-orange-500 animate-pulse" />
                <span className="w-1.5 h-6 rounded-full bg-orange-400/80 animate-pulse" />
              </div>

              {/* The WhatsApp Card */}
              <div className="p-6 sm:p-7 bg-white border border-[#EAE4D9] rounded-3xl shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-xs">
                      <MessageSquare size={16} className="fill-white" />
                    </div>
                    <span className="font-bold text-sm text-slate-900 font-ui">WhatsApp</span>
                  </div>
                  <span className="text-xs text-slate-400 font-ui font-medium">now</span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-['Anek_Bangla',sans-serif] text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                    &ldquo;দাদা, ২টো seat confirm করুন।&rdquo;
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-ui font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    Verified Customer Booking Request
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Booking Season Urgency Copy */}
          <div className="urgency-text-anim lg:col-span-7 flex flex-col items-start text-left">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-rose-500 text-2xl font-bold mt-0.5 select-none shrink-0">✕</span>
              <h2 className="font-['Anek_Bangla',sans-serif] text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold leading-[1.22] text-[#DC2626]">
                সারা বছরের সবচেয়ে বড় booking season এখনই শুরু !!!
              </h2>
            </div>

            <div className="space-y-3 text-slate-700 text-sm sm:text-base md:text-[17px] leading-relaxed font-normal">
              <p>
                <strong className="text-slate-900 font-bold">ভাইফোঁটা, winter এবং Christmas-New Year</strong> booking season! Customerরা এখনই Google-এ search করছে।
              </p>
              <p className="text-rose-700 font-medium">
                Puja offer মাত্র এক সপ্তাহের জন্য, তাই দেরি করবেন না! Limited projects only.
              </p>
            </div>

            {/* Countdown timer */}
            <div className="mt-5 w-full max-w-md">
              <AILandingTimer size="md" />
            </div>
          </div>
        </div>

        {/* 2️⃣ Bottom Row: Two Side-by-Side Guarantee Cards (from Document) */}
        <div className="guarantee-cards-anim grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-4">
          {/* Guarantee Card 1 */}
          <div className="p-6 sm:p-7 bg-[#F8F5EE] border border-[#EAE4D9] rounded-2xl flex items-start gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 shrink-0 mt-0.5">
              <ShieldCheck size={26} />
            </div>
            <div>
              <h3 className="font-['Anek_Bangla',sans-serif] font-bold text-base sm:text-lg text-slate-900 mb-1.5 leading-snug">
                ১০০% নো-রিস্ক ডেভেলপমেন্ট গ্যারান্টি
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Website সম্পূর্ণ এবং approved না হওয়া পর্যন্ত কোনো final payment নেই।
              </p>
            </div>
          </div>

          {/* Guarantee Card 2 */}
          <div className="p-6 sm:p-7 bg-[#F8F5EE] border border-[#EAE4D9] rounded-2xl flex items-start gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
              <Award size={26} />
            </div>
            <div>
              <h3 className="font-['Anek_Bangla',sans-serif] font-bold text-base sm:text-lg text-slate-900 mb-1.5 leading-snug">
                প্রমাণিত ইন্ডাস্ট্রিয়াল অভিজ্ঞতা
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Dr. Paul&apos;s-এর জন্য আমাদের টিমের অভিজ্ঞতা include করে professional software development এবং long-term maintenance।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
