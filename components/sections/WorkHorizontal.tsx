"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel, SplitHeadline, ProjectCard } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  tag: string;
  featured?: boolean;
}

interface WorkHorizontalProps {
  projects: Project[];
}

export default function WorkHorizontal({ projects }: WorkHorizontalProps) {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current || projects.length === 0) return;

    const isMobile = window.innerWidth <= 768;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        const track = trackRef.current!;
        const calculateScrollWidth = () => track.scrollWidth - window.innerWidth + 80;

        gsap.to(track, {
          x: () => -calculateScrollWidth(),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${calculateScrollWidth()}`,
            pin: true,
            scrub: 1.2,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                gsap.set(progressRef.current, { scaleX: self.progress });
              }
            },
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section 
      ref={containerRef} 
      id="work" 
      className="relative overflow-hidden bg-transparent py-24 md:py-0 md:h-[100vh] flex flex-col justify-center"
    >
      <div className="md:absolute md:top-20 md:left-20 px-6 md:px-0 mb-12 flex flex-col items-start z-10">
        <SectionLabel>Selected Works</SectionLabel>
        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
          <SplitHeadline tag="h2" className="text-4xl md:text-5xl lg:text-7xl">
            Recent projects
          </SplitHeadline>
          <Link 
            href="/work" 
            className="group flex items-center gap-3 text-[10px] uppercase font-bold tracking-[0.2em] text-muted hover:text-gold transition-colors duration-500 pb-1"
          >
            Explore Portfolio
            <span className="w-12 h-[1px] bg-border transition-all duration-500 group-hover:w-16 group-hover:bg-gold" />
          </Link>
        </div>
      </div>

      <div 
        ref={trackRef} 
        className="flex flex-col md:flex-row gap-0 md:gap-px bg-border border-y border-border px-6 md:px-0 md:pl-[20vw] h-auto md:h-fit md:w-max mt-10"
      >
        {projects.map((project, i) => (
          <div key={i} className="mb-px md:mb-0">
            <ProjectCard {...project} />
          </div>
        ))}
        <div className="hidden md:block w-[10vw] flex-shrink-0" />
      </div>

      <div className="hidden md:block absolute bottom-0 left-0 w-full h-[6px] bg-border/30 z-20">
        <div 
          ref={progressRef}
          className="h-full bg-gold origin-left scale-x-0 will-change-transform"
        />
      </div>
    </section>
  );
}
