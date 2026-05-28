"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { z } from "zod";

const schema = z.object({
  nome: z.string().min(1, "Conta seu nome :)"),
  email: z.email("Email inválido"),
  mensagem: z.string().min(5, "Manda uma mensagem mais completa"),
});

type FormState = "idle" | "sending" | "success" | "error";

const fieldClass =
  "w-full rounded-lg border border-[color:var(--color-blue-soft)] bg-white/70 px-3 py-2 text-[color:var(--color-blue-deep)] outline-none placeholder:text-[color:var(--color-blue-soft)] focus:border-[color:var(--color-blue)] focus:ring-2 focus:ring-[color:var(--color-blue)]/20";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      setState("error");
      setErrorMsg(parsed.error.issues[0]?.message ?? "Preencha os campos");
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setState("error");
      setErrorMsg(
        "EmailJS não configurado. Defina as variáveis em .env.local para enviar.",
      );
      return;
    }

    try {
      setState("sending");
      await emailjs.send(
        serviceId,
        templateId,
        {
          // Os nomes precisam bater com as variáveis {{...}} do template no EmailJS
          name: parsed.data.nome,
          email: parsed.data.email,
          message: parsed.data.mensagem,
          time: new Date().toLocaleString("pt-BR"),
        },
        { publicKey },
      );
      setState("success");
      form.reset();
    } catch (err) {
      setState("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Falha ao enviar. Tenta de novo?",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-card flex w-full max-w-[480px] flex-col gap-3 rounded-[8px] bg-[color:var(--color-cream)] p-5"
      noValidate
    >
      {/* Nome + email (adições funcionais — o EmailJS precisa do email pra responder) */}
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="nome" type="text" autoComplete="name" placeholder="Seu nome" className={fieldClass} />
        <input name="email" type="email" autoComplete="email" placeholder="Seu email" className={fieldClass} />
      </div>

      {/* Campo de solicitação — o protagonista, como no Figma */}
      <textarea
        name="mensagem"
        rows={5}
        placeholder="Digite sua solicitação..."
        className={`${fieldClass} resize-y`}
      />

      <div className="flex items-center justify-between gap-3">
        <p
          className={`text-sm ${
            state === "error"
              ? "text-red-600"
              : "text-[color:var(--color-blue)]"
          }`}
          role="status"
        >
          {state === "success"
            ? "Recebida! Vou responder em breve :)"
            : state === "error"
              ? errorMsg
              : ""}
        </p>

        <button
          type="submit"
          aria-label="Enviar solicitação"
          disabled={state === "sending"}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[color:var(--color-blue)] text-[color:var(--color-cream)] transition-all hover:bg-[color:var(--color-blue-deep)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {state === "sending" ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
              {/* mingcute:send-fill — mesmo ícone do Figma */}
              <path d="M20.235 5.686c.432-1.195-.726-2.353-1.921-1.92L3.709 9.048c-1.199.434-1.344 2.07-.241 2.709l4.662 2.699l4.163-4.163a1 1 0 0 1 1.414 1.414L9.544 15.87l2.7 4.662c.638 1.103 2.274.957 2.708-.241z" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
