import type { Dictionary } from "@/i18n/dictionaries";
import { at } from "./layout";
import { DrawingPlayground } from "./board/DrawingPlayground";
import s from "./career.module.css";

/**
 * "hora do desenho" (201:360): tartaruga (201:324, atrás do título — PNG com alfa),
 * lousa mágica (201:413), parágrafo (201:531) e os cubos das ferramentas (201:621).
 * A lousa e os cubos são a brincadeira do `DrawingPlayground` (spec, Emenda 3).
 */
export function CareerDrawing({ dict }: { dict: Dictionary }) {
  const drawing = dict.career.drawing;
  return (
    <section className={s.section} aria-labelledby="career-drawing">
      <div className={s.turtleHead}>
        {/* Caixa do SVG do Figma: inset -2.29% / -3.15% da caixa do nó (51, 4605). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/carreira/tartaruga.webp"
          alt=""
          aria-hidden
          width={202}
          height={196}
          loading="lazy"
          decoding="async"
          className={`${s.a} ${s.turtle}`}
          style={at(46.52, 4599.22, 202)}
        />
        <h2 id="career-drawing" className={`${s.a} ${s.title} ${s.h2} ${s.nowrap}`} style={at(161, 4618, 1052)}>
          {drawing.title}
        </h2>
      </div>
      <DrawingPlayground labels={drawing}>
        <p className={`${s.a} ${s.text}`} style={at(1296, 4710, 295)}>
          {drawing.text}
        </p>
      </DrawingPlayground>
    </section>
  );
}
