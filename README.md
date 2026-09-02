# TRIP.zip

SK플래닛 관광 콘텐츠 제작 과정과 결과물을 정리하는 반응형 정적 웹사이트입니다.

## 페이지

- `index.html`: 소개, 메인 배너, CI 가이드, 아카이브 메뉴
- `report.html`: 선정 관광자원 TOP 3 카드 아카이브
- `contents.html`: 카드뉴스·숏폼·영상 필터 및 상세 모달
- `sns.html`: SNS 성과 지표와 대시보드
- `final-project.html`: 팀 프로젝트 소개와 결과물
- `cardnews/dadaepo/`: 다대포 5장 모션 카드뉴스, 1080×1350 PNG와 카드별 MP4

## 콘텐츠 교체

- 메인 배너: `index.html`의 `.hero-visual` 영역에 이미지를 넣고 `assets/images/main/`에 파일을 저장합니다.
- CI 가이드: `index.html`의 `.ci-spec-sheet`에서 선택 가능한 텍스트와 CSS 기반 규정을 수정할 수 있습니다.
- CI 로고: `assets/images/common/hexagon-r-logo.png`를 교체하면 홈의 모든 로고 사용 예시에 함께 반영됩니다.
- 조사 자료: `report.html`의 `.tourism-card` 항목을 복제해 순위, 소개, 지역, 체험 정보를 수정합니다.
- 제작 콘텐츠: `contents.html`의 `[data-content-item]` 카드를 복제하고 실제 이미지나 영상 썸네일을 연결합니다.
- SNS 수치: `sns.html`의 `data-metric` 값과 `assets/js/main.js`의 `metricSets`를 수정합니다.
- 팀 프로젝트: `final-project.html`의 프로젝트 설명, 팀원, 대표 결과물 영역을 교체합니다.

공통 디자인은 `assets/css/style.css`, 반응형 규칙은 `assets/css/responsive.css`, 메뉴와 필터 등 동작은 `assets/js/main.js`에서 관리합니다.
