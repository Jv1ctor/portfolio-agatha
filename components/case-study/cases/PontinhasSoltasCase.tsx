import type { CSSProperties, ReactNode } from "react";
import type { LocalizedProject } from "@/lib/projects";
import { CaseSection, DashedPill, bodyFontBold } from "@/components/case-study/CaseShell";
import { ZoomButton, ZoomFrame } from "@/components/case-study/batuco/Zoom";
import b from "./batuco.module.css";
import s from "./pontinhas.module.css";

const base = "/images/projects/pontinhas-soltas";
export const pontinhasBase = base;

/** Índices no lightbox (mesma ordem de `getPontinhasLightbox`, em pontinhas/lightbox.ts). */
export const LB_PHOTOS = 1;
const LB_SHOWCASE = 7;
const LB_CREAM = 8;
const LB_CARDS = 12;

/** Texto corrido do Figma: Clother Regular 15px/18px, justificado a partir do md. */
const textClass =
  "font-normal text-[0.9375rem] leading-[18px] text-[color:var(--color-blue)] md:text-justify";

/** Títulos (Clother Bold 32px) com as caixas do Figma — ver .title* em batuco.module.css. */
const title = {
  base: b.title,
  box30: `${b.title} ${b.titleBox30}`,
  line18: `${b.title} ${b.titleLine18}`,
};

/** Caixa em px do Figma: x, y, largura, altura. */
type Box = readonly [number, number, number, number];

function boxVars([x, y, w, h]: Box, extra?: Record<string, string | number>) {
  return { "--x": x, "--y": y, "--w": w, "--h": h, ...extra } as CSSProperties;
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-[18px]">
      {items.map((p, i) => (
        <p key={i} className={textClass}>
          {p}
        </p>
      ))}
    </div>
  );
}

/* ---------- Dados de layout (não traduzíveis) ---------- */

/** Nomes no card azul (nodes 17:3119/3163/3186/3210/3240), na ordem de `showcase.names`. */
const showcaseNames: readonly (readonly [number, number])[] = [
  [160.45, 863.61],
  [428.33, 861.71],
  [672.24, 862.13],
  [953.26, 861.97],
  [1201.81, 862.08],
];

/** Grupos da prancha creme (relativos ao frame 17:3247), na ordem do lightbox. */
const creamGroups: { file: string; box: Box; width: number; height: number }[] = [
  { file: "voadores", box: [113.225, 83.432, 1123.74, 517.879], width: 2248, height: 1036 },
  { file: "turnarounds", box: [91.986, 675.458, 1168.025, 1177.864], width: 2337, height: 2356 },
  { file: "cabecas", box: [99.066, 1939.357, 1151.011, 565.297], width: 2303, height: 1131 },
  { file: "danca", box: [102.683, 2505.051, 1162.599, 534.841], width: 2326, height: 1070 },
];
export const creamFiles = creamGroups;

/**
 * Cards dos personagens (node 17:3989), na ordem de `characterCards.list`
 * (Ali, Jemmy, Lac, Nina, Haggy). Coordenadas relativas ao grupo (1360.95 × 1507.54):
 * nome e frase (posição, corpo e largura da caixa), cores do Figma e, para o
 * card empilhado do mobile, o recorte da arte (do topo do retângulo até o nome).
 */
const cards: {
  name: readonly [number, number, number];
  text: readonly [number, number, number, number];
  fg: string;
  bg: string;
  crop: Box;
}[] = [
  { name: [36.97, 598.22, 87.875], text: [233, 616.81, 16.899, 192.648], fg: "#f4aecc", bg: "#1b2949", crop: [6.55, 15.21, 449.994, 583.01] },
  { name: [482.19, 624.94, 63.987], text: [733.88, 648.41, 13.519, 149.304], fg: "#0e488f", bg: "#faf3eb", crop: [456.55, 15.21, 449.994, 609.73] },
  { name: [937.69, 604.62, 87.875], text: [1133.72, 618.94, 16.899, 192.648], fg: "#6f95ce", bg: "#fadae7", crop: [906.54, 15.21, 449.994, 589.41] },
  { name: [124.85, 1368.42, 87.875], text: [386.78, 1403.91, 16.899, 192.648], fg: "#e0ecef", bg: "#6f95ce", crop: [7.15, 761.6, 690.89, 606.82] },
  { name: [739.89, 1368.42, 87.875], text: [1092.21, 1387.77, 16.899, 243.152], fg: "#fadae7", bg: "#0e488f", crop: [698.02, 761.6, 659.18, 606.82] },
];

