import { Metadata } from "next";
import ProjectsClient from "@/components/projects/ProjectsClient";
import { makeAlternates } from "@/lib/i18n";
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
  return <ProjectsClient />;
}