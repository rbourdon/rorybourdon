import type { AskEvent, Turn } from "./askProtocol";
import { MAX_TURNS } from "./askProtocol";

// The conversation so far. It lives for as long as the page does, so that a
// follow-up question is understood as one.
const turns: Turn[] = [];

function remember(turn: Turn) {
  turns.push(turn);
  if (turns.length > MAX_TURNS) turns.splice(0, turns.length - MAX_TURNS);
}

/** Ask the site something and get its reply as events, as they arrive. */
export async function* ask(
  question: string,
  signal: AbortSignal,
): AsyncGenerator<AskEvent> {
  remember({ role: "user", content: question });
  let answer = "";

  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ turns }),
      signal,
    });
    if (!res.ok || !res.body) {
      throw new Error(`The site answered ${res.status}`);
    }

    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
    let buffer = "";
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += value;
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.trim()) continue;
        const event = JSON.parse(line) as AskEvent;
        if (event.type === "text") answer += event.text;
        yield event;
      }
    }
  } catch (error) {
    if (!signal.aborted) {
      yield {
        type: "error",
        message: error instanceof Error ? error.message : String(error),
      };
    }
  } finally {
    // Keep the two sides of the conversation in step even when a reply was
    // cut short or failed.
    remember({ role: "assistant", content: answer || "(no reply)" });
  }
}
