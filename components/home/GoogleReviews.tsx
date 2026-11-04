"use client";

import React, { useState } from "react";
import { Star, CheckCircle2, ArrowUpRight, Quote } from "lucide-react";
import { MagneticElement } from "@/components/ui";

const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/Stova+Media/@22.0227215,88.3009805,17z/data=!4m8!3m7!1s0x3a025146d5338c0f:0xf5f62ec41c1a553d!8m2!3d22.0227215!4d88.3009805!9m1!1b1!16s%2Fg%2F11xcjm1ssf!5m1!1e2";

interface Review {
  id: string;
  author: string;
  role: string;
  company: string;
  avatarColor: string;
  initials: string;
  rating: number;
  date: string;
  projectType: string;
  text: string;
  highlight: string;
  verified: boolean;
}

const reviewsData: Review[] = [
  {
    id: "rev-1",
    author: "Dr. A. Paul",
    role: "Director",
    company: "Healthcare & Aesthetics Clinic",
    avatarColor: "bg-blue-600/20 text-blue-300 border border-blue-500/30",
    initials: "AP",
    rating: 5,
    date: "2 weeks ago",
    projectType: "Full-Stack Web App & Patient Portal",
    text: "Stova Media built our clinic's custom patient management software and web application from scratch. The page speed and mobile booking experience are remarkably fast. Zero templates, purely custom Next.js code. Highly recommended for technical precision.",
    highlight: "Remarkably fast sub-second speed and zero templates",
    verified: true,
  },
  {
    id: "rev-2",
    author: "Rahul Sen",
    role: "Founder & D2C Brand Owner",
    company: "Kolkata Retail Brand",
    avatarColor: "bg-emerald-600/20 text-emerald-300 border border-emerald-500/30",
    initials: "RS",
    rating: 5,
    date: "1 month ago",
    projectType: "AI-Powered E-Commerce Store",
    text: "Working with Mehedi and the Stova Media team was a game changer for our online business. The 24/7 AI shopping assistant increased our checkout conversion rate by more than 3X within the first 30 days of launch. Direct technical support with 0 delays.",
    highlight: "Increased checkout conversion rate by 3X in 30 days",
    verified: true,
  },
  {
    id: "rev-3",
    author: "Subhasis Mondal",
    role: "Managing Director",
    company: "Local Enterprise Services",
    avatarColor: "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30",
    initials: "SM",
    rating: 5,
    date: "1 month ago",
    projectType: "Bespoke SaaS Architecture",
    text: "Top-notch code quality and full source code Git repository handoff. No recurring page builder licensing fees, no bloatware, and rock-solid database integrity on PostgreSQL. True engineering expertise.",
    highlight: "Full Git source code handoff and zero plugin fees",
    verified: true,
  },
  {
    id: "rev-4",
    author: "Debabrata Roy",
    role: "Diagnostic Lab Partner",
    company: "Medical Lab Diagnostics",
    avatarColor: "bg-amber-600/20 text-amber-300 border border-amber-500/30",
    initials: "DR",
    rating: 5,
    date: "2 months ago",
    projectType: "High-Speed Diagnostic Website",
    text: "100/100 Google Core Web Vitals score as promised. The website loads instantly on mobile 4G/5G connections. Best web engineering studio in Kolkata by far.",
    highlight: "100/100 Core Web Vitals on mobile 4G/5G",
    verified: true,
  }
];

export default function GoogleReviews() {
  const [isPaused, setIsPaused] = useState(false);

  const loopReviews = [...reviewsData, ...reviewsData, ...reviewsData];

  return (
    <section id="reviews" className="py-24 sm:py-32 bg-[#07080C] text-white relative overflow-hidden border-b border-white/[0.08]">
      {/* Premium Background Blur Color Effect */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-violet-600/15 via-indigo-600/15 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            {/* Google Rating Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-violet-300 text-xs font-medium mb-4 backdrop-blur-md">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} fill="currentColor" />
                ))}
              </div>
              <span className="font-mono text-slate-100 font-semibold">5.0 rating</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">verified business profile</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.03em] text-slate-100 leading-[1.05]">
              Real Feedback from Production Clients
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-normal mt-3 max-w-2xl leading-relaxed">
              Verified Google Business testimonials from founders and technical leaders.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <MagneticElement strength={0.2}>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 text-xs font-medium transition-colors flex items-center gap-2 backdrop-blur-md focus-visible:outline-2 focus-visible:outline-white/40"
              >
                <span>View Google Maps profile</span>
                <ArrowUpRight size={13} className="text-slate-400" />
              </a>
            </MagneticElement>
          </div>
        </div>
      </div>

      {/* Infinite Review Marquee Track */}
      <div 
        className="relative w-full overflow-hidden py-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#07080C] to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#07080C] to-transparent z-20" />

        <div 
          className="animate-marquee-loop flex gap-6 sm:gap-7 items-stretch px-4"
          style={{ animationPlayState: isPaused ? "paused" : "running" }}
        >
          {loopReviews.map((rev, index) => (
            <div
              key={`${rev.id}-${index}`}
              className="w-[300px] sm:w-[380px] shrink-0 p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] hover:border-violet-500/40 backdrop-blur-xl transition-all duration-200 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.36)] select-none"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-mono">
                    <CheckCircle2 size={11} className="text-emerald-400" />
                    <span>verified</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/30 border border-white/[0.04] mb-4 text-xs font-medium text-slate-200 flex items-start gap-2">
                  <Quote size={13} className="text-violet-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{rev.highlight}</span>
                </div>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 font-normal line-clamp-4">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${rev.avatarColor} font-mono text-xs flex items-center justify-center shrink-0`}>
                    {rev.initials}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-slate-200">
                      {rev.author}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate max-w-[180px]">
                      {rev.role}, {rev.company}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] text-slate-500 font-mono whitespace-nowrap">
                  {rev.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
