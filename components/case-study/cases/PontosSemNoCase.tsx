import type { LocalizedProject } from "@/lib/projects";
import { CaseSection } from "@/components/case-study/CaseShell";
import { CaseImageButton } from "@/components/case-study/CaseImageButton";
import { CursorAmpliar } from "@/components/case-study/CursorAmpliar";
import { Lightbox, type LightboxImage } from "@/components/case-study/Lightbox";
import { Reveal } from "@/components/case-study/Reveal";
import type { CaseSlotsFn } from "./index";
import s from "./pontos-sem-no.module.css";

const base = "/images/projects/pontos-sem-no";

/* Campos que só o Pontos sem nó tem no dicionário (etapas, legendas do
   lightbox, ferramentas); a união `LocalizedProject` não os enxerga. */
type Step = { n: string; title: string; chips: string[] };
type ImageId =
  | "hero"
  | "posterCabe"
  | "construcao"
  | "apoio1"
  | "apoio2"
  | "protoDiagrama"
  | "protoPaineis"
  | "protoEsbocos"
  | "protoVetores"
  | "protoAplicacoes"
  | "manual"
  | "bailarina"
  | "jogoDoTempo"
  | "postersFinais";
type Sections = {
  creationProcess: {
    title: string;
    paragraphs: string[];
    steps: Step[];
    supportLabel: string;
    supportLabelPlural: string;
    /** alts das 14 imagens do lightbox, na ordem de `LB` */
    images: string[];
    /** legenda curta de cada imagem (barra do lightbox + aria-label) */
    caps: Record<ImageId, string>;
  };
  prototyping: {
    title: string;
    tabs: string[];
    paragraphs: string[];
    thumbs: { captions: string[] };
  };
  finalProject: {
    title: string;
    paragraphs: string[];
    toolsTitle: string;
    tools: string[];
    /** [4] = alt da grade xadrez de logos (fora do lightbox) */
    images: string[];
    aiNote: string;
  };
};

/** Índice de cada imagem no lightbox, na ordem de leitura (ANIMACOES §2: 14 imagens). */
const LB: Record<ImageId, number> = {
  hero: 0,
  posterCabe: 1,
  construcao: 2,
  apoio1: 3,
  apoio2: 4,
  protoDiagrama: 5,
  protoPaineis: 6,
  protoEsbocos: 7,
  protoVetores: 8,
  protoAplicacoes: 9,
  manual: 10,
  bailarina: 11,
  jogoDoTempo: 12,
  postersFinais: 13,
};

/** Recortes do frame 17:899 (mapa em docs/superpowers/analysis/figma-pontos-sem-no-assets.md). */
const files: Record<ImageId, string> = {
  hero: "hero.jpg",
  posterCabe: "poster-cabe.jpg",
  construcao: "construcao-marca.jpg",
  apoio1: "apoio-1.jpg",
  apoio2: "apoio-2.jpg",
  protoDiagrama: "proto-diagrama.jpg",
  protoPaineis: "proto-paineis.jpg",
  protoEsbocos: "proto-esbocos.jpg",
  protoVetores: "proto-vetores.jpg",
  protoAplicacoes: "proto-aplicacoes.jpg",
  manual: "manual.jpg",
  bailarina: "poster-bailarina.jpg",
  jogoDoTempo: "poster-jogo-do-tempo.jpg",
  postersFinais: "posters-finais.jpg",
};

const ORDER = (Object.keys(LB) as ImageId[]).sort((a, b) => LB[a] - LB[b]);

function sectionsOf(project: LocalizedProject) {
  return project.sections as unknown as Sections;
}

/** Imagem do case que abre o lightbox no índice dela. */
function Img({
  project,
  id,
  className,
}: {
  project: LocalizedProject;
  id: ImageId;
  className?: string;
}) {
  const cp = sectionsOf(project).creationProcess;
  return (
    <CaseImageButton
      src={`${base}/${files[id]}`}
      alt={cp.images[LB[id]] ?? ""}
      index={LB[id]}
      cap={cp.caps[id]}
      className={className}
    />
  );
}

