# 그 누구도 위험이라 부르지 않은

**2026 KAIST AI × 실패 아이디어 공모전** 출품작 · TEAM INCOM 45

2036년, AI는 한 사람의 모든 대화를 기억했다. 그러나 그 관계를 위험이라 부른 사람도, 이후를 조사한 기관도 없었다. 이 저장소는 그 사고를 다루는 인터랙티브 웹사이트, 65초 사고 기록 영상, 2페이지 제안서, 포스터, 스토리보드까지 이 프로젝트의 모든 결과물과 제작 과정을 담고 있다.

- 팀원: 정영운 · 우연정 · 이유빈

## 바로 보기

| 자료 | 링크 |
|---|---|
| 🌐 공개 사이트 (인터랙티브 사건 조사 경험) | https://young-un-jung.github.io/2026-KAIST-AI-X-Failure/ |
| 🎬 사고 기록 영상 (65초) | [`assets/incident-report.mp4`](./assets/incident-report.mp4) |
| 📄 최종 제안서 PDF | [`최종_제안서.pdf`](./최종_제안서.pdf) |
| 🖼️ 포스터 | [`assets/poster.jpg`](./assets/poster.jpg) |
| 🎨 Figma (스토리보드 제작 보드) | [INCOM45_실패공모전](https://www.figma.com/design/NeuWLIoPZjSAY6PaBNKsl1/INCOM45_%EC%8B%A4%ED%8C%A8-%EA%B3%B5%EB%AA%A8%EC%A0%84?node-id=0-1&t=jgBEelUjbdtkfq2Q-1) |

가장 빠르게 파악하려면 공개 사이트 → 65초 영상 → 제안서 순으로 보는 것을 권한다.

## 이 프로젝트

Pre-Mortem(사전 실패 분석) 형식으로, 3단계로 구성된다.

1. **예견된 실패** — 2036년, 지안은 몇 년간 AI에게만 속마음을 털어놓다 홀로 세상을 떠났다. 시스템은 모든 대화를 기억했지만 장기 의존과 고립을 위험으로 분류하지 않았다.
2. **원인 진단** — 기술은 명시적 위험어만 찾았고, 이 관계는 '그냥 대화'로 취급되어 책임 주체가 없었으며, 현실의 상담 제도는 문턱이 높아 사람들을 AI에 더 깊이 고립시켰다.
3. **대응 방안** — AI는 상담사가 아니라 '연결자'가 되어, 도서관·청년센터·주민센터 같은 기존의 제3의 공간으로 사람이 현실의 관계에 다시 닿도록 첫 문장을 건넨다.

자세한 콘텐츠 기준은 [`docs/CONTENT_DECISIONS.md`](docs/CONTENT_DECISIONS.md), 근거 통계와 출처는 사이트 하단 "근거와 범위" 섹션과 `submission/제안서_최종본.txt`의 각주를 참고.

## 사이트 구성

공개 사이트는 사건 접수 → 증거 검토 → 원인 재구성 → 재발 방지 → 최종 분류 5단계를 순서대로 완료해야 다음 단계가 열리는 인터랙티브 조사 경험이다. 본편이 끝나면 스크롤로 이어지는 **사건 보관소(Case Archive)**가 있다.

| 전시물 | 내용 |
|---|---|
| `EXHIBIT A · FILM` | 완성 영상, 영상 스틸 3장 |
| `FINAL PROPOSAL` | 최종 제안서 PDF |
| `EXHIBIT B · STORYBOARD` | 실패·성공 두 시나리오로 갈라지는 스토리보드 각 8장 |
| `EXHIBIT C · POSTER` | 포스터 |

## 저장소 구조

```text
2026-KAIST-AI-X-Failure/
├── index.html            # 공개 사이트 전체 (5단계 조사 경험 + 사건 보관소)
├── assets/                # 사이트가 직접 서빙하는 영상·PDF·포스터·스토리보드 이미지
├── submission/             # 제출용 최종 제안서(.docx/.pdf/.txt)와 온라인 신청서 요약
├── video-source/           # 영상 제작 소스 (Remotion)
├── sources/                # 스토리보드·포스터·음원 고해상도 원본
├── docs/                   # 콘텐츠 결정 기준·진행 기록·작업 안내
└── archive/                # 이전 초안·디자인 버전·제작 과정 백업 (현재 공개본에는 미사용)
```

- `submission/제안서_최종본.docx` \| `.pdf` \| `.txt` — 제출용 최종 제안서 (Word 원본 / PDF / 원문 텍스트)
- `submission/온라인_제출용_3단계_요약_최종.txt` — 온라인 신청서 "아이디어 요약" 입력용 텍스트

## 출처 및 크레딧

- 배경음: [Pixabay · Dark Ambient](https://pixabay.com/music/ambient-dark-ambient-543982/)
- 효과음: [Pixabay · Stamp](https://pixabay.com/sound-effects/film-special-effects-stamp-81635/)
- 통계 출처: [연합뉴스, 「우울증 심할수록 AI 상담 이용률 높아…정상군의 2배」](https://www.yna.co.kr/view/AKR20260317072700061) (경기연구원 조사, 2026.3.17)
