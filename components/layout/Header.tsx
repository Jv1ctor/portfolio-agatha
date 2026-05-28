"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categoryTabs, navLinks } from "@/lib/site";

export function Header() {
  const pathname = usePathname();

  // No Figma o item ativo é marcado pelo peso da fonte (Clother Black),
  // não por um indicador/pill. Usamos bold como o peso forte disponível.
  const linkClass = (active: boolean) =>
    `text-[color:var(--color-blue)] transition-opacity hover:opacity-100 ${
      active ? "font-bold" : "font-normal opacity-90"
    }`;

  return (
    <header className="w-full bg-[color:var(--color-cream)]/95 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-cream)]/80 sticky top-0 z-30">
      <div className="container-narrow flex flex-col gap-3 py-4 text-base md:flex-row md:items-center md:justify-between">
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
