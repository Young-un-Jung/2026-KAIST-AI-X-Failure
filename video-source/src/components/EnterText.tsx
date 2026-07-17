import { Easing, interpolate, useCurrentFrame } from "remotion";
import { fontFamily } from "../theme";

export const EnterText: React.FC<{
  children: React.ReactNode;
  delay?: number;
  durationFrames?: number;
  style?: React.CSSProperties;
  rise?: number;
}> = ({ children, delay = 0, durationFrames = 24, style, rise = 28 }) => {
  const frame = useCurrentFrame();
  const local = frame - delay;

  const progress = interpolate(local, [0, durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        fontFamily,
        opacity: progress,
        translate: `0px ${interpolate(progress, [0, 1], [rise, 0])}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
