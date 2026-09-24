"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticElement, SpotlightCard } from "@/components/ui";
import { CheckCircle2, ShieldCheck, Award, Clock, Sparkles } from "lucide-react";
import AIEcomTimer from "./AIEcomTimer";

gsap.registerPlugin(ScrollTrigger);

const deliverables = [
  { title: "Full Platform Build", desc: "কাস্টম কোডেড আল্ট্রা-ফাস্ট ই-কমার্স ফ্রন্টএন্ড ও ব্যাকএন্ড আর্কিটেকচার।" },
  { title: "AI Shopping Assistant", desc: "২৪/৭ কাস্টমার এনগেজমেন্ট ও সেলস ক্লোজিং বট ইন্টিগ্রেশন।" },
  { title: "AI SEO Engine", desc: "স্বয়ংক্রিয় মেটা-ট্যাগ ও গুগল র‍্যাঙ্কিং অপ্টিমাইজেশন অ্যালগরিদম।" },
  { title: "Business Analytics Dashboard", desc: "রিয়েল-টাইম সেলস, ইনভেন্টরি ও কাস্টমার অ্যানালিটিক্স প্যানেল।" },
  { title: "Payment & WhatsApp Integration", desc: "Razorpay/Stripe/UPI ও ইনস্ট্যান্ট WhatsApp অর্ডার নোটিফিকেশন।" },
  { title: "৩ মাসের Free Priority Support", desc: "লঞ্চের পর ৩ মাস সার্বক্ষণিক টেকনিক্যাল সাপোর্ট ও টিউনিং।" },
];

export default function AIEcomOffer({ onBookClick }: { onBookClick: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const handleBooked = () => setIsBooked(true);
    window.addEventListener("stova_aiecom_booked_event", handleBooked);
    return () => window.removeEventListener("stova_aiecom_booked_event", handleBooked);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(".offer-card-wrap", { scale: 0.95, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } });
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(".offer-card-wrap", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } });
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-12 lg:px-20 bg-[#05070D] relative z-10 border-b border-slate-800/80"
    >
      <div className="max-w-[1300px] mx-auto">
        <div className="offer-card-wrap">
          <SpotlightCard 
            spotlightColor="rgba(99, 102, 241, 0.22)"
            className="p-6 sm:p-10 md:p-14 lg:p-20 border-indigo-500/40 bg-gradient-to-b from-[#0B0F19]/90 via-[#070A12] to-[#0B0F19]/80 shadow-2xl relative rounded-3xl"
          >
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs sm:text-sm font-bold uppercase tracking-widest font-ui mb-5 shadow-sm rounded-full">
                Special Launch Offer
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#F8FAFC]">
                আপনার জন্য একটা Special Offer অপেক্ষা করছে
              </h2>
              <p className="text-slate-300 text-base sm:text-xl md:text-2xl mt-4 font-light leading-relaxed">
                সম্পূর্ণ জিরো-রিস্কে আপনার ব্যবসাকে আধুনিক প্রযুক্তির শীর্ষে নিয়ে যাওয়ার সম্পূর্ণ প্যাকেজ:
              </p>
            </div>

            {/* Deliverables Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-14">
              {deliverables.map((item, i) => (
                <div key={i} className="p-6 sm:p-7 bg-[#05070D] border border-slate-800 flex items-start gap-4 hover:border-indigo-500/40 transition-colors rounded-2xl shadow-md">
                  <CheckCircle2 size={22} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg md:text-xl mb-1.5">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Guarantees Banner */}
            <div className="p-6 sm:p-9 bg-[#070B16] border border-indigo-500/30 mb-10 sm:mb-12 grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-9 items-center rounded-2xl shadow-lg">
              <div className="flex items-start gap-4">
                <ShieldCheck size={36} className="text-emerald-400 flex-shrink-0" />
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-1.5">১০০% নো-রিস্ক ডেভেলপমেন্ট</h4>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                    Platform সম্পূর্ণ তৈরি হয়ে আপনার Approval না পাওয়া পর্যন্ত Final Payment করতে হবে না। এছাড়া Launch-এর পর সর্বোচ্চ কনভার্শন নিশ্চিত করতে আমরা নিয়মিত AI মডেল টিউনিং ও প্রায়োরিটি সাপোর্ট প্রদান করি।
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-8">
                <Award size={36} className="text-cyan-400 flex-shrink-0" />
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-1.5">প্রমাণিত অভিজ্ঞতা</h4>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                    আমাদের টিমের Experience-এর মধ্যে রয়েছে খ্যাতনামা <strong>Dr. Paul&apos;s</strong>-এর প্রফেশনাল Website Development ও লং-টার্ম Maintenance।
                  </p>
                </div>
              </div>
            </div>

            {/* Action Area */}
            <div className="text-center flex flex-col items-center">
              {!isBooked && (
                <div className="mb-6 w-full max-w-md sm:max-w-lg mx-auto">
                  <AIEcomTimer size="lg" />
                </div>
              )}

              {/* 🎯 Enlarged & Prominent Scarcity Line (Request 4) */}
              <div className="my-6 px-6 py-4 rounded-2xl bg-indigo-950/60 border border-cyan-400/50 shadow-[0_0_25px_rgba(6,182,212,0.2)] max-w-3xl mx-auto flex items-center justify-center gap-3 text-center">
                <Clock size={22} className="text-cyan-400 flex-shrink-0 animate-pulse" />
                <span className="text-base sm:text-lg md:text-xl font-medium text-cyan-200 leading-relaxed">
                  {isBooked
                    ? "✓ আপনার কনসাল্টেশন স্লট নিশ্চিত করা হয়েছে। ধন্যবাদ!"
                    : "প্রতি মাসে আমরা মাত্র ৩ থেকে ৫টি Brand নিয়ে কাজ করি — কোয়ালিটি নিশ্চিত করার জন্য Slot সীমিত।"}
                </span>
              </div>

              <MagneticElement className="w-full sm:w-auto">
                <button 
                  onClick={onBookClick} 
                  className="w-full sm:w-auto px-9 sm:px-12 py-5 text-sm sm:text-base md:text-lg font-bold tracking-wider bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.55)] transition-all duration-300 cursor-pointer min-h-[52px] rounded-xl hover:brightness-110 active:scale-[0.99]"
                >
                  {isBooked ? "বুকিং স্ট্যাটাস দেখুন" : "আপনার Brand-এর জন্য Free Consultation Book করুন →"}
                </button>
              </MagneticElement>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
