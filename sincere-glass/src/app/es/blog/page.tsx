import type { Metadata } from 'next';
import { getAllArticles, getFeaturedArticle, CLUSTER_LABELS, type BlogCluster } from '@/lib/blog-registry';
import BlogCard from "@/_i18n/es/components/blog/BlogCard";
import { makeAlternates } from "@/lib/i18n";
export const metadata: Metadata = {
  title: "Perspectivas del sector del vidrio y guías técnicas | Blog de Sincere Glass",
  description: "Artículos especializados sobre vidrio arquitectónico: vidrio templado, vidrio aislante, vidrio laminado, vidrio de baja emisividad (Low-E) y vidrio esmaltado. Guías técnicas, recursos para compradores y noticias del sector de Sincere Glass.",
  keywords: ['glass industry blog', 'architectural glass guide', 'tempered glass technical guide', 'insulated glass guide', 'glass manufacturer blog'],
  alternates: makeAlternates("/blog")
};
function ClusterTabs({
  active
}: {
  active?: string;
}) {
  const clusters = Object.entries(CLUSTER_LABELS) as [BlogCluster, string][];
  return <div className="flex flex-wrap gap-2 mb-10">
      <a href="/blog" className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!active ? 'bg-[#DAA745] text-[#1C1F26]' : 'bg-[#1C1F26]/50 text-[#8B95A5] hover:text-white border border-[#3A4250]'}`}>
        All
      </a>
      {clusters.map(([key, label]) => <a key={key} href={`/blog?cluster=${key}`} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${active === key ? 'bg-[#DAA745] text-[#1C1F26]' : 'bg-[#1C1F26]/50 text-[#8B95A5] hover:text-white border border-[#3A4250]'}`}>
          {label}
        </a>)}
    </div>;
}
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
      {/* Hero */}
      <section className="bg-[#1C1F26] pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#F2F0ED] mb-4">
            {clusterFilter ? CLUSTER_LABELS[clusterFilter] : 'Insights & Resources'}
          </h1>
          <p className="text-lg text-[#8B95A5] max-w-2xl leading-relaxed">
            Guías técnicas, análisis del sector y conocimiento práctico
            fruto de más de 15 años en la fabricación de vidrio arquitectónico.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#1C1F26] pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Cluster filter tabs */}
          <ClusterTabs active={clusterFilter} />

          {filtered.length === 0 ? (/* Empty state */
        <div className="text-center py-24">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#3A4250]/20 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B95A5" strokeWidth="1.5">
                  <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-medium text-[#F2F0ED] mb-2">
                {clusterFilter ? `No articles in ${CLUSTER_LABELS[clusterFilter]} yet` : 'Articles coming soon'}
              </h2>
              <p className="text-[#8B95A5] max-w-md mx-auto">
                Estamos preparando guías técnicas detalladas y análisis del sector.
                Vuelva pronto para consultar las nuevas publicaciones.
              </p>
              {clusterFilter && <a href="/blog" className="inline-block mt-4 text-sm text-[#DAA745] hover:underline">
                  ← Ver todos los artículos
                </a>}
            </div>) : <>
              {/* Featured article */}
              {featured && <div className="mb-12">
                  <BlogCard article={featured} featured />
                </div>}

              {/* Article grid */}
              {rest.length > 0 && <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map(article => <BlogCard key={article.slug} article={article} />)}
                </div>}
            </>}
        </div>
      </section>
    </>;
}