import { Metadata } from "next";
import ProjectsClient from "@/components/projects/ProjectsClient";
import { makeAlternates } from "@/lib/i18n";
import YouTubeEmbed from '@/components/YouTubeEmbed';

export const metadata: Metadata = {
  title: "Project Cases — 2,600+ Landmark Projects | Sincere Glass",
  description: "See our glass in action: Wuhan Station, Tianhe Airport T3, Expo Center, and 2,600+ more. Tempered, insulated, laminated, and enameled glass for China's landmark buildings.",
  openGraph: {
    title: "Engineering Project Cases | Sincere Glass",
    description: "2,600+ glass projects across China. See our work in airports, hospitals, commercial towers, and residential developments.",
    url: "https://sincereglass.com/projects"
  },
  alternates: makeAlternates("/projects")
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsClient />

      {/* Factory b-roll — closes the page with "the factory behind these projects" */}
      <section className="py-16 md:py-20 bg-brand-lighter border-t border-brand-light">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-xs text-brand-accent font-semibold uppercase tracking-wider mb-3">
                The factory behind these projects
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-dark tracking-tight mb-3">
                Every panel on this page was made here
              </h2>
              <p className="text-sm md:text-base text-brand-muted leading-relaxed">
                Our 20,000 m² Wuhan plant produces every piece of glass delivered to the projects above. Cutting, tempering, lamination, and IGU assembly all in-house.
              </p>
            </div>
            <YouTubeEmbed
              videoId="TDjYxiRUZOM"
              title="Inside Sincere Glass — Wuhan factory"
              aspectRatio="16/9"
            />
          </div>
        </div>
      </section>
    </>
  );
}