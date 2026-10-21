import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Seção de saudação — fiel ao Figma Pontossemno (node 751:1318):
 *
 * Layout (canvas 1728px):
 * - Ilustração ola.svg: x=260, y=557, 513×477 (esquerda)
 * - Mão acenando ola-mao.svg: x=121, y=882, 215×248, rotate -4.66° (overlay na ilustração)
 * - Título "Olá a todos,": x=1031, y=575, 120px AM Novecento #6F96CE, 2 linhas
 * - Intro: x=843, y=948, w=648, 26px Clother Light, justificado
 *
 * A elipse rosa (695×695, x=1394, y=436) e o ":d" gigante são posicionados
 * no wrapper da página (page.tsx), NÃO aqui.
 */
export function GreetingSection({ dict }: { dict: Dictionary }) {
  const home = dict.home;
  return (
    <section className="relative grid grid-cols-1 items-start gap-8 md:grid-cols-[1fr_1.3fr]">
      {/* Ilustração + mão acenando (overlay) */}
      <div className="relative mx-auto md:mx-0">
        {/* Ilustração principal: Ágatha acenando */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/ola.svg"
          alt={home.greetingAlt}
          width={513}
          height={477}
          className="w-full max-w-[400px] md:max-w-[513px]"
        />
        {/* Mão acenando — overlay absolute sobre a ilustração */}
        {/* Posição relativa ao ola.svg: x=121-260=-139, y=882-557=325 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/ola-mao.svg"
          alt=""
          aria-hidden="true"
          width={215}
          height={248}
          className="absolute hidden md:block"
          style={{
            left: '-139px',
            top: '325px',
            transform: 'rotate(-4.66deg)',
          }}
        />
      </div>

      {/* Texto */}
      <div className="md:pt-4">
        {/* Título: 120px no Figma = clamp(3rem, 6.94vw, 7.5rem) */}
        <h2 className="font-display text-[color:var(--color-blue)] text-[clamp(3rem,6.94vw,7.5rem)] leading-[0.9] mb-8">
          {home.greeting}
        </h2>
        {/* Intro: 26px no Figma = text-[1.625rem], justificado, max-w-[648px] */}
        <div className="max-w-[648px] space-y-4 text-[1.625rem] leading-[1.26] text-justify text-[color:var(--color-blue)]">
          <p>{home.intro}</p>
        </div>
      </div>
    </section>
  );
}