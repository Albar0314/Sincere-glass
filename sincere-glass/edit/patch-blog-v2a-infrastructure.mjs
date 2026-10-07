/**
 * patch-blog-v2a-infrastructure.mjs
 *
 * Blog SOP v2 — Phase 2a: Infrastructure components only.
 * Does NOT touch article #1; purely creates reusable building blocks
 * for all future (and the rewritten first) article.
 *
 * Run from project root: node edit\patch-blog-v2a-infrastructure.mjs
 */

import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');

const log = (msg) => console.log(msg);

// ─── 1. TLDRBox — key takeaways at top of article ───────────────────────────

const tldrBox = `interface Props {
  takeaways: string[];
  className?: string;
}

export default function TLDRBox({ takeaways, className = '' }: Props) {
  if (!takeaways?.length) return null;

  return (
    <aside
      className={\`my-8 border-l-4 border-[#DAA745] bg-[#3A4250]/20 rounded-r-xl p-6 \${className}\`}
      aria-label="Key takeaways"
    >
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-4 h-4 text-[#DAA745]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" />
        </svg>
        <h2 className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase m-0">
          Key Takeaways
        </h2>
      </div>
      <ul className="space-y-2 list-none pl-0">
        {takeaways.map((item, i) => (
          <li key={i} className="flex gap-3 text-[#F2F0ED] text-sm leading-relaxed">
            <span className="text-[#DAA745] font-bold flex-shrink-0 mt-0.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
`;

// ─── 2. CostDisclaimer — single-line reusable disclaimer ────────────────────

const costDisclaimer = `interface Props {
  variant?: 'default' | 'compact';
}

export default function CostDisclaimer({ variant = 'default' }: Props) {
  if (variant === 'compact') {
    return (
      <p className="text-xs text-[#8B95A5] italic mt-2">
        2026 reference pricing, FOB Wuhan factory. Subject to formal quotation.
      </p>
    );
  }

  return (
    <div className="my-6 flex gap-3 items-start text-xs text-[#8B95A5] bg-[#3A4250]/15 rounded-lg p-4 border border-[#3A4250]/30">
      <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#8B95A5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="m-0 leading-relaxed">
        <strong className="text-[#F2F0ED]">Pricing note:</strong> All figures are 2026 reference pricing, FOB Wuhan factory, subject to formal quotation. Actual prices vary with glass thickness, coatings, panel size, order volume, and USD/CNY exchange rate at time of quotation.
      </p>
    </div>
  );
}
`;

// ─── 3. AuthorBioBox — end-of-article E-E-A-T block ─────────────────────────

const authorBioBox = `import type { BlogArticle } from '@/lib/blog-registry';

interface Props {
  article: BlogArticle;
}

export default function AuthorBioBox({ article }: Props) {
  const { author, reviewedBy } = article;

  return (
    <section
      className="my-12 border-t border-b border-[#3A4250]/40 py-8"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        {author.image && (
          <img
            src={author.image}
            alt={\`\${author.name} profile photo\`}
            width={88}
            height={88}
            loading="lazy"
            className="rounded-full w-20 h-20 object-cover flex-shrink-0 border-2 border-[#DAA745]/40"
            itemProp="image"
          />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-[#DAA745] tracking-wider uppercase font-semibold">
              Author
            </span>
          </div>
          <h3 className="text-lg font-bold text-[#F2F0ED] m-0" itemProp="name">
            <a href={author.url} className="hover:text-[#DAA745] transition-colors no-underline" itemProp="url">
              {author.name}
            </a>
          </h3>
          {author.title && (
            <p className="text-sm text-[#8B95A5] mt-1 mb-2" itemProp="jobTitle">
              {author.title}
            </p>
          )}
          {author.bio && (
            <p className="text-sm text-[#8B95A5] leading-relaxed m-0" itemProp="description">
              {author.bio}
            </p>
          )}
          {reviewedBy && (
            <p className="text-xs text-[#8B95A5]/80 mt-3 italic">
              Technical review:{' '}
              <span className="text-[#F2F0ED]/80 not-italic font-medium">
                {reviewedBy.name}
              </span>
              {reviewedBy.title && <span>, {reviewedBy.title}</span>}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
`;

// ─── 4. RelatedProductsCards — product funnel at end of article ─────────────

