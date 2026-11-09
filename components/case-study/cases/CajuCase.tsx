import type { LocalizedProject } from "@/lib/projects";
import { CaseSection } from "@/components/case-study/CaseShell";
import { CaseImageButton } from "@/components/case-study/CaseImageButton";
import { Lightbox, type LightboxImage } from "@/components/case-study/Lightbox";
import { CursorAmpliar } from "@/components/case-study/CursorAmpliar";
import { Reveal } from "@/components/case-study/Reveal";
import { CajuStack } from "./caju/CajuStack";
import { CajuReadingSim } from "./CajuReadingSim";
import type { CaseSlotsFn } from "./index";
import s from "./caju.module.css";

const base = "/images/projects/caju";

type CajuSections = {
  creationProcess: {
    title: string;
    lead: string;
    paragraphs: string[];
    images: string[];
    caps: string[];
    captions: Record<string, string>;
    cards: {
      ideias: { title: string; text: string };
      fontes: { title: string; text: string };
      infoTecnicas: { title: string; lines: string[] };
      roteiro: { title: string; columns: string[]; text: string };
      paleta: { title: string; alt: string };
      personagens: { title: string; items: { name: string; desc: string }[] };
    };
  };
  prototyping: {
    title: string;
    tabs: string[];
    paragraphs: string[];
    blocks: { caption: string; imageAlt: string }[];
    images: string[];
  };
  bookStack: { title: string; label?: string; images: string[] };
  readingSim: { title: string; aiNote: string };
  readLock: Record<string, string>;
  book: {
    stackLabel: string;
    title: string;
    cover: string;
    backCover: string;
    pages: string[];
    label: { cover: string; back: string; pages: string };
    hint: { cover: string; middle: string; end: string };
    nav: { open: string; turn: string; back: string; prev: string; next: string; restart: string };
    lock: string[];
  };
  finalProject: {
    title: string;
    paragraphs: string[];
    toolsTitle: string;
    tools: string[];
    printedTitle: string;
    images: string[];
    aiNote: string;
  };
};

/** Nomes semânticos dos recortes do frame 17:5070 (mapa em docs/.../figma-caju-assets.md). */
const PROTO_FILES = [
  "brainstorming.jpg",
  "painel-visual.jpg",
  "teste-cores-storyboard.jpg",
  "design-personagens.jpg",
  "rafe-1.jpg",
  "rafe-2.jpg",
  "pintura-tablet.jpg",
  "pintura-clip-studio.jpg",
];
const CAPTION_KEYS = [
  "brainstorming",
  "visualPanel",
  "colorTests",
  "characters",
  "roughs",
  "painting",
  "painting",
  "painting",
] as const;
const PRINTED_FILES = ["impresso-1.jpg", "impresso-2.jpg", "impresso-3.jpg", "livro-capa.jpg"];
const STACK_FILES = [
  "livro-pag-1.jpg",
  "livro-pag-2.jpg",
  "livro-pag-3.jpg",
  "livro-pag-4.jpg",
  "livro-pag-5.jpg",
  "livro-pag-6.jpg",
  "livro-pag-7.jpg",
  "livro-pag-8.jpg",
];
const BOOK_FACE_POOL = [
  ...STACK_FILES,
  "capa-versoes.jpg",
  "quadro-processo.jpg",
  "diagramacao-indesign.jpg",
].map((f) => `${base}/${f}`);

/** Topo do case (Figma 17:5070): cabeçalho 688px | aside 631px, vão 32 — capa do livro no aside. */
export const cajuSlots: CaseSlotsFn = (project, { coverClassName }) => ({
  cover: (
    <CaseImageButton
      src={`${base}/hero.jpg`}
      alt={(project.sections as unknown as CajuSections).creationProcess.images[0] ?? project.title}
      index={0}
      cap={(project.sections as unknown as CajuSections).creationProcess.caps?.[0] ?? project.title}
      className={`rounded-[8px] ${coverClassName ?? ""}`}
    />
  ),
  aside: (
    <CaseImageButton
      src={`${base}/capa-versoes.jpg`}
      alt={(project.sections as unknown as CajuSections).bookStack?.label ?? "Capa do livro"}
      index={1 + PROTO_FILES.length + PRINTED_FILES.length}
      cap={(project.sections as unknown as CajuSections).bookStack?.label ?? "Capa do livro"}
    />
  ),
  asideLayout: { main: 688, aside: 631, gap: 32 },
});

