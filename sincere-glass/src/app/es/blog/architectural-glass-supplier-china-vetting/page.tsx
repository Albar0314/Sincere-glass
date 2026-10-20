import type { Metadata } from 'next';
import BlogArticleLayout, { generateArticleMetadata, articleJsonLd, type TOCItem } from "@/_i18n/es/components/blog/BlogArticleLayout";
import TLDRBox from "@/_i18n/es/components/blog/TLDRBox";
import LeadMagnetCTA from "@/_i18n/es/components/blog/LeadMagnetCTA";
import CostDisclaimer from "@/_i18n/es/components/blog/CostDisclaimer";
import RelatedProductsCards from "@/_i18n/es/components/blog/RelatedProductsCards";
import FAQ from "@/_i18n/es/components/blog/blocks/FAQ";
import { blogArticles } from '@/lib/blog-registry';
import { makeAlternates } from '@/lib/i18n';
import RiskExposureProfiler from "@/_i18n/es/components/blog/article-15/RiskExposureProfiler";
import CertVerifier from "@/_i18n/es/components/blog/article-15/CertVerifier";
import VideoAuditChecklist from "@/_i18n/es/components/blog/article-15/VideoAuditChecklist";
const SLUG = 'architectural-glass-supplier-china-vetting';
const article = blogArticles.find(a => a.slug === SLUG)!;
export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates('/blog/' + SLUG, "es")
};
const toc: TOCItem[] = [{
  id: 'the-5-risks',
  text: "Los 5 riesgos de comprar vidrio a un desconocido",
  level: 2
}, {
  id: 'risk-1-trading',
  text: "Riesgo 1: Empresa comercial que se hace pasar por fábrica",
  level: 2
}, {
  id: 'risk-2-certs',
  text: "Riesgo 2: Certificaciones falsas o vencidas",
  level: 2
}, {
  id: 'risk-3-capacity',
  text: "Riesgo 3: Capacidad de producción fabricada",
  level: 2
}, {
  id: 'risk-4-quality',
  text: "Riesgo 4: Teatro de calidad en la muestra del showroom",
  level: 2
}, {
  id: 'risk-5-financial',
  text: "Riesgo 5: Colapso financiero a mitad del pedido",
  level: 2
}, {
  id: 'exposure-profiler',
  text: "Evalúe su exposición",
  level: 2
}, {
  id: 'cert-verifier',
  text: "Descifre la certificación",
  level: 2
}, {
  id: 'video-audit',
  text: "La auditoría en vídeo de 90 minutos",
  level: 2
}, {
  id: 'red-flags',
  text: "12 señales de alerta que deben pausar la orden de compra",
  level: 2
}, {
  id: 'walk-away',
  text: "Cuándo retirarse vs. renegociar",
  level: 2
}, {
  id: 'faq',
  text: "Preguntas frecuentes del comprador",
  level: 2
}];
const buyerFaq = [{
  q: 'Can I visit the factory in person before placing an order?',
  a: 'Yes, and most serious Chinese suppliers welcome it. Standard practice is a 1-day visit for a $100K+ order, often combined with other factory visits in the same city. You arrange your own visa and travel; the factory arranges airport pickup and a translator. If a supplier refuses an in-person visit, treat that as a Risk 1 signal — a real factory has nothing to hide.'
}, {
  q: 'Do Chinese glass factories accept third-party pre-shipment inspection?',
  a: 'Standard practice. SGS, Bureau Veritas (BV), Intertek, and CCIC all offer glass inspection in Wuhan, Shahe, Dongguan, and other glass hubs. Cost runs $300–800 per inspection day. Book 7+ days ahead. A supplier who refuses or stalls on third-party inspection is signalling they do not want their claims verified.'
}, {
  q: 'What if the supplier sends only photos of certifications, not the full PDF?',
  a: 'That is a Risk 2 signal. A real test report is 10+ pages: scope, test method, numerical results, lab seal, authorised signatory. A photo of a cover page is not evidence; it is marketing. Insist on the full PDF with a verifiable report number, then cross-check that number at the CNAS lab directory or the issuing lab’s own site.'
}, {
  q: 'How do I know the GB test report is real and not forged?',
  a: 'Three checks. First, the issuing lab must be listed on the CNAS directory with glass-testing in its accreditation scope. Second, the report ID should return no duplicate hits on Baidu — forgeries get reused across suppliers. Third, call the lab directly with the report number; CNAS labs will confirm or deny. The whole verification takes under 30 minutes.'
}, {
  q: 'What is the difference between a factory and a "工贸一体" (manufacturer+trader) company?',
  a: 'A pure factory produces only; a 工贸一体 (gong-mao-yi-ti) runs both production and trading under one roof. The latter is legitimate — it means the factory handles its own exports instead of selling through an agent. The red flag is a trading company that calls itself a factory. Check the business licence registered scope: if it says 销售 (sales) only, no 生产 (production), it is a trader regardless of what the website says.'
}, {
  q: 'Can I get a physical sample before committing to a container?',
  a: 'Yes. Sample pieces (300×300mm or 500×500mm) are standard; expect to pay for samples plus courier (~$50–200 per courier shipment via DHL/FedEx). What the sample confirms: edge quality, coating appearance, interlayer clarity, dimensional accuracy. What it cannot confirm: whether the production run will match the sample. A sample is a necessary but insufficient check — the audit protocol above exists because samples are easy to curate.'
}];
const faqForSchema = buyerFaq;
export default function Page() {
  const schemas = articleJsonLd(article, faqForSchema);
  return <BlogArticleLayout article={article} toc={toc}>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(s)
    }} />)}

      <TLDRBox takeaways={['Buying glass from a Chinese supplier you have never met concentrates five distinct risks: legitimacy, capability, quality, financial, and logistics. Audit each one, not the vendor overall.', 'The two document checks that cost nothing: business licence from GSXT.gov.cn (verifies the company exists and the scope includes manufacturing), and CNAS lab registry (verifies the test report issuer is accredited).', 'The one audit that scales: a 90-minute live video walk-through across 8 production stations. Record it. Keep the photos. Repeat annually for returning suppliers.', 'Pre-shipment inspection by SGS / BV / CCIC costs $300–800 per day and is non-negotiable for strict-code destinations (US / EU / AU). It is cheaper than one rejected container.', 'A supplier that resists third-party inspection, refuses to show the furnace control screen, or ships CE certifications without a Declaration of Performance is telling you something. Believe them.']} />

      <p>
        Nunca ha conocido a este proveedor. Lo encontró en Alibaba, en un stand de la Feria de Cantón o a través de una referencia transmitida por dos grupos de WhatsApp alejados de cualquier persona de su confianza. Su sitio web muestra una planta de producción que usted no puede verificar, certificaciones que no ha visto y un representante de ventas que responde a las 2 a.m. La cotización está un 25 % por debajo de la siguiente opción más económica. Todos los que antes que usted pagaron el silencio de este proveedor son una historia de advertencia que aún no ha escuchado.
      </p>

      <p>
        La verificación de proveedores no consiste en demostrar que el proveedor es honesto. Se trata de reducir, en secuencia, el número de formas en que el trato puede fallar, de modo que el primer fallo lo detenga antes de que se mueva el dinero. Este artículo es la visión de un operador de fábrica sobre ese proceso, escrita desde una planta de producción de 20,000 m² en Wuhan: los cinco riesgos que, a nuestro juicio, los compradores subestiman, las revisiones documentales que no cuestan nada, el protocolo de auditoría que escala y los momentos en que es mejor retirarse que renegociar.
      </p>

      <p>
        Para el recorrido completo del comprador — a quién comprar, cómo presupuestar, cómo encajan el pago y el envío — consulte nuestra{' '}
        <a href="/blog/how-to-import-glass-from-china">
          guía completa para importar vidrio arquitectónico desde China
        </a>
        . Este artículo profundiza específicamente en la etapa de verificación de proveedores.
      </p>

      {/* ─────────────────────────────────────────────────────────── */}
      <h2 id="the-5-risks">Los 5 riesgos de comprar vidrio a un desconocido</h2>

      <p>
        Los compradores suelen concebir la verificación de proveedores como un único riesgo —"¿es legítima esta empresa?"— y construyen un único cuadro de evaluación en torno a él. En la práctica hay cinco, y cada uno puede materializarse de forma independiente. Una fábrica legítima sin madurez en control de calidad le enviará el producto equivocado a tiempo. Una fábrica capaz con flujo de caja débil desaparecerá a mitad del pedido tras cobrar su anticipo. Tratar todos estos factores como un solo bloque significa pasar por alto el que realmente importa para su operación.
      </p>

      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm text-left" aria-label="Los cinco riesgos del proveedor y cómo se manifiestan en la práctica">
          <caption className="text-xs text-[#8B95A5] italic text-left pb-3 caption-top">
            Tabla 1. Cinco dimensiones de riesgo, cómo se presenta cada una y el método de detección principal. Marco de referencia: nuestra experiencia de verificación con más de 200 compradores; contrastado con las categorías de disputas de Alibaba Trade Assurance. Datos verificados: 2026-10-15.
          </caption>
          <thead>
            <tr className="border-b border-[#3A4250]/40">
              <th scope="col" className="py-3 pr-4 text-xs font-semibold text-[#DAA745] uppercase tracking-wider">
                Risk
              </th>
              <th scope="col" className="py-3 pr-4 text-xs font-semibold text-[#DAA745] uppercase tracking-wider">
                Cómo se manifiesta
              </th>
              <th scope="col" className="py-3 text-xs font-semibold text-[#DAA745] uppercase tracking-wider">
                Detección primaria
              </th>
            </tr>
          </thead>
          <tbody className="text-[#F2F0ED]">
            <tr className="border-b border-[#3A4250]/20">
              <th scope="row" className="py-3 pr-4 font-semibold whitespace-nowrap">Legitimacy</th>
              <td className="py-3 pr-4">Comerciante reidentificado como fábrica; domicilio no verificable; alcance de la licencia es únicamente "ventas".</td>
              <td className="py-3">Consulta de licencia comercial en GSXT + verificación de domicilio + lectura del alcance registrado.</td>
            </tr>
            <tr className="border-b border-[#3A4250]/20">
              <th scope="row" className="py-3 pr-4 font-semibold whitespace-nowrap">Capability</th>
              <td className="py-3 pr-4">El sitio web muestra paneles de gran formato; el horno real tiene 2,4 m de ancho. El sitio web muestra vidrio curvado; no existe horno de curvado.</td>
              <td className="py-3">Auditoría en video en tiempo real de cada línea de producción relevante para su especificación.</td>
            </tr>
            <tr className="border-b border-[#3A4250]/20">
              <th scope="row" className="py-3 pr-4 font-semibold whitespace-nowrap">Quality</th>
              <td className="py-3 pr-4">Las muestras del showroom son perfectas; la producción en serie presenta astillas en bordes, defectos de recubrimiento y desviaciones dimensionales.</td>
              <td className="py-3">Inspección independiente previa al embarque (SGS / BV / CCIC) + informes de ensayo verificados vinculados a cada SKU.</td>
            </tr>
            <tr className="border-b border-[#3A4250]/20">
              <th scope="row" className="py-3 pr-4 font-semibold whitespace-nowrap">Financial</th>
              <td className="py-3 pr-4">Cobra el depósito, dilata la producción y finalmente desaparece. Las acciones legales en China son lentas y costosas.</td>
              <td className="py-3">Informe de crédito empresarial (企查查 / 天眼查) + estructura de condiciones de pago + seguro de crédito comercial.</td>
            </tr>
            <tr>
              <th scope="row" className="py-3 pr-4 font-semibold whitespace-nowrap">Logistics</th>
              <td className="py-3 pr-4">El contenedor llega con roturas por embalaje deficiente, el código HS incorrecto genera demoras aduaneras y la reclamación al seguro es denegada.</td>
              <td className="py-3">
                Consulte nuestra{' '}
                <a href="/blog/glass-shipping-container-loading-guide" className="text-[#DAA745]">
                  guía de carga de contenedor
                </a>{' '}
                para el manual operativo.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Las cinco secciones siguientes abordan cada riesgo por separado: lo que observamos cuando algo falla, las verificaciones específicas que lo previenen y las normas que puede citar en una orden de compra o documento de especificaciones para dar carácter contractual a dichas verificaciones.
      </p>

      {/* ─────────────────────────────────────────────────────────── */}
      <h2 id="risk-1-trading">Riesgo 1: Empresa comercial que se hace pasar por fábrica</h2>

      <p>
        La discrepancia más frecuente entre lo que un proveedor declara ser y lo que realmente es. Una empresa comercializadora subcontrata a una fábrica real, aplica un margen del 10–20 % y se presenta ante usted como el fabricante. En el mejor de los casos, esto equivale simplemente a pagar de más por un intermediario que no necesitaba. En el peor, sus reclamaciones de control de calidad recaen sobre una fábrica que el comercializador se niega a identificar, certificaciones emitidas a una entidad diferente y ninguna vía de recurso cuando la producción en serie se desvía de la muestra.
      </p>

      <p>
        La distinción es importante porque los registros regulatorios de China son precisos al respecto. Toda empresa china registrada tiene una licencia comercial (营业执照) con una línea de objeto social registrado (经营范围). El objeto social de un fabricante incluye 生产 (producción) o 制造 (fabricación). El objeto social de un comerciante puro dice 销售 (ventas) únicamente. Una empresa 工贸一体 (gong-mao-yi-ti) tiene legítimamente ambas — son fábricas que gestionan su propia exportación en lugar de vender a través de un agente, lo cual es una estructura válida.
      </p>

      <h3>Cómo verificarlo</h3>
      <ol>
        <li>
          Obtenga la licencia comercial directamente desde{' '}
          <a href="https://www.gsxt.gov.cn" target="_blank" rel="noopener noreferrer">
            GSXT.gov.cn
          </a>{' '}
          (Sistema Nacional de Publicidad de Información Crediticia Empresarial). Es gratuito y público. Busque por nombre de empresa o Código de Crédito Social Unificado (18 caracteres). Lea la línea de objeto social registrado.
        </li>
        <li>
          Contraste la dirección registrada con la vista de calle de Baidu Maps (百度地图). Una dirección de fábrica debe mostrar una fábrica, no una torre de oficinas.
        </li>
        <li>
          Compare el objeto social registrado con lo que declara el sitio web del proveedor. "Somos un fabricante líder de vidrio templado" de una empresa cuyo objeto social dice 销售 únicamente es una discrepancia documental, no una exageración de marketing.
        </li>
      </ol>

      <p>
        Nada de esto tiene coste. Toma menos de 15 minutos una vez que sabe dónde buscar. Los proveedores que filtra son aquellos en los que cada verificación posterior habría sido pura formalidad.
      </p>

      {/* ─────────────────────────────────────────────────────────── */}
      <h2 id="risk-2-certs">Riesgo 2: Certificaciones falsas o vencidas</h2>

      <p>
        Las certificaciones fallan en la evaluación del comprador de tres maneras: falsificadas directamente, emitidas legítimamente pero vencidas, o emitidas para un producto distinto al que está cotizando. La segunda y la tercera son más comunes que la primera y más difíciles de detectar, porque la documentación parece auténtica hasta que se revisan los detalles específicos.
      </p>

      <p>
        Las normas de referencia para el vidrio arquitectónico son específicas por jurisdicción: China utiliza GB 15763 (acristalamiento de seguridad) y GB 11944 (UVA (Unidad de Vidrio Aislante)), la UE utiliza EN 12150 (templado), EN 14449 (laminado) y EN 1279 (UVA (Unidad de Vidrio Aislante)) bajo el marcado CE, EE. UU. hace referencia a ANSI Z97.1 y CPSC 16 CFR 1201, y Australia utiliza AS 1288. Cada sistema tiene una autoridad emisora distinta y un registro público diferente donde puede verificar un número de certificado. El CertVerifier a continuación analiza las ocho certificaciones más comunes que su proveedor le presentará, con el formato de cada número de certificado y la URL oficial donde puede confirmarlo.
      </p>

      <h3>Tres preguntas que debe hacer sobre cualquier certificación</h3>
      <ol>
        <li>
          <strong>¿Quién la emitió?</strong> El laboratorio emisor u organismo notificado debe estar acreditado específicamente para ensayos de vidrio. En China eso significa acreditación CNAS con alcance en vidrio. En la UE significa un Organismo Notificado incluido en la base de datos NANDO de la UE con la norma armonizada (hEN) pertinente en su alcance. En EE. UU. significa un laboratorio miembro de SGCC.
        </li>
        <li>
          <strong>¿Qué producto cubre?</strong> Un informe de ensayo para vidrio templado de 6 mm no cubre vidrio templado de 10 mm. Una Declaración de Prestaciones para una composición de vidrio laminado (6-1.52-6 PVB (polivinil butiral)) no cubre una composición diferente (8-1.52-8 SGP (SentryGlas Plus)). Compare el documento de certificación línea por línea con las especificaciones reales de su orden de compra.
        </li>
        <li>
          <strong>¿Está vigente?</strong> ISO 9001 opera en ciclos de 3 años. Las certificaciones 3C se renuevan habitualmente cada 5 años. Los informes de ensayo de laboratorio no tienen fecha de caducidad legal, pero no deberían tener más de 2–3 años de antigüedad para reflejar la producción actual. Las fechas importan.
        </li>
      </ol>

      <LeadMagnetCTA variant="inline" articleSlug={SLUG} title="Descargar la referencia global de normas para vidrio" description="Un PDF con las cláusulas, métodos de ensayo y criterios de aceptación de US IBC (Código Internacional de Construcción), EU EN, China GB y Australia AS — útil para adjuntar a una RFP de proveedor y evitar toda ambigüedad sobre qué norma cubre la cotización." />

      {/* ─────────────────────────────────────────────────────────── */}
      <h2 id="risk-3-capacity">Riesgo 3: Capacidad de producción fabricada</h2>

      <p>
        Un sitio web muestra una línea de vidrio templado jumbo de 3 m×15 m. El horno real tiene 2,4 m de ancho. Un sitio web muestra fachadas de vidrio templado curvado en un edificio emblemático. No hay horno de curvado en las instalaciones. Un sitio web declara una producción anual de 500.000 m². La planta es un solo edificio con dos líneas de pulido de bordes.
      </p>

      <p>
        El fraude de capacidad es más difícil de detectar solo con documentación, porque no existe un registro público del equipamiento de la fábrica. La solución más económica es la que desarrollamos para el VideoAuditChecklist más abajo: un recorrido en directo de 90 minutos en el que el proveedor lleva un teléfono por la planta de producción durante su llamada. El guion es preciso — qué máquinas mostrar, qué debe aparecer en la pantalla del operario, cómo deben verse los alrededores. Los impostores no pueden superarlo, porque tendrían que tomar prestada una fábrica durante esa hora.
      </p>

      <h3>Lo que la capacidad real significa para su especificación</h3>
      <ul>
        <li>
          <strong>{"Vidrio templado jumbo (> 2,4 m de ancho):"}</strong> Requiere un horno de templado horizontal de cama ancha. El ancho es una restricción física fija. Verifíquelo en vídeo.
        </li>
        <li>
          <strong>Vidrio templado curvado / vidrio curvado:</strong> Requiere un horno de curvado (máquina distinta al templado plano). Si el proveedor realiza este proceso de forma habitual, deberían verse paneles curvados en la planta de producción.
        </li>
        <li>
          <strong>Laminado con SGP (SentryGlas Plus):</strong> Requiere un autoclave dimensionado para el panel y stock de lámina intermedia SentryGlas en almacenamiento en frío. El PVB (polivinil butiral) y el SGP (SentryGlas Plus) utilizan el mismo autoclave, pero con una manipulación diferente de la lámina intermedia.
        </li>
        <li>
          <strong>UVA (Unidad de Vidrio Aislante) de vidrio de baja emisividad (Low-E):</strong> Requiere una estación de relleno de argón con medidor de concentración, doble sello (sello primario de butil + sello secundario de silicona) y utillaje para perfil separador de borde cálido. Los tres elementos deben estar presentes para que la declaración de UVA (Unidad de Vidrio Aislante) de vidrio de baja emisividad (Low-E) sea defendible.
        </li>
        <li>
          <strong>Vidrio con frita cerámica / vidrio esmaltado:</strong> Requiere una estación de serigrafía + horno de frita cerámica (diferente al horno de templado, con frecuencia en línea integrada). La selección de patrones que el proveedor pueda mostrarle es la prueba de ello.
        </li>
      </ul>

      {/* ─────────────────────────────────────────────────────────── */}
      <h2 id="risk-4-quality">Riesgo 4: Teatro de calidad en la muestra del showroom</h2>

      <p>
        La muestra que envía un proveedor es su mejor pieza de vidrio: con pulido de bordes manual, inspeccionada bajo buena iluminación y embalada en espuma. El vidrio de producción se fabrica en volumen bajo presión de tiempo, con muestreo de control de calidad cada n paneles. La brecha entre ambos es donde los compradores salen perjudicados.
      </p>

      <p>
        La medida de protección es la inspección previa al embarque por parte de un tercero independiente. SGS, Bureau Veritas, Intertek y CCIC ofrecen servicios de inspección de vidrio en los principales centros vidrieros chinos (Shahe, Wuhan, Dongguan, Qingdao). Un inspector acude a la fábrica uno o dos días antes del precinto del contenedor, extrae una muestra representativa de la producción terminada y verifica el cumplimiento con la especificación de su orden de compra. El costo oscila entre $300 y $800 por día de inspección. En menos de 48 horas usted recibe un informe con fotografías, mediciones dimensionales y recuento de defectos.
      </p>

      <p>
        Para destinos con normativa estricta —EE. UU., UE, Australia, Canadá— la inspección previa al embarque por terceros es, en nuestra opinión, innegociable. El costo de un contenedor rechazado en el puerto de destino (demora + reexportación + retraso en el cronograma del proyecto) es entre 50 y 100 veces el valor de la inspección. Esta también genera un registro documental que puede utilizarse en caso de que surja una disputa de garantía posterior.
      </p>

      <h3>Qué cubre un buen informe de inspección</h3>
      <ul>
        <li>Tamaño de la muestra y método de selección (aleatorio o dirigido).</li>
        <li>Precisión dimensional respecto a los planos de la orden de compra, medida en múltiples paneles.</li>
        <li>Defectos visuales por panel: rayaduras, inclusiones, astillas en bordes, defectos de recubrimiento.</li>
        <li>Cuando aplique: ensayo de fragmentación de vidrio templado en un panel de sacrificio, ensayo de punto de rocío en UVA (Unidad de Vidrio Aislante), verificación de adhesión en bordes del laminado.</li>
        <li>Fotografías del método de embalaje en caja, número de contenedor y número de precinto.</li>
      </ul>

      {/* ─────────────────────────────────────────────────────────── */}
      <h2 id="risk-5-financial">Riesgo 5: Colapso financiero a mitad del pedido</h2>

      <p>
        El escenario de fallo que nadie quiere contemplar: el proveedor cobra el anticipo, inicia la producción, se queda sin capital operativo antes del embarque y no puede entregar. En la versión leve, entrega tarde con material de menor calidad. En la versión extrema, desaparece: teléfonos desconectados, oficina vacía. El recurso legal en China está teóricamente disponible, pero es lento y sujeto a limitaciones jurisdiccionales; una disputa de $100 000 raramente justifica el costo de su persecución desde el exterior.
      </p>

      <p>
        La prevención combina verificación crediticia y estructura de pago. Los servicios de crédito empresarial 企查查 (qichacha.com) y 天眼查 (tianyancha.com) publican registros crediticios de empresas chinas: litigios, sanciones administrativas, medidas de congelación de participaciones, atrasos fiscales y registros de impago de deudas. Un historial limpio no es garantía; un historial de demandas en la industria vidrieras es una señal de alerta clara.
      </p>

      <h3>Estructura de pago como gestión de riesgo</h3>
      <ul>
        <li>
          <strong>{"Pedido de prueba (< $20 000):"}</strong> El 100 % TT por adelantado es aceptable si las verificaciones de licencia comercial y auditoría por video son satisfactorias. La exposición queda acotada.
        </li>
        <li>
          <strong>Pedido estándar ($20K–$100K):</strong> El 30 % TT de depósito / 70 % TT contra copia del B/L es la estructura habitual. El proveedor produce con su depósito; usted libera el saldo una vez confirmado que la mercancía está en tránsito.
        </li>
        <li>
          <strong>{"Pedido grande (> $100K):"}</strong> Carta de crédito a la vista de un banco de reconocido prestigio. Sí, es más lenta; sí, tiene comisiones. Es la cobertura más eficaz frente al colapso en mitad de un pedido. Evite la carta de crédito a plazo (pago diferido) con proveedores nuevos: traslada su riesgo crediticio al banco, pero lo expone a disputas posteriores al embarque.
        </li>
        <li>
          <strong>Seguro de crédito comercial:</strong> Sinosure (aseguradora china de crédito a la exportación) y Coface, Atradius, Euler Hermes (aseguradoras europeas de crédito) ofrecen cobertura para el comprador. Para compradores recurrentes, esto resulta más económico que las comisiones de la carta de crédito a lo largo de un año de pedidos.
        </li>
      </ul>

      <CostDisclaimer variant="compact" />

      {/* ─────────────────────────────────────────────────────────── */}
      <h2 id="exposure-profiler">Evalúe su exposición</h2>

      {/* SSR shadow for C21 compliance: explains the interactive to AI crawlers that don't execute JS */}
      <p>
        El analizador que se muestra a continuación toma cuatro variables — monto de la operación, relación con el proveedor, exigencia normativa del destino y complejidad del producto — y calcula cinco puntuaciones de riesgo ponderadas. El riesgo de legitimidad pondera con mayor peso el historial de la relación. El riesgo de capacidad pondera la complejidad del producto. El riesgo de calidad pondera la exigencia del código normativo del destino. El riesgo financiero pondera el monto de la operación. El riesgo logístico pondera el monto de la operación y el destino. La puntuación global sitúa el caso en uno de cuatro niveles de veredicto (verde / amarillo / naranja / rojo), cada uno con un protocolo concreto: un primer pedido empresarial de $500K destinado a EE. UU. cae en rojo (auditoría presencial completa, carta de crédito a la vista, envíos escalonados); un pedido recurrente de $50K de vidrio templado simple con destino al sudeste asiático cae en verde (diligencia debida estándar suficiente).
      </p>

      <RiskExposureProfiler />

      <p>
        El protocolo que recomienda la herramienta no es una sugerencia opcional. Es la línea de base que aplicaríamos a nuestro propio primer pedido en ese escenario. Escale las medidas ante señales detectadas durante la auditoría; redúzcalas solo tras 2–3 entregas sin incidencias que acrediten un historial sólido.
      </p>

      {/* ─────────────────────────────────────────────────────────── */}
      <h2 id="cert-verifier">Descifre la certificación</h2>

      {/* SSR shadow for C21 compliance */}
      <p>
        El verificador que se muestra a continuación cubre las ocho certificaciones que los compradores encuentran con mayor frecuencia en el comercio de vidrio: las chinas GB 15763.2 (vidrio templado), GB 15763.3 (vidrio laminado), GB/T 11944 (UVA (Unidad de Vidrio Aislante)); las europeas EN 12150-2 y EN 14449; la estadounidense ANSI Z97.1; el marcado CE europeo; e ISO 9001. Para cada una se indica el organismo emisor, el formato de número que debe llevar el certificado, la URL del registro público donde verificarlo, un protocolo de verificación en tres pasos y los patrones fraudulentos que detectamos con mayor frecuencia (solo fotografías, alcance de producto no coincidente, fechas de vencimiento expiradas). Seleccione la certificación que le ha proporcionado su proveedor para ver su ruta de verificación.
      </p>

      <CertVerifier />

      <p>
        Ninguno de estos pasos de verificación requiere servicios de pago. Los ocho registros son públicos. La hora que dedique a verificar las certificaciones de extremo a extremo con un proveedor nuevo le ahorra los 6–12 meses de gestiones que conlleva el rechazo de un proyecto por incumplimiento normativo.
      </p>

      {/* ─────────────────────────────────────────────────────────── */}
      <h2 id="video-audit">La auditoría por video de 90 minutos — guion por estación</h2>

      {/* SSR shadow for C21 compliance */}
      <p>
        La lista de verificación que se presenta a continuación es un recorrido en directo por video de ocho estaciones: recepción / oficina (10 min), corte (8 min), canteado (6 min), templado (10 min), laminado (10 min), ensamblaje de UVA (Unidad de Vidrio Aislante) (8 min), laboratorio de control de calidad (8 min) y almacén / expedición (5 min). Para cada estación se detallan las tres solicitudes específicas que debe hacer al operador de cámara (qué mostrar, acercar el plano, abrir el plano), los criterios de aprobación que distinguen una línea real de una preparada, y las fotografías que debe guardar en su expediente. Cada estación incluye también una señal de abandono — la observación concreta que debe poner fin a la auditoría y a la relación. Despliegue cada estación para ver el detalle. Grabe la llamada; conserve las fotografías.
      </p>

      <VideoAuditChecklist />

      <p>
        Nosotros realizamos esta auditoría desde el otro lado: los compradores nos guían a través de ella en llamadas de WhatsApp casi todas las semanas. Los proveedores que confían en su línea la superan sin dificultad. Los que no lo hacen, o bien rechazan la llamada, insisten en programarla con dos semanas de antelación para poder prepararse (lo que anula el propósito), o intentan narrar a partir de un conjunto estático de vídeos pregrabados. Las tres reacciones son información útil.
      </p>

      {/* ─────────────────────────────────────────────────────────── */}
      <h2 id="red-flags">12 señales de alerta que deben pausar la orden de compra</h2>

      <p>
        Ninguna de estas señales es automáticamente descalificadora. Cualquiera de ellas es un motivo para reducir el ritmo, hacer una pregunta más, exigir un paso adicional de verificación. Tres o más de ellas en el mismo proveedor son un motivo para retirarse.
      </p>

      <ol>
        <li>El alcance registrado de la licencia comercial es solo 销售 (ventas), no 生产 (producción).</li>
        <li>La cotización es más de un 20 % inferior a la siguiente oferta comparable más económica sin ninguna explicación.</li>
        <li>Las condiciones de pago exigen el 100 % TT por adelantado para un pedido superior a $50K.</li>
        <li>Las certificaciones se proporcionan únicamente como fotografías JPEG, no como informes PDF completos.</li>
        <li>El representante de ventas habla con fluidez sobre los productos, pero no puede responder preguntas básicas de proceso (marca del horno, tiempo de enfriamiento rápido, tipo de lámina intermedia).</li>
        <li>El sitio web muestra capacidades (jumbo, curvado, SGP (SentryGlas Plus)) que la auditoría en video no puede confirmar en planta.</li>
        <li>El proveedor rechaza una auditoría en video en directo o insiste en programarla con dos semanas de antelación.</li>
        <li>El proveedor rechaza una inspección previa al envío por terceros o insiste en utilizar su propio inspector.</li>
        <li>La dirección no coincide en la vista de calle de Baidu Maps, o coincide pero muestra un edificio de oficinas sin producción visible.</li>
        <li>El historial crediticio empresarial (企查查) registra demandas recientes, medidas de congelación de participaciones o atrasos fiscales.</li>
        <li>Los clientes de referencia son todos del mismo país o canal y ninguno puede ser contactado de forma independiente.</li>
        <li>El ritmo de comunicación se acelera repentinamente en relación con los plazos de pago y se ralentiza ante las preguntas técnicas.</li>
      </ol>

      {/* ─────────────────────────────────────────────────────────── */}
      <h2 id="walk-away">Cuándo retirarse vs. renegociar</h2>

      <p>
        Las señales de alerta no son binarias. Un proveedor puede recuperar la confianza abordando la señal directamente, y en ocasiones ese proceso da lugar a una relación más sólida de la que se habría tenido de otro modo. La cuestión es qué señales son negociables y cuáles no.
      </p>

      <h3>Negociables: señales de proceso</h3>
      <ul>
        <li>Condiciones de pago — la mayoría de los proveedores aceptarán pasar del 100 % TT al 30/70 si el comprador lo exige.</li>
        <li>Inspección por terceros — práctica estándar del sector; un proveedor que inicialmente se resiste suele aceptar si se le solicita con firmeza.</li>
        <li>Plazo de entrega — frecuentemente inflado en la primera cotización; vale la pena ponerlo a prueba.</li>
        <li>Entrega de muestras — un proveedor que duda en enviar muestras suele tener problemas operativos, no intención fraudulenta. Tiene solución.</li>
      </ul>

      <h3>No negociable: señales de identidad</h3>
      <ul>
        <li>El alcance de la licencia comercial no incluye fabricación — esto es un hecho documental, no una negociación.</li>
        <li>El ancho del horno no coincide con el tamaño del panel cotizado — es una limitación física; ninguna discusión lo cambia.</li>
        <li>Las certificaciones son falsificadas (verificadas contra el registro del organismo emisor) — retírese y repórtelo al registro.</li>
        <li>El historial crediticio muestra litigios en el sector del vidrio arquitectónico en los últimos 24 meses — el patrón es más importante que la causa declarada.</li>
      </ul>

      <p>
        El modelo mental útil: las señales de proceso son cosas que el proveedor puede cambiar para usted. Las señales de identidad son lo que el proveedor es. Las primeras se renegocian; de las segundas, se retira.
      </p>

      {/* ─────────────────────────────────────────────────────────── */}
      <FAQ items={buyerFaq} title="Preguntas frecuentes del comprador" />

      {/* ─────────────────────────────────────────────────────────── */}
      <RelatedProductsCards slugs={article.relatedProductSlugs || ['tempered-glass', 'laminated-glass', 'insulated-glass']} />

      {/* ─────────────────────────────────────────────────────────── */}
      <section className="my-14">
        <h2 className="text-sm font-semibold text-[#DAA745] uppercase tracking-wider mb-5 m-0">
          Más en la Guía del Comprador
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <a href="/blog/how-to-import-glass-from-china" className="block rounded-xl bg-[#3A4250]/20 border border-[#3A4250]/40 p-5 hover:border-[#DAA745]/60 transition-colors no-underline">
            <div className="text-xs text-[#DAA745] uppercase tracking-wider mb-2">
              Artículo complementario
            </div>
            <div className="text-base font-semibold text-[#F2F0ED] mb-2">
              Cómo importar vidrio arquitectónico desde China
            </div>
            <p className="text-xs text-[#8B95A5] leading-relaxed m-0">
              El recorrido completo del comprador — desde la cotización hasta el despacho aduanero — en cinco etapas. Este artículo cubre en profundidad la Etapa 1 (verificación de proveedores).
            </p>
          </a>
          <a href="/blog/glass-shipping-container-loading-guide" className="block rounded-xl bg-[#3A4250]/20 border border-[#3A4250]/40 p-5 hover:border-[#DAA745]/60 transition-colors no-underline">
            <div className="text-xs text-[#DAA745] uppercase tracking-wider mb-2">
              Artículo complementario
            </div>
            <div className="text-base font-semibold text-[#F2F0ED] mb-2">
              Envío de vidrio en contenedor: el manual de la fábrica
            </div>
            <p className="text-xs text-[#8B95A5] leading-relaxed m-0">
              Embalaje, carga, seguro y códigos HS. Una vez completada la verificación, esta es la capa operativa del envío en sí.
            </p>
          </a>
        </div>
      </section>

      <LeadMagnetCTA variant="footer" articleSlug={SLUG} title="Mantenga los documentos de verificación en un solo lugar" description="Descargue la referencia global de códigos de vidrio y consérvela junto con sus archivos de auditoría de proveedores. El PDF cubre las cláusulas del IBC (Código Internacional de Construcción) de EE.UU., las normas EN de la UE, las GB de China y las AS de Australia más relevantes para la adquisición de vidrio templado, vidrio laminado, vidrio aislante y vidrio de baja emisividad (Low-E)." />
    </BlogArticleLayout>;
}