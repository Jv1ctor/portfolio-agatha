import type { ReactNode } from "react";
import type { LocalizedProject, Slug } from "@/lib/projects";
import { PontosSemNoCase } from "./PontosSemNoCase";
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
