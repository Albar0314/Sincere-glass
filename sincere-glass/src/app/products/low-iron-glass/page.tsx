import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { makeAlternates } from "@/lib/i18n";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";
import LowIronOpticalLab from "@/components/products/low-iron/LowIronOpticalLab";
import LowIronSpecConfigurator from "@/components/products/low-iron/LowIronSpecConfigurator";
import LowIronApplicationsMatrix from "@/components/products/low-iron/LowIronApplicationsMatrix";

export const metadata: Metadata = {
  title: "Low Iron Glass (Ultra-Clear Float) Manufacturer | 4-19mm Jumbo | Sincere Glass",
  description:
    "Factory-direct ultra-clear low iron glass (Fe2O3 < 0.01%, up to 91.5% VLT) fabricated in Wuhan, China. Tempered, laminated, IGU & ceramic frit up to 3.3m x 15m.",
  alternates: makeAlternates("/products/low-iron-glass"),
  openGraph: {
    title: "Low Iron Glass (Ultra-Clear) Manufacturer | Sincere Glass",
    description:
      "Ultra-clear architectural low iron glass (4-19mm) with <0.01% Fe2O3. Tempered, laminated, and insulated jumbo panels up to 3.3m x 15m from our 20,000 m2 Wuhan facility.",
    url: "https://sincereglass.com/products/low-iron-glass",
    type: "website",
    images: [
      {
        url: "https://sincereglass.com/images/products/low-iron.jpg",
        width: 1600,
        height: 900,
        alt: "Sincere Glass ultra-clear low iron architectural glass panels"
      }
    ]
  }
};

const FAQ_ITEMS = [
  {
    q: "What makes low iron glass different from standard clear float glass?",
    a: "Low iron glass reduces ferric oxide (Fe2O3) from ~0.11% down to below 0.01%, eliminating the green edge tint and raising visible light transmittance (VLT) to 90%-91.5% at 4-10mm."
  },
  {
    q: "What is the maximum panel size Sincere Glass can fabricate in low iron glass?",
    a: "In our 20,000 m2 Wuhan facility, our tempering furnaces and laminating autoclaves process jumbo low iron panels up to 3.3m x 15m, covering monolithic tempered, laminated, and insulated glazing."
  },
  {
    q: "What is the minimum order quantity (MOQ) and lead time for low iron glass?",
    a: "Standard MOQ is 100 m2 for common thicknesses (6mm, 8mm, 10mm) and 200-500 m2 for 15mm/19mm or jumbo plates. Lead time is 15-20 working days for tempered and 20-25 working days for laminated or IGU."
  },
  {
    q: "How does Chinese Tier-1 low iron float compare to Vitro Starphire or Pilkington Optiwhite?",
    a: "Tier-1 Chinese ultra-clear float (CSG, Xinyi, Taiwan Glass) meets the same <0.01% Fe2O3 and ~91% VLT optical thresholds under GB 11614-2022 and ASTM C1036, while saving 20%-40% on raw substrate cost."
  },
  {
    q: "Can low iron glass be combined with Low-E coatings or ceramic frit?",
    a: "Yes. Low iron is the preferred substrate for pure white or pastel ceramic frit spandrels (preventing green color shift) and for neutral-appearance Low-E insulated glass units."
  },
  {
    q: "What certifications and test reports are provided with export shipments?",
    a: "All safety glass produced in our Wuhan plant carries China 3C certification (GB 15763 / GB/T 11944). We supply float mill test certificates referencing ASTM C1036, EN 572-2, or GB 11614, plus batch inspection reports."
  }
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://sincereglass.com/products/low-iron-glass#service",
  name: "Low Iron Glass (Ultra-Clear Architectural Glass) Manufacturing",
  serviceType: "Architectural Glass Manufacturing",
  category: "Architectural Glass",
  description:
    "Custom fabrication of ultra-clear low iron architectural glass (Fe2O3 < 0.01%, 4-19mm) including jumbo tempering, PVB/SGP lamination, insulated glass units, and ceramic frit up to 3.3m x 15m.",
  provider: {
    "@type": "Organization",
    "@id": "https://sincereglass.com/#organization",
    name: "Sincere Glass",
    url: "https://sincereglass.com"
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Architects, Facade Contractors, Glass Distributors, Commercial Developers"
  },
  url: "https://sincereglass.com/products/low-iron-glass"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a
    }
  }))
};

