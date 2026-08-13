"use client";

import React from "react";
import { Project } from "@/lib/work";
import { Inquiry } from "@/lib/db-inquiries";
import { FolderKanban, Users, Sparkles, Database, Plus, Mail } from "lucide-react";
import { StatCard, StatusBadge } from "./AdminUIElements";

interface OverviewTabProps {
  projects: Project[];
  inquiries: Inquiry[];
  isFromDb: boolean;
  onNavigateTab: (tab: "projects" | "inquiries") => void;
  onOpenNewProject: () => void;
}

export default function OverviewTab({
  projects,
  inquiries,
  isFromDb,
  onNavigateTab,
  onOpenNewProject,
}: OverviewTabProps) {
  const newLeadsCount = inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="space-y-12">
      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Projects" value={String(projects.length)} sub="Portfolio showcases" icon={FolderKanban} />
        <StatCard label="Client Inquiries" value={String(inquiries.length)} sub={`${newLeadsCount} new leads`} icon={Users} highlight={newLeadsCount > 0} />
        <StatCard label="Live Services" value="4" sub="Core capabilities" icon={Sparkles} />
        <StatCard label="Database Status" value={isFromDb ? "Supabase" : "Connected"} sub="unwuhdeznfeyvbzlphrd" icon={Database} />
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 border border-border bg-card/40 rounded-sm flex flex-col justify-between">
          <div>
            <h3 className="font-display text-2xl mb-2 text-gold">Manage Portfolio</h3>
            <p className="text-sm text-muted mb-6 leading-relaxed">
              Add new custom software, healthcare SaaS, or e-commerce showcase projects to your live website.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => { onNavigateTab("projects"); onOpenNewProject(); }}
              className="flex items-center gap-2 bg-gold text-ink font-semibold px-5 py-2.5 rounded-sm hover:bg-gold-light transition-colors text-xs uppercase tracking-wider"
            >
              <Plus size={16} /> Add New Project
            </button>
            <button
              onClick={() => onNavigateTab("projects")}
              className="border border-border text-cream px-5 py-2.5 rounded-sm hover:border-gold transition-colors text-xs uppercase tracking-wider"
            >
              View All
            </button>
          </div>
        </div>

        <div className="p-8 border border-border bg-card/40 rounded-sm flex flex-col justify-between">
          <div>
            <h3 className="font-display text-2xl mb-2 text-gold">Client Inquiry Queue</h3>
            <p className="text-sm text-muted mb-6 leading-relaxed">
              Review and respond to client leads submitted via your website contact form.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => onNavigateTab("inquiries")}
              className="flex items-center gap-2 border border-gold/40 bg-gold-glow text-gold font-semibold px-5 py-2.5 rounded-sm hover:bg-gold hover:text-ink transition-all text-xs uppercase tracking-wider"
            >
              <Users size={16} /> View Leads ({inquiries.length})
            </button>
          </div>
        </div>
      </div>

      {/* RECENT LEADS PREVIEW */}
      <div className="border border-border bg-card/30 p-8 rounded-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display text-xl">Recent Client Inquiries</h3>
          <button onClick={() => onNavigateTab("inquiries")} className="text-xs text-gold hover:underline">
            View All Leads →
          </button>
        </div>

        {inquiries.length === 0 ? (
          <div className="p-12 text-center text-muted border border-dashed border-border/50">
            <p>No client inquiries logged in database yet. New website contact submissions will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {inquiries.slice(0, 5).map((inq) => (
              <div key={inq.id || inq.email} className="p-4 border border-border/60 bg-ink flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-lg text-cream">{inq.name}</span>
                    {inq.company && <span className="text-xs text-muted">({inq.company})</span>}
                    <StatusBadge status={inq.status} />
                  </div>
                  <p className="text-xs text-muted mt-1">{inq.project_type} · Budget: {inq.budget || "N/A"}</p>
                </div>
                <a href={`mailto:${inq.email}`} className="text-xs text-gold border border-gold/30 px-3 py-1.5 rounded-sm hover:bg-gold hover:text-ink transition-colors flex items-center gap-1.5">
                  <Mail size={12} /> Email Client
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
