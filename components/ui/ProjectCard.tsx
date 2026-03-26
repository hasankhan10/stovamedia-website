"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
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
    "group relative flex flex-col justify-between p-10 bg-card/40 border border-border overflow-hidden transition-all duration-700 hover:border-gold/30 hover:bg-card hover:shadow-2xl hover:shadow-gold/5",
    featured ? "md:w-[680px]" : "md:w-[500px]",
    "h-[540px] flex-shrink-0",
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
            className="w-full h-full object-cover scale-[1.1] opacity-0 blur-sm transition-all duration-1000 ease-out group-hover:scale-100 group-hover:opacity-[0.14] group-hover:blur-0"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gold/5 to-transparent opacity-0 transition-opacity duration-1000 group-hover:opacity-100" />
        )}
      </div>

      {/* Card Header */}
      <div className="relative z-10 flex justify-between items-start">
        <Tag>{tag}</Tag>
        <span className="text-xl font-display text-muted/30 italic group-hover:text-gold/50 transition-colors duration-500">
          {index}
        </span>
      </div>

      {/* Card Body */}
      <div className="relative z-10">
        <h3 className="text-5xl font-display mb-3 group-hover:text-gold transition-colors duration-500 max-w-[80%] leading-[1.1]">
          {title}
        </h3>
        <p className="text-sm text-muted font-ui max-w-[300px] leading-relaxed group-hover:text-cream transition-colors duration-500">
          {tagline}
        </p>

        {/* Explore Button */}
        {!locked ? (
          <div className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-dim transition-all duration-500 group-hover:text-gold translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            {externalUrl ? "Visit Website" : "Explore Case Study"}
            <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        ) : (
          <div className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-dim/40 transition-all duration-500 group-hover:text-gold/60 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 italic">
            Confidential · NDA Protected
          </div>
        )}
      </div>

      {/* Bottom Border Accent */}
      {!locked && (
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gold origin-left scale-x-0 transition-transform duration-1000 group-hover:scale-x-100" />
      )}
    </>
  );

  if (locked) {
    return <div className={commonClasses}>{innerContent}</div>;
  }

  // Always open external URL in a new tab
  if (externalUrl) {
    return (
      <a href={externalUrl} target="_blank" rel="noopener noreferrer" className={commonClasses}>
        {innerContent}
      </a>
    );
  }

  // Fallback: external link using slug (should not normally be reached)
  return (
    <a href={`/work/${slug}`} target="_blank" rel="noopener noreferrer" className={commonClasses}>
      {innerContent}
    </a>
  );
};
