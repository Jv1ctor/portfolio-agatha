import { describe, expect, it } from 'vitest';
import { boardReducer, initialBoardState, type BoardEvent, type BoardState } from './machine';
import {
  INK,
  KNOB,
  PEN,
  PEN_HELD_ROT,
  PEN_REST,
  ERASE_HALF,
  STRIP,
  STRIP_TRACK,
  CORD_CANVAS,
  HELD_BOUNDS,
  knobToInkX,
  onHolder,
  penFoot,
  insideInk,
  stripShift,
} from './geometry';
import { TOOLS, glyph, strokeLength } from './glyphs';
import { rng } from './ink';

const run = (events: BoardEvent[], from: BoardState = initialBoardState) => events.reduce(boardReducer, from);

describe('máquina da lousa', () => {
  it('só desenha uma ferramenta já virada', () => {
    expect(run([{ type: 'pick', tool: 'figma' }]).phase).toBe('idle');
    const s = run([{ type: 'flip', tool: 'figma' }, { type: 'pick', tool: 'figma' }]);
    expect(s.phase).toBe('erasing');
    expect(s.tool).toBe('figma');
  });

  it('percorre apagar → desenhar → voltar e libera bolinha e caneta', () => {
    const s = run([
      { type: 'flip', tool: 'ae' },
      { type: 'pick', tool: 'ae' },
      { type: 'erased' },
      { type: 'drawn' },
    ]);
    expect(s).toMatchObject({ phase: 'returning', drawn: 'ae', tool: null, unlocked: true });
    expect(run([{ type: 'home' }], s).phase).toBe('idle');
  });

  it('ignora outra escolha no meio de um desenho', () => {
    const s = run([
      { type: 'flip', tool: 'ae' },
      { type: 'flip', tool: 'figma' },
      { type: 'pick', tool: 'ae' },
      { type: 'pick', tool: 'figma' },
    ]);
    expect(s.tool).toBe('ae');
  });

  it('não deixa pegar a caneta antes do primeiro desenho', () => {
    expect(run([{ type: 'grab' }]).phase).toBe('idle');
    const unlocked = run([{ type: 'flip', tool: 'ae' }, { type: 'pick', tool: 'ae' }, { type: 'erased' }, { type: 'drawn' }, { type: 'home' }]);
    const held = run([{ type: 'grab' }], unlocked);
    expect(held.phase).toBe('holding');
    expect(run([{ type: 'release' }, { type: 'home' }], held).phase).toBe('idle');
  });

  it('virar o mesmo cubo duas vezes não duplica', () => {
    expect(run([{ type: 'flip', tool: 'ae' }, { type: 'flip', tool: 'ae' }]).revealed).toEqual(['ae']);
  });
});

