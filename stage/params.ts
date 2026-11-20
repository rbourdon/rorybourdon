// Every number worth arguing about lives here. The lab panel edits this object
// in place; the atmosphere and the stage read it live, so a tweak shows up on
// the next frame without a reload.

export const defaults = {
  // The in-between space
  tone: 0.1, // 0 is a dark room, 1 is white fog
  dust: 0.55, // how much dust is in the air
  dustSize: 1,
  light: 0.85, // strength of the light falling through the space
  lightAngle: -0.95, // radians
  scenes: 0.8, // strength of the big out-of-focus shapes
  sceneSeconds: 16, // how long one arrangement of shapes holds
  drift: 1, // overall speed of the air
  grain: 0.5,

  // A piece arriving and leaving
  blur: 64, // px of blur at zero presence
  approachSeconds: 3, // how long the next piece leaks in before it lands
  snap: 300, // spring stiffness of the focus pull
  settle: 30, // spring damping of the focus pull
  residue: 0.2, // presence a piece falls back to when it lets go
  residueSeconds: 16, // how long that residue takes to become nothing

  // The show. Off by default: until there are pieces worth showing unasked,
  // the page rests in the in-between and waits to be spoken to.
  auto: false,
  gapSeconds: 6, // quiet time between pieces
};

export type Params = typeof defaults;
export type ParamKey = keyof Params;

export const params: Params = { ...defaults };

const STORAGE_KEY = "lab.params.v2";
const listeners = new Set<() => void>();

export function loadParams() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    for (const key of Object.keys(defaults) as ParamKey[]) {
      if (typeof saved[key] === typeof defaults[key]) {
        (params[key] as Params[ParamKey]) = saved[key];
      }
    }
  } catch {
    // Storage is a convenience; the defaults are fine without it.
  }
}

export function saveParams() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  } catch {
    // See loadParams.
  }
  for (const listener of listeners) listener();
}

export function resetParams() {
  Object.assign(params, defaults);
  saveParams();
}

export function onParamsChange(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// Things the visitor does that the air should feel. Written by input handlers,
// read and decayed by the atmosphere every frame.
export const signals = {
  stir: 0, // 0..1, bumped by typing and fast pointer movement
  pointerX: 0, // -1..1
  pointerY: 0, // -1..1
};

export function stir(amount: number) {
  signals.stir = Math.min(1, signals.stir + amount);
}
