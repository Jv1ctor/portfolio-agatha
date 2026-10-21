import type { Dictionary } from "@/i18n/dictionaries";
import { DecorativeBlob } from "./DecorativeBlob";

export function GreetingSection({ dict }: { dict: Dictionary }) {
  const home = dict.home;
  return (
    <section className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_1.3fr]">
      {/* Elipse decorativa rosa atrás da ilustração */}
      <DecorativeBlob
        variant={5}
        className="-right-20 -top-16 -z-10 hidden opacity-70 md:block"
        alt=""
      />

      {/* Ilustração */}
      <div className="relative mx-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/ola.svg"
          alt={home.greetingAlt}
          width={529}
          height={495}
          className="w-full max-w-[400px]"
        />
      </div>

      {/* Texto */}
      <div>
        <p className="font-display text-[3.5rem] leading-none text-[color:var(--color-blue)] mb-2">
          :D
        </p>
        <h2 className="font-display uppercase tracking-tight text-[color:var(--color-blue)] text-[2.5rem] md:text-[4rem] leading-none mb-4">
          {home.greeting}
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-[color:var(--color-blue)]">
          {home.intro}
        </p>
      </div>
    </section>
  );
}
