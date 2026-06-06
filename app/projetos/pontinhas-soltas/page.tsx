import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/content/projects";
import { CaseShell, CaseSection, CaseImage } from "@/components/case-study/CaseShell";

export const metadata: Metadata = { title: "Pontinhas soltas" };

const base = "/images/projects/pontinhas-soltas";

const protoTabs = [
  "Design de personagens",
  "Personas",
  "Palavras Conceito",
  "Blender",
];

export default function PontinhasSoltasPage() {
  const project = getProjectBySlug("pontinhas-soltas");
  if (!project) notFound();

  return (
    <CaseShell project={project}>
      <CaseSection title="Processo de criação">
        {/* ATENÇÃO: texto do Figma é placeholder (copiado do Batuco). (PLACEHOLDER) */}
        <p className="font-light text-[1rem] leading-relaxed text-[color:var(--color-blue)]">
          Desenvolvido na disciplina de Design de Interfaces Gráficas (Unifor),
          o desafio foi criar um Design System escalável e fluxos de usabilidade
          coesos. Priorizei requisitos básicos, como as atividades práticas,
          para garantir a funcionalidade antes de avançar para interações
          complexas de banda. Em três semanas, finalizei toda a interface,
          ativos e animações, focando na otimização da prototipagem.{" "}
          (PLACEHOLDER)
        </p>
      </CaseSection>

      {/* Sistema de identidade visual (infográfico 6 etapas) + processo em 3D
          (capturas do Blender) + biblioteca de personagens (turnarounds).
          Blocos densos do Figma — card já embutido no export. */}
      <div className="flex flex-col gap-6">
        <CaseImage
          src={`${base}/sistema.png`}
          alt="Sistema de identidade visual em seis etapas: brainstorming de palavras conceito, análise de painel semântico, criação de esboços, testes gráficos, teste de impressão e manual."
        />
        <CaseImage
          src={`${base}/process-1.png`}
          alt="Capturas do processo de modelagem 3D dos personagens no Blender."
        />
        <CaseImage
          src={`${base}/process-2.png`}
          alt="Mais capturas do processo de modelagem 3D dos personagens no Blender."
        />
      </div>

      <CaseImage
        src={`${base}/biblioteca.png`}
        alt="Biblioteca de personagens: turnarounds (frente, 3/4 e lado) de Ali, Nina, Jemmy e demais personagens."
      />

      <CaseSection title="Prototipagem">
        <div className="mb-6 flex flex-wrap gap-4">
          {protoTabs.map((tab) => (
            <span
              key={tab}
              className="rounded-full bg-[color:var(--color-blue-pale)] px-3 py-1.5 text-[1rem] leading-none text-[color:var(--color-blue)] shadow-[2px_4px_8px_2px_rgba(111,150,206,0.16)]"
            >
              {tab}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-8">
          <CaseImage
            src={`${base}/personagens.png`}
            alt="Personagens finais — Jemmy, Nina, Haggy, Lac e Ali — em renderização 3D."
          />
          <CaseImage
            src={`${base}/personagens-desc.png`}
            alt="Personagens com suas descrições: Ali é serenidade, Jemmy é lirismo, Lac é ternura, Nina é peregrina e Haggy é escapismo."
          />
        </div>
      </CaseSection>
    </CaseShell>
  );
}
