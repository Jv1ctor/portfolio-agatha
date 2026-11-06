import { site } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Footer específico da home — fiel ao Figma "Pontossemno" (spec v2 §4.9):
 *
 * - Altura fixa: 269px (band y=4345–4614 no Figma, 1728px)
 * - Gradiente -63.62° (.bg-footer, token --gradient-footer próprio)
 * - Texto gigante (dict.footer.visitAlso): AM Novecento 120px cream
 *   (clamp 3rem→7.5rem), x=1, y=-45 relativos à banda → transborda ACIMA do
 *   footer (por isso overflow-visible, e não o clip padrão); caixa de 166px
 *   (lineHeight 1.383 — mesmo padrão do título Filosofia)
 * - Label de redes sociais (dict.footer.social): Clother Regular 24px cream,
 *   x=28, y=109
 * - Social rows: IG (16px Regular) + handle (16px Light, underline); gap
 *   16px entre label e handle, 8px entre rows
 *
 * IG/IN e os handles são dados (lib/site.ts), não tradução (AGENTS.md).
 * Ambas as variantes (home e projects) ganham o link de voltar ao topo (botão só
 * de ícone, com a seta que balança), e a seta ↗ no hover dos links sociais. O prop `variant`
 * continua existindo para os callers (FooterRouter), mas não muda mais o visual.
 * O Footer antigo continua sendo usado pelas outras páginas via FooterRouter.
 */
export function HomeFooter({
  dict,
}: {
  dict: Dictionary;
  variant?: "home" | "projects";
}) {
  const arrow = (
    <span
      aria-hidden
      className="ml-1 inline-block -translate-x-1 translate-y-1 opacity-0 transition-[opacity,translate] duration-300 ease-[cubic-bezier(.2,.9,.3,1.4)] group-hover/social:translate-x-0 group-hover/social:translate-y-0 group-hover/social:opacity-100 group-focus-visible/social:translate-x-0 group-focus-visible/social:translate-y-0 group-focus-visible/social:opacity-100 motion-reduce:transition-none"
    >
      ↗
    </span>
  );
  const socialClass =
    "group/social text-base font-light underline decoration-from-font hover:opacity-80";

  return (
    <footer
      className="bg-footer relative mt-20 w-full overflow-visible text-[color:var(--color-cream)]"
      style={{ height: "269px" }}
    >
      {/* "visite também" — transborda ACIMA do band (y=-45 no Figma) */}
      <h2
        className="absolute font-display"
        style={{
          fontSize: "clamp(3rem, 6.94vw, 7.5rem)", // 120px @1728
          left: "1px",
          top: "-45px", // transborda acima!
          lineHeight: 1.383, // caixa 166px = Figma (AM Novecento line-height auto)
        }}
      >
        {dict.footer.visitAlso}
      </h2>

      {/* Conteúdo: "Redes sociais" em y=109, px 28 da lateral */}
      <div className="relative w-full px-[28px] pt-[109px]">
        <p className="text-[1.5rem] font-normal">{dict.footer.social}</p>
        <ul className="mt-2 flex flex-col gap-2">
          <li className="flex items-center gap-4">
            <span className="w-5 shrink-0 text-base font-normal">IG</span>
            <a
              href={site.social.instagram.url}
              target="_blank"
              rel="noreferrer"
              className={socialClass}
            >
              {site.social.instagram.handle}
              {arrow}
            </a>
          </li>
          <li className="flex items-center gap-4">
            <span className="w-5 shrink-0 text-base font-normal">IN</span>
            <a
              href={site.social.linkedin.url}
              target="_blank"
              rel="noreferrer"
              className={socialClass}
            >
              {site.social.linkedin.handle}
              {arrow}
            </a>
          </li>
        </ul>
      </div>

      <a
        href="#top"
        // Sem JS o âncora nativa funciona; com JS não criamos entrada de histórico (um
        // `#top` no histórico, com state nulo, faria o "voltar" do modal não fechar nada).
        onClick={(event) => {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: "instant" });
          document.getElementById("top")?.focus({ preventScroll: true });
        }}
        aria-label={dict.projectsPage.backToTop}
        title={dict.projectsPage.backToTop}
        // Botão só de ícone, medido no print de referência (147×122): 76px, cantos de 8px
        // (padrão do site). Três camadas: faixa externa sólida #BACCEA (4px), anel
        // tracejado #527FB0 (3.5px, dash 16 / vão 9.3) e miolo pálido #E7ECF2.
        className="absolute right-[28px] top-[109px] grid h-[76px] w-[76px] place-items-center rounded-[8px] bg-[#BACCEA] no-underline outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--color-blue-darkest)]"
      >
        <svg
          aria-hidden
          viewBox="0 0 76 76"
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
        >
          <rect x="4" y="4" width="68" height="68" rx="4" fill="#E7ECF2" />
          <rect
            x="5.75"
            y="5.75"
            width="64.5"
            height="64.5"
            rx="3"
            stroke="#527FB0"
            strokeWidth="3.5"
            strokeDasharray="16 9.3"
          />
        </svg>
        {/* Seta: o "‹" do usuário (seta-topo.png, 13×40, arte 11×18) refeito como path
            SVG com a mesma silhueta. O PNG é 1x e a seta no print ocupa ~26px (34% do
            botão), ou seja ~1.45x a arte — o PNG ampliado fica borrado, então o traço
            vetorial (#527FB0) o substitui. Gira 90° para apontar pra CIMA. O bob fica no
            span (a animação sobrescreve o transform do elemento girado). */}
        <span
          aria-hidden
          className="relative inline-flex animate-[bob_1.8s_ease-in-out_infinite] motion-reduce:animate-none"
        >
          <svg
            viewBox="0 12 12 17"
            width="18.35"
            height="26"
            className="rotate-90"
            fill="#527FB0"
          >
            <path d="M10.2 12 L11.8 12.4 L12 13.6 L7.6 20.5 L12 27.4 L11.8 28.6 L10.2 29 L0.2 20.5 Z" />
          </svg>
        </span>
      </a>
    </footer>
  );
}