const relatedProductsCards = `/**
 * Hard-coded product map keeps this component decoupled from products.ts shape.
 * Edit this map if product slugs or taglines change.
 */
const PRODUCT_MAP: Record<string, { title: string; tagline: string; image: string }> = {
  'tempered-glass': {
    title: 'Tempered Glass',
    tagline: '4\\u20135\\u00d7 stronger than annealed. Jumbo panels up to 3m \\u00d7 15m.',
    image: '/images/products/tempered-glass-card.jpg',
  },
  'laminated-glass': {
    title: 'Laminated Glass',
    tagline: 'PVB or SGP interlayer. Fragment-retention safety glass.',
    image: '/images/products/laminated-glass-card.jpg',
  },
  'insulated-glass': {
    title: 'Insulated Glass (IGU)',
    tagline: 'Low-E coated, argon-filled. Energy-efficient glazing.',
    image: '/images/products/insulated-glass-card.jpg',
  },
  'low-e-glass': {
    title: 'Low-E Glass',
    tagline: 'Soft-coat and hard-coat options for thermal control.',
    image: '/images/products/low-e-glass-card.jpg',
  },
  'enameled-glass': {
    title: 'Enameled Glass',
    tagline: 'Ceramic frit for color, pattern, and solar control.',
    image: '/images/products/enameled-glass-card.jpg',
  },
};

interface Props {
  slugs: string[];
  heading?: string;
}

export default function RelatedProductsCards({
  slugs,
  heading = 'Products referenced in this article',
}: Props) {
  const products = slugs
    .map((slug) => (PRODUCT_MAP[slug] ? { slug, ...PRODUCT_MAP[slug] } : null))
    .filter(Boolean) as Array<{ slug: string; title: string; tagline: string; image: string }>;

  if (!products.length) return null;

  return (
    <section className="my-14">
      <h2 className="text-sm font-semibold text-[#DAA745] uppercase tracking-wider mb-5 m-0">
        {heading}
      </h2>
      <div className={\`grid gap-4 \${products.length === 1 ? 'sm:grid-cols-1' : products.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}\`}>
        {products.map((p) => (
          <a
            key={p.slug}
            href={\`/products/\${p.slug}\`}
            className="group block rounded-xl overflow-hidden bg-[#3A4250]/20 border border-[#3A4250]/40 hover:border-[#DAA745]/60 transition-colors no-underline"
          >
            <div className="aspect-[16/10] overflow-hidden bg-[#3A4250]/40">
              <img
                src={p.image}
                alt={p.title}
                width={400}
                height={250}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="text-base font-semibold text-[#F2F0ED] mb-1 m-0 group-hover:text-[#DAA745] transition-colors">
                {p.title}
              </h3>
              <p className="text-xs text-[#8B95A5] leading-relaxed m-0">{p.tagline}</p>
              <p className="text-xs text-[#DAA745] mt-3 m-0 font-medium">
                View product \\u2192
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
`;

// ─── 5. LeadMagnetCTA — email capture for PDF download ──────────────────────

