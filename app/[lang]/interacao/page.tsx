import type { Metadata } from "next";
import { CategoryPage } from "@/components/home/CategoryPage";

export const metadata: Metadata = { title: "UX e UI Design" };

export default function InteracaoPage() {
  return <CategoryPage category="interacao" heroTitle="UX e UI Design" />;
}
