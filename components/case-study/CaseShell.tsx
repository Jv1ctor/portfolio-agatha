import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import type { LocalizedProject, ProjectStatus } from "@/lib/projects";

// 'em-progresso' (slug, kebab) → 'emProgresso' (chave do dicionário, camelCase)
const statusKey: Record<ProjectStatus, keyof Dictionary["status"]> = {
  concluido: "concluido",
  "em-progresso": "emProgresso",
  "em-breve": "emBreve",
};

/** Fonte do corpo (Clother) — sobrescreve a regra global que joga h1-h4 pra display. */
export const bodyFont = { fontFamily: "var(--font-body)" } as const;
/**
 * Clother Bold nos títulos dos cases 'wide'. Inline pelo mesmo motivo do
 * bodyFont: a regra global de h1–h4 (peso 400) não fica em layer e ganha do
 * utilitário `font-bold`.
 */
export const bodyFontBold = { ...bodyFont, fontWeight: 700 } as const;

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

/**
 * Pill tracejada do Figma novo (cases com layout 'wide'): casca Azul gelo
 * (#bacceb) com 4px de respiro + miolo #eaeef4 com borda 2px tracejada #527fb0.
 * Clother Regular 16px. Usada nas tags, abas de Prototipagem e Ferramentas.
 */
export function DashedPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-[color:var(--color-blue-soft)] p-1">
      <span className="inline-flex h-6 items-center whitespace-nowrap rounded-full border-2 border-dashed border-[#527fb0] bg-[#eaeef4] px-1.5 text-[1rem] font-normal leading-none text-[color:var(--color-blue)]">
        {children}
      </span>
    </span>
  );
}

/**
 * Balão de agradecimento dos cases 'wide' (Figma node 17:2842: fundo #ffe9f2,
 * 160 × 98, ponta no canto inferior direito, sombra interna rosa) + avatar da
 * Ágatha. O avatar é PNG @2x exportado do Figma já girado (10.99°), na caixa
 * de 138.74 × 132.09 do Figma: o SVG tinha grão (feTurbulence), que o Chrome
 * desenha bem mais grosso que o Figma.
 */
function ThanksBubble({
  text,
  className,
  bubbleClassName,
  faceClassName,
}: {
  text: string;
  className?: string;
  /** Animações da página completa (balão que "estoura", bonequinha balançando). */
  bubbleClassName?: string;
  faceClassName?: string;
}) {
  return (
    <div className={withMotion("mt-7 flex items-center justify-end gap-2", className)}>
      <p
        className={withMotion(
          "flex h-[98px] w-[160px] items-center justify-center rounded-[60px_60px_0_60px] bg-[#ffe9f2] pl-5 pr-6 text-center text-[0.875rem] font-normal leading-[1.1875] text-[color:var(--color-blue-darkest)] shadow-[inset_-3px_-4px_9.5px_1px_#f4aecc]",
          bubbleClassName,
        )}
        style={bodyFont}
      >
        {text}
      </p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/avatar-agatha.png"
        alt=""
        aria-hidden
        width={139}
        height={132}
        className={withMotion("h-auto w-[138.74px] shrink-0", faceClassName)}
      />
    </div>
  );
}

/** Acrescenta classes de animação; sem elas devolve `base` intacto (mesmo HTML de antes). */
function withMotion(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

export function CaseShell({
  project,
  dict,
  cover,
  motion,
  top,
  bottom,
  thanksMotion,
  children,
}: {
  project: LocalizedProject;
  dict: Dictionary;
  cover?: ReactNode;
  /** Classes de animação de entrada (usadas pelo modal): capa, cabeçalho e corpo. */
  motion?: { cover: string; header: string; body: string };
  /**
   * Só no layout 'wide': conteúdo acima da capa e depois do balão de
   * agradecimento, dentro da coluna de 1352px. A página completa passa a barra
   * de voltar e o "Talvez você goste..."; o modal não passa (tem controles próprios).
   */
  top?: ReactNode;
  bottom?: ReactNode;
  /** Só no layout 'wide' da página completa: animações do balão e da bonequinha. */
  thanksMotion?: { bubble: string; face: string };
  children: ReactNode;
}) {
  const intro = project.intro ?? project.description;

  // Layout 'wide' (Figma novo, coluna de 1352px): o corpo do case desenha o
  // próprio cabeçalho (título, tags e intro ficam ao lado do diagrama), então
  // aqui só entram a capa, o corpo e o balão de agradecimento.
  if (project.layout === "wide") {
    return (
      // Com a barra do topo (página completa, sem header): ela fica em y=40, como no Figma.
      <article className={top ? "container-wide pb-12 pt-10" : "container-wide py-12"}>
        <div className="mx-auto max-w-[1352px]">
          {top}
          {cover ? (
            <div className={motion?.cover}>{cover}</div>
          ) : (
            project.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.coverImage}
                alt={dict.projects.coverAlt.replace("{title}", project.title)}
                className={withMotion("block w-full", motion?.cover)}
              />
            )
          )}

          {/* Figma: hero de 467 e corpo em y=500 (33px); seções a cada 32px. */}
          <div className={withMotion("mt-[33px] flex flex-col gap-8", motion?.body)}>
            {children}
          </div>

          <ThanksBubble
            text={project.thanks}
            className={motion?.body}
            bubbleClassName={thanksMotion?.bubble}
            faceClassName={thanksMotion?.face}
          />
          {bottom}
        </div>
      </article>
    );
  }

  return (
    <article className="container-narrow py-12">
      {/* Coluna de conteúdo = 786px (largura do conteúdo do case no desktop
          do Figma — frame Responsividade/MacBook). Centralizada. */}
      <div className="mx-auto max-w-[786px]">
        {cover ??
          (project.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.coverImage}
              alt={dict.projects.coverAlt.replace("{title}", project.title)}
              className={withMotion("shadow-card block w-full rounded-[8px]", motion?.cover)}
            />
          ))}

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

        <div className={withMotion("mt-12 flex flex-col gap-12", motion?.body)}>
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
      </div>
    </article>
  );
}

/** Título de seção do case — Clother Bold 26px (NÃO é a fonte display). */
export function CaseSection({
  title,
  size,
  className,
  titleClassName,
  children,
}: {
  title: string;
  /** 'lg' = 32px com 24px até o conteúdo (Figma dos cases 'wide'). */
  size?: "lg";
  className?: string;
  /**
   * Classes extras do título (ex.: line-height/letter-spacing do case). Precisam
   * ser unlayered (CSS Module): a regra global de h1–h4 ganha dos utilitários.
   */
  titleClassName?: string;
  children?: ReactNode;
}) {
  return (
    <section className={className}>
      <h2
        className={withMotion(
          size === "lg"
            ? "mb-6 font-bold text-[1.75rem] text-[color:var(--color-blue)] md:text-[2rem]"
            : "mb-5 font-bold text-[1.625rem] leading-tight text-[color:var(--color-blue)]",
          titleClassName,
        )}
        style={size === "lg" ? bodyFontBold : bodyFont}
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
