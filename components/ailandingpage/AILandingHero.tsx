"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  MessageSquare,
  ShieldCheck,
  Award,
  Bot,
  Clapperboard,
  Luggage,
  Play,
  BarChart3,
  TrendingUp,
  Clock,
  Menu
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface AILandingHeroProps {
  onBookClick: () => void;
  onWhatsAppClick?: (url: string) => void;
}

export default function AILandingHero({ onBookClick, onWhatsAppClick }: AILandingHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const whatsAppUrl = "https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20want%20to%20claim%20a%20Free%20Consultation%20Slot%20for%20Travel%20Business";

  const handleOpenDemoChat = () => {
    window.dispatchEvent(new Event("stova_open_travel_aichat"));
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(".hero-badge-node", { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.1 })
        .fromTo(".hero-title-node", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.4")
        .fromTo(".hero-sub-node", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
        .fromTo(".hero-cta-node", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
        .fromTo(".hero-image-node", { x: 30, opacity: 0, scale: 0.96 }, { x: 0, opacity: 1, scale: 1, duration: 0.9 }, "-=0.6")
        .fromTo(".engine-section-node", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.3");
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        [".hero-badge-node", ".hero-title-node", ".hero-sub-node", ".hero-cta-node", ".hero-image-node", ".engine-section-node"],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative flex flex-col bg-[#FDFBF7] text-slate-900 border-b border-[#EAE4D9]/80 overflow-hidden font-['Hind_Siliguri',sans-serif]"
    >
      {/* 1️⃣ Dedicated Sleek Landing Page Header */}
      <header className="w-full px-5 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-5 flex items-center justify-between border-b border-[#F0EAE0]/70 bg-white/70 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1300px] mx-auto w-full flex items-center justify-between">
          {/* Stova Media Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Image 
                src="/logo.jpeg" 
                alt="Stova Media" 
                width={130} 
                height={38} 
                className="h-8 sm:h-9 w-auto object-contain rounded-md" 
                priority
              />
            </div>
          </Link>

          {/* Clean Hamburger Menu Button */}
          <button 
            onClick={onBookClick}
            aria-label="Toggle menu"
            className="p-2 text-slate-700 hover:text-orange-600 transition-colors rounded-lg hover:bg-orange-50 cursor-pointer"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* 2️⃣ Main Hero Body Container */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-20 pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-16 max-w-[1300px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Tag & Cursive Handwritten Headline Row */}
            <div className="hero-badge-node flex items-center justify-between w-full mb-5 sm:mb-6">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] font-ui text-xs font-bold uppercase tracking-wider shadow-2xs">
                <span>West Bengal&apos;s 1st Travel AI Platform</span>
              </div>

              {/* Decorative Handwritten Script matching design */}
              <div className="font-['Caveat',cursive] text-2xl sm:text-3xl md:text-[32px] text-slate-800 font-bold -rotate-3 select-none tracking-wide hidden sm:block">
                Grow Your Travel Business
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="hero-title-node font-['Anek_Bangla',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold leading-[1.24] tracking-tight text-slate-900 mb-5 sm:mb-6">
              আপনার <span className="text-[#EA580C]">tour</span> ভালো। তাহলে{" "}
              <span className="text-[#1D4ED8]">booking কেন</span>{" "}
              <span className="text-[#DC2626]">competitor-এর কাছে</span>{" "}
              চলে যাচ্ছে?
            </h1>

            {/* Subtext */}
            <p className="hero-sub-node text-slate-700 text-sm sm:text-base md:text-[17px] font-normal leading-relaxed mb-7 sm:mb-8 max-w-2xl">
              আপনি National & International প্যাকেজ লঞ্চ করছেন, কিন্তু online presence দুর্বল হওয়ায় বুকিং পাচ্ছেন না। Customer Google-এ সার্চ করে আপনার শুধু Facebook page, সামান্য ছবি, অসম্পূর্ণ তথ্য এবং কোনো proper booking system না দেখে হতাশ হয়ে যাচ্ছে!
            </p>

            {/* CTA Buttons Row */}
            <div className="hero-cta-node flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-3">
              {/* Primary Orange Button */}
              <button
                onClick={onBookClick}
                className="px-7 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#D94E07] hover:to-[#EA580C] text-white font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 active:scale-[0.98] transition cursor-pointer font-['Hind_Siliguri',sans-serif]"
              >
                <Calendar size={18} />
                <span>আপনার ফ্রি বুক করুন →</span>
              </button>

              {/* WhatsApp Button */}
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (onWhatsAppClick) {
                    e.preventDefault();
                    onWhatsAppClick(whatsAppUrl);
                  }
                }}
                className="px-6 py-3.5 sm:py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xs hover:shadow-sm active:scale-[0.98] transition cursor-pointer font-ui"
              >
                <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                  <MessageSquare size={12} className="fill-white" />
                </div>
                <span>+91 94320 53261</span>
              </a>
            </div>

            {/* Urgency Badge */}
            <div className="flex items-center gap-2 text-rose-600 text-xs sm:text-sm font-semibold mb-8">
              <Clock size={15} className="text-rose-600 shrink-0" />
              <span>Limited Slots | Puja Offer – One Week Only!</span>
            </div>
          </div>

          {/* Right Travel Hero Image */}
          <div className="hero-image-node lg:col-span-5 w-full flex justify-center">
            <div className="relative w-full max-w-[480px] aspect-[4/5] rounded-[28px] overflow-hidden shadow-2xl border-4 border-white group">
              <Image 
                src="/travel/hero-traveler.jpg" 
                alt="Traveler enjoying mountain valley view" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-xl bg-white/90 backdrop-blur-md border border-white/50 text-slate-900 shadow-lg">
                <p className="text-xs font-bold text-orange-600 uppercase tracking-wider font-ui mb-0.5">Live Travel Engine</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-800">Darjeeling • Sikkim • Kashmir • International</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Bottom Guarantee Bar */}
        <div className="mt-12 pt-6 pb-2 border-t border-[#EAE4D9] flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-700 font-medium text-center">
          <span className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
            <strong className="text-slate-900 font-bold">100% Approval</strong> না পাওয়া পর্যন্ত Final Payment নেই
          </span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="flex items-center gap-2">
            <Award size={18} className="text-amber-600 shrink-0" />
            <strong className="text-slate-900 font-bold">Dr. Paul&apos;s</strong> Website Partner
          </span>
        </div>
      </div>

      {/* 3️⃣ "Travel AI & Motion Engine" Section (from Document) */}
      <div className="engine-section-node px-5 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 bg-[#F8F5EE] border-t border-[#EAE4D9]/80 w-full">
        <div className="max-w-[1100px] mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold uppercase tracking-wider font-ui rounded-full mb-3">
            West Bengal&apos;s First
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 font-['Anek_Bangla',sans-serif] mb-2">
            Travel AI & Motion Engine
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-ui font-medium mb-10">
            Your Travel Business, Supercharged with AI
          </p>

          {/* 3 Horizontal Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 text-left">
            {/* Card 1 */}
            <div className="p-6 bg-white border border-[#EAE4D9] rounded-2xl shadow-xs hover:border-orange-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 mb-4">
                <Bot size={24} />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-2 leading-snug">
                24/7 Travel AI Booking Assistant
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Answers questions, explains packages, helps direct booking.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-white border border-[#EAE4D9] rounded-2xl shadow-xs hover:border-orange-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 mb-4">
                <Clapperboard size={24} />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-2 leading-snug">
                Cinematic Package Animation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Packages come alive on scroll.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-white border border-[#EAE4D9] rounded-2xl shadow-xs hover:border-orange-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4">
                <Luggage size={24} />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-2 leading-snug">
                Hotel, Car, Itinerary & 1-Click Booking
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                All organized in one place.
              </p>
            </div>
          </div>

          {/* Action Button: Live Demo Trigger */}
          <div className="flex justify-center mb-6">
            <button
              onClick={handleOpenDemoChat}
              className="px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md flex items-center gap-2 cursor-pointer transition active:scale-[0.98] font-['Hind_Siliguri',sans-serif]"
            >
              <Play size={14} className="fill-white" />
              <span>Travel AI অ্যাসিস্ট্যান্ট লাইভ ডেমো টেস্ট করুন →</span>
            </button>
          </div>

          {/* Bottom Metrics Bar */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-ui font-semibold text-slate-700">
            <span className="flex items-center gap-1.5 text-slate-800">
              <BarChart3 size={16} className="text-orange-600" />
              <span>Zero Lead Drop</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1.5 text-slate-800">
              <TrendingUp size={16} className="text-emerald-600" />
              <span>3.8x Higher Bookings</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
