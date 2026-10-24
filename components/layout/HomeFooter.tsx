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
 * variant="projects" (índice /projetos): acrescenta o link de voltar ao topo, com a
 * seta que balança e a seta ↗ no hover dos links sociais. A home não muda.
 * O Footer antigo continua sendo usado pelas outras páginas via FooterRouter.
 */
export function HomeFooter({
  dict,
  variant = "home",
}: {
  dict: Dictionary;
  variant?: "home" | "projects";
}) {
  const isProjects = variant === "projects";
  const arrow = isProjects ? (
    <span
      aria-hidden
      className="ml-1 inline-block -translate-x-1 translate-y-1 opacity-0 transition-[opacity,translate] duration-300 ease-[cubic-bezier(.2,.9,.3,1.4)] group-hover/social:translate-x-0 group-hover/social:translate-y-0 group-hover/social:opacity-100 group-focus-visible/social:translate-x-0 group-focus-visible/social:translate-y-0 group-focus-visible/social:opacity-100 motion-reduce:transition-none"
    >
      ↗
    </span>
  ) : null;
  const socialClass = `text-base font-light underline decoration-from-font hover:opacity-80${
    isProjects ? " group/social" : ""
  }`;

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

      {isProjects ? (
        <a
          href="#top"
          className="absolute right-[28px] top-[109px] text-[0.9375rem] font-medium no-underline"
        >
          {dict.projectsPage.backToTop}{" "}
          <span
            aria-hidden
            className="inline-block animate-[bob_1.8s_ease-in-out_infinite] motion-reduce:animate-none"
          >
            ↑
          </span>
        </a>
      ) : null}
    </footer>
  );
}
