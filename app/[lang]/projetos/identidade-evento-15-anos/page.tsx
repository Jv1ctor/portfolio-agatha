import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/i18n/dictionaries";
import { getLocalizedProject } from "@/lib/projects";
import { CaseShell } from "@/components/case-study/CaseShell";
import { IdentidadeEventoCase } from "@/components/case-study/cases";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.metadata.identidadeEvento15Anos,
    alternates: {
      languages: {
        "pt-BR": "/pt-BR/projetos/identidade-evento-15-anos",
        en: "/en/projetos/identidade-evento-15-anos",
        "x-default": "/pt-BR/projetos/identidade-evento-15-anos",
      },
    },
  };
}

export default async function IdentidadeEventoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const project = getLocalizedProject("identidade-evento-15-anos", dict);
  if (!project) notFound();

  return (
    <CaseShell project={project} dict={dict}>
      <IdentidadeEventoCase project={project} />
    </CaseShell>
  );
}
