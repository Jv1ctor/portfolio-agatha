'use client';

import { useState } from 'react';
import { BrandHero } from '@/components/layout/BrandHero';
import { useFinePointer, useReducedMotion } from '@/lib/hooks/use-media-query';
import { useTranslations } from '@/lib/i18n/use-translation';
import type { LocalizedProject } from '@/lib/projects';
import { distributeColumns } from '@/lib/projects-search';
import { BentoCard } from './BentoCard';
import { CustomCursor } from './CustomCursor';
import s from './projects.module.css';

/** Ative/desative efeitos aqui. */
const SETTINGS = {
  customCursor: true,
  tiltDegrees: 5,
  parallax: true,
};

/**
 * Índice da página de projetos. Client Component: o estado da página (busca,
 * filtro, hover) vive aqui. O clique num card abre o case em modal, por rota interceptada.
 */
export function ProjectsIndex({ projects }: { projects: LocalizedProject[] }) {
  const { t } = useTranslations();
  const [hovered, setHovered] = useState<string | null>(null);
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const cursorEnabled = SETTINGS.customCursor && finePointer && !reducedMotion;

  const columns = distributeColumns(projects);

  return (
    <div id="top" className={s.page}>
      <BrandHero
        variant="home"
        title={t('projectsPage.title')}
        fullWidth
        bleedBottom={0.16}
        parallax={SETTINGS.parallax}
      />

      <section className={s.main}>
        <h2 className={s.srOnly} style={{ fontFamily: 'var(--font-body)' }}>
          {t('projectsPage.listHeading').replace('{count}', String(projects.length))}
        </h2>

        <div className={s.cols}>
          {columns.map((col) => (
            <div key={col.key} className={`${s.col} ${col.wide ? s.colWide : s.colNarrow}`}>
              {col.items.map(({ project, index }) => (
                <BentoCard
                  key={project.slug}
                  project={project}
                  index={index}
                  tiltDegrees={SETTINGS.tiltDegrees}
                  hideCursor={cursorEnabled}
                  onHover={setHovered}
                />
              ))}
            </div>
          ))}
        </div>
      </section>

      {cursorEnabled && <CustomCursor active={hovered !== null} />}
    </div>
  );
}
