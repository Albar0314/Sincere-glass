import Link from "@/_i18n/es/components/LocalizedLink";
import type { Metadata } from 'next';
import { blogArticles } from '@/lib/blog-registry';
import BlogArticleLayout, { generateArticleMetadata, articleJsonLd, type TOCItem } from "@/_i18n/es/components/blog/BlogArticleLayout";
import { makeAlternates } from '@/lib/i18n';
import TLDRBox from "@/_i18n/es/components/blog/TLDRBox";
import LeadMagnetCTA from "@/_i18n/es/components/blog/LeadMagnetCTA";
import RelatedProductsCards from "@/_i18n/es/components/blog/RelatedProductsCards";
import CostDisclaimer from "@/_i18n/es/components/blog/CostDisclaimer";
import { FAQ } from "@/_i18n/es/components/blog/blocks";
import ThicknessCalculator from "@/_i18n/es/components/blog/article-10/ThicknessCalculator";
import HardwareLoadVisualizer from "@/_i18n/es/components/blog/article-10/HardwareLoadVisualizer";
import GlobalCodeMatrix from "@/_i18n/es/components/blog/article-10/GlobalCodeMatrix";
const SLUG = 'shower-glass-thickness-guide';
const article = blogArticles.find(a => a.slug === SLUG)!;
export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`, "es")
};
const toc: TOCItem[] = [{
  id: 'the-problem',
  text: "Por qué la pregunta del \"espesor correcto\" sigue volviendo",
  level: 2
}, {
  id: 'four-variables',
  text: "Las cuatro variables que realmente determinan el espesor",
  level: 2
}, {
  id: 'decision-matrix',
  text: "Matriz de decisión de espesor según configuración",
  level: 2
}, {
  id: 'code-minimums',
  text: "Mínimos normativos que no son negociables",
  level: 2
}, {
  id: 'hardware-weight',
  text: "El problema del peso del herraje que nadie menciona",
  level: 2
}, {
  id: 'tempered-or-laminated',
  text: "Cuando el vidrio templado no es suficiente (y el vidrio laminado toma el relevo)",
  level: 2
}, {
  id: 'supplier-checklist',
  text: "Lista de verificación del proveedor antes de hacer el pedido",
  level: 2
}, {
  id: 'buyer-faq',
  text: "Preguntas frecuentes del comprador: MOQ (Pedido Mínimo), certificación, plazo de entrega, envío",
  level: 2
}];
const buyerFaq = article.buyerFaq ?? [{
  q: 'What is the MOQ for shower glass export orders from Sincere Glass?',
  a: 'Our standard MOQ for shower glass panels is 1 × 20\' FCL (approximately 450–600 m² depending on thickness mix). For sample orders or small test shipments, we accept LCL combined with other product lines — contact us for consolidation options.'
}, {
  q: 'Which certifications do you provide with export shower glass orders?',
  a: 'Every shipment includes GB 15763.2 (China 3C) certification by default. Upon request we add CPSC 16 CFR 1201 Category II marking (US), CE marking with EN 12150-1 declaration of performance (EU), or AS/NZS 2208 marking (AU/NZ). Specify the destination market at quotation stage so we laser-etch the correct permanent mark during tempering.'
}, {
  q: 'What is the lead time for 10 mm clear tempered shower glass?',
  a: 'For stock sizes with standard CNC cutouts (handle holes, hinge cutouts), 10–15 working days from order confirmation. Custom shapes, specific coatings (e.g., ClearShield easy-clean), or large frameless panels add 3–5 days. Our 20,000 m² Wuhan facility runs 4 cutting lines and 2 tempering furnaces simultaneously to compress lead time.'
}, {
  q: 'Can you temper and ship oversized frameless walk-in panels (e.g., 2400 × 1200 mm single slab) without seams?',
  a: 'Yes. Our 3m × 15m tempering furnace handles jumbo panels well beyond standard shower geometry — a 2400 × 1200 mm walk-in panel is routine, not special-order. Shipping uses A-frame racks with foam-lined seaboxes to prevent edge impact in transit.'
}, {
  q: 'What is the warranty on tempered shower glass?',
  a: 'Standard 2-year warranty against spontaneous breakage from NiS inclusions (we offer heat-soak-tested glass as an upgrade for an additional 10–15 working days), delamination of any applied coatings, and fabrication defects. Warranty excludes impact damage, incorrect installation, and water-stain etching from hard-water areas without regular cleaning.'
}];
const specFaq = [{
  q: 'Is 10 mm the standard thickness for frameless shower doors worldwide?',
  a: 'Yes, 10 mm clear tempered is the global industry baseline for frameless shower doors up to 760 mm wide and 2000 mm tall. Below those dimensions, 8 mm is sometimes used in Europe; above them, 12 mm becomes necessary to control deflection and give the hinge enough moment arm. The dividing line is almost always panel geometry, not aesthetics.'
}, {
  q: 'Can shower glass be anything other than tempered?',
  a: 'In almost every jurisdiction, shower glazing must be a safety glass — tempered or laminated. CPSC 16 CFR 1201 (US), EN 14428 (EU), GB 15763.2 (CN), and AS 1288 §5.14 (AU/NZ) all mandate this. Annealed float glass is prohibited in shower enclosures everywhere these codes apply, which is effectively every modern construction market.'
}, {
  q: 'Why does my supplier keep offering 8 mm when I asked for 10 mm?',
  a: 'Two reasons: cost (8 mm panels are roughly 20% cheaper) and hardware economics (6–8 mm clamps and hinges are far cheaper than 10–12 mm). This is fine for small framed enclosures but risky for frameless geometry over 1.6 m². Insist on 10 mm minimum for frameless doors and tie the quote to the thickness so there is no substitution at the factory.'
}, {
  q: 'Does thicker glass actually feel more "premium" to the end-user?',
  a: 'Yes, and this is a legitimate selling point for hotel bathrooms and high-end residential. Thicker glass has less visible deflection when the door swings, less audible resonance when it closes, and a weightier mechanical sound. 12 mm panels in luxury properties are specified as much for perceived quality as for structural need.'
}, {
  q: 'What is the difference between tempered and heat-strengthened glass for showers?',
  a: 'Only tempered (fully toughened) glass is a safety glass. Heat-strengthened glass is 2× stronger than annealed but breaks in large shards, not safe granules — it fails CPSC 16 CFR 1201 and EN 12600 impact classification. Heat-strengthened is appropriate for curtain wall and spandrel glass, never for shower enclosures.'
}, {
  q: 'How much does 12 mm shower glass cost versus 10 mm?',
  a: 'As a reference, 12 mm clear tempered is typically 25–35% more expensive per square meter than 10 mm, before hardware. Add 20–30% for heavier-rated hinges and clamps. For a standard frameless shower (1.5 m² glass + hardware), the total upgrade from 10 mm to 12 mm is roughly 25–30% on the finished enclosure cost.'
}];
const faqForSchema = [...buyerFaq, ...specFaq];
export default function Page() {
  const schemas = articleJsonLd(article, faqForSchema);
  return <>
      {schemas.map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}

      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox takeaways={['10 mm clear tempered is the global default for frameless shower doors up to 760 × 2000 mm — thinner only if the panel is framed, thicker only if the panel is oversized or hinged on one side.', 'Four variables set thickness: support type (framed / semi-frameless / frameless), panel use (door / fixed / walk-in), geometry (height × width), and local code (CPSC / EN / GB / AS).', 'Shower glass must always be a safety glass. Tempered meets every major code; annealed is prohibited in every jurisdiction with modern building codes.', 'Hardware ratings drive thickness more than most buyers realize: a 12 mm door needs hinges rated for 12 mm, not just "heavy duty" — mismatched hinges deflect and loosen within 12 months of daily cycling.', 'Minimum spec checklist for an export quote: thickness + edge finish (polished arris minimum) + CNC cutout drawing + required certification mark (CPSC / CE / 3C / AS) + heat-soak-test status for jumbo panels.']} />

        <h2 id="the-problem">Por qué la pregunta del "espesor correcto" sigue volviendo</h2>

        <p>
          Cada mes, una docena de compradores se ponen en contacto con el mismo mensaje inicial: <em>"Necesitamos vidrio para mampara de ducha. ¿Qué espesor debemos cotizar?"</em> La pregunta parece sencilla, pero la respuesta casi nunca es un único número. Depende de cómo se sujeta el vidrio, qué función cumple la hoja dentro del recinto, qué tan grande es el panel, y contra qué normativa de seguridad del país se va a aprobar el proyecto. Una cotización para un hotel en Dubái responde de una manera; una reforma residencial en Berlín responde de otra.
        </p>

        <p>
          Esta guía recorre las cuatro variables de decisión, las confronta con una matriz de espesor operativa y detalla los mínimos normativos que prevalecen sobre cualquier otro criterio. Está redactada desde la planta de producción: en nuestra fábrica de 20,000 m² en Wuhan, cada panel de vidrio para mampara de ducha que sale de la línea de templado lleva marcado su espesor, su norma de certificación y el código del país de destino. Si falta cualquiera de esos tres datos, el panel no se despacha. Esa es la disciplina alrededor de la cual se organiza el resto de este artículo.
        </p>

        <ThicknessCalculator />

        <h2 id="four-variables">Las cuatro variables que realmente determinan el espesor</h2>

        <p>
          Descarte a cualquier proveedor que recomiende un espesor sin preguntar primero sobre estas cuatro variables. Cada una de ellas, de forma independiente, puede desplazar el mínimo un escalón completo hacia arriba o hacia abajo (6 mm → 8 mm → 10 mm → 12 mm).
        </p>

        <h3>1. Tipo de sujeción: con marco, semi-sin marco o sin marco</h3>

        <p>
          Un recinto con marco completo utiliza un perfil de aluminio que absorbe prácticamente toda la carga de deflexión. En este caso el vidrio puede tener un espesor de tan solo 5–6 mm: el marco impide que el panel oscile cuando se abre la puerta. Un recinto semi-sin marco cuenta con canales en U superior e inferior (o clips de pared) pero sin perfil vertical, de modo que el vidrio asume la deflexión lateral; 8 mm se convierte en el mínimo realista. Un recinto sin marco es 100% vidrio: el panel <em>is</em> la estructura — y 10 mm es la línea base global, aumentando a 12 mm a medida que crece el tamaño del panel.
        </p>

        <h3>2. Caso de uso: puerta, panel fijo, panel de retorno o mampara walk-in de hoja única</h3>

        <p>
          Una puerta batiente introduce un momento de flexión en el pivote de la bisagra que un panel fijo nunca experimenta. Para la misma geometría, una puerta requiere un espesor de vidrio superior al de un panel fijo. Un panel de retorno a 90° (junta vidrio a vidrio en la esquina) debe coincidir con el espesor de la puerta adyacente, ya que el herraje de sujeción de vidrio es específico para cada espesor. Una mampara walk-in de hoja única sin puerta es el caso estructuralmente más sencillo, pero a partir de 2 m² se beneficia de 12 mm para reducir el efecto visual de "pandeo" (flexión visible al tacto).
        </p>

        <h3>3. Geometría: altura × anchura (y por tanto área y relación de aspecto)</h3>

        <p>
          Un vidrio de mayor tamaño flexiona más bajo su propio peso y bajo presión externa (golpe de puerta de mampara, condensación, limpieza). La altura importa más que la anchura porque el panel está en voladizo desde la bisagra o sujeto en la parte superior e inferior. Un panel de 2200 mm de altura y 800 mm de anchura requiere mayor espesor que uno de 1800 mm de altura y 900 mm de anchura, aunque este último tenga mayor área. Superar los 2000 mm de altura es el punto de inflexión habitual para pasar de 10 mm a 12 mm.
        </p>

        <h3>4. Normativa local de construcción y requisito de acristalamiento de seguridad</h3>

        <p>
          Las mamparas de ducha están clasificadas como ubicación de acristalamiento de riesgo en prácticamente toda la normativa de construcción moderna. En EE. UU., <a href="https://www.cpsc.gov/Regulations-Laws--Standards/Statutes/Safety-Standard-for-Architectural-Glazing-Materials" target="_blank" rel="noopener noreferrer">CPSC 16 CFR 1201 Categoría II</a> es la norma de referencia, que exige una prueba de resistencia al impacto de 400 ft-lb. La UE aplica EN 14428 (específica para mamparas de ducha) y EN 12600 (clasificación de impacto). China exige vidrio de seguridad conforme a GB 15763.2 y certificación 3C. Australia y Nueva Zelanda siguen AS 1288 §5.14 con vidrio de seguridad Grado A según AS/NZS 2208. Todas estas normativas exigen efectivamente construcción en vidrio templado o vidrio laminado — el vidrio recocido está prohibido.
        </p>

        <h2 id="decision-matrix">Matriz de decisión de espesor según configuración</h2>

        <p>
          El selector interactivo anterior ejecuta la lógica completa. A continuación se presenta la tabla de decisión condensada que los compradores pueden utilizar en la etapa de cotización.
        </p>

        <div className="my-6 overflow-hidden rounded-lg border border-[#3A4250]/40">
          <table className="w-full text-sm">
            <thead className="bg-[#3A4250]/30">
              <tr>
                <th className="text-left p-3 text-[#DAA745] font-semibold text-xs uppercase tracking-wider">Configuration</th>
                <th className="text-left p-3 text-[#DAA745] font-semibold text-xs uppercase tracking-wider">Tamaño del panel</th>
                <th className="text-left p-3 text-[#DAA745] font-semibold text-xs uppercase tracking-wider">Recommended</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3A4250]/40 text-[#F2F0ED]">
              <tr><td className="p-3">Puerta corredera o pivotante con marco</td><td className="p-3 text-[#8B95A5]">≤1850 × 900 mm</td><td className="p-3 font-semibold">5 mm vidrio templado</td></tr>
              <tr><td className="p-3">Puerta con marco de gran formato</td><td className="p-3 text-[#8B95A5]">{"> above"}</td><td className="p-3 font-semibold">6 mm templado</td></tr>
              <tr><td className="p-3">Puerta o panel fijo semi-sin marco</td><td className="p-3 text-[#8B95A5]">≤2000 × 800 mm</td><td className="p-3 font-semibold">8 mm templado</td></tr>
              <tr><td className="p-3">Semi-sin marco de gran formato</td><td className="p-3 text-[#8B95A5]">{"> above"}</td><td className="p-3 font-semibold">10 mm templado</td></tr>
              <tr><td className="p-3"><strong>Puerta abatible sin marco</strong></td><td className="p-3 text-[#8B95A5]">≤2000 × 760 mm</td><td className="p-3 font-semibold text-[#DAA745]">10 mm templado</td></tr>
              <tr><td className="p-3"><strong>Puerta ancha/alta sin marco</strong></td><td className="p-3 text-[#8B95A5]">{"> above"}</td><td className="p-3 font-semibold text-[#DAA745]">12 mm templado</td></tr>
              <tr><td className="p-3">Panel fijo sin marco</td><td className="p-3 text-[#8B95A5]">≤2 m²</td><td className="p-3 font-semibold">10 mm templado</td></tr>
              <tr><td className="p-3">Losa única sin marco para walk-in</td><td className="p-3 text-[#8B95A5]">≤2 m²</td><td className="p-3 font-semibold">10 mm templado</td></tr>
              <tr><td className="p-3">Losa jumbo para walk-in</td><td className="p-3 text-[#8B95A5]">{">2 m² o >2100 mm de altura"}</td><td className="p-3 font-semibold">12 mm templado (o 6+6 laminado)</td></tr>
            </tbody>
          </table>
        </div>

        <p>
          Esta matriz se basa en nuestros 15+ años de producción nacional de vidrio para mamparas de ducha. La mayoría de los pedidos repetidos — hoteles, desarrollos residenciales, baños en retail — se establecen en <Link href="/products/tempered-glass">10 mm vidrio templado transparente</Link> como estándar de la obra y solo pasan a 12 mm en los paneles de gran formato. Para información sobre el proceso de templado que produce estos paneles, consulte nuestra guía sobre <Link href="/blog/how-is-tempered-glass-made">cómo se fabrica el vidrio templado</Link>.
        </p>

        <h2 id="code-minimums">Mínimos normativos que no son negociables</h2>

        <p>
          El espesor es una recomendación de rendimiento. La clasificación como vidrio de seguridad es un requisito legal. A continuación se presenta el mapa normativo de los cuatro sistemas de códigos más referenciados en los envíos de exportación de Sincere Glass. Estos mínimos aplican independientemente del tamaño del panel, la herraje o la preferencia estética — si el vidrio no lleva la marca requerida, no supera la inspección.
        </p>

        <GlobalCodeMatrix />

        <p>
          La implicación práctica: en la etapa de cotización, especifique el país de destino y solicite al fabricante que confirme qué marca permanente se aplicará. En nuestros envíos de exportación, grabamos con láser el marcado CPSC / CE / 3C / AS durante el proceso de templado, de modo que la marca sea tan duradera como el propio vidrio. Consulte nuestra guía completa sobre <Link href="/blog/curtain-wall-glass-specification">especificación de vidrio para muro cortina</Link> para ver cómo estos mismos sistemas de códigos se aplican al acristalamiento de fachadas, y nuestra <Link href="/blog/architectural-glass-types-guide">guía de tipos de vidrio arquitectónico</Link> sobre las cinco familias de productos de vidrio que se agrupan bajo estas certificaciones.
        </p>

        <LeadMagnetCTA variant="inline" articleSlug={SLUG} />

        <h2 id="hardware-weight">El problema del peso del herraje que nadie menciona</h2>

        <p>
          Este es el modo de fallo más silencioso en el suministro de vidrio para mamparas de ducha: el vidrio está especificado correctamente, pero las bisagras y abrazaderas están subdimensionadas. Una puerta de 10 mm con clips homologados para 6 mm supera la inspección de instalación, pero comienza a desalinearse a los tres meses de uso diario porque el pivote de la bisagra no puede soportar la carga de momento. El vidrio no falla — primero falla la herraje, y el vidrio le sigue.
        </p>

        <p>
          Los valores de peso no son intuitivos. Una puerta de mampara de ducha sin marco de 2000 × 760 mm — la referencia del sector — pesa <strong>30,4 kg a 10 mm</strong> and <strong>36,5 kg a 12 mm</strong>. La bisagra pivotante superior soporta aproximadamente el 70% de esa carga debido al brazo de momento. A continuación se presenta el esquema mecánico.
        </p>

        <HardwareLoadVisualizer />

        <p>
          Especifique la ferretería en función del espesor del vidrio, no de descriptores genéricos como "uso intensivo" o "premium". Los fabricantes de bisagras de reconocido prestigio (Dorma, FSB, Sugatsune) publican tablas de carga vinculadas al espesor del vidrio y al peso del panel — úselas. Una puerta de 12 mm montada con pivotes homologados para 10 mm es una reclamación de garantía en potencia.
        </p>

        <h2 id="tempered-or-laminated">Cuando el vidrio templado no es suficiente (y el vidrio laminado toma el relevo)</h2>

        <p>
          El vidrio templado es la opción universal por defecto en mamparas de ducha porque es resistente (4–5× respecto al vidrio recocido), seguro (se fragmenta en gránulos cúbicos inocuos) y la alternativa de vidrio de seguridad más económica. Sin embargo, el vidrio templado tiene un modo de fallo que conviene nombrar: <strong>rotura espontánea por inclusiones de sulfuro de níquel (NiS)</strong>. La tasa de fallo es baja — aproximadamente 1 de cada 10.000 paneles por año de servicio — pero cuando ocurre, el panel se desintegra en un único evento sin previo aviso.
        </p>

        <p>
          Para la mayoría de las mamparas de ducha residenciales y comerciales, este riesgo es aceptable. Para instalaciones de alto tráfico o alta responsabilidad civil — hoteles, hospitales, centros educativos, residencias de lujo con requisitos de resistencia al impacto — la respuesta correcta suele ser <Link href="/products/laminated-glass">vidrio laminado templado</Link> (dos hojas templadas unidas con lámina intermedia de PVB (polivinil butiral) o SGP (SentryGlas Plus)). Si una hoja se fractura, la lámina intermedia retiene los fragmentos; la mampara permanece intacta hasta que pueda sustituirse. Una construcción laminada templada 6+6 tiene un espesor nominal de 12 mm — el mismo espesor, un comportamiento post-rotura radicalmente diferente.
        </p>

        <p>
          El vidrio templado sometido a ensayo de choque térmico (HST) es una solución intermedia: el vidrio se mantiene a 290 °C durante varias horas tras el templado para forzar la rotura en fábrica de cualquier panel contaminado con NiS, en lugar de en obra. El HST reduce las roturas espontáneas en campo aproximadamente un 95%. Nuestras líneas de templado ofrecen el HST como mejora estándar; añade entre 3 y 5 días al plazo de entrega y aproximadamente un 15% al coste por m².
        </p>

        <h2 id="supplier-checklist">Lista de verificación del proveedor antes de hacer el pedido</h2>

        <p>
          Si solo retiene una cosa práctica de esta guía, que sea esta lista de verificación. Cada punto aquí recogido ha sido, en algún momento, la razón por la que un pedido de exportación de vidrio para ducha no superó la inspección, perdió su ventana de instalación o generó una reclamación de garantía. Verifique cada punto por escrito antes de confirmar el pedido.
        </p>

        <div className="my-6 rounded-lg bg-[#3A4250]/20 border-l-4 border-[#DAA745] p-5">
          <ol className="space-y-3 pl-5 text-sm text-[#F2F0ED] leading-relaxed">
            <li><strong>El espesor especificado está vinculado a cada panel en la cotización</strong> — no a una línea genérica de "vidrio templado". La cotización debe detallar el número de panel, las dimensiones y el espesor nominal.</li>
            <li><strong>El acabado de bordes es como mínimo arista pulida</strong> (preferiblemente pulido plano para instalaciones sin marco). Los bordes con corte en bruto no superan los ensayos de impacto y acumulan manchas de agua.</li>
            <li><strong>El plano CNC de corte se adjunta a la cotización</strong>, con cada orificio de bisagra, corte para abrazadera y orificio para manija debidamente acotado. El perforado tras el templado es imposible.</li>
            <li><strong>La marca de certificación requerida se especifica por escrito</strong> (CPSC Cat II / CE EN 12150-1 / 3C / AS 2208). "Estará certificado" no es una especificación — se debe nombrar la norma exacta y el método de marcado.</li>
            <li><strong>El estado del ensayo de choque térmico (HST) está confirmado</strong> para todos los paneles de más de 2 m² o en aplicaciones de alta responsabilidad. El valor predeterminado es sin HST salvo que se solicite expresamente.</li>
            <li><strong>Especificación de embalaje</strong>: bastidores en A con separadores acolchados, película de protección individual por panel, envoltorio con barrera de humedad. Cajas metálicas de exportación para transporte marítimo.</li>
            <li><strong>El fabricante acepta la inspección</strong> en la fase de templado (no solo tras el embalaje), de modo que los defectos se detecten antes de que el panel entre en el contenedor.</li>
          </ol>
        </div>

        <CostDisclaimer />

        <RelatedProductsCards slugs={article.relatedProductSlugs || ['tempered-glass', 'laminated-glass']} />

        <LeadMagnetCTA variant="footer" articleSlug={SLUG} />

        <FAQ items={buyerFaq} title="Preguntas frecuentes del comprador: MOQ (Pedido Mínimo), certificación, plazo de entrega, envío" />

        <h2 id="buyer-faq" className="sr-only">Preguntas frecuentes del comprador</h2>

        <FAQ items={specFaq} title="Preguntas frecuentes sobre especificaciones" />
      </BlogArticleLayout>
    </>;
}