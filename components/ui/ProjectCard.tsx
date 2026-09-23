"use client";

import React from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tag } from "./Tag";

interface ProjectCardProps {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  tag: string;
  image?: string;
  featured?: boolean;
  className?: string;
  locked?: boolean;
  externalUrl?: string;
}

export const ProjectCard = ({
  slug,
  index,
  title,
  tagline,
  tag,
  image,
  featured = false,
  className,
  locked = false,
  externalUrl,
}: ProjectCardProps) => {
  const commonClasses = cn(
    "group relative flex flex-col justify-between p-6 sm:p-8 md:p-10 bg-[#0B0F19]/90 border border-slate-800 overflow-hidden transition-all duration-500 hover:border-indigo-500/60 hover:shadow-2xl hover:shadow-indigo-500/10 rounded-xs",
    featured ? "w-full md:w-[650px] lg:w-[680px]" : "w-full md:w-[480px] lg:w-[500px]",
    "h-auto min-h-[380px] md:h-[520px] flex-shrink-0",
    className
  );

  const innerContent = (
    <>
      {/* Background Image Reveal */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover scale-[1.08] opacity-[0.15] blur-sm transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-[0.4] group-hover:blur-0"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 opacity-[0.2] transition-opacity duration-700 group-hover:opacity-100" />
        )}
      </div>

      {/* Card Header */}
      <div className="relative z-10 flex justify-between items-start">
        <span className="px-2.5 py-1 text-[10px] sm:text-xs font-ui uppercase tracking-wider font-semibold bg-[#05070D] border border-cyan-500/30 text-cyan-400">
          {tag}
        </span>
        <span className="text-lg sm:text-xl font-display font-bold text-slate-600 group-hover:text-cyan-400 transition-colors duration-300">
          {index}
        </span>
      </div>

      {/* Card Body */}
      <div className="relative z-10 mt-6 md:mt-auto">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-[#F8FAFC] mb-2 sm:mb-3 group-hover:text-cyan-400 transition-colors duration-300 max-w-[95%] leading-[1.12] font-bold">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 font-ui max-w-[340px] leading-relaxed group-hover:text-slate-100 transition-colors duration-300 font-light">
          {tagline}
        </p>

        {/* Explore Button */}
        {!locked ? (
          <div className="mt-5 sm:mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-bold text-cyan-400 opacity-90 md:opacity-0 group-hover:opacity-100 transition-all duration-300 transform md:translate-y-2 group-hover:translate-y-0">
            <span>{externalUrl ? "Visit Live Platform" : "Explore Case Study"}</span>
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-cyan-400" />
          </div>
        ) : (
          <div className="mt-5 sm:mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-bold text-slate-500 italic">
            Confidential · Enterprise NDA
          </div>
        )}
      </div>

      {/* Bottom Laser Border Accent */}
      {!locked && (
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
      )}
    </>
  );

  if (locked) {
    return <div className={commonClasses}>{innerContent}</div>;
  }

  if (externalUrl) {
    return (
      <a href={externalUrl} target="_blank" rel="noopener noreferrer" className={commonClasses}>
        {innerContent}
      </a>
    );
  }

  return (
    <a href={`/work/${slug}`} target="_blank" rel="noopener noreferrer" className={commonClasses}>
      {innerContent}
    </a>
  );
};
