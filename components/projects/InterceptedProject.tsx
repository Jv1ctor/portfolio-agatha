import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/i18n/dictionaries";
import { getLocalizedProject, getNextSlug, type Slug } from "@/lib/projects";
import { CaseShell } from "@/components/case-study/CaseShell";
import { caseBodies } from "@/components/case-study/cases";
import { ProjectModal } from "./ProjectModal";

/**
 * Case aberto em modal por cima do índice. Só é renderizado em navegação no
 * cliente a partir de /{lang}/projetos (rota interceptada); aberto direto pela
 * URL ou recarregado, quem responde é a página completa do case.
 *
 * Implementação compartilhada pelas pastas `@modal/(.)<slug>`: uma por projeto,
 * como as páginas completas. O `(.)[slug]` dinâmico responde 500 no `next dev`
 * (Turbopack) desta versão do Next ("Invalid interception route … (.)(.)slug").
 */
export async function InterceptedProject({
  params,
  slug,
}: {
  params: Promise<{ lang: string }>;
  slug: Slug;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const project = getLocalizedProject(slug, dict);
  const nextProject = getLocalizedProject(getNextSlug(slug), dict);
  if (!project || !nextProject) notFound();
  const Body = caseBodies[slug];

  return (
    <ProjectModal
      title={project.title}
      nextHref={`/${lang}/projetos/${nextProject.slug}`}
      nextTitle={nextProject.title}
    >
      <CaseShell project={project} dict={dict}>
        <Body project={project} />
      </CaseShell>
    </ProjectModal>
  );
}
