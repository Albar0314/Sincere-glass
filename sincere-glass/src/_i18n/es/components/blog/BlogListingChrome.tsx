"use client";

import type { BlogCluster } from "@/lib/blog-registry";
import { useT } from "@/lib/useT";
export function BlogHero({
  clusterFilter
}: {
  clusterFilter?: BlogCluster;
}) {
  const t = useT();
  const title = clusterFilter ? t(`cluster.${clusterFilter}`) : t("blog.hero.title");
  return <section className="bg-[#1C1F26] pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[#F2F0ED] mb-4">{title}</h1>
        <p className="text-lg text-[#8B95A5] max-w-2xl leading-relaxed">
          {t("blog.hero.subtitle")}
        </p>
      </div>
    </section>;
}
export function BlogEmptyState({
  clusterFilter
}: {
  clusterFilter?: BlogCluster;
}) {
  const t = useT();
  const title = clusterFilter ? t("blog.emptyInCluster", {
    cluster: t(`cluster.${clusterFilter}`)
  }) : t("blog.emptyTitle");
  return <div className="text-center py-24">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#3A4250]/20 flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B95A5" strokeWidth="1.5">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </div>
      <h2 className="text-xl font-medium text-[#F2F0ED] mb-2">{title}</h2>
      <p className="text-[#8B95A5] max-w-md mx-auto">{t("blog.emptyBody")}</p>
      {clusterFilter && <a href="/blog" className="inline-block mt-4 text-sm text-[#DAA745] hover:underline">
          {t("blog.viewAll")}
        </a>}
    </div>;
}