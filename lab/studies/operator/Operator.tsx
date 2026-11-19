"use client";

import { animate, motion, useMotionValue } from "motion/react";
import { type CSSProperties, useEffect, useRef } from "react";
import { hashString, rng } from "@/lib/random";
import type { StudyProps } from "@/stage/types";
import styles from "./operator.module.css";

// SKETCH. A control panel and a small specimen interface, both drawn from the
// same handful of design tokens. Then a cursor shows up and works the
// controls, so the specimen and the panel itself restyle as you watch. The
// interface is the performer.

const SLIDERS = [
  "radius",
  "density",
  "stroke",
  "hue",
  "chroma",
  "depth",
] as const;
type SliderId = (typeof SLIDERS)[number];
const FONTS = ["sans", "serif", "mono"] as const;

/** Every control's position, 0..1. This is the entire state of the piece. */
type Tokens = Record<SliderId, number> & { dark: number; font: number };

type Move =
  | { control: SliderId; to: number }
  | { control: "dark" }
  | { control: "font"; to: number };

function startTokens(random: () => number): Tokens {
  return {
    radius: random(),
    density: random(),
    stroke: random() * 0.6,
    hue: random(),
    chroma: 0.3 + random() * 0.7,
    depth: random(),
    dark: random() > 0.5 ? 1 : 0,
    font: Math.floor(random() * 3),
  };
}

/** A run of moves that each change something you can see. */
function planMoves(start: Tokens, random: () => number): Move[] {
  const tokens = { ...start };
  const order: Move["control"][] = [
    "radius",
    "hue",
    "dark",
    "density",
    "font",
    "chroma",
    "depth",
    "hue",
    "stroke",
    "dark",
    "radius",
  ];
  return order.map((control): Move => {
    if (control === "dark") return { control };
    if (control === "font") {
      const to = (tokens.font + 1 + Math.floor(random() * 2)) % 3;
      tokens.font = to;
      return { control, to };
    }
    // Always travel far enough to matter.
    const from = tokens[control];
    const to = from < 0.5 ? 0.6 + random() * 0.4 : random() * 0.4;
    tokens[control] = to;
    return { control, to };
  });
}

/** Write the tokens onto the root as CSS variables. All styling follows. */
function applyTokens(root: HTMLElement, tokens: Tokens) {
  for (const id of SLIDERS) {
    root.style.setProperty(`--n-${id}`, tokens[id].toFixed(4));
  }
  root.style.setProperty("--n-dark", tokens.dark.toFixed(4));
  root.style.setProperty("--n-font", String(tokens.font));
  root.dataset.font = FONTS[tokens.font];
}

const wait = (ms: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, ms));

