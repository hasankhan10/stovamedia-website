"use client";

import React from "react";
import { RefreshCw, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminHeaderProps {
  isFromDb: boolean;
  onRefresh: () => void;
  onLogout: () => void;
}

export default function AdminHeader({ isFromDb, onRefresh, onLogout }: AdminHeaderProps) {
  return (
    <header className="border-b border-border bg-card/60 sticky top-0 z-40 backdrop-blur-md px-6 md:px-10 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="font-display text-2xl text-cream font-bold">Stova Studio</span>
        <span className="text-[10px] uppercase tracking-widest bg-gold-glow border border-gold/30 text-gold px-2.5 py-1 rounded-sm">
          Admin Panel
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-2 text-xs text-muted">
          <span className={cn("w-2 h-2 rounded-full", isFromDb ? "bg-green-500 animate-pulse" : "bg-amber-500")} />
          <span>{isFromDb ? "Supabase Connected" : "Local Memory Fallback"}</span>
        </div>

        <button
          onClick={onRefresh}
          className="p-2 border border-border rounded-sm hover:border-gold text-muted hover:text-cream transition-colors"
          title="Refresh Data"
        >
          <RefreshCw size={16} />
        </button>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-xs text-muted hover:text-red-400 border border-border px-3 py-1.5 rounded-sm hover:border-red-400/50 transition-colors"
        >
          <LogOut size={14} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
