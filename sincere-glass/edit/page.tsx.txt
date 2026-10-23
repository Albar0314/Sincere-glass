import type { Metadata } from "next";
import CurvatureVisualizer from "@/components/products/curved-tempered/CurvatureVisualizer";
import CurveTypologySelector from "@/components/products/curved-tempered/CurveTypologySelector";
import FeasibilityChecker from "@/components/products/curved-tempered/FeasibilityChecker";
import { makeAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Curved Tempered Glass | Hot-Bent to R500 mm — Sincere Glass",
  description:
    "China manufacturer of curved tempered glass. Hot-bent to a 500 mm minimum radius, up to 3,300 × 15,000 mm per panel. Cylindrical, spherical, and free-form geometries. GB 15763.2 / EN 12150 compliant.",
  keywords: [
    "curved tempered glass",
    "bent tempered glass",
    "curved glass manufacturer",
    "cylindrical glass",
    "spherical glass",
    "hot-bent glass",
    "cold-bent glass",
    "弯钢玻璃",
    "热弯玻璃",
    "curved glass china supplier",
  ],
  openGraph: {
    title: "Curved Tempered Glass | Sincere Glass",
    description:
      "Hot-bent architectural glass from a 500 mm minimum radius to 3.3 m × 15 m panels. Cylindrical, spherical, and free-form.",
    url: "https://sincereglass.com/products/curved-tempered-glass",
    images: ["/images/products/curved-tempered-hero.webp"],
  },
  alternates: makeAlternates("/products/curved-tempered-glass"),
};

