export interface Project {
  slug: string;
  index: string;
  title: string;
  tag: string;
  category: "Healthcare" | "Web Apps" | "Mobile" | "White-label";
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
}

const projects: Project[] = [
  {
    slug: "mr-compounder",
    index: "01",
    title: "Mr Compounder",
    tag: "Healthcare SaaS",
    category: "Healthcare",
    tagline: "A Silent OPD system replacing paper queues in Indian clinics.",
    overview: "Usage-based digital token and queue management for Indian clinics. No patient app required. Works on 2G. 50+ active users.",
    challenge: "Every existing solution required patients to download an app. In semi-urban India that was a non-starter. Zero friction was non-negotiable.",
    solution: "Web-based token via SMS + WhatsApp. Clinic gets dashboard. Patient gets a number. No app. No account. No barrier.",
    results: ["50+ active clinic users", "Zero patient app installs required", "Works on 2G", "Rs. 2 per patient usage-based"],
    metrics: [
      { value: "50+", label: "Clinic Users" },
      { value: "0", label: "App Installs" },
      { value: "100%", label: "Availability" }
    ],
    tech: ["Next.js 15", "TypeScript", "Prisma", "PostgreSQL", "Twilio", "WhatsApp Business API", "Vercel", "Supabase"],
    timeline: "4 months MVP to launch",
    status: "Live",
    heroColor: "linear-gradient(135deg, #080808, #0A1A0A)",
    featured: true,
    nextSlug: "hairviz"
  },
  {
    slug: "hairviz",
    index: "02",
    title: "HairViz",
    tag: "3D Platform",
    category: "Web Apps",
    tagline: "B2B 3D hair transplant consultation tool for Indian clinics.",
    overview: "Surgeons upload photos, generate 3D head models, design hairlines, map scalp zones, calculate grafts, show Month 1-18 growth timelines.",
    challenge: "Clinics lose patients at consultation because outcomes are hard to visualise. Surgeons needed a tool that builds real-time trust.",
    solution: "Next.js + React Three Fiber. 3D head model, face texture mapping, interactive hairline drawing, graft calculator.",
    results: ["3D head model + face texture", "Live hairline design tool", "Automated graft calculator", "Month 1-18 animated timeline", "White-labelled per clinic"],
    metrics: [
      { value: "3D", label: "Visualization" },
      { value: "18m", label: "Timeline" },
      { value: "100%", label: "Accuracy" }
    ],
    tech: ["Next.js 15", "React Three Fiber", "Three.js r160", "TypeScript", "Zustand", "Tailwind v4", "Supabase"],
    timeline: "In active development",
    status: "In Development",
    heroColor: "linear-gradient(135deg, #080808, #100A18)",
    nextSlug: "rms"
  },
  {
    slug: "rms",
    index: "03",
    title: "Recharge Management System",
    tag: "Distribution SaaS",
    category: "Web Apps",
    tagline: "End-to-end recharge distribution platform for a national operator.",
    overview: "LAPU SIM lifecycle, M-Robotics API, real-time retailer wallet, multi-tier commission chain management.",
    challenge: "Client managed a national recharge network on spreadsheets. Real-time balance, commissions, and onboarding needed full automation.",
    solution: "Custom SaaS: LAPU SIM pools, wallet top-up, automated commissions, full admin panel for the distributor.",
    results: ["Full LAPU SIM lifecycle", "Real-time retailer wallet", "Automated commission chains", "M-Robotics API integrated", "Bangla + English dual-language UI"],
    metrics: [
      { value: "LAPU", label: "SIM Lifecycle" },
      { value: "Real-time", label: "Wallet" },
      { value: "Dual", label: "Language" }
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "M-Robotics API", "Tailwind"],
    timeline: "3 months — delivered",
    status: "Delivered",
    heroColor: "linear-gradient(135deg, #080808, #080C08)",
    nextSlug: "mr-compounder"
  }
];

export function getAllWork() {
  return projects;
}

export function getWorkBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
