import Link from "@/components/LocalizedLink";
import type { BlogArticle } from '@/lib/blog-registry';
import { CATEGORY_LABELS } from '@/lib/blog-registry';

interface Props {
  articles: BlogArticle[];
}

export default function RelatedPosts({ articles }: Props) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-[#3A4250]/30">
      <h2 className="text-2xl font-semibold text-[#F2F0ED] mb-8">
        Continue Reading
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group block bg-[#3A4250]/20 rounded-lg overflow-hidden hover:bg-[#3A4250]/30 transition-colors"
          >
            <div className="aspect-[16/9] bg-[#3A4250]/40 relative overflow-hidden">
              {article.heroImage && (
                <img
                  src={article.heroImage}
                  alt={article.heroImageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <span className="absolute top-3 left-3 text-xs bg-[#1C1F26]/80 text-[#DAA745] px-2.5 py-1 rounded">
                {CATEGORY_LABELS[article.category]}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-medium text-[#F2F0ED] group-hover:text-[#DAA745] transition-colors line-clamp-2 mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-[#8B95A5] line-clamp-2">{article.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
