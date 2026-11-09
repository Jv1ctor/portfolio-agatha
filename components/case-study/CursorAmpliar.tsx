'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from '@/lib/i18n/use-translation';
import { useFinePointer, useReducedMotion } from '@/lib/hooks/use-media-query';
import s from './case-study.module.css';

/**
 * Cursor rosa 84px "ampliar +" que segue o mouse sobre imagens clicáveis
 * ([data-lb]) — ANIMACOES §0. Só monta em (hover:hover) and (pointer:fine),
 * e some com o modal aberto (classe .lb no body esconde via CSS).
 * Renderizado pelo corpo do case, FORA de qualquer container-type.
 */
export function CursorAmpliar() {
  const { t } = useTranslations();
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const target = { x: -200, y: -200, on: false };
    const pos = { x: -200, y: -200 };
    let raf = 0;
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.35;
      pos.y += (target.y - pos.y) * 0.35;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${target.on ? 1 : 0})`;
      const settled =
        Math.abs(target.x - pos.x) < 0.1 && Math.abs(target.y - pos.y) < 0.1;
      raf = settled && target.on ? 0 : requestAnimationFrame(tick);
      if (settled && !target.on) raf = 0;
    };
    const start = () => {
      if (raf === 0) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const over = (e.target as HTMLElement).closest('[data-lb]');
      const on = Boolean(over) && !document.body.classList.contains('lb-open');
      if (on !== target.on) {
        target.on = on;
        el.classList.toggle(s.cursorOn, on);
      }
      start();
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, [enabled]);

  if (!enabled) return null;
  const [w1, w2] = t('projects.lightbox.zoom').split(' ');
  // Portal no body: `position: fixed` dentro do case quebraria sob um ancestral
  // com transform/container-type (ex.: a folha animada do ProjectModal).
  return createPortal(
    <div ref={ref} className={`${s.cursor} cursor-lb`} aria-hidden>
      <span className={s.cursorDot}>
        {w1}
        <br />
        {w2}
      </span>
    </div>,
    document.body,
  );
}
