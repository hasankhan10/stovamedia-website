"use client";

import React, { useState, useMemo } from "react";
import { Inquiry } from "@/lib/db-inquiries";
import {
  Mail,
  Phone,
  Trash2,
  Search,
  MessageSquare,
  Eye,
  Calendar,
  Building,
  Tag,
  DollarSign,
  X,
  AlertCircle,
  Download,
  LayoutGrid,
  ListFilter,
  CheckCircle2,
  Clock,
  Sparkles,
  Copy,
  Check,
  Send,
  ExternalLink,
  PlusCircle
} from "lucide-react";
import { StatusBadge, CopyButton } from "./AdminUIElements";
import { cn } from "@/lib/utils";

interface LeadsTabProps {
  inquiries: Inquiry[];
  onUpdateStatus: (id: string, status: Inquiry["status"]) => void;
  onDeleteInquiry?: (id: string) => void;
  inspectingInquiry?: Inquiry | null;
  onCloseInspector?: () => void;
  onCreateTestLead?: () => void;
}

export default function LeadsTab({
  inquiries = [],
  onUpdateStatus,
  onDeleteInquiry,
  inspectingInquiry,
  onCloseInspector,
  onCreateTestLead,
}: LeadsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Quick response template language
  const [responseLang, setResponseLang] = useState<"en" | "bn">("en");
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  // Sync external inspector state if triggered from OverviewTab
  React.useEffect(() => {
    if (inspectingInquiry) {
      setSelectedInquiry(inspectingInquiry);
    }
  }, [inspectingInquiry]);

  const handleCloseModal = () => {
    setSelectedInquiry(null);
    if (onCloseInspector) onCloseInspector();
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Just now";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr || "Just now";
    }
  };

  const getWhatsAppNumber = (inquiry?: Inquiry | null) => {
    if (!inquiry) return "";
    const emailStr = String(inquiry.email || "");
    const detailsStr = String(inquiry.details || "");
    const contactStr = `${emailStr} ${detailsStr}`;
    const match = contactStr.match(/(\+?[0-9]{10,14})/);
    const rawPhone = match ? match[1] : emailStr.replace(/[^0-9+]/g, "");
    return rawPhone.replace(/[^0-9]/g, "");
  };

  const getWhatsAppLink = (inquiry?: Inquiry | null, customText?: string) => {
    if (!inquiry) return null;
    const cleanNumber = getWhatsAppNumber(inquiry);
    if (cleanNumber.length >= 10) {
      const text = encodeURIComponent(
        customText ||
        `Hi ${inquiry.name || "Client"}, thank you for reaching out to Stova Media regarding your ${inquiry.project_type || "consultation"}. We'd love to schedule our feasibility review!`
      );
      return `https://wa.me/${cleanNumber}?text=${text}`;
    }
    return null;
  };

  // Pre-composed response template generators
  const getQuickTemplate = (inquiry: Inquiry, lang: "en" | "bn") => {
    const clientName = inquiry.name || "Client";
    const project = inquiry.project_type || "Project";
    const budget = inquiry.budget || "Custom Scope";

    if (lang === "bn") {
      return `নমস্কার ${clientName}, Stova Media-তে যোগাযোগ করার জন্য ধন্যবাদ। আপনার ${project}-এর রিকোয়ারমেন্ট আমরা বিস্তারিত দেখেছি। আপনার সুবিধার সময় জানালে আমরা একটি দ্রুত 15 মিনিটের Feasibility কল বা WhatsApp চ্যাট শুরু করতে পারি। - Mehedi Hasan, Stova Media`;
    }
    return `Hi ${clientName}, thank you for reaching out to Stova Media. We reviewed your brief for ${project} (${budget}). Let us know a convenient time for a brief 15-minute engineering review call. Best regards, Mehedi Hasan (Founder & Lead Architect, Stova Media)`;
  };

  const handleCopyTemplate = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  const stats = useMemo(() => {
    const safeInqs = inquiries || [];
    const getStatus = (i: Inquiry) => String(i.status || "new").toLowerCase();
    return {
      total: safeInqs.length,
      new: safeInqs.filter((i) => getStatus(i) === "new").length,
      contacted: safeInqs.filter((i) => getStatus(i) === "contacted").length,
      in_progress: safeInqs.filter((i) => getStatus(i) === "in_progress").length,
      archived: safeInqs.filter((i) => getStatus(i) === "archived").length,
    };
  }, [inquiries]);

  // Unique services list
  const uniqueServices = useMemo(() => {
    const set = new Set<string>();
    (inquiries || []).forEach((inq) => {
      if (inq?.project_type) set.add(inq.project_type);
    });
    return Array.from(set);
  }, [inquiries]);

  const filteredInquiries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return (inquiries || []).filter((inq) => {
      if (!inq) return false;
      const inqStatus = String(inq.status || "new").toLowerCase();
      const inqService = String(inq.project_type || "");

      const matchesStatus = statusFilter === "all" || inqStatus === statusFilter.toLowerCase();
      const matchesService = serviceFilter === "all" || inqService === serviceFilter;
      if (!matchesStatus || !matchesService) return false;
      if (!q) return true;

      const name = String(inq.name || "").toLowerCase();
      const email = String(inq.email || "").toLowerCase();
      const company = String(inq.company || "").toLowerCase();
      const project = inqService.toLowerCase();
      const details = String(inq.details || "").toLowerCase();
      const budget = String(inq.budget || "").toLowerCase();

      return (
        name.includes(q) ||
        email.includes(q) ||
        company.includes(q) ||
        project.includes(q) ||
        details.includes(q) ||
        budget.includes(q)
      );
    });
  }, [inquiries, statusFilter, serviceFilter, searchQuery]);

  const handleDelete = (id?: string) => {
    if (!id || !onDeleteInquiry) return;
    if (confirm("Are you sure you want to permanently delete this lead? This action cannot be undone.")) {
      onDeleteInquiry(id);
      if (selectedInquiry?.id === id) handleCloseModal();
    }
  };

  const exportCSV = () => {
    if (!inquiries || inquiries.length === 0) {
      alert("No leads to export.");
      return;
    }

    const headers = ["ID", "Date", "Name", "Email/Phone", "Company", "Service", "Budget", "Status", "Details"];
    const rows = filteredInquiries.map((inq) => [
      `"${inq.id || ""}"`,
      `"${inq.created_at || ""}"`,
      `"${String(inq.name || "").replace(/"/g, '""')}"`,
      `"${String(inq.email || "").replace(/"/g, '""')}"`,
      `"${String(inq.company || "").replace(/"/g, '""')}"`,
      `"${String(inq.project_type || "").replace(/"/g, '""')}"`,
      `"${String(inq.budget || "").replace(/"/g, '""')}"`,
      `"${inq.status || "new"}"`,
      `"${String(inq.details || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `stova_media_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header with Export & View Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Live Leads Queue
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-mono font-bold text-indigo-700">
              {filteredInquiries.length} Lead{filteredInquiries.length === 1 ? "" : "s"} Displayed
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-light">
            Review client contact info, click to chat directly on WhatsApp, inspect full scope messages, or update project statuses.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode("table")}
              className={cn(
                "p-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                viewMode === "table" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
              )}
              title="Table View"
            >
              <ListFilter size={15} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                viewMode === "grid" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
              )}
              title="Card Grid View"
            >
              <LayoutGrid size={15} />
            </button>
          </div>

          {/* Export CSV Button */}
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
            title="Download CSV spreadsheet"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Status Filter Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { key: "all", label: "All Leads", count: stats.total, color: "indigo" },
          { key: "new", label: "New Leads", count: stats.new, color: "rose", ping: stats.new > 0 },
          { key: "contacted", label: "Contacted", count: stats.contacted, color: "blue" },
          { key: "in_progress", label: "In Progress", count: stats.in_progress, color: "amber" },
        ].map((item) => {
          const active = statusFilter === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setStatusFilter(item.key)}
              className={cn(
                "p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer relative bg-white shadow-2xs",
                active
                  ? "border-indigo-500 ring-2 ring-indigo-500/10 shadow-xs"
                  : "border-slate-200/90 hover:border-indigo-300 hover:bg-slate-50/50"
              )}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={cn(
                  "text-[11px] uppercase font-mono tracking-wider font-bold",
                  item.color === "rose" ? "text-rose-600" : item.color === "amber" ? "text-amber-700" : item.color === "blue" ? "text-blue-700" : "text-slate-600"
                )}>
                  {item.label}
                </span>
                {item.ping && <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />}
              </div>
              <div className={cn(
                "font-display text-2xl sm:text-3xl font-extrabold",
                item.color === "rose" && item.count > 0 ? "text-rose-600" : "text-slate-900"
              )}>
                {item.count}
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Search & Category Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-4 border border-slate-200/90 rounded-2xl shadow-2xs">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by client name, email, phone, business brand, or scope keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50/80 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm pl-10 pr-8 py-2.5 rounded-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Service Category Dropdown */}
        {uniqueServices.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-slate-500 hidden lg:inline">Service:</span>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs px-3 py-2.5 rounded-xl outline-none focus:border-indigo-500 font-medium cursor-pointer"
            >
              <option value="all">All Services ({inquiries.length})</option>
              {uniqueServices.map((srv) => (
                <option key={srv} value={srv}>{srv}</option>
              ))}
            </select>
          </div>
        )}

        {/* Status Filter Dropdown */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {(["all", "new", "contacted", "in_progress", "archived"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                "px-3 py-1.5 text-[11px] uppercase font-mono tracking-wider font-semibold rounded-xl border transition-all whitespace-nowrap cursor-pointer",
                statusFilter === st
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs font-bold"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900"
              )}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* 4. LEADS PRESENTATION (Table vs Grid) */}
      {viewMode === "table" ? (
        /* TABLE VIEW */
        <div className="border border-slate-200/90 bg-white rounded-3xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/90 text-slate-500 uppercase tracking-wider text-[11px] font-mono font-bold">
                  <th className="py-4 px-5">Date &amp; Time</th>
                  <th className="py-4 px-5">Client &amp; Brand</th>
                  <th className="py-4 px-5">Contact Info</th>
                  <th className="py-4 px-5">Service Category</th>
                  <th className="py-4 px-5">Scope / Budget</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-slate-500">
                      <AlertCircle size={32} className="mx-auto mb-2.5 text-slate-400" />
                      <p className="text-base font-bold text-slate-900">No leads found in this view</p>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto mb-4">
                        {searchQuery || statusFilter !== "all" || serviceFilter !== "all"
                          ? "Try clearing filters or search terms."
                          : "Your incoming leads from the contact form will appear here automatically."}
                      </p>
                      {onCreateTestLead && (
                        <button
                          onClick={onCreateTestLead}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                        >
                          <PlusCircle size={14} />
                          <span>Generate Sample Lead to Test</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map((inq, index) => {
                    const waLink = getWhatsAppLink(inq);
                    const emailValue = String(inq.email || "").trim();
                    const isPhoneContact = /^(\+?[0-9\s-]{7,16})$/.test(emailValue);

                    return (
                      <tr
                        key={inq.id || `lead-${index}`}
                        className={cn(
                          "hover:bg-slate-50/70 transition-colors group",
                          String(inq.status || "").toLowerCase() === "new" && "bg-rose-50/30"
                        )}
                      >
                        <td className="py-4 px-5 whitespace-nowrap text-slate-600 font-mono text-[11px]">
                          <div className="flex items-center gap-1.5 text-slate-700">
                            <Calendar size={13} className="text-indigo-600" />
                            <span>{formatDate(inq.created_at)}</span>
                          </div>
                        </td>

                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-display font-bold text-sm uppercase shrink-0 shadow-2xs">
                              {inq.name ? inq.name.charAt(0) : "C"}
                            </div>
                            <div>
                              <div className="font-display font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                                {inq.name || "Anonymous Client"}
                              </div>
                              {inq.company && (
                                <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
                                  <Building size={11} className="text-slate-400" />
                                  <span>{inq.company}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-5">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-slate-800 font-mono text-[11px]">
                              {isPhoneContact ? (
                                <Phone size={12} className="text-emerald-600 shrink-0" />
                              ) : (
                                <Mail size={12} className="text-indigo-600 shrink-0" />
                              )}
                              <span className="truncate max-w-[170px] font-semibold" title={emailValue}>
                                {emailValue || "No email/phone"}
                              </span>
                            </div>
                            {waLink && (
                              <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] text-emerald-700 hover:text-emerald-800 font-bold transition-colors"
                              >
                                <MessageSquare size={11} /> 1-Tap WhatsApp
                              </a>
                            )}
                          </div>
                        </td>

                        <td className="py-4 px-5">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-semibold whitespace-nowrap">
                            <Tag size={10} />
                            {inq.project_type || "Consultation"}
                          </span>
                        </td>

                        <td className="py-4 px-5 max-w-[220px]">
                          <div>
                            {inq.budget && (
                              <div className="text-emerald-700 font-mono font-bold text-[11px] flex items-center gap-1 mb-0.5">
                                <DollarSign size={11} />
                                <span>{inq.budget}</span>
                              </div>
                            )}
                            <p className="text-[11px] text-slate-600 truncate font-light" title={inq.details}>
                              {inq.details || "No scope notes"}
                            </p>
                          </div>
                        </td>

                        <td className="py-4 px-5 whitespace-nowrap">
                          <select
                            value={inq.status || "new"}
                            onChange={(e) => inq.id && onUpdateStatus(inq.id, e.target.value as Inquiry["status"])}
                            className={cn(
                              "text-[10px] uppercase font-mono tracking-wider font-bold px-2.5 py-1 rounded-full border outline-none cursor-pointer transition-all shadow-2xs",
                              String(inq.status || "new").toLowerCase() === "new"
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : String(inq.status).toLowerCase() === "contacted"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : String(inq.status).toLowerCase() === "in_progress"
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : "bg-slate-100 text-slate-600 border-slate-200"
                            )}
                          >
                            <option value="new">NEW LEAD</option>
                            <option value="contacted">CONTACTED</option>
                            <option value="in_progress">IN PROGRESS</option>
                            <option value="archived">ARCHIVED</option>
                          </select>
                        </td>

                        <td className="py-4 px-5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedInquiry(inq)}
                              title="Inspect Full Lead Details & Response Templates"
                              className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 rounded-xl transition-all cursor-pointer shadow-2xs"
                            >
                              <Eye size={15} />
                            </button>

                            {waLink && (
                              <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Chat on WhatsApp"
                                className="p-2 text-emerald-700 hover:bg-emerald-50 border border-slate-200 rounded-xl transition-all shadow-2xs"
                              >
                                <MessageSquare size={15} />
                              </a>
                            )}

                            {!isPhoneContact && emailValue && (
                              <a
                                href={`mailto:${emailValue}?subject=Stova Media - Inquiry regarding ${inq.project_type || "consultation"}`}
                                title="Send Email"
                                className="p-2 text-indigo-600 hover:bg-indigo-50 border border-slate-200 rounded-xl transition-all shadow-2xs"
                              >
                                <Mail size={15} />
                              </a>
                            )}

                            {onDeleteInquiry && inq.id && (
                              <button
                                onClick={() => handleDelete(inq.id)}
                                title="Delete Lead"
                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-xl transition-all cursor-pointer shadow-2xs"
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

          {/* Table Footer Summary */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <span>
              Showing <strong className="text-slate-900">{filteredInquiries.length}</strong> of{" "}
              <strong className="text-slate-900">{inquiries.length}</strong> total leads
            </span>
            <span className="text-slate-400 font-light">
              Click &quot;Inspect&quot; icon to view complete client message and reply templates.
            </span>
          </div>
        </div>
      ) : (
        /* CARD GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredInquiries.length === 0 ? (
            <div className="col-span-full bg-white rounded-3xl p-12 border border-slate-200 text-center">
              <AlertCircle size={32} className="mx-auto mb-2 text-slate-400" />
              <p className="text-sm font-bold text-slate-800">No leads found</p>
            </div>
          ) : (
            filteredInquiries.map((inq, index) => {
              const waLink = getWhatsAppLink(inq);

              return (
                <div
                  key={inq.id || `lead-card-${index}`}
                  className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-display font-bold text-base text-slate-900">
                          {inq.name || "Anonymous Client"}
                        </h3>
                        {inq.company && (
                          <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <Building size={12} className="text-slate-400" />
                            {inq.company}
                          </span>
                        )}
                      </div>
                      <StatusBadge status={inq.status} />
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="px-2.5 py-0.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-semibold">
                        {inq.project_type || "Consultation"}
                      </span>
                      {inq.budget && (
                        <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-mono font-bold">
                          {inq.budget}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {inq.details || "No details provided."}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-slate-400">
                      {formatDate(inq.created_at)}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {waLink && (
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-semibold text-xs flex items-center gap-1 border border-emerald-200"
                        >
                          <MessageSquare size={12} /> WhatsApp
                        </a>
                      )}
                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* 5. LEAD INSPECTOR MODAL & RESPONSE TEMPLATE GENERATOR */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200/90 w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 my-8">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {selectedInquiry.name || "Client Lead"}
                  </h3>
                  <StatusBadge status={selectedInquiry.status} />
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-2 flex-wrap">
                  <span>Received: {formatDate(selectedInquiry.created_at)}</span>
                  {selectedInquiry.company && (
                    <>
                      <span>·</span>
                      <span className="text-indigo-600 font-semibold flex items-center gap-1">
                        <Building size={12} /> {selectedInquiry.company}
                      </span>
                    </>
                  )}
                </p>
              </div>

              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Status Update Bar */}
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs uppercase font-mono tracking-wider font-bold text-slate-700">
                Update Lead Status:
              </span>
              <select
                value={selectedInquiry.status || "new"}
                onChange={(e) => {
                  const newStatus = e.target.value as Inquiry["status"];
                  if (selectedInquiry.id) {
                    onUpdateStatus(selectedInquiry.id, newStatus);
                    setSelectedInquiry({ ...selectedInquiry, status: newStatus });
                  }
                }}
                className="bg-white border border-indigo-300 text-indigo-700 text-xs px-3 py-1.5 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 font-mono font-bold cursor-pointer shadow-2xs"
              >
                <option value="new">NEW LEAD</option>
                <option value="contacted">CONTACTED</option>
                <option value="in_progress">IN PROGRESS</option>
                <option value="archived">ARCHIVED</option>
              </select>
            </div>

            {/* 4-Item Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <span className="text-[11px] uppercase font-mono tracking-wider text-slate-500 block mb-1 font-bold">
                  Client Contact / WhatsApp
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-sm text-slate-900 font-bold break-all">
                    {selectedInquiry.email || "No contact info"}
                  </span>
                  {selectedInquiry.email && <CopyButton text={selectedInquiry.email} label="Copy" />}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <span className="text-[11px] uppercase font-mono tracking-wider text-slate-500 block mb-1 font-bold">
                  Brand / Organization
                </span>
                <span className="font-display text-base font-bold text-slate-900">
                  {selectedInquiry.company || "Direct Individual"}
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <span className="text-[11px] uppercase font-mono tracking-wider text-slate-500 block mb-1 font-bold">
                  Service Category
                </span>
                <span className="font-display text-base font-bold text-indigo-700">
                  {selectedInquiry.project_type || "Consultation"}
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <span className="text-[11px] uppercase font-mono tracking-wider text-slate-500 block mb-1 font-bold">
                  Budget / Investment Scope
                </span>
                <span className="font-display text-base font-extrabold text-emerald-700 font-mono">
                  {selectedInquiry.budget || "Needs Consultation"}
                </span>
              </div>
            </div>

            {/* Client Notes / Scope Message */}
            <div>
              <span className="text-[11px] uppercase font-mono tracking-wider text-slate-500 block mb-2 font-bold">
                Project Scope &amp; Client Description
              </span>
              <div className="p-5 bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 font-light leading-relaxed whitespace-pre-wrap max-h-52 overflow-y-auto rounded-2xl shadow-inner">
                {selectedInquiry.details || "No additional scope message provided."}
              </div>
            </div>

            {/* Quick Response Generator */}
            <div className="bg-indigo-50/70 p-4 sm:p-5 rounded-2xl border border-indigo-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                  <Sparkles size={14} className="text-indigo-600" />
                  <span>1-Click Architect Response Template</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <button
                    onClick={() => setResponseLang("en")}
                    className={cn(
                      "px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-colors cursor-pointer",
                      responseLang === "en" ? "bg-indigo-600 text-white" : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setResponseLang("bn")}
                    className={cn(
                      "px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-colors cursor-pointer",
                      responseLang === "bn" ? "bg-indigo-600 text-white" : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    বাংলা
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-indigo-100 font-light leading-relaxed">
                {getQuickTemplate(selectedInquiry, responseLang)}
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyTemplate(getQuickTemplate(selectedInquiry, responseLang))}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  {copiedTemplate ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                  <span>{copiedTemplate ? "Copied!" : "Copy Response"}</span>
                </button>

                {getWhatsAppLink(selectedInquiry) && (
                  <a
                    href={getWhatsAppLink(selectedInquiry, getQuickTemplate(selectedInquiry, responseLang))!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Send size={13} />
                    <span>Send on WhatsApp</span>
                  </a>
                )}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                {getWhatsAppLink(selectedInquiry) && (
                  <a
                    href={getWhatsAppLink(selectedInquiry)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl transition-colors text-xs shadow-sm shadow-emerald-600/25"
                  >
                    <MessageSquare size={14} /> Open WhatsApp
                  </a>
                )}

                {selectedInquiry.email && (
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Stova Media - Feasibility Review: ${selectedInquiry.project_type || "consultation"}`}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl transition-all text-xs shadow-sm shadow-indigo-600/25"
                  >
                    <Mail size={14} /> Send Email
                  </a>
                )}
              </div>

              {onDeleteInquiry && selectedInquiry.id && (
                <button
                  onClick={() => handleDelete(selectedInquiry.id)}
                  className="flex items-center gap-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
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
