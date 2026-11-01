"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Award } from "lucide-react";
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
          {/* Left: WhatsApp Incoming Message Mockup (Exact Reference Image) */}
          <div className="lead-card-anim lg:col-span-5 w-full flex justify-center">
            <div className="relative w-full max-w-[480px]">
              {/* Decorative Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-orange-500/20 to-amber-500/20 rounded-[32px] blur-xl opacity-75" />

              {/* The Phone Notification Frame with Reference Image */}
              <div className="relative rounded-[28px] overflow-hidden shadow-2xl border-4 border-white bg-white group">
                <Image 
                  src="/travel/whatsapp-notification.jpg"
                  alt="WhatsApp Notification: দাদা, ২টো seat confirm করুন।"
                  width={1024}
                  height={481}
                  className="w-full h-auto object-contain block group-hover:scale-[1.02] transition-transform duration-500"
                  priority
                  unoptimized
                />
                <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-bold text-slate-800 font-ui">Live WhatsApp Lead Alert</span>
                  </div>
                  <span className="text-xs font-bold text-orange-600 font-['Anek_Bangla',sans-serif]">সরাসরি কনফার্মেশন</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Outcome & Urgency Copy — Responsive Alignment */}
          <div className="urgency-text-anim lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Outcome Badge */}
            <span className="inline-block px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider font-ui rounded-full mb-3">
              The Outcome — এরপর যা হবে
            </span>

            <h2 className="font-['Anek_Bangla',sans-serif] text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold leading-[1.24] text-slate-900 mb-3">
              এরপর আপনার ফোনে এই কথাটাই আসবে:
            </h2>

            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-['Anek_Bangla',sans-serif] mb-3 flex items-center justify-center lg:justify-start gap-2">
              <span>&ldquo;দাদা, ২টো seat confirm করুন।&rdquo;</span>
              <span className="text-2xl">📞</span>
            </div>

            <p className="text-[#DC2626] font-bold text-base sm:text-lg mb-6">
              নিজের lead আর <span className="underline decoration-red-400 underline-offset-4">হাতছাড়া হতে দেবেন না</span>।
            </p>

            <div className="w-full h-px bg-[#EAE4D9] my-2" />

            {/* Urgency Section */}
            <div className="mt-3 space-y-3.5 text-slate-700 text-sm sm:text-base md:text-[17px] leading-relaxed font-normal text-left">
              <div className="flex items-start gap-2.5">
                <span className="text-rose-600 font-bold text-lg mt-0.5 select-none shrink-0">✕</span>
                <p>
                  পুজো তো চলে গেছে। কিন্তু সারা বছরের <span className="text-[#DC2626] font-bold">সবচেয়ে বড় booking season</span> এখনই শুরু — <span className="text-[#1D4ED8] font-bold">ভাইফোঁটা</span>, তারপর <span className="text-[#1D4ED8] font-bold">শীত</span> আর <span className="text-[#1D4ED8] font-bold">Christmas-New Year</span>।
                </p>
              </div>

              <p className="pl-6">
                এই সময় customer সবচেয়ে বেশি <span className="text-[#1D4ED8] font-bold">Google করে</span>। এখন যদি আপনার <span className="text-[#DC2626] font-bold">online presence</span> ঠিক না থাকে, এই season-এর booking-ও চলে যাবে <span className="text-[#DC2626] font-bold">competitor-এর কাছে</span>।
              </p>

              <div className="pl-6 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs sm:text-sm font-medium">
                আর এই পুজো অফার <strong className="text-rose-700 font-bold">শুধুমাত্র এক সপ্তাহের জন্য</strong>। কাজের মান ধরে রাখতে আমরা মাত্র কিছু <strong className="text-slate-900 font-bold">সীমিত প্রজেক্ট</strong> নিয়েই কাজ করি — তাই স্লট শেষ হলে অফারও শেষ।
              </div>
            </div>

            {/* Countdown timer */}
            <div className="mt-6 w-full max-w-md mx-auto lg:mx-0">
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
