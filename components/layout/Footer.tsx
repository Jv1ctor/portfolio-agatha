import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-band mt-20 w-full text-[color:var(--color-cream)]">
      {/* Alinhado junto à barra de navegação: 40px da lateral esquerda,
          fora da coluna centralizada (mesmo respiro do header). */}
      <div className="w-full px-10 py-10 text-base">
        <p>Redes sociais</p>
        <ul className="mt-2 flex flex-col gap-1">
          <li className="flex items-center gap-3">
            <span className="w-5 shrink-0">IG</span>
            <a
              href={site.social.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="font-light underline decoration-from-font hover:opacity-80"
            >
              {site.social.instagram.handle}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-5 shrink-0">IN</span>
            <a
              href={site.social.linkedin.url}
              target="_blank"
              rel="noreferrer"
              className="font-light underline decoration-from-font hover:opacity-80"
            >
              {site.social.linkedin.handle}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
