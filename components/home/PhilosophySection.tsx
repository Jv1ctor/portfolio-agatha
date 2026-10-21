import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Crachá — geométria fiel ao Figma (Group 100805, node 757:94):
 * o grupo NÃO é rotacionado; cada parte é rotacionada individualmente dentro
 * de um wrapper absoluto do tamanho do bbox rotacionado
 * (flex items-center justify-center + child flex-none com o rotate):
 *   1. Base (exclude): wrapper left=-9.63px, top=56.26px, 361.355×448.188
 *      (bbox rotacionado); child natural 267.826×391.543 — o img é exibido no
 *      tamanho do viewBox (281.626×407.643) porque o SVG exporta com bleed da
 *      sombra pra direita/baixo (a forma ocupa o canto superior esquerdo)
 *   2. Buraco (Ellipse 377): wrapper left=72.63px, top=101.29px, 102.322²;
 *      child natural 83.34² (o viewBox do SVG é o tamanho natural)
 *   3. Ellipse 378 (bbox do vector): left=131.54px, top=69.27px, 123.702×115.263 —
 *      decorativa, div rounded-full
 *   4. Union: wrapper left=108.08px, top=28.03px, 125.164×145.207; child
 *      natural 95.83×124.387 — img no tamanho do viewBox (107.329×134.738,
 *      mesmo bleed de sombra do exclude)
 *   5. 4× Linha: wrapper 169.004×44.649 (bbox do traço rotacionado), lefts
 *      escalonados -11.51/-22.32/-33.13/-44px e tops 244.43/285.21/325.98/
 *      366.76px; child w=174.802 h=0 (img com espessura natural 3.45) e
 *      rotate 14.8°
 *   6. Texto typewriter (crachaSaying): wrapper left=-1.7px, top=244.3px,
 *      186.964×161.345; child rotate 15.55° com p de 23px, leading 1.8,
 *      lowercase, width 159.843 — por último no DOM (pinta sobre as linhas)
 *   7. Clip (cracha-clip.png) — z-10, sempre o mais alto.
 * Nota: spec §4.5 linha 318 dizia que o texto vem "baked" no exclude.svg —
 * errado: os SVGs exportados não contêm o texto.
 */
function Cracha({ alt, saying }: { alt: string; saying: string }) {
  // 5. Posições (left/top) dos wrappers das 4 linhas, do Figma
  const linhas = [
    { left: "-11.51px", top: "244.43px" },
    { left: "-22.32px", top: "285.21px" },
    { left: "-33.13px", top: "325.98px" },
    { left: "-44px", top: "366.76px" },
  ];

  return (
    <div
      className="relative mx-auto"
      style={{ width: "377px", height: "506px" }}
    >
      {/* 1. Base do crachá (exclude — corpo principal) */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: "-9.63px",
          top: "56.26px",
          width: "361.355px",
          height: "448.188px",
        }}
      >
        <div className="flex-none rotate-[15.24deg]">
          <div
            className="relative"
            style={{ width: "267.826px", height: "391.543px" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home/cracha-exclude.svg"
              alt={alt}
              width={281.626}
              height={407.643}
              className="absolute"
              style={{ left: 0, top: 0 }}
            />
          </div>
        </div>
      </div>

      {/* 2. Buraco (Ellipse 377) */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: "72.63px",
          top: "101.29px",
          width: "102.322px",
          height: "102.322px",
        }}
      >
        <div className="flex-none rotate-[15.24deg]">
          <div
            className="relative"
            style={{ width: "83.34px", height: "83.34px" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home/cracha-buraco.svg"
              alt=""
              aria-hidden="true"
              width={83.34}
              height={83.34}
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>

      {/* 3. Ellipse decorativa (378) — azul gelo translúcido (bbox do vector) */}
      <div
        className="absolute rounded-full bg-[color:var(--color-blue-soft)]"
        style={{
          left: "131.54px",
          top: "69.27px",
          width: "123.702px",
          height: "115.263px",
          opacity: 0.6,
        }}
        aria-hidden="true"
      />

      {/* 4. Union (flor/pétala no topo) */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: "108.08px",
          top: "28.03px",
          width: "125.164px",
          height: "145.207px",
        }}
      >
        <div className="flex-none rotate-[15.24deg]">
          <div
            className="relative"
            style={{ width: "95.83px", height: "124.387px" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home/cracha-union.svg"
              alt=""
              aria-hidden="true"
              width={107.329}
              height={134.738}
              className="absolute"
              style={{ left: 0, top: 0 }}
            />
          </div>
        </div>
      </div>

      {/* 5. Quatro linhas decorativas (réguas do texto) — o svg é um traço
          fino (174.802×3.45) NATIVO não rotacionado; rotacionamos em CSS (14.8°)
          — esticar para 44.65px engrossaria o traço 13×. O wrapper é o bbox
          do traço rotacionado (child de h=0 centrado, img sangra ±3.45px). */}
      {linhas.map((pos, i) => (
        <div
          key={i}
          className="absolute flex items-center justify-center"
          style={{
            left: pos.left,
            top: pos.top,
            width: "169.004px",
            height: "44.649px",
          }}
        >
          <div
            className="flex-none rotate-[14.8deg]"
            style={{ width: "174.802px", height: 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home/cracha-linha.svg"
              alt=""
              aria-hidden="true"
              width={174.802}
              height={3.45}
              className="absolute"
              style={{ left: 0, top: "-3.45px" }}
            />
          </div>
        </div>
      ))}

      {/* 6. Texto typewriter entre as réguas — por último no DOM: pinta
          sobre base e linhas (ordem do código de referência do Figma) */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: "-1.7px",
          top: "244.3px",
          width: "186.964px",
          height: "161.345px",
        }}
      >
        <div className="flex-none rotate-[15.55deg]">
          <p
            className="lowercase text-center text-[color:var(--color-blue-soft)] text-[23px] leading-[1.8]"
            style={{
              width: "159.843px",
              fontFamily: '"P22 Typewriter","Courier New",monospace',
            }}
          >
            {saying}
          </p>
        </div>
      </div>

      {/* 7. Clip (prendedor/pétala) — z-10, sempre o mais alto */}
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
 * - Crachá: x=1259, y=1237 (grupo 377×506 — partes rotacionadas
 *   individualmente, ver doc do Cracha)
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
        <Cracha alt={home.crachaAlt} saying={home.crachaSaying} />
      </div>
    </section>
  );
}