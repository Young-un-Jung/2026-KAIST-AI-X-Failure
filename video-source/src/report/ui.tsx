import { interpolate, useCurrentFrame } from "remotion";
import { mono, rc } from "./theme";

// Characters revealed one by one, terminal-style, with a block cursor.
export const Typewriter: React.FC<{
  text: string;
  delay?: number;
  charsPerFrame?: number;
  cursor?: boolean;
  style?: React.CSSProperties;
}> = ({ text, delay = 0, charsPerFrame = 0.8, cursor = true, style }) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - delay);
  const shown = Math.min(text.length, Math.floor(local * charsPerFrame));
  const done = shown >= text.length;
  const blink = Math.floor(frame / 15) % 2 === 0;

  if (frame < delay) {
    return null;
  }

  return (
    <div style={{ fontFamily: mono, whiteSpace: "pre-wrap", ...style }}>
      {text.slice(0, shown)}
      {cursor && (!done || blink) ? (
        <span style={{ opacity: done && !blink ? 0 : 1 }}>▌</span>
      ) : null}
    </div>
  );
};

// Simple appear-at-frame wrapper with a 6-frame fade, for log rows.
export const Appear: React.FC<{
  at: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ at, children, style }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [at, at + 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (frame < at) {
    return null;
  }
  return <div style={{ opacity, ...style }}>{children}</div>;
};

export const StatusChip: React.FC<{
  label: string;
  color?: string;
}> = ({ label, color = rc.green }) => (
  <span
    style={{
      fontFamily: mono,
      fontSize: 26,
      color,
      border: `2px solid ${color}`,
      borderRadius: 6,
      padding: "2px 14px",
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </span>
);

// Black redaction bar covering hidden content.
export const Redacted: React.FC<{ width: number }> = ({ width }) => (
  <span
    style={{
      display: "inline-block",
      width,
      height: "0.95em",
      backgroundColor: rc.redact,
      border: `1px solid ${rc.line}`,
      verticalAlign: "middle",
      borderRadius: 2,
    }}
  />
);

export const PanelHeader: React.FC<{ title: string; right?: string }> = ({
  title,
  right,
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      borderBottom: `2px solid ${rc.line}`,
      paddingBottom: 14,
      marginBottom: 28,
    }}
  >
    <div
      style={{
        fontFamily: mono,
        fontSize: 34,
        fontWeight: 700,
        color: rc.cream,
        letterSpacing: 2,
      }}
    >
      {title}
    </div>
    {right ? (
      <div style={{ fontFamily: mono, fontSize: 24, color: rc.creamDim }}>
        {right}
      </div>
    ) : null}
  </div>
);

// Full-frame navy backdrop with faint scanline texture.
export const ReportBackdrop: React.FC<{ bg?: string }> = ({ bg = rc.navy }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundColor: bg,
      backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px)`,
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        boxShadow: `inset 0 0 320px 120px rgba(3,6,16,0.55)`,
      }}
    />
  </div>
);
