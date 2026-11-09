import type { ReactNode } from "react";
import type { LocalizedProject, Slug } from "@/lib/projects";
import type { CaseAsideLayout } from "@/components/case-study/CaseShell";
import { PontosSemNoCase, pontosSemNoSlots } from "./PontosSemNoCase";
import { BatucoTucoCase } from "./BatucoTucoCase";
import { PontinhasSoltasCase } from "./PontinhasSoltasCase";
import { IdentidadeEventoCase } from "./IdentidadeEventoCase";

export {
  PontosSemNoCase,
  BatucoTucoCase,
  PontinhasSoltasCase,
  IdentidadeEventoCase,
};

/** Slug → corpo do case, para reutilizar fora da página completa (ex.: no modal). */
export const caseBodies: Record<
  Slug,
  (props: { project: LocalizedProject }) => ReactNode
> = {
  "pontos-sem-no": PontosSemNoCase,
  "batuco-tuco": BatucoTucoCase,
  "pontinhas-soltas": PontinhasSoltasCase,
  "identidade-evento-15-anos": IdentidadeEventoCase,
};

/** Partes do topo do case que ficam fora do corpo (props extras do `CaseShell`). */
export type CaseSlots = {
  /** Substitui a capa padrão (ex.: capa clicável que abre o lightbox). */
  cover?: ReactNode;
  aside?: ReactNode;
  asideLayout?: CaseAsideLayout;
  headerExtra?: ReactNode;
};

/**
 * Slug → slots do topo. A página completa e o modal chamam a mesma função, então
 * o case fica igual nos dois. `coverClassName` é a animação de entrada da capa
 * no modal (`heroIn`).
 */
export type CaseSlotsFn = (
  project: LocalizedProject,
  opts: { coverClassName?: string },
) => CaseSlots;

export const caseSlots: Partial<Record<Slug, CaseSlotsFn>> = {
  "pontos-sem-no": pontosSemNoSlots,
};
