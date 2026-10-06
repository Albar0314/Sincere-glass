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
