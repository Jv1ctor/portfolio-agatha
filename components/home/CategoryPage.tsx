import { BrandHero } from "@/components/layout/BrandHero";
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
    <>
      <BrandHero title={heroTitle} />
      <div className="container-narrow py-12">
        {/* Coluna de cards = 702px (largura do card no desktop do Figma), centralizada */}
        <div className="mx-auto flex max-w-[702px] flex-col gap-12">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
          {Array.from({ length: placeholderCount }).map((_, i) => (
            <PlaceholderCard key={`placeholder-${i}`} />
          ))}
        </div>
      </div>
    </>
  );
}