const leadMagnetCTA = `'use client';
import { useState } from 'react';

type Variant = 'inline' | 'footer';

interface Props {
  variant?: Variant;
  articleSlug: string;
  title?: string;
  description?: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function LeadMagnetCTA({
  variant = 'inline',
  articleSlug,
  title = 'Free Download: Global Glass Building Codes Comparison',
  description = 'A side-by-side reference for architectural glass regulations across US IBC, EU EN, China GB, and Australia AS \\u2014 free PDF for architects and specifiers.',
}: Props) {
  const [email, setEmail] = useState('');
  const [optIn, setOptIn] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    setErrorMessage(null);

    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          articleSlug,
          salesOptIn: optIn,
          magnet: 'global-glass-codes-comparison',
        }),
      });

      if (!res.ok) throw new Error(\`\${res.status}\`);
      const data = await res.json();
      setDownloadUrl(data.downloadUrl || '/downloads/global-glass-codes-comparison.pdf');
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again or email us directly.');
    }
  }

  const isFooter = variant === 'footer';

  const wrapperClass = isFooter
    ? 'my-14 rounded-2xl bg-gradient-to-br from-[#3A4250]/40 to-[#1C1F26] p-8 md:p-10 border border-[#DAA745]/30'
    : 'my-10 rounded-xl bg-[#3A4250]/20 p-6 md:p-7 border border-[#3A4250]/40';

  if (status === 'success') {
    return (
      <div className={wrapperClass}>
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-[#DAA745] flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <h3 className={\`font-bold text-[#F2F0ED] m-0 mb-2 \${isFooter ? 'text-xl' : 'text-base'}\`}>
              Your download is ready
            </h3>
            <p className="text-sm text-[#8B95A5] m-0 mb-4">
              Thanks for your interest. Click the button below to download the PDF.
            </p>
            <a
              href={downloadUrl || '#'}
              download
              className="inline-block px-5 py-2.5 bg-[#DAA745] text-[#1C1F26] rounded-full text-sm font-semibold hover:bg-[#c4952e] transition-colors no-underline"
            >
              Download PDF \\u2193
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <div className={isFooter ? 'md:grid md:grid-cols-[1fr_auto] md:gap-8 md:items-center' : ''}>
        <div className={isFooter ? '' : 'mb-5'}>
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-[#DAA745]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase">
              Free Resource
            </span>
          </div>
          <h3 className={\`font-bold text-[#F2F0ED] m-0 mb-2 \${isFooter ? 'text-xl md:text-2xl' : 'text-lg'}\`}>
            {title}
          </h3>
          <p className="text-sm text-[#8B95A5] m-0 leading-relaxed">{description}</p>
        </div>

        <form onSubmit={handleSubmit} className={isFooter ? 'md:min-w-[320px]' : ''}>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 rounded-full bg-[#1C1F26] border border-[#3A4250] text-[#F2F0ED] placeholder:text-[#8B95A5]/60 text-sm focus:outline-none focus:border-[#DAA745] transition-colors"
              disabled={status === 'submitting'}
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="px-5 py-2.5 bg-[#DAA745] text-[#1C1F26] rounded-full text-sm font-semibold hover:bg-[#c4952e] disabled:opacity-60 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
            >
              {status === 'submitting' ? 'Sending\\u2026' : 'Get PDF'}
            </button>
          </div>
          <label className="flex items-start gap-2 mt-3 cursor-pointer text-xs text-[#8B95A5]">
            <input
              type="checkbox"
              checked={optIn}
              onChange={(e) => setOptIn(e.target.checked)}
              className="mt-0.5 accent-[#DAA745] flex-shrink-0"
            />
            <span>
              Yes, I\\u2019d like Sincere Glass to follow up with a product consultation.
            </span>
          </label>
          {errorMessage && (
            <p className="text-xs text-red-400 mt-2 m-0">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}
`;

// ─── 6. BreadcrumbSchema — JSON-LD breadcrumbs ──────────────────────────────

const breadcrumbSchema = `interface Crumb {
  name: string;
  url: string;
}

interface Props {
  crumbs: Crumb[];
  siteUrl?: string;
}

/**
 * Renders a BreadcrumbList JSON-LD block as a <script> tag.
 * Also optionally renders a visible breadcrumb trail — call <BreadcrumbTrail />
 * separately if you want visible breadcrumbs; this component is JSON-LD only.
 */
export default function BreadcrumbSchema({ crumbs, siteUrl = 'https://sincereglass.com' }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url.startsWith('http') ? c.url : \`\${siteUrl}\${c.url}\`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Visible breadcrumb trail, same source. Use alongside the schema for best SEO. */
export function BreadcrumbTrail({ crumbs }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex items-center gap-2 flex-wrap list-none p-0 m-0">
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {isLast ? (
                <span className="text-[#DAA745]">{c.name}</span>
              ) : (
                <a href={c.url} className="text-[#8B95A5] hover:text-[#DAA745] transition-colors">
                  {c.name}
                </a>
              )}
              {!isLast && <span className="text-[#8B95A5]/40">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
`;

// ─── 7. hreflang helper ─────────────────────────────────────────────────────

