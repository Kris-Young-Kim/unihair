# TODO.md - UNIHAIR 랜딩페이지 프로젝트 작업 목록

## 현재 상태 (2025-01-XX)

### 완료된 작업

- [x] Next.js 15 + React 19 + Tailwind CSS 프로젝트 설정
- [x] Clerk + Supabase 인증 통합 완료
- [x] 기본 랜딩페이지 구조 및 모든 섹션 컴포넌트 구현
  - [x] Header, Hero, Services, Team, Reviews, FAQ, Event, Location, Footer
- [x] 예약 모달 UI 구현 (프론트엔드)
- [x] shadcn/ui 컴포넌트 라이브러리 설치
- [x] 예약 시스템 백엔드 연동 (Google Spreadsheet)
  - [x] Google Sheets API 클라이언트 구현 (`lib/google-sheets.ts`)
  - [x] 예약 생성 Server Action 구현 (`actions/create-booking.ts`)
  - [x] 예약 모달 Server Action 연동 및 UX 개선
  - [x] Toast 알림 시스템 연동 (`app/layout.tsx`)
- [x] 콘텐츠 및 UI 개선 (Phase 2)
  - [x] 서비스 섹션 보강 (케어 서비스 추가, 상세 설명 및 소요시간)
  - [x] 팀 섹션 개선 (시술 철학 추가, 이미지 최적화)
  - [x] 리뷰 섹션 개선 (출처 및 날짜 추가, SNS 링크 업데이트)
  - [x] FAQ 섹션 확장 (5개 → 11개)
  - [x] 이벤트 섹션 구조화 및 동적 처리
- [x] 이미지 최적화 (priority, sizes 속성 추가)
- [x] PRD 컬러 팔레트 반영
- [x] SEO 및 메타데이터 최적화 (Phase 3)
  - [x] Open Graph 및 Twitter Card 메타 태그 추가
  - [x] JSON-LD 구조화된 데이터 추가 (Organization, LocalBusiness, WebSite)
  - [x] 사이트맵 및 robots.txt 생성
  - [x] Review 스키마 추가

### 진행 중/미완료 작업

- [x] 예약 시스템 백엔드 연동 (Google Spreadsheet) - 완료
- [x] 실제 콘텐츠 반영 및 최적화 - 완료
- [x] SEO 및 메타데이터 최적화 - 완료
- [ ] 분석 도구 연동

---

## Phase 1: 예약 시스템 백엔드 연동 (우선순위: 높음)

### 1.1 Google Spreadsheet 설정

- [x] Google Spreadsheet 생성 및 구조 설정 (수동 작업)
  - 시트 이름: "예약" 또는 "Bookings"
  - 컬럼: 이름, 연락처, 서비스, 예약일, 예약시간, 상태, 생성일시
  - 헤더 행 설정 (첫 번째 행)
- [x] Google Cloud Console에서 서비스 계정 생성 (수동 작업)
  - Google Sheets API 활성화
  - 서비스 계정 키(JSON) 다운로드
  - Spreadsheet에 서비스 계정 이메일 공유 권한 부여
- [x] 환경 변수 설정
  - `GOOGLE_SHEETS_SPREADSHEET_ID`: 스프레드시트 ID
  - `GOOGLE_SERVICE_ACCOUNT_EMAIL`: 서비스 계정 이메일
  - `GOOGLE_PRIVATE_KEY`: 서비스 계정 개인 키 (JSON에서 추출)

### 1.2 예약 API 구현

- [x] Google Sheets API 클라이언트 설정
  - [x] `lib/google-sheets.ts` 생성
  - [x] googleapis 라이브러리 설치 및 설정
  - [x] 서비스 계정 인증 구현
- [x] Server Action 생성: `actions/create-booking.ts`
  - [x] Zod 스키마를 사용한 데이터 검증
  - [x] Google Spreadsheet에 예약 데이터 추가 (append)
  - [x] 에러 처리 및 로깅 구현
- [x] `components/booking-modal.tsx` 수정
  - [x] Server Action 연동
  - [x] 로딩 상태 추가
  - [x] 성공/실패 피드백 개선 (alert 대신 toast 사용)

### 1.3 예약 알림 시스템 (선택사항)

- [ ] 이메일 알림 연동 (Resend 또는 SendGrid)
- [ ] 카카오톡 알림 연동 (향후 구현)
- [ ] 파일: `actions/send-booking-notification.ts`

