"use client";

import { useEffect, useRef, useState } from "react";
import { ask } from "@/lib/ask";
import type { StudyProps } from "@/stage/types";
import styles from "./answer.module.css";

// The site answering what was typed. Not a chat bubble: the words arrive in
// the in-between space itself, in the same voice as the prompt, and stay
// until the next thing is asked.

interface Reply {
  text: string;
  working: string | null;
  error: string | null;
  model: string | null;
  finished: boolean;
}

const empty: Reply = {
  text: "",
  working: null,
  error: null,
  model: null,
  finished: false,
};

export default function Answer({ active, query, show }: StudyProps) {
  const [reply, setReply] = useState<Reply>(empty);
  const stop = useRef<() => void>(() => {});
  const wasActive = useRef(false);

  // Once the stage has taken this answer off, it stops: no more words, and no
  // piece staged on behalf of a question that has been moved on from.
  useEffect(() => {
    if (active) wasActive.current = true;
    else if (wasActive.current) stop.current();
  }, [active]);

  useEffect(() => {
    if (!query) return;
    const abort = new AbortController();
    let piece: string | null = null;
    let words = 0;
    let later: number | undefined;

    (async () => {
      for await (const event of ask(query, abort.signal)) {
        if (event.type === "text") {
          words += event.text.split(/\s+/).length - 1;
          setReply((r) => ({ ...r, text: r.text + event.text, working: null }));
        } else if (event.type === "working") {
          setReply((r) => ({ ...r, working: event.on }));
        } else if (event.type === "show") {
          piece = event.piece;
        } else if (event.type === "error") {
          setReply((r) => ({ ...r, error: event.message, finished: true }));
        } else {
          setReply((r) => ({ ...r, model: event.model, finished: true }));
        }
      }
      // If the agent asked for a piece, give the words time to be read first.
      if (piece && !abort.signal.aborted) {
        const staged = piece;
        const readingMs = Math.min(1400 + words * 230, 7000);
        later = window.setTimeout(() => show(staged), readingMs);
      }
    })();

    stop.current = () => {
      abort.abort();
      window.clearTimeout(later);
    };
    return () => stop.current();
  }, [query, show]);

  return (
    <div className={styles.root}>
      <div className={styles.block} aria-live="polite">
        <p className={styles.asked}>{query}</p>
        <p className={styles.said}>
          {reply.text}
          {!reply.finished && <span className={styles.cursor} aria-hidden />}
        </p>
        {reply.working && !reply.text && (
          <p className={styles.aside}>{reply.working}</p>
        )}
        {reply.error && (
          <p className={styles.aside}>could not answer: {reply.error}</p>
        )}
        {reply.model && <p className={styles.aside}>{reply.model}</p>}
      </div>
    </div>
  );
}
