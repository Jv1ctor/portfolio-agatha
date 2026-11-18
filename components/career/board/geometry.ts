/**
 * Geometria da lousa mágica (Figma 201:413) no sistema "B": a caixa da imagem da lousa,
 * 1151 × 709 px de design, posicionada em (104, 4750) da página. B = frame do Figma + (-5, +6)
 * (o render 2x do frame começa 5px à direita e 6px acima do frame, por causa da sombra).
 *
 * Valores do get_design_context do 201:413 e dos filhos 201:462…474; ver o spec
 * docs/superpowers/specs/2026-11-17-carreira-page-design.md, "Emenda 3".
 */

export type Pt = { x: number; y: number };

export const BOARD_W = 1151;
export const BOARD_H = 709;

/** Tela (201:414) a partir da borda da faixa bege (201:474): frame (86, 62), 891.5 × 532. */
export const INK = { x: 81, y: 68, w: 891.5, h: 532, radius: 16.254 } as const;

/** Caneta (201:465): caixa do SVG 50.2395 × 395 em frame (1030.0012, 89). */
export const PEN = {
  x: 1025.0012,
  y: 95,
  w: 50.2395,
  h: 395,
  /** ponta (Polygon 3) e pé (onde o cordão prende), no SVG da caneta */
  tip: { x: 25.12, y: 16.7 },
  foot: { x: 25.12, y: 395 },
} as const;

/** Pose de repouso: ponta da caneta no suporte, em pé. */
export const PEN_REST = { x: PEN.x + PEN.tip.x, y: PEN.y + PEN.tip.y, rot: 0, lift: 1 } as const;

/** Caneta na mão: ponta para baixo e para a esquerda, corpo subindo para o suporte. */
export const PEN_HELD_ROT = -155;

/** Cordão (Vector 1386): recorte em repouso e ponto onde ele sai da lousa. */
export const CORD_REST = { x: 1033, y: 476, w: 36, h: 211 } as const;
export const CORD_ANCHOR: Pt = { x: 1049.5, y: 687 };
/** O canvas do cordão em movimento sobra para fora da lousa (a caneta sobe além do topo). */
export const CORD_CANVAS = { x: -80, y: -420, w: 1311, h: 1189 } as const;
export const CORD_COLOR = '#FFF6E7';
/** carimbos do cordão no SVG do Figma: escala ~0.05 × 365 */
export const CORD_STAMP = 18;
export const CORD_SPACING = 5.5;

/** Bolinha (201:473): 29 × 39, raio 11, em frame (67, 619); corre no trilho 201:471. */
export const KNOB = { x: 62, y: 625, w: 29, h: 39, radius: 11, min: 62, max: 931 } as const;

/** Pincel dos rabiscos: o carimbo "stroke0" do Figma (365 u) na escala 0.0321794. */
export const INK_COLOR = '#B7CAEA';
export const INK_STAMP = 365 * 0.0321794;
export const INK_SPACING = 3;
/** Largura da régua de apagar (metade) e da borda macia, em px de design. */
export const ERASE_HALF = 10;
export const ERASE_FEATHER = 8;

/**
 * Posição da bolinha → coluna da tela que a régua apaga. A régua acompanha a bolinha de
 * ponta a ponta do trilho e passa um pouco das bordas da tela, para não deixar sobra.
 */
export function knobToInkX(knobLeft: number): number {
  const t = (clamp(knobLeft, KNOB.min, KNOB.max) - KNOB.min) / (KNOB.max - KNOB.min);
  return -ERASE_HALF + t * (INK.w + 2 * ERASE_HALF);
}

export function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

/** Ponto da tela (coordenadas da tinta) → B. */
export const inkToBoard = (p: Pt): Pt => ({ x: p.x + INK.x, y: p.y + INK.y });
/** Ponto em B → coordenadas da tinta. */
export const boardToInk = (p: Pt): Pt => ({ x: p.x - INK.x, y: p.y - INK.y });

export const insideInk = (p: Pt): boolean => p.x >= 0 && p.y >= 0 && p.x <= INK.w && p.y <= INK.h;

/** Pé da caneta (onde o cordão prende) para uma pose com a ponta em (x, y) girada `rot`. */
export function penFoot(pose: { x: number; y: number; rot: number }): Pt {
  const a = (pose.rot * Math.PI) / 180;
  const dx = PEN.foot.x - PEN.tip.x;
  const dy = PEN.foot.y - PEN.tip.y;
  return {
    x: pose.x + dx * Math.cos(a) - dy * Math.sin(a),
    y: pose.y + dx * Math.sin(a) + dy * Math.cos(a),
  };
}