---

## Phase 2: 콘텐츠 및 UI 개선

### 2.1 실제 콘텐츠 반영

- [x] `components/services.tsx`: 서비스 설명 보강 (PRD 기준)
  - [x] 케어 서비스 추가
  - [x] 각 서비스별 상세 설명 및 소요시간 정보 추가
  - [x] 4개 서비스 그리드 레이아웃으로 변경
- [x] `components/team.tsx`: 실제 스타일리스트 정보 반영
  - [x] 각 스타일리스트의 시술 철학 추가
  - [x] 이미지 최적화 (sizes 속성 추가)
- [x] `components/reviews.tsx`: 실제 고객 리뷰 데이터 추가
  - [x] 리뷰 출처(네이버/카카오/구글) 및 날짜 추가
  - [x] SNS 링크를 실제 링크로 업데이트 (placeholder 제거)
  - [x] img 태그를 Next.js Image 컴포넌트로 변경
- [x] `components/faq.tsx`: FAQ 내용 보강 (PRD 기준)
  - [x] FAQ 5개 → 11개로 확장
  - [x] 시술 소요시간, 제품/브랜드, 매장 안내, 예약 변경/취소, 결제 방법 등 추가
- [x] `components/event.tsx`: 이벤트/프로모션 정보 업데이트
  - [x] 이벤트 정보를 객체로 구조화
  - [x] 이벤트 기간 확인 로직 추가
  - [x] 비활성화 시 섹션 숨김 처리

### 2.2 이미지 최적화

- [x] 이미지 WebP 포맷 변환 (Next.js 자동 변환 활용)
- [x] Next.js Image 컴포넌트 최적화 (priority, sizes 속성)
  - [x] Hero 섹션 이미지에 priority, sizes, quality 속성 추가
  - [x] Team 섹션 이미지에 sizes 속성 추가
  - [x] Reviews 섹션 img 태그를 Image 컴포넌트로 변경
- [x] Lazy loading 적용 (Next.js Image 기본 제공)

### 2.3 디자인 시스템 정리

- [x] PRD 컬러 팔레트 반영 (`app/globals.css`)
  - [x] Primary: #F8E8E0 (라이트 핑크) → oklch(0.95 0.02 50)
  - [x] Secondary: #8B6C63 (브라운) → oklch(0.50 0.03 30)
  - [x] Accent: #E9C9B8 (베이지) → oklch(0.85 0.04 50)
- [x] Pretendard 폰트 적용 (완료)
  - [x] Pretendard CDN 추가 (`app/globals.css`)
  - [x] Geist 폰트 제거 (`app/layout.tsx`)
  - [x] Tailwind CSS 폰트 변수 업데이트 (`--font-sans`, `--font-mono`)
  - [x] 폰트 렌더링 최적화 (antialiasing, font-feature-settings)

---

## Phase 3: SEO 및 메타데이터 최적화 ✅

### 3.1 메타 태그 강화 ✅

- [x] `app/layout.tsx`의 metadata 개선
  - [x] Open Graph 이미지 추가
    - `og:image`: `/og-image.jpg` 설정
    - `og:image:width`, `og:image:height` 설정 (1200x630px)
    - `og:image:alt` 설정
  - [x] Open Graph 기본 태그 추가
    - `og:title`, `og:description`, `og:type`, `og:url`, `og:site_name` 설정
    - `og:locale`: 'ko_KR' 설정
  - [x] Twitter Card 설정
    - `twitter:card`: 'summary_large_image' 설정
    - `twitter:title`, `twitter:description`, `twitter:image` 설정
  - [x] 추가 메타 태그
    - `author`, `robots`, `canonical` URL 설정
    - `metadataBase` 설정으로 상대 경로 해결
  - [x] 구조화된 데이터 (JSON-LD) 추가
    - `app/layout.tsx`에 `<script type="application/ld+json">` 추가
    - Organization 스키마 (브랜드 정보)
    - WebSite 스키마 (검색 기능)

### 3.2 사이트맵 및 robots.txt ✅

- [x] `app/sitemap.ts` 생성
  - Next.js 15의 동적 sitemap 생성 함수 구현
  - 메인 페이지 URL 포함
  - `lastModified`, `changeFrequency`, `priority` 설정
  - 향후 추가 페이지 확장 가능하도록 구조화
