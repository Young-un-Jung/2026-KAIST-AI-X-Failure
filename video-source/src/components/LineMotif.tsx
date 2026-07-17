import { Easing, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";

// A single consistent visual signature reused across scenes: a path draws
// itself in (stroke-dashoffset), then holds. Only the `d` data changes per scene.
export const LineMotif: React.FC<{
  d: string;
  delay?: number;
  drawFrames?: number;
  color?: string;
  size?: number;
}> = ({ d, delay = 0, drawFrames = 45, color = colors.problemAccent, size = 340 }) => {
  const frame = useCurrentFrame();
  const local = frame - delay;

  const progress = interpolate(local, [0, drawFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const opacity = interpolate(local, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{ opacity }}
    >
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={interpolate(progress, [0, 1], [1, 0])}
      />
    </svg>
  );
};

export const MOTIFS = {
  // 01 -- flat signal with two sharp spikes: the filter only catches the spikes,
  // not the long quiet accumulation between them.
  signal:
    "M 10 140 L 60 140 L 72 40 L 84 140 L 130 140 L 142 100 L 154 140 L 190 140",
  // 02 -- two overlapping speech-bubble outlines merging into one shape:
  // "counseling" and "just talking" look identical from outside.
  mask:
    "M 20 60 Q 20 30 55 30 L 130 30 Q 165 30 165 60 L 165 110 Q 165 140 130 140 L 70 140 L 40 170 L 45 140 L 55 140 Q 20 140 20 110 Z",
  // 03 -- a raised threshold/step the line cannot climb smoothly.
  threshold:
    "M 15 160 L 80 160 L 80 110 L 130 110 L 130 60 L 185 60",
  // response -- two nodes joined by a line: AI as connector, not endpoint.
  connector:
    "M 30 100 m -14,0 a 14,14 0 1,0 28,0 a 14,14 0 1,0 -28,0 M 58 100 L 142 100 M 170 100 m -14,0 a 14,14 0 1,0 28,0 a 14,14 0 1,0 -28,0",
} as const;
