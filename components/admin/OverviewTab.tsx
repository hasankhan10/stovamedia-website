"use client";

import React, { useMemo } from "react";
import { Inquiry } from "@/lib/db-inquiries";
import { StatCard, StatusBadge } from "./AdminUIElements";
import {
  Users,
  Sparkles,
  Layers,
  ArrowUpRight,
  TrendingUp,
  MessageSquare,
  Mail,
  Building,
  CheckCircle2,
  Clock,
  ChevronRight,
  Bot,
  Globe,
  Server,
  Zap
} from "lucide-react";

interface OverviewTabProps {
  inquiries: Inquiry[];
  onSelectTab: (tab: "leads" | "overview") => void;
  onFilterStatus: (status: string) => void;
  onViewInquiry: (inquiry: Inquiry) => void;
}

export default function OverviewTab({
  inquiries,
  onSelectTab,
  onFilterStatus,
  onViewInquiry,
}: OverviewTabProps) {
  // Aggregate Metrics
  const metrics = useMemo(() => {
    const total = inquiries.length;
    const newLeads = inquiries.filter((i) => i.status === "new").length;
    const contacted = inquiries.filter((i) => i.status === "contacted").length;
    const inProgress = inquiries.filter((i) => i.status === "in_progress").length;
    const archived = inquiries.filter((i) => i.status === "archived").length;

    // Response rate percentage
    const responded = total - newLeads;
    const responseRate = total > 0 ? Math.round((responded / total) * 100) : 100;

    // Services breakdown
    const serviceCounts: Record<string, number> = {};
    inquiries.forEach((inq) => {
      const type = inq.project_type || "General Inquiry";
      serviceCounts[type] = (serviceCounts[type] || 0) + 1;
    });

    // Budget breakdown
    const budgetCounts: Record<string, number> = {};
    inquiries.forEach((inq) => {
      const b = inq.budget || "Not Specified";
      budgetCounts[b] = (budgetCounts[b] || 0) + 1;
    });

    return {
      total,
      newLeads,
      contacted,
      inProgress,
      archived,
      responseRate,
      serviceCounts,
      budgetCounts,
      recentInquiries: inquiries.slice(0, 5),
    };
  }, [inquiries]);

  const getWhatsAppLink = (inquiry: Inquiry) => {
    const contactStr = `${inquiry.email} ${inquiry.details}`;
    const match = contactStr.match(/(\+?[0-9]{10,14})/);
    const rawPhone = match ? match[1] : inquiry.email.replace(/[^0-9+]/g, "");
    const cleanNumber = rawPhone.replace(/[^0-9]/g, "");

    if (cleanNumber.length >= 10) {
      const text = encodeURIComponent(
        `Hi ${inquiry.name}, thank you for reaching out to Stova Media regarding your ${inquiry.project_type || "consultation"}. We'd love to schedule our feasibility review!`
      );
      return `https://wa.me/${cleanNumber}?text=${text}`;
    }
    return null;
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Recent";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Top Greeting & Highlights */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-indigo-50 via-white to-cyan-50 p-6 sm:p-8 rounded-3xl border border-indigo-100 shadow-2xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/70 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles size={13} className="text-indigo-600" />
            <span>Executive Studio Command Center</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
            Client Inquiries &amp; Pipeline Analytics
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-light mt-1 max-w-2xl leading-relaxed">
            Realtime performance telemetry of client bookings, service demand distribution, and response turnaround speed.
          </p>
        </div>

        <button
          onClick={() => {
            onSelectTab("leads");
            onFilterStatus("new");
          }}
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition-all shadow-sm shadow-indigo-600/30 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <Users size={16} />
          <span>Open Lead Queue ({metrics.newLeads} New)</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* 2. Top 4 Core Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          label="Total Leads Received"
          value={metrics.total}
          sub="Lifetime client inquiries"
          icon={Users}
          color="indigo"
          highlight
        />

        <StatCard
          label="Actionable New Leads"
          value={metrics.newLeads}
          sub="Awaiting first architect response"
          icon={Clock}
          color="rose"
          trend={metrics.newLeads > 0 ? "Action Required" : "All Cleared"}
          highlight={metrics.newLeads > 0}
        />

        <StatCard
          label="In Progress / Deals"
          value={metrics.inProgress}
          sub="Active milestone proposals"
          icon={Layers}
          color="amber"
        />

        <StatCard
          label="Client Outreach Rate"
          value={`${metrics.responseRate}%`}
          sub={`${metrics.contacted + metrics.inProgress} of ${metrics.total} inquiries processed`}
          icon={CheckCircle2}
          color="emerald"
        />
      </div>

      {/* 3. Analytics 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* LEFT (7 cols): Service Category Demand & Budget Distribution */}
        <div className="lg:col-span-7 space-y-6">
          {/* Service Category Demand */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base sm:text-lg font-display font-bold text-slate-900">
                  Service Category Demand
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Breakdown of client inquiries by architecture package
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                {Object.keys(metrics.serviceCounts).length} Services
              </span>
            </div>

            <div className="space-y-4">
              {Object.entries(metrics.serviceCounts).length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">No service inquiries logged yet.</p>
              ) : (
                Object.entries(metrics.serviceCounts).map(([service, count]) => {
                  const percent = metrics.total > 0 ? Math.round((count / metrics.total) * 100) : 0;
                  return (
                    <div key={service} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                          {service.toLowerCase().includes("ai") ? (
                            <Bot size={14} className="text-cyan-600 shrink-0" />
                          ) : service.toLowerCase().includes("saas") ? (
                            <Server size={14} className="text-indigo-600 shrink-0" />
                          ) : (
                            <Globe size={14} className="text-emerald-600 shrink-0" />
                          )}
                          <span>{service}</span>
                        </span>
                        <span className="font-mono text-slate-500 font-medium">
                          <strong className="text-slate-900">{count}</strong> ({percent}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(percent, 5)}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Budget Range Distribution */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base sm:text-lg font-display font-bold text-slate-900">
                  Budget Tiers Distribution
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Client investment appetite and expected scope volume
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(metrics.budgetCounts).map(([budget, count]) => (
                <div
                  key={budget}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-slate-900 font-mono block">
                      {budget}
                    </span>
                    <span className="text-[11px] text-slate-500">Inquiry Scope</span>
                  </div>
                  <span className="text-sm font-extrabold font-display text-indigo-700 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-2xs">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT (5 cols): Recent Leads Activity Feed */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base sm:text-lg font-display font-bold text-slate-900">
                  Recent Inquiries
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Latest client briefs received across channels
                </p>
              </div>
              <button
                onClick={() => onSelectTab("leads")}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>View All</span>
                <ArrowUpRight size={13} />
              </button>
            </div>

            <div className="space-y-3.5">
              {metrics.recentInquiries.length === 0 ? (
                <p className="text-xs text-slate-400 py-8 text-center">No inquiries logged yet.</p>
              ) : (
                metrics.recentInquiries.map((inq) => {
                  const waLink = getWhatsAppLink(inq);

                  return (
                    <div
                      key={inq.id || inq.email + inq.created_at}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 hover:bg-white transition-all shadow-2xs group"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {inq.name}
                          </div>
                          {inq.company && (
                            <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <Building size={11} className="text-slate-400" />
                              <span>{inq.company}</span>
                            </div>
                          )}
                        </div>
                        <StatusBadge status={inq.status} />
                      </div>

                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed mb-3">
                        {inq.details || "No additional scope message provided."}
                      </p>

                      <div className="flex items-center justify-between pt-2.5 border-t border-slate-200/60 text-[11px] text-slate-500 font-mono">
                        <span>{formatDate(inq.created_at)}</span>

                        <div className="flex items-center gap-2">
                          {waLink && (
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-0.5 rounded-md bg-emerald-100/80 hover:bg-emerald-200/80 text-emerald-800 text-[10px] font-semibold flex items-center gap-1 transition-colors"
                            >
                              <MessageSquare size={10} />
                              <span>WhatsApp</span>
                            </a>
                          )}
                          <button
                            onClick={() => onViewInquiry(inq)}
                            className="px-2 py-0.5 rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>Inspect</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-500 font-light">
              All leads sync directly with the production Supabase PostgreSQL cluster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
