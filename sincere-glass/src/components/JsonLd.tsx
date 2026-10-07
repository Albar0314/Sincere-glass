/**
 * JsonLd — 将结构化数据注入页面
 * 用法: <JsonLd data={schemaObject} />
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
