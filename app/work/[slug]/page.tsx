import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllWork, getWorkBySlug } from "@/lib/work";
import { 
  SplitHeadline, 
  SectionLabel, 
  RevealOnScroll, 
  Tag, 
  ProjectCard 
} from "@/components/ui";
import CTASection from "@/components/sections/CTASection";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllWork();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Stova Media Case Study`,
    description: project.tagline,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getWorkBySlug(slug);

  if (!project) notFound();

  const nextProject = project.nextSlug ? getWorkBySlug(project.nextSlug) : null;

  return (
    <main className="min-h-screen bg-ink">
      {/* Fixed Back Navigation */}
      <Link 
        href="/work" 
        className="fixed top-24 left-10 z-50 group flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-muted hover:text-gold transition-colors duration-500 bg-ink/50 backdrop-blur-md px-4 py-2 rounded-full border border-border/50"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
        All Work
      </Link>

      {/* 1. HERO (60vh) */}
      <section 
        className="h-[70vh] flex flex-col justify-end p-10 md:p-20 relative overflow-hidden"
        style={{ background: project.heroColor }}
      >
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
        <div className="relative z-10 max-w-4xl">
          <Tag className="mb-6">{project.tag}</Tag>
          <SplitHeadline tag="h1" className="text-5xl md:text-7xl lg:text-9xl mb-8 leading-none">
            {project.title}
          </SplitHeadline>
          <div className="flex flex-wrap gap-12 pt-12 border-t border-white/10">
            <div>
              <span className="text-white/40 text-[9px] uppercase tracking-widest block mb-2">Timeline</span>
              <span className="text-sm font-medium">{project.timeline}</span>
            </div>
            <div>
              <span className="text-white/40 text-[9px] uppercase tracking-widest block mb-2">Status</span>
              <span className="text-sm font-medium">{project.status}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white/40 text-[9px] uppercase tracking-widest block mb-2">Stack</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 border border-white/20 text-white/60 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW (2-col) */}
      <section className="py-24 px-10 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20">
        <RevealOnScroll>
          <SectionLabel>Overview</SectionLabel>
          <p className="text-xl md:text-2xl font-ui leading-relaxed text-cream/90 max-w-xl">
            {project.overview}
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <SectionLabel>Core Results</SectionLabel>
          <ul className="space-y-6">
            {project.results.map((result, i) => (
              <li key={i} className="flex gap-6 items-start">
                <span className="font-display text-2xl text-gold/30">0{i+1}</span>
                <span className="text-muted text-lg">{result}</span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </section>

      {/* 3. CHALLENGE (centered) */}
      <section className="py-32 px-10 md:px-20 bg-ink-2 text-center flex flex-col items-center">
        <RevealOnScroll>
          <SectionLabel className="justify-center">The Challenge</SectionLabel>
          <blockquote className="font-display italic text-3xl md:text-5xl text-cream max-w-4xl leading-tight mt-10">
            &ldquo;{project.challenge}&rdquo;
          </blockquote>
        </RevealOnScroll>
      </section>

      {/* 4. SOLUTION (2-col) */}
      <section className="py-24 px-10 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <RevealOnScroll>
          <div className="relative p-10 border border-border bg-card">
            <Tag className="mb-6">The Solution</Tag>
            <p className="text-lg text-muted leading-relaxed font-ui mb-8">
              {project.solution}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Tag key={t} className="border-border/40 text-muted">{t}</Tag>
              ))}
            </div>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <div className="grid grid-cols-1 gap-12">
            {project.metrics?.map((metric, i) => (
              <div key={i} className="flex flex-col border-l-2 border-gold pl-8">
                <span className="font-display text-5xl md:text-7xl text-cream leading-none mb-2">
                  {metric.value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-dim">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* 5. NEXT PROJECT */}
      {nextProject && (
        <section className="py-24 px-10 md:px-20 border-t border-border">
          <SectionLabel>Next Project</SectionLabel>
          <div className="mt-12 flex justify-center">
            <ProjectCard 
              {...nextProject} 
              className="w-full md:w-[70vw] h-[600px] border-none shadow-gold-glow" 
              featured 
            />
          </div>
        </section>
      )}

      {/* 6. CTA */}
      <CTASection />
    </main>
  );
}
