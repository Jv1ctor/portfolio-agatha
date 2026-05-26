import type { ReactNode } from "react";
import type { Project } from "@/content/projects";
import { CaseHero } from "./CaseHero";

const statusLabel: Record<Project["status"], string> = {
  concluido: "Concluído",
  "em-progresso": "Em progresso",
  "em-breve": "Em breve",
};

export function CaseShell({
  project,
  children,
}: {
  project: Project;
  children: ReactNode;
}) {
  return (
    <article className="container-narrow py-12">
      <CaseHero project={project} />

      <div className="flex items-center justify-between gap-2 mb-3">
        <h2 className="text-xl font-medium text-[color:var(--color-ink)]">
          {project.subtitle}
        </h2>
        <span className="rounded-full bg-[color:var(--color-blue)]/10 text-[color:var(--color-blue)] px-3 py-1 text-xs">
          {statusLabel[project.status]}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-6">
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

      <p className="text-[color:var(--color-ink-soft)] leading-relaxed mb-12">
        {project.description}
      </p>

      {children}

      <footer className="mt-20 py-8 border-t border-[color:var(--color-cream-dark)] text-center text-[color:var(--color-ink-soft)]">
        Obrigada por ter chegado até aqui!
      </footer>
    </article>
  );
}

export function CaseSection({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="mb-12">
      <h3
        className="font-display uppercase text-3xl md:text-4xl text-[color:var(--color-blue)] mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h3>
      {children ?? (
        <div className="aspect-[640/280] rounded-xl border border-dashed border-[color:var(--color-cream-dark)] flex items-center justify-center text-sm text-[color:var(--color-muted)]">
          {/* TODO: conteúdo a ser implementado quando os assets do Figma forem exportados */}
          Assets a exportar do Figma
        </div>
      )}
    </section>
  );
}
