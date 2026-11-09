import type { ReactNode } from "react";
import type { LocalizedProject } from "@/lib/projects";
import { CaseImageButton } from "@/components/case-study/CaseImageButton";
import { CursorAmpliar } from "@/components/case-study/CursorAmpliar";
import { Lightbox, type LightboxImage } from "@/components/case-study/Lightbox";
import { Reveal } from "@/components/case-study/Reveal";
import { CascavelPan } from "./CascavelPan";
import type { CaseSlotsFn } from "./index";
import s from "./cascavel.module.css";

const base = "/images/projects/cascavel";

/* Campos que só o Cascavel tem no dicionário; a união `LocalizedProject` não os enxerga. */
type Sections = {
  creationProcess: { title: string; paragraphs: string[]; images: string[] };
  prototyping: { title: string; tabs: string[]; paragraphs: string[]; images: string[] };
  captionA: string;
  captionB: string;
  firstVersions: { title: string; images: string[] };
  finalProject: {
    title: string;
    paragraphs: string[];
    toolsTitle: string;
    tools: string[];
    creditsTitle: string;
    creditsParagraphs: string[];
    executionTitle: string;
    executionLead: string;
    executionBody: string;
    executionNote: string;
  };
};
type Extra = { lightbox: { items: { cap: string; alt: string }[] } };

/**
 * Recortes do frame 17:4049, na ordem do lightbox (ANIMACOES §3: 23 imagens).
 * Mapa em docs/superpowers/analysis/figma-cascavel-assets.md.
 */
const FILES = [
  "hero", // 0
  "fluxo", // 1
  "paineis", // 2
  "imagem-a", // 3
  "escolinha", // 4
  "pintura", // 5
  "blender", // 6
  "identidade", // 7
  "tela-1", "tela-2", "tela-3", "tela-4", "tela-5", "tela-6", "tela-7", "tela-8", "tela-9", // 8..16
  "render-1", "render-2", "render-3", "render-4", "render-5", "render-6", // 17..22
] as const;

/** Altura/largura de cada render final no Figma (todos com 1354 de largura). */
const RENDER_H = [677, 677, 677, 693, 762, 677];

/** Colegas citados no processo de criação — em negrito no Figma (17:4189). */
const BOLD = /(Amanda|Raquel|Felipe)/g;
/** Autores dos modelos do Sketchfab — sublinhados no Figma (17:4717). */
const UNDERLINE = /(Vr-cvantorium|henriqueart_lfv|Wouter Yntema|Hänsen)/g;

function sectionsOf(project: LocalizedProject) {
  return project.sections as unknown as Sections;
}
function itemsOf(project: LocalizedProject) {
  return (project as unknown as Extra).lightbox.items;
}

function withBold(text: string): ReactNode[] {
  return text.split(BOLD).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));
}
function withUnderline(text: string): ReactNode[] {
  return text.split(UNDERLINE).map((part, i) => (i % 2 ? <u key={i}>{part}</u> : part));
}

function Img({
  project,
  i,
  className,
}: {
  project: LocalizedProject;
  i: number;
  className?: string;
}) {
  const it = itemsOf(project)[i];
  return (
    <CaseImageButton
      src={`${base}/${FILES[i]}.jpg`}
      alt={it?.alt ?? ""}
      index={i}
      cap={it?.cap ?? ""}
      className={className}
    />
  );
}

function Paragraphs({ items, bold = false }: { items: string[]; bold?: boolean }) {
  return (
    <div className="flex flex-col gap-[1.125rem]">
      {items.map((p, i) => (
        <p key={i} className={s.p}>
          {bold ? withBold(p) : p}
        </p>
      ))}
    </div>
  );
}

/**
 * Título de seção do corpo — Clother Bold 32px, como no frame 17:4049 (o
 * `CaseSection` compartilhado usa 26px e perde o 700 para a regra global de h2).
 * `tight`: blocos cujo texto no Figma tem entrelinha de 18px (Projeto final,
 * Citação, Execução) — o título "sobe" ~10px em relação à caixa, como lá.
 */
function Section({
  title,
  variant,
  className,
  children,
}: {
  title: string;
  variant?: "proc" | "tight";
  className?: string;
  children?: ReactNode;
}) {
  const v = variant === "proc" ? s.hProc : variant === "tight" ? s.hTight : "";
  return (
    <section className={className}>
      <h2 className={`${s.h} ${v}`}>{title}</h2>
      {children}
    </section>
  );
}

