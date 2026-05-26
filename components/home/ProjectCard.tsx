import Link from "next/link";
import type { Project } from "@/content/projects";

const accentClasses: Record<Project["accent"], string> = {
  blue: "bg-[color:var(--color-blue)] text-white",
  orange: "bg-[color:var(--color-orange)] text-[color:var(--color-ink)]",
  pink: "bg-[color:var(--color-pink)] text-[color:var(--color-ink)]",
};

const statusLabel: Record<Project["status"], string> = {
  concluido: "Concluído",
  "em-progresso": "Em progresso",
  "em-breve": "Em breve",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projetos/${project.slug}`}
      className="group block rounded-2xl overflow-hidden bg-white/70 ring-1 ring-[color:var(--color-cream-dark)] hover:ring-[color:var(--color-blue)]/40 transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      {/* Capa */}
      <div
        className={`relative aspect-[640/238] flex items-end p-6 ${accentClasses[project.accent]}`}
      >
        <h3
          className="font-display text-4xl md:text-5xl leading-none uppercase"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {project.title}
        </h3>
        {/* TODO: imagem real exportada do Figma como background */}
      </div>

      {/* Conteúdo */}
      <div className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="text-base font-medium text-[color:var(--color-ink)]">
            {project.subtitle}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs ${
              project.status === "concluido"
                ? "bg-[color:var(--color-blue)]/10 text-[color:var(--color-blue)]"
                : project.status === "em-progresso"
                  ? "bg-[color:var(--color-orange)]/15 text-[color:var(--color-orange)]"
                  : "bg-[color:var(--color-muted)]/15 text-[color:var(--color-muted)]"
            }`}
          >
            {statusLabel[project.status]}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags
            .filter((t) => t !== statusLabel[project.status])
            .map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[color:var(--color-cream-dark)] px-3 py-1 text-xs text-[color:var(--color-ink-soft)]"
              >
                {tag}
              </span>
            ))}
        </div>
        <p className="text-sm text-[color:var(--color-ink-soft)] leading-relaxed">
          {project.description}
        </p>
        <span className="mt-4 inline-block text-sm font-medium text-[color:var(--color-blue)] group-hover:underline">
          Ver mais →
        </span>
      </div>
    </Link>
  );
}

export function PlaceholderCard() {
  return (
    <div
      className="rounded-2xl overflow-hidden ring-1 ring-[color:var(--color-cream-dark)] opacity-80"
      aria-label="Projeto em breve"
    >
      <div
        className="aspect-[640/238] flex items-center justify-center text-white/80 text-sm tracking-wider uppercase"
        style={{ background: "var(--gradient-placeholder)" }}
      >
        Em breve
      </div>
      <div className="p-5">
        <div className="h-3 w-2/3 rounded-full bg-[color:var(--color-cream-dark)] mb-2" />
        <div className="h-3 w-1/3 rounded-full bg-[color:var(--color-cream-dark)] mb-4" />
        <div className="h-2 w-full rounded-full bg-[color:var(--color-cream-dark)] mb-1" />
        <div className="h-2 w-5/6 rounded-full bg-[color:var(--color-cream-dark)]" />
      </div>
    </div>
  );
}
