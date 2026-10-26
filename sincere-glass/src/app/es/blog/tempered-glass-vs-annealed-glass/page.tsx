import { blogArticles, type BlogArticle } from '@/lib/blog-registry';
import BlogArticleLayout, { generateArticleMetadata, articleJsonLd, type TOCItem } from "@/_i18n/es/components/blog/BlogArticleLayout";
import TLDRBox from "@/_i18n/es/components/blog/TLDRBox";
import LeadMagnetCTA from "@/_i18n/es/components/blog/LeadMagnetCTA";
import CostDisclaimer from "@/_i18n/es/components/blog/CostDisclaimer";
import RelatedProductsCards from "@/_i18n/es/components/blog/RelatedProductsCards";
import { FAQ, TechNote, ComparisonTable } from "@/_i18n/es/components/blog/blocks";
import StrengthSimulator from "@/_i18n/es/components/blog/article-3/StrengthSimulator";
import BreakagePatternViewer from "@/_i18n/es/components/blog/article-3/BreakagePatternViewer";
const SLUG = 'tempered-glass-vs-annealed-glass';
const article: BlogArticle = blogArticles.find(a => a.slug === SLUG)!;
export const metadata = generateArticleMetadata(article);
const toc: TOCItem[] = [{
  id: 'what-is-annealed',
  text: "Qué significa realmente el \"vidrio recocido\"",
  level: 2
}, {
  id: 'strength-gap',
  text: "La brecha de resistencia: 1× vs 4-5× vs 10×",
  level: 2
}, {
  id: 'breakage',
  text: "Cómo se rompen — la diferencia real",
  level: 2
}, {
  id: 'code',
  text: "Dónde la normativa prohíbe el vidrio recocido",
  level: 2
}, {
  id: 'when-annealed',
  text: "Cuándo el vidrio recocido es la opción correcta",
  level: 2
}, {
  id: 'spec-sheet',
  text: "Comparativa de especificaciones técnicas",
  level: 2
}, {
  id: 'cost',
  text: "Costo y plazo de entrega",
  level: 2
}, {
  id: 'adjacent',
  text: "Alternativas relacionadas que conviene conocer",
  level: 2
}, {
  id: 'faq',
  text: "Preguntas frecuentes del comprador",
  level: 2
}];
const buyerFaqItems = [{
  q: "Does Sincere Glass still produce annealed glass, or only tempered?",
  a: "We produce both. Annealed float glass is our raw material for all tempered, laminated, and coated products. We also sell annealed glass directly for applications where tempering is unnecessary or counterproductive — framed artwork, interior partitions in non-safety locations, and buyers who want to cut, drill, or process the glass themselves. Minimum order 50 m² for custom cuts."
}, {
  q: "What's the MOQ for tempered glass orders from China?",
  a: "Our standard MOQ for tempered glass orders is 50 square meters. We can accept smaller trial orders at a nominal setup fee for new buyers. Our 3m × 15m tempering furnace is one of the largest in Hubei province, so we can handle both jumbo architectural panels and smaller volume runs on the same production line."
}, {
  q: "Can tempered glass be cut or drilled after it's tempered?",
  a: "No. Tempered glass must be cut, drilled, edge-finished, and have any holes made BEFORE it goes into the tempering furnace. Any attempt to cut or drill tempered glass causes it to shatter. This is one of the main reasons spec drawings must be finalized before order placement — field modifications are not possible."
}, {
  q: "What certifications ship with tempered glass to international markets?",
  a: "All tempered glass we produce is 3C (CCC) certified under China's mandatory product certification system, tested per GB 15763.2-2005. For export orders, we provide third-party test reports suitable for ASTM C1048 compliance review (US), EN 12150 (EU), and AS/NZS 2208 (Australia/NZ). We cannot ship CE-marked product directly — buyers requiring CE must coordinate with an EU-based assessment body."
}];
export default function Page() {
  return <>
      {articleJsonLd(article, buyerFaqItems).map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}

      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox takeaways={['Annealed glass is "regular" float glass — the raw material. It has essentially no residual stress and breaks into dangerous shards.', 'Tempered glass is annealed glass that has been reheated and rapidly cooled, giving it 4-5× the strength and a safe granular breakage pattern.', 'Most modern building codes (IBC §2406, GB 50210, EN 12600) forbid annealed glass in "safety glazing hazardous locations" — doors, shower walls, low windows, railings.', 'Annealed is still the correct choice for interior framed artwork, non-safety-location windows above 4ft from the floor, and when the buyer needs to cut/drill the glass themselves.', 'FOB Wuhan reference pricing: annealed 6mm ~$5-8/m², tempered 6mm ~$18-22/m² — the premium is roughly 3× for the safety upgrade.']} />

        <p>
          "¿Cuál es la diferencia entre el vidrio templado y el vidrio normal?" es una de las preguntas más frecuentes que recibimos de compradores nuevos. La respuesta breve: <strong>el vidrio normal es
          vidrio recocido</strong> — el producto en lámina en bruto que sale de una línea de vidrio flotado sin ningún tratamiento de refuerzo. El vidrio templado es ese mismo producto tras un tratamiento térmico secundario. La diferencia es relevante porque los códigos de construcción de prácticamente todos los países establecen una línea clara entre ambos por razones de seguridad.
        </p>

        <p>
          Esta guía explica qué es cada producto, cómo fallan, cuándo la normativa impone una solución determinada y cuándo el vidrio recocido sigue siendo la opción correcta pese a ser "menos resistente". Si ya ha consultado nuestras comparativas de{' '}
          <a href="/blog/tempered-glass-vs-laminated-glass">vidrio templado vs vidrio laminado</a>{' '}
          or{' '}
          <a href="/blog/insulated-glass-vs-laminated-glass">vidrio aislante vs vidrio laminado</a>, esta guía retrocede un paso — a la pregunta de si realmente necesita <em>any</em> vidrio de seguridad en
          absoluto.
        </p>

        <h2 id="what-is-annealed">Qué significa realmente el "vidrio recocido"</h2>

        <p>
          El vidrio recocido es el producto directo del proceso de vidrio flotado: el vidrio fundido se vierte
          sobre un lecho de estaño fundido, se estira hasta el espesor deseado y luego se <em>enfría lentamente</em> a través de
          un horno de recocido. Ese enfriamiento lento es lo que lo convierte en vidrio "recocido" — el descenso
          controlado de temperatura permite que las tensiones internas se igualen, produciendo una hoja de vidrio que es
          plana, ópticamente clara y <em>mecánicamente ordinaria</em>.
        </p>

        <p>
          En nuestra fábrica de 20,000 m² en Wuhan, no fabricamos vidrio flotado nosotros mismos — lo adquirimos
          de plantas flotadoras proveedoras y lo utilizamos como insumo para todos los demás productos que fabricamos.
          Vidrio templado, vidrio laminado, vidrio de baja emisividad (Low-E) con recubrimiento, vidrio esmaltado: todos comienzan su ciclo de vida como vidrio recocido simple. En ese sentido, el vidrio recocido no es una <em>competitor</em> al vidrio templado — es
          la materia prima de la que se fabrica el vidrio templado.
        </p>

        <TechNote type="note" title="Terminología que confunde a los compradores">
          <p>
            "Vidrio recocido", "vidrio flotado", "vidrio ordinario" y "vidrio común" hacen referencia al
            mismo producto en contextos comerciales. "Vidrio plano" es un término más antiguo que
            describe técnicamente un método de fabricación anterior a 1960, pero aún se utiliza de forma
            general para designar el vidrio flotado recocido. Si una ficha técnica indica "vidrio transparente de 6mm" sin
            mayor especificación, debe asumirse que se trata de vidrio flotado recocido transparente de 6mm.
          </p>
        </TechNote>

        <h2 id="strength-gap">La brecha de resistencia: 1× vs 4-5× vs 10×</h2>

        <p>
          La forma más sencilla de entender la diferencia es a través del estrés compresivo superficial —
          la presión "incorporada" en la superficie del vidrio que cualquier fuerza externa debe
          superar antes de que el vidrio se rompa. Pase el cursor sobre cada barra:
        </p>

        <StrengthSimulator />

        <p>
          El vidrio recocido tiene un estrés compresivo prácticamente nulo — un umbral de rotura de aproximadamente 40 MPa,
          que representa únicamente la resistencia inherente de los enlaces del vidrio. Una{' '}
          <a href="/products/tempered-glass">vidrio templado</a>{' '}
          hoja ha sido calentada a ~620°C y luego sometida a enfriamiento rápido mediante chorros de aire a alta presión, generando
          más de 180 MPa de compresión superficial. El vidrio está literalmente "precargado" contra el fallo.
        </p>

        <p>
          Nuestro horno de templado de 3m × 15m puede procesar paneles de gran formato a estos niveles de estrés — el más grande
          de la provincia de Hubei — razón por la cual podemos suministrar vidrio templado para muros cortina
          y fachadas de grandes dimensiones que fábricas más pequeñas no pueden abastecer.
        </p>

        <h2 id="breakage">Cómo se rompen — la diferencia real</h2>

        <p>
          El valor de resistencia es importante, pero no es lo que convierte al vidrio templado en "vidrio de seguridad".
          El factor determinante es <em>qué ocurre cuando finalmente se rompe</em>. Alternar a continuación:
        </p>

        <BreakagePatternViewer />

        <p>
          Por esto el código denomina al vidrio templado "vidrio de seguridad" y el vidrio recocido está explícitamente prohibido en la mayoría de las aplicaciones de construcción. Un adulto que choca contra una puerta de vidrio recocido de 6mm probablemente sufra laceraciones graves; el mismo impacto sobre vidrio templado de 6mm produce gránulos que no son peligrosos.{' '}
          <a href="https://codes.iccsafe.org/content/IBC2021P2/chapter-24-glass-and-glazing" target="_blank" rel="noopener">IBC 2021 §2406.4</a>{' '}
          enumera las "ubicaciones de riesgo" donde se requiere vidrio de seguridad.
        </p>

        <LeadMagnetCTA variant="inline" articleSlug="tempered-glass-vs-annealed-glass" />

        <h2 id="code">Dónde la normativa prohíbe el vidrio recocido</h2>

        <p>
          Prácticamente todos los códigos de construcción modernos incluyen una lista de "ubicaciones de riesgo de acristalamiento de seguridad" donde el vidrio recocido está prohibido. Son lugares donde el impacto humano es probable y las consecuencias de una rotura son graves. Las categorías principales:
        </p>

        <ul>
          <li>
            <strong>Puertas y paneles laterales</strong> — cualquier vidrio situado en la puerta o a menos de 24 pulgadas (610mm) del borde de la puerta (IBC §2406.4.1)
          </li>
          <li>
            <strong>Mamparas de ducha y bañera</strong> — todo acristalamiento, sin excepciones (IBC §2406.4.5)
          </li>
          <li>
            <strong>Ventanas bajas</strong> — hojas de vidrio de más de 9 pies² (0,84 m²) cuyo borde inferior se encuentre a menos de 18 pulgadas (457mm) del suelo (IBC §2406.4.3)
          </li>
          <li>
            <strong>Barandillas, guardas y barandillas de vidrio</strong> — todo acristalamiento estructural (IBC §2407)
          </li>
          <li>
            <strong>Peldaños de escalera y rellanos</strong> — todo acristalamiento en superficies transitables
          </li>
          <li>
            <strong>Acristalamiento en altura</strong> — claraboyas, marquesinas (generalmente requiere vidrio laminado,
            pero el vidrio templado solo está permitido en casos limitados según IBC §2405)
          </li>
        </ul>

        <p>
          El equivalente en China es <strong>GB 50210-2018 §15.6</strong> y la norma nacional de
          vidrio de seguridad <strong>GB 15763.2-2005</strong>. La normativa europea utiliza{' '}
          <strong>EN 12600</strong> (clasificación de impacto) en combinación con las reglamentaciones
          nacionales de construcción. Australia utiliza <strong>AS 1288</strong>. Los umbrales específicos varían, pero <em>categories</em> de las ubicaciones requeridas son prácticamente idénticas en todos estos
          códigos — los códigos convergen en la misma lógica de riesgo.
        </p>

        <TechNote type="warning" title="Esto no es una recomendación — es la ley">
          <p>
            Especificar vidrio recocido en una ubicación definida como de seguridad por el código no es solo arriesgado — puede invalidar los permisos de construcción, anular la cobertura del seguro y exponer al proyectista a responsabilidad personal si alguien resulta lesionado. Si no está seguro de si una ubicación califica como "peligrosa", opte por defecto por vidrio templado o vidrio laminado. La diferencia de coste es insignificante comparada con el riesgo.
          </p>
        </TechNote>

        <h2 id="when-annealed">Cuándo el vidrio recocido es la opción correcta</h2>

        <p>
          El vidrio recocido sigue siendo apropiado — y a menudo <em>preferable</em> — en estos casos:
        </p>

        <ul>
          <li>
            <strong>Obras de arte y marcos de cuadros enmarcados en interiores</strong> — riesgo de impacto bajo, generalmente requiere recubrimiento antirreflectante que es más fácil de aplicar sobre vidrio recocido
          </li>
          <li>
            <strong>Ventanas en pisos superiores a más de 18 in del suelo</strong> — si la ubicación no califica como zona de riesgo según IBC (Código Internacional de Construcción) §2406, el vidrio recocido está permitido y es significativamente más económico
          </li>
          <li>
            <strong>El comprador desea cortar/perforar el vidrio por su cuenta</strong> — el vidrio templado no puede cortarse tras el templado; si su fabricante necesita realizar modificaciones, solicite vidrio recocido
          </li>
          <li>
            <strong>Tabiques interiores sin requisito de seguridad</strong> — paredes interiores fijas en ubicaciones sin riesgo de impacto
          </li>
          <li>
            <strong>Acristalamiento para invernaderos y uso hortícola</strong> — los ciclos térmicos superan lo que el vidrio templado puede tolerar sin rotura espontánea por NiS; el vidrio recocido suele ser preferible
          </li>
          <li>
            <strong>Mirrors</strong> — el respaldo de espejos residenciales y comerciales es típicamente vidrio recocido; el proceso de plateado es incompatible con el vidrio templado
          </li>
        </ul>

        <h2 id="spec-sheet">Comparativa de especificaciones técnicas</h2>

        <ComparisonTable caption="Comparativa directa, referencia vidrio claro de 6 mm" headers={['Property', 'Annealed', 'Tempered']} rows={[{
        property: 'Surface compressive stress',
        values: ['~0 MPa', '≥90 MPa (per GB 15763.2)'],
        highlight: 1
      }, {
        property: 'Breaking strength (bending)',
        values: ['~40 MPa', '~180 MPa'],
        highlight: 1
      }, {
        property: 'Thermal shock resistance',
        values: ['40°C differential', '~200°C differential'],
        highlight: 1
      }, {
        property: 'Breakage pattern',
        values: ['Large shards', 'Small granules'],
        highlight: 1
      }, {
        property: 'Can be cut after processing',
        values: ['Yes', 'No'],
        highlight: 0
      }, {
        property: 'Can be drilled after processing',
        values: ['Yes', 'No'],
        highlight: 0
      }, {
        property: 'Code-compliant for doors/showers',
        values: ['No', 'Yes'],
        highlight: 1
      }, {
        property: 'Spontaneous breakage risk',
        values: ['None', 'Rare (NiS inclusions)'],
        highlight: 0
      }, {
        property: 'Typical lead time (Wuhan)',
        values: ['3-7 days', '7-12 days'],
        highlight: 0
      }, {
        property: 'FOB price, 6mm clear',
        values: ['$5-8/m²', '$18-22/m²'],
        highlight: 0
      }]} />

        <h2 id="cost">Costo y plazo de entrega</h2>

        <p>
          Precios de referencia para vidrio claro de 6 mm, FOB fábrica Wuhan:
        </p>

        <ul>
          <li><strong>Vidrio flotado recocido, 6mm:</strong> ~$5-8 /m²</li>
          <li><strong>Vidrio templado, 6mm:</strong> ~$18-22 /m²</li>
          <li><strong>Vidrio semitemplado, 6mm:</strong> ~$14-17 /m²</li>
          <li><strong>Laminado templado, 6+1.52+6:</strong> ~$42-50 /m²</li>
        </ul>

        <CostDisclaimer />

        <p>
          El vidrio recocido se despacha más rápido porque omite el horno de templado — el plazo de entrega habitual es de 3-7 días hábiles para cortes estándar, frente a 7-12 días para el vidrio templado. En proyectos donde la mayor parte del vidrio puede ser recocido y solo las ubicaciones críticas de seguridad requieren templado, dividir el pedido puede ahorrar tanto dinero como tiempo.
        </p>

        <h2 id="adjacent">Alternativas relacionadas que conviene conocer</h2>

        <p>
          Entre el vidrio recocido y el templado existe una opción intermedia, y por encima de ambos una más resistente. Aspectos relevantes al momento de especificar:
        </p>

        <ul>
          <li>
            <strong>Vidrio semitemplado</strong> — aproximadamente 2× la resistencia del vidrio recocido (frente a 4-5× del templado), pero se rompe en <em>fragmentos más grandes</em> que el vidrio templado. No es legalmente "vidrio de seguridad", pero resiste mejor el estrés térmico y la carga de viento que el recocido. Se utiliza donde no se requiere vidrio de seguridad pero el rendimiento térmico es importante — acristalamiento spandrel, fachadas con ensayo de choque térmico.
          </li>
          <li>
            <strong>Vidrio de temple químico</strong> — el intercambio iónico en un baño de sal de potasio genera una compresión superficial de hasta 500 MPa. Común en pantallas de smartphones (Gorilla Glass) y aplicaciones especiales. Poco frecuente en vidrio arquitectónico porque el proceso es costoso y la capa de refuerzo es delgada.
          </li>
          <li>
            <strong>Vidrio laminado recocido</strong> — vidrio recocido + lámina intermedia de PVB (polivinil butiral). La lámina intermedia proporciona la retención de seguridad (los fragmentos rotos permanecen adheridos al PVB), por lo que el vidrio laminado recocido puede utilizarse en algunas ubicaciones de seguridad donde el vidrio recocido simple no puede. Consulte nuestro{' '}
            <a href="/blog/tempered-glass-vs-laminated-glass">comparación entre vidrio templado y vidrio laminado</a>{' '}
            para saber cuándo preferir cada uno.
          </li>
          <li>
            <strong>Vidrio templado laminado</strong> — la combinación: resistencia del templado más retención de fragmentos del PVB (polivinil butiral). La especificación estándar para acristalamiento estructural de alta gama e instalaciones en altura. Consulte nuestro{' '}
            <a href="/blog/insulated-glass-vs-laminated-glass">guía de vidrio aislante vs. vidrio laminado</a>{' '}
            para la configuración "ambos".
          </li>
        </ul>

        <FAQ items={buyerFaqItems} />

        <TechNote type="note" title="Una visión de conjunto">
          <p>
            Este artículo es uno de los tres análisis en profundidad de nuestra serie de comparativas de vidrio arquitectónico. Para el marco de decisión completo sobre los 9 productos de vidrio arquitectónico — con un selector interactivo de 3 clics — consulte nuestra{' '}
            <a href="/blog/architectural-glass-types-guide">
              guía de compra completa de tipos de vidrio arquitectónico
            </a>.
          </p>
        </TechNote>

        <RelatedProductsCards slugs={['tempered-glass', 'laminated-glass', 'low-e-glass']} />

        <LeadMagnetCTA variant="footer" articleSlug="tempered-glass-vs-annealed-glass" />
      </BlogArticleLayout>
    </>;
}