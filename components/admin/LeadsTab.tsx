"use client";

import React, { useState, useMemo } from "react";
import { Inquiry } from "@/lib/db-inquiries";
import {
  Mail,
  Phone,
  Trash2,
  Search,
  ExternalLink,
  MessageCircle,
  Eye,
  Calendar,
  Building,
  Tag,
  DollarSign,
  X,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronDown
} from "lucide-react";
import { StatusBadge } from "./AdminUIElements";
import { cn } from "@/lib/utils";

interface LeadsTabProps {
  inquiries: Inquiry[];
  onUpdateStatus: (id: string, status: Inquiry["status"]) => void;
  onDeleteInquiry?: (id: string) => void;
}

export default function LeadsTab({
  inquiries,
  onUpdateStatus,
  onDeleteInquiry,
}: LeadsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Format date helper
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Just now";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  // Helper to extract clean phone for WhatsApp
  const getWhatsAppLink = (inquiry: Inquiry) => {
    // Check if email field has a phone number or if details contain phone
    const contactStr = `${inquiry.email} ${inquiry.details}`;
    const match = contactStr.match(/(\+?[0-9]{10,14})/);
    const rawPhone = match ? match[1] : inquiry.email.replace(/[^0-9+]/g, "");
    const cleanNumber = rawPhone.replace(/[^0-9]/g, "");
    
    if (cleanNumber.length >= 10) {
      const text = encodeURIComponent(
        `Hi ${inquiry.name}, thank you for reaching out to Stova Media regarding your ${inquiry.project_type || "consultation"}. We'd love to discuss how we can help scale your business!`
      );
      return `https://wa.me/${cleanNumber}?text=${text}`;
    }
    return null;
  };

  // Status Metrics
  const stats = useMemo(() => {
    return {
      total: inquiries.length,
      new: inquiries.filter((i) => i.status === "new").length,
      contacted: inquiries.filter((i) => i.status === "contacted").length,
      in_progress: inquiries.filter((i) => i.status === "in_progress").length,
      archived: inquiries.filter((i) => i.status === "archived").length,
    };
  }, [inquiries]);

  // Filtered Leads
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesStatus;

      const matchesSearch =
        inq.name.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        (inq.company && inq.company.toLowerCase().includes(q)) ||
        (inq.project_type && inq.project_type.toLowerCase().includes(q)) ||
        (inq.details && inq.details.toLowerCase().includes(q));

      return matchesStatus && matchesSearch;
    });
  }, [inquiries, statusFilter, searchQuery]);

  const handleDelete = (id?: string) => {
    if (!id || !onDeleteInquiry) return;
    if (confirm("Are you sure you want to permanently delete this lead?")) {
      onDeleteInquiry(id);
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER & METRIC SUMMARY CARDS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl md:text-3xl text-cream tracking-wide">
            Client Lead Queue
          </h2>
          <p className="text-xs text-muted mt-1">
            Structured database of all consultation bookings & website inquiries
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted font-mono bg-card/60 border border-border px-3 py-1.5 rounded-sm">
            Total Leads: <strong className="text-gold font-bold">{stats.total}</strong>
          </span>
        </div>
      </div>

      {/* QUICK STATUS STAT COUNTERS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setStatusFilter("all")}
          className={cn(
            "p-3.5 border rounded-sm text-left transition-all",
            statusFilter === "all"
              ? "border-gold bg-gold-glow/20"
              : "border-border bg-card/30 hover:border-gold/30"
          )}
        >
          <span className="text-[10px] uppercase tracking-widest text-dim font-bold block mb-1">
            All Inquiries
          </span>
          <div className="font-display text-2xl text-cream">{stats.total}</div>
        </button>

        <button
          onClick={() => setStatusFilter("new")}
          className={cn(
            "p-3.5 border rounded-sm text-left transition-all",
            statusFilter === "new"
              ? "border-red-500/50 bg-red-500/10"
              : "border-border bg-card/30 hover:border-red-500/30"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-red-400 font-bold block mb-1">
              New Leads
            </span>
            {stats.new > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </div>
          <div className="font-display text-2xl text-red-400">{stats.new}</div>
        </button>

        <button
          onClick={() => setStatusFilter("contacted")}
          className={cn(
            "p-3.5 border rounded-sm text-left transition-all",
            statusFilter === "contacted"
              ? "border-blue-500/50 bg-blue-500/10"
              : "border-border bg-card/30 hover:border-blue-500/30"
          )}
        >
          <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold block mb-1">
            Contacted
          </span>
          <div className="font-display text-2xl text-blue-400">{stats.contacted}</div>
        </button>

        <button
          onClick={() => setStatusFilter("in_progress")}
          className={cn(
            "p-3.5 border rounded-sm text-left transition-all",
            statusFilter === "in_progress"
              ? "border-amber-500/50 bg-amber-500/10"
              : "border-border bg-card/30 hover:border-amber-500/30"
          )}
        >
          <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold block mb-1">
            In Progress
          </span>
          <div className="font-display text-2xl text-amber-400">{stats.in_progress}</div>
        </button>
      </div>

      {/* CONTROLS BAR: SEARCH & STATUS FILTER */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-card/20 p-3 border border-border rounded-sm">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim" />
          <input
            type="text"
            placeholder="Search by client name, email, phone, business brand, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-ink border border-border text-cream placeholder:text-dim text-xs pl-10 pr-8 py-2.5 rounded-sm outline-none focus:border-gold transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-dim hover:text-cream"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {(["all", "new", "contacted", "in_progress", "archived"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                "px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold rounded-xs border transition-all whitespace-nowrap",
                statusFilter === st
                  ? "bg-gold text-ink border-gold"
                  : "bg-ink/60 text-muted border-border hover:border-gold/40 hover:text-cream"
              )}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* LEADS STRUCTURE TABLE */}
      <div className="border border-border bg-card/20 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-ink border-b border-border text-dim uppercase tracking-wider text-[10px] font-bold">
                <th className="py-3.5 px-4 font-semibold">Date & Time</th>
                <th className="py-3.5 px-4 font-semibold">Client / Business</th>
                <th className="py-3.5 px-4 font-semibold">Contact Info</th>
                <th className="py-3.5 px-4 font-semibold">Service / Category</th>
                <th className="py-3.5 px-4 font-semibold">Project Scope / Budget</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted">
                    <AlertCircle size={28} className="mx-auto mb-2 text-dim opacity-50" />
                    <p className="text-sm font-medium">No leads match your criteria</p>
                    <p className="text-xs text-dim mt-1">
                      {searchQuery || statusFilter !== "all"
                        ? "Try adjusting your search query or status filter."
                        : "New consultation requests and inquiries will automatically appear here."}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => {
                  const waLink = getWhatsAppLink(inq);
                  const isPhoneContact = /^(\+?[0-9\s-]{7,16})$/.test(inq.email.trim());

                  return (
                    <tr
                      key={inq.id || inq.email + inq.created_at}
                      className={cn(
                        "hover:bg-gold-glow/5 transition-colors group",
                        inq.status === "new" ? "bg-red-500/[0.03]" : ""
                      )}
                    >
                      {/* Date & Time */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-dim font-mono text-[11px]">
                        <div className="flex items-center gap-1.5 text-cream/80">
                          <Calendar size={13} className="text-gold/70" />
                          <span>{formatDate(inq.created_at)}</span>
                        </div>
                      </td>

                      {/* Client / Business */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold/30 text-gold flex items-center justify-center font-display font-bold text-xs uppercase flex-shrink-0">
                            {inq.name.charAt(0) || "C"}
                          </div>
                          <div>
                            <div className="font-display font-medium text-cream text-sm group-hover:text-gold transition-colors">
                              {inq.name}
                            </div>
                            {inq.company ? (
                              <div className="text-[11px] text-muted flex items-center gap-1 mt-0.5">
                                <Building size={11} className="text-gold/60" />
                                <span>{inq.company}</span>
                              </div>
                            ) : (
                              <span className="text-[10px] text-dim italic">Individual</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-cream/90 font-mono text-[11px]">
                            {isPhoneContact ? (
                              <Phone size={12} className="text-emerald-400 flex-shrink-0" />
                            ) : (
                              <Mail size={12} className="text-gold/70 flex-shrink-0" />
                            )}
                            <span className="truncate max-w-[160px]" title={inq.email}>
                              {inq.email}
                            </span>
                          </div>
                          {waLink && (
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                            >
                              <MessageCircle size={11} /> WhatsApp Quick Chat
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Service / Category */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs bg-gold/10 border border-gold/30 text-gold text-[11px] font-medium whitespace-nowrap">
                          <Tag size={10} />
                          {inq.project_type || "Consultation"}
                        </span>
                      </td>

                      {/* Project Scope / Budget */}
                      <td className="py-3.5 px-4 max-w-[200px]">
                        <div>
                          {inq.budget && (
                            <div className="text-cream font-medium text-[11px] flex items-center gap-1 mb-0.5">
                              <DollarSign size={11} className="text-emerald-400" />
                              <span>{inq.budget}</span>
                            </div>
                          )}
                          <p className="text-[11px] text-muted truncate" title={inq.details}>
                            {inq.details || "No extra details specified"}
                          </p>
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <select
                          value={inq.status}
                          onChange={(e) => {
                            const newStatus = e.target.value as Inquiry["status"];
                            if (inq.id) {
                              onUpdateStatus(inq.id, newStatus);
                            }
                          }}
                          className={cn(
                            "text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-xs border outline-none cursor-pointer transition-all",
                            inq.status === "new"
                              ? "bg-red-500/15 text-red-400 border-red-500/30"
                              : inq.status === "contacted"
                              ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
                              : inq.status === "in_progress"
                              ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                              : "bg-gray-500/15 text-gray-400 border-gray-500/30"
                          )}
                        >
                          <option value="new" className="bg-ink text-cream">NEW</option>
                          <option value="contacted" className="bg-ink text-cream">CONTACTED</option>
                          <option value="in_progress" className="bg-ink text-cream">IN PROGRESS</option>
                          <option value="archived" className="bg-ink text-cream">ARCHIVED</option>
                        </select>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Detail Button */}
                          <button
                            onClick={() => setSelectedInquiry(inq)}
                            title="View Full Lead Details"
                            className="p-1.5 text-muted hover:text-gold hover:bg-gold/10 border border-transparent hover:border-gold/30 rounded-xs transition-all"
                          >
                            <Eye size={15} />
                          </button>

                          {/* Direct WhatsApp Chat */}
                          {waLink && (
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Chat on WhatsApp"
                              className="p-1.5 text-muted hover:text-emerald-400 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30 rounded-xs transition-all"
                            >
                              <MessageCircle size={15} />
                            </a>
                          )}

                          {/* Email Link */}
                          {!isPhoneContact && (
                            <a
                              href={`mailto:${inq.email}?subject=Stova Media - Inquiry regarding ${inq.project_type}`}
                              title="Send Email"
                              className="p-1.5 text-muted hover:text-gold hover:bg-gold/10 border border-transparent hover:border-gold/30 rounded-xs transition-all"
                            >
                              <Mail size={15} />
                            </a>
                          )}

                          {/* Delete Lead Button */}
                          {onDeleteInquiry && inq.id && (
                            <button
                              onClick={() => handleDelete(inq.id)}
                              title="Delete Lead"
                              className="p-1.5 text-muted hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 rounded-xs transition-all"
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* TABLE FOOTER SUMMARY */}
        <div className="p-3 bg-ink/90 border-t border-border flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted gap-2">
          <span>
            Showing <strong className="text-cream">{filteredInquiries.length}</strong> of{" "}
            <strong className="text-cream">{inquiries.length}</strong> total leads
          </span>
          <span className="text-dim">
            Click &quot;View&quot; icon to inspect full client details, scope, and direct contact options.
          </span>
        </div>
      </div>

      {/* LEAD DETAIL MODAL / DRAWER */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-ink border border-gold/40 w-full max-w-2xl rounded-sm p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-border pb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display text-2xl sm:text-3xl text-cream">
                    {selectedInquiry.name}
                  </h3>
                  <StatusBadge status={selectedInquiry.status} />
                </div>
                <p className="text-xs text-muted flex items-center gap-2">
                  <span>Received: {formatDate(selectedInquiry.created_at)}</span>
                  {selectedInquiry.company && (
                    <>
                      <span>·</span>
                      <span className="text-gold flex items-center gap-1">
                        <Building size={12} /> {selectedInquiry.company}
                      </span>
                    </>
                  )}
                </p>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-dim hover:text-cream p-1.5 rounded-xs transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Status Control */}
            <div className="flex items-center justify-between bg-card/30 p-3.5 border border-border rounded-sm">
              <span className="text-xs uppercase tracking-wider font-semibold text-muted">
                Current Lead Status:
              </span>
              <select
                value={selectedInquiry.status}
                onChange={(e) => {
                  const newStatus = e.target.value as Inquiry["status"];
                  if (selectedInquiry.id) {
                    onUpdateStatus(selectedInquiry.id, newStatus);
                    setSelectedInquiry({ ...selectedInquiry, status: newStatus });
                  }
                }}
                className="bg-ink border border-gold/40 text-cream text-xs px-3 py-1.5 rounded-sm outline-none focus:border-gold font-semibold"
              >
                <option value="new">New Lead</option>
                <option value="contacted">Contacted</option>
                <option value="in_progress">In Progress</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Client & Project Structure Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-card/20 border border-border/70 rounded-sm">
                <span className="text-[10px] uppercase tracking-widest text-dim block mb-1 font-bold">
                  Client Contact / WhatsApp
                </span>
                <span className="font-mono text-sm text-cream font-medium break-all">
                  {selectedInquiry.email}
                </span>
              </div>

              <div className="p-4 bg-card/20 border border-border/70 rounded-sm">
                <span className="text-[10px] uppercase tracking-widest text-dim block mb-1 font-bold">
                  Brand / Company Name
                </span>
                <span className="font-display text-base text-cream">
                  {selectedInquiry.company || "Not Specified"}
                </span>
              </div>

              <div className="p-4 bg-card/20 border border-border/70 rounded-sm">
                <span className="text-[10px] uppercase tracking-widest text-dim block mb-1 font-bold">
                  Service / Category
                </span>
                <span className="font-display text-base text-gold">
                  {selectedInquiry.project_type || "Consultation"}
                </span>
              </div>

              <div className="p-4 bg-card/20 border border-border/70 rounded-sm">
                <span className="text-[10px] uppercase tracking-widest text-dim block mb-1 font-bold">
                  Budget / Current Revenue
                </span>
                <span className="font-display text-base text-emerald-400">
                  {selectedInquiry.budget || "Not Specified"}
                </span>
              </div>
            </div>

            {/* Project Requirements / Detailed Notes */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-dim block mb-2 font-bold">
                Project Scope, Requirements &amp; Client Notes
              </span>
              <div className="p-5 bg-ink border border-border text-xs sm:text-sm text-cream/90 font-ui leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto rounded-sm">
                {selectedInquiry.details || "No additional description provided."}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                {getWhatsAppLink(selectedInquiry) && (
                  <a
                    href={getWhatsAppLink(selectedInquiry)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2.5 rounded-sm transition-colors text-xs uppercase tracking-wider"
                  >
                    <MessageCircle size={14} /> WhatsApp Chat
                  </a>
                )}

                <a
                  href={`mailto:${selectedInquiry.email}?subject=Stova Media - Consultation: ${selectedInquiry.project_type}`}
                  className="flex items-center gap-2 bg-gold hover:bg-gold-light text-ink font-semibold px-4 py-2.5 rounded-sm transition-colors text-xs uppercase tracking-wider"
                >
                  <Mail size={14} /> Send Email
                </a>
              </div>

              {onDeleteInquiry && selectedInquiry.id && (
                <button
                  onClick={() => handleDelete(selectedInquiry.id)}
                  className="flex items-center gap-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/30 px-3.5 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <Trash2 size={14} /> Delete Lead
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
