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
        {/* O SVG exportado tem canvas 1324.88×1292.58 com bleed de sombra: a
            arte (getBBox) ocupa (602.44, 360.01, 667.92, 322.13) — NÃO o box
            676×360.5 do Figma. Mapeamos a arte p/ box do Figma por
            esticamento não-uniforme: a img renderiza 1340.6×1446.7 e é
            deslocada (−609.7, −402.9) dentro do box absoluto; o bleed do lado
            de fora é transparente (pixel scan confirmou). */}
        <div
          className="peeking-box pointer-events-none relative -mb-[21px]" // overlap ~21px com a galeria
          style={{
            width: "676px",
            height: "360.52px",
            marginLeft: "53.77%", // (901.7 − 364 (container content) ) / 1000
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/illustrations/espiando.svg"
            alt={dict.home.peekingAlt}
            width={1325}
            height={1293}
            className="absolute" // bleed transparente ao redor da arte
            style={{
              left: "-609.7px",
              top: "-402.9px",
              width: "1340.6px",
              height: "1446.7px",
              maxWidth: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}