const hreflangHelper = `/**
 * Hreflang alternate URL generator.
 *
 * Current state: English is the only published locale, so only the en + x-default
 * entries are emitted. When a Spanish/German/etc translation is published,
 * add its slug (or set to the English slug if URL-identical) to the article's
 * \`translations\` map and the helper will include it.
 */

export type Locale = 'en' | 'es' | 'de' | 'ar' | 'fr' | 'ru';

export const PLANNED_LOCALES: Locale[] = ['en', 'es', 'de', 'ar', 'fr', 'ru'];

const SITE_URL = 'https://sincereglass.com';

/**
 * Build the URL for a given locale + slug.
 * English lives at /blog/<slug>; other locales at /<locale>/blog/<slug>.
 */
export function buildLocalizedUrl(locale: Locale, slug: string): string {
  if (locale === 'en') return \`\${SITE_URL}/blog/\${slug}\`;
  return \`\${SITE_URL}/\${locale}/blog/\${slug}\`;
}

/**
 * Generate the hreflang alternates object for Next.js Metadata.
 * Pass the article's \`translations\` map — only entries present there are emitted,
 * plus the English self-reference and an x-default pointing to English.
 */
export function hreflangAlternates(
  slug: string,
  translations: Partial<Record<Locale, string>> = {},
): Record<string, string> {
  const alternates: Record<string, string> = {};

  // Always emit English self-reference + x-default
  alternates['en'] = buildLocalizedUrl('en', slug);
  alternates['x-default'] = buildLocalizedUrl('en', slug);

  // Emit any locale that has a translation registered
  (Object.keys(translations) as Locale[]).forEach((loc) => {
    if (loc === 'en') return; // already set
    const translatedSlug = translations[loc];
    if (translatedSlug) {
      alternates[loc] = buildLocalizedUrl(loc, translatedSlug);
    }
  });

  return alternates;
}
`;

// ─── 8. Lead magnet API route ───────────────────────────────────────────────

const leadMagnetRoute = `import { NextRequest, NextResponse } from 'next/server';
import { appendFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * POST /api/lead-magnet
 *
 * Captures email + opt-in and returns a PDF download URL.
 *
 * CURRENT (dev/MVP): logs to data/leads.jsonl locally.
 * PRODUCTION TODO: wire to an email service (Mailchimp / Brevo / SendGrid)
 * and gate the PDF behind a signed, time-limited URL.
 */

interface LeadPayload {
  email: string;
  articleSlug: string;
  salesOptIn: boolean;
  magnet: string;
}

const PDF_URL_MAP: Record<string, string> = {
  'global-glass-codes-comparison': '/downloads/global-glass-codes-comparison.pdf',
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LeadPayload;

    if (!body.email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    if (!body.magnet || !(body.magnet in PDF_URL_MAP)) {
      return NextResponse.json({ error: 'Unknown magnet' }, { status: 400 });
    }

    // Dev: append to local JSONL file
    const dataDir = join(process.cwd(), 'data');
    if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
    const record = {
      ...body,
      timestamp: new Date().toISOString(),
      userAgent: req.headers.get('user-agent') || '',
    };
    appendFileSync(join(dataDir, 'leads.jsonl'), JSON.stringify(record) + '\\n');

    return NextResponse.json({
      ok: true,
      downloadUrl: PDF_URL_MAP[body.magnet],
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Server error' },
      { status: 500 },
    );
  }
}
`;

// ─── 9. Patch BlogArticle type in blog-registry.ts ──────────────────────────

