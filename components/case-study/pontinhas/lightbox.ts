import type { Dictionary } from "@/i18n/dictionaries";
import type { LocalizedProject } from "@/lib/projects";
import type { LightboxItem } from "@/components/case-study/CaseLightbox";
import { creamFiles, pontinhasBase as base } from "@/components/case-study/cases/PontinhasSoltasCase";

/** Tamanho real das fotos originais de Prototipagem (reserva a proporção no lightbox). */
const photoSizes = [
  { width: 1600, height: 1200 },
  { width: 1920, height: 1080 },
  { width: 1600, height: 1200 },
  { width: 1600, height: 1200 },
  { width: 1600, height: 1200 },
  { width: 1200, height: 1600 },
] as const;

/**
 * Itens do lightbox da página completa do Pontinhas soltas e o aria-label de cada
 * gatilho ("Ampliar: …"), na ordem dos índices usados em PontinhasSoltasCase:
 * 0 banner, 1–6 fotos (originais, sem o recorte da página), 7 card azul, 8–11 grupos
 * da prancha creme e 12 cards dos personagens. Os dois blocos com texto vivo na página
 * (card azul e cards) usam o PNG @2x exportado do Figma, com o texto em português nos
 * dois idiomas — mesma decisão do Batuco-tuco; os alts de /en avisam isso.
 */
export function getPontinhasLightbox(
  project: LocalizedProject,
  dict: Dictionary,
): { items: LightboxItem[]; labels: string[] } | null {
  if (!("gallery" in project)) return null;
  const { prototyping } = project.sections;
  const g = project.gallery;
  const creamText = [
    [g.flyingAlt, g.flyingCaption],
    [g.turnaroundsAlt, g.turnaroundsCaption],
    [g.headsAlt, g.headsCaption],
    [g.dancingAlt, g.dancingCaption],
  ] as const;

  const items: LightboxItem[] = [
    { src: `${base}/hero@2x.webp`, alt: project.heroAlt, caption: project.subtitle, width: 2704, height: 919 },
    ...prototyping.images.map((alt, i) => ({
      src: `${base}/prototipagem/foto-${i + 1}.jpg`,
      alt,
      caption: prototyping.title,
      ...photoSizes[i],
    })),
    { src: `${base}/lightbox/vitrine@2x.webp`, alt: g.showcaseAlt, caption: g.showcaseCaption, width: 2704, height: 1883 },
    ...creamFiles.map((file, i) => ({
      src: `${base}/prancha/${file.file}@2x.webp`,
      alt: creamText[i][0],
      caption: creamText[i][1],
      width: file.width,
      height: file.height,
    })),
    { src: `${base}/lightbox/cards@2x.webp`, alt: g.cardsAlt, caption: g.cardsCaption, width: 2722, height: 3016 },
  ];

  const labels = items.map((item) => dict.projectsPage.lightbox.open.replace("{caption}", item.caption));
  return { items, labels };
}