const faqItems = [
  {
    q: "What is the minimum curve radius you can achieve?",
    a: "Our tightest achievable radius is 500 mm, limited to 6 mm panel thickness. For a 10 mm panel the floor rises to about 900 mm; for 19 mm, around 2,500 mm. Thinner glass bends tighter. The Feasibility Checker above enforces these limits in real time.",
  },
  {
    q: "What is the largest curved panel you can manufacture?",
    a: "Our envelope is 3,300 mm by 15,000 mm per panel, matching our jumbo tempering furnace. Panels larger than this are typically built as multi-panel assemblies with structural silicone or point-fixed joints.",
  },
  {
    q: "Do you do hot-bending or cold-bending?",
    a: "Both. Hot-bending (heating the glass above its softening point and forming over a mold) is used for radii below about 3,000 mm. Cold-bending (flexing a flat panel into a curved frame during installation) is used for shallow curves above 5,000 mm radius when the panel sees low shear load. Between 3,000 and 5,000 mm the choice depends on project economics.",
  },
  {
    q: "Can curved glass be laminated or insulated?",
    a: "Yes. We produce curved laminated glass (PVB or SGP interlayer) and curved insulated units (IGU) using bent tempered panels. Lamination adds safety containment and sound reduction; IGU adds thermal performance. Both are standard options on the quote form.",
  },
  {
    q: "What tolerance can you hold on a curved panel?",
    a: "Cylindrical panels: plus or minus 2 mm on chord length and plus or minus 1 degree on angular alignment. Spherical panels: plus or minus 4 mm on chord, plus or minus 2 degrees on angle. Free-form panels: plus or minus 3 mm along the defined profile. Cold-bent panels, measured after installation, hold plus or minus 5 mm.",
  },
  {
    q: "What is the MOQ for curved tempered glass?",
    a: "For cylindrical panels, there is no hard MOQ. We can produce single panels using a reusable steel mold. For spherical and free-form panels, mold cost is amortized over the order; a 4-panel minimum is typical to keep per-unit mold cost reasonable.",
  },
  {
    q: "What standards does your curved tempered glass meet?",
    a: "Our curved tempered glass is produced to GB 15763.2 (China safety glass standard) and EN 12150 (European tempered glass standard). It carries China 3C (CCC) certification. For export markets we can provide EN 12150 or ANSI Z97.1 test reports on request.",
  },
  {
    q: "How do I confirm feasibility before placing an order?",
    a: "Share a drawing or 3D model (DWG, STEP, or IFC) with us. Our engineering team confirms feasibility, flags any dimensional conflicts, and returns a formal quote within 2 business days. For complex geometries we also recommend a sample bend before full production.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Curved Tempered Glass Manufacturing",
  serviceType: "Architectural Glass Manufacturing",
  category: "Architectural Glass",
  provider: {
    "@type": "Organization",
    name: "Sincere Glass",
    url: "https://sincereglass.com",
  },
  areaServed: "Worldwide",
  audience: { "@type": "BusinessAudience", audienceType: "Architects, contractors, facade specialists" },
  description:
    "Hot-bent and cold-bent tempered glass for architectural applications. Minimum radius 500 mm, maximum panel size 3,300 mm by 15,000 mm. Cylindrical, spherical, and free-form geometries. GB 15763.2 and EN 12150 compliant.",
};

export default function CurvedTemperedGlassPage() {
  return (
    <main>
      {/* HERO - split-screen */}
      <section className="bg-brand-dark pt-28 pb-20 md:pt-32 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-primary/40 to-brand-dark pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-brand-accent text-sm font-semibold uppercase tracking-wider mb-3">
                Curved Architectural Glass
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                Curved Tempered Glass
              </h1>
              <p className="mt-5 text-white/70 text-lg md:text-xl leading-relaxed max-w-xl">
                Hot-bent and cold-bent panels for facades, lifts, canopies, and sculptural glazing. Radii from{" "}
                <span className="text-brand-accent font-semibold">500 mm</span> to shallow curves, up to{" "}
                <span className="text-brand-accent font-semibold">3.3 m x 15 m</span> per panel.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#feasibility"
                  className="inline-flex items-center px-6 py-3 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors"
                >
                  Check feasibility
                </a>
                <a
                  href="#quote"
                  className="inline-flex items-center px-6 py-3 border border-white/20 hover:border-white/40 text-white font-semibold rounded-md transition-colors"
                >
                  Request a quote
                </a>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                <div>
                  <p className="text-brand-accent text-2xl md:text-3xl font-bold">500 mm</p>
                  <p className="text-white/50 text-xs uppercase tracking-wider mt-1">Minimum radius</p>
                </div>
                <div>
                  <p className="text-brand-accent text-2xl md:text-3xl font-bold">3.3 x 15 m</p>
                  <p className="text-white/50 text-xs uppercase tracking-wider mt-1">Max panel</p>
                </div>
                <div>
                  <p className="text-brand-accent text-2xl md:text-3xl font-bold">3 axes</p>
                  <p className="text-white/50 text-xs uppercase tracking-wider mt-1">Cylinder / sphere / free</p>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <svg viewBox="0 0 500 400" className="w-full h-auto">
                <defs>
                  <linearGradient id="hero-glass" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#DAA745" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#DAA745" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#DAA745" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="hero-edge" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#DAA745" />
                    <stop offset="100%" stopColor="#DAA745" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <path d="M 100 350 Q 250 50 400 350" fill="none" stroke="url(#hero-edge)" strokeWidth="3" opacity="0.3" />
                <path d="M 80 350 Q 250 80 420 350" fill="url(#hero-glass)" stroke="#DAA745" strokeWidth="2" opacity="0.7" />
                <path d="M 60 350 Q 250 110 440 350" fill="none" stroke="#DAA745" strokeWidth="2" opacity="0.4" />
                <line x1="250" y1="200" x2="250" y2="80" stroke="#DAA745" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
                <circle cx="250" cy="200" r="4" fill="#DAA745" />
                <text x="260" y="150" fill="#DAA745" className="text-xs font-mono">R</text>
                <line x1="60" y1="355" x2="440" y2="355" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2 2" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS */}
      <section className="py-16 md:py-20 bg-brand-lighter">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark mb-6">
            What is curved tempered glass?
          </h2>
          <div className="prose prose-lg max-w-none text-brand-dark/80 leading-relaxed">
            <p>
              Curved tempered glass is architectural glass that has been formed to a curve <em>and</em> heat-treated for safety.
              The forming happens in two main ways. In <strong>hot-bending</strong>, a flat glass sheet is heated above its softening
              point (around 650 degrees Celsius) and allowed to sag or press over a shaped mold; the curve is then locked in during the
              tempering cooling cycle. In <strong>cold-bending</strong>, a flat tempered panel is physically flexed into a
              curved frame during installation; the panel stays stressed in place for the life of the facade.
            </p>
            <p>
              The result in either case is a panel that holds its curved profile permanently, breaks safely into small blunt
              fragments if it ever fails, and meets the same GB 15763.2 and EN 12150 safety-glass standards as flat tempered
              glass. The curve is not a coating or a trick. It is baked into the glass itself.
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE 1 - Curvature Visualizer */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="mb-8">
            <p className="text-brand-accent text-sm font-semibold uppercase tracking-wider mb-2">Try it</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark">
              See the curve before you quote it
            </h2>
            <p className="mt-3 text-brand-muted max-w-2xl">
              Drag the radius slider to see how a panel bends across our full working range. The verdict panel shows which
              production process we would use at that radius.
            </p>
          </div>
          <CurvatureVisualizer />
        </div>
      </section>

      {/* MANUFACTURING PROCESS */}
      <section className="py-16 md:py-20 bg-brand-lighter">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="mb-10">
            <p className="text-brand-accent text-sm font-semibold uppercase tracking-wider mb-2">Inside the furnace</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark">
              How a curved panel is made
            </h2>
            <p className="mt-3 text-brand-muted max-w-3xl">
              The hot-bending process adds three steps on top of standard tempering: mold preparation, controlled sagging,
              and shape-locked quenching. The whole cycle for a mid-size panel runs 90 to 180 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: "1",
                title: "Mold prep",
                desc: "A steel mold matching the target radius is cleaned, aligned, and preheated in the furnace entry zone.",
                icon: (
                  <svg viewBox="0 0 48 48" className="w-10 h-10"><rect x="8" y="20" width="32" height="4" fill="#DAA745"/><path d="M 10 24 Q 24 36 38 24" stroke="#DAA745" strokeWidth="2" fill="none"/></svg>
                ),
              },
              {
                step: "2",
                title: "Panel loading",
                desc: "The flat tempered-grade float panel is placed horizontally on the mold rails.",
                icon: (
                  <svg viewBox="0 0 48 48" className="w-10 h-10"><rect x="6" y="18" width="36" height="3" fill="#8B95A5"/><path d="M 8 28 L 40 28" stroke="#DAA745" strokeWidth="2"/><path d="M 10 32 L 38 32" stroke="#DAA745" strokeWidth="2" opacity="0.5"/></svg>
                ),
              },
              {
                step: "3",
                title: "Heating to 650C",
                desc: "Panel enters the main furnace; soaking brings it above softening point. Glass begins to self-sag onto the mold.",
                icon: (
                  <svg viewBox="0 0 48 48" className="w-10 h-10"><path d="M 10 22 Q 24 32 38 22" stroke="#DAA745" strokeWidth="2" fill="none"/><path d="M 12 10 L 14 16 M 20 8 L 20 16 M 28 8 L 28 16 M 36 10 L 34 16" stroke="#dc2626" strokeWidth="1.5"/></svg>
                ),
              },
              {
                step: "4",
                title: "Shape-locked quench",
                desc: "High-velocity air quench on both faces instantly locks the curve in and builds the compressive stress layer.",
                icon: (
                  <svg viewBox="0 0 48 48" className="w-10 h-10"><path d="M 10 24 Q 24 14 38 24" stroke="#DAA745" strokeWidth="2" fill="none"/><path d="M 14 32 L 14 40 M 20 32 L 20 40 M 26 32 L 26 40 M 32 32 L 32 40" stroke="#0369a1" strokeWidth="1.5"/></svg>
                ),
              },
              {
                step: "5",
                title: "Inspection and packing",
                desc: "Each panel is checked for curvature deviation, surface quality, and 3C-standard breakage pattern on sample pieces.",
                icon: (
                  <svg viewBox="0 0 48 48" className="w-10 h-10"><circle cx="24" cy="22" r="10" stroke="#DAA745" strokeWidth="2" fill="none"/><path d="M 20 22 L 23 25 L 29 19" stroke="#059669" strokeWidth="2" fill="none"/></svg>
                ),
              },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 relative">
                <div className="absolute top-3 right-4 text-5xl font-display font-bold text-brand-accent/15 leading-none">
                  {s.step}
                </div>
                <div className="mb-3">{s.icon}</div>
                <h3 className="font-display font-bold text-brand-dark mb-1.5">{s.title}</h3>
                <p className="text-xs text-brand-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE 2 - Curve Typology Selector */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="mb-8">
            <p className="text-brand-accent text-sm font-semibold uppercase tracking-wider mb-2">Not all curves are equal</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark">
              Pick the geometry that matches your drawing
            </h2>
            <p className="mt-3 text-brand-muted max-w-2xl">
              Cylindrical, spherical, and free-form panels each need different tooling. The right choice depends on the
              architect intent and shapes the cost floor.
            </p>
          </div>
          <CurveTypologySelector />
        </div>
      </section>

      {/* Inline CTA band (replaces missing InlineQuoteCTA) */}
      <section className="py-12 bg-brand-lighter">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="rounded-2xl bg-gradient-to-br from-brand-dark to-brand-primary p-6 md:p-10 shadow-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white">
                  Working on a curved facade?
                </h3>
                <p className="mt-2 text-white/70 text-sm md:text-base max-w-xl">
                  Send us your DWG, STEP, or IFC model. Our engineering team confirms feasibility and returns a formal quote within 2 business days.
                </p>
              </div>
              <a
                href="#quote"
                className="inline-flex items-center px-6 py-3 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors whitespace-nowrap shrink-0"
              >
                Request a Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE 3 - Feasibility Checker */}
      <section id="feasibility" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <FeasibilityChecker />
        </div>
      </section>

      {/* WHY SINCERE */}
      <section className="py-16 md:py-20 bg-brand-dark text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="mb-10">
            <p className="text-brand-accent text-sm font-semibold uppercase tracking-wider mb-2">Why Sincere Glass</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              A 20,000 sqm facility built around jumbo and specialty curved work
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                stat: "500 mm",
                heading: "Tightest achievable radius",
                body: "Hot-bending at the 500 mm floor sits below the 800 mm minimum most Chinese and Southeast Asian plants publish. Reached with 6 mm panels and a dedicated steel mold.",
              },
              {
                stat: "3.3 x 15 m",
                heading: "Jumbo panel envelope",
                body: "Our tempering furnace and autoclave accept panels up to 3,300 mm x 15,000 mm, among the largest in Hubei province. Curved and jumbo in one order is possible.",
              },
              {
                stat: "15+ yr",
                heading: "Domestic track record",
                body: "Fifteen years supplying architects and glazing contractors across China. Curved tempered is a repeat-order product line, not a side experiment.",
              },
              {
                stat: "GB + EN",
                heading: "Dual-standard output",
                body: "Every curved tempered panel is produced to GB 15763.2 and tested against EN 12150. Test reports are issued on request for export projects.",
              },
            ].map((c) => (
              <div key={c.heading} className="rounded-xl bg-white/5 border border-white/10 p-5">
                <p className="text-brand-accent text-3xl font-display font-bold">{c.stat}</p>
                <h3 className="text-white font-semibold mt-2 mb-2">{c.heading}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section className="py-16 md:py-20 bg-brand-lighter">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark mb-8">Specifications</h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm" aria-label="Curved tempered glass production specifications">
              <caption className="sr-only">Curved tempered glass production specifications. Data verified: 2026-10-23.</caption>
              <tbody>
                {[
                  ["Thickness range", "6 mm, 8 mm, 10 mm, 12 mm, 15 mm, 19 mm"],
                  ["Minimum radius", "500 mm (6 mm panels); scales with thickness. Use Feasibility Checker above."],
                  ["Maximum panel size", "3,300 mm x 15,000 mm per panel"],
                  ["Geometries", "Cylindrical (single-axis), spherical (double-axis), free-form (asymmetric)"],
                  ["Forming methods", "Hot-bending (R below 3,000 mm), cold-bending (R above 5,000 mm), either in between"],
                  ["Dimensional tolerance", "Cylindrical: +/-2 mm; spherical: +/-4 mm; free-form: +/-3 mm along profile"],
                  ["Compatible build-ups", "Monolithic, laminated (PVB / SGP), insulated (IGU), curved + Low-E coated"],
                  ["Standards", "GB 15763.2 (China), EN 12150 (Europe), ANSI Z97.1 on request"],
                  ["Certification", "China 3C (CCC); EN test reports available for export"],
                ].map(([k, v]) => (
                  <tr key={k} className="border-b border-gray-100 last:border-0">
                    <td className="py-3 px-5 font-semibold text-brand-dark w-1/3 bg-brand-lighter/50">{k}</td>
                    <td className="py-3 px-5 text-brand-dark/85">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-brand-muted">
            Specifications verified: 2026-10-23. Final capability confirmation requires drawing review.
          </p>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark mb-8">Applications</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { title: "Panoramic lifts and elevators", desc: "Cylindrical shafts up to 15 m tall from a single panel." },
              { title: "Curved curtain walls", desc: "Multi-panel facades for airports, museums, and corporate HQs." },
              { title: "Dome skylights and oculus", desc: "Spherical segments for atria, courtyards, and transit halls." },
              { title: "Entrance canopies", desc: "Shallow single-axis curves above building entrances and porte-cocheres." },
              { title: "Curved shopfronts", desc: "Boutique retail facades, luxury showrooms, and flagship stores." },
              { title: "Marine and yacht glazing", desc: "Free-form panels for superyacht wheelhouses and bridge wings." },
            ].map((a) => (
              <div key={a.title} className="group rounded-xl bg-brand-lighter/40 border border-gray-100 p-5 hover:border-brand-accent/40 transition-colors">
                <h3 className="font-display font-bold text-brand-dark mb-1.5 group-hover:text-brand-accent transition-colors">
                  {a.title}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-brand-lighter">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark mb-8">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details key={item.q} className="group bg-white rounded-xl border border-gray-200 p-5 open:shadow-md transition-shadow">
                <summary className="cursor-pointer font-semibold text-brand-dark flex items-start justify-between gap-4 list-none">
                  <span>{item.q}</span>
                  <span className="text-brand-accent group-open:rotate-45 transition-transform text-xl leading-none shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-brand-dark/80 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Trust band (replaces missing SocialProof) */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-display text-3xl font-bold text-brand-accent">20,000</p>
              <p className="text-xs text-brand-muted uppercase tracking-wider mt-1">Square meters facility</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-brand-accent">15+</p>
              <p className="text-xs text-brand-muted uppercase tracking-wider mt-1">Years in architectural glass</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-brand-accent">3C</p>
              <p className="text-xs text-brand-muted uppercase tracking-wider mt-1">CCC certified</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-brand-accent">2600+</p>
              <p className="text-xs text-brand-muted uppercase tracking-wider mt-1">Delivered projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-brand-dark text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            Ready to curve the glass?
          </h2>
          <p className="mt-3 text-white/60">
            Send us your drawing. We confirm feasibility and return a formal quote within 2 business days.
          </p>
          <a
            href="#quote"
            className="inline-flex items-center justify-center mt-6 px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors"
          >
            Request a Quote
          </a>
        </div>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}
