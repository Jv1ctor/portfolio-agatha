type Props = {
  children: React.ReactNode;
  size?: "lg" | "xl" | "2xl";
  className?: string;
};

const sizeMap = {
  lg: "text-4xl md:text-5xl",
  xl: "text-5xl md:text-6xl",
  "2xl": "text-6xl md:text-8xl",
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
