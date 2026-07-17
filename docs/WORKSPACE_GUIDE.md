# 통합 작업공간 안내

## 기준 경로

```text
C:\Users\mynam\Documents\GitHub\2026-KAIST-AI-X-Failure
```

이 폴더 하나가 GitHub Desktop에서 보이는 기준 저장소다. Pull, Push, 변경 내역 확인은 모두 여기에서 수행한다.

## 로컬 미리보기

```bash
python -m http.server 8080
```

브라우저에서 `http://localhost:8080`을 연다.

## 배포를 깨뜨리지 않는 규칙

- `index.html`과 `assets/`는 GitHub Pages가 직접 사용하는 위치이므로 이동하지 않는다.
- 최종 제출 원문은 `submission/`에서 관리한다.
- 최종 제안서는 `submission/제안서_최종본.docx`가 원본이다(Word 직접 작성, 디자인 요소 없음). PDF로 내보낸 뒤 `submission/제안서_최종본.pdf`, `assets/final-proposal.pdf`, 저장소 루트 `최종_제안서.pdf` 세 곳에 같은 파일을 복사해 둔다.
- 이전 디자인 버전(그래픽 레이아웃) PDF와 생성 스크립트는 `archive/drafts/`, `archive/build-workbench/proposal-source-styled/`에 보존돼 있다.
- 영상 소스의 `node_modules/`, Remotion 캐시, 렌더 출력물은 커밋하지 않는다.
- 과거 기록은 `docs/PROGRESS_LOG.md`에서 지우지 않고 아래에 추가한다.

## 기존 작업공간 삭제 전 확인

1. 이 저장소의 변경 사항을 커밋하고 원격으로 Push한다.
2. GitHub 웹에서 새 디렉터리와 파일이 보이는지 확인한다.
3. GitHub Desktop에서 `main`과 `origin/main`이 동기화됐는지 확인한다.
4. 최종 PDF, DOCX 작업본, 영상 소스, 음원 원본을 각각 한 번 연다.
5. 그 다음에만 기존 바탕화면 작업공간을 삭제한다.
