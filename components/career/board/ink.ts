import {
  CORD_COLOR,
  CORD_SPACING,
  CORD_STAMP,
  ERASE_FEATHER,
  ERASE_HALF,
  INK,
  INK_COLOR,
  INK_SPACING,
  INK_STAMP,
  type Pt,
} from './geometry';

/**
 * Motor da tinta da lousa (canvas 2D).
 *
 * O pincel é o mesmo dos rabiscos do Figma: o carimbo "stroke0" (pincel.png, rasterizado
 * do SVG do Figma) repetido ao longo do traço com rotação aleatória, na cor #B7CAEA. Como
 * no Figma (máscara com vários <use>), carimbos sobrepostos somam cobertura, não cor.
 *
 * Tudo é guardado como operações em coordenadas da tela (891.5 × 532): no resize o
 * canvas é refeito nítido no novo tamanho (replay), com os mesmos carimbos (semente).
 */

type Op =
  | { t: 'image'; img: CanvasImageSource }
  | { t: 'stroke'; pts: Pt[]; seed: number }
  | { t: 'erase'; x0: number; x1: number };

/** PRNG pequeno e determinístico (mulberry32). */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Carimbo tingido no tamanho de tela (px de dispositivo). */
function tintedStamp(brush: CanvasImageSource, sizeDevice: number, color: string): HTMLCanvasElement {
  const c = document.createElement('canvas');
  const n = Math.max(2, Math.ceil(sizeDevice));
  c.width = c.height = n;
  const g = c.getContext('2d')!;
  g.imageSmoothingQuality = 'high';
  g.drawImage(brush, 0, 0, n, n);
  g.globalCompositeOperation = 'source-in';
  g.fillStyle = color;
  g.fillRect(0, 0, n, n);
  return c;
}

/**
 * Caminhante de carimbos: espalha carimbos a cada `spacing` px ao longo dos pontos, levando
 * a sobra de distância entre chamadas — o traço ao vivo e o replay dão o mesmo resultado.
 */
class StampWalker {
  private carry = 0;
  private last: Pt | null = null;
  constructor(private readonly spacing: number, private readonly rand: () => number) {}

  walk(pts: Pt[], put: (p: Pt, rot: number) => void) {
    for (const pt of pts) {
      if (!this.last) {
        put(pt, this.rand() * Math.PI * 2);
        this.last = pt;
        continue;
      }
      const dx = pt.x - this.last.x, dy = pt.y - this.last.y;
      const len = Math.hypot(dx, dy);
      let d = this.spacing - this.carry;
      while (d <= len) {
        put({ x: this.last.x + (dx * d) / len, y: this.last.y + (dy * d) / len }, this.rand() * Math.PI * 2);
        d += this.spacing;
      }
      this.carry = len - (d - this.spacing);
      this.last = pt;
    }
  }
}

export class Ink {
  private readonly ctx: CanvasRenderingContext2D;
  private ops: Op[] = [];
  private scale = 1; // px de dispositivo por px de design
  private stamp: HTMLCanvasElement | null = null;
  private live: { op: Extract<Op, { t: 'stroke' }>; walker: StampWalker } | null = null;
  private seed = 1;

  constructor(private readonly canvas: HTMLCanvasElement, private readonly brush: CanvasImageSource) {
    this.ctx = canvas.getContext('2d')!;
  }

  /** `cssWidth`: largura do canvas na tela, em px CSS. */
  resize(cssWidth: number) {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const k = cssWidth / INK.w;
    this.scale = k * dpr;
    this.canvas.width = Math.max(1, Math.round(INK.w * this.scale));
    this.canvas.height = Math.max(1, Math.round(INK.h * this.scale));
    this.stamp = tintedStamp(this.brush, INK_STAMP * this.scale, INK_COLOR);
    this.replay();
  }

  image(img: CanvasImageSource) {
    const op: Op = { t: 'image', img };
    this.ops.push(op);
    this.apply(op);
  }

  beginStroke(pt: Pt) {
    const op = { t: 'stroke' as const, pts: [] as Pt[], seed: this.seed++ };
    this.ops.push(op);
    this.live = { op, walker: new StampWalker(INK_SPACING, rng(op.seed)) };
    this.extend(pt);
  }

  extend(pt: Pt) {
    if (!this.live) return this.beginStroke(pt);
    this.live.op.pts.push(pt);
    this.live.walker.walk([pt], (q, r) => this.put(q, r));
  }

