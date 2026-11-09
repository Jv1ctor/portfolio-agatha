import type { ReactNode } from "react";
import type { LocalizedProject, Slug } from "@/lib/projects";
import { PontosSemNoCase } from "./PontosSemNoCase";
import { BatucoTucoCase } from "./BatucoTucoCase";
import { BatucoTucoHero } from "./BatucoTucoHero";
import { PontinhasSoltasCase } from "./PontinhasSoltasCase";

export { PontosSemNoCase, BatucoTucoCase, BatucoTucoHero, PontinhasSoltasCase };

/** Slug → corpo do case, para reutilizar fora da página completa (ex.: no modal). */
export const caseBodies: Record<
  Slug,
  (props: { project: LocalizedProject }) => ReactNode
> = {
  "pontos-sem-no": PontosSemNoCase,
  "batuco-tuco": BatucoTucoCase,
  "pontinhas-soltas": PontinhasSoltasCase,
};

/**
 * Slug → capa própria do case (no lugar da `<img>` do `coverImage`, que fica só
 * no card). Página completa e modal usam a mesma, como em `caseBodies`.
 */
export const caseCovers: Partial<
  Record<Slug, (props: { project: LocalizedProject }) => ReactNode>
> = {
  "batuco-tuco": BatucoTucoHero,
};
