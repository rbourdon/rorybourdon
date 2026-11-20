import type { ComponentType } from "react";
import type { Today } from "@/lib/today";

/**
 * What every piece is handed. A piece never animates its own arrival or exit:
 * the stage pulls it into focus and lets it fall back into the air.
 */
export interface StudyProps {
  /**
   * False while the piece is leaking in out of focus, and again once it has let
   * go. A piece draws a still first frame while false and only performs while
   * true.
   */
  active: boolean;
  /** Different every run. Use it for anything that should not repeat. */
  seed: number;
  /** What the visitor last typed, if anything. Raw material, not a command. */
  query: string | null;
  /** What is happening today. More raw material. */
  today: Today;
  /** Call when the piece has said what it has to say. */
  onDone: () => void;
  /** Hand the stage to another piece, by id. */
  show: (studyId: string) => void;
}

export interface StudyDef {
  id: string;
  title: string;
  /** One line on what this sketch is trying to find out. */
  question: string;
  /** Seconds before the stage takes the piece off regardless. */
  maxSeconds: number;
  /**
   * Whether the show may put this piece on by itself. The answer to a
   * question, for one, only ever appears because something was asked.
   */
  selfStarting: boolean;
  /** Whether the piece stays up while the visitor types their next line. */
  staysWhileTyping: boolean;
  Component: ComponentType<StudyProps>;
}
