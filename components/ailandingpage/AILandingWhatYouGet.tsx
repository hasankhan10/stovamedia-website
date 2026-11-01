"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clapperboard, Bot, CalendarDays, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AILandingWhatYouGet() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(
        ".whatyouget-card-node",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        ".whatyouget-card-node",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
      );
    });

    return () => mm.revert();
  }, []);

  const items = [
    {
      icon: Clapperboard,
      title: "Motion Experience",
      desc: "Scroll-Triggered Interactive Presentation",
      iconColor: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      icon: Bot,
      title: "24/7 Booking Engine / AI Assistant",
      desc: "with Zero Late Replies",
      iconColor: "text-orange-600 bg-orange-50 border-orange-200"
    },
    {
      icon: CalendarDays,
      title: "Transparent Details",
      desc: "Hotel, car, itinerary, price / Day-by-Day Breakdown",
      iconColor: "text-rose-600 bg-rose-50 border-rose-200"
    },
    {
      icon: Zap,
      title: "Frictionless Conversion",
      desc: "One-click booking / Instant WhatsApp & Phone Lead Alerts",
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-200"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-14 sm:py-20 md:py-24 px-5 sm:px-8 md:px-12 lg:px-20 bg-[#FDFBF7] relative z-10 border-b border-[#EAE4D9]/80 font-['Hind_Siliguri',sans-serif]"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-['Anek_Bangla',sans-serif] text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            যা যা থাকবে আপনার website-এ
          </h2>
        </div>

        {/* 4 Cards in Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="whatyouget-card-node p-6 sm:p-7 bg-white border border-[#EAE4D9] rounded-2xl shadow-xs hover:border-orange-300 hover:shadow-md transition-all flex flex-col items-center text-center justify-between"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-4 ${item.iconColor}`}>
                    <Icon size={26} />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
