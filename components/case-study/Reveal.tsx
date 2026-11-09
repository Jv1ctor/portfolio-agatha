'use client';

import type { ReactNode } from 'react';
import s from './case-study.module.css';

/**
 * Reveal no scroll (ANIMACOES §0): `.rv` usa `animation-timeline: view()`;
 * em navegadores sem suporte, um IntersectionObserver aplica `.rvIoIn`
 * (mesma subida como transição de .8s ease-out aos 12% de entrada).
 */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div ref={revealRef} className={`${s.rv} ${className ?? ''}`}>
      {children}
    </div>
  );
}

function revealRef(el: HTMLDivElement | null) {
  if (!el) return;
  if (!CSS.supports('animation-timeline: view()')) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add(s.rvIoIn);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }
}
