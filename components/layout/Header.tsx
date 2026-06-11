"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categoryTabs, navLinks } from "@/lib/site";

export function Header() {
  const pathname = usePathname();

  // Figma (get_design_context 365:429): a cor de TODOS os itens é #6f96ce; o
  // item ativo se distingue só pelo PESO — Clother Black (900) — e os inativos
  // são Clother Regular (400), SEM fade de opacidade. (Antes: bold 700 + opacity-90.)
  //
  // A COR vai inline (não via classe `text-[color:...]`): a regra global solta
  // `a { color: inherit }` (globals.css) vence as utilities do Tailwind no layer,
  // então o link herdava o ink (#1a2949) do body. Inline style ganha de tudo —
  // mesmo padrão que o ProjectCard usa pra sobrescrever a regra global de h1-h4.
  const linkStyle = { color: "var(--color-blue)" } as const;
  const linkClass = (active: boolean) =>
    `transition-opacity hover:opacity-70 ${active ? "font-black" : "font-normal"}`;

  return (
    <header className="w-full bg-[color:var(--color-cream)]/95 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-cream)]/80 sticky top-0 z-30">
      {/* Fiel ao Figma: header NÃO centralizado — ocupa a largura cheia com
          ~40px de respiro nas laterais (nav à esquerda, abas à direita). */}
      <div className="flex w-full flex-col gap-3 px-10 py-4 text-base md:flex-row md:items-center md:justify-between">
        {/* Esquerda: Sobre mim · Solicitar serviços */}
        <nav className="flex items-center gap-4">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={linkClass(active)}
                style={linkStyle}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Direita: Gráfico · Interação · Serviços · 3D */}
        <nav className="flex items-center gap-4">
          {categoryTabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={linkClass(active)}
                style={linkStyle}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