export default function LowIronGlassProductPage() {
  return (
    <main className="bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Split Architectural Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-sky-300">
              Ultra-Clear Architectural Float | Fe2O3 &lt; 0.01%
            </div>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Low Iron Glass
              <span className="mt-2 block text-2xl font-semibold text-sky-400 sm:text-3xl">
                Crystal-Neutral Clarity Up to 3.3m x 15m
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Low iron glass (ultra-clear float) reduces iron oxide content below 0.01%, removing the green edge tint of standard clear glass and lifting visible light transmittance to 90%-91.5%. Fabricated in our 20,000 m2 Wuhan facility into monolithic tempered, PVB/SGP laminated, Low-E insulated, and white ceramic frit panels.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3.5">
                <div className="text-xs text-slate-400">Light Transmittance</div>
                <div className="mt-1 text-xl font-bold text-sky-400">91.2%</div>
                <div className="text-[11px] text-slate-400">at 6mm (VLT)</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3.5">
                <div className="text-xs text-slate-400">Thickness Range</div>
                <div className="mt-1 text-xl font-bold text-white">4 - 19 mm</div>
                <div className="text-[11px] text-slate-400">Float &amp; Tempered</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3.5">
                <div className="text-xs text-slate-400">Max Jumbo Size</div>
                <div className="mt-1 text-xl font-bold text-white">3.3 x 15 m</div>
                <div className="text-[11px] text-slate-400">Tempered &amp; Lami</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3.5">
                <div className="text-xs text-slate-400">Standards</div>
                <div className="mt-1 text-xl font-bold text-white">ASTM / EN</div>
                <div className="text-[11px] text-slate-400">C1036 / EN 572-2</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
              <Image
                src="/images/products/low-iron.jpg"
                alt="12mm ultra-clear low iron glass polished edge compared with standard clear glass"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
            <p className="mt-3 text-center text-xs text-slate-400">
              Colorless polished edge profile vs. standard green-tinted float glass
            </p>
          </div>
        </div>
      </section>

      {/* 2. Interactive Optical Lab + SSR Methodology */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900">
            Optical Clarity: Low Iron vs. Standard Clear Float
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            <strong>How the optical comparator works:</strong> Standard architectural float glass contains 0.10%-0.15% ferric oxide (Fe2O3), which absorbs red light and deepens the green tint as thickness increases from 4mm (90.0% VLT) to 19mm (79.0% VLT). Sincere Glass ultra-clear low iron substrate keeps Fe2O3 below 0.01%, maintaining 91.5% VLT at 4mm and 88.4% VLT at 19mm with CRI 98-99.
          </p>
        </div>
        <LowIronOpticalLab />
      </section>

      {/* 3. Technical Specifications Table (C22 Compliant) */}
      <section className="border-y border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-slate-900">
            Technical Specifications &amp; Wuhan Factory Envelope
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            All low iron glass is processed in-house on our 4 intelligent cutting lines, 4 edge-grinding lines, 2 tempering furnaces, 2 laminating autoclaves, and 2 insulated glass lines.
          </p>

          <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table
              className="w-full min-w-[640px] text-left text-sm"
              aria-label="Sincere Glass Low Iron Glass Technical Specifications"
            >
              <caption className="border-b border-slate-200 bg-slate-100/70 px-5 py-3 text-left text-xs font-medium text-slate-600">
                Sincere Glass Wuhan Factory Low Iron Specifications (Data verified: 2026-11-25; Standards: GB 11614-2022, ASTM C1036-21, EN 572-2:2012)
              </caption>
              <thead className="bg-slate-900 text-xs uppercase tracking-wider text-white">
                <tr>
                  <th scope="col" className="px-5 py-3.5">Parameter</th>
                  <th scope="col" className="px-5 py-3.5">Sincere Glass Capability</th>
                  <th scope="col" className="px-5 py-3.5">Reference Standard / Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <th scope="row" className="px-5 py-3.5 font-semibold text-slate-900">Iron Oxide Content (Fe2O3)</th>
                  <td className="px-5 py-3.5">&lt; 0.01% by weight (typically 0.008%-0.010%)</td>
                  <td className="px-5 py-3.5">GB 11614-2022 Ultra-Clear Float</td>
                </tr>
                <tr>
                  <th scope="row" className="px-5 py-3.5 font-semibold text-slate-900">Nominal Thicknesses</th>
                  <td className="px-5 py-3.5">4mm, 5mm, 6mm, 8mm, 10mm, 12mm, 15mm, 19mm</td>
                  <td className="px-5 py-3.5">6-12mm stocked; 15/19mm made to batch order</td>
                </tr>
                <tr>
                  <th scope="row" className="px-5 py-3.5 font-semibold text-slate-900">Max Processed Size</th>
                  <td className="px-5 py-3.5">Up to 3,300 mm x 15,000 mm (Jumbo)</td>
                  <td className="px-5 py-3.5">In-house 3.3m x 15m tempering &amp; autoclave</td>
                </tr>
                <tr>
                  <th scope="row" className="px-5 py-3.5 font-semibold text-slate-900">Visible Light Transmittance (6mm)</th>
                  <td className="px-5 py-3.5">91.0% - 91.5% (CRI 99)</td>
                  <td className="px-5 py-3.5">ISO 9050 / EN 410</td>
                </tr>
                <tr>
                  <th scope="row" className="px-5 py-3.5 font-semibold text-slate-900">Secondary Processing</th>
                  <td className="px-5 py-3.5">Tempered, Heat-Soak Tested (HST), PVB/SGP Laminated, IGU, Ceramic Frit, CNC Holes/Cutouts</td>
                  <td className="px-5 py-3.5">ASTM C1048, EN 12150, EN 14179, ASTM E2190</td>
                </tr>
                <tr>
                  <th scope="row" className="px-5 py-3.5 font-semibold text-slate-900">Substrate Brands Available</th>
                  <td className="px-5 py-3.5">Tier-1 Chinese Float (CSG, Xinyi, Taiwan Glass); branded import on request</td>
                  <td className="px-5 py-3.5">Mill Test Certificates (MTC) supplied per batch</td>
                </tr>
                <tr>
                  <th scope="row" className="px-5 py-3.5 font-semibold text-slate-900">Export Packaging &amp; MOQ</th>
                  <td className="px-5 py-3.5">ISPM-15 fumigated plywood crates / A-frames; MOQ 100 m2 (stock thicknesses)</td>
                  <td className="px-5 py-3.5">FOB Wuhan / Shanghai / Ningbo or CIF</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Interactive Spec Configurator + C23 Quote Prefill */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900">
            Fabrication Build-Up &amp; Container Weight Estimator
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            <strong>How the spec configurator works:</strong> Select a fabrication assembly (monolithic tempered, PVB/SGP laminated, hybrid outboard-only IGU, full low-iron IGU, or white ceramic frit), nominal lite thickness (5-19mm), and project area. The tool calculates unit weight at 2.5 kg/m2/mm, total metric tonnage, estimated 20-foot GP container count (capped at 19.5 MT payload), and Wuhan factory lead time, then pre-fills your quote request.
          </p>
        </div>
        <LowIronSpecConfigurator />
      </section>

      <InlineQuoteCTA variant="dark" />

      {/* 5. Interactive Applications Matrix */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900">
            Where Low Iron Glass Delivers the Highest ROI
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            <strong>How the application selector works:</strong> Explore four high-impact architectural zones - frameless showers and balustrades, luxury retail and museum vitrines, white back-painted spandrels, and jumbo lobby curtain walls - to review recommended thicknesses, build-ups, and governing building codes.
          </p>
        </div>
        <LowIronApplicationsMatrix />
      </section>

      {/* 6. Low Iron Technical Library (Cluster Hub Backlinks) */}
      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Low Iron Glass Engineering &amp; Sourcing Guides
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Deep-dive technical references from our engineering team to help you specify, budget, and source ultra-clear glass.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/blog/low-iron-glass-complete-guide"
              className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-sky-400 hover:shadow-md"
            >
              <div className="text-xs font-semibold uppercase text-sky-700">Pillar Guide</div>
              <div className="mt-1 font-bold text-slate-900">Low Iron Glass: Complete Specifier&apos;s Guide</div>
              <p className="mt-1.5 text-xs text-slate-600">Optical physics, Fe2O3 limits, thickness rules, and full architectural applications.</p>
            </Link>
            <Link
              href="/blog/low-iron-glass-vs-clear-glass"
              className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-sky-400 hover:shadow-md"
            >
              <div className="text-xs font-semibold uppercase text-sky-700">Comparison</div>
              <div className="mt-1 font-bold text-slate-900">Low Iron Glass vs. Standard Clear Glass</div>
              <p className="mt-1.5 text-xs text-slate-600">Side-by-side edge color, VLT curves, and when standard clear is enough.</p>
            </Link>
            <Link
              href="/blog/low-iron-glass-cost"
              className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-sky-400 hover:shadow-md"
            >
              <div className="text-xs font-semibold uppercase text-sky-700">Buyer&apos;s Guide</div>
              <div className="mt-1 font-bold text-slate-900">2026 Low Iron Glass Cost Breakdown</div>
              <p className="mt-1.5 text-xs text-slate-600">FOB Wuhan pricing matrix and value-engineering rules to cut uplift by 30%-50%.</p>
            </Link>
            <Link
              href="/blog/starphire-vs-low-iron"
              className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-sky-400 hover:shadow-md"
            >
              <div className="text-xs font-semibold uppercase text-sky-700">Brand Comparison</div>
              <div className="mt-1 font-bold text-slate-900">Starphire vs. Low Iron Glass</div>
              <p className="mt-1.5 text-xs text-slate-600">How Vitro Starphire, Optiwhite, and Chinese Tier-1 low-iron float compare.</p>
            </Link>
            <Link
              href="/blog/low-iron-glass-suppliers"
              className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-sky-400 hover:shadow-md"
            >
              <div className="text-xs font-semibold uppercase text-sky-700">Sourcing</div>
              <div className="mt-1 font-bold text-slate-900">Low Iron Glass Suppliers: Buyer&apos;s Checklist</div>
              <p className="mt-1.5 text-xs text-slate-600">How to audit float mill certificates, optical tolerances, and export crating.</p>
            </Link>
            <Link
              href="/blog/low-iron-tempered-glass"
              className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-sky-400 hover:shadow-md"
            >
              <div className="text-xs font-semibold uppercase text-sky-700">Specification</div>
              <div className="mt-1 font-bold text-slate-900">Low Iron Tempered Glass Spec Guide</div>
              <p className="mt-1.5 text-xs text-slate-600">Surface compression, heat-soak testing, and frameless hardware tolerances.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 space-y-4">
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-base font-bold text-slate-900">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
