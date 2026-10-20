import type { Metadata } from "next";
import { CategoryPage } from "@/components/home/CategoryPage";

export const metadata: Metadata = { title: "Design de Serviços" };

export default function ServicosPage() {
  return (
    <CategoryPage
      category="servicos"
      heroTitle="Design de Serviços"
      placeholderCount={3}
    />
  );
}
