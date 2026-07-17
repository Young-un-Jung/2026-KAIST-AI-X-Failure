import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Backdrop } from "./Backdrop";
import { EnterText } from "./EnterText";
import { PunchHeadline } from "./PunchHeadline";
import { colors } from "../theme";

export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 0.5 + 0.5 * Math.sin(frame / 18);

  return (
    <AbsoluteFill>
      <Backdrop accent={colors.problemAccent} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            border: `1px solid ${colors.problemAccent}`,
            opacity: 0.12 + pulse * 0.1,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            maxWidth: 1400,
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          <EnterText
            delay={4}
            style={{
              fontSize: 34,
              letterSpacing: 6,
              color: colors.textDim,
              fontWeight: 500,
            }}
          >
            2036년, 예견된 실패
          </EnterText>
          <PunchHeadline
            delay={20}
            lines={["그 누구도 위험이라", "부르지 않았다"]}
            style={{
              fontSize: 92,
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
