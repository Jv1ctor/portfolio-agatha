import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { Loop, Rich, at } from "./layout";
import s from "./career.module.css";

/**
 * Topo da carreira (Figma 201:53, y 44–1082): boneca girando (turntable, GIF 201:340),
 * balão de pensamento (GIF 201:356, girado 7.66°) com a maçã (201:528), doodle de nuvem
 * (201:406), "como vim parar aqui?" (201:357) e as três colunas (201:394, gap 126).
 */
export function CareerHero({ dict }: { dict: Dictionary }) {
  const hero = dict.career.hero;
  return (
    <section className={s.section} aria-labelledby="career-title">
      <div className={`${s.a} ${s.heroDoll}`} style={at(8, 201, 751)}>
        <Loop name="boneca-giro" alt={hero.dollAlt} width={751} height={751} priority />
      </div>

      {/* Caixa girada de 847 × 544 centrada no envelope de 911.95 × 652.04 do Figma;
          o GIF já vem recortado na faixa visível (top -28.49%, altura 155.7%). */}
      <div
        className={`${s.a} ${s.island} ${s.heroCloud}`}
        style={{ ...at(660.94, 44, 911.95), "--iw": 911.95 } as CSSProperties}
      >
        <div style={{ ...at(32.475, 54.02, 847), rotate: "7.66deg" } as CSSProperties}>
          <Loop name="nuvem" alt={hero.thoughtAlt} width={847} height={544} priority />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/carreira/maca.webp" alt="" aria-hidden width={159} height={199.72} style={at(470.06, 221, 159)} />
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/carreira/doodle-nuvem.webp"
        alt=""
        aria-hidden
        width={155}
        height={125}
        className={`${s.a} ${s.doodleCloud}`}
        style={at(1323, 599, 155)}
      />

      <h1 id="career-title" className={`${s.a} ${s.title} ${s.h1}`} style={at(677, 600.95, 879)}>
        {hero.title}
      </h1>

      <div className={s.cols}>
        {([hero.col1, hero.col2, hero.col3] as Record<string, string>[]).map((parts, i) => (
          <p key={i} className={`${s.a} ${s.text}`} style={at(171 + i * 504, 958, 378)}>
            <Rich parts={parts} />
          </p>
        ))}
      </div>
    </section>
  );
}
