import type { CSSProperties } from "react";
import type { LocalizedProject } from "@/lib/projects";
import s from "./batuco.module.css";

const base = "/images/projects/batuco-tuco/hero";

/** Caixa em px do frame do Figma (1352 × 467): x, y, largura, altura. */
type Box = readonly [number, number, number, number];

/** Sombra do Figma escalada com a composição (drop-shadow segue o recorte do PNG). */
function shadow(x: number, y: number, blur: number, color: string) {
  const u = (n: number) => `calc(${n} * var(--u))`;
  return `drop-shadow(${u(x)} ${u(y)} ${u(blur)} ${color})`;
}

function layerStyle(
  [x, y, w, h]: Box,
  extra?: { filter?: string; opacity?: number; rotate?: string },
) {
  return {
    "--x": x,
    "--y": y,
    "--w": w,
    "--h": h,
    ...extra,
  } as CSSProperties;
}

type Layer = {
  src: string;
  box: Box;
  filter?: string;
  opacity?: number;
  rotate?: string;
};

// Cybele vem girada 2.52° no Figma: a caixa abaixo é a do PNG antes da rotação,
// centrada no contêiner (765, 7, 314.46 × 398.48) que o Figma gera em volta.
const cybeleBox: Box = [773.33, 13.35, 297.805, 385.768];
const yopiBox: Box = [185.19, 29.88, 422.287, 360.702];
const gunterBox: Box = [432.26, 4.37, 471.403, 458.369];
const pepoBox: Box = [1017.15, -1.76, 335.026, 414.92];

/**
 * Ordem = empilhamento do Figma (node 17:2475): palco e sombras, personagens
 * com sombra, holofotes, brilhos, cópias translúcidas por cima e os últimos
 * brilhos. Os brilhos que o Figma deixa fora do frame (topo negativo) ficam de fora.
 */
const layers: Layer[] = [
  { src: "palco.svg", box: [-1.26, 303, 1356.82, 285.05] },
  { src: "sombra-1.svg", box: [70, 341, 186, 72] },
  { src: "sombra-2.svg", box: [316.26, 296.6, 216.329, 83.799] },
  { src: "sombra-3.svg", box: [585, 359, 188, 73] },
  { src: "sombra-4.svg", box: [830, 327, 178, 69] },
  { src: "sombra-5.svg", box: [1049, 328, 246, 71] },
  {
    src: "cybele.png",
    box: cybeleBox,
    rotate: "2.52deg",
    filter: shadow(12.509, -14, 12.509, "rgba(110,78,45,0.17)"),
  },
  { src: "yopi.png", box: yopiBox, filter: shadow(12.43, 0, 12.43, "rgba(0,0,0,0.25)") },
  {
    src: "gunter.png",
    box: gunterBox,
    filter: shadow(11.329, -26, 11.329, "rgba(97,51,8,0.11)"),
  },
  {
    src: "hanni.png",
    box: [-1.08, 28.38, 322.078, 385.093],
    filter: shadow(13.266, -8.846, 13.266, "rgba(0,0,0,0.13)"),
  },
  { src: "pepo.png", box: pepoBox, filter: shadow(12, -12, 10.868, "rgba(0,0,0,0.09)") },
  { src: "holofotes.svg", box: [-11.88, -475, 1413.884, 1631.991] },
  { src: "brilho-a.svg", box: [244.04, 13.22, 23.537, 23.786] },
  { src: "brilho-a.svg", box: [471.04, 20.36, 23.537, 23.786] },
  { src: "brilho-a.svg", box: [1041.04, 109.88, 23.537, 23.786] },
  { src: "brilho-b.svg", box: [25.01, 195.35, 22.813, 23.054] },
  { src: "yopi-fantasma.png", box: yopiBox, opacity: 0.37 },
  { src: "cybele.png", box: cybeleBox, rotate: "2.52deg", opacity: 0.34 },
  { src: "hanni-fantasma.png", box: [-1.08, 28.38, 321.679, 384.617], opacity: 0.45 },
  { src: "pepo-fantasma.png", box: pepoBox, opacity: 0.69 },
  { src: "gunter-fantasma.png", box: gunterBox, opacity: 0.74 },
  { src: "brilho-c.svg", box: [782.94, 54.92, 29.331, 29.641] },
  { src: "brilho-d.svg", box: [744.95, 13.22, 38, 38.662] },
  { src: "brilho-e.svg", box: [1291.02, 190.16, 22.813, 23.151] },
];

/** Capa do case: a banda no palco (Figma node 17:2475), em camadas que escalam juntas. */
export function BatucoTucoHero({ project }: { project: LocalizedProject }) {
  const label = "heroAlt" in project ? project.heroAlt : project.title;

  return (
    <div role="img" aria-label={label} className={s.hero}>
      {layers.map((layer, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={`${base}/${layer.src}`}
          alt=""
          aria-hidden
          className={s.layer}
          style={layerStyle(layer.box, {
            filter: layer.filter,
            opacity: layer.opacity,
            rotate: layer.rotate,
          })}
        />
      ))}
    </div>
  );
}
