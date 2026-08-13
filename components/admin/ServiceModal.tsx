"use client";

import React, { useState } from "react";
import { ServiceItem, ServiceHighlight } from "@/lib/db-services";
import { X, Plus, Trash2, Code2, Bot, Store, ShoppingCart, Zap, ShieldCheck, Globe, Smartphone, Sparkles, Layers } from "lucide-react";

interface ServiceModalProps {
  editingService: Partial<ServiceItem>;
  onChangeEditingService: (updated: Partial<ServiceItem>) => void;
  onSave: (e: React.FormEvent) => void;
  onClose: () => void;
}

const AVAILABLE_ICONS = [
  { name: "Code2", icon: Code2, label: "Code & Software" },
  { name: "Bot", icon: Bot, label: "AI Agent" },
  { name: "Store", icon: Store, label: "Local Store / Business" },
  { name: "ShoppingCart", icon: ShoppingCart, label: "E-commerce" },
  { name: "Zap", icon: Zap, label: "Performance / Speed" },
  { name: "ShieldCheck", icon: ShieldCheck, label: "Security & Trust" },
  { name: "Globe", icon: Globe, label: "Web Platform" },
  { name: "Smartphone", icon: Smartphone, label: "Mobile App" },
  { name: "Sparkles", icon: Sparkles, label: "Special Offer" },
  { name: "Layers", icon: Layers, label: "Full Stack" },
];

