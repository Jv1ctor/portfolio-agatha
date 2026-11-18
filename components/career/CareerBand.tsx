import type { CSSProperties } from "react";
import { at } from "./layout";
import { OlharFace } from "./OlharFace";
import s from "./career.module.css";

/**
 * Faixas de largura total (arte, aria-hidden). Recortes do render 2x do Figma com o 1º
 * quadro do "olhar" já assado; o GIF do olhar (201:242 / 201:284, 658², x+103, y-81)
 * roda por cima, recortado pela metade da faixa (o frame do Figma tem overflow-clip).
 * Todos os quadros do GIF cobrem o 1º (conferido), então o assado nunca aparece.
 * Com mouse, no lugar do GIF entra o rosto com os olhos seguindo o cursor (OlharFace).
 *
 * - "journey": faixa azul 201:162 (y 1167, 1728 × 496; olhar na metade direita) +
 *   janelas do trem 201:77/201:122 (y 1663, 1728 × 497).
 * - "rose": faixa rosa 201:243 (y 4035, 1728 × 497; olhar na metade esquerda).
 */
export function CareerBand({ variant }: { variant: "journey" | "rose" }) {
  const journey = variant === "journey";
  return (
    <div
      aria-hidden
      className={`${s.a} ${s.island} ${journey ? s.band : s.bandRose}`}
      style={{ ...at(0, journey ? 1167 : 4035, 1728), "--iw": 1728 } as CSSProperties}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/carreira/${journey ? "faixa-azul" : "faixa-rosa"}.webp`}
        alt=""
        width={1728}
        height={journey ? 496 : 497}
        loading="lazy"
        decoding="async"
        style={at(0, 0, 1728)}
      />
      <div className={s.olharClip} style={{ ...at(journey ? 864 : 0, 0, 864), "--ih": 497 } as CSSProperties}>
        {/* GIF no toque; com mouse, os olhos seguem o cursor (OlharFace) */}
        <OlharFace />
      </div>
      {journey && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/carreira/faixa-trem.webp"
          alt=""
          width={1728}
          height={497}
          loading="lazy"
          decoding="async"
          style={at(0, 496, 1728)}
        />
      )}
    </div>
  );
}
