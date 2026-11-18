// src/components/blog/ClusterHub.tsx
// Visible, crawlable topic-cluster hub rendered on Pillar pages.
// - Real <a href> links (LocalizedLink) with descriptive anchor text + excerpt
//   => the internal-link web Google reads as topical authority.
// - Server component (NO "use client") => fully in the SSR HTML, so Googlebot
//   AND AI crawlers (PerplexityBot / ChatGPT-User / Google-Extended) see it
//   without executing JS. No SSR-shadow needed (SOP v2.3 C21 is for interactives).
// - Emits an ItemList @graph whose @id links back to the Pillar's Article node,
//   connecting the cluster into the site entity graph.

import Link from "@/components/LocalizedLink";
import {
  blogArticles,
  CLUSTER_LABELS,
  type BlogArticle,
} from "@/lib/blog-registry";
import { getClusterSpokes } from "@/lib/blog-clusters";

const SITE = "https://sincereglass.com";

interface Props {
  /** The pillar article's own slug. */
  pillarSlug: string;
  /** Optional heading override. */
  heading?: string;
}

export default function ClusterHub({ pillarSlug, heading }: Props) {
  const pillar: BlogArticle | undefined = blogArticles.find(
    (a) => a.slug === pillarSlug
  );
  const spokes = getClusterSpokes(pillarSlug);

  // Don't render a lonely hub — wait until the cluster has substance.
  if (!pillar || spokes.length < 2) return null;

  const title = heading || `Explore the ${pillar.targetKeyword} guides`;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        "@id": `${SITE}/blog/${pillarSlug}#clusterlist`,
        name: `${pillar.title} — related guides`,
        numberOfItems: spokes.length,
        isPartOf: { "@id": `${SITE}/blog/${pillarSlug}#article` },
        itemListElement: spokes.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE}/blog/${s.slug}`,
          name: s.title,
        })),
      },
    ],
  };

  return (
    <section
      aria-label="Topic cluster guides"
      className="not-prose my-14 rounded-2xl border border-[#3A4250] bg-[#22262F] p-6 md:p-8"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="mb-6 flex items-center gap-3">
        <span className="h-px w-8 bg-[#DAA745]" aria-hidden="true" />
        <h2 className="m-0 text-xl md:text-2xl font-bold text-[#F2F0ED]">
          {title}
        </h2>
      </div>

      <p className="mb-7 max-w-2xl text-sm leading-relaxed text-[#8B95A5]">
        Everything we have published on {pillar.targetKeyword}, in one place —
        from fundamentals to buyer-level detail.
      </p>

      <ul className="m-0 list-none space-y-3 p-0">
        {spokes.map((s) => (
          <li key={s.slug} className="m-0">
            <Link
              href={`/blog/${s.slug}`}
              className="group block rounded-xl border border-transparent bg-[#1C1F26] p-4 transition-colors hover:border-[#DAA745]/50"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-semibold text-[#F2F0ED] transition-colors group-hover:text-[#DAA745]">
                  {s.title}
                </span>
                <span className="shrink-0 rounded-full border border-[#3A4250] px-2 py-0.5 text-[11px] uppercase tracking-wide text-[#8B95A5]">
                  {CLUSTER_LABELS[s.cluster] || s.category}
                </span>
              </div>
              {s.excerpt && (
                <span className="mt-1.5 block text-sm leading-relaxed text-[#8B95A5]">
                  {s.excerpt}
                </span>
              )}
              <span className="mt-2 block text-xs text-[#6b7280]">
                {s.readingTime} min read
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
