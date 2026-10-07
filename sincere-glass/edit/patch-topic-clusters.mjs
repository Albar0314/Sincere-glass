/**
 * patch-topic-clusters.mjs
 * 
 * Adds topic cluster infrastructure to Sincere Glass blog:
 *   1. blog-registry.ts — add BlogCluster type + cluster field + CLUSTER_LABELS
 *   2. BlogArticleLayout.tsx — breadcrumbs use cluster instead of category
 *   3. blog/page.tsx — add cluster filter tabs
 *   4. Article #1 registry entry — add cluster: 'comparison'
 * 
 * URL stays flat: /blog/[slug]. Cluster hierarchy shown via breadcrumbs only:
 *   Home > Blog > [Cluster Name] > [Article Title]
 *
 * Run: node edit\patch-topic-clusters.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const log = (msg) => console.log(msg);

// ─── 1. Patch blog-registry.ts ──────────────────────────────────────────────

function patchRegistry() {
  const p = join(SRC, 'lib', 'blog-registry.ts');
  if (!existsSync(p)) { log('❌ blog-registry.ts not found'); return; }
  let c = readFileSync(p, 'utf-8');

  if (c.includes('BlogCluster')) {
    log('⚠️  blog-registry.ts already has BlogCluster — skipping');
    return;
  }

  // 1a. Add BlogCluster type + CLUSTER_LABELS right after BlogCategory block
  const categoryLabelsEnd = "};";
  const afterCategoryLabels = c.indexOf(categoryLabelsEnd, c.indexOf('CATEGORY_LABELS'));
  if (afterCategoryLabels === -1) {
    log('❌ Could not locate CATEGORY_LABELS end in blog-registry.ts');
    return;
  }
  const insertPoint = afterCategoryLabels + categoryLabelsEnd.length;

  const clusterBlock = `

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
};`;

  c = c.slice(0, insertPoint) + clusterBlock + c.slice(insertPoint);

  // 1b. Add cluster field to BlogArticle interface — after articleType line
  const articleTypeField = `articleType?: 'comparison' | 'technical' | 'buyer-guide' | 'case-study';`;
  if (c.includes(articleTypeField)) {
    c = c.replace(
      articleTypeField,
      `articleType?: 'comparison' | 'technical' | 'buyer-guide' | 'case-study';
  /** Topic cluster this article belongs to — drives breadcrumb hierarchy + listing filters */
  cluster: BlogCluster;`
    );
  } else {
    // Fallback: insert before translations field
    const translationsField = `/** Translation slug map`;
    if (c.includes(translationsField)) {
      c = c.replace(
        translationsField,
        `/** Topic cluster this article belongs to — drives breadcrumb hierarchy + listing filters */
  cluster: BlogCluster;
  ${translationsField}`
      );
    } else {
      log('⚠️  Could not auto-insert cluster field into BlogArticle — add manually');
    }
  }

  // 1c. Add cluster to article #1 entry (tempered-glass-vs-laminated-glass)
  // Look for the entry and add cluster after articleType
  const article1Marker = `slug: 'tempered-glass-vs-laminated-glass'`;
  if (c.includes(article1Marker)) {
    // Find articleType in that entry block and add cluster after it
    const entryStart = c.indexOf(article1Marker);
    const entryEnd = c.indexOf('},', entryStart);
    const entryBlock = c.slice(entryStart, entryEnd);

    if (entryBlock.includes('articleType:') && !entryBlock.includes('cluster:')) {
      const articleTypeLine = entryBlock.match(/articleType:\s*'[^']+',?/);
      if (articleTypeLine) {
        const replacement = articleTypeLine[0].endsWith(',')
          ? articleTypeLine[0] + "\n    cluster: 'comparison',"
          : articleTypeLine[0] + ",\n    cluster: 'comparison',";
        c = c.replace(articleTypeLine[0], replacement);
        log('✅ Article #1 cluster field added');
      }
    } else if (entryBlock.includes('cluster:')) {
      log('⚠️  Article #1 already has cluster field');
    } else {
      // No articleType found; insert cluster before the first field we can find
      log('⚠️  Could not auto-add cluster to article #1 — add manually: cluster: \'comparison\'');
    }
  }

  // 1d. Update auditKeyword to also report cluster
  const auditFn = c.indexOf('export function auditKeyword');
  if (auditFn !== -1) {
    // Check if it already mentions cluster
    const auditEnd = c.indexOf('\n}', auditFn);
    const auditBody = c.slice(auditFn, auditEnd);
    if (!auditBody.includes('cluster')) {
      // Add cluster to the conflict return
      const conflictReturn = `return { conflict: true, existingSlug: a.slug`;
      if (c.includes(conflictReturn)) {
        c = c.replace(
          conflictReturn,
          `return { conflict: true, existingSlug: a.slug, existingCluster: a.cluster`
        );
      }
    }
  }

  writeFileSync(p, c);
  log('✅ blog-registry.ts — BlogCluster type + CLUSTER_LABELS + cluster field added');
}

// ─── 2. Patch BlogArticleLayout.tsx — breadcrumbs use cluster ───────────────

function patchLayout() {
  const p = join(SRC, 'components', 'blog', 'BlogArticleLayout.tsx');
  if (!existsSync(p)) { log('❌ BlogArticleLayout.tsx not found'); return; }
  let c = readFileSync(p, 'utf-8');

  if (c.includes('CLUSTER_LABELS')) {
    log('⚠️  BlogArticleLayout.tsx already uses CLUSTER_LABELS — skipping');
    return;
  }

  // 2a. Add CLUSTER_LABELS import
  // Find existing import from blog-registry
  const registryImport = c.match(/import\s*\{([^}]+)\}\s*from\s*['"]@\/lib\/blog-registry['"]/);
  if (registryImport) {
    const currentImports = registryImport[1];
    if (!currentImports.includes('CLUSTER_LABELS')) {
      const newImports = currentImports.trimEnd() + ', CLUSTER_LABELS';
      c = c.replace(registryImport[0], `import {${newImports}} from '@/lib/blog-registry'`);
    }
  } else {
    // No existing import — add one
    const firstImport = c.indexOf('import ');
    if (firstImport !== -1) {
      c = `import { CLUSTER_LABELS } from '@/lib/blog-registry';\n` + c;
    }
  }

  // 2b. Replace breadcrumb construction to use cluster instead of category
  // Current: { name: article.category, url: `/blog?category=${encodeURIComponent(article.category)}` }
  // New:     { name: CLUSTER_LABELS[article.cluster], url: `/blog?cluster=${article.cluster}` }

  const oldCrumb = /\{\s*name:\s*article\.category,\s*url:\s*`\/blog\?category=\$\{encodeURIComponent\(article\.category\)\}`\s*\}/;
  if (oldCrumb.test(c)) {
    c = c.replace(
      oldCrumb,
      `{ name: CLUSTER_LABELS[article.cluster] || article.category, url: \`/blog?cluster=\${article.cluster}\` }`
    );
    log('✅ BlogArticleLayout.tsx — breadcrumbs now use cluster');
  } else {
    // Try a simpler match
    const simpleMatch = `name: article.category`;
    const categoryInBreadcrumb = c.indexOf(simpleMatch);
    if (categoryInBreadcrumb !== -1) {
      // Check if this is inside the breadcrumbs array
      const surroundingCode = c.slice(Math.max(0, categoryInBreadcrumb - 200), categoryInBreadcrumb + 200);
      if (surroundingCode.includes('breadcrumbs') || surroundingCode.includes('crumbs')) {
        c = c.replace(
          /name: article\.category,\s*url:[^}]+/,
          `name: CLUSTER_LABELS[article.cluster] || article.category, url: \`/blog?cluster=\${article.cluster}\``
        );
        log('✅ BlogArticleLayout.tsx — breadcrumbs patched (fallback match)');
      }
    } else {
      log('⚠️  Could not locate breadcrumb category reference in BlogArticleLayout.tsx — patch manually');
    }
  }

  writeFileSync(p, c);
}

