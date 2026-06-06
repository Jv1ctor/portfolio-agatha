import type { CategoryKey } from "@/lib/site";

export type ProjectStatus = "concluido" | "em-progresso" | "em-breve";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  /** Resumo curto — usado no card da listagem */
  description: string;
  /** Texto de abertura do case study (parágrafo longo do Figma) */
  intro?: string;
  status: ProjectStatus;
  categories: CategoryKey[];
  /** Tags do card: [tipo, categoria] — ex: ["Acadêmico", "Design de Identidade Visual"] */
  tags: string[];
  /** Data exibida na pill do card (formato dd.mm.aaaa, como no Figma) */
  date?: string;
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
      "A marca “Pontos sem nó” procura nos transportar para as entrelinhas de nossas questões mais profundas não resolvidas que sempre voltam à nossa mente de alguma forma, convertendo memórias em sentimentos reconhecíveis…",
    intro:
      "A marca “Pontos sem nó” procura nos transportar para as entrelinhas de nossas questões mais profundas não resolvidas que sempre voltam à nossa mente de alguma forma, convertendo memórias em sentimentos reconhecíveis. A Pontos sem nó busca fazer parte do momento de identificação, transmitindo o processo de aceitação sobre esses sentimentos em forma de música.\n\nSendo representada em traços de ternura, serenidade com um toque lírico que nos faz assumir o papel de um peregrino em outras dimensões através do escapismo.",
    status: "concluido",
    categories: ["grafico"],
    tags: ["Acadêmico", "Design de Identidade Visual"],
    date: "08.12.2025",
    accent: "blue",
    coverImage: "/images/projects/pontos-sem-no/cover.svg",
  },
  {
    slug: "batuco-tuco",
    title: "Batuco-tuco",
    subtitle: "Batuco-tuco App",
    description:
      "App de ensino musical lúdico. Pesquisa, persona, interfaces gráficas, design system e protótipo.",
    status: "em-progresso",
    categories: ["interacao"],
    tags: ["Acadêmico", "Design de Interfaces Gráficas"],
    accent: "orange",
    // coverImage: exportar na Sessão 3 (Batuco-tuco)
  },
  {
    slug: "pontinhas-soltas",
    title: "Pontinhas soltas",
    subtitle: "Pontinhas soltas",
    description:
      "Design e modelagem 3D de personagens em torno de uma identidade de pontos soltos.",
    status: "concluido",
    categories: ["3d"],
    tags: ["Pessoal", "Design de personagens"],
    accent: "pink",
    // coverImage: exportar na Sessão 3 (Pontinhas soltas)
  },
];

export function projectsByCategory(key: CategoryKey): Project[] {
  return projects.filter((p) => p.categories.includes(key));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
