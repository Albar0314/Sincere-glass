// SG-IGU-PRODUCT-UPGRADE-V1 - cluster internal links for /products/insulated-glass
// ASCII-only source. No hooks: fully rendered at SSR.
import Link from "@/components/LocalizedLink";

const GUIDES: { href: string; title: string; desc: string }[] = [
  {
    href: "/blog/insulated-glass-complete-guide",
    title: "IGU fundamentals: build-up, performance and ordering",
    desc: "The full reference: how a unit is built, what drives U-value, and what to put in an order.",
  },
  {
    href: "/blog/double-pane-vs-triple-pane-glass",
    title: "Double pane or triple pane: where the third lite pays back",
    desc: "Climate zone, weight and cost trade-offs between two and three panes.",
  },
  {
    href: "/blog/argon-vs-krypton-gas-fill-igu",
    title: "Argon vs krypton fill: cavity width and cost",
    desc: "Which gas fits which cavity, and when the krypton premium is justified.",
  },
  {
    href: "/blog/u-factor-and-shgc-explained",
    title: "How to read U-factor and SHGC on a spec sheet",
    desc: "The two numbers that decide heat loss and solar gain, and how to choose them by climate.",
  },
  {
    href: "/blog/how-is-insulated-glass-made",
    title: "Inside the IGU line: spacer, desiccant, dual seal",
    desc: "Step by step through production, and what each stage means for service life.",
  },
  {
    href: "/blog/insulated-glass-vs-laminated-glass",
    title: "Insulated or laminated: thermal vs safety priorities",
    desc: "When you need one, the other, or a laminated pane inside an insulated unit.",
  },
];

export default function InsulatedGuides() {
  return (
    <section id="igu-guides" className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <p className="text-xs uppercase tracking-wider text-brand-accent font-semibold mb-2">Specifier guides</p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-dark tracking-tight">
          Go deeper before you specify
        </h2>
        <p className="mt-3 text-brand-muted max-w-3xl">
          Six guides from our production team cover the decisions behind an insulated glass order, from pane count
          to gas fill to reading the performance numbers.
        </p>
        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {GUIDES.map((g) => (
            <li key={g.href}>
              <Link
                href={g.href}
                className="group block h-full rounded-xl border border-black/10 p-5 hover:border-brand-accent transition-colors"
              >
                <span className="block font-display font-semibold text-brand-dark group-hover:text-brand-accent transition-colors">
                  {g.title}
                </span>
                <span className="mt-1 block text-sm text-brand-muted">{g.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-brand-muted">
          Weighing a third pane on cost? Run the numbers in the{" "}
          <Link href="/tools/triple-pane-roi-calculator" className="text-brand-dark underline hover:text-brand-accent">
            triple pane payback calculator
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
