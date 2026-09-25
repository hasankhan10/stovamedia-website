"use client";

import React from "react";
import { Inquiry } from "@/lib/db-inquiries";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: LucideIcon;
  label: string;
  badge?: string;
}

export function TabButton({ active, onClick, icon: Icon, label, badge }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 text-xs uppercase tracking-wider font-semibold transition-all rounded-xl border relative cursor-pointer select-none",
        active
          ? "bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)] font-bold"
          : "bg-[#0B0F19]/80 text-slate-400 border-slate-800/80 hover:border-slate-700 hover:text-slate-200 hover:bg-[#101726]/60"
      )}
    >
      <Icon size={16} className={active ? "text-cyan-400" : "text-slate-400"} />
      <span>{label}</span>
      {badge && (
        <span className={cn(
          "ml-1 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold tracking-tight shadow-sm",
          active 
            ? "bg-cyan-500 text-slate-950" 
            : "bg-rose-500/90 text-white animate-pulse"
        )}>
          {badge}
        </span>
      )}
    </button>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  sub: string;
  icon: LucideIcon;
  trend?: string;
  highlight?: boolean;
  color?: "cyan" | "indigo" | "emerald" | "amber" | "rose";
}

export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  trend,
  highlight,
  color = "cyan",
}: StatCardProps) {
  const colorStyles = {
    cyan: "border-cyan-500/30 bg-cyan-950/10 text-cyan-400",
    indigo: "border-indigo-500/30 bg-indigo-950/10 text-indigo-400",
    emerald: "border-emerald-500/30 bg-emerald-950/10 text-emerald-400",
    amber: "border-amber-500/30 bg-amber-950/10 text-amber-400",
    rose: "border-rose-500/30 bg-rose-950/10 text-rose-400",
  };

  return (
    <div
      className={cn(
        "p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group hover:border-slate-700 backdrop-blur-xl",
        highlight
          ? "border-cyan-500/40 bg-gradient-to-br from-[#0B0F19] to-cyan-950/20 shadow-[0_0_25px_rgba(6,182,212,0.1)]"
          : "border-slate-800/80 bg-[#0B0F19]/90 shadow-lg"
      )}
    >
      {/* Ambient background glow */}
      <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-cyan-500/5 blur-2xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <span className="text-[11px] uppercase tracking-wider font-mono font-bold text-slate-400">
          {label}
        </span>
        <div className={cn("p-2.5 rounded-xl border", colorStyles[color])}>
          <Icon size={18} />
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-baseline gap-2 mb-1">
          <div className="font-display text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
            {value}
          </div>
          {trend && (
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-1.5 py-0.5 rounded-md">
              {trend}
            </span>
          )}
        </div>
        <div className="text-xs text-slate-400 font-light flex items-center gap-1.5">
          <span>{sub}</span>
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: Inquiry["status"] }) {
  const styles: Record<string, { bg: string; text: string; border: string; dot: string; label: string }> = {
    new: {
      bg: "bg-rose-500/10",
      text: "text-rose-400",
      border: "border-rose-500/30",
      dot: "bg-rose-500 animate-ping",
      label: "NEW LEAD",
    },
    contacted: {
      bg: "bg-cyan-500/10",
      text: "text-cyan-300",
      border: "border-cyan-500/30",
      dot: "bg-cyan-400",
      label: "CONTACTED",
    },
    in_progress: {
      bg: "bg-amber-500/10",
      text: "text-amber-300",
      border: "border-amber-500/30",
      dot: "bg-amber-400",
      label: "IN PROGRESS",
    },
    archived: {
      bg: "bg-slate-500/10",
      text: "text-slate-400",
      border: "border-slate-700",
      dot: "bg-slate-500",
      label: "ARCHIVED",
    },
  };

  const current = styles[status] || styles.new;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider font-bold px-2.5 py-1 rounded-full border shadow-sm",
        current.bg,
        current.text,
        current.border
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", current.dot)} />
      <span>{current.label}</span>
    </span>
  );
}
