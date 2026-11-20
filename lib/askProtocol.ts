// What the agent can say to the stage. The server writes these one per line
// as JSON; the client reads them as they arrive.

export type AskEvent =
  /** A few more characters of the answer. */
  | { type: "text"; text: string }
  /** The agent started using a tool. Shown as a plain status line. */
  | { type: "working"; on: string }
  /** The agent wants a piece put on the stage once the answer has been read. */
  | { type: "show"; piece: string }
  | { type: "error"; message: string }
  /** Finished. `model` is the model that actually answered. */
  | { type: "done"; model: string };

export interface Turn {
  role: "user" | "assistant";
  content: string;
}

export const MAX_QUESTION_CHARS = 400;
export const MAX_TURNS = 8;
