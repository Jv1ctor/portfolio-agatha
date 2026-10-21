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
      </div>

      {/* Texto + formulário */}
      <div>
        <h2 className="font-display uppercase tracking-tight text-[color:var(--color-blue)] text-[2.5rem] md:text-[3.5rem] leading-none mb-4">
          {home.contactTitle}
        </h2>
        <p className="font-normal text-[1.125rem] md:text-[1.5rem] text-[color:var(--color-blue)] mb-6 leading-relaxed">
          {home.contactSubtitle}
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
