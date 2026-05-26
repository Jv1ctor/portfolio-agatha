import type { CategoryKey } from "@/lib/site";

export type ProjectStatus = "concluido" | "em-progresso" | "em-breve";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  status: ProjectStatus;
  categories: CategoryKey[];
  /** Tags textuais mostradas no card (ex: "Acadêmico", "Design de Identidade Visual") */
  tags: string[];
  /** Cor de fundo do card de capa */
  accent: "blue" | "orange" | "pink";
  /** Caminho da imagem de capa em /public — placeholder por enquanto */
  coverImage?: string;
};

export const projects: Project[] = [
  {
    slug: "pontos-sem-no",
    title: "Pontos sem nó",
    subtitle: "IDV: Pontos sem nó",
    description:
      "Identidade visual de marca focada em produtos de croché. Pesquisa, símbolo, paleta e manual de uso.",
    status: "concluido",
    categories: ["grafico"],
    tags: ["Acadêmico", "Design de Identidade Visual"],
    accent: "blue",
    coverImage: "/images/projects/pontos-sem-no/cover.png",
  },
  {
    slug: "batuco-tuco",
    title: "Batuco-tuco",
    subtitle: "Batuco-tuco App",
    description:
      "App de ensino musical lúdico. Pesquisa, persona, interfaces gráficas, design system e protótipo.",
    status: "em-progresso",
    categories: ["interacao", "grafico"],
    tags: ["Em progresso", "Acadêmico", "Design de Interfaces Gráficas"],
    accent: "orange",
    coverImage: "/images/projects/batuco-tuco/cover.png",
  },
  {
    slug: "pontinhas-soltas",
    title: "Pontinhas soltas",
    subtitle: "Pontinhas soltas",
    description:
      "Design e modelagem 3D de personagens em torno de uma identidade de pontos soltos.",
    status: "concluido",
    categories: ["3d", "grafico"],
    tags: ["Concluído", "Pessoal", "Design de personagens"],
    accent: "pink",
    coverImage: "/images/projects/pontinhas-soltas/cover.png",
  },
];

export function projectsByCategory(key: CategoryKey): Project[] {
  return projects.filter((p) => p.categories.includes(key));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
