"use client";

import Link from "@/components/LocalizedLink";
import { useInView } from "@/lib/useInView";

// TODO: Replace with WPGraphQL fetch in production
const posts = [
  {
    slug: "tempered-vs-laminated-glass",
    title: "Tempered vs. Laminated Glass: Which Is Right for Your Project?",
    excerpt: "Both are safety glass — but they protect in different ways. Here's how to choose based on your building requirements.",
    date: "2026-09-15",
  },
  {
    slug: "low-e-glass-energy-savings",
    title: "How Low-E Glass Reduces Building Energy Costs by Up to 30%",
    excerpt: "Low-emissivity coatings reflect infrared heat while letting visible light through. We break down the science and the savings.",
    date: "2026-09-08",
  },
  {
    slug: "insulated-glass-unit-guide",
    title: "The Complete Guide to Insulated Glass Units (IGUs)",
    excerpt: "Spacer types, gas fills, seal longevity — everything architects and contractors need to know before specifying IGUs.",
    date: "2026-08-28",
  },
];

export default function BlogTeaser() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 transition-all duration-600"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)" }}
        >
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Glass Industry Insights</h2>
            <p className="mt-3 text-brand-muted text-lg">Technical guides and industry knowledge for informed decisions.</p>
          </div>
          <Link href="/blog" className="text-brand-accent hover:text-brand-accent-hover font-medium transition-colors whitespace-nowrap">
            All Articles
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-6 rounded-xl border border-brand-light hover:border-brand-secondary/30 hover:shadow-md transition-all duration-300"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${200 + i * 100}ms`,
                transitionProperty: "opacity, transform, border-color, box-shadow",
              }}
            >
              <time className="text-xs text-brand-muted">{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</time>
              <h3 className="mt-2 font-display text-base font-semibold text-brand-dark group-hover:text-brand-accent transition-colors leading-snug line-clamp-2">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-brand-muted leading-relaxed line-clamp-2">{post.excerpt}</p>
              <span className="inline-flex items-center mt-4 text-sm font-medium text-brand-secondary group-hover:text-brand-accent transition-colors">
                Read More
                <svg className="ml-1 w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
