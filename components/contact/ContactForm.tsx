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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-[color:var(--color-ink-soft)]">Seu nome</span>
        <input
          name="nome"
          type="text"
          autoComplete="name"
          className="rounded-lg border border-[color:var(--color-cream-dark)] bg-white px-3 py-2 outline-none focus:border-[color:var(--color-blue)] focus:ring-2 focus:ring-[color:var(--color-blue)]/20"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-[color:var(--color-ink-soft)]">Seu email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          className="rounded-lg border border-[color:var(--color-cream-dark)] bg-white px-3 py-2 outline-none focus:border-[color:var(--color-blue)] focus:ring-2 focus:ring-[color:var(--color-blue)]/20"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-[color:var(--color-ink-soft)]">
          Digite sua solicitação…
        </span>
        <textarea
          name="mensagem"
          rows={6}
          className="rounded-lg border border-[color:var(--color-cream-dark)] bg-white px-3 py-2 outline-none focus:border-[color:var(--color-blue)] focus:ring-2 focus:ring-[color:var(--color-blue)]/20 resize-y"
        />
      </label>

      <button
        type="submit"
        disabled={state === "sending"}
        className="self-start rounded-full bg-[color:var(--color-blue)] px-6 py-2.5 text-white font-medium transition-all hover:bg-[color:var(--color-blue-soft)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state === "sending" ? "Enviando…" : "Enviar"}
      </button>

      {state === "success" && (
        <p className="text-sm text-[color:var(--color-blue)]">
          Recebida! Vou responder em breve :)
        </p>
      )}
      {state === "error" && (
        <p className="text-sm text-red-600">{errorMsg}</p>
      )}
    </form>
  );
}
