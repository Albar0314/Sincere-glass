import type { Metadata } from 'next';
import {
  getAllArticles,
  getFeaturedArticle,
  CATEGORY_LABELS,
  type BlogCategory,
} from '@/lib/blog-registry';
import BlogCard from '@/components/blog/BlogCard';

export const metadata: Metadata = {
  title: 'Glass Industry Insights & Technical Guides | Sincere Glass Blog',
  description:
    'Expert articles on architectural glass: tempered, insulated, laminated, Low-E and enameled glass. Technical guides, buyer resources and industry news from Sincere Glass.',
  keywords: [
    'glass industry blog',
    'architectural glass guide',
    'tempered glass technical guide',
    'insulated glass guide',
    'glass manufacturer blog',
  ],
};

export default function BlogPage() {
  const articles = getAllArticles();
  const featured = getFeaturedArticle();
  const rest = articles.filter((a) => a.slug !== featured?.slug);

  // Collect unique categories from published articles
  const categories = Array.from(new Set(articles.map((a) => a.category)));

  return (
    <>
      {/* Hero */}
      <section className="bg-[#1C1F26] pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#F2F0ED] mb-4">
            Insights & Resources
          </h1>
          <p className="text-lg text-[#8B95A5] max-w-2xl leading-relaxed">
            Technical guides, industry analysis, and practical knowledge
            from 15+ years in architectural glass manufacturing.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#1C1F26] pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {articles.length === 0 ? (
            /* Empty state */
            <div className="text-center py-24">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#3A4250]/20 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B95A5" strokeWidth="1.5">
                  <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-medium text-[#F2F0ED] mb-2">
                Articles coming soon
              </h2>
              <p className="text-[#8B95A5] max-w-md mx-auto">
                We&apos;re preparing in-depth technical guides and industry insights.
                Check back shortly for our first publications.
              </p>
            </div>
          ) : (
            <>
              {/* Featured article */}
              {featured && (
                <div className="mb-12">
                  <BlogCard article={featured} featured />
                </div>
              )}

              {/* Category filter — shown only if 2+ categories */}
              {categories.length > 1 && (
                <div className="flex flex-wrap gap-2 mb-10">
                  <span className="text-xs text-[#8B95A5] self-center mr-2">Filter:</span>
                  {categories.map((cat) => (
                    <span
                      key={cat}
                      className="text-xs px-3 py-1.5 rounded-full border border-[#3A4250]/30 text-[#8B95A5] hover:border-[#DAA745]/40 hover:text-[#DAA745] transition-colors cursor-default"
                    >
                      {CATEGORY_LABELS[cat]}
                    </span>
                  ))}
                </div>
              )}

              {/* Article grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((article) => (
                  <BlogCard key={article.slug} article={article} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
