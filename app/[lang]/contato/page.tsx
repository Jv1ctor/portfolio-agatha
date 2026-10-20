import type { Metadata } from "next";
import { BrandHero } from "@/components/layout/BrandHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { Illustration } from "@/components/home/Illustration";

export const metadata: Metadata = { title: "Vamos trabalhar juntos?" };

export default function ContatoPage() {
  return (
    <>
      <BrandHero />
      <div className="container-narrow py-12">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            {/* Figma: AM Novecento ~39px #6f96ce. Quebra natural -> "Vamos trabalhar" / "juntos?". */}
            <h2
              className="font-display uppercase text-[color:var(--color-blue)] text-[2rem] md:text-[2.375rem] leading-tight tracking-tight mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Vamos trabalhar juntos?
            </h2>

            {/* Figma: subtexto é Clother Regular (400); o peso global é 300, fixo o 400. */}
            <p className="font-normal text-[1.125rem] text-[color:var(--color-blue)] mb-6 leading-relaxed">
              Entre em contato enviando um e-mail na caixa de texto abaixo!
            </p>

            <ContactForm />
          </div>

          <Illustration
            name="contato"
            alt="Ilustração da Ágatha"
            maxWidth={440}
            className="hidden md:block mx-auto"
          />
        </div>
      </div>
    </>
  );
}
