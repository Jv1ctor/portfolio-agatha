import { site } from "@/lib/site";
import s from "./HomeFooter.module.css";
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
 * Ambas as variantes (home e projects) ganham o link de voltar ao topo (pílula azul no
 * estilo dos filtros de /projetos, com texto e a seta que balança), e a seta ↗ no hover dos links sociais. O prop `variant`
 * continua existindo para os callers (FooterRouter), mas não muda mais o visual.
 * O Footer antigo continua sendo usado pelas outras páginas via FooterRouter.
 *
 * Variante `case` (página completa do Batuco-tuco): o frame do Figma do case (node
 * 17:2446) tem outras medidas — "visite também" 95.36px em y=-35; bloco de redes em
 * (22, 111) com o rótulo de redes sociais, IG e IN em Clother 32px (caixa 38) e os
 * handles em Clother Light 20px branco — e não tem o voltar ao topo.
 */
export function HomeFooter({
  dict,
  variant = "home",
}: {
  dict: Dictionary;
  variant?: "home" | "projects" | "case";
}) {
  const isCase = variant === "case";
  const arrow = (
    <span
      aria-hidden
      className="ml-1 inline-block -translate-x-1 translate-y-1 opacity-0 transition-[opacity,translate] duration-300 ease-[cubic-bezier(.2,.9,.3,1.4)] group-hover/social:translate-x-0 group-hover/social:translate-y-0 group-hover/social:opacity-100 group-focus-visible/social:translate-x-0 group-focus-visible/social:translate-y-0 group-focus-visible/social:opacity-100 motion-reduce:transition-none"
    >
      ↗
    </span>
  );
  const socialClass = isCase
    ? `group/social text-[1.25rem] font-light leading-[1.1875] ${s.social} ${s.socialCase}`
    : `group/social text-base font-light ${s.social}`;
  const labelClass = isCase ? "shrink-0 text-[2rem] font-normal leading-[1.1875]" : "w-5 shrink-0 text-base font-normal";

  return (
    <footer
      // Case: Figma tem 93.7px entre o fim dos cards e a banda (48 do artigo + 46 aqui).
      className={`bg-footer relative ${isCase ? "mt-[46px]" : "mt-20"} w-full overflow-visible text-[color:var(--color-cream)]`}
      style={{ height: "269px" }}
    >
      {/* "visite também" — transborda ACIMA do band (y=-45 no Figma da home, -35 no do case) */}
      <h2
        className="absolute font-display"
        style={{
          // 120px @1728 na home; 95.36px @1728 no case.
          fontSize: isCase ? "clamp(2.384rem, 5.519vw, 5.96rem)" : "clamp(3rem, 6.94vw, 7.5rem)",
          left: "1px",
          top: isCase ? "-35px" : "-45px", // transborda acima!
          lineHeight: 1.383, // caixa 166px (home) / 132px (case) = Figma (AM Novecento line-height auto)
          // Case: espaçamento 0 do Figma (a regra global de h2 aplica -0.01em).
          ...(isCase ? { letterSpacing: 0 } : {}),
        }}
      >
        {dict.footer.visitAlso}
      </h2>

      {/* Conteúdo: "Redes sociais" em y=109, px 28 da lateral (case: 22 × 111) */}
      <div className={isCase ? "relative w-full px-[22px] pt-[111px]" : "relative w-full px-[28px] pt-[109px]"}>
        <p className={isCase ? "text-[2rem] font-normal leading-[1.1875]" : "text-[1.5rem] font-normal"}>
          {dict.footer.social}
        </p>
        <ul className={isCase ? "mt-4 flex flex-col gap-2" : "mt-2 flex flex-col gap-2"}>
          <li className="flex items-center gap-4">
            <span className={labelClass}>IG</span>
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
            <span className={labelClass}>IN</span>
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

      {!isCase && (
      <a
        href="#top"
        // Sem JS o âncora nativa funciona; com JS não criamos entrada de histórico (um
        // `#top` no histórico, com state nulo, faria o "voltar" do modal não fechar nada).
        onClick={(event) => {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: "instant" });
          document.getElementById("top")?.focus({ preventScroll: true });
        }}
        // Pílula azul no estilo dos filtros de /projetos (ver HomeFooter.module.css).
        // O nome acessível é o texto visível.
        className={`${s.backTop} absolute right-[28px] top-[109px] max-[379.98px]:right-[14px]`}
      >
        {/* Seta pra cima: silhueta do "‹" da usuária traçada em SVG e já girada no
            path (viewBox justo 17×12, sem rotação CSS: o rotate-90 de uma caixa não
            quadrada deslocava o layout e a seta caía). currentColor. */}
        <svg
          aria-hidden
          viewBox="0 0 17 12"
          width="18"
          height="12.7"
          fill="currentColor"
          className={s.arrow}
        >
          <path d="M17 10.2 L16.6 11.8 L15.4 12 L8.5 7.6 L1.6 12 L0.4 11.8 L0 10.2 L8.5 0.2 Z" />
        </svg>
        {dict.projectsPage.backToTop}
      </a>
      )}
    </footer>
  );
}
