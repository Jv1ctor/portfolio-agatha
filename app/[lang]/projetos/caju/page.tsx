import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/i18n/dictionaries";
import { getLocalizedProject } from "@/lib/projects";
import { CaseShell } from "@/components/case-study/CaseShell";
import { CajuCase, caseSlots } from "@/components/case-study/cases";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.metadata.caju,
    alternates: {
      languages: {
        "pt-BR": "/pt-BR/projetos/caju",
        en: "/en/projetos/caju",
        "x-default": "/pt-BR/projetos/caju",
      },
    },
  };
}

export default async function CajuPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const project = getLocalizedProject("caju", dict);
  if (!project) notFound();
  const slots = caseSlots.caju?.(project, {}) ?? {};

  return (
    <CaseShell project={project} dict={dict} {...slots}>
      <CajuCase project={project} />
    </CaseShell>
  );
}
