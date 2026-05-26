import type { Project } from "@/content/projects";

const accentClasses: Record<Project["accent"], string> = {
  blue: "bg-[color:var(--color-blue)] text-white",
  orange: "bg-[color:var(--color-orange)] text-[color:var(--color-ink)]",
  pink: "bg-[color:var(--color-pink)] text-[color:var(--color-ink)]",
};

export function CaseHero({ project }: { project: Project }) {
  return (
    <header
      className={`rounded-2xl overflow-hidden ${accentClasses[project.accent]} mb-8`}
    >
      <div className="relative aspect-[640/238] flex items-end p-8">
        <h1
          className="font-display uppercase text-5xl md:text-7xl leading-none tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {project.title}
        </h1>
        {/* TODO: imagem hero exportada do Figma */}
      </div>
    </header>
  );
}
