"use client";

import React from "react";
import { Inquiry } from "@/lib/db-inquiries";
import { cn } from "@/lib/utils";

export function TabButton({ active, onClick, icon: Icon, label, badge }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2.5 px-5 py-3 text-xs uppercase tracking-wider font-semibold transition-all rounded-sm border",
        active
          ? "bg-gold text-ink border-gold"
          : "bg-card/40 text-muted border-border hover:border-gold/40 hover:text-cream"
      )}
    >
      <Icon size={16} />
      <span>{label}</span>
      {badge && (
        <span className="ml-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-mono">
          {badge}
        </span>
      )}
    </button>
  );
}

export function StatCard({ label, value, sub, icon: Icon, highlight }: any) {
  return (
    <div
      className={cn(
        "p-6 border rounded-sm flex flex-col justify-between",
        highlight ? "border-gold bg-gold-glow" : "border-border bg-card/30"
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] uppercase tracking-widest font-bold text-dim">{label}</span>
        <Icon size={20} className={highlight ? "text-gold" : "text-muted"} />
      </div>
      <div>
        <div className="font-display text-4xl text-cream mb-1">{value}</div>
        <div className="text-xs text-muted">{sub}</div>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: Inquiry["status"] }) {
  const styles: Record<string, string> = {
    new: "bg-red-500/20 text-red-400 border-red-500/30",
    contacted: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    in_progress: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    archived: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };

  return (
    <span className={cn("text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 border rounded-xs", styles[status] || styles.new)}>
      {status.replace("_", " ")}
    </span>
  );
}
