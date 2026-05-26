import { SectionHeading } from "@/components/home/SectionHeading";

export default function HomePage() {
  return (
    <div className="container-narrow py-12">
      {/* Bloco 1 — Olá a todos */}
      <section className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 items-start mb-16">
        <div
          className="aspect-square rounded-full bg-[color:var(--color-blue)]/15 flex items-center justify-center text-[color:var(--color-blue)] text-sm"
          aria-label="Ilustração da Ágatha"
        >
          {/* TODO: substituir pela ilustração exportada do Figma */}
          ilustração
        </div>
        <div>
          <SectionHeading size="2xl">
            :D Olá<br />a todos,
          </SectionHeading>
          <p className="mt-4 text-[color:var(--color-ink-soft)] leading-relaxed">
            Sou a Ágatha — designer apaixonada por pesquisa, ilustração e por
            traduzir ideias complexas em experiências afetuosas. Esse é meu
            cantinho na internet para mostrar o que ando criando.
          </p>
        </div>
      </section>

      {/* Bloco 2 — Filosofia */}
      <section className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 items-start mb-16">
        <div
          className="aspect-square rounded-full bg-[color:var(--color-pink-soft)] flex items-center justify-center text-[color:var(--color-ink-soft)] text-sm"
          aria-hidden
        >
          ilustração
        </div>
        <div>
          <SectionHeading size="xl">Filosofia</SectionHeading>
          <p className="mt-4 text-[color:var(--color-ink-soft)] leading-relaxed">
            Para mim o design é pesquisa, ilustração e perspectiva. Acredito
            que projetar é escutar antes de propor — entender contextos,
            pessoas e materiais antes de transformar qualquer coisa em forma.
          </p>
        </div>
      </section>

      {/* Bloco 3 — Experiência */}
      <section className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 items-start mb-16">
        <div
          className="aspect-square rounded-full bg-[color:var(--color-orange-soft)]/40 flex items-center justify-center text-[color:var(--color-ink-soft)] text-sm"
          aria-hidden
        >
          ilustração
        </div>
        <div>
          <SectionHeading size="xl">Experiência</SectionHeading>
          <p className="mt-4 text-[color:var(--color-ink-soft)] leading-relaxed">
            {/* TODO: confirmar o texto completo no Figma — extração ficou parcial */}
            A força está na atitude humana, e na mesma forma somos espelhos do
            seu lado mais humano. Acumulo projetos acadêmicos e pessoais entre
            identidade visual, interfaces gráficas e personagens 3D.
          </p>
        </div>
      </section>
    </div>
  );
}