- [x] `app/robots.ts` 생성
  - Next.js 15의 동적 robots.txt 생성 함수 구현
  - `User-agent: *` 규칙 설정
  - `Allow` 및 `Disallow` 규칙 설정 (`/api/` 제외)
  - `Sitemap` URL 포함

### 3.3 Schema.org 마크업 ✅

- [x] LocalBusiness 스키마 추가
  - `app/layout.tsx`에 JSON-LD 추가
  - 필수 필드 구현:
    - `@type`: "LocalBusiness"
    - `name`: "UNIHAIR"
    - `address`: 주소 정보 (서울시 강남구 테헤란로 123)
    - `telephone`: 전화번호 (02-1234-5678)
    - `openingHoursSpecification`: 영업시간 (월-금: 10:00-20:00, 토: 10:00-19:00)
    - `priceRange`: 가격대 ("$$")
    - `image`: 매장 이미지 URL
    - `url`: 웹사이트 URL
  - 선택 필드:
    - `description`: 매장 설명
    - `geo`: 위도/경도 (주석으로 표시, 실제 좌표로 교체 필요)
- [x] Review 스키마 추가 (리뷰 섹션용)
  - `components/reviews.tsx`에 JSON-LD 추가
  - 각 리뷰에 대한 Review 스키마 자동 생성
  - 필수 필드 구현:
    - `@type`: "Review"
    - `author`: 리뷰 작성자 정보
    - `reviewRating`: 평점 (1-5)
    - `reviewBody`: 리뷰 내용
    - `datePublished`: 리뷰 날짜
  - LocalBusiness의 `@id`와 연결하여 리뷰 연결

### 3.4 구현 세부사항 및 작업 순서

#### 작업 순서

1. **메타 태그 강화** (우선순위: 높음)

   - Open Graph 및 Twitter Card는 SNS 공유 시 중요
   - 구조화된 데이터는 검색 엔진 최적화에 필수

2. **사이트맵 및 robots.txt** (우선순위: 중간)

   - 검색 엔진 크롤링 최적화
   - Next.js 15의 동적 생성 기능 활용

3. **Schema.org 마크업** (우선순위: 높음)
   - Google 검색 결과에 리치 스니펫 표시 가능
   - LocalBusiness는 지역 검색에 중요

#### 주요 구현 포인트

**메타데이터 구조**:

- Next.js 15의 `Metadata` 타입 사용
- `openGraph`, `twitter` 속성 활용
- 환경 변수로 사이트 URL 관리 (선택사항)

**JSON-LD 구조화된 데이터**:

- `<script type="application/ld+json">` 태그 사용
- Server Component에서 직접 추가 (클라이언트 사이드 렌더링 불필요)
- 스키마 검증 도구로 테스트 (Google Rich Results Test)

**사이트맵 생성**:

- Next.js 15의 `generateSitemaps` 함수 사용
- 현재는 단일 페이지이지만 향후 확장 고려
- `lastModified`는 현재 날짜로 설정

**robots.txt**:

- 모든 페이지 크롤링 허용 (기본 설정)
- 향후 관리자 페이지 추가 시 수정 가능

#### 예상 작업 시간

- 3.1 메타 태그 강화: 1-2시간
- 3.2 사이트맵 및 robots.txt: 30분-1시간
- 3.3 Schema.org 마크업: 1-2시간

**총 예상 시간**: 약 3-5시간

#### 검증 방법

- Google Rich Results Test로 스키마 검증
- Facebook Sharing Debugger로 Open Graph 확인
- Twitter Card Validator로 Twitter Card 확인
- Google Search Console에서 사이트맵 제출 테스트

---

## Phase 4: 분석 도구 연동

### 4.1 Google Analytics 4

#### 4.1.1 GA4 기본 설정 ✅

- [ ] Google Analytics 계정 생성 및 GA4 속성 생성 (수동 작업)
  - Google Analytics 계정 생성
  - GA4 속성 생성 및 측정 ID 발급
  - 데이터 스트림 설정 (웹 스트림)
- [x] 환경 변수 설정
  - `.env.local`에 `NEXT_PUBLIC_GA_MEASUREMENT_ID` 추가 필요 (사용자 작업)
  - 예: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
- [x] `lib/analytics.ts` 생성
  - GA4 이벤트 추적 유틸리티 함수 구현 완료
  - `gtag` 함수 타입 정의 완료
  - 개발 환경에서 이벤트 로깅 (콘솔 출력) 완료
  - 프로덕션 환경에서만 실제 GA4 전송 완료
