"use client";

import React, { useState } from "react";
import { Project } from "@/lib/work";
import { Search, Plus, ExternalLink, Edit3, Trash2 } from "lucide-react";

interface ProjectsTabProps {
  projects: Project[];
  onOpenNewProject: () => void;
  onOpenEditProject: (project: Project) => void;
  onDeleteProject: (slug: string) => void;
}

export default function ProjectsTab({
  projects,
  onOpenNewProject,
  onOpenEditProject,
  onDeleteProject,
}: ProjectsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card border border-border rounded-sm pl-9 pr-4 py-2 text-sm text-cream outline-none focus:border-gold"
          />
        </div>

        <button
          onClick={onOpenNewProject}
          className="flex items-center gap-2 bg-gold text-ink font-semibold px-6 py-2.5 rounded-sm hover:bg-gold-light transition-colors text-xs uppercase tracking-wider"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* PROJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((p) => (
          <div
            key={p.slug}
            className="border border-border bg-card/40 p-6 rounded-sm flex flex-col justify-between relative group hover:border-gold/40 transition-colors"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold bg-gold-glow px-2 py-1 border border-gold/20">
                  {p.tag}
                </span>
                <span className="text-xs font-display text-muted">{p.status}</span>
              </div>

              <h3 className="font-display text-2xl text-cream mb-2 group-hover:text-gold transition-colors">{p.title}</h3>
              <p className="text-xs text-muted mb-4 line-clamp-2 leading-relaxed">{p.tagline}</p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {p.tech.map((t) => (
                  <span key={t} className="text-[9px] bg-border/50 text-cream/70 px-2 py-0.5 rounded-xs font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                {p.externalUrl && (
                  <a
                    href={p.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-gold transition-colors"
                    title="Visit External Link"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
                <span className="text-[10px] text-dim uppercase tracking-wider font-mono">/{p.slug}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenEditProject(p)}
                  className="p-1.5 text-muted hover:text-gold transition-colors"
                  title="Edit Project"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => onDeleteProject(p.slug)}
                  className="p-1.5 text-muted hover:text-red-400 transition-colors"
                  title="Delete Project"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