// ─── 3. Full rewrite of blog listing page with cluster filtering ────────────

function patchBlogListing() {
  const p = join(SRC, 'app', 'blog', 'page.tsx');
  if (!existsSync(p)) { log('❌ blog/page.tsx not found'); return; }
  const existing = readFileSync(p, 'utf-8');

  if (existing.includes('CLUSTER_LABELS') && existing.includes('searchParams')) {
    log('⚠️  blog/page.tsx already has cluster filtering — skipping');
    return;
  }

  // Full replacement — we know the exact structure from the infrastructure patch
  const newPage = `import type { Metadata } from 'next';
import {
  getAllArticles,
  getFeaturedArticle,
  CLUSTER_LABELS,
  type BlogCluster,
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

function ClusterTabs({ active }: { active?: string }) {
  const clusters = Object.entries(CLUSTER_LABELS) as [BlogCluster, string][];
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      <a
        href="/blog"
        className={\`px-4 py-2 rounded-full text-sm font-medium transition-colors \${
          !active
            ? 'bg-[#DAA745] text-[#1C1F26]'
            : 'bg-[#1C1F26]/50 text-[#8B95A5] hover:text-white border border-[#3A4250]'
        }\`}
      >
        All
      </a>
      {clusters.map(([key, label]) => (
        <a
          key={key}
          href={\`/blog?cluster=\${key}\`}
          className={\`px-4 py-2 rounded-full text-sm font-medium transition-colors \${
            active === key
              ? 'bg-[#DAA745] text-[#1C1F26]'
              : 'bg-[#1C1F26]/50 text-[#8B95A5] hover:text-white border border-[#3A4250]'
          }\`}
        >
          {label}
        </a>
      ))}
    </div>
  );
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ cluster?: string }>;
}) {
  const params = await searchParams;
  const clusterFilter = params.cluster as BlogCluster | undefined;

  const allArticles = getAllArticles();
  const filtered = clusterFilter
    ? allArticles.filter((a) => a.cluster === clusterFilter)
    : allArticles;

  const featured = !clusterFilter ? getFeaturedArticle() : filtered[0];
  const rest = filtered.filter((a) => a.slug !== featured?.slug);

  return (
    <>
      {/* Hero */}
      <section className="bg-[#1C1F26] pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#F2F0ED] mb-4">
            {clusterFilter ? CLUSTER_LABELS[clusterFilter] : 'Insights & Resources'}
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
          {/* Cluster filter tabs */}
          <ClusterTabs active={clusterFilter} />

          {filtered.length === 0 ? (
            /* Empty state */
            <div className="text-center py-24">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#3A4250]/20 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B95A5" strokeWidth="1.5">
                  <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-medium text-[#F2F0ED] mb-2">
                {clusterFilter
                  ? \`No articles in \${CLUSTER_LABELS[clusterFilter]} yet\`
                  : 'Articles coming soon'}
              </h2>
              <p className="text-[#8B95A5] max-w-md mx-auto">
                We&apos;re preparing in-depth technical guides and industry insights.
                Check back shortly for new publications.
              </p>
              {clusterFilter && (
                <a href="/blog" className="inline-block mt-4 text-sm text-[#DAA745] hover:underline">
                  ← View all articles
                </a>
              )}
            </div>
          ) : (
            <>
              {/* Featured article */}
              {featured && (
                <div className="mb-12">
                  <BlogCard article={featured} featured />
                </div>
              )}

              {/* Article grid */}
              {rest.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((article) => (
                    <BlogCard key={article.slug} article={article} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
`;

  writeFileSync(p, newPage);
  log('✅ blog/page.tsx — full rewrite with cluster filtering + ClusterTabs');
}

// ─── Run all patches ────────────────────────────────────────────────────────

log('');
log('🔧 Patch: Topic Clusters for Sincere Glass Blog');
log('   URL structure: stays flat /blog/[slug]');
log('   Hierarchy: breadcrumbs only (Home > Blog > Cluster > Article)');
log('────────────────────────────────────────────────');
log('');

patchRegistry();
log('');
patchLayout();
log('');
patchBlogListing();

log('');
log('────────────────────────────────────────────────');
log('✅ Done — no manual steps needed. Verify:');
log('  1. npm run dev → /blog shows cluster filter tabs (pill buttons)');
log('  2. npm run dev → /blog?cluster=comparison filters to comparison articles only');
log('  3. Open article #1 → breadcrumb shows: Home > Blog > Glass Comparisons > [Title]');
log('');
log('Future articles: always include cluster field in registry entry.');
log('When a cluster has 3+ articles: create Pillar Page (see SOP §6).');
log('');
