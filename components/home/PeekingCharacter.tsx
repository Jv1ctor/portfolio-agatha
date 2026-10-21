import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Personagem espiando por cima da galeria — fiel ao Figma (Group 100804):
 *
 * - Posição: x=901.7, y=1894, 676×361
 * - 901.7/1728 = 52.2% from left (NÃO centralizado!)
 * - Bottom do personagem (1894+361=2255) sobrepõe top da galeria (2234) em ~21px
 * - A ilustração "vaza" por cima da borda da galeria
 *
 * overflow-x: clip no wrapper — a largura é em px fixo (676px) somada a
 * marginLeft em %, então em viewports md intermediários (entre ~768 e ~1396px)
 * a imagem sangra pra fora do canvas; o clip mata a scrollbar horizontal sem
 * afetar o overlap vertical de 21px (eixo Y) e sem afetar o z-order.
 */
export function PeekingCharacter({ dict }: { dict: Dictionary }) {
  return (
    <div
      className="relative z-10 hidden md:block"
      style={{ overflowX: "clip" }}
    >
      <div className="container-narrow">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/espiando.svg"
          alt={dict.home.peekingAlt}
          width={676}
          height={361}
          className="-mb-[21px]" // overlap de ~21px com a galeria
          style={{
            marginLeft: "52.2%", // 901.7/1728 — NÃO centralizado!
            width: "676px",
            maxWidth: "none",
          }}
        />
      </div>
    </div>
  );
}