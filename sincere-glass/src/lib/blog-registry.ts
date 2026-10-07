export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  targetKeyword: string;
  secondaryKeywords?: string[];
  /** Synonyms, abbreviations, CN translations — powers fuzzy search */
  searchKeywords: string[];
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
  /** Pillar Page: hub article linking to all sub-articles in its cluster */
  isPillar?: boolean;
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
    searchKeywords: ['tempered vs laminated', 'tempered or laminated', 'safety glass comparison', 'laminated vs tempered', 'glass selection', 'glass types', 'PVB vs tempered', 'breakage pattern', 'safety glazing', 'facade glass', '钢化 夹胶', '安全玻璃 对比', '钢化玻璃 夹胶玻璃', '玻璃选型'],
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

  {
    slug: 'insulated-glass-vs-laminated-glass',
    title: 'Insulated Glass vs Laminated Glass: Which One Does Your Project Actually Need?',
    excerpt: 'IGU for thermal insulation. Laminated for safety and sound. Pick by scenario (not by spec sheet) with 5 buyer archetypes, performance radar comparison, and cost reality from a Wuhan factory.',
    targetKeyword: 'insulated glass vs laminated glass',
    secondaryKeywords: ['IGU vs laminated glass', 'laminated vs insulated', 'double glazing vs laminated', 'IG vs PVB glass'],
    searchKeywords: [
      'insulated vs laminated', 'laminated vs insulated', 'IGU vs laminated',
      'IG vs laminated', 'double glazing vs laminated', 'thermal vs acoustic glass',
      'IGU', 'PVB', 'SGP', 'U-value', 'STC', 'Low-E', 'argon fill',
      '中空玻璃 夹胶玻璃', '中空 夹胶 对比', '隔音 隔热 玻璃', '玻璃选型 中空 夹胶',
    ],
    publishDate: '2026-10-07',
    updatedDate: '2026-10-07',
    category: 'Buyer Guide' as const,
    tags: ['insulated glass', 'laminated glass', 'IGU', 'PVB', 'acoustic glass', 'thermal performance'],
    heroImage: '/images/blog/insulated-vs-laminated-hero.webp',
    heroImageAlt: 'Side-by-side cross-section comparison: insulated glass unit with argon gap vs laminated glass with PVB interlayer',
    heroImagePrompt: 'Studio product photography, two architectural glass samples side by side on polished dark concrete surface. Left: insulated glass unit cross-section showing two glass panes separated by a visible aluminum spacer with argon-gap, Low-E coating gives subtle gold tint to inner surface. Right: laminated glass cross-section showing two glass panes bonded by thin translucent PVB interlayer with one small spider-web crack held in place by the interlayer. 45-degree camera angle, soft daylight from above-left, shallow depth of field. Neutral grey and warm amber accent lighting. No text, no humans, 4K photorealistic, museum-exhibit quality.',
    author: DEFAULT_AUTHOR,
    readingTime: 11,
    featured: false,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'comparison' as const,
    cluster: 'comparison',
    relatedProductSlugs: ['insulated-glass', 'laminated-glass', 'low-e-glass'],
    translations: {},
    changelog: [
      { date: '2026-10-07', note: 'Initial publish' },
    ],
  },

  {
    slug: 'tempered-glass-vs-annealed-glass',
    title: "Tempered Glass vs Annealed Glass: Why 'Regular' Glass Isn't Safe Enough for Most Modern Buildings",
    excerpt: "Annealed is the raw float glass; tempered is annealed that's been heat-treated to 4-5× the strength with safe breakage. Here's where code forbids one and when annealed is still the right choice.",
    targetKeyword: 'tempered glass vs annealed glass',
    secondaryKeywords: ['annealed vs tempered glass', 'tempered vs regular glass', 'float glass vs tempered', 'what is annealed glass'],
    searchKeywords: [
      'tempered vs annealed', 'annealed vs tempered', 'tempered vs regular glass',
      'tempered vs float glass', 'what is annealed glass', 'is annealed glass safe',
      'float glass', 'annealed float', 'surface compressive stress',
      'GB 15763', 'ASTM C1048', 'EN 12150',
      '钢化玻璃 普通玻璃', '退火玻璃 钢化玻璃', '浮法玻璃 钢化', '安全玻璃 普通玻璃',
    ],
    publishDate: '2026-10-07',
    updatedDate: '2026-10-07',
    category: 'Buyer Guide' as const,
    tags: ['tempered glass', 'annealed glass', 'float glass', 'safety glazing', 'building codes'],
    heroImage: '/images/blog/tempered-vs-annealed-hero.webp',
    heroImageAlt: 'Side-by-side comparison of annealed glass with large dagger-shaped shards versus tempered glass with small cuboid granules after breakage',
    heroImagePrompt: 'Studio product photography, two broken architectural glass panels side by side on polished dark concrete surface. Left panel: 6mm annealed glass broken into large jagged dagger-shaped shards radiating from a center impact point, several pieces still standing upright, dangerous-looking sharp edges, muted blue-grey tone. Right panel: 6mm tempered glass broken into thousands of uniform small cuboid granules scattered like coarse salt or diced ice, warm amber under-lighting glowing through granule pile. 30-degree elevated camera angle, soft daylight from above-left, shallow depth of field. Clean neutral grey background, no humans, no text. 4K photorealistic, museum-exhibit quality, dramatic contrast between the two breakage patterns.',
    author: DEFAULT_AUTHOR,
    readingTime: 12,
    featured: false,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'comparison' as const,
    cluster: 'comparison',
    relatedProductSlugs: ['tempered-glass', 'laminated-glass', 'low-e-glass'],
    translations: {},
    changelog: [
      { date: '2026-10-07', note: 'Initial publish' },
    ],
  },

  {
    slug: 'architectural-glass-types-guide',
    title: "Architectural Glass Types: The Complete Buyer's Guide",
    excerpt: "Five families of architectural glass, nine products, one decision framework. Interactive selector finds the right glass for your project in 3 clicks — with deep-dive links to every comparison.",
    targetKeyword: 'architectural glass types',
    secondaryKeywords: ['types of architectural glass', 'glass selection guide', 'architectural glass buyer guide', 'how to choose architectural glass'],
    searchKeywords: [
      'architectural glass types', 'types of architectural glass', 'glass selection guide',
      'how to choose architectural glass', 'glass buyer guide', 'glass pillar guide',
      'architectural glass family', 'glass selection framework',
      'IGU', 'PVB', 'SGP', 'Low-E', 'tempered laminated insulated',
      '建筑玻璃分类', '建筑玻璃选型', '建筑玻璃种类', '玻璃选型指南', '玻璃产品分类',
    ],
    publishDate: '2026-10-07',
    updatedDate: '2026-10-07',
    category: 'Buyer Guide' as const,
    tags: ['pillar', 'architectural glass', 'buyer guide', 'glass selection', 'tempered', 'laminated', 'insulated', 'low-e'],
    heroImage: '/images/blog/architectural-glass-types-hero.webp',
    heroImageAlt: 'Five architectural glass samples arranged in a vertical stack — annealed, tempered, laminated, insulated, and Low-E — showing the family hierarchy of architectural glass products',
    heroImagePrompt: 'Studio product photography, five rectangular architectural glass samples arranged in an elegant vertical stack on polished dark concrete, each sample slightly offset for visibility. Top to bottom: 1) plain clear annealed glass, 2) tempered glass with subtle optical distortion visible at edges, 3) laminated glass with visible PVB interlayer line, 4) insulated glass unit with visible aluminum spacer and dual panes, 5) Low-E coated glass with faint iridescent coating sheen. Each sample has a small warm amber label number (1-5) visible. Soft warm daylight from above-left, deep shadows below each sample, shallow depth of field on the stack. Clean neutral grey background, no humans, no text other than the small numbers. 4K photorealistic, museum-exhibit quality, museum catalog aesthetic.',
    author: DEFAULT_AUTHOR,
    readingTime: 14,
    featured: true,
    isPillar: true,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'buyer-guide' as const,
    cluster: 'comparison',
    relatedProductSlugs: ['tempered-glass', 'laminated-glass', 'insulated-glass', 'low-e-glass', 'enameled-glass'],
    translations: {},
    changelog: [
      { date: '2026-10-07', note: 'Initial pillar publish' },
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
