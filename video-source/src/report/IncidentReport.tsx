import {
  AbsoluteFill,
  Audio,
  Sequence,
  Series,
  interpolate,
  staticFile,
} from "remotion";
import { SceneColdOpen } from "./SceneColdOpen";
import { SceneExhibitA } from "./SceneExhibitA";
import { SceneExhibitB } from "./SceneExhibitB";
import { SceneFinalNight } from "./SceneFinalNight";
import { SceneStamp } from "./SceneStamp";
import { SceneTurn } from "./SceneTurn";
import { SceneClosingWarm } from "./SceneClosingWarm";
import { SCENES, START, REPORT_TOTAL } from "./timing";

// Quantize fade curves to 0.05 steps: per-frame-unique volume values blow up
// the ffmpeg volume expression past its parser limit during audio mixing.
const q = (v: number) => Math.round(v * 20) / 20;

// Dark drone under the report half; fades to silence before the stamp lands.
const DarkBed: React.FC = () => (
  <Audio
    src={staticFile("audio/music-dark-v3.mp3")}
    volume={(f) =>
      q(
        interpolate(
          f,
          [0, 50, START.finalNight + 150, START.stamp],
          [0, 1.1, 1.1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        ),
      )
    }
  />
);

// Warm bed under the turn + closing.
const WarmBed: React.FC = () => (
  <Sequence from={START.turn + 60} layout="none" name="Warm music">
    <Audio
      src={staticFile("audio/music-warm.mp3")}
      volume={(f) => {
        const warmLen = SCENES.turn - 60 + SCENES.closing;
        return q(
          interpolate(f, [0, 70, warmLen - 60, warmLen], [0, 1.2, 1.2, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        );
      }}
    />
  </Sequence>
);

export const IncidentReport: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#070D20" }}>
      <DarkBed />
      <WarmBed />
      <Series>
        <Series.Sequence durationInFrames={SCENES.coldOpen} name="Cold open">
          <SceneColdOpen />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.exhibitA} name="Exhibit A">
          <SceneExhibitA />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.exhibitB} name="Exhibit B">
          <SceneExhibitB />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.finalNight} name="Final night">
          <SceneFinalNight />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.stamp} name="Stamp">
          <SceneStamp />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.turn} name="Turn">
          <SceneTurn />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.closing} name="Closing">
          <SceneClosingWarm />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

export { REPORT_TOTAL };
