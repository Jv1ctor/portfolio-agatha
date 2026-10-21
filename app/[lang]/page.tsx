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

      {/* Wrapper relativo para elementos absolutos entre hero e philosophy.
          overflow-x: clip — a elipse rosa sangra pra fora do canvas
          (1394+695=2089 > 1728, intencional no Figma) sem scrollbar horizontal
          (clip, NÃO hidden — hidden criaria scroll container).
          z-0 — cria stacking context: os ornamentos decorativos em -z-10 (:d
          gigante e elipses) precisam pintar ACIMA do background de html/body
          (globals.css), que num stacking context externo cobriria descendentes
          com z-index negativo. */}
      <div className="relative z-0" style={{ overflowX: 'clip' }}>
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

        {/* Elipse cyan pequena — Figma node 758:298: 455×455 at x=27, y=1125 */}
        {/* Posição relativa ao wrapper: y=1125 − 354 (hero bottom) = 771px */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/home/ellipse-3.svg"
          alt=""
          aria-hidden="true"
          width={455}
          height={455}
          className="pointer-events-none absolute -z-10 hidden md:block"
          style={{
            left: "1.56%", // 27/1728
            top: "771px", // 1125 - 354
          }}
        />

        {/* Elipse cyan grande — Figma node 758:112: 879×879 at x=581, y=1608 */}
        {/* Posição relativa ao wrapper: y=1608 − 354 = 1254px */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/home/ellipse-1.svg"
          alt=""
          aria-hidden="true"
          width={879}
          height={879}
          className="pointer-events-none absolute -z-10 hidden md:block"
          style={{
            left: "33.6%", // 581/1728
            top: "1254px", // 1608 - 354
          }}
        />

        {/* Seção 1: Saudação — fora do container-narrow (geometria do Figma,
            ver GreetingSection); pt-[203px] = 557 (ilustração) − 354 (hero) */}
        <GreetingSection dict={dict} />

        {/* Seção 2: Filosofia — fora do .container-narrow (padrão vw do Plan 2):
            texto em x=222 (pl 222/1728 = 12.85vw), crachá 377px assentado em
            x=1259..1636 (pr = 1728−1636 = 92 → 5.32vw).
            Figma: título da filosofia em y=1266, fim do intro ~y=1240 → gap = 26px */}
        <div className="px-6 py-12 md:pb-20 md:pl-[12.85vw] md:pr-[5.32vw] md:pt-6">
          <PhilosophySection dict={dict} />
        </div>
      </div>

      {/* Personagem espiando por cima da galeria (será ajustado no Plan 4) */}
      <PeekingCharacter dict={dict} />

      {/* Seção 3: Galeria de estudos (será reescrita no Plan 4) */}
      <StudiesGallery dict={dict} />

      {/* Seção 4: Contato — wrapper com elipses decorativas absolutas.
          (reescrita do ContactSection no Plan 5; por ela usar o padrão vw do
          Plan 2, o container-narrow foi substituído pelo próprio padding da
          section — aqui fica só o ritmo vertical py-12/md:py-20) */}
      {/* z-0 — mesma razão do wrapper de cima: stacking context para a elipse
          rosa em -z-10 pintar acima do background de html/body. */}
      <div className="relative z-0 py-12 md:py-20">
        {/* Elipse cyan-pink — Figma node 758:110: 455×455 at x=1131, y=3486 */}
        {/* Wrapper do contato começa em y≈3351 (fim da galeria: 2234+1117) */}
        {/* → top = 3486 − 3351 = 135px; left = 1131/1728 = 65.4% */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/home/ellipse-2.svg"
          alt=""
          aria-hidden="true"
          width={455}
          height={455}
          className="pointer-events-none absolute -z-10 hidden md:block"
          style={{
            left: "65.4%", // 1131/1728
            top: "135px", // 3486 − 3351
          }}
        />

        {/* Elipse pink — Figma node 758:111: 695×695 at x=74, y=3669 */}
        {/* → top = 3669 − 3351 = 318px; left = 74/1728 = 4.3% */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/home/ellipse-4.svg"
          alt=""
          aria-hidden="true"
          width={695}
          height={695}
          className="pointer-events-none absolute -z-10 hidden md:block"
          style={{
            left: "4.3%", // 74/1728
            top: "318px", // 3669 − 3351
          }}
        />

        <ContactSection dict={dict} />
      </div>
    </>
  );
}
