// src/lib/tools-registry.ts
// Interactive calculator tools — registry + types + utility functions.
// Same architectural pattern as blog-registry.ts.

export interface Tool {
  slug: string;
  title: string;                   // Full SEO title (used in <title>)
  shortTitle: string;              // Short label for hub cards
  description: string;             // 1-2 sentence card description
  metaDescription: string;         // <meta name="description">
  targetKeyword: string;
  secondaryKeywords?: string[];
  searchKeywords: string[];        // For future Cmd+K index

  category: ToolCategory;
  component: ToolComponent;        // Which React component renders this tool

  howToName: string;               // HowTo schema name
  howToSteps: Array<{ name: string; text: string }>;
  faq: Array<{ q: string; a: string }>;

  relatedProductSlugs?: string[];
  relatedArticleSlugs?: string[];

  heroImage?: string;              // optional - most tool pages skip hero image
  heroImageAlt?: string;
  heroImagePrompt?: string;

  publishDate: string;
  updatedDate?: string;

  featured?: boolean;
}

export type ToolCategory =
  | "specification"   // Max panel size, thickness, weight, radius feasibility
  | "roi"             // ROI, payback, lifetime savings
  | "logistics"       // Container load, shipping cost
  | "comparison";     // Multi-option comparators

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  specification: "Specification",
  roi: "ROI and Savings",
  logistics: "Logistics",
  comparison: "Comparison",
};

export const CATEGORY_DESCRIPTIONS: Record<ToolCategory, string> = {
  specification:
    "Size, thickness and feasibility calculators for architectural glass orders.",
  roi:
    "Payback and lifetime-savings calculators for glazing upgrade decisions.",
  logistics:
    "Shipping, container-load and freight calculators for importing glass.",
  comparison:
    "Side-by-side comparators across products, configurations and specs.",
};

export type ToolComponent =
  | "MaxPanelSize"
  | "TriplePaneROI"
  | "ContainerLoad";

