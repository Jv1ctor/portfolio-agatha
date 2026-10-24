'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/lib/i18n/use-translation';
import s from './projects.module.css';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Elementos focáveis visíveis dentro de `root`, na ordem do DOM. */
function focusableIn(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.getClientRects().length > 0,
  );
}

/**
 * "Próximo" troca de projeto remontando a folha inteira (o Next remonta a página
 * interceptada a cada `(.)<slug>`). Este recado de um módulo só, escrito no clique
 * e lido pela folha nova, faz a troca ser contínua: o fundo não aparece de novo, o
 * foco de volta ao fechar continua sendo o do card que abriu o primeiro projeto e a
 * folha que sai não devolve o foco a ninguém.
 */
let nextHandoff: { opener: HTMLElement | null } | null = null;

/**
 * Folha do modal de case (aberta por rota interceptada, por cima do índice).
 * Comportamento: foco no botão voltar ao abrir e devolvido ao elemento que abriu
 * ao fechar (ou ao card do projeto aberto, se quem abriu era o body); scroll do
 * body travado enquanto aberto, sem deslocar a página atrás; Esc e "voltar" fecham
 * com `router.back()`, uma vez só; Tab fica preso dentro da folha; "próximo" troca
 * de projeto com `router.replace` (um único voltar do navegador leva ao índice).
 * O conteúdo (`children`) é renderizado no servidor e só passa por aqui.
 */
export function ProjectModal({
  slug,
  title,
  nextHref,
  nextTitle,
  children,
}: {
  slug: string;
  title: string;
  nextHref: string;
  nextTitle: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const { t, locale } = useTranslations();
  const sheetRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const closingRef = useRef(false);
  // Veio de um "próximo"? Então o fundo já está na tela e não faz fade de novo.
  const [continued] = useState(() => nextHandoff !== null);

  // Dois Esc ou um clique duplo antes de a folha sair não podem voltar duas vezes.
  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    router.back();
  }, [router]);

  // Abrir: guarda quem tinha o foco, trava o scroll do body (compensando a barra de
  // rolagem que some) e foca o botão voltar. Fechar: restaura tudo; o foco volta ao
  // opener se ele ainda estiver na página e não for o body (Safari/Firefox não focam
  // o link no clique), senão ao card do projeto que estava aberto.
  useEffect(() => {
    const handoff = nextHandoff;
    nextHandoff = null;
    const active = document.activeElement;
    openerRef.current = handoff ? handoff.opener : active instanceof HTMLElement ? active : null;
    const body = document.body;
    const previous = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    const gap = window.innerWidth - document.documentElement.clientWidth;
    if (gap > 0) {
      const current = parseFloat(getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${current + gap}px`;
    }
    body.style.overflow = 'hidden';
    backRef.current?.focus({ preventScroll: true });

    return () => {
      body.style.overflow = previous.overflow;
      body.style.paddingRight = previous.paddingRight;
      if (nextHandoff) return; // trocando de projeto: a folha nova assume o foco
      const opener = openerRef.current;
      const target =
        opener && opener !== body && opener.isConnected
          ? opener
          : document.querySelector<HTMLElement>(`a[href="/${locale}/projetos/${slug}"]`);
      target?.focus({ preventScroll: true });
    };
  }, [locale, slug]);

  // Esc fecha; Tab e Shift+Tab ciclam entre os focáveis da folha. Escuta o documento
  // (e não só a folha) para valer também com o foco no body, por exemplo depois de
  // clicar num trecho não focável.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        // Esc segurado repete o evento: só o primeiro fecha.
        if (!event.repeat) close();
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
  }, [close]);

  return (
    <div
      ref={sheetRef}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      tabIndex={-1}
      className={continued ? `${s.sheet} ${s.sheetStatic}` : s.sheet}
    >
      <div className={`container-narrow ${s.sheetInner}`}>
        <button
          ref={backRef}
          type="button"
          onClick={close}
          className={s.backBtn}
        >
          <span aria-hidden>←</span>
          {t('projectsPage.back')}
        </button>
      </div>

      {children}

      <div className={`container-narrow ${s.sheetFoot}`}>
        <button
          type="button"
          onClick={() => {
            if (closingRef.current) return;
            nextHandoff = { opener: openerRef.current };
            router.replace(nextHref, { scroll: false });
          }}
          className={s.nextLink}
        >
          {t('projectsPage.next').replace('{title}', nextTitle)}
          <span aria-hidden className={s.arrow}>→</span>
        </button>
      </div>
    </div>
  );
}
