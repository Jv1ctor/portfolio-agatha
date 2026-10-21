import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Crachá completo — fiel ao Figma (Group 100805, node 743:1171):
 * - Grupo: x=1259, y=1237, 377×506, rotate 15.24°
 * - 6 partes internas com coordenadas relativas ao grupo (spec §4.5):
 *   1. Base (exclude): left=-9px, top=56px, 361×448 (renderizada)
 *   2. Clip: left=-9px, top=56px, 361px de largura (z-index alto)
 *   3. Furo (hole): left=73px, top=101px, 102×102
 *   4. Ellipse 378: left=132px, top=69px, 124×115 — decorativa (div rounded-full)
 *   5. Union: left=108px, top=28px, 125×145 — AUSENTE na v1!
 *   6. 4× Linha: left=-44px, top=244/285/326/367px, rotate 14.8° cada — AUSENTES na v1!
 * O texto typewriter ("Acredito que o design é") já vem baked no exclude.svg.
 */
function Cracha({ alt }: { alt: string }) {
  const linhaTops = [244, 285, 326, 367]; // espaçamento ~41px entre linhas

  return (
    <div
      className="relative mx-auto"
      style={{
        width: "377px",
        height: "506px",
        transform: "rotate(15.24deg)",
      }}
    >
      {/* 1. Base do crachá (exclude — corpo principal) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/cracha-exclude.svg"
        alt={alt}
        width={361}
        height={448}
        className="absolute"
        style={{ left: "-9px", top: "56px" }}
      />

      {/* 2. Clip (prendedor) no topo — z-index alto */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/cracha-clip.png"
        alt=""
        aria-hidden="true"
        width={228}
        height={202}
        className="absolute z-10"
        style={{ left: "-9px", top: "56px", width: "361px" }}
      />

      {/* 3. Furo decorativo (hole) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/cracha-buraco.svg"
        alt=""
        aria-hidden="true"
        width={102}
        height={102}
        className="absolute"
        style={{ left: "73px", top: "101px" }}
      />

      {/* 4. Ellipse decorativa (378) — azul gelo translúcido */}
      <div
        className="absolute rounded-full bg-[color:var(--color-blue-soft)]"
        style={{
          left: "132px",
          top: "69px",
          width: "124px",
          height: "115px",
          opacity: 0.6,
        }}
        aria-hidden="true"
      />

      {/* 5. Union — OBRIGATÓRIO (faltava na v1!) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/cracha-union.svg"
        alt=""
        aria-hidden="true"
        width={125}
        height={145}
        className="absolute"
        style={{ left: "108px", top: "28px" }}
      />

      {/* 6. Quatro linhas decorativas — OBRIGATÓRIAS (faltavam na v1!)
          O svg da linha é um traço fino (174.8×3.45) NATIVO não rotacionado;
          renderizamos na largura 169 com a espessura natural e rotacionamos
          em CSS (14.8°) — esticar para 44.6px engrossaria o traço 13×. */}
      {linhaTops.map((top, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src="/images/home/cracha-linha.svg"
          alt=""
          aria-hidden="true"
          width={169}
          height={3}
          className="absolute"
          style={{
            left: "-44px",
            top: `${top}px`,
            transform: "rotate(14.8deg)",
          }}
        />
      ))}
    </div>
  );
}

/**
 * Seção Philosophy — fiel ao Figma (node 751:1318):
 *
 * - Título "Filosofia": x=222, y=1266, 120px AM Novecento #6F96CE
 * - Lead: x=222, y=1481, w=705, Clother Bold 32px, justificado
 * - Body1: x=222, y=1590, w=702, 26px
 * - Body2: x=222, y=1704, w=702, 26px
 * - Crachá: x=1259, y=1237 (grupo 377×506 rotacionado 15.24°)
 *
 * NÃO IMPLEMENTAR: Figma nodes 753:1649 e 753:1653 (duplicados leftover).
 *
 * Layout: grid 2 colunas — coluna do texto = 1037px (60.01vw: 1259−222),
 * coluna do crachá = 377px fixo (assenta em x=1259 = 72.8% @1728).
 * O padding horizontal (pl 12.85vw / pr 5.32vw) mora no wrapper da página
 * (page.tsx), no padrão vw do Plan 2 — NÃO em .container-narrow.
 * As elipses decorativas (758:298 em x=27 y=1125, 758:112 em x=581 y=1608)
 * também são posicionadas no wrapper da página (page.tsx), NÃO aqui.
 */
export function PhilosophySection({ dict }: { dict: Dictionary }) {
  const home = dict.home;
  return (
    <section className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_377px] md:gap-x-0">
      {/* Texto esquerda */}
      <div>
        {/* Título: 120px no Figma = clamp(3rem, 6.94vw, 7.5rem) */}
        <h2 className="font-display text-[color:var(--color-blue)] text-[clamp(3rem,6.94vw,7.5rem)] leading-none mb-6">
          {home.philosophy}
        </h2>

        {/* Lead: 32px no Figma = text-[2rem], justificado, w=705 → max-w-[705px] */}
        <p className="max-w-[705px] text-[2rem] font-bold leading-snug text-justify text-[color:var(--color-blue)] mb-4">
          {home.philosophyLead}
        </p>

        {/* Body1: 26px = text-[1.625rem], justificado, w=702; bold "experiência humana" */}
        <p className="max-w-[702px] text-[1.625rem] leading-relaxed text-justify text-[color:var(--color-blue)] mb-3">
          {home.philosophyBody1}
          <strong className="font-bold">{home.philosophyBody1Bold}</strong>
          {home.philosophyBody1End}
        </p>

        {/* Body2: 26px, justificado; bolds "3D", "design de interfaces", "pesquisa" */}
        <p className="max-w-[702px] text-[1.625rem] leading-relaxed text-justify text-[color:var(--color-blue)]">
          {home.philosophyBody2}
          <strong className="font-bold">{home.philosophyBody2Bold1}</strong>
          {home.philosophyBody2Mid}
          <strong className="font-bold">{home.philosophyBody2Bold2}</strong>
          {home.philosophyBody2Mid2}
          <strong className="font-bold">{home.philosophyBody2Bold3}</strong>
          {home.philosophyBody2End}
        </p>
      </div>

      {/* Crachá direita — 377px fixos, encostado à direita (x=1636 @1728) */}
      <div className="flex justify-center md:justify-end">
        <Cracha alt={home.crachaAlt} />
      </div>
    </section>
  );
}