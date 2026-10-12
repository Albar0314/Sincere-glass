'use client';

import { useState } from 'react';

type Region = 'US' | 'EU' | 'CN' | 'AU';

interface RegionData {
  flag: string;
  label: string;
  standard: string;
  minThickness: string;
  temperingRequired: string;
  impactTest: string;
  marking: string;
  note: string;
}

const DATA: Record<Region, RegionData> = {
  US: {
    flag: '🇺🇸',
    label: 'United States',
    standard: 'CPSC 16 CFR 1201 Category II · ANSI Z97.1-2015 Class A · IBC 2021 §2406.4.1',
    minThickness: 'No absolute minimum, but hardware ratings and 400 ft-lb impact resistance effectively require ≥6 mm tempered for framed; 10 mm frameless default.',
    temperingRequired: 'Yes — all shower glazing is a hazardous location per IBC 2406.4.1 (location 3: enclosures and partitions near wet surfaces).',
    impactTest: '400 ft-lb (542 J) impact resistance per CPSC Category II drop test.',
    marking: 'Permanently etched/sandblasted mark showing standard (16 CFR 1201 Cat II), manufacturer, and type (T for tempered).',
    note: 'US market: expect inspectors to check for the permanent CPSC mark during final walkthrough. Unmarked tempered glass = failed inspection.',
  },
  EU: {
    flag: '🇪🇺',
    label: 'European Union',
    standard: 'EN 12150-1:2015 (tempered) · EN 12600 impact classification · EN 14449 (laminated, if used)',
    minThickness: 'EN 14428 (shower enclosures): minimum 4 mm tempered for framed sliding doors, 6 mm for pivot doors, 8 mm+ for frameless.',
    temperingRequired: 'Yes — EN 14428 § 7.1 requires tempered or laminated safety glass for all shower enclosure panels.',
    impactTest: 'EN 12600 Class 1(B)1 or better — pendulum impact test with 50 kg twin-tyre pendulum.',
    marking: 'CE marking required (EU 305/2011 Construction Products Regulation) with declaration of performance.',
    note: 'EN 14428 is the shower-specific product standard. Many EU specifiers also reference EN 12150 for the tempering process itself.',
  },
  CN: {
    flag: '🇨🇳',
    label: 'China',
    standard: 'GB 15763.2-2005 (tempered safety glass) · GB 9962-1999 (laminated) · JC/T 1072 (shower glass product standard)',
    minThickness: 'JC/T 1072: 5 mm minimum for framed shower doors, 6 mm for sliding, 8 mm+ for frameless. Domestic market practice: 8 mm or 10 mm frameless.',
    temperingRequired: 'Yes — GB 15763.2 and the 3C mandatory certification system (CCC) cover all safety glass used in shower enclosures.',
    impactTest: 'GB 15763.2 §6.9: steel ball impact test (1040 g from 1200 mm) + fragmentation test (<40 mm max fragment size for 6 mm tempered).',
    marking: '3C certification mark (CCC logo) + manufacturer code + tempering process code. Required for domestic sale.',
    note: 'For export: GB-marked glass meets or exceeds most regional standards, but add CPSC/CE/AS marking at fabrication if the destination requires it.',
  },
  AU: {
    flag: '🇦🇺',
    label: 'Australia / NZ',
    standard: 'AS/NZS 2208:1996 (safety glass) · AS 1288:2021 §5.14 (glass in shower & bath enclosures) · AS 2047 (frames)',
    minThickness: 'AS 1288 Table 5.14: 5 mm Grade A safety glass for framed; 6 mm for semi-frameless; 10 mm minimum for frameless frameless doors.',
    temperingRequired: 'Yes — AS 1288 §5.14.2 requires Grade A safety glass (tempered or laminated) for all shower enclosure glazing.',
    impactTest: 'AS/NZS 2208 Grade A: hard body + soft body impact tests with specific drop heights by thickness.',
    marking: 'Permanent mark required showing AS/NZS 2208 compliance, manufacturer, and grade (A for safety).',
    note: 'Australian cyclonic regions (QLD, NT): check for additional wind-load requirements if the shower is in an exposed bathroom.',
  },
};

export default function GlobalCodeMatrix() {
  const [region, setRegion] = useState<Region>('US');
  const d = DATA[region];

  return (
    <div className="my-10 rounded-xl bg-[#3A4250]/20 border border-[#3A4250]/40 p-6 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-[#DAA745]" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
        </svg>
        <span className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase">
          Code requirements by region
        </span>
      </div>

      <h3 className="text-xl font-semibold text-[#F2F0ED] m-0 mb-5">
        Shower glass regulations across 4 code systems
      </h3>

      <div className="grid grid-cols-4 gap-2 mb-6">
        {(Object.keys(DATA) as Region[]).map((r) => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            className={`px-3 py-3 rounded-lg text-sm font-semibold transition-colors ${
              region === r
                ? 'bg-[#DAA745] text-[#1C1F26]'
                : 'bg-[#1C1F26] text-[#8B95A5] hover:text-[#F2F0ED] border border-[#3A4250]'
            }`}
          >
            <div className="text-xl mb-1">{DATA[r].flag}</div>
            <div className="text-[11px] leading-tight">{r}</div>
          </button>
        ))}
      </div>

      <div className="rounded-lg bg-[#1C1F26] p-5 md:p-6">
        <div className="mb-4 pb-4 border-b border-[#3A4250]/40">
          <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-1">Region</div>
          <div className="text-lg font-semibold text-[#F2F0ED] flex items-center gap-2">
            <span className="text-2xl">{d.flag}</span>
            {d.label}
          </div>
        </div>

        <dl className="space-y-4">
          <div>
            <dt className="text-xs text-[#DAA745] uppercase tracking-wider mb-1 font-semibold">
              Governing standards
            </dt>
            <dd className="text-sm text-[#F2F0ED] leading-relaxed m-0">{d.standard}</dd>
          </div>

          <div>
            <dt className="text-xs text-[#DAA745] uppercase tracking-wider mb-1 font-semibold">
              Minimum thickness
            </dt>
            <dd className="text-sm text-[#F2F0ED] leading-relaxed m-0">{d.minThickness}</dd>
          </div>

          <div>
            <dt className="text-xs text-[#DAA745] uppercase tracking-wider mb-1 font-semibold">
              Tempering required?
            </dt>
            <dd className="text-sm text-[#F2F0ED] leading-relaxed m-0">{d.temperingRequired}</dd>
          </div>

          <div>
            <dt className="text-xs text-[#DAA745] uppercase tracking-wider mb-1 font-semibold">
              Impact test
            </dt>
            <dd className="text-sm text-[#F2F0ED] leading-relaxed m-0">{d.impactTest}</dd>
          </div>

          <div>
            <dt className="text-xs text-[#DAA745] uppercase tracking-wider mb-1 font-semibold">
              Required marking
            </dt>
            <dd className="text-sm text-[#F2F0ED] leading-relaxed m-0">{d.marking}</dd>
          </div>

          <div className="pt-3 border-t border-[#3A4250]/40">
            <dt className="text-xs text-[#8B95A5] uppercase tracking-wider mb-1 font-semibold">
              Factory note
            </dt>
            <dd className="text-sm text-[#8B95A5] leading-relaxed m-0 italic">{d.note}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
