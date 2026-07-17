import {
  AbsoluteFill,
  Audio,
  Easing,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { mono, sans, rc } from "./theme";

// The bureaucratic gut-punch: a paper page, and a stamp that lands hard.
export const SceneStamp: React.FC = () => {
  const frame = useCurrentFrame();

  const stampAt = 50;
  const scale = interpolate(frame, [stampAt, stampAt + 7, stampAt + 13], [2.6, 0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const stampOpacity = interpolate(frame, [stampAt, stampAt + 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shake = frame >= stampAt + 7 && frame < stampAt + 13 ? Math.sin(frame * 9) * 3 : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#070D20" }}>
      <Sequence from={stampAt} layout="none" name="Stamp thud">
        <Audio src={staticFile("audio/stamp-v2.mp3")} volume={1} />
      </Sequence>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          translate: `0px ${shake}px`,
        }}
      >
        <div
          style={{
            width: 1150,
            backgroundColor: rc.cream,
            borderRadius: 6,
            padding: "80px 90px",
            boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
            display: "flex",
            flexDirection: "column",
            gap: 34,
            position: "relative",
          }}
        >
          <div style={{ fontFamily: mono, fontSize: 30, color: "#565D74", letterSpacing: 3 }}>
            사건 기록 #2036-0412
          </div>
          <div style={{ fontFamily: sans, fontSize: 46, fontWeight: 700, color: "#131A33" }}>
            사고 조사 여부
          </div>
          <div style={{ fontFamily: sans, fontSize: 30, color: "#565D74", lineHeight: 1.65 }}>
            본 서비스는 의료기관 및 상담기관에 해당하지 않으므로
            <br />
            공식 조사 대상이 아님.
          </div>
          <div
            style={{
              position: "absolute",
              right: 70,
              bottom: 46,
              rotate: "-9deg",
              scale: String(scale),
              opacity: stampOpacity,
            }}
          >
            <div
              style={{
                border: `7px solid ${rc.alert}`,
                borderRadius: 14,
                padding: "16px 42px",
                fontFamily: sans,
                fontSize: 74,
                fontWeight: 700,
                color: rc.alert,
                letterSpacing: 6,
                whiteSpace: "nowrap",
              }}
            >
              해당 없음
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
