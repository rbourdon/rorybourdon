import dynamic from "next/dynamic";
import type { StudyDef } from "@/stage/types";

// The show is whatever is in this list. To add a piece, make a folder beside
// this file with a component that takes StudyProps, and add an entry here.
// To kill one, delete its entry.

export const studies: StudyDef[] = [
  {
    id: "rectangles",
    title: "Today, in rectangles",
    question:
      "Can real material and one shape carry a piece with almost no type?",
    maxSeconds: 22,
    Component: dynamic(() => import("./rectangles/Rectangles"), { ssr: false }),
  },
  {
    id: "operator",
    title: "An interface that operates itself",
    question:
      "Is generated UI more interesting as the performer than as the furniture?",
    maxSeconds: 26,
    Component: dynamic(() => import("./operator/Operator"), { ssr: false }),
  },
];
