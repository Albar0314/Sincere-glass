import type { Metadata } from "next";
import { blogArticles } from "@/lib/blog-registry";
import BlogArticleLayout, { generateArticleMetadata, articleJsonLd, type TOCItem } from "@/_i18n/es/components/blog/BlogArticleLayout";
import TLDRBox from "@/_i18n/es/components/blog/TLDRBox";
import LeadMagnetCTA from "@/_i18n/es/components/blog/LeadMagnetCTA";
import RelatedProductsCards from "@/_i18n/es/components/blog/RelatedProductsCards";
import CostDisclaimer from "@/_i18n/es/components/blog/CostDisclaimer";
import FAQ from "@/_i18n/es/components/blog/blocks/FAQ";
import { makeAlternates } from "@/lib/i18n";
import SourcingLifecycleMap from "@/_i18n/es/components/blog/article-16/SourcingLifecycleMap";
import BuyerArchetypeSelector from "@/_i18n/es/components/blog/article-16/BuyerArchetypeSelector";
import SourcingBudgetEstimator from "@/_i18n/es/components/blog/article-16/SourcingBudgetEstimator";
const SLUG = "architectural-glass-china-buyer-guide";
const article = blogArticles.find(a => a.slug === SLUG)!;
export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`, "es")
};
const TOC: TOCItem[] = [{
  id: "who-this-is-for",
  text: "A Quién Va Dirigida Esta Guía",
  level: 2
}, {
  id: "why-china",
  text: "Por Qué China (y Cuándo No Es la Decisión Correcta)",
  level: 2
}, {
  id: "lifecycle",
  text: "El Ciclo de Aprovisionamiento: 6 Fases",
  level: 2
}, {
  id: "archetype",
  text: "Perfil del Comprador → Ruta Recomendada",
  level: 2
}, {
  id: "budget",
  text: "Verificación de Presupuesto Real",
  level: 2
}, {
  id: "five-risks",
  text: "Los 5 Riesgos que los Compradores Primerizos Subestiman",
  level: 2
}, {
  id: "hub-nav",
  text: "Cuándo Usar Cada Capítulo",
  level: 2
}, {
  id: "faq",
  text: "Preguntas Frecuentes",
  level: 2
}];
const FAQ_ITEMS = [{
  q: "Can I buy architectural glass directly from a Chinese factory as a small overseas buyer?",
  a: "Yes. Factories like ours regularly ship single-container orders (roughly 250–400 m² of IGU, more for monolithic tempered) to overseas distributors and single-project contractors. The practical minimum for a direct FOB order is one 20-foot container; below that, LCL shipments and middleman costs usually push unit prices back up to the point where a local distributor is cheaper."
}, {
  q: "What is a realistic lead time from signed PO to glass on site?",
  a: "For a mid-complexity Low-E IGU order of 1–2 containers: 4–6 weeks production, 4–6 weeks ocean transit (China to US West Coast or EU Mediterranean), 1–2 weeks customs and inland. Call it 10–14 weeks door-to-door with no surprises. Jumbo panels, SGP lamination, or coated specialty glass can add 2–3 weeks. Build at least a 2-week schedule buffer at the install side."
}, {
  q: "What payment terms should I expect from a first-time Chinese supplier?",
  a: "30% T/T on PO signing, 70% T/T against copy of bill of lading before container release is the typical first-order structure. L/C at sight is possible but factories often price it 2–4% higher to cover bank fees and risk. After 2–3 successful shipments, repeat buyers can usually negotiate 20/80 or L/C 30 days without a surcharge. 100% T/T upfront is a red flag; refuse it."
}, {
  q: "Do Chinese factories hold the certifications my project actually requires?",
  a: "The baseline is ISO 9001 (quality system) and Chinese 3C (CCC) certification for safety glass, which most reputable factories hold. For destination-market certifications — CE marking for EU, SGCC for US safety glazing, AS/NZS 2208 for Australia — availability varies by factory and by product line. Confirm the exact certification holder, product scope, issuing body, and expiry date before contract. The supplier vetting guide covers how to verify these without taking the factory's word for it."
}, {
  q: "Who is responsible if glass arrives damaged?",
  a: "Depends on the Incoterm. Under FOB (common for container shipments), risk transfers to you once the glass is loaded onto the vessel. Marine insurance (ICC A clause is strongest for architectural glass) is on you to arrange and claim. Under DDP, the factory covers risk through to your destination, but DDP pricing adds significant markup and factories often sub-contract the import clearance, so arrival-condition disputes get murky. Most direct-import architectural glass buyers run FOB + their own insurance."
}, {
  q: "What is the difference between a factory and a trading company, and does it matter?",
  a: "A factory owns the production lines and controls quality directly. A trading company places orders at multiple factories on your behalf, typically marking up 5–15%. Trading companies can be legitimate — they add value for buyers who need a single contact handling multiple product lines from multiple factories. Problems arise when a trading company presents itself as a factory, because you lose direct visibility into which factory is making your glass and whether it has the capability you specified. The vetting guide shows how to tell them apart."
}, {
  q: "How do I handle quality disputes if a shipment arrives defective?",
  a: "Three practical steps: (1) Photograph every defective panel before unloading, with the container seal and bill of lading in the same frame as proof of pre-opening condition. (2) File the marine insurance claim within 7 days of arrival (ICC A clauses typically have strict notification windows). (3) Open a dispute with the factory in writing, referencing the contractual defect tolerance and liquidated damages clauses. Factories that want repeat business usually resolve legitimate claims with partial credit or replacement in the next shipment; factories that stall are telling you something about the relationship."
}, {
  q: "Do I need a Chinese-speaking agent or inspector in China?",
  a: "Not required, but valuable for first-time buyers. Third-party inspection firms (SGS, Bureau Veritas, Intertek, TÜV) run Chinese-staffed inspection services starting around $300–$500 per pre-shipment check. They send a certified inspector to the factory floor, run your spec checklist, photograph the loaded container, and issue a report before container seal. For contractors on single projects where a bad shipment stops the job, this is cheap insurance. For repeat buyers, you can usually negotiate with the factory to let your inspector into mid-production."
}];
export default function ChinaBuyerGuidePillarPage() {
  const schemas = articleJsonLd(article, FAQ_ITEMS);
  return <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(s)
    }} />)}

      <BlogArticleLayout article={article} toc={TOC} ctaTitle="Sourcing architectural glass from China?" ctaDescription="Sincere Glass runs a 20,000 m² Wuhan facility with jumbo 3m × 15m tempering and lamination lines. Send your specification and we will come back with a line-item quote, lead time, and the certifications your project needs.">
        <TLDRBox takeaways={["China produces most of the world's architectural glass, but factory capability varies enormously. The right question is not whether to source from China — it is which factory, verified how, under what contract.", "There are 6 phases in the sourcing lifecycle. Three of them (vetting, RFQ, shipping) have dedicated deep-dive guides. Use this page to decide which phase you are in and jump to the right one.", "The 4 buyer archetypes (distributor, contractor, architect, developer) optimize for different things. Your reading priority through this cluster depends on which one you are.", "Landed cost for mid-complexity Low-E IGU runs roughly $60–$110/m² landed at destination port, depending on volume and freight mode. Any one-number quote without specification scrutiny is quoting on hidden assumptions.", "The 5 risks first-time buyers underestimate: capability mismatch, specification drift, quality drift post-first-shipment, Incoterm/insurance mismatch, and dispute recourse. Each is covered in detail in a dedicated chapter."]} />

        <p className="lead">
          Si está leyendo esta página, probablemente se encuentra en uno de tres puntos de partida: tiene una especificación de proyecto en mano pero aún no tiene proveedor, cuenta con una lista corta de fábricas chinas pero no tiene forma de distinguir cuál elegir, o acaba de recibir un primer envío que no salió según lo previsto y debe decidir qué hacer con el segundo. Esta guía es un punto central de referencia. No pretende enseñarle todo sobre ningún tema en particular — los capítulos especializados se encargan de eso. Su objetivo es ayudarle a identificar qué capítulo necesita, en qué orden, y qué preguntas debe hacerse antes de colocar su próximo pedido.
        </p>

        <h2 id="who-this-is-for">A Quién Va Dirigida Esta Guía — y Qué Capítulo Necesita Realmente</h2>

        <p>
          El conjunto de guías para compradores de este sitio está dirigido a quienes adquieren vidrio arquitectónico directamente de fábricas chinas, sin intermediación de un distribuidor local. Esto incluye cuatro tipos de compradores muy distintos, cada uno con preocupaciones diferentes.
        </p>

        <p>
          Un pequeño distribuidor que importa 1–3 contenedores a la vez y revende en el mercado local se preocupa principalmente por la calidad consistente de lote en lote y por condiciones de pago que se ajusten a su flujo de caja. Un contratista general que aprovisiona vidrio para un proyecto de construcción específico se preocupa por la entrega a obra en tiempo y por no ser quien tenga que explicar por qué la instalación se detuvo tres semanas. Un arquitecto que redacta especificaciones se preocupa por si el vidrio que especificó puede fabricarse realmente en las dimensiones indicadas en los planos, y por si su especificación sobrevivirá la fase de ingeniería de valor. Un promotor con una cartera de proyectos se preocupa por acuerdos de proveedor preferente, SKUs estandarizados entre proyectos y seguimiento de calidad a lo largo de 2–3 años.
        </p>

        <p>
          Estos cuatro perfiles de comprador consultan estas guías en distintos órdenes y se apoyan en partes diferentes de ellas. El selector interactivo de la sección 4 asigna a cada perfil una secuencia de lectura recomendada. Si prefiere ir directamente a esa sección, no es necesario haber leído esta guía de principio a fin antes de hacerlo.
        </p>

        <h2 id="why-china">Por Qué China para Vidrio Arquitectónico (y Cuándo No Es la Decisión Correcta)</h2>

        <p>
          China produce aproximadamente la mitad del vidrio plano mundial, con grandes concentraciones de capacidad de fabricación en Guangdong, Jiangsu, Shandong y Hubei. Para los compradores de vidrio arquitectónico, tres datos prácticos determinan la decisión de abastecimiento.
        </p>

        <p>
          <strong>Primero, escala y especialización.</strong> Un fabricante chino de nivel medio opera típicamente entre 2 y 4 hornos de templado, 1 a 3 autoclaves de laminado y 1 a 2 líneas de ensamblaje de UVA (Unidad de Vidrio Aislante) en una sola instalación de 20,000 m². Nuestra propia fábrica en Wuhan, por ejemplo, cuenta con 4 líneas de corte, 4 líneas de canteado, 2 hornos de templado (incluido uno que procesa paneles jumbo de 3m × 15m), 2 líneas de UVA y 2 autoclaves de laminado (una también de 3m × 15m). Esto es relevante porque los paneles jumbo —por encima de aproximadamente 2.5m × 6m— son difíciles de obtener fuera de China a precios competitivos. La capacidad existe en Europa y América del Norte, pero generalmente a través de fabricantes especializados con un sobreprecio del 40 al 80%.
        </p>

        <p>
          <strong>Segundo, precio unitario.</strong> En vidrio arquitectónico de uso general —vidrio templado transparente en tamaño estándar, vidrio laminado básico, UVA de baja emisividad (Low-E) en tamaño estándar— los precios FOB chinos son aproximadamente un 40–60% más bajos que el costo de fabricación equivalente en Europa o América del Norte. El flete y los aranceles reducen parte de esa diferencia, pero el precio puesto en destino en la mayoría de los mercados globales sigue favoreciendo a China en un 15–35% para pedidos de volumen medio.
        </p>

        <p>
          <strong>Tercero, flexibilidad en el plazo de entrega.</strong> Las fábricas chinas que operan múltiples líneas de producción en paralelo generalmente pueden incorporar un nuevo pedido en una ranura de producción de 4 a 6 semanas sin grandes reprogramaciones. Los fabricantes europeos y norteamericanos con carteras de pedidos más llenas suelen cotizar ventanas de producción de 8 a 16 semanas para el mismo trabajo.
        </p>

        <p>
          <strong>Cuándo China no es la opción correcta.</strong> Si su proyecto requiere una certificación de sistema específica y ensayada que solo un puñado de fabricantes globales posee —sistemas resistentes a impactos de huracanes con certificación Miami-Dade NOA, por ejemplo, o clasificaciones específicas contra explosiones— la lista de productos certificados puede no incluir una alternativa fabricada en China. Si el volumen de su proyecto es muy pequeño (uno o dos paneles), el costo fijo por contenedor en una importación directa elimina la ventaja de precio. Y si su cronograma es tan ajustado que cualquier retraso en el envío paraliza la obra, un fabricante local con entrega en 2 semanas supera a una importación desde China con un plazo de entrega de 10 semanas, incluso a mayor costo unitario.
        </p>

        <p>
          La versión honesta: China es la opción predeterminada para vidrio arquitectónico de uso general en volumen medio. Para certificaciones especiales, pedidos pequeños o cronogramas extremadamente ajustados, verifique que no existe una alternativa local antes de optar por la importación.
        </p>

        <h2 id="lifecycle">El ciclo de abastecimiento: 6 fases desde la especificación hasta la obra</h2>

        <p>
          El abastecimiento de vidrio arquitectónico desde una fábrica china es un proceso de 6 fases que típicamente toma entre 14 y 24 semanas desde el momento en que se decide importar hasta que el vidrio llega a su obra. Cada fase tiene un responsable distinto, un presupuesto de tiempo diferente y un conjunto específico de riesgos. El mapa interactivo a continuación es tanto un modelo mental como una herramienta de navegación: haga clic en cualquier fase para ver qué ocurre y acceda a la guía detallada correspondiente si existe para esa fase.
        </p>

        <p>
          <em>Cómo interpretarlo:</em> El flujo avanza de izquierda a derecha a través de las seis fases: definir especificación, preseleccionar fábricas, evaluar proveedores, solicitud de cotización y muestras, producción e inspección, envío y recepción. Cada fase indica su responsable (usted, la fábrica o un tercero), su presupuesto de tiempo típico en semanas, un resumen en prosa de lo que ocurre y los riesgos clave de esa fase. Las fases 3, 4 y 6 cuentan con artículos de análisis detallado; el enlace correspondiente aparece cuando aplica. Las fases 1, 2 y 5 se tratan dentro de esta guía central y en las preguntas frecuentes.
        </p>

        <SourcingLifecycleMap />

        <p>
          Dos aspectos importantes del ciclo de vida. Primero, las tres fases con guías detalladas son las tres donde los problemas ocurren con mayor frecuencia: evaluación de proveedores (fase 3), solicitud de cotización y contratación (fase 4), y envío (fase 6). Las otras tres fases no están exentas de riesgos, pero sus fallos suelen estar bajo su control. Segundo, el presupuesto de tiempo está dominado por la producción (fase 5) y el envío (fase 6). Si comprime el tiempo en otras fases, ahorra semanas; si lo comprime en estas dos, acumula meses de problemas.
        </p>

        <h2 id="archetype">Arquetipo de Comprador → Ruta de Abastecimiento Recomendada</h2>

        <p>
          No todos los compradores deben seguir el mismo esquema. Un pequeño distribuidor que realiza 4–8 pedidos repetidos al año optimiza de manera diferente a un contratista en un proyecto único; un arquitecto que redacta una especificación necesita una perspectiva distinta a la de un promotor con una cartera de proyectos. El selector a continuación mapea los cuatro arquetipos de comprador más comunes hacia una ruta de abastecimiento recomendada y un orden de lectura a través de este conjunto de artículos.
        </p>

        <p>
          <em>Cómo interpretarlo:</em> Seleccione el arquetipo que mejor se ajuste a su situación. El panel muestra el volumen de pedidos típico, las tres o cuatro variables que debería optimizar, una ruta de abastecimiento recomendada en un párrafo, y su prioridad de lectura a través de los tres capítulos de análisis detallado — ordenados por relevancia, con una breve explicación de por qué cada uno importa para su arquetipo. Cada arquetipo incluye también un único "error a evitar" — el error que observamos con más frecuencia en ese tipo de comprador.
        </p>

        <BuyerArchetypeSelector />

        <p>
          Seleccione el arquetipo que mejor encaje; nada le impide leer los capítulos en un orden diferente. El propósito del selector es que la jerarquía de prioridades cambia según su situación. Un contratista puntual que optimiza como un distribuidor habitual sobreinvierte en el desarrollo de proveedores a largo plazo; un distribuidor habitual que optimiza como un contratista puntual inspecciona en exceso cada envío y consume margen innecesariamente.
        </p>

        <LeadMagnetCTA variant="inline" articleSlug={SLUG} title="Gratis: Comparativa Global de Códigos de Construcción para Vidrio Arquitectónico" description="Referencia comparativa de normativas de vidrio arquitectónico en US IBC, EU EN, China GB y Australia AS — útil para redactar especificaciones o verificar qué certificaciones puede acreditar realmente una fábrica china." />

        <h2 id="budget">Análisis de Presupuesto Real: ¿Cuánto Cuesta Realmente el Vidrio Abastecido en China?</h2>

        <p>
          La parte más difícil del abastecimiento no es encontrar una fábrica — es construir un rango de presupuesto que pueda defender ante su propio equipo o cliente. La mayoría de los compradores primerizos subestiman la brecha entre el precio FOB y el costo en destino. El flete, los aranceles, la gestión en destino y el transporte interior suelen añadir entre un 20–45% sobre el precio FOB, dependiendo del volumen, la modalidad y el destino.
        </p>

        <p>
          <em>Cómo interpretarlo:</em> Introduzca el área total del proyecto en metros cuadrados, seleccione el nivel de complejidad que corresponda a lo que está adquiriendo, y elija la modalidad de flete. El estimador muestra el precio FOB (ex fábrica Wuhan), el flete, los aranceles y el costo total en destino — todos como rangos, no como cifras únicas. Bajo el titular, el desglose indica qué componente impulsa cada parte del rango. Si sus datos apuntan a una inconsistencia (FCL (Contenedor Completo) con volumen insuficiente, o LCL (Carga Consolidada) con volumen excesivo), el banner de advertencia lo indicará. Todas las cifras asumen destinos habituales en puertos principales de EE. UU./UE y se actualizan trimestralmente.
        </p>

        <SourcingBudgetEstimator />

        <CostDisclaimer />

        <p>
          Dos patrones que conviene entender antes de presentar estas cifras a cualquiera. El primero es que el rango FOB de cada nivel de complejidad es amplio por una razón: el acabado de bordes, las posiciones de los perforados, la elección del recubrimiento, la marca de la lámina intermedia (Trosifol frente a PVB (polivinil butiral) genérico, Kuraray SGP (SentryGlas Plus) frente a similares) y la varianza en el tamaño de los paneles dentro de un pedido pueden mover el precio entre 5 y 25 USD/m² cada uno. Una fábrica que cotiza en el extremo inferior de nuestro rango está cotizando con opciones más limitadas que una que cotiza en el extremo superior; comparar el "precio unitario" sin comparar las especificaciones es el error de abastecimiento más frecuente.
        </p>

        <p>
          El segundo patrón es que los aranceles y los cargos en destino son volátiles. Los aranceles estadounidenses sobre el vidrio arquitectónico chino han oscilado entre el 4,9% de base (HS 7005) hasta más del 25% durante los recargos por guerra comercial. Los aranceles de la UE son más estables (3,0% para la mayoría del vidrio laminado bajo HS 7007). Confirme su código HS con su agente aduanal antes de cerrar un presupuesto, y verifique esa clasificación frente a la especificación real cuando lleguen las muestras — el vidrio mal clasificado queda retenido en el puerto y en ocasiones es reclasificado a una tarifa superior.
        </p>

        <h2 id="five-risks">Los 5 Riesgos que los Compradores Primerizos Subestiman</h2>

        <p>
          Cada análisis detallado de abastecimiento en este conjunto está organizado en torno a uno o más de estos cinco riesgos. Enumerarlos aquí es un mapa, no un sustituto del detalle.
        </p>

        <p>
          <strong>Riesgo 1 · Discrepancia de capacidad.</strong> La fábrica puede aceptar su pedido sobre el papel pero no puede producirlo realmente según especificación. Casos habituales: una fábrica que lamina con PVB (polivinil butiral) aceptando un pedido con SGP (SentryGlas Plus) (lámina intermedia diferente, ciclo de autoclave diferente, control de calidad diferente), o una fábrica con un horno de templado de 2,4 m de ancho aceptando un pedido con paneles de 2,8 m de ancho. La mitigación consiste en una auditoría por vídeo de las líneas de producción específicas que ejecutarán su especificación, con las dimensiones de sus paneles visibles en pantalla junto al equipo. Tratado en la <a href="/blog/architectural-glass-supplier-china-vetting">guía de evaluación de proveedores</a>.
        </p>

        <p>
          <strong>Riesgo 2 · Deriva de la especificación.</strong> Usted especificó "vidrio laminado, lámina intermedia de PVB (polivinil butiral), 1.52 mm" y la fábrica cotizó sobre esa base; tras la firma de la orden de compra, preguntan si se acepta un PVB genérico en lugar del de marca que usted tenía en mente. Si dice que sí para ahorrar unos pocos dólares, acaba de perder la trazabilidad y el respaldo de la garantía. La solución es una especificación lo suficientemente precisa como para que los sustitutos más baratos sean rechazados en la revisión de presentación de documentos, y un contrato que enumere por nombre las marcas de lámina intermedia aprobadas.
        </p>

        <p>
          <strong>Riesgo 3 · Deterioro de la calidad a partir del primer envío.</strong> El primer envío es impecable porque la fábrica quiere conservar la cuenta. En el tercer o cuarto envío, las tasas de defectos a nivel de panel han aumentado gradualmente y la fábrica asume que usted no lo detectará porque el equipo de instalación ya está aplicando sellador. La solución es una inspección por envío —no solo del primero— y un promedio móvil de la tasa de defectos con seguimiento mensual. Desarrollado en el <a href="/blog/architectural-glass-supplier-china-vetting">guía de evaluación de proveedores</a>.
        </p>

        <p>
          <strong>Riesgo 4 · Incompatibilidad entre el Incoterm y el seguro.</strong> Usted firmó en FOB porque el precio era más bajo, pero no contrató un seguro marítimo adecuado para vidrio arquitectónico; un contenedor se vuelca durante la manipulación en puerto y el seguro de carga estándar liquida el valor de la materia prima, no el valor del panel fabricado. La solución es elegir el Incoterm con pleno conocimiento de causa y ajustar el alcance del seguro a la exposición real. Desarrollado en el <a href="/blog/how-to-import-glass-from-china">Guía de importación en 5 etapas</a> y el <a href="/blog/glass-shipping-container-loading-guide">manual de carga de contenedor</a>.
        </p>

        <p>
          <strong>Riesgo 5 · Recursos en caso de disputa.</strong> Algo sale mal —envío retrasado, tasa de defectos por encima de la tolerancia, color incorrecto— y su contrato no especifica cómo se resuelven las disputas, o establece un foro (tribunales chinos, arbitraje CIETAC) que resulta lento y costoso de gestionar desde fuera de China. La solución es incluir desde el inicio una cláusula de resolución de disputas por escrito, con el foro, la ley aplicable y los pasos de escalada especificados. El recurso práctico para la mayoría de los compradores primerizos es retener suficiente pago (mediante carta de crédito o T/T 70/30) de modo que abandonar un pago final deficiente le resulte a la fábrica más barato que disputarlo.
        </p>

        <h2 id="hub-nav">Cuándo usar cada capítulo de esta guía</h2>

        <p>
          Utilice esto como tabla de acceso rápido para el conjunto de la Guía del Comprador.
        </p>

        <div className="my-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse" aria-label="Tabla de acceso rápido: qué capítulo de la Guía del Comprador cubre cada situación">
            <caption className="text-left text-xs text-[#8B95A5] italic pb-3">
              Tabla de navegación central — identifique su situación y acceda al capítulo correspondiente. Datos verificados: 2026-10-19.
            </caption>
            <thead>
              <tr className="border-b border-[#DAA745]/40">
                <th scope="col" className="text-left py-2.5 px-3 text-[#DAA745] font-semibold">
                  Si usted se encuentra aquí
                </th>
                <th scope="col" className="text-left py-2.5 px-3 text-[#DAA745] font-semibold">
                  Leer este capítulo
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#3A4250]/30">
                <td scope="row" className="py-3 px-3 text-[#F2F0ED]/90 align-top">
                  Tiene una especificación y una lista corta de fábricas, y necesita verificarlas antes de la solicitud de cotización.
                </td>
                <td className="py-3 px-3 align-top">
                  <a href="/blog/architectural-glass-supplier-china-vetting" className="text-[#DAA745] no-underline hover:underline">
                    Modelo de amenazas para la verificación de proveedores →
                  </a>
                </td>
              </tr>
              <tr className="border-b border-[#3A4250]/30">
                <td scope="row" className="py-3 px-3 text-[#F2F0ED]/90 align-top">
                  Tiene una fábrica verificada y se está preparando para enviar la solicitud de cotización, firmar el contrato y solicitar una muestra.
                </td>
                <td className="py-3 px-3 align-top">
                  <a href="/blog/how-to-import-glass-from-china" className="text-[#DAA745] no-underline hover:underline">
                    Proceso de importación en 5 etapas →
                  </a>
                </td>
              </tr>
              <tr className="border-b border-[#3A4250]/30">
                <td scope="row" className="py-3 px-3 text-[#F2F0ED]/90 align-top">
                  Tiene una orden de compra firmada y la fábrica está a punto de realizar el envío. Necesita comprender el embalaje en cajas, la carga del contenedor y el seguro.
                </td>
                <td className="py-3 px-3 align-top">
                  <a href="/blog/glass-shipping-container-loading-guide" className="text-[#DAA745] no-underline hover:underline">
                    Manual de carga de contenedores →
                  </a>
                </td>
              </tr>
              <tr>
                <td scope="row" className="py-3 px-3 text-[#F2F0ED]/90 align-top">
                  Se encuentra en una etapa anterior a todas las anteriores: tiene un proyecto y necesita decidir si el abastecimiento desde China es viable.
                </td>
                <td className="py-3 px-3 text-[#8B95A5] italic align-top">
                  Permanezca en esta página. Las secciones 2, 4 y 5 anteriores son el punto de partida correcto.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Los tres capítulos de análisis en profundidad están secuenciados de forma intencional. Si los lee en orden inverso a la etapa de su proyecto — verificación primero, luego la mecánica de importación, luego el envío en contenedor — cubrirá los riesgos en el mismo orden en que se presentan en su calendario.
        </p>

        <RelatedProductsCards slugs={["tempered-glass", "laminated-glass", "insulated-glass", "low-e-glass", "enameled-glass"]} heading="Products referenced across this cluster" />

        <FAQ items={FAQ_ITEMS} />

        <LeadMagnetCTA variant="footer" articleSlug={SLUG} />
      </BlogArticleLayout>
    </>;
}