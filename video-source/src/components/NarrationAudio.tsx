import { Audio } from "@remotion/media";
import { Sequence, staticFile, interpolate } from "remotion";

export const NarrationAudio: React.FC<{ file: string; delay: number }> = ({
  file,
  delay,
}) => (
  <Sequence from={delay} layout="none" name={`Narration: ${file}`}>
    <Audio
      src={staticFile(`audio/${file}`)}
      volume={(f) =>
        interpolate(f, [0, 8], [0, 1], { extrapolateRight: "clamp" })
      }
    />
  </Sequence>
);
