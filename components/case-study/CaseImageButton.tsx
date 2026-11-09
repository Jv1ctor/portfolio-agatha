'use client';

import type { ReactNode } from 'react';
import { useTranslations } from '@/lib/i18n/use-translation';
import s from './case-study.module.css';

/**
 * Botão de imagem clicável: abre o lightbox (data-lb = índice em `<Lightbox images>`).
 * Zoom hover 1.035 em 1s ease-out (ANIMACOES §0); o cursor nativo fica escondido
 * só em dispositivos com mouse (classe .ph no CSS module). O aria-label vem de
 * `projects.lightbox.open` com a legenda (`cap`) da imagem.
 */
export function CaseImageButton({
  src,
  alt,
  index,
  cap,
  className,
  imgClassName,
  children,
}: {
  src: string;
  alt: string;
  /** Índice desta imagem no array do `<Lightbox />`. */
  index: number;
  /** Legenda curta da imagem (a mesma do lightbox). */
  cap: string;
  className?: string;
  imgClassName?: string;
  children?: ReactNode;
}) {
  const { t } = useTranslations();
  return (
    <button
      type="button"
      className={`${s.ph} ${className ?? ''}`}
      data-lb={index}
      aria-label={t('projects.lightbox.open').replace('{cap}', cap)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" className={imgClassName ?? ''} />
      {children}
    </button>
  );
}
