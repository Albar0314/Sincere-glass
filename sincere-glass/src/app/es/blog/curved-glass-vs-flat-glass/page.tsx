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
import CurvedPremiumCalculator from "@/_i18n/es/components/blog/article-20/CurvedPremiumCalculator";
import ShapeRequirementChecker from "@/_i18n/es/components/blog/article-20/ShapeRequirementChecker";
import ProjectFitAdvisor from "@/_i18n/es/components/blog/article-20/ProjectFitAdvisor";
const SLUG = 'curved-glass-vs-flat-glass';
const article = blogArticles.find(a => a.slug === SLUG) as BlogArticle;
export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`, "es")
};
const toc = [{
  id: 'the-real-question',
  text: "La pregunta real no es vidrio curvado frente a vidrio plano",
  level: 2
}, {
  id: 'where-flat-wins',
  text: "Donde el vidrio plano sigue ganando",
  level: 2
}, {
  id: 'what-curved-unlocks',
  text: "Lo que el vidrio curvado hace posible",
  level: 2
}, {
  id: 'cost-calculator',
  text: "El coste real por diferencia, calculado",
  level: 2
}, {
  id: 'shape-checker',
  text: "¿Realmente necesita vidrio curvado?",
  level: 2
}, {
  id: 'project-fit',
  text: "Seis tipos de proyecto, seis veredictos",
  level: 2
}, {
  id: 'procurement',
  text: "Plazo de entrega, MOQ (Pedido Mínimo) y economía del contenedor",
  level: 2
}, {
  id: 'faq',
  text: 'FAQ',
  level: 2
}];
const faqItems = [{
  q: "Is curved glass stronger or weaker than flat glass?",
  a: "Neither — same base glass, same tempering process, same surface compressive stress (90-110 MPa in our Wuhan furnace), same safe-fragmentation pattern on break. The curve itself does not change structural performance. What does change is how the panel resists wind and point loads in service, because a curved panel has geometric stiffness that a flat panel of the same thickness does not. In practice this often lets specifiers thin a curved panel by one step compared to the flat equivalent."
}, {
  q: "What is the minimum order quantity for curved glass?",
  a: "For single-axis cylindrical panels (the most common geometry) we have no hard MOQ because the hot-bending mold is reusable — single-panel orders are possible, though per-m2 cost is higher at low volumes. For spherical and free-form panels, a 4-panel minimum per unique profile is typical because the mold cost gets amortized across the order. Standard PVB and SGP laminated variants of curved panels follow the same minimums as their flat equivalents (100 m2 for PVB, 200 m2 for SGP)."
}, {
  q: "How much more does curved glass cost than flat?",
  a: "At our export line, cylindrical panels in the standard R = 1,500-3,000 mm range run 70-110 percent more per square meter than flat tempered of the same thickness. Tight-radius panels (R < 800 mm) run 120-200 percent more. Spherical adds roughly 50 percent on top of cylindrical for the same radius. Free-form adds another 30 percent. The exact number depends on panel area (mold cost amortizes), so use the calculator in this article for your specific spec."
}, {
  q: "Can I mix curved and flat panels in the same facade?",
  a: "Yes, and we recommend it for most projects over 500 m2 of glass. The sightline logic: at viewing distances over 15 m the human eye reads mitred flat panels as effectively curved — the facet joints disappear. Reserving curved glass for ground-floor focal zones (entrance, street-facing retail, anywhere the viewer stands within 5-10 m of the facade) and using flat panels for upper floors typically keeps the glass premium under 25 percent of a pure-curved budget while preserving the visual impact where it matters."
}, {
  q: "How much longer is the lead time for curved glass vs flat?",
  a: "Flat tempered export orders ship 20-30 days from PO at our Wuhan line. Curved tempered: 25-35 days for standard radius cylindrical (reusable mold, no new tooling), 35-55 days for spherical (custom-cast refractory mold required), and 45-70 days for free-form (CNC mold machining from the architect's 3D model). The lead-time delta on cylindrical is modest; on spherical and free-form the mold casting dominates the schedule and the first-order cost."
}, {
  q: "Does curved glass ship differently than flat in a container?",
  a: "Yes. Flat panels ship vertically in standard A-frame crates at about 650-800 m2 per 40-foot container depending on thickness and spacing. Curved panels require custom nested cradles — the curvature prevents efficient stacking — and typical container loading drops to 350-550 m2 depending on radius and panel size. For projects on tight shipping budgets this is a cost line worth modeling explicitly. We provide loading diagrams at RFQ for any curved order to make the volumetric impact visible."
}, {
  q: "Can curved glass be insulated or laminated?",
  a: "Yes to both. Curved insulated glass units (IGU) use two or more curved panes with a flexible aluminum or stainless spacer bent to match the curvature; dual-seal (PIB + structural silicone) same as flat IGU. Curved laminated glass uses curved tempered panes bonded with PVB or SGP in a shape-matched autoclave cycle. The combinations are common on premium facades: curved + Low-E coated + IGU for thermal, or curved + SGP laminated for structural overhead and safety-critical applications."
}, {
  q: "What is the smallest radius you can achieve on curved tempered?",
  a: "500 mm minimum radius, limited to 6 mm panel thickness. For 10 mm panels the floor rises to approximately 900 mm; for 19 mm, around 2,500 mm. Tighter radii require thinner glass or a two-piece faceted build. Our 500 mm minimum sits well below the 800-1,000 mm floor most Chinese and Southeast Asian plants publish, and is one of the capabilities we built the curved tempered line specifically to deliver."
}];
export default function Page() {
  if (!article) return null;
  return <>
      <Script id="article-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(articleJsonLd(article, faqItems))
    }} />

      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox takeaways={article.tldr || []} />

        <h2 id="the-real-question">La pregunta real no es vidrio curvado frente a vidrio plano</h2>
        <p>
          La mayoría de los compradores llegan a esta comparación formulando la pregunta equivocada. "¿Debo usar vidrio curvado o vidrio plano?" la enmarca como una elección estilística entre dos equivalentes. En la práctica, no lo es. El vidrio templado plano es el producto arquitectónico estándar en cualquier código moderno y en cualquier lista de precios del mundo; es lo que se especifica salvo que el proyecto imponga una razón para desviarse. El vidrio curvado es al que se recurre cuando una restricción específica —geométrica, funcional o de identidad de marca— hace inviable el plano.
        </p>
        <p>
          Ese replanteamiento importa porque aclara dónde recae la carga de la prueba. La pregunta correcta no es "¿cuál queda mejor aquí?" sino "¿tiene mi proyecto una razón para pagar entre un 60 y un 200 por ciento más por metro cuadrado de vidrio?" Si la respuesta es sí, este artículo explica cómo especificar el vidrio curvado correctamente y cómo se desglosa el coste real por diferencia. Si la respuesta es no —o no está seguro— las dos primeras secciones y el verificador de decisiones que figura a continuación le ahorrarán una conversación con su arquitecto que conviene tener antes de entrar en la fase de compras.
        </p>
        <p>
          Todo lo que sigue está escrito desde nuestra línea de exportación en Wuhan, donde fabricamos tanto{' '}
          <a href="/products/tempered-glass">vidrio templado plano</a> and{' '}
          <a href="/products/curved-tempered-glass">vidrio templado curvado</a> en los mismos dos hornos. La economía y las compensaciones son lo que cotizamos a arquitectos y contratistas cada semana.
        </p>

        <h2 id="where-flat-wins">Donde el vidrio plano sigue ganando</h2>
        <p>
          El vidrio plano no es solo más barato. Tiene ventajas estructurales, logísticas y de aprovisionamiento que se multiplican a escala, y comprenderlas es lo que convierte la decisión de optar por el curvado en algo honesto, más que aspiracional.
        </p>
        <p>
          <strong>Coste por metro cuadrado.</strong> En la línea de exportación FOB-China, el vidrio templado plano de 10 mm ronda los $75-90/m² en cantidades de contenedor para el cuarto trimestre de 2026. El mismo espesor en vidrio templado curvado a un radio estándar de 1.500-3.000 mm ronda los $140-180/m². Esa diferencia es el precio de entrada; se mantiene en las variaciones de laminado y UVA (Unidad de Vidrio Aislante) en la misma proporción.
        </p>
        <p>
          <strong>Dimensiones máximas del panel.</strong> Nuestro horno de templado procesa paneles planos de hasta 3,3 m × 15 m — entre los más grandes de la provincia de Hubei. Un panel curvado con el mismo límite de horno enfrenta restricciones prácticas: en tamaños muy grandes, el combado durante el doblado en caliente se vuelve más difícil de controlar, por lo que el rango de trabajo para paneles curvados de gran formato es más reducido que para los planos de gran formato. Si el diseño exige paneles individuales de formato verdaderamente jumbo, el vidrio plano ofrece más margen de tamaño que el curvado.
        </p>
        <p>
          <strong>Normas y ensayos.</strong> El vidrio templado plano cuenta con décadas de datos de ensayo bajo GB 15763.2 (China), EN 12150 (Europa), ANSI Z97.1 (EE. UU.) y AS 1288 (Australia). El vidrio templado curvado está cubierto por las mismas normas de base, pero el régimen de ensayo es menos uniforme entre mercados — no representa un problema para la especificación arquitectónica, aunque implica mayor coordinación con el consultor de certificación del proyecto en trabajos de exportación.
        </p>
        <p>
          <strong>Reparación y reposición.</strong> Un panel plano que se rompe tras la puesta en servicio puede reponerse con stock disponible. Un panel curvado implica reordenar con las especificaciones del molde; si el molde ha sido archivado, el plazo de entrega es de 25-45 días; si el molde ha sido desechado, el plazo es mayor. Para aplicaciones de alto riesgo (locales comerciales en planta baja, zonas de circulación pública), los compradores solicitan a veces paneles de repuesto en el momento de la producción original — una línea de coste menor que resulta más económica que un pedido urgente.
        </p>
        <p>
          <strong>Eficiencia de transporte.</strong> Los paneles planos se transportan en vertical en bastidores tipo A a razón de 650-800 m² por contenedor de 40 pies. Los paneles curvados requieren soportes anidados a medida y la carga por contenedor se reduce a 350-550 m². En pedidos de gran volumen, esta diferencia logística supone con frecuencia una línea de coste mayor que la propia prima por panel.
        </p>

        <h2 id="what-curved-unlocks">Lo que el vidrio curvado hace posible</h2>
        <p>
          Todo lo anterior representa los argumentos a favor del vidrio plano. A continuación se expone lo que el vidrio plano no puede hacer, que es precisamente la razón por la que el vidrio curvado existe como línea de producto.
        </p>
        <p>
          <strong>Curvatura continua real.</strong> A distancias de observación inferiores a 10-15 m — que es donde se sitúan las fachadas de planta baja, los escaparates comerciales y las instalaciones interiores — el ojo humano percibe los paneles planos a inglete por lo que son: una serie de facetas planas con juntas visibles. Un panel doblado en caliente de una sola pieza se lee como una superficie continua. Para proyectos donde esa lectura importa (hostelería, museos, comercio de referencia, residencial de lujo), el vidrio plano no es una alternativa de ahorro; es un compromiso visual.
        </p>
        <p>
          <strong>Geometrías que el vidrio plano no puede aproximar.</strong> Un hueco de ascensor cilíndrico en el interior de un atrio de hotel no puede construirse con facetas planas sin que la cabina parezca estar dentro de un polígono. Las claraboyas de cúpula, los cerramientos de observación y el acristalamiento escultórico esférico no tienen equivalente plano que resulte visualmente correcto. La geometría exige físicamente una curva, y la única decisión es qué método de producción curvada emplear (doblado en caliente para radios cerrados, doblado en frío para curvas suaves).
        </p>
        <p>
          <strong>Menor número de juntas en fachadas de gran desarrollo curvo.</strong> Un muro cortina continuo de 40 m construido con paneles planos de 3 m de ancho requiere aproximadamente 13 juntas verticales visibles desde el nivel del suelo. La misma fachada construida con paneles curvos de 3 m de ancho necesita el mismo número de juntas, pero cada una sigue la curva en lugar de quebrarse en un cambio de faceta. La continuidad visual es sutil, pero se percibe como arquitectura de mayor calidad a cualquier distancia de observación.
        </p>
        <p>
          <strong>Rigidez geométrica.</strong> Este punto sorprende a los compradores. Un panel curvo tiene una rigidez a flexión que un panel plano del mismo espesor no posee: la curvatura actúa estructuralmente. En acristalamientos cenitales y fachadas con soporte puntual, esto frecuentemente permite reducir el espesor del panel curvo un paso (12 mm plano sustituido por 10 mm curvo) cumpliendo el mismo límite de deflexión. No elimina la sobrecarga de coste, pero la reduce. Vale la pena modelarlo con su consultor de vidrio estructural.
        </p>

        <h2 id="cost-calculator">El coste real por diferencia, calculado</h2>
        <p>
          <strong>Cómo funciona la calculadora:</strong> tres datos de entrada: radio en milímetros, área del panel terminado en metros cuadrados y tipo de geometría (cilíndrica de un solo eje, esférica de doble eje o forma libre). El modelo multiplica nuestra curva empírica de penalización por radio (3,5x por debajo del límite de 500 mm, 2,6x en radios ajustados por debajo de 800 mm, 2,1x en el rango estándar de 800-1.500 mm, 1,75x entre 1.500-3.000 mm, 1,5x entre 3.000-5.000 mm, 1,25x en zona de curvado en frío por encima de 5.000 mm) por un multiplicador de geometría (1,0 un solo eje, 1,5 esférico, 1,95 forma libre) y añade la amortización del molde, que disminuye a medida que aumenta el área del pedido. El resultado es un precio por m² y un delta total del proyecto respecto a la línea de base plana que usted defina. Los valores provienen del historial de cotizaciones de exportación de nuestra planta de Wuhan (2023-2026) y son estimaciones de planificación, no cotizaciones definitivas.
        </p>

        <CurvedPremiumCalculator />

        <CostDisclaimer />

        <h2 id="shape-checker">¿Realmente necesita vidrio curvado?</h2>
        <p>
          <strong>Cómo funciona el verificador:</strong> cuatro preguntas binarias de sí/no que sondean los cuatro factores de presión que justifican el vidrio curvo: necesidad geométrica (¿podrían los paneles planos en inglete lograr la forma?), continuidad visual (¿importa la continuidad de reflejos y líneas de visión a la distancia de observación?), escala del panel (¿son los paneles suficientemente grandes como para que las juntas de faceta resulten visualmente prominentes?) y margen presupuestario (¿puede el proyecto absorber una sobrecarga de vidrio del 60-200 por ciento?). El árbol de decisión combina las cuatro respuestas en uno de tres veredictos: «plano suficiente» (sin presión geométrica ni visual), «curvo justificado» (los cuatro factores se alinean) o «estrategia mixta» (algunos factores apuntan al curvo, pero no todos). Reinicie y responda de nuevo para ver cómo el cambio de un factor modifica la recomendación.
        </p>

        <ShapeRequirementChecker />

        <h2 id="project-fit">Seis tipos de proyecto, seis veredictos</h2>
        <p>
          <strong>Cómo funciona el asesor:</strong> seis escenarios arquitectónicos habituales en los que la pregunta sobre vidrio curvo frente a plano aparece con mayor frecuencia en nuestra bandeja de entrada de exportación: ascensores panorámicos, muros cortina curvos de varias plantas, marquesinas de entrada, escaparates de comercio boutique, fachadas perimetrales de oficinas estándar y elementos escultóricos de forma libre. Cada uno devuelve un veredicto curvo/plano/híbrido con la composición específica que cotizamos, el rango de delta de coste respecto a la línea de base plana de nuestro historial de cotizaciones de exportación 2023-2026, y el razonamiento que explica por qué se llega a ese veredicto. Elija el escenario más próximo al suyo; suele ser la vía más rápida para obtener una primera recomendación defendible.
        </p>

        <ProjectFitAdvisor />

        <h2 id="procurement">Plazo de entrega, MOQ (Pedido Mínimo) y economía del contenedor</h2>
        <p>
          Las diferencias de aprovisionamiento entre vidrio curvo y plano importan tanto como el precio por m² en proyectos reales. Tres áreas en las que presupuestar:
        </p>
        <p>
          <strong>Delta en el plazo de entrega.</strong> Los pedidos de exportación de vidrio templado plano se envían en 20-30 días desde la orden de compra. Vidrio curvo cilíndrico a radio estándar: 25-35 días (molde reutilizable, sin nueva herramienta). Vidrio curvo esférico: 35-55 días por los moldes refractarios de fundición personalizada. Forma libre: 45-70 días, determinados por el mecanizado CNC del molde a partir del modelo 3D del arquitecto. En proyectos con plazos ajustados, reservamos los paneles curvos en el momento de la firma de la orden de compra e iniciamos los moldes en paralelo con la producción de los paneles planos.
        </p>
        <p>
          <strong>MOQ (Pedido Mínimo).</strong> Vidrio templado plano: sin mínimo fijo, el coste aumenta en volúmenes pequeños. Curvo cilíndrico: son posibles pedidos de un solo panel porque el molde es reutilizable, aunque el coste por m² es mayor a bajo volumen. Curvo esférico y forma libre: un mínimo de 4 paneles por perfil único es lo habitual para mantener un coste de molde por unidad razonable. Combinar marcas curvas con marcas planas en la misma orden de compra es práctica estándar: la mayoría de nuestros pedidos de exportación son híbridos.
        </p>
        <p>
          <strong>Economía del contenedor.</strong> Los paneles planos se transportan en vertical a razón de 650-800 m² por contenedor de 40 pies. Los paneles curvos requieren soportes de anidamiento personalizados y la carga típica desciende a 350-550 m², lo que supone un delta de coste de flete significativo en pedidos de gran volumen. Proporcionamos diagramas de carga en la solicitud de cotización (RFQ) para cada pedido de vidrio curvo, de modo que el impacto volumétrico sea visible antes de la orden de compra.
        </p>
        <p>
          <strong>Almacenamiento de moldes.</strong> Archivamos los moldes de los clientes durante 24 meses por defecto. Para proyectos que puedan requerir paneles de repuesto más allá de ese plazo (comercios en planta baja de uso público, entradas de hotel), recomendamos ampliar el acuerdo de archivo de moldes o pedir 1-2 paneles de repuesto durante la producción original. Ambas opciones representan un coste menor comparado con un pedido de emergencia en el año 3.
        </p>
        <p>
          Si desea consultar la página completa de especificaciones de vidrio templado curvado con verificador de viabilidad interactivo y visualizador de curvatura, visite nuestra{' '}
          <a href="/products/curved-tempered-glass">
            página de producto de vidrio templado curvado
          </a>
          . Las tres herramientas interactivas disponibles allí confirman en tiempo real la viabilidad del radio, el espesor y el tamaño del panel, frente a nuestro radio mínimo de 500 mm y el formato máximo de 3,3 m × 15 m.
        </p>

        <LeadMagnetCTA variant="inline" articleSlug={SLUG} title="Gratis: Comparativa Global de Códigos de Construcción para Vidrio Arquitectónico" description="Un PDF de 11 páginas en formato comparativo que abarca los requisitos de IBC (Código Internacional de Construcción) de EE. UU., las normas EN de la UE, GB de China y AS de Australia para vidrio templado y vidrio laminado en todas las aplicaciones habituales. Disponible de forma gratuita para arquitectos, especificadores y equipos de compras." />

        <FAQ items={faqItems} />

        <RelatedProductsCards slugs={article.relatedProductSlugs || ['curved-tempered-glass', 'tempered-glass', 'laminated-glass']} />
      </BlogArticleLayout>
    </>;
}