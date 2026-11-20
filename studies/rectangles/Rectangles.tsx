"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { hashString, pick, rng } from "@/lib/random";
import { useElementSize } from "@/lib/useElementSize";
import type { StudyProps } from "@/stage/types";
import {
  columns,
  grid,
  type Item,
  type Layout,
  line,
  timeline,
  treemap,
} from "./layouts";
import styles from "./rectangles.module.css";

// SKETCH. Today's front page and Rory's recent commits as one set of
// rectangles that is rearranged on a beat. Nothing is added or removed between
// arrangements; the same boxes become a treemap, a bar chart, a timeline.

const BEAT_SECONDS = 2.3;

interface Look {
  background: string;
  ink: string;
  accent: string;
  fills: string[];
  radius: number;
  gap: number;
}

/** A fresh look every run: the piece has no fixed style of its own. */
function makeLook(random: () => number): Look {
  const hue = Math.floor(random() * 360);
  const kind = pick(["ink", "night", "primary", "tint"] as const, random);
  const radius = pick([0, 0, 3, 14], random);
  const gap = pick([1, 2, 4, 8], random);

  if (kind === "ink") {
    return {
      background: "oklch(0.95 0.008 90)",
      ink: "oklch(0.2 0 0)",
      accent: `oklch(0.64 0.24 ${hue})`,
      fills: [0.2, 0.34, 0.5, 0.66, 0.8].map((l) => `oklch(${l} 0 0)`),
      radius,
      gap,
    };
  }
  if (kind === "night") {
    // One hue family from deep to pale, lit by its opposite.
    return {
      background: `oklch(0.15 0.02 ${hue})`,
      ink: "oklch(0.97 0 0)",
      accent: `oklch(0.9 0.17 ${(hue + 180) % 360})`,
      fills: [0.3, 0.42, 0.55, 0.68, 0.8].map(
        (l, i) => `oklch(${l} ${0.07 + i * 0.02} ${(hue + i * 6) % 360})`,
      ),
      radius,
      gap,
    };
  }
  if (kind === "primary") {
    return {
      background: "oklch(0.985 0 0)",
      ink: "oklch(0.15 0 0)",
      accent: "oklch(0.15 0 0)",
      fills: [0, 90, 180, 270].map(
        (shift) => `oklch(0.72 0.19 ${(hue + shift) % 360})`,
      ),
      radius,
      gap,
    };
  }
  return {
    background: `oklch(0.93 0.035 ${hue})`,
    ink: `oklch(0.24 0.06 ${hue})`,
    accent: `oklch(0.7 0.21 ${(hue + 180) % 360})`,
    fills: [0.36, 0.48, 0.6, 0.72, 0.82].map((l) => `oklch(${l} 0.13 ${hue})`),
    radius,
    gap,
  };
}

/** Black or white, whichever reads on the given oklch() fill. */
function inkOn(fill: string) {
  const lightness = Number.parseFloat(fill.slice(fill.indexOf("(") + 1));
  return lightness > 0.62 ? "oklch(0.16 0 0)" : "oklch(0.98 0 0)";
}

const BEATS = [
  { name: "sized by points", build: "treemapPoints" },
  { name: "ranked", build: "columns" },
  { name: "the last day, ending now", build: "timeline" },
  { name: "all equal", build: "grid" },
  { name: "sized by argument", build: "treemapComments" },
  { name: "", build: "line" },
] as const;

export default function Rectangles({
  active,
  seed,
  query,
  today,
  onDone,
}: StudyProps) {
  const [ref, size] = useElementSize<HTMLDivElement>();
  const [beat, setBeat] = useState(0);

  const look = useMemo(
    () => makeLook(rng(query ? hashString(query) : seed)),
    [seed, query],
  );

  const items = useMemo<Item[]>(() => {
    const stories = today.stories.map((story) => ({
      ...story,
      kind: "story" as const,
    }));
    // A commit has no score of its own, so it borrows a middling one.
    const sortedPoints = stories.map((s) => s.points).sort((a, b) => a - b);
    const typical = sortedPoints[Math.floor(sortedPoints.length / 2)] ?? 100;
    const commits = today.commits.map((commit) => ({
      id: commit.id,
      kind: "commit" as const,
      title: `${commit.repo}: ${commit.message}`,
      points: typical,
      comments: 0,
      hoursAgo: commit.hoursAgo,
      domain: "github.com",
    }));
    return [...stories, ...commits];
  }, [today]);

  const words = useMemo(
    () =>
      (query ?? "")
        .toLowerCase()
        .split(/\W+/)
        .filter((word) => word.length > 2),
    [query],
  );

  const layout = useMemo<Layout>(() => {
    const { width, height } = size;
    if (width === 0 || height === 0) return {};
    switch (BEATS[beat]?.build) {
      case "columns":
        return columns(items, width, height);
      case "timeline":
        return timeline(items, width, height);
      case "grid":
        return grid(items, width, height);
      case "treemapComments":
        return treemap(
          items.map((item) => ({ id: item.id, weight: item.comments + 12 })),
          width,
          height,
        );
      case "line":
        return line(items, width, height);
      default:
        return treemap(
          items.map((item) => ({ id: item.id, weight: item.points ** 0.8 })),
          width,
          height,
        );
    }
  }, [beat, items, size]);

  // Step through the arrangements on a beat, then say we are done.
  useEffect(() => {
    if (!active) return;
    const last = BEATS.length - 1;
    if (beat >= last) {
      const end = window.setTimeout(onDone, 900);
      return () => window.clearTimeout(end);
    }
    const next = window.setTimeout(
      () => setBeat((value) => value + 1),
      BEAT_SECONDS * 1000,
    );
    return () => window.clearTimeout(next);
  }, [active, beat, onDone]);

  const flat = BEATS[beat]?.build === "line";

  return (
    <div
      className={styles.root}
      style={{ background: look.background, color: look.ink }}
    >
      <div ref={ref} className={styles.field}>
        {items.map((item, i) => {
          const box = layout[item.id];
          if (!box) return null;
          const inset = flat ? 0 : look.gap / 2;
          const width = Math.max(1, box.w - inset * 2);
          const height = Math.max(1, box.h - inset * 2);
          const matches =
            words.length > 0 &&
            words.some((word) => item.title.toLowerCase().includes(word));
          const highlighted = item.kind === "commit" || matches;
          const fill = highlighted
            ? look.accent
            : look.fills[hashString(item.domain) % look.fills.length];
          const roomForLabel = width > 150 && height > 54;
          return (
            <motion.div
              key={item.id}
              className={styles.box}
              style={{
                background: fill,
                borderRadius: Math.min(look.radius, height / 2),
              }}
              initial={false}
              animate={{ x: box.x + inset, y: box.y + inset, width, height }}
              transition={{
                type: "spring",
                stiffness: 480,
                damping: 36,
                delay: i * 0.007,
              }}
            >
              {roomForLabel && (
                <span
                  className={styles.label}
                  style={{ color: inkOn(fill ?? look.accent) }}
                >
                  {item.title}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      <p className={styles.caption}>
        {BEATS[beat]?.name}
        {today.sample && " · stand-in data"}
      </p>
    </div>
  );
}
