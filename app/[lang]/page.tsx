import { notFound } from "next/navigation";
import { BrandHero } from "@/components/layout/BrandHero";
import { SectionHeading } from "@/components/home/SectionHeading";
import { Illustration } from "@/components/home/Illustration";
import { site } from "@/lib/site";
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

/** Parágrafo de destaque (Clother Bold 18px no Figma). */
function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-bold text-[1.125rem] leading-snug text-[color:var(--color-blue)]">
      {children}
    </p>
  );
}

/** Parágrafo de corpo do "Sobre mim" — 20px (Kaike pediu subir de 16 → 20). */
function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-xl leading-relaxed text-[color:var(--color-blue)]">
      {children}
    </p>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const home = dict.home;

  return (
    <>
      <BrandHero title={dict.site.name} />
      <div className="container-narrow py-12 flex flex-col gap-16">
        {/* Bloco 1 — Olá a todos (apresentação) */}
        <section className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-8 items-center">
          <Illustration
            name="ola"
            alt={home.greetingAlt}
            className="mx-auto block"
          />
          <div>
            <p className="font-display text-[3.5rem] leading-none text-[color:var(--color-blue)] mb-2">
              :D
            </p>
            <SectionHeading size="xl">{home.greeting}</SectionHeading>
            <Body>{home.intro}</Body>
          </div>
        </section>

        {/* Bloco 2 — Filosofia */}
        <section className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-8 items-center">
          <div>
            <SectionHeading size="xl" className="mb-4">
              {home.philosophy}
            </SectionHeading>
            <Lead>{home.philosophyLead}</Lead>
            <Body>
              {home.philosophyBody1}
              <strong className="font-bold">{home.philosophyBody1Bold}</strong>
              {home.philosophyBody1End}
            </Body>
            <Body>
              {home.philosophyBody2}
              <strong className="font-bold">{home.philosophyBody2Bold1}</strong>
              {home.philosophyBody2Mid}
              <strong className="font-bold">{home.philosophyBody2Bold2}</strong>
              {home.philosophyBody2Mid2}
              <strong className="font-bold">{home.philosophyBody2Bold3}</strong>
              {home.philosophyBody2End}
            </Body>
          </div>
          <Illustration
            name="filosofia"
            alt={home.philosophyAlt}
            className="mx-auto block"
          />
        </section>

        {/* Bloco 3 — Experiência */}
        <section className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-8 items-center">
          <Illustration
            name="experiencia"
            alt={home.experienceAlt}
            className="mx-auto block"
          />
          <div>
            <SectionHeading size="xl" className="mb-4">
              {home.experience}
            </SectionHeading>
            <Lead>{home.experienceLead}</Lead>
            <Body>
              {home.experienceBody}
              <strong className="font-bold">{home.experienceBodyBold}</strong>
              {home.experienceBodyMid}
              {/* PENDENTE (Kaike vai validar se esse link é mesmo necessário).
                  currículo segue SEM link (não há CV ainda). */}
              <a
                href={site.social.linkedin.url}
                target="_blank"
                rel="noreferrer"
                className="font-bold underline decoration-from-font hover:opacity-80"
              >
                {home.experienceBodyLink}
              </a>
              {home.experienceBodyEnd}
            </Body>
          </div>
        </section>
      </div>
    </>
  );
}