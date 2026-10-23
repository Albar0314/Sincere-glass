import type { Metadata } from 'next';
import Link from "@/_i18n/es/components/LocalizedLink";
import { blogArticles } from '@/lib/blog-registry';
import { makeAlternates } from '@/lib/i18n';
import BlogArticleLayout, { generateArticleMetadata, articleJsonLd, type TOCItem } from "@/_i18n/es/components/blog/BlogArticleLayout";
import TLDRBox from "@/_i18n/es/components/blog/TLDRBox";
import RelatedProductsCards from "@/_i18n/es/components/blog/RelatedProductsCards";
import LeadMagnetCTA from "@/_i18n/es/components/blog/blocks/LeadMagnetCTA";
import FAQ from "@/_i18n/es/components/blog/blocks/FAQ";
import LoadCaseSelector from "@/_i18n/es/components/blog/article-11/LoadCaseSelector";
import BuildupLab from "@/_i18n/es/components/blog/article-11/BuildupLab";
import PendulumImpactSimulator from "@/_i18n/es/components/blog/article-11/PendulumImpactSimulator";
const SLUG = 'balustrade-glass-specification';
const article = blogArticles.find(a => a.slug === SLUG)!;
export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`, "es")
};
const toc: TOCItem[] = [{
  id: 'load-case',
  text: "El caso de carga lo determina todo",
  level: 2
}, {
  id: 'framed-vs-frameless',
  text: "Con marco vs. sin marco: dos problemas, no uno",
  level: 2
}, {
  id: 'buildups',
  text: "Las tres configuraciones de composición",
  level: 2
}, {
  id: 'pendulum',
  text: "Impacto de péndulo: EN 12600",
  level: 2
}, {
  id: 'codes',
  text: "Mínimos normativos por región",
  level: 2
}, {
  id: 'hardware',
  text: "La elección del herraje condiciona el vidrio",
  level: 2
}, {
  id: 'pitfalls',
  text: "Errores frecuentes en la adquisición",
  level: 2
}, {
  id: 'faq',
  text: 'FAQ',
  level: 2
}];
const faqItems = [{
  q: 'Can I use monolithic tempered glass for a frameless balustrade?',
  a: 'For public access and most commercial applications, no. Both EN 1991-1-1 (UK/EU) and IBC 2407 effectively require laminated construction so that a broken guard retains fragments and offers residual capacity. A monolithic tempered panel can disintegrate at once from a NiS inclusion or edge damage — the guard is simply gone. Monolithic tempered is still used in some private residential balconies with a continuous metal top-rail, where the top-rail becomes the fall-arrest element.'
}, {
  q: 'What is the minimum glass thickness for a 1.1 m-high balcony balustrade?',
  a: 'Thickness is not set by height alone. It is set by (1) horizontal line load at the handrail, (2) infill load across the panel, (3) span between fixings, and (4) mounting type. For a typical residential balcony with a base-shoe mount and 1.1 m span, 8 + 1.52 + 8 mm tempered laminated PVB is the common starting point. For a commercial balcony at the same height but under a 1.5 kN/m line load, the engineer will usually specify 10 + 1.52 + 10 mm tempered laminated with SGP interlayer when the geometry is cantilevered.'
}, {
  q: 'What is the difference between PVB and SGP for balustrade laminated glass?',
  a: 'PVB (polyvinyl butyral) is the standard interlayer in architectural laminated glass. It is soft and holds broken glass fragments in place. SGP (SentryGlas, an ionoplast) is roughly 100× stiffer than PVB at 20°C and about 5× stronger. For a cantilevered or no-top-rail balustrade where the glass is the structural element, SGP keeps the panel standing after both lites break; PVB will sag within hours. Framed balustrades with a continuous top-rail do not usually need SGP.'
}, {
  q: 'Why does EN 12600 use a 50 kg twin-tyre impactor instead of a steel ball?',
  a: 'The twin-tyre bag was designed to simulate a human body impact — the actual failure mode that balustrades protect against. A hard-body ball test (used elsewhere for roofs and skylights) measures a different failure: puncture by debris. Guard duty is about a person falling into or against the glass, which is a soft-body impact spread over an area. The 50 kg mass with twin bicycle-tyre contact pads replicates the force-area distribution of an adult body impact at the specified drop height.'
}, {
  q: 'Do I need heat-soaked tempered glass for balustrades?',
  a: 'In the EU, EN 14179 heat-soaked tempered glass is required or strongly recommended by most national codes for balustrades, specifically to reduce spontaneous breakage from nickel sulphide (NiS) inclusions. The heat-soak process holds tempered glass at ~290°C for several hours, triggering NiS-containing panels to break in the factory rather than years later on site. Outside the EU, heat-soak is sometimes optional but widely specified by engineers. For balustrades specifically, we recommend heat-soaking every lite — the consequence of a mid-service failure far outweighs the ~15% cost premium.'
}, {
  q: 'Can one glass balustrade panel replace both the infill and the top-rail?',
  a: 'Only when the panel is engineered as a structural element — frameless laminated with SGP interlayer, bonded into a structural base shoe or set in point-fixed spigots, and sized to carry the handrail line load as a cantilever. This configuration is permitted in most codes but is explicitly engineered, not a stock product. The build-up is almost always 15 mm + 1.52 SGP + 15 mm or heavier, and the installation requires a certified base channel from a manufacturer with wind/load test certificates.'
}, {
  q: 'What panel sizes can you temper and laminate for balustrades?',
  a: 'Our Wuhan plant tempers up to 3.3 m × 15 m and laminates up to 3.3 m × 15 m — the two jumbo lines are a key capability for frameless commercial projects where a continuous glass guard is architecturally specified without vertical joints. For most residential balustrades (panel width 1.0–1.5 m), size is not the constraint — glass make-up and heat-soak are.'
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
          Especificar vidrio para barandilla de vidrio falla de manera predecible. El arquitecto escribe "12 mm templado" en un plano, el fabricante lo cotiza, y seis meses después un ingeniero advierte que la composición no superará el ensayo de péndulo local — o peor aún, que el producto elegido no ofrece protección post-rotura en una geometría en voladizo. La solución implica un rediseño y un sobrecosto.
        </p>

        <p>
          La causa raíz es casi siempre la misma: la especificación se redactó desde el lado del vidrio ("¿qué espesor necesito?") en lugar de desde el lado de la carga ("¿qué carga soporta esta barandilla y qué ocurre cuando se rompe?"). Este artículo invierte ese orden. Comenzamos por cómo se definen las cargas de barandilla en los principales códigos, analizamos las tres configuraciones de composición reales, indicamos qué clase de péndulo supera cada una, y terminamos con las decisiones de herraje que condicionan silenciosamente la composición del vidrio — todo desde la perspectiva de lo que realmente sale de nuestras líneas de templado y laminado en Wuhan.
        </p>

        <h2 id="load-case">El caso de carga lo determina todo</h2>

        <p>
          Cada código de barandilla de vidrio trabaja con cuatro entradas de carga simultáneas:
        </p>

        <ol>
          <li>
            <strong>Carga lineal horizontal</strong> en la parte superior del elemento de protección, aplicada como un valor continuo en kN/m a lo largo del pasamanos.
          </li>
          <li>
            <strong>Carga puntual concentrada</strong>, aplicado en cualquier punto de la superficie del panel o de la barandilla.
          </li>
          <li>
            <strong>Carga de área de relleno</strong>, aplicada sobre el vidrio como una presión uniformemente distribuida en kN/m².
          </li>
          <li>
            <strong>Impacto de cuerpo blando</strong> — un impacto dinámico que simula a una persona cayendo contra la barandilla de vidrio, ensayado conforme a EN 12600 (Europa) o una norma equivalente en otros mercados.
          </li>
        </ol>

        <p>
          La combinación de estos cuatro factores determina la composición del vidrio — no la altura del panel, no la marca del herraje, no la calificación del proyecto. El selector a continuación muestra los valores para los cuatro casos de uso que cotizamos con mayor frecuencia desde la fábrica.
        </p>

        <LoadCaseSelector />

        <p>
          Un error frecuente: los especificadores seleccionan únicamente la carga puntual e ignoran la carga lineal. La carga lineal es casi siempre el caso crítico en barandillas de vidrio comerciales, porque genera el momento flector en el punto de sujeción del perfil de base, que es donde los paneles de vidrio laminado templado fallan en servicio. Si un procesador de vidrio propone una composición sin preguntarle por la carga lineal, es una señal para proceder con cautela.
        </p>

        <h2 id="framed-vs-frameless">Con marco vs. sin marco: dos problemas, no uno</h2>

        <p>
          Las barandillas de vidrio con marco y sin marco tienen un aspecto similar a distancia. Desde el punto de vista de la ingeniería estructural, son problemas distintos.
        </p>

        <p>
          <strong>Barandillas de vidrio con marco</strong> se apoyan en un perfil superior de metal continuo (y con frecuencia en un canal inferior de metal) para transmitir la carga lineal de la barandilla. El panel de vidrio actúa como elemento de relleno — su función es resistir la presión uniforme de área y el impacto de cuerpo blando, no absorber el momento en voladizo. Esto permite composiciones más ligeras (8-1,52-8 PVB (polivinil butiral) es habitual) y permite que la normativa trate el vidrio como elemento secundario.
        </p>

        <p>
          <strong>Barandillas de vidrio sin marco</strong> no tienen perfil superior en absoluto, o como máximo un perfil de remate que no es estructural. El vidrio es el elemento en voladizo. Transmite la carga lineal de la barandilla mediante su propia rigidez a flexión hasta el punto de sujeción de la base. Esto cambia todo: el espesor del vidrio aproximadamente se duplica, la lámina intermedia de SGP (SentryGlas Plus) pasa a ser el estándar (no PVB (polivinil butiral)), el herraje de sujeción se convierte en un elemento estructural con su propia certificación, y la capacidad residual tras la rotura pasa a ser un requisito normativo en la mayoría de las jurisdicciones. Una barandilla de vidrio sin marco de 1,1 m de altura para uso comercial llega típicamente a 15 + 1,52 SGP (SentryGlas Plus) + 15 mm o superior.
        </p>

        <p>
          El error habitual en la compra es cotizar un proyecto sin marco con los espesores de un sistema con marco, porque los planos no dejaban clara la distinción. Siempre que el pasamanos sea «solo un remate» o esté ausente, trátelo como sin marco y especifique en consecuencia.
        </p>

        <h2 id="buildups">Las tres configuraciones de composición</h2>

        <p>
          En prácticamente todas las cotizaciones de barandillas de vidrio que tramitamos, aproximadamente el 95 % de los paneles se resuelven con una de tres composiciones. El comparador a continuación le permite alternar entre ellas y evaluar las diferencias con honestidad — incluido el multiplicador de coste, que con frecuencia es lo que termina determinando la decisión final.
        </p>

        <BuildupLab />

        <p>
          Una nota sobre la opción de vidrio templado monolítico: sigue apareciendo en algunos anexos nacionales para balcones privados de baja altura con perfil superior de metal continuo, donde dicho perfil es el verdadero elemento de retención de caídas y el vidrio actúa como relleno. Si el vidrio desempeña alguna función de protección — si retirarlo implicaría que una persona pueda caer — la opción de vidrio templado monolítico no debería contemplarse en la práctica actual. La tendencia normativa en la UE, EE. UU., China y Australia durante la última década ha sido endurecer los requisitos contra el vidrio templado monolítico en barandillas de vidrio, precisamente por su comportamiento de fallo de todo o nada.
        </p>

        <div className="my-10 bg-gradient-to-r from-[#3A4250]/40 to-[#1C1F26] rounded-xl p-6 border border-[#DAA745]/30">
          <p className="text-sm text-[#F2F0ED] m-0 mb-3">
            ¿Ya dispone de los valores de carga y un plano de geometría?
          </p>
          <Link href="/contact" className="inline-block px-5 py-2.5 bg-[#DAA745] text-[#1C1F26] font-bold rounded-lg hover:bg-[#c4963e] transition-colors no-underline">
            Solicitar cotización de composición de vidrio para un proyecto específico →
          </Link>
        </div>

        <h2 id="pendulum">Impacto de Péndulo: EN 12600 y su importancia</h2>

        <p>
          EN 12600 es el ensayo europeo de impacto de péndulo y, en la práctica, se ha convertido en la referencia global para el acristalamiento de seguridad en barandillas de vidrio. Un impactador de doble neumático de 50 kg (diseñado para simular el impacto blando de un cuerpo humano, no de un proyectil) se suelta desde tres alturas — 190 mm, 450 mm, 1200 mm — que representan niveles crecientes de energía de impacto. El vidrio se clasifica según la clase más alta que supera sin rotura peligrosa.
        </p>

        <PendulumImpactSimulator />

        <p>
          Para trabajos de barandilla de vidrio, la caída de Clase 1(B)1 a 1200 mm es la que determina el requisito. La mayoría de los códigos exigen Clase 1(B)1 para barandillas sin marco y en cualquier zona de acceso público. La Clase 2(B)2 a 450 mm se acepta para barandillas residenciales con marco en la mayoría de las jurisdicciones. La Clase 3 es irrelevante para uso como protección — ensaya una caída de 190 mm, muy por debajo de la energía de impacto de un adulto contra la barandilla.
        </p>

        <p>
          Dos aspectos que suelen sorprender a los compradores: primero, EN 12600 es un ensayo sobre probeta, no sobre sistema. Una composición que supera la Clase 1 como probeta aislada puede fallar en servicio si el hardware de fijación o la geometría del panel genera concentraciones de tensión no cubiertas por el ensayo. Segundo, fuera de la UE, los códigos locales suelen citar EN 12600 por referencia (la GB 15763.3 de China y la AS/NZS 2208 de Australia emplean ensayos análogos pero no idénticos). Confirme siempre qué norma específica acepta la jurisdicción del proyecto antes de certificar el vidrio.
        </p>

        <h2 id="codes">Mínimos normativos por región</h2>

        <p>
          Cuatro sistemas normativos abarcan aproximadamente el 85% de los trabajos de barandilla de vidrio que exportamos. La intención es similar en todos ellos; los valores específicos y las composiciones permitidas no lo son.
        </p>

        <ul>
          <li>
            <strong>Estados Unidos — IBC (Código Internacional de Construcción) 2407 + ASCE 7-22 §4.5.1.</strong> Las barandillas con acceso público requieren una carga lineal horizontal de 0,73 kN/m (0,9 kN/m en algunas ocupaciones); carga concentrada de 0,89 kN. Las barandillas de vidrio en aplicaciones comerciales deben utilizar vidrio laminado con resistencia residual suficiente para continuar soportando la carga tras la rotura de una o más hojas. El vidrio templado monolítico solo se permite cuando cuenta con el respaldo de un pasamanos superior capaz de soportar la carga total en caso de rotura del vidrio.
          </li>
          <li>
            <strong>Unión Europea — EN 1991-1-1 + EN 12600 + anexos nacionales.</strong> Cargas lineales horizontales desde 0,5 kN/m (Categoría A, vivienda) hasta 5,0 kN/m (Categoría C5, zonas de concentración de personas). EN 12600 Clase 2(B)2 como mínimo para uso residencial con marco, Clase 1(B)1 para instalaciones sin marco o de acceso público. EN 14179 vidrio templado con ensayo de choque térmico fuertemente recomendado o exigido para barandillas de vidrio templado en la mayoría de los estados miembros.
          </li>
          <li>
            <strong>China — GB 50210 + GB 15763.3 + JGJ 113.</strong> El vidrio de barandilla debe ser laminado en edificios de más de 5 m de altura y en cualquier aplicación donde la altura de caída supere los 5 m. El vidrio templado solo no se acepta en barandillas sin marco. El producto habitualmente especificado es vidrio laminado templado de mínimo 8+1,52+8 mm para uso residencial, y de mayor espesor para uso comercial.
          </li>
          <li>
            <strong>Australia / Nueva Zelanda — AS 1288 §7.</strong> Tablas prescriptivas de composición según altura del panel, tipo de fijación y categoría de carga. Se exige vidrio de seguridad Grado A (vidrio templado o vidrio laminado) para todo acristalamiento de protección. Las barandillas sin marco requieren construcción laminada. La lámina intermedia SGP (SentryGlas Plus) se recomienda expresamente para aplicaciones en voladizo por encima de 1 m.
          </li>
        </ul>

        <p>
          Al exportar desde China a una de estas jurisdicciones, entregamos el vidrio con la certificación correspondiente: marcado CE para la UE (EN 12600 + EN 14449 para vidrio laminado), informes SGCC y equivalentes SGCC para EE. UU., ISO 9001 y la certificación CCC china para referencia en el mercado nacional, e informes de ensayo equivalentes a NATA para Australia. Solicite los informes de ensayo antes de emitir una orden de compra, no después: un fabricante que no pueda presentar el informe correcto para su jurisdicción retrasará el proyecto en la inspección.
        </p>

        <LeadMagnetCTA title="PDF de Comparación Global de Normativas de Construcción con Vidrio" description="Una referencia comparativa de 20 páginas con los requisitos de vidrio para barandilla de vidrio y vidrio arquitectónico según los códigos IBC (Código Internacional de Construcción), EN, GB y AS. Úsela para especificar desde cualquier jurisdicción." />

        <h2 id="hardware">La elección del herraje condiciona el vidrio</h2>

        <p>
          La composición del vidrio y los herrajes de montaje no son decisiones independientes. Tres familias comunes de herrajes orientan la especificación del vidrio en tres direcciones distintas.
        </p>

        <p>
          <strong>Zapata de base (perfil en U).</strong> Un perfil continuo de aluminio o acero inoxidable que sujeta el canto inferior del vidrio con resina estructural. Este es el montaje comercial estándar: distribuye el momento flector de forma uniforme a lo largo de la base del panel, lo que permite la composición más delgada viable para la carga de diseño. Inconveniente: el perfil queda visible como una banda de 100–150 mm a nivel del suelo, lo que algunos diseñadores rechazan por razones estéticas.
        </p>

        <p>
          <strong>Herrajes de punto fijo (standoff).</strong> Barras de acero inoxidable tipo standoff pasan a través de orificios perforados en el vidrio. Visualmente limpias, pero estructuralmente más exigentes para el vidrio, ya que el estrés se concentra en torno a cada orificio. La composición generalmente sube un escalón (de 8+1.52+8 a 10+1.52+10) y los orificios deben posicionarse conforme a las reglas de distancia al borde de ANSI Z97.1 o EN 12150. La lámina intermedia SGP (SentryGlas Plus) se especifica casi siempre, ya que el PVB (polivinil butiral) puede desgarrarse en las concentraciones de estrés alrededor de los orificios.
        </p>

        <p>
          <strong>Montajes tipo spigot.</strong> Postes verticales cortos sujetan el vidrio en dos o tres puntos discretos a lo largo del canto inferior. Es una solución habitual en cercas de piscinas y algunas barandillas de vidrio interiores comerciales. Las cargas se concentran en cada spigot, por lo que el vidrio experimenta una flexión local elevada en esas zonas de contacto. La composición mínima es típicamente 12 mm de vidrio templado monolítico (donde los códigos lo permiten) o 12+1.52+12 de vidrio laminado para paneles de mayor altura.
        </p>

        <p>
          Si un proveedor de herrajes cotiza una composición de vidrio sin especificar su sistema de montaje en el mismo documento, trate la cotización como incompleta. Todo sistema certificado de barandilla de vidrio es un conjunto diseñado de vidrio + montaje, y sustituir cualquiera de las dos partes sin un nuevo cálculo invalida la certificación.
        </p>

        <h2 id="pitfalls">Errores frecuentes en la adquisición</h2>

        <ol>
          <li>
            <strong>Escribir "12 mm templado" en el plano.</strong> Especificar solo por espesor obliga al fabricante a suponer la carga de diseño. La cotización vuelve con la composición mínima permisible para una aplicación residencial genérica, y el ingeniero la rechaza en la revisión de documentación. En su lugar, especifique la carga lineal en el pasamanos (kN/m), la altura de caída, el tipo de montaje, y deje que el fabricante proponga la composición.
          </li>
          <li>
            <strong>Omitir el ensayo de choque térmico en vidrio templado laminado.</strong> Una rotura por NiS en una fachada laminada sin marco de 15 m implica reemplazar una hoja que suele ser una dimensión especial de fábrica con un plazo de entrega de 10 a 12 semanas. El ensayo de choque térmico de las hojas de vidrio templado añade aproximadamente un 15% al coste base y elimina prácticamente todo riesgo de rotura espontánea tras la instalación. Para barandillas de vidrio en particular, lo consideramos no negociable.
          </li>
          <li>
            <strong>PVB (polivinil butiral) donde se requiere SGP (SentryGlas Plus).</strong> PVB (polivinil butiral) y SGP (SentryGlas Plus) parecen idénticos en una línea de cotización y con frecuencia difieren en apenas 1–3 USD/m² en el coste de la lámina intermedia. El comportamiento estructural difiere en 100× en rigidez y 5× en retención tras rotura. Si la geometría es en voladizo o el perfil superior está ausente, SGP es la respuesta independientemente del coste. El equipo de compras nunca debe sustituir PVB (polivinil butiral) por SGP (SentryGlas Plus) como medida de ahorro sin que el ingeniero vuelva a firmar el panel.
          </li>
          <li>
            <strong>Templado en lotes mixtos en una producción larga.</strong> Una barandilla de vidrio continua de 30 m entregada en tres lotes de templado mostrará diferencias ópticas visibles entre los lotes bajo luz oblicua: ligeras variaciones de anisotropía, orientación de ondulación de rodillo y desviación de tono. Especifique "templado en lote único" en la orden de compra para cualquier barandilla de vidrio donde los paneles sean visibles en paralelo.
          </li>
          <li>
            <strong>Sin certificado de ensayo de péndulo en el expediente.</strong> Si el fabricante no puede presentar el certificado de ensayo según EN 12600 (o equivalente local) para la composición exacta cotizada, dicha composición no ha sido ensayada, sino inferida a partir de tablas de ingeniería. Para barandillas de vidrio de acceso público, el certificado de ensayo es exigido por normativa, no es opcional. Solicítelo en la fase de cotización.
          </li>
        </ol>

        <p>
          Para contextualizar dónde encaja esto en el panorama más amplio del vidrio arquitectónico, nuestra{' '}
          <Link href="/blog/architectural-glass-types-guide">
            guía de compra de tipos de vidrio arquitectónico
          </Link>{' '}
          expone las cinco familias de productos, y la{' '}
          <Link href="/blog/curtain-wall-glass-specification">
            guía de especificación de vidrio para muro cortina
          </Link>{' '}
          aborda el problema relacionado, aunque distinto, del vidrio para fachada exterior. Para aplicaciones en baños donde el vidrio está orientado horizontalmente respecto al usuario en lugar de verticalmente, la{' '}
          <Link href="/blog/shower-glass-thickness-guide">
            guía de espesor de vidrio para mampara de ducha
          </Link>{' '}
          desarrolla el árbol de decisión equivalente.
        </p>

        <FAQ items={faqItems} />

        {article.buyerFaq && article.buyerFaq.length > 0 && <FAQ items={article.buyerFaq} title="Adquisición y Entrega" />}

        <RelatedProductsCards slugs={article.relatedProductSlugs || []} />
      </BlogArticleLayout>
    </>;
}