function patchBlogRegistry() {
  const registryPath = join(SRC, 'lib', 'blog-registry.ts');
  if (!existsSync(registryPath)) {
    log('⚠️  blog-registry.ts not found; skipping schema patch');
    return;
  }

  let content = readFileSync(registryPath, 'utf-8');

  // Already patched?
  if (content.includes('// --- SOP v2 fields ---')) {
    log('⚠️  blog-registry.ts already patched with v2 fields; skipping');
    return;
  }

  // Enhance the author type and add new optional fields.
  // Match the author block in the interface and extend it.
  const oldAuthor = `  author: {
    name: string;
    url: string;
  };`;

  const newAuthor = `  author: {
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
  /** Translation slug map for hreflang. Add entries when translations publish. */
  translations?: Partial<Record<'es' | 'de' | 'ar' | 'fr' | 'ru', string>>;
  /** Changelog entries, shown at end of article in "Updated on" block */
  changelog?: Array<{ date: string; note: string }>;`;

  if (!content.includes(oldAuthor)) {
    log('⚠️  Could not locate author block in blog-registry.ts; skipping schema patch');
    log('    (You can add the v2 fields manually by hand)');
    return;
  }

  content = content.replace(oldAuthor, newAuthor);

  // Update DEFAULT_AUTHOR to include v2 fields
  const oldDefault = /export const DEFAULT_AUTHOR = \{[\s\S]*?\};/;
  const newDefault = `export const DEFAULT_AUTHOR = {
  name: 'Li Cheng',
  url: 'https://sincereglass.com/about',
  title: 'CEO at Sincere Glass',
  bio: 'CEO at Sincere Glass (\\u6b23\\u57ce\\u73bb\\u7483) with 10+ years in architectural glass. Oversees production and quality at our 20,000 m\\u00b2 Wuhan facility.',
  image: '/images/author-images.jpg',
};`;

  if (oldDefault.test(content)) {
    content = content.replace(oldDefault, newDefault);
  } else {
    log('⚠️  Could not update DEFAULT_AUTHOR — update manually');
  }

  writeFileSync(registryPath, content);
  log('✅ blog-registry.ts — BlogArticle type extended with v2 fields; DEFAULT_AUTHOR updated');
}

// ─── 10. Patch BlogArticleLayout to auto-render v2 blocks ──────────────────

function patchBlogArticleLayout() {
  const layoutPath = join(SRC, 'components', 'blog', 'BlogArticleLayout.tsx');
  if (!existsSync(layoutPath)) {
    log('⚠️  BlogArticleLayout.tsx not found; skipping');
    return;
  }

  let content = readFileSync(layoutPath, 'utf-8');

  if (content.includes('/* SOP-v2-injected */')) {
    log('⚠️  BlogArticleLayout.tsx already patched; skipping');
    return;
  }

  // Using array.join('\n') + plain quoted strings to avoid backtick nesting hell.

  // 1. Imports
  const importMarker = "import BlogCTA from './BlogCTA';";
  const newImports = [
    "import BlogCTA from './BlogCTA';",
    "import AuthorBioBox from './AuthorBioBox';",
    "import BreadcrumbSchema, { BreadcrumbTrail } from './BreadcrumbSchema';",
    "import { hreflangAlternates } from '@/lib/hreflang'; /* SOP-v2-injected */",
  ].join('\n');

  if (!content.includes(importMarker)) {
    log('⚠️  Could not find BlogCTA import marker; add imports manually');
    return;
  }
  content = content.replace(importMarker, newImports);

  // 2. Metadata alternates. Backticks + ${} must appear LITERALLY in output.
  const BT = String.fromCharCode(96); // backtick character
  const metadataMarker = 'openGraph: {';
  const metadataPatch = [
    'alternates: {',
    '      canonical: ' + BT + 'https://sincereglass.com/blog/${article.slug}' + BT + ',',
    '      languages: hreflangAlternates(article.slug, article.translations),',
    '    },',
    '    openGraph: {',
  ].join('\n');
  if (content.includes(metadataMarker)) {
    content = content.replace(metadataMarker, metadataPatch);
  }

  // 3. Fragment opening — insert breadcrumbs const + BreadcrumbSchema.
  const openFragmentMarker = [
    'return (',
    '    <>',
    '      <ReadingProgress />',
  ].join('\n');
  const openFragmentPatch = [
    'const breadcrumbs = [',
    "    { name: 'Home', url: '/' },",
    "    { name: 'Blog', url: '/blog' },",
    '    { name: article.category, url: ' + BT + '/blog?category=${encodeURIComponent(article.category)}' + BT + ' },',
    '    { name: article.title, url: ' + BT + '/blog/${article.slug}' + BT + ' },',
    '  ];',
    '',
    '  return (',
    '    <>',
    '      <BreadcrumbSchema crumbs={breadcrumbs} />',
    '      <ReadingProgress />',
  ].join('\n');
  if (content.includes(openFragmentMarker)) {
    content = content.replace(openFragmentMarker, openFragmentPatch);
  }

  // 4. Hero category replacement with visible breadcrumb trail.
  const heroCategoryMarker = [
    '<div className="flex items-center gap-3 text-sm mb-6">',
    '            <a href="/blog" className="text-[#8B95A5] hover:text-[#DAA745] transition-colors">',
    '              Blog',
    '            </a>',
    '            <span className="text-[#8B95A5]/40">/</span>',
    '            <span className="text-[#DAA745]">{article.category}</span>',
    '          </div>',
  ].join('\n');
  const heroCategoryReplacement = [
    '<div className="mb-6">',
    '            <BreadcrumbTrail crumbs={breadcrumbs} />',
    '          </div>',
  ].join('\n');
  if (content.includes(heroCategoryMarker)) {
    content = content.replace(heroCategoryMarker, heroCategoryReplacement);
  }

  // 5. Insert <AuthorBioBox /> before <BlogCTA />.
  const childrenMarker = [
    '{children}',
    '',
    '              <BlogCTA title={ctaTitle} description={ctaDescription} />',
  ].join('\n');
  const childrenPatch = [
    '{children}',
    '',
    '              <AuthorBioBox article={article} />',
    '              <BlogCTA title={ctaTitle} description={ctaDescription} />',
  ].join('\n');
  if (content.includes(childrenMarker)) {
    content = content.replace(childrenMarker, childrenPatch);
  }

  writeFileSync(layoutPath, content);
  log('✅ BlogArticleLayout.tsx — BreadcrumbSchema + BreadcrumbTrail + AuthorBioBox + hreflang wired in');
}

