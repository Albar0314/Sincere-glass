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
import ThicknessPerformanceComparator from "@/_i18n/es/components/blog/article-16/ThicknessPerformanceComparator";
import MaxPanelSizeCalculator from "@/_i18n/es/components/blog/article-16/MaxPanelSizeCalculator";
import CostFactorBreakdown from "@/_i18n/es/components/blog/article-16/CostFactorBreakdown";
const SLUG = '12mm-tempered-glass-specifications';
const article = blogArticles.find(a => a.slug === SLUG) as BlogArticle;
const toc = [{
  id: 'why-12mm',
  text: "Por qué 12 mm es el espesor óptimo de especificación",
  level: 2
}, {
  id: 'performance-envelope',
  text: "El rango de prestaciones del 12 mm",
  level: 2
}, {
  id: 'max-panel-size',
  text: "Tamaño máximo de panel a 12 mm",
  level: 2
}, {
  id: 'tolerance-quality',
  text: "Tolerancia de espesor y calidad superficial",
  level: 2
}, {
  id: 'thermal-acoustic',
  text: "Rendimiento térmico y acústico",
  level: 2
}, {
  id: 'applications',
  text: "Dónde se especifica el 12 mm",
  level: 2
}, {
  id: 'processing',
  text: "Cantos, taladros y recortes",
  level: 2
}, {
  id: 'certifications',
  text: "Certificaciones para vidrio templado de 12 mm",
  level: 2
}, {
  id: 'cost-drivers',
  text: "Factores de coste en pedidos de 12 mm",
  level: 2
}, {
  id: 'thinner-or-thicker',
  text: "Cuándo optar por un espesor menor o mayor",
  level: 2
}, {
  id: 'faq',
  text: "Preguntas frecuentes del comprador",
  level: 2
}];
const faqItems = [{
  q: "What is the MOQ for 12mm tempered glass export orders from Sincere Glass?",
  a: "Our standard MOQ for export is one 20-foot container, which fits approximately 18 to 22 tonnes of 12mm tempered depending on panel sizes and crating. Mixed-thickness orders are accepted. For projects under one container, we can quote LCL (less-than-container) consolidation to common ocean hubs."
}, {
  q: "What is the lead time for a 12mm tempered order from your Wuhan factory?",
  a: "Standard production cycle for 12mm tempered is 10 to 15 working days from order confirmation and deposit, assuming raw float is in stock (which it typically is for 12mm clear). Add 3 to 5 days for polished edges, 2 to 4 days for holes or cutouts, and 7 to 10 days for inland transport and port handling before loading. A single-container order to Shanghai or Ningbo port is usually ready to sail within 25 to 30 days of PO."
}, {
  q: "Can you temper 12mm with custom shapes or holes?",
  a: "Yes, within tempering constraints. CNC-cut shapes, countersunk holes, notches, and cutouts are all processed before the tempering cycle. Tempered glass cannot be modified after the quench. Per GB 15763.2 §5.5, edge-to-hole distance must be at least 2x the glass thickness (24 mm minimum for 12mm), and hole-to-hole spacing must also be at least 2x thickness. We confirm feasibility against shop drawings before cutting."
}, {
  q: "What certifications come with a 12mm tempered export shipment?",
  a: "Every shipment is accompanied by a certificate of conformity to GB 15763.2-2005 (Chinese safety glazing standard) and a copy of our China 3C (CCC) certificate. On request, we provide fragment-count test photos per sampled lot, surface compressive stress readings, SGS or BV third-party inspection reports (buyer-paid), and CE marking documentation to EN 12150-2 when the destination requires it. ANSI Z97.1 and CPSC 16 CFR 1201 certification can be arranged with additional lead time."
}, {
  q: "How does Sincere Glass price 12mm tempered: per square meter or per piece?",
  a: "We quote per square meter for the glass itself, with surcharges itemized by edge treatment, holes, CNC shapes, and packaging class. Every quotation includes an itemized breakdown so you can see what each option adds. Volume breaks apply at full-container, two-container, and project-scale orders. Request a quotation through our contact form and we return it within one working day."
}];
export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates('/blog/' + SLUG, "es")
};
export default function Page() {
  const schemas = articleJsonLd(article, faqItems);
  return <>
      {schemas.map((s, i) => <Script key={i} id={`article-jsonld-${i}`} type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{
      __html: JSON.stringify(s)
    }} />)}

      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox takeaways={["12mm is the specification sweet spot where strength, deflection control, and jumbo panel capability intersect: the default choice for 1.1 m balustrades, long-span canopies, and large-area storefronts.", "At our Wuhan facility we temper 12mm up to 3,000 x 15,000 mm, among the largest single-pane envelopes in Hubei province.", "GB 15763.2-2005 requires a minimum surface compressive stress of 90 MPa. A compliant 12mm tempered panel fragments into roughly 60 to 100 pieces in a 50 x 50 mm square.", "Cost factors beyond the glass itself: edge polishing adds roughly 18%, 5+ holes add 15%, CNC shapes add 12%, and plain rectangles with ground edges are the baseline.", "Common buyer mistake: specifying 12mm by habit when 10mm tempered-laminated (10.76 or 11.52 mm overall) would be safer and lighter for overhead and balustrade applications."]} />

        <p>
          El vidrio templado de doce milímetros es el espesor por defecto en más planos de barandilla de vidrio, escaparate y marquesina que cualquier otro espesor individual. No porque sea el vidrio más resistente que fabricamos, sino porque se sitúa en una intersección precisa de capacidad estructural, rango de tamaño de panel y coste difícil de superar para obras arquitectónicas de carga media. Esta guía reúne, desde nuestra línea de producción en Wuhan, lo que los compradores necesitan decidir y especificar cuando optan por 12 mm: los límites de tamaño de panel en función del tipo de apoyo del vidrio, los indicadores de tolerancia y calidad que distinguen un 12 mm conforme a normativa de uno que roza el límite, y los factores de coste que pueden desplazar una cotización entre un 30 y un 50 % antes de que haya cambiado el precio del vidrio en bruto.
        </p>

        <h2 id="why-12mm">Por qué 12 mm es el espesor óptimo de especificación</h2>
        <p>
          El espesor en vidrio arquitectónico no es una variable continua. Es una función escalonada regida por la producción estándar de vidrio flotado (3, 4, 5, 6, 8, 10, 12, 15, 19 mm) y por los límites de vano que cada espesor permite cubrir. En nuestra instalación de 20.000 m² en Wuhan, el 12 mm es donde convergen simultáneamente tres umbrales: supera los <a href="https://www.glass.org/" target="_blank" rel="nofollow noopener" className="text-[#DAA745] hover:underline">National Glass Association (NGA)</a> y los mínimos estructurales de GB 15763.2 para barandillas de vidrio autoportantes de 1.100 mm bajo condiciones típicas de carga de relleno, mantiene una deflexión aceptable en vanos de escaparate de hasta unos 3 m sin necesidad de laminado, y mantiene el peso del panel en 30 kg/m² — pesado, pero todavía al alcance de un equipo de instalación de dos personas sin equipos de elevación.
        </p>
        <p>
          Por debajo de 12 mm el rango estructural se estrecha rápidamente. El 10 mm{' '}
          <a href="/products/tempered-glass" className="text-[#DAA745] hover:underline">vidrio templado</a> maneja barandillas de vidrio más pequeñas y escaparates estándar, pero requiere asistencia (laminado, láminas intermedias o refuerzo adicional) cuando los paneles superan aproximadamente 2,4 m de vano libre. Por encima de 12 mm, el vidrio soporta más carga, pero duplica el coste de manipulación, requiere aproximadamente un 25 % más de energía por ciclo de templado y se envía con menos paneles por contenedor. Los 12 mm merecen su condición de elección predeterminada por cubrir el rango más amplio de especificaciones arquitectónicas habituales antes de que se activen estas penalizaciones de coste o logística.
        </p>

        <h2 id="performance-envelope">El rango de prestaciones del 12 mm</h2>
        <p>
          El vidrio templado se especifica por la tensión de compresión superficial fijada durante el enfriamiento rápido, una medida de la energía almacenada en la capa superficial que resiste la tracción. GB 15763.2-2005 §5.2.1 exige un mínimo de 90 MPa para vidrio templado arquitectónico. Nuestro ciclo estándar de 12 mm proporciona entre 95 y 110 MPa, verificado con un refractómetro diferencial de superficie sobre paneles muestreados. Ese nivel de tensión es el que confiere al vidrio templado de 12 mm una carga de rotura de aproximadamente 36 kN/m² (unas 4 a 5 veces la del vidrio recocido del mismo espesor) y el que produce el patrón de fragmentación en pequeños cuboides característico cuando el panel rompe.
        </p>
        <p>
          El peso a 12 mm es de 30 kg/m² (la densidad del vidrio flotado es de 2.500 kg/m³). Esto importa más de lo que la mayoría de las fichas técnicas sugieren: un panel de 12 mm de 2 × 3 m pesa 180 kg, que es el límite práctico para una instalación entre dos personas sin elevador de ventosa. Los proyectos con paneles de mayor superficie en 12 mm deben prever en obra equipos de izado con ventosas, lo que incide tanto en el presupuesto del instalador como el propio coste del vidrio.
        </p>

        <p>
          <strong>Cómo funciona el comparador:</strong> el componente siguiente permite recorrer cinco métricas — carga de rotura, área máxima de panel, peso por metro cuadrado, índice de coste relativo y STC (Clase de Transmisión Sonora) acústico — en seis espesores estándar de vidrio templado (6, 8, 10, 12, 15 y 19 mm). Cada barra escala al valor máximo de la métrica activa. Al hacer clic en un espesor se fija su fila, y la tarjeta de detalle muestra el valor exacto y el uso arquitectónico típico para ese espesor. Los valores son orientativos y se basan en la física de GB 15763.2 (densidad 2.500 kg/m³, tensión superficial mínima de 90 MPa) y en apoyo horizontal de 4 bordes sin carga de viento para el área máxima. Los límites reales de cada proyecto dependen de la condición de apoyo específica y del caso de carga.
        </p>

        <ThicknessPerformanceComparator />

        <h2 id="max-panel-size">Tamaño máximo de panel a 12 mm</h2>
        <p>
          La envolvente de nuestro horno de templado es de 3.000 × 15.000 mm, una de las más grandes de la provincia de Hubei, y en el área de laminado se complementa con un autoclave de 3 × 15 m para proyectos que combinan templado de grandes formatos con laminado de seguridad. No obstante, lo que permite la envolvente física y lo que un proyecto concreto debe especificar son valores distintos. Los límites de tamaño de panel para vidrio templado de 12 mm dependen de tres factores: el modo de apoyo del vidrio en los bordes, la clase de carga de viento de la instalación y el límite de deflexión admisible (típicamente vano/60 para relleno de hoja, vano/175 para vidrio en muro cortina con apoyo en borde, según GB 50113 y EN 13830).
        </p>

        <p>
          <strong>Cómo funciona la calculadora:</strong> el componente siguiente mantiene el espesor en 12 mm y acepta dos entradas: la condición de apoyo (enmarcado en 4 bordes, fijación en 2 bordes o fijación puntual mediante arañas) y la clase de carga de viento (baja, por debajo de 1,0 kPa; media, de 1,0 a 2,5 kPa; alta, por encima de 2,5 kPa, típica de instalaciones en costa y en altura). Devuelve el ancho máximo, la altura máxima y el área de panel orientativos para esa combinación, indica si el resultado se mantiene dentro de nuestra envolvente de producción de 3.000 × 15.000 mm, y muestra una nota breve sobre el modo de fallo determinante (deflexión, distancia borde-taladro o rotación en las fijaciones). Los valores siguen GB 15763.2-2005 §5 y los principios de{' '}
          <a href="https://www.astm.org/e1300-16.html" target="_blank" rel="nofollow noopener" className="text-[#DAA745] hover:underline">
            ASTM E1300
          </a>{' '}
          . Un ingeniero estructural debe verificar igualmente los límites específicos de viento, apoyo y deflexión de su proyecto.
        </p>

        <MaxPanelSizeCalculator />

        <h2 id="tolerance-quality">Tolerancia de espesor y calidad superficial</h2>
        <p>
          "12 mm" de una fábrica reconocida no son exactamente 12 mm. Son 12 mm dentro de una banda de tolerancia definida. GB 15763.2 hereda la tolerancia de espesor de GB 11614 (vidrio flotado), que permite ±0,3 mm para espesores nominales de 10 a 12 mm y ±0,5 mm para espesores de 15 a 19 mm. EN 572-2 es más estricta, con ±0,2 mm para vidrio flotado de 12 mm. Si especifica para un galce de acristalamiento ajustado, confirme qué norma referencia la cotización. Nuestros envíos de exportación aplican por defecto la tolerancia EN para destinos europeos y de Oriente Medio, y la tolerancia GB para proyectos en los que rige el código chino nacional.
        </p>

        <div className="overflow-x-auto my-6">
          <table aria-label="Tolerancia de espesor para vidrio templado nominal de 12 mm según tres normas principales" className="w-full text-sm">
            <caption className="text-xs text-[#8B95A5] mb-2 text-left caption-top">
              Comparativa de tolerancia de espesor para vidrio templado nominal de 12 mm según normas GB, EN y ASTM — Datos verificados: 2026-10-20
            </caption>
            <thead>
              <tr className="border-b border-[#3A4250]/40">
                <th scope="col" className="text-left text-[#DAA745] text-xs uppercase tracking-wider py-2 pr-4">Standard</th>
                <th scope="col" className="text-left text-[#DAA745] text-xs uppercase tracking-wider py-2 pr-4">Tolerance</th>
                <th scope="col" className="text-left text-[#DAA745] text-xs uppercase tracking-wider py-2">Referencia de cláusula</th>
              </tr>
            </thead>
            <tbody className="text-[#8B95A5]">
              <tr className="border-b border-[#3A4250]/20">
                <th scope="row" className="text-left font-normal py-2 pr-4 text-[#F2F0ED]">
                  GB 11614-2009 (vidrio flotado de China, heredada por GB 15763.2)
                </th>
                <td className="py-2 pr-4">más/menos 0,3 mm</td>
                <td className="py-2">GB 11614 §4.2 Tabla 2</td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <th scope="row" className="text-left font-normal py-2 pr-4 text-[#F2F0ED]">
                  EN 572-2:2012 (vidrio flotado europeo)
                </th>
                <td className="py-2 pr-4">más/menos 0,2 mm</td>
                <td className="py-2">EN 572-2 §5.2 Tabla 2</td>
              </tr>
              <tr>
                <th scope="row" className="text-left font-normal py-2 pr-4 text-[#F2F0ED]">
                  ASTM C1036-21 (vidrio plano estadounidense)
                </th>
                <td className="py-2 pr-4">más/menos 0,4 mm (Clase 1)</td>
                <td className="py-2">ASTM C1036 §4.2 Tabla 4</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          La calidad superficial del vidrio templado se rige por las mismas normas de inspección visual que el vidrio flotado: GB 11614 §5 para China, EN 572-8 para Europa. Los dos defectos que encontramos con mayor frecuencia en envíos de 12 mm inspeccionados antes del embarque son la distorsión por onda de rodillo (una ondulación óptica causada por los rodillos del horno de templado, más pronunciada en espesores mayores) y las inclusiones de sulfuro de níquel en el canto. En nuestra fábrica de 20.000 m² en Wuhan, aceptamos una amplitud pico a valle de onda de rodillo dentro de 0,1 mm conforme a EN 12150-2 §5.2, y sometemos al ensayo de choque térmico el vidrio de 12 mm destinado a instalaciones estructurales sin marco (marquesinas en altura, barandillas de vidrio, fijación puntual) para provocar el fallo en fábrica de los paneles con inclusiones de NiS antes de que lleguen a obra.
        </p>

        <h2 id="thermal-acoustic">Rendimiento térmico y acústico</h2>
        <p>
          El vidrio templado monolítico de 12 mm tiene esencialmente el mismo comportamiento térmico y acústico que el vidrio recocido de 12 mm. El templado modifica el comportamiento estructural del vidrio, no sus propiedades de transferencia de calor ni de transmisión sonora. El valor U del vidrio monolítico de 12 mm es aproximadamente 5,6 W/m²·K (según EN 673), y el STC (Clase de Transmisión Sonora) de una hoja simple es de alrededor de 34 (según ensayo de laboratorio ASTM E90). Estas cifras solo mejoran de forma significativa cuando el vidrio de 12 mm se utiliza como componente en una{' '}
          <a href="/products/insulated-glass" className="text-[#DAA745] hover:underline">
            unidad de vidrio aislante (UVA (Unidad de Vidrio Aislante))
          </a>{' '}
          con un recubrimiento de vidrio de baja emisividad (Low-E) y relleno de argón, o cuando se lamina con una lámina intermedia de PVB (polivinil butiral) o PVB acústico en un{' '}
          <a href="/products/laminated-glass" className="text-[#DAA745] hover:underline">
            vidrio laminado
          </a>{' '}
          conjunto.
        </p>
        <p>
          En proyectos donde el aislamiento térmico es determinante, el vidrio templado de 12 mm se especifica habitualmente como la hoja exterior o interior de una UVA (Unidad de Vidrio Aislante) en lugar de utilizarse en forma monolítica. Una UVA 12 + 12A + 6 con vidrio de baja emisividad (Low-E) en la superficie 2 puede llevar el valor U por debajo de 1,6 W/m²·K. Para aplicaciones de exigencia acústica, el vidrio templado de 10 mm laminado con 1,52 mm de PVB (polivinil butiral) acústico sobre vidrio templado de 12 mm alcanza un STC (Clase de Transmisión Sonora) de 42 a 45, que es el techo práctico sin recurrir al triple acristalamiento.
        </p>

        <h2 id="applications">Dónde se especifica el 12 mm</h2>
        <p>Las aplicaciones para las que más frecuentemente se especifica vidrio templado de 12 mm en nuestra cartera de pedidos de exportación:</p>
        <ul>
          <li>
            <strong>Barandillas de vidrio sin marco de hasta 1.100 mm de altura</strong> —
            conformes a GB 50352 y a la mayoría de las jurisdicciones del IBC (Código Internacional de Construcción) para cargas de relleno. Consulte nuestra{' '}
            <a href="/blog/balustrade-glass-specification" className="text-[#DAA745] hover:underline">
              guía de especificación de vidrio para barandillas de vidrio
            </a>{' '}
            para casos de carga y selección de nivel.
          </li>
          <li><strong>Marquesinas y toldos de gran luz</strong> — hoja simple de 12 mm hasta 2,5 x 4 m con herrajes de fijación puntual adecuados.</li>
          <li><strong>Escaparates y vitrinas de exposición de gran superficie</strong> — hoja simple de hasta aproximadamente 2,4 x 3 m sin laminado.</li>
          <li><strong>Puertas de mampara de ducha y mamparas de baño de más de 2 m de altura</strong> — superando la especificación habitual de 10 mm para mamparas de ducha cuando la altura o la anchura exigen mayor rigidez.</li>
          <li><strong>Aletas de vidrio y acristalamiento estructural</strong> — como componente en configuraciones de aletas de vidrio laminado, donde laminados 12 + 12 o 12 + 15 soportan cargas de viento en aletas de muro cortina.</li>
          <li><strong>Paredes de exposición de hoja única de gran formato</strong> — nuestro formato de 3 x 15 m a 12 mm cubre tiendas insignia de lujo, salas de exposición de automóviles y vitrinas de museo en una sola hoja.</li>
          <li><strong>Hoja exterior o interior de UVA (Unidad de Vidrio Aislante)</strong> — para proyectos en los que la hoja exterior soporta la carga de viento y la hoja interior es más delgada o laminada.</li>
        </ul>

        <h2 id="processing">Cantos, taladros y recortes</h2>
        <p>
          Todo proceso que modifique el vidrio debe realizarse antes del templado.
          La tensión superficial de compresión fijada por el enfriamiento rápido no puede
          modificarse una vez aplicada. Para 12 mm, tres categorías de procesado determinan tanto el costo
          como el plazo de entrega.
        </p>
        <p>
          <strong>Bordes.</strong> Los bordes cortados en bruto no son aceptables para
          vidrio templado arquitectónico. Las microfisuras originadas durante el corte se convierten en
          concentradores de tensión durante el enfriamiento rápido y aumentan el riesgo de rotura dentro del horno.
          El tratamiento de borde estándar es el rectificado (desbarbado y achaflanado, habitual en
          vidrio enmarcado), con bordes pulidos (pulido plano, pulido en lápiz
          o biselado) para aplicaciones de borde expuesto como barandillas de vidrio sin marco
          y mamparas de ducha. Los bordes rectificados añaden aproximadamente un 8% al costo base;
          los bordes pulidos, aproximadamente un 18%.
        </p>
        <p>
          <strong>Perforaciones y recortes.</strong> Los orificios para fijaciones puntuales, recortes para bisagras
          y orificios para cerraduras se perforan antes del templado. GB 15763.2
          §5.5 y{' '}
          <a href="https://www.fgiaonline.org/" target="_blank" rel="nofollow noopener" className="text-[#DAA745] hover:underline">
            FGIA
          </a>{' '}
          las directrices del sector exigen que la distancia del borde al orificio sea mayor o
          igual a 2 veces el espesor del vidrio (mínimo 24 mm para 12 mm) y que la
          separación entre orificios sea mayor o igual a 2 veces el espesor. El diámetro del orificio
          no debe superar un tercio del ancho del panel. Cada orificio adicional incrementa el tiempo de mecanizado y aumenta el riesgo de
          rotura dentro del horno, por lo que los orificios inciden directamente tanto en el precio por panel como en la
          hipótesis de rendimiento que incorporamos a los precios de proyecto.
        </p>
        <p>
          <strong>Formas CNC.</strong> Los cortes curvos, las muescas y las formas no rectangulares
          requieren perfilado por chorro de agua CNC o rueda de diamante antes del
          templado. La complejidad de la forma no escala de manera lineal. Un arco simple
          añade aproximadamente un 12% al costo base, mientras que radios complejos y recortes interiores
          pueden duplicar el tiempo de procesado por panel. Estos trabajos los cotizamos
          a partir de sus planos de taller en formato DWG, no a partir de descripciones escritas.
        </p>

        <LeadMagnetCTA variant="inline" articleSlug={SLUG} title="Gratis: referencia de detalles de bordes y perforaciones para vidrio templado de 12 mm" description="Una referencia imprimible compatible con DWG que muestra las distancias de borde a orificio según GB, EN y ASTM, plantillas de recorte para bisagras y dimensiones estándar de fijación puntual para proyectos de vidrio templado de 12 mm." />

        <h2 id="certifications">Certificaciones para vidrio templado de 12 mm</h2>
        <p>
          Cada panel de vidrio templado de 12 mm que enviamos incluye un certificado de
          conformidad con GB 15763.2-2005, la norma nacional china para
          vidrio de seguridad arquitectónico, respaldado por la certificación 3C (CCC) de China de nuestra fábrica. Para destinos de exportación, podemos gestionar el marcado de conformidad adicional en el momento del pedido:
        </p>
        <ul>
          <li>
            <strong>Marcado CE conforme a EN 12150-2:2019</strong> — obligatorio para
            productos de construcción comercializados en el mercado de la UE conforme al{' '}
            <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32011R0305" target="_blank" rel="nofollow noopener" className="text-[#DAA745] hover:underline">
              Reglamento (UE) n.º 305/2011 (RPC)
            </a>
            . Incluye documentación del Sistema AVCP 3 (DoP del fabricante más ensayo de tipo inicial por organismo notificado).
          </li>
          <li><strong>ANSI Z97.1-2015 Clase A</strong> — norma voluntaria de seguridad de acristalamiento de EE. UU. para vidrio templado arquitectónico. Exigida por referencia en el IBC (Código Internacional de Construcción) 2021 §2406.1 para ubicaciones de riesgo.</li>
          <li><strong>CPSC 16 CFR 1201 Categoría II</strong> — norma federal obligatoria de seguridad de acristalamiento de EE. UU. para mamparas de ducha, barandillas y vidrio en la trayectoria de deslizamiento de puertas.</li>
          <li><strong>AS/NZS 2208:1996</strong> — norma australiana/neozelandesa de acristalamiento de seguridad, verificada mediante certificación SAI Global.</li>
          <li><strong>Informes de inspección de terceros SGS o BV</strong> — verificación previa al embarque del recuento de fragmentos, tensión superficial y conformidad dimensional (servicio a cargo del comprador).</li>
        </ul>

        <h2 id="cost-drivers">Factores de coste en pedidos de 12 mm</h2>
        <p>
          El precio cotizado por metro cuadrado para vidrio templado de 12 mm es aproximadamente 2 veces el del vidrio templado de 6 mm, pero el costo del vidrio flotado en bruto explica menos de la mitad de esa diferencia. El resto recae en las partidas de procesamiento y manipulación que los compradores suelen pasar por alto en las cotizaciones. Tres categorías concentran el 90% de la variación entre una cotización económica de 12 mm y una costosa: el tratamiento de bordes (corte simple vs. rectificado vs. pulido de bordes), la cantidad de perforados y recortes, y la complejidad de la forma.
        </p>

        <p>
          <strong>Cómo se estructura el desglose:</strong> el componente a continuación muestra la estructura de costos de un panel estándar de vidrio templado de 12 mm como barra apilada: vidrio flotado en bruto de 12 mm al 42% de la línea base, ciclo de templado al 28%, control de calidad y embalaje al 16%, y manipulación en fábrica y gastos generales al 14%. Tres selectores permiten añadir los recargos de procesamiento habituales: tratamiento de bordes (corte simple 0%, rectificado +8%, pulido de bordes +18%), cantidad de perforados o recortes (ninguno 0%, 1 a 4 perforaciones +6%, 5 o más o recortes +15%), y forma (rectángulo 0%, CNC o curvado +12%). El resultado es un multiplicador relativo respecto a la línea base de rectángulo simple, no una cifra en moneda. Los precios reales varían según el tamaño del panel, el volumen del pedido y el mercado de vidrio flotado en el momento de la cotización.
        </p>

        <CostFactorBreakdown />

        <CostDisclaimer />

        <h2 id="thinner-or-thicker">Cuándo optar por un espesor menor o mayor</h2>
        <p>
          El vidrio templado de 12 mm es una opción estándar sólida, no la única respuesta. Cuatro escenarios en los que habitualmente recomendamos a los compradores especificar algo distinto al monolítico de 12 mm:
        </p>
        <ul>
          <li>
            <strong>Reducir a vidrio templado laminado de 10 mm (10,76 u 11,52 mm en total)</strong> para acristalamiento en altura, barandillas de vidrio y mamparas de ducha. El laminado añade retención de fragmentos que el vidrio monolítico de 12 mm no ofrece. En muchas jurisdicciones, esto es un requisito normativo para uso en altura, no una opción. Consulte nuestro{' '}
            <a href="/blog/tempered-glass-vs-laminated-glass" className="text-[#DAA745] hover:underline">
              comparación entre vidrio templado y vidrio laminado
            </a>{' '}
            para la matriz de decisión completa.
          </li>
          <li><strong>Reducir a 10mm templado</strong> para escaparates con luz libre inferior a 2,2 m y barandillas de vidrio a 900 mm o menos. Más ligero, más económico y estructuralmente suficiente.</li>
          <li><strong>Aumentar a 15mm templado</strong> para perfiles estructurales de vidrio, cercados de piscina superiores a 1,2 m y marquesinas con fijación puntual bajo carga de viento superior a 2,5 kPa. El incremento en rigidez a flexión es no lineal y justifica el coste a estas luces.</li>
          <li>
            <strong>Aumentar a 19mm templado</strong> para vidrio de suelo transitable, perfiles estructurales de gran luz y barandillas de vidrio en alturas con canto expuesto. 19mm es el estándar para suelos de vidrio estructural, generalmente laminado para retención de fragmentos.
          </li>
        </ul>
        <p>
          The{' '}
          <a href="/blog/tempered-glass-vs-annealed-glass" className="text-[#DAA745] hover:underline">
            comparación entre vidrio templado y vidrio recocido
          </a>{' '}
          explica cuándo cualquier espesor de vidrio templado es excesivo (aplicaciones decorativas de pequeño formato, particiones interiores por debajo de los umbrales de zona de riesgo normativa) y cuándo un panel más delgado de vidrio semitemplado o vidrio recocido es la elección correcta.
        </p>

        <p className="text-sm text-[#8B95A5] mt-6">
          Para una visión global de cómo esta decisión a nivel de producto encaja en una especificación completa de vidrio arquitectónico, consulte nuestra <a href="/blog/architectural-glass-specification-guide" className="text-[#DAA745] hover:underline">guía de especificación de vidrio arquitectónico</a>.
        </p>

        <FAQ items={faqItems} />

        <LeadMagnetCTA variant="footer" articleSlug={SLUG} title="Gratis: Comparativa Global de Códigos de Construcción para Vidrio Arquitectónico" description="Un PDF de 11 páginas en formato comparativo que analiza los requisitos de US IBC (Código Internacional de Construcción), EU EN, China GB y Australia AS para vidrio templado en todas las aplicaciones comunes. Gratuito para arquitectos, especificadores y equipos de compras." />

        <RelatedProductsCards slugs={article.relatedProductSlugs || ['tempered-glass', 'laminated-glass', 'low-e-glass']} />
      </BlogArticleLayout>
    </>;
}