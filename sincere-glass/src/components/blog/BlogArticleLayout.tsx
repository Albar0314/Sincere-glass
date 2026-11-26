import type { Metadata } from 'next';
import type { BlogArticle } from '@/lib/blog-registry';
import { getRelatedArticles, CLUSTER_LABELS} from '@/lib/blog-registry';
import ReadingProgress from './ReadingProgress';
import TableOfContents from './TableOfContents';
import AuthorCard from './AuthorCard';
import RelatedPosts from './RelatedPosts';
import BlogCTA from './BlogCTA';
import AuthorBioBox from './AuthorBioBox';
import BreadcrumbSchema, { BreadcrumbTrail } from './BreadcrumbSchema';
import { hreflangAlternates } from '@/lib/hreflang'; /* SOP-v2-injected */

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
    title: `${article.title} | Sincere Glass Blog`,
    description: article.excerpt,
    keywords: [article.targetKeyword, ...(article.secondaryKeywords || []), ...article.tags],
    authors: [{ name: article.author.name, url: article.author.url }],
    alternates: {
      canonical: `https://sincereglass.com/blog/${article.slug}`,
      languages: hreflangAlternates(article.slug, article.translations),
    },
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

/**
 * Generates Article + FAQ structured data as a connected @graph.
 * The Article node references the site-wide Organization (#organization)
 * and WebSite (#website) entities defined in src/lib/schema.ts via @id,
 * so every article plugs into one site entity graph instead of standing
 * alone. Pillar pages additionally emit an ItemList (see ClusterHub) whose
 * @id points back at this Article's #article node.
 */
export function articleJsonLd(article: BlogArticle, faqItems?: { q: string; a: string }[]) {
  const SITE = 'https://sincereglass.com';
  const url = `${SITE}/blog/${article.slug}`;
  const image = article.heroImage
    ? article.heroImage.startsWith('http')
      ? article.heroImage
      : `${SITE}${article.heroImage}`
    : undefined;

// SG-GEO-INFRA-V1: Entity graph linking for GEO / AI search disambiguation
  const ENTITY_URI_MAP: Record<string, string> = {
    "low iron glass": "https://www.wikidata.org/wiki/Q1069727",
    "ultra-clear glass": "https://www.wikidata.org/wiki/Q1069727",
    "tempered glass": "https://www.wikidata.org/wiki/Q239891",
    "laminated glass": "https://www.wikidata.org/wiki/Q1458565",
    "insulated glass": "https://www.wikidata.org/wiki/Q1191295",
    "low-e glass": "https://www.wikidata.org/wiki/Q2643083",
    "astm c1036": "https://www.astm.org/c1036-21.html",
    "astm c1048": "https://www.astm.org/c1048-18.html",
    "astm e1300": "https://www.astm.org/e1300-16.html",
    "astm e2190": "https://www.astm.org/e2190-19.html",
    "en 12150": "https://standards.cencenelec.eu/",
    "en 1279": "https://standards.cencenelec.eu/",
    "en 14449": "https://standards.cencenelec.eu/",
    "en 14179": "https://standards.cencenelec.eu/",
    "starphire": "https://www.wikidata.org/wiki/Q7601532",
    "optiwhite": "https://www.wikidata.org/wiki/Q1458565",
    "saint-gobain": "https://www.wikidata.org/wiki/Q164974",
    "guardian glass": "https://www.wikidata.org/wiki/Q1554873",
  };

  const toEntityNode = (label: string) => {
    const clean = label.trim();
    const uri = ENTITY_URI_MAP[clean.toLowerCase()];
    return uri
      ? { '@type': 'Thing', name: clean, sameAs: uri }
      : { '@type': 'Thing', name: clean };
  };

  const aboutEntities = [
    toEntityNode(article.targetKeyword),
    ...(article.tags || []).slice(0, 2).map(toEntityNode),
  ];

  const mentionCandidates = [
    ...(article.secondaryKeywords || []).slice(0, 4),
    ...(article.relatedProductSlugs || []).map((s) => s.replace(/-/g, ' ')),
  ];
  const seenNames = new Set<string>(aboutEntities.map((e) => String(e.name).toLowerCase()));
  const mentionEntities = [];
  for (const cand of mentionCandidates) {
    const key = cand.trim().toLowerCase();
    if (!key || seenNames.has(key)) continue;
    seenNames.add(key);
    mentionEntities.push(toEntityNode(cand));
    if (mentionEntities.length >= 6) break;
  }

  const graph: object[] = [
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: article.title,
      description: article.excerpt,
      image,
      datePublished: article.publishDate,
      dateModified: article.updatedDate || article.publishDate,
      inLanguage: 'en',
      mainEntityOfPage: { '@id': url },
      isPartOf: { '@id': `${SITE}/#website` },
      author: {
        '@type': 'Person',
        name: article.author.name,
        url: article.author.url,
      },
      publisher: { '@id': `${SITE}/#organization` },
      about: aboutEntities,
      ...(mentionEntities.length > 0 ? { mentions: mentionEntities } : {}),
    },
  ];

  if (faqItems && faqItems.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
  }

  return [{ '@context': 'https://schema.org', '@graph': graph }];
}

export default function BlogArticleLayout({
  article,
  toc,
  children,
  ctaTitle,
  ctaDescription,
}: Props) {
  const related = getRelatedArticles(article.slug);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: CLUSTER_LABELS[article.cluster] || article.category, url: `/blog?cluster=${article.cluster}` },
    { name: article.title, url: `/blog/${article.slug}` },
  ];

  return (
    <>
      <BreadcrumbSchema crumbs={breadcrumbs} />
      <ReadingProgress />

      {/* Hero */}
      <section className="relative bg-[#1C1F26] pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-6">
            <BreadcrumbTrail crumbs={breadcrumbs} />
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

              <AuthorBioBox article={article} />
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
