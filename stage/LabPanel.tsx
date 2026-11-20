"use client";

import { useEffect, useRef } from "react";
import { studies } from "@/studies";
import { params, resetParams, saveParams } from "./params";
import styles from "./stage.module.css";

export interface StageControls {
  play: (studyId: string) => void;
  release: () => void;
}

/** The tweak panel. Everything in it edits stage/params.ts live. */
export default function LabPanel({ controls }: { controls: StageControls }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let disposed = false;
    let dispose = () => {};

    import("tweakpane").then(({ Pane }) => {
      if (disposed) return;
      const pane = new Pane({ container, title: "lab" });

      const air = pane.addFolder({ title: "in-between" });
      air.addBinding(params, "tone", { min: 0, max: 1 });
      air.addBinding(params, "dust", { min: 0, max: 1 });
      air.addBinding(params, "dustSize", {
        min: 0.3,
        max: 3,
        label: "dust size",
      });
      air.addBinding(params, "light", { min: 0, max: 2 });
      air.addBinding(params, "lightAngle", {
        min: -Math.PI,
        max: Math.PI,
        label: "light angle",
      });
      air.addBinding(params, "scenes", { min: 0, max: 2, label: "far shapes" });
      air.addBinding(params, "sceneSeconds", {
        min: 3,
        max: 60,
        label: "shape hold s",
      });
      air.addBinding(params, "drift", { min: 0, max: 4 });
      air.addBinding(params, "grain", { min: 0, max: 2 });

      const arrive = pane.addFolder({ title: "arriving and leaving" });
      arrive.addBinding(params, "blur", { min: 0, max: 140, label: "blur px" });
      arrive.addBinding(params, "approachSeconds", {
        min: 0,
        max: 10,
        label: "leak-in s",
      });
      arrive.addBinding(params, "snap", { min: 40, max: 900 });
      arrive.addBinding(params, "settle", { min: 6, max: 60 });
      arrive.addBinding(params, "residue", { min: 0, max: 0.5 });
      arrive.addBinding(params, "residueSeconds", {
        min: 1,
        max: 60,
        label: "residue s",
      });

      const show = pane.addFolder({ title: "show" });
      show.addBinding(params, "auto", { label: "runs itself" });
      show.addBinding(params, "gapSeconds", {
        min: 1,
        max: 30,
        label: "gap s",
      });
      for (const study of studies.filter((s) => s.selfStarting)) {
        show
          .addButton({ title: `play: ${study.title.toLowerCase()}` })
          .on("click", () => controls.play(study.id));
      }
      show.addButton({ title: "let go" }).on("click", controls.release);

      pane.addButton({ title: "copy settings" }).on("click", () => {
        navigator.clipboard?.writeText(JSON.stringify(params, null, 2));
      });
      pane.addButton({ title: "reset" }).on("click", () => {
        resetParams();
        pane.refresh();
      });

      pane.on("change", saveParams);
      dispose = () => pane.dispose();
    });

    return () => {
      disposed = true;
      dispose();
    };
  }, [controls]);

  return <div ref={containerRef} className={styles.panel} data-lab-panel />;
}
