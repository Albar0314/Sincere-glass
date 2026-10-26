import type { Metadata } from 'next';
import Script from 'next/script';
import { blogArticles, type BlogArticle } from '@/lib/blog-registry';
import BlogArticleLayout, { generateArticleMetadata, articleJsonLd } from "@/_i18n/es/components/blog/BlogArticleLayout";
import TLDRBox from "@/_i18n/es/components/blog/TLDRBox";
import FAQ from "@/_i18n/es/components/blog/blocks/FAQ";
import LeadMagnetCTA from "@/_i18n/es/components/blog/LeadMagnetCTA";
import RelatedProductsCards from "@/_i18n/es/components/blog/RelatedProductsCards";
import CostDisclaimer from "@/_i18n/es/components/blog/CostDisclaimer";
import { makeAlternates } from '@/lib/i18n';
import InterlayerCostCalculator from "@/_i18n/es/components/blog/article-17/InterlayerCostCalculator";
import PerformanceVsCostMatrix from "@/_i18n/es/components/blog/article-17/PerformanceVsCostMatrix";
import UseCaseMatcher from "@/_i18n/es/components/blog/article-17/UseCaseMatcher";
const SLUG = 'sgp-vs-pvb-interlayer-cost';
const article = blogArticles.find(a => a.slug === SLUG) as BlogArticle;
export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`, "es")
};
const toc = [{
  id: 'why-interlayer-cost',
  text: "Por qué la selección de la lámina intermedia representa entre el 15 y el 40 % del coste del vidrio laminado",
  level: 2
}, {
  id: 'material-economics',
  text: "La economía de materiales del PVB (polivinil butiral) frente al SGP (SentryGlas Plus)",
  level: 2
}, {
  id: 'cost-calculator',
  text: "Calcule la diferencia de coste de su lámina intermedia",
  level: 2
}, {
  id: 'sgp-uplift',
  text: "Qué aporta realmente el SGP (SentryGlas Plus) por su precio adicional",
  level: 2
}, {
  id: 'performance-matrix',
  text: "Rendimiento por unidad monetaria, comparación directa",
  level: 2
}, {
  id: 'scenarios',
  text: "Seis escenarios reales de especificación",
  level: 2
}, {
  id: 'matcher',
  text: "Adapte su proyecto a la lámina intermedia correcta",
  level: 2
}, {
  id: 'hidden-costs',
  text: "Costos ocultos que la mayoría de los compradores no detectan",
  level: 2
}, {
  id: 'lifecycle-roi',
  text: "Un marco de ROI por ciclo de vida",
  level: 2
}, {
  id: 'faq',
  text: 'FAQ',
  level: 2
}];
const faqItems = [{
  q: 'Can I mix PVB and SGP in the same project?',
  a: 'Yes, and we recommend it. On a typical commercial project the balustrade and overhead glass need SGP for structural and safety reasons, while facade IGU and interior partitions are better served by standard PVB on cost grounds. Our Wuhan line runs both daily, and consolidating the order under one supplier means matched glass tint across marks, consistent certification paperwork, and a single bill of lading.'
}, {
  q: 'What is the minimum order quantity for SGP laminated glass?',
  a: 'SGP material is often stock-limited and the autoclave cycle is longer, so our standard MOQ for SGP export orders is 200 m². Standard PVB laminated runs at 100 m² MOQ. Below those thresholds, interlayer material lead time or line-change-over cost makes the per-m² price step up noticeably.'
}, {
  q: 'How long does an SGP laminated order take vs PVB?',
  a: 'Standard PVB laminated ships 25-35 days from PO. SGP typically runs 35-45 days: SGP material lead time at the supplier (Kuraray or Trosifol) is 2-3 weeks longer, and the SGP autoclave cycle is approximately 30 percent longer than PVB. For time-critical orders we recommend placing the SGP material reservation at PO signing rather than at production start.'
}, {
  q: 'Does an SGP laminate need heat-soaked tempered glass?',
  a: 'For balustrade, overhead, and any safety-critical application, yes. Heat-soak (EN 14179) does not change the SGP decision but is non-negotiable for the glass itself in those applications. Spontaneous NiS failure in a bonded SGP laminate takes a structural panel out of service with no warning, and the ~15 percent heat-soak cost premium eliminates that risk.'
}, {
  q: 'What is the typical US HTSUS duty rate on SGP vs PVB laminated glass?',
  a: 'Both PVB and SGP laminated architectural glass classify under HTSUS 7007.29 (laminated safety glass, other). The MFN duty rate is 4.9 percent at the time of writing. The interlayer type does not change the HTS classification. Always verify the current rate at hts.usitc.gov before building a landed-cost estimate.'
}, {
  q: 'Can SGP be reworked or recycled like PVB?',
  a: 'No. Standard PVB laminates can be de-laminated and the glass recycled with established industrial processes. SGP ionoplast forms a near-permanent chemical bond with the glass surface; a cracked SGP laminate goes to landfill or construction aggregate rather than back into the float-glass stream. This matters for projects with embodied-carbon or circular-economy specifications — raise it with your sustainability consultant early.'
}];
export default function Page() {
  if (!article) return null;
  return <>
      <Script id="article-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(articleJsonLd(article, faqItems))
    }} />

      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox takeaways={article.tldr || []} />

        <h2 id="why-interlayer-cost">
          Por qué la selección de lámina intermedia representa entre el 15 y el 40 por ciento del costo del vidrio laminado
        </h2>
        <p>
          En una hoja de cotización, el vidrio laminado aparece como una sola línea. En nuestra fábrica de Wuhan son tres líneas ensambladas: dos hojas de vidrio templado y la lámina intermedia entre ellas. En un laminado transparente 6-0,76-6, las dos hojas de vidrio representan aproximadamente el 85 por ciento del costo FOB, y la lámina intermedia estándar de PVB (polivinil butiral) cubre el 15 por ciento restante. Si se sustituye esa lámina intermedia por un ionoplasto SGP (SentryGlas Plus) de 1,52 mm, la participación de la lámina intermedia sube a cerca del 35-40 por ciento del laminado terminado. El vidrio no ha cambiado; la economía sí.
        </p>
        <p>
          Esa es la razón práctica por la que los compradores se perjudican con las decisiones de lámina intermedia. Una especificación que menciona sin mayor análisis "lámina intermedia SGP (SentryGlas Plus)" en una fachada donde el PVB (polivinil butiral) estándar cumpliría todos los requisitos de desempeño puede añadir entre un 20 y un 35 por ciento al presupuesto de vidrio sin ningún beneficio para el proyecto. Lo contrario —especificar PVB (polivinil butiral) estándar en una barandilla de vidrio sin marco o en un vidrio horizontal de gran luz— puede ahorrar un 20 por ciento en el momento y costar diez veces más en trabajos correctivos al tercer año. La elección de la lámina intermedia es pequeña en el papel y grande en la factura.
        </p>
        <p>
          Este artículo describe la cadena de decisión orientada al costo que seguimos con nuestros compradores de exportación. Comenzamos con la economía de la materia prima, luego incorporamos el desempeño real que ofrece cada tipo y, finalmente, asignamos cada tipo de proyecto a la opción correcta. Si prefiere conocer primero el proceso de fabricación, lea{' '}
          <a href="/blog/how-is-laminated-glass-made">
            Cómo se fabrica el vidrio laminado
          </a>{' '}
          antes de continuar aquí.
        </p>

        <h2 id="material-economics">
          La economía de materiales del PVB (polivinil butiral) frente al SGP (SentryGlas Plus)
        </h2>
        <p>
          El PVB (polivinil butiral) ha sido la lámina intermedia arquitectónica dominante desde la década de 1960. Los tres principales proveedores mundiales —Eastman (Saflex), Kuraray (Trosifol) y EVERLAM— lo producen en volúmenes anuales de varios miles de toneladas. El PVB (polivinil butiral) estándar de 0,76 mm tiene actualmente un costo de lámina intermedia FOB China de aproximadamente USD 3 por m² de laminado; el PVB (polivinil butiral) acústico —una estructura tricapa con núcleo más blando— ronda los USD 5 por m². El precio varía con el índice de resina, no con el proyecto.
        </p>
        <p>
          El SGP (SentryGlas Plus), actualmente una línea de productos de Kuraray, pertenece a una familia de polímeros distinta: un ionoplasto en lugar de un vinilo. Su química le confiere un módulo de corte 100 veces superior al del PVB (polivinil butiral) bajo carga sostenida de 24 horas, además de una adhesión química casi permanente al vidrio. La contrapartida es el costo —alrededor de USD 13 por m² de laminado a 1,52 mm, aproximadamente 4 veces el PVB (polivinil butiral) estándar— y la disponibilidad. El SGP (SentryGlas Plus) se produce en volúmenes mucho menores que el PVB (polivinil butiral); los plazos de entrega a nuestra línea de Wuhan pueden extenderse hasta 3 semanas en espesores poco comunes, y el ciclo en autoclave tarda aproximadamente un 30 por ciento más.
        </p>
        <p>
          Una referencia rápida: solo la lámina intermedia cuesta USD 3 con PVB (polivinil butiral), USD 5 con PVB (polivinil butiral) acústico y USD 13 con SGP (SentryGlas Plus) por m². Esos tres números aportan más información que cualquier ficha técnica.
        </p>

        <section aria-labelledby="material-cost-ref" className="my-8">
          <h3 id="material-cost-ref" className="sr-only">
            Referencia de costos de materiales
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Referencia de costos de lámina intermedia y laminado terminado">
              <caption className="text-xs text-[#8B95A5] italic text-left mb-3">
                Referencia de costos de materiales — FOB China 2026, datos verificados: 2026-10-21.{' '}
                <a href="https://www.kuraray.com/products/sentryglas" rel="nofollow noopener" target="_blank">
                  Kuraray SentryGlas
                </a>
                ,{' '}
                <a href="https://www.saflex.com/" rel="nofollow noopener" target="_blank">
                  Eastman Saflex
                </a>
                . Laminado terminado indicativo, excluye flete.
              </caption>
              <thead>
                <tr className="border-b border-[#3A4250]/40">
                  <th scope="col" className="text-left py-2 pr-4">
                    Build-up
                  </th>
                  <th scope="col" className="text-right py-2 pr-4">
                    Vidrio (2 hojas)
                  </th>
                  <th scope="col" className="text-right py-2 pr-4">
                    PVB
                  </th>
                  <th scope="col" className="text-right py-2 pr-4">
                    PVB (polivinil butiral) acústico
                  </th>
                  <th scope="col" className="text-right py-2">
                    SGP
                  </th>
                </tr>
              </thead>
              <tbody className="font-mono">
                <tr className="border-b border-[#3A4250]/20">
                  <th scope="row" className="text-left py-2 pr-4 font-normal">
                    6+6 mm
                  </th>
                  <td className="text-right py-2 pr-4">$22</td>
                  <td className="text-right py-2 pr-4">$25</td>
                  <td className="text-right py-2 pr-4">$27</td>
                  <td className="text-right py-2">$35</td>
                </tr>
                <tr className="border-b border-[#3A4250]/20">
                  <th scope="row" className="text-left py-2 pr-4 font-normal">
                    8+8 mm
                  </th>
                  <td className="text-right py-2 pr-4">$30</td>
                  <td className="text-right py-2 pr-4">$33</td>
                  <td className="text-right py-2 pr-4">$35</td>
                  <td className="text-right py-2">$43</td>
                </tr>
                <tr className="border-b border-[#3A4250]/20">
                  <th scope="row" className="text-left py-2 pr-4 font-normal">
                    10+10 mm
                  </th>
                  <td className="text-right py-2 pr-4">$40</td>
                  <td className="text-right py-2 pr-4">$43</td>
                  <td className="text-right py-2 pr-4">$45</td>
                  <td className="text-right py-2">$53</td>
                </tr>
                <tr>
                  <th scope="row" className="text-left py-2 pr-4 font-normal">
                    12+12 mm
                  </th>
                  <td className="text-right py-2 pr-4">$52</td>
                  <td className="text-right py-2 pr-4">$55</td>
                  <td className="text-right py-2 pr-4">$57</td>
                  <td className="text-right py-2">$65</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <h2 id="cost-calculator">Calcule la diferencia de coste de su lámina intermedia</h2>
        <p>
          La calculadora a continuación se basa en un modelo simple con tres variables: la composición del vidrio (dos hojas simétricas), el tipo de lámina intermedia y el área del pedido en metros cuadrados. Multiplica por dos el índice FOB de vidrio por m², añade el índice FOB de lámina intermedia por m² según el tipo seleccionado, y compara ese valor con una línea base de PVB (polivinil butiral) estándar para la misma composición. El resultado muestra tanto el subtotal por m² como la prima o el ahorro en dólares sobre el pedido completo. Es una estimación de planificación, no una cotización; los precios contractuales reales dependen del tamaño del panel, el volumen del pedido, los detalles de especificación y los mercados actuales de vidrio flotado y láminas intermedias.
        </p>

        <InterlayerCostCalculator />

        <CostDisclaimer />

        <h2 id="sgp-uplift">
          Qué aporta realmente el SGP (SentryGlas Plus) por su precio adicional
        </h2>
        <p>
          La pregunta que recibimos con más frecuencia es: ¿por qué alguien pagaría 4 veces el costo de la lámina intermedia? La respuesta corta son tres características que el PVB (polivinil butiral) no puede ofrecer a ningún espesor.
        </p>
        <p>
          <strong>Acción compuesta bajo carga prolongada.</strong> A 24 horas de carga y temperatura ambiente, el PVB (polivinil butiral) tiene un módulo de corte de aproximadamente 0,6 MPa —suficientemente blando como para que las dos hojas de vidrio se comporten casi de forma independiente. El SGP (SentryGlas Plus) se sitúa entre 65 y 100 MPa, casi dos órdenes de magnitud más rígido, y el laminado actúa como una placa compuesta única. Para un espesor dado, esa acción compuesta puede reducir a la mitad la deflexión de un nervio de vidrio estructural, una marquesina o una barandilla de vidrio sin marco. El método de análisis se detalla en{' '}
          <a href="https://www.astm.org/e1300-16.html" rel="nofollow noopener" target="_blank">
            ASTM E1300
          </a>
          su enfoque de espesor efectivo.
        </p>
        <p>
          <strong>Retención tras rotura.</strong> Cuando ambas hojas de un laminado de PVB (polivinil butiral) se fracturan, el PVB (polivinil butiral) se estira y el panel cede visiblemente en cuestión de minutos —los fragmentos permanecen en su lugar, pero el panel queda estructuralmente inutilizado. El SGP (SentryGlas Plus), unido químicamente a la superficie del vidrio, mantiene un panel fracturado en posición rígida durante horas. En nuestras pruebas de banco en la fábrica de Wuhan, un panel de barandilla de vidrio SGP (SentryGlas Plus) de 10-1,52-10, fracturado en ambas hojas con una prueba de impacto central, permaneció en voladizo dentro de su zapata de base durante toda la inspección —más de 4 horas. El mismo panel en PVB (polivinil butiral) había cedido visiblemente antes de que termináramos de tomar las fotos.
        </p>
        <p>
          <strong>Durabilidad en el canto.</strong> El PVB (polivinil butiral) es higroscópico — absorbe humedad — y en un canto expuesto en un clima húmedo o costero se opacará y luego se delaminará en un plazo de 3 a 7 años. El SGP (SentryGlas Plus) es hidrófobo. Los detalles de canto abierto con SGP llevan entre 15 y 20 años en servicio en la zona tropical de Asia sin degradación visible en el canto. Si la especificación incluye cantos expuestos o el clima es húmedo, el SGP con frecuencia no es una mejora de prestaciones — es la única opción que sobrevivirá el período de garantía.
        </p>
        <p>
          Lo que el SGP (SentryGlas Plus) no hace: no es una mejora acústica. El PVB (polivinil butiral) estándar supera al SGP en la misma composición en cuanto a la STC (Clase de Transmisión Sonora); el PVB acústico supera a ambos. Si el requisito principal es el control del ruido, el SGP es la herramienta equivocada.
        </p>

        <h2 id="performance-matrix">
          Rendimiento por unidad monetaria, comparación directa
        </h2>
        <p>
          Cinco parámetros determinan la mayoría de las especificaciones de lámina intermedia en la práctica: retención tras rotura, módulo de cortante a largo plazo, resistencia del canto a la intemperie, STC (Clase de Transmisión Sonora) de referencia para una composición 6+6, y el coste propio del material de la lámina intermedia. La tabla a continuación compara los cinco parámetros entre los tres tipos de lámina intermedia, utilizando valores orientativos de nuestra línea en Wuhan y las fichas técnicas publicadas por los proveedores. El SGP (SentryGlas Plus) gana de forma decisiva en retención, rigidez y durabilidad del canto. El PVB (polivinil butiral) estándar gana en coste. El PVB acústico gana en STC. Ninguna lámina intermedia gana en todo — por eso existe este artículo.
        </p>

        <PerformanceVsCostMatrix />

        <h2 id="scenarios">Seis escenarios reales de especificación</h2>
        <p>
          Las ventajas y desventajas abstractas se comprenden mejor con proyectos concretos. A continuación, seis escenarios de los últimos dos años de nuestro trabajo de exportación, con la lámina intermedia que especificamos y el motivo.
        </p>
        <ol>
          <li>
            <strong>Fachada de torre de oficinas, edificio comercial de 6 a 12 plantas.</strong>{' '}
            Hoja exterior de vidrio laminado con PVB (polivinil butiral) estándar en UVA (Unidad de Vidrio Aislante) de baja emisividad (Low-E). Motivo principal: acristalamiento de seguridad sin requisito de prestaciones estructurales ni acústicas. El SGP (SentryGlas Plus) añadiría aproximadamente un 25 por ciento al presupuesto del vidrio de fachada sin ningún beneficio medible para el proyecto.
          </li>
          <li>
            <strong>Barandilla de vidrio sin marco en entreplanta, edificio de uso público.</strong>{' '}
            SGP (SentryGlas Plus) laminado 10-1,52-10, sometido a ensayo de choque térmico. Motivos principales: caso de carga en voladizo más impacto de Clase 1(B)1 según EN 12600 más detalle de canto superior abierto más requisito de garantía de 15 años. El PVB (polivinil butiral) estándar no cumpliría ninguno de estos requisitos. Consulte{' '}
            <a href="/blog/balustrade-glass-specification">
              nuestra guía de especificación de barandillas de vidrio
            </a>{' '}
            para el cálculo completo de los casos de carga.
          </li>
          <li>
            <strong>Marquesina de vidrio en voladizo, luz de 2,4 m.</strong> SGP (SentryGlas Plus) 8-1,52-8, sometido a ensayo de choque térmico. Motivos principales: la seguridad en posición cenital exige que ambas hojas permanezcan completamente retenidas tras la rotura, y la luz es demasiado grande para que el PVB (polivinil butiral) actúe de forma compuesta bajo carga de nieve. El SGP es la solución estándar para vidrio estructural en posición cenital en todos los códigos con los que trabajamos.
          </li>
          <li>
            <strong>Partición de oficina en edificio próximo a aeropuerto.</strong> PVB (polivinil butiral) acústico 6-0,76-6. Motivo principal: el objetivo de STC 40 determinó la elección. El PVB estándar alcanzó un máximo de STC 36 en la prueba de maqueta; el SGP (SentryGlas Plus) obtuvo 35 y no superó el requisito; el PVB acústico entregó 39-40 en la composición de vidrio específica. Selección basada exclusivamente en criterios acústicos; la diferencia de coste fue secundaria.
          </li>
          <li>
            <strong>Mampara de ducha sin marco para villa costera.</strong>{' '}
            Vidrio templado monolítico de 10 mm, sin laminado. Razón principal: el detalle de borde sellado con juntas eliminó el problema de humedad, y un vidrio templado de una sola hoja cumple con las especificaciones de espesor y seguridad. Este es un caso en el que ni el PVB (polivinil butiral) ni el SGP (SentryGlas Plus) son la solución — un recordatorio de que no todo proyecto requiere un laminado. Ver{' '}
            <a href="/blog/shower-glass-thickness-guide">
              nuestra guía de espesores para vidrio de ducha
            </a>{' '}
            para el árbol de decisión completo.
          </li>
          <li>
            <strong>Vitrina de museo para exhibición de alto valor.</strong>{' '}
            Vidrio laminado SGP (SentryGlas Plus) 12-1.52-12, vidrio bajo en hierro. Razones principales: el curador exigió una garantía de 20 años contra la delaminación y la especificación requería aletas de vidrio estructural que soportaran paneles transversales en juntas de borde abierto. El PVB (polivinil butiral) estándar no habría cumplido con el requisito de garantía ni con el detalle de borde abierto.
          </li>
        </ol>

        <h2 id="matcher">Adapte su proyecto a la lámina intermedia correcta</h2>
        <p>
          El selector que se presenta a continuación toma esos seis escenarios y los generaliza en un flujo de preguntas ponderadas. Cada una de las seis preguntas — tipo de aplicación, luz del panel, caso de carga, exposición prolongada del borde, objetivo acústico y período de garantía — aporta puntos a la puntuación de cada lámina intermedia. El selector no permite que ninguna pregunta individual sea determinante; la recomendación final corresponde a la lámina intermedia con mayor puntuación en el conjunto de las seis respuestas. Si desea cuestionar el resultado, modifique una respuesta a la vez y observe cómo se desplaza la banda de puntuación.
        </p>

        <UseCaseMatcher />

        <h2 id="hidden-costs">Costos ocultos que la mayoría de los compradores no detectan</h2>
        <p>
          La línea de lámina intermedia en una cotización es la parte visible del costo. Hay tres partidas que raramente aparecen en la cotización y que tienen igual importancia:
        </p>
        <p>
          <strong>Sellado de bordes.</strong> Un laminado de PVB (polivinil butiral) en un borde expuesto en un ambiente húmedo generalmente requiere un sellado de borde con silicona estructural para retrasar la delaminación — agregue aproximadamente USD 2 a 4 por metro lineal de borde, más la mano de obra para su aplicación en obra, más el régimen de inspección. Un laminado de SGP (SentryGlas Plus) en el mismo borde no requiere sellante. En un proyecto con 300 metros lineales de vidrio de borde expuesto, esa es una partida de USD 600 a 1.200 que desaparece silenciosamente en el escenario con SGP. Inclúyala en la comparación o subestimará el costo del PVB.
        </p>
        <p>
          <strong>Riesgo de delaminación y gestión de garantías.</strong> Hemos reemplazado paneles de barandilla de vidrio de PVB (polivinil butiral) con borde abierto entre el año 4 y 6 de servicio en tres proyectos. El vidrio de reposición representa una fracción menor del costo total — desmontaje, reemplazo, andamiaje, tiempo de inactividad y honorarios de consultoría suelen oscilar entre 3 y 5 veces el valor del vidrio en sí. Considerar una probabilidad razonable de reemplazo anticipado del PVB en un detalle de borde abierto en ambiente húmedo generalmente inclina el costo de ciclo de vida hacia el SGP.
        </p>
        <p>
          <strong>Reducción de espesor en configuraciones de menor grosor.</strong> La acción compuesta del SGP (SentryGlas Plus) frecuentemente permite especificar un laminado de menor espesor para el mismo límite de deflexión. Una barandilla de vidrio PVB 10-1.52-10 puede necesitar pasar a 12-1.52-12 para cumplir con el límite de deflexión; el mismo panel en SGP puede mantenerse en 10-1.52-10 y aun así cumplir. El panel SGP de menor espesor pesa menos, tiene menor costo de envío y en ocasiones permite herrajes más esbeltos. Incorpore este efecto en su comparación cuando el vidrio esté sometido a carga estructural, no solo como vidrio de seguridad.
        </p>

        <h2 id="lifecycle-roi">Un marco de ROI por ciclo de vida</h2>
        <p>
          Una comparación de costos objetiva considera el año 0 (compra e instalación), el año 5 (primer problema probable de borde en PVB en un detalle húmedo) y el año 15 (horizonte de garantía del SGP). En un proyecto de barandilla sin marco con bordes expuestos, el análisis de costos a diez años que nuestros compradores de exportación suelen obtener es:
        </p>
        <ul>
          <li>
            Vidrio laminado con PVB año 0: menor coste inicial. Año 5: probable deslaminación de bordes en una fracción de los paneles; el coste de reparación suele equivaler al 30-50 por ciento del presupuesto original de vidrio. Año 10: sustitución completa del acristalamiento cada vez más probable.
          </li>
          <li>
            Vidrio laminado con SGP año 0: prima de coste del 20-30 por ciento en la partida de vidrio, compensada en parte por un menor espesor de conjunto y la eliminación del sellante de bordes. Año 5: sin problemas en los bordes. Año 10: sin problemas en los bordes, dentro del horizonte de garantía.
          </li>
        </ul>
        <p>
          El criterio que aplicamos con nuestros clientes es sencillo: si la aplicación es estructural o crítica para la seguridad, o si el borde queda expuesto o el clima es húmedo, o si la garantía es de 10 años o más, el SGP casi siempre resulta ganador en coste de ciclo de vida, aunque el PVB sea más económico en el día 0. En los demás casos —UVA (Unidad de Vidrio Aislante) en fachadas con marco, particiones interiores, acristalamiento de seguridad en interiores secos— el PVB estándar es la opción correcta. La zona gris es el proyecto con vano de 1,5 a 2,5 m, carga media y exposición moderada; es exactamente ahí donde la herramienta de selección anterior justifica su valor.
        </p>

        <LeadMagnetCTA variant="inline" articleSlug={SLUG} title="Gratis: Comparativa Global de Códigos de Construcción para Vidrio Arquitectónico" description="PDF de 11 páginas en formato comparativo que cubre los requisitos para vidrio laminado según IBC (Código Internacional de Construcción) de EE. UU., normas europeas EN, GB de China y AS de Australia, para todas las aplicaciones habituales. Descarga gratuita para arquitectos, prescriptores y equipos de compras." />

        <p className="text-sm text-[#8B95A5] mt-6">
          Para una visión global de cómo esta decisión a nivel de producto encaja en una especificación completa de vidrio arquitectónico, consulte nuestra <a href="/blog/architectural-glass-specification-guide" className="text-[#DAA745] hover:underline">guía de especificación de vidrio arquitectónico</a>.
        </p>

        <FAQ items={faqItems} />

        <RelatedProductsCards slugs={article.relatedProductSlugs || ['laminated-glass', 'tempered-glass', 'insulated-glass']} />
      </BlogArticleLayout>
    </>;
}