export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string[];
  image: string;
  specs: { label: string; value: string }[];
  features: { title: string; desc: string }[];
  applications: string[];
  standard: string;
  /** Synonyms, abbreviations, industry terms, and CN translations for search */
  searchKeywords: string[];
}

export const products: Product[] = [
  {
    slug: "tempered-glass",
    name: "Tempered Glass",
    tagline: "4-5× stronger than annealed glass with safe fragmentation",
    description: [
      "Tempered glass is a type of safety glass produced by heating high-quality float glass near its softening point, then rapidly cooling the surface. This creates compressive stress on the surface and tensile stress in the core — making it 4 to 5 times stronger than ordinary annealed glass.",
      "When broken, tempered glass shatters into small, blunt granules rather than sharp shards, significantly reducing the risk of injury. Its thermal resistance is also 3 times that of standard float glass of the same thickness.",
    ],
    image: "/images/products/tempered.jpg",
    specs: [
      { label: "Thickness", value: "3.8mm – 19mm"
  },
      { label: "Max Panel Size", value: "3,000mm × 15,000mm" },
      { label: "Strength", value: "4-5× ordinary glass" },
      { label: "Thermal Resistance", value: "3× ordinary float glass" },
      { label: "Processing", value: "Flat & bent tempering available" },
      { label: "Certification", value: "China 3C (CCC) Certified" },
    ],
    features: [
      { title: "Mechanical Strength", desc: "Impact resistance and bending strength 4-5 times that of ordinary glass." },
      { title: "Thermal Shock Resistance", desc: "Withstands large temperature differentials without cracking — 3× the resistance of standard float glass." },
      { title: "Safe Fragmentation", desc: "Breaks into small, blunt-edged particles that minimize risk of serious injury." },
      { title: "Oversized Panels", desc: "Our tempering furnace handles panels up to 3m × 15m — among the largest in Hubei province." },
    ],
    applications: [
      "Curtain walls and building facades",
      "Shower enclosures and bathroom partitions",
      "Glass doors and storefronts",
      "Balustrades and railings",
      "Skylight and canopy glazing",
      "Furniture and tabletops",
    ],
    standard: "GB 15763.2-2005 — Safety Glass for Buildings, Part 2: Tempered Glass",
    searchKeywords: ["tempered", "toughened", "safety glass", "strengthened glass", "heat strengthened", "thermally toughened", "3C certified", "CCC", "curtain wall", "shower", "balustrade", "railing", "skylight", "钢化玻璃", "钢化", "安全玻璃", "强化玻璃"],
  },
  {
    slug: "insulated-glass",
    name: "Insulated Glass",
    tagline: "Superior thermal and acoustic insulation for energy-efficient buildings",
    description: [
      "Insulated glass units (IGUs) consist of two or more glass panes separated by a sealed air or gas-filled space. This construction provides excellent thermal insulation, sound reduction, and can significantly reduce building energy costs.",
      "Our IGUs use double-seal spacer technology for long-term durability. Wind pressure resistance is 1.5 times that of single-pane glass of the same thickness. We offer both standard and oversized units with automated argon gas filling.",
    ],
    image: "/images/products/insulated.jpg",
    specs: [
      { label: "Spacer Options", value: "6mm, 9mm, 12mm, 15mm, 20mm"
  },
      { label: "Glass Options", value: "Clear, Low-E, tinted, reflective" },
      { label: "Gas Fill", value: "Air or Argon (automated filling line)" },
      { label: "Seal Type", value: "Dual-seal (PIB + structural silicone)" },
      { label: "Wind Resistance", value: "1.5× single pane glass" },
      { label: "Certification", value: "China 3C (CCC) Certified" },
    ],
    features: [
      { title: "Energy Savings", desc: "Shading coefficient of 0.22-0.49 reduces cooling loads. Heat transfer coefficient of 1.4-2.8 W/m²·K outperforms standard IGUs." },
      { title: "Indoor Comfort", desc: "Blocks solar radiation heat gain and reduces glare from afternoon sun, improving occupant comfort year-round." },
      { title: "Acoustic Insulation", desc: "Significant noise reduction for urban environments — ideal for offices, hospitals, and residential buildings near busy roads." },
      { title: "Design Flexibility", desc: "Available in multiple tints and coatings for both aesthetic and functional customization." },
    ],
    applications: [
      "Office towers and commercial buildings",
      "Exhibition halls and libraries",
      "Computer rooms and precision instrument facilities",
      "Chemical plants requiring constant temperature/humidity",
      "Residential windows and sliding doors",
      "Sun-shading and anti-glare installations",
    ],
    standard: "GB/T 11944-2012 — Insulated Glass (National Standard)",
    searchKeywords: ["insulated", "insulating", "IGU", "double glazing", "triple glazing", "DGU", "double pane", "thermal", "energy efficient", "U-value", "argon filled", "warm edge", "spacer", "sealed unit", "中空玻璃", "中空", "双层玻璃", "节能玻璃"],
  },
  {
    slug: "laminated-glass",
    name: "Laminated Glass",
    tagline: "Impact-resistant safety glass with superior sound and UV blocking",
    description: [
      "Laminated glass consists of two or more glass panes bonded together with a tough PVB (polyvinyl butyral) interlayer. When broken, the interlayer holds the fragments in place — preventing dangerous shards from falling and maintaining a barrier against intrusion.",
      "Beyond safety, laminated glass blocks over 99% of UV radiation and absorbs infrared heat. It also provides excellent sound insulation, filtering noise in the 1000Hz-2000Hz range that penetrates ordinary glass.",
    ],
    image: "/images/products/laminated.jpg",
    specs: [
      { label: "Configuration", value: "2-layer, multi-layer, or jumbo laminated"
  },
      { label: "Interlayer", value: "PVB (standard) or SGP (structural)" },
      { label: "UV Blocking", value: "> 99% ultraviolet radiation" },
      { label: "Sound Insulation", value: "Filters 1000Hz – 2000Hz noise" },
      { label: "Max Panel Size", value: "3,000mm × 15,000mm (autoclave)" },
      { label: "Certification", value: "China 3C (CCC) Certified" },
    ],
    features: [
      { title: "Safety & Security", desc: "Fragments remain bonded to the interlayer when broken. Provides anti-theft, bullet-resistant, and blast-resistant properties depending on configuration." },
      { title: "Sound Reduction", desc: "Blocks noise that passes through ordinary glass — measurably effective in the 1000-2000Hz range most common in urban environments." },
      { title: "UV Protection", desc: "Over 99% UV blocking protects interior furnishings, artwork, and merchandise from fading and degradation." },
      { title: "Structural Options", desc: "SGP interlayer available for structural glazing applications requiring higher load-bearing capacity." },
    ],
    applications: [
      "Overhead glazing and skylights",
      "Hurricane and storm-resistant windows",
      "Bank counters and security partitions",
      "Museum display cases",
      "Automotive windshields",
      "Floor glass and walkways",
    ],
    standard: "GB 15763.3-2009 — Safety Glass for Buildings, Part 3: Laminated Glass",
    searchKeywords: ["laminated", "lami", "PVB", "SGP", "SentryGlas", "safety glass", "security glass", "soundproof", "acoustic", "sound reduction", "noise reduction", "STC", "hurricane", "impact resistant", "burglar proof", "bullet resistant", "bomb blast", "夹胶玻璃", "夹层玻璃", "夹胶", "隔音玻璃", "安全玻璃"],
  },
  {
    slug: "enameled-glass",
    name: "Enameled Glass",
    tagline: "Decorative ceramic frit glass with permanent color and pattern",
    description: [
      "Enameled glass (also called ceramic frit glass) is produced by screen-printing inorganic ceramic enamel onto the glass surface, then drying and tempering or heat-strengthening it. The enamel permanently fuses to the glass — creating a surface that is abrasion-resistant, acid-resistant, and will never fade or peel.",
      "Available in virtually any color or pattern, enameled glass is widely used in curtain wall spandrel panels, decorative facades, and interior partitions. The enamel layer also absorbs and reflects solar energy, providing measurable shading benefits.",
    ],
    image: "/images/products/enameled.jpg",
    specs: [
      { label: "Colors", value: "Custom RAL / Pantone color matching"
  },
      { label: "Patterns", value: "Dots, lines, gradients, custom designs" },
      { label: "Durability", value: "Will not fade, peel, or delaminate" },
      { label: "Resistance", value: "Acid, alkali, and abrasion resistant" },
      { label: "Solar Control", value: "Absorbs & reflects partial solar energy" },
      { label: "Certification", value: "China 3C (CCC) Certified" },
    ],
    features: [
      { title: "Permanent Color", desc: "Inorganic ceramic enamel fused at tempering temperature — no fading, no peeling, no color shift over decades of exposure." },
      { title: "Design Freedom", desc: "Custom colors, gradients, and screen-printed patterns. Can complement or contrast with adjacent vision glass in curtain wall systems." },
      { title: "Energy Efficiency", desc: "The enamel layer absorbs and reflects a significant portion of solar radiation, reducing cooling loads and providing visible shading." },
      { title: "Versatile Combinations", desc: "Can be combined with tempering, laminating, or insulating for multi-functional panels that are both decorative and high-performance." },
    ],
    applications: [
      "Curtain wall spandrel panels",
      "Building facades and cladding",
      "Interior wall partitions",
      "Decorative columns and canopies",
      "Signage and branding elements",
      "Privacy screens",
    ],
    standard: "GB 15763.2-2005 — Safety Glass for Buildings, Part 2: Tempered Glass",
    searchKeywords: ["enameled", "enamelled", "ceramic frit", "frit", "spandrel", "back painted", "colored glass", "decorative glass", "silkscreen", "ceramic ink", "opaque glass", "spandrel panel", "彩釉玻璃", "彩釉", "釉面玻璃", "装饰玻璃", "丝印玻璃"],
  },

  {
    slug: "low-e-glass",
    name: "Low-E Glass",
    tagline: "Energy-efficient coating that reflects heat while letting light through",
    description: [
      "Low-emissivity (Low-E) glass features a microscopically thin metallic coating that reflects infrared heat radiation while transmitting visible light. This allows natural daylight in while keeping unwanted heat out in summer and retaining indoor warmth in winter.",
      "Low-E coating is typically applied to one surface of a glass pane within an insulated glass unit, dramatically improving the unit's thermal performance. It can reduce building energy costs by 30-50% compared to uncoated glass.",
    ],
    image: "/images/products/insulated.jpg",
    specs: [
      { label: "Coating Type", value: "Soft-coat (sputtered) or Hard-coat (pyrolytic)"
  },
      { label: "Emissivity", value: "0.05 - 0.15 (vs 0.84 for uncoated glass)" },
      { label: "Visible Light Transmission", value: "60% - 80%" },
      { label: "Solar Heat Gain Coefficient", value: "0.22 - 0.49" },
      { label: "U-Value Improvement", value: "30-50% vs uncoated IGU" },
      { label: "Certification", value: "China 3C (CCC) Certified" },
    ],
    features: [
      { title: "Heat Reflection", desc: "Reflects long-wave infrared radiation, keeping heat on the side it originates from." },
      { title: "Light Transmission", desc: "Maintains high visible light transmission for natural daylighting." },
      { title: "Year-Round Performance", desc: "Keeps heat out in summer and retains warmth in winter." },
      { title: "Invisible Coating", desc: "The metallic coating is virtually invisible — no change to glass appearance." },
    ],
    applications: [
      "Commercial office towers",
      "Residential windows and doors",
      "Curtain wall facades",
      "Skylight glazing",
      "Passive house projects",
      "Green building certifications (LEED, BREEAM)",
    ],
    standard: "GB/T 18915-2013 — Coated Glass (National Standard)",
    searchKeywords: ["low-e", "low emissivity", "lowe", "low e", "coated glass", "soft coat", "hard coat", "pyrolytic", "sputtered", "magnetron", "solar control", "SHGC", "heat reflective", "energy saving", "LEED", "passive house", "green building", "Low-E玻璃", "低辐射玻璃", "镀膜玻璃", "节能玻璃"],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
