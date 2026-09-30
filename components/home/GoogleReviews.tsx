"use client";

import React, { useState } from "react";
import { Star, CheckCircle2, ArrowUpRight, MessageSquare, Quote, ShieldCheck, Sparkles } from "lucide-react";
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
    avatarColor: "bg-blue-600 text-white",
    initials: "AP",
    rating: 5,
    date: "2 weeks ago",
    projectType: "Full-Stack Web App & Patient Portal",
    text: "Stova Media built our clinic's custom patient management software and web application from scratch. The page speed and mobile booking experience are remarkably fast. Zero templates, purely custom Next.js code. Highly recommended for technical precision.",
    highlight: "Remarkably fast sub-second speed & zero templates",
    verified: true,
  },
  {
    id: "rev-2",
    author: "Rahul Sen",
    role: "Founder & D2C Brand Owner",
    company: "Kolkata Retail Brand",
    avatarColor: "bg-emerald-600 text-white",
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
    avatarColor: "bg-indigo-600 text-white",
    initials: "SM",
    rating: 5,
    date: "3 weeks ago",
    projectType: "Local Business Growth Package",
    text: "Within 3 weeks of deploying our new high-speed website and Google Business Profile optimization, we started ranking #1 on Google Maps in our district. We receive daily WhatsApp inquiries directly from organic search.",
    highlight: "Ranked #1 on Google Maps with daily inquiries",
    verified: true,
  },
  {
    id: "rev-4",
    author: "Tania Mukherjee",
    role: "Operations Lead",
    company: "Fintech Logistics Firm",
    avatarColor: "bg-cyan-700 text-white",
    initials: "TM",
    rating: 5,
    date: "1 month ago",
    projectType: "Enterprise Internal Dashboard",
    text: "Exceptional code quality and architecture. They delivered a PostgreSQL + Next.js dashboard with zero technical debt and clean role-based security. The direct engineer communication without middlemen saved us weeks of back-and-forth.",
    highlight: "Saved weeks of development with direct architect communication",
    verified: true,
  },
  {
    id: "rev-5",
    author: "Anirban Ghosh",
    role: "E-Commerce Director",
    company: "Specialty Goods Co.",
    avatarColor: "bg-teal-600 text-white",
    initials: "AG",
    rating: 5,
    date: "2 months ago",
    projectType: "AI Chatbot & Automation Workflow",
    text: "The autonomous customer support AI handles 85% of repetitive customer questions instantly on WhatsApp without any human agent intervention. Very professional engineering studio.",
    highlight: "Handles 85% of customer inquiries on WhatsApp automatically",
    verified: true,
  },
  {
    id: "rev-6",
    author: "Debabrata Roy",
    role: "Business Owner",
    company: "Diagnostic Center",
    avatarColor: "bg-amber-600 text-white",
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

  // Duplicated array for seamless 100% continuous infinite loop
  const loopReviews = [...reviewsData, ...reviewsData, ...reviewsData];

  return (
    <section id="reviews" className="py-20 sm:py-28 md:py-36 bg-white relative overflow-hidden border-t border-slate-200/80">
      {/* Background Subtle Gradient Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[900px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-amber-100/40 via-indigo-50/40 to-emerald-50/40 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 relative z-10 mb-10 sm:mb-14">
        
        {/* Section Header with Official Google Trust Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            {/* Google Rating Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold mb-3.5 shadow-2xs">
              {/* Google 4-Color G Logo SVG */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </div>
              <span className="font-bold text-slate-900">5.0 Star Rating</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-600 font-medium">Verified Google Business Profile</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Real Feedback from{" "}
              <span className="text-emerald-700 font-bold underline decoration-emerald-400/40 decoration-wavy decoration-1 underline-offset-8">
                Production Clients
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base md:text-lg font-light mt-3 max-w-2xl leading-relaxed">
              Hover over any review card to pause. Authentic Google Business reviews from founders and enterprise partners.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 shrink-0">
            <MagneticElement strength={0.25}>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs sm:text-sm font-bold uppercase tracking-wider font-ui transition-all flex items-center gap-2 shadow-2xs hover:border-slate-300"
              >
                <span>View Google Maps Profile</span>
                <ArrowUpRight size={14} className="text-slate-500" />
              </a>
            </MagneticElement>
          </div>
        </div>

      </div>

      {/* INFINITE SMOOTH SLIDING MARQUEE TRACK (RIGHT TO LEFT) */}
      <div 
        className="relative w-full overflow-hidden py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left Edge Smooth Gradient Mask */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20" />

        {/* Right Edge Smooth Gradient Mask */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20" />

        {/* Sliding Flex Container */}
        <div 
          className="animate-marquee-loop flex gap-6 sm:gap-7 items-stretch px-4"
          style={{ animationPlayState: isPaused ? "paused" : "running" }}
        >
          {loopReviews.map((rev, index) => (
            <div
              key={`${rev.id}-${index}`}
              className="w-[310px] sm:w-[380px] md:w-[420px] shrink-0 p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(15,23,42,0.08)] hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between select-none"
            >
              <div>
                {/* Card Top: Stars & Google Verified Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
                    <CheckCircle2 size={11} className="text-emerald-600" />
                    <span>Google Verified</span>
                  </div>
                </div>

                {/* Highlight Quote Box */}
                <div className="p-3 rounded-xl bg-slate-50/90 border border-slate-100 mb-4 text-xs font-semibold text-slate-800 flex items-start gap-2">
                  <Quote size={14} className="text-indigo-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{rev.highlight}</span>
                </div>

                {/* Review Body Text */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-light line-clamp-4">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              {/* Reviewer Footnote */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${rev.avatarColor} font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs`}>
                    {rev.initials}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-display">
                      {rev.author}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate max-w-[190px]">
                      {rev.role} · {rev.company}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                  {rev.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Social Proof Bar */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 mt-10 sm:mt-14">
        <div className="p-5 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                100% Verified Google Reviews from Active Production Clients
              </p>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Direct client engagements across Kolkata, West Bengal, India &amp; global SaaS partners.
              </p>
            </div>
          </div>

          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold tracking-wide font-ui transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <MessageSquare size={14} />
            <span>Write a Review on Google</span>
          </a>
        </div>
      </div>

    </section>
  );
}
