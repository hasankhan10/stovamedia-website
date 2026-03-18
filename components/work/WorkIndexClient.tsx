"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SplitHeadline, ProjectCard, SectionLabel } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/work";

const categories = ["All", "Healthcare", "Web Apps", "Mobile", "White-label"] as const;

export default function WorkIndexClient({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <main className="pt-32 pb-24 px-6 md:px-10 lg:px-20 min-h-screen">
      <div className="mb-20">
        <SectionLabel>Our Portfolio</SectionLabel>
        <SplitHeadline tag="h1" className="text-5xl md:text-7xl lg:text-8xl max-w-4xl leading-none font-display">
          Products built with intention.
        </SplitHeadline>
      </div>

      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold transition-all duration-500 border",
              activeCategory === cat 
                ? "bg-gold text-ink border-gold" 
                : "bg-transparent text-muted border-border hover:border-gold/50"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-border border border-border"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard 
                {...project} 
                className="w-full h-[540px]" 
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="py-32 text-center border border-dashed border-border">
          <p className="text-muted font-ui">No projects found in this category yet.</p>
        </div>
      )}
    </main>
  );
}
