import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { SectionLabel, SplitHeadline, Tag } from "@/components/ui";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import { notFound } from "next/navigation";

// Client-side visual fluff extracted to a separate component
import BlogUIWrappers from "@/components/blog/BlogUIWrappers";

const components = {
  h1: (props: any) => <h1 className="text-3xl font-display text-cream mt-12 mb-6" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-display text-gold mt-10 mb-4 tracking-wide" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-display text-gold/80 mt-8 mb-4 tracking-wide" {...props} />,
  p: (props: any) => <p className="text-muted leading-relaxed mb-6 font-ui" {...props} />,
  ul: (props: any) => <ul className="list-none space-y-3 mb-8" {...props} />,
  li: (props: any) => (
    <li className="flex items-start gap-3 text-muted">
      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
      <span {...props} />
    </li>
  ),
  code: (props: any) => <code className="bg-card text-gold px-1.5 py-0.5 rounded font-mono text-sm" {...props} />,
  strong: (props: any) => <strong className="text-cream font-semibold" {...props} />,
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-ink relative">
      <BlogUIWrappers />

      {/* Hero Header */}
      <header className="pt-40 pb-20 px-6 md:px-10 lg:px-20 border-b border-border">
        <Link 
          href="/blog" 
          className="group flex items-center gap-3 text-[10px] uppercase font-bold tracking-[0.2em] text-dim hover:text-gold transition-colors duration-500 mb-12"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Insights
        </Link>
        
        <div className="flex flex-col gap-8 max-w-4xl">
          <Tag>{post.tag}</Tag>
          <SplitHeadline tag="h1" className="text-4xl md:text-6xl lg:text-7xl leading-tight">
            {post.title}
          </SplitHeadline>
          <div className="flex items-center gap-8 text-[11px] uppercase tracking-widest font-bold text-dim">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-gold/50" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-gold/50" />
              {post.readingTime}
            </div>
          </div>
        </div>
      </header>

      {/* Body Content */}
      <div className="px-6 md:px-10 lg:px-20 py-24 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-20">
        <article className="max-w-3xl prose prose-invert overflow-hidden">
          <MDXRemote source={post.content} components={components} />
        </article>
        
        <aside className="hidden lg:block">
          <div className="sticky top-32">
            <SectionLabel>Quick Insights</SectionLabel>
            <div className="p-8 border border-border bg-card/40 mt-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gold-glow opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <p className="text-sm italic text-muted leading-relaxed relative z-10">
                &ldquo;India is scaling its clinical software through WhatsApp 
                and SMS first, not apps. That is the tectonic shift we built for.&rdquo;
              </p>
            </div>
          </div>
        </aside>
      </div>

      <CTASection />
    </main>
  );
}
