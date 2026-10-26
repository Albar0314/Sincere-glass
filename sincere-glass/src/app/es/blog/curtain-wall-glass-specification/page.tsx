import { blogArticles, type BlogArticle } from '@/lib/blog-registry';
import BlogArticleLayout, { generateArticleMetadata, articleJsonLd, type TOCItem } from "@/_i18n/es/components/blog/BlogArticleLayout";
import TLDRBox from "@/_i18n/es/components/blog/TLDRBox";
import LeadMagnetCTA from "@/_i18n/es/components/blog/LeadMagnetCTA";
import RelatedProductsCards from "@/_i18n/es/components/blog/RelatedProductsCards";
import { FAQ, TechNote } from "@/_i18n/es/components/blog/blocks";
import CurtainWallSpecSelector from "@/_i18n/es/components/blog/article-8/CurtainWallSpecSelector";
import BuildupCrossSection from "@/_i18n/es/components/blog/article-8/BuildupCrossSection";
import RegionalCodeTable from "@/_i18n/es/components/blog/article-8/RegionalCodeTable";
const SLUG = 'curtain-wall-glass-specification';
const article: BlogArticle = blogArticles.find(a => a.slug === SLUG)!;
export const metadata = generateArticleMetadata(article);
const toc: TOCItem[] = [{
  id: 'what-qualifies',
  text: "¿Qué se entiende por \"vidrio para muro cortina\"?",
  level: 2
}, {
  id: 'four-objectives',
  text: "Los 4 objetivos de diseño",
  level: 2
}, {
  id: 'selector',
  text: "Selector de especificaciones interactivo",
  level: 2
}, {
  id: 'buildups',
  text: "Composiciones típicas según tipo de edificio",
  level: 2
}, {
  id: 'cross-section',
  text: "Explorador de secciones transversales de composición",
  level: 2
}, {
  id: 'code',
  text: "Requisitos normativos por región",
  level: 2
}, {
  id: 'limits',
  text: "Límites de espesor y tamaño de panel",
  level: 2
}, {
  id: 'procurement',
  text: "Errores de compra que debe evitar",
  level: 2
}, {
  id: 'faq',
  text: "Preguntas frecuentes del comprador",
  level: 2
}];
const buyerFaqItems = [{
  q: "What's the maximum curtain wall panel size you can produce?",
  a: 'Our 3m × 15m tempering furnace and 3m × 15m lamination autoclave accept panels up to 3m × 15m — among the largest in Hubei province. Our IGU assembly line accommodates the same jumbo size for insulated units. The practical ceiling for most curtain wall projects is dictated by shipping and installation handling rather than production capability. For panels over 2.5m × 6m, we recommend early coordination on crating and transport logistics.'
}, {
  q: 'Do you offer heat-soak testing (HST) for high-rise curtain wall orders?',
  a: 'Yes. For high-rise applications (typically 10+ storeys), we strongly recommend specifying heat-soak tested tempered glass per EN 14179. HST reheats the tempered glass to ~290°C and holds for 2-4 hours, forcing any NiS inclusion defects to fail in the test oven rather than years later in the installed facade. Adds approximately $8-12/m² but mitigates the single largest liability risk in tempered curtain wall.'
}, {
  q: "What's the MOQ for curtain wall glass orders?",
  a: 'Our standard MOQ is 50 square meters per order. For curtain wall projects, we recommend ordering in whole facade sets rather than small batches — this ensures consistent production parameters (same furnace run, same coating lot, same spacer batch) across the project. Small facade samples can be produced at nominal setup fee for mockup and testing purposes.'
}, {
  q: 'Which certifications do you provide for export curtain wall orders?',
  a: 'All architectural glass we produce is 3C (CCC) certified per Chinese national standards (GB 15763.2 tempered, GB 15763.3 laminated, GB/T 11944 IGU). For export orders, we provide third-party test reports suitable for compliance review per ASTM C1048/C1172/E2190 (US), EN 12150/14449/1279 (EU), and AS/NZS 2208/4666 (Australia). For hurricane-rated applications requiring Miami-Dade NOA, specify this at the quote stage.'
}, {
  q: 'What is a realistic production lead time for a full curtain wall order?',
  a: 'For a typical mid-rise curtain wall order (laminated-IGU with Low-E coating): 15-20 working days from order confirmation, excluding ocean freight. For larger projects with multiple glass specifications, we recommend staged production and shipping aligned with installation schedule — we can typically produce 500-1000 m² per week per spec on a sustained basis.'
}];
export default function Page() {
  return <>
      {articleJsonLd(article, buyerFaqItems).map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}

      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox takeaways={['Curtain wall glass must satisfy 4 simultaneous objectives: safety, thermal performance, wind load capacity, and (increasingly) acoustic performance.', 'The modern baseline spec is a Low-E tempered IGU (6+12A+6 Low-E) at ~$55-68/m². Premium facades use laminated IGUs at ~$95-120/m²; hurricane zones use SGP-laminated at ~$140-180/m².', 'Codes in all four major regions (IBC, EN, GB, AS) converge on the same categories of requirements — safety glass in all positions, laminated for overhead, Low-E in cold/hot climates — but specific thresholds vary.', 'For high-rise (10+ storeys), heat-soak tested tempered glass should be mandatory in your spec. The ~$8-12/m² added cost mitigates the single largest liability risk in tempered curtain wall (spontaneous NiS breakage).', "Common procurement pitfall: ordering from suppliers who subcontract production. For laminated-IGU especially, insist on single-source production — cross-factory handling introduces damage risk and quality disputes."]} />

        <p>
          El muro cortina es el mayor consumidor individual de vidrio arquitectónico. En la mayoría de los proyectos comerciales de mediana y gran altura, la fachada de muro cortina concentra entre el 60-80% del presupuesto de vidrio del proyecto, y es donde la especificación de vidrio tiene las consecuencias más duraderas: una especificación incorrecta queda incorporada al edificio durante décadas.
        </p>

        <p>
          Esta guía cubre qué califica como vidrio para muro cortina, los cuatro objetivos de diseño que toda especificación debe satisfacer, configuraciones típicas según el tipo de edificio, requisitos normativos regionales y los errores de adquisición que generan problemas costosos más adelante. Está redactada desde el lado de la producción — fabricamos vidrio para muro cortina en nuestra fábrica de Wuhan mediante los tres procesos principales (<a href="/blog/how-is-tempered-glass-made">tempering</a>,{' '}
          <a href="/blog/how-is-laminated-glass-made">lamination</a>, y{' '}
          <a href="/blog/how-is-insulated-glass-made">ensamblaje de UVA (Unidad de Vidrio Aislante)</a>) — por lo que el contenido se centra en lo que realmente importa para el producto físico, más que en la teoría arquitectónica.
        </p>

        <h2 id="what-qualifies">¿Qué se entiende por "vidrio para muro cortina"?</h2>

        <p>
          Técnicamente, "muro cortina" se refiere a un sistema de pared exterior no portante en el que la fachada cuelga de la estructura del edificio como una cortina. El vidrio en sí se sostiene en un sistema de perfilería de aluminio (o en ocasiones acero/madera), que transfiere la carga de viento a los forjados estructurales en lugar de que la fachada soporte su propio peso.
        </p>

        <p>
          A efectos de especificación de vidrio, "vidrio para muro cortina" significa <strong>cualquier vidrio destinado a su uso en un sistema de perfilería de muro cortina</strong>. Esto se distingue de:
        </p>

        <ul>
          <li>
            <strong>Vidrio para ventana</strong> — apertura enmarcada en una pared sólida; paneles de menor tamaño y requisitos de ingeniería más simples.
          </li>
          <li>
            <strong>Vidrio estructural</strong> — vidrio que soporta carga por sí mismo (paredes de vidrio con fijación puntual, nervios de vidrio, suelos de vidrio). Requiere un tratamiento de ingeniería diferente.
          </li>
          <li>
            <strong>Vidrio spandrel</strong> — la parte opaca de un muro cortina que oculta los forjados entre ventanas. Generalmente vidrio esmaltado o pintado por el reverso. Consulte nuestra{' '}
            <a href="/products/enameled-glass">página de producto de vidrio esmaltado</a>.
          </li>
        </ul>

        <h2 id="four-objectives">Los 4 objetivos de diseño</h2>

        <p>
          El vidrio para muro cortina debe satisfacer simultáneamente cuatro requisitos de ingeniería. Cada especificación de composición es una decisión sobre cómo equilibrar estos factores:
        </p>

        <ul>
          <li>
            <strong>Safety</strong> — Resistencia al impacto humano (interior y exterior) más retención de fragmentos en caso de rotura. En muro cortina esto casi siempre implica vidrio templado como mínimo; vidrio laminado para posiciones en altura y en zonas críticas de contención de caídas. De cumplimiento obligatorio en todas las jurisdicciones principales.
          </li>
          <li>
            <strong>Rendimiento térmico (valor U)</strong> — Resistencia a la transferencia de calor a través del vidrio. Determinada por los costes de climatización y los requisitos de los códigos de eficiencia energética. Base: UVA (Unidad de Vidrio Aislante) con recubrimiento de vidrio de baja emisividad (Low-E). Premium: UVA laminada con relleno de argón y perfil separador de borde cálido.
          </li>
          <li>
            <strong>Capacidad de carga eólica</strong> — Resistencia a la fuerza lateral producida por la presión del viento. Determinada por la altura del edificio, la categoría de exposición y el código eólico local. Define el espesor del vidrio y si se requiere construcción laminada para garantizar un comportamiento a prueba de fallos.
          </li>
          <li>
            <strong>Acústica (clasificación STC)</strong> — Resistencia a la transmisión de sonido aéreo. Cada vez más relevante en edificios residenciales urbanos, hoteles y hospitales. La lámina intermedia de PVB (polivinil butiral) es la mejora acústica individual más significativa disponible; una UVA laminada con PVB (polivinil butiral) acústico puede alcanzar STC 38+.
          </li>
        </ul>

        <p>
          Un quinto objetivo — <strong>ganancia de calor solar (FS)</strong> — cobra importancia en climas cálidos y se gestiona mediante vidrio tintado o recubrimiento de vidrio de baja emisividad (Low-E) de selección espectral. No se calcula de forma independiente en la mayoría de los edificios, pero conviene verificarlo en regiones donde el enfriamiento prevalece sobre la calefacción.
        </p>

        <h2 id="selector">Selector de especificaciones interactivo</h2>

        <p>
          Responda las 2 preguntas a continuación para obtener una composición recomendada para el escenario de su proyecto. El selector abarca las cuatro tipologías de pedido de muro cortina más habituales: desde edificios de baja a gran altura, climas templados a severos y zonas de huracanes.
        </p>

        <CurtainWallSpecSelector />

        <LeadMagnetCTA variant="inline" articleSlug="curtain-wall-glass-specification" />

        <h2 id="buildups">Composiciones típicas según tipo de edificio</h2>

        <p>
          A lo largo de cientos de proyectos de muro cortina, los compradores convergen en aproximadamente cuatro familias de composición. Cada una presenta un patrón de aplicación predominante:
        </p>

        <ul>
          <li>
            <strong>Comercial de baja altura (1-3 plantas, clima templado):</strong>{' '}
            UVA de vidrio templado 6+12A+6 transparente o con vidrio de baja emisividad (Low-E). Cumplimiento normativo mínimo, menor coste por m², producción más rápida. Típico: oficinas, comercio minorista y centros educativos en zonas de clima templado.
          </li>
          <li>
            <strong>Comercial de altura media (4-10 pisos, estándar):</strong>{' '}
            UVA (Unidad de Vidrio Aislante) de vidrio de baja emisividad (Low-E) templado con relleno de argón (6+12Ar+6 Low-E) + perfil separador de borde cálido. La referencia estándar del mercado comercial moderno. Cubre la mayoría de proyectos ordinarios de torres de oficinas y uso mixto.
          </li>
          <li>
            <strong>Altura media premium (acústico o de lujo):</strong>{' '}
            UVA (Unidad de Vidrio Aislante) laminado con vidrio de baja emisividad (Low-E) (6+1.52+6 lami exterior / 12Ar / 6 Low-E templado interior). Residencial de lujo, hoteles, comercial de alta gama y fachadas urbanas con preocupaciones de ruido de calle.
          </li>
          <li>
            <strong>Altura elevada o zonas propensas a huracanes (10+ pisos, costero):</strong>{' '}
            UVA (Unidad de Vidrio Aislante) laminado con SGP (SentryGlas Plus) y ensayo de choque térmico (6+1.52 SGP+6 HS / 12Ar / 6 Low-E HS). Especificación de seguridad máxima. Estándar del sector para fachadas de 20+ pisos y aplicaciones de huracanes con certificación NOA de Miami-Dade.
          </li>
        </ul>

        <h2 id="cross-section">Explorador de secciones transversales de composición</h2>

        <p>
          Explore los cuatro tipos de configuración a continuación y coloque el cursor sobre cualquier capa para ver su función específica y especificación:
        </p>

        <BuildupCrossSection />

        <p>
          Algunas observaciones sobre estas configuraciones:
        </p>

        <ul>
          <li>
            <strong>La posición del recubrimiento de baja emisividad (Low-E) es determinante.</strong> En la superficie n.º 2 (cara interior de la hoja exterior) para climas cálidos, con el fin de reflejar el calor solar hacia el exterior. En la superficie n.º 3 (cara interior de la hoja interior) para climas fríos, con el fin de retener el calor en el interior. La mayoría de las UVA (Unidades de Vidrio Aislante) modernas especifican la superficie n.º 2.
          </li>
          <li>
            <strong>El argón frente al aire modifica el valor U en un ~20%.</strong> Con un coste adicional de $2-3/m², esta es una de las mejores decisiones en términos de coste/rendimiento en todo el acristalamiento arquitectónico. Opte por el relleno de argón como opción predeterminada salvo que el presupuesto sea explícitamente limitado.
          </li>
          <li>
            <strong>La elección entre lámina intermedia de PVB (polivinil butiral) y SGP (SentryGlas Plus) es una decisión específica de cada proyecto.</strong> El PVB (polivinil butiral) es adecuado para requisitos de seguridad estándar. El SGP (SentryGlas Plus) es obligatorio en zonas de huracanes, acristalamiento estructural y cualquier aplicación en la que el panel deba seguir soportando carga tras la rotura del vidrio.
          </li>
        </ul>

        <h2 id="code">Requisitos normativos por región</h2>

        <p>
          Cuatro grandes regiones normativas rigen la mayoría de los proyectos internacionales de muro cortina. Los umbrales específicos varían, pero las categorías de requisitos convergen. Haga clic en cualquier tema a continuación para comparar cómo los gestionan las cuatro regiones:
        </p>

        <RegionalCodeTable />

        <TechNote type="warning" title="La revisión de código no es opcional">
          <p>
            Esta tabla es una ayuda de navegación, no un sustituto de la revisión normativa. Las enmiendas locales, las superposiciones a nivel municipal y las interpretaciones específicas de cada proyecto por parte de la autoridad competente (AHJ) pueden modificar cualquiera de estos requisitos. Verifique siempre la normativa local vigente con el consultor de códigos del proyecto antes de finalizar las especificaciones de vidrio.
          </p>
        </TechNote>

        <h2 id="limits">Límites de espesor y tamaño de panel</h2>

        <p>
          El espesor del vidrio para muro cortina no es un parámetro libre — lo dicta el cálculo de carga de viento conforme a ASTM E1300 (EE. UU.), EN 16612 (UE) o GB 50009 (China). A mayor espesor, mayor peso y costo; un espesor insuficiente falla bajo carga de viento. Espesores típicos según aplicación:
        </p>

        <ul>
          <li>
            <strong>Edificios de baja altura, exposición protegida:</strong> Hojas de 5-6mm como estándar; espesor total de UVA (Unidad de Vidrio Aislante) ~22-24mm.
          </li>
          <li>
            <strong>Edificios de altura media, exposición estándar:</strong> Hojas de 6-8mm; total ~24-30mm.
          </li>
          <li>
            <strong>Edificios en altura o con exposición elevada:</strong> Hojas de 8-10mm o construcción con vidrio laminado; total 30-36mm.
          </li>
          <li>
            <strong>Homologado para huracanes:</strong> Mínimo 6+1.52 SGP (SentryGlas Plus)+6 laminado según Miami-Dade; habitualmente 6+1.52+6 o mayor espesor.
          </li>
        </ul>

        <p>
          Los límites de tamaño de panel derivan de cuatro restricciones: producción (capacidad de horno / autoclave / línea de UVA (Unidad de Vidrio Aislante)), manipulación (grúa e izado), transporte (dimensiones del contenedor) e instalación (acceso de grúa en obra). Nuestra capacidad de producción máxima es de 3m × 15m en los tres procesos; la mayoría de los proyectos están limitados por el transporte (interior útil de contenedor estándar de 40 pies: 2,35m × 12m) y la manipulación en instalación, más que por la producción.
        </p>

        <h2 id="procurement">Errores de compra que debe evitar</h2>

        <p>
          Basado en los problemas más frecuentes que detectamos en RFQs:
        </p>

        <ul>
          <li>
            <strong>Especificación sin referencia normativa.</strong> "UVA (Unidad de Vidrio Aislante) templado con vidrio de baja emisividad (Low-E)" no es una especificación — es una orientación. Incluya las normas de ensayo GB/EN/ASTM/AS, los objetivos de valor U y FS (Factor Solar), la calificación acústica si aplica, y el espesor/configuración del conjunto.
          </li>
          <li>
            <strong>Combinar proveedores de fuente única y múltiple en un mismo proyecto.</strong>{' '}
            Los productos combinados (vidrio laminado UVA (Unidad de Vidrio Aislante)) deben provenir de una sola fábrica que opere las tres líneas de producción. La manipulación entre fábricas genera riesgo de daños, problemas de tiempos y disputas de calidad. Consulte nuestra{' '}
            <a href="/blog/architectural-glass-manufacturing-guide">guía del proceso de fabricación</a> para la lista de verificación de auditoría de proveedores.
          </li>
          <li>
            <strong>Omitir el ensayo de choque térmico en pedidos para edificios en altura.</strong> La rotura espontánea por NiS es poco frecuente (~1 de cada 10,000 a 1 de cada 100,000 hojas), pero catastrófica cuando ocurre en una fachada de gran altura. El ensayo de choque térmico conforme a EN 14179 es un seguro de bajo costo.
          </li>
          <li>
            <strong>Subestimar el plazo de entrega para especificaciones de vidrio de baja emisividad (Low-E).</strong>{' '}
            El vidrio de baja emisividad (Low-E) de capa blanda estándar suele estar en stock, pero los recubrimientos de capa dura o especiales pueden añadir 5-7 días al ciclo de producción. Tenga esto en cuenta en el cronograma del proyecto.
          </li>
          <li>
            <strong>No solicitar paneles de muestra o maqueta.</strong> Para proyectos superiores a 1000 m², recomendamos encarecidamente solicitar un lote de muestra reducido (típicamente 2-4 paneles de tamaño real) para maqueta de instalación y aprobación visual antes de la producción completa. Esto permite detectar problemas de consistencia de color, uniformidad del recubrimiento y calidad de bordes antes de que se conviertan en un problema de alcance general del proyecto.
          </li>
        </ul>

        <p>
          Para cotizaciones específicas de proyecto o revisiones de especificaciones, utilice el botón Solicitar cotización en el encabezado. También podemos revisar borradores de especificaciones e identificar problemas de constructibilidad antes de que usted emita la RFQ definitiva al mercado.
        </p>

        {/* Pillar back-links */}
        <TechNote type="note" title="Lectura relacionada">
          <p>
            Para el marco general de selección de productos, consulte nuestra{' '}
            <a href="/blog/architectural-glass-types-guide">guía completa de tipos de vidrio arquitectónico</a>. Para conocer cómo se fabrica realmente el vidrio para muro cortina, consulte nuestra{' '}
            <a href="/blog/architectural-glass-manufacturing-guide">guía de fabricación de
            vidrio arquitectónico</a>.
          </p>
        </TechNote>

        <FAQ items={buyerFaqItems} />

        <RelatedProductsCards slugs={['insulated-glass', 'laminated-glass', 'tempered-glass', 'low-e-glass', 'enameled-glass']} />

        <LeadMagnetCTA variant="footer" articleSlug="curtain-wall-glass-specification" />
      </BlogArticleLayout>
    </>;
}