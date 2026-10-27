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
        q: "Can you work from an architect's drawing set directly, or do you need a glass schedule?",
        a: 'Both. Our estimating team routinely reads full drawing sets (plans, sections, elevations) and extracts a glass schedule when the architect has not provided one — this is included in the quote process for projects over 500 m². For smaller projects we ask for the schedule or a filled-in RFQ template; working from scratch for small volumes delays the quote by 2-3 days.',
      },
    ],
    translations: {},
    changelog: [
      { date: '2026-10-12', note: 'Initial pillar publish — Application cluster Pillar Page, completing the three-pillar architecture (Types / Manufacturing / Applications)' },
    ],
  },

  {
    slug: "how-to-import-glass-from-china",
    title: "How to Import Architectural Glass from China: A Buyer's 5-Stage Playbook",
    excerpt: "The 5-stage import journey architects and glazing contractors actually run — supplier scorecard, Incoterms explorer, container load calculator, and a worked landed-cost build-up from an operating Wuhan factory.",
    targetKeyword: "how to import glass from China",
    secondaryKeywords: [
      "import glass from China",
      "China glass supplier verification",
      "architectural glass sourcing China",
      "China glass FOB CIF",
      "import tempered glass from China",
      "import laminated glass from China to US",
    ],
    searchKeywords: [
      "import glass from China", "how to import glass", "China glass supplier",
      "sourcing glass from China", "China glass factory", "glass procurement China",
      "import laminated glass from China to US", "import tempered glass from China",
      "FOB glass China", "CIF glass China", "DDP glass",
      "Incoterms 2020 glass", "VGM SOLAS glass", "glass container loading",
      "architectural glass import", "China glass MOQ", "China glass CCC verification",
      "进口中国玻璃", "中国玻璃供应商", "玻璃出口", "玻璃外贸", "幕墙玻璃采购",
    ],
    publishDate: "2026-10-13",
    updatedDate: "2026-10-13",
    category: "Buyer Guide",
    tags: ["buyer guide", "sourcing", "import", "Incoterms", "freight", "supplier verification", "China manufacturing"],
    heroImage: "/images/blog/how-to-import-glass-from-china-hero.webp",
    heroImageAlt: "A Chinese glass factory loading dock with a 20-foot shipping container being loaded with crated architectural glass panels destined for export",
    heroImagePrompt: "Industrial documentary photography of a modern Chinese architectural glass factory loading dock. Foreground: a 20-foot steel shipping container with its doors open, revealing standing A-frame crates holding large laminated and tempered glass panels (approximately 1.5m x 2.5m) carefully loaded with wooden dunnage and corner protectors visible, the glass showing subtle blue-green Low-E tint. A forklift with soft forks is positioned mid-loading, lifting an A-frame crate toward the container. Background: clean modern factory loading bay, polished concrete floor, 'EXPORT' zone markings, overhead gantry crane rails, late-afternoon warm amber sunlight pouring in from an open bay door creating long shadows. Visible shipping documents on a clipboard on a nearby pallet. 25-degree camera angle from behind the loading forklift. Shallow depth of field focused on the container doorway and crated glass inside. No humans in frame, no visible brand logos, no text or watermarks. 4K photorealistic, documentary industrial photography style, warm late-afternoon lighting with warm amber accents on the dark steel container.",
    author: DEFAULT_AUTHOR,
    readingTime: 18,
    featured: false,
    reviewedBy: { name: "Albar", title: "Technical Lead" },
    articleType: "buyer-guide" as const,
    cluster: "buyer-guide",
    relatedProductSlugs: ["tempered-glass", "laminated-glass", "insulated-glass", "low-e-glass"],
    translations: {},
    tldr: [
      "A direct China buy saves 30–50% vs local supply on orders above roughly 200 m² — below that threshold freight and clearance fixed costs eat the margin.",
      "The 5-stage journey: shortlist (3–5 vetted factories) → verify (credentials + sample + audit) → specify (unambiguous RFQ) → logistics (Incoterms + VGM) → QC (pre-shipment inspection + container loading).",
      "FOB is the right default Incoterm for most glass buyers; CIF buries freight you can't verify; DDP sounds attractive but is rarely well executed.",
      "A 20-foot container is the right choice for architectural glass: the limit is weight (~24 tonnes), not cube (33 m³) — a 40' HQ earns its place only when panels exceed ~2.6 m height.",
      "Worked example: 100 panels of 6-1.52-6 laminate (375 m²) land in Los Angeles at ~USD 34/m² all-in, versus ~USD 55–80/m² from a local distributor.",
    ],
    buyerFaq: [
      {
        q: "What does it typically cost to import laminated glass from China to the United States?",
        a: "A worked example: one 20-foot container of 6-1.52-6 clear laminated glass from Shanghai (approximately 375 m², or 100 panels of 1500×2500 mm) lands in Los Angeles at roughly USD 12,500–13,500 total — about USD 33–36 per m² delivered. The build-up: glass FOB (~USD 22/m²), ocean freight (~USD 2,400 per 20'), 4.9% MFN duty under HTSUS 7007, 0.3% marine insurance, customs broker and port fees, plus ~50-mile inland drayage. The same specification sourced from a US distributor typically runs USD 55–80 per m² delivered — a 40–55% delta that only scales above roughly 200 m² where freight and clearance fixed costs are absorbed. Verify current duty rates at hts.usitc.gov and get a live ocean freight quote before committing to a budget.",
      },
      {
        q: "What is the MOQ for architectural glass export orders from China?",
        a: "Most Chinese glass factories, Sincere Glass included, accept orders starting at one 20-foot container (approximately 200–400 m² depending on glass thickness and panel size). Below that volume, per-m² freight and clearance costs climb sharply and local supply usually wins. For specialty or small-batch orders, a trading company can consolidate but at a markup.",
      },
      {
        q: "What certifications do I need from a Chinese glass supplier for export shipments?",
        a: "The baseline is ISO 9001:2015 and the China 3C (CCC) certificate under GB 15763.2-2005 (tempered) or GB 15763.3-2009 (laminated). For Europe, you additionally need EN 12150-1:2015 and EN 14449:2005 test reports to support CE marking. For North America, ANSI Z97.1-2015 or CPSC 16 CFR 1201 test reports where safety-glazing categories apply. Always verify the certificate number on the issuing body's website rather than trusting a PDF.",
      },
      {
        q: "What is the typical lead time for a custom glass order from China?",
        a: "From our Wuhan plant, standard tempered glass runs 25–35 days from PO to ex-works ready. Laminated and Low-E coated glass runs 30–45 days because the coating lead time and interlayer cure window stack sequentially. Insulated glass units with Low-E are similar. Add 1–2 weeks for pre-shipment inspection and container loading, then transit time (18–35 days by sea depending on destination).",
      },
      {
        q: "What's the difference between FOB and CIF when quoting glass from China?",
        a: "FOB (Free On Board) means the seller gets the goods onto the vessel at a Chinese port; the buyer handles ocean freight, insurance, destination clearance and delivery. CIF (Cost, Insurance, Freight) adds ocean freight and minimum marine insurance to the seller's scope, through arrival at the destination port. Risk still transfers to the buyer at the Chinese port of loading under both — a common misunderstanding. FOB is the default for buyers with their own forwarder; CIF simplifies budgeting but can be more expensive than FOB plus independent freight.",
      },
      {
        q: "Can Sincere Glass ship DDP (duty paid) to my country?",
        a: "DDP service for architectural glass is possible for specific destinations but introduces significant risk the seller cannot always manage well — local permits, customs classification disputes, destination trucking variability. For most buyers we recommend FOB Shanghai or Ningbo with your preferred forwarder, or CIF to a named port if you want a landed-at-port number. We're happy to quote DDP for established destinations; email the contact page to request a specific lane.",
      },
      {
        q: "What payment terms should I expect from a Chinese glass factory?",
        a: "Industry norm for first orders is 30% T/T deposit on PO confirmation, 70% T/T balance against a copy of the bill of lading (or against pre-shipment inspection report, if third-party inspection is used). L/C at sight is accepted for larger orders. 100% advance payment is a red flag — a serious factory should not need it. For repeat business some suppliers extend to 20/80 or offer OA (open account) terms after 2–3 successful shipments.",
      },
    ],
    changelog: [
      { date: "2026-10-13", note: "Initial publish — first article in Buyer's Guide cluster. v1.1: SSR methodology shadow + table caption + US FAQ" },
    ],
  },

  {
    slug: 'glass-shipping-container-loading-guide',
    title: "Glass Container Shipping: The Factory Playbook for Crating, Loading, and Zero-Damage Delivery",
    excerpt: "The operational guide behind every architectural glass container we seal: 4 crate types, weight-vs-volume math, the 7-step loading protocol, the 6 damage zones to design against, FCL vs LCL, ICC marine insurance, HS codes, and the 5 pre-seal photos every buyer should demand.",
    targetKeyword: 'glass container shipping',
    secondaryKeywords: [
      'shipping glass in containers',
      'glass container loading',
      'glass container packaging',
      'glass FCL vs LCL',
      'how to ship glass from china',
      'glass sea freight packaging',
    ],
    searchKeywords: [
      'glass container shipping', 'shipping glass in containers', 'glass container loading',
      'glass FCL', 'glass LCL', 'how to ship glass from china', 'glass sea freight',
      'glass packaging export', 'glass crate types', 'A-frame glass crate',
      'L-type glass crate', 'glass container weight', '20DC glass', '40HQ glass',
      'ISPM-15', 'ICC A clause', 'marine insurance glass', 'HS code 7007', 'HS code 7008',
      '玻璃海运', '玻璃集装箱', '玻璃出口装柜', '玻璃海运包装',
    ],
    publishDate: '2026-10-14',
    updatedDate: '2026-10-14',
    category: 'Buyer Guide',
    tags: ['logistics', 'export packaging', 'container shipping', 'marine insurance', 'HS codes', 'buyer guide'],
    heroImage: '/images/blog/glass-shipping-container-loading-hero.webp',
    heroImageAlt: 'Open 40-foot high-cube shipping container at a dock showing vertically crated architectural glass panels secured with ratchet straps, moisture absorber bags visible near ceiling',
    heroImagePrompt: "Industrial dock photography, late afternoon: a 40-foot high-cube shipping container with its rear doors fully open, revealing custom-built wooden A-frame crates stacked vertically against both side walls, each crate holding large architectural glass panels wrapped in foam padding and translucent plastic sheeting. Yellow ratchet straps clearly visible securing crates to interior tie-down rails. White moisture-absorber bags hanging from ceiling tie-down loops near the top of the container. Warm amber-golden sunlight streaming in through the open doors, casting long directional light across the glass stack and polished concrete dock floor. Weathered concrete port apron, forklift tines partially visible on the lower-left edge, container number stencilled on door panel. 25-degree camera angle slightly below the container doorway looking in, deep depth of field showing crates in the front and the rear door frame simultaneously. Clean industrial dock environment, no humans in frame. 4K photorealistic, documentary logistics-photography style, no text on crates or overlays.",
    author: DEFAULT_AUTHOR,
    readingTime: 17,
    featured: false,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'buyer-guide' as const,
    cluster: 'buyer-guide',
    relatedProductSlugs: ['tempered-glass', 'laminated-glass', 'insulated-glass'],
    translations: {},
    changelog: [
      { date: '2026-10-14', note: 'Initial publish — Buyer-Guide cluster article 2 of 3 (Pillar activates at 3)' },
    ],
  },
  {
    slug: "architectural-glass-supplier-china-vetting",
    title: "How to Vet a China Glass Supplier: A 5-Risk Threat Model from the Factory Floor",
    excerpt: "The deep-dive playbook on supplier vetting: five independent risks, the free document checks that cost nothing, the 90-minute video audit script by station, the eight certifications decoded against their public registries, and the signals that are negotiable vs the ones to walk away from.",
    targetKeyword: "how to vet a china glass supplier",
    secondaryKeywords: [
      "china glass supplier audit",
      "vet glass manufacturer china",
      "glass factory audit checklist",
      "verify china glass factory",
      "chinese glass supplier verification",
    ],
    searchKeywords: [
      "how to vet a china glass supplier",
      "china glass supplier audit",
      "glass factory audit checklist",
      "verify china glass factory",
      "vet glass manufacturer china",
      "chinese glass supplier verification",
      "glass supplier vetting",
      "glass supplier due diligence",
      "pre-shipment inspection glass",
      "SGCC verification",
      "CNAS",
      "GSXT",
      "SGS CCIC BV",
      "DoP CE marking",
      "NANDO",
      "工厂审核",
      "玻璃厂验厂",
      "供应商审核清单",
      "营业执照查询",
      "企查查 天眼查",
    ],
    publishDate: "2026-10-15",
    updatedDate: "2026-10-15",
    category: "Buyer Guide",
    tags: [
      "supplier vetting",
      "china sourcing",
      "factory audit",
      "pre-shipment inspection",
      "certification verification",
      "GB 15763",
      "EN 12150",
      "CE marking",
      "ANSI Z97.1",
      "buyer guide",
    ],
    heroImage: "/images/blog/supplier-vetting-hero.webp",
    heroImageAlt: "A buyer on a video call conducting a live factory audit, laptop showing a split view of a Chinese glass tempering furnace line next to a vetting checklist, business licence document on the desk",
    heroImagePrompt: "Documentary photography, over-the-shoulder shot of a business buyer at a wooden office desk conducting a live video audit of a Chinese glass factory. Laptop screen fills the center of the frame showing a split view: left side a live video feed of a glass tempering furnace with glowing orange glass panels inside and a factory operator holding a smartphone camera, right side a digital checklist with checkboxes next to station names like 'cutting', 'tempering', 'IGU assembly'. On the desk next to the laptop: a printed business licence document, a notepad with handwritten notes, a coffee cup, and a smartphone showing a WhatsApp video call interface. Warm afternoon window light from the left casting soft shadows. Shallow depth of field focused on the laptop screen. Clean modern office setting, no identifying brand marks or logos. No humans in frame beyond the buyer's hands on the keyboard at the lower edge. 4K photorealistic, documentary journalism style, no text or watermarks beyond what appears naturally in the on-screen interfaces.",
    author: DEFAULT_AUTHOR,
    readingTime: 18,
    featured: false,
    reviewedBy: { name: "Albar", title: "Technical Lead" },
    articleType: "buyer-guide" as const,
    cluster: "buyer-guide",
    relatedProductSlugs: ["tempered-glass", "laminated-glass", "insulated-glass"],
    translations: {},
    changelog: [
      { date: "2026-10-15", note: "Initial publish — third article in Buyer-Guide cluster (unlocks Pillar activation)" },
    ],
  },


  {
    slug: 'architectural-glass-china-buyer-guide',
    title: "The China Architectural Glass Buyer Guide: Who, Why, and How to Source Right",
    excerpt: "A hub guide for buyers sourcing architectural glass from Chinese factories. Covers the 6-phase sourcing lifecycle, 4 buyer archetypes, honest landed-cost math, and the 5 risks first-time buyers underestimate. Links to the three deep-dive chapters on vetting, importing, and shipping.",
    targetKeyword: 'architectural glass china buyer guide',
    secondaryKeywords: [
      'buying architectural glass from china',
      'china glass sourcing guide',
      'how to buy glass from china manufacturer',
      'architectural glass procurement china',
      'china architectural glass sourcing',
    ],
    searchKeywords: [
      'architectural glass china buyer guide', 'china glass sourcing', 'buying glass from china',
      'how to source glass china', 'china architectural glass procurement',
      'buyer guide glass china', 'china glass factory buyer', 'importing glass china guide',
      'china glass supplier guide', 'glass sourcing hub china',
      '中国建筑玻璃采购', '从中国采购玻璃', '中国玻璃厂采购指南', '中国建筑玻璃供应商选择',
      'FOB', 'IGU', 'landed cost', 'HS code glass',
    ],
    publishDate: '2026-10-19',
    updatedDate: '2026-10-19',
    category: 'Buyer Guide',
    tags: ['pillar', 'buyer guide', 'china sourcing', 'architectural glass', 'sourcing lifecycle', 'landed cost', 'supplier vetting'],
    heroImage: '/images/blog/architectural-glass-china-buyer-guide-hero.webp',
    heroImageAlt: "A buyer's desk with an architectural glass sample, a shipping container drawing, a RFQ document, and a pen — overview of the China sourcing process",
    heroImagePrompt: "Professional editorial photography, overhead flat-lay on a dark wood desk. Composition includes: (1) a small rectangular architectural glass sample with visible Low-E coating sheen in the top-left, (2) a half-unfolded technical drawing of a 40-foot shipping container with glass crates stacked inside in the top-right, (3) a RFQ specification document with legible headings like 'Make-up', 'Standards', 'Lead time' in the center, (4) a dark fountain pen diagonally resting across the RFQ, (5) a small Chinese business card with a factory logo partially tucked under the drawing in the bottom-right. Warm amber desk lamp light from above-left casting soft long shadows. Rich dark wood texture with subtle grain. Shallow depth of field focused on the center RFQ document. Muted palette with warm amber accents. Documentary editorial aesthetic. No visible text other than the generic specification headings. 4K photorealistic.",
    author: DEFAULT_AUTHOR,
    readingTime: 20,
    featured: true,
    isPillar: true,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'buyer-guide',
    cluster: 'buyer-guide',
    relatedProductSlugs: ['tempered-glass', 'laminated-glass', 'insulated-glass', 'low-e-glass', 'enameled-glass'],
    translations: {},
    changelog: [
      { date: '2026-10-19', note: 'Initial publish — Pillar Page for Buyer-Guide cluster (hub for #13 import, #14 shipping, #15 vetting)' },
    ],
  },
  {
    slug: '12mm-tempered-glass-specifications',
    title: "12mm Tempered Glass: Specifications, Panel Limits, and When It's the Right Choice",
    excerpt: "Why 12mm is the specification sweet spot for frameless balustrades, long-span canopies, and large-area storefronts \u2014 plus panel-size limits, thickness tolerance, edge options, and the cost factors buyers rarely see on a quotation.",
    targetKeyword: '12mm tempered glass',
    secondaryKeywords: ['12mm toughened glass', '12mm tempered glass specifications', '12mm tempered glass max size', '12mm tempered glass price', '12mm safety glass'],
    searchKeywords: [
      '12mm tempered', '12mm tempered glass', '12mm toughened glass', '1/2 inch tempered glass',
      '12mm safety glass', '12 mm tempered', 'half inch tempered',
      'tempered glass thickness', 'tempered glass panel size', 'tempered balustrade glass',
      'GB 15763.2', 'ASTM C1048', 'EN 12150', 'ANSI Z97.1',
      '12\u6beb\u7c73\u94a2\u5316\u73bb\u7483', '12mm\u94a2\u5316\u73bb\u7483', '12\u539a\u94a2\u5316', '\u680f\u6746\u94a2\u5316\u73bb\u7483', '\u94a2\u5316\u539a\u5ea6'
    ],
    publishDate: '2026-10-20',
    updatedDate: '2026-10-20',
    category: 'Product Knowledge' as const,
    tags: ['tempered glass', '12mm', 'specifications', 'balustrade', 'storefront', 'product deep dive'],
    heroImage: '/images/blog/12mm-tempered-glass-hero.webp',
    heroImageAlt: 'Stack of 12mm tempered glass panels on a factory handling frame with cut edges clearly visible showing the exact thickness',
    heroImagePrompt: "Industrial photography of a vertical stack of 12mm tempered architectural glass panels mounted on a steel handling frame inside a modern glass factory. Panels are approximately 2m x 3m, visibly 12mm thick on the exposed edges, with clear factory-fresh float-glass tint. Soft overhead industrial lighting with warm amber accent light pooling on the top edges revealing the exact thickness. Shallow depth of field focused on the exposed stack edges where thickness is visible. Clean neutral grey concrete floor, a dark painted steel A-frame holding the panels upright. 25-degree camera angle from the handling bay. No humans in frame, no visible text or branding. 4K photorealistic, documentary industrial style.",
    author: DEFAULT_AUTHOR,
    readingTime: 14,
    featured: false,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'buyer-guide' as const,
    cluster: 'product',
    relatedProductSlugs: ['tempered-glass', 'laminated-glass', 'low-e-glass'],
    translations: {},
    changelog: [
      { date: '2026-10-20', note: 'Initial publish \u2014 first article in Product Deep Dives cluster' },
    ],
  },
  {
    slug: 'sgp-vs-pvb-interlayer-cost',
    title: "SGP vs PVB Interlayer Cost: When the Ionoplast Premium Pays Back (And When It Doesn't)",
    excerpt: "The interlayer alone is 15 to 40 percent of a laminated glass invoice. A factory-perspective guide to the real cost delta of SGP vs PVB, the performance SGP actually buys, the six specification scenarios we see most often, and a lifecycle ROI framework from a Wuhan laminating line.",
    targetKeyword: 'sgp vs pvb interlayer cost',
    secondaryKeywords: [
      'sgp vs pvb cost',
      'sgp interlayer price',
      'pvb vs sgp price difference',
      'ionoplast vs pvb cost',
      'sentryglas vs pvb cost',
      'when to use sgp instead of pvb',
    ],
    searchKeywords: [
      'sgp vs pvb cost', 'sgp interlayer price', 'pvb vs sgp price difference',
      'ionoplast vs pvb cost', 'sentryglas pvb comparison cost',
      'when to use sgp interlayer', 'sgp premium laminated glass',
      'SGP', 'PVB', 'SG', 'ionoplast', 'SentryGlas',
      'SGP\u5939\u5c42\u4ef7\u683c', 'PVB\u4e0eSGP\u6210\u672c'
    ],
    publishDate: '2026-10-21',
    updatedDate: '2026-10-21',
    category: 'Product Knowledge' as const,
    tags: ['laminated glass', 'SGP', 'PVB', 'interlayer', 'cost analysis', 'product deep dive', 'buyer guide'],
    heroImage: '/images/blog/sgp-vs-pvb-interlayer-cost-hero.webp',
    heroImageAlt: 'Macro split-screen comparison of PVB and SGP laminated glass edges showing the warm-amber PVB interlayer on the left and the crystal-clear SGP ionoplast interlayer on the right',
    heroImagePrompt: "Macro split-screen studio photography of two laminated glass edge samples standing on polished dark concrete surface. Left sample: 10mm+PVB+10mm laminated glass, edge-on view showing the characteristic warm-amber translucent PVB interlayer (0.76mm thick band) sandwiched between two clear glass panes, subtle optical warmth and slight visible flex at the interlayer line. Right sample: 10mm+SGP+10mm laminated glass, edge-on view showing the crystal-clear SGP ionoplast interlayer (1.52mm thick band), visually rigid structural lattice appearance, no amber tint. Both samples labelled with small discreet brass tag at the base reading just 'PVB' and 'SGP' in minimal serif font. Dark #1C1F26 background with warm #DAA745 amber rim lighting raking across the glass edges from the left, highlighting the interlayer bands. Shallow depth of field focused precisely on both interlayer bands simultaneously. 16:9 cinematic composition, 25-degree slight-above camera angle. No humans, no additional text, no brand logos. 4K photorealistic, museum-exhibit quality, documentary industrial photography style.",
    author: DEFAULT_AUTHOR,
    readingTime: 15,
    featured: false,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'buyer-guide' as const,
    cluster: 'product',
    relatedProductSlugs: ['laminated-glass', 'tempered-glass', 'insulated-glass'],
    tldr: [
      "On a 6-0.76-6 clear laminate, PVB is about 15 percent of FOB cost. Swap to 1.52 mm SGP and the interlayer jumps to 35-40 percent of the finished laminate.",
      "SGP buys three things PVB cannot deliver at any thickness: 100x the shear modulus (composite action), hours of post-breakage retention, and open-edge durability in humid climates.",
      "SGP is not an acoustic upgrade. Standard PVB outperforms SGP on STC at the same build-up; acoustic PVB beats both.",
      "Mix PVB and SGP in the same project. Facade IGUs and interior partitions: PVB. Balustrade, overhead, and open-edge details: SGP.",
      "Edge sealing, delamination remediation, and the hardware upside of thinner SGP build-ups are hidden cost lines that quietly swing lifecycle math.",
      "Decision rule: if the application is structural or safety-critical, or the edge is exposed, or the warranty is 10+ years, SGP wins on lifecycle cost even when PVB wins on day 0.",
    ],
    buyerFaq: [
      {
        q: "What is the MOQ for SGP vs PVB laminated glass export orders?",
        a: "Standard PVB laminated runs at 100 m2 MOQ. SGP is 200 m2 because the material is often stock-limited and the autoclave cycle is longer. Below those thresholds the per-m2 price steps up for both.",
      },
      {
        q: "How much longer is the lead time for an SGP order?",
        a: "Standard PVB ships 25-35 days from PO. SGP typically ships 35-45 days. The delta is driven by SGP material lead time at Kuraray or Trosifol plus the longer autoclave cycle. For time-critical orders we reserve the SGP material at PO signing.",
      },
      {
        q: "Can you supply both PVB and SGP marks under one PO?",
        a: "Yes. Most projects we ship include a mix. Consolidating under one supplier gets you matched glass tint across marks, consistent certification paperwork, and a single bill of lading. Mixing cost delta is marginal — the SGP marks carry their own cost; the PVB marks keep theirs.",
      },
      {
        q: "What certifications do you supply with SGP laminated glass?",
        a: "Mill test certificates for the base glass, EN 12150 or ASTM C1048 tempering reports with surface compressive stress values, EN 12600 pendulum impact test reports for the specific build-up, EN 14449 CE marking documentation for EU shipments, and the Kuraray or Trosifol interlayer certificate of analysis with batch traceability. Heat-soak (EN 14179) certificates when specified.",
      },
      {
        q: "How do I RFQ an SGP vs PVB cost comparison from your plant?",
        a: "Send the glass schedule with each mark's build-up (e.g. '10-1.52-10 tempered SGP') plus the quantities per mark. We return a line-by-line PVB and SGP comparison for marks where both are credible, so you see the real delta for your specific project rather than a generic index.",
      },
    ],
    translations: {},
    changelog: [
      { date: '2026-10-21', note: 'Initial publish — second article in Product Deep Dives cluster' },
    ],
  },
  {
    slug: 'jumbo-architectural-glass-panels',
    title: "Jumbo Architectural Glass Panels: Capability, Specs, and Sourcing for 3 m x 15 m Builds",
    excerpt: "Jumbo glass starts at the point most factories can't produce it. A capability-driven guide to the physical limits of oversized tempered, laminated, and insulated panels, the four hard gates that filter the global supplier set, the transport reality from port to crane, and the 10-field RFQ that stops a landmark facade from drifting over budget. Written from a Wuhan line that runs 3 m x 15 m tempering and dry-laminating daily.",
    targetKeyword: 'jumbo architectural glass panels',
    secondaryKeywords: [
      'oversized tempered glass',
      'large format glass panels',
      'jumbo tempered glass size',
      'maximum glass panel size',
      '3.3.3m x 15m glass',
      'oversized architectural glass',
    ],
    searchKeywords: [
      'jumbo glass', 'jumbo architectural glass', 'oversized glass panels',
      'oversized tempered glass', 'large format glass', 'maximum tempered glass size',
      'jumbo laminated glass', 'jumbo IGU', 'oversized IG unit',
      'jumbo furnace', 'large architectural glass panels',
      '3.3.3m x 15m glass', '3000 x 15000 mm glass', 'ultra-jumbo glass',
      '\u8d85\u5927\u73bb\u7483', '\u8d85\u5927\u5c3a\u5bf8\u94a2\u5316\u73bb\u7483',
      '\u5de8\u578b\u73bb\u7483\u5e55\u5899', '\u5f02\u578b\u8d85\u5927\u5939\u80f6\u73bb\u7483'
    ],
    publishDate: '2026-10-22',
    updatedDate: '2026-10-22',
    category: 'Product Knowledge' as const,
    tags: ['tempered glass', 'laminated glass', 'insulated glass', 'jumbo glass', 'oversized glass', 'procurement', 'product deep dive'],
    heroImage: '/images/blog/jumbo-architectural-glass-panels-hero.webp',
    heroImageAlt: 'Industrial photography of a 3 m by 15 m jumbo tempered architectural glass panel being lifted vertically by overhead crane rig from a jumbo tempering furnace in a modern factory',
    heroImagePrompt: "Wide-angle industrial photography inside a modern jumbo glass tempering plant. Centerpiece: a single 3 m x 15 m ultra-large tempered architectural glass panel suspended vertically by an overhead gantry crane with specialized vacuum-cup lifting rig gripping the top edge. Panel appears pristine with a subtle warm reflection catching rim-light from the still-visible furnace glow in the background. Scale is emphasized by a human-less environment with proportional industrial elements: the panel visibly reaches from near the polished concrete floor to several meters below the high factory ceiling. Behind the panel, the open end of a horizontal roller-hearth jumbo tempering furnace is visible, interior still radiating warm orange glow from heating elements. Overhead ceiling-mounted crane rail runs the full length of the frame. Industrial lighting with warm amber accent from the furnace creating subtle highlights across the glass surface and polished concrete floor. 25-degree camera angle from mezzanine viewing position, deep depth of field keeping both the panel and the furnace in focus. Clean modern factory environment, no humans in frame, no visible text or watermarks. 4K photorealistic, documentary industrial photography style, museum-exhibit quality lighting.",
    author: DEFAULT_AUTHOR,
    readingTime: 17,
    featured: false,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'buyer-guide' as const,
    cluster: 'product',
    relatedProductSlugs: ['tempered-glass', 'laminated-glass', 'insulated-glass'],
    tldr: [
      "Jumbo is not one threshold. Tempered mono jumps to jumbo past 2.6 x 5 m, laminated past 2.5 x 6 m, and sealed IGU past 2.5 x 4 m. Mix them at RFQ and get three different no answers.",
      "Four hard gates filter global jumbo capability: tempering furnace envelope, laminating autoclave, IG assembly line, and transport. Any single gate failing blocks the panel.",
      "The Sincere Wuhan envelope is 3 x 15 m tempering, 3 x 15 m dry-laminating autoclave, and 3 x 6 m sealed IG. Beyond 3 x 15 m, the global supplier count collapses to the low hundreds.",
      "Transport almost never bottlenecks jumbo. 40 ft high-cube handles up to 11.8 m longest side; flat rack covers 12 m; breakbulk handles the rest. Port handling and site crane access collapse projects first.",
      "Three failure modes become serious at jumbo scale: uneven quench thermal breakage, roller wave distortion, and delamination edge creep. Supplier quality systems that catch these are the ones that survive the warranty period.",
      "On RFQ, the five confirm-explicitly questions a jumbo-capable factory should answer in its first reply are the shortlist filter. A supplier who dodges question one is not jumbo-ready.",
    ],
    buyerFaq: [
      {
        q: "What is the MOQ for jumbo architectural glass export orders?",
        a: "Standard jumbo tempered monolithic MOQ is 50 m2 at our Wuhan plant. Jumbo laminated runs 100 m2 MOQ. Jumbo sealed IGU is 150 m2. Below those thresholds the per-m2 price steps up because jumbo-line setup and furnace-fill-factor costs cannot be amortized across the order.",
      },
      {
        q: "How long is lead time for jumbo tempered glass vs standard sizes?",
        a: "Standard-size tempered ships 25 to 35 days from PO. Jumbo tempered monolithic ships 8 to 10 weeks because jumbo furnace slot allocation is scheduled 4 to 6 weeks out. Jumbo laminated adds 2 to 3 weeks for the autoclave cycle and interlayer lead time. Jumbo IGU adds 1 to 2 weeks beyond that. For time-critical orders we reserve the jumbo-line slot at PO signing.",
      },
      {
        q: "Can you supply jumbo and standard-size panels under one PO?",
        a: "Yes, and we recommend it on mixed-bay projects. Jumbo panels for the landmark bays, standard-size panels for the regular bays, consolidated under one PO. You get matched glass tint across all marks, consistent certification paperwork, a single bill of lading, and often a materially lower blended per-m2 price than quoting the jumbo and standard panels to separate suppliers.",
      },
      {
        q: "What certifications do you supply with jumbo architectural glass?",
        a: "Mill test certificate for the base float glass, EN 12150 or ASTM C1048 tempering report with surface compressive stress values, EN 14179 heat-soak certificate (included by default on all jumbo tempered), EN 12543 or ASTM C1172 lamination certificate with Kuraray or Trosifol or Eastman interlayer batch traceability, EN 1279 IGU durability report with argon fill rate measurement, EN 14449 CE marking documentation for EU shipments. SGCC certification for US bid work on request.",
      },
      {
        q: "How do I RFQ jumbo glass from your plant?",
        a: "Use the RFQ builder in this article to generate a 10-field RFQ block, then send it to our export team at the address on our contact page. The 10 fields are the minimum we need to quote accurately; the five confirm-explicitly questions in the generated RFQ are the ones we answer in our first reply so you can shortlist us against other suppliers on equal information.",
      },
    ],
    translations: {},
    changelog: [
      { date: '2026-10-22', note: 'Initial publish \u2014 third article in Product Deep Dives cluster (activates Pillar threshold)' },
    ],
  },

  {
    slug: "architectural-glass-specification-guide",
    title: "Architectural Glass Specification: The Complete 6-Attribute Decision Guide",
    excerpt: "An architectural glass specification is six decisions, not one: substrate, processing, thickness, assembly, coating, and panel size. The pillar guide to writing specs that quote in one working day, with glass-code conventions, capability envelopes, and the five pitfalls that cost real money.",
    targetKeyword: "architectural glass specification",
    secondaryKeywords: [
      "how to specify architectural glass",
      "architectural glass spec sheet",
      "glass specification guide",
      "architectural glass specifications",
      "custom architectural glass specification",
    ],
    searchKeywords: [
      "architectural glass specification",
      "architectural glass spec",
      "how to specify glass",
      "glass spec sheet",
      "glass specification template",
      "architectural glass RFQ",
      "glass code",
      "glass makeup code",
      "glass stackup",
      "specification pillar",
      "6T+12A+6T Low-E",
      "SGP PVB IGU specification",
      "architectural glass tolerance",
      "glass surface position",
      "Low-E#2 Low-E#3",
      "GB 15763 EN 12150 ASTM E1300",
      "glass specification jurisdiction",
      "glass specification capability envelope",
      "custom architectural glass",
      "architectural glass procurement",
      "jumbo panel specification",
      "glass specification pitfalls",
      "glass specification checklist",
      "glass takeoff schedule",
      "glazing schedule",
      "\u5efa\u7b51\u73bb\u7483 \u89c4\u683c\u4e66",
      "\u73bb\u7483 \u89c4\u683c \u6307\u5357",
      "\u73bb\u7483 \u89c4\u683c \u6a21\u677f",
      "\u73bb\u7483 \u914d\u7f6e \u7f16\u7801",
      "\u73bb\u7483 \u89c4\u683c \u8bbe\u8ba1",
    ],
    publishDate: "2026-10-23",
    updatedDate: "2026-10-23",
    category: "Product Knowledge",
    tags: [
      "pillar",
      "architectural glass",
      "specification",
      "glass codes",
      "capability envelope",
      "product deep dives",
      "procurement",
    ],
    heroImage: "/images/blog/architectural-glass-specification-hero.webp",
    heroImageAlt: "Flat-lay of a glass specification schedule document with DWG shop drawings and six physical glass samples arranged in a decision-tree layout, representing the six-attribute architectural glass specification framework",
    heroImagePrompt: "Overhead flat-lay professional architectural photography on a polished dark concrete surface. Center: an open specification schedule document with a visible glass takeoff table showing codes like 6T+12A(Ar)+6T Low-E#2 printed in clean serif typography, partially covered by a translucent architect trace with handwritten revision marks in warm amber ink. Around the document, six physical architectural glass samples (approximately 100 x 150 mm each) arranged in a loose semicircle: clear annealed float, tempered with subtle optical distortion, laminated with visible PVB interlayer line, insulated glass unit cross-section with aluminum spacer visible, Low-E coated with faint iridescent sheen, ceramic frit enameled in warm bronze. Supporting props: a rolled DWG drawing, a wooden folding ruler extended to 1200 mm, a pair of brass drafting compasses, a cup of black coffee. Soft diffuse daylight from the top-left casting long gentle shadows at a 20-degree angle. Shallow depth of field focused on the central specification document. Neutral grey and dark concrete palette with the warm amber ink and the amber Low-E sheen as the only chromatic accents. No humans, no text other than the specification document itself. 4K photorealistic, museum catalog aesthetic, documentary architectural photography style.",
    author: DEFAULT_AUTHOR,
    readingTime: 17,
    featured: true,
    isPillar: true,
    reviewedBy: { name: "Albar", title: "Technical Lead" },
    articleType: "buyer-guide",
    cluster: "product",
    relatedProductSlugs: ["tempered-glass", "laminated-glass", "insulated-glass", "low-e-glass", "enameled-glass"],
    translations: {},
    changelog: [
      { date: "2026-10-23", note: "Initial publish \u2014 Pillar Page for Product Deep Dives cluster (activated at 3-article threshold with articles 16, 17, 18)." },
    ],
  },
  {
    slug: 'curved-glass-vs-flat-glass',
    title: "Curved Glass vs Flat Glass: When the Shape Premium Is Worth It (And When It Is Not)",
    excerpt: "Flat tempered glass is the default; curved is what you reach for when a specific constraint forces it. A factory-side guide to the real cost delta, the geometry decisions that actually require a curve, and six project scenarios with specific build-up and cost recommendations from a Wuhan line that produces both.",
    targetKeyword: 'curved glass vs flat glass',
    secondaryKeywords: [
      'curved vs flat glass',
      'curved vs flat tempered',
      'bent glass vs flat glass',
      'when to use curved glass',
      'curved vs flat facade',
      'curved glass cost comparison',
    ],
    searchKeywords: [
      'curved glass vs flat glass', 'curved vs flat tempered', 'bent glass vs flat',
      'curved vs flat facade', 'when to use curved glass', 'curved glass comparison',
      'curved glass cost', 'curved tempered price', 'flat vs bent glass',
      'curved', 'bent', 'flat', 'cylindrical', 'spherical', 'free-form',
      '\u5f2f\u94a2\u73bb\u7483 \u5e73\u73bb\u7483', '\u5f2f\u73bb\u7483\u5bf9\u6bd4', '\u70ed\u5f2f\u5e73\u73bb\u7483'
    ],
    publishDate: '2026-10-26',
    updatedDate: '2026-10-26',
    category: 'Buyer Guide' as const,
    tags: ['curved glass', 'flat glass', 'tempered glass', 'comparison', 'facade', 'cost analysis'],
    heroImage: '/images/blog/curved-vs-flat-glass-hero.webp',
    heroImageAlt: 'Side-by-side comparison of a curved tempered glass panel on the left and a flat tempered glass panel on the right, both standing vertically on polished dark concrete under warm amber industrial lighting',
    heroImagePrompt: "Studio product photography, two architectural tempered glass panels standing vertically side by side on polished dark concrete surface. Left panel: curved tempered glass, approximately 2 m tall, single-axis cylindrical curve at roughly 1,500 mm radius, warm amber reflections subtly flowing across the curved surface. Right panel: flat tempered glass of identical height, same thickness, same dark concrete reflection at the base. Both panels edge-lit from above-left with warm amber accent lighting creating subtle golden rim highlights. Dark industrial backdrop (#1C1F26) with amber accent (#DAA745) rim lighting raking from the left. 25-degree slight-above camera angle, shallow depth of field focused on both panels simultaneously. Visible depth and transparency through both panels. 16:9 cinematic composition. No humans, no additional props, no text, no watermarks. 4K photorealistic, museum-exhibit quality, documentary industrial photography style.",
    author: DEFAULT_AUTHOR,
    readingTime: 14,
    featured: false,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'comparison' as const,
    cluster: 'comparison',
    relatedProductSlugs: ['curved-tempered-glass', 'tempered-glass', 'laminated-glass'],
    tldr: [
      "Flat tempered glass is the architectural default. Curved is what you reach for when a specific geometric or visual constraint forces it, not a stylistic equivalent.",
      "Curved cost premium: 70-110 percent over flat for standard cylindrical radii, 120-200 percent for tight radii under 800 mm, with spherical and free-form adding another 50 and 95 percent respectively.",
      "Flat still wins on cost per square meter, panel-size envelope, repair availability, standards uniformity, and container shipping efficiency (650-800 m2 per 40ft vs 350-550 m2 curved).",
      "Curved earns the premium when: (1) geometry physically demands it, (2) visual continuity matters at the viewing distance, (3) panels are large enough that facet joints would read, (4) budget absorbs the premium. Fewer than four pressure factors usually means hybrid is the right answer.",
      "Hybrid strategy keeps the glass premium under 25 percent of pure-curved budget: curved at ground-floor focal zones, faceted flat for upper floors and back-of-house.",
      "Lead time delta: 25-35 days curved cylindrical, 35-55 days spherical, 45-70 days free-form (vs 20-30 days flat). Budget mold archival and 1-2 spare panels on high-risk ground-floor curved installations.",
    ],
    buyerFaq: [
      {
        q: "Can you quote both curved and flat options line-by-line for one project?",
        a: "Yes, and we recommend it. Send the glass schedule with each mark's intended spec. We return a comparison showing curved price, flat price, and the delta for every mark where both are credible. The decision then belongs to the design team with real numbers rather than a generic index.",
      },
      {
        q: "What is the smallest project you will quote curved tempered on?",
        a: "No hard minimum for cylindrical panels — single-panel orders are possible using our reusable steel molds. For spherical and free-form, 4 panels per unique profile is typical to keep per-unit mold cost reasonable. For projects under 10 m2 of curved glass, discuss directly — we may suggest a slightly adjusted radius that matches an existing archived mold to avoid new tooling cost.",
      },
      {
        q: "Do you ship curved and flat orders in the same container?",
        a: "Yes, routinely. Curved panels ship in custom nested cradles that occupy more volume per m2 than flat A-frame crates, so mixed-load container efficiency depends on the ratio. We provide a loading diagram at RFQ showing exact m2 per container for your specific order mix so you can model freight accurately before PO.",
      },
      {
        q: "Will your curved tempered glass meet US and EU safety standards?",
        a: "Yes. Our curved tempered is produced to GB 15763.2 (China safety glass) and EN 12150 (European tempered glass standard). It carries China 3C (CCC) certification. For export orders we provide EN 12150 test reports as standard and ANSI Z97.1 test reports on request. For Australian projects, AS 1288 compliance documentation is also available.",
      },
      {
        q: "How do I lock down a quote for a project that is still in design development?",
        a: "Send what you have — even a schematic layout and target radius range is enough for a planning-grade quote. We mark it clearly as planning estimate on the RFQ response and lock it only when the drawings are at construction-document stage. This lets your design team budget the glass line without waiting for final drawings.",
      },
    ],
    translations: {},
    changelog: [
      { date: '2026-10-26', note: 'Initial publish — fourth article in Comparison cluster, first curved-glass article in blog' },
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
