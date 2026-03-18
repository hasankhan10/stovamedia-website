"use client";

import React, { useRef, useLayoutEffect } from "react";
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

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const words = containerRef.current?.querySelectorAll(".word-inner");
      if (!words) return;

      gsap.from(words, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        yPercent: 110,
        opacity: 0,
        rotateX: -20,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay,
      });
    }, containerRef);

    // Refresh ScrollTrigger after a short delay to account for Next.js layout shifts
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ctx.revert();
      clearTimeout(timer);
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
