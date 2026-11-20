"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { stir } from "./params";
import styles from "./stage.module.css";

interface PromptProps {
  /** The visitor started a line. */
  onType: () => void;
  /** The visitor gave up on the line. */
  onClear: () => void;
  onSubmit: (text: string) => void;
}

/** The only fixed thing on the page: a cursor, and whatever you type at it. */
export default function Prompt({ onType, onClear, onSubmit }: PromptProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Typing anywhere lands here. There is nothing else to type into.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-lab-panel]")) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key.length === 1 && event.key !== "`") {
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, []);

  const change = (next: string) => {
    stir(0.2);
    if (text === "" && next !== "") onType();
    if (text !== "" && next === "") onClear();
    setText(next);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const line = text.trim();
    if (!line) return;
    setText("");
    onSubmit(line);
  };

  return (
    <form className={styles.prompt} onSubmit={submit}>
      <span className={styles.echo}>{text}</span>
      <span className={styles.cursor} aria-hidden />
      <input
        ref={inputRef}
        className={styles.input}
        value={text}
        onChange={(event) => change(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") change("");
        }}
        aria-label="Ask something"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        enterKeyHint="go"
      />
    </form>
  );
}
