export const site = {
  name: "Ágatha Sales",
  tagline: "Design gráfico, UX/UI, 3D e design de serviços.",
  email: "agatha@example.com",
  social: {
    instagram: { handle: "@aggy_colon", url: "https://instagram.com/aggy_colon" },
    // TODO: confirmar a URL real do LinkedIn da Ágatha (Figma mostra "Ágatha Ferreira")
    linkedin: { handle: "Ágatha Ferreira", url: "https://www.linkedin.com/" },
  },
} as const;

export const navLinks = [
  { label: "Sobre mim", href: "/" },
  { label: "Solicitar serviços", href: "/contato" },
] as const;

export const categoryTabs = [
  { label: "Gráfico", href: "/grafico", key: "grafico" },
  { label: "Interação", href: "/interacao", key: "interacao" },
  { label: "Serviços", href: "/servicos", key: "servicos" },
  { label: "3D", href: "/3d", key: "3d" },
] as const;

export type CategoryKey = (typeof categoryTabs)[number]["key"];
