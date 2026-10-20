import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/content/projects";
import { CaseShell, CaseSection, CaseImage } from "@/components/case-study/CaseShell";

export const metadata: Metadata = { title: "Pontos sem nó" };

const base = "/images/projects/pontos-sem-no";

const protoTabs = ["Brainstorming", "Painel integrado", "Braindumping"];

const protoThumbs = [
  { src: `${base}/proto-1.png`, caption: "Criação de painéis" },
  { src: `${base}/proto-2.png`, caption: "Esboços da logo" },
  { src: `${base}/proto-3.png`, caption: "Elementos de apoio" },
];

export default function PontosSemNoPage() {
  const project = getProjectBySlug("pontos-sem-no");
  if (!project) notFound();

  return (
    <CaseShell project={project}>
      <CaseSection title="Processo de criação">
        <p className="font-light text-[1rem] leading-relaxed text-[color:var(--color-blue)]">
          O início do processo foi marcado pela pesquisa guiada, montando um
          painel semântico que pudesse orientar decisões conceituais do projeto.
          Após a pesquisa, foram realizadas seleções de elementos, tipografias,
          cores, dentre outras representações que serviram de apoio para
          enriquecer o repertório conceitual da marca e facilitar a sua
          aplicação.
        </p>
      </CaseSection>

      {/* Sistema de identidade visual — PNG@3x do Figma (card infográfico + 3
          tiles de apoio compostos no próprio export). */}
      <CaseImage
        src={`${base}/sistema.png`}
        alt="Sistema de identidade visual em seis etapas: brainstorming de palavras conceito, análise de painel semântico, criação de esboços, testes gráficos, teste de impressão e manual de utilização da IDV."
      />

      <CaseSection title="Prototipagem">
        <div className="mb-6 flex flex-wrap gap-4">
          {protoTabs.map((tab) => (
            <span
              key={tab}
              className="rounded-full bg-[color:var(--color-blue-pale)] px-3 py-1.5 text-[1rem] font-normal leading-none text-[color:var(--color-blue)] shadow-[2px_4px_8px_2px_rgba(111,150,206,0.16)]"
            >
              {tab}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-[clamp(0.75rem,4cqw,2rem)]">
          {protoThumbs.map((t) => (
            <figure key={t.caption}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.src}
                alt={t.caption}
                className="block aspect-square w-full"
              />
              <figcaption className="mt-2 text-[1rem] font-normal text-[color:var(--color-blue)]">
                {t.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </CaseSection>

      <CaseSection title="Projeto final">
        {/* PNG@2x do Figma com os 4 blocos do projeto final (manual, biblioteca de
            personagens, variações do logo e aplicações) já empilhados. */}
        <CaseImage
          src={`${base}/projeto-final.webp`}
          alt="Projeto final: manual da marca, biblioteca de personagens, variações do logo e aplicações."
        />
      </CaseSection>
    </CaseShell>
  );
}
