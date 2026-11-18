import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { at } from "./layout";
import s from "./career.module.css";

/**
 * "life gallery" (201:593, à direita, 2 linhas em 494), fantasminha (201:617), textos
 * (201:594/595/596) e a colagem (201:597 + joaninha 201:532). As 16 fotos se sobrepõem
 * (recortes, rotações e sombras do Figma), então a colagem são dois recortes do render:
 * "a" (x 56–1250, y 5583–6525) e "b" (x 380–1654, y 6150–6633), fora dos textos.
 */
export function CareerGallery({ dict }: { dict: Dictionary }) {
  const gallery = dict.career.gallery;
  return (
    <section className={s.section} aria-labelledby="career-gallery">
      <div className={s.galleryHead}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/carreira/fantasminha.webp"
          alt=""
          aria-hidden
          width={117}
          height={148}
          loading="lazy"
          decoding="async"
          className={`${s.a} ${s.ghost}`}
          style={at(1291, 5535, 117)}
        />
        <h2 id="career-gallery" className={`${s.a} ${s.title} ${s.h2sm} ${s.alignRight}`} style={at(1159.06, 5574, 494)}>
          {gallery.title}
        </h2>
      </div>
      <p className={`${s.a} ${s.text}`} style={at(1265, 5800, 387)}>
        {gallery.text1}
      </p>
      <div
        className={`${s.a} ${s.island} ${s.collage}`}
        style={{ ...at(56, 5583, 1598), "--iw": 1598 } as CSSProperties}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/carreira/galeria-a.webp"
          alt={gallery.collageAlt}
          width={1194}
          height={942}
          loading="lazy"
          decoding="async"
          style={at(0, 0, 1194)}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/carreira/galeria-b.webp"
          alt=""
          aria-hidden
          width={1274}
          height={483}
          loading="lazy"
          decoding="async"
          style={at(324, 567, 1274)}
        />
      </div>
      <p className={`${s.a} ${s.text}`} style={at(82, 6531, 291)}>
        {gallery.text2}
      </p>
      <p className={`${s.a} ${s.text}`} style={at(948, 6655, 701)}>
        {gallery.text3}
      </p>
    </section>
  );
}