export default function ServiceModal({
  editingService,
  onChangeEditingService,
  onSave,
  onClose,
}: ServiceModalProps) {
  const [newDeliverable, setNewDeliverable] = useState("");
  const [newTech, setNewTech] = useState("");
  const [newHighlightLabel, setNewHighlightLabel] = useState("");
  const [newHighlightDesc, setNewHighlightDesc] = useState("");

  const addDeliverable = () => {
    if (!newDeliverable.trim()) return;
    const current = editingService.deliverables || [];
    onChangeEditingService({ ...editingService, deliverables: [...current, newDeliverable.trim()] });
    setNewDeliverable("");
  };

  const removeDeliverable = (index: number) => {
    const current = editingService.deliverables || [];
    onChangeEditingService({ ...editingService, deliverables: current.filter((_, i) => i !== index) });
  };

  const addTech = () => {
    if (!newTech.trim()) return;
    const current = editingService.tech || [];
    onChangeEditingService({ ...editingService, tech: [...current, newTech.trim()] });
    setNewTech("");
  };

  const removeTech = (index: number) => {
    const current = editingService.tech || [];
    onChangeEditingService({ ...editingService, tech: current.filter((_, i) => i !== index) });
  };

  const addHighlight = () => {
    if (!newHighlightLabel.trim() || !newHighlightDesc.trim()) return;
    const current = editingService.highlights || [];
    onChangeEditingService({
      ...editingService,
      highlights: [
        ...current,
        { label: newHighlightLabel.trim(), desc: newHighlightDesc.trim() },
      ],
    });
    setNewHighlightLabel("");
    setNewHighlightDesc("");
  };

  const removeHighlight = (index: number) => {
    const current = editingService.highlights || [];
    onChangeEditingService({ ...editingService, highlights: current.filter((_, i) => i !== index) });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 overflow-y-auto">
      <div className="bg-ink border border-border w-full max-w-3xl rounded-sm p-8 max-h-[90vh] overflow-y-auto space-y-6">
        <div className="flex justify-between items-center border-b border-border pb-4">
          <h3 className="font-display text-2xl text-gold">
            {editingService.id ? "Edit Service" : "Add New Service"}
          </h3>
          <button onClick={onClose} className="text-muted hover:text-cream">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-dim block mb-2">Service Title*</label>
              <input
                type="text"
                required
                value={editingService.title || ""}
                onChange={(e) => onChangeEditingService({ ...editingService, title: e.target.value })}
                className="w-full bg-card border border-border p-3 text-sm text-cream outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-dim block mb-2">Service ID / Slug*</label>
              <input
                type="text"
                required
                value={editingService.id || ""}
                onChange={(e) => onChangeEditingProjectSlug(e.target.value)}
                className="w-full bg-card border border-border p-3 text-sm text-cream outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-dim block mb-2">Number Badge</label>
              <input
                type="text"
                value={editingService.number || "01"}
                onChange={(e) => onChangeEditingService({ ...editingService, number: e.target.value })}
                className="w-full bg-card border border-border p-3 text-sm text-cream outline-none focus:border-gold font-mono text-center"
              />
            </div>
          </div>

          {/* ICON PICKER */}
          <div>
            <label className="text-[10px] uppercase font-bold tracking-widest text-dim block mb-2">Service Icon</label>
            <div className="grid grid-cols-5 gap-3">
              {AVAILABLE_ICONS.map((item) => {
                const IconComp = item.icon;
                const isSelected = (editingService.icon || "Code2") === item.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => onChangeEditingService({ ...editingService, icon: item.name })}
                    className={`p-3 border rounded-sm flex flex-col items-center gap-1.5 transition-all ${
                      isSelected
                        ? "border-gold bg-gold-glow text-gold"
                        : "border-border/60 bg-card/20 text-muted hover:border-gold/30 hover:text-cream"
                    }`}
                  >
                    <IconComp size={20} />
                    <span className="text-[9px] font-mono text-center leading-tight">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold tracking-widest text-dim block mb-2">Tagline</label>
            <input
              type="text"
              value={editingService.tagline || ""}
              onChange={(e) => onChangeEditingService({ ...editingService, tagline: e.target.value })}
              className="w-full bg-card border border-border p-3 text-sm text-cream outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold tracking-widest text-dim block mb-2">Full Description</label>
            <textarea
              rows={3}
              value={editingService.desc || ""}
              onChange={(e) => onChangeEditingService({ ...editingService, desc: e.target.value })}
              className="w-full bg-card border border-border p-3 text-sm text-cream outline-none focus:border-gold resize-none"
            />
          </div>

          {/* DELIVERABLES MANAGER */}
          <div className="p-6 border border-border bg-card/30 rounded-sm space-y-4">
            <label className="text-[10px] uppercase font-bold tracking-widest text-dim block">What We Deliver (Bullets)</label>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Full-stack Web Applications"
                value={newDeliverable}
                onChange={(e) => setNewDeliverable(e.target.value)}
                className="flex-1 bg-ink border border-border p-2.5 text-xs text-cream outline-none focus:border-gold"
              />
              <button
                type="button"
                onClick={addDeliverable}
                className="bg-gold text-ink font-semibold px-4 py-2.5 rounded-sm hover:bg-gold-light transition-colors text-xs flex items-center gap-1"
              >
                <Plus size={14} /> Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {(editingService.deliverables || []).map((item, idx) => (
                <span key={idx} className="bg-ink border border-border text-cream/90 text-xs px-3 py-1.5 rounded-sm flex items-center gap-2">
                  <span>{item}</span>
                  <button type="button" onClick={() => removeDeliverable(idx)} className="text-muted hover:text-red-400">
                    <Trash2 size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* TECH STACK MANAGER */}
          <div className="p-6 border border-border bg-card/30 rounded-sm space-y-4">
            <label className="text-[10px] uppercase font-bold tracking-widest text-dim block">Tech Stack Tags</label>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Next.js, Supabase, Python"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                className="flex-1 bg-ink border border-border p-2.5 text-xs text-cream outline-none focus:border-gold"
              />
              <button
                type="button"
                onClick={addTech}
                className="bg-gold text-ink font-semibold px-4 py-2.5 rounded-sm hover:bg-gold-light transition-colors text-xs flex items-center gap-1"
              >
                <Plus size={14} /> Add Tag
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {(editingService.tech || []).map((t, idx) => (
                <span key={idx} className="bg-gold-glow border border-gold/30 text-gold text-xs px-3 py-1.5 rounded-sm flex items-center gap-2 font-mono">
                  <span>{t}</span>
                  <button type="button" onClick={() => removeTech(idx)} className="text-gold/60 hover:text-red-400">
                    <Trash2 size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* HIGHLIGHTS MANAGER */}
          <div className="p-6 border border-border bg-card/30 rounded-sm space-y-4">
            <label className="text-[10px] uppercase font-bold tracking-widest text-dim block">Key Highlights & Pricing Features</label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Highlight Label (e.g. Zero Templates)"
                value={newHighlightLabel}
                onChange={(e) => setNewHighlightLabel(e.target.value)}
                className="bg-ink border border-border p-2.5 text-xs text-cream outline-none focus:border-gold"
              />
              <input
                type="text"
                placeholder="Description (e.g. 100% custom-built)"
                value={newHighlightDesc}
                onChange={(e) => setNewHighlightDesc(e.target.value)}
                className="bg-ink border border-border p-2.5 text-xs text-cream outline-none focus:border-gold"
              />
            </div>
            <button
              type="button"
              onClick={addHighlight}
              className="bg-gold text-ink font-semibold px-4 py-2 rounded-sm hover:bg-gold-light transition-colors text-xs flex items-center gap-1"
            >
              <Plus size={14} /> Add Highlight
            </button>

            <div className="space-y-2">
              {(editingService.highlights || []).map((h, idx) => (
                <div key={idx} className="p-3 bg-ink border border-border/70 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-display text-cream font-semibold block">{h.label}</span>
                    <span className="text-muted">{h.desc}</span>
                  </div>
                  <button type="button" onClick={() => removeHighlight(idx)} className="text-muted hover:text-red-400 p-1">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-border text-cream text-xs uppercase tracking-wider hover:border-gold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gold text-ink font-semibold text-xs uppercase tracking-wider hover:bg-gold-light transition-colors"
            >
              Save Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  function onChangeEditingProjectSlug(val: string) {
    onChangeEditingService({ ...editingService, id: val });
  }
}
