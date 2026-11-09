'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import s from '../caju.module.css';

export type BookTexts = {
  title: string;
  cover: string;
  backCover: string;
  pages: string[];
  label: { cover: string; back: string; pages: string };
  hint: { cover: string; middle: string; end: string };
  nav: { open: string; turn: string; back: string; prev: string; next: string; restart: string };
  lock: string[];
};

type Face = { src?: string; alt: string };
type Flying = Record<number, { dir: 'fwd' | 'back'; seq: number }>;

/** Duração da virada (--flip) + folga. */
const FLIP_MS = 980;

/** Volume das páginas: sombras em camadas proporcionais às folhas de cada lado. */
function pageVolume(n: number, sign: number) {
  const parts: string[] = [];
  const layers = Math.min(7, Math.ceil(n / 2));
  for (let k = 1; k <= layers; k++) {
    parts.push(
      `${(sign * k * 0.7).toFixed(1)}px ${(k * 0.6).toFixed(1)}px 0 ${k % 2 ? '#E4D9CA' : '#F4EEE5'}`,
    );
  }
  parts.push(`${sign * 4}px 24px 40px -14px rgba(28,24,64,.3)`);
  return parts.join(', ');
}

const Chevron = ({ d }: { d: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

/**
 * "Simulação de leitura" (ANIMACOES §4.2 + §4.3): flipbook que vira por clique
 * (no livro ou nas setas) e trava de leitura com a mascote.
 *
 * Faces = capa, páginas e contracapa; cada folha tem frente e verso.
 *
 * Trava: ao chegar perto (topo a menos de 32% da tela) a página encaixa o livro
 * e `wheel`/`touchmove` ficam bloqueados; cada gesto conta uma tentativa e na
 * terceira a trava solta. Teclado, barra de rolagem, Esc e foco saindo do livro
 * soltam a trava na hora. Não trava dentro do modal de projeto (quem rola é a
 * folha do modal), com o lightbox aberto, em tela muito alta ou com movimento
 * reduzido.
 */
export function CajuBook({
  cover,
  pages,
  texts,
  mascotSrc,
}: {
  cover: string;
  pages: string[];
  texts: BookTexts;
  mascotSrc: string;
}) {
  const faces: Face[] = [
    { src: cover, alt: texts.cover },
    ...pages.map((src, i) => ({ src, alt: texts.pages[i] ?? '' })),
    { alt: texts.backCover },
  ];
  const N = Math.floor(faces.length / 2); // folhas
  const nPages = pages.length;

  const [cur, setCur] = useState(0);
  const [flying, setFlying] = useState<Flying>({});
  const [touched, setTouched] = useState(false);
  const [say, setSay] = useState<number | null>(null);
  const [nudge, setNudge] = useState<{ dir: 1 | -1; n: number } | null>(null);

  const curRef = useRef(0);
  const seqRef = useRef(0);
  const restartingRef = useRef(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (target: number) => {
      const from = curRef.current;
      if (target < 0 || target > N || target === from) return;
      const leaf = target > from ? from : target;
      const dir = target > from ? 'fwd' : 'back';
      const mySeq = ++seqRef.current;
      curRef.current = target;
      setFlying((f) => ({ ...f, [leaf]: { dir, seq: mySeq } }));
      setCur(target);
      setTouched(true);
      window.setTimeout(() => {
        setFlying((f) => {
          if (!f[leaf] || f[leaf].seq !== mySeq) return f;
          const rest = { ...f };
          delete rest[leaf];
          return rest;
        });
      }, FLIP_MS);
    },
    [N],
  );

  const restart = useCallback(() => {
    if (restartingRef.current) return;
    restartingRef.current = true;
    const step = () => {
      if (curRef.current <= 0) {
        restartingRef.current = false;
        return;
      }
      go(curRef.current - 1);
      window.setTimeout(step, 110);
    };
    step();
  }, [go]);

  // Tamanho do livro e altura da seção (livro centralizado na altura da tela).
  useEffect(() => {
    const frame = frameRef.current;
    const area = areaRef.current;
    if (!frame || !area) return;
    const inModal = !!frame.closest('[role="dialog"]');
    const layout = () => {
      const vh = window.innerHeight;
      const cw = frame.offsetWidth;
      const centered = vh <= 1500 && !inModal;
      const w = centered ? Math.min(cw * 0.93, (vh - 250) * 2, 1260) : Math.min(cw * 0.93, 1260);
      area.style.width = `${Math.round(Math.max(w, 0))}px`;
      frame.style.minHeight = centered ? `${vh}px` : '';
    };
    layout();
    window.addEventListener('resize', layout);
    return () => window.removeEventListener('resize', layout);
  }, []);

  // Trava de leitura (3 roladas para sair) + mascote.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const inModal = !!frame.closest('[role="dialog"]');
    if (inModal) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const lk = {
      armed: true,
      active: false,
      snapping: false,
      graceUntil: 0,
      lastWheel: 0,
      touchY: null as number | null,
      tries: 0,
      bump: 0,
    };
    let byeTimer = 0;
    let snapTimer = 0;

    const allowed = () =>
      !reduced.matches &&
      window.innerHeight <= 1500 &&
      !document.body.classList.contains('lb-open');

    // sai sem insistir (teclado, barra de rolagem, Esc, foco fora do livro)
    const giveUp = () => {
      lk.active = false;
      lk.armed = false;
      lk.tries = 0;
      setSay(null);
    };
    const release = (dir: number) => {
      lk.active = false;
      lk.armed = false;
      lk.tries = 0;
      setSay(2);
      window.clearTimeout(byeTimer);
      byeTimer = window.setTimeout(() => setSay(null), 1800);
      window.scrollBy({ top: dir * window.innerHeight * 0.6, behavior: 'smooth' });
    };
    const attempt = (dir: 1 | -1) => {
      if (!lk.active || Date.now() < lk.graceUntil) return;
      lk.tries++;
      if (lk.tries >= 3) {
        release(dir);
        return;
      }
      setSay(lk.tries - 1);
      lk.bump++;
      setNudge({ dir, n: lk.bump });
    };
    const check = () => {
      if (!allowed()) {
        if (lk.active) giveUp();
        return;
      }
      const vh = window.innerHeight;
      const r = frame.getBoundingClientRect();
      if (lk.active) {
        if (lk.snapping && Math.abs(r.top) < 2) lk.snapping = false;
        if (!lk.snapping && Math.abs(r.top) > 60) giveUp();
        return;
      }
      // rearma só depois que a seção sai inteira da tela
      if (!lk.armed) {
        if (r.bottom < 0 || r.top > vh) lk.armed = true;
        return;
      }
      if (r.top < vh * 0.32) {
        lk.active = true;
        lk.snapping = true;
        lk.tries = 0;
        lk.graceUntil = Date.now() + 900;
        setSay(null);
        window.scrollTo({ top: window.scrollY + r.top, behavior: 'smooth' });
        window.clearTimeout(snapTimer);
        snapTimer = window.setTimeout(() => {
          lk.snapping = false;
        }, 1000);
      }
    };
    const onWheel = (e: WheelEvent) => {
      if (!lk.active) return;
      e.preventDefault();
      const now = Date.now();
      const gap = now - lk.lastWheel;
      lk.lastWheel = now;
      // um gesto = uma tentativa (o trackpad manda dezenas de eventos por rolada)
      if (gap > 260 && Math.abs(e.deltaY) > 1) attempt(e.deltaY > 0 ? 1 : -1);
    };
    const onTouchStart = (e: TouchEvent) => {
      lk.touchY = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (lk.active) e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!lk.active || lk.touchY === null) return;
      const dy = lk.touchY - (e.changedTouches[0]?.clientY ?? lk.touchY);
      lk.touchY = null;
      if (Math.abs(dy) > 40) attempt(dy > 0 ? 1 : -1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (lk.active && e.key === 'Escape') giveUp();
    };
    const onFocusIn = (e: FocusEvent) => {
      if (lk.active && e.target instanceof Node && !frame.contains(e.target)) giveUp();
    };

    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    document.addEventListener('keydown', onKey);
    document.addEventListener('focusin', onFocusIn);
    return () => {
      window.clearTimeout(byeTimer);
      window.clearTimeout(snapTimer);
      window.removeEventListener('scroll', check);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('focusin', onFocusIn);
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(curRef.current + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(curRef.current - 1);
    }
  };

  const busy = Object.keys(flying).length > 0;
  const closed = cur === 0 || cur === N;
  const shift = cur === 0 ? '-25%' : cur === N ? '25%' : '0%';
  const label =
    cur === 0
      ? texts.label.cover
      : cur === N
        ? texts.label.back
        : texts.label.pages
            .replace('{a}', String(Math.min(2 * cur - 1, nPages)))
            .replace('{b}', String(Math.min(2 * cur, nPages)))
            .replace('{n}', String(nPages));
  const hint = cur === 0 ? texts.hint.cover : cur === N ? texts.hint.end : texts.hint.middle;
  const nudgeCls = nudge
    ? nudge.dir > 0
      ? nudge.n % 2
        ? s.nudgeDn1
        : s.nudgeDn2
      : nudge.n % 2
        ? s.nudgeUp1
        : s.nudgeUp2
    : '';

  return (
    <div ref={frameRef} className={s.fbFrame} onKeyDown={onKeyDown}>
      <div className={`${s.fbInner} ${nudgeCls}`}>
        <div ref={areaRef} className={s.fbArea}>
          <div
            className={`${s.fbGlow} ${touched ? '' : s.pulse}`}
            style={{ left: closed ? '25%' : '0%', width: closed ? '50%' : '100%' }}
            aria-hidden="true"
          />
          <div className={s.fbBook} style={{ transform: `translateX(${shift})` }}>
            <div
              className={`${s.fbStack} ${s.fbStackL}`}
              style={{ opacity: cur > 0 ? 1 : 0, boxShadow: pageVolume(cur, -1) }}
              aria-hidden="true"
            />
            <div
              className={`${s.fbStack} ${s.fbStackR}`}
              style={{ opacity: cur < N ? 1 : 0, boxShadow: pageVolume(N - cur, 1) }}
              aria-hidden="true"
            />
            {Array.from({ length: N }, (_, i) => {
              const f = flying[i];
              const front = faces[2 * i];
              const back = faces[2 * i + 1];
              const z = i < cur ? -(i + 1) * 0.4 : (N - i) * 0.4;
              // só as folhas visíveis são desenhadas (sem isso a imagem pisca)
              const visible = !!f || (i >= cur - 2 && i <= cur + 1);
              return (
                <div
                  key={i}
                  className={`${s.fbLeaf} ${f?.dir === 'fwd' ? s.flyFwd : ''} ${f?.dir === 'back' ? s.flyBack : ''}`}
                  style={{
                    transform: `rotateY(${i < cur ? -180 : 0}deg) translateZ(${z.toFixed(1)}px)`,
                    visibility: visible ? 'visible' : 'hidden',
                  }}
                >
                  {[front, back].map((face, k) => {
                    const shown = k === 0 ? i === cur : i === cur - 1;
                    return (
                      <div
                        key={k}
                        className={`${s.fbFace} ${k === 0 ? s.fbFront : s.fbBack}`}
                        aria-hidden={!shown}
                      >
                        {face?.src ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={face.src} alt={face.alt} draggable={false} loading="lazy" decoding="async" />
                        ) : (
                          <div className={s.fbPlain} role="img" aria-label={face?.alt ?? ''} />
                        )}
                        {!(i === 0 && k === 0) && !(i === N - 1 && k === 1) && (
                          <div className={s.fbSpine} />
                        )}
                        <div className={s.fbShade} />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div
            className={`${s.fbHits} ${busy ? s.busy : ''}`}
            style={{ transform: `translateX(${shift})` }}
          >
            <button
              type="button"
              className={`${s.fbHit} ${s.fbHitPrev} ${busy ? '' : s.invite}`}
              aria-label={texts.nav.back}
              hidden={cur === 0}
              onClick={() => go(curRef.current - 1)}
            >
              <span className={s.fbCurl} aria-hidden="true">
                <span className={s.fbUnder} />
                <span className={s.fbFlapWrap}>
                  <span className={s.fbFlap} />
                </span>
              </span>
            </button>
            <button
              type="button"
              className={`${s.fbHit} ${s.fbHitNext} ${busy ? '' : s.invite}`}
              aria-label={cur === 0 ? texts.nav.open : texts.nav.turn}
              hidden={cur === N}
              onClick={() => go(curRef.current + 1)}
            >
              <span className={s.fbCurl} aria-hidden="true">
                <span className={s.fbUnder} />
                <span className={s.fbFlapWrap}>
                  <span className={s.fbFlap} />
                </span>
              </span>
            </button>
          </div>
        </div>

        <div className={s.fbCtrl}>
          <button
            type="button"
            className={s.fbNav}
            aria-label={texts.nav.prev}
            disabled={cur === 0}
            onClick={() => go(curRef.current - 1)}
          >
            <Chevron d="M15 18l-6-6 6-6" />
          </button>
          <div className={s.fbMeter}>
            <p className={s.fbLabel} aria-live="polite">
              {label}
            </p>
            <div className={s.fbTrack} aria-hidden="true">
              <div className={s.fbFill} style={{ width: `${((cur / N) * 100).toFixed(2)}%` }} />
            </div>
          </div>
          <button
            type="button"
            className={s.fbNav}
            aria-label={texts.nav.restart}
            hidden={cur !== N}
            onClick={restart}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 12a9 9 0 1 0 3-6.7" />
              <path d="M3 4v5h5" />
            </svg>
          </button>
          <button
            type="button"
            className={`${s.fbNav} ${touched ? '' : s.pulse}`}
            aria-label={texts.nav.next}
            hidden={cur === N}
            onClick={() => go(curRef.current + 1)}
          >
            <Chevron d="M9 18l6-6-6-6" />
          </button>
        </div>
        <p className={s.fbHint}>{hint}</p>
      </div>

      <div className={s.fbMascot} role="status" aria-live="polite" hidden={say === null}>
        {say !== null && (
          <p key={say} className={`${s.fbBubble} ${say % 2 ? s.bA : s.bB}`}>
            {texts.lock[say]}
          </p>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={s.fbFaceImg} src={mascotSrc} alt="" aria-hidden="true" />
      </div>
    </div>
  );
}
