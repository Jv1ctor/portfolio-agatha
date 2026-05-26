import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = { title: "Vamos trabalhar juntos?" };

export default function ContatoPage() {
  return (
    <div className="container-narrow py-12">
      <h1
        className="font-display uppercase text-[color:var(--color-blue)] text-5xl md:text-7xl leading-[0.95] tracking-tight mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Vamos trabalhar juntos?
      </h1>

      <p className="text-[color:var(--color-ink-soft)] mb-8 leading-relaxed">
        Entre em contato enviando uma mensagem na caixa de texto abaixo!
      </p>

      <ContactForm />
    </div>
  );
}
