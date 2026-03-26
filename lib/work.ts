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
    externalUrl: "https://www.mrcompounder.com",
    nextSlug: "hair-transplant-simulation"
  },
  {
    slug: "hair-transplant-simulation",
    index: "02",
    title: "Hair Transplant Simulation",
    tag: "AI · 3D Platform",
    category: "AI",
    tagline: "AI-powered hair transplant visualization for clinics worldwide.",
    overview: "Surgeons upload patient photos, our AI generates a photorealistic 3D head model, designs hairlines, maps donor/recipient zones, calculates grafts, and shows month-by-month growth simulation from Month 1 to Month 18.",
    challenge: "Hair transplant clinics lose patients at consultation because outcomes are impossible to visualize. Surgeons needed a tool that builds instant trust and closes consultations faster.",
    solution: "AI-driven photo-to-3D pipeline using computer vision. React Three Fiber renders the interactive 3D model. Surgeons draw hairlines, adjust density, and generate a personalized growth timeline — all in the browser.",
    results: ["AI-powered 3D head generation from photos", "Interactive hairline design tool", "Automated graft calculator", "Month 1-18 animated growth timeline", "White-labelled per clinic"],
    metrics: [
      { value: "AI", label: "Powered" },
      { value: "2D", label: "Visualization" },
      { value: "18mo", label: "Growth Sim" }
    ],
    tech: ["Next.js 15", "React Three Fiber", "Three.js", "Python", "OpenAI Vision", "TypeScript", "Zustand", "Supabase"],
    timeline: "In active development",
    status: "In Development",
    heroColor: "linear-gradient(135deg, #080808, #100A18)",
    externalUrl: "https://www.semulation.drpaulsonlin.com",
    nextSlug: "mr-compounder"
  },
];

export function getAllWork() {
  return projects;
}

export function getWorkBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
