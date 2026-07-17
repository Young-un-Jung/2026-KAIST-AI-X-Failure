import { AbsoluteFill, Composition, interpolate, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SceneHook } from "./components/SceneHook";
import { SceneDiagnosis } from "./components/SceneDiagnosis";
import { SceneResponse } from "./components/SceneResponse";
import { SceneClosing } from "./components/SceneClosing";
import { MOTIFS } from "./components/LineMotif";
import { CAPTION } from "./script";
import {
  FPS,
  WIDTH,
  HEIGHT,
  SCENE_DURATIONS,
  TRANSITION_FRAMES,
  TOTAL_DURATION,
} from "./timing";

import { IncidentReport, REPORT_TOTAL } from "./report/IncidentReport";

export const MyComposition = () => {
  return (
    <>
      <Composition
        id="IncidentReport"
        component={IncidentReport}
        durationInFrames={REPORT_TOTAL}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="FailureFilm"
        component={FailureFilm}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};

const transition = (
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
  />
);

const Music: React.FC = () => (
  <Audio
    src={staticFile("audio/music.mp3")}
    volume={(f) =>
      interpolate(f, [0, 60, TOTAL_DURATION - 60, TOTAL_DURATION], [0, 1.4, 1.4, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    }
  />
);

export const FailureFilm: React.FC = () => {
  return (
    <AbsoluteFill>
      <Music />
      <TransitionSeries>
        <TransitionSeries.Sequence
          durationInFrames={SCENE_DURATIONS.hook}
          name="Hook"
        >
          <SceneHook />
        </TransitionSeries.Sequence>
        {transition}
        <TransitionSeries.Sequence
          durationInFrames={SCENE_DURATIONS.diagnosis1}
          name="Diagnosis 01"
        >
          <SceneDiagnosis
            index="01"
            heading={"기술적 필터링의 한계"}
            body={CAPTION.diagnosis1}
            motif={MOTIFS.signal}
            audioFile="diagnosis1.mp3"
          />
        </TransitionSeries.Sequence>
        {transition}
        <TransitionSeries.Sequence
          durationInFrames={SCENE_DURATIONS.diagnosis2}
          name="Diagnosis 02"
        >
          <SceneDiagnosis
            index="02"
            heading={"'일상 대화'라는 위장"}
            body={CAPTION.diagnosis2}
            motif={MOTIFS.mask}
            audioFile="diagnosis2.mp3"
          />
        </TransitionSeries.Sequence>
        {transition}
        <TransitionSeries.Sequence
          durationInFrames={SCENE_DURATIONS.diagnosis3}
          name="Diagnosis 03"
        >
          <SceneDiagnosis
            index="03"
            heading={"현실의 문턱"}
            body={CAPTION.diagnosis3}
            motif={MOTIFS.threshold}
            audioFile="diagnosis3.mp3"
          />
        </TransitionSeries.Sequence>
        {transition}
        <TransitionSeries.Sequence
          durationInFrames={SCENE_DURATIONS.response}
          name="Response"
        >
          <SceneResponse />
        </TransitionSeries.Sequence>
        {transition}
        <TransitionSeries.Sequence
          durationInFrames={SCENE_DURATIONS.closing}
          name="Closing"
        >
          <SceneClosing />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
