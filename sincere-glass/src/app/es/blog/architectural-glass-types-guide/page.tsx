import { blogArticles, type BlogArticle } from '@/lib/blog-registry';
import BlogArticleLayout, { generateArticleMetadata, articleJsonLd, type TOCItem } from "@/_i18n/es/components/blog/BlogArticleLayout";
import TLDRBox from "@/_i18n/es/components/blog/TLDRBox";
import LeadMagnetCTA from "@/_i18n/es/components/blog/LeadMagnetCTA";
import RelatedProductsCards from "@/_i18n/es/components/blog/RelatedProductsCards";
import { FAQ, TechNote } from "@/_i18n/es/components/blog/blocks";
import GlassFamilyMap from "@/_i18n/es/components/blog/pillar-arch-glass/GlassFamilyMap";
import GlassSelectorFlowchart from "@/_i18n/es/components/blog/pillar-arch-glass/GlassSelectorFlowchart";
const SLUG = 'architectural-glass-types-guide';
const article: BlogArticle = blogArticles.find(a => a.slug === SLUG)!;
export const metadata = generateArticleMetadata(article);
const toc: TOCItem[] = [{
  id: 'selector',
  text: "Comience aquí: Selector de Vidrio",
  level: 2
}, {
  id: 'families',
  text: "Las 5 familias del vidrio arquitectónico",
  level: 2
}, {
  id: 'annealed-family',
  text: "1. Vidrio flotado recocido",
  level: 3
}, {
  id: 'tempered-family',
  text: "2. Vidrio templado",
  level: 3
}, {
  id: 'laminated-family',
  text: "3. Vidrio laminado",
  level: 3
}, {
  id: 'insulated-family',
  text: "4. Vidrio aislante (UVA)",
  level: 3
}, {
  id: 'coated-family',
  text: "5. Vidrio con recubrimiento (Low-E / Esmaltado)",
  level: 3
}, {
  id: 'by-application',
  text: "Por aplicación: qué especificar y dónde",
  level: 2
}, {
  id: 'checklist',
  text: "Lista de verificación de compras para compradores",
  level: 2
}, {
  id: 'faq',
  text: 'FAQ',
  level: 2
}];
const faqItems = [{
  q: 'What is the most common type of architectural glass?',
  a: 'Tempered glass is the most commonly specified architectural glass worldwide because most building codes require safety glass in doors, shower enclosures, low windows, railings, and other impact-prone locations. For commercial facades and energy-efficient buildings, insulated glass units (IGUs) with Low-E coating are now the baseline specification.'
}, {
  q: 'Can I combine multiple types of glass in a single pane?',
  a: 'Yes — the most common combinations are tempered laminated (impact strength + fragment retention) and laminated IGU (safety + thermal). Our 20,000 m² Wuhan facility runs both tempering and lamination lines in parallel, so we can produce combined units in one production flow. This is standard for high-end facades and overhead installations.'
}, {
  q: 'How do I know which glass type my building code requires?',
  a: 'Most national building codes (IBC in the US, GB 50210 in China, EN 12600 in EU, AS 1288 in Australia) define "hazardous locations" where safety glass is mandatory — doors, shower enclosures, low windows, railings, overhead glazing. Our free "Global Architectural Glass Building Codes Comparison" PDF covers all four systems side by side (link in the article above).'
}, {
  q: 'Does Sincere Glass handle both domestic and export orders?',
  a: 'Our two Wuhan facilities (武汉欣城 and 湖北欣之城) have 15+ years of domestic market experience and are now building export capability. We produce 3C-certified glass per Chinese national standards, with test reports available for ASTM C1048, EN 12150, and AS/NZS 2208 compliance review. MOQ for export orders is 50 m².'
}, {
  q: "What's the typical lead time for custom architectural glass orders?",
  a: 'Our standard production cycles from order confirmation: annealed cuts 3-7 working days, tempered 7-12 days, laminated 10-15 days, insulated glass units 10-15 days, combined laminated IGU 15-20 days. Low-E coating availability can add 5-7 days for specialty coatings. All lead times exclude ocean freight transit.'
}];
export default function Page() {
  return <>
      {articleJsonLd(article, faqItems).map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}

      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox takeaways={['Architectural glass splits into 5 functional families: annealed (raw), tempered (safety strength), laminated (safety retention), insulated (energy), and coated (Low-E / decorative).', 'The selection logic is not about "which is best" — it is about which failure mode you cannot accept: impact injury, falling fragments, heat loss, or UV damage.', 'Most modern buildings use 2-3 types in combination (e.g., tempered doors + laminated overhead + insulated windows). Few projects spec a single type throughout.', 'Our 20,000 m² facility produces all 5 families in-house, including combined laminated-IGU on our 3m × 15m jumbo lines — among the largest in Hubei province.', 'This guide covers all 5 families, links to deep-dive comparison articles, and ends with an interactive selector tool and a procurement checklist.']} />

        <p>
          "¿Qué tipo de vidrio debo usar?" es una pregunta sin respuesta universal: depende
          de lo que el vidrio necesite hacer. Una mampara de ducha, un muro cortina, una
          claraboya y un panel decorativo de vidrio spandrel tienen modos de falla distintos,
          requisitos normativos distintos y una economía de rendimiento distinta. Elegir mal
          supone, en el mejor caso, un desperdicio de dinero y, en el peor, un riesgo para
          vidas humanas.
        </p>

        <p>
          Esta guía es el punto de entrada para la selección de vidrio arquitectónico: un mapa
          de las 5 familias funcionales, un selector interactivo que formula las preguntas
          correctas, enlaces a nuestros artículos comparativos completos y una lista de
          verificación de compras que puede entregar a su proveedor. Está redactada desde la
          perspectiva de un fabricante chino de tamaño medio especializado en la transformación
          de vidrio flotado que produce las 5 familias en una sola instalación — no desde la
          perspectiva de un catálogo de productos donde "todo el vidrio es premium."
        </p>

        <h2 id="selector">Empiece aquí: Selector interactivo de vidrio</h2>

        <p>
          Si desea una respuesta rápida sin leer la guía completa, utilice el selector a continuación. Plantea tres preguntas y recomienda un tipo de vidrio según su prioridad principal. Cada resultado enlaza con la página de producto correspondiente y el artículo de análisis detallado.
        </p>

        <GlassSelectorFlowchart />

        <TechNote type="tip" title="La lógica del selector">
          <p>
            Las tres ramas principales — seguridad, energía y apariencia — corresponden a los tres objetivos de ingeniería dominantes en el acristalamiento arquitectónico. Casi todos los proyectos reales están determinados por uno de estos, con los otros dos como restricciones secundarias. Partir desde ahí, en lugar de preguntarse "¿qué espesor necesito?", evita el 90% de los errores de especificación.
          </p>
        </TechNote>

        <h2 id="families">Las 5 familias del vidrio arquitectónico</h2>

        <p>
          Todos los productos de vidrio arquitectónico pertenecen a una de estas cinco familias. Pase el cursor sobre cada círculo para obtener una breve descripción y un enlace para profundizar:
        </p>

        <GlassFamilyMap />

        <p>
          Las conexiones del mapa anterior no son arbitrarias. <strong>Annealed</strong> en la parte superior está la materia prima — todas las demás familias parten de una hoja de vidrio flotado recocido. <strong>Tempered</strong> and <strong>laminated</strong> son las dos versiones de vidrio de seguridad mejorado, cada una orientada a un modo de fallo diferente. <strong>Insulated</strong> las unidades se construyen con hojas de vidrio templado o vidrio laminado (nunca vidrio recocido, por razones de seguridad).{' '}
          <strong>Coated</strong> el vidrio es un tratamiento superficial que puede aplicarse a cualquiera de las otras familias, pero se utiliza con mayor frecuencia como vidrio de baja emisividad (Low-E) en el interior de una UVA (Unidad de Vidrio Aislante).
        </p>

        <h3 id="annealed-family">1. Vidrio flotado recocido — La materia prima</h3>

        <p>
          El vidrio recocido es el producto directo de una línea de vidrio flotado: vidrio fundido extendido sobre un lecho de estaño fundido, enfriado lentamente a través de un horno de recocido y suministrado en hojas planas. Presenta una tensión residual prácticamente nula, lo que facilita su corte y procesamiento, pero también implica que se rompe en fragmentos grandes y peligrosos ante un impacto.
        </p>

        <p>
          El vidrio recocido es la opción correcta para marcos de obras de arte en interiores, ventanas en plantas superiores fuera de las zonas de riesgo definidas por normativa, acristalamiento de invernaderos (donde los ciclos térmicos someterían al vidrio templado a rotura espontánea) y cualquier aplicación en la que el comprador necesite cortar o perforar el vidrio tras la adquisición.
        </p>

        <p className="text-sm">
          <strong>Análisis en profundidad:</strong>{' '}
          <a href="/blog/tempered-glass-vs-annealed-glass">
            Vidrio templado frente a vidrio recocido: por qué el vidrio "estándar" no es suficientemente seguro para la mayoría de los edificios modernos
          </a>
        </p>

        <h3 id="tempered-family">2. Vidrio templado — El estándar de seguridad</h3>

        <p>
          El vidrio templado es vidrio recocido que ha sido recalentado a aproximadamente 620 °C y sometido a enfriamiento rápido mediante chorros de aire a alta presión. Esto genera tensión de compresión en la superficie (~180 MPa) y tensión de tracción en el núcleo, lo que confiere al vidrio una resistencia 4-5 veces superior a la del vidrio recocido y — más importante aún — un patrón de rotura granular seguro en lugar de fragmentos grandes.
        </p>

        <p>
          Nuestro horno de templado de 3 m × 15 m se encuentra entre los más grandes de la provincia de Hubei, lo que nos permite suministrar vidrio templado para muros cortina de gran formato y fachadas de dimensiones excepcionales que fábricas más pequeñas no pueden producir. El vidrio templado es la especificación obligatoria para puertas, mamparas de ducha, ventanas bajas y barandillas de vidrio en prácticamente todos los códigos de edificación del mundo.
        </p>

        <p className="text-sm">
          <strong>Página del producto:</strong>{' '}
          <a href="/products/tempered-glass">Detalles y especificaciones del producto Vidrio Templado</a>
        </p>

        <h3 id="laminated-family">3. Vidrio Laminado — Retención de Fragmentos</h3>

        <p>
          El vidrio laminado está compuesto por dos o más hojas de vidrio unidas de forma permanente mediante una lámina intermedia polimérica — generalmente PVB (polivinil butiral) o SGP (SentryGlas Plus), la lámina intermedia estructural de DuPont. La lámina intermedia cumple una doble función: amortigua el ruido aéreo (mejorando la clasificación STC (Clase de Transmisión Sonora) entre 3 y 5 puntos respecto al vidrio simple) y retiene los fragmentos de vidrio roto tras un impacto.
        </p>

        <p>
          El vidrio laminado es obligatorio por normativa para acristalamientos en overhead (IBC (Código Internacional de Construcción) §2405.5), regiones propensas a huracanes y ciclones, suelos de vidrio estructural y la mayoría de escaparates. La variante con SGP (SentryGlas Plus) ofrece resistencia suficiente a la entrada forzada como para clasificarse como acristalamiento antirrobo.
        </p>

        <p className="text-sm">
          <strong>Análisis en profundidad:</strong>{' '}
          <a href="/blog/tempered-glass-vs-laminated-glass">
            Vidrio Templado vs Vidrio Laminado: 7 Diferencias que los Compradores Deben Conocer
          </a>{' '}
          · <strong>Página del producto:</strong>{' '}
          <a href="/products/laminated-glass">Detalles del Vidrio Laminado</a>
        </p>

        <LeadMagnetCTA variant="inline" articleSlug="architectural-glass-types-guide" />

        <h3 id="insulated-family">4. Vidrio Aislante (UVA) — Rendimiento Energético</h3>

        <p>
          Una unidad de vidrio aislante (UVA) está compuesta por dos o más hojas de vidrio separadas por una cámara sellada rellena de gas inerte (típicamente argón) y delimitada por un perfil separador de borde cálido. El problema técnico que resuelve es la transferencia de calor: una UVA básica de configuración 6+12A+6 alcanza un valor U de 2,6–2,8 W/m²·K; con recubrimiento de vidrio de baja emisividad (Low-E), este valor desciende a 1,4–1,8 — una mejora del 70 % respecto al acristalamiento de hoja simple.
        </p>

        <p>
          Las UVA son la especificación de referencia para torres de oficinas comerciales, ventanas residenciales en climas templados y fríos, y cualquier edificio donde los costes de climatización representen un gasto operativo significativo. En fachadas premium que combinan UVA con vidrio laminado de seguridad, el resultado es una "UVA laminada" — la configuración que recomendamos para proyectos de alta gama.
        </p>

        <p className="text-sm">
          <strong>Análisis en profundidad:</strong>{' '}
          <a href="/blog/insulated-glass-vs-laminated-glass">
            Vidrio Aislante vs Vidrio Laminado: ¿Cuál Necesita Realmente su Proyecto?
          </a>{' '}
          · <strong>Página del producto:</strong>{' '}
          <a href="/products/insulated-glass">Detalles del Vidrio Aislante</a>
        </p>

        <h3 id="coated-family">5. Vidrio con Recubrimiento — Baja Emisividad y Esmaltado</h3>

        <p>
          El vidrio con recubrimiento es una categoría definida por el tratamiento superficial más que por el método estructural. Las dos categorías más relevantes para los compradores de vidrio arquitectónico son:
        </p>

        <ul>
          <li>
            <strong>Recubrimiento de baja emisividad (Low-E)</strong> — una capa metálica microscópicamente delgada (recubrimiento por pulverización catódica de capa blanda o recubrimiento pirolítico de capa dura) que refleja el calor infrarrojo mientras transmite la luz visible. Se utiliza casi exclusivamente en la superficie n.º 2 o n.º 3 de una UVA (Unidad de Vidrio Aislante) para mejorar el rendimiento térmico.
          </li>
          <li>
            <strong>Vidrio esmaltado (vidrio con frita cerámica)</strong> — tinta cerámica cocida sobre la superficie del vidrio a temperatura de templado, creando un color o patrón decorativo permanente. Se utiliza en paneles spandrel (zonas opacas de un muro cortina que ocultan los forjados), paredes de diseño y aplicaciones decorativas.
          </li>
        </ul>

        <p className="text-sm">
          <strong>Páginas de producto:</strong>{' '}
          <a href="/products/low-e-glass">Vidrio de baja emisividad (Low-E)</a>{' '}·{' '}
          <a href="/products/enameled-glass">Vidrio esmaltado</a>
        </p>

        <h2 id="by-application">Por aplicación: qué especificar y dónde</h2>

        <p>
          A partir de las 5 familias de productos, presentamos las soluciones que arquitectos y especificadores eligen habitualmente para las aplicaciones constructivas más comunes. Estas son nuestras recomendaciones basadas en la experiencia de fabricación — cumplen los requisitos normativos y los superan cuando la calidad así lo justifica.
        </p>

        <ul>
          <li>
            <strong>Muros cortina (edificios comerciales en altura):</strong> UVA (Unidad de Vidrio Aislante) laminada con recubrimiento de baja emisividad (Low-E). Rendimiento térmico para el ahorro en climatización; hoja exterior laminada para seguridad frente a caídas y reserva de resistencia a la carga de viento.
          </li>
          <li>
            <strong>Ventanas residenciales (clima templado):</strong> Vidrio aislante con recubrimiento de baja emisividad (Low-E). Relleno de argón si el presupuesto lo permite. Sin capa laminada salvo que el ruido de la calle sea un factor específico.
          </li>
          <li>
            <strong>Mamparas de ducha y puertas de vidrio:</strong> Vidrio templado, espesor mínimo de 8 mm, con pulido de bordes. La versión laminada añade protección UV y retención de fragmentos en diseños sin marco.
          </li>
          <li>
            <strong>Claraboyas y acristalamiento en planos superiores:</strong> Vidrio laminado (obligatorio según IBC §2405.5) — normalmente vidrio laminado templado para combinar resistencia al impacto y retención de fragmentos.
          </li>
          <li>
            <strong>Barandillas y barandillas de vidrio:</strong> El vidrio laminado templado es el estándar.
            La normativa exige tanto resistencia de seguridad como retención de fragmentos en el acristalamiento estructural.
          </li>
          <li>
            <strong>Paneles spandrel (zonas opacas de fachada):</strong> Vidrio esmaltado templado
            con frita cerámica en la superficie #2 (cara interior). Color coordinado con el diseño de la fachada.
          </li>
          <li>
            <strong>Escaparates y acristalamiento comercial:</strong> Vidrio laminado con lámina intermedia SGP (SentryGlas Plus)
            para seguridad; vidrio templado como alternativa económica en zonas de bajo riesgo.
          </li>
          <li>
            <strong>Particiones interiores (sin requisito de seguridad):</strong> Vidrio recocido si la ubicación se encuentra
            fuera de las zonas peligrosas definidas por la normativa; vidrio templado si la partición incluye una puerta o está
            a menos de 24 in de una zona de paso.
          </li>
        </ul>

        <h2 id="checklist">Lista de verificación de compras para compradores</h2>

        <p>
          Cuando solicite cotización de vidrio arquitectónico — a Sincere Glass o a cualquier proveedor
          — estas son las especificaciones que deben figurar en sus planos. Si falta alguna de ellas,
          la cotización se basará en supuestos, lo que genera problemas en la entrega:
        </p>

        <ul>
          <li>
            <strong>Tipo de vidrio</strong> — vidrio recocido / vidrio templado / vidrio laminado / UVA (Unidad de Vidrio Aislante) / configuración combinada
            (p. ej., "UVA laminado templado: 6 mm Low-E templado + 12 mm argón + 6 mm templado incoloro + 1,52 mm PVB (polivinil butiral) + 6 mm templado incoloro")
          </li>
          <li>
            <strong>Espesor por hoja</strong> — cada hoja de vidrio del conjunto por separado
          </li>
          <li>
            <strong>Dimensiones totales</strong> — Ancho × Alto por hoja, y cantidad total
          </li>
          <li>
            <strong>Tratamiento de bordes</strong> — pulido / esmerilado / arrisado / expuesto
          </li>
          <li>
            <strong>Ubicación y tamaño de perforaciones</strong> — si aplica; debe especificarse antes del templado
          </li>
          <li>
            <strong>Especificación de recubrimiento</strong> — tipo de vidrio de baja emisividad (Low-E) (capa blanda / capa dura), superficie de recubrimiento (n.º 2 o n.º 3), objetivos de valor U y FS (Factor Solar)
          </li>
          <li>
            <strong>Especificación de lámina intermedia</strong> — PVB (polivinil butiral) / SGP (SentryGlas Plus) / PVB (polivinil butiral) acústico; espesor en mm
          </li>
          <li>
            <strong>Relleno de gas</strong> — aire / relleno de argón / relleno de criptón (para UVA (Unidad de Vidrio Aislante))
          </li>
          <li>
            <strong>Tipo de perfil separador</strong> — aluminio / perfil separador de borde cálido (TPS, Super Spacer, etc.)
          </li>
          <li>
            <strong>Objetivo de cumplimiento normativo</strong> — norma aplicable (IBC (Código Internacional de Construcción), EN, GB, AS) y cláusulas específicas
          </li>
          <li>
            <strong>Condiciones de entrega</strong> — FOB / CIF / DDP; puerto de destino
          </li>
          <li>
            <strong>Packaging</strong> — caja de pino estándar; bastidor en A o bastidor en L para paneles de gran formato
          </li>
        </ul>

        <TechNote type="warning" title="Nota sobre pedidos de muestra">
          <p>
            Para compradores nuevos de cualquier producto de vidrio arquitectónico, recomendamos firmemente solicitar una muestra pequeña (normalmente 500mm × 500mm, 2-4 piezas) antes de realizar un pedido de producción. Esto permite verificar la precisión dimensional, la calidad del canto, la uniformidad del recubrimiento y que el aspecto visual cumpla sus expectativas. Los pedidos de muestra se envían en 5-7 días a un costo nominal.
          </p>
        </TechNote>

        <FAQ items={faqItems} />

        <RelatedProductsCards slugs={['tempered-glass', 'laminated-glass', 'insulated-glass', 'low-e-glass', 'enameled-glass']} />

        <LeadMagnetCTA variant="footer" articleSlug="architectural-glass-types-guide" />
      </BlogArticleLayout>
    </>;
}