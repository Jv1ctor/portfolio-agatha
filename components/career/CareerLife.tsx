import type { Dictionary } from "@/i18n/dictionaries";
import { at } from "./layout";
import { KnittingDoll } from "./KnittingDoll";
import s from "./career.module.css";

/** "vidinha" (201:359) com o coelho (201:409), o parágrafo (201:524) e a cena da boneca. */
export function CareerLife({ dict }: { dict: Dictionary }) {
  const life = dict.career.life;
  return (
    <section className={s.section} aria-labelledby="career-life">
      <div className={s.lifeHead}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/carreira/coelho.webp"
          alt=""
          aria-hidden
          width={158}
          height={173}
          loading="lazy"
          decoding="async"
          className={`${s.a} ${s.bunny}`}
          style={at(941, 3249, 158)}
        />
        {/* Alinhado à direita no Figma: borda direita em 1594.06 (calc(66.67% + 442)). */}
        <h2 id="career-life" className={`${s.a} ${s.right} ${s.title} ${s.h2}`} style={at(1594.06, 3292.04, 473)}>
          {life.title}
        </h2>
      </div>
      <p className={`${s.a} ${s.text}`} style={at(972, 3455, 617)}>
        {life.text}
      </p>
      <KnittingDoll labels={life.experiences} listLabel={life.experiencesLabel} sceneAlt={life.sceneAlt} />
    </section>
  );
}
