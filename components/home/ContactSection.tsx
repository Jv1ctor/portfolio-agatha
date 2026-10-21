import type { Dictionary } from "@/i18n/dictionaries";
import { ContactForm } from "@/components/contact/ContactForm";

/**
 * Seção de contato — fiel ao Figma Pontossemno (node 751:1318):
 *
 * - Ilustração contato.svg: x=254, y=3437, 555×676 (esquerda; coluna = 32.12vw)
 * - Envelope contato-extra.svg: x=312, y=3814, 208×229, rotate 0.51° (overlay;
 *   offsets/tamanho em % da ilustração pra escalar proporcionalmente, idem
 *   ola-mao na greeting: left=312−254=58/555=10.45%, top=3814−3437=377/676=55.77%,
 *   width=208/555=37.48%)
 * - Título: x=891, y=3522, box 351 — 3 LINHAS de 78px (4.51vw @1728),
 *   lineHeight 1.5 (pitch 117: 78×1.5 = 351/3 exato; largura do box 511
 *   confirma 78 — 84.8 daria 559.8). lineHeight inline: o h2
 *   { line-height: 1 } de globals.css vence a utility leading-*
 * - Subtítulo: x=893, y=3908, w=517, Clother Regular 24px (box 29 = 1.2×24);
 *   gap título→subtítulo = 35 (3908 − (3522+351)); form (stub Figma
 *   750:1259) começa 26px depois (3963)
 * - Formulário: ContactForm existente (nome/email/telefone/mensagem)
 *   — o form REAL é ~456px (vs stub 129px do Figma), o que desce o rodapé
 *   da home (~+153px vs o height 4614 do frame) — impossível de fechar sem
 *   cortar funcionalidade do form.
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
    <section className="grid grid-cols-1 items-center gap-10 px-6 md:grid-cols-[32.12vw_1fr] md:items-start md:gap-x-[4.74vw] md:px-0 md:pl-[14.70vw] md:pr-[4vw]">
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
        {/* Offset relativo ao contato.svg proporcional (o wrapper é shrink-to-fit
            da ilustração w-full h-auto na coluna — idem ola-mao na greeting):
            left=58px/555=10.45%; top=377px/676=55.77%; 208px/555=37.48% */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/contato-extra.svg"
          alt=""
          aria-hidden="true"
          width={208}
          height={229}
          className="absolute hidden md:block"
          style={{
            left: '10.45%',
            top: '55.77%',
            width: '37.48%',
            height: 'auto',
            transform: 'rotate(0.51deg)',
          }}
        />
      </div>

      {/* Texto + formulário */}
      <div className="md:max-w-[517px]">
        {/* Título em 3 LINHAS — Figma: 78px (4.51vw @1728) nas 3, linha 1.5:
            box 351 = 3×pitch 117 (117 = 78×1.5). As 3 linhas têm o MESMO
            tamanho (o antigo 120/72/72 era leitura errada; o 84.8/1.38 da
            inferência anterior estica a largura 559.8 vs box 511 do Figma).
            mt-[86px]: ilustração assenta em 3437 (padding-top 87 do wrapper
            em page.tsx) e o título em 3522 (3437+86) */}
        <h2
          className="w-fit font-display uppercase text-[color:var(--color-blue)] md:mt-[86px] mb-[35px]"
          style={{ lineHeight: 1.5 }}
        >
          <span className="block text-[clamp(3.25rem,4.51vw,4.875rem)]">
            {home.contactTitleLine1}
          </span>
          <span className="block text-[clamp(3.25rem,4.51vw,4.875rem)]">
            {home.contactTitleLine2}
          </span>
          <span className="block text-[clamp(3.25rem,4.51vw,4.875rem)]">
            {home.contactTitleLine3}
          </span>
        </h2>

        {/* Subtítulo: 24px no Figma = text-[1.5rem], box 29 = 1.2×24;
            mb-[26px]: stub do form no Figma começa em 3963 (3908+29+26) */}
        <p className="mb-[26px] text-[1.5rem] font-normal leading-[1.2] text-[color:var(--color-blue)]">
          {home.contactSubtitle}
        </p>

        {/* Formulário — REUTILIZAR ContactForm existente (não modificar!) */}
        <ContactForm />
      </div>
    </section>
  );
}
