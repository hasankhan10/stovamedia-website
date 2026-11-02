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
      className="py-14 sm:py-20 md:py-24 px-5 sm:px-8 md:px-12 lg:px-20 bg-[#FDFBF7] relative z-10 border-b border-[#EAE4D9]/80 font-['Hind_Siliguri',sans-serif]"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left Side: Destination & Journey Photo (Taped Polaroid Mountain Train & Airplane Trail) */}
        <div className="problem-image-node lg:col-span-5 w-full flex justify-center">
          <div className="relative w-full max-w-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group bg-white p-1.5">
            <div className="relative rounded-2xl overflow-hidden bg-slate-50">
              <Image 
                src="/travel/problem-journey.jpg" 
                alt="Scenic mountain train journey with flight trail" 
                width={696}
                height={390}
                className="w-full h-auto object-contain block group-hover:scale-105 transition-transform duration-700" 
                priority
                unoptimized
              />
            </div>
            <div className="mt-2 px-3.5 py-2 bg-[#FDFBF7] rounded-xl text-xs font-semibold text-slate-800 flex items-center justify-between border border-[#EAE4D9]">
              <span className="font-ui">Customer Decision Point</span>
              <span className="text-orange-600 font-bold font-ui">High Stakes Trust</span>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Structured Content — Responsive Alignment */}
        <div className="problem-content-node lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Badge */}
          <span className="inline-block px-3 py-1 bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider font-ui rounded-full mb-3">
            The Trust Gap
          </span>

          <h2 className="font-['Anek_Bangla',sans-serif] text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-slate-900 mb-4">
            গল্পটা কি এইরকম<span className="text-orange-600">?</span>
          </h2>

          <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6">
            কাস্টমার আপনার <span className="text-orange-600 font-bold">ট্যুর পছন্দ করলেও</span> পেজে স্পষ্ট তথ্য না পেয়ে বুকিং না করেই বেরিয়ে যায়—আর সেই কাস্টমার চলে যায় <span className="text-[#DC2626] font-bold">কম্পিটিটরের কাছে</span>।
          </p>

          {/* 3 Crisp Problem Points */}
          <div className="w-full space-y-3 mb-6 text-left">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#EAE4D9] shadow-2xs">
              <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">✕</span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-slate-900 font-bold">দেরিতে রিপ্লাই:</strong> রাতে traveler নক করার পর সকালে রিপ্লাই পেতে পেতে সে অন্য এজেন্সিতে বুক করে ফেলে।
              </p>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#EAE4D9] shadow-2xs">
              <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">✕</span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-slate-900 font-bold">আস্থার অভাব:</strong> সোশ্যাল পেজে আবছা ছবি ও অসম্পূর্ণ তথ্যের কারণে হাজার টাকার ট্যুরে ভরসা পায় না।
              </p>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#EAE4D9] shadow-2xs">
              <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">✕</span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-slate-900 font-bold">জটিল বুকিং:</strong> এক ক্লিকে বুকিং বা ইনস্ট্যান্ট কনফার্মেশনের কোনো আধুনিক সিস্টেম থাকে না।
              </p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-[#F8F5EE] border border-[#EAE4D9] text-slate-900 font-medium text-xs sm:text-sm leading-relaxed text-left w-full">
            <strong className="text-slate-900 font-bold">বাস্তবতা সোজা:</strong> অনলাইনে আপনার <span className="text-[#1D4ED8] font-bold">প্রথম ইম্প্রেশনই</span> সিদ্ধান্ত নেয় কাস্টমার আপনার কাছে বুক করবে, নাকি কম্পিটিটরের কাছে যাবে।
          </div>

          {onBookClick && (
            <div className="mt-6">
              <button
                onClick={onBookClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 hover:border-orange-500 hover:text-orange-600 text-slate-800 font-bold text-xs sm:text-sm tracking-wide shadow-xs hover:shadow-md transition cursor-pointer font-['Hind_Siliguri',sans-serif]"
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
