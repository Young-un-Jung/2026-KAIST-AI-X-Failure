# 사건 기록 영상

「그 누구도 위험이라 부르지 않은」 공개 사이트에 사용하는 Remotion 영상 프로젝트입니다.

## 실행

```bash
npm install
npm run dev
```

## 주요 구성

- `src/report/`: 65초 사건 기록 영상의 장면과 타이밍
- `public/audio/`: 내레이션, 배경음, 효과음
- 사이트 배포본: `../assets/incident-report.mp4`

## 외부 음원 출처

- 배경음 `public/audio/music-dark-v3.mp3`: [Pixabay · Dark Ambient](https://pixabay.com/music/ambient-dark-ambient-543982/)
- 스탬프 효과음 `public/audio/stamp-v2.mp3`: [Pixabay · Stamp](https://pixabay.com/sound-effects/film-special-effects-stamp-81635/)

라이선스 증빙을 위해 원본 URL과 다운로드 당시 Pixabay 라이선스 화면을 별도로 보관합니다. 그 밖의 내레이션과 음향 파일은 제작 경위를 확인한 뒤 공개 또는 재사용합니다.

## 저장소 상태

기존의 독립 영상 저장소를 통합 저장소의 `video-source/`로 옮긴 사본입니다. 원래 영상 저장소의 전체 Git 이력은 `../archive/git-bundles/video-history.bundle`에 보관되어 있습니다.
