import type { Dictionary } from "@/i18n/dictionaries";
import { DecorativeBlob } from "./DecorativeBlob";

/** Crachá composto por SVGs do Figma — rotacionado ~15° como no design. */
function Cracha({ alt }: { alt: string }) {
  return (
    <div className="relative mx-auto w-[280px] rotate-[15deg]">
      {/* Clip/prendedor no topo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/cracha-clip.png"
        alt=""
        width={228}
        height={202}
        className="absolute -top-8 left-1/2 z-10 w-[140px] -translate-x-1/2"
      />
      {/* Base do crachá */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/cracha-exclude.svg"
        alt={alt}
        width={282}
        height={408}
        className="w-full"
      />
      {/* Furo decorativo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/cracha-buraco.svg"
        alt=""
        width={83}
        height={83}
        className="absolute left-[15%] top-[8%] w-[60px]"
      />
    </div>
  );
}

export function PhilosophySection({ dict }: { dict: Dictionary }) {
  const home = dict.home;
  return (
    <section className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1.3fr_1fr]">
      {/* Texto */}
      <div>
        <h2 className="font-display uppercase tracking-tight text-[color:var(--color-blue)] text-[2.5rem] md:text-[4rem] leading-none mb-4">
          {home.philosophy}
        </h2>
        <p className="font-bold text-[1.25rem] md:text-[1.5rem] leading-snug text-[color:var(--color-blue)] mb-4">
          {home.philosophyLead}
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-[color:var(--color-blue)] mb-3">
          {home.philosophyBody1}
          <strong className="font-bold">{home.philosophyBody1Bold}</strong>
          {home.philosophyBody1End}
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-[color:var(--color-blue)]">
          {home.philosophyBody2}
          <strong className="font-bold">{home.philosophyBody2Bold1}</strong>
          {home.philosophyBody2Mid}
          <strong className="font-bold">{home.philosophyBody2Bold2}</strong>
          {home.philosophyBody2Mid2}
          <strong className="font-bold">{home.philosophyBody2Bold3}</strong>
          {home.philosophyBody2End}
        </p>
      </div>

      {/* Crachá + elipse decorativa */}
      <div className="relative">
        <DecorativeBlob
          variant={3}
          className="-left-16 -top-10 -z-10 hidden opacity-60 md:block"
          alt=""
        />
        <Cracha alt={home.crachaAlt} />
      </div>
    </section>
  );
}
