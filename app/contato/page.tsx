import type { Metadata } from "next";
import { BrandHero } from "@/components/layout/BrandHero";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = { title: "Vamos trabalhar juntos?" };

export default function ContatoPage() {
  return (
    <>
      <BrandHero />
      <div className="container-narrow py-12">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2
              className="font-display uppercase text-[color:var(--color-blue)] text-[2rem] md:text-[2.375rem] leading-tight tracking-tight mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Vamos trabalhar juntos?
            </h2>

            <p className="text-[1.125rem] text-[color:var(--color-blue)] mb-6 leading-relaxed">
              Entre em contato enviando um e-mail na caixa de texto abaixo!
            </p>

            <ContactForm />
          </div>

          {/* Ilustração da Ágatha — placeholder até exportarmos o asset (Sessão 2-3) */}
          <div
            aria-hidden
            className="hidden md:flex aspect-square w-full max-w-[380px] mx-auto items-center justify-center rounded-[28px] bg-[color:var(--color-blue-pale)] text-xs text-[color:var(--color-muted)]"
          >
            ilustração — Ágatha
          </div>
        </div>
      </div>
    </>
  );
}
