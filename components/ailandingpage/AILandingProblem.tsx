"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function AILandingProblem({ onBookClick }: { onBookClick?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(
        ".problem-image-node",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
      gsap.fromTo(
        ".problem-content-node",
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        [".problem-image-node", ".problem-content-node"],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-14 sm:py-20 md:py-24 px-5 sm:px-8 md:px-12 lg:px-20 bg-[#FDFBF7] relative z-10 border-b border-[#EAE4D9]/80"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left Side: Destination & Journey Photo */}
        <div className="problem-image-node lg:col-span-5 w-full flex justify-center">
          <div className="relative w-full max-w-[460px] aspect-[4/3] sm:aspect-[4/3.5] rounded-3xl overflow-hidden shadow-xl border-4 border-white group">
            <Image 
              src="/travel/problem-journey.jpg" 
              alt="Traveler reviewing tour itinerary" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 px-3 py-2 bg-white/90 backdrop-blur-md rounded-xl text-xs font-semibold text-slate-800 flex items-center justify-between border border-white/60 shadow-sm">
              <span>Customer Decision Point</span>
              <span className="text-orange-600 font-bold font-ui">High Stakes Trust</span>
            </div>
          </div>
        </div>

        {/* Right Side: Copy from Document */}
        <div className="problem-content-node lg:col-span-7 flex flex-col items-start text-left">
          <h2 className="font-['Anek_Bangla',sans-serif] text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-slate-900 mb-5">
            গল্পটা কি এইরকম<span className="text-orange-600">?</span>
          </h2>

          <div className="space-y-4 text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
            <p>
              Customer আপনার tour পছন্দ করলেও <strong className="text-slate-900 font-bold">booking করে না</strong>। কারণ Facebook-only presence, সামান্য ছবি এবং অসম্পূর্ণ তথ্য <strong className="text-rose-600 font-semibold">trust deficit</strong> তৈরি করে এবং booking হারায়। Google-এ প্রথম impression-ই <strong className="text-blue-700 font-bold">decide করে</strong>।
            </p>
            <p className="p-4 rounded-2xl bg-[#F8F5EE] border border-[#EAE4D9] text-slate-800 font-medium text-sm sm:text-base">
              <strong className="text-orange-600 font-bold">Cinematic motion</strong>, 24-hour AI এবং এক ক্লিকে seat confirmation আপনার ব্যবসায় ভরসা বাড়ায়।
            </p>
          </div>

          {onBookClick && (
            <div className="mt-6">
              <button
                onClick={onBookClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 hover:border-orange-500 hover:text-orange-600 text-slate-800 font-bold text-xs sm:text-sm tracking-wide shadow-2xs hover:shadow-sm transition cursor-pointer font-['Hind_Siliguri',sans-serif]"
              >
                <span>আপনার এজেন্সির জন্য সঠিক সমাধান দেখুন →</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
