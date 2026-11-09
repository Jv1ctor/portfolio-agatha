import type { ReactNode } from 'react';
import s from './case-study.module.css';

/**
 * Botão de imagem clicável: abre o lightbox (data-lb = índice em `<Lightbox images>`).
 * Zoom hover 1.035 em 1s ease-out (ANIMACOES §0); o cursor nativo fica escondido
 * só em dispositivos com mouse (classe .ph no CSS module).
 */
export function CaseImageButton({
  src,
  alt,
  index,
  label,
  className,
  imgClassName,
  children,
}: {
  src: string;
  alt: string;
  /** Índice desta imagem no array do `<Lightbox />`. */
  index: number;
  /** aria-label do botão. */
  label: string;
  className?: string;
  imgClassName?: string;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      className={`${s.ph} ${className ?? ''}`}
      data-lb={index}
      aria-label={label}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className={`${imgClassName ?? ''}`} />
      {children}
    </button>
  );
}
