"use client";

import React, { useState, useMemo } from "react";
import { Inquiry } from "@/lib/db-inquiries";
import {
  Mail,
  Phone,
  Trash2,
  Search,
  MessageCircle,
  Eye,
  Calendar,
  Building,
  Tag,
  DollarSign,
  X,
  AlertCircle
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

  const getWhatsAppLink = (inquiry: Inquiry) => {
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

  const stats = useMemo(() => ({
    total: inquiries.length,
    new: inquiries.filter((i) => i.status === "new").length,
    contacted: inquiries.filter((i) => i.status === "contacted").length,
    in_progress: inquiries.filter((i) => i.status === "in_progress").length,
    archived: inquiries.filter((i) => i.status === "archived").length,
  }), [inquiries]);

  const filteredInquiries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return inquiries.filter((inq) => {
      const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
      if (!q) return matchesStatus;
      const matchesSearch =
        inq.name?.toLowerCase().includes(q) ||
        inq.email?.toLowerCase().includes(q) ||
        inq.company?.toLowerCase().includes(q) ||
        inq.project_type?.toLowerCase().includes(q) ||
        inq.details?.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [inquiries, statusFilter, searchQuery]);

  const handleDelete = (id?: string) => {
    if (!id || !onDeleteInquiry) return;
    if (confirm("Are you sure you want to permanently delete this lead?")) {
      onDeleteInquiry(id);
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            Client Lead Queue &amp; Consultations
          </h2>
          <p className="text-xs text-slate-400 font-light mt-1">
            Realtime database of all website inquiries, consultations, and client briefs
          </p>
        </div>
        <span className="text-xs text-slate-400 font-mono bg-[#0B0F19] border border-slate-800 px-3 py-1.5 rounded-xl w-fit">
          Total Leads: <strong className="text-cyan-300 font-bold">{stats.total}</strong>
        </span>
      </div>

      {/* QUICK STATUS METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { key: "all", label: "All Inquiries", count: stats.total, color: "cyan" },
          { key: "new", label: "New Leads", count: stats.new, color: "rose", ping: stats.new > 0 },
          { key: "contacted", label: "Contacted", count: stats.contacted, color: "cyan" },
          { key: "in_progress", label: "In Progress", count: stats.in_progress, color: "amber" },
        ].map((item) => {
          const active = statusFilter === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setStatusFilter(item.key)}
              className={cn(
                "p-4 rounded-2xl border text-left transition-all cursor-pointer backdrop-blur-xl",
                active
                  ? "border-cyan-500/50 bg-cyan-950/20 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                  : "border-slate-800/80 bg-[#0B0F19]/80 hover:border-slate-700"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={cn(
                  "text-[10px] uppercase font-mono tracking-widest font-bold",
                  item.color === "rose" ? "text-rose-400" : item.color === "amber" ? "text-amber-300" : "text-slate-400"
                )}>
                  {item.label}
                </span>
                {item.ping && <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />}
              </div>
              <div className={cn(
                "font-display text-2xl sm:text-3xl font-bold",
                item.color === "rose" && item.count > 0 ? "text-rose-400" : "text-slate-100"
              )}>
                {item.count}
              </div>
            </button>
          );
        })}
      </div>

      {/* SEARCH & FILTERS */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#0B0F19]/90 p-3.5 border border-slate-800/80 rounded-2xl shadow-lg">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by client name, email, phone, business brand, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#05070D] border border-slate-800 text-slate-100 placeholder:text-slate-500 text-xs pl-10 pr-8 py-2.5 rounded-xl outline-none focus:border-cyan-400 transition-colors"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {(["all", "new", "contacted", "in_progress", "archived"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                "px-3 py-1.5 text-[11px] uppercase font-mono tracking-wider font-semibold rounded-xl border transition-all whitespace-nowrap cursor-pointer",
                statusFilter === st
                  ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white border-transparent shadow-md"
                  : "bg-[#05070D] text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
              )}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* LEADS TABLE */}
      <div className="border border-slate-800/80 bg-[#0B0F19]/90 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#05070D] border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] font-mono font-bold">
                <th className="py-3.5 px-4">Date &amp; Time</th>
                <th className="py-3.5 px-4">Client / Business</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Scope / Budget</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-14 text-center text-slate-400">
                    <AlertCircle size={28} className="mx-auto mb-2 text-slate-600" />
                    <p className="text-sm font-medium text-slate-300">No leads match your criteria</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {searchQuery || statusFilter !== "all" ? "Try adjusting your search query or status filter." : "New inquiries will appear here automatically."}
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
                      className={cn("hover:bg-[#101726]/40 transition-colors group", inq.status === "new" && "bg-rose-950/10")}
                    >
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <Calendar size={13} className="text-cyan-400/80" />
                          <span>{formatDate(inq.created_at)}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-cyan-500/30 text-cyan-300 flex items-center justify-center font-display font-bold text-xs uppercase shrink-0">
                            {inq.name?.charAt(0) || "C"}
                          </div>
                          <div>
                            <div className="font-display font-medium text-slate-100 text-sm group-hover:text-cyan-300 transition-colors">
                              {inq.name}
                            </div>
                            {inq.company && (
                              <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                                <Building size={11} className="text-cyan-400/70" />
                                <span>{inq.company}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-200 font-mono text-[11px]">
                            {isPhoneContact ? <Phone size={12} className="text-emerald-400 shrink-0" /> : <Mail size={12} className="text-cyan-400/80 shrink-0" />}
                            <span className="truncate max-w-[160px]" title={inq.email}>{inq.email}</span>
                          </div>
                          {waLink && (
                            <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[10px] text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                              <MessageCircle size={11} /> WhatsApp 1-Tap
                            </a>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[11px] font-medium whitespace-nowrap">
                          <Tag size={10} />
                          {inq.project_type || "Consultation"}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 max-w-[200px]">
                        <div>
                          {inq.budget && (
                            <div className="text-emerald-400 font-mono font-medium text-[11px] flex items-center gap-1 mb-0.5">
                              <DollarSign size={11} />
                              <span>{inq.budget}</span>
                            </div>
                          )}
                          <p className="text-[11px] text-slate-400 truncate font-light" title={inq.details}>
                            {inq.details || "No details specified"}
                          </p>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <select
                          value={inq.status}
                          onChange={(e) => inq.id && onUpdateStatus(inq.id, e.target.value as Inquiry["status"])}
                          className={cn(
                            "text-[11px] uppercase font-mono tracking-wider font-bold px-2.5 py-1 rounded-lg border outline-none cursor-pointer transition-all",
                            inq.status === "new" ? "bg-rose-950/40 text-rose-300 border-rose-500/40"
                              : inq.status === "contacted" ? "bg-cyan-950/40 text-cyan-300 border-cyan-500/40"
                              : inq.status === "in_progress" ? "bg-amber-950/40 text-amber-300 border-amber-500/40"
                              : "bg-slate-900 text-slate-400 border-slate-700"
                          )}
                        >
                          <option value="new" className="bg-[#05070D] text-slate-100">NEW</option>
                          <option value="contacted" className="bg-[#05070D] text-slate-100">CONTACTED</option>
                          <option value="in_progress" className="bg-[#05070D] text-slate-100">IN PROGRESS</option>
                          <option value="archived" className="bg-[#05070D] text-slate-100">ARCHIVED</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedInquiry(inq)}
                            title="View Full Lead Details"
                            className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 border border-transparent hover:border-cyan-500/30 rounded-lg transition-all cursor-pointer"
                          >
                            <Eye size={15} />
                          </button>

                          {waLink && (
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Chat on WhatsApp"
                              className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-emerald-950/40 border border-transparent hover:border-emerald-500/30 rounded-lg transition-all"
                            >
                              <MessageCircle size={15} />
                            </a>
                          )}

                          {!isPhoneContact && (
                            <a
                              href={`mailto:${inq.email}?subject=Stova Media - Inquiry regarding ${inq.project_type}`}
                              title="Send Email"
                              className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 border border-transparent hover:border-cyan-500/30 rounded-lg transition-all"
                            >
                              <Mail size={15} />
                            </a>
                          )}

                          {onDeleteInquiry && inq.id && (
                            <button
                              onClick={() => handleDelete(inq.id)}
                              title="Delete Lead"
                              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 border border-transparent hover:border-rose-500/30 rounded-lg transition-all cursor-pointer"
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

        <div className="p-3.5 bg-[#05070D] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <span>
            Showing <strong className="text-slate-200">{filteredInquiries.length}</strong> of{" "}
            <strong className="text-slate-200">{inquiries.length}</strong> total leads
          </span>
          <span className="text-slate-500">
            Click &quot;View&quot; icon to inspect full client details, scope, and direct contact options.
          </span>
        </div>
      </div>

      {/* LEAD DETAIL MODAL */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B0F19] border border-cyan-500/40 w-full max-w-2xl rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start border-b border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-100">
                    {selectedInquiry.name}
                  </h3>
                  <StatusBadge status={selectedInquiry.status} />
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-2 flex-wrap">
                  <span>Received: {formatDate(selectedInquiry.created_at)}</span>
                  {selectedInquiry.company && (
                    <>
                      <span>·</span>
                      <span className="text-cyan-300 flex items-center gap-1">
                        <Building size={12} /> {selectedInquiry.company}
                      </span>
                    </>
                  )}
                </p>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-slate-400 hover:text-slate-100 p-1.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex items-center justify-between bg-[#05070D] p-3.5 border border-slate-800 rounded-xl">
              <span className="text-xs uppercase font-mono tracking-wider font-bold text-slate-400">
                Update Lead Status:
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
                className="bg-[#0B0F19] border border-cyan-500/40 text-cyan-300 text-xs px-3 py-1.5 rounded-lg outline-none focus:border-cyan-400 font-mono font-bold"
              >
                <option value="new">New Lead</option>
                <option value="contacted">Contacted</option>
                <option value="in_progress">In Progress</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 bg-[#05070D] border border-slate-800/80 rounded-xl">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block mb-1 font-bold">
                  Client Contact / WhatsApp
                </span>
                <span className="font-mono text-sm text-slate-100 font-medium break-all">
                  {selectedInquiry.email}
                </span>
              </div>

              <div className="p-4 bg-[#05070D] border border-slate-800/80 rounded-xl">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block mb-1 font-bold">
                  Brand / Company Name
                </span>
                <span className="font-display text-base font-semibold text-slate-100">
                  {selectedInquiry.company || "Not Specified"}
                </span>
              </div>

              <div className="p-4 bg-[#05070D] border border-slate-800/80 rounded-xl">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block mb-1 font-bold">
                  Service / Category
                </span>
                <span className="font-display text-base font-semibold text-cyan-300">
                  {selectedInquiry.project_type || "Consultation"}
                </span>
              </div>

              <div className="p-4 bg-[#05070D] border border-slate-800/80 rounded-xl">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block mb-1 font-bold">
                  Budget / Current Revenue
                </span>
                <span className="font-display text-base font-semibold text-emerald-400 font-mono">
                  {selectedInquiry.budget || "Not Specified"}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block mb-2 font-bold">
                Project Scope, Requirements &amp; Client Notes
              </span>
              <div className="p-5 bg-[#05070D] border border-slate-800 text-xs sm:text-sm text-slate-200 font-light leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto rounded-xl">
                {selectedInquiry.details || "No additional description provided."}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                {getWhatsAppLink(selectedInquiry) && (
                  <a
                    href={getWhatsAppLink(selectedInquiry)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20"
                  >
                    <MessageCircle size={14} /> WhatsApp Chat
                  </a>
                )}

                <a
                  href={`mailto:${selectedInquiry.email}?subject=Stova Media - Consultation: ${selectedInquiry.project_type}`}
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:brightness-110 text-white font-semibold px-4 py-2.5 rounded-xl transition-all text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/20"
                >
                  <Mail size={14} /> Send Email
                </a>
              </div>

              {onDeleteInquiry && selectedInquiry.id && (
                <button
                  onClick={() => handleDelete(selectedInquiry.id)}
                  className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 border border-rose-500/30 px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
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
