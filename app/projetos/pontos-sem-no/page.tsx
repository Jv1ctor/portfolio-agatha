import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/content/projects";
import { CaseShell, CaseSection } from "@/components/case-study/CaseShell";

export const metadata: Metadata = { title: "Pontos sem nó" };

export default function PontosSemNoPage() {
  const project = getProjectBySlug("pontos-sem-no");
  if (!project) notFound();

  return (
    <CaseShell project={project}>
      <CaseSection title="Processo de criação" />
      <CaseSection title="Sistema" />
      <CaseSection title="Prototipagem" />
      <CaseSection title="Projeto final" />
    </CaseShell>
  );
}
