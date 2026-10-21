import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Personagem espiando por cima da galeria — posicionado entre a seção
 * Filosofia e a galeria de estudos, como no Figma (node 751:1329).
 * A ilustração "vaza" por cima da borda da galeria.
 */
export function PeekingCharacter({ dict }: { dict: Dictionary }) {
  return (
    <div className="relative z-10 hidden md:block">
      <div className="container-narrow flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/espiando.svg"
          alt={dict.home.peekingAlt}
          width={676}
          height={361}
          className="-mb-[80px] w-full max-w-[500px]"
        />
      </div>
    </div>
  );
}
