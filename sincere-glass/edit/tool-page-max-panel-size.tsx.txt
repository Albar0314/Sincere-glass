// src/app/tools/glass-max-panel-size-calculator/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import MaxPanelSizeTool from "@/components/tools/MaxPanelSizeTool";
import { getToolBySlug } from "@/lib/tools-registry";
import { makeAlternates } from "@/lib/i18n";
import {
  getSoftwareApplicationSchema,
  getHowToSchema,
  getFaqSchema,
  getBreadcrumbSchema,
} from "@/lib/schema";

const SLUG = "glass-max-panel-size-calculator";
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
            Glass max panel size calculator (12mm tempered)
          </h1>
          <p className="text-sm md:text-base text-[#8B95A5] max-w-2xl leading-relaxed">
            Find the max producible dimensions for 12mm tempered glass by support condition and wind-load class. Results are validated against our 3,000 x 15,000 mm jumbo production envelope.
          </p>
        </div>
      </section>

      {/* Tool (fold-above) */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <MaxPanelSizeTool />
        </div>
      </section>

      {/* How this calculator works (SSR shadow for AI crawlers, per SOP v2.3 C21) */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-[#F2F0ED] mb-4">
            How this calculator works
          </h2>
          <div className="space-y-4 text-[#8B95A5] text-sm md:text-base leading-relaxed">
            <p>
              The calculator returns indicative maximum dimensions for 12mm single-pane tempered architectural glass across nine combinations of support condition (4-edge framed, 2-edge clamped, point-fixed) and wind-load class (low, medium, high). It is derived from GB 15763.2-2005 section 5 deflection and strength provisions and from ASTM E1300 principles for monolithic glass, with conservative safety factors applied for commercial-grade procurement.
            </p>
            <p>
              Each result is also checked against our own 3,000 x 15,000 mm jumbo production envelope. Both our tempering furnace and our lamination autoclave support this full envelope, which places us among a small set of Chinese manufacturers capable of jumbo output at commercial volume.
            </p>
            <p>
              The calculator does not replace structural engineering. It does not account for point-load effects, dynamic wind resonance, impact-loading, thermal stress, or edge quality beyond typical factory-standard CNC-ground arrises. For final sizing, a licensed structural engineer must review the specific project.
            </p>
          </div>
        </div>
      </section>

      {/* How to use */}
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

      {/* FAQ */}
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

      {/* Related */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 border-t border-[#3A4250]/40">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-[#F2F0ED] mb-6">
            Related
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/products/tempered-glass" className="rounded-lg border border-[#3A4250]/40 bg-[#3A4250]/15 p-4 hover:border-[#DAA745]/60 transition-colors">
              <div className="text-xs text-[#DAA745] uppercase tracking-wider mb-1">Product</div>
              <div className="text-base font-semibold text-[#F2F0ED]">Tempered Glass</div>
            </Link>
            <Link href="/products/laminated-glass" className="rounded-lg border border-[#3A4250]/40 bg-[#3A4250]/15 p-4 hover:border-[#DAA745]/60 transition-colors">
              <div className="text-xs text-[#DAA745] uppercase tracking-wider mb-1">Product</div>
              <div className="text-base font-semibold text-[#F2F0ED]">Laminated Glass</div>
            </Link>
            <Link href="/products/curved-tempered-glass" className="rounded-lg border border-[#3A4250]/40 bg-[#3A4250]/15 p-4 hover:border-[#DAA745]/60 transition-colors">
              <div className="text-xs text-[#DAA745] uppercase tracking-wider mb-1">Product</div>
              <div className="text-base font-semibold text-[#F2F0ED]">Curved Tempered Glass</div>
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
