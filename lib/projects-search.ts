import type { LocalizedProject } from './projects';

export type BentoColumn = {
  key: 0 | 1 | 2;
  /** A coluna 0 é a estreita; as demais são largas. */
  wide: boolean;
  items: { project: LocalizedProject; index: number }[];
};

/**
 * Distribui os projetos nas colunas da grade bento, respeitando `grid.column` de cada um.
 * `index` numera os cards na ordem de saída (coluna a coluna) e dá o atraso da animação de
 * entrada. Colunas sem projeto somem.
 */
export function distributeColumns(projects: LocalizedProject[]): BentoColumn[] {
  let index = 0;
  return ([0, 1, 2] as const)
    .map((key) => ({
      key,
      wide: key !== 0,
      items: projects
        .filter((project) => project.grid.column === key)
        .map((project) => ({ project, index: index++ })),
    }))
    .filter((column) => column.items.length > 0);
}
