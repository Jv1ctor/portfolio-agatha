/**
 * Ellipses decorativas (gradientes radiais) extraídas do Figma.
 * Cada variante aponta para um SVG diferente em /images/home/.
 * Posicionamento absoluto — o pai deve ser `relative`.
 */
const BLOBS = {
  1: { src: "/images/home/ellipse-1.svg", width: 879, height: 879 },   // ciano grande
  2: { src: "/images/home/ellipse-2.svg", width: 455, height: 455 },   // rosa/ciano
  3: { src: "/images/home/ellipse-3.svg", width: 455, height: 455 },   // ciano
  4: { src: "/images/home/ellipse-4.svg", width: 695, height: 695 },   // rosa
  5: { src: "/images/home/ellipse-5.svg", width: 695, height: 695 },   // rosa
} as const;

export type BlobVariant = keyof typeof BLOBS;

export function DecorativeBlob({
  variant,
  className = "",
  alt = "",
}: {
  variant: BlobVariant;
  className?: string;
  alt?: string;
}) {
  const { src, width, height } = BLOBS[variant];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      aria-hidden={alt === ""}
      className={`pointer-events-none absolute ${className}`}
    />
  );
}
