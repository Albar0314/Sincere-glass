'use client';

import { useState } from 'react';
interface Cert {
  id: string;
  name: string;
  shortName: string;
  jurisdiction: string;
  issuer: string;
  issuerUrl: string;
  numberFormat: string;
  example: string;
  productScope: string;
  verificationSteps: string[];
  commonFakes: string[];
  verificationUrl?: string;
  verificationUrlLabel?: string;
}
const CERTS: Cert[] = [{
  id: 'gb-15763-2',
  name: "GB 15763.2 — Materiales de acristalamiento de seguridad, Parte 2: Vidrio templado",
  shortName: 'GB 15763.2 (tempered)',
  jurisdiction: 'China (mandatory 3C)',
  issuer: 'CNAS-accredited lab + CQC for 3C mark',
  issuerUrl: 'https://www.cnas.org.cn',
  numberFormat: 'Lab report no. (e.g. NGSTC-2024-xxxxx) + 3C certificate no. (CQC24001234567)',
  example: '3C: 2024010106520001',
  productScope: 'Tempered glass used in buildings, vehicles, furniture',
  verificationSteps: ['Ask for the full PDF test report, not a screenshot. Check the lab name against the CNAS directory at cnas.org.cn.', 'Look at the issue date vs the product you are quoting. Standards shift; a 2019 report on a 6mm SKU does not cover a 10mm SKU today.', 'For 3C, cross-check the certificate number at the CQC public registry (cccinmetro.cqc.com.cn). The record must match product category, factory address, and expiry.'],
  commonFakes: ['Report photo only (no PDF, no serial). The real report has 10+ pages: scope, test method, results, lab seal, signatory.', 'Issuing lab is not on CNAS directory — the lab name sounds official but has no accreditation code.', 'Certificate date predates the factory’s own registration date on 企查查.'],
  verificationUrl: 'https://cccinmetro.cqc.com.cn',
  verificationUrlLabel: 'CQC 3C public registry'
}, {
  id: 'gb-15763-3',
  name: "GB 15763.3 — Materiales de acristalamiento de seguridad, Parte 3: Vidrio laminado",
  shortName: 'GB 15763.3 (laminated)',
  jurisdiction: 'China (mandatory 3C)',
  issuer: 'CNAS lab + CQC',
  issuerUrl: 'https://www.cnas.org.cn',
  numberFormat: 'Lab report + 3C cert (CQC24001234567)',
  example: '3C: 2024010106520002',
  productScope: 'Laminated safety glass for buildings, canopies, railings',
  verificationSteps: ['Confirm interlayer type on the report (PVB / SGP / EVA) matches your spec. A GB report for 0.76mm PVB does not cover 1.52mm SGP.', 'Impact test class (ZⅠ, ZⅡ, ZⅢ) corresponds to pendulum drop height. Match it to your project’s building height class.', 'For 3C mark, verify at CQC registry. 3C is required for most building laminated glass in China; export shipments to the US and EU do not need the 3C mark itself but can still cite the GB report.'],
  commonFakes: ['Report cites "laminated glass" generically without specifying interlayer, thickness class, or impact classification.', 'Same report number used across multiple suppliers (verify by searching the report ID on 百度).', 'Report issued by a lab in a province where no glass-testing lab is accredited.'],
  verificationUrl: 'https://cccinmetro.cqc.com.cn',
  verificationUrlLabel: 'CQC 3C public registry'
}, {
  id: 'gb-11944',
  name: "GB/T 11944 — Unidad de vidrio aislante",
  shortName: 'GB/T 11944 (IGU)',
  jurisdiction: 'China (recommended, not mandatory)',
  issuer: 'CNAS lab',
  issuerUrl: 'https://www.cnas.org.cn',
  numberFormat: 'Lab report number (e.g. 2024-NG-12345)',
  example: 'NGSTC-2024-00512',
  productScope: 'Insulating glass units: dew-point, UV, sealed-cycle durability',
  verificationSteps: ['Look for dew-point test result (≤ −40°C is the pass bar). Reject reports that omit this.', 'Check if the report covers the secondary seal (silicone vs polysulfide) your project needs. For structural glazing, silicone is required.', 'Call the issuing lab directly with the report number. CNAS labs will confirm or deny over the phone.'],
  commonFakes: ['Report shows only "pass" without the dew-point number.', 'Report is for argon-filled IGU but your supplier quotes you air-filled at the same price — the test does not transfer.', 'Lab accreditation scope on CNAS does not include IGU testing (check the lab’s scope PDF, not just its name).'],
  verificationUrl: 'https://www.cnas.org.cn',
  verificationUrlLabel: 'CNAS lab directory'
}, {
  id: 'en-12150-2',
  name: "EN 12150-2 — Vidrio de seguridad de silicato sodo-cálcico templado térmicamente",
  shortName: 'EN 12150-2 (tempered, EU)',
  jurisdiction: 'EU (part of CE marking)',
  issuer: 'EU Notified Body (CPR Regulation 305/2011)',
  issuerUrl: 'https://ec.europa.eu/growth/tools-databases/nando/',
  numberFormat: 'CE DoP number + Notified Body 4-digit ID (e.g. NB 1234)',
  example: 'DoP ref: SG-TG-2025-001; NB 2456',
  productScope: 'Tempered glass sold within EEA — triggers CE marking',
  verificationSteps: ['Ask for the Declaration of Performance (DoP). CE marking without a DoP is non-compliant.', 'The DoP cites a Notified Body number. Verify that NB number on the EU NANDO database and confirm the NB is accredited for EN 12150-2.', 'Match fragmentation class (performance level reported on the DoP) to the end-use building code requirement.'],
  commonFakes: ['A photo of the CE logo on packaging with no DoP document attached.', 'DoP cites a Notified Body number that NANDO shows as expired or scoped only to a different product (e.g. windows, not glass).', 'DoP is in English but issued by a lab in a country where the lab has no notified status.'],
  verificationUrl: 'https://ec.europa.eu/growth/tools-databases/nando/',
  verificationUrlLabel: 'EU NANDO Notified Body database'
}, {
  id: 'en-14449',
  name: "EN 14449 — Vidrio laminado y vidrio laminado de seguridad",
  shortName: 'EN 14449 (laminated, EU)',
  jurisdiction: 'EU (part of CE marking)',
  issuer: 'EU Notified Body',
  issuerUrl: 'https://ec.europa.eu/growth/tools-databases/nando/',
  numberFormat: 'CE DoP + NB number',
  example: 'DoP ref: SG-LAM-2025-004; NB 2456',
  productScope: 'Laminated glass placed on the EU market',
  verificationSteps: ['DoP must cite EN 12600 pendulum impact class (1(B)1, 2(B)2, etc). This is the number specifiers reference, not just "laminated".', 'Interlayer type and nominal thickness go on the DoP. Switching PVB to SGP after the DoP is issued voids the CE mark for that product.', 'Confirm the NB on NANDO is accredited for EN 14449 specifically.'],
  commonFakes: ['DoP cites "laminated glass per EN 14449" with no EN 12600 class.', 'Same DoP covers 6.38mm and 13.52mm products — DoPs are product-specific; one DoP, one build-up.', 'NB listed on DoP has no laminated-glass scope.'],
  verificationUrl: 'https://ec.europa.eu/growth/tools-databases/nando/',
  verificationUrlLabel: 'EU NANDO Notified Body database'
}, {
  id: 'ansi-z971',
  name: "ANSI Z97.1 — Materiales de acristalamiento de seguridad utilizados en edificios",
  shortName: 'ANSI Z97.1 (US safety glazing)',
  jurisdiction: 'United States',
  issuer: 'Accredited third-party lab (e.g. SGCC-member labs)',
  issuerUrl: 'https://www.sgcc.org',
  numberFormat: 'Lab report + SGCC certification number if certified',
  example: 'SGCC cert: 1234-A-5-6',
  productScope: 'Safety glazing (tempered, laminated) in US building code applications',
  verificationSteps: ['For hazardous locations (CPSC 16 CFR 1201), the project likely requires both ANSI Z97.1 and 16 CFR 1201 Category I or II compliance.', 'SGCC maintains an online registry of certified products. Enter the certification number and manufacturer plant to confirm.', 'Check the test size (impact test sample dimensions) — some reports pass at 34x76 inches but not at jumbo sizes used in curtain wall.'],
  commonFakes: ['"ANSI Z97.1 compliant" claim with no SGCC listing and no test report.', 'SGCC cert number references a plant in China that is not the plant the glass is actually produced in.', 'Report cites Z97.1-2004 (superseded version) rather than current revision.'],
  verificationUrl: 'https://www.sgcc.org',
  verificationUrlLabel: 'SGCC Certified Products Directory'
}, {
  id: 'ce-marking',
  name: "Marcado CE (Reglamento de Productos de Construcción 305/2011)",
  shortName: 'CE marking (EU)',
  jurisdiction: 'EU — mandatory for construction glass',
  issuer: 'Manufacturer self-declares + Notified Body for AVCP System 3',
  issuerUrl: 'https://ec.europa.eu/growth/single-market/ce-marking_en',
  numberFormat: 'CE logo + DoP reference + harmonised standard (hEN) + NB number',
  example: 'CE 2456 | DoP SG-TG-2025-001 | EN 12150-2',
  productScope: 'All structural / safety glass placed on EU market',
  verificationSteps: ['CE mark is only one component. Demand the DoP — this is the legal document.', 'DoP must cite the harmonised standard (EN 12150-2 for tempered, EN 14449 for laminated, EN 1279-5 for IGU).', 'For AVCP System 3 products (safety glass), a Notified Body test is required. No NB number = non-compliant.'],
  commonFakes: ['"CE" logo printed on packaging without any DoP.', 'DoP cites the CE regulation but no hEN — this means the DoP is for a different directive and does not satisfy CPR.', 'Chinese "CE" mark (looks similar, stands for "China Export") — look at the proportions of the two letters, the real CE has specific geometry.'],
  verificationUrl: 'https://ec.europa.eu/growth/single-market/ce-marking_en',
  verificationUrlLabel: 'EU Commission on CE marking'
}, {
  id: 'iso-9001',
  name: "ISO 9001 — Sistema de gestión de calidad",
  shortName: 'ISO 9001 (QMS)',
  jurisdiction: 'International',
  issuer: 'IAF-accredited certification body (e.g. TUV, DNV, CQC, BSI)',
  issuerUrl: 'https://iaf.nu',
  numberFormat: 'Certificate number + certification body logo + IAF/MLA mark',
  example: 'CQC 2024-ISO9001-01234',
  productScope: 'Factory’s quality system, not the product itself',
  verificationSteps: ['ISO 9001 does not test glass. It tests whether the factory follows written procedures. Treat it as a baseline, not a pass.', 'Verify the certification body on the IAF directory. Many small Chinese cert bodies are not IAF-recognised.', 'Call the certification body with the certificate number. Confirm expiry date and scope (make sure "architectural glass manufacturing" is in scope).'],
  commonFakes: ['Certificate from a "China ISO 9001 Certification Center" that has no IAF accreditation.', 'Expired certificate (3-year cycle) still displayed on the website.', 'Scope on the certificate reads "trading" not "manufacturing" — common for traders claiming factory status.'],
  verificationUrl: 'https://iaf.nu/en/accreditation-body-members/',
  verificationUrlLabel: 'IAF Member Directory'
}];
export default function CertVerifier() {
  const [selectedId, setSelectedId] = useState<string>(CERTS[0].id);
  const cert = CERTS.find(c => c.id === selectedId)!;
  return <div className="my-10 rounded-2xl border border-[#3A4250]/40 bg-[#3A4250]/15 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-[#3A4250]/40">
        <div className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-1">
          Interactivo · Verificador de certificaciones
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-[#F2F0ED] m-0">
          Descifre la certificación
        </h3>
        <p className="text-sm text-[#8B95A5] mt-2 m-0 leading-relaxed">
          Seleccione la certificación que su proveedor le ha entregado. Mostramos el organismo emisor, el formato correcto de su número, la vía de verificación pública y las falsificaciones que detectamos cada mes.
        </p>
      </div>

      <div className="md:grid md:grid-cols-[260px_1fr]">
        {/* Cert list */}
        <nav className="border-b md:border-b-0 md:border-r border-[#3A4250]/40 bg-[#1C1F26]/60 p-2 md:p-3">
          <ul className="space-y-1 list-none pl-0 m-0">
            {CERTS.map(c => {
            const isActive = c.id === selectedId;
            return <li key={c.id} className="m-0">
                  <button onClick={() => setSelectedId(c.id)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-[#DAA745]/15 text-[#DAA745]' : 'text-[#8B95A5] hover:bg-[#3A4250]/30 hover:text-[#F2F0ED]'}`} aria-current={isActive ? 'true' : undefined}>
                    {c.shortName}
                  </button>
                </li>;
          })}
          </ul>
        </nav>

        {/* Detail panel */}
        <div className="p-6 md:p-8">
          <div className="mb-4">
            <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-1">
              Título completo
            </div>
            <h4 className="text-base font-semibold text-[#F2F0ED] m-0 leading-snug">
              {cert.name}
            </h4>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <KV k="Jurisdiction" v={cert.jurisdiction} />
            <KV k="Issuing body" v={cert.issuer} />
            <KV k="Number format" v={cert.numberFormat} />
            <KV k="Example" v={cert.example} mono />
          </div>

          <div className="mb-5">
            <div className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-3">
              Alcance del producto
            </div>
            <p className="text-sm text-[#F2F0ED] leading-relaxed m-0">{cert.productScope}</p>
          </div>

          <div className="mb-5">
            <div className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-3">
              Protocolo de verificación en 3 pasos
            </div>
            <ol className="space-y-2 list-none pl-0 m-0">
              {cert.verificationSteps.map((s, i) => <li key={i} className="flex gap-3 text-sm text-[#F2F0ED] leading-relaxed m-0">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#DAA745]/20 text-[#DAA745] text-xs font-semibold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span>{s}</span>
                </li>)}
            </ol>
          </div>

          <div className="mb-5">
            <div className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-3">
              Patrones de falsificación comunes
            </div>
            <ul className="space-y-2 list-none pl-0 m-0">
              {cert.commonFakes.map((f, i) => <li key={i} className="flex gap-3 text-sm text-[#F2F0ED] leading-relaxed m-0">
                  <span className="text-red-400 flex-shrink-0 mt-0.5">×</span>
                  <span>{f}</span>
                </li>)}
            </ul>
          </div>

          {cert.verificationUrl && <div className="pt-5 border-t border-[#3A4250]/40">
              <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[#DAA745] hover:text-[#c4952e] no-underline">
                Open {cert.verificationUrlLabel}
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>}
        </div>
      </div>
    </div>;
}
function KV({
  k,
  v,
  mono = false
}: {
  k: string;
  v: string;
  mono?: boolean;
}) {
  return <div>
      <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-1">{k}</div>
      <div className={`text-sm text-[#F2F0ED] leading-snug ${mono ? 'font-mono text-xs bg-[#1C1F26] px-2 py-1 rounded border border-[#3A4250]/40 inline-block' : ''}`}>
        {v}
      </div>
    </div>;
}