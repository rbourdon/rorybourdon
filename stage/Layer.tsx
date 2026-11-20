"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";
import type { Today } from "@/lib/today";
import { studies } from "@/studies";
import { params } from "./params";
import styles from "./stage.module.css";

export type Phase = "approach" | "live" | "leave";

export interface LayerState {
  key: number;
  studyId: string;
  phase: Phase;
  seed: number;
  query: string | null;
  /** Skip the slow leak-in, for when the visitor asked for something. */
  quick: boolean;
}

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

interface LayerProps {
  layer: LayerState;
  today: Today;
  onDone: (key: number) => void;
  onGone: (key: number) => void;
  show: (studyId: string) => void;
}

/**
 * One piece on the stage. Everything about how it arrives and leaves comes
 * from a single number, its presence: at 0 it is dust, at 1 it is sharp and
 * in full color. Focus arrives first and color floods in behind it.
 */
export default function Layer({
  layer,
  today,
  onDone,
  onGone,
  show,
}: LayerProps) {
  const { key, phase, quick } = layer;
  const presence = useMotionValue(0);

  useEffect(() => {
    let cancelled = false;
    let controls: ReturnType<typeof animate>;

    if (phase === "approach") {
      controls = animate(presence, params.residue, {
        duration: quick ? 0.25 : params.approachSeconds,
        ease: "easeOut",
      });
    } else if (phase === "live") {
      controls = animate(presence, 1, {
        type: "spring",
        stiffness: params.snap,
        damping: params.settle,
      });
    } else {
      // Let go fast, then take a long time to become nothing.
      controls = animate(presence, Math.min(params.residue, presence.get()), {
        type: "spring",
        stiffness: 140,
        damping: 26,
      });
      controls.then(() => {
        if (cancelled) return;
        controls = animate(presence, 0, {
          duration: params.residueSeconds,
          ease: "linear",
        });
        controls.then(() => {
          if (!cancelled) onGone(key);
        });
      });
    }

    return () => {
      cancelled = true;
      controls.stop();
    };
  }, [phase, quick, key, presence, onGone]);

  const filter = useTransform(presence, (value) => {
    const p = clamp01(value);
    if (p > 0.999) return "none";
    const blur = params.blur * (1 - p) ** 1.5;
    const gray = 1 - smoothstep(0.5, 1, p);
    const contrast = 0.6 + 0.4 * p;
    return `blur(${blur.toFixed(2)}px) grayscale(${gray.toFixed(3)}) contrast(${contrast.toFixed(3)})`;
  });
  const opacity = useTransform(presence, (value) => smoothstep(0, 0.6, value));
  // Not clamped, so the spring's overshoot reads as the lens breathing.
  const scale = useTransform(presence, (value) => 1 + 0.07 * (1 - value));

  const def = studies.find((study) => study.id === layer.studyId);
  if (!def) return null;
  const Study = def.Component;

  return (
    <motion.div
      className={styles.layer}
      style={{ filter, opacity, scale }}
      data-study={def.id}
      data-phase={phase}
    >
      <Study
        active={phase === "live"}
        seed={layer.seed}
        query={layer.query}
        today={today}
        onDone={() => onDone(key)}
        show={show}
      />
    </motion.div>
  );
}