export default function Operator({ active, seed, query, onDone }: StudyProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tokensRef = useRef<Tokens | null>(null);
  const cursorX = useMotionValue(-40);
  const cursorY = useMotionValue(-40);
  const cursorScale = useMotionValue(1);

  const runSeed = query ? hashString(query) : seed;

  useEffect(() => {
    tokensRef.current = startTokens(rng(runSeed));
    if (rootRef.current) applyTokens(rootRef.current, tokensRef.current);
  }, [runSeed]);

  // The performance: a cursor arrives and works the controls one by one.
  useEffect(() => {
    if (!active) return;
    const root = rootRef.current;
    const tokens = tokensRef.current;
    if (!root || !tokens) return;

    const apply = () => applyTokens(root, tokens);
    let cancelled = false;
    const running: { stop: () => void }[] = [];
    const run = <T extends { stop: () => void }>(animation: T) => {
      running.push(animation);
      return animation;
    };

    /** Where a point inside `el` is, in the root's own coordinates. */
    const locate = (el: Element, fx: number, fy: number) => {
      const scale = root.offsetWidth / root.getBoundingClientRect().width;
      const base = root.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      return {
        x: (rect.left + rect.width * fx - base.left) * scale,
        y: (rect.top + rect.height * fy - base.top) * scale,
      };
    };

    const glide = async (to: { x: number; y: number }) => {
      const spring = { type: "spring", stiffness: 210, damping: 24 } as const;
      await Promise.all([
        run(animate(cursorX, to.x, spring)),
        run(animate(cursorY, to.y, spring)),
      ]);
    };

    const press = () =>
      run(animate(cursorScale, 0.82, { duration: 0.08 })).then(() => {});
    const lift = () =>
      run(
        animate(cursorScale, 1, {
          type: "spring",
          stiffness: 500,
          damping: 18,
        }),
      );

    const perform = async () => {
      const moves = planMoves(tokens, rng(runSeed + 1));
      const rect = root.getBoundingClientRect();
      cursorX.set(rect.width * 0.5);
      cursorY.set(rect.height + 40);
      await wait(350);

      for (const move of moves) {
        if (cancelled) return;
        const control = root.querySelector(`[data-control="${move.control}"]`);
        if (!control) continue;

        if (move.control === "dark") {
          await glide(locate(control, 0.5, 0.5));
          await press();
          tokens.dark = tokens.dark > 0.5 ? 0 : 1;
          apply();
          lift();
        } else if (move.control === "font") {
          const option = control.querySelector(`[data-option="${move.to}"]`);
          if (!option) continue;
          await glide(locate(option, 0.5, 0.5));
          await press();
          tokens.font = move.to;
          apply();
          lift();
        } else {
          const track = control.querySelector("[data-track]");
          if (!track) continue;
          const id = move.control;
          await glide(locate(track, tokens[id], 0.5));
          await press();
          // Dragging can change the layout under the cursor (density does),
          // so find the thumb again on every frame.
          await run(
            animate(tokens[id], move.to, {
              duration: 0.75,
              ease: [0.3, 0, 0.1, 1],
              onUpdate: (value) => {
                tokens[id] = value;
                apply();
                const at = locate(track, value, 0.5);
                cursorX.set(at.x);
                cursorY.set(at.y);
              },
            }),
          );
          lift();
        }
        await wait(260);
      }

      if (cancelled) return;
      await glide({ x: cursorX.get() + 120, y: rect.height + 60 });
      if (!cancelled) onDone();
    };

    perform();
    return () => {
      cancelled = true;
      for (const animation of running) animation.stop();
    };
  }, [active, runSeed, onDone, cursorX, cursorY, cursorScale]);

  return (
    <div ref={rootRef} className={styles.root} data-font="sans">
      <section className={styles.panel} aria-hidden>
        <p className={styles.eyebrow}>{query ?? "specimen"}</p>
        {SLIDERS.map((id) => (
          <div key={id} className={styles.row} data-control={id}>
            <span className={styles.rowLabel}>{id}</span>
            <div
              className={id === "hue" ? styles.trackHue : styles.track}
              data-track
              style={{ "--n": `var(--n-${id})` } as CSSProperties}
            >
              <div className={styles.fill} />
              <div className={styles.thumb} />
            </div>
          </div>
        ))}
        <div className={styles.row}>
          <span className={styles.rowLabel}>dark</span>
          <div className={styles.toggle} data-control="dark">
            <div className={styles.knob} />
          </div>
        </div>
        <div className={styles.row}>
          <span className={styles.rowLabel}>type</span>
          <div className={styles.segments} data-control="font">
            <div className={styles.segmentPill} />
            {FONTS.map((font, i) => (
              <span key={font} className={styles.segment} data-option={i}>
                {font}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.specimen} aria-hidden>
        <div className={styles.nav}>
          <span className={styles.pillOn}>Overview</span>
          <span className={styles.pill}>Activity</span>
          <span className={styles.pill}>Settings</span>
          <span className={styles.avatars}>
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className={styles.cards}>
          <article className={styles.cardWide}>
            <div className={styles.picture} />
            <h2 className={styles.heading}>A quieter way in</h2>
            <span className={styles.bar} style={{ width: "92%" }} />
            <span className={styles.bar} style={{ width: "64%" }} />
            <div className={styles.actions}>
              <span className={styles.button}>Continue</span>
              <span className={styles.buttonGhost}>Later</span>
            </div>
          </article>
          <article className={styles.card}>
            <span className={styles.figure}>72%</span>
            <div className={styles.chart}>
              {[0.35, 0.6, 0.45, 0.8, 0.55, 1, 0.7].map((value, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: fixed list
                <i key={i} style={{ height: `${value * 100}%` }} />
              ))}
            </div>
          </article>
          <article className={styles.card}>
            {[0.8, 0.55, 0.7].map((value, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed list
              <div key={i} className={styles.item}>
                <i className={i === 0 ? styles.checkOn : styles.check} />
                <span
                  className={styles.bar}
                  style={{ width: `${value * 100}%` }}
                />
              </div>
            ))}
          </article>
        </div>
      </section>

      <motion.div
        className={styles.cursor}
        style={{ x: cursorX, y: cursorY, scale: cursorScale }}
        aria-hidden
      >
        <svg width="22" height="24" viewBox="0 0 22 24" role="presentation">
          <path
            d="M2 1.5v18.2l4.9-4.3 3.3 7.3 3-1.4-3.2-7.1 6.6-.5z"
            fill="#000"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}
