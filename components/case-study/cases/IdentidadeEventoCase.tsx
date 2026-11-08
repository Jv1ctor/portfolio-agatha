import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import type { LocalizedProject } from "@/lib/projects";
import { CaseSection, CaseImage } from "@/components/case-study/CaseShell";

const base = "/images/projects/identidade-evento-15-anos";

/** Textos deste case: além do formato comum, traz legendas, rótulos de grupo, ferramentas e a nota sobre IA. */
type EventoProject = LocalizedProject &
  Dictionary["projects"]["identidadeEvento15Anos"];

const textClass =
  "font-light text-[1rem] leading-relaxed text-[color:var(--color-blue)]";
const captionClass =
  "mt-2 text-[0.875rem] font-normal leading-snug text-[color:var(--color-blue)]";
const labelClass =
  "mb-3 text-center text-[1rem] font-normal text-[color:var(--color-blue)]";
/** Mesma pill de etapas dos outros cases (azul clarinho + sombra "botoes"). */
const pillClass =
  "rounded-full bg-[color:var(--color-blue-pale)] px-3 py-1.5 text-[1rem] font-normal leading-none text-[color:var(--color-blue)] shadow-[2px_4px_8px_2px_rgba(111,150,206,0.16)]";

function Pills({ items }: { items: string[] }) {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      {items.map((item) => (
        <span key={item} className={pillClass}>
          {item}
        </span>
      ))}
    </div>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return items.map((p) => (
    <p key={p.slice(0, 24)} className={textClass}>
      {p}
    </p>
  ));
}

/** Imagem de grade; carregamento adiado porque o case tem muitas fotos abaixo da dobra. */
function Thumb({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" className="block w-full" />
      {caption && <figcaption className={captionClass}>{caption}</figcaption>}
    </figure>
  );
}

/** Bloco com rótulo centralizado acima das imagens (padrão do Figma deste case). */
function LabeledGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <figure>
      <figcaption className={labelClass}>{label}</figcaption>
      {children}
    </figure>
  );
}

/** Corpo do case (tudo entre `<CaseShell>` e `</CaseShell>`), reutilizado pela página e pelo modal. */
export function IdentidadeEventoCase({ project }: { project: LocalizedProject }) {
  const { creationProcess: cp, prototyping: proto, finalProject: fp } = (
    project as EventoProject
  ).sections;

  return (
    <>
      <CaseSection title={cp.title}>
        <Paragraphs items={cp.paragraphs} />
        {/* Painéis de referências — cada colagem exportada do Figma como uma imagem. */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {cp.captions.map((caption, i) => (
            <Thumb
              key={caption}
              src={`${base}/painel-${i + 1}.webp`}
              alt={cp.images[i] ?? ""}
              caption={caption}
            />
          ))}
        </div>
      </CaseSection>

      <CaseSection title={proto.title}>
        <Pills items={proto.tabs} />
        <Paragraphs items={proto.paragraphs} />
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
          {proto.thumbs.captions.map((caption, i) => (
            <Thumb
              key={caption}
              src={`${base}/proto-${i + 1}.webp`}
              alt={proto.images[i] ?? ""}
              caption={caption}
            />
          ))}
        </div>
      </CaseSection>

      <LabeledGroup label={proto.invitation.label}>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {proto.invitation.images.map((alt, i) => (
            <Thumb key={alt} src={`${base}/convite-${i + 1}.webp`} alt={alt} />
          ))}
        </div>
      </LabeledGroup>

      {/* Figma: "Projeto final" à esquerda, "Ferramentas utilizadas" à direita. */}
      <div className="grid gap-8 sm:grid-cols-2">
        <CaseSection title={fp.title}>
          <Paragraphs items={fp.paragraphs} />
        </CaseSection>
        <CaseSection title={fp.toolsTitle}>
          <Pills items={fp.tools} />
        </CaseSection>
      </div>

      <CaseImage src={`${base}/banners.webp`} alt={fp.images[0] ?? ""} />

      <LabeledGroup label={fp.ledPanel.label}>
        <CaseImage src={`${base}/painel-led.webp`} alt={fp.ledPanel.images[0] ?? ""} />
      </LabeledGroup>

      <LabeledGroup label={fp.menuTags.label}>
        <CaseImage src={`${base}/menu-tags.webp`} alt={fp.menuTags.images[0] ?? ""} />
      </LabeledGroup>

      <LabeledGroup label={fp.event.label}>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {fp.event.images.map((alt, i) => (
            <Thumb key={alt} src={`${base}/evento-${i + 1}.webp`} alt={alt} />
          ))}
        </div>
      </LabeledGroup>

      <p className="-mt-6 ml-auto max-w-[22rem] text-[0.875rem] font-light leading-snug text-[color:var(--color-blue)]">
        {fp.aiNote}
      </p>
    </>
  );
}
