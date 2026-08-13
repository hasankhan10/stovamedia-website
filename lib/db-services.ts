import { supabase } from "@/lib/supabase";

export interface ServiceHighlight {
  label: string;
  desc: string;
  originalPrice?: string;
  offerPrice?: string;
}

export interface ServiceItem {
  id: string; // service_id e.g. 'custom-software'
  number: string; // e.g. '01'
  title: string;
  icon: string; // Icon name e.g. 'Code2', 'Bot', 'Store', 'ShoppingCart', 'Zap'
  tagline: string;
  desc: string;
  deliverables: string[];
  tech: string[];
  highlights: ServiceHighlight[];
  displayOrder?: number;
}

export const defaultServices: ServiceItem[] = [
  {
    id: "custom-software",
    number: "01",
    icon: "Code2",
    title: "Custom Software",
    tagline: "Built from scratch. Tailored to your business.",
    desc: "We architect and engineer full-stack software products from the ground up — no templates, no shortcuts. Whether it's a healthcare SaaS, an enterprise dashboard, a mobile app, or a white-label platform, every line of code is written with your business logic at its core.",
    deliverables: [
      "Full-stack Web Applications",
      "Healthcare & Clinic Management Systems",
      "Enterprise Dashboards & Analytics",
      "Mobile Apps (Flutter)",
      "White-label SaaS Platforms",
      "API Design & Integration",
      "Database Architecture",
      "Performance Optimization",
    ],
    tech: ["Next.js", "Flutter", "Node.js", "PostgreSQL", "Prisma", "Supabase", "Tailwind CSS", "Three.js"],
    highlights: [
      { label: "Zero Templates", desc: "100% custom-built for your requirements" },
      { label: "Production Ready", desc: "Deployed, monitored, and battle-tested" },
      { label: "Scalable Architecture", desc: "Built to grow with your business" },
    ],
    displayOrder: 1,
  },
  {
    id: "ai-agent",
    number: "02",
    icon: "Bot",
    title: "AI Agent",
    tagline: "Intelligent automation for modern businesses.",
    desc: "We design and deploy AI-powered agents that automate workflows, handle customer interactions, and make intelligent decisions on behalf of your business. From conversational bots to data-driven automation pipelines, we build AI that actually works in production.",
    deliverables: [
      "Conversational AI Chatbots",
      "Customer Support Automation",
      "Lead Qualification Agents",
      "AI-Powered Analytics",
      "Workflow Automation",
    ],
    tech: ["OpenAI", "Python", "FastAPI", "RAG Systems", "LangChain"],
    highlights: [
      { label: "Human-Like Interactions", desc: "Natural conversations that convert" },
      { label: "24/7 Operations", desc: "Never sleeps, never misses a lead" },
      { label: "Continuous Learning", desc: "Gets smarter with every interaction" },
    ],
    displayOrder: 2,
  },
  {
    id: "local-business",
    number: "03",
    icon: "Store",
    title: "Google Business Profile & Premium Website",
    tagline: "Dominate your local market with a high-fidelity digital presence.",
    desc: "We help local businesses establish a commanding online presence. This package includes full Google Business Profile setup and optimization alongside a premium, high-converting landing page. While the market price is ₹25,000, we exclusively offer this complete package for local business support at just ₹15,999.",
    deliverables: [
      "Premium Landing Page Website",
      "Google Business Profile Setup",
      "Local SEO Optimization",
      "Mobile-First Design",
      "Contact Form Integration",
      "AI assistant chat bot integration",
    ],
    tech: ["Next.js", "Tailwind CSS", "Local SEO", "Google My Business"],
    highlights: [
      { label: "Unbeatable Value", desc: "Market ₹25,000 → Offer ₹15,999", originalPrice: "₹25,000", offerPrice: "₹15,999" },
      { label: "Local Focus", desc: "Exclusively tailored for local business support" },
      { label: "High Conversion", desc: "Designed specifically to turn local searchers into customers" },
    ],
    displayOrder: 3,
  },
  {
    id: "ecommerce",
    number: "04",
    icon: "ShoppingCart",
    title: "Fully Ecommerce Setup",
    tagline: "Making your premium brand visible to everyone.",
    desc: "Launch your digital storefront with a fully custom-coded e-commerce setup. We build high-performance, scalable platforms tailored entirely to your brand's unique identity. With a market value of ₹55,000, we deliver this premium e-commerce architecture to you for just upto ₹39,999.",
    deliverables: [
      "Custom E-commerce Platform",
      "Secure Payment Gateway Integration",
      "Brand-aligned Design System",
      "Full Admin Panel Management",
      "Mobile-Optimized Checkout",
      "SEO & Speed Optimization",
    ],
    tech: ["Next.js", "Stripe", "Tailwind CSS", "Supabase", "PostgreSQL"],
    highlights: [
      { label: "Premium Offer", desc: "Market ₹55,000 → Upto ₹39,999", originalPrice: "₹55,000", offerPrice: "Upto ₹39,999" },
      { label: "Global Reach", desc: "Make your premium brand visible to everyone" },
      { label: "Custom Coded", desc: "No generic templates. Built specifically for your products." },
    ],
    displayOrder: 4,
  },
];

