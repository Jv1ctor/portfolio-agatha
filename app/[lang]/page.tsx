import { notFound } from "next/navigation";
import { BrandHero } from "@/components/layout/BrandHero";
import { GreetingSection } from "@/components/home/GreetingSection";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { PeekingCharacter } from "@/components/home/PeekingCharacter";
import { StudiesGallery } from "@/components/home/StudiesGallery";
import { ContactSection } from "@/components/home/ContactSection";
import { getDictionary, isLocale } from "@/i18n/dictionaries";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.metadata.home,
    alternates: {
      languages: { "pt-BR": "/pt-BR", en: "/en", "x-default": "/pt-BR" },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <BrandHero title={dict.site.name} variant="home" />

      {/* Seção 1: Saudação */}
      <div className="container-narrow py-12 md:py-20">
        <GreetingSection dict={dict} />
      </div>

      {/* Seção 2: Filosofia */}
      <div className="container-narrow py-12 md:py-20">
        <PhilosophySection dict={dict} />
      </div>

      {/* Personagem espiando por cima da galeria (Figma node 751:1329) */}
      <PeekingCharacter dict={dict} />

      {/* Seção 3: Galeria de estudos (full-width, sem container) */}
      <StudiesGallery dict={dict} />

      {/* Seção 4: Contato */}
      <div className="container-narrow py-12 md:py-20">
        <ContactSection dict={dict} />
      </div>
    </>
  );
}
