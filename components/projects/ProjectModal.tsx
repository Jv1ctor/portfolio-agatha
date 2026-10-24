'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from '@/lib/i18n/use-translation';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Elementos focáveis visíveis dentro de `root`, na ordem do DOM. */
function focusableIn(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.getClientRects().length > 0,
  );
}

/**
 * Folha do modal de case (aberta por rota interceptada, por cima do índice).
 * Comportamento: foco no botão voltar ao abrir e devolvido ao elemento que abriu
 * ao fechar; scroll do body travado enquanto aberto; Esc e "voltar" fecham com
 * `router.back()`; Tab fica preso dentro da folha; "próximo" troca de projeto
 * com `router.replace` (um único voltar do navegador leva ao índice).
 * O conteúdo (`children`) é renderizado no servidor e só passa por aqui.
 */
export function ProjectModal({
  title,
  nextHref,
  nextTitle,
  children,
}: {
  title: string;
  nextHref: string;
  nextTitle: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslations();
  const sheetRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const shownPathRef = useRef(pathname);

  // Abrir: guarda quem tinha o foco, trava o scroll do body e foca o botão voltar.
  // Fechar: restaura os dois (o foco só volta se o elemento ainda estiver na página).
  useEffect(() => {
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    backRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = previousOverflow;
      if (opener && opener !== document.body && opener.isConnected) {
        opener.focus({ preventScroll: true });
      }
    };
  }, []);

  // Esc fecha; Tab e Shift+Tab ciclam entre os focáveis da folha. Escuta o documento
  // (e não só a folha) para valer também com o foco no body, por exemplo depois de
  // clicar num trecho não focável.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        // Esc segurado repete o evento: só o primeiro fecha.
        if (!event.repeat) router.back();
        return;
      }
      if (event.key !== 'Tab') return;

      const sheet = sheetRef.current;
      if (!sheet) return;
      const items = focusableIn(sheet);
      if (items.length === 0) {
        event.preventDefault();
        sheet.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const outside = !active || !sheet.contains(active);
      if (event.shiftKey) {
        if (outside || active === first || active === sheet) {
          event.preventDefault();
          last.focus();
        }
      } else if (outside || active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [router]);

  // Trocou de projeto sem a folha ser remontada (a URL mudou): volta ao topo e o foco
  // volta ao botão voltar. Hoje o Next remonta a folha inteira a cada `(.)<slug>`, e
  // este efeito não dispara; ele vale se a folha passar a ser compartilhada entre projetos.
  useEffect(() => {
    if (shownPathRef.current === pathname) return;
    shownPathRef.current = pathname;
    sheetRef.current?.scrollTo({ top: 0, behavior: 'instant' });
    backRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <div
      ref={sheetRef}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      tabIndex={-1}
      className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-[color:var(--color-cream)] outline-none"
    >
      <div className="container-narrow pt-6">
        <button
          ref={backRef}
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-full border border-dashed border-[color:var(--color-blue)] px-4 py-2 text-[color:var(--color-blue)]"
        >
          <span aria-hidden>←</span>
          {t('projectsPage.back')}
        </button>
      </div>

      <div key={pathname}>{children}</div>

      <div className="container-narrow pb-16">
        <button
          type="button"
          onClick={() => router.replace(nextHref, { scroll: false })}
          className="ml-auto flex items-center gap-2 text-[color:var(--color-blue)]"
        >
          {t('projectsPage.next').replace('{title}', nextTitle)}
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