- [x] `app/layout.tsx`에 GA4 스크립트 추가
  - Next.js `Script` 컴포넌트 사용 완료
  - `strategy="afterInteractive"` 설정 완료
  - Google Analytics gtag.js 스크립트 로드 완료
  - 환경 변수로 측정 ID 주입 완료

#### 4.1.2 이벤트 추적 구현 ✅

- [x] 예약 버튼 클릭 이벤트
  - 파일: `components/booking-button.tsx`, `components/booking-floating-button.tsx`
  - 이벤트명: `booking_button_click` 구현 완료
  - 이벤트 파라미터:
    - `button_location`: 버튼 위치 (예: 'hero', 'floating_button') 구현 완료
    - `page_section`: 현재 페이지 섹션 구현 완료
  - 구현 방법: 버튼 `onClick` 핸들러에 `trackBookingButtonClick` 호출 완료
- [x] 예약 모달 열기 이벤트
  - 파일: `components/booking-modal.tsx`
  - 이벤트명: `booking_modal_open` 구현 완료
  - 이벤트 파라미터:
    - `trigger_source`: 모달을 연 버튼 위치 구현 완료
- [x] 예약 폼 제출 이벤트
  - 파일: `components/booking-modal.tsx`
  - 이벤트명: `booking_form_submit` 구현 완료
  - 이벤트 파라미터:
    - `service_type`: 선택한 서비스 (haircut, color, perm, treatment) 구현 완료
    - `booking_date`: 예약 날짜 구현 완료
    - `booking_time`: 예약 시간 구현 완료
  - 성공/실패 이벤트 분리:
    - 성공: `booking_form_submit_success` 구현 완료
    - 실패: `booking_form_submit_error` (에러 메시지 포함) 구현 완료
- [x] 섹션별 스크롤 추적
  - 파일: `hooks/use-scroll-tracking.ts` 생성 완료
  - Intersection Observer API 사용 완료
  - 추적 대상 섹션:
    - `hero`: 히어로 섹션 적용 완료
    - `services`: 서비스 섹션 적용 완료
    - `team`: 팀 섹션 적용 완료
    - `reviews`: 리뷰 섹션 적용 완료
    - `faq`: FAQ 섹션 적용 완료
    - `location`: 위치 섹션 적용 완료
  - 이벤트명: `section_view` 구현 완료
  - 이벤트 파라미터:
    - `section_name`: 섹션 이름 구현 완료
    - `scroll_depth`: 스크롤 깊이 (%) 구현 완료
  - 중복 추적 방지 (각 섹션당 1회만) 구현 완료
- [x] 페이지뷰 추적
  - `app/layout.tsx`에서 GA4 기본 설정으로 자동 페이지뷰 추적 완료
  - gtag config에 `page_path` 자동 설정 완료

#### 4.1.3 전환 목표 설정 (GA4 대시보드)

- [ ] 예약 완료 전환 목표 설정 (수동 작업)
  - GA4 대시보드에서 이벤트 기반 전환 설정
  - `booking_form_submit_success` 이벤트를 전환으로 표시
- [ ] 사용자 여정 분석 설정
  - 이벤트 시퀀스 분석
  - 퍼널 분석 설정

### 4.2 Facebook Pixel (선택사항)

#### 4.2.1 Facebook Pixel 기본 설정

- [ ] Facebook Business Manager 계정 생성 (수동 작업)
- [ ] Facebook Pixel 생성 및 Pixel ID 발급 (수동 작업)
- [ ] 환경 변수 설정
  - `.env.local`에 `NEXT_PUBLIC_FB_PIXEL_ID` 추가
  - 예: `NEXT_PUBLIC_FB_PIXEL_ID=1234567890123456`
- [ ] `lib/facebook-pixel.ts` 생성 (선택사항)
  - Facebook Pixel 이벤트 추적 유틸리티 함수
  - `fbq` 함수 타입 정의
- [ ] `app/layout.tsx`에 Facebook Pixel 스크립트 추가
  - Next.js `Script` 컴포넌트 사용
  - Facebook Pixel 기본 스크립트 로드
  - 환경 변수로 Pixel ID 주입

#### 4.2.2 전환 이벤트 설정

