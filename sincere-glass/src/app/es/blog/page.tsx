import type { Metadata } from "next";
import { getAllArticles, getFeaturedArticle, type BlogCluster } from "@/lib/blog-registry";
import BlogCard from "@/_i18n/es/components/blog/BlogCard";
import ClusterTabs from "@/_i18n/es/components/blog/ClusterTabs";
import { BlogHero, BlogEmptyState } from "@/_i18n/es/components/blog/BlogListingChrome";
import { makeAlternates } from "@/lib/i18n";
export const metadata: Metadata = {
  title: "Perspectivas del sector del vidrio y guías técnicas | Blog de Sincere Glass",
  description: "Artículos especializados sobre vidrio arquitectónico: vidrio templado, vidrio aislante, vidrio laminado, vidrio de baja emisividad (Low-E) y vidrio esmaltado. Guías técnicas, recursos para compradores y noticias del sector de Sincere Glass.",
  keywords: ["glass industry blog", "architectural glass guide", "tempered glass technical guide", "insulated glass guide", "glass manufacturer blog"],
  alternates: makeAlternates("/blog", "es")
};
export default async function BlogPage({
  searchParams
}: {
  searchParams: Promise<{
    cluster?: string;
  }>;
}) {
  const params = await searchParams;
  const clusterFilter = params.cluster as BlogCluster | undefined;
  const allArticles = getAllArticles();
  const filtered = clusterFilter ? allArticles.filter(a => a.cluster === clusterFilter) : allArticles;
  const featured = !clusterFilter ? getFeaturedArticle() : filtered[0];
  const rest = filtered.filter(a => a.slug !== featured?.slug);
  return <>
      <BlogHero clusterFilter={clusterFilter} />

      <section className="bg-[#1C1F26] pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <ClusterTabs active={clusterFilter} />

          {filtered.length === 0 ? <BlogEmptyState clusterFilter={clusterFilter} /> : <>
              {featured && <div className="mb-12">
                  <BlogCard article={featured} featured />
                </div>}
              {rest.length > 0 && <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map(article => <BlogCard key={article.slug} article={article} />)}
                </div>}
            </>}
        </div>
      </section>
    </>;
}