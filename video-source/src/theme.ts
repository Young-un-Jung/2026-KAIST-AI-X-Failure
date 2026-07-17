import { loadFont } from "@remotion/google-fonts/NotoSansKR";

export const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "700"],
  subsets: ["korean", "latin"],
});

export const colors = {
  bg: "#0B0E14",
  bgSolutionEnd: "#0A1712",
  text: "#F5F2ED",
  textDim: "#8B93A7",
  problemAccent: "#D65A88",
  solutionAccent: "#3FBF8F",
  line: "#232838",
};
