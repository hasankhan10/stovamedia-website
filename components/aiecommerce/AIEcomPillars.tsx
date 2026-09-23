"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel, SpotlightCard } from "@/components/ui";
import { ShoppingBag, Bot, Search, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: ShoppingBag,
    title: "Premium, Custom E-commerce Website",
    desc: "Modern Design, সাব-সেকেন্ড পেজ লোডিং স্পিড, এবং ১০০% Mobile-Responsive আর্কিটেকচার। কাস্টমার যেকোনো ডিভাইসে প্রবেশ করলেই একটি প্রিমিয়াম ব্র্যান্ড অনুভূতি পাবেন।",
    tags: ["Next.js 16", "Tailwind CSS", "Ultra-Fast CDN"],
    spotlight: "rgba(99, 102, 241, 0.2)",
    accent: "text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white",
    hoverBorder: "hover:border-indigo-500/50",
    hoverTitle: "group-hover:text-indigo-400"
  },
  {
    icon: Bot,
    title: "AI Shopping Assistant",
    desc: "Customer-এর যে কোনো প্রশ্নের উত্তর দেয়, প্রোডাক্টের সাইজ ও ব্যবহার সংক্রান্ত দ্বিধা দূর করে, এবং ঠিক Product খুঁজে দেয় সাথে সাথে — দিনরাত ২৪ ঘণ্টা।",
    tags: ["24/7 Live Automation", "Intent Understanding", "1-Click Cart Upsell"],
    spotlight: "rgba(6, 182, 212, 0.2)",
    accent: "text-cyan-400 group-hover:bg-cyan-500 group-hover:text-[#05070D]",
    hoverBorder: "hover:border-cyan-400/50",
    hoverTitle: "group-hover:text-cyan-400"
  },
  {
    icon: Search,
    title: "AI-Powered Smart Search",
    desc: "Customer যেভাবে সাধারণ ভাষায় কথা বলে বা সার্চ করে, ঠিক সেভাবেই ডিপ মিনিং বোঝে। বানান ভুল হলেও বা বাংলা-ইংরেজির মিশ্রণ হলেও সঠিক প্রোডাক্ট ফিল্টার করে।",
    tags: ["Vector Search", "Typo Tolerance", "Multi-lingual NLP"],
    spotlight: "rgba(56, 189, 248, 0.2)",
    accent: "text-sky-400 group-hover:bg-sky-500 group-hover:text-white",
    hoverBorder: "hover:border-sky-400/50",
    hoverTitle: "group-hover:text-sky-400"
  },
  {
    icon: TrendingUp,
    title: "AI Product SEO",
    desc: "আপনার প্রতিটি প্রোডাক্টের Title, Meta Description, Schema Markup এবং হাই-র‍্যাংকিং Keywords স্বয়ংক্রিয়ভাবে Google Search-এর জন্য অপ্টিমাইজ হয়ে যায়।",
    tags: ["Automated Meta Tags", "Rich Google Snippets", "Organic Traffic Growth"],
    spotlight: "rgba(16, 185, 129, 0.2)",
    accent: "text-emerald-400 group-hover:bg-emerald-500 group-hover:text-[#05070D]",
    hoverBorder: "hover:border-emerald-400/50",
    hoverTitle: "group-hover:text-emerald-400"
  }
];

export default function AIEcomPillars() {
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
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-12 lg:px-20 bg-[#05070D] relative z-10 border-b border-slate-800/80"
    >
      <div className="max-w-[1300px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <SectionLabel className="justify-center text-xs sm:text-sm">Complete Ecosystem</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#F8FAFC] mt-4 mb-5">
            একটাই Platform-এ যা কিছু দরকার
          </h2>
          <p className="text-slate-300 text-base sm:text-xl md:text-2xl font-light">
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
                  className={`p-7 sm:p-9 md:p-11 border-slate-800 bg-[#0B0F19]/80 group ${item.hoverBorder} transition-all duration-300 h-full flex flex-col justify-between`}
                >
                  <div>
                    <div className={`p-3.5 w-fit border border-slate-800 bg-[#05070D] mb-6 ${item.accent} transition-colors duration-300`}>
                      <Icon size={26} />
                    </div>
                    <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 ${item.hoverTitle} transition-colors duration-300`}>
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed mb-6 font-light">
                      {item.desc}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2.5 text-xs sm:text-sm font-ui text-slate-300 pt-4 border-t border-slate-800/80">
                    {item.tags.map((t, idx) => (
                      <span key={idx} className="px-3 py-1 bg-[#05070D] border border-slate-800">{t}</span>
                    ))}
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
