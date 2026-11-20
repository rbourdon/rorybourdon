// Ways to arrange the same set of rectangles. Every layout returns a box for
// every item, so moving between layouts never adds or removes anything.

export interface Item {
  id: string;
  kind: "story" | "commit";
  title: string;
  points: number;
  comments: number;
  hoursAgo: number;
  domain: string;
}

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type Layout = Record<string, Box>;

interface Weighted {
  id: string;
  weight: number;
}

/** Squarified treemap (Bruls, Huizing, van Wijk). */
export function treemap(
  items: Weighted[],
  width: number,
  height: number,
): Layout {
  const out: Layout = {};
  const sorted = [...items].sort((a, b) => b.weight - a.weight);
  const total = sorted.reduce((sum, item) => sum + item.weight, 0) || 1;
  const areas = sorted.map((item) => ({
    id: item.id,
    area: (item.weight / total) * width * height,
  }));

  let x = 0;
  let y = 0;
  let w = width;
  let h = height;
  let row: typeof areas = [];

  const worst = (candidate: typeof areas, side: number) => {
    const sum = candidate.reduce((s, r) => s + r.area, 0);
    let max = 0;
    let min = Number.POSITIVE_INFINITY;
    for (const r of candidate) {
      max = Math.max(max, r.area);
      min = Math.min(min, r.area);
    }
    const s2 = sum * sum;
    const side2 = side * side;
    return Math.max((side2 * max) / s2, s2 / (side2 * min));
  };

  const flush = () => {
    const sum = row.reduce((s, r) => s + r.area, 0);
    if (w >= h) {
      // Lay the row out as a column on the left.
      const columnWidth = sum / h;
      let offset = y;
      for (const r of row) {
        const boxHeight = r.area / columnWidth;
        out[r.id] = { x, y: offset, w: columnWidth, h: boxHeight };
        offset += boxHeight;
      }
      x += columnWidth;
      w -= columnWidth;
    } else {
      const rowHeight = sum / w;
      let offset = x;
      for (const r of row) {
        const boxWidth = r.area / rowHeight;
        out[r.id] = { x: offset, y, w: boxWidth, h: rowHeight };
        offset += boxWidth;
      }
      y += rowHeight;
      h -= rowHeight;
    }
    row = [];
  };

  for (const next of areas) {
    const side = Math.min(w, h);
    if (row.length === 0 || worst([...row, next], side) <= worst(row, side)) {
      row.push(next);
    } else {
      flush();
      row.push(next);
    }
  }
  if (row.length > 0) flush();
  return out;
}

/** Bars standing on the floor, tallest first. */
export function columns(items: Item[], width: number, height: number): Layout {
  const out: Layout = {};
  const sorted = [...items].sort((a, b) => b.points - a.points);
  const max = Math.max(...sorted.map((item) => item.points), 1);
  const slot = width / sorted.length;
  sorted.forEach((item, i) => {
    const h = Math.max(6, (item.points / max) * height * 0.82);
    out[item.id] = { x: i * slot, y: height - h, w: slot, h };
  });
  return out;
}

/**
 * The last day, left to right, ending now. Width is how much people argued.
 * Anything older than a day waits at the left edge.
 */
export function timeline(items: Item[], width: number, height: number): Layout {
  const out: Layout = {};
  const DAY = 24;
  const sorted = [...items].sort((a, b) => b.hoursAgo - a.hoursAgo);
  const maxComments = Math.max(...sorted.map((item) => item.comments), 1);
  const lane = height / sorted.length;
  sorted.forEach((item, i) => {
    const w = Math.max(10, (item.comments / maxComments) * width * 0.34);
    const age = Math.min(item.hoursAgo, DAY) / DAY;
    out[item.id] = { x: (1 - age) * (width - w), y: i * lane, w, h: lane };
  });
  return out;
}

/** Everything the same size. */
export function grid(items: Item[], width: number, height: number): Layout {
  const out: Layout = {};
  const sorted = [...items].sort((a, b) => a.hoursAgo - b.hoursAgo);
  const cols = Math.ceil(Math.sqrt((sorted.length * width) / height));
  const rows = Math.ceil(sorted.length / cols);
  const cellW = width / cols;
  const cellH = height / rows;
  sorted.forEach((item, i) => {
    out[item.id] = {
      x: (i % cols) * cellW,
      y: Math.floor(i / cols) * cellH,
      w: cellW,
      h: cellH,
    };
  });
  return out;
}

/** Everything flattened into one line across the middle. */
export function line(items: Item[], width: number, height: number): Layout {
  const out: Layout = {};
  const slot = width / items.length;
  items.forEach((item, i) => {
    out[item.id] = { x: i * slot, y: height / 2 - 1, w: slot, h: 2 };
  });
  return out;
}
