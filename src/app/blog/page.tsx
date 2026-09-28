import type { Metadata } from "next";
// import { getPosts } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Industry insights, glass knowledge, and project updates from Sincere Glass.",
};

// TODO: Enable once WordPress + WPGraphQL is configured
// export const revalidate = 3600; // ISR: revalidate every hour

export default async function BlogPage() {
  // Uncomment when WPGraphQL is ready:
  // const postsData = await getPosts(10);
  // const posts = postsData.nodes;

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Blog</h1>
        <p className="text-brand-steel mb-12">
          Industry insights, technical guides, and company updates.
        </p>

        {/* Placeholder until WPGraphQL connected */}
        <div className="border border-dashed border-gray-300 rounded-lg p-12 text-center text-brand-steel">
          <p className="text-lg mb-2">Blog posts will appear here</p>
          <p className="text-sm">
            Connected to WordPress via WPGraphQL — publish posts in wp-admin and
            they show up automatically.
          </p>
        </div>

        {/* 
        Uncomment when ready:
        <div className="space-y-8">
          {posts.map((post: any) => (
            <article key={post.id} className="border-b border-gray-100 pb-8">
              <a href={`/blog/${post.slug}`} className="group">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-brand-sky transition-colors">
                  {post.title}
                </h2>
                <time className="text-sm text-brand-steel">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <div
                  className="mt-3 text-brand-steel line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
              </a>
            </article>
          ))}
        </div>
        */}
      </div>
    </section>
  );
}