export async function fetchServicesFromSupabase(): Promise<{ data: ServiceItem[]; fromDb: boolean }> {
  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return { data: defaultServices, fromDb: false };
    }

    const formatted: ServiceItem[] = data.map((item) => ({
      id: item.service_id || item.id,
      number: item.number || "01",
      title: item.title,
      icon: item.icon || "Code2",
      tagline: item.tagline || "",
      desc: item.description || item.desc || "",
      deliverables: Array.isArray(item.deliverables) ? item.deliverables : [],
      tech: Array.isArray(item.tech) ? item.tech : [],
      highlights: Array.isArray(item.highlights) ? item.highlights : [],
      displayOrder: item.display_order || 1,
    }));

    return { data: formatted, fromDb: true };
  } catch {
    return { data: defaultServices, fromDb: false };
  }
}

export async function saveServiceToSupabase(service: ServiceItem): Promise<{ success: boolean; data?: ServiceItem; error?: string }> {
  try {
    const dbRecord = {
      service_id: service.id,
      number: service.number,
      title: service.title,
      icon: service.icon,
      tagline: service.tagline,
      description: service.desc,
      deliverables: service.deliverables || [],
      tech: service.tech || [],
      highlights: service.highlights || [],
      display_order: service.displayOrder || 1,
    };

    const { data: existing } = await supabase
      .from("services")
      .select("id")
      .eq("service_id", service.id)
      .single();

    if (existing) {
      const { data, error } = await supabase
        .from("services")
        .update(dbRecord)
        .eq("service_id", service.id)
        .select()
        .single();

      if (error) return { success: false, error: error.message };
      return {
        success: true,
        data: {
          id: data.service_id,
          number: data.number,
          title: data.title,
          icon: data.icon,
          tagline: data.tagline,
          desc: data.description,
          deliverables: data.deliverables,
          tech: data.tech,
          highlights: data.highlights,
          displayOrder: data.display_order,
        },
      };
    } else {
      const { data, error } = await supabase
        .from("services")
        .insert([dbRecord])
        .select()
        .single();

      if (error) return { success: false, error: error.message };
      return {
        success: true,
        data: {
          id: data.service_id,
          number: data.number,
          title: data.title,
          icon: data.icon,
          tagline: data.tagline,
          desc: data.description,
          deliverables: data.deliverables,
          tech: data.tech,
          highlights: data.highlights,
          displayOrder: data.display_order,
        },
      };
    }
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save service" };
  }
}

export async function deleteServiceFromSupabase(serviceId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("services")
      .delete()
      .eq("service_id", serviceId);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete service" };
  }
}
