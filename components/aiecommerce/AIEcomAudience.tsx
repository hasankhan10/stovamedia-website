"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel, SpotlightCard } from "@/components/ui";
import { TargetAudience } from "./types";
import { ShoppingBag, Building2, Store, Crown, LineChart, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const targetAudiences: TargetAudience[] = [
  { title: "D2C Brands", desc: "নিজের Brand-এর জন্য হাই-কনভার্টিং ও স্কেলেবল অনলাইন ফ্ল্যাগশিপ স্টোর।", icon: ShoppingBag, tag: "High Conversion", accent: "text-indigo-600 bg-indigo-50 border-indigo-100" },
  { title: "Manufacturers", desc: "বিশাল Product Catalogue সহজে স্ট্রাকচার্ড ও স্মার্টলি Showcase করার জন্য।", icon: Building2, tag: "Bulk & B2B Ready", accent: "text-cyan-700 bg-cyan-50 border-cyan-100" },
  { title: "Retail Business", desc: "অফলাইন রিটেল স্টোরকে Ultra-Modern ডিজিটাল এক্সপেরিয়েন্সে রূপান্তর করার জন্য।", icon: Store, tag: "Omnichannel", accent: "text-emerald-700 bg-emerald-50 border-emerald-100" },
  { title: "Premium Brands", desc: "ব্র্যান্ডের Theme - er সাথে সামঞ্জস্যপূর্ণ ₹100,000 টাকার কোয়ালিটির ডিজিটাল লাক্সারি লুক।", icon: Crown, tag: "Luxury UI/UX", accent: "text-purple-700 bg-purple-50 border-purple-100" },
  { title: "Growing E-commerce", desc: "অর্ডার ও ট্রাফিক ভলিউম বাড়ার সাথে সাথে সিস্টেমকে সম্পূর্ণ অটোমেটেড রাখা।", icon: LineChart, tag: "Scale & Speed", accent: "text-sky-600 bg-sky-50 border-sky-100" }
];

export default function AIEcomAudience({ onBookClick }: { onBookClick?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(".audience-card-node", { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } });
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(".audience-card-node", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } });
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 650px" }}
      className="py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-12 lg:px-20 bg-white relative z-10 border-b border-slate-200/80"
    >
      <div className="max-w-[1300px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <SectionLabel className="justify-center text-xs sm:text-sm">Target Profiles</SectionLabel>
          <h2 className="font-['Anek_Bangla','Amar_Bangla',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 mt-4 mb-4">
            কাদের জন্য এই <span className="text-blue-700">Platform</span> আদর্শ <span className="text-red-700">?</span>
          </h2>
          <p className="font-['Noto_Sans_Bengali','Noto_Sans',sans-serif] text-slate-600 text-base sm:text-xl md:text-2xl font-medium">
            যারা সাধারণ <span className="bg-red-300 px-2 text-black rounded-md">রেডিমেড টেমপ্লেট</span> ছেড়ে <span className="bg-green-500 px-2 rounded-md text-black">প্রফেশনাল, হাই-কনভার্টিং ব্র্যান্ড</span> তৈরি করতে চান:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {targetAudiences.map((aud, i) => {
            const Icon = aud.icon;
            return (
              <div key={i} className="audience-card-node">
                <SpotlightCard 
                  spotlightColor="rgba(99, 102, 241, 0.08)"
                  className="p-7 sm:p-9 border-slate-200 bg-white flex flex-col justify-between hover:border-indigo-300 transition-all duration-300 h-full rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(99,102,241,0.08)]"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-3.5 border ${aud.accent} rounded-2xl shadow-2xs`}>
                        <Icon size={24} />
                      </div>
                      <span className="text-xs font-ui uppercase tracking-wider font-bold px-3 py-1 border border-slate-200 text-slate-700 bg-slate-50 rounded-full">
                        {aud.tag}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3.5">{aud.title}</h3>
                    <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed font-medium">{aud.desc}</p>
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>

        {onBookClick && (
          <div className="mt-12 sm:mt-16 flex justify-center">
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
