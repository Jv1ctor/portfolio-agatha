import type { Metadata } from "next";
import { CategoryPage } from "@/components/home/CategoryPage";

export const metadata: Metadata = { title: "3D Design" };

export default function ThreeDPage() {
  return <CategoryPage category="3d" heroTitle="3D Design" />;
}
