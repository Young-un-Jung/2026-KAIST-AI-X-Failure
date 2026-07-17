import { AbsoluteFill } from "remotion";
import { Backdrop } from "./Backdrop";
import { EnterText } from "./EnterText";
import { NarrationAudio } from "./NarrationAudio";
import { PunchHeadline } from "./PunchHeadline";
import { colors } from "../theme";

export const SceneClosing: React.FC = () => {
  return (
    <AbsoluteFill>
      <NarrationAudio file="closing.mp3" delay={4} />
      <Backdrop accent={colors.solutionAccent} vignette={0.6} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 40,
            maxWidth: 1300,
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          <PunchHeadline
            delay={4}
            stagger={4}
            lines={["완벽한 기술이 아니라,", "불완전한 관계다"]}
            style={{
              fontSize: 78,
              lineHeight: 1.35,
              color: colors.text,
              fontWeight: 700,
            }}
          />
          <EnterText
            delay={90}
            style={{
              fontSize: 26,
              letterSpacing: 3,
              color: colors.textDim,
              fontWeight: 500,
            }}
          >
            2026 KAIST AI x 실패 아이디어 공모전 · "미래에서 온 오답노트"
          </EnterText>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