  endStroke() {
    this.live = null;
  }

  /** Apaga a faixa vertical varrida pela régua entre as colunas x0 e x1 (coords da tela). */
  erase(x0: number, x1: number) {
    const op: Op = { t: 'erase', x0, x1 };
    this.ops.push(op);
    this.apply(op);
  }

  /** Lousa limpa e log vazio (depois de uma varredura completa). */
  clear() {
    this.ops = [];
    this.live = null;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /** Há tinta em algum lugar? (para a verificação e para pular a varredura vazia) */
  get isEmpty(): boolean {
    return this.ops.every((o) => o.t === 'erase');
  }

  private replay() {
    const ops = this.ops;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const op of ops) this.apply(op);
  }

  private apply(op: Op) {
    const g = this.ctx, k = this.scale;
    if (op.t === 'image') {
      g.setTransform(k, 0, 0, k, 0, 0);
      g.globalCompositeOperation = 'source-over';
      g.drawImage(op.img, 0, 0, INK.w, INK.h);
    } else if (op.t === 'stroke') {
      const walker = new StampWalker(INK_SPACING, rng(op.seed));
      walker.walk(op.pts, (q, r) => this.put(q, r));
    } else {
      const lo = Math.min(op.x0, op.x1) - ERASE_HALF, hi = Math.max(op.x0, op.x1) + ERASE_HALF;
      g.setTransform(k, 0, 0, k, 0, 0);
      g.globalCompositeOperation = 'destination-out';
      const grad = g.createLinearGradient(lo - ERASE_FEATHER, 0, hi + ERASE_FEATHER, 0);
      const w = hi - lo + 2 * ERASE_FEATHER;
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(ERASE_FEATHER / w, 'rgba(0,0,0,1)');
      grad.addColorStop(1 - ERASE_FEATHER / w, 'rgba(0,0,0,1)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = grad;
      g.fillRect(lo - ERASE_FEATHER, -2, w, INK.h + 4);
      g.globalCompositeOperation = 'source-over';
    }
  }

  private put(q: Pt, rot: number) {
    const s = this.stamp;
    if (!s) return;
    const g = this.ctx, k = this.scale;
    const c = Math.cos(rot), n = Math.sin(rot);
    g.globalCompositeOperation = 'source-over';
    g.setTransform(c, n, -n, c, q.x * k, q.y * k);
    g.drawImage(s, -s.width / 2, -s.height / 2);
  }
}

/** O cordão da caneta quando ela sai do suporte: carimbos creme numa curva que cede. */
export class CordPainter {
  private readonly ctx: CanvasRenderingContext2D;
  private scale = 1;
  private stamp: HTMLCanvasElement | null = null;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly brush: CanvasImageSource,
    /** origem do canvas em coordenadas B, e tamanho em px de design */
    private readonly box: { x: number; y: number; w: number; h: number },
  ) {
    this.ctx = canvas.getContext('2d')!;
  }

  resize(cssWidth: number) {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    this.scale = (cssWidth / this.box.w) * dpr;
    this.canvas.width = Math.max(1, Math.round(this.box.w * this.scale));
    this.canvas.height = Math.max(1, Math.round(this.box.h * this.scale));
    this.stamp = tintedStamp(this.brush, CORD_STAMP * this.scale, CORD_COLOR);
  }

  clear() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /** `from` (onde sai da lousa) até `to` (pé da caneta), ambos em B. */
  draw(from: Pt, to: Pt) {
    this.clear();
    const s = this.stamp;
    if (!s) return;
    const d = Math.hypot(to.x - from.x, to.y - from.y);
    const sag = Math.max(24, 150 - d * 0.12);
    const c = { x: (from.x + to.x) / 2 + (to.x - from.x) * 0.1, y: Math.max(from.y, to.y) + sag };
    const n = Math.max(2, Math.ceil(d / CORD_SPACING) + 4);
    const g = this.ctx, k = this.scale, rand = rng(7);
    for (let i = 0; i <= n; i++) {
      const t = i / n, u = 1 - t;
      const x = u * u * from.x + 2 * u * t * c.x + t * t * to.x - this.box.x;
      const y = u * u * from.y + 2 * u * t * c.y + t * t * to.y - this.box.y;
      const r = rand() * Math.PI * 2, co = Math.cos(r), si = Math.sin(r);
      g.setTransform(co, si, -si, co, x * k, y * k);
      g.drawImage(s, -s.width / 2, -s.height / 2);
    }
  }
}