describe('geometria', () => {
  it('a régua da bolinha cobre a tela inteira, de ponta a ponta do trilho', () => {
    // em repouso ela não toca a tinta; no fim do trilho cobre a última coluna
    expect(knobToInkX(KNOB.min) + ERASE_HALF).toBeLessThanOrEqual(0);
    expect(knobToInkX(KNOB.max) + ERASE_HALF).toBeGreaterThanOrEqual(INK.w);
    expect(knobToInkX(KNOB.min - 50)).toBe(knobToInkX(KNOB.min));
    for (let x = KNOB.min; x < KNOB.max; x += 37) expect(knobToInkX(x + 1)).toBeGreaterThan(knobToInkX(x));
  });

  it('a faixa bege anda com a bolinha e apaga exatamente o que fica embaixo dela', () => {
    expect(STRIP.x + STRIP.w).toBe(INK.x); // em repouso encosta na tela, como no Figma
    expect(stripShift(KNOB.min)).toBe(0);
    expect(STRIP.x + stripShift(KNOB.max) + STRIP.w).toBe(STRIP_TRACK.x + STRIP_TRACK.w); // não sai da tela
    expect(2 * ERASE_HALF).toBe(STRIP.w);
    for (let x = KNOB.min; x <= KNOB.max; x += 53) {
      const left = STRIP.x + stripShift(x) - INK.x; // borda esquerda da faixa, em coords da tinta
      expect(knobToInkX(x) - ERASE_HALF).toBeCloseTo(left, 9);
    }
  });

  it('a caneta na mão, em qualquer canto permitido, mantém o cordão dentro do canvas dele', () => {
    for (const x of [HELD_BOUNDS.x0, HELD_BOUNDS.x1])
      for (const y of [HELD_BOUNDS.y0, HELD_BOUNDS.y1]) {
        const foot = penFoot({ x, y, rot: PEN_HELD_ROT });
        expect(foot.x).toBeGreaterThanOrEqual(CORD_CANVAS.x);
        expect(foot.x).toBeLessThanOrEqual(CORD_CANVAS.x + CORD_CANVAS.w);
        expect(foot.y).toBeGreaterThanOrEqual(CORD_CANVAS.y);
        expect(foot.y).toBeLessThanOrEqual(CORD_CANVAS.y + CORD_CANVAS.h);
      }
  });

  it('o suporte da caneta envolve a caneta em repouso', () => {
    expect(onHolder({ x: PEN.x + PEN.w / 2, y: PEN.y + PEN.h / 2 })).toBe(true);
    expect(onHolder(PEN_REST)).toBe(true);
    expect(onHolder({ x: INK.x + INK.w / 2, y: INK.y + INK.h / 2 })).toBe(false);
  });

  it('em repouso o pé da caneta fica embaixo da ponta; na mão, sobe para a direita', () => {
    const rest = penFoot(PEN_REST);
    expect(rest.x).toBeCloseTo(PEN_REST.x, 5);
    expect(rest.y).toBeGreaterThan(PEN_REST.y);
    const held = penFoot({ x: 400, y: 300, rot: PEN_HELD_ROT });
    expect(held.x).toBeGreaterThan(400);
    expect(held.y).toBeLessThan(300);
  });
});

describe('glifos', () => {
  it.each(TOOLS)('%s cabe na tela, com margem para o pincel', (tool) => {
    const strokes = glyph(tool);
    expect(strokes.length).toBeGreaterThan(0);
    for (const s of strokes) {
      expect(s.length).toBeGreaterThan(1);
      for (const pt of s) {
        expect(insideInk({ x: pt.x - 12, y: pt.y - 12 })).toBe(true);
        expect(insideInk({ x: pt.x + 12, y: pt.y + 12 })).toBe(true);
      }
    }
  });

  it.each(TOOLS)('%s é contínuo (pontos a no máximo ~3px)', (tool) => {
    for (const s of glyph(tool)) {
      for (let i = 1; i < s.length; i++) expect(Math.hypot(s[i].x - s[i - 1].x, s[i].y - s[i - 1].y)).toBeLessThan(3.5);
    }
  });

  it('cada ícone tem um comprimento que dá para desenhar em poucos segundos', () => {
    for (const tool of TOOLS) {
      const total = glyph(tool).reduce((a, s) => a + strokeLength(s), 0);
      expect(total).toBeGreaterThan(300);
      expect(total).toBeLessThan(3200);
    }
  });

  it('o tremor é determinístico', () => {
    expect(glyph('figma')).toEqual(glyph('figma'));
    const a = rng(3), b = rng(3);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });
});

describe('som da lousa', () => {
  it('fica mudo parado e satura na velocidade de referência', async () => {
    const { level } = await import('./sound');
    expect(level(0, 900)).toBe(0);
    expect(level(-5, 900)).toBe(0);
    expect(level(Number.NaN, 900)).toBe(0);
    expect(level(900, 900)).toBe(1);
    expect(level(5000, 900)).toBe(1);
    const slow = level(100, 900), mid = level(450, 900);
    expect(slow).toBeGreaterThan(0);
    expect(mid).toBeGreaterThan(slow);
    expect(mid).toBeGreaterThan(0.5); // curva ^0.6: um traço lento já se ouve
  });
});
