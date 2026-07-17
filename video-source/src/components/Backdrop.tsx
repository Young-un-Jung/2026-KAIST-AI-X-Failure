import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";

// Static SVG feTurbulence noise, tiled and jittered per-frame at a coarse step
// to read as film grain without per-pixel WebGL cost.
const NOISE_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>
      <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter>
      <rect width='100%' height='100%' filter='url(#n)'/>
    </svg>`,
  );

export const Backdrop: React.FC<{
  accent?: string;
  vignette?: number;
}> = ({ accent = colors.problemAccent, vignette = 0.55 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const drift = interpolate(frame, [0, durationInFrames], [0, 24], {
    extrapolateRight: "clamp",
  });

  // Step the grain position every 2 frames so it flickers like film,
  // rather than smoothly sliding (which would look like a moving texture).
  const grainStep = Math.floor(frame / 2);
  const grainX = (grainStep * 37) % 240;
  const grainY = (grainStep * 59) % 240;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: colors.bg,
        backgroundImage: [
          `radial-gradient(ellipse at 20% 20%, ${accent}22, transparent 55%)`,
          `radial-gradient(circle, ${colors.line} 1px, transparent 1px)`,
        ].join(", "),
        backgroundSize: "auto, 48px 48px",
        backgroundPosition: `0 0, ${drift}px ${drift}px`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -60,
          backgroundImage: `url("${NOISE_URI}")`,
          backgroundSize: "240px 240px",
          backgroundPosition: `${-grainX}px ${-grainY}px`,
          opacity: 0.05,
          mixBlendMode: "overlay",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: `inset 0 0 260px ${vignette * 260}px ${colors.bg}`,
        }}
      />
    </div>
  );
};
