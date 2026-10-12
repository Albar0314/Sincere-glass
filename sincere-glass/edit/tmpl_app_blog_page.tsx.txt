import type { Metadata } from "next";
import { getAllArticles, getFeaturedArticle, type BlogCluster } from "@/lib/blog-registry";
import BlogCard from "@/components/blog/BlogCard";
import ClusterTabs from "@/components/blog/ClusterTabs";
import { BlogHero, BlogEmptyState } from "@/components/blog/BlogListingChrome";
import { makeAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Glass Industry Insights & Technical Guides | Sincere Glass Blog",
  description:
    "Expert articles on architectural glass: tempered, insulated, laminated, Low-E and enameled glass. Technical guides, buyer resources and industry news from Sincere Glass.",
  keywords: [
    "glass industry blog",
    "architectural glass guide",
    "tempered glass technical guide",
    "insulated glass guide",
    "glass manufacturer blog",
  ],
  alternates: makeAlternates("/blog"),
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ cluster?: string }>;
}) {
  const params = await searchParams;
  const clusterFilter = params.cluster as BlogCluster | undefined;
  const allArticles = getAllArticles();
  const filtered = clusterFilter
    ? allArticles.filter((a) => a.cluster === clusterFilter)
    : allArticles;
  const featured = !clusterFilter ? getFeaturedArticle() : filtered[0];
  const rest = filtered.filter((a) => a.slug !== featured?.slug);

  return (
    <>
      <BlogHero clusterFilter={clusterFilter} />

      <section className="bg-[#1C1F26] pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <ClusterTabs active={clusterFilter} />

          {filtered.length === 0 ? (
            <BlogEmptyState clusterFilter={clusterFilter} />
          ) : (
            <>
              {featured && (
                <div className="mb-12">
                  <BlogCard article={featured} featured />
                </div>
              )}
              {rest.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((article) => (
                    <BlogCard key={article.slug} article={article} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
