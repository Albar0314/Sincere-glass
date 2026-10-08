import { blogArticles, type BlogArticle } from '@/lib/blog-registry';
import BlogArticleLayout, { generateArticleMetadata, articleJsonLd, type TOCItem } from "@/_i18n/es/components/blog/BlogArticleLayout";
import TLDRBox from "@/_i18n/es/components/blog/TLDRBox";
import LeadMagnetCTA from "@/_i18n/es/components/blog/LeadMagnetCTA";
import RelatedProductsCards from "@/_i18n/es/components/blog/RelatedProductsCards";
import { FAQ, TechNote } from "@/_i18n/es/components/blog/blocks";
import ProcessSelector from "@/_i18n/es/components/blog/pillar-tech/ProcessSelector";
import ProcessFamilyMap from "@/_i18n/es/components/blog/pillar-tech/ProcessFamilyMap";
const SLUG = 'architectural-glass-manufacturing-guide';
const article: BlogArticle = blogArticles.find(a => a.slug === SLUG)!;
export const metadata = generateArticleMetadata(article);
const toc: TOCItem[] = [{
  id: 'selector',
  text: "Punto de partida: ¿Qué proceso necesita su vidrio?",
  level: 2
}, {
  id: 'three-processes',
  text: "Los 3 procesos de fabricación",
  level: 2
}, {
  id: 'tempering',
  text: "1. Templado — Refuerzo térmico",
  level: 3
}, {
  id: 'lamination',
  text: "2. Laminado — Unión química",
  level: 3
}, {
  id: 'igu',
  text: "3. Ensamblaje de UVA (Unidad de Vidrio Aislante) — Ingeniería de sistema sellado",
  level: 3
}, {
  id: 'process-map',
  text: "Cómo 3 procesos crean 5 familias de productos",
  level: 2
}, {
  id: 'one-factory',
  text: "Tres líneas, una fábrica",
  level: 2
}, {
  id: 'audit-checklist',
  text: "Lista de verificación para auditoría de proveedores",
  level: 2
}, {
  id: 'faq',
  text: 'FAQ',
  level: 2
}];
const faqItems = [{
  q: 'What are the main fabrication processes for architectural glass?',
  a: 'Three primary processes convert raw annealed float glass into finished architectural products: (1) tempering — thermal strengthening by heating to 620°C and quenching; (2) lamination — chemical bonding of two glass lites with a polymer interlayer in an autoclave at 140°C and 12 bar; (3) IGU assembly — building sealed insulated glass units with argon-filled cavities and dual-seal perimeters. Most modern architectural glass combines two or three of these processes.'
}, {
  q: 'Can a single factory handle all three processes in-house?',
  a: 'Yes, but it is less common than buyers assume. Many mid-tier factories specialize in one or two processes and subcontract the rest, which creates handling damage risk and extended lead times. Our 20,000 m² Wuhan facility runs all three processes on dedicated lines in parallel — 2 tempering furnaces (largest 3m × 15m), 2 lamination autoclaves (largest 3m × 15m), and 2 IGU assembly lines (one with ultra-large automatic argon fill). This matters most for combined products like laminated-IGU, where cross-handling between factories would introduce quality risk.'
}, {
  q: 'What is the typical production time from order to shipping?',
  a: 'Standard production cycles from order confirmation at our facility: annealed cuts 3-7 working days, tempered 7-12 days, laminated 10-15 days, insulated glass units 10-15 days, combined laminated-IGU 15-20 days. Low-E coating availability for specialty variants can add 5-7 days. These exclude ocean freight transit time to international destinations.'
}, {
  q: 'How do I verify that a supplier can actually produce what they claim?',
  a: "The supplier audit checklist later in this guide covers it, but the short version: (1) ask for recent batch records with autoclave or furnace cycle data; (2) ask for test reports per GB 15763.2 (tempered), GB 15763.3 (laminated), and GB/T 11944 (IGU); (3) if possible, visit the facility and confirm the production lines match the capability claimed. Beware of 'factories' that are actually trading companies subcontracting production — they cannot answer production detail questions."
}, {
  q: 'Can I order combined products (laminated-IGU, Low-E tempered) from one supplier?',
  a: 'This is where factory-vs-trader matters most. A trading company cannot guarantee process compatibility across subcontracted lines. A full-service factory like ours runs the processes in sequence on compatible production lines — our tempered-laminated-IGU workflow goes tempering → lamination → IGU assembly on panels sized for all three lines, with full batch traceability. For high-performance facades, specify "single-source production" in your RFQ.'
}];
export default function Page() {
  return <>
      {articleJsonLd(article, faqItems).map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}

      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox takeaways={['Three main fabrication processes convert raw annealed glass into finished architectural products: tempering (thermal), lamination (chemical bonding), and IGU assembly (sealed system).', 'Each process targets a different buyer concern: tempering for safety strength, lamination for fragment retention and acoustic, IGU for energy performance.', 'Most modern buildings use glass that has been through 2-3 of these processes — a Low-E laminated IGU, for example, goes through all three.', "Few mid-tier factories run all three in-house. Single-source production matters for combined products — cross-factory handling creates quality risk.", 'Our 20,000 m² Wuhan facility runs all 3 processes on dedicated lines (2 tempering furnaces, 2 lamination autoclaves, 2 IGU lines) — among the largest multi-process capability in Hubei province.']} />

        <p>
          La mayoría del contenido dirigido al comprador trata el vidrio arquitectónico como una <em>product</em> — vidrio templado,
          vidrio laminado, vidrio de baja emisividad (Low-E), UVA (Unidad de Vidrio Aislante). Pero cada uno de esos productos está definido por el{' '}
          <em>proceso de fabricación</em> que lo crea. Comprender los tres procesos
          es importante por dos razones: indica qué capacidades del proveedor hay que buscar y
          explica por qué algunos productos son económicos y otros son costosos.
        </p>

        <p>
          Esta guía es el punto de entrada a nuestra serie de Guías Técnicas sobre fabricación de vidrio.
          Tres artículos detallados recorren cada proceso en profundidad; esta guía los vincula
          a la decisión del comprador — qué necesita adquirir, qué proceso lo crea y qué
          buscar en un proveedor. Para un marco paralelo sobre selección de productos en lugar de
          fabricación, consulte nuestra{' '}
          <a href="/blog/architectural-glass-types-guide">guía completa de tipos de vidrio arquitectónico</a>.
        </p>

        <h2 id="selector">Punto de partida: ¿Qué proceso necesita su vidrio?</h2>

        <p>
          Si desea la respuesta más rápida sin leer la guía completa, utilice el selector
          a continuación. Una pregunta, cuatro rutas posibles — cada una enlaza al artículo
          de análisis detallado y a la página de producto correspondiente.
        </p>

        <ProcessSelector />

        <TechNote type="tip" title="La lógica del selector">
          <p>
            Las cuatro opciones corresponden a los cuatro pedidos de vidrio arquitectónico más comunes: templado de proceso único (solo seguridad), laminado de proceso único (retención de fragmentos), UVA (Unidad de Vidrio Aislante) de proceso único (solo rendimiento térmico), o la combinación laminado-UVA que requieren las fachadas de alta gama. El selector indica qué líneas de producción deben intervenir — lo que, a su vez, determina qué proveedores pueden fabricarlo realmente.
          </p>
        </TechNote>

        <h2 id="three-processes">Los 3 procesos de fabricación</h2>

        <p>
          Cada proceso responde a un problema de ingeniería fundamentalmente distinto. Comprender qué hace cada uno — y qué no hace — es la base de toda decisión de especificación de vidrio.
        </p>

        <h3 id="tempering">1. Templado — Refuerzo térmico</h3>

        <p>
          El templado toma vidrio flotado recocido ordinario y le confiere una resistencia 4-5 veces mayor, junto con un patrón de rotura granular seguro. El proceso: calentar el vidrio a aproximadamente 620 °C en un horno horizontal de rodillos y luego aplicar enfriamiento rápido en ambas superficies simultáneamente mediante chorros de aire a alta presión. La superficie se solidifica mientras el núcleo permanece caliente; cuando el núcleo termina de contraerse, jala contra la superficie solidificada, fijando una tensión de compresión de 100-180 MPa.
        </p>

        <p>
          Este perfil de tensiones es la razón por la que el vidrio templado es "vidrio de seguridad": cualquier fuerza externa debe superar primero la compresión superficial antes de que el vidrio pueda fallar, y cuando finalmente se rompe, se fragmenta en pequeños gránulos en lugar de grandes esquirlas. Los códigos de construcción de prácticamente todos los países lo exigen en puertas, mamparas de ducha, ventanas bajas, barandillas de vidrio y otras ubicaciones expuestas a impactos.
        </p>

        <p className="text-sm">
          <strong>Análisis en profundidad:</strong>{' '}
          <a href="/blog/how-is-tempered-glass-made">
            ¿Cómo se fabrica el vidrio templado? Un recorrido por las 7 fases de la línea de producción en planta
          </a>
        </p>

        <h3 id="lamination">2. Laminado — Unión química</h3>

        <p>
          El laminado une de forma permanente dos o más hojas de vidrio mediante una lámina intermedia polimérica — más comúnmente PVB (polivinil butiral) o SGP (SentryGlas Plus). El proceso se realiza en autoclave: un recipiente a presión cilíndrico que mantiene el conjunto sándwich a aproximadamente 140 °C y 12 bar durante 30-40 minutos. Durante este período, el PVB (polivinil butiral) fluye hacia cada microcavidad entre las superficies de vidrio y forma un enlace químico con los grupos hidroxilo del vidrio.
        </p>

        <p>
          El panel resultante presenta dos propiedades críticas que van más allá del vidrio común: al romperse, los fragmentos quedan adheridos a la lámina intermedia (sin esquirlas desprendidas), y la lámina intermedia amortigua el sonido aéreo. Los códigos lo exigen para acristalamientos en altura, suelos de vidrio estructural y la mayoría de escaparates. La variante SGP (SentryGlas Plus) es estándar en regiones propensas a huracanes y ciclones.
        </p>

        <p className="text-sm">
          <strong>Análisis en profundidad:</strong>{' '}
          <a href="/blog/how-is-laminated-glass-made">
            ¿Cómo se fabrica el vidrio laminado? Dentro del autoclave que fusiona químicamente el vidrio con el PVB (polivinil butiral)
          </a>
        </p>

        <LeadMagnetCTA variant="inline" articleSlug="architectural-glass-manufacturing-guide" />

        <h3 id="igu">3. Ensamblaje de UVA (Unidad de Vidrio Aislante) — Ingeniería de sistema sellado</h3>

        <p>
          El montaje de UVA (Unidad de Vidrio Aislante) construye una unidad de vidrio aislante: dos o más hojas de vidrio separadas por una cámara sellada rellena de gas inerte (típicamente argón), delimitada por un perfil separador relleno de desecante y un perímetro de doble sello. El proceso se desarrolla en una línea de montaje de 8 estaciones: preparación del vidrio, ensamblaje del marco separador, sello primario de butil, prensa de ensamblaje, relleno de gas, sellado del orificio de llenado, sello secundario de silicona y curado.
        </p>

        <p>
          A diferencia del templado o el laminado (ambos eventos térmicos únicos), el montaje de UVA es un proceso secuencial en el que cinco componentes deben funcionar conjuntamente durante más de 25 años en un sistema sellado que nunca puede abrirse para mantenimiento. El rendimiento térmico proviene del relleno de argón y el recubrimiento de vidrio de baja emisividad (Low-E); la vida útil depende del sistema de doble sello. Especificación base para torres de oficinas comerciales, ventanas residenciales en climas templados y fríos, y cualquier edificio con cargas de climatización significativas.
        </p>

        <p className="text-sm">
          <strong>Análisis en profundidad:</strong>{' '}
          <a href="/blog/how-is-insulated-glass-made">
            ¿Cómo se fabrica el vidrio aislante? Dentro del sistema sellado de 25 años que reduce las pérdidas de calor en un 70 %
          </a>
        </p>

        <h2 id="process-map">Cómo 3 procesos crean 5 familias de productos</h2>

        <p>
          Los tres procesos se combinan en distintas secuencias para producir las cinco familias de vidrio arquitectónico. Haga clic en cualquier etiqueta de proceso a continuación para ver qué productos se derivan de ella:
        </p>

        <ProcessFamilyMap />

        <p>
          Dos observaciones que vale la pena destacar:
        </p>

        <ul>
          <li>
            <strong>El templado está presente en casi todo.</strong> Incluso los productos que parecen ser de otra categoría (vidrio laminado, vidrio esmaltado, UVA (Unidad de Vidrio Aislante) de baja emisividad) suelen comenzar con hojas de vidrio templado, ya que el vidrio de seguridad es un requisito normativo en la mayoría de las aplicaciones de vidrio arquitectónico.
          </li>
          <li>
            <strong>Los productos combinados requieren las tres líneas.</strong> Un laminado-UVA — la especificación de fachada premium para proyectos de alta gama — pasa primero por el templado (ambas hojas templadas), luego por el laminado (hoja exterior laminada) y finalmente por el ensamblaje de la UVA (exterior laminado + interior templado de baja emisividad ensamblados en la unidad final). Un proveedor sin las tres líneas no puede fabricar este producto en sus propias instalaciones.
          </li>
        </ul>

        <h2 id="one-factory">Tres líneas, una fábrica</h2>

        <p>
          Esto es lo que importa cuando se producen los tres procesos bajo un mismo techo, y por qué invertimos en ello:
        </p>

        <ul>
          <li>
            <strong>Los productos combinados permanecen en una sola instalación.</strong> Nuestro flujo de trabajo para laminado-UVA sigue la secuencia templado → laminado → ensamblaje de UVA en paneles dimensionados para las tres líneas, con trazabilidad completa por lote. El traslado entre fábricas introduce riesgo de daños por manipulación, incertidumbre en los plazos y disputas sobre responsabilidad cuando surgen problemas de calidad.
          </li>
          <li>
            <strong>Capacidad jumbo en las tres líneas.</strong> Nuestro horno de templado procesa paneles de hasta 3m × 15m. Nuestro autoclave de laminado maneja paneles de hasta 3m × 15m. Nuestra línea de UVA automática de gran formato con relleno de argón puede acomodar los paneles laminados jumbo resultantes. Las fábricas de nivel medio suelen tener capacidad jumbo en uno de los procesos, pero no en los tres.
          </li>
          <li>
            <strong>Responsabilidad de calidad con fuente única.</strong> Si un laminado-UVA falla en obra, podemos rastrear el problema hasta un lote, ciclo y partida de materia prima específicos en los tres procesos. Una cadena de suministro multifábrica no puede ofrecer esta trazabilidad.
          </li>
          <li>
            <strong>Más de 15 años de trayectoria en el mercado nacional.</strong> Nuestras dos instalaciones (武汉欣城 y 湖北欣之城) han operado estas líneas para el mercado interno chino desde principios de la década de 2010. La oferta para el mercado de exportación es nueva, pero la capacidad de producción es consolidada.
          </li>
        </ul>

        <h2 id="audit-checklist">Lista de verificación para auditoría de proveedores</h2>

        <p>
          Al evaluar cualquier proveedor de vidrio arquitectónico — incluidos nosotros — estas son las preguntas cuyas respuestas distinguen a una fábrica real de una empresa comercializadora que subcontrata la producción:
        </p>

        <ul>
          <li>
            <strong>¿Cuántos hornos de templado opera y cuál es el espesor máximo de panel?</strong> Una fábrica real puede responder de inmediato con cifras específicas. Una empresa comercializadora da respuestas vagas o cotiza "cualquier medida."
          </li>
          <li>
            <strong>¿Produce vidrio laminado en sus propias instalaciones o lo subcontrata?</strong> Si se subcontrata, ¿quién es el subcontratista y cuál es su sistema de calidad?
          </li>
          <li>
            <strong>¿Puede producir vidrio laminado combinado con UVA (Unidad de Vidrio Aislante) en una sola instalación?</strong> En caso afirmativo, ¿qué líneas de producción intervienen y cuál es el plazo de entrega habitual?
          </li>
          <li>
            <strong>¿Qué certificaciones se incluyen con los pedidos de exportación?</strong> Mínimo requerido: certificación 3C (CCC) conforme a las normas nacionales chinas, con informes de ensayo según las normas GB aplicables (15763.2 para vidrio templado, 15763.3 para vidrio laminado, 11944 para UVA (Unidad de Vidrio Aislante)). Para exportación, informes de ensayo adecuados para la revisión de cumplimiento con ASTM C1048, EN 12150 o AS/NZS 2208.
          </li>
          <li>
            <strong>¿Puede proporcionar registros de lote de un pedido reciente representativo?</strong>{' '}
            Esta es la prueba diagnóstica: una fábrica real mantiene registros de producción; una empresa comercializadora no puede presentarlos porque no fabricó el vidrio.
          </li>
          <li>
            <strong>¿Cuál es su proceso de control de calidad para el porcentaje de llenado de gas en las UVA (Unidad de Vidrio Aislante)?</strong> Cualquier fábrica que afirme fabricar UVA (Unidad de Vidrio Aislante) con relleno de argón sin capacidad de medición está haciendo suposiciones.
          </li>
          <li>
            <strong>¿Cuál es el sistema de doble sellado estándar?</strong> PIB + silicona es el estándar premium; PIB + polisulfuro es de nivel intermedio; el sellado simple es exclusivo para uso residencial de gama básica.
          </li>
          <li>
            <strong>¿Ofrece ensayo de choque térmico para vidrio templado?</strong> Requerido en aplicaciones de muro cortina en edificios de gran altura para mitigar el riesgo de rotura espontánea por inclusiones de NiS.
          </li>
          <li>
            <strong>¿Cuál es el MOQ (Pedido Mínimo), el plazo de entrega y las condiciones de envío?</strong> Una fábrica real
            puede cotizar estos datos por categoría de producto sin consultar a un tercero.
          </li>
        </ul>

        <TechNote type="warning" title="Señales de alerta en las respuestas de proveedores">
          <p>
            Esté atento a: incapacidad para especificar el tamaño del horno de templado, respuestas
            vagas sobre "cualquier capacidad de producción," ausencia de informes de ensayo,
            ausencia de registros de lote, ausencia de datos de control de calidad para el llenado
            de gas en UVA (Unidad de Vidrio Aislante), negativa a aceptar visitas a las
            instalaciones, precios significativamente por debajo del mercado, o cotizaciones que
            mezclan "FOB cualquier puerto de China" (indicio de intermediario, no de fábrica).
            Cualquiera de estos factores debe motivar una auditoría más exhaustiva antes de
            realizar pedidos.
          </p>
        </TechNote>

        <FAQ items={faqItems} />

        <RelatedProductsCards slugs={['tempered-glass', 'laminated-glass', 'insulated-glass', 'low-e-glass', 'enameled-glass']} />

        <LeadMagnetCTA variant="footer" articleSlug="architectural-glass-manufacturing-guide" />
      </BlogArticleLayout>
    </>;
}