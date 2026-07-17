import { loadFont as loadSans } from "@remotion/google-fonts/NotoSansKR";
import { loadFont as loadMono } from "@remotion/google-fonts/NanumGothicCoding";

export const { fontFamily: sans } = loadSans("normal", {
  weights: ["400", "500", "700"],
  subsets: ["korean", "latin"],
});

export const { fontFamily: mono } = loadMono("normal", {
  weights: ["400", "700"],
  subsets: ["korean", "latin"],
});

// Palette shares the poster's color family (navy / cream / green / yellow)
// but rendered as a dark documentary terminal, not flat illustration.
export const rc = {
  navy: "#0B1430",
  navyPanel: "#101B3E",
  line: "#24325C",
  cream: "#F2ECDC",
  creamDim: "#9BA3BE",
  green: "#3FA65C",
  yellow: "#F5C63C",
  alert: "#E4573D",
  redact: "#050A18",
};
