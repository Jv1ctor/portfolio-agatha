import { BrandHero } from "@/components/layout/BrandHero";
import { SectionHeading } from "@/components/home/SectionHeading";
import { Illustration } from "@/components/home/Illustration";
import { site } from "@/lib/site";

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

export default function HomePage() {
  return (
    <>
      <BrandHero />
      <div className="container-narrow py-12 flex flex-col gap-16">
        {/* Bloco 1 — Olá a todos (apresentação) */}
        <section className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-8 items-center">
          <Illustration
            name="ola"
            alt="Ilustração da Ágatha acenando"
            className="mx-auto block"
          />
          <div>
            <p className="font-display text-[3.5rem] leading-none text-[color:var(--color-blue)] mb-2">
              :D
            </p>
            <SectionHeading size="xl">Olá a todos,</SectionHeading>
            <Body>
              Não sou boa com textinhos mas bora lá sksk Prazer! sou a designer
              do seu bairro, da sua empresa multinacional e do seu jogo indie
              fofinho.
            </Body>
          </div>
        </section>

        {/* Bloco 2 — Filosofia */}
        <section className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-8 items-center">
          <div>
            <SectionHeading size="xl" className="mb-4">
              Filosofia
            </SectionHeading>
            <Lead>Para mim o design é pesquisa, ilustração e perspectiva.</Lead>
            <Body>
              Acredito que o design é a manipulação intencional da{" "}
              <strong className="font-bold">experiência humana</strong>: uma
              ferramenta capaz de impactar hábitos e devolver humanidade ao
              nosso cotidiano.
            </Body>
            <Body>
              Nesse contexto, encaro o <strong className="font-bold">3D</strong>,
              o <strong className="font-bold">design de interfaces</strong> e a{" "}
              <strong className="font-bold">pesquisa</strong> como extensões de
              um mesmo propósito: construir experiências que sejam
              verdadeiramente prestativas, memoráveis e sensíveis.
            </Body>
          </div>
          <Illustration
            name="filosofia"
            alt="Ilustração da Ágatha pensando"
            className="mx-auto block"
          />
        </section>

        {/* Bloco 3 — Experiência */}
        <section className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-8 items-center">
          <Illustration
            name="experiencia"
            alt="Ilustração da Ágatha sentada"
            className="mx-auto block"
          />
          <div>
            <SectionHeading size="xl" className="mb-4">
              Experiência
            </SectionHeading>
            <Lead>
              O futuro está na atividade humana, e é o que torna nossas
              experiências tão importantes.
            </Lead>
            <Body>
              Fico contente em lhe receber nesse meu espaço, se quiser conhecer
              ainda mais sobre experiências acadêmicas, extracurriculares e
              profissionais fique à vontade para explorar no meu{" "}
              <strong className="font-bold">currículo</strong> ou perfil do{" "}
              {/* PENDENTE (Kaike vai validar se esse link é mesmo necessário).
                  currículo segue SEM link (não há CV ainda). */}
              <a
                href={site.social.linkedin.url}
                target="_blank"
                rel="noreferrer"
                className="font-bold underline decoration-from-font hover:opacity-80"
              >
                LinkedIn
              </a>
              .
            </Body>
          </div>
        </section>
      </div>
    </>
  );
}
