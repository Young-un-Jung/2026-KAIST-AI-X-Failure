# 그 누구도 위험이라 부르지 않은

2026 KAIST AI × 실패 아이디어 공모전 팀 INCOM 45의 공개 보완자료 사이트입니다.

- 공개 주소: https://young-un-jung.github.io/2026-KAIST-AI-X-Failure/
- 저장소: https://github.com/Young-un-Jung/2026-KAIST-AI-X-Failure
- 배포 방식: `main` 브랜치의 루트 디렉터리를 사용하는 GitHub Pages

## 디렉터리 구조

- `index.html`: 5단계 사건 조사형 웹 경험
- `assets/incident-report.mp4`: 최종 사건 기록 영상
- `assets/incident-poster.jpg`: 영상 포스터
- `assets/final-proposal.pdf`: 최종 2페이지 제안서
- `docs/STATUS.md`: 현재 상태와 남은 확인 사항
- `docs/PROGRESS_LOG.md`: 변경 이력
- `docs/CONTENT_DECISIONS.md`: 팀 합의문과 사이트 표현의 관계

## 로컬 확인

이 저장소는 상위 작업 폴더가 아니라 `site` 폴더 자체입니다.

```bash
cd site
python -m http.server 8080
```

브라우저에서 `http://localhost:8080`을 엽니다.

## Git 작업

상위 작업 폴더에서 `git status`를 실행하면 저장소가 아니라는 메시지가 나올 수 있습니다. 새로 클론할 필요 없이 아래처럼 `site`로 이동합니다.

```bash
cd site
git status
git pull --ff-only
```

## 음원 출처

- 배경음: [Pixabay · Dark Ambient](https://pixabay.com/music/ambient-dark-ambient-543982/)
- 효과음: [Pixabay · Stamp](https://pixabay.com/sound-effects/film-special-effects-stamp-81635/)

원본 URL과 다운로드 당시 라이선스 화면은 제출 증빙과 함께 별도로 보관합니다.
