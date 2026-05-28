type Props = {
  children: React.ReactNode;
  size?: "lg" | "xl" | "2xl";
  className?: string;
};

const sizeMap = {
  // Tamanhos nominais do Figma: headings de seção = 38px (AM Novecento, #6f96ce)
  lg: "text-[1.75rem]",
  xl: "text-[2rem] md:text-[2.375rem]",
  "2xl": "text-4xl md:text-5xl",
};

export function SectionHeading({ children, size = "xl", className = "" }: Props) {
  return (
    <h2
      className={`font-display uppercase tracking-tight text-[color:var(--color-blue)] ${sizeMap[size]} ${className}`}
      style={{ fontFamily: "var(--font-display)" }}
    >
      {children}
    </h2>
  );
}
