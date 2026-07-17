# 그 누구도 위험이라 부르지 않은

2026 KAIST AI × 실패 아이디어 공모전 팀 INCOM 45의 통합 프로젝트 저장소입니다. 공개 사이트와 최종 제출물, 영상 소스, 작업 기록을 한곳에서 관리합니다.

- 팀원: 정영운 · 우연정 · 이유빈

- 공개 사이트: https://young-un-jung.github.io/2026-KAIST-AI-X-Failure/
- 원격 저장소: https://github.com/Young-un-Jung/2026-KAIST-AI-X-Failure
- 배포 방식: `main` 브랜치 루트의 GitHub Pages

## 구조

- `index.html`, `assets/`: 실제 공개 사이트와 영상·PDF·웹용 스토리보드 자산
- `submission/`: 팀 합의 원문, 온라인 요약, 최종 제안서
- `proposal-source/`: 최종 PDF 생성 스크립트와 인쇄용 HTML
- `video-source/`: Remotion 영상 소스와 추적되는 오디오 파일
- `sources/`: 외부 음원 및 팀 스토리보드의 고해상도 원본
- `archive/`: 이전 DOCX/PDF, 보완자료 이미지, 제작 과정 파일, 영상 저장소 백업
- `docs/`: 현재 상태, 진행 기록, 콘텐츠 결정, 작업 안내

## GitHub Desktop

GitHub Desktop에서는 이 폴더 자체를 로컬 저장소로 선택합니다.

```text
C:\Users\mynam\Documents\GitHub\2026-KAIST-AI-X-Failure
```

최신 상태는 `main` 브랜치와 `origin/main`이 같은지 확인합니다. 사이트는 루트의 `index.html`을 사용하므로 디렉터리를 옮기지 않습니다.

## 로컬 사이트 확인

```bash
python -m http.server 8080
```

브라우저에서 `http://localhost:8080`을 엽니다.

## 음원 출처

- 배경음: [Pixabay · Dark Ambient](https://pixabay.com/music/ambient-dark-ambient-543982/)
- 효과음: [Pixabay · Stamp](https://pixabay.com/sound-effects/film-special-effects-stamp-81635/)

원본 URL과 다운로드 당시 라이선스 화면은 제출 증빙과 함께 별도로 보관합니다.
