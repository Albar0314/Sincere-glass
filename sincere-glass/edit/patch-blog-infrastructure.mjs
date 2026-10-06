/**
 * patch-blog-infrastructure.mjs
 * 
 * Creates the complete Blog infrastructure for Sincere Glass:
 * - Blog registry (article metadata + keyword tracking)
 * - Blog listing page
 * - Blog article layout wrapper
 * - Shared blog components (ReadingProgress, TOC, AuthorCard, RelatedPosts, BlogCTA, BlogCard)
 * - Reusable content block components for articles
 * - Updates homepage BlogTeaser to read from registry
 * 
 * Run from project root: node edit\patch-blog-infrastructure.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';

function ensure(path) {
  const dir = dirname(path);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(path, arguments[1], 'utf8');
  console.log(`✅ ${path}`);
}

// ============================================================
// 1. Blog Registry — tracks all articles + target keywords
// ============================================================
ensure('src/lib/blog-registry.ts', `
export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  targetKeyword: string;
  secondaryKeywords?: string[];
  publishDate: string;        // YYYY-MM-DD
  updatedDate?: string;
  category: BlogCategory;
  tags: string[];
  heroImage: string;          // path in /public/images/blog/
  heroImageAlt: string;
  heroImagePrompt?: string;   // AI image generation prompt
  author: {
    name: string;
    url: string;
  };
  readingTime: number;        // minutes
  featured?: boolean;
}

export type BlogCategory =
  | 'Technical Guide'
  | 'Industry News'
  | 'Product Knowledge'
  | 'Project Case Study'
  | 'Buyer Guide'
  | 'Manufacturing';

export const CATEGORY_LABELS: Record<BlogCategory, string> = {
  'Technical Guide': 'Technical Guide',
  'Industry News': 'Industry News',
  'Product Knowledge': 'Product Knowledge',
  'Project Case Study': 'Case Study',
  'Buyer Guide': "Buyer's Guide",
  'Manufacturing': 'Manufacturing',
};

// Default author per project preferences
export const DEFAULT_AUTHOR = {
  name: 'Yang Ruosong',
  url: 'https://sincereglass.com/about',
};

/**
 * ARTICLE REGISTRY
 * 
 * Every published blog article must be registered here.
 * Before adding a new article, audit targetKeyword against
 * existing entries to prevent keyword cannibalization.
 * 
 * Each article's page lives at: src/app/blog/<slug>/page.tsx
 */
export const blogArticles: BlogArticle[] = [
  // Articles will be added here as they are written.
  // Example entry:
  // {
  //   slug: 'soundproof-laminated-glass-guide',
  //   title: 'Soundproof Laminated Glass: The Complete Acoustic Performance Guide',
  //   excerpt: 'Learn how laminated glass reduces noise by up to 40dB...',
  //   targetKeyword: 'soundproof laminated glass',
  //   secondaryKeywords: ['acoustic laminated glass', 'noise reduction glass'],
  //   publishDate: '2026-10-06',
  //   category: 'Technical Guide',
  //   tags: ['laminated glass', 'soundproofing', 'acoustic performance'],
  //   heroImage: '/images/blog/soundproof-laminated-glass.webp',
  //   heroImageAlt: 'Cross-section of laminated glass showing PVB interlayer',
  //   heroImagePrompt: 'Architectural photography of...',
  //   author: DEFAULT_AUTHOR,
  //   readingTime: 12,
  //   featured: true,
  // },
];

// ---- Utility functions ----

