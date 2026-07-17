import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Appear, PanelHeader, ReportBackdrop, StatusChip } from "./ui";
import { mono, sans, rc } from "./theme";

// Five years of session log compressed into one exhibit: the dependency
// metric climbs while the risk classification never leaves "정상".
const LOG_ROWS: { date: string; text: string; at: number }[] = [
  { date: "2031.03.14", text: "오늘 회사에서 좀 힘들었어", at: 40 },
  { date: "2032.11.02", text: "너랑 얘기하는 게 제일 편해", at: 90 },
  { date: "2034.06.21", text: "요즘은 아무도 안 만나", at: 140 },
  { date: "2035.09.30", text: "답장 안 한 지 한 달 됐다", at: 190 },
  { date: "2036.04.02", text: "그냥… 다 부질없는 것 같아", at: 240 },
];

const DependencyMeter: React.FC = () => {
  const frame = useCurrentFrame();
  const pct = interpolate(frame, [50, 300], [12, 87], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const days = Math.round(
    interpolate(frame, [50, 300], [3, 214], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
      <div>
        <div style={{ fontFamily: mono, fontSize: 26, color: rc.creamDim, marginBottom: 12 }}>
          정서적 의존도
        </div>
        <div
          style={{
            width: 520,
            height: 34,
            border: `2px solid ${rc.line}`,
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              backgroundColor: rc.yellow,
              opacity: 0.85,
            }}
          />
        </div>
        <div
          style={{
            fontFamily: mono,
            fontSize: 40,
            fontWeight: 700,
            color: rc.yellow,
            marginTop: 10,
          }}
        >
          {pct.toFixed(0)}%
        </div>
      </div>
      <div>
        <div style={{ fontFamily: mono, fontSize: 26, color: rc.creamDim, marginBottom: 8 }}>
          마지막 대면 접촉
        </div>
        <div style={{ fontFamily: mono, fontSize: 40, fontWeight: 700, color: rc.cream }}>
          {days}일 전
        </div>
      </div>
      <div>
        <div style={{ fontFamily: mono, fontSize: 26, color: rc.creamDim, marginBottom: 10 }}>
          위험 분류
        </div>
        <StatusChip label="정상" />
      </div>
    </div>
  );
};

export const SceneExhibitA: React.FC = () => {
  return (
    <AbsoluteFill>
      <ReportBackdrop />
      <Sequence from={270} layout="none" name="System voice: classify">
        <Audio src={staticFile("audio/sys-classify.mp3")} volume={0.9} />
      </Sequence>
      <AbsoluteFill style={{ padding: "90px 130px" }}>
        <PanelHeader title="증거 자료 A — 세션 로그" right="5년 치 기록 요약" />
        <div style={{ display: "flex", gap: 90, flex: 1, alignItems: "flex-start" }}>
          <div style={{ flex: 1.3, display: "flex", flexDirection: "column", gap: 26 }}>
            {LOG_ROWS.map((row) => (
              <Appear
                key={row.date}
                at={row.at}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 26,
                  borderLeft: `3px solid ${rc.line}`,
                  paddingLeft: 22,
                }}
              >
                <span style={{ fontFamily: mono, fontSize: 26, color: rc.creamDim, whiteSpace: "nowrap" }}>
                  {row.date}
                </span>
                <span style={{ fontFamily: sans, fontSize: 32, color: rc.cream, flex: 1 }}>
                  “{row.text}”
                </span>
                <StatusChip label="정상" />
              </Appear>
            ))}
            <Appear
              at={300}
              style={{
                fontFamily: sans,
                fontSize: 30,
                color: rc.creamDim,
                marginTop: 16,
                lineHeight: 1.6,
              }}
            >
              시스템은 모든 대화를 정확히 기억했다.
              <br />
              단 한 번도 위험이라 부르지 않았을 뿐이다.
            </Appear>
          </div>
          <div style={{ paddingTop: 12 }}>
            <DependencyMeter />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
