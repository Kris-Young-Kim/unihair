# Google Analytics 데이터 시각화 가이드

이 가이드는 Google Analytics MCP를 사용하여 전체 데이터를 단일 HTML 파일로 시각화하는 방법을 설명합니다.

## 📋 사전 준비

### 1. Google Analytics API 활성화

다음 두 API를 활성화해야 합니다:

1. **Google Analytics Data API**
   - 링크: https://console.developers.google.com/apis/api/analyticsdata.googleapis.com/overview?project=660234466862
   - 클릭하여 활성화

2. **Google Analytics Admin API**
   - 링크: https://console.developers.google.com/apis/api/analyticsadmin.googleapis.com/overview?project=660234466862
   - 클릭하여 활성화

**참고:** API 활성화 후 몇 분 정도 기다려야 적용됩니다.

### 2. Property ID 확인

Google Analytics Data API를 사용하려면 **Property ID**가 필요합니다.

**확인 방법:**
1. https://analytics.google.com 접속
2. 좌측 하단 **"관리"** (톱니바퀴 아이콘) 클릭
3. **속성 설정** 클릭
4. **속성 ID** 확인 (숫자 형태, 예: `478704`)

## 🚀 사용 방법

### 방법 1: MCP를 통한 자동 데이터 수집 (권장)

API가 활성화되면, Cursor의 MCP 기능을 통해 자동으로 데이터를 가져올 수 있습니다.

1. **API 활성화 확인**
   - 위 링크에서 두 API가 모두 활성화되었는지 확인

2. **Property ID 확인**
   - Google Analytics 콘솔에서 Property ID 확인

3. **데이터 수집 요청**
   - Cursor에서 "GA MCP로 전체 데이터를 단일 HTML로 시각화해줘" 요청
   - Property ID를 알려주면 자동으로 데이터를 가져와 HTML에 주입합니다

### 방법 2: 수동 실행

1. **환경 변수 설정**
   ```bash
   export GA_PROPERTY_ID="478704"  # 실제 Property ID로 변경
   ```

2. **스크립트 실행**
   ```bash
   node fetch-ga-data.js
   ```

3. **HTML 파일 열기**
   - `ga-visualization.html` 파일을 브라우저에서 열기

## 📊 시각화 내용

생성된 HTML 파일에는 다음 정보가 포함됩니다:

### 주요 지표 카드
- 총 세션 수
- 활성 사용자 수
- 페이지뷰 수
- 평균 세션 시간
- 이탈률
- 전환 수

### 차트
1. **일별 트래픽 추이** (라인 차트)
   - 세션, 활성 사용자, 페이지뷰 추이

2. **국가별 방문자** (바 차트)
   - 주요 국가별 방문자 수

3. **디바이스 카테고리** (도넛 차트)
   - 데스크톱, 모바일, 태블릿 비율

4. **트래픽 소스** (파이 차트)
   - Organic, Direct, Social, Referral, Paid

### 상세 데이터 테이블
- 날짜별 상세 통계
- 세션, 사용자, 페이지뷰, 평균 세션 시간, 이탈률, 전환

## 🔧 문제 해결

### API 활성화 오류
- **오류:** `SERVICE_DISABLED`
- **해결:** 위의 API 활성화 링크를 클릭하여 활성화하고 몇 분 기다리기

### Property ID를 모를 때
- Google Analytics 콘솔에서 확인하거나
- Admin API가 활성화되면 MCP를 통해 자동으로 조회 가능

### 데이터가 표시되지 않을 때
1. 브라우저 콘솔에서 오류 확인
2. API 활성화 상태 확인
3. Property ID가 올바른지 확인

## 📝 참고사항

- 데이터는 최근 30일간의 데이터를 기본으로 가져옵니다
- HTML 파일은 완전히 독립적으로 작동하며, 인터넷 연결이 필요합니다 (Chart.js CDN 사용)
- 실제 데이터는 Google Analytics MCP를 통해 가져옵니다

## 🎨 커스터마이징

HTML 파일의 스타일과 차트는 자유롭게 수정할 수 있습니다:
- `ga-visualization.html` 파일을 직접 편집
- Chart.js 옵션 수정
- 색상 및 레이아웃 변경

---

**문의사항이나 문제가 있으면 알려주세요!**
