# Google Analytics 4 설정 가이드

이 문서는 UNIHAIR 랜딩페이지의 Google Analytics 4 (GA4) 설정 및 전환 목표 설정에 대한 상세 가이드입니다.

## 목차

1. [GA4 계정 생성 및 측정 ID 발급](#1-ga4-계정-생성-및-측정-id-발급)
2. [환경 변수 설정](#2-환경-변수-설정)
3. [전환 목표 설정](#3-전환-목표-설정)
4. [사용자 여정 분석 설정](#4-사용자-여정-분석-설정)
5. [이벤트 확인 방법](#5-이벤트-확인-방법)

---

## 1. GA4 계정 생성 및 측정 ID 발급

### 1.1 Google Analytics 접속

1. https://analytics.google.com 접속
2. Google 계정으로 로그인

### 1.2 계정 생성 (처음인 경우)

1. 좌측 하단 **"관리"** (톱니바퀴 아이콘) 클릭
2. **"계정 만들기"** 클릭
3. 계정 이름 입력 (예: "UNIHAIR")
4. 데이터 공유 설정 선택 후 **"다음"** 클릭

### 1.3 속성 생성

1. 속성 이름 입력 (예: "UNIHAIR Website")
2. 보고 시간대: **"대한민국(서울)"**
3. 통화: **"대한민국 원(₩)"**
4. **"다음"** 클릭

### 1.4 비즈니스 정보 입력

1. 업종: **"뷰티/미용"** 선택
2. 비즈니스 규모 선택
3. **"만들기"** 클릭

### 1.5 데이터 스트림 설정

1. **"웹"** 선택
2. 웹사이트 URL 입력:
   - 프로덕션: `https://unihair.com`
   - 개발 중: `http://localhost:3000` (테스트용)
3. 스트림 이름 입력 (예: "UNIHAIR Landing Page")
4. **"스트림 만들기"** 클릭

### 1.6 측정 ID 확인

1. 데이터 스트림 페이지에서 **측정 ID** 확인
   - 형식: `G-XXXXXXXXXX` (G-로 시작하는 11자리)
   - 예: `G-ABC123DEF4`
2. 측정 ID를 클립보드에 복사

---

## 2. 환경 변수 설정

### 2.1 .env.local 파일 생성/수정

프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하거나 열기:

```bash
# 프로젝트 루트 디렉토리
unihair/
├── .env.local  ← 이 파일 생성/수정
├── app/
├── components/
└── ...
```

### 2.2 환경 변수 추가

`.env.local` 파일에 다음 내용 추가:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**예시:**
```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-ABC123DEF4
```

⚠️ **주의:** `G-XXXXXXXXXX`를 실제 측정 ID로 교체하세요.

### 2.3 개발 서버 재시작

환경 변수는 서버 시작 시 로드되므로 개발 서버를 재시작해야 합니다:

```bash
# 현재 실행 중인 서버 종료 (Ctrl + C)
# 서버 재시작
pnpm dev
```

---

## 3. 전환 목표 설정

### 3.1 Google Analytics 대시보드 접속

1. https://analytics.google.com 접속
2. 해당 GA4 속성 선택

### 3.2 관리 메뉴로 이동

1. 좌측 하단 **"관리"** (톱니바퀴 아이콘) 클릭

### 3.3 이벤트 메뉴 접속

1. 속성 열에서 **"이벤트"** 클릭
   - 또는 **"데이터 표시"** → **"이벤트"** 클릭

### 3.4 전환 이벤트로 표시

1. `booking_form_submit_success` 이벤트 찾기
   - 이벤트가 전송된 후에만 목록에 나타납니다
   - 테스트를 위해 실제로 예약 폼을 제출해보세요
   - 이벤트가 나타나기까지 몇 분 정도 걸릴 수 있습니다

2. 해당 이벤트의 **토글 스위치를 "켜기"**로 변경
   - 또는 이벤트 이름 옆의 **"전환으로 표시"** 체크박스 선택

### 3.5 확인

1. 이벤트 목록에서 `booking_form_submit_success` 옆에 **"전환"** 배지가 표시되는지 확인
2. **"보고서"** → **"전환"** 메뉴에서 예약 완료 전환 확인 가능

---

## 4. 사용자 여정 분석 설정

### 4.1 이벤트 시퀀스 분석

#### 4.1.1 탐색 분석 메뉴 접속

1. 좌측 메뉴에서 **"탐색"** 클릭
2. **"빈 보고서"** 또는 **"이벤트 탐색"** 선택

#### 4.1.2 이벤트 시퀀스 생성

1. 차원: **"이벤트 이름"**
2. 측정값: **"이벤트 수"**
3. 필터 추가:
   - `booking_button_click` → `booking_modal_open` → `booking_form_submit` → `booking_form_submit_success`
4. 이벤트 순서대로 드래그하여 배치

### 4.2 퍼널 분석 설정

#### 방법 1: 탐색 분석 사용 (권장)

1. **"탐색"** → **"퍼널 탐색"** 선택
2. 단계별 이벤트 추가:
   - **1단계:** `booking_button_click` (예약 버튼 클릭)
   - **2단계:** `booking_modal_open` (모달 열기)
   - **3단계:** `booking_form_submit` (폼 제출 시도)
   - **4단계:** `booking_form_submit_success` (예약 완료)
3. 각 단계별 이탈률 확인 가능

#### 방법 2: 맞춤 보고서 생성

1. **"보고서"** → **"라이브러리"** → **"보고서 만들기"**
2. 차원: 이벤트 이름
3. 측정값: 이벤트 수, 전환율
4. 필터: 예약 관련 이벤트만 표시

---

## 5. 이벤트 확인 방법

### 5.1 브라우저 개발자 도구

1. 개발 서버 실행 후 브라우저에서 페이지 열기
2. **F12**로 개발자 도구 열기
3. **Console 탭**에서 다음 로그 확인:
   ```
   [GA4 Event] booking_button_click
   Parameters: { button_location: 'hero', page_section: 'hero' }
   ```
4. **Network 탭**에서 `gtag/js` 요청 확인

### 5.2 GA4 실시간 보고서

1. Google Analytics 대시보드에서 **"보고서"** → **"실시간"** 선택
2. 페이지를 새로고침하거나 버튼 클릭 시 실시간으로 이벤트 확인 가능

### 5.3 주요 추적 이벤트 목록

| 이벤트 이름 | 설명 | 전환 여부 |
|------------|------|----------|
| `booking_button_click` | 예약 버튼 클릭 | ❌ |
| `booking_modal_open` | 예약 모달 열기 | ❌ |
| `booking_form_submit` | 예약 폼 제출 시도 | ❌ |
| `booking_form_submit_success` | 예약 완료 | ✅ **전환** |
| `booking_form_submit_error` | 예약 실패 | ❌ |
| `section_view` | 섹션 뷰 (hero, services, team, reviews, faq, location) | ❌ |

### 5.4 전환율 계산

**전환율 공식:**
```
전환율 = (booking_form_submit_success / booking_button_click) × 100
```

**목표:**
- PRD 기준: **12% 이상** 달성

**GA4에서 확인 방법:**
1. **"보고서"** → **"전환"** 메뉴
2. `booking_form_submit_success` 이벤트 선택
3. 전환율 확인

---

## 문제 해결

### 환경 변수가 로드되지 않는 경우

1. ✅ 개발 서버 재시작 확인
2. ✅ 변수명 오타 확인 (`NEXT_PUBLIC_GA_MEASUREMENT_ID`)
3. ✅ `.env.local` 파일 위치 확인 (프로젝트 루트)

### GA4 이벤트가 전송되지 않는 경우

1. ✅ 측정 ID 형식 확인 (`G-`로 시작)
2. ✅ 브라우저 콘솔에서 에러 확인
3. ✅ GA4 대시보드에서 데이터 스트림 상태 확인
4. ✅ 광고 차단기 비활성화 확인

### 이벤트가 GA4에 나타나지 않는 경우

1. ✅ 이벤트가 실제로 전송되었는지 브라우저 콘솔 확인
2. ✅ GA4 실시간 보고서에서 확인 (몇 분 지연 가능)
3. ✅ 이벤트 이름이 정확한지 확인 (대소문자 구분)

---

## 추가 리소스

- [GA4 공식 문서](https://developers.google.com/analytics/devguides/collection/ga4)
- [GA4 이벤트 가이드](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [GA4 전환 설정 가이드](https://support.google.com/analytics/answer/9267568)