export function getAllArticles(): BlogArticle[] {
  return [...blogArticles].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

export function getFeaturedArticle(): BlogArticle | undefined {
  return blogArticles.find((a) => a.featured) || blogArticles[0];
}

export function getArticlesByCategory(category: BlogCategory): BlogArticle[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getRelatedArticles(currentSlug: string, limit = 3): BlogArticle[] {
  const current = blogArticles.find((a) => a.slug === currentSlug);
  if (!current) return getAllArticles().slice(0, limit);

  return getAllArticles()
    .filter((a) => a.slug !== currentSlug)
    .sort((a, b) => {
      // Prioritize same category, then shared tags
      const aScore =
        (a.category === current.category ? 10 : 0) +
        a.tags.filter((t) => current.tags.includes(t)).length;
      const bScore =
        (b.category === current.category ? 10 : 0) +
        b.tags.filter((t) => current.tags.includes(t)).length;
      return bScore - aScore;
    })
    .slice(0, limit);
}

/**
 * Keyword Cannibalization Audit
 * Call before writing a new article to check for conflicts.
 */
export function auditKeyword(newKeyword: string): {
  conflict: boolean;
  conflictingArticles: BlogArticle[];
} {
  const normalized = newKeyword.toLowerCase().trim();
  const conflicting = blogArticles.filter((a) => {
    const target = a.targetKeyword.toLowerCase();
    const secondaries = (a.secondaryKeywords || []).map((k) => k.toLowerCase());
    return (
      target === normalized ||
      target.includes(normalized) ||
      normalized.includes(target) ||
      secondaries.some((s) => s === normalized || s.includes(normalized) || normalized.includes(s))
    );
  });
  return { conflict: conflicting.length > 0, conflictingArticles: conflicting };
}
`.trimStart());

// ============================================================
// 2. Shared Blog Components
// ============================================================

// --- ReadingProgress ---
ensure('src/components/blog/ReadingProgress.tsx', `
'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = document.getElementById('article-content');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      setProgress(Math.min(100, Math.max(0, (scrolled / total) * 100)));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent">
      <div
        className="h-full bg-[#DAA745] transition-[width] duration-150 ease-out"
        style={{ width: \`\${progress}%\` }}
      />
    </div>
  );
}
`.trimStart());

// --- TableOfContents ---
ensure('src/components/blog/TableOfContents.tsx', `
'use client';

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface Props {
  items: TOCItem[];
}

export default function TableOfContents({ items }: Props) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <p className="text-xs font-medium text-[#8B95A5] uppercase tracking-wider mb-4">
        In this article
      </p>
      <ul className="space-y-1 border-l border-[#3A4250]/20">
        {items.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={\`#\${id}\`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={\`block py-1.5 text-sm transition-colors duration-200 border-l-2 -ml-[1px] \${
                level === 3 ? 'pl-8' : 'pl-4'
              } \${
                activeId === id
                  ? 'border-[#DAA745] text-[#DAA745] font-medium'
                  : 'border-transparent text-[#8B95A5] hover:text-[#F2F0ED] hover:border-[#8B95A5]'
              }\`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
`.trimStart());

// --- AuthorCard ---
ensure('src/components/blog/AuthorCard.tsx', `
import Link from 'next/link';

interface Props {
  name: string;
  url: string;
  publishDate: string;
  updatedDate?: string;
  readingTime: number;
}

export default function AuthorCard({ name, url, publishDate, updatedDate, readingTime }: Props) {
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex items-center gap-4 py-4">
      {/* Avatar placeholder — replace with real photo */}
      <div className="w-11 h-11 rounded-full bg-[#3A4250] flex items-center justify-center text-[#DAA745] font-semibold text-sm shrink-0">
        {name.split(' ').map((n) => n[0]).join('')}
      </div>
      <div className="text-sm">
        <Link href={url} className="font-medium text-[#F2F0ED] hover:text-[#DAA745] transition-colors">
          {name}
        </Link>
        <div className="text-[#8B95A5] flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5">
          <time dateTime={publishDate}>{formatDate(publishDate)}</time>
          {updatedDate && (
            <span className="text-xs">(Updated {formatDate(updatedDate)})</span>
          )}
          <span>{readingTime} min read</span>
        </div>
      </div>
    </div>
  );
}
`.trimStart());

// --- RelatedPosts ---
ensure('src/components/blog/RelatedPosts.tsx', `
import Link from 'next/link';
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
            href={\`/blog/\${article.slug}\`}
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
`.trimStart());

// --- BlogCTA ---
ensure('src/components/blog/BlogCTA.tsx', `
'use client';

import { useQuote } from '@/lib/QuoteContext';

interface Props {
  title?: string;
  description?: string;
}

export default function BlogCTA({
  title = 'Need Custom Glass for Your Project?',
  description = 'Get a free quote from our engineering team. We\\'ll help you choose the right glass type, thickness, and coating for your specific requirements.',
}: Props) {
  const { openQuote } = useQuote();

  return (
    <section className="my-16 bg-gradient-to-br from-[#3A4250] to-[#1C1F26] rounded-xl p-8 md:p-12 border border-[#DAA745]/20">
      <div className="max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#F2F0ED] mb-3">
          {title}
        </h2>
        <p className="text-[#8B95A5] mb-6 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={openQuote}
            className="px-6 py-3 bg-[#DAA745] text-[#1C1F26] font-medium rounded-lg hover:bg-[#DAA745]/90 transition-colors"
          >
            Request a Quote
          </button>
          <a
            href="https://wa.me/8613487671210"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-[#8B95A5]/30 text-[#F2F0ED] rounded-lg hover:border-[#DAA745]/50 hover:text-[#DAA745] transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
`.trimStart());

// --- BlogCard (for listing page) ---
ensure('src/components/blog/BlogCard.tsx', `
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
        href={\`/blog/\${article.slug}\`}
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
          <span className="absolute top-4 left-4 text-xs bg-[#DAA745] text-[#1C1F26] px-3 py-1.5 rounded font-medium">
            Featured
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
      href={\`/blog/\${article.slug}\`}
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
`.trimStart());

// ============================================================
// 3. Blog Article Layout — wrapper for every article page
// ============================================================
ensure('src/components/blog/BlogArticleLayout.tsx', `
import type { Metadata } from 'next';
import type { BlogArticle } from '@/lib/blog-registry';
import { getRelatedArticles } from '@/lib/blog-registry';
import ReadingProgress from './ReadingProgress';
import TableOfContents from './TableOfContents';
import AuthorCard from './AuthorCard';
import RelatedPosts from './RelatedPosts';
import BlogCTA from './BlogCTA';

export interface TOCItem {
  id: string;
  text: string;
  level: number; // 2 or 3
}

interface Props {
  article: BlogArticle;
  toc: TOCItem[];
  children: React.ReactNode;
  /** Optional custom CTA props */
  ctaTitle?: string;
  ctaDescription?: string;
}

/** Generates Next.js Metadata for the article page */
export function generateArticleMetadata(article: BlogArticle): Metadata {
  return {
    title: \`\${article.title} | Sincere Glass Blog\`,
    description: article.excerpt,
    keywords: [article.targetKeyword, ...(article.secondaryKeywords || []), ...article.tags],
    authors: [{ name: article.author.name, url: article.author.url }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishDate,
      modifiedTime: article.updatedDate || article.publishDate,
      authors: [article.author.name],
      images: article.heroImage ? [{ url: article.heroImage, alt: article.heroImageAlt }] : [],
    },
  };
}

/** Generates Article + FAQ structured data */
export function articleJsonLd(article: BlogArticle, faqItems?: { q: string; a: string }[]) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.heroImage,
    datePublished: article.publishDate,
    dateModified: article.updatedDate || article.publishDate,
    author: {
      '@type': 'Person',
      name: article.author.name,
      url: article.author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sincere Glass',
      url: 'https://sincereglass.com',
    },
  };

  const schemas: object[] = [articleSchema];

  if (faqItems && faqItems.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
  }

  return schemas;
}

export default function BlogArticleLayout({
  article,
  toc,
  children,
  ctaTitle,
  ctaDescription,
}: Props) {
  const related = getRelatedArticles(article.slug);

  return (
    <>
      <ReadingProgress />

      {/* Hero */}
      <section className="relative bg-[#1C1F26] pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 text-sm mb-6">
            <a href="/blog" className="text-[#8B95A5] hover:text-[#DAA745] transition-colors">
              Blog
            </a>
            <span className="text-[#8B95A5]/40">/</span>
            <span className="text-[#DAA745]">{article.category}</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#F2F0ED] leading-tight mb-6">
            {article.title}
          </h1>

          <p className="text-lg text-[#8B95A5] leading-relaxed max-w-3xl mb-6">
            {article.excerpt}
          </p>

          <AuthorCard
            name={article.author.name}
            url={article.author.url}
            publishDate={article.publishDate}
            updatedDate={article.updatedDate}
            readingTime={article.readingTime}
          />
        </div>

        {/* Hero image */}
        {article.heroImage && (
          <div className="max-w-5xl mx-auto px-6 mt-10">
            <div className="aspect-[21/9] rounded-xl overflow-hidden bg-[#3A4250]/30">
              <img
                src={article.heroImage}
                alt={article.heroImageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </section>

      {/* Content + TOC */}
      <section className="bg-[#1C1F26] pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
            {/* Article body */}
            <article
              id="article-content"
              className="max-w-4xl prose-custom"
            >
              {children}

              <BlogCTA title={ctaTitle} description={ctaDescription} />
            </article>

            {/* Sidebar — TOC */}
            <aside className="hidden lg:block">
              <TableOfContents items={toc} />
            </aside>
          </div>

          <RelatedPosts articles={related} />
        </div>
      </section>
    </>
  );
}
`.trimStart());

// ============================================================
// 4. Reusable Content Block Components (for articles)
// ============================================================

ensure('src/components/blog/blocks/ComparisonTable.tsx', `
interface Row {
  property: string;
  values: string[];
  highlight?: number; // index of the "best" column
}

interface Props {
  headers: string[];
  rows: Row[];
  caption?: string;
}

export default function ComparisonTable({ headers, rows, caption }: Props) {
  return (
    <div className="my-10 overflow-x-auto -mx-6 px-6">
      <table className="w-full border-collapse text-sm">
        {caption && (
          <caption className="text-left text-[#8B95A5] text-xs mb-3">{caption}</caption>
        )}
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className={\`text-left py-3 px-4 font-medium text-[#F2F0ED] border-b border-[#3A4250]/40 \${
                  i === 0 ? 'bg-transparent' : 'bg-[#3A4250]/10'
                }\`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-[#3A4250]/20 last:border-0">
              <td className="py-3 px-4 text-[#8B95A5] font-medium">{row.property}</td>
              {row.values.map((v, vi) => (
                <td
                  key={vi}
                  className={\`py-3 px-4 \${
                    row.highlight === vi
                      ? 'text-[#DAA745] font-medium'
                      : 'text-[#F2F0ED]/80'
                  }\`}
                >
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
`.trimStart());

ensure('src/components/blog/blocks/ProcessFlow.tsx', `
'use client';

interface Step {
  title: string;
  description: string;
  icon?: string; // emoji or short label
}

interface Props {
  title?: string;
  steps: Step[];
}

export default function ProcessFlow({ title, steps }: Props) {
  return (
    <div className="my-10 py-8 px-6 bg-[#3A4250]/10 rounded-xl border border-[#3A4250]/20">
      {title && (
        <h3 className="text-lg font-semibold text-[#F2F0ED] mb-6">{title}</h3>
      )}
      <div className="relative">
        {/* Connector line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-px bg-[#DAA745]/20 hidden md:block" />

        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 md:gap-6 items-start">
              <div className="w-10 h-10 rounded-full bg-[#DAA745]/10 border border-[#DAA745]/30 flex items-center justify-center shrink-0 text-sm font-semibold text-[#DAA745] relative z-10">
                {step.icon || i + 1}
              </div>
              <div className="pt-1.5">
                <h4 className="font-medium text-[#F2F0ED] mb-1">{step.title}</h4>
                <p className="text-sm text-[#8B95A5] leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`.trimStart());

ensure('src/components/blog/blocks/DataHighlight.tsx', `
interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

interface Props {
  stats: Stat[];
}

export default function DataHighlight({ stats }: Props) {
  return (
    <div className="my-10 grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-[#3A4250]/15 rounded-lg p-5 text-center border border-[#3A4250]/20"
        >
          <div className="text-3xl font-bold text-[#DAA745] mb-1">
            {stat.value}
            {stat.suffix && <span className="text-lg ml-0.5">{stat.suffix}</span>}
          </div>
          <div className="text-xs text-[#8B95A5]">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
`.trimStart());

ensure('src/components/blog/blocks/TechNote.tsx', `
interface Props {
  type?: 'tip' | 'warning' | 'note';
  title?: string;
  children: React.ReactNode;
}

const STYLES = {
  tip: { border: 'border-[#DAA745]/30', bg: 'bg-[#DAA745]/5', icon: '💡', defaultTitle: 'Pro Tip' },
  warning: { border: 'border-red-500/30', bg: 'bg-red-500/5', icon: '⚠️', defaultTitle: 'Important' },
  note: { border: 'border-[#8B95A5]/30', bg: 'bg-[#8B95A5]/5', icon: '📌', defaultTitle: 'Note' },
};

export default function TechNote({ type = 'note', title, children }: Props) {
  const s = STYLES[type];
  return (
    <div className={\`my-8 rounded-lg border \${s.border} \${s.bg} p-5\`}>
      <div className="flex items-center gap-2 mb-2 text-sm font-medium text-[#F2F0ED]">
        <span>{s.icon}</span>
        <span>{title || s.defaultTitle}</span>
      </div>
      <div className="text-sm text-[#8B95A5] leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
`.trimStart());

ensure('src/components/blog/blocks/FAQ.tsx', `
'use client';

import { useState } from 'react';

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  items: FAQItem[];
  title?: string;
}

export default function FAQ({ items, title = 'Frequently Asked Questions' }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="my-12">
      <h2 id="faq" className="text-2xl font-semibold text-[#F2F0ED] mb-6">{title}</h2>
      <div className="space-y-3">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="border border-[#3A4250]/30 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-[#3A4250]/10 transition-colors"
              >
                <span className="font-medium text-[#F2F0ED] pr-4">{item.q}</span>
                <svg
                  className={\`w-5 h-5 text-[#8B95A5] shrink-0 transition-transform duration-200 \${isOpen ? 'rotate-180' : ''}\`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={\`overflow-hidden transition-all duration-200 \${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }\`}
              >
                <p className="px-5 pb-5 text-[#8B95A5] leading-relaxed">{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
`.trimStart());

// Content blocks barrel export
ensure('src/components/blog/blocks/index.ts', `
export { default as ComparisonTable } from './ComparisonTable';
export { default as ProcessFlow } from './ProcessFlow';
export { default as DataHighlight } from './DataHighlight';
export { default as TechNote } from './TechNote';
export { default as FAQ } from './FAQ';
`.trimStart());

// ============================================================
// 5. Blog Listing Page
// ============================================================
ensure('src/app/blog/page.tsx', `
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
`.trimStart());

// ============================================================
// 6. Article prose styling (add to globals.css)
// ============================================================
ensure('src/styles/blog-prose.css', `
/* Blog article prose styling
 * Import this in globals.css: @import './blog-prose.css';
 * Applied via className="prose-custom" on article wrapper
 */

.prose-custom {
  color: #c8c8cc;
  font-size: 1.0625rem;
  line-height: 1.8;
}

.prose-custom h2 {
  color: #F2F0ED;
  font-size: 1.625rem;
  font-weight: 600;
  margin-top: 3rem;
  margin-bottom: 1rem;
  line-height: 1.3;
  scroll-margin-top: 5rem;
}

.prose-custom h3 {
  color: #F2F0ED;
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  line-height: 1.4;
  scroll-margin-top: 5rem;
}

.prose-custom p {
  margin-bottom: 1.25rem;
}

.prose-custom a {
  color: #DAA745;
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: opacity 0.15s;
}

.prose-custom a:hover {
  opacity: 0.8;
}

.prose-custom strong {
  color: #F2F0ED;
  font-weight: 600;
}

.prose-custom ul,
.prose-custom ol {
  margin: 1.25rem 0;
  padding-left: 1.5rem;
}

.prose-custom li {
  margin-bottom: 0.5rem;
}

.prose-custom ul li::marker {
  color: #DAA745;
}

.prose-custom ol li::marker {
  color: #DAA745;
  font-weight: 600;
}

.prose-custom blockquote {
  border-left: 3px solid #DAA745;
  padding-left: 1.25rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #8B95A5;
}

.prose-custom img {
  border-radius: 0.5rem;
  margin: 2rem 0;
  max-width: 100%;
}

.prose-custom hr {
  border: none;
  border-top: 1px solid #3A4250;
  margin: 2.5rem 0;
}

.prose-custom code {
  background: #3A4250/20;
  padding: 0.15em 0.4em;
  border-radius: 0.25rem;
  font-size: 0.9em;
  color: #DAA745;
}
`.trimStart());

// ============================================================
// 7. Updated BlogTeaser for homepage
// ============================================================
ensure('src/components/BlogTeaserLive.tsx', `
/**
 * BlogTeaserLive — homepage blog teaser that reads from blog-registry.
 * 
 * Replace your existing BlogTeaser import in the homepage with this component.
 * If no articles are published yet, it shows a placeholder state.
 */

import Link from 'next/link';
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
                href={\`/blog/\${article.slug}\`}
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
`.trimStart());

// ============================================================
// 8. Header nav update reminder
// ============================================================

console.log('');
console.log('━'.repeat(60));
console.log('✅ Blog infrastructure created successfully!');
console.log('━'.repeat(60));
console.log('');
console.log('Files created:');
console.log('  src/lib/blog-registry.ts');
console.log('  src/components/blog/ReadingProgress.tsx');
console.log('  src/components/blog/TableOfContents.tsx');
console.log('  src/components/blog/AuthorCard.tsx');
console.log('  src/components/blog/RelatedPosts.tsx');
console.log('  src/components/blog/BlogCTA.tsx');
console.log('  src/components/blog/BlogCard.tsx');
console.log('  src/components/blog/BlogArticleLayout.tsx');
console.log('  src/components/blog/blocks/ComparisonTable.tsx');
console.log('  src/components/blog/blocks/ProcessFlow.tsx');
console.log('  src/components/blog/blocks/DataHighlight.tsx');
console.log('  src/components/blog/blocks/TechNote.tsx');
console.log('  src/components/blog/blocks/FAQ.tsx');
console.log('  src/components/blog/blocks/index.ts');
console.log('  src/app/blog/page.tsx');
console.log('  src/styles/blog-prose.css');
console.log('  src/components/BlogTeaserLive.tsx');
console.log('');
console.log('Manual steps needed:');
console.log('');
console.log('1. Add to globals.css (top):');
console.log("   @import '../styles/blog-prose.css';");
console.log('');
console.log('2. In homepage, replace BlogTeaser import:');
console.log("   - import BlogTeaser from '@/components/BlogTeaser';");
console.log("   + import BlogTeaserLive from '@/components/BlogTeaserLive';");
console.log('   and update <BlogTeaser /> → <BlogTeaserLive />');
console.log('');
console.log('3. In Header/nav, add Blog link: /blog');
console.log('');
console.log('━'.repeat(60));
console.log('Ready! Push to GitHub → Vercel auto-deploys.');
console.log("Then give me a keyword and I'll write the first article.");
console.log('━'.repeat(60));
