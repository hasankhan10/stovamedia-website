"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { checkAdminSession, logoutAdmin } from "@/lib/admin-auth";
import { Project } from "@/lib/work";
import { Inquiry } from "@/lib/db-inquiries";
import { ServiceItem } from "@/lib/db-services";
import { FolderKanban, Users, Sparkles, RefreshCw, Layers } from "lucide-react";

// Sub-components
import AdminHeader from "./AdminHeader";
import OverviewTab from "./OverviewTab";
import ProjectsTab from "./ProjectsTab";
import ProjectModal from "./ProjectModal";
import ServicesTab from "./ServicesTab";
import ServiceModal from "./ServiceModal";
import LeadsTab from "./LeadsTab";
import { TabButton } from "./AdminUIElements";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "services" | "inquiries">("overview");
  const [loading, setLoading] = useState(true);

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isFromDb, setIsFromDb] = useState(false);

  // Modal States
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);

  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch projects
      const resProjects = await fetch("/api/admin/projects");
      if (resProjects.ok) {
        const jsonP = await resProjects.json();
        setProjects(jsonP.projects || []);
        setIsFromDb(jsonP.fromDb || false);
      }

      // Fetch services
      const resServices = await fetch("/api/admin/services");
      if (resServices.ok) {
        const jsonS = await resServices.json();
        setServices(jsonS.services || []);
      }

      // Fetch inquiries
      const resInquiries = await fetch("/api/admin/inquiries");
      if (resInquiries.ok) {
        const jsonI = await resInquiries.json();
        setInquiries(jsonI.inquiries || []);
      }
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Check auth
  useEffect(() => {
    if (!checkAdminSession()) {
      router.replace("/admin/login");
    } else {
      setLoading(false);
      loadDashboardData();
    }
  }, [router, loadDashboardData]);

  const handleLogout = async () => {
    await logoutAdmin();
    router.replace("/admin/login");
  };

  // Project modal handlers
  const openNewProjectModal = () => {
    setEditingProject({
      slug: "",
      index: String(projects.length + 1).padStart(2, "0"),
      title: "",
      tag: "Custom Web Application",
      category: "Web Apps",
      tagline: "",
      overview: "",
      challenge: "",
      solution: "",
      results: [],
      metrics: [],
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
      timeline: "4 weeks",
      status: "Live",
      heroColor: "linear-gradient(135deg, #080808, #0A1A0A)",
      featured: true,
      locked: false,
    });
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (proj: Project) => {
    setEditingProject({ ...proj });
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.slug) return;

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      });

      if (res.ok) {
        setIsProjectModalOpen(false);
        setEditingProject(null);
        loadDashboardData();
      } else {
        const err = await res.json();
        alert(`Error saving project: ${err.error}`);
      }
    } catch (err) {
      alert("Failed to save project");
    }
  };

  const handleDeleteProject = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete project '${slug}'?`)) return;

    try {
      const res = await fetch(`/api/admin/projects?slug=${slug}`, {
        method: "DELETE",
      });

      if (res.ok) {
        loadDashboardData();
      } else {
        const err = await res.json();
        alert(`Error deleting project: ${err.error}`);
      }
    } catch (err) {
      alert("Failed to delete project");
    }
  };

  // Service modal handlers
  const openNewServiceModal = () => {
    setEditingService({
      id: "",
      number: String(services.length + 1).padStart(2, "0"),
      title: "",
      icon: "Code2",
      tagline: "",
      desc: "",
      deliverables: [],
      tech: [],
      highlights: [],
      displayOrder: services.length + 1,
    });
    setIsServiceModalOpen(true);
  };

  const openEditServiceModal = (serv: ServiceItem) => {
    setEditingService({ ...serv });
    setIsServiceModalOpen(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title || !editingService?.id) return;

    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService),
      });

      if (res.ok) {
        setIsServiceModalOpen(false);
        setEditingService(null);
        loadDashboardData();
      } else {
        const err = await res.json();
        alert(`Error saving service: ${err.error}`);
      }
    } catch (err) {
      alert("Failed to save service");
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm(`Are you sure you want to delete service '${id}'?`)) return;

    try {
      const res = await fetch(`/api/admin/services?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        loadDashboardData();
      } else {
        const err = await res.json();
        alert(`Error deleting service: ${err.error}`);
      }
    } catch (err) {
      alert("Failed to delete service");
    }
  };

  const handleUpdateInquiryStatus = async (id: string, status: Inquiry["status"]) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center text-cream">
        <div className="flex items-center gap-3 text-gold font-display">
          <RefreshCw className="animate-spin" size={24} />
          <span>Loading Stova Studio Dashboard...</span>
        </div>
      </div>
    );
  }

  const newLeadsCount = inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="min-h-screen bg-ink text-cream font-ui">
      {/* HEADER */}
      <AdminHeader isFromDb={isFromDb} onRefresh={loadDashboardData} onLogout={handleLogout} />

      <div className="px-6 md:px-10 py-8 max-w-[1500px] mx-auto">
        {/* TABS NAVIGATION */}
        <div className="flex flex-wrap gap-2 border-b border-border mb-10 pb-4">
          <TabButton
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
            icon={Sparkles}
            label="Overview"
          />
          <TabButton
            active={activeTab === "projects"}
            onClick={() => setActiveTab("projects")}
            icon={FolderKanban}
            label={`Projects (${projects.length})`}
          />
          <TabButton
            active={activeTab === "services"}
            onClick={() => setActiveTab("services")}
            icon={Layers}
            label={`Services (${services.length})`}
          />
          <TabButton
            active={activeTab === "inquiries"}
            onClick={() => setActiveTab("inquiries")}
            icon={Users}
            label="Client Leads"
            badge={newLeadsCount > 0 ? String(newLeadsCount) : undefined}
          />
        </div>

        {/* ACTIVE TAB VIEWS */}
        {activeTab === "overview" && (
          <OverviewTab
            projects={projects}
            inquiries={inquiries}
            isFromDb={isFromDb}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenNewProject={openNewProjectModal}
          />
        )}

        {activeTab === "projects" && (
          <ProjectsTab
            projects={projects}
            onOpenNewProject={openNewProjectModal}
            onOpenEditProject={openEditProjectModal}
            onDeleteProject={handleDeleteProject}
          />
        )}

        {activeTab === "services" && (
          <ServicesTab
            services={services}
            onOpenNewService={openNewServiceModal}
            onOpenEditService={openEditServiceModal}
            onDeleteService={handleDeleteService}
          />
        )}

        {activeTab === "inquiries" && (
          <LeadsTab inquiries={inquiries} onUpdateStatus={handleUpdateInquiryStatus} />
        )}
      </div>

      {/* EDIT/ADD PROJECT MODAL */}
      {isProjectModalOpen && editingProject && (
        <ProjectModal
          editingProject={editingProject}
          onChangeEditingProject={(updated) => setEditingProject(updated)}
          onSave={handleSaveProject}
          onClose={() => setIsProjectModalOpen(false)}
        />
      )}

      {/* EDIT/ADD SERVICE MODAL */}
      {isServiceModalOpen && editingService && (
        <ServiceModal
          editingService={editingService}
          onChangeEditingService={(updated) => setEditingService(updated)}
          onSave={handleSaveService}
          onClose={() => setIsServiceModalOpen(false)}
        />
      )}
    </div>
  );
}
