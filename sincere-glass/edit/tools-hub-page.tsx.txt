// src/app/tools/page.tsx
// Tools Hub - lists all interactive calculators grouped by category.

import type { Metadata } from "next";
import Link from "next/link";
import { getAllTools, CATEGORY_LABELS, CATEGORY_DESCRIPTIONS } from "@/lib/tools-registry";
import type { ToolCategory } from "@/lib/tools-registry";
import { makeAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Free Glass Calculators and Tools | Sincere Glass",
  description:
    "Free interactive calculators for architectural glass buyers: max panel size, triple pane ROI, container load and more. Built by Sincere Glass, a Wuhan manufacturer.",
  alternates: makeAlternates("/tools"),
  openGraph: {
    title: "Free Glass Calculators and Tools",
    description:
      "Interactive glass calculators from a working Wuhan factory - size limits, energy ROI, logistics and more.",
    type: "website",
  },
};

export default function ToolsHubPage() {
  const tools = getAllTools();

  const grouped: Record<ToolCategory, typeof tools> = {
    specification: [],
    roi: [],
    logistics: [],
    comparison: [],
  };
  for (const t of tools) grouped[t.category].push(t);

  const categoryOrder: ToolCategory[] = ["specification", "roi", "logistics", "comparison"];
  const visibleCategories = categoryOrder.filter((c) => grouped[c].length > 0);

  return (
    <main className="bg-[#1C1F26] text-[#F2F0ED] min-h-screen">
      {/* Hero */}
      <section className="border-b border-[#3A4250]/40 py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <nav className="text-xs text-[#8B95A5] mb-4">
            <Link href="/" className="hover:text-[#DAA745]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#F2F0ED]">Tools</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold text-[#F2F0ED] mb-4 leading-tight">
            Free glass calculators and tools
          </h1>
          <p className="text-base md:text-lg text-[#8B95A5] max-w-2xl leading-relaxed">
            Interactive calculators for architectural glass buyers, built from our working production data at Sincere Glass. Size limits, energy ROI, container loading and more - every tool returns indicative values you can take straight into a quote.
          </p>
        </div>
      </section>

      {/* Tools by category */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-14">
          {visibleCategories.map((cat) => (
            <div key={cat}>
              <div className="mb-6 flex items-baseline justify-between flex-wrap gap-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#F2F0ED]">
                  {CATEGORY_LABELS[cat]}
                </h2>
                <p className="text-sm text-[#8B95A5] max-w-lg">
                  {CATEGORY_DESCRIPTIONS[cat]}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {grouped[cat].map((tool) => (
                  <Link
                    key={tool.slug}
                    href={"/tools/" + tool.slug}
                    className="group block rounded-xl border border-[#3A4250]/40 bg-[#3A4250]/15 p-6 hover:border-[#DAA745]/60 hover:bg-[#3A4250]/25 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-lg font-semibold text-[#F2F0ED] group-hover:text-[#DAA745] transition-colors m-0">
                        {tool.shortTitle}
                      </h3>
                      <svg className="w-5 h-5 text-[#8B95A5] group-hover:text-[#DAA745] group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                    <p className="text-sm text-[#8B95A5] m-0 leading-relaxed">
                      {tool.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#3A4250]/40 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F2F0ED] mb-3">
            Need help on a specific project?
          </h2>
          <p className="text-[#8B95A5] mb-6 max-w-lg mx-auto">
            Our team can translate any calculator result into a formal quotation with current pricing, lead time and shipping.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#DAA745] text-[#1C1F26] font-bold rounded-lg hover:bg-[#c4963e] transition-colors"
          >
            Contact our team
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
