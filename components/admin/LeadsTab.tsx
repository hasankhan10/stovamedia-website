"use client";

import React, { useState } from "react";
import { Inquiry } from "@/lib/db-inquiries";
import { Mail } from "lucide-react";
import { StatusBadge } from "./AdminUIElements";
import { cn } from "@/lib/utils";

interface LeadsTabProps {
  inquiries: Inquiry[];
  onUpdateStatus: (id: string, status: Inquiry["status"]) => void;
}

export default function LeadsTab({ inquiries, onUpdateStatus }: LeadsTabProps) {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="font-display text-2xl">Client Lead Queue ({inquiries.length})</h2>
        <span className="text-xs text-muted">Auto-captured from website contact form into Supabase</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEADS LIST */}
        <div className="lg:col-span-1 space-y-3">
          {inquiries.length === 0 ? (
            <div className="p-8 text-center text-muted border border-dashed border-border">
              <p>No leads submitted yet.</p>
            </div>
          ) : (
            inquiries.map((inq) => (
              <div
                key={inq.id || inq.email}
                onClick={() => setSelectedInquiry(inq)}
                className={cn(
                  "p-4 border cursor-pointer transition-all rounded-sm",
                  selectedInquiry?.id === inq.id
                    ? "border-gold bg-gold-glow"
                    : "border-border bg-card/30 hover:border-gold/40"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-display text-lg text-cream">{inq.name}</h4>
                  <StatusBadge status={inq.status} />
                </div>
                <p className="text-xs text-gold font-mono mb-1">{inq.project_type}</p>
                <p className="text-xs text-muted line-clamp-1">{inq.details}</p>
              </div>
            ))
          )}
        </div>

        {/* LEAD DETAIL PANEL */}
        <div className="lg:col-span-2 border border-border bg-card/40 p-8 rounded-sm">
          {selectedInquiry ? (
            <div className="space-y-8">
              <div className="flex justify-between items-start border-b border-border pb-6">
                <div>
                  <h3 className="font-display text-3xl text-cream mb-1">{selectedInquiry.name}</h3>
                  <p className="text-sm text-muted">
                    {selectedInquiry.email} {selectedInquiry.company ? `· ${selectedInquiry.company}` : ""}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted uppercase tracking-wider font-bold">Status:</span>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as Inquiry["status"];
                      if (selectedInquiry.id) {
                        onUpdateStatus(selectedInquiry.id, newStatus);
                        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
                      }
                    }}
                    className="bg-ink border border-border text-cream text-xs px-3 py-1.5 rounded-sm outline-none focus:border-gold"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 bg-ink p-6 border border-border/50">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-dim block mb-1">Project Type</span>
                  <span className="font-display text-lg text-gold">{selectedInquiry.project_type}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-dim block mb-1">Budget Range</span>
                  <span className="font-display text-lg text-cream">{selectedInquiry.budget || "Not Specified"}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-dim block mb-3">
                  Project Requirements & Details
                </span>
                <div className="p-6 bg-ink border border-border/50 text-sm text-cream/90 font-ui leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.details}
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-border">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Stova Media - Inquiry Response: ${selectedInquiry.project_type}`}
                  className="flex items-center gap-2 bg-gold text-ink font-semibold px-6 py-3 rounded-sm hover:bg-gold-light transition-colors text-xs uppercase tracking-wider"
                >
                  <Mail size={14} /> Send Email Response
                </a>
              </div>
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center text-center text-muted">
              <p>Select a lead from the list to view requirements and change status.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