/** Painel das 6 etapas (Figma 17:1063): grade 3×2, número + título, chips. */
function Steps({ steps }: { steps: Step[] }) {
  return (
    <div className={s.stepsWrap}>
      <ol className={s.steps}>
        {steps.map((st) => (
          <li key={st.n} className={s.st}>
            <div className={s.stHead}>
              <span className={s.stN} aria-hidden="true">
                {st.n}
              </span>
              <span className={s.stLabel}>{st.title}</span>
            </div>
            <ul className={s.chips}>
              {st.chips.map((chip) => (
                <li key={chip} className={s.chip}>
                  {chip}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Pills({ items }: { items: string[] }) {
  return (
    <div className={s.pls}>
      {items.map((item) => (
        <span key={item} className={s.pl}>
          {item}
        </span>
      ))}
    </div>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-[1.125rem]">
      {items.map((p) => (
        <p key={p.slice(0, 32)} className={s.p}>
          {p}
        </p>
      ))}
    </div>
  );
}

/**
 * Topo do case (Figma 17:899): capa clicável; à esquerda do pôster CABE ficam o
 * cabeçalho, a intro e o painel das etapas.
 */
export const pontosSemNoSlots: CaseSlotsFn = (project, { coverClassName }) => ({
  cover: (
    <Img
      project={project}
      id="hero"
      className={`shadow-card rounded-[8px] ${coverClassName ?? ""}`}
    />
  ),
  aside: <Img project={project} id="posterCabe" />,
  asideLayout: { main: 660, aside: 588, gap: 104 },
  headerExtra: <Steps steps={sectionsOf(project).creationProcess.steps} />,
});

/** Corpo do case (tudo entre `<CaseShell>` e `</CaseShell>`), reutilizado pela página e pelo modal. */
export function PontosSemNoCase({ project }: { project: LocalizedProject }) {
  const { creationProcess: cp, prototyping: proto, finalProject: fin } =
    sectionsOf(project);

  const images: LightboxImage[] = ORDER.map((id) => ({
    src: `${base}/${files[id]}`,
    alt: cp.images[LB[id]] ?? "",
    cap: cp.caps[id],
  }));

  const protoThumbs = [
    { id: "protoPaineis", flex: 351 },
    { id: "protoEsbocos", flex: 326 },
    { id: "protoVetores", flex: 326 },
    { id: "protoAplicacoes", flex: 326 },
  ] as const;

  return (
    <>
      {/* Construção da marca — faixa com os 3 quadros (17:1164) */}
      <Reveal>
        <Img project={project} id="construcao" />
      </Reveal>

      {/* Elementos de apoio | Processo de criação (17:1280) */}
      <Reveal className={`${s.two} ${s.colsApoio}`}>
        <div className={s.row}>
          <figure className={s.thumb} style={{ flex: "257 1 0%" }}>
            <Img project={project} id="apoio1" />
            <figcaption className={s.cap}>{cp.supportLabel}</figcaption>
          </figure>
          <figure className={s.thumb} style={{ flex: "400 1 0%" }}>
            <Img project={project} id="apoio2" />
            <figcaption className={s.cap}>{cp.supportLabelPlural}</figcaption>
          </figure>
        </div>
        <CaseSection title={cp.title}>
          <Paragraphs items={cp.paragraphs} />
        </CaseSection>
      </Reveal>

      {/* Prototipagem | evolução do mascote (17:1294) */}
      <Reveal className={`${s.two} ${s.colsProto}`}>
        <CaseSection title={proto.title}>
          <Pills items={proto.tabs} />
          <div className="mt-6">
            <Paragraphs items={proto.paragraphs} />
          </div>
        </CaseSection>
        <Img project={project} id="protoDiagrama" className={s.alignEnd} />
      </Reveal>

      {/* 4 thumbs com legenda (17:1405) */}
      <Reveal className={s.row}>
        {protoThumbs.map((t, i) => (
          <figure key={t.id} className={s.thumb} style={{ flex: `${t.flex} 1 0%` }}>
            <Img project={project} id={t.id} />
            <figcaption className={s.cap}>{proto.thumbs.captions[i]}</figcaption>
          </figure>
        ))}
      </Reveal>

      {/* Projeto final | Ferramentas utilizadas (17:1419) */}
      <Reveal className={`${s.two} ${s.colsFinal}`}>
        <CaseSection title={fin.title}>
          <Paragraphs items={fin.paragraphs} />
        </CaseSection>
        <CaseSection title={fin.toolsTitle}>
          <Pills items={fin.tools} />
        </CaseSection>
      </Reveal>

      {/* Manual, bailarina, jogo do tempo + grade de logos, colagem final (17:1442) */}
      <Reveal>
        <Img project={project} id="manual" />
      </Reveal>
      <Reveal>
        <Img project={project} id="bailarina" />
      </Reveal>
      <Reveal className={`${s.row} ${s.rowGapJogo}`}>
        <div className={s.thumb} style={{ flex: "513 1 0%" }}>
          <Img project={project} id="jogoDoTempo" />
        </div>
        <div className={s.thumb} style={{ flex: "823 1 0%" }}>
          {/* grade xadrez das versões do logo — decorativa, fora do lightbox */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${base}/xadrez-logos.jpg`}
            alt={fin.images[4] ?? ""}
            loading="lazy"
            decoding="async"
            className="block w-full"
          />
        </div>
      </Reveal>
      <Reveal>
        <Img project={project} id="postersFinais" />
      </Reveal>

      <p className={s.note}>{fin.aiNote}</p>

      {/* Lightbox (delegação por data-lb, inclusive capa e pôster do topo) + cursor */}
      <Lightbox images={images} />
      <CursorAmpliar />
    </>
  );
}
