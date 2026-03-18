"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface SplitHeadlineProps {
  children: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  delay?: number;
}

export const SplitHeadline = ({
  children,
  className,
  tag: Tag = "h1",
  delay = 0,
}: SplitHeadlineProps) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = containerRef.current.querySelectorAll(".word-inner");
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
      },
    });

    tl.from(words, {
      yPercent: 110,
      opacity: 0,
      rotateX: -20,
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out",
      delay,
    });

    return () => {
      tl.kill();
    };
  }, [delay]);

  const words = children.split(" ");

  return (
    <Tag
      ref={containerRef}
      className={cn("font-display flex flex-wrap gap-x-[0.3em] overflow-hidden", className)}
    >
      {words.map((word, i) => (
        <span key={i} className="word-outer overflow-hidden py-1 leading-[1.1]">
          <span className="word-inner inline-block will-change-transform">{word}</span>
        </span>
      ))}
    </Tag>
  );
};
