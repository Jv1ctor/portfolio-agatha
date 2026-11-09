'use client';

import { useRef } from "react";
import type { CajuBook } from "./caju/CajuBook";
import { CajuBook as Book } from "./caju/CajuBook";
import s from "./caju.module.css";

type Sections = {
  readingSim: { title: string; aiNote: string };
  book: {
    title: string;
    cover: string;
    backCover: string;
    pages: string[];
    label: { cover: string; back: string; pages: string };
    hint: { cover: string; middle: string; end: string };
    nav: { open: string; turn: string; back: string; prev: string; next: string; restart: string };
    lock: string[];
  };
};

/** Seção "Simulação de leitura": flipbook + trava de leitura (precisa de ref → client). */
export function CajuReadingSim({
  sections,
  faces,
  mascotSrc,
}: {
  sections: Sections;
  faces: string[];
  mascotSrc: string;
}) {
  const lockRef = useRef<HTMLElement>(null);
  const book = sections.book;
  return (
    <section ref={lockRef} aria-label={sections.readingSim.title}>
      <h2 className={s.bookTitle}>{sections.readingSim.title}</h2>
      <Book
        cover={faces[0]}
        pages={faces.slice(1, -1)}
        backCover={faces[faces.length - 1]}
        mascotSrc={mascotSrc}
        texts={{
          title: book.title,
          cover: book.cover,
          backCover: book.backCover,
          pages: book.pages,
          label: book.label,
          hint: book.hint,
          nav: book.nav,
          lock: book.lock,
        }}
      />
      <p className={s.note}>{sections.readingSim.aiNote}</p>
    </section>
  );
}

export type { CajuBook };
