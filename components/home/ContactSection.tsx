import type { Dictionary } from "@/i18n/dictionaries";
import { ContactForm } from "@/components/contact/ContactForm";

/**
 * Seção de contato — fiel ao Figma Pontossemno (node 751:1318):
 *
 * - Ilustração contato.svg: x=254, y=3437, 555×676 (esquerda; coluna = 32.12vw)
 * - Envelope contato-extra.svg: x=312, y=3814, 208×229, rotate 0.51° (overlay;
 *   offset em PX fixo, por spec: left=312−254=58, top=3814−3437=377 — os mesmos
 *   px do Figma, NÃO proporcional à ilustração como na greeting/ola-mao)
 * - Título: x=891, y=3522 — 3 LINHAS:
 *   - Linha 1 "vAMOS": 120px AM Novecento uppercase #6F96CE
 *   - Linha 2 "TRABALHAR": 72px (mesma métrica)
 *   - Linha 3 "JUNTOS?": 72px (mesma métrica)
 * - Subtítulo: x=893, y=3908, w=517, Clother Regular 24px
 * - Formulário: ContactForm existente (nome/email/telefone/mensagem)
 *
 * Container: fora do .container-narrow (padrão vw do Plan 2 — a coluna 1fr do
 * container limitava a ilustração a ~421px). Padding horizontal espelha o
 * Figma: ilustração em x=254 (14.70vw); bloco de texto em x=891 (51.56%
 * = 14.70 + 32.12 + 4.74 de gap), limitado a w=517px (o pr fiel seria
 * 1728−1408 = 318px ≈ 18.4vw, coberto pelo max-w do bloco).
 *
 * As elipses decorativas (758:110 em x=1131 y=3486, 758:111 em x=74 y=3669)
 * são posicionadas no wrapper do contato em page.tsx, NÃO aqui.
 */
export function ContactSection({ dict }: { dict: Dictionary }) {
  const home = dict.home;
  return (
    <section className="grid grid-cols-1 items-center gap-10 px-6 md:grid-cols-[32.12vw_1fr] md:gap-x-[4.74vw] md:px-0 md:pl-[14.70vw] md:pr-[4vw]">
      {/* Ilustração + envelope overlay */}
      <div className="relative mx-auto md:mx-0">
        {/* Ilustração principal: Ágatha com envelope (a coluna já limita a 32.12vw = 555px @1728) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/contato.svg"
          alt={home.contactIllustrationAlt}
          width={555}
          height={676}
          className="h-auto w-full"
        />
        {/* Envelope extra — overlay absolute, rotate 0.51° */}
        {/* Offset relativo ao contato.svg em px do Figma: left=58px, top=377px */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/contato-extra.svg"
          alt=""
          aria-hidden="true"
          width={208}
          height={229}
          className="absolute hidden md:block"
          style={{
            left: "58px",
            top: "377px",
            transform: "rotate(0.51deg)",
          }}
        />
      </div>

      {/* Texto + formulário */}
      <div className="md:max-w-[517px]">
        {/* Título em 3 LINHAS — Figma: vAMOS (120px) / TRABALHAR (72px) / JUNTOS? (72px) */}
        <h2 className="font-display uppercase text-[color:var(--color-blue)] leading-none mb-6">
          {/* Linha 1: 120px no Figma = clamp(3rem, 6.94vw, 7.5rem) */}
          <span className="block text-[clamp(3rem,6.94vw,7.5rem)]">
            {home.contactTitleLine1}
          </span>
          {/* Linha 2: 72px no Figma = clamp(1.875rem, 4.17vw, 4.5rem) */}
          <span className="block text-[clamp(1.875rem,4.17vw,4.5rem)]">
            {home.contactTitleLine2}
          </span>
          {/* Linha 3: 72px (mesma métrica da linha 2) */}
          <span className="block text-[clamp(1.875rem,4.17vw,4.5rem)]">
            {home.contactTitleLine3}
          </span>
        </h2>

        {/* Subtítulo: 24px no Figma = text-[1.5rem] */}
        <p className="mb-6 text-[1.5rem] font-normal leading-relaxed text-[color:var(--color-blue)]">
          {home.contactSubtitle}
        </p>

        {/* Formulário — REUTILIZAR ContactForm existente (não modificar!) */}
        <ContactForm />
      </div>
    </section>
  );
}