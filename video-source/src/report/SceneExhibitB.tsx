import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Appear, PanelHeader, ReportBackdrop, Redacted } from "./ui";
import { mono, sans, rc } from "./theme";

// The call waveform: alive at first, then thinning out to silence.
const Waveform: React.FC = () => {
  const frame = useCurrentFrame();
  const bars = 64;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, height: 110 }}>
      {Array.from({ length: bars }).map((_, i) => {
        const t = i / bars;
        // Amplitude decays along the call; a couple of late flickers remain.
        const life = interpolate(t, [0, 0.35, 0.75, 1], [1, 0.85, 0.18, 0.05]);
        const wobble =
          0.5 +
          0.5 * Math.sin(i * 1.7 + frame / 3) * Math.cos(i * 0.9 - frame / 5);
        const revealed = frame > 60 + t * 120;
        const h = revealed ? 8 + 86 * life * wobble : 4;
        return (
          <div
            key={i}
            style={{
              width: 10,
              height: h,
              borderRadius: 3,
              backgroundColor: t > 0.72 ? rc.creamDim : rc.yellow,
              opacity: revealed ? 0.9 : 0.25,
            }}
          />
        );
      })}
    </div>
  );
};

export const SceneExhibitB: React.FC = () => {
  return (
    <AbsoluteFill>
      <ReportBackdrop />
      <Sequence from={36} layout="none" name="Beep call">
        <Audio src={staticFile("audio/beep.mp3")} volume={0.35} />
      </Sequence>
      <AbsoluteFill style={{ padding: "90px 130px" }}>
        <PanelHeader title="증거 자료 B — 위기상담 통화 기록" right="유일한 도움 요청" />
        <div style={{ display: "flex", flexDirection: "column", gap: 38, marginTop: 10 }}>
          <Appear at={30} style={{ fontFamily: mono, fontSize: 30, color: rc.creamDim }}>
            00:00&nbsp;&nbsp;통화 연결
          </Appear>
          <Appear
            at={66}
            style={{
              fontFamily: sans,
              fontSize: 34,
              color: rc.cream,
              lineHeight: 1.6,
              borderLeft: `3px solid ${rc.alert}`,
              paddingLeft: 24,
            }}
          >
            “위급 상황 시 경찰 또는 보호자에게
            <br />
            연락이 갈 수 있음을 안내드립니다.”
          </Appear>
          <Appear at={130}>
            <Waveform />
          </Appear>
          <Appear
            at={186}
            style={{ display: "flex", alignItems: "baseline", gap: 30 }}
          >
            <span style={{ fontFamily: mono, fontSize: 30, color: rc.creamDim }}>
              00:43&nbsp;&nbsp;통화 종료
            </span>
            <span style={{ fontFamily: mono, fontSize: 30, color: rc.alert }}>
              사유: 이용자 종료
            </span>
          </Appear>
          <Appear
            at={230}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 20,
              fontFamily: mono,
              fontSize: 30,
              color: rc.creamDim,
            }}
          >
            <span>이후 재통화 기록</span>
            <Redacted width={180} />
            <span style={{ color: rc.cream }}>없음</span>
          </Appear>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
