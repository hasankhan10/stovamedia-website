"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { AppointmentModal, BounceCards } from "@/components/ui";

interface ProjectShowcaseItem {
  id: string;
  title: string;
  client: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
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
    ctaUrl: "/contact",
  },
];

export default function FeaturedWork() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleProjectClick = (index: number) => {
    const project = featuredProjects[index];
    if (!project) return;
    if (project.isInternalDemo && project.ctaUrl) {
      router.push(project.ctaUrl);
    } else {
      setSelectedProject(project.title);
      setModalOpen(true);
    }
  };

  return (
    <section id="work" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#07080C] text-white relative overflow-hidden border-b border-white/[0.08]">
      {/* Premium Background Blur Color Effect */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-violet-600/20 via-indigo-600/15 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-bl from-blue-600/15 via-purple-600/15 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
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

        {/* Big Interactive BounceCards Showcase */}
        <div className="flex flex-col items-center justify-center overflow-hidden py-4 select-none">
          <BounceCards
            images={featuredProjects.map((p) => ({ src: p.image, alt: p.title }))}
            containerWidth={isMobile ? 340 : 820}
            containerHeight={isMobile ? 280 : 440}
            cardSize={isMobile ? 180 : 300}
            spread={isMobile ? 65 : 130}
            rotation={isMobile ? 8 : 7}
            bounciness={0.65}
            borderWidth={2}
            borderColor="rgba(255, 255, 255, 0.16)"
            radius={20}
            onCardClick={handleProjectClick}
          />

          {/* Quick project selectors & guidance */}
          <p className="text-center text-xs font-mono text-slate-400 mt-6 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive stack — click any card to inspect or test live demo</span>
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 w-full max-w-4xl">
            {featuredProjects.map((project, idx) => (
              <button
                key={project.id}
                onClick={() => handleProjectClick(idx)}
                className="group p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-violet-500/40 text-left transition-all backdrop-blur-md cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-medium text-slate-200 group-hover:text-violet-200 transition-colors">
                    {project.client}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5 truncate">
                    {project.category}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-violet-400 pt-2 border-t border-white/[0.06]">
                  <span>{project.isInternalDemo ? "Live demo" : "Inspect"}</span>
                  <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </button>
            ))}
          </div>
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
