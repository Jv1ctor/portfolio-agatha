'use client';

import Link from 'next/link';
import { BrandHero } from '@/components/layout/BrandHero';
import { useTranslations } from '@/lib/i18n/use-translation';
import type { LocalizedProject } from '@/lib/projects';

/**
 * Índice da página de projetos. Client Component: o estado da página (busca,
 * filtro, hover) entra aqui nas próximas tasks. Por ora, banner + lista simples
 * de links para os cases (o clique será interceptado pelo modal na Task 4).
 */
export function ProjectsIndex({ projects }: { projects: LocalizedProject[] }) {
  const { t, locale } = useTranslations();

  return (
    <div id="top">
      <BrandHero variant="home" title={t('projectsPage.title')} />
      <ul>
        {projects.map((project) => (
          <li key={project.slug}>
            <Link href={`/${locale}/projetos/${project.slug}`} scroll={false}>
              {project.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
