import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 w-full border-t border-[color:var(--color-cream-dark)] bg-gradient-to-b from-transparent to-[color:var(--color-blue-soft)]/20">
      <div className="container-narrow flex flex-col gap-3 py-10 text-sm text-[color:var(--color-ink-soft)]">
        <p className="font-medium text-[color:var(--color-ink)]">
          Redes sociais
        </p>
        <ul className="flex flex-col gap-1">
          <li>
            <a
              href={site.social.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[color:var(--color-blue)] transition-colors"
            >
              Instagram: {site.social.instagram.handle}
            </a>
          </li>
          <li>
            <a
              href={site.social.project.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[color:var(--color-blue)] transition-colors"
            >
              Projeto: {site.social.project.handle}
            </a>
          </li>
        </ul>
        <p className="mt-6 text-xs text-[color:var(--color-muted)]">
          © {new Date().getFullYear()} {site.name}. Obrigada pela atenção :D
        </p>
      </div>
    </footer>
  );
}
