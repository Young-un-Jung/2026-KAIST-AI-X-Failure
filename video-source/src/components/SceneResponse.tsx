import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "./Backdrop";
import { EnterText } from "./EnterText";
import { LineMotif, MOTIFS } from "./LineMotif";
import { NarrationAudio } from "./NarrationAudio";
import { PunchHeadline } from "./PunchHeadline";
import { colors } from "../theme";

export const SceneResponse: React.FC = () => {
  const frame = useCurrentFrame();
  const toneShift = interpolate(frame, [0, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <NarrationAudio file="response.mp3" delay={32} />
      <Backdrop accent={colors.problemAccent} />
      <AbsoluteFill style={{ opacity: toneShift }}>
        <Backdrop accent={colors.solutionAccent} />
      </AbsoluteFill>
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
            gap: 22,
            maxWidth: 1300,
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          <LineMotif
            d={MOTIFS.connector}
            delay={10}
            size={200}
            color={colors.solutionAccent}
          />
          <EnterText
            delay={30}
            style={{
              fontSize: 30,
              letterSpacing: 5,
              color: colors.solutionAccent,
              fontWeight: 700,
            }}
          >
            대응 방안
          </EnterText>
          <PunchHeadline
            delay={40}
            stagger={4}
            lines={["AI는 상담사가 아니라", "연결자여야 한다"]}
            style={{
              fontSize: 74,
              lineHeight: 1.35,
              color: colors.text,
              fontWeight: 700,
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