- [ ] 예약 완료 전환 이벤트
  - 파일: `components/booking-modal.tsx`
  - 이벤트명: `CompleteRegistration` 또는 `Lead`
  - 이벤트 파라미터:
    - `content_name`: 서비스 유형
    - `value`: 예약 가치 (선택사항)
    - `currency`: 'KRW'
- [ ] 페이지뷰 이벤트 (자동)
  - Facebook Pixel 기본 제공

### 4.3 검색 엔진 등록

#### 4.3.1 Google Search Console 연동

- [ ] Google Search Console 계정 생성 및 사이트 등록 (수동 작업)
  - Google 계정으로 Search Console 접속
  - 속성 추가 (URL 접두어 또는 도메인)
  - 소유권 확인 방법 선택:
    - HTML 파일 업로드
    - HTML 태그 (메타 태그)
    - Google Analytics 연동
    - DNS 레코드
- [ ] 소유권 확인 태그 추가
  - 파일: `app/layout.tsx`
  - `metadata.verification.google`에 검증 코드 추가
  - 또는 `public/google-site-verification.html` 파일 생성
- [ ] 사이트맵 제출
  - Google Search Console에서 사이트맵 제출
  - URL: `https://unihair.com/sitemap.xml`
  - 제출 후 크롤링 요청
- [ ] 색인 생성 요청
  - Google Search Console에서 URL 검사 도구 사용
  - 메인 페이지 및 중요 페이지 색인 요청

#### 4.3.2 네이버 사이트 등록

- [ ] 네이버 서치어드바이저 계정 생성 및 사이트 등록 (수동 작업)
  - 네이버 서치어드바이저 접속
  - 사이트 등록 및 소유권 확인
- [ ] 소유권 확인 메타 태그 추가
  - 파일: `app/layout.tsx`
  - `metadata.verification.other['naver-site-verification']`에 검증 코드 추가
- [ ] 사이트맵 제출
  - 네이버 서치어드바이저에서 사이트맵 제출
  - URL: `https://unihair.com/sitemap.xml`
- [ ] RSS 피드 제출 (선택사항)
  - 블로그나 뉴스 섹션이 있는 경우

### 4.4 구현 세부사항 및 작업 순서

#### 작업 순서

1. **Google Analytics 4 설정** (우선순위: 높음)

   - GA4 계정 생성 및 측정 ID 발급
   - 기본 스크립트 추가 및 페이지뷰 추적
   - 주요 이벤트 추적 구현 (예약 버튼, 폼 제출)

2. **섹션별 스크롤 추적** (우선순위: 중간)

   - Intersection Observer 기반 스크롤 추적 훅 구현
   - 각 섹션에 추적 적용

3. **Facebook Pixel** (우선순위: 낮음, 선택사항)

   - 마케팅 캠페인 운영 시 필요
   - 기본 설정 및 전환 이벤트만 구현

4. **검색 엔진 등록** (우선순위: 높음)
   - Google Search Console 연동 (필수)
   - 네이버 서치어드바이저 등록 (한국 시장 중요)

#### 주요 구현 포인트

**GA4 이벤트 추적 구조**:

```typescript
// lib/analytics.ts 예시 구조
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>,
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
  // 개발 환경에서 콘솔 출력
  if (process.env.NODE_ENV === "development") {
    console.log("[GA4 Event]", eventName, eventParams);
  }
};
```

**스크롤 추적 훅 구조**:

```typescript
// hooks/use-scroll-tracking.ts 예시 구조
export const useScrollTracking = (sectionName: string) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasTracked, setHasTracked] = useState(false);

  useEffect(() => {
    // Intersection Observer로 섹션 뷰 추적
    // 한 번만 추적하도록 hasTracked 상태 관리
  }, [sectionName]);

  return sectionRef;
};
```

**환경 변수 관리**:

- 개발 환경: 이벤트는 콘솔에만 출력
- 프로덕션 환경: 실제 GA4/Facebook Pixel로 전송
- 환경 변수가 없으면 분석 도구 비활성화 (에러 방지)

#### 예상 작업 시간

- 4.1 Google Analytics 4: 2-3시간
  - 기본 설정: 30분
  - 이벤트 추적 구현: 1-2시간
  - 스크롤 추적: 1시간
- 4.2 Facebook Pixel: 1시간 (선택사항)
- 4.3 검색 엔진 등록: 1-2시간 (수동 작업 포함)

**총 예상 시간**: 약 4-6시간 (Facebook Pixel 제외 시 3-5시간)

