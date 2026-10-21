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

      {/* Wrapper relativo para elementos absolutos entre hero e philosophy */}
      <div className="relative">
        {/* ":d" gigante — Figma: x=819, y=499, 338.2px AM Novecento #BACCEB */}
        {/* Posição relativa ao wrapper: y=499 - 354 (hero bottom) = 145px */}
        <div
          className="pointer-events-none absolute -z-10 select-none font-display text-[color:var(--color-blue-soft)]"
          style={{
            fontSize: "clamp(120px, 19.57vw, 338px)",
            left: "47.4%", // 819/1728
            top: "145px", // 499 - 354 (hero height)
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          :d
        </div>

        {/* Elipse rosa — Figma node 758:297: 695×695 at x=1394, y=436 */}
        {/* Posição relativa ao wrapper: y=436 - 354 = 82px */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/home/ellipse-5.svg"
          alt=""
          aria-hidden="true"
          width={695}
          height={695}
          className="pointer-events-none absolute -z-10 hidden md:block"
          style={{
            left: "80.6%", // 1394/1728
            top: "82px", // 436 - 354
          }}
        />

        {/* Seção 1: Saudação
            Figma: ilustração topo em y=557, hero termina em y=354 → gap = 203px
            (só desktop; mobile usa py-12 padrão) */}
        <div className="container-narrow pt-12 pb-12 md:pt-[203px] md:pb-20">
          <GreetingSection dict={dict} />
        </div>

        {/* Seção 2: Filosofia (será reescrita no Plan 3)
            Figma: título da filosofia em y=1266, fim do intro ~y=1240 → gap = 26px */}
        <div className="container-narrow py-12 md:pt-6 md:pb-20">
          <PhilosophySection dict={dict} />
        </div>
      </div>

      {/* Personagem espiando por cima da galeria (será ajustado no Plan 4) */}
      <PeekingCharacter dict={dict} />

      {/* Seção 3: Galeria de estudos (será reescrita no Plan 4) */}
      <StudiesGallery dict={dict} />

      {/* Seção 4: Contato (será reescrita no Plan 5) */}
      <div className="container-narrow py-12 md:py-20">
        <ContactSection dict={dict} />
      </div>
    </>
  );
}