import { site } from "@/lib/site";

/**
 * Hero display no topo de cada página — banda full-width com gradiente azul
 * e o título em creme. No Figma o texto preenche a largura de borda a borda
 * (chega a estourar ~1% as laterais) e fica alinhado à BASE da banda.
 * O tamanho é derivado do nº de caracteres para preencher a largura em
 * qualquer viewport. Home/Contato usam "Ágatha sales"; landings, a categoria.
 */
export function BrandHero({ title }: { title?: string }) {
  const text = title ?? site.name;
  // ~150/nº-de-chars vw faz o texto ocupar ~100% (estoura levemente) na
  // AM Novecento condensada. Clamp evita exageros nos extremos.
  const fontSizeVw = Math.min(15, Math.max(9, 150 / text.length));

  return (
    <div className="bg-band flex items-end justify-center overflow-hidden pt-[3.5vw]">
      <h1
        className="font-display uppercase leading-[0.78] text-center whitespace-nowrap text-[color:var(--color-cream)] mb-[-0.12em]"
        style={{ fontSize: `${fontSizeVw}vw` }}
      >
        {text}
      </h1>
    </div>
  );
}