/**
 * Corpo do case (tudo entre `<CaseShell>` e `</CaseShell>`), reutilizado pela página e pelo modal.
 *
 * `zoom` (só a página completa passa): aria-label de cada item do lightbox ("Ampliar: …").
 * Com ele, imagens e pranchas viram gatilhos com zoom no hover e ganham o reveal ao
 * rolar — o mesmo comportamento do Batuco-tuco. Sem ele (modal), o HTML fica sem isso.
 */
export function PontinhasSoltasCase({
  project,
  zoom,
}: {
  project: LocalizedProject;
  zoom?: readonly string[];
}) {
  // As chaves abaixo só existem no Pontinhas soltas; isso também estreita o tipo.
  if (!("aiNote" in project)) return null;

  const { creationProcess: cp, prototyping, finalProject, tools, showcase, characterCards } =
    project.sections;
  const gallery = project.gallery;
  const creamAlts = [gallery.flyingAlt, gallery.turnaroundsAlt, gallery.headsAlt, gallery.dancingAlt];

  /** Bloco de HTML vivo → moldura com zoom + reveal (só com `zoom`). */
  const frame = (index: number, node: ReactNode) =>
    zoom ? (
      <ZoomFrame index={index} label={zoom[index]} board className={b.rv}>
        {node}
      </ZoomFrame>
    ) : (
      node
    );
  /** Imagem → botão com zoom (só com `zoom`). */
  const image = (index: number, node: ReactNode) =>
    zoom ? (
      <ZoomButton index={index} label={zoom[index]}>
        {node}
      </ZoomButton>
    ) : (
      node
    );
  const reveal = zoom ? b.rv : "";

  return (
    <>
      {/* 1. Título, tags e intro (node 17:2992) */}
      <section className="flex flex-col gap-6">
        <h1
          className={`text-[1.75rem] text-[color:var(--color-blue)] md:text-[2rem] ${title.box30}`}
          style={bodyFontBold}
        >
          {project.subtitle}
        </h1>
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <DashedPill>{tag}</DashedPill>
            </li>
          ))}
        </ul>
        <Paragraphs items={project.intro.split("\n\n")} />
      </section>

      {/* 2. Processo de criação (node 17:3014) */}
      <CaseSection title={cp.title} size="lg" titleClassName={title.box30}>
        <Paragraphs items={cp.paragraphs} />
      </CaseSection>

      {/* 3. Prototipagem + 6 fotos (node 17:3019) */}
      <div className="flex flex-col gap-[33px]">
        <CaseSection title={prototyping.title} size="lg" titleClassName={title.base}>
          <ul className="mb-6 flex flex-wrap gap-2.5">
            {prototyping.tabs.map((tab) => (
              <li key={tab}>
                <DashedPill>{tab}</DashedPill>
              </li>
            ))}
          </ul>
          <Paragraphs items={prototyping.paragraphs} />
        </CaseSection>

        {/* Figma: 3 × 446.9 com 6px entre as fotos e 28px entre as fileiras. Cada
            foto é o export do nó (recorte do Figma); o lightbox mostra o original. */}
        <ul className={`grid grid-cols-1 gap-x-[6px] gap-y-[28px] sm:grid-cols-2 lg:grid-cols-3 ${reveal}`}>
          {prototyping.images.map((alt, i) => (
            <li key={alt}>
              {image(
                LB_PHOTOS + i,
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`${base}/prototipagem/recorte-${i + 1}@2x.jpg`}
                  alt={alt}
                  width={894}
                  height={503}
                  loading="lazy"
                  className={s.photo}
                />,
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* 4. Projeto final + Ferramentas (node 17:3051) */}
      {/* minmax(0, …): a linha de pills sem quebra (≥ 1432px) não alarga a trilha. */}
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,669fr)_minmax(0,641fr)] lg:gap-[41px]">
        <CaseSection title={finalProject.title} size="lg" titleClassName={title.line18}>
          <Paragraphs items={finalProject.paragraphs} />
        </CaseSection>
        <CaseSection title={tools.title} size="lg" titleClassName={title.base}>
          {/* No Figma as cinco pills ocupam os 641px exatos; no Chrome a Clother sai ~3px
              mais larga por pill. Com a coluna cheia (≥ 1432px), a linha passa um pouco
              da coluna sem quebrar, como as tags do Batuco-tuco. */}
          <ul className="flex flex-wrap gap-2.5 min-[1432px]:flex-nowrap">
            {tools.items.map((tool) => (
              <li key={tool}>
                <DashedPill>{tool}</DashedPill>
              </li>
            ))}
          </ul>
        </CaseSection>
      </div>

      {/* 5. Pranchas (node 17:3079): 28px entre elas, como no Figma */}
      <div className="flex flex-col gap-7">
        {/* Card azul: arte do Figma sem os nomes + nomes vivos (node 17:3082) */}
        {frame(
          LB_SHOWCASE,
          <section className={s.showcase} aria-label={showcase.label}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${base}/vitrine/arte.webp`}
              srcSet={`${base}/vitrine/arte.webp 1352w, ${base}/vitrine/arte@2x.webp 2704w`}
              sizes="(min-width: 1432px) 1352px, (min-width: 800px) calc(100vw - 5rem), 90vw"
              alt={gallery.showcaseAlt}
              width={1352}
              height={941}
              loading="lazy"
              className={s.fill}
            />
            {/* Os nomes já estão no alt da arte. */}
            <ul className={s.showcaseNames} aria-hidden>
              {showcase.names.map((name, i) => (
                <li
                  key={name}
                  className={s.showcaseName}
                  style={{ "--x": showcaseNames[i][0], "--y": showcaseNames[i][1] } as CSSProperties}
                >
                  {name}
                </li>
              ))}
            </ul>
          </section>,
        )}

        {/* Prancha creme: quatro grupos, cada um ampliável (node 17:3247) */}
        <div className={`${s.cream} ${reveal}`}>
          {creamGroups.map((g, i) => {
            // Arquivo 1x = metade do @2x, arredondada (o srcset só aceita `w` inteiro).
            const w1 = Math.round(g.width / 2);
            const h1 = Math.round(g.height / 2);
            return (
              <div key={g.file} className={s.place} style={boxVars(g.box)}>
                {image(
                  LB_CREAM + i,
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`${base}/prancha/${g.file}.webp`}
                    srcSet={`${base}/prancha/${g.file}.webp ${w1}w, ${base}/prancha/${g.file}@2x.webp ${g.width}w`}
                    sizes="(min-width: 1432px) 1170px, 87vw"
                    alt={creamAlts[i]}
                    width={w1}
                    height={h1}
                    loading="lazy"
                    className={s.fill}
                  />,
                )}
              </div>
            );
          })}
        </div>

        {/* Cards dos personagens: arte sem o texto + nomes e frases vivos (node 17:3989) */}
        <div className={s.cardsOuter}>
          {frame(
            LB_CARDS,
            <section className={s.cards} aria-label={characterCards.label}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${base}/cards/arte.webp`}
                srcSet={`${base}/cards/arte.webp 1361w, ${base}/cards/arte@2x.webp 2722w`}
                sizes="(min-width: 1432px) 1361px, calc(100vw - 5rem)"
                alt=""
                aria-hidden
                width={1361}
                height={1508}
                loading="lazy"
                className={`${s.fill} ${s.cardsArt}`}
              />
              <ul className={s.cardList}>
                {characterCards.list.map((member, i) => {
                  const c = cards[i];
                  const [cx, cy, cw, ch] = c.crop;
                  return (
                    <li
                      key={member.name}
                      className={s.card}
                      style={{ "--fg": c.fg, "--bg": c.bg } as CSSProperties}
                    >
                      <span
                        className={s.cardCrop}
                        style={{ "--cx": cx, "--cy": cy, "--cw": cw, "--ch": ch } as CSSProperties}
                        aria-hidden
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`${base}/cards/arte.webp`}
                          srcSet={`${base}/cards/arte.webp 1361w, ${base}/cards/arte@2x.webp 2722w`}
                          sizes="(min-width: 40rem) 100vw, 200vw"
                          alt=""
                          loading="lazy"
                        />
                      </span>
                      <h3
                        className={s.cardName}
                        style={{ "--x": c.name[0], "--y": c.name[1], "--fs": c.name[2] } as CSSProperties}
                      >
                        {member.name}
                      </h3>
                      <p
                        className={s.cardText}
                        style={{ "--x": c.text[0], "--y": c.text[1], "--fs": c.text[2], "--w": c.text[3] } as CSSProperties}
                      >
                        {member.lines.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </section>,
          )}
        </div>

        {/* Nota sobre IA (node 17:4018) */}
        <p className={`${textClass} ml-auto max-w-[445px] italic`}>{project.aiNote}</p>
      </div>
    </>
  );
}
