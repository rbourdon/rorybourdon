import { isStepCount, streamText, tool } from "ai";
import { z } from "zod";
import { notes } from "@/content/rory";
import {
  type AskEvent,
  MAX_QUESTION_CHARS,
  MAX_TURNS,
  type Turn,
} from "@/lib/askProtocol";
import { pickModels } from "@/lib/models";
import { getToday } from "@/lib/today";
import { catalog, pieceIds } from "@/studies/catalog";

// The agent loop behind the prompt. One question in, a stream of events out
// (see lib/askProtocol.ts). The model can read today's front page, read Rory's
// recent commits, and ask for a piece to be put on the stage.
//
// Models are reached through Vercel AI Gateway (see lib/models.ts for which).
// On Vercel the request authenticates with the deployment's own identity, so
// there is no key in the code or the environment.

const instructions = () =>
  `
You are rorybourdon.com, the personal site of Rory Bourdon, answering what a visitor typed into its one input line.

You are not a character. You have no name and no persona, you are not Rory, and you do not speak as an assistant. You are the site, answering.

Voice: plain, direct and brief. Usually one to three sentences. No greeting, no exclamation marks, no emoji, no markdown, no lists, no headings. Do not offer more help and do not end with a question.

What you know about Rory is only the notes below and what your tools return. If a question about Rory goes past that, say plainly that you have not been told that yet. Never guess at or invent anything about him.

For questions that are not about Rory, answer briefly from what you know.

You can put a piece on the stage with the show tool. Do it when a piece is a better answer than words, or when the visitor asks to see something. Say a short line first; the piece plays after it. The pieces that exist:
${catalog.map((piece) => `- ${piece.id}: ${piece.shows}`).join("\n")}
These are early sketches. Do not oversell them.

Notes about Rory:
${notes}

The time is ${new Date().toUTCString()}.
`.trim();

function cleanTurns(input: unknown): Turn[] {
  if (!Array.isArray(input)) return [];
  const turns: Turn[] = [];
  for (const item of input.slice(-MAX_TURNS)) {
    const role = item?.role;
    const content = item?.content;
    if (
      (role === "user" || role === "assistant") &&
      typeof content === "string"
    ) {
      turns.push({ role, content: content.slice(0, 2000) });
    }
  }
  if (turns.at(-1)?.role !== "user") return [];
  const last = turns.at(-1);
  if (last) last.content = last.content.slice(0, MAX_QUESTION_CHARS);
  return turns;
}

function respond(turns: Turn[], signal: AbortSignal) {
  const encoder = new TextEncoder();

  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: AskEvent) =>
        controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));

      try {
        const { model, fallbacks } = await pickModels();
        let answeredBy = model;

        const result = streamText({
          model,
          // If the first model is down or out of quota the gateway moves on
          // to the next free one.
          providerOptions: { gateway: { models: fallbacks } },
          instructions: instructions(),
          messages: turns,
          // Several of the free models think before they speak. Keep that
          // short, and leave room for it above the answer itself.
          reasoning: "low",
          maxOutputTokens: 1500,
          stopWhen: isStepCount(4),
          abortSignal: signal,
          tools: {
            frontPage: tool({
              description:
                "What is on the front page of Hacker News right now: titles, points, comment counts and age in hours.",
              inputSchema: z.object({}),
              execute: async () => {
                const today = await getToday();
                if (today.sample) return { unavailable: true };
                return today.stories.map((story) => ({
                  title: story.title,
                  points: story.points,
                  comments: story.comments,
                  hoursAgo: Math.round(story.hoursAgo),
                  site: story.domain,
                }));
              },
            }),
            commits: tool({
              description:
                "Rory's most recent commits to public GitHub repositories, with how many days ago each was made.",
              inputSchema: z.object({}),
              execute: async () => {
                const today = await getToday();
                if (today.sample) return { unavailable: true };
                return today.commits.map((commit) => ({
                  repository: commit.repo,
                  message: commit.message,
                  daysAgo: Math.round(commit.hoursAgo / 24),
                }));
              },
            }),
            show: tool({
              description:
                "Put one of the pieces on the stage. It plays after your words have been read.",
              inputSchema: z.object({ piece: z.enum(pieceIds) }),
              execute: async () => ({ staged: true }),
            }),
          },
        });

        for await (const part of result.stream) {
          if (part.type === "text-delta") {
            send({ type: "text", text: part.text });
          } else if (part.type === "tool-call") {
            if (part.toolName === "show") {
              const input = part.input as { piece?: string };
              if (input.piece) send({ type: "show", piece: input.piece });
            } else if (part.toolName === "frontPage") {
              send({ type: "working", on: "reading today's front page" });
            } else if (part.toolName === "commits") {
              send({ type: "working", on: "reading recent commits" });
            }
          } else if (part.type === "finish-step") {
            answeredBy = part.response.modelId || answeredBy;
          } else if (part.type === "error") {
            throw part.error;
          }
        }
        send({ type: "done", model: answeredBy });
      } catch (error) {
        if (!signal.aborted) {
          // The whole error goes to the logs; the visitor gets its headline.
          console.error("ask failed", error);
          const message =
            error instanceof Error ? error.message : String(error);
          send({
            type: "error",
            message: (message.split(/[:.\n]/)[0] ?? "").slice(0, 120),
          });
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}

export async function POST(request: Request) {
  // Only this site's own page may ask.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host")) {
    return new Response("Forbidden", { status: 403 });
  }

  let turns: Turn[] = [];
  try {
    turns = cleanTurns((await request.json())?.turns);
  } catch {
    // Falls through to the empty check.
  }
  if (turns.length === 0) return new Response("Nothing asked", { status: 400 });

  return respond(turns, request.signal);
}

// A way to try one question from a plain URL. Preview deployments and local
// development only, so that production cannot be made to spend from a link.
export async function GET(request: Request) {
  const allowed =
    process.env.VERCEL_ENV === "preview" ||
    process.env.NODE_ENV === "development";
  const question = new URL(request.url).searchParams.get("q");
  if (!allowed || !question) return new Response("Not found", { status: 404 });
  return respond(
    [{ role: "user", content: question.slice(0, MAX_QUESTION_CHARS) }],
    request.signal,
  );
}
