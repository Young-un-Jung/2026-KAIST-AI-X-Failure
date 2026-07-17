import { AbsoluteFill } from "remotion";
import { Backdrop } from "./Backdrop";
import { EnterText } from "./EnterText";
import { LineMotif } from "./LineMotif";
import { NarrationAudio } from "./NarrationAudio";
import { PunchHeadline } from "./PunchHeadline";
import { colors } from "../theme";

export const SceneDiagnosis: React.FC<{
  index: string;
  heading: string;
  body: string;
  motif: string;
  audioFile: string;
}> = ({ index, heading, body, motif, audioFile }) => {
  return (
    <AbsoluteFill>
      <NarrationAudio file={audioFile} delay={36} />
      <Backdrop accent={colors.problemAccent} />
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
            gap: 20,
            maxWidth: 1300,
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          <LineMotif d={motif} delay={0} size={200} />
          <EnterText
            delay={12}
            style={{
              fontSize: 30,
              letterSpacing: 5,
              color: colors.problemAccent,
              fontWeight: 700,
            }}
          >
            원인 진단 {index}
          </EnterText>
          <PunchHeadline
            delay={20}
            stagger={4}
            lines={[heading]}
            style={{
              fontSize: 68,
              lineHeight: 1.3,
              color: colors.text,
              fontWeight: 700,
            }}
          />
          <EnterText
            delay={36}
            durationFrames={24}
            style={{
              fontSize: 36,
              lineHeight: 1.5,
              color: colors.textDim,
              fontWeight: 500,
              maxWidth: 1300,
              whiteSpace: "pre-line",
            }}
          >
            {body}
          </EnterText>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
