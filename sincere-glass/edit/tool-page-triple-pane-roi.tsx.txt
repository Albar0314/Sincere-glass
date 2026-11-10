// src/app/tools/triple-pane-roi-calculator/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import TriplePaneROITool from "@/components/tools/TriplePaneROITool";
import { getToolBySlug } from "@/lib/tools-registry";
import { makeAlternates } from "@/lib/i18n";
import {
  getSoftwareApplicationSchema,
  getHowToSchema,
  getFaqSchema,
  getBreadcrumbSchema,
} from "@/lib/schema";

const SLUG = "triple-pane-roi-calculator";
const tool = getToolBySlug(SLUG)!;

export const metadata: Metadata = {
  title: tool.title,
  description: tool.metaDescription,
  alternates: makeAlternates("/tools/" + SLUG),
  openGraph: {
    title: tool.title,
    description: tool.metaDescription,
    type: "website",
  },
};

export default function Page() {
  const softwareSchema = getSoftwareApplicationSchema({
    name: tool.shortTitle,
    description: tool.metaDescription,
    url: "https://sincereglass.com/tools/" + SLUG,
    category: "BusinessApplication",
  });
  const howToSchema = getHowToSchema({ name: tool.howToName, steps: tool.howToSteps });
  const faqSchema = getFaqSchema(tool.faq);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://sincereglass.com/" },
    { name: "Tools", url: "https://sincereglass.com/tools" },
    { name: tool.shortTitle, url: "https://sincereglass.com/tools/" + SLUG },
  ]);

  return (
    <main className="bg-[#1C1F26] text-[#F2F0ED] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="border-b border-[#3A4250]/40 py-10 md:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="text-xs text-[#8B95A5] mb-4">
            <Link href="/" className="hover:text-[#DAA745]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/tools" className="hover:text-[#DAA745]">Tools</Link>
            <span className="mx-2">/</span>
            <span className="text-[#F2F0ED]">{tool.shortTitle}</span>
          </nav>
          <h1 className="text-2xl md:text-4xl font-bold text-[#F2F0ED] mb-3 leading-tight">
            Triple pane window ROI calculator
          </h1>
          <p className="text-sm md:text-base text-[#8B95A5] max-w-2xl leading-relaxed">
            Estimate payback period, annual energy savings and 25-year lifetime savings for upgrading from double to triple pane windows. Adjustable for climate zone, heating fuel and upgrade premium.
          </p>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <TriplePaneROITool />
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-[#F2F0ED] mb-4">
            How this calculator works
          </h2>
          <div className="space-y-4 text-[#8B95A5] text-sm md:text-base leading-relaxed">
            <p>
              The calculator uses a simplified single-zone heat-loss model. It takes the delta between double-pane and triple-pane center-of-glass U-factors, multiplies by heating degree-days (HDD) and 40 percent of cooling degree-days (CDD) for your IECC climate zone, and projects annual kWh saved per square meter of window area.
            </p>
            <p>
              Fuel cost is applied using your chosen heating source and rate, with a 90 percent efficiency assumption for natural gas, 100 percent for electric resistance, and 300 percent (COP 3) for heat pumps. Annual USD savings are divided into the upgrade premium (per square meter times window area) to produce a payback-year estimate.
            </p>
            <p>
              Verdict thresholds: under 10 years payback is Worth it; 10-20 years is Marginal (comfort and condensation benefits may still justify); over 20 years is Not worth it on energy alone. These are rough buckets, not formal engineering recommendations.
            </p>
            <p>
              The model does not account for frame U-factor, air infiltration, window orientation, shading, interior gains, HVAC capacity changes, utility rate escalation, or whole-building envelope interactions. For a formal payback analysis, use a whole-building energy model (EnergyPlus, eQUEST) or a professional energy audit.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8 border-t border-[#3A4250]/40">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-[#F2F0ED] mb-6">
            How to use this calculator
          </h2>
          <ol className="space-y-5">
            {tool.howToSteps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#DAA745] text-[#1C1F26] font-bold flex items-center justify-center text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#F2F0ED] mb-1">{step.name}</h3>
                  <p className="text-sm text-[#8B95A5] m-0 leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8 border-t border-[#3A4250]/40">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-[#F2F0ED] mb-6">
            Frequently asked questions
          </h2>
          <div className="space-y-5">
            {tool.faq.map((item, i) => (
              <div key={i} className="rounded-lg border border-[#3A4250]/40 bg-[#3A4250]/15 p-5">
                <h3 className="text-base font-semibold text-[#F2F0ED] mb-2">{item.q}</h3>
                <p className="text-sm text-[#8B95A5] m-0 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8 border-t border-[#3A4250]/40">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-[#F2F0ED] mb-6">Related</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/products/insulated-glass" className="rounded-lg border border-[#3A4250]/40 bg-[#3A4250]/15 p-4 hover:border-[#DAA745]/60 transition-colors">
              <div className="text-xs text-[#DAA745] uppercase tracking-wider mb-1">Product</div>
              <div className="text-base font-semibold text-[#F2F0ED]">Insulated Glass</div>
            </Link>
            <Link href="/products/low-e-glass" className="rounded-lg border border-[#3A4250]/40 bg-[#3A4250]/15 p-4 hover:border-[#DAA745]/60 transition-colors">
              <div className="text-xs text-[#DAA745] uppercase tracking-wider mb-1">Product</div>
              <div className="text-base font-semibold text-[#F2F0ED]">Low-E Glass</div>
            </Link>
            <Link href="/blog/double-pane-vs-triple-pane-glass" className="rounded-lg border border-[#3A4250]/40 bg-[#3A4250]/15 p-4 hover:border-[#DAA745]/60 transition-colors">
              <div className="text-xs text-[#DAA745] uppercase tracking-wider mb-1">Article</div>
              <div className="text-base font-semibold text-[#F2F0ED]">Double Pane vs Triple Pane Glass</div>
            </Link>
            <Link href="/tools" className="rounded-lg border border-[#3A4250]/40 bg-[#3A4250]/15 p-4 hover:border-[#DAA745]/60 transition-colors">
              <div className="text-xs text-[#DAA745] uppercase tracking-wider mb-1">More</div>
              <div className="text-base font-semibold text-[#F2F0ED]">All tools and calculators</div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
