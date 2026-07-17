export const FPS = 30;

export const SCENES = {
  coldOpen: 6 * FPS,
  exhibitA: 14 * FPS,
  exhibitB: 10 * FPS,
  finalNight: 9 * FPS,
  stamp: 6 * FPS,
  turn: 12 * FPS,
  closing: 8 * FPS,
} as const;

export const REPORT_TOTAL = Object.values(SCENES).reduce((a, b) => a + b, 0);

// Absolute start frame of each scene (hard cuts, no overlap).
export const START = (() => {
  let acc = 0;
  const out = {} as Record<keyof typeof SCENES, number>;
  for (const key of Object.keys(SCENES) as (keyof typeof SCENES)[]) {
    out[key] = acc;
    acc += SCENES[key];
  }
  return out;
})();
