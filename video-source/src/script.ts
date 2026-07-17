// Key sentences extracted from 제안서_수정본 for narration + on-screen captions.
// Full essay text is NOT read verbatim -- only these excerpts are voiced.
export const NARRATION = {
  diagnosis1:
    "시스템은 뚜렷한 위험 신호는 감지했지만, 조용히 누적되는 정서적 의존은 알아채지 못했다.",
  diagnosis2:
    "상담도 의료도 아닌 '그냥 대화'라는 이름 아래, 사회의 안전망은 닿지 못했다.",
  diagnosis3:
    "현실의 문턱은 높았고, 가장 가까운 사람에게 가장 철저히 입을 다물게 만들었다.",
  response:
    "AI의 역할은 위로를 끝맺는 상담사가 아니라, 사람과 사람을 다시 잇는 연결자여야 한다.",
  closing: "인간을 회복시키는 것은 완벽한 기술이 아니라, 불완전한 관계다.",
} as const;

// Same lines, pre-broken at a natural pause for on-screen captions so the
// browser's CJK line-breaker doesn't split mid-word.
export const CAPTION = {
  diagnosis1:
    "시스템은 뚜렷한 위험 신호는 감지했지만,\n조용히 누적되는 정서적 의존은 알아채지 못했다.",
  diagnosis2:
    "상담도 의료도 아닌 '그냥 대화'라는 이름 아래,\n사회의 안전망은 닿지 못했다.",
  diagnosis3:
    "현실의 문턱은 높았고,\n가장 가까운 사람에게 가장 철저히 입을 다물게 만들었다.",
} as const;
