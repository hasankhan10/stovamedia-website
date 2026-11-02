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
              The Outcome — ফলাফল
            </span>

            <h2 className="font-['Anek_Bangla',sans-serif] text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-slate-900 mb-3">
              এরপর আপনার ফোনে আসবে কনফার্মড মেসেজ:
            </h2>

            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-['Anek_Bangla',sans-serif] mb-3 flex items-center justify-center lg:justify-start gap-2">
              <span>&ldquo;দাদা, ২টো seat confirm করুন।&rdquo;</span>
              <span className="text-2xl">📞</span>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-5 max-w-xl">
              সামনেই শীত, পাহাড়ে বেড়ানো আর ক্রিসমাসের <span className="text-[#1D4ED8] font-bold">পিক বুকিং সিজন</span>। traveler-রা যখন গুগল করবে, তখন প্রফেশনাল ওয়েবসাইট দিয়ে <span className="text-emerald-700 font-bold">সরাসরি বুকিং নিশ্চিত করুন</span>।
            </p>

            <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs sm:text-sm font-medium w-full max-w-xl mb-5 text-left">
              <strong className="text-rose-700 font-bold">সীমিত স্লট অফার:</strong> কাজের প্রিমিয়াম মান ধরে রাখতে আমরা প্রতি সিজনে মাত্র কয়েকটি নির্বাচিত এজেন্সির প্রজেক্ট গ্রহণ করি।
            </div>

            {/* Countdown timer */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <AILandingTimer size="md" />
            </div>
          </div>
        </div>

        {/* 2️⃣ Bottom Row: Two Clean Guarantee Cards */}
        <div className="guarantee-cards-anim grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
          {/* Guarantee Card 1 */}
          <div className="p-5 sm:p-6 bg-[#F8F5EE] border border-[#EAE4D9] rounded-2xl flex items-start gap-4 shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 shrink-0 mt-0.5">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-['Anek_Bangla',sans-serif] font-bold text-base sm:text-lg text-slate-900 mb-1 leading-snug">
                ১০০% নো-রিস্ক ডেভেলপমেন্ট গ্যারান্টি
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                ওয়েবসাইট সম্পূর্ণ পছন্দ ও অনুমোদন না হওয়া পর্যন্ত কোনো ফাইনাল পেমেন্ট করতে হবে না।
              </p>
            </div>
          </div>

          {/* Guarantee Card 2 */}
          <div className="p-5 sm:p-6 bg-[#F8F5EE] border border-[#EAE4D9] rounded-2xl flex items-start gap-4 shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
              <Award size={24} />
            </div>
            <div>
              <h3 className="font-['Anek_Bangla',sans-serif] font-bold text-base sm:text-lg text-slate-900 mb-1 leading-snug">
                ফুল-সার্ভিস টেকনিক্যাল সাপোর্ট
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                ডোমেইন, ফাস্ট ক্লাউড হোস্টিং, নতুন প্যাকেজ আপলোড ও মেইনটেন্যান্স—সবকিছু আমাদের টিম সামলাবে।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
