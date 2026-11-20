import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { StudyDef, StudyProps } from "@/stage/types";
import { catalog, type PieceId } from "./catalog";

// The show is whatever is in ./catalog.ts. To add a piece, describe it there
// (that is what the agent reads), make a folder beside this file with a
// component that takes StudyProps, and add the component below. To kill one,
// delete its catalog entry and its line here.

const components: Record<PieceId, ComponentType<StudyProps>> = {
  rectangles: dynamic(() => import("./rectangles/Rectangles"), { ssr: false }),
  operator: dynamic(() => import("./operator/Operator"), { ssr: false }),
};

const maxSeconds: Record<PieceId, number> = {
  rectangles: 22,
  operator: 26,
};

export const studies: StudyDef[] = [
  // The site answering a typed line. Not in the catalog: the agent does not
  // choose to show it, it is how the agent speaks.
  {
    id: "answer",
    title: "Answer",
    question: "What does it look like when the site talks back?",
    maxSeconds: 900,
    selfStarting: false,
    staysWhileTyping: true,
    Component: dynamic(() => import("./answer/Answer"), { ssr: false }),
  },
  ...catalog.map((piece) => ({
    id: piece.id,
    title: piece.title,
    question: piece.question,
    maxSeconds: maxSeconds[piece.id],
    selfStarting: true,
    staysWhileTyping: false,
    Component: components[piece.id],
  })),
];
