'use client';

import { useEffect } from 'react';
import s from './cascavel.module.css';

/**
 * Fallback do pan dos renders (ANIMACOES §3) para navegadores sem
 * `animation-timeline: view()`: a cada frame de scroll calcula
 * `t = (vh - topo) / (vh + altura)` e aplica `translateX(-1.5% + 3% * t)`.
 * Com reduced-motion não faz nada (o CSS já zera a transform).
 */
export function CascavelPan() {
  useEffect(() => {
    if (CSS.supports('animation-timeline: view()')) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const frames = Array.from(document.querySelectorAll<HTMLElement>(`.${s.pan}`));
    if (!frames.length) return;
    for (const f of frames) f.classList.add(s.panFallback);
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const f of frames) {
        const r = f.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        const t = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        const img = f.querySelector('img');
        if (img) img.style.transform = `scale(1.06) translateX(${-1.5 + 3 * t}%)`;
      }
    };
    const onScroll = () => {
      if (raf === 0) raf = requestAnimationFrame(update);
    };
    update();
    // captura: também pega o scroll do contêiner do modal, não só da janela
    document.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', onScroll);
      for (const f of frames) {
        f.classList.remove(s.panFallback);
        const img = f.querySelector('img');
        if (img) img.style.transform = '';
      }
    };
  }, []);
  return null;
}
