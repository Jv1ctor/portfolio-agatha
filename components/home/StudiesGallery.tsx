import type { Dictionary } from "@/i18n/dictionaries";

export function StudiesGallery({ dict }: { dict: Dictionary }) {
  const home = dict.home;
  return (
    <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
      {/* Coluna esquerda: duas imagens empilhadas */}
      <div className="flex flex-col">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/home/estudos-coelhos.png"
          alt={home.studiesAlt}
          width={735}
          height={490}
          className="h-auto w-full object-cover"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/home/carreira-baleia.png"
          alt={home.careerAlt}
          width={869}
          height={588}
          className="h-auto w-full object-cover"
        />
      </div>

      {/* Coluna direita: painel azul com doodles */}
      <div className="flex items-center justify-center bg-[color:var(--color-blue)] p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/home/doodles-azul.svg"
          alt={home.studiesDoodlesAlt}
          width={576}
          height={1117}
          className="h-auto w-full max-w-[300px]"
        />
      </div>
    </section>
  );
}
