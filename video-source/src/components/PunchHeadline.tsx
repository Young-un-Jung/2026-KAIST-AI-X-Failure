import { Easing, interpolate, useCurrentFrame } from "remotion";
import { fontFamily } from "../theme";

// Word-by-word kinetic reveal for headline moments: each word punches in
// with a slight scale-up + rise, staggered left to right, line by line.
export const PunchHeadline: React.FC<{
  lines: string[];
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
}> = ({ lines, delay = 0, stagger = 3, style }) => {
  const frame = useCurrentFrame();
  let wordIndex = 0;

  return (
    <div
      style={{
        fontFamily,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...style,
      }}
    >
      {lines.map((line, li) => (
        <div
          key={li}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0 0.28em",
          }}
        >
          {line.split(" ").map((word, wi) => {
            const idx = wordIndex;
            wordIndex += 1;
            const local = frame - (delay + idx * stagger);
            const opacity = interpolate(local, [0, 10], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            // Overshoot punch: scale past 1 then settle, instead of a plain ease-in.
            const scale = interpolate(local, [0, 9, 15], [0.5, 1.1, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.quad),
            });
            const rise = interpolate(local, [0, 12], [22, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            });

            return (
              <span
                key={wi}
                style={{
                  display: "inline-block",
                  opacity,
                  scale,
                  translate: `0px ${rise}px`,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};
