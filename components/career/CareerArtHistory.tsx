import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { CareerPill, at } from "./layout";
import s from "./career.module.css";

/**
 * Pills "Próxima parada" (201:361: 3 × 400, gap 164, y 2184) e "uma breve história da
 * arte..." (201:358) com os parágrafos numerados 01–05.
 *
 * O Figma abre espaço para o pill com espaços no começo do texto; aqui é `text-indent`,
 * medido no render 2x (1º glifo da 1ª linha − 1º glifo da 2ª): 54 / 56.5 / 54 / 48 / 71
 * (no 05 a 1ª linha é justificada e os espaços esticam).
 */
const items = [
  { key: "01", pill: [937, 2348], text: [937, 2363, 674], indent: 54 },
  { key: "02", pill: [937, 2504], text: [937, 2520, 674], indent: 56.5 },
  { key: "03", pill: [118, 2800], text: [118, 2817, 387], indent: 54 },
  { key: "04", pill: [117, 2974], text: [121, 2991, 387], indent: 48 },
  { key: "05", pill: [560, 2974], text: [561, 2993, 289], indent: 71 },
] as const;

export function CareerArtHistory({ dict }: { dict: Dictionary }) {
  const art = dict.career.artHistory;
  return (
    <>
      <div className={s.nextStops}>
        {[94, 658, 1222].map((x) => (
          <CareerPill key={x} className={s.a} style={at(x, 2184, 400)}>
            {dict.career.nextStop}
          </CareerPill>
        ))}
      </div>

      <section className={s.section} aria-labelledby="career-art">
        <h2 id="career-art" className={`${s.a} ${s.title} ${s.h2}`} style={at(120, 2353, 730)}>
          {art.title}
        </h2>

        {items.map(({ key, pill, text, indent }) => (
          <div
            key={key}
            className={s.numbered}
            style={{ "--px": pill[0], "--py": pill[1], "--indent": indent, "--indent-sm": 46 } as CSSProperties}
          >
            <CareerPill>{key}</CareerPill>
            <p className={`${s.a} ${s.text}`} style={at(text[0], text[1], text[2])}>
              {art.items[key]}
            </p>
          </div>
        ))}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/carreira/agua-viva.webp"
          alt=""
          aria-hidden
          width={178}
          height={241}
          loading="lazy"
          decoding="async"
          className={`${s.a} ${s.jelly}`}
          style={at(574, 2672, 178)}
        />
        {/* Botões verde/rosa/amarelo + maçãs de feltro (201:582, 201:575, 201:55, 201:529,
            201:530): sobrepostos no Figma, então um recorte só. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/carreira/botoes-macas.webp"
          alt=""
          aria-hidden
          width={498}
          height={578}
          loading="lazy"
          decoding="async"
          className={`${s.a} ${s.cluster}`}
          style={at(1032, 2677, 498)}
        />
      </section>
    </>
  );
}