/** Corpo do case Caju (Figma 17:5070 + ANIMACOES §4), reutilizado pela página e pelo modal. */
export function CajuCase({ project }: { project: LocalizedProject }) {
  const sections = project.sections as unknown as CajuSections;
  const cp = sections.creationProcess;
  const proto = sections.prototyping;
  const fin = sections.finalProject;
  const book = (sections as { book?: CajuSections["book"] }).book ?? sections.book;

  const lbImages: LightboxImage[] = [
    { src: `${base}/hero.jpg`, alt: cp.images[0] ?? project.title, cap: cp.caps?.[0] ?? project.title },
    ...proto.blocks.map((b, i) => ({
      src: `${base}/${PROTO_FILES[i]}`,
      alt: b.imageAlt,
      cap: cp.captions[CAPTION_KEYS[i]] ?? b.caption,
    })),
    ...fin.images.map((alt, i) => ({
      src: `${base}/${PRINTED_FILES[i]}`,
      alt,
      cap: fin.printedTitle,
    })),
    {
      src: `${base}/capa-versoes.jpg`,
      alt: sections.bookStack?.label ?? "Capa do livro",
      cap: sections.bookStack?.label ?? "Capa do livro",
    },
  ];

  const stackImgs = STACK_FILES.slice(0, 6).map((f, i) => ({
    src: `${base}/${f}`,
    alt: sections.bookStack.images[i] ?? "",
  }));

  // flipbook: 32 faces = capa + 30 páginas + contracapa (ANIMACOES §4.2)
  const faces = [
    `${base}/livro-capa.jpg`,
    ...Array.from({ length: 30 }, (_, i) => BOOK_FACE_POOL[i % BOOK_FACE_POOL.length]),
    `${base}/capa-versoes.jpg`,
  ];

  return (
    <>
      {/* Processo de criação: lead (negrito em Ana/Thays) + parágrafos + grid de cards */}
      <Reveal>
        <CaseSection title={cp.title}>
          <div className={s.paras}>
            <p className={s.p}>{cp.lead}</p>
            {cp.paragraphs.map((p, i) => (
              <p key={i} className={s.p}>
                {p}
              </p>
            ))}
          </div>
          <div className={`${s.cards} mt-8`}>
            <Reveal className={s.card}>
              <h3 className={s.cardTitle}>{cp.cards.ideias.title}</h3>
              <p className={s.p}>{cp.cards.ideias.text}</p>
            </Reveal>
            <Reveal className={s.card}>
              <h3 className={s.cardTitle}>{cp.cards.fontes.title}</h3>
              <p className={s.p}>{cp.cards.fontes.text}</p>
            </Reveal>
            <Reveal className={s.card}>
              <h3 className={s.cardTitle}>{cp.cards.infoTecnicas.title}</h3>
              <ul className={s.p}>
                {cp.cards.infoTecnicas.lines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal className={s.card}>
              <h3 className={s.cardTitle}>{cp.cards.roteiro.title}</h3>
              <div className={`${s.pls} mb-2`}>
                {cp.cards.roteiro.columns.map((c) => (
                  <span key={c} className={s.plSoft}>
                    {c}
                  </span>
                ))}
              </div>
              <p className={s.p}>{cp.cards.roteiro.text}</p>
            </Reveal>
            <Reveal className={s.card}>
              <h3 className={s.cardTitle}>{cp.cards.paleta.title}</h3>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${base}/capa-versoes.jpg`} alt={cp.cards.paleta.alt} className={s.cardImg} />
            </Reveal>
            <Reveal className={s.card}>
              <h3 className={s.cardTitle}>{cp.cards.personagens.title}</h3>
              <ul className={`${s.p} flex flex-col gap-1.5`}>
                {cp.cards.personagens.items.map((it) => (
                  <li key={it.name}>
                    <strong>{it.name}</strong> — {it.desc}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </CaseSection>
      </Reveal>

      {/* Prototipagem: pills + parágrafo + blocos de imagens clicáveis (lightbox) */}
      <Reveal>
        <CaseSection title={proto.title}>
          <div className={s.pls}>
            {proto.tabs.map((tab) => (
              <span key={tab} className={s.pl}>
                {tab}
              </span>
            ))}
          </div>
          <div className={`${s.paras} mt-6`}>
            {proto.paragraphs.map((p, i) => (
              <p key={i} className={s.p}>
                {p}
              </p>
            ))}
          </div>
          <div className={`${s.protoGrid} mt-6`}>
            {proto.blocks.map((b, i) => (
              <figure key={b.caption} className={s.fig}>
                <CaseImageButton
                  src={`${base}/${PROTO_FILES[i]}`}
                  alt={b.imageAlt}
                  index={1 + i}
                  cap={cp.captions[CAPTION_KEYS[i]] ?? b.caption}
                />
                <figcaption className={s.cap}>{cp.captions[CAPTION_KEYS[i]] ?? b.caption}</figcaption>
              </figure>
            ))}
          </div>
        </CaseSection>
      </Reveal>

      {/* Pilha sticky de páginas do livro (ANIMACOES §4.1) */}
      <Reveal>
        <CaseSection title={sections.bookStack.title}>
          <CajuStack label={book.stackLabel}>
            <div className={s.stackGrid}>
              {stackImgs.map((im) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={im.src} src={im.src} alt={im.alt} loading="lazy" decoding="async" />
              ))}
            </div>
          </CajuStack>
        </CaseSection>
      </Reveal>

      {/* Simulação de leitura: flipbook + trava de leitura com mascote (ANIMACOES §4.2/§4.3) */}
      <CajuReadingSim sections={sections} faces={faces} />

      {/* Projeto final | Ferramentas + mídia impressa (17:5444) */}
      <Reveal className={s.two}>
        <CaseSection title={fin.title}>
          <div className={s.paras}>
            {fin.paragraphs.map((p, i) => (
              <p key={i} className={s.p}>
                {p}
              </p>
            ))}
          </div>
        </CaseSection>
        <div>
          <h3 className={s.h3}>{fin.toolsTitle}</h3>
          <div className={`${s.pls} mb-6`}>
            {fin.tools.map((tool) => (
              <span key={tool} className={s.plSoft}>
                {tool}
              </span>
            ))}
          </div>
          <h3 className={s.h3}>{fin.printedTitle}</h3>
        </div>
      </Reveal>
      <Reveal className={s.printedGrid}>
        {fin.images.map((alt, i) => (
          <figure key={alt} className={s.fig}>
            <CaseImageButton
              src={`${base}/${PRINTED_FILES[i]}`}
              alt={alt}
              index={1 + PROTO_FILES.length + i}
              cap={fin.printedTitle}
            />
          </figure>
        ))}
      </Reveal>

      <Lightbox images={lbImages} />
      <CursorAmpliar />
    </>
  );
}
