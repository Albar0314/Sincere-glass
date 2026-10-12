"use client";

import { CLUSTER_LABELS, type BlogCluster } from "@/lib/blog-registry";
import { useT } from "@/lib/useT";
interface Props {
  active?: BlogCluster;
}
export default function ClusterTabs({
  active
}: Props) {
  const t = useT();
  const clusters = Object.keys(CLUSTER_LABELS) as BlogCluster[];
  return <div className="flex flex-wrap gap-2 mb-10">
      <a href="/blog" className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!active ? "bg-[#DAA745] text-[#1C1F26]" : "bg-[#1C1F26]/50 text-[#8B95A5] hover:text-white border border-[#3A4250]"}`}>
        {t("blog.allTab")}
      </a>
      {clusters.map(key => <a key={key} href={`/blog?cluster=${key}`} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${active === key ? "bg-[#DAA745] text-[#1C1F26]" : "bg-[#1C1F26]/50 text-[#8B95A5] hover:text-white border border-[#3A4250]"}`}>
          {t(`cluster.${key}`)}
        </a>)}
    </div>;
}