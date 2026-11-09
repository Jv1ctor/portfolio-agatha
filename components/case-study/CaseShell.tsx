import type { CSSProperties, ReactNode } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import type { LocalizedProject, ProjectStatus } from "@/lib/projects";

// 'em-progresso' (slug, kebab) → 'emProgresso' (chave do dicionário, camelCase)
const statusKey: Record<ProjectStatus, keyof Dictionary["status"]> = {
  concluido: "concluido",
  "em-progresso": "emProgresso",
  "em-breve": "emBreve",
};

/** Fonte do corpo (Clother) — sobrescreve a regra global que joga h1-h4 pra display. */
const bodyFont = { fontFamily: "var(--font-body)" } as const;

/**
 * Pill do Figma. tag = Azul gelo (#bacceb), sem sombra.
 * status = azul clarinho (#e6eefa) + sombra "botoes" (2,4,8,2 @16%).
 */
function Pill({
  children,
  variant = "tag",
}: {
  children: ReactNode;
  variant?: "tag" | "status";
}) {
  // font-normal: Figma usa Clother Regular (400) nas pills; o peso global é 300.
  const base =
    "inline-flex items-center rounded-full px-3.5 py-1 text-[1rem] font-normal leading-none text-[color:var(--color-blue)] whitespace-nowrap";
  const skin =
    variant === "status"
      ? "bg-[color:var(--color-blue-pale)] shadow-[2px_4px_8px_2px_rgba(111,150,206,0.16)]"
      : "bg-[color:var(--color-blue-soft)]";
  return <span className={`${base} ${skin}`}>{children}</span>;
}

/** Acrescenta classes de animação; sem elas devolve `base` intacto (mesmo HTML de antes). */
function withMotion(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

/**
 * Proporção das duas colunas do topo quando há `aside`, em px do frame do Figma
 * (coluna do cabeçalho | coluna do aside | vão entre elas). Ex.: Pontos sem nó
 * 660 | 588 | 104; Caju 688 | 631 | 32.
 */
export type CaseAsideLayout = { main: number; aside: number; gap: number };

export function CaseShell({
  project,
  dict,
  cover,
  motion,
  aside,
  asideLayout = { main: 660, aside: 588, gap: 104 },
  headerExtra,
  children,
}: {
  project: LocalizedProject;
  dict: Dictionary;
  cover?: ReactNode;
  /** Classes de animação de entrada (usadas pelo modal): capa, cabeçalho e corpo. */
  motion?: { cover: string; header: string; body: string };
  /**
   * Coluna à direita do cabeçalho (título, tags, intro), como nos frames em que
   * o topo do case é dividido em dois. Sem `aside` o cabeçalho ocupa a largura toda.
   */
  aside?: ReactNode;
  asideLayout?: CaseAsideLayout;
  /** Conteúdo extra na coluna do cabeçalho, logo abaixo da intro. */
  headerExtra?: ReactNode;
  children: ReactNode;
}) {
  const intro = project.intro ?? project.description;

  const header = (
    <>
      {/* Subtítulo (Clother Bold 26px) + status */}
      <div
        className={withMotion(
          "mt-8 flex items-center justify-between gap-3",
          motion?.header,
        )}
      >
        <h1
          className="font-bold text-[1.625rem] leading-tight text-[color:var(--color-blue)]"
          style={bodyFont}
        >
          {project.subtitle}
        </h1>
        <Pill variant="status">{dict.status[statusKey[project.status]]}</Pill>
      </div>

      {/* Tags (esquerda) + data (direita) */}
      <div
        className={withMotion(
          "mt-3 flex flex-wrap items-center gap-2",
          motion?.header,
        )}
      >
        {project.tags.map((tag) => (
          <Pill key={tag}>{tag}</Pill>
        ))}
        {project.date && (
          <span className="ml-auto">
            <Pill>{project.date}</Pill>
          </span>
        )}
      </div>

      {/* Intro — Clother Light 16px, parágrafos preservando as quebras do Figma */}
      {intro && (
        <div
          className={withMotion(
            "mt-6 flex flex-col gap-4 font-light text-[1rem] leading-relaxed text-[color:var(--color-blue)]",
            motion?.header,
          )}
        >
          {intro.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      {headerExtra && (
        <div className={withMotion("mt-8", motion?.header)}>{headerExtra}</div>
      )}
    </>
  );

  return (
    <article className="container-case pt-16 pb-12">
      {/* Coluna do Figma (`.container-case`): 66px entre o header e a capa,
          32px entre os blocos. */}
      {cover ??
        (project.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.coverImage}
            alt={dict.projects.coverAlt.replace("{title}", project.title)}
            className={withMotion("shadow-card block w-full rounded-[8px]", motion?.cover)}
          />
        ))}

      {aside ? (
        // Duas colunas a partir de md; o vão é proporcional à coluna do Figma (1352px).
        <div
          className="grid grid-cols-1 gap-y-8 md:items-start md:gap-y-0 md:[grid-template-columns:var(--case-cols)] md:[column-gap:var(--case-gap)]"
          style={
            {
              "--case-cols": `minmax(0, ${asideLayout.main}fr) minmax(0, ${asideLayout.aside}fr)`,
              "--case-gap": `${((asideLayout.gap / 1352) * 100).toFixed(3)}%`,
            } as CSSProperties
          }
        >
          <div>{header}</div>
          <div className={withMotion("md:mt-8", motion?.header)}>{aside}</div>
        </div>
      ) : (
        header
      )}

      <div className={withMotion("mt-8 flex flex-col gap-8", motion?.body)}>
        {children}
      </div>

      {/* Figma: Clother Regular (400); o peso global é 300, fixo o 400. */}
      <p
        className={withMotion(
          "mt-16 font-normal text-[2rem] leading-tight text-[color:var(--color-blue)]",
          motion?.body,
        )}
        style={{ fontFamily: "var(--font-body)" }}
      >
        {project.thanks}
      </p>
    </article>
  );
}

/** Título de seção do case — Clother Bold 26px (NÃO é a fonte display). */
export function CaseSection({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <section>
      <h2
        className="mb-5 font-bold text-[1.625rem] leading-tight text-[color:var(--color-blue)]"
        style={bodyFont}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

/**
 * Bloco visual achatado do Figma.
 *
 * Não aplica sombra/rounded externos — os screenshots dos frames do Figma já
 * trazem o card (bg+rounded+shadow) embutido. Adicionar wrapper aqui cria
 * "caixa em volta de caixa".
 */
export function CaseImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={`block w-full ${className ?? ""}`} />
  );
}
