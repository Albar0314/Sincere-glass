import type { Metadata } from "next";
import Script from "next/script";
import { blogArticles, type BlogArticle } from "@/lib/blog-registry";
import BlogArticleLayout, { generateArticleMetadata, articleJsonLd } from "@/_i18n/es/components/blog/BlogArticleLayout";
import TLDRBox from "@/_i18n/es/components/blog/TLDRBox";
import FAQ from "@/_i18n/es/components/blog/blocks/FAQ";
import LeadMagnetCTA from "@/_i18n/es/components/blog/LeadMagnetCTA";
import RelatedProductsCards from "@/_i18n/es/components/blog/RelatedProductsCards";
import CostDisclaimer from "@/_i18n/es/components/blog/CostDisclaimer";
import { makeAlternates } from "@/lib/i18n";
import SpecificationBuilder from "@/_i18n/es/components/blog/pillar-product/SpecificationBuilder";
import AttributeCascadeDiagram from "@/_i18n/es/components/blog/pillar-product/AttributeCascadeDiagram";
import CapabilityEnvelopeMatrix from "@/_i18n/es/components/blog/pillar-product/CapabilityEnvelopeMatrix";
const SLUG = "architectural-glass-specification-guide";
const article = blogArticles.find(a => a.slug === SLUG) as BlogArticle;
const toc = [{
  id: "what-is-a-spec",
  text: "Qué contiene una especificación completa de vidrio arquitectónico",
  level: 2
}, {
  id: "six-attributes",
  text: "Los 6 atributos de decisión",
  level: 2
}, {
  id: "attribute-cascade",
  text: "Cómo se encadenan los atributos",
  level: 2
}, {
  id: "glass-codes",
  text: "Lectura y escritura de códigos de vidrio",
  level: 2
}, {
  id: "capability-envelope",
  text: "Capacidad de producción: Sincere Glass frente al sector",
  level: 2
}, {
  id: "pitfalls",
  text: "Cinco errores de especificación que cuestan dinero real",
  level: 2
}, {
  id: "spec-to-rfq",
  text: "De la hoja de especificación a la RFQ",
  level: 2
}, {
  id: "faq",
  text: "Preguntas frecuentes del comprador",
  level: 2
}, {
  id: "product-deep-dives",
  text: "Análisis detallados de productos y otros pilares",
  level: 2
}];
const faqItems = [{
  q: "What is a typical MOQ when the architectural glass specification is custom?",
  a: "Our standard MOQ is one 20-foot container, which fits roughly 18 to 22 tonnes depending on thickness, assembly, and crating. Mixed-thickness and mixed-assembly orders are accepted inside a single container, so a project that needs 60% tempered IGU plus 40% laminated monolithic ships as one PO. For sub-container volumes we quote LCL consolidation to common ocean hubs."
}, {
  q: "How accurate are the capability envelopes you publish versus what you can actually deliver?",
  a: "Our Sincere Standard column reflects what we commit to on a normal container order from stock float, verified against ISO 9001 quality records and our last four quarters of production data. Sincere Max is what we deliver on project-scale engagements with lead-time adjustment and raw-glass procurement. If a dimension sits above Sincere Max, we tell you before quoting rather than after."
}, {
  q: "Can you quote from a spec sheet in a non-standard format (DWG, PDF, email paragraph)?",
  a: "Yes. We quote from whatever format the specifier works in: DWG shop drawings, Revit exports, PDF spec sections, Excel schedules, or a plain-text email that gives us the six attributes (substrate, processing, thickness, assembly, coating, size). Turnaround is one working day for a priced quotation. Specs that reference a jurisdiction (IBC, EN, GB) or a specific standard (ASTM E1300, EN 12150-2) get back a code-compliant quote; specs without that cross-reference get back our recommended default plus questions."
}, {
  q: "Do you charge for revised specification iterations?",
  a: "The first two spec revisions on any project are free. We expect iteration, especially when the architect, engineer, and buyer are still aligning on wind-load class or thermal targets. From the third revision we charge our engineering hourly rate (invoiced only if the project proceeds, waived if the final PO is placed with us). This is published upfront in our quotation terms."
}, {
  q: "Can you supply a filled specification template or sample spec document for our tender?",
  a: "Yes. We maintain a specification template library covering curtain wall glass, balustrade glass, shower glass, skylight glass, and spandrel glass, each with the clauses and standards your tender needs to reference. Request access through our contact form and we send the editable Word and PDF versions, along with sample product cut sheets from the Sincere Glass product library. Nothing in the template is Sincere-specific; it is designed to let you tender to any qualified supplier."
}];
export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates("/blog/" + SLUG, "es")
};
export default function Page() {
  const schemas = articleJsonLd(article, faqItems);
  return <>
      {schemas.map((s, i) => <Script key={i} id={`article-jsonld-${i}`} type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{
      __html: JSON.stringify(s)
    }} />)}

      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox takeaways={["A complete architectural glass specification is six decisions, not one: substrate, processing, thickness, assembly, coating, and panel size. Everything else (weight, cost, U-value, hardware, shipping) is derived from those six.", "Thickness is the single highest-leverage attribute. It drives weight, strength, cost, and shipping density simultaneously. Get it wrong and three downstream line items move.", "Glass codes like 6T+12A(Ar)+6T Low-E#2 are read left-to-right as a stack. T means tempered, 12A is a 12 mm argon-filled cavity, Low-E#2 means the coating sits on surface 2 of the stack. Writing the code correctly removes most RFQ ambiguity.", "Our Wuhan factory envelope: up to 3,000 x 15,000 mm panels, up to 19 mm tempered, up to 4-ply SGP lamination, up to 24 mm IGU cavity. These exceed mid-tier industry typical on every dimension, with 10-15 day standard lead time.", "The five most common specification pitfalls that cost real money: tolerance ambiguity, coating surface position, unit-system mismatch, missing edge treatment, and missing code jurisdiction. Each is a line in the spec; each is also a change order waiting to happen."]} />

        <p>
          Una especificación de vidrio arquitectónico no es una descripción de producto, es un árbol de decisiones. Seis decisiones, tomadas aproximadamente en este orden, determinan cada propiedad relevante del panel terminado: sustrato, procesado, espesor, ensamblaje, recubrimiento y dimensiones. Todo lo que se deriva de ellas, desde el peso y la carga de rotura hasta el valor U, el número de contenedores de envío y la ferretería de instalación, se calcula a partir de esos seis factores. Si los seis están correctamente definidos, una fábrica puede cotizar su proyecto en un día hábil. Si falla uno solo, la cotización regresa con una pregunta que cuesta una semana.
        </p>

        <p>
          Este pilar es el mapa. Recorremos qué debe incluir una especificación completa de vidrio arquitectónico, cómo los seis atributos se encadenan en los doce resultados derivados que importan a los compradores, cómo leer y escribir los códigos compactos de vidrio (<code>6T+12A(Ar)+6T Low-E#2</code>) que aparecen en cada listado del sector, y dónde se sitúa nuestra capacidad de producción en Wuhan frente a la típica del sector. Cerramos con los cinco errores de especificación que vemos costar dinero real en proyectos reales, y la transición de una hoja de especificación finalizada a una RFQ con precio. Cuando este pilar llega a un punto de decisión a nivel de producto, enlazamos con los análisis detallados de nuestro clúster de Productos: <a href="/blog/12mm-tempered-glass-specifications" className="text-[#DAA745] hover:underline">especificaciones de vidrio templado de 12 mm</a>, <a href="/blog/sgp-vs-pvb-interlayer-cost" className="text-[#DAA745] hover:underline">Costo de lámina intermedia SGP (SentryGlas Plus) vs PVB (polivinil butiral)</a>, y <a href="/blog/jumbo-architectural-glass-panels" className="text-[#DAA745] hover:underline">paneles de vidrio arquitectónico de formato jumbo</a>.
        </p>

        <h2 id="what-is-a-spec">Qué contiene una especificación completa de vidrio arquitectónico</h2>
        <p>
          Una especificación que permite a una fábrica cotizar sin necesidad de preguntas adicionales contiene tres capas de información, y la mayoría de los problemas tienen su origen en que una de estas capas es insuficiente.
        </p>
        <p>
          <strong>Primera capa: el producto en sí.</strong> Estos son los seis atributos que desarrollamos a continuación. Es el código compacto (<code>6T+12A(Ar)+6T Low-E#2</code>) más cualquier elemento adicional que el código no pueda capturar: tratamiento de bordes, posiciones de taladros y recortes, perfiles de formas personalizadas. Una especificación que se limita a esta capa le proporcionará una cotización por metro cuadrado y un estimado de plazo de entrega.
        </p>
        <p>
          <strong>Segunda capa: el marco normativo aplicable.</strong> Es la jurisdicción donde se instalará el panel y las normas específicas que la rigen. GB 15763.2 y GB 50113 para China. EN 12150-2, EN 14449 y EN 13830 para Europa. ASTM E1300 y el capítulo del IBC (Código Internacional de Construcción) correspondiente para Estados Unidos. AS 1288 para Australia. Los compradores que omiten esta capa reciben una cotización correcta según la normativa china y una orden de cambio cuando las tolerancias del destino resultan ser más exigentes.
        </p>
        <p>
          <strong>Tercera capa: las condiciones del proyecto.</strong> Dirección de entrega, puerto de descarga, cronograma de carga, control de revisión de planos, clase de embalaje (marítimo apto para exportación frente a apto para transporte terrestre), condiciones de inspección (si se requiere una inspección por terceros como SGS o BV antes del embarque) y condiciones de pago. Ningún elemento de esta capa modifica el vidrio, pero cada uno incide en la cotización. Abordamos en detalle el lado del comprador en esta capa en nuestro bloque de Guías para Compradores, especialmente en el <a href="/blog/how-to-import-glass-from-china" className="text-[#DAA745] hover:underline">guía paso a paso para la importación</a>.
        </p>

        <h2 id="six-attributes">Los 6 atributos de decisión</h2>
        <p>
          Toda especificación de vidrio arquitectónico se resuelve en seis decisiones. El orden indicado a continuación es también, a grandes rasgos, el orden en que deben tomarse; las decisiones posteriores dependen de las anteriores. Un configurador de especificaciones que siga esta secuencia no se encontrará bloqueado.
        </p>
        <ol>
          <li>
            <strong>Sustrato.</strong> El vidrio flotado base sobre el que se construye todo lo demás. Incoloro, ultra-claro (bajo contenido en hierro), tintado (bronce, gris, azul, verde) o reflectante (recubrimiento pirolítico). El sustrato determina la transmisión luminosa de base, la apariencia cromática y el costo base. El ultra-claro tiene un sobreprecio de entre el 10 y el 15% respecto al incoloro y se especifica cuando la fidelidad de color es esencial: comercio minorista de lujo, exposición en museos, residencias de alto nivel.
          </li>
          <li>
            <strong>Procesado.</strong> Cómo el sustrato ha sido tratado térmicamente o laminado. El vidrio recocido es vidrio flotado en bruto, aceptable solo donde no se requiere vidrio de seguridad. El vidrio templado ofrece entre 4 y 5 veces la resistencia del vidrio recocido y produce el patrón de rotura en pequeños cubos. El vidrio semitemplado equivale aproximadamente a 2 veces el vidrio recocido, no es de seguridad, pero presenta un riesgo de fallo por sulfuro de níquel mucho menor que el vidrio templado, por lo que se prefiere para la hoja exterior de UVAs (Unidades de Vidrio Aislante) sometidas a ciclos térmicos. El vidrio laminado une dos o más hojas mediante una lámina intermedia de PVB (polivinil butiral), SGP (SentryGlas Plus) o EVA (etileno vinil acetato), proporcionando retención de fragmentos y, con SGP, rigidez tras la rotura. El vidrio templado laminado combina ambas características. Consulte nuestro <a href="/blog/tempered-glass-vs-laminated-glass" className="text-[#DAA745] hover:underline">comparación entre vidrio templado y vidrio laminado</a> para la matriz de decisión.
          </li>
          <li>
            <strong>Espesor.</strong> 6, 8, 10, 12, 15 o 19 mm por hoja. El espesor es el atributo de especificación de mayor impacto individual: determina el peso, la carga de rotura, la rigidez, el coste del vidrio en bruto y la densidad de carga en envío, todo a la vez. 12 mm es el punto óptimo arquitectónico donde converge la mayor parte de los proyectos de carga media; nuestro <a href="/blog/12mm-tempered-glass-specifications" className="text-[#DAA745] hover:underline">análisis detallado de especificaciones 12 mm</a> explica el porqué.
          </li>
          <li>
            <strong>Composición.</strong> Monolítico (hoja única), doble UVA (Unidad de Vidrio Aislante) (dos hojas separadas por una cámara sellada) o triple UVA (tres hojas, dos cámaras). La composición determina el rendimiento térmico. Un monolítico de 6 mm tiene un valor U de aproximadamente 5,8 W/m²K; una doble UVA con vidrio de baja emisividad (Low-E) y relleno de argón baja hasta 1,1–1,6; una triple UVA con dos recubrimientos Low-E y dos rellenos de argón cae por debajo de 0,8, el umbral de casa pasiva.
          </li>
          <li>
            <strong>Recubrimiento.</strong> Sin recubrimiento, vidrio de baja emisividad (Low-E) (capa blanda por pulverización catódica o capa dura pirolítica), control solar, o vidrio con frita cerámica (vidrio esmaltado, utilizado en vidrio spandrel y aplicaciones opacas). El Low-E de capa blanda ofrece el mejor rendimiento térmico, pero debe ubicarse dentro de una UVA; no puede quedar expuesto a la atmósfera. El Low-E de capa dura puede usarse en monolítico o en la cara exterior de una UVA, aunque con un valor U inferior. La posición del recubrimiento en la superficie es determinante: el Low-E en la superficie 2 (hoja exterior, cara de la cámara) genera un perfil térmico distinto al del Low-E en la superficie 3 (hoja interior, cara de la cámara).
          </li>
          <li>
            <strong>Dimensión del panel.</strong> Estándar (hasta 2,4 × 3,0 m, compatible con embalaje universal), grande (hasta 2,4 × 6,0 m, requiere embalaje en bastidor tipo A pero cabe en un contenedor de 40 pies high-cube) o jumbo (hasta 3,0 × 15,0 m, requiere contenedores marítimos de plataforma plana o techo abierto y planificación a escala de proyecto). La dimensión interactúa con todo lo que viene después: clase de herrajes, plan de contenedor, método de instalación. Nuestro <a href="/blog/jumbo-architectural-glass-panels" className="text-[#DAA745] hover:underline">análisis detallado de paneles jumbo</a> detalla los requisitos de capacidad.
          </li>
        </ol>
        <p>
          Seis decisiones, seis selectores de opción múltiple. El configurador interactivo a continuación las recorre en orden y genera el código de vidrio al finalizar.
        </p>

        <p>
          <strong>Cómo funciona el configurador:</strong> el componente a continuación es un selector guiado de seis pasos, un atributo por paso. Cada paso muestra las opciones habituales para ese atributo con una nota de una línea sobre cuándo elegir cada una. A medida que realiza sus selecciones, el panel derecho actualiza en tiempo real el código de vidrio compacto y el descriptor completo. Al finalizar, puede copiar ambos al portapapeles y pegarlos en una solicitud de cotización o un correo electrónico. El código de salida sigue la convención del sector: espesor, sufijo de procesado, notación de cámara y posición del recubrimiento; los valores predeterminados corresponden a los pedidos de exportación más habituales de Sincere Glass, no a casos extremos.
        </p>

        <SpecificationBuilder />

        <h2 id="attribute-cascade">Cómo se encadenan los atributos</h2>
        <p>
          Las seis entradas son lo que controla el especificador. Las salidas derivadas son lo que calculan la fábrica, el instalador, el agente de transporte y el ingeniero estructural a partir de esas entradas. En la práctica, seis salidas derivadas son relevantes: peso por metro cuadrado, carga de rotura, valor U, coste por metro cuadrado, clase de herraje y plan de contenedor.
        </p>
        <p>
          La cascada no es simétrica. El espesor por sí solo determina cuatro de las seis salidas; el recubrimiento solo mueve una (valor U, con un efecto secundario sobre el coste). El tamaño del panel parece irrelevante, pero determina tres (transporte, herraje, coste). Comprender qué entradas tienen mayor alcance downstream es lo que permite a un comprador priorizar dónde concentrar el esfuerzo de especificación y dónde los valores predeterminados son suficientes.
        </p>

        <p>
          <strong>Cómo funciona el diagrama de cascada:</strong> el componente a continuación es un grafo de nodos en dos columnas. La columna izquierda lista los seis atributos de entrada que usted especifica. La columna derecha lista las seis salidas derivadas que calculan la fábrica y el instalador. Al pasar el cursor sobre una entrada, se resaltan todas las salidas downstream que influye; al pasar el cursor sobre una salida derivada, se trazan todas las entradas que la alimentan. El panel de detalle bajo el grafo muestra el nodo activo y la regla cuantitativa que conecta ambos lados. El grafo es estático (sin estado) y los resaltados al pasar el cursor son de solo lectura; es un mapa, no una calculadora.
        </p>

        <AttributeCascadeDiagram />

        <h2 id="glass-codes">Lectura y escritura de códigos de vidrio</h2>
        <p>
          La convención del sector para un código de especificación de vidrio compacto se lee de izquierda a derecha como una secuencia física, comenzando por la hoja exterior y avanzando hacia el interior. Los componentes se concatenan con signos más para las cámaras y espacios para la anotación del recubrimiento. Una especificación comercial típica de fachada podría ser:
        </p>
        <p className="my-6 text-center">
          <code className="text-lg text-[#DAA745] bg-[#3A4250]/30 px-4 py-2 rounded-lg inline-block">6T + 12A(Ar) + 6T Low-E#2</code>
        </p>
        <p>
          Leído de izquierda a derecha: una hoja de vidrio templado de 6 mm (exterior), una cámara de 12 mm con relleno de argón, una hoja de vidrio templado de 6 mm (interior), con un recubrimiento de vidrio de baja emisividad (Low-E) en la superficie 2 del conjunto. La numeración de superficies cuenta desde la cara exterior hacia el interior: la superficie 1 es la cara exterior de la hoja exterior, la superficie 2 es la cara de la hoja exterior orientada hacia la cámara, la superficie 3 es la cara de la hoja interior orientada hacia la cámara, y la superficie 4 es la cara interior de la hoja interior.
        </p>

        <div className="overflow-x-auto my-6">
          <table aria-label="Referencia de tokens del código de vidrio con notación habitual y su significado" className="w-full text-sm">
            <caption className="text-xs text-[#8B95A5] mb-2 text-left caption-top">
              Referencia de tokens del código de vidrio — notación habitual en esquemas alineados con GB, EN y ASTM. Datos verificados: 2026-10-23.
            </caption>
            <thead>
              <tr className="border-b border-[#3A4250]/40">
                <th scope="col" className="text-left text-[#DAA745] text-xs uppercase tracking-wider py-2 pr-4">Token</th>
                <th scope="col" className="text-left text-[#DAA745] text-xs uppercase tracking-wider py-2 pr-4">Meaning</th>
                <th scope="col" className="text-left text-[#DAA745] text-xs uppercase tracking-wider py-2">Example</th>
              </tr>
            </thead>
            <tbody className="text-[#8B95A5]">
              <tr className="border-b border-[#3A4250]/20">
                <th scope="row" className="text-left font-normal py-2 pr-4 text-[#F2F0ED]"><code>N</code> (número solo)</th>
                <td className="py-2 pr-4">Espesor en milímetros, vidrio recocido por defecto</td>
                <td className="py-2"><code>6</code> = vidrio flotado recocido de 6 mm</td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <th scope="row" className="text-left font-normal py-2 pr-4 text-[#F2F0ED]"><code>NT</code></th>
                <td className="py-2 pr-4">N milímetros de vidrio templado (templado completo)</td>
                <td className="py-2"><code>12T</code> = 12 mm templado</td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <th scope="row" className="text-left font-normal py-2 pr-4 text-[#F2F0ED]"><code>NHS</code></th>
                <td className="py-2 pr-4">N milímetros endurecido térmicamente</td>
                <td className="py-2"><code>6HS</code> = 6 mm endurecido térmicamente</td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <th scope="row" className="text-left font-normal py-2 pr-4 text-[#F2F0ED]"><code>NA</code> or <code>NAr</code></th>
                <td className="py-2 pr-4">N milímetros de cámara, relleno de aire o argón</td>
                <td className="py-2"><code>12A(Ar)</code> = 12 mm cámara de argón</td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <th scope="row" className="text-left font-normal py-2 pr-4 text-[#F2F0ED]"><code>N.NN PVB (polivinil butiral)</code></th>
                <td className="py-2 pr-4">Espesor de lámina intermedia PVB (polivinil butiral) (estándar: 0,38 / 0,76 / 1,52 mm)</td>
                <td className="py-2"><code>6T + 1.52PVB + 6T</code></td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <th scope="row" className="text-left font-normal py-2 pr-4 text-[#F2F0ED]"><code>N.NN SGP (SentryGlas Plus)</code></th>
                <td className="py-2 pr-4">Lámina intermedia ionoplástica SGP (SentryGlas Plus), grado estructural</td>
                <td className="py-2"><code>12T + 1.52SGP + 12T</code></td>
              </tr>
              <tr>
                <th scope="row" className="text-left font-normal py-2 pr-4 text-[#F2F0ED]"><code>Low-E#N</code></th>
                <td className="py-2 pr-4">Recubrimiento de baja emisividad (Low-E) en la superficie N del conjunto (contando del exterior hacia el interior)</td>
                <td className="py-2"><code>Low-E#2</code> = cara interior de la hoja exterior (lado de la cámara)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Un comprador que redacta correctamente el código en la solicitud de cotización elimina aproximadamente el 70 % de la ambigüedad que normalmente resolvemos en la primera respuesta. Un comprador que escribe una descripción en su lugar ("doble acristalamiento con vidrio de baja emisividad (Low-E)") recibe una cotización que es correcta solo por coincidencia. El código de vidrio es la interfaz universal entre el especificador y la fábrica, y vale la pena aprender a leerlo y escribirlo aunque el cronograma de su proyecto incluya un consultor de acristalamiento.
        </p>

        <h2 id="capability-envelope">Capacidad de producción: Sincere Glass frente al sector</h2>
        <p>
          La especificación solo importa si la fábrica puede ejecutarla. El envolvente de capacidad es el límite superior publicado de lo que un fabricante puede producir; es distinto del plazo de entrega y del precio. A continuación comparamos nuestro envolvente de producción en Wuhan frente al rango típico de la industria de nivel medio, en las seis dimensiones que con mayor frecuencia condicionan un proyecto. Estas cifras provienen de nuestros registros de producción de los últimos cuatro trimestres y de nuestros datos de control de calidad ISO 9001, cruzados con las fichas técnicas públicas de otros fabricantes chinos de nivel medio y con los comentarios de nuestros compradores de exportación.
        </p>

        <p>
          <strong>Cómo funciona la matriz:</strong> El componente siguiente muestra seis dimensiones de especificación en dos vistas. La vista de tabla lista el valor típico de la industria, el Estándar Sincere (lo que nos comprometemos a entregar en un pedido normal por contenedor) y el Máximo Sincere (lo que entregamos en contratos a escala de proyecto) para cada dimensión, con una nota que explica la razón física o de proceso detrás del valor. La vista de radar normaliza cada dimensión respecto a su límite superior para que pueda visualizar de un vistazo la forma de nuestro envolvente; en el caso del plazo de entrega, menor es mejor, de modo que un mayor alcance en el eje indica una entrega más rápida. Alterne entre vistas con los botones en la parte superior derecha.
        </p>

        <CapabilityEnvelopeMatrix />

        <CostDisclaimer />

        <h2 id="pitfalls">Cinco errores de especificación que cuestan dinero real</h2>
        <p>
          Patrones que identificamos repetidamente en las solicitudes de cotización entrantes. Cada uno es una corrección de una línea en la hoja de especificaciones; cada uno es también una orden de cambio de cinco cifras si llega a producción sin ser cuestionado.
        </p>
        <ol>
          <li>
            <strong>Ambigüedad en tolerancias.</strong> Una especificación que indica "12 mm" sin nombrar la norma hereda la tolerancia predeterminada de la fábrica. GB 11614 permite ±0,3 mm para espesores de 10 a 12 mm; EN 572-2 lo ajusta a ±0,2 mm; ASTM C1036 Clase 1 permite ±0,4 mm. En una ranura de acristalamiento ajustada, 0,5 mm marca la diferencia entre un panel que encaja y uno que hay que volver a cortar en obra. Solución: indique la norma en la especificación ("12 mm según tolerancia EN 572-2"). Lo desarrollamos en detalle en el <a href="/blog/12mm-tempered-glass-specifications" className="text-[#DAA745] hover:underline">análisis detallado de 12 mm</a>.
          </li>
          <li>
            <strong>Posición de la superficie del recubrimiento.</strong> Una especificación de vidrio de baja emisividad (Low-E) sin número de superficie es ambigua. En una UVA (Unidad de Vidrio Aislante) de doble acristalamiento, el Low-E en la superficie 2 (hoja exterior, lado de la cámara) es la opción predominante para climas de calefacción dominante en el hemisferio norte; el Low-E en la superficie 3 (hoja interior, lado de la cámara) es más habitual en climas de refrigeración dominante. La diferencia en el valor U es pequeña; la diferencia en el Coeficiente de Ganancia de Calor Solar es considerable. Solución: escriba siempre <code>Low-E#2</code> or <code>Low-E#3</code>, no simplemente "con recubrimiento Low-E".
          </li>
          <li>
            <strong>Incompatibilidad de sistemas de unidades.</strong> Planos de taller en milímetros y una hoja de especificaciones que lista los paneles en pulgadas, o a la inversa, resulta en paneles cortados a una dimensión y estructura cortada a la otra. El error es pequeño por panel (1 pulgada = 25,4 mm; una especificación que indica "48 x 72" para 1.219 x 1.829 mm a veces se ejecuta a 48 x 72 mm). Solución: elija un único sistema de unidades por proyecto y fíjelo en el bloque de título de cada plano.
          </li>
          <li>
            <strong>Tratamiento de bordes faltante en paneles de borde expuesto.</strong> Los bordes tal como se cortan no son aceptables para barandillas de vidrio sin marco, mamparas de ducha, marquesinas con fijación puntual ni ninguna otra aplicación en la que el borde del vidrio sea visible o esté al alcance de la mano. Las microfisuras del marcado se convierten en concentradores de tensión en el horno de templado y aumentan el riesgo de rotura en horno. Una especificación que indica "vidrio templado de 12 mm" sin una línea de tratamiento de bordes se cotiza con borde tal como se corta, y el instalador descubre el problema en obra. Solución: especifique bordes esmerilados o pulidos de forma explícita, indicando el grado de pulido (plano pulido, pulido lápiz, biselado) si la aplicación lo requiere.
          </li>
          <li>
            <strong>Jurisdicción normativa no especificada.</strong> Una cotización sin jurisdicción nombrada se fabrica conforme al código chino (GB 15763.2). Para proyectos con destino a la UE, Estados Unidos o Australia, esto puede superar la inspección local, pero cualquier certificación de terceros requerida —marcado CE, ANSI Z97.1, CPSC 1201 o AS/NZS 2208— debe gestionarse antes de la producción con los protocolos de ensayo correctos. Solución: indique la jurisdicción de destino y las certificaciones adicionales requeridas en el encabezado de la especificación.
          </li>
        </ol>

        <LeadMagnetCTA variant="inline" articleSlug={SLUG} title="Gratis: Biblioteca de plantillas de especificación de vidrio arquitectónico" description="Plantillas editables en Word y PDF para especificaciones de vidrio en muro cortina, barandilla de vidrio, mampara de ducha, claraboya y vidrio spandrel. Prellenadas con las cláusulas y normas que su licitación debe referenciar en las jurisdicciones GB, EN, ASTM y AS." />

        <h2 id="spec-to-rfq">De la hoja de especificación a la RFQ</h2>
        <p>
          Una especificación terminada se convierte en cotización en tres pasos. Primero, la fábrica analiza el código de vidrio y el marco de cumplimiento normativo para confirmar la viabilidad dentro del rango de producción. Segundo, calcula el precio por panel a partir del coste del vidrio base, los cargos por procesamiento, la prima de recubrimiento y la clase de embalaje. Tercero, incorpora los ajustes a nivel de proyecto: transporte interior hasta el puerto de carga, documentación de exportación, coordinación de inspección y ajustes por condiciones de pago.
        </p>
        <p>
          Una especificación que supera los tres pasos en la primera lectura obtiene una cotización con precio en un día hábil. Una especificación que se detiene en el paso uno (viabilidad fuera del rango de producción) regresa con una pregunta de alcance. Una especificación que se detiene en el paso dos (ambigüedad en el procesamiento) regresa con una pregunta sobre tolerancias o tratamiento de bordes. Una especificación que se detiene en el paso tres (incumplimiento normativo) regresa con un coste de certificación o un ajuste del plazo de entrega.
        </p>
        <p>
          Nuestra cotización incluye la especificación analizada en la parte superior de la primera página, de modo que los compradores puedan verificar que la fábrica interpretó la especificación tal como se previó antes de que se analice cualquier cifra. Esto pone de manifiesto la mayoría de los errores de interpretación antes de que se conviertan en errores de producción. Para especificaciones que aborden territorio poco familiar, recomendamos revisarlas con nuestra plantilla de especificación gratuita (arriba) y la <a href="/blog/architectural-glass-china-buyer-guide" className="text-[#DAA745] hover:underline">guía del comprador</a> como verificación previa.
        </p>

        <p className="text-sm text-[#8B95A5] mt-6">
          Para una visión completa de cómo la redacción de especificaciones encaja en el ciclo completo de adquisición, consulte nuestra <a href="/blog/architectural-glass-china-buyer-guide" className="text-[#DAA745] hover:underline">guía del comprador</a>. Para los procesos de fabricación que hacen posible cada producto especificado, consulte el <a href="/blog/architectural-glass-manufacturing-guide" className="text-[#DAA745] hover:underline">pilar de fabricación</a>. Para ver cómo las especificaciones se corresponden con aplicaciones reales en construcción, consulte el <a href="/blog/architectural-glass-applications-guide" className="text-[#DAA745] hover:underline">pilar de aplicaciones</a>.
        </p>

        <FAQ items={faqItems} />

        <LeadMagnetCTA variant="footer" articleSlug={SLUG} title="Gratis: Comparativa Global de Códigos de Construcción para Vidrio Arquitectónico" description="Un PDF de 11 páginas en formato comparativo que analiza los requisitos de IBC (Código Internacional de Construcción), EN europeo, GB chino y AS australiano para vidrio arquitectónico en productos templados, laminados, aislantes y de baja emisividad (Low-E). Gratuito para arquitectos, especificadores y equipos de compras." />

        <h2 id="product-deep-dives">Análisis detallados de productos y otros pilares</h2>
        <p>
          Este pilar se sitúa por encima de los análisis detallados del grupo de Productos, cada uno de los cuales toma una decisión de especificación de las seis anteriores y la desarrolla en profundidad.
        </p>
        <ul>
          <li>
            <a href="/blog/12mm-tempered-glass-specifications" className="text-[#DAA745] hover:underline">Especificaciones de vidrio templado de 12 mm</a> — el espesor óptimo para trabajos arquitectónicos de peso medio; envolvente de rendimiento, límites de tamaño de panel, factores de coste y certificaciones.
          </li>
          <li>
            <a href="/blog/sgp-vs-pvb-interlayer-cost" className="text-[#DAA745] hover:underline">Costo de lámina intermedia SGP (SentryGlas Plus) vs PVB (polivinil butiral)</a> — la decisión sobre la lámina intermedia que mueve el precio del vidrio laminado entre 2 y 3 veces y determina el rendimiento estructural tras la rotura.
          </li>
          <li>
            <a href="/blog/jumbo-architectural-glass-panels" className="text-[#DAA745] hover:underline">Paneles de vidrio arquitectónico de gran formato</a> — la decisión de tamaño que genera los cambios más significativos en transporte, herrajes y método de instalación.
          </li>
        </ul>
        <p>
          Para el marco comparativo que decide entre familias de productos, véase el <a href="/blog/architectural-glass-types-guide" className="text-[#DAA745] hover:underline">pilar de tipos de vidrio</a>. Para los procesos de fabricación detrás de cada producto, véase el <a href="/blog/architectural-glass-manufacturing-guide" className="text-[#DAA745] hover:underline">pilar de fabricación</a>. Para conocer cómo las especificaciones de vidrio se corresponden con las zonas reales del edificio, véase el <a href="/blog/architectural-glass-applications-guide" className="text-[#DAA745] hover:underline">pilar de aplicaciones</a>. Para el ciclo de compras en torno a la especificación, véase el <a href="/blog/architectural-glass-china-buyer-guide" className="text-[#DAA745] hover:underline">guía del comprador</a>.
        </p>

        <RelatedProductsCards slugs={article.relatedProductSlugs || ["tempered-glass", "laminated-glass", "insulated-glass", "low-e-glass", "enameled-glass"]} />
      </BlogArticleLayout>
    </>;
}