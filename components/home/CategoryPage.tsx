import { ProjectCard, PlaceholderCard } from "./ProjectCard";
import { projectsByCategory } from "@/content/projects";
import type { CategoryKey } from "@/lib/site";

type Props = {
  category: CategoryKey;
  heroTitle: string;
  placeholderCount?: number;
};

export function CategoryPage({ category, heroTitle, placeholderCount = 2 }: Props) {
  const projects = projectsByCategory(category);

  return (
    <div className="container-narrow py-12">
      <h1
        className="font-display uppercase text-[color:var(--color-blue)] text-6xl md:text-8xl leading-[0.95] tracking-tight mb-10"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {heroTitle}
      </h1>

      <div className="flex flex-col gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
        {Array.from({ length: placeholderCount }).map((_, i) => (
          <PlaceholderCard key={`placeholder-${i}`} />
        ))}
      </div>
    </div>
  );
}
