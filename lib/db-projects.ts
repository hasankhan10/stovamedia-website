import { supabase } from "@/lib/supabase";
import { Project } from "@/lib/work";

export interface DbProjectRecord {
  id?: string;
  slug: string;
  index_number?: string;
  title: string;
  tag: string;
  category: "Healthcare" | "Web Apps" | "Mobile" | "White-label" | "AI";
  tagline: string;
  overview: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics?: { value: string; label: string }[];
  tech: string[];
  timeline: string;
  status: "Live" | "In Development" | "Delivered";
  hero_color: string;
  featured?: boolean;
  locked?: boolean;
  external_url?: string;
  image?: string;
  created_at?: string;
}

export function formatDbProjectToProject(record: DbProjectRecord, arrayIndex?: number): Project {
  const defaultSeq = typeof arrayIndex === "number" ? String(arrayIndex + 1).padStart(2, "0") : "01";
  const seq = record.index_number || defaultSeq;

  return {
    slug: record.slug,
    index: seq,
    title: record.title,
    tag: record.tag || "Custom Software",
    category: record.category || "Web Apps",
    tagline: record.tagline || "",
    overview: record.overview || "",
    challenge: record.challenge || "",
    solution: record.solution || "",
    results: Array.isArray(record.results) ? record.results : [],
    metrics: Array.isArray(record.metrics) ? record.metrics : [],
    tech: Array.isArray(record.tech) ? record.tech : [],
    timeline: record.timeline || "In active development",
    status: record.status || "Live",
    heroColor: record.hero_color || "linear-gradient(135deg, #080808, #0A1A0A)",
    featured: record.featured ?? true,
    locked: record.locked ?? false,
    externalUrl: record.external_url || undefined,
    image: record.image || undefined,
  };
}

export function formatProjectToDbRecord(project: Partial<Project>): Partial<DbProjectRecord> {
  return {
    slug: project.slug,
    index_number: project.index,
    title: project.title,
    tag: project.tag,
    category: project.category,
    tagline: project.tagline,
    overview: project.overview,
    challenge: project.challenge,
    solution: project.solution,
    results: project.results || [],
    metrics: project.metrics || [],
    tech: project.tech || [],
    timeline: project.timeline,
    status: project.status,
    hero_color: project.heroColor,
    featured: project.featured ?? true,
    locked: project.locked ?? false,
    external_url: project.externalUrl,
    image: project.image,
  };
}

export async function fetchProjectsFromSupabase(): Promise<{ data: Project[]; fromDb: boolean }> {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: true });

    if (error || !data) {
      console.warn("Supabase projects fetch notice:", error?.message);
      return { data: [], fromDb: false };
    }

    const dbProjects = data.map((rec, i) => formatDbProjectToProject(rec, i));
    return { data: dbProjects, fromDb: true };
  } catch {
    return { data: [], fromDb: false };
  }
}

export async function saveProjectToSupabase(project: Partial<Project>): Promise<{ success: boolean; data?: Project; error?: string }> {
  try {
    const dbRecord = formatProjectToDbRecord(project);

    // Check if project exists by slug
    const { data: existing } = await supabase
      .from("projects")
      .select("id")
      .eq("slug", project.slug)
      .maybeSingle();

    if (existing) {
      const { data, error } = await supabase
        .from("projects")
        .update(dbRecord)
        .eq("slug", project.slug)
        .select()
        .single();

      if (error) return { success: false, error: error.message };
      return { success: true, data: formatDbProjectToProject(data) };
    } else {
      const { data, error } = await supabase
        .from("projects")
        .insert([dbRecord])
        .select()
        .single();

      if (error) return { success: false, error: error.message };
      return { success: true, data: formatDbProjectToProject(data) };
    }
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save project to Supabase" };
  }
}

export async function deleteProjectFromSupabase(slug: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("slug", slug);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete project" };
  }
}
