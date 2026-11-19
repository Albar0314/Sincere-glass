// src/app/tools/glass-container-load-calculator/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import ContainerLoadTool from "@/components/tools/ContainerLoadTool";
import { getToolBySlug } from "@/lib/tools-registry";
import { makeAlternates } from "@/lib/i18n";
import {
  getSoftwareApplicationSchema,
  getHowToSchema,
  getFaqSchema,
  getBreadcrumbSchema,
} from "@/lib/schema";

const SLUG = "glass-container-load-calculator";
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
            Glass container loading calculator
          </h1>
          <p className="text-sm md:text-base text-[#8B95A5] max-w-2xl leading-relaxed">
            Estimate how many square meters of architectural glass fit in a container, the loaded weight, and whether the load is weight-limited or volume-limited. Adjustable for container type, glass thickness and crate strategy.
          </p>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ContainerLoadTool />
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-[#F2F0ED] mb-4">
            How this calculator works
          </h2>
          <div className="space-y-4 text-[#8B95A5] text-sm md:text-base leading-relaxed">
            <p>
              Architectural glass is dense, so a sea container almost always fills on weight before it fills on volume. The calculator works out both limits and reports whichever is reached first. The weight limit is the container payload, minus the share taken by the crates, divided by the weight per square meter of the glass you selected (15 to 36 kg/m² depending on thickness and build-up at a 2,500 kg/m³ float density).
            </p>
            <p>
              The volume limit is the usable floor length of the container (internal length minus a 0.3 m door clearance) multiplied by an effective packing density for the chosen crate strategy, in square meters of glass per meter of floor. The lower of the two limits is the practical capacity, and the loaded weight is reported with the crate weight added back in.
            </p>
            <p>
              The utilisation bars show how close the load runs to the payload and to the crate footprint, and the damage-risk note flags combinations (open-top with heavy IGU, enclosed boxes in a weight-limited 20-foot box) that need engineered bracing or a different container. These figures use industry-default packing assumptions, not factory test data, and are indicative only.
            </p>
            <p>
              For the full operational background — crate types, the loading sequence, damage zones, marine insurance and HS codes — see our{" "}
              <Link href="/blog/glass-shipping-container-loading-guide" className="text-[#DAA745] hover:underline">
                glass container shipping guide
              </Link>
              . The calculator shares its weight-and-volume model with that article, so the numbers match.
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
            <Link href="/blog/glass-shipping-container-loading-guide" className="rounded-lg border border-[#3A4250]/40 bg-[#3A4250]/15 p-4 hover:border-[#DAA745]/60 transition-colors">
              <div className="text-xs text-[#DAA745] uppercase tracking-wider mb-1">Article</div>
              <div className="text-base font-semibold text-[#F2F0ED]">Glass Container Shipping Guide</div>
            </Link>
            <Link href="/blog/how-to-import-glass-from-china" className="rounded-lg border border-[#3A4250]/40 bg-[#3A4250]/15 p-4 hover:border-[#DAA745]/60 transition-colors">
              <div className="text-xs text-[#DAA745] uppercase tracking-wider mb-1">Article</div>
              <div className="text-base font-semibold text-[#F2F0ED]">How to Import Glass from China</div>
            </Link>
            <Link href="/products/insulated-glass" className="rounded-lg border border-[#3A4250]/40 bg-[#3A4250]/15 p-4 hover:border-[#DAA745]/60 transition-colors">
              <div className="text-xs text-[#DAA745] uppercase tracking-wider mb-1">Product</div>
              <div className="text-base font-semibold text-[#F2F0ED]">Insulated Glass</div>
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
