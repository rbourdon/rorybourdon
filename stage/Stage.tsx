"use client";

import { useMotionValue } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Today } from "@/lib/today";
import Atmosphere from "./Atmosphere";
import { createDirector } from "./director";
import LabPanel, { type StageControls } from "./LabPanel";
import Layer, { type LayerState } from "./Layer";
import Prompt from "./Prompt";
import { loadParams, onParamsChange, signals, stir } from "./params";
import styles from "./stage.module.css";

/**
 * The whole page. An atmosphere that is always there, pieces that come into
 * focus in it and fall back out, and one line of input.
 *
 * Nothing here decides what goes on or when. That is the director's job.
 */
export default function Stage({ today }: { today: Today }) {
  const [layers, setLayers] = useState<LayerState[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const focus = useMotionValue(0);
  const director = useMemo(() => createDirector(setLayers, focus), [focus]);

  // Start the show, and restart it when "runs itself" is switched back on.
  useEffect(() => {
    loadParams();
    director.rest();
    const stop = onParamsChange(director.rest);
    return () => {
      stop();
      director.dispose();
    };
  }, [director]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "`") {
        event.preventDefault();
        setPanelOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleGone = useCallback((key: number) => {
    setLayers((all) => all.filter((layer) => layer.key !== key));
  }, []);

  const show = useCallback(
    (studyId: string) => director.play(studyId, null, true),
    [director],
  );

  const controls = useMemo<StageControls>(
    () => ({
      play: (studyId) => director.play(studyId, null, true),
      release: director.skip,
    }),
    [director],
  );

  return (
    <main
      className={styles.stage}
      onPointerMove={(event) => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = 1 - (event.clientY / window.innerHeight) * 2;
        stir(Math.hypot(x - signals.pointerX, y - signals.pointerY) * 0.15);
        signals.pointerX = x;
        signals.pointerY = y;
      }}
    >
      <Atmosphere focus={focus} />

      {layers.map((layer) => (
        <Layer
          key={layer.key}
          layer={layer}
          today={today}
          onDone={director.done}
          onGone={handleGone}
          show={show}
        />
      ))}

      <h1 className={styles.name}>rory bourdon</h1>

      <Prompt
        // Typing pulls the show back into the in-between and holds it there.
        onType={director.hold}
        onClear={director.unhold}
        onSubmit={(text) => director.play("answer", text, true)}
      />

      <button
        type="button"
        className={styles.labToggle}
        onClick={() => setPanelOpen((open) => !open)}
        aria-expanded={panelOpen}
      >
        {panelOpen ? "close" : "lab"}
      </button>

      {panelOpen && <LabPanel controls={controls} />}
    </main>
  );
}
