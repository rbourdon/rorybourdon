import { cacheLife } from "next/cache";

// Which models answer. The site rotates through whatever Vercel AI Gateway is
// giving away at the moment: language models that cost nothing in or out and
// can call tools. That list changes as providers add and withdraw free tiers,
// so it is read from the gateway's public catalog rather than written down.

// Free at the time of writing. Used only if the catalog cannot be read.
const KNOWN_FREE = [
  "nvidia/nemotron-3.5-lightning-free",
  "reflection/beam-free",
];

interface CatalogModel {
  id: string;
  type?: string;
  tags?: string[];
  pricing?: { input?: string | number; output?: string | number };
}

export async function freeModels(): Promise<string[]> {
  "use cache";
  try {
    const res = await fetch("https://ai-gateway.vercel.sh/v1/models");
    if (!res.ok) throw new Error(`The model catalog answered ${res.status}`);
    const body = (await res.json()) as { data?: CatalogModel[] };
    const free = (body.data ?? [])
      .filter(
        (model) =>
          model.type === "language" &&
          model.tags?.includes("tool-use") &&
          model.pricing?.input !== undefined &&
          model.pricing?.output !== undefined &&
          Number(model.pricing.input) === 0 &&
          Number(model.pricing.output) === 0,
      )
      .map((model) => model.id);
    if (free.length === 0) throw new Error("Nothing is free right now");
    cacheLife("hours");
    return free;
  } catch {
    // Try again soon rather than living with the fallback for an hour.
    cacheLife({ stale: 60, revalidate: 60, expire: 600 });
    return KNOWN_FREE;
  }
}

/**
 * The model for one request and the ones to fall back to, in order. Each
 * request starts somewhere different in the list, so over many requests every
 * free model takes a turn at going first.
 */
export async function pickModels() {
  const pinned = process.env.AI_GATEWAY_MODEL;
  if (pinned) return { model: pinned, fallbacks: [] as string[] };

  const free = await freeModels();
  const start = Math.floor(Math.random() * free.length);
  const order = [...free.slice(start), ...free.slice(0, start)];
  return { model: order[0] as string, fallbacks: order.slice(1) };
}
