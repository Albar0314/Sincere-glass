'use client';

import { useMemo, useState } from 'react';
type ProductKey = 'tempered' | 'laminated' | 'igu' | 'mirror' | 'enameled';
type SizeKey = 'standard' | 'oversize' | 'jumbo';
type QtyKey = 'sample' | 'trial' | 'project' | 'fcl';
interface Crate {
  id: 'a-frame' | 'l-type' | 'wooden-box' | 'flat-pallet';
  name: string;
  summary: string;
  bestFor: string[];
  weightGlassRatio: string; // panel weight : crate weight ratio
  costAdder: string; // approx $ per m2 added
  pros: string[];
  cons: string[];
  svg: 'a-frame' | 'l-type' | 'box' | 'pallet';
}
const CRATES: Record<Crate['id'], Crate> = {
  'a-frame': {
    id: 'a-frame',
    name: "Caja tipo A",
    summary: "Bastidor abierto de acero o madera que sostiene los paneles en posición vertical con una inclinación hacia atrás de 5–8° contra un soporte acolchado.",
    bestFor: ['Oversize architectural panels', 'Jumbo tempered or laminated', 'Project-scale orders'],
    weightGlassRatio: '~1 : 6 (crate : glass)',
    costAdder: '≈ USD 6–10 / m² of glass',
    pros: ['Carries jumbo panels up to 3.3.3 m × 15 m without a wooden box exceeding ISPM-15 fumigation limits', 'Panels load directly against the backing — zero point-load on glass corners', 'Fastest to load and unload (forklift from either side)'],
    cons: ['Needs ratchet strapping to tie-down rails on all four sides', 'Open frame: panels exposed to in-container humidity unless individually bagged'],
    svg: 'a-frame'
  },
  'l-type': {
    id: 'l-type',
    name: "Caja tipo L",
    summary: "Escuadras en L de acero que forman una base en ángulo recto, permitiendo que los paneles descansen verticalmente sobre su canto largo con un respaldo acolchado.",
    bestFor: ['Standard IGU shipments', 'Mixed-thickness orders', 'Mid-volume project glass'],
    weightGlassRatio: '~1 : 5',
    costAdder: '≈ USD 5–8 / m²',
    pros: ['Compact footprint; two L-crates fit most 40′HQ door-end profile', 'Weight-balanced for sea transit roll — center of gravity stays low', 'Reusable on the receiving side if the buyer wants crate return'],
    cons: ['Not suitable for panels longer than 4.5 m (unsupported bending)', 'Loader must stack from the deepest point outward (sequencing matters)'],
    svg: 'l-type'
  },
  'wooden-box': {
    id: 'wooden-box',
    name: "Caja de madera fumigada",
    summary: "Caja de madera de pino tratada térmicamente, completamente cerrada (sellada ISPM-15), con divisores internos de espuma.",
    bestFor: ['Mirror glass', 'Decorative / enameled glass', 'Buyers in countries requiring ISPM-15 at port'],
    weightGlassRatio: '~1 : 3',
    costAdder: '≈ USD 12–18 / m²',
    pros: ['Highest protection against moisture, dust, impact, and inspection handling', 'ISPM-15 compliant for Australia, EU, US, Canada, Japan customs', 'Stackable: 2 layers deep in a 40′HQ when weight allows'],
    cons: ['Heavy — reduces payload by 20–30 % versus A-frame', 'Panels must be ≤ standard dimensions (2.4 m × 3.6 m typical ceiling)', 'Opening at destination requires crowbar + proper PPE'],
    svg: 'box'
  },
  'flat-pallet': {
    id: 'flat-pallet',
    name: "Palé plano (horizontal)",
    summary: "Palé horizontal con láminas de espuma entre paneles, flejado y enfundado en film retráctil.",
    bestFor: ['Small-format cut sizes', 'Samples and trial orders', 'LCL/consolidated shipments only'],
    weightGlassRatio: '~1 : 4',
    costAdder: '≈ USD 3–5 / m²',
    pros: ['Lowest cost per m²', 'Easy to handle with a standard pallet jack at destination', 'Works for cut-size orders under 1.5 m longest side'],
    cons: ['Horizontal stacking creates compression stress on bottom panels during sea roll', 'Breakage rate 3–5× higher than vertical crating for anything over 6 mm thickness', 'No major factory recommends this for architectural glass over 2 m'],
    svg: 'pallet'
  }
};
function pickCrate(product: ProductKey, size: SizeKey, qty: QtyKey): Crate['id'] {
  // Mirror and decorative always want enclosure
  if (product === 'mirror' || product === 'enameled') return 'wooden-box';
  // Jumbo panels force A-frame regardless
  if (size === 'jumbo') return 'a-frame';
  // Oversize + volume → A-frame
  if (size === 'oversize' && (qty === 'project' || qty === 'fcl')) return 'a-frame';
  // Standard IGU → L-type is the industry default
  if (product === 'igu') return 'l-type';
  // Sample / trial / small cut → flat pallet acceptable
  if (qty === 'sample' || qty === 'trial' && size === 'standard') return 'flat-pallet';
  // Everything else → L-type
  return 'l-type';
}
const PRODUCT_LABEL: Record<ProductKey, string> = {
  tempered: 'Tempered glass',
  laminated: 'Laminated glass',
  igu: 'Insulated glass (IGU)',
  mirror: 'Mirror',
  enameled: 'Ceramic frit / enameled'
};
const SIZE_LABEL: Record<SizeKey, string> = {
  standard: "Estándar (≤ 2,4 m × 3,6 m)",
  oversize: 'Oversize (up to 2.4 m × 6 m)',
  jumbo: 'Jumbo (up to 3.3.3 m × 15 m)'
};
const QTY_LABEL: Record<QtyKey, string> = {
  sample: 'Samples (< 10 m²)',
  trial: 'Trial order (10–100 m²)',
  project: 'Project order (100–800 m²)',
  fcl: 'Full container (> 800 m²)'
};
function CrateSvg({
  kind
}: {
  kind: Crate['svg'];
}) {
  const stroke = '#DAA745';
  const panel = '#8B95A5';
  const base = '#3A4250';
  if (kind === 'a-frame') {
    return <svg viewBox="0 0 200 140" className="w-full h-full" aria-hidden>
        <line x1="20" y1="125" x2="180" y2="125" stroke={base} strokeWidth="4" />
        <line x1="100" y1="125" x2="100" y2="20" stroke={stroke} strokeWidth="3" />
        <line x1="100" y1="20" x2="40" y2="125" stroke={stroke} strokeWidth="2" />
        <line x1="100" y1="20" x2="160" y2="125" stroke={stroke} strokeWidth="2" />
        <rect x="55" y="40" width="40" height="80" fill={panel} opacity="0.6" transform="rotate(-5 75 80)" />
        <rect x="105" y="40" width="40" height="80" fill={panel} opacity="0.6" transform="rotate(5 125 80)" />
      </svg>;
  }
  if (kind === 'l-type') {
    return <svg viewBox="0 0 200 140" className="w-full h-full" aria-hidden>
        <path d="M 40 125 L 40 30 L 55 30 L 55 110 L 160 110 L 160 125 Z" fill={stroke} opacity="0.3" stroke={stroke} strokeWidth="2" />
        <rect x="60" y="35" width="90" height="70" fill={panel} opacity="0.7" />
        <line x1="80" y1="35" x2="80" y2="105" stroke="#1C1F26" strokeWidth="0.5" />
        <line x1="100" y1="35" x2="100" y2="105" stroke="#1C1F26" strokeWidth="0.5" />
        <line x1="120" y1="35" x2="120" y2="105" stroke="#1C1F26" strokeWidth="0.5" />
      </svg>;
  }
  if (kind === 'box') {
    return <svg viewBox="0 0 200 140" className="w-full h-full" aria-hidden>
        <rect x="30" y="30" width="140" height="95" fill={stroke} opacity="0.25" stroke={stroke} strokeWidth="2" />
        <line x1="30" y1="55" x2="170" y2="55" stroke={stroke} strokeWidth="1" />
        <line x1="30" y1="100" x2="170" y2="100" stroke={stroke} strokeWidth="1" />
        <text x="100" y="80" textAnchor="middle" fontSize="9" fill={stroke} fontWeight="600">ISPM-15</text>
      </svg>;
  }
  return <svg viewBox="0 0 200 140" className="w-full h-full" aria-hidden>
      <rect x="30" y="100" width="140" height="20" fill={base} />
      <line x1="40" y1="100" x2="40" y2="120" stroke="#1C1F26" strokeWidth="2" />
      <line x1="100" y1="100" x2="100" y2="120" stroke="#1C1F26" strokeWidth="2" />
      <line x1="160" y1="100" x2="160" y2="120" stroke="#1C1F26" strokeWidth="2" />
      <rect x="35" y="70" width="130" height="28" fill={panel} opacity="0.7" />
      <rect x="35" y="55" width="130" height="12" fill={panel} opacity="0.5" />
      <rect x="35" y="45" width="130" height="8" fill={panel} opacity="0.4" />
    </svg>;
}
export default function CrateTypeSelector() {
  const [product, setProduct] = useState<ProductKey>('tempered');
  const [size, setSize] = useState<SizeKey>('standard');
  const [qty, setQty] = useState<QtyKey>('project');
  const recommended = useMemo(() => CRATES[pickCrate(product, size, qty)], [product, size, qty]);
  const Select = <T extends string,>({
    label,
    value,
    options,
    onChange
  }: {
    label: string;
    value: T;
    options: Record<T, string>;
    onChange: (v: T) => void;
  }) => <label className="block">
      <span className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">{label}</span>
      <select value={value} onChange={e => onChange(e.target.value as T)} className="w-full px-4 py-2.5 rounded-lg bg-[#1C1F26] border border-[#3A4250] text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745] transition-colors">
        {(Object.entries(options) as [T, string][]).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
      </select>
    </label>;
  return <section className="my-10 rounded-2xl border border-[#3A4250]/50 bg-[#3A4250]/10 overflow-hidden">
      <header className="px-6 py-5 border-b border-[#3A4250]/40">
        <h3 className="text-lg font-semibold text-[#F2F0ED] m-0">Selector de tipo de embalaje</h3>
        <p className="text-sm text-[#8B95A5] m-0 mt-1">Seleccione su perfil de pedido. El sistema recomienda el método de embalaje que utilizamos en nuestra fábrica de Wuhan.</p>
      </header>

      <div className="grid md:grid-cols-[280px_1fr]">
        <div className="p-6 space-y-4 border-b md:border-b-0 md:border-r border-[#3A4250]/40">
          <Select label="Product" value={product} options={PRODUCT_LABEL} onChange={setProduct} />
          <Select label="Tamaño del panel" value={size} options={SIZE_LABEL} onChange={setSize} />
          <Select label="Volumen del pedido" value={qty} options={QTY_LABEL} onChange={setQty} />
        </div>

        <div className="p-6">
          <div className="flex items-start gap-5 mb-5">
            <div className="w-24 h-16 bg-[#1C1F26] rounded-lg flex items-center justify-center flex-shrink-0 border border-[#3A4250]/40">
              <CrateSvg kind={recommended.svg} />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-[#DAA745] font-semibold uppercase tracking-wider mb-1">Recommended</div>
              <div className="text-xl font-semibold text-[#F2F0ED] mb-1">{recommended.name}</div>
              <p className="text-sm text-[#8B95A5] leading-relaxed m-0">{recommended.summary}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-5 text-sm">
            <div>
              <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-1">Peso caja : vidrio</div>
              <div className="text-[#F2F0ED]">{recommended.weightGlassRatio}</div>
            </div>
            <div>
              <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-1">Coste adicional</div>
              <div className="text-[#F2F0ED]">{recommended.costAdder}</div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-[#DAA745] uppercase tracking-wider mb-2 font-semibold">Pros</div>
              <ul className="space-y-1.5 list-none p-0 m-0">
                {recommended.pros.map((p, i) => <li key={i} className="text-xs text-[#F2F0ED] flex gap-2 leading-relaxed">
                    <span className="text-[#DAA745] flex-shrink-0">+</span><span>{p}</span>
                  </li>)}
              </ul>
            </div>
            <div>
              <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-2 font-semibold">Cons</div>
              <ul className="space-y-1.5 list-none p-0 m-0">
                {recommended.cons.map((c, i) => <li key={i} className="text-xs text-[#8B95A5] flex gap-2 leading-relaxed">
                    <span className="text-[#8B95A5] flex-shrink-0">–</span><span>{c}</span>
                  </li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>;
}