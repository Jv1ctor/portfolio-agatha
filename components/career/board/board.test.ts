import { describe, expect, it } from 'vitest';
import { boardReducer, initialBoardState, type BoardEvent, type BoardState } from './machine';
import { INK, KNOB, PEN_HELD_ROT, PEN_REST, ERASE_HALF, knobToInkX, penFoot, insideInk } from './geometry';
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
    expect(knobToInkX(KNOB.min) + ERASE_HALF).toBeLessThanOrEqual(0);
    expect(knobToInkX(KNOB.max) - ERASE_HALF).toBeGreaterThanOrEqual(INK.w);
    expect(knobToInkX(KNOB.min - 50)).toBe(knobToInkX(KNOB.min));
    for (let x = KNOB.min; x < KNOB.max; x += 37) expect(knobToInkX(x + 1)).toBeGreaterThan(knobToInkX(x));
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
