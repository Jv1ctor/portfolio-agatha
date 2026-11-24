'use client';

import { useEffect, useEffectEvent, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import type { Dictionary } from '@/i18n/dictionaries';
import { career } from '@/lib/site';
import { at } from './layout';
import s from './career.module.css';
import p from './publications.module.css';

/**
 * "publicações acadêmicas" (Figma 226:327 + tickets 226:355, y 4170–4801).
 *
 * À esquerda, o título, o nome da publicação e as áreas de pesquisa (pills). À direita, o
 * bloquinho de tickets presos por uma fita: o da frente diz "clique aqui para ler a
 * publicação" e tem o "próxima". Anotação do Figma (226:393): o ticket vira para trás e
 * passa para o próximo. Cada clique em "próxima" faz o ticket da frente girar no eixo da
 * argola até ficar de lado, troca a publicação e volta de frente.
 *
 * As publicações são os frames TCC1, Espaleira, HEP2 e 5 planos (Figma 226:931/964/992/1016).
 * O ticket passa sozinho a cada 6 s. Depois da última, rebobina até a primeira (`rewind`).
 *
 * Camadas, na ordem do Figma, com as caixas do get_design_context em coordenadas locais
 * (origem no grupo, (1083, 4170.85), 493 × 630.27): furo (Ellipse 429), 4 tickets de trás
 * (cada SVG duas vezes, como no Figma), o ticket da frente (Exclude + 3 linhas + argola +
 * textos), a fita (Ellipse 378 ×2 + Union ×2) e o botão ">". Os SVGs são os do Figma.
 *
 * Links em lib/site.ts (`career.publications`): sem URL, o texto aparece sem link.
 */

type Layer = {
  src: string;
  /** caixa do wrapper (o envelope girado) */
  x: number;
  y: number;
  w: number;
  h: number;
  /** caixa girada e quanto o SVG passa dela à direita / embaixo (sombra) */
  iw: number;
  ih: number;
  r: number;
  ir: number;
  ib: number;
};

const L = '/images/carreira/publicacao/';
const back = (src: string, x: number, y: number, w: number, h: number, r: number, ir: number, ib: number, iw = 355.304, ih = 524.678): Layer => ({
  src: L + src,
  x,
  y,
  w,
  h,
  iw,
  ih,
  r,
  ir,
  ib,
});

const STACK: Layer[] = [
  back('g100962.svg', 118.23, 69.54, 374.269, 537.374, -1.89, 0.0486, 0.0385, 357.077, 525.855),
  back('g100962.svg', 118.23, 69.54, 374.269, 537.374, -1.89, 0.0486, 0.0385, 357.077, 525.855),
  back('g100961.svg', 103.64, 68.91, 377.161, 539.225, 2.42, 0.0462, 0.0391),
  back('g100961.svg', 103.64, 68.91, 377.161, 539.225, 2.42, 0.0462, 0.0391),
  back('g100963.svg', 54.84, 47.59, 432.838, 573.7, 8.98, 0.0462, 0.0391),
  back('g100963.svg', 54.84, 47.59, 432.838, 573.7, 8.98, 0.0462, 0.0391),
  back('g100964.svg', 0, 24.73, 493, 605.548, 16.97, 0.0462, 0.0391),
];
const EXCLUDE = back('exclude.svg', 1.13, 26.41, 490.742, 602.183, 17.61, 0.0515, 0.0403, 349.561, 520.841);
const RING = back('ellipse379.svg', 229.69, 89.66, 136.578, 136.578, 17.61, 0, 0, 108.77, 108.77);
const RIBBON: Layer[] = [
  back('ellipse378.webp', 306.24, 42.69, 137.449, 122.105, -1.26, 0.1002, 0.1008, 134.859, 119.167),
  back('ellipse378.webp', 306.24, 42.69, 137.449, 122.105, -1.26, 0.1002, 0.1008, 134.859, 119.167),
  back('union.svg', 261.6, 0, 128.614, 165.053, -1.26, 0.12, 0.0832, 125.072, 162.341),
  back('union.svg', 261.6, 0, 128.614, 165.053, -1.26, 0.12, 0.0832, 125.072, 162.341),
];
/** Linhas 10/11 (226:396–398): traço de 194.946 girado 17.2°, wrappers de 186.232 × 57.633. */
const LINES = [
  [145.9, 305.94, 'line10.svg'],
  [131.95, 350.87, 'line11.svg'],
  [118, 395.8, 'line11.svg'],
] as const;
/** Eixo da argola (centro do 226:401): o ticket gira em torno dele. */
const PIVOT = [298, 158];

function Art({ layer }: { layer: Layer }) {
  const { src, x, y, w, h, iw, ih, r, ir, ib } = layer;
  return (
    <div className={p.box} style={{ '--x': x, '--y': y, '--w': w, '--h': h } as CSSProperties}>
      <div className={p.rot} style={{ '--iw': iw, '--ih': ih, rotate: `${r}deg` } as CSSProperties}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" loading="lazy" decoding="async" style={{ '--ir': ir, '--ib': ib } as CSSProperties} />
      </div>
    </div>
  );
}

/** Texto girado 17.94° centrado em `cx` (226:399 / 226:400). */
function Turned({ cx, y, w, h, children, className }: { cx: number; y: number; w: number; h: number; children: ReactNode; className: string }) {
  return (
    <div className={p.box} style={{ '--x': cx - w / 2, '--y': y, '--w': w, '--h': h } as CSSProperties}>
      <div className={`${p.turned} ${className}`}>{children}</div>
    </div>
  );
}

/** Tempo que cada publicação fica de frente no autoplay. */
const DWELL = 6000;
const EASE_IN = 'cubic-bezier(0.55, 0, 0.75, 0.45)';
const EASE_OUT = 'cubic-bezier(0.2, 0.7, 0.3, 1)';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const spin = (el: HTMLElement, frames: Keyframe[], duration: number, easing: string) =>
  el.animate(frames, { duration, easing }).finished;

/** Separa as pills nas fileiras do Figma; o que sobrar vai na última. */
function splitRows<T>(items: T[], rows: readonly number[]): T[][] {
  const out: T[][] = [];
  let i = 0;
  rows.forEach((n, r) => {
    out.push(items.slice(i, r === rows.length - 1 ? undefined : i + n));
    i += n;
  });
  return out.filter((row) => row.length > 0);
}

export function CareerPublications({ labels }: { labels: Dictionary['career']['publications'] }) {
  const [index, setIndex] = useState(0);
  /** Sobe ao fim de cada giro: reinicia a contagem do autoplay. */
  const [cycle, setCycle] = useState(0);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const front = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const list = career.publications;
  const current = list[index];
  const item = labels.items[current.key];
  const rows = splitRows(Object.values(item.areas), current.rows);
  // anda sozinho só na tela, sem o mouse em cima do ticket (tem link e botão) e sem o
  // foco do teclado nele; com movimento reduzido, não anda (inView fica false)
  const autoplay = inView && !hovered && !focused && list.length > 1;

  /** "próxima": vira para trás no eixo da argola até ficar de lado, troca, volta de frente. */
  const forward = async (el: HTMLElement) => {
    await spin(el, [{ transform: 'rotateX(0deg)' }, { transform: 'rotateX(-88deg)', opacity: 0.6 }], 320, EASE_IN);
    setIndex((i) => (i + 1) % list.length);
    await spin(
      el,
      [
        { transform: 'rotateX(88deg)', opacity: 0.6 },
        { transform: 'rotateX(-8deg)', offset: 0.75 },
        { transform: 'rotateX(0deg)', opacity: 1 },
      ],
      520,
      EASE_OUT,
    );
  };

  /**
   * Depois da última: rebobina. O ticket gira no sentido contrário e folheia de volta cada
   * publicação, cada vez mais rápido, até a primeira. Ela assenta com um balanço, e o
   * bloquinho inteiro balança junto na fita.
   */
  const rewind = async (el: HTMLElement) => {
    await spin(el, [{ transform: 'rotateX(0deg)' }, { transform: 'rotateX(88deg)', opacity: 0.6 }], 260, EASE_IN);
    for (let i = list.length - 2, step = 0; i > 0; i--, step++) {
      setIndex(i);
      await spin(
        el,
        [
          { transform: 'rotateX(-88deg)', opacity: 0.6 },
          { transform: 'rotateX(0deg)', opacity: 1, offset: 0.5 },
          { transform: 'rotateX(88deg)', opacity: 0.6 },
        ],
        Math.max(150, 230 - step * 40),
        'linear',
      );
    }
    setIndex(0);
    root.current?.animate([{ rotate: '0deg' }, { rotate: '-1.8deg' }, { rotate: '1.1deg' }, { rotate: '-0.4deg' }, { rotate: '0deg' }], {
      duration: 900,
      delay: 120,
      easing: 'ease-out',
    });
    await spin(
      el,
      [
        { transform: 'rotateX(-88deg)', opacity: 0.6 },
        { transform: 'rotateX(14deg)', opacity: 1, offset: 0.55 },
        { transform: 'rotateX(-5deg)', offset: 0.8 },
        { transform: 'rotateX(0deg)', opacity: 1 },
      ],
      780,
      EASE_OUT,
    );
  };

  const next = async () => {
    if (busy.current) return;
    const el = front.current;
    if (!el || reducedMotion()) {
      setIndex((i) => (i + 1) % list.length);
      setCycle((c) => c + 1);
      return;
    }
    busy.current = true;
    try {
      await (index === list.length - 1 ? rewind(el) : forward(el));
    } catch {
      /* animação cancelada: o índice já foi trocado */
    } finally {
      busy.current = false;
      setCycle((c) => c + 1);
    }
  };

  const onDwell = useEffectEvent(() => {
    void next();
  });

  // autoplay: uma publicação a cada DWELL, contando de novo a cada giro (também o manual)
  useEffect(() => {
    if (!autoplay) return;
    const t = window.setTimeout(onDwell, DWELL);
    return () => window.clearTimeout(t);
  }, [autoplay, cycle]);

  useEffect(() => {
    const el = root.current;
    if (!el || reducedMotion()) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const read = <span className={p.readText}>{labels.read}</span>;

  return (
    <section className={s.section} aria-labelledby="career-publications">
      <div className={`${s.a} ${p.info}`} style={at(152, 4204.06, 841)}>
        <h2 id="career-publications" className={`${s.title} ${p.title}`}>
          {labels.title}
        </h2>
        {/* rodando sozinho não anuncia (padrão de carrossel da WAI); parado, anuncia a troca */}
        <p className={p.paper} aria-live={autoplay ? 'off' : 'polite'}>
          {item.title}
        </p>
        <div className={p.areas}>
          <h3 className={p.areasTitle}>{labels.areasTitle}</h3>
          {rows.map((row, r) => (
            <ul key={r} className={p.areaRow}>
              {row.map((area) => (
                <li key={area} className={p.area}>
                  <span className={p.areaInner}>{area}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div
        ref={root}
        className={`${s.a} ${p.ticket}`}
        style={at(1083, 4170.85, 493)}
        onPointerEnter={(e) => {
          if (e.pointerType === 'mouse') setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
        onFocus={(e) => {
          if (e.target.matches(':focus-visible')) setFocused(true);
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
        }}
      >
        <div className={p.art} aria-hidden>
          {/* furo (Ellipse 429) */}
          <div className={p.box} style={{ '--x': 253, '--y': 104, '--w': 94, '--h': 94 } as CSSProperties}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${L}ellipse429.svg`} alt="" className={p.fill} />
          </div>
          {STACK.map((layer, i) => (
            <Art key={i} layer={layer} />
          ))}
        </div>

        <div
          ref={front}
          className={p.front}
          style={{ transformOrigin: `calc(var(--k) * ${PIVOT[0]}) calc(var(--k) * ${PIVOT[1]})` } as CSSProperties}
        >
          <div aria-hidden>
            <Art layer={EXCLUDE} />
            {LINES.map(([x, y, src]) => (
              <div key={y} className={p.box} style={{ '--x': x, '--y': y, '--w': 186.232, '--h': 57.633 } as CSSProperties}>
                <div className={p.line}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={L + src} alt="" />
                </div>
              </div>
            ))}
            <Art layer={RING} />
          </div>
          <Turned cx={234.3} y={261.32} w={212.109} h={186.21} className={p.read}>
            {current.url ? (
              <a href={current.url} target="_blank" rel="noopener noreferrer">
                {read}
              </a>
            ) : (
              read
            )}
          </Turned>
          {/* a palavra também vira a página (o botão ">" é o controle acessível) */}
          <div onClick={next} className={p.nextWord}>
            <Turned cx={186.5} y={453} w={184.996} h={102.491} className={p.nextText}>
              <span aria-hidden>{labels.next}</span>
            </Turned>
          </div>
        </div>

        <div className={p.art} aria-hidden>
          {RIBBON.map((layer, i) => (
            <Art key={i} layer={layer} />
          ))}
        </div>

        {/* botão ">" (226:410): pill Azul gelo girado 6.33°, miolo tracejado girado 12.7° */}
        <button
          type="button"
          className={`${p.box} ${p.nextBtn}`}
          style={{ '--x': 253, '--y': 503, '--w': 66.905, '--h': 66.905 } as CSSProperties}
          onClick={next}
          aria-label={labels.nextLabel}
        >
          <span className={p.nextPill}>
            <span className={p.nextCircle}>
              <span aria-hidden>&gt;</span>
            </span>
          </span>
        </button>
      </div>
    </section>
  );
}
