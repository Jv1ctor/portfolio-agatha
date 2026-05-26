"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { categoryTabs, navLinks } from "@/lib/site";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-[color:var(--color-cream-dark)] bg-[color:var(--color-cream)]/95 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-cream)]/80 sticky top-0 z-30">
      <div className="container-narrow flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
        {/* Esquerda: Sobre mim + Solicitar serviços */}
        <nav className="flex items-center gap-6 text-sm">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`transition-colors ${
                  active
                    ? "text-[color:var(--color-ink)]"
                    : "text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Direita: Gráfico / Interação / Serviços / 3D */}
        <nav className="flex items-center gap-1 text-sm">
          {categoryTabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className="relative px-3 py-1.5 text-[color:var(--color-ink-soft)] transition-colors hover:text-[color:var(--color-ink)]"
              >
                {active && (
                  <motion.span
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-full bg-[color:var(--color-blue)]/10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span
                  className={`relative ${
                    active ? "text-[color:var(--color-blue)] font-medium" : ""
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
