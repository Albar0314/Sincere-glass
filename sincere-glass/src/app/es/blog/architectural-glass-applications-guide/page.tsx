import type { Metadata } from 'next';
import Link from "@/_i18n/es/components/LocalizedLink";
import { blogArticles } from '@/lib/blog-registry';
import { makeAlternates } from '@/lib/i18n';
import BlogArticleLayout, { generateArticleMetadata, articleJsonLd, type TOCItem } from "@/_i18n/es/components/blog/BlogArticleLayout";
import TLDRBox from "@/_i18n/es/components/blog/TLDRBox";
import RelatedProductsCards from "@/_i18n/es/components/blog/RelatedProductsCards";
import LeadMagnetCTA from "@/_i18n/es/components/blog/blocks/LeadMagnetCTA";
import FAQ from "@/_i18n/es/components/blog/blocks/FAQ";
import ApplicationZoneExplorer from "@/_i18n/es/components/blog/article-12/ApplicationZoneExplorer";
import ApplicationGlassMatrix from "@/_i18n/es/components/blog/article-12/ApplicationGlassMatrix";
import GlazingScheduleReader from "@/_i18n/es/components/blog/article-12/GlazingScheduleReader";
const SLUG = 'architectural-glass-applications-guide';
const article = blogArticles.find(a => a.slug === SLUG)!;
export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`, "es")
};
const toc: TOCItem[] = [{
  id: 'zones',
  text: "Las 6 Zonas de Aplicación de un Edificio",
  level: 2
}, {
  id: 'schedule',
  text: "Cómo Leer un Calendario de Acristalamiento",
  level: 2
}, {
  id: 'framework',
  text: "Aplicación → Vidrio → Marco Normativo",
  level: 2
}, {
  id: 'matrix',
  text: "La Matriz Zona × Producto",
  level: 2
}, {
  id: 'deep-dives',
  text: "Análisis en Profundidad",
  level: 2
}, {
  id: 'coming',
  text: "Aplicaciones Próximamente",
  level: 2
}, {
  id: 'faq',
  text: 'FAQ',
  level: 2
}];
const faqItems = [{
  q: 'Why can\'t I just pick glass by thickness?',
  a: 'Thickness is an output, not an input. The right glass is determined by the application — specifically by the loads it must carry, the failure mode the code demands, and the hardware it mates with. A 10 mm tempered that is perfect for a shower door is forbidden on a frameless balustrade; a 6 mm laminated that works for a residential balcony cannot handle a commercial facade. Start from the application, work through loads and codes, and thickness falls out as a result.'
}, {
  q: 'Which code jurisdictions does Sincere Glass certify to?',
  a: 'We regularly produce for CE/EN markets (Europe, UK, GCC), SGCC-certified for North America (US and Canada), AS/NZS tested for Australia and New Zealand, and GB-certified for domestic China and some Asian markets. For a project in another jurisdiction, we can usually certify to the nearest major standard — Latin America typically accepts CE or SGCC, SE Asia typically accepts GB or EN, and the GCC accepts CE. Always confirm the specific test report required with the local authority before placing the order.'
}, {
  q: 'What does the "#2" in "Low-E#2" mean?',
  a: 'Glass surfaces in an IGU are numbered from outside in: surface #1 is the exterior face of the outboard lite, #2 is the interior face of the outboard lite (inside the cavity), #3 is the exterior face of the inboard lite (also inside the cavity), and #4 is the interior face of the inboard lite (facing the room). Low-E coating position matters: #2 is standard for cooling-dominated climates (keeps solar heat out), #3 is more common in heating-dominated climates (keeps room heat in). Specifying #2 vs #3 changes the SHGC and U-value by roughly 10–15%.'
}, {
  q: 'Do I need laminated glass if I\'m already using tempered?',
  a: 'Depends on the application. Tempered glass is safe when it breaks (small granules instead of daggers), but when it breaks the entire panel is gone. Laminated glass holds fragments in place after breakage — the glass stays in the opening. For overhead applications (skylights), balustrades, structural glass floors, and anywhere a code requires post-breakage retention, laminated is mandatory even if tempered. For shower doors, interior partitions, and simple vision glass in curtain walls, tempered alone is usually sufficient.'
}, {
  q: 'Can I use the same glass build-up across multiple applications in one project?',
  a: 'Only when the loads and codes genuinely align. In practice, one project usually has three to five distinct glass marks — a facade build-up (Low-E IGU), an interior safety build-up (tempered or laminated monolithic), a balustrade build-up (tempered laminated SGP), a shower build-up (monolithic tempered), and sometimes a floor or skylight assembly. Trying to specify a single "project glass" that covers all applications leads either to over-specifying (paying for structural SGP on a simple partition) or under-specifying (putting non-laminated IGU in an overhead application where code requires fallout retention).'
}, {
  q: 'How detailed should my spec be before requesting a quote?',
  a: 'For each glass mark, we need: location in the building, panel dimensions (or range), framing or support type, applicable code jurisdiction, and any special performance requirements (U-value target, acoustic rating, hurricane rating). Even without exact dimensions, these five inputs let us propose the correct build-up and give an accurate price. A spec that says only "10 mm toughened for balcony" without the geometry or line load forces us to assume the worst case and either over-quote or ask the questions anyway.'
}];
export default function Page() {
  const schemas = articleJsonLd(article, faqItems);
  return <>
      {schemas.map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}

      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox takeaways={article.tldr || []} />

        <p>
          La mayoría de las personas que adquieren vidrio arquitectónico llegan a esa decisión por el camino equivocado. Empiezan por el producto ("vidrio templado" o "Low-E") e intentan adaptarlo a su proyecto. El resultado es un programa lleno de vidrio de fachada sobreingeniado y barandillas de vidrio infraingeniadas, porque especificar partiendo del producto omite la pregunta real que hace la normativa: ¿dónde está este vidrio en el edificio y qué función debe cumplir?
        </p>

        <p>
          Esta es la guía central del clúster de Aplicaciones de Sincere Glass. Recorre las seis zonas de aplicación que cubren aproximadamente el 95% de los trabajos de acristalamiento comercial y residencial, muestra cómo un programa de acristalamiento real comprime la decisión en una sola línea, y remite a nuestras guías detalladas para las tres aplicaciones que ya hemos documentado en profundidad. Cada enlace que parte de esta página lleva a un artículo escrito desde la perspectiva de fábrica, redactado desde nuestra planta de producción en Wuhan — el contenido que se busca cuando se necesita la especificación real, no un catálogo de producto.
        </p>

        <h2 id="zones">Las 6 Zonas de Aplicación de un Edificio</h2>

        <p>
          Recorra cualquier edificio comercial moderno y el trabajo con vidrio se articula en seis zonas recurrentes. Cada zona tiene su propia referencia normativa principal, sus propias cargas y su propia composición característica de vidrio. Haga clic en cualquier zona del diagrama a continuación para ver qué se especifica allí y por qué.
        </p>

        <ApplicationZoneExplorer />

        <p>
          Tres de estas zonas — fachada, barandilla de vidrio y mampara de ducha — ya cuentan con guías de compra detalladas. Las otras tres (particiones interiores, claraboyas, suelos de vidrio) están documentadas con menos detalle aquí, pero representan una expansión importante del clúster en los próximos meses. El modelo mental del contratista de acristalamiento es casi siempre zona primero: llega un plano, identifica a qué zona corresponde cada marca de vidrio y solo entonces elige la composición.
        </p>

        <h2 id="schedule">Cómo Leer un Calendario de Acristalamiento</h2>

        <p>
          Un programa de acristalamiento es una tabla en el plano de un arquitecto que lista cada marca de vidrio única del proyecto. Cada fila codifica una especificación completa en una notación que parece críptica hasta que se han leído varios centenares. Las cuatro entradas del programa a continuación son típicas de lo que llega a nuestra fábrica a través del contratista de acristalamiento — haga clic en cualquier fila para decodificar lo que realmente exige la abreviatura.
        </p>

        <GlazingScheduleReader />

        <p>
          Dos símbolos que los compradores malinterpretan con frecuencia: el número de superficie (del #1 al #4 para una UVA (Unidad de Vidrio Aislante); la posición del recubrimiento de vidrio de baja emisividad (Low-E) modifica el FS (Factor Solar) entre un 10 y un 15% según la superficie en que se aplique), y la designación de la lámina intermedia (PVB (polivinil butiral) y SGP (SentryGlas Plus) son indistinguibles en una línea de pedido, pero su comportamiento difiere 100 veces en una aplicación en voladizo). Cuando reciba un programa de un arquitecto, verifique estos dos puntos con el fabricante de vidrio antes de realizar el pedido — un "SGP" ausente o un "#3" en lugar de "#2" puede hacer descarrilar un proyecto en la fase de presentación de documentación.
        </p>

        <h2 id="framework">Aplicación → Vidrio → Marco Normativo</h2>

        <p>
          La decisión nunca fluye en sentido contrario. La secuencia que funciona, siempre:
        </p>

        <ol>
          <li>
            <strong>Identificar la zona de aplicación.</strong> Fachada, interior, barandilla de vidrio, mampara de ducha, claraboya, suelo. Cada una tiene su propia normativa y su propia composición estándar.
          </li>
          <li>
            <strong>Confirmar las cargas.</strong> Presión de viento para la fachada, carga lineal horizontal para la barandilla de vidrio, nieve y granizo para la claraboya, impacto concentrado de persona para la mampara de ducha, carga de uso para el suelo. Estos valores los aporta el ingeniero del proyecto, no el proveedor de vidrio.
          </li>
          <li>
            <strong>Determinar el modo de fallo que exige la normativa.</strong> Resistencia a la caída de fragmentos para el vidrio en posición horizontal superior, capacidad residual tras rotura para la barandilla de vidrio, patrón de rotura segura para las zonas de impacto con personas. Esto es lo que determina si se usa vidrio laminado o vidrio templado.
          </li>
          <li>
            <strong>Seleccionar la composición que satisfaga ambas condiciones.</strong> Espesor, tipo de lámina intermedia
            y posición, posición del recubrimiento, gas en la cavidad, método de enmarcado — todo se desprende de las
            tres decisiones anteriores.
          </li>
          <li>
            <strong>Verifique la certificación.</strong> Marcado CE/SGCC/GB/AS adecuado a la
            jurisdicción del proyecto. Solicite los informes de ensayo antes de emitir la orden de compra, no después.
          </li>
        </ol>

        <p>
          Si no puede trabajar en sentido inverso desde una composición especificada hasta cada una de estas cinco
          decisiones, la especificación está incompleta y probablemente será cuestionada en la
          revisión de administración de obra.
        </p>

        <h2 id="matrix">La Matriz Zona × Producto</h2>

        <p>
          A continuación se presenta la vista condensada de qué productos son estándar, aceptables, poco frecuentes o
          no permitidos en las seis zonas. Úsela como verificación cruzada frente a cualquier cuadro de acristalamientos
          que esté revisando — si una combinación zona/producto está marcada como "no
          permitido" y aparece en la especificación, existe o bien una excepción técnica documentada
          o bien un error de especificación que resolver.
        </p>

        <ApplicationGlassMatrix />

        <p>
          Vale la pena señalar dos patrones. Primero, el vidrio templado monolítico está restringido o prohibido
          en la mayoría de las aplicaciones de "seguridad de vida" (barandilla de vidrio, claraboya, suelo) porque
          al romperse desaparece — no hay retención de fragmentos. La única zona donde
          predomina es la mampara de ducha, porque esta se encuentra por debajo de la altura de la cabeza y
          está delimitada por impermeabilización, lo que acota las consecuencias de la rotura. Segundo, la UVA (Unidad de Vidrio Aislante) y la
          UVA (Unidad de Vidrio Aislante) de baja emisividad (Low-E) dominan las zonas de fachada y cubiertas, pero son explícitamente inapropiadas para
          barandilla de vidrio, mampara de ducha y suelo, aplicaciones donde el vidrio debe ser laminado por su
          comportamiento tras la rotura. El producto "UVA (Unidad de Vidrio Aislante)" y la zona "fachada"
          son casi sinónimos en la práctica comercial moderna; fuera de esas zonas, la UVA (Unidad de Vidrio Aislante) suele
          indicar un error de especificación.
        </p>

        <div className="my-10 bg-gradient-to-r from-[#3A4250]/40 to-[#1C1F26] rounded-xl p-6 border border-[#DAA745]/30">
          <p className="text-sm text-[#F2F0ED] m-0 mb-3">
            ¿Tiene un cuadro de acristalamientos para revisar?
          </p>
          <Link href="/contact" className="inline-block px-5 py-2.5 bg-[#DAA745] text-[#1C1F26] font-bold rounded-lg hover:bg-[#c4963e] transition-colors no-underline">
            Envíenoslo — le cotizamos línea por línea →
          </Link>
        </div>

        <h2 id="deep-dives">Análisis en Profundidad: Tres Aplicaciones Documentadas en Detalle</h2>

        <p>
          Cada guía a continuación es un recorrido desde la perspectiva de fábrica por una zona de aplicación — las
          cargas, los códigos, las composiciones que cotizamos realmente y los errores de compra
          en los que incurren los compradores con mayor frecuencia.
        </p>

        <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/blog/curtain-wall-glass-specification" className="group block p-5 rounded-xl bg-[#3A4250]/20 border border-[#3A4250]/40 hover:border-[#DAA745]/60 transition-colors no-underline">
            <div className="text-[11px] uppercase tracking-wider text-[#DAA745] mb-2">
              Facade
            </div>
            <h3 className="text-base font-semibold text-[#F2F0ED] mb-2 m-0 group-hover:text-[#DAA745] transition-colors">
              Especificación de Vidrio para Muro Cortina
            </h3>
            <p className="text-xs text-[#8B95A5] leading-relaxed m-0">
              Cuatro objetivos (seguridad, térmica, viento, acústica), cuatro composiciones típicas y los
              requisitos de código regionales para vidrio de fachada en altura según IBC (Código Internacional de Construcción)/EN/GB/AS.
            </p>
            <p className="text-xs text-[#DAA745] mt-3 m-0 font-medium">Leer guía →</p>
          </Link>

          <Link href="/blog/balustrade-glass-specification" className="group block p-5 rounded-xl bg-[#3A4250]/20 border border-[#3A4250]/40 hover:border-[#DAA745]/60 transition-colors no-underline">
            <div className="text-[11px] uppercase tracking-wider text-[#DAA745] mb-2">
              Balustrade
            </div>
            <h3 className="text-base font-semibold text-[#F2F0ED] mb-2 m-0 group-hover:text-[#DAA745] transition-colors">
              Especificación de Vidrio para Barandilla
            </h3>
            <p className="text-xs text-[#8B95A5] leading-relaxed m-0">
              El caso de carga lo decide todo. Con marco frente a sin marco, PVB (polivinil butiral) frente a SGP (SentryGlas Plus), clases de péndulo EN 12600
              y las decisiones de herraje que determinan la composición del vidrio.
            </p>
            <p className="text-xs text-[#DAA745] mt-3 m-0 font-medium">Leer guía →</p>
          </Link>

          <Link href="/blog/shower-glass-thickness-guide" className="group block p-5 rounded-xl bg-[#3A4250]/20 border border-[#3A4250]/40 hover:border-[#DAA745]/60 transition-colors no-underline">
            <div className="text-[11px] uppercase tracking-wider text-[#DAA745] mb-2">
              Shower
            </div>
            <h3 className="text-base font-semibold text-[#F2F0ED] mb-2 m-0 group-hover:text-[#DAA745] transition-colors">
              Guía de Espesores de Vidrio para Mamparas de Ducha
            </h3>
            <p className="text-xs text-[#8B95A5] leading-relaxed m-0">
              Qué determina la decisión entre 8/10/12 mm: carga sobre bisagras, ancho de puerta y los cuatro marcos normativos globales para el vidrio de seguridad en mamparas de ducha.
            </p>
            <p className="text-xs text-[#DAA745] mt-3 m-0 font-medium">Leer guía →</p>
          </Link>
        </div>

        <h2 id="coming">Aplicaciones Próximamente</h2>

        <p>
          Las tres guías de aplicación anteriores cubren las zonas con mayor volumen de cotizaciones desde nuestra fábrica de Wuhan. Otros tres análisis en profundidad están en la cola de producción:
        </p>

        <ul>
          <li>
            <strong>Especificación de vidrio para claraboyas</strong> — cargas de nieve y granizo, hojas interiores laminadas obligatorias, resistencia a la caída de fragmentos, y el creciente cambio de PVB (polivinil butiral) a SGP (SentryGlas Plus) en claraboyas sobre zonas públicas.
          </li>
          <li>
            <strong>Especificación de tabiques interiores de vidrio</strong> — objetivos de aislamiento acústico STC (Clase de Transmisión Sonora), vidrio templado frente a vidrio laminado según el tipo de ocupación, métodos de enmarcado, y el tratamiento normativo emergente del vidrio como tabique con clasificación resistente al fuego en oficinas modernas.
          </li>
          <li>
            <strong>Suelos estructurales de vidrio y peldaños de escalera</strong> — composición con triple laminado de SGP (SentryGlas Plus), factores de seguridad ante cargas en uso, acabados superficiales antideslizantes, y el proceso de certificación técnica que distingue un suelo estructural de vidrio de uno meramente decorativo.
          </li>
        </ul>

        <p>
          Para un contexto más amplio sobre cómo se relacionan entre sí los productos de vidrio, nuestra{' '}
          <Link href="/blog/architectural-glass-types-guide">
            guía de compra de tipos de vidrio arquitectónico
          </Link>{' '}
          cubre las cinco familias de productos, y la{' '}
          <Link href="/blog/architectural-glass-manufacturing-guide">
            guía de fabricación de vidrio arquitectónico
          </Link>{' '}
          recorre los tres procesos de fabricación (templado, laminado y ensamblaje de UVA (Unidad de Vidrio Aislante)) que dan lugar a todos los productos de esta matriz.
        </p>

        <LeadMagnetCTA title="PDF de Comparación Global de Normativas de Construcción con Vidrio" description="Una referencia comparativa de 20 páginas en formato paralelo que compara los requisitos normativos de vidrio arquitectónico según IBC (Código Internacional de Construcción), EN, GB y AS, organizada por zona de aplicación." />

        <FAQ items={faqItems} />

        {article.buyerFaq && article.buyerFaq.length > 0 && <FAQ items={article.buyerFaq} title="Adquisición y Entrega" />}

        <RelatedProductsCards slugs={article.relatedProductSlugs || []} />
      </BlogArticleLayout>
    </>;
}