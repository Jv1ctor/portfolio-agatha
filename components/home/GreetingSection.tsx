import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Seção de saudação — fiel ao Figma Pontossemno (node 751:1318):
 *
 * Layout (canvas 1728px):
 * - Ilustração ola.svg: x=260, y=557, 513×477 (esquerda; coluna = 29.68vw)
 * - Mão acenando ola-mao.svg: x=121, y=882, 215×248, rotate -4.66° (overlay na ilustração;
 *   offsets/tamanho em % da ilustração pra escalar proporcionalmente: -27.10%/68.13%/41.91%)
 * - Título "Olá a todos,": x=1031, y=575, 120px AM Novecento #6F96CE, 2 linhas,
 *   lineHeight 1.383 (o box do Figma = fontSize×1.38 por linha: 2×166 = 332;
 *   inline style, porque o h2 { line-height: 1 } de globals.css (unlayered)
 *   vence qualquer utility leading-* do Tailwind)
 * - Intro: x=843, y=948, w=648 (37.5vw), 26px Clother Light, justificado
 *   (gap título→intro = 948 − (575+332) = 41px)
 *
 * Container: fora do .container-narrow (decisão da review I-1 — a coluna 1fr
 * do container limitava a ilustração a ~421px e desproporcionava a mão).
 * Padding horizontal espelha o Figma: ilustração em x=260 (15.05vw), página
 * termina em x=1534 (pr 11.23vw). A elipse rosa (695×695, x=1394, y=436) e o
 * ":d" gigante são posicionados no wrapper da página (page.tsx), NÃO aqui.
 *
 * pb-[196px]: o rodapé do texto (fim do intro = 1047) recebe pb 196 → o
 * wrapper da filosofia (page.tsx) começa em 1243 e o título (Filosofia)
 * assenta em y=1266 com o pt-6 de lá.
 */
export function GreetingSection({ dict }: { dict: Dictionary }) {
  const home = dict.home;
  return (
    <section className="relative grid grid-cols-1 items-start gap-8 px-6 pb-12 pt-12 md:grid-cols-[29.68vw_1fr] md:gap-x-[14.93vw] md:pb-[196px] md:pl-[15.05vw] md:pr-[11.23vw] md:pt-[203px]">
      {/* Ilustração + mão acenando (overlay) */}
      <div className="relative mx-auto md:mx-0">
        {/* Ilustração principal: Ágatha acenando (a coluna já limita a 29.68vw) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/ola.svg"
          alt={home.greetingAlt}
          width={513}
          height={477}
          className="h-auto w-full"
        />
        {/* Mão acenando — overlay absolute sobre a ilustração */}
        {/* Proporcional ao ola.svg: x=121−260 → −139/513 = −27.10%; y=882−557 → 325/477 = 68.13%;
            215/513 = 41.91% de largura (altura em auto) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/ola-mao.svg"
          alt=""
          aria-hidden="true"
          width={215}
          height={248}
          className="absolute hidden md:block"
          style={{
            left: '-27.10%',
            top: '68.13%',
            width: '41.91%',
            height: 'auto',
            transform: 'rotate(-4.66deg)',
          }}
        />
      </div>

      {/* Texto — pt-[18px] assenta o título em y=575 (556.9 da ilustração + 18) */}
      <div className="md:pt-[18px]">
        {/* Título: 120px no Figma = clamp(3rem, 6.94vw, 7.5rem);
            lineHeight 1.383 inline — o box do Figma (332 = 2×120×1.383) é o
            line-height NATURAL da fonte; o h2 { line-height: 1 } de
            globals.css venceria a utility leading-*, por isso é inline */}
        <h2
          className="font-display text-[color:var(--color-blue)] text-[clamp(3rem,6.94vw,7.5rem)] mb-[41px]"
          style={{ lineHeight: 1.383 }}
        >
          {home.greeting}
        </h2>
        {/* Intro: 26px no Figma = text-[1.625rem], justificado; w=648 → 37.5vw, */}
        {/* outdent pra x=843 (10.88vw à esquerda da coluna do título, x=1031) */}
        <div className="max-w-[648px] text-[1.625rem] leading-[1.26] text-justify text-[color:var(--color-blue)] md:-ml-[10.88vw] md:w-[37.5vw]">
          <p>{home.intro}</p>
        </div>
      </div>
    </section>
  );
}
