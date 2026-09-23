"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel, SplitHeadline, ProjectCard } from "@/components/ui";
import { ArrowRight, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  tag: string;
  featured?: boolean;
  externalUrl?: string;
  image?: string;
  locked?: boolean;
}

interface WorkHorizontalProps {
  projects: Project[];
}

export default function WorkHorizontal({ projects }: WorkHorizontalProps) {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(1);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current || projects.length === 0) return;

    const isMobile = window.innerWidth <= 768;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        const track = trackRef.current!;
        const calculateScrollWidth = () => track.scrollWidth - window.innerWidth + 120;

        gsap.to(track, {
          x: () => -calculateScrollWidth(),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${calculateScrollWidth() * 1.2}`,
            pin: true,
            scrub: 1.2,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                gsap.set(progressRef.current, { scaleX: self.progress });
              }
              const activeNumber = Math.min(
                projects.length,
                Math.max(1, Math.ceil(self.progress * projects.length))
              );
              setCurrentIdx(activeNumber);
            },
          },
        });

        gsap.utils.toArray<HTMLElement>(".project-card-image").forEach((img) => {
          gsap.to(img, {
            xPercent: -15,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: () => `+=${calculateScrollWidth() * 1.2}`,
              scrub: true,
            },
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section 
      ref={containerRef} 
      id="work" 
      className="relative overflow-hidden bg-[#070A12] py-20 sm:py-24 md:py-0 md:h-[100vh] flex flex-col justify-center border-t border-slate-800/80"
    >
      {/* Background ambient lighting */}
      <div 
        className="pointer-events-none absolute bottom-10 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-15 z-0"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)"
        }}
      />

      {/* Header Bar */}
      <div className="md:absolute md:top-14 md:left-12 lg:left-20 md:right-12 lg:right-20 px-5 sm:px-8 md:px-0 mb-8 sm:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 z-20">
        <div>
          <SectionLabel>Selected Works</SectionLabel>
          <SplitHeadline tag="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display leading-[1.05] tracking-tight text-[#F8FAFC]">
            Proof Of Execution.
          </SplitHeadline>
        </div>

        <div className="flex items-center gap-6">
          {/* Index Counter */}
          <div className="hidden md:flex items-baseline font-display text-sm text-slate-500 tracking-widest">
            <span className="text-cyan-400 text-base font-bold">{String(currentIdx).padStart(2, "0")}</span>
            <span className="mx-1">/</span>
            <span>{String(projects.length || 4).padStart(2, "0")}</span>
          </div>

          <Link 
            href="/work" 
            className="group inline-flex items-center gap-2.5 text-xs uppercase font-ui font-semibold tracking-[0.2em] text-[#F8FAFC] hover:text-cyan-300 transition-colors duration-300 px-4 py-2 border border-slate-700 bg-[#0B0F19]/80 backdrop-blur-sm"
          >
            <span>All Projects</span>
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 text-cyan-400" />
          </Link>
        </div>
      </div>

      {/* Horizontal Track */}
      <div 
        ref={trackRef} 
        className="flex flex-col md:flex-row gap-6 md:gap-8 px-5 sm:px-8 md:px-0 md:pl-[15vw] h-auto md:h-fit md:w-max mt-6 md:mt-16 relative z-10"
      >
        {projects.map((project, i) => (
          <div key={i} className="flex-shrink-0">
            <ProjectCard 
              {...project} 
              index={String(i + 1).padStart(2, "0")} 
              className="border-slate-800 bg-[#0B0F19]/90 backdrop-blur-md hover:border-indigo-500/60 transition-all duration-500 shadow-2xl"
            />
          </div>
        ))}
        <div className="hidden md:block w-[12vw] flex-shrink-0" />
      </div>

      {/* Pinned Progress Track */}
      <div className="hidden md:block absolute bottom-0 left-0 w-full h-[3px] bg-slate-800/60 z-20">
        <div 
          ref={progressRef}
          className="h-full w-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 origin-left scale-x-0 transition-transform duration-75 shadow-[0_0_10px_rgba(6,182,212,0.6)]" 
        />
      </div>
    </section>
  );
}
