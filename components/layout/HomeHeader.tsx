import Link from 'next/link';
import type { Dictionary, Locale } from '@/i18n/dictionaries';
import { LanguageSwitcher } from './LanguageSwitcher';

/**
 * Header específico da home — fiel ao Figma "Pontossemno" (spec v2 §4.1):
 * - 102px de altura, fundo cream SÓLIDO (#F9F3EA) — sem sticky nem blur
 * - Apenas 2 links: "sobre" (esquerda) e "projetos" (direita)
 * - AM Novecento 32px, cor #BACCEB, lowercase (22/24px até o md: em mobile
 *   375px, "sobre" + switcher + "projetos" a 32px não cabem e criam overflow
 *   horizontal no root — scrollWidth 422 vs 375)
 * - LanguageSwitcher no centro
 * - Padding horizontal de 120px (x=120 no canvas de 1728)
 *
 * Server Component — recebe locale+dict como props (mesmo padrão do Header).
 * Substitui o Header antigo na home e no índice /projetos, via HeaderRouter no
 * layout. No índice, `active="projects"` marca o link "projetos" com
 * aria-current="page"; na home o ativo é "sobre". O link ativo ganha azul forte,
 * sombra e o mirtilo do design (decorativo, dentro do link).
 * Hover dos links: micro-movimento do design (sobe, inclina, cresce), desligado
 * com reduced motion.
 * A cor vai inline: a regra global `a { color: inherit }` vence as utilities
 * do Tailwind no layer (mesmo padrão do Header antigo).
 */
export function HomeHeader({
  locale,
  dict,
  active,
}: {
  locale: Locale;
  dict: Dictionary;
  active?: 'about' | 'projects';
}) {
  const linkStyle = { color: 'var(--color-blue-soft)' } as const;
  // Link ativo (design da aba Projetos): azul forte, sombra suave abaixo das
  // letras e o mirtilo logo depois da palavra.
  const activeStyle = {
    color: 'var(--color-blue-strong)',
    textShadow: '0.03em 0.09em 0.06em rgba(120, 110, 95, 0.35)',
  } as const;
  const activeClass = 'flex items-center';
  // O mirtilo escala com a fonte (≈1.4em de altura) e as margens verticais
  // negativas o tiram do cálculo da altura do link: o texto não muda de lugar
  // e a figura sobe acima das letras, como no design.
  const berry = (
    // eslint-disable-next-line @next/next/no-img-element -- ícone decorativo minúsculo
    <img
      src="/images/projetos/mirtilo.png"
      alt=""
      aria-hidden="true"
      className="relative top-[-0.1em] -my-[1em] ml-[0.03em] h-[1.4em] w-auto max-w-none"
    />
  );
  const linkClass =
    'font-display text-[22px] lowercase leading-none transition-[opacity,translate,rotate,scale] duration-[350ms] ease-[cubic-bezier(.2,.9,.3,1.4)] hover:opacity-70 motion-safe:hover:-translate-y-[3px] motion-safe:hover:-rotate-2 motion-safe:hover:scale-[1.04] motion-reduce:transition-none sm:text-[24px] md:text-[32px]';

  const projectsHref = `/${locale}/projetos`;

  return (
    <header className="h-[102px] w-full bg-[color:var(--color-cream)]">
      <div className="flex h-full items-center justify-between px-6 md:px-[120px]">
        {/* Esquerda: "sobre" — aponta pra própria home (igual ao nav.about antigo) */}
        <Link
          href={`/${locale}`}
          aria-current={active === 'about' ? 'page' : undefined}
          className={active === 'about' ? `${linkClass} ${activeClass}` : linkClass}
          style={active === 'about' ? activeStyle : linkStyle}
        >
          {dict.nav.homeAbout}
          {active === 'about' && berry}
        </Link>

        {/* Centro: seletor de idioma (componente existente, i18n obrigatório) */}
        <LanguageSwitcher currentLocale={locale} dict={dict} />

        {/* Direita: "projetos" */}
        <Link
          href={projectsHref}
          aria-current={active === 'projects' ? 'page' : undefined}
          className={active === 'projects' ? `${linkClass} ${activeClass}` : linkClass}
          style={active === 'projects' ? activeStyle : linkStyle}
        >
          {dict.nav.homeProjects}
          {active === 'projects' && berry}
        </Link>
      </div>
    </header>
  );
}