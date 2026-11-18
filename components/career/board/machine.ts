import type { Tool } from './glyphs';

/**
 * Sequência da brincadeira da lousa:
 *  idle ─pick→ erasing ─erased→ drawing ─drawn→ returning ─home→ idle
 *  idle ─grab→ holding ─release→ returning ─home→ idle   (só depois do 1º desenho)
 * Virar um cubo (flip) vale a qualquer momento; escolher (pick) só em idle.
 */
export type Phase = 'idle' | 'erasing' | 'drawing' | 'returning' | 'holding';

export type BoardState = {
  phase: Phase;
  /** ferramenta sendo desenhada (erasing/drawing) */
  tool: Tool | null;
  /** última ferramenta desenhada na lousa */
  drawn: Tool | null;
  revealed: readonly Tool[];
  /** bolinha e caneta liberadas depois do primeiro desenho */
  unlocked: boolean;
};

export type BoardEvent =
  | { type: 'flip'; tool: Tool }
  | { type: 'pick'; tool: Tool }
  | { type: 'erased' }
  | { type: 'drawn' }
  | { type: 'grab' }
  | { type: 'release' }
  | { type: 'home' };

export const initialBoardState: BoardState = {
  phase: 'idle',
  tool: null,
  drawn: null,
  revealed: [],
  unlocked: false,
};

export function boardReducer(state: BoardState, event: BoardEvent): BoardState {
  switch (event.type) {
    case 'flip':
      return state.revealed.includes(event.tool) ? state : { ...state, revealed: [...state.revealed, event.tool] };
    case 'pick':
      if (state.phase !== 'idle' || !state.revealed.includes(event.tool)) return state;
      return { ...state, phase: 'erasing', tool: event.tool };
    case 'erased':
      return state.phase === 'erasing' ? { ...state, phase: 'drawing' } : state;
    case 'drawn':
      return state.phase === 'drawing'
        ? { ...state, phase: 'returning', drawn: state.tool, tool: null, unlocked: true }
        : state;
    case 'grab':
      return state.phase === 'idle' && state.unlocked ? { ...state, phase: 'holding' } : state;
    case 'release':
      return state.phase === 'holding' ? { ...state, phase: 'returning' } : state;
    case 'home':
      return state.phase === 'returning' ? { ...state, phase: 'idle' } : state;
  }
}

/** A bolinha pode ser arrastada? (a caneta usa `grab`, que já checa o mesmo) */
export const canErase = (s: BoardState): boolean => s.phase === 'idle' && s.unlocked;
export const isBusy = (s: BoardState): boolean => s.phase !== 'idle';
