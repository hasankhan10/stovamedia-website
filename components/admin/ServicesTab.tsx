"use client";

import React, { useState } from "react";
import { ServiceItem } from "@/lib/db-services";
import { Search, Plus, Edit3, Trash2, Code2, Bot, Store, ShoppingCart, Zap, ShieldCheck, Globe, Smartphone, Sparkles, Layers } from "lucide-react";

interface ServicesTabProps {
  services: ServiceItem[];
  onOpenNewService: () => void;
  onOpenEditService: (service: ServiceItem) => void;
  onDeleteService: (id: string) => void;
}

const ICON_MAP: Record<string, any> = {
  Code2,
  Bot,
  Store,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Globe,
  Smartphone,
  Sparkles,
  Layers,
};

export default function ServicesTab({
  services,
  onOpenNewService,
  onOpenEditService,
  onDeleteService,
}: ServicesTabProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card border border-border rounded-sm pl-9 pr-4 py-2 text-sm text-cream outline-none focus:border-gold"
          />
        </div>

        <button
          onClick={onOpenNewService}
          className="flex items-center gap-2 bg-gold text-ink font-semibold px-6 py-2.5 rounded-sm hover:bg-gold-light transition-colors text-xs uppercase tracking-wider"
        >
          <Plus size={16} /> Add Service
        </button>
      </div>

      {/* SERVICES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredServices.map((s) => {
          const IconComp = ICON_MAP[s.icon] || Code2;

          return (
            <div
              key={s.id}
              className="border border-border bg-card/40 p-8 rounded-sm flex flex-col justify-between group hover:border-gold/40 transition-colors relative"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg border border-border bg-card flex items-center justify-center text-gold group-hover:border-gold/40 transition-colors">
                      <IconComp size={22} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gold uppercase tracking-widest block font-mono">
                        Service {s.number}
                      </span>
                      <h3 className="font-display text-2xl text-cream group-hover:text-gold transition-colors">
                        {s.title}
                      </h3>
                    </div>
                  </div>

                  <span className="text-[10px] text-dim font-mono bg-ink border border-border/50 px-2 py-1 rounded-xs">
                    id: {s.id}
                  </span>
                </div>

                <p className="font-display italic text-sm text-cream/70 mb-4">{s.tagline}</p>
                <p className="text-xs text-muted mb-6 leading-relaxed line-clamp-3">{s.desc}</p>

                {/* DELIVERABLES PREVIEW */}
                <div className="mb-6 space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-dim block font-bold">
                    Deliverables ({s.deliverables?.length || 0})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(s.deliverables || []).slice(0, 4).map((d) => (
                      <span key={d} className="text-[10px] bg-ink border border-border/60 text-cream/80 px-2 py-0.5 rounded-xs">
                        ✓ {d}
                      </span>
                    ))}
                    {(s.deliverables?.length || 0) > 4 && (
                      <span className="text-[10px] text-gold font-mono">+{s.deliverables.length - 4} more</span>
                    )}
                  </div>
                </div>

                {/* TECH STACK */}
                <div className="mb-6 space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-dim block font-bold">Tech Stack</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(s.tech || []).map((t) => (
                      <span key={t} className="text-[9px] bg-gold-glow border border-gold/20 text-gold px-2 py-0.5 rounded-xs font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50 flex justify-between items-center">
                <span className="text-[10px] text-muted font-mono">{s.highlights?.length || 0} Key Highlights</span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenEditService(s)}
                    className="p-1.5 text-muted hover:text-gold transition-colors"
                    title="Edit Service"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => onDeleteService(s.id)}
                    className="p-1.5 text-muted hover:text-red-400 transition-colors"
                    title="Delete Service"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
