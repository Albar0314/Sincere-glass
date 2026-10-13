"use client";

import { useMemo, useState } from "react";

type ItemKey =
  | "iso9001"
  | "ccc"
  | "en"
  | "license"
  | "exportRights"
  | "furnaceSize"
  | "capacity"
  | "portfolio"
  | "responseTime"
  | "sampling";

interface Item {
  key: ItemKey;
  label: string;
  weight: number;
  detail: string;
  group: "credentials" | "capability" | "communication";
}

const ITEMS: Item[] = [
  {
    key: "iso9001",
    group: "credentials",
    weight: 10,
    label: "ISO 9001:2015 Quality Management",
    detail: "Independent QMS audit. Minimum bar for a serious supplier.",
  },
  {
    key: "ccc",
    group: "credentials",
    weight: 10,
    label: "China 3C (CCC) certificate",
    detail: "Mandatory for architectural safety glass sold or exported from China. No CCC = no legal factory.",
  },
  {
    key: "en",
    group: "credentials",
    weight: 10,
    label: "EN 12150-1 / EN 14449 (if exporting to EU)",
    detail: "Required for CE marking into Europe. Ask for the test report, not the brochure.",
  },
  {
    key: "license",
    group: "credentials",
    weight: 5,
    label: "Business license + factory address verified",
    detail: "Confirm the name on the license matches the invoice entity. Trading companies are fine; opaque ones are not.",
  },
  {
    key: "exportRights",
    group: "credentials",
    weight: 5,
    label: "Independent export rights (not routed via agent)",
    detail: "Direct exporters issue their own commercial invoice and bill of lading, which simplifies claims.",
  },
  {
    key: "furnaceSize",
    group: "capability",
    weight: 15,
    label: "Furnace / autoclave can handle your largest panel",
    detail: "A 2.5m furnace cannot temper a 2.8m panel. Confirm equipment envelope in writing before quoting.",
  },
  {
    key: "capacity",
    group: "capability",
    weight: 10,
    label: "Monthly capacity ≥ 3× your order volume",
    detail: "You never want to be more than one third of a factory's output. Lead times slip when a bigger order lands.",
  },
  {
    key: "portfolio",
    group: "capability",
    weight: 10,
    label: "At least 3 reference projects in a similar product category",
    detail: "Ask for photos, project names, and the glass make-up specified. Vague answers mean no real portfolio.",
  },
  {
    key: "responseTime",
    group: "communication",
    weight: 15,
    label: "Technical response within 24h in your working language",
    detail: "Specification questions should get a specification answer, not a 'yes we can do.' Test this before you sign.",
  },
  {
    key: "sampling",
    group: "communication",
    weight: 10,
    label: "Willing to provide a paid sample before PO",
    detail: "A real factory will send a sample (sometimes free, often paid). A trader hesitates because the sample is not theirs to send.",
  },
];

const GROUP_LABELS: Record<Item["group"], string> = {
  credentials: "Credentials (40 pts)",
  capability: "Capability (35 pts)",
  communication: "Communication (25 pts)",
};

function tier(score: number) {
  if (score >= 81) return { label: "Preferred Supplier", color: "#DAA745", ring: "#DAA745", note: "Strong match. Proceed to RFQ." };
  if (score >= 61) return { label: "Qualified", color: "#8CB369", ring: "#8CB369", note: "Qualified for shortlist. Verify the open items before PO." };
  if (score >= 31) return { label: "Caution", color: "#D4A24C", ring: "#D4A24C", note: "Risk is real. Only proceed with a factory audit and payment safeguards." };
  return { label: "High Risk", color: "#C06060", ring: "#C06060", note: "Walk away or restart due diligence from the credentials row." };
}

export default function SupplierVerificationScorecard() {
  const [checked, setChecked] = useState<Record<ItemKey, boolean>>({
    iso9001: false,
    ccc: false,
    en: false,
    license: false,
    exportRights: false,
    furnaceSize: false,
    capacity: false,
    portfolio: false,
    responseTime: false,
    sampling: false,
  });

  const score = useMemo(
    () =>
      ITEMS.reduce((sum, item) => (checked[item.key] ? sum + item.weight : sum), 0),
    [checked]
  );

  const t = tier(score);
  const dashOffset = 2 * Math.PI * 70 * (1 - score / 100);

  const groups: Item["group"][] = ["credentials", "capability", "communication"];

  return (
    <div className="my-10 rounded-2xl border border-[#3A4250]/40 bg-[#1C1F26] p-6 md:p-8">
      <div className="grid md:grid-cols-[1fr_240px] gap-8">
        <div>
          <h3 className="text-base font-semibold text-[#DAA745] uppercase tracking-wider mb-1">
            Interactive
          </h3>
          <h4 className="text-xl font-bold text-[#F2F0ED] mb-5">
            Supplier Verification Scorecard
          </h4>
          <p className="text-sm text-[#8B95A5] leading-relaxed mb-6">
            Tick what you have verified in writing. The score updates live and the tier changes at 31, 61 and 81.
          </p>

          <div className="space-y-5">
            {groups.map((g) => (
              <div key={g}>
                <div className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
                  {GROUP_LABELS[g]}
                </div>
                <ul className="space-y-2">
                  {ITEMS.filter((i) => i.group === g).map((item) => (
                    <li key={item.key}>
                      <label className="flex gap-3 items-start cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={checked[item.key]}
                          onChange={(e) =>
                            setChecked({ ...checked, [item.key]: e.target.checked })
                          }
                          className="mt-1 accent-[#DAA745] flex-shrink-0 w-4 h-4"
                        />
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm font-medium text-[#F2F0ED] group-hover:text-[#DAA745] transition-colors">
                              {item.label}
                            </span>
                            <span className="text-xs text-[#DAA745]/80 font-mono">
                              +{item.weight}
                            </span>
                          </div>
                          <p className="text-xs text-[#8B95A5] mt-0.5 leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="md:sticky md:top-24 self-start">
          <div className="relative w-full aspect-square max-w-[220px] mx-auto">
            <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="#3A4250"
                strokeOpacity="0.35"
                strokeWidth="10"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke={t.ring}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 70}
                strokeDashoffset={dashOffset}
                style={{ transition: "stroke-dashoffset 400ms ease, stroke 300ms ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-[#F2F0ED] leading-none">{score}</div>
              <div className="text-xs text-[#8B95A5] mt-1 tracking-wider">/ 100</div>
            </div>
          </div>
          <div
            className="mt-5 text-center rounded-xl p-4"
            style={{ background: `${t.color}18`, border: `1px solid ${t.color}55` }}
          >
            <div className="text-sm font-semibold" style={{ color: t.color }}>
              {t.label}
            </div>
            <p className="text-xs text-[#8B95A5] mt-2 leading-relaxed">{t.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
