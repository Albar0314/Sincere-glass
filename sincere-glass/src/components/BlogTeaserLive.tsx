/**
 * BlogTeaserLive — homepage blog teaser that reads from blog-registry.
 * 
 * Replace your existing BlogTeaser import in the homepage with this component.
 * If no articles are published yet, it shows a placeholder state.
 */

import Link from "@/components/LocalizedLink";
import { getAllArticles, CATEGORY_LABELS } from '@/lib/blog-registry';

export default function BlogTeaserLive() {
  const articles = getAllArticles().slice(0, 3);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <section className="bg-[#1C1F26] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F2F0ED] mb-2">
              Latest Insights
            </h2>
            <p className="text-[#8B95A5]">
              Technical guides and industry knowledge from our team
            </p>
          </div>
          {articles.length > 0 && (
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-[#DAA745] hover:underline"
            >
              View all articles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-16 bg-[#3A4250]/10 rounded-xl border border-[#3A4250]/20">
            <p className="text-[#8B95A5]">
              In-depth technical guides coming soon.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group block bg-[#3A4250]/10 rounded-lg overflow-hidden hover:bg-[#3A4250]/20 transition-colors border border-[#3A4250]/15"
              >
                <div className="aspect-[16/9] bg-[#3A4250]/25 relative overflow-hidden">
                  {article.heroImage ? (
                    <img
                      src={article.heroImage}
                      alt={article.heroImageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#8B95A5]/40">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 text-xs bg-[#1C1F26]/80 text-[#DAA745] px-2.5 py-1 rounded">
                    {CATEGORY_LABELS[article.category]}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-medium text-[#F2F0ED] group-hover:text-[#DAA745] transition-colors line-clamp-2 mb-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[#8B95A5] line-clamp-2 mb-3">{article.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-[#8B95A5]/70">
                    <time dateTime={article.publishDate}>{formatDate(article.publishDate)}</time>
                    <span className="w-1 h-1 rounded-full bg-[#8B95A5]/30" />
                    <span>{article.readingTime} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {articles.length > 0 && (
          <div className="text-center mt-8 sm:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-[#DAA745] hover:underline"
            >
              View all articles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
