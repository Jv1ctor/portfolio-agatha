/**
 * Ilustrações da Ágatha exportadas do Figma como PNG.
 *
 * Por que PNG e não SVG: a arte usa textura de grão (feTurbulence) que o Figma
 * exporta com baseFrequency altíssima — no navegador isso sofre aliasing e o grão
 * vira manchas grossas ("pontos espalhados"). O PNG é rasterizado pelo próprio
 * Figma, então o grão sai fiel. Limitamos ao tamanho nativo (sem upscaling) pra
 * manter nitidez e o grão na densidade certa.
 */

const ILLUSTRATIONS = {
  ola: { src: "/illustrations/ola.png", width: 299, height: 252 },
  filosofia: { src: "/illustrations/filosofia.png", width: 267, height: 327 },
  experiencia: { src: "/illustrations/experiencia.png", width: 347, height: 323 },
  contato: { src: "/illustrations/contato.png", width: 301, height: 280 },
} satisfies Record<string, { src: string; width: number; height: number }>;

export type IllustrationName = keyof typeof ILLUSTRATIONS;

export function Illustration({
  name,
  alt,
  className,
  maxWidth,
}: {
  name: IllustrationName;
  alt: string;
  className?: string;
  /** Limite de largura de exibição (px). Default = largura nativa do PNG.
      Acima do nativo há leve upscaling — o grão disfarça. */
  maxWidth?: number;
}) {
  const { src, width, height } = ILLUSTRATIONS[name];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{ width: "100%", maxWidth: maxWidth ?? width, height: "auto" }}
    />
  );
}
