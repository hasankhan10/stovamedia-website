"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { AppointmentModal } from "@/components/ui";

interface ProjectShowcaseItem {
  id: string;
  title: string;
  client: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  results: { metric: string; label: string }[];
  tags: string[];
  ctaUrl?: string;
  isInternalDemo?: boolean;
}

const featuredProjects: ProjectShowcaseItem[] = [
  {
    id: "dr-pauls-care",
    title: "Patient portal and clinic scheduling platform",
    client: "Dr. Paul's Healthcare",
    category: "Custom healthcare SaaS",
    tagline: "Sub-second clinic booking with zero slow WordPress templates.",
    description:
      "Enterprise Next.js 15 web application with automated appointment scheduling, encrypted patient workflows, and sub-50ms edge SSR performance.",
    image: "/drpauls-care.png",
    results: [
      { metric: "99/100", label: "Core Web Vitals" },
      { metric: "<38ms", label: "Edge response" },
      { metric: "0", label: "Plugin dependencies" },
    ],
    tags: ["Next.js 15", "PostgreSQL", "Supabase", "TypeScript"],
    ctaUrl: "/contact",
  },
  {
    id: "travel-ai-engine",
    title: "Autonomous travel AI and motion booking engine",
    client: "Stova Travel Engine",
    category: "AI booking assistant & web",
    tagline: "Cinematic motion and 24/7 autonomous travel booking platform.",
    description:
      "Combines 60 FPS package animations with a 24/7 autonomous AI assistant that answers traveler queries, explains itineraries, and closes verified bookings.",
    image: "/travel/tea-garden-resort.jpg",
    results: [
      { metric: "3.8x", label: "Booking velocity" },
      { metric: "24/7", label: "Autopilot lead capture" },
      { metric: "0%", label: "Lead drop rate" },
    ],
    tags: ["Autonomous AI", "Next.js", "GSAP Motion", "Tailwind CSS"],
    ctaUrl: "/ailandingpage",
    isInternalDemo: true,
  },
  {
    id: "bondhu-motor",
    title: "High-speed D2C digital vehicle showroom",
    client: "Bondhu Motor",
    category: "High-performance web platform",
    tagline: "Instant catalog discovery with direct verified lead generation.",
    description:
      "Automotive marketplace platform built to dominate local Google search rankings and generate high-intent buyer inquiries straight to sales teams.",
    image: "/bondhu motor.png",
    results: [
      { metric: "#1 rank", label: "Local Google SEO" },
      { metric: "99.9%", label: "Uptime SLA" },
      { metric: "+320%", label: "Mobile conversions" },
    ],
    tags: ["Next.js", "Local SEO Engine", "Edge Optimization", "PostgreSQL"],
    ctaUrl: "/contact",
  },
  {
    id: "mr-compounder",
    title: "Silent OPD clinic management and prescription SaaS",
    client: "Mr Compounder",
    category: "Healthcare operational platform",
    tagline: "Engineered to run seamlessly even on low-bandwidth rural connections.",
    description:
      "Silent OPD queue management system with encrypted doctor prescriptions, SMS patient notification dispatch, and zero server crashes under peak OPD load.",
    image: "/mrcompounder.png",
    results: [
      { metric: "2G ready", label: "Offline-first sync" },
      { metric: "100%", label: "HIPAA-compliant" },
      { metric: "3.2x", label: "Patient throughput" },
    ],
    tags: ["Full-Stack SaaS", "PostgreSQL", "React", "Edge Workers"],
    ctaUrl: "/contact",
  },
];

export default function FeaturedWork() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleOpenConsultation = (projectTitle: string) => {
    setSelectedProject(projectTitle);
    setModalOpen(true);
  };

  return (
    <section id="work" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#07080C] text-white relative overflow-hidden border-b border-white/[0.08]">
      {/* Premium Background Blur Color Effect (Luminous Violet/Indigo Glow) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-violet-600/20 via-indigo-600/15 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-bl from-blue-600/15 via-purple-600/15 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-violet-300 text-xs font-medium mb-4 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            <span>Proven client outcomes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.03em] text-slate-100 leading-[1.05] mb-4">
            Production Systems Engineered for Growth
          </h2>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Every platform we deploy is custom-coded for high-conversion performance, rock-solid security, and measurable ROI.
          </p>
        </div>

        {/* Medium Grid Layout (Bento Grid matching the reference layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl border border-white/[0.08] hover:border-violet-500/40 bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.36)] hover:shadow-[0_12px_44px_rgba(139,92,246,0.15)]"
            >
              {/* Card Top: Screenshot Media Preview */}
              <div className="relative w-full aspect-[16/10] bg-[#0A0D14] overflow-hidden border-b border-white/[0.06]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14]/90 via-transparent to-transparent pointer-events-none" />
                
                {/* Top Badge: Client & Category */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-violet-300">
                    {project.client}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl sm:text-2xl font-medium text-slate-100 mb-2.5 tracking-tight group-hover:text-violet-200 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5 font-normal line-clamp-2">
                    {project.description}
                  </p>

                  {/* Measured Benchmarks: 3 Column Metric Ticker */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] mb-5">
                    {project.results.map((res, rIdx) => (
                      <div key={rIdx} className="text-left">
                        <div className="font-mono text-base sm:text-lg font-normal text-slate-100 tracking-tight">
                          {res.metric}
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 mt-0.5 truncate">
                          {res.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-white/[0.03] text-[11px] font-mono text-slate-300 border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Row */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                  {project.isInternalDemo ? (
                    <Link
                      href={project.ctaUrl || "/ailandingpage"}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-xs transition-all flex items-center gap-1.5 shadow-sm shadow-violet-600/30"
                    >
                      <span>Test live travel AI</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleOpenConsultation(project.title)}
                      className="px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-violet-600 hover:text-white border border-white/10 hover:border-violet-500/50 text-slate-200 font-medium text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Inquire architecture</span>
                      <ArrowUpRight size={14} />
                    </button>
                  )}

                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-emerald-400" />
                    <span>100% custom code</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={selectedProject || undefined}
      />
    </section>
  );
}
