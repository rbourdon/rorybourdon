# rorybourdon.com, in the lab

The next rorybourdon.com, at the stage where ideas are tried and kept or
killed. Nothing here is settled.

The site this replaces (built in 2021, ported to TypeScript and Next.js 16 in
2026) is the last commit on `main` before this work merged, and stays in the
history.

```
npm install
npm run dev
```

## What is here

**The in-between** (`stage/Atmosphere.tsx`, `stage/atmosphereShader.ts`). A
neutral space with no color and nothing in focus: far soft shapes, light, dust,
grain. It is always running. Everything else happens in it.

**The stage** (`stage/Stage.tsx`, `stage/Layer.tsx`). A piece never animates its
own arrival or exit. The stage gives each piece one number, its presence. At 0
it is dust; at 1 it is sharp and in color. A piece leaks in out of focus, snaps
into focus, and when it lets go it falls back to a blur that takes a while to
become nothing.

**The director** (`stage/director.ts`). Decides what goes on and when. By
default nothing plays unasked: the page rests in the in-between. "runs itself"
in the panel turns on a timer that plays the pieces in turn.

**The prompt** (`stage/Prompt.tsx`). The only fixed interface. Pressing enter
asks the site, and the answer arrives in the in-between itself
(`studies/answer`).

**The agent** (`app/api/ask/route.ts`). A tool loop that can read today's front
page, read Rory's recent commits, and ask for a piece to be put on the stage.
It streams a small set of events to the page (`lib/askProtocol.ts`). What it
knows about Rory is `content/rory.ts` and nothing else; it is told to say so
rather than guess.

**The models** (`lib/models.ts`). Requests go through Vercel AI Gateway and
rotate through whichever language models are free there at the moment, read
from the gateway's public catalog. Each answer says which model gave it. Set
`AI_GATEWAY_MODEL` to pin one. On Vercel there is no key: the deployment
authenticates as itself. Locally, link the project and `vercel env pull`.

**Today** (`lib/today.ts`). The front page of Hacker News and Rory's recent
public commits, fetched on the server and cached for an hour. If the network is
not there it falls back to stand-in data and the piece says so.

## Pieces

Pieces live in `studies/`. Both of the current ones are sketches, here to test
the stage and to be argued with.

- `rectangles`: today's stories and commits as one set of rectangles that is
  rearranged on a beat. Nothing is added or removed between arrangements.
- `operator`: a control panel and a specimen interface drawn from the same
  eight design tokens, and a cursor that works the controls.

To add one, describe it in `studies/catalog.ts` (that description is what the
agent reads), make a folder in `studies/` with a component that takes
`StudyProps` (`stage/types.ts`), and add the component in `studies/index.ts`.
To kill one, remove it from both.

## The panel

Press the backtick key, or the word "lab" in the corner. Every slider edits
`stage/params.ts` live and is remembered in the browser. "copy settings" puts
the current values on the clipboard as JSON, which is the easy way to hand a
good set back to be made the default.
