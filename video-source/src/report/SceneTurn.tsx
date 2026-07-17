import {
  AbsoluteFill,
  Audio,
  Easing,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Appear } from "./ui";
import { sans, rc } from "./theme";

// Two nodes joined by a drawn line — the connector idea, in poster colors.
const Connector: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [at, at + 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <svg width={300} height={90} viewBox="0 0 300 90" style={{ opacity: progress === 0 ? 0 : 1 }}>
      <circle cx={40} cy={45} r={16} fill="none" stroke={rc.yellow} strokeWidth={5} />
      <line
        x1={62}
        y1={45}
        x2={62 + 176 * progress}
        y2={45}
        stroke={rc.yellow}
        strokeWidth={5}
        strokeLinecap="round"
      />
      <circle
        cx={260}
        cy={45}
        r={16}
        fill="none"
        stroke={rc.yellow}
        strokeWidth={5}
        opacity={interpolate(progress, [0.8, 1], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
      />
    </svg>
  );
};

export const SceneTurn: React.FC = () => {
  const frame = useCurrentFrame();
  // Navy documentary tone thaws into the poster's warm daylight.
  const warm = interpolate(frame, [70, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#070D20" }}>
      <AbsoluteFill
        style={{
          opacity: warm,
          background: `linear-gradient(160deg, #14224E 0%, #274176 45%, #B58A2C 100%)`,
        }}
      />
      <Sequence from={115} layout="none" name="Narration: response">
        <Audio src={staticFile("audio/response.mp3")} volume={1} />
      </Sequence>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 34,
            maxWidth: 1400,
            textAlign: "center",
            padding: "0 90px",
          }}
        >
          <Appear
            at={12}
            style={{ fontFamily: sans, fontSize: 42, color: rc.creamDim, lineHeight: 1.6 }}
          >
            이 보고서는 어디에도 존재하지 않는다.
          </Appear>
          <Appear
            at={78}
            style={{
              fontFamily: sans,
              fontSize: 54,
              fontWeight: 700,
              color: rc.cream,
              lineHeight: 1.5,
            }}
          >
            지금 우리가 먼저 써야 할 오답노트다.
          </Appear>
          <Connector at={140} />
          <Appear
            at={165}
            style={{
              fontFamily: sans,
              fontSize: 62,
              fontWeight: 700,
              color: rc.yellow,
              lineHeight: 1.45,
            }}
          >
            AI는 위로를 끝맺는 상담사가 아니라
            <br />
            사람을 잇는 연결자여야 한다
          </Appear>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
