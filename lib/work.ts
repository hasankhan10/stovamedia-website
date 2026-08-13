export interface Project {
  slug: string;
  index: string;
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
  heroColor: string;
  featured?: boolean;
  locked?: boolean;
  nextSlug?: string;
  externalUrl?: string;
  image?: string;
}

const projects: Project[] = [];

export function getAllWork(): Project[] {
  return projects;
}

export function getWorkBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
