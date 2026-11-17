// SG-IGU-PRODUCT-UPGRADE-V1 - static configuration table for /products/insulated-glass
// ASCII-only source. No hooks: fully rendered at SSR.

const ROWS: { makeup: string; total: string; weight: string; u: string; use: string }[] = [
  { makeup: "6 + 12A + 6", total: "24 mm", weight: "30", u: "2.8", use: "Interior partitions, mild climates, budget retrofits" },
  { makeup: "6 Low-E#2 + 12A + 6", total: "24 mm", weight: "30", u: "1.8", use: "Entry-level energy code compliance" },
  { makeup: "6T Low-E#2 + 12Ar + 6T", total: "24 mm", weight: "30", u: "1.6", use: "Standard commercial windows and storefronts" },
  { makeup: "6T Low-E#2 + 15Ar + 6T", total: "27 mm", weight: "30", u: "1.4", use: "Curtain walls and higher energy targets" },
  { makeup: "8T Low-E#2 + 12Ar + 8T", total: "28 mm", weight: "40", u: "1.6", use: "Large lites and higher wind load zones" },
  { makeup: "6T Low-E#2 + 12Ar + 5+0.76PVB+5 laminated", total: "28.76 mm", weight: "41", u: "1.6", use: "Overhead glazing, acoustic and safety-rated facades" },
  { makeup: "6T Low-E#2 + 12Ar + 6T + 12Ar + 6T Low-E#5", total: "42 mm", weight: "45", u: "1.0", use: "Cold climates and high-performance envelopes" },
];

export default function IGUConfigurationTable() {
  return (
    <section id="igu-configurations" className="py-16 md:py-24 bg-brand-lighter">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <p className="text-xs uppercase tracking-wider text-brand-accent font-semibold mb-2">Common configurations</p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-dark tracking-tight">
          Insulated glass make-ups we build most often
        </h2>
        <p className="mt-3 text-brand-muted max-w-3xl">
          If you need one default for a commercial window, specify 6T Low-E#2 + 12Ar + 6T: 24 mm overall and about
          1.6 W/m2K. If the project is a curtain wall or has a higher energy target, widen the argon cavity to 15 mm. If it is a cold climate, go triple. In the make-up string, the number is glass thickness in mm,
          T means tempered, A is an air cavity, Ar is an argon cavity, and #2 or #5 is the surface that carries the
          Low-E coating, counted from outside.
        </p>

        <div className="mt-8 overflow-x-auto rounded-xl bg-white shadow-sm">
          <table className="w-full text-sm text-left" aria-label="Common insulated glass unit configurations">
            <caption className="caption-bottom px-4 py-3 text-xs text-brand-muted text-left">
              Indicative center-of-glass U-values calculated to the EN 673 method. Weight is glass only at 2.5 kg per
              m2 per mm. Final values are confirmed per project. Data verified: 2026-11-17.
            </caption>
            <thead className="bg-brand-dark text-white">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Make-up</th>
                <th scope="col" className="px-4 py-3 font-semibold">Overall thickness</th>
                <th scope="col" className="px-4 py-3 font-semibold">Weight (kg/m2)</th>
                <th scope="col" className="px-4 py-3 font-semibold">U-value (W/m2K)</th>
                <th scope="col" className="px-4 py-3 font-semibold">Typical use</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.makeup} className="border-t border-black/5">
                  <th scope="row" className="px-4 py-3 font-semibold text-brand-dark">{r.makeup}</th>
                  <td className="px-4 py-3 text-brand-dark">{r.total}</td>
                  <td className="px-4 py-3 text-brand-dark">{r.weight}</td>
                  <td className="px-4 py-3 text-brand-dark">{r.u}</td>
                  <td className="px-4 py-3 text-brand-muted">{r.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-brand-muted">
          Cavity widths available: 6, 9, 12, 15 and 20 mm. Any pane can be tempered, laminated, tinted or ceramic
          fritted in the same plant before the unit is sealed.
        </p>
      </div>
    </section>
  );
}
