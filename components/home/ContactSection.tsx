import type { Dictionary } from "@/i18n/dictionaries";
import { ContactForm } from "@/components/contact/ContactForm";
import { DecorativeBlob } from "./DecorativeBlob";

export function ContactSection({ dict }: { dict: Dictionary }) {
  const home = dict.home;
  return (
    <section className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_1.2fr]">
      {/* Ilustração + elipses decorativas */}
      <div className="relative mx-auto">
        <DecorativeBlob
          variant={1}
          className="-left-24 -top-20 -z-10 hidden opacity-50 md:block"
          alt=""
        />
        <DecorativeBlob
          variant={4}
          className="-bottom-16 -right-10 -z-10 hidden opacity-60 md:block"
          alt=""
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/contato.svg"
          alt={home.contactIllustrationAlt}
          width={555}
          height={681}
          className="w-full max-w-[380px]"
        />
        {/* Envelope sobreposto (Figma node 751:1389, rotacionado ~0.5°) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/contato-extra.svg"
          alt=""
          width={208}
          height={229}
          aria-hidden
          className="absolute -bottom-4 right-0 w-[120px] rotate-[0.5deg]"
        />
      </div>

      {/* Texto + formulário */}
      <div>
        {/* Figma: "vAMOS" em 120px, "TRABALHAR JUNTOS?" em 72px — hierarchy via split keys */}
        <h2 className="font-display uppercase tracking-tight text-[color:var(--color-blue)] leading-none mb-4">
          <span className="block text-[2.5rem] md:text-[4.5rem]">
            {home.contactTitleLine1}
          </span>
          <span className="block text-[1.75rem] md:text-[2.75rem]">
            {home.contactTitleLine2}
          </span>
        </h2>
        <p className="font-normal text-[1.125rem] md:text-[1.5rem] text-[color:var(--color-blue)] mb-6 leading-relaxed">
          {home.contactSubtitle}
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
