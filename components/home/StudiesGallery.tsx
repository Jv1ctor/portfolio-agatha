import type { Dictionary } from "@/i18n/dictionaries";

export function StudiesGallery({ dict }: { dict: Dictionary }) {
  const home = dict.home;
  return (
    <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
      {/* Coluna esquerda: duas imagens empilhadas */}
      <div className="flex flex-col">
        {/* Topo: coelhos em campo rosa (Figma: 1152×558, bg #F9CEDC) */}
        <div className="relative h-[300px] overflow-hidden bg-[color:var(--color-pink-light)] md:h-[558px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/estudos-coelhos.png"
            alt={home.studiesAlt}
            width={1727}
            height={558}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Base: baleia (Figma: 1152×558, bg #6F96CE, imagem 154% altura, -28% top) */}
        <div className="relative h-[300px] overflow-hidden bg-[color:var(--color-blue)] md:h-[558px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/carreira-baleia.png"
            alt={home.careerAlt}
            width={1152}
            height={558}
            className="absolute -left-[4%] top-[-28%] h-[154%] w-[110%] max-w-none object-cover"
          />
        </div>
      </div>

      {/* Coluna direita: painel azul com doodles (Figma: 576×1117, gradiente) */}
      <div className="relative min-h-[400px] bg-[color:var(--color-blue)] md:min-h-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/home/doodles-azul.svg"
          alt={home.studiesDoodlesAlt}
          width={576}
          height={1117}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
