import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Appear } from "./ui";
import { sans, mono, rc } from "./theme";

export const SceneClosingWarm: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [200, 238], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #14224E 0%, #274176 45%, #B58A2C 100%)`,
      }}
    >
      <Sequence from={20} layout="none" name="Narration: closing">
        <Audio src={staticFile("audio/closing.mp3")} volume={1} />
      </Sequence>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 44,
            textAlign: "center",
            padding: "0 90px",
          }}
        >
          <Appear
            at={16}
            style={{
              fontFamily: sans,
              fontSize: 76,
              fontWeight: 700,
              color: rc.cream,
              lineHeight: 1.4,
            }}
          >
            인간을 회복시키는 것은
            <br />
            완벽한 기술이 아니라, 불완전한 관계다
          </Appear>
          <Appear
            at={120}
            style={{
              fontFamily: mono,
              fontSize: 26,
              letterSpacing: 3,
              color: rc.creamDim,
            }}
          >
            2026 KAIST AI x 실패 아이디어 공모전 · 미래에서 온 오답노트
          </Appear>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: `rgba(3,6,16,${fadeOut})` }} />
    </AbsoluteFill>
  );
};
