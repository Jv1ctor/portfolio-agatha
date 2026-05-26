import type { Metadata } from "next";
import { CategoryPage } from "@/components/home/CategoryPage";

export const metadata: Metadata = { title: "Design Gráfico" };

export default function GraficoPage() {
  return <CategoryPage category="grafico" heroTitle="Design Gráfico" />;
}
