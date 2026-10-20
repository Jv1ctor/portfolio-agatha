import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/content/projects";
import { CaseShell, CaseSection, CaseImage } from "@/components/case-study/CaseShell";

export const metadata: Metadata = { title: "Batuco-tuco" };

const base = "/images/projects/batuco-tuco";

const protoTabs = [
  "Histórias do usuário",
  "Mapa de conteúdo",
  "Matriz A.C.",
  "Design System",
];

export default function BatucoTucoPage() {
  const project = getProjectBySlug("batuco-tuco");
  if (!project) notFound();

  return (
    <CaseShell project={project}>
      <CaseSection title="Processo de criação">
        <p className="font-light text-[1rem] leading-relaxed text-[color:var(--color-blue)]">
          Desenvolvido na disciplina de Design de Interfaces Gráficas (Unifor),
          o desafio foi criar um Design System escalável e fluxos de usabilidade
          coesos. Priorizei requisitos básicos, como as atividades práticas,
          para garantir a funcionalidade antes de avançar para interações
          complexas de banda. Em três semanas, finalizei toda a interface,
          ativos e animações, focando na otimização da prototipagem.
        </p>
      </CaseSection>

      {/* Infográfico "Interfaces Gráficas" + linha de rabiscos/wireframes.
          Blocos densos do Figma — card (bg+rounded) já embutido no export. */}
      <div className="flex flex-col gap-6">
        <CaseImage
          src={`${base}/interfaces-graficas.png`}
          alt="Mapa do processo de Interfaces Gráficas: perfil do usuário, requisitos, métodos, similares e prototipagem."
        />
        <CaseImage
          src={`${base}/proto-row.png`}
          alt="Rabiscos e wireframes de baixa fidelidade das telas do app."
        />
      </div>

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
        <div className="flex flex-col gap-8">
          <CaseImage
            src={`${base}/telas-1.png`}
            alt="Interface do app e biblioteca de assets: telas de exercícios, sistema de pontos e acessórios dos personagens."
          />
          <CaseImage
            src={`${base}/telas-2.png`}
            alt="Personagens do Batuco-tuco: Yopi, Pepo, Hanni, Cybele e Gunter, cada um com seu instrumento."
          />
          <CaseImage
            src={`${base}/telas-3.png`}
            alt="Apresentação final do Batuco-tuco: Música é saber, ludificação e pesquisa transformam o ensino."
          />
        </div>
      </CaseSection>
    </CaseShell>
  );
}
