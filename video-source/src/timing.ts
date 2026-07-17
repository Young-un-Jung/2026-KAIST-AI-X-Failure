export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const TRANSITION_FRAMES = 15;

export const SCENE_DURATIONS = {
  hook: 5 * FPS,
  diagnosis1: 10 * FPS,
  diagnosis2: 10 * FPS,
  diagnosis3: 10 * FPS,
  response: 10 * FPS,
  closing: 6 * FPS,
} as const;

const sceneList = Object.values(SCENE_DURATIONS);
const transitionCount = sceneList.length - 1;

export const TOTAL_DURATION =
  sceneList.reduce((a, b) => a + b, 0) - transitionCount * TRANSITION_FRAMES;