// ─── 11. Create placeholder PDF + author image note ─────────────────────────

function createPublicPlaceholders() {
  const publicDir = join(ROOT, 'public');
  const downloadsDir = join(publicDir, 'downloads');
  if (!existsSync(downloadsDir)) {
    mkdirSync(downloadsDir, { recursive: true });
  }
  const noteFile = join(downloadsDir, 'README.txt');
  if (!existsSync(noteFile)) {
    writeFileSync(
      noteFile,
      [
        'Place lead-magnet PDFs here. Expected file:',
        '  global-glass-codes-comparison.pdf',
        '',
        'Served at: /downloads/global-glass-codes-comparison.pdf',
        '',
      ].join('\n'),
    );
    log('✅ public/downloads/README.txt (reminder for lead-magnet PDF)');
  }
}

// ─── Write Files ────────────────────────────────────────────────────────────

const BLOG_DIR = join(SRC, 'components', 'blog');
mkdirSync(BLOG_DIR, { recursive: true });

const LIB_DIR = join(SRC, 'lib');
mkdirSync(LIB_DIR, { recursive: true });

const API_DIR = join(SRC, 'app', 'api', 'lead-magnet');
mkdirSync(API_DIR, { recursive: true });

writeFileSync(join(BLOG_DIR, 'TLDRBox.tsx'), tldrBox);
log('✅ src/components/blog/TLDRBox.tsx');

writeFileSync(join(BLOG_DIR, 'CostDisclaimer.tsx'), costDisclaimer);
log('✅ src/components/blog/CostDisclaimer.tsx');

writeFileSync(join(BLOG_DIR, 'AuthorBioBox.tsx'), authorBioBox);
log('✅ src/components/blog/AuthorBioBox.tsx');

writeFileSync(join(BLOG_DIR, 'RelatedProductsCards.tsx'), relatedProductsCards);
log('✅ src/components/blog/RelatedProductsCards.tsx');

writeFileSync(join(BLOG_DIR, 'LeadMagnetCTA.tsx'), leadMagnetCTA);
log('✅ src/components/blog/LeadMagnetCTA.tsx');

writeFileSync(join(BLOG_DIR, 'BreadcrumbSchema.tsx'), breadcrumbSchema);
log('✅ src/components/blog/BreadcrumbSchema.tsx');

writeFileSync(join(LIB_DIR, 'hreflang.ts'), hreflangHelper);
log('✅ src/lib/hreflang.ts');

writeFileSync(join(API_DIR, 'route.ts'), leadMagnetRoute);
log('✅ src/app/api/lead-magnet/route.ts');

patchBlogRegistry();
patchBlogArticleLayout();
createPublicPlaceholders();

log('\\n🎉 Patch 2a complete. Verify with:');
log('   npm run dev');
log('   → article #1 should still render (new components not yet used)');
log('   → if build errors appear, they will point to the file to fix');
log('\\nAfter 2a is green, request Patch 2b to rewrite article #1 using SOP v2.');
