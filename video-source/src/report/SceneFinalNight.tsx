import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Appear, PanelHeader, ReportBackdrop, Redacted, StatusChip } from "./ui";
import { mono, sans, rc } from "./theme";

export const SceneFinalNight: React.FC = () => {
  const frame = useCurrentFrame();
  // The frame slowly darkens after the last entry — the log simply stops.
  const dim = interpolate(frame, [180, 260], [0, 0.55], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <ReportBackdrop />
      <Sequence from={120} layout="none" name="System voice: no signal">
        <Audio src={staticFile("audio/sys-nosignal.mp3")} volume={0.9} />
      </Sequence>
      <AbsoluteFill style={{ padding: "90px 130px" }}>
        <PanelHeader title="최종 세션" right="2036.04.12" />
        <div style={{ display: "flex", flexDirection: "column", gap: 40, marginTop: 20 }}>
          <Appear at={20} style={{ fontFamily: mono, fontSize: 32, color: rc.creamDim }}>
            02:14&nbsp;&nbsp;세션 시작
          </Appear>
          <Appear
            at={60}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 24,
              fontFamily: sans,
              fontSize: 34,
              color: rc.cream,
            }}
          >
            <span style={{ fontFamily: mono, color: rc.creamDim, fontSize: 28 }}>
              입력
            </span>
            <Redacted width={520} />
          </Appear>
          <Appear
            at={110}
            style={{ display: "flex", alignItems: "center", gap: 24 }}
          >
            <span style={{ fontFamily: mono, fontSize: 28, color: rc.creamDim }}>
              분류
            </span>
            <span style={{ fontFamily: sans, fontSize: 34, color: rc.cream }}>
              일상적 무기력 — 위험 아님
            </span>
            <StatusChip label="정상" />
          </Appear>
          <Appear
            at={190}
            style={{
              fontFamily: mono,
              fontSize: 32,
              color: rc.creamDim,
              marginTop: 30,
            }}
          >
            세션 종료.&nbsp;&nbsp;이후 기록 없음.
          </Appear>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: `rgba(3,6,16,${dim})` }} />
    </AbsoluteFill>
  );
};
