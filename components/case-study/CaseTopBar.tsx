import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/dictionaries";

/** Mola dos hovers da guia do Batuco-tuco (mesma do header da home). */
const spring = "transition-[translate,rotate,scale] duration-[350ms] ease-[cubic-bezier(.2,.9,.3,1.4)] motion-reduce:transition-none";
const focusRing = "focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#0e488b]";

/**
 * Barra acima da capa dos cases 'wide' (Figma node 17:2460, 1354 × 48): voltar
 * para o índice de projetos à esquerda, "projects" à direita, com o sininho
 * (node 17:2466) ao lado da palavra. Só na página completa — o modal
 * tem os próprios controles (voltar/próximo).
 *
 * Hovers (guia do Claude Design): a seta desliza e gira "apontando pra trás"; o
 * "projetos" é link para o índice com o mesmo hover do header da home.
 */
export function CaseTopBar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const projectsHref = `/${locale}/projetos`;

  return (
    // Figma: barra em y=40 e capa em y=154 → 66px entre a barra (48) e a capa.
    <div className="mb-[66px] flex h-12 items-center justify-between gap-6">
      {/* Casca Azul gelo 48px (4px de respiro) + miolo 40px #eaeef4 com borda
          2px tracejada #527fb0; "<" em AM Novecento 32px, recortado como no Figma
          (padding 6/16/8 + overflow). */}
      <Link
        href={projectsHref}
        aria-label={dict.projectsPage.back}
        className={`inline-flex size-12 shrink-0 rounded-full bg-[color:var(--color-blue-soft)] p-1 ${spring} motion-safe:hover:-translate-x-1 motion-safe:hover:-rotate-[10deg] ${focusRing}`}
      >
        <span className="flex size-10 items-center justify-center overflow-hidden rounded-[60px] border-2 border-dashed border-[#527fb0] bg-[#eaeef4] px-4 pb-2 pt-1.5">
          <span
            aria-hidden
            className="whitespace-nowrap text-[2rem] leading-[normal] text-[#527fb0]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            {"<"}
          </span>
        </span>
      </Link>

      {/* Figma: a caixa do texto (178 × 44) termina 1px depois da barra de 1354,
          que já passa 2px da coluna de 1352 → -3px à direita. */}
      <Link
        href={projectsHref}
        className={`relative -mr-[3px] inline-block whitespace-nowrap text-[2rem] lowercase leading-[normal] ${spring} motion-safe:hover:-translate-y-[3px] motion-safe:hover:-rotate-2 motion-safe:hover:scale-[1.04] ${focusRing}`}
        // Cor inline: o `a { color: inherit }` de globals.css (fora de layer) ganha dos utilitários.
        style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "#0855ab" }}
      >
        {dict.nav.homeProjects}
        {/* Sininho (node 17:2466): SVG no tamanho do Figma (46.69 × 50.12),
            girado 57.5° em torno do canto superior esquerdo — o x/y do Figma de
            um nó girado é esse canto (1347.30, 33), ou seja, 17.70px antes e 9px
            acima da caixa do texto (1177, 2). Fica à esquerda da palavra.
            Ângulo e posição conferidos contra o render 1:1 do Figma (MAE 1.2/255). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/projects/batuco-tuco/sininho-projetos.svg"
          alt=""
          aria-hidden
          width={46.6886}
          height={50.1209}
          className="pointer-events-none absolute left-[-17.7px] top-[-9px] max-w-none origin-top-left rotate-[57.5deg]"
        />
      </Link>
    </div>
  );
}
