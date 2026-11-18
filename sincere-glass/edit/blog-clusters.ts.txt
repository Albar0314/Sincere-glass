// src/lib/blog-clusters.ts
// Topic-cluster membership map (pillar slug -> ordered spoke slugs).
// Separate from the structural `cluster` field in blog-registry.ts
// (comparison/technical/application/buyer-guide/product).
// This expresses the Nov-2026 "topical authority matrix": each seed
// keyword has 1 Pillar + its spokes forming a tight internal-link web.
//
// Add a spoke slug here the moment its article is planned. The resolver
// only returns spokes that actually exist in the registry, so listing a
// not-yet-published slug is harmless — it just doesn't render until live.

import { blogArticles, type BlogArticle } from "@/lib/blog-registry";

export const TOPIC_CLUSTERS: Record<string, string[]> = {
  // ---- Low Iron Glass cluster (Pillar = article #24) ----
  "low-iron-glass-complete-guide": [
    "low-iron-glass-vs-clear-glass",        // #25  live
    "low-iron-tempered-glass",              // #31  live
    "low-iron-glass-shower-door",           // W3-12  VERIFY slug when published
    "starphire-vs-low-iron-glass",          // W3-13  VERIFY slug when published
    "low-iron-glass-cost",                  // W3-14  VERIFY slug when published
    "low-iron-glass-suppliers",             // W4-16  VERIFY slug when published
    "low-iron-glass-thickness",             // W4-17  VERIFY slug when published
  ],

  // ---- Insulated Glass cluster (Pillar = article #26) ----
  "insulated-glass-complete-guide": [
    "double-pane-vs-triple-pane-glass",             // #27  live
    "argon-vs-krypton-gas-fill-igu",                // #28  live
    "u-factor-and-shgc-explained",                  // #29  live
    "insulated-glass-spacer-warm-edge-vs-aluminum", // #30  live
    "insulated-glass-vs-laminated-glass",           // existing, patched into cluster
    "how-is-insulated-glass-made",                  // existing #6, patched into cluster
  ],
};

/** Returns the published spoke articles for a pillar, in map order. */
export function getClusterSpokes(pillarSlug: string): BlogArticle[] {
  const slugs = TOPIC_CLUSTERS[pillarSlug] || [];
  return slugs
    .map((s) => blogArticles.find((a) => a.slug === s))
    .filter((a): a is BlogArticle => Boolean(a));
}

/** Reverse lookup: which pillar (if any) a spoke belongs to. */
export function getPillarForSpoke(slug: string): string | null {
  for (const [pillar, spokes] of Object.entries(TOPIC_CLUSTERS)) {
    if (spokes.includes(slug)) return pillar;
  }
  return null;
}

/** True if the slug is a registered topic pillar. */
export function isTopicPillar(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(TOPIC_CLUSTERS, slug);
}
