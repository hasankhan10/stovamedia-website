"use client";

import React, { useState } from "react";
import { Project } from "@/lib/work";
import { X, Upload, CheckCircle2, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

interface ProjectModalProps {
  editingProject: Partial<Project>;
  onChangeEditingProject: (updated: Partial<Project>) => void;
  onSave: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function ProjectModal({
  editingProject,
  onChangeEditingProject,
  onSave,
  onClose,
}: ProjectModalProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        onChangeEditingProject({ ...editingProject, image: data.url });
      } else {
        const err = await res.json();
        setUploadError(err.error || "Upload failed");
      }
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 overflow-y-auto">
      <div className="bg-ink border border-border w-full max-w-3xl rounded-sm p-8 max-h-[90vh] overflow-y-auto space-y-6">
        <div className="flex justify-between items-center border-b border-border pb-4">
          <h3 className="font-display text-2xl text-gold">
            {editingProject.slug ? "Edit Project" : "Add New Project"}
          </h3>
          <button onClick={onClose} className="text-muted hover:text-cream">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-dim block mb-2">Title*</label>
              <input
                type="text"
                required
                value={editingProject.title || ""}
                onChange={(e) => onChangeEditingProject({ ...editingProject, title: e.target.value })}
                className="w-full bg-card border border-border p-3 text-sm text-cream outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-dim block mb-2">Slug (URL ID)*</label>
              <input
                type="text"
                required
                value={editingProject.slug || ""}
                onChange={(e) => onChangeEditingProject({ ...editingProject, slug: e.target.value })}
                className="w-full bg-card border border-border p-3 text-sm text-cream outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-dim block mb-2">Tag*</label>
              <input
                type="text"
                required
                value={editingProject.tag || ""}
                onChange={(e) => onChangeEditingProject({ ...editingProject, tag: e.target.value })}
                className="w-full bg-card border border-border p-3 text-sm text-cream outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-dim block mb-2">Category</label>
              <select
                value={editingProject.category || "Web Apps"}
                onChange={(e) => onChangeEditingProject({ ...editingProject, category: e.target.value as any })}
                className="w-full bg-card border border-border p-3 text-sm text-cream outline-none focus:border-gold"
              >
                <option value="Healthcare">Healthcare</option>
                <option value="Web Apps">Web Apps</option>
                <option value="AI">AI</option>
                <option value="Mobile">Mobile</option>
                <option value="White-label">White-label</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-dim block mb-2">Status</label>
              <select
                value={editingProject.status || "Live"}
                onChange={(e) => onChangeEditingProject({ ...editingProject, status: e.target.value as any })}
                className="w-full bg-card border border-border p-3 text-sm text-cream outline-none focus:border-gold"
              >
                <option value="Live">Live</option>
                <option value="In Development">In Development</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold tracking-widest text-dim block mb-2">Tagline</label>
            <input
              type="text"
              value={editingProject.tagline || ""}
              onChange={(e) => onChangeEditingProject({ ...editingProject, tagline: e.target.value })}
              className="w-full bg-card border border-border p-3 text-sm text-cream outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold tracking-widest text-dim block mb-2">Overview</label>
            <textarea
              rows={3}
              value={editingProject.overview || ""}
              onChange={(e) => onChangeEditingProject({ ...editingProject, overview: e.target.value })}
              className="w-full bg-card border border-border p-3 text-sm text-cream outline-none focus:border-gold resize-none"
            />
          </div>

          {/* IMAGE UPLOAD SECTION */}
          <div className="p-6 border border-border bg-card/30 rounded-sm space-y-4">
            <label className="text-[10px] uppercase font-bold tracking-widest text-dim block">
              Project Cover Image
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Preview Thumbnail */}
              <div className="relative w-32 h-24 border border-border bg-ink rounded-sm overflow-hidden flex items-center justify-center shrink-0">
                {editingProject.image ? (
                  <img
                    src={editingProject.image}
                    alt="Project preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="text-muted" size={24} />
                )}
              </div>

              {/* Upload Input */}
              <div className="flex-1 space-y-2 w-full">
                <label className="flex items-center justify-center gap-2 border border-dashed border-gold/40 hover:border-gold bg-gold-glow/40 hover:bg-gold-glow text-gold text-xs font-semibold px-4 py-3 rounded-sm cursor-pointer transition-all">
                  {uploading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Uploading Image...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
                      <span>Choose Image File to Upload</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>

                {editingProject.image && (
                  <p className="text-[11px] text-green-400 flex items-center gap-1.5 font-mono">
                    <CheckCircle2 size={14} />
                    <span>Uploaded: {editingProject.image}</span>
                  </p>
                )}

                {uploadError && (
                  <p className="text-[11px] text-red-400">{uploadError}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold tracking-widest text-dim block mb-2">External Live URL</label>
            <input
              type="text"
              placeholder="https://..."
              value={editingProject.externalUrl || ""}
              onChange={(e) => onChangeEditingProject({ ...editingProject, externalUrl: e.target.value })}
              className="w-full bg-card border border-border p-3 text-sm text-cream outline-none focus:border-gold"
            />
          </div>

          <div className="flex gap-6 pt-4">
            <label className="flex items-center gap-2 text-xs text-cream cursor-pointer">
              <input
                type="checkbox"
                checked={editingProject.featured ?? true}
                onChange={(e) => onChangeEditingProject({ ...editingProject, featured: e.target.checked })}
                className="accent-gold"
              />
              Featured on Home Page
            </label>

            <label className="flex items-center gap-2 text-xs text-cream cursor-pointer">
              <input
                type="checkbox"
                checked={editingProject.locked ?? false}
                onChange={(e) => onChangeEditingProject({ ...editingProject, locked: e.target.checked })}
                className="accent-gold"
              />
              NDA Protected (Locked)
            </label>
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
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
