import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { ReportBackdrop, Typewriter } from "./ui";
import { mono, rc } from "./theme";

export const SceneColdOpen: React.FC = () => {
  return (
    <AbsoluteFill>
      <ReportBackdrop />
      <Sequence from={30} layout="none" name="Beep 1">
        <Audio src={staticFile("audio/beep.mp3")} volume={0.4} />
      </Sequence>
      <Sequence from={96} layout="none" name="Beep 2">
        <Audio src={staticFile("audio/beep.mp3")} volume={0.4} />
      </Sequence>
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <div style={{ width: 1240, display: "flex", flexDirection: "column", gap: 30 }}>
          <Typewriter
            text="사고 조사 보고서"
            delay={10}
            style={{ fontSize: 64, fontWeight: 700, color: rc.cream, letterSpacing: 4 }}
          />
          <Typewriter
            text={
              "사건 기록  #2036-0412\n대상        상주형 개인 AI 세션 기록\n기간        2031.03.14 – 2036.04.12"
            }
            delay={42}
            charsPerFrame={1.1}
            cursor={false}
            style={{ fontSize: 36, color: rc.creamDim, lineHeight: 1.7 }}
          />
          <div style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
            <span style={{ fontFamily: mono, fontSize: 36, color: rc.creamDim }}>
              상태
            </span>
            <Typewriter
              text="조사 미실시"
              delay={116}
              charsPerFrame={0.5}
              style={{ fontSize: 44, fontWeight: 700, color: rc.alert, letterSpacing: 2 }}
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
