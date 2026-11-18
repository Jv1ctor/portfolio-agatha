import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { CareerHero } from "./CareerHero";
import { CareerBand } from "./CareerBand";
import { CareerArtHistory } from "./CareerArtHistory";
import { CareerLife } from "./CareerLife";
import { CareerDrawing } from "./CareerDrawing";
import { CareerGallery } from "./CareerGallery";
import s from "./career.module.css";

/**
 * Página Minha carreira (Figma 201:53). Server Component: todo o texto vem do `dict`;
 * só a cena da boneca (KnittingDoll) é client. A barra do topo chega pronta em `top`.
 * Layout e escala: ver career.module.css.
 */
export function CareerView({ dict, top }: { dict: Dictionary; top: ReactNode }) {
  return (
    <article className={s.page}>
      {/* Figma: barra em y=40 (coluna de 1352 centrada), sobre o canvas no desktop. */}
      <div className={s.top}>
        <div className="container-wide pt-10">
          <div className="mx-auto max-w-[1352px]">{top}</div>
        </div>
      </div>
      <CareerHero dict={dict} />
      <CareerBand variant="journey" />
      <CareerArtHistory dict={dict} />
      <CareerLife dict={dict} />
      <CareerBand variant="rose" />
      <CareerDrawing dict={dict} />
      <CareerGallery dict={dict} />
    </article>
  );
}
