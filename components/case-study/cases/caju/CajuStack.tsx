'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import s from '../caju.module.css';

const smooth = (t: number) => {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
};

/**
 * Pilha de páginas no scroll (ANIMACOES §4.1).
 *
 * O wrapper tem 3,6 telas de altura e o quadro fica `sticky` no topo. O progresso
 * `p = clamp(−wrapper.top / (wrapper.altura − tela), 0, 1)` é perseguido com
 * suavização 0,08 por frame; a linha 2 sobe entre 8% e 46% do percurso e a linha
 * 3 entre 54% e 92% (smoothstep), via `--e1`/`--e2` no CSS. Tela baixa: a pilha
 * escala para caber com 48px de margem. Tela com mais de 1500px de altura ou
 * movimento reduzido: pilha montada, sem fixar.
 *
 * O evento de scroll é escutado em captura no documento para valer também
 * dentro do modal de projeto (a folha do modal é quem rola, não a janela).
 */
export function CajuStack({ label, children }: { label: string; children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const frame = frameRef.current;
    const stack = stackRef.current;
    if (!wrap || !frame || !stack) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let vh = window.innerHeight;
    let sp = 0;
    let tp = 0;
    let raf = 0;

    const pinned = () => !reduced.matches && vh <= 1500;
    const paint = () => {
      stack.style.setProperty('--e1', smooth((sp - 0.08) / 0.38).toFixed(4));
      stack.style.setProperty('--e2', smooth((sp - 0.54) / 0.38).toFixed(4));
    };
    const loop = () => {
      let next = sp + (tp - sp) * 0.08;
      if (Math.abs(tp - next) < 0.0008) next = tp;
      sp = next;
      paint();
      raf = next !== tp ? requestAnimationFrame(loop) : 0;
    };
    const onScroll = () => {
      if (!pinned()) return;
      const r = wrap.getBoundingClientRect();
      tp = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height - vh)));
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const layout = () => {
      vh = window.innerHeight;
      if (pinned()) {
        const stackH = (stack.offsetWidth * 1273) / 1360;
        const sc = Math.min(1, (vh - 96) / stackH);
        wrap.style.height = `${Math.round(vh * 3.6)}px`;
        frame.style.height = `${vh}px`;
        frame.style.position = 'sticky';
        stack.style.transform = `scale(${sc.toFixed(4)})`;
        // posição atual sem suavização (ex.: recarregou no meio da pilha)
        const r = wrap.getBoundingClientRect();
        sp = tp = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height - vh)));
      } else {
        wrap.style.height = '';
        frame.style.height = '';
        frame.style.position = '';
        stack.style.transform = '';
        sp = tp = 1;
      }
      paint();
    };

    layout();
    document.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', layout);
    reduced.addEventListener('change', layout);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', layout);
      reduced.removeEventListener('change', layout);
    };
  }, []);

  return (
    <div ref={wrapRef} className={s.stkWrap}>
      <div ref={frameRef} className={s.stkFrame}>
        <div ref={stackRef} className={s.stack} role="group" aria-label={label}>
          {children}
        </div>
      </div>
    </div>
  );
}
