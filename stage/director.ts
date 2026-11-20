import { animate, type MotionValue } from "motion/react";
import type { Dispatch, SetStateAction } from "react";
import { studies } from "@/studies";
import type { LayerState } from "./Layer";
import { params } from "./params";

/**
 * Decides what is on stage and when. Today that is a timer playing the
 * studies in turn. It is kept apart from React so that the agent can take
 * this job later without the stage changing: whatever replaces it only has
 * to call play and release.
 */
export function createDirector(
  setLayers: Dispatch<SetStateAction<LayerState[]>>,
  focus: MotionValue<number>,
) {
  let nextKey = 1;
  let current: number | null = null;
  let currentStudy: string | null = null;
  let lastStudy: string | null = null;
  let timer: number | undefined;
  let held = false;

  const schedule = (run: () => void, seconds: number) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(run, seconds * 1000);
  };

  const setPhase = (key: number, phase: LayerState["phase"]) => {
    setLayers((all) =>
      all.map((layer) => (layer.key === key ? { ...layer, phase } : layer)),
    );
  };

  /** Let whatever is on stage fall back into the air. */
  const release = () => {
    window.clearTimeout(timer);
    if (current === null) return;
    setPhase(current, "leave");
    current = null;
    currentStudy = null;
    animate(focus, 0, { duration: 0.9, ease: "easeOut" });
  };

  /** The quiet between pieces. Starts the next one if the show runs itself. */
  const rest = () => {
    if (current !== null) return;
    window.clearTimeout(timer);
    if (!params.auto || held) return;
    schedule(() => play(null, null, false), params.gapSeconds);
  };

  const land = (key: number, maxSeconds: number) => {
    if (current !== key) return;
    setPhase(key, "live");
    animate(focus, 1, {
      type: "spring",
      stiffness: params.snap,
      damping: params.settle,
    });
    // Once it has landed, whatever was left of earlier pieces is hidden
    // behind it and can go.
    window.setTimeout(() => {
      if (current === key) {
        setLayers((all) => all.filter((layer) => layer.key >= key));
      }
    }, 1500);
    // A piece ends itself; this is only the backstop.
    schedule(() => done(key), maxSeconds);
  };

  /**
   * Put a piece on. With no id, picks one that is not the one just shown.
   * `quick` skips the slow leak-in, for when the visitor asked for something.
   */
  const play = (
    studyId: string | null,
    query: string | null,
    quick: boolean,
  ) => {
    release();
    const startable = studies.filter((study) => study.selfStarting);
    const others = startable.filter((study) => study.id !== lastStudy);
    const pool = others.length > 0 ? others : startable;
    const def =
      studies.find((study) => study.id === studyId) ??
      pool[Math.floor(Math.random() * pool.length)];
    if (!def) return;

    const key = nextKey++;
    current = key;
    currentStudy = def.id;
    if (def.selfStarting) lastStudy = def.id;
    held = false;
    setLayers((all) => [
      ...all,
      {
        key,
        studyId: def.id,
        phase: "approach",
        seed: Math.floor(Math.random() * 2 ** 31),
        query,
        quick,
      },
    ]);
    schedule(
      () => land(key, def.maxSeconds),
      quick ? 0.3 : params.approachSeconds,
    );
  };

  /** A piece said it was finished. */
  const done = (key: number) => {
    if (current !== key) return;
    release();
    rest();
  };

  return {
    play,
    done,
    /** Take the current piece off and carry on with the show. */
    skip: () => {
      release();
      rest();
    },
    /**
     * The visitor started typing: nothing new starts until they finish or give
     * up. Most pieces get out of the way; an answer stays up to be read.
     */
    hold: () => {
      held = true;
      const def = studies.find((study) => study.id === currentStudy);
      if (!def?.staysWhileTyping) release();
    },
    unhold: () => {
      held = false;
      rest();
    },
    rest,
    dispose: () => window.clearTimeout(timer),
  };
}

export type Director = ReturnType<typeof createDirector>;
