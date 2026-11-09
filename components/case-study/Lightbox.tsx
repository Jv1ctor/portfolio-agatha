'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from '@/lib/i18n/use-translation';
import s from './case-study.module.css';

export type LightboxImage = {
  src: string;
  alt: string;
  /** Legenda exibida na barra (seguida de "· i / N"). */
  cap: string;
};

/**
 * Modal de imagens compartilhado pelas páginas de case (ANIMACOES §1).
 * Renderizado via portal em document.body (fora de qualquer container-type),
 * com nav circular (setas, ←/→, swipe), Esc/fundo fecham, focus trap e
 * foco devolvido ao abrir. `body.lb-open` trava o scroll da página.
 *
 * `onOpenChange` avisa o pai (a trava de leitura do Caju desliga com o modal aberto).
 */
export function Lightbox({
  images,
  onOpenChange,
}: {
  images: LightboxImage[];
  onOpenChange?: (open: boolean) => void;
}) {
  const { t } = useTranslations();
  const [idx, setIdx] = useState<number | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const total = images.length;

  const open = useCallback((i: number, el: HTMLElement) => {
    openerRef.current = el;
    setIdx(i);
    onOpenChange?.(true);
  }, [onOpenChange]);

  const close = useCallback(() => {
    setIdx(null);
    onOpenChange?.(false);
    openerRef.current?.focus();
  }, [onOpenChange]);

  const step = useCallback((d: number) => {
    setIdx((cur) => (cur === null ? cur : (cur + d + total) % total));
  }, [total]);

  // Delegação: qualquer botão com data-lb="índice" abre o modal.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-lb]');
      if (!el) return;
      const i = Number(el.dataset.lb);
      if (Number.isInteger(i) && i >= 0 && i < total) open(i, el);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [open, total]);

  // Teclado + trava de scroll + foco no fechar, só com o modal aberto.
  // Escuta na fase de captura e marca o evento como tratado: o case pode estar
  // dentro do ProjectModal, que também fecha com Esc e prende o Tab, mas ignora
  // eventos com `defaultPrevented`.
  useEffect(() => {
    if (idx === null) return;
    document.body.classList.add('lb-open');
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'Tab') {
        // focus trap: cicla entre os botões do lightbox. Só para a propagação
        // (o trap do ProjectModal não roda); o Tab interno segue normal.
        e.stopPropagation();
        const focusables = Array.from(
          document.querySelectorAll<HTMLElement>('.lb [data-lbfocus]')
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const inside = focusables.includes(document.activeElement as HTMLElement);
        if (!inside || (e.shiftKey && document.activeElement === first)) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        return;
      } else return;
      e.preventDefault();
      e.stopPropagation();
    };
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      document.body.classList.remove('lb-open');
    };
  }, [idx, close, step]);

  if (idx === null) return null;
  const img = images[idx];

  return createPortal(
    <div
      className={`${s.lb} lb`}
      role="dialog"
      aria-modal="true"
      aria-label={img.cap}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <button
        ref={closeRef}
        type="button"
        className={`${s.lbBtn} ${s.lbClose}`}
        aria-label={t('projects.lightbox.close')}
        data-lbfocus
        onClick={close}
      >
        ×
      </button>
      {/* key = idx reanima a entrada da imagem a cada troca */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img key={idx} className={s.lbImg} src={img.src} alt={img.alt} />
      <div className={s.lbBar}>
        <button
          type="button"
          className={`${s.lbBtn} ${s.lbNav}`}
          aria-label={t('projects.lightbox.prev')}
          data-lbfocus
          onClick={() => step(-1)}
        >
          ←
        </button>
        <span className={s.lbLabel} aria-live="polite">
          {img.cap} ·{' '}
          {t('projects.lightbox.position')
            .replace('{i}', String(idx + 1))
            .replace('{n}', String(total))}
        </span>
        <button
          type="button"
          className={`${s.lbBtn} ${s.lbNav}`}
          aria-label={t('projects.lightbox.next')}
          data-lbfocus
          onClick={() => step(1)}
        >
          →
        </button>
      </div>
    </div>,
    document.body
  );
}
