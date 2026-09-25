"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel, SpotlightCard } from "@/components/ui";
import { TargetAudience } from "./types";
import { ShoppingBag, Building2, Store, Crown, LineChart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const targetAudiences: TargetAudience[] = [
  { title: "D2C Brands", desc: "নিজের Brand-এর জন্য হাই-কনভার্টিং ও স্কেলেবল অনলাইন ফ্ল্যাগশিপ স্টোর।", icon: ShoppingBag, tag: "High Conversion", accent: "text-indigo-400" },
  { title: "Manufacturers", desc: "বিশাল Product Catalogue সহজে স্ট্রাকচার্ড ও স্মার্টলি Showcase করার জন্য।", icon: Building2, tag: "Bulk & B2B Ready", accent: "text-cyan-400" },
  { title: "Retail Business", desc: "অফলাইন রিটেল স্টোরকে আল্ট্রা-মডার্ন ডিজিটাল এক্সপেরিয়েন্সে রূপান্তর করার জন্য।", icon: Store, tag: "Omnichannel", accent: "text-emerald-400" },
  { title: "Premium Brands", desc: "ব্র্যান্ডের আভিজাত্যের সাথে সামঞ্জস্যপূর্ণ ₹100,000 টাকার কোয়ালিটির ডিজিটাল লাক্সারি লুক।", icon: Crown, tag: "Luxury UI/UX", accent: "text-purple-400" },
  { title: "Growing E-commerce", desc: "অর্ডার ও ট্রাফিক ভলিউম বাড়ার সাথে সাথে সিস্টেমকে সম্পূর্ণ অটোমেটেড রাখা।", icon: LineChart, tag: "Scale & Speed", accent: "text-sky-400" }
];

export default function AIEcomAudience() {
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
      className="py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-12 lg:px-20 bg-[#070A12] relative z-10 border-b border-slate-800/80"
    >
      <div className="max-w-[1300px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <SectionLabel className="justify-center text-xs sm:text-sm">Target Profiles</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#F8FAFC] mt-4 mb-4">
            কাদের জন্য এই Platform আদর্শ?
          </h2>
          <p className="text-slate-300 text-base sm:text-xl md:text-2xl font-light">
            যারা সাধারণ রেডিমেড টেমপ্লেট ছেড়ে প্রফেশনাল, হাই-কনভার্টিং ব্র্যান্ড তৈরি করতে চান:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {targetAudiences.map((aud, i) => {
            const Icon = aud.icon;
            return (
              <div key={i} className="audience-card-node">
                <SpotlightCard 
                  spotlightColor="rgba(99, 102, 241, 0.18)"
                  className="p-7 sm:p-9 border-slate-800 bg-[#0B0F19]/80 flex flex-col justify-between hover:border-indigo-500/40 transition-all duration-300 h-full rounded-3xl shadow-xl"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-3.5 border border-slate-800 bg-[#05070D] ${aud.accent} rounded-2xl`}>
                        <Icon size={24} />
                      </div>
                      <span className="text-xs font-ui uppercase tracking-wider font-bold px-3 py-1 border border-slate-800 text-slate-300 bg-[#05070D] rounded-full">
                        {aud.tag}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3.5">{aud.title}</h3>
                    <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-light">{aud.desc}</p>
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
