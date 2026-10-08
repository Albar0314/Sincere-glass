'use client';

import { useState } from 'react';
type Region = 'us' | 'eu' | 'cn' | 'au';
interface RegionData {
  key: Region;
  label: string;
  code: string;
  color: string;
  safetyGlass: string;
  overhead: string;
  windLoad: string;
  energy: string;
  testStandard: string;
}
const regions: RegionData[] = [{
  key: 'us',
  label: "Estados Unidos",
  code: 'IBC 2021 + ASTM',
  color: '#60A5FA',
  safetyGlass: 'IBC §2406 — tempered or laminated required in all curtain wall glazing below 60in from floor. Impact-rated glass per ASTM E1996 required in windborne-debris regions.',
  overhead: 'IBC §2405 — laminated glass required. Tempered-only not permitted for overhead applications where failure could rain fragments.',
  windLoad: 'ASCE 7-22 — wind loads calculated by exposure category and building height. Glass thickness verified per ASTM E1300 engineering standard.',
  energy: 'IECC + ASHRAE 90.1 — U-value requirements by climate zone. Zones 4+ typically require Low-E coating and argon-filled IGU.',
  testStandard: 'ASTM C1048 (tempered), ASTM C1172 (laminated), ASTM E2190 (IGU)'
}, {
  key: 'eu',
  label: "Unión Europea",
  code: 'EN standards',
  color: '#34D399',
  safetyGlass: 'EN 12600 — glass pendulum impact classification (1B1, 1C1, etc.). Required performance level set by national building regulations (varies by country).',
  overhead: 'EN 14449 — laminated glass certification required for overhead applications. CE marking mandatory for construction products.',
  windLoad: 'EN 1991-1-4 (Eurocode 1) — wind load calculations. EN 16612 — thickness verification for structural glazing.',
  energy: 'EN 673 (U-value), EN 410 (solar). Member states set thermal targets via national building regulations (nZEB requirements since 2021).',
  testStandard: 'EN 12150 (tempered), EN 14449 (laminated), EN 1279 (IGU)'
}, {
  key: 'cn',
  label: 'China',
  code: 'GB standards + 3C',
  color: '#F59E0B',
  safetyGlass: 'GB 50210-2018 §15.6 — tempered or laminated required in curtain wall glazing. GB 15763.2/3 specifies the safety glass product requirements. 3C (CCC) mandatory certification for architectural glass.',
  overhead: 'JGJ 102-2003 — glass curtain wall technical specification. Laminated glass required for overhead and sloped glazing. Heat-soak testing (HST) required for high-rise facades.',
  windLoad: 'GB 50009-2012 — building structural load code. JGJ 102 specifies glass thickness for curtain wall per wind zone.',
  energy: 'GB 50189-2015 — public building energy standards. GB/T 2680 for optical performance. Low-E coating required in most climate zones for commercial projects.',
  testStandard: 'GB 15763.2 (tempered), GB 15763.3 (laminated), GB/T 11944 (IGU)'
}, {
  key: 'au',
  label: 'Australia / NZ',
  code: 'AS/NZS',
  color: '#A78BFA',
  safetyGlass: 'AS 1288-2021 — glass selection and installation. Grade A safety glass (tempered or laminated per AS/NZS 2208) required in doors, bathrooms, low windows, and most curtain wall applications.',
  overhead: 'AS 1288 §7 — overhead glazing requires laminated glass. Specific requirements for cyclone-prone regions in northern Australia.',
  windLoad: 'AS/NZS 1170.2 — wind actions. AS 1288 §5 provides glass thickness selection for curtain wall per wind region (A, B, C, D).',
  energy: 'NCC (National Construction Code) — energy efficiency provisions. Climate zones determine Low-E and IGU requirements.',
  testStandard: 'AS/NZS 2208 (tempered + laminated), AS 4666 (IGU)'
}];
type Topic = 'safetyGlass' | 'overhead' | 'windLoad' | 'energy' | 'testStandard';
const topics: Array<{
  key: Topic;
  label: string;
}> = [{
  key: 'safetyGlass',
  label: "Requisitos de Vidrio de Seguridad"
}, {
  key: 'overhead',
  label: "Acristalamiento Cenital"
}, {
  key: 'windLoad',
  label: "Carga de Viento"
}, {
  key: 'energy',
  label: "Rendimiento Energético"
}, {
  key: 'testStandard',
  label: "Normas de Ensayo"
}];
export default function RegionalCodeTable() {
  const [activeTopic, setActiveTopic] = useState<Topic>('safetyGlass');
  return <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-5">
        Requisitos Normativos de Muro Cortina por Región
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {topics.map(t => {
        const isActive = activeTopic === t.key;
        return <button key={t.key} onClick={() => setActiveTopic(t.key)} className={'px-4 py-2 rounded-full text-xs font-medium transition-all border ' + (isActive ? 'bg-[#DAA745] text-[#1C1F26] border-[#DAA745]' : 'text-[#8B95A5] hover:text-[#F2F0ED] border-[#3A4250]/40')}>
              {t.label}
            </button>;
      })}
      </div>

      <div className="grid gap-3">
        {regions.map(r => <div key={r.key} className="bg-[#1C1F26]/40 rounded-lg p-5 border border-[#3A4250]/20">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{
              backgroundColor: r.color
            }} />
                <h4 className="text-sm font-semibold text-[#F2F0ED] m-0">{r.label}</h4>
              </div>
              <span className="text-xs font-mono" style={{
            color: r.color
          }}>
                {r.code}
              </span>
            </div>
            <p className="text-sm text-[#8B95A5] leading-relaxed m-0">{r[activeTopic]}</p>
          </div>)}
      </div>

      <p className="text-xs text-[#8B95A5] italic text-center mt-5">
        Las referencias normativas indicadas son orientativas — consulte siempre la reglamentación local vigente para los requisitos específicos de cada proyecto.
      </p>
    </div>;
}