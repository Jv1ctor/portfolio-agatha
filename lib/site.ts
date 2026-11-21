export type CategoryKey = 'grafico' | 'interacao' | 'servicos' | '3d';

// Keys only — labels come from dictionary (dict.nav.*)
export const navLinks = [
  { key: 'about', href: '/' },
  { key: 'contact', href: '/contato' },
] as const;

export const categoryTabs = [
  { key: 'grafico', href: '/grafico' },
  { key: 'interacao', href: '/interacao' },
  { key: 'servicos', href: '/servicos' },
  { key: '3d', href: '/3d' },
] as const;

// Non-translatable site data
export const site = {
  email: 'agatha@example.com',
  social: {
    instagram: { handle: '@aggy_colon', url: 'https://instagram.com/aggy_colon' },
    linkedin: { handle: 'Ágatha Ferreira', url: 'https://www.linkedin.com/in/agatha-ferreira-sales' },
  },
} as const;

/**
 * Links e nomes da página Minha carreira (Figma 226:56). Dados, não texto: ficam fora do
 * dicionário. `null` = link ainda não informado (o elemento aparece sem link).
 */
export type CareerDev = { slug: string; name: string; linkedin: string | null };
/** Chave em dict.career.publications.items. */
export type PublicationKey = 'ludificacao';

export const career: {
  musicChannel: string;
  publications: readonly { key: PublicationKey; url: string | null }[];
  devs: readonly CareerDev[];
} = {
  /** "Meu canal de música" (anotação do Figma no 226:497: id do canal no YouTube). */
  musicChannel: 'https://www.youtube.com/channel/UCGZGlogw4iBZehMIJ6ILZfg',
  /** Ticket "clique aqui para ler a publicação": a ordem é a do "próxima". */
  publications: [{ key: 'ludificacao', url: null }],
  /** "sobre este site": nome, avatar (public/images/carreira/devs/<slug>.webp) e LinkedIn. */
  devs: [
    { slug: 'kaike', name: 'Kaíke Petalas', linkedin: null },
    { slug: 'joao-vitor', name: 'João Vitor', linkedin: null },
    { slug: 'andre', name: 'André Garcia', linkedin: null },
    { slug: 'joao-pedro', name: 'João Pedro', linkedin: null },
    { slug: 'valentim', name: 'Valentim Aragão', linkedin: null },
    { slug: 'gilberto', name: 'Gilberto Egypto', linkedin: null },
  ],
};