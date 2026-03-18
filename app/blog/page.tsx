import { getAllPosts } from "@/lib/blog";
import { SplitHeadline, SectionLabel, RevealOnScroll } from "@/components/ui";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="pt-32 min-h-screen bg-ink">
      <div className="px-6 md:px-10 lg:px-20 mb-32">
        <SectionLabel>Thoughts & Technicals</SectionLabel>
        <SplitHeadline tag="h1" className="text-5xl md:text-7xl lg:text-8xl leading-none">
          Industry-specific insights.
        </SplitHeadline>
      </div>

      <div className="px-6 md:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-border border-y border-border">
        {posts.map((post, i) => (
          <RevealOnScroll key={post.slug} delay={i * 0.1}>
            <Link 
              href={`/blog/${post.slug}`}
              className="group block bg-ink p-10 md:p-16 h-full hover:bg-card transition-all duration-700 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-12">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gold">{post.tag}</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-dim">{post.date}</span>
                </div>
                
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6 group-hover:text-gold transition-colors duration-500 leading-tight">
                  {post.title}
                </h2>
                
                <p className="text-muted font-ui text-base mb-12 flex-grow line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-[0.2em] text-dim group-hover:text-gold transition-colors duration-500 mt-auto">
                  Read Article
                  <span className="w-12 h-[1px] bg-border group-hover:w-20 group-hover:bg-gold transition-all duration-500" />
                </div>
              </div>
            </Link>
          </RevealOnScroll>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="py-40 text-center">
          <p className="text-muted">No articles found yet. Check back soon.</p>
        </div>
      )}

      <CTASection />
    </main>
  );
}
