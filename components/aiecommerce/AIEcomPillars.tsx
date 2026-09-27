"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel, SpotlightCard } from "@/components/ui";
import { ShoppingBag, Bot, Search, TrendingUp, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: ShoppingBag,
    title: "Premium, Custom E-commerce Website",
    desc: "Modern Design, Scrolling Animation যুক্ত fast পেজ লোডিং স্পিড, এবং ১০০% Mobile-Responsive আর্কিটেকচার। কাস্টমার যেকোনো ডিভাইসে প্রবেশ করলেই একটি প্রিমিয়াম ব্র্যান্ড অনুভূতি পাবেন।",
    spotlight: "rgba(99, 102, 241, 0.08)",
    accent: "text-indigo-600 bg-indigo-50 border-indigo-200 group-hover:bg-indigo-600 group-hover:text-white",
    hoverBorder: "hover:border-indigo-300",
    hoverTitle: "group-hover:text-indigo-600"
  },
  {
    icon: Bot,
    title: "AI Shopping Assistant",
    desc: "Customer-এর যে কোনো প্রশ্নের উত্তর দেয়, প্রোডাক্টের সাইজ ও ব্যবহার সংক্রান্ত দ্বিধা দূর করে, এবং ঠিক Product খুঁজে দেয় সাথে সাথে — দিনরাত ২৪ ঘণ্টা।",
    spotlight: "rgba(6, 182, 212, 0.08)",
    accent: "text-cyan-700 bg-cyan-50 border-cyan-200 group-hover:bg-cyan-600 group-hover:text-white",
    hoverBorder: "hover:border-cyan-300",
    hoverTitle: "group-hover:text-cyan-700"
  },
  {
    icon: Search,
    title: "AI-Powered Smart Search",
    desc: "Customer যেভাবে সাধারণ ভাষায় কথা বলে বা সার্চ করে, ঠিক সেভাবেই ডিপ মিনিং বোঝে। বানান ভুল হলেও বা বাংলা-ইংরেজির মিশ্রণ হলেও সঠিক প্রোডাক্ট ফিল্টার করে।",
    spotlight: "rgba(56, 189, 248, 0.08)",
    accent: "text-sky-600 bg-sky-50 border-sky-200 group-hover:bg-sky-600 group-hover:text-white",
    hoverBorder: "hover:border-sky-300",
    hoverTitle: "group-hover:text-sky-600"
  },
  {
    icon: TrendingUp,
    title: "AI Product SEO",
    desc: "আপনার প্রতিটি প্রোডাক্টের Title, Meta Description, Schema Markup এবং হাই-র‍্যাংকিং Keywords স্বয়ংক্রিয়ভাবে Google Search-এর জন্য অপ্টিমাইজ হয়ে যায়।",
    spotlight: "rgba(16, 185, 129, 0.08)",
    accent: "text-emerald-700 bg-emerald-50 border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white",
    hoverBorder: "hover:border-emerald-300",
    hoverTitle: "group-hover:text-emerald-700"
  }
];

export default function AIEcomPillars({ onBookClick }: { onBookClick?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(
        ".pillar-item-anim",
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        ".pillar-item-anim",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 700px" }}
      className="py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-12 lg:px-20 bg-white relative z-10 border-b border-slate-200/80"
    >
      <div className="max-w-[1300px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <SectionLabel className="justify-center text-xs sm:text-sm">Complete Ecosystem</SectionLabel>
          <h2 className="font-['Anek_Bangla','Amar_Bangla',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 mt-4 mb-5">
            একটাই Platform-এ যা কিছু দরকার
          </h2>
          <p className="font-['Noto_Sans_Bengali','Noto_Sans',sans-serif] text-slate-600 text-base sm:text-xl md:text-2xl font-light">
            আপনার E-Commerce ব্যবসাকে সম্পূর্ণ অটোমেটেড ও প্রফেশনাল করার জন্য ৪টি পাওয়ারফুল ইঞ্জিন এক সাথে।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {pillars.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="pillar-item-anim">
                <SpotlightCard 
                  spotlightColor={item.spotlight}
                  className={`p-7 sm:p-9 md:p-11 border-slate-200 bg-white group ${item.hoverBorder} transition-all duration-300 h-full flex flex-col justify-between rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(99,102,241,0.08)]`}
                >
                  <div>
                    <div className={`p-4 w-fit border mb-6 ${item.accent} transition-all duration-300 rounded-2xl shadow-xs`}>
                      <Icon size={28} />
                    </div>
                    <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 ${item.hoverTitle} transition-colors duration-300`}>
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
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