export const tools: Tool[] = [
  {
    slug: "glass-max-panel-size-calculator",
    title:
      "Glass Max Panel Size Calculator (12mm Tempered) | Sincere Glass",
    shortTitle: "Max Panel Size Calculator",
    description:
      "Find the max producible dimensions for 12mm tempered glass by support condition and wind-load class. Checks against the 3,000 x 15,000 mm jumbo production envelope at our Wuhan factory.",
    metaDescription:
      "Free max panel size calculator for 12mm tempered glass. Enter support condition and wind-load class to get indicative width, height and area limits per GB 15763.2 and ASTM E1300 principles.",
    targetKeyword: "glass max panel size calculator",
    secondaryKeywords: [
      "max tempered glass size",
      "oversized tempered glass",
      "jumbo glass size",
      "tempered glass size limit",
    ],
    searchKeywords: [
      "max panel size",
      "glass size calculator",
      "tempered glass dimensions",
      "jumbo glass",
      "oversized glass",
      "GB 15763",
      "ASTM E1300",
      "wind load glass",
      "point-fixed glass size",
      "spider fitting glass",
      "超大玻璃尺寸",
      "钢化玻璃最大尺寸",
      "幕墙玻璃尺寸",
    ],
    category: "specification",
    component: "MaxPanelSize",
    howToName: "How to size a 12mm tempered glass panel",
    howToSteps: [
      {
        name: "Pick the support condition",
        text:
          "Choose how the panel is held in place: 4-edge framed, 2-edge clamped (top and bottom), or point-fixed with spider fittings. Support condition is the single largest driver of allowable panel size.",
      },
      {
        name: "Pick the wind-load class",
        text:
          "Select the design wind pressure band for your site: low (sheltered interior, below 1.0 kPa), medium (standard mid-rise, 1.0 to 2.5 kPa), or high (coastal or high-rise above 2.5 kPa).",
      },
      {
        name: "Read the max width, height and area",
        text:
          "The calculator returns indicative max dimensions and shows whether the result falls inside our 3,000 x 15,000 mm jumbo production envelope.",
      },
      {
        name: "Verify with a structural engineer",
        text:
          "Indicative limits are based on GB 15763.2-2005 and ASTM E1300 principles. Always have a licensed structural engineer verify the final limits for your project before procurement.",
      },
    ],
    faq: [
      {
        q: "What is the largest tempered glass panel you can produce?",
        a: "Our tempering furnace and lamination autoclave both support panels up to 3,000 x 15,000 mm (the jumbo envelope). The practical limit for any specific project depends on thickness, support condition, and wind-load class.",
      },
      {
        q: "Is this calculator a substitute for structural engineering?",
        a: "No. It gives indicative limits based on GB 15763.2-2005 and ASTM E1300 principles. A licensed structural engineer must verify the final limits for your specific project including deflection, point-load and dynamic wind effects.",
      },
      {
        q: "What if my required size exceeds the envelope?",
        a: "Contact us for a custom feasibility review. In many cases, moving to laminated 12+12 mm, upsizing to 15mm monolithic, or splitting the opening into two panels is more cost-effective than chasing a single oversized lite.",
      },
      {
        q: "Does this apply to other thicknesses?",
        a: "The current calculator is tuned for 12mm tempered. Thinner lites (6-10mm) scale down; thicker lites (15-19mm) scale up. A dedicated multi-thickness version is on our roadmap.",
      },
    ],
    relatedProductSlugs: ["tempered-glass", "laminated-glass", "curved-tempered-glass"],
    relatedArticleSlugs: ["12mm-tempered-glass-specifications"],
    publishDate: "2026-11-10",
    featured: true,
  },

  {
    slug: "triple-pane-roi-calculator",
    title:
      "Triple Pane Window ROI Calculator: Payback and Lifetime Savings | Sincere Glass",
    shortTitle: "Triple Pane ROI Calculator",
    description:
      "Estimate payback period, annual energy savings and 25-year lifetime savings when upgrading from double to triple pane windows, by climate zone and heating fuel.",
    metaDescription:
      "Free triple pane ROI calculator. Enter climate zone, window area, heating fuel and U-factor to estimate payback years, annual USD savings and 25-year net savings for a double-to-triple-pane upgrade.",
    targetKeyword: "triple pane roi calculator",
    secondaryKeywords: [
      "is triple pane worth it",
      "triple pane payback period",
      "triple pane vs double pane roi",
      "triple glazing payback",
    ],
    searchKeywords: [
      "triple pane roi",
      "triple pane payback",
      "triple glazing roi",
      "triple pane worth it",
      "window upgrade payback",
      "double to triple pane",
      "U-factor savings",
      "IECC climate zone",
      "HDD CDD calculator",
      "三玻两腔 回本",
      "三层玻璃 投资回报",
    ],
    category: "roi",
    component: "TriplePaneROI",
    howToName: "How to calculate triple-pane ROI",
    howToSteps: [
      {
        name: "Pick your climate zone",
        text:
          "Select the IECC climate zone that best matches your site. The calculator uses pre-set heating degree-day (HDD) and cooling degree-day (CDD) values for each zone.",
      },
      {
        name: "Enter total window area",
        text:
          "Enter the total glazed area of the windows you plan to upgrade, in square meters.",
      },
      {
        name: "Choose heating fuel and rate",
        text:
          "Pick natural gas, electric resistance, or heat pump, and adjust the fuel rate to match your local utility bill.",
      },
      {
        name: "Enter U-factors and upgrade premium",
        text:
          "Enter the U-factor (W/m2K) for your current double pane and the triple pane you are considering, plus the price premium per square meter for the upgrade.",
      },
      {
        name: "Read the verdict and lifetime savings",
        text:
          "The calculator returns annual savings, payback years, and 25-year net savings, plus a verdict: Worth it (payback under 10 years), Marginal (10-20 years), or Not worth it on energy alone (over 20 years).",
      },
    ],
    faq: [
      {
        q: "Is triple pane always worth the extra cost?",
        a: "No. In warm climates (IECC zones 1-3) with natural gas heating, triple pane often has a 20+ year payback and is hard to justify on energy alone. In cold climates (zones 5-8) with electric heating, payback can drop below 10 years.",
      },
      {
        q: "What U-factors are realistic for double vs triple pane?",
        a: "A typical double-pane Low-E argon IGU achieves U = 1.4 to 1.8 W/m2K. A triple-pane dual-Low-E argon or krypton IGU achieves U = 0.6 to 1.0 W/m2K. Center-of-glass values differ from whole-window values which include frame.",
      },
      {
        q: "Does this account for frame and installation?",
        a: "No. The model is single-zone and uses center-of-glass delta-U only. Real savings also depend on frame U-factor, air infiltration, orientation, shading and whole-building envelope. Treat results as directional, not precise.",
      },
      {
        q: "What else should I consider besides payback?",
        a: "Triple pane also improves acoustic performance (STC gain of 2-4), reduces interior condensation risk, and raises interior glass surface temperature in winter (comfort). These benefits do not show up in ROI math but can matter more than dollar payback for occupant comfort.",
      },
    ],
    relatedProductSlugs: ["insulated-glass", "low-e-glass"],
    relatedArticleSlugs: [
      "double-pane-vs-triple-pane-glass",
      "insulated-glass-complete-guide",
    ],
    publishDate: "2026-11-10",
    featured: true,
  },
  {
    slug: "glass-container-load-calculator",
    title:
      "Glass Container Loading Calculator: How Much Glass Fits in a Container | Sincere Glass",
    shortTitle: "Container Loading Calculator",
    description:
      "Estimate how many square meters of architectural glass fit in a 20ft or 40ft container, the loaded weight, and whether the load is weight-limited or volume-limited, by glass thickness and crate strategy.",
    metaDescription:
      "Free glass container loading calculator. Enter container type, glass thickness and crate strategy to estimate m2 per container, loaded weight in tonnes, and the limiting factor for your sea freight.",
    targetKeyword: "glass container load calculator",
    secondaryKeywords: [
      "container loading calculator",
      "how much glass fits in a container",
      "glass shipping weight calculator",
      "40hq glass capacity",
    ],
    searchKeywords: [
      "glass container load",
      "container loading calculator",
      "how much glass per container",
      "glass shipping weight",
      "40hq glass capacity",
      "20ft container glass",
      "glass m2 per container",
      "FCL glass load",
      "container payload glass",
      "\u73bb\u7483\u88c5\u67dc\u8ba1\u7b97",
      "\u4e00\u4e2a\u67dc\u88c5\u591a\u5c11\u73bb\u7483",
      "\u73bb\u7483\u6d77\u8fd0\u91cd\u91cf",
    ],
    category: "logistics",
    component: "ContainerLoad",
    howToName: "How to estimate a glass container load",
    howToSteps: [
      {
        name: "Pick the container type",
        text:
          "Choose the container you plan to ship in: 20ft dry, 40ft high-cube, or 40ft open-top. Each has a different payload limit, which is usually what caps a glass load.",
      },
      {
        name: "Pick the glass thickness or build-up",
        text:
          "Select the product: 6 to 12 mm monolithic, an insulated glass unit, or a laminated build-up. This sets the weight per square meter, from about 15 to 36 kg/m2.",
      },
      {
        name: "Pick the crate strategy",
        text:
          "Choose A-frame crates, L-type crates, or fumigated wooden boxes. The crate strategy sets both the usable packing density and the share of payload taken by the crates themselves.",
      },
      {
        name: "Read the capacity, weight and limiting factor",
        text:
          "The calculator returns indicative square meters per container, the loaded weight in tonnes, and whether the load is weight-limited or volume-limited, plus a damage-risk note for the combination.",
      },
      {
        name: "Confirm against a real packing list",
        text:
          "Figures use industry-default packing assumptions. Send your exact panel sizes and quantities so we can confirm real capacity, crate count and freight before you book.",
      },
    ],
    faq: [
      {
        q: "How many square meters of glass fit in a 40ft container?",
        a: "It depends on thickness. A 40ft high-cube typically carries roughly 800 to 1,900 m2 of glass depending on whether it is thin monolithic or heavy IGU/laminated, because glass fills on weight before volume. Use the calculator for your exact build-up.",
      },
      {
        q: "Is a glass container load limited by weight or by volume?",
        a: "Almost always weight. Glass is dense (2,500 kg/m3), so a container usually hits its payload limit well before the floor is full. The calculator shows which limit is reached first for your configuration.",
      },
      {
        q: "Does the estimate include the weight of the crates?",
        a: "Yes. The loaded weight adds the crate weight back on top of the glass, using a 12 to 28 percent crate share depending on the crate strategy. The payload check is against the full crated weight.",
      },
      {
        q: "Is this calculator a formal quote?",
        a: "No. It uses industry-default packing assumptions, not your exact panel sizes or our live crate specs. It is for planning. Use the quote button to have us confirm real capacity, crate count and freight.",
      },
    ],
    relatedProductSlugs: ["insulated-glass", "laminated-glass", "tempered-glass"],
    relatedArticleSlugs: [
      "glass-shipping-container-loading-guide",
      "how-to-import-glass-from-china",
    ],
    publishDate: "2026-11-18",
    featured: true,
  },
];

// ---- Utility functions ----

export function getAllTools(): Tool[] {
  return [...tools].sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return getAllTools().filter((t) => t.category === category);
}

export function getFeaturedTools(): Tool[] {
  return getAllTools().filter((t) => t.featured);
}

/**
 * Keyword cannibalization audit for tools.
 * Also checks across the blog registry when wired externally.
 */
export function auditToolKeyword(newKeyword: string): {
  conflict: boolean;
  conflictingTools: Tool[];
} {
  const normalized = newKeyword.toLowerCase().trim();
  const conflicting = tools.filter((t) => {
    const target = t.targetKeyword.toLowerCase();
    const secondaries = (t.secondaryKeywords || []).map((k) => k.toLowerCase());
    return (
      target === normalized ||
      target.includes(normalized) ||
      normalized.includes(target) ||
      secondaries.some(
        (s) => s === normalized || s.includes(normalized) || normalized.includes(s)
      )
    );
  });
  return { conflict: conflicting.length > 0, conflictingTools: conflicting };
}
