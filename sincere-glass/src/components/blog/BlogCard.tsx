import Link from 'next/link';
import type { BlogArticle } from '@/lib/blog-registry';
import { CATEGORY_LABELS } from '@/lib/blog-registry';

interface Props {
  article: BlogArticle;
  featured?: boolean;
}

export default function BlogCard({ article, featured = false }: Props) {
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  if (featured) {
    return (
      <Link
        href={`/blog/${article.slug}`}
        className="group block lg:grid lg:grid-cols-2 gap-0 bg-[#3A4250]/15 rounded-xl overflow-hidden hover:bg-[#3A4250]/25 transition-colors border border-[#3A4250]/20"
      >
        <div className="aspect-[16/9] lg:aspect-auto bg-[#3A4250]/30 relative overflow-hidden">
          {article.heroImage ? (
            <img
              src={article.heroImage}
              alt={article.heroImageAlt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#8B95A5]">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          )}
          <span className={`absolute top-4 left-4 text-xs px-3 py-1.5 rounded font-medium ${
            article.isPillar
              ? 'bg-gradient-to-r from-[#DAA745] to-[#c4952e] text-[#1C1F26]'
              : 'bg-[#DAA745] text-[#1C1F26]'
          }`}>
            {article.isPillar ? '✦ Pillar Guide' : 'Featured'}
          </span>
        </div>
        <div className="p-6 lg:p-10 flex flex-col justify-center">
          <span className="text-xs text-[#DAA745] font-medium mb-3">
            {CATEGORY_LABELS[article.category]}
          </span>
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#F2F0ED] group-hover:text-[#DAA745] transition-colors mb-4 leading-snug">
            {article.title}
          </h2>
          <p className="text-[#8B95A5] leading-relaxed mb-6 line-clamp-3">{article.excerpt}</p>
          <div className="flex items-center gap-3 text-sm text-[#8B95A5]">
            <span>{article.author.name}</span>
            <span className="w-1 h-1 rounded-full bg-[#8B95A5]/50" />
            <time dateTime={article.publishDate}>{formatDate(article.publishDate)}</time>
            <span className="w-1 h-1 rounded-full bg-[#8B95A5]/50" />
            <span>{article.readingTime} min</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
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
          <div className="w-full h-full flex items-center justify-center text-[#8B95A5]/50">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
        <p className="text-sm text-[#8B95A5] line-clamp-2 mb-4">{article.excerpt}</p>
        <div className="flex items-center gap-2 text-xs text-[#8B95A5]/70">
          <time dateTime={article.publishDate}>{formatDate(article.publishDate)}</time>
          <span className="w-1 h-1 rounded-full bg-[#8B95A5]/30" />
          <span>{article.readingTime} min read</span>
        </div>
      </div>
    </Link>
  );
}