function Pills({ items }: { items: string[] }) {
  return (
    <ul className={s.pls}>
      {items.map((t) => (
        <li key={t} className={s.pl}>
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Topo: a capa (render + selo da serpente, 17:4156) abre o lightbox no índice 0. */
export const cascavelSlots: CaseSlotsFn = (project, { coverClassName }) => ({
  cover: <Img project={project} i={0} className={`rounded-[8px] ${coverClassName ?? ""}`} />,
});

/** Corpo do case (tudo entre `<CaseShell>` e `</CaseShell>`), reutilizado pela página e pelo modal. */
export function CascavelCase({ project }: { project: LocalizedProject }) {
  const { creationProcess: cp, prototyping: proto, finalProject: fin, ...sec } =
    sectionsOf(project);
  const items = itemsOf(project);

  const images: LightboxImage[] = FILES.map((f, i) => ({
    src: `${base}/${f}.jpg`,
    alt: items[i]?.alt ?? "",
    cap: items[i]?.cap ?? "",
  }));

  return (
    <>
      {/* Processo de criação + mapa de fluxo (17:4187) */}
      <Reveal>
        <Section title={cp.title} variant="proc">
          <Paragraphs items={cp.paragraphs} bold />
        </Section>
        <Img project={project} i={1} className="mt-8" />
      </Reveal>

      {/* Prototipagem | painéis de referência (17:4193) */}
      <Reveal className={s.colsProto}>
        <Section title={proto.title}>
          <Pills items={proto.tabs} />
          <div className="mt-6">
            <Paragraphs items={proto.paragraphs} />
          </div>
        </Section>
        <Img project={project} i={2} className={s.paineis} />
      </Reveal>

      {/* Imagem a — prancha dos assets 3D (17:4218) */}
      <Reveal>
        <h3 className={s.label}>{sec.captionA}</h3>
        <Img project={project} i={3} className={s.board} />
      </Reveal>

      {/* Imagem b — colagem: escolinha | pintura + Blender, e a faixa de identidade */}
      <Reveal>
        <h3 className={s.label}>{sec.captionB}</h3>
        <div className={s.cl}>
          <Img project={project} i={4} className={s.clMain} />
          <Img project={project} i={5} className={s.clTop} />
          <Img project={project} i={6} className={s.clBottom} />
          {/* Setas desenhadas do Figma (17:4657-58 e 17:4659-61), decorativas */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${base}/seta-1.png`} alt="" aria-hidden className={`${s.arrow} ${s.arrow1}`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${base}/seta-2.png`} alt="" aria-hidden className={`${s.arrow} ${s.arrow2}`} />
        </div>
        <Img project={project} i={7} className={`${s.free} ${s.identidade}`} />
      </Reveal>

      {/* Primeiras versões e renderizações — grade 3x3 (17:4662) */}
      <Reveal>
        <h3 className={s.label}>{sec.firstVersions.title}</h3>
        <div className={s.grid3}>
          {Array.from({ length: 9 }, (_, k) => (
            <Img
              key={k}
              project={project}
              i={8 + k}
              className={k < 3 ? s.tela43 : s.tela169}
            />
          ))}
        </div>
      </Reveal>

      {/* Projeto final | Ferramentas utilizadas (17:4677) */}
      <Reveal className={s.colsFinal}>
        <Section title={fin.title} variant="tight">
          <Paragraphs items={fin.paragraphs} />
        </Section>
        <Section title={fin.toolsTitle}>
          <Pills items={fin.tools} />
        </Section>
      </Reveal>

      {/* Renders finais com pan horizontal ligado ao scroll (ANIMACOES §3) */}
      <div className={s.renders}>
        {RENDER_H.map((h, k) => (
          <Reveal key={k}>
            <div className={s.pan} style={{ aspectRatio: `1354 / ${h}` }}>
              <Img project={project} i={17 + k} />
            </div>
          </Reveal>
        ))}
      </div>

      {/* Citação de referencial | Execução promovida por (17:4715) */}
      <Reveal className={s.colsCredits}>
        <Section title={fin.creditsTitle} variant="tight">
          {/* Figma 17:4717: um só bloco de 9 linhas — quebra de linha, sem vão entre os parágrafos */}
          {fin.creditsParagraphs.map((p, i) => (
            <p key={i} className={s.p}>
              {withUnderline(p)}
            </p>
          ))}
        </Section>
        <Section title={fin.executionTitle} variant="tight" className={s.exec}>
          <p className={s.p}>
            <strong>{fin.executionLead}</strong>
            {fin.executionBody}
          </p>
          <p className={`${s.p} ${s.note}`}>{fin.executionNote}</p>
        </Section>
      </Reveal>

      <Lightbox images={images} />
      <CursorAmpliar />
      <CascavelPan />
    </>
  );
}
