import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/i18n/dictionaries";
import { getLocalizedProject } from "@/lib/projects";
import { CaseShell } from "@/components/case-study/CaseShell";
import { CascavelCase, caseSlots } from "@/components/case-study/cases";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.metadata.cascavel,
    alternates: {
      languages: {
        "pt-BR": "/pt-BR/projetos/cascavel",
        en: "/en/projetos/cascavel",
        "x-default": "/pt-BR/projetos/cascavel",
      },
    },
  };
}

export default async function CascavelPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const project = getLocalizedProject("cascavel", dict);
  if (!project) notFound();
  const slots = caseSlots.cascavel?.(project, {}) ?? {};

  return (
    <CaseShell project={project} dict={dict} {...slots}>
      <CascavelCase project={project} />
    </CaseShell>
  );
}