#### 검증 방법

- **GA4 검증**:
  - GA4 실시간 보고서에서 이벤트 확인
  - Google Tag Assistant 확장 프로그램 사용
  - 브라우저 개발자 도구 Network 탭에서 gtag 요청 확인
- **Facebook Pixel 검증**:
  - Facebook Pixel Helper 확장 프로그램 사용
  - Facebook Events Manager에서 이벤트 확인
- **검색 엔진 등록 검증**:
  - Google Search Console에서 색인 상태 확인
  - 네이버 서치어드바이저에서 색인 상태 확인
  - `site:unihair.com` 검색으로 색인된 페이지 확인

---

## Phase 5: 성능 최적화

### 5.1 코드 스플리팅

- [ ] 동적 import 적용 (필요한 컴포넌트)
- [ ] 번들 크기 최적화

### 5.2 Core Web Vitals 개선

- [ ] LCP 최적화 (이미지 최적화, 폰트 preload)
- [ ] CLS 개선 (레이아웃 시프트 방지)
- [ ] FID 개선 (인터랙션 최적화)

### 5.3 Lighthouse 점수 목표

- [ ] Performance: 90+ 달성
- [ ] Accessibility: 96+ 달성
- [ ] Best Practices: 90+ 달성
- [ ] SEO: 100 달성

---

## Phase 6: 접근성 개선

### 6.1 키보드 네비게이션

- [ ] 모든 인터랙티브 요소에 키보드 접근성 확인
- [ ] 포커스 인디케이터 개선

### 6.2 스크린 리더 지원

- [ ] aria-label, aria-describedby 추가
- [ ] 시맨틱 HTML 구조 확인

### 6.3 대체 텍스트

- [ ] 모든 이미지에 적절한 alt 텍스트 확인

---

## Phase 7: 반응형 디자인 검증

### 7.1 모바일 최적화

- [ ] 터치 타겟 크기 확인 (최소 44x44px)
- [ ] 모바일 폼 UX 개선

### 7.2 크로스 브라우저 테스트

- [ ] Chrome, Safari, Firefox, Edge 테스트
- [ ] iOS Safari, Android Chrome 테스트

---

## Phase 8: 테스트 & QA

### 8.1 기능 테스트

- [ ] 예약 폼 입력·제출·오류 처리 테스트
- [ ] 예약 알림 수신 확인(이메일·카톡)
- [ ] 링크·버튼·폼 필드 모두 테스트
- [ ] 크로스브라우저 호환성 확인

### 8.2 성능 & 접근성 테스트

- [ ] PageSpeed Insights 90점 이상 달성
- [ ] Lighthouse 접근성 96점 이상 달성
- [ ] 스크린리더(NVDA·JAWS) 테스트
- [ ] 모바일(iOS·Android) 기기 테스트

### 8.3 사용자 테스트(선택)

- [ ] 5-10명 타겟 사용자 대상 사용성 테스트
- [ ] 피드백 수집 및 우선순위 정렬
- [ ] 개선사항 구현

---

## Phase 9: 배포 & 런칭

### 9.1 배포 준비

- [ ] DNS 설정 및 도메인 연결
- [ ] SSL 인증서 설치(HTTPS)
- [ ] Vercel 배포 설정
- [ ] 환경 변수 설정 (.env.production)
  - Google Sheets 관련 환경 변수 설정
  - Clerk, Analytics 등 기타 환경 변수
- [ ] 전 페이지 최종 점검

### 9.2 런칭

- [ ] 랜딩페이지 라이브 배포
- [ ] SNS·이메일을 통한 공지
- [ ] 모니터링 및 버그 핫픽스 준비
- [ ] 분석 대시보드 구성

---

## Phase 10: 모니터링 & 개선 (런칭 후)

### 10.1 초기 성과 분석 (1-2주)

- [ ] 예약 전환율·이탈률·체류시간 분석
- [ ] 사용자 행동 흐름 분석(Google Analytics)
- [ ] 주요 이탈 지점 파악

### 10.2 반복 개선

- [ ] 낮은 전환율 섹션 디자인 재검토
- [ ] 리뷰/콘텐츠 정기 업데이트(월 1-2회)
- [ ] A/B 테스트(CTA·색상·카피 등)
- [ ] 이벤트/프로모션 배너 교체

---

## 우선순위 및 작업 순서

### 최우선 (Phase 1)

