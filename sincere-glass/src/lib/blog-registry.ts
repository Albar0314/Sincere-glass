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

  {
    slug: 'how-is-tempered-glass-made',
    title: "How Is Tempered Glass Made? A Factory-Floor Walk-Through of the 7-Phase Production Line",
    excerpt: "Not a textbook explanation. A production-floor walk-through: cutting tolerances, edge micro-cracks, 620°C furnace, the 15-second quench that locks in 4-5× strength, and the NiS risk nobody talks about. Written from a working Wuhan tempering line.",
    targetKeyword: 'how is tempered glass made',
    secondaryKeywords: ['tempered glass manufacturing process', 'how tempered glass is made', 'tempered glass production', 'glass tempering process'],
    searchKeywords: [
      'how is tempered glass made', 'tempered glass manufacturing',
      'glass tempering process', 'how to temper glass', 'tempered glass production line',
      'glass quenching process', 'glass heat treatment', 'glass furnace tempering',
      'tempering furnace', 'quench', 'surface compressive stress', 'NiS inclusion',
      '钢化玻璃生产', '钢化玻璃工艺', '玻璃钢化流程', '玻璃淬火',
    ],
    publishDate: '2026-10-07',
    updatedDate: '2026-10-07',
    category: 'Technical Guide' as const,
    tags: ['tempered glass', 'manufacturing', 'glass tempering', 'production process', 'quality control'],
    heroImage: '/images/blog/how-tempered-glass-made-hero.webp',
    heroImageAlt: 'Industrial glass tempering furnace with glowing orange glass panels passing through on ceramic rollers, viewed from the operator side',
    heroImagePrompt: 'Industrial photography inside a modern glass tempering furnace. A large architectural glass panel (approximately 2m x 3m) glowing orange-red at ~620°C passing through a horizontal roller-hearth furnace on ceramic rollers, captured mid-production. Furnace interior with visible heating elements glowing deep red above and below the glass. Industrial lighting with warm amber glow from the furnace heat spilling onto adjacent dark machinery and concrete floor. 25-degree camera angle from the operator viewing window, shallow depth of field focused on the glowing glass panel. Realistic factory environment, visible safety barriers, no humans in frame. Dramatic contrast between the molten-looking orange glass and the surrounding dark industrial machinery. 4K photorealistic, documentary-style, no text or watermarks.',
    author: DEFAULT_AUTHOR,
    readingTime: 14,
    featured: false,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'technical' as const,
    cluster: 'technical',
    relatedProductSlugs: ['tempered-glass', 'laminated-glass', 'low-e-glass'],
    translations: {},
    changelog: [
      { date: '2026-10-07', note: 'Initial publish — first article in Technical Guides cluster' },
    ],
  },

  {
    slug: 'how-is-laminated-glass-made',
    title: "How Is Laminated Glass Made? Inside the Autoclave That Chemically Fuses Glass to PVB",
    excerpt: "Not just 'two panes with plastic between.' A factory walk-through of the lamination autoclave cycle: 140°C, 12 bar, 2.5 hours — plus the PVB vs SGP decision, dust-free assembly, and the defects nobody writes about.",
    targetKeyword: 'how is laminated glass made',
    secondaryKeywords: ['laminated glass manufacturing process', 'how laminated glass is made', 'laminated glass production', 'glass lamination process'],
    searchKeywords: [
      'how is laminated glass made', 'laminated glass manufacturing',
      'glass lamination process', 'how to laminate glass', 'laminated glass production line',
      'autoclave lamination', 'PVB lamination', 'SGP lamination',
      'autoclave', 'PVB', 'SGP', 'SentryGlas', 'EVA interlayer', 'acoustic PVB',
      '夹胶玻璃生产', '夹胶玻璃工艺', '玻璃夹胶流程', 'PVB夹胶',
    ],
    publishDate: '2026-10-07',
    updatedDate: '2026-10-07',
    category: 'Technical Guide' as const,
    tags: ['laminated glass', 'manufacturing', 'autoclave', 'PVB', 'SGP', 'production process'],
    heroImage: '/images/blog/how-laminated-glass-made-hero.webp',
    heroImageAlt: 'Industrial glass lamination autoclave with large laminated glass panels being loaded into the cylindrical pressure vessel, viewed from the loading end',
    heroImagePrompt: 'Industrial photography of a glass lamination autoclave facility. A large cylindrical autoclave (approximately 3m diameter, 15m long) in a modern factory, cylindrical door open at the loading end revealing a stack of multi-layer architectural glass panels on a loading rack ready to enter. The glass panels show the characteristic translucent PVB interlayer sandwich (3 layers: glass + PVB + glass) with slight blue-green tint. Industrial lighting from overhead fluorescents mixing with warm amber accent lighting on the autoclave shell. Visible pressure gauges, control panel, and safety barriers in the frame. 20-degree camera angle from the operator viewing position, shallow depth of field focused on the open autoclave door and loaded panels. Clean industrial environment, no humans in frame. 4K photorealistic, documentary-style, no text or watermarks.',
    author: DEFAULT_AUTHOR,
    readingTime: 15,
    featured: false,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'technical' as const,
    cluster: 'technical',
    relatedProductSlugs: ['laminated-glass', 'tempered-glass', 'insulated-glass'],
    translations: {},
    changelog: [
      { date: '2026-10-07', note: 'Initial publish — second article in Technical Guides cluster' },
    ],
  },

  {
    slug: 'how-is-insulated-glass-made',
    title: "How Is Insulated Glass Made? Inside the 25-Year Sealed System That Cuts Heat Loss by 70%",
    excerpt: "An IGU is not just two panes with a gap. Five components, 8 assembly stations, dual-seal chemistry, argon fill mechanics, and the QC tests that separate a 30-year unit from a 10-year failure. Factory walk-through from Wuhan.",
    targetKeyword: 'how is insulated glass made',
    secondaryKeywords: ['insulated glass manufacturing', 'IGU production process', 'how insulated glass is made', 'double glazing production', 'insulated glass assembly'],
    searchKeywords: [
      'how is insulated glass made', 'insulated glass manufacturing', 'IGU production',
      'double glazing production', 'IGU assembly', 'insulated glass unit production',
      'how to make IGU', 'argon fill IGU', 'warm edge spacer', 'IGU dual seal',
      'IGU', 'DGU', 'spacer bar', 'desiccant', 'PIB', 'silicone secondary seal',
      '中空玻璃生产', '中空玻璃工艺', '中空玻璃组装', '氩气填充',
    ],
    publishDate: '2026-10-07',
    updatedDate: '2026-10-07',
    category: 'Technical Guide' as const,
    tags: ['insulated glass', 'IGU', 'manufacturing', 'argon fill', 'warm-edge spacer', 'production process'],
    heroImage: '/images/blog/how-insulated-glass-made-hero.webp',
    heroImageAlt: 'Industrial insulated glass unit assembly line showing a large IGU being sealed with argon gas injection and dual seal application',
    heroImagePrompt: 'Industrial photography of a modern automated insulated glass unit (IGU) production line. Center frame: a large architectural glass panel (approximately 2m x 3m) with visible aluminum spacer bar being assembled into a sealed IGU. Fine jets of argon gas filling the cavity between two glass lites, with black butyl primary seal visible along the edges and silicone secondary seal being applied by robotic arm. Background: continuous production line with multiple IGU panels at various stations. Industrial lighting from overhead with warm amber accent lighting on the glass creating subtle reflections. 25-degree camera angle from the operator viewing position, shallow depth of field focused on the central panel. Clean modern factory environment, visible safety barriers, pressure gauges, and gas supply lines. No humans in frame. 4K photorealistic, documentary-style, no text or watermarks.',
    author: DEFAULT_AUTHOR,
    readingTime: 16,
    featured: false,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'technical' as const,
    cluster: 'technical',
    relatedProductSlugs: ['insulated-glass', 'low-e-glass', 'laminated-glass'],
    translations: {},
    changelog: [
      { date: '2026-10-07', note: 'Initial publish — third article in Technical Guides cluster (unlocks Pillar)' },
    ],
  },

  {
    slug: 'architectural-glass-manufacturing-guide',
    title: "Architectural Glass Manufacturing: The Complete Buyer's Process Guide",
    excerpt: "Three fabrication processes — tempering, lamination, IGU assembly — convert raw annealed glass into every architectural product. A buyer's map to which process creates what, which supplier capabilities matter, and how to audit a factory properly.",
    targetKeyword: 'architectural glass manufacturing process',
    secondaryKeywords: ['glass manufacturing process', 'how is architectural glass made', 'glass fabrication process', 'glass production processes', 'architectural glass fabrication'],
    searchKeywords: [
      'architectural glass manufacturing', 'glass manufacturing process',
      'glass fabrication', 'glass production processes', 'how is glass made',
      'tempering lamination IGU', 'glass processing', 'glass factory process',
      'tempering', 'lamination', 'IGU assembly', 'autoclave', 'glass furnace',
      'glass pillar guide', 'glass manufacturing hub',
      '建筑玻璃生产', '建筑玻璃工艺', '玻璃深加工', '玻璃制造流程',
    ],
    publishDate: '2026-10-07',
    updatedDate: '2026-10-07',
    category: 'Technical Guide' as const,
    tags: ['architectural glass', 'manufacturing', 'tempering', 'lamination', 'IGU', 'pillar page', 'supplier audit'],
    heroImage: '/images/blog/architectural-glass-manufacturing-hero.webp',
    heroImageAlt: 'Modern architectural glass factory interior showing three parallel production lines: tempering furnace, lamination autoclave, and IGU assembly line, with large glass panels at various production stages',
    heroImagePrompt: 'Wide-angle industrial photography of a modern architectural glass factory interior. Three distinct production lines visible in parallel: left side a horizontal tempering furnace with a glowing orange glass panel inside visible through the operator window, center a large cylindrical lamination autoclave (door open, racked laminated panels inside with visible translucent PVB interlayer), right side an IGU assembly station with a technician robot arm applying silicone secondary seal to an insulated glass unit. High ceiling with industrial lighting, polished concrete floor, visible safety barriers and overhead crane rails. Warm amber accent lighting from the tempering furnace glow pooling on nearby surfaces. 20-degree camera angle from a mezzanine viewing position, deep depth of field showing all three lines in focus. Clean modern factory environment, no humans in frame. 4K photorealistic, documentary-style, no text or watermarks.',
    author: DEFAULT_AUTHOR,
    readingTime: 17,
    featured: true,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'buyer-guide' as const,
    cluster: 'technical',
    isPillar: true,
    relatedProductSlugs: ['tempered-glass', 'laminated-glass', 'insulated-glass', 'low-e-glass', 'enameled-glass'],
    translations: {},
    changelog: [
      { date: '2026-10-07', note: 'Initial publish — Pillar Page for Technical Guides cluster' },
    ],
  },

  {
    slug: 'curtain-wall-glass-specification',
    title: "Curtain Wall Glass Specification: Build-ups, Codes, and the 4 Objectives Every Spec Must Satisfy",
    excerpt: "The 4 objectives of curtain wall glass (safety, thermal, wind load, acoustic), 4 typical build-ups from basic to hurricane-rated, regional code requirements across IBC/EN/GB/AS, and the procurement pitfalls that create expensive problems later.",
    targetKeyword: 'curtain wall glass specification',
    secondaryKeywords: ['curtain wall glass', 'glass for curtain wall', 'curtain wall glazing', 'facade glass specification', 'curtain wall glass types'],
    searchKeywords: [
      'curtain wall glass', 'curtain wall glass specification', 'glass for curtain wall',
      'curtain wall glazing', 'facade glass', 'curtain wall glass types', 'facade glass specification',
      'curtain wall IGU', 'curtain wall laminated glass', 'high-rise glass spec',
      'curtain wall', 'facade', 'Low-E IGU', 'laminated IGU', 'SGP curtain wall',
      '幕墙玻璃', '幕墙玻璃规格', '建筑幕墙玻璃', '幕墙玻璃选型', '幕墙中空玻璃',
    ],
    publishDate: '2026-10-07',
    updatedDate: '2026-10-07',
    category: 'Buyer Guide' as const,
    tags: ['curtain wall', 'facade glass', 'specification', 'IGU', 'laminated glass', 'building codes'],
    heroImage: '/images/blog/curtain-wall-glass-hero.webp',
    heroImageAlt: 'Modern high-rise commercial building facade with curtain wall glass system showing uniform reflective glass panels and aluminum framing against blue sky',
    heroImagePrompt: 'Professional architectural photography of a modern commercial high-rise building facade featuring a glass curtain wall system. Clean geometric pattern of large rectangular glass panels (approximately 1.5m x 3m each) held in slim aluminum framing. The glass has a subtle blue-green reflective tint from Low-E coating, reflecting partial sky and adjacent buildings. 25-degree upward camera angle capturing the facade from street level, with the building extending beyond the frame upward. Clear blue sky background with soft afternoon sunlight creating warm reflections on the glass. Clean modern architecture, no cluttered background elements, no visible humans or vehicles. Shallow depth of field focused on the mid-facade panels. 4K photorealistic, documentary architectural photography style, no text or watermarks.',
    author: DEFAULT_AUTHOR,
    readingTime: 16,
    featured: false,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'buyer-guide' as const,
    cluster: 'application',
    relatedProductSlugs: ['insulated-glass', 'laminated-glass', 'tempered-glass', 'low-e-glass', 'enameled-glass'],
    translations: {},
    changelog: [
      { date: '2026-10-07', note: 'Initial publish — first article in Application cluster' },
    ],
  },
  {
    slug: 'shower-glass-thickness-guide',
    title: "Shower Glass Thickness Guide: 5, 8, 10 or 12 mm — Which Is Right for Your Enclosure?",
    excerpt: "Four variables decide shower glass thickness: support type, use case, panel geometry, and local code. Interactive selector, hardware-load math, and the global code map (CPSC / EN / GB / AS) in one factory-floor guide.",
    targetKeyword: 'shower glass thickness guide',
    secondaryKeywords: ['shower door glass thickness', 'frameless shower glass thickness', '10mm vs 12mm shower glass', 'shower enclosure glass thickness', 'how thick should shower glass be'],
    searchKeywords: [
      'shower glass thickness', 'shower door thickness', 'frameless shower glass thickness',
      '10mm vs 12mm shower glass', 'how thick should shower glass be', 'shower enclosure glass',
      'walk-in shower glass thickness', 'tempered shower door glass',
      'CPSC 1201', 'EN 14428', 'GB 15763.2', 'AS 1288', 'tempered glass', 'safety glazing',
      '淋浴房玻璃厚度', '淋浴玻璃', '钢化淋浴房', '无框淋浴房 厚度',
    ],
    publishDate: '2026-10-12',
    updatedDate: '2026-10-12',
    category: 'Buyer Guide' as const,
    tags: ['shower glass', 'tempered glass', 'safety glass', 'frameless shower', 'bathroom glass', 'glass specification'],
    heroImage: '/images/blog/shower-glass-thickness-hero.webp',
    heroImageAlt: 'Frameless 10mm clear tempered shower enclosure with brass hinges, warm bathroom lighting, showing the typical panel geometry of a residential walk-in shower',
    heroImagePrompt: 'Professional architectural interior photography of a modern luxury bathroom featuring a frameless walk-in shower enclosure. 10 mm clear tempered glass panels, approximately 2000 mm tall × 900 mm wide, held by brushed brass wall-mounted clamps and a single pivot hinge on the door. Edge of the glass visible showing the characteristic clean polished arris. Warm bathroom lighting from a wall sconce creates soft reflections and highlights the glass thickness at the edge. Background: matte beige large-format porcelain tile walls, polished brass fixtures, a floor-standing rainfall shower head. 30-degree camera angle from the bathroom entrance, shallow depth of field focused on the glass edge and hinge detail. No humans in frame. Clean neutral palette with warm amber accent lighting matching Sincere Glass brand (dark #1C1F26, amber #DAA745 undertones). 4K photorealistic, architectural digest style, no text or watermarks.',
    author: DEFAULT_AUTHOR,
    readingTime: 15,
    featured: false,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'buyer-guide' as const,
    cluster: 'application',
    relatedProductSlugs: ['tempered-glass', 'laminated-glass', 'low-e-glass'],
    translations: {},
    changelog: [
      { date: '2026-10-12', note: 'Initial publish — second article in Application cluster' },
    ],
  },

  {
    slug: 'balustrade-glass-specification',
    title: 'Balustrade Glass Specification: Loads, Build-ups, and the Pendulum Test That Decides the Spec',
    excerpt: "Balustrade glass is not specified by thickness — it is specified by load case and failure behaviour. The 4 load inputs, 3 real-world build-ups (monolithic / PVB / SGP), EN 12600 impact classes, and the hardware decisions that quietly drive the glass make-up. Factory-perspective guide from a Wuhan laminating line.",
    targetKeyword: 'balustrade glass specification',
    secondaryKeywords: [
      'glass balustrade specification',
      'glass balustrade thickness',
      'glass railing specification',
      'balcony glass specification',
      'frameless glass balustrade',
      'laminated glass balustrade',
    ],
    searchKeywords: [
      'balustrade glass', 'balustrade glass specification', 'glass balustrade',
      'glass railing specification', 'glass guard specification',
      'frameless glass balustrade', 'laminated glass balustrade',
      'balcony glass thickness', 'glass railing thickness',
      'EN 12600', 'EN 1991-1-1', 'ASCE 7', 'IBC 2407', 'AS 1288', 'GB 50210',
      'SGP SentryGlas', 'PVB laminated', 'pendulum impact test',
      '栏杆玻璃', '玻璃栏杆', '阳台玻璃栏杆', '夹胶玻璃栏板', '栏板玻璃',
    ],
    publishDate: '2026-10-12',
    updatedDate: '2026-10-12',
    category: 'Buyer Guide' as const,
    tags: ['balustrade', 'glass railing', 'laminated glass', 'tempered glass', 'SGP', 'EN 12600', 'building codes', 'application'],
    heroImage: '/images/blog/balustrade-glass-hero.webp',
    heroImageAlt: 'Modern frameless glass balustrade on a commercial mezzanine with slim base-shoe mounting and continuous laminated panels',
    heroImagePrompt: 'Professional architectural photography of a modern commercial mezzanine with a frameless glass balustrade. Four large laminated glass panels (approximately 1.5m wide by 1.1m high each) mounted in a continuous slim stainless-steel base shoe, no top-rail, creating an uninterrupted glass guard along the mezzanine edge. The glass has a subtle greenish tint from the SGP interlayer visible at the laminated edge seam. Polished concrete floor on the mezzanine side, visible atrium drop beyond the glass showing a clean modern commercial interior with warm wood accents. 25-degree camera angle looking along the balustrade run with shallow depth of field focused on the mid-panel, mounting hardware visible but understated. Soft daylight from an atrium skylight above casting cool natural light on the glass with warm amber accent lighting on nearby surfaces. Clean modern architecture, no humans in frame, no cluttered background elements, no text or watermarks. 4K photorealistic, architectural documentary style.',
    author: DEFAULT_AUTHOR,
    readingTime: 15,
    featured: false,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'buyer-guide' as const,
    cluster: 'application' as const,
    relatedProductSlugs: ['laminated-glass', 'tempered-glass', 'insulated-glass'],
    tldr: [
      'Balustrade glass is specified by load case, not thickness. The four inputs are: horizontal line load (kN/m), concentrated point load, infill area load, and soft-body impact class (EN 12600).',
      'Framed and frameless balustrades are different structural problems. Frameless makes the glass a cantilever and roughly doubles the required thickness.',
      'Monolithic tempered is now restricted in most codes for guard duty. The default commercial build-up is 8+1.52+8 PVB (framed) or 10+1.52+10 SGP (frameless).',
      'EN 12600 Class 1(B)1 — 1200 mm pendulum drop — is required for frameless or public-access balustrades. Class 2(B)2 (450 mm) is the residential minimum.',
      'Mounting hardware drives the glass spec. Base shoe allows the thinnest viable build-up; standoff fittings and spigots step the glass up one notch.',
      'Heat-soaked (EN 14179) tempered is non-optional for balustrade work. The ~15% cost premium eliminates spontaneous NiS failure after installation.',
    ],
    buyerFaq: [
      {
        q: "What's the typical MOQ for custom balustrade glass orders?",
        a: 'Our standard MOQ for laminated tempered balustrade glass is 100 m² per order, or roughly 60 panels at typical 1.5 m × 1.1 m dimensions. For specialty build-ups (SGP interlayer, jumbo sizes above 3 m, custom coloured interlayer) MOQ steps up to 200 m². We quote smaller runs case-by-case, especially for repeat projects.',
      },
      {
        q: 'How long does a balustrade glass order take from PO to shipment?',
        a: 'Standard build-ups ship in 25–35 days from PO. Heat-soaked tempered laminated with PVB: 30 days. SGP laminated: 35–40 days (SGP interlayer has a slightly longer autoclave cycle and is sometimes stock-limited). Jumbo sizes above 3 m: add 7–10 days for scheduling the jumbo line. Sea freight to EU/US/AU adds 25–40 days depending on route.',
      },
      {
        q: 'What test certificates do you provide with balustrade glass shipments?',
        a: 'Every shipment includes mill test certificates for the base glass, EN 12150 or ASTM C1048 tempering certificates with surface compressive stress values, EN 12600 or equivalent pendulum impact test reports for the specific build-up, EN 14179 heat-soak test certificates when specified, and SGP/PVB interlayer MSDS and performance datasheets. For EU shipments we provide CE marking documentation per EN 14449.',
      },
    ],
    translations: {},
    changelog: [
      { date: '2026-10-12', note: 'Initial publish — third article in Application cluster, unlocks Pillar eligibility' },
    ],
  },

  {
    slug: 'architectural-glass-applications-guide',
    title: "Architectural Glass Applications: The Complete Buyer's Zone Guide",
    excerpt: "Six application zones cover 95% of commercial glazing — facade, interior, balustrade, shower, skylight, floor. Each has its own code, its own loads, its own default build-up. Interactive building explorer, decoded glazing schedule, and the zone-by-product decision matrix.",
    targetKeyword: 'architectural glass applications',
    secondaryKeywords: [
      'glass by application',
      'glass selection by application',
      'architectural glazing applications',
      'glass application guide',
      'glazing applications guide',
    ],
    searchKeywords: [
      'architectural glass applications', 'glass applications', 'glazing applications',
      'glass by application', 'glass selection by application',
      'application pillar guide', 'glass zone guide',
      'glazing schedule', 'glass spec sheet', 'glass application matrix',
      'facade glass', 'balustrade glass', 'shower glass', 'skylight glass', 'interior glass',
      'glass floor', 'glass stair', 'IGU facade', 'laminated balustrade',
      '建筑玻璃应用', '建筑玻璃选型', '幕墙 栏杆 淋浴 天窗', '玻璃应用场景', '按应用选玻璃',
    ],
    publishDate: '2026-10-12',
    updatedDate: '2026-10-12',
    category: 'Buyer Guide' as const,
    tags: ['pillar', 'architectural glass', 'applications', 'facade', 'balustrade', 'shower', 'skylight', 'glazing schedule', 'specification'],
    heroImage: '/images/blog/architectural-glass-applications-hero.webp',
    heroImageAlt: 'Modern mixed-use commercial building interior cutaway showing six distinct glass application zones — curtain wall facade, interior glass partition, atrium balustrade, shower enclosure, overhead skylight, and glass floor landing — in one unified architectural scene',
    heroImagePrompt: 'Wide-angle architectural illustration photograph of a modern mixed-use commercial building interior, cutaway cross-section view showing six distinct glass application zones in one scene: a floor-to-ceiling curtain wall facade on the far left reflecting cool daylight, an interior glass office partition center-left with subtle acoustic laminated edge visible, a frameless glass atrium balustrade with slim stainless base shoe center-right overlooking a lower atrium level, a frameless shower enclosure visible through an open bathroom door on the right, a geometric glass skylight overhead casting patterned light, and a small structural glass stair tread visible in the lower right. Clean modern architecture with polished concrete floors, warm wood accents, exposed structural steel. Each glass zone has subtle warm amber highlight showing its position. 25-degree camera angle with deep depth of field, cinematic daylight from the skylight above mixing with warm interior lighting. No humans in frame, no cluttered details, no text or watermarks. 4K photorealistic, museum-exhibit quality, documentary architectural style.',
    author: DEFAULT_AUTHOR,
    readingTime: 16,
    featured: true,
    isPillar: true,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'buyer-guide' as const,
    cluster: 'application' as const,
    relatedProductSlugs: ['tempered-glass', 'laminated-glass', 'insulated-glass', 'low-e-glass', 'enameled-glass'],
    tldr: [
      'Specify glass by application zone, not by product. Each of the six zones (facade / interior / balustrade / shower / skylight / floor) has its own code, loads, and default build-up.',
      'A glazing schedule compresses an entire specification into one line of notation. Reading it correctly — especially the surface number (#2 vs #3) and interlayer type (PVB vs SGP) — is where most specification errors hide.',
      'The decision flows in one direction: application → loads → required failure mode → build-up → certification. Starting from a product and working backward produces over-engineered facades and under-engineered balustrades.',
      'Tempered monolithic is restricted or forbidden in most life-safety applications (balustrade, skylight, floor) because it offers zero post-breakage retention. The shower is the one zone where it dominates.',
      'IGU and Low-E IGU dominate facade and overhead zones but are explicitly inappropriate for balustrade, shower, and floor applications. Any "IGU" outside facade/overhead is a probable specification error.',
      'One project typically has 3–5 distinct glass marks. A single "project glass" is almost always wrong — it either over-specifies partitions or under-specifies safety-critical zones.',
    ],
    buyerFaq: [
      {
        q: 'Can one factory supply all glass marks on a project, or do I need multiple vendors?',
        a: 'We can supply all five families (tempered, laminated, IGU, Low-E IGU, enameled) from the Wuhan plant for any project where the dimensions and quantities meet MOQ. The advantage of single-source is consistent certification paperwork, matched glass tint across marks (small colour differences between batches become visible when panels are adjacent), and consolidated shipping. For projects below 300 m² total, single-source is almost always more economical than multi-vendor.',
      },
      {
        q: 'What is the fastest turnaround for a mixed-mark project?',
        a: 'A typical project with 4-5 marks totalling 500–1500 m² ships 35–45 days from PO with full certification paperwork. Facade IGU and balustrade laminated are the critical-path items because they require the IGU line and the autoclave respectively — both operate on scheduled cycles. Shower and partition tempered run on the tempering line directly and are rarely the bottleneck. Sea freight to EU/US/AU adds 25–40 days.',
      },
      {
        q: 'Can you work from an architect's drawing set directly, or do you need a glass schedule?',
        a: 'Both. Our estimating team routinely reads full drawing sets (plans, sections, elevations) and extracts a glass schedule when the architect has not provided one — this is included in the quote process for projects over 500 m². For smaller projects we ask for the schedule or a filled-in RFQ template; working from scratch for small volumes delays the quote by 2-3 days.',
      },
    ],
    translations: {},
    changelog: [
      { date: '2026-10-12', note: 'Initial pillar publish — Application cluster Pillar Page, completing the three-pillar architecture (Types / Manufacturing / Applications)' },
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
