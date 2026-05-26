import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/content/projects";
import { CaseShell, CaseSection } from "@/components/case-study/CaseShell";

export const metadata: Metadata = { title: "Pontinhas soltas" };

export default function PontinhasSoltasPage() {
  const project = getProjectBySlug("pontinhas-soltas");
  if (!project) notFound();

  return (
    <CaseShell project={project}>
      <CaseSection title="Processo de criação" />
      <CaseSection title="Sistema" />
      <CaseSection title="Prototipagem" />
      <CaseSection title="Personagens" />
    </CaseShell>
  );
}