1. 예약 시스템 백엔드 연동
   - Google Spreadsheet 설정 및 구조 생성
   - Google Sheets API 클라이언트 설정
   - Server Action 구현
   - 예약 모달 연동

### 높은 우선순위 (Phase 2-3)

2. 콘텐츠 및 UI 개선
3. SEO 최적화

### 중간 우선순위 (Phase 4-5)

4. 분석 도구 연동
5. 성능 최적화

### 낮은 우선순위 (Phase 6-8)

6. 접근성 개선
7. 반응형 디자인 검증
8. 테스트 & QA

### 배포 준비 (Phase 9)

9. 배포 & 런칭

---

## 예상 작업 시간

- Phase 1 (예약 시스템): 2-3일
- Phase 2 (콘텐츠): 1-2일
- Phase 3 (SEO): 1일
- Phase 4 (분석 도구): 1일
- Phase 5-8 (최적화/테스트): 2-3일
- Phase 9 (배포): 1일

**총 예상 시간**: 약 1-2주

---

## 주요 파일 변경 사항

### 신규 생성 파일

- [x] `lib/google-sheets.ts`: Google Sheets API 클라이언트 설정 (완료)
- [x] `actions/create-booking.ts`: 예약 데이터를 Google Spreadsheet에 저장하는 Server Action (완료)
- [x] `app/sitemap.ts`: 사이트맵 생성 (완료)
- [x] `app/robots.ts`: robots.txt 생성 (완료)
- [x] `lib/analytics.ts`: Google Analytics 이벤트 추적 (완료)
- [x] `hooks/use-scroll-tracking.ts`: 섹션별 스크롤 추적 훅 (완료)
- [ ] `actions/send-booking-notification.ts` (선택): 예약 알림 발송

### 환경 변수 추가 (.env)

- `GOOGLE_SHEETS_SPREADSHEET_ID`: Google Spreadsheet ID
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: 서비스 계정 이메일
- `GOOGLE_PRIVATE_KEY`: 서비스 계정 개인 키
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Google Analytics 4 측정 ID (예: G-XXXXXXXXXX)

### 수정 완료 파일

- [x] `components/booking-modal.tsx`: Server Action 연동, UX 개선 완료
- [x] `app/layout.tsx`: Toaster 컴포넌트 추가, SEO 메타데이터 강화 완료 (Open Graph, Twitter Card, JSON-LD 스키마)
- [x] `app/globals.css`: 디자인 시스템 컬러 반영 완료
- [x] `components/services.tsx`: 콘텐츠 보강 완료
- [x] `components/team.tsx`: 실제 정보 반영 완료
- [x] `components/reviews.tsx`: 실제 리뷰 데이터 추가, Review 스키마 추가 완료
- [x] `components/faq.tsx`: FAQ 내용 보강 완료
- [x] `components/booking-button.tsx`: GA4 예약 버튼 클릭 이벤트 추적 추가 완료
- [x] `components/booking-floating-button.tsx`: GA4 예약 버튼 클릭 이벤트 추적 추가 완료
- [x] `components/booking-modal.tsx`: GA4 모달 열기, 폼 제출 이벤트 추적 추가 완료
- [x] `components/hero.tsx`: 스크롤 추적 적용 완료
- [x] `components/services.tsx`: 스크롤 추적 적용 완료
- [x] `components/team.tsx`: 스크롤 추적 적용 완료
- [x] `components/reviews.tsx`: 스크롤 추적 적용 완료
- [x] `components/faq.tsx`: 스크롤 추적 적용 완료
- [x] `components/location.tsx`: 스크롤 추적 적용 완료

---

## 리소스 및 의존도

### 필수 리소스

- 매장 이미지·텍스트·고객 리뷰
- Google Spreadsheet 계정 및 Google Cloud Console 접근 권한
- Google Sheets API 활성화 및 서비스 계정 설정

### 기술 스택

- **데이터 저장**: Google Spreadsheet (Supabase 대신 사용)
- **인증**: Clerk (기존 유지)
- **API**: Google Sheets API (googleapis 라이브러리)

### 옵션

- 실시간 예약 시스템(Google Calendar·Acuity 등 연동)
- 이메일 알림 서비스 (Resend, SendGrid 등)

### 예외 처리

- 고객 리뷰 수집 지연 시 FAQ 보강으로 대체
- Google Sheets API 할당량 초과 시 에러 처리 및 알림 구현
