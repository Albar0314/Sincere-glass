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
    title?: string;   // v2: shown in AuthorBioBox
    bio?: string;     // v2: short bio paragraph for AuthorBioBox
    image?: string;   // v2: path under /public, e.g. /images/author-images.jpg
  };
  // --- SOP v2 fields ---
  /** Technical reviewer, shown as "Reviewed by:" in AuthorBioBox */
  reviewedBy?: { name: string; title?: string };
  /** 3-5 key takeaways rendered as a TLDRBox at top of article */
  tldr?: string[];
  /** Buyer-intent FAQ (MOQ / shipping / cert); separate from spec FAQ */
  buyerFaq?: Array<{ q: string; a: string }>;
  /** Product slugs to render in RelatedProductsCards at end of article */
  relatedProductSlugs?: string[];
  /** Article type — drives component template selection */
  articleType?: 'comparison' | 'technical' | 'buyer-guide' | 'case-study';
  /** Topic cluster this article belongs to — drives breadcrumb hierarchy + listing filters */
  cluster: BlogCluster;
  /** Translation slug map for hreflang. Add entries when translations publish. */
  translations?: Partial<Record<'es' | 'de' | 'ar' | 'fr' | 'ru', string>>;
  /** Changelog entries, shown at end of article in "Updated on" block */
  changelog?: Array<{ date: string; note: string }>;
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

// ─── Topic Clusters (URL stays flat; hierarchy via breadcrumbs only) ────────
export type BlogCluster =
  | 'comparison'      // Glass Comparisons — tempered vs laminated, etc.
  | 'technical'       // Technical Guides — manufacturing, specs, standards
  | 'application'     // Applications — curtain wall, shower, skylight
  | 'buyer-guide'     // Buyer's Guide — sourcing, MOQ, logistics, certs
  | 'product';        // Product Deep Dives — long-tail product keywords

export const CLUSTER_LABELS: Record<BlogCluster, string> = {
  comparison: 'Glass Comparisons',
  technical: 'Technical Guides',
  application: 'Applications',
  'buyer-guide': "Buyer's Guide",
  product: 'Product Deep Dives',
};

/** Cluster descriptions — used in future Pillar Pages and meta descriptions */
export const CLUSTER_DESCRIPTIONS: Record<BlogCluster, string> = {
  comparison: 'Side-by-side comparisons of architectural glass types to help you choose the right product for your project.',
  technical: 'In-depth technical articles on glass manufacturing processes, standards, and specifications.',
  application: 'How different glass types perform in real-world architectural applications.',
  'buyer-guide': 'Practical guides for sourcing, importing, and specifying architectural glass from China.',
  product: 'Detailed product guides covering specifications, pricing, and selection criteria.',
};

// Default author per project preferences
export const DEFAULT_AUTHOR = {
  name: 'Li Cheng',
  url: 'https://sincereglass.com/about',
  title: 'CEO at Sincere Glass',
  bio: 'CEO at Sincere Glass (\u6b23\u57ce\u73bb\u7483) with 10+ years in architectural glass. Oversees production and quality at our 20,000 m\u00b2 Wuhan facility.',
  image: '/images/author-images.jpg',
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
  {
    slug: 'tempered-glass-vs-laminated-glass',
    title: 'Tempered Glass vs Laminated Glass: 7 Differences Buyers Must Know',
    excerpt: 'Compare breakage patterns, strength, cost, UV and sound performance side by side. Includes interactive visuals, an application decision matrix, and buyer procurement FAQ from a glass manufacturer.',
    targetKeyword: 'tempered glass vs laminated glass',
    secondaryKeywords: [
      'tempered vs laminated glass',
      'difference between tempered and laminated glass',
      'toughened glass vs laminated glass',
      'tempered laminated glass',
      'safety glass comparison',
    ],
    publishDate: '2026-10-06',
    updatedDate: '2026-10-07',
    category: 'Buyer Guide' as const,
    tags: ['tempered glass', 'laminated glass', 'safety glass', 'glass comparison', 'building glass', 'architectural glass'],
    heroImage: '/images/blog/tempered-vs-laminated-hero.jpg',
    heroImageAlt: 'Tempered glass and laminated glass cross-section comparison showing breakage patterns',
    heroImagePrompt: 'Professional product photography: two pieces of safety glass side by side on a clean light grey surface. Left: tempered glass with small cuboid fragments scattered showing breakage pattern. Right: laminated glass with spider-web crack pattern, all fragments bonded by visible PVB interlayer. Soft studio lighting from above-left, shallow depth of field on cross-sections. Neutral greys, warm amber accent light. 30-degree elevated angle. No text, no people. 4K photorealistic.',
    author: DEFAULT_AUTHOR,
    readingTime: 14,
    featured: true,
    // SOP v2 fields
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'comparison' as const,
    cluster: 'comparison',
    relatedProductSlugs: ['tempered-glass', 'laminated-glass', 'insulated-glass'],
    translations: {},
    changelog: [
      { date: '2026-10-06', note: 'Initial publish' },
      { date: '2026-10-07', note: 'SOP v2 rewrite: factory POV, standards citations, buyer FAQ, lead magnet CTA, related products' },
    ],
  },
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
