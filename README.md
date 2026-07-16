# 배포 방법 (택 1)

## 방법 A — Netlify Drop (가장 빠름, 계정/깃 불필요)
1. https://app.netlify.com/drop 접속
2. 이 `site` 폴더를 통째로 브라우저에 드래그 앤 드롭
3. 즉시 공개 URL 발급됨 → 그 링크를 공모전 "보완 자료" 외부 링크로 제출

## 방법 B — GitHub Pages (팀 저장소에 남기고 싶을 때)
이 폴더는 이미 로컬 git 저장소로 초기화되어 있고 최초 커밋도 되어 있습니다.

```
cd site
git remote add origin <팀 GitHub 저장소 URL>
git branch -M main
git push -u origin main
```

그 다음 GitHub 저장소 Settings → Pages → Source를 `main` 브랜치 `/ (root)`로 설정하면 몇 분 안에 `https://<계정>.github.io/<repo>/` 로 열립니다.

※ 공모전 규정상 외부 링크는 "모든 사용자 열람 가능"으로 설정되어야 하니, GitHub 저장소는 Public으로 두세요.

## 로컬에서 미리보기
```
cd site
python -m http.server 8080
```
브라우저에서 http://localhost:8080 접속.
