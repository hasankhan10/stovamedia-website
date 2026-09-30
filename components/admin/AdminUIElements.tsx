"use client";

import React, { useState } from "react";
import { Inquiry } from "@/lib/db-inquiries";
import { cn } from "@/lib/utils";
import { LucideIcon, Check, Copy } from "lucide-react";

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: LucideIcon;
  label: string;
  badge?: number | string;
}

export function TabButton({ active, onClick, icon: Icon, label, badge }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer select-none",
        active
          ? "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/25 font-bold"
          : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-slate-900 hover:bg-slate-50"
      )}
    >
      <Icon size={15} className={active ? "text-white" : "text-slate-500"} />
      <span>{label}</span>
      {badge !== undefined && badge !== 0 && (
        <span
          className={cn(
            "ml-1 text-[11px] px-2 py-0.5 rounded-full font-mono font-bold tracking-tight",
            active
              ? "bg-white/20 text-white"
              : "bg-rose-100 text-rose-700 border border-rose-200"
          )}
        >
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
  color = "indigo",
}: StatCardProps) {
  const colorStyles = {
    cyan: "border-cyan-200 bg-cyan-50 text-cyan-700",
    indigo: "border-indigo-200 bg-indigo-50 text-indigo-700",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
    amber: "border-amber-200 bg-amber-50 text-amber-800",
    rose: "border-rose-200 bg-rose-50 text-rose-700",
  };

  return (
    <div
      className={cn(
        "p-5 sm:p-6 rounded-2xl border transition-all duration-200 relative overflow-hidden bg-white shadow-2xs hover:shadow-sm",
        highlight
          ? "border-indigo-300 ring-2 ring-indigo-500/10"
          : "border-slate-200/90"
      )}
    >
      <div className="flex justify-between items-start mb-3 relative z-10">
        <span className="text-xs uppercase tracking-wider font-mono font-bold text-slate-500">
          {label}
        </span>
        <div className={cn("p-2.5 rounded-xl border shadow-2xs", colorStyles[color])}>
          <Icon size={18} />
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-baseline gap-2 mb-1">
          <div className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {value}
          </div>
          {trend && (
            <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              {trend}
            </span>
          )}
        </div>
        <div className="text-xs text-slate-500 font-light flex items-center gap-1.5">
          <span>{sub}</span>
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: Inquiry["status"] }) {
  const styles: Record<string, { bg: string; text: string; border: string; dot: string; label: string }> = {
    new: {
      bg: "bg-rose-50",
      text: "text-rose-700",
      border: "border-rose-200",
      dot: "bg-rose-500 animate-pulse",
      label: "NEW LEAD",
    },
    contacted: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      dot: "bg-blue-600",
      label: "CONTACTED",
    },
    in_progress: {
      bg: "bg-amber-50",
      text: "text-amber-800",
      border: "border-amber-200",
      dot: "bg-amber-500",
      label: "IN PROGRESS",
    },
    archived: {
      bg: "bg-slate-100",
      text: "text-slate-600",
      border: "border-slate-200",
      dot: "bg-slate-400",
      label: "ARCHIVED",
    },
  };

  const current = styles[status] || styles.new;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider font-bold px-2.5 py-0.5 rounded-full border shadow-2xs",
        current.bg,
        current.text,
        current.border
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", current.dot)} />
      <span>{current.label}</span>
    </span>
  );
}

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer shadow-2xs"
      title="Copy to clipboard"
    >
      {copied ? (
        <>
          <Check size={12} className="text-emerald-600" />
          <span className="text-emerald-700 font-semibold">Copied!</span>
        </>
      ) : (
        <>
          <Copy size={12} className="text-slate-500" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
