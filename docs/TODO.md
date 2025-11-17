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

### 진행 중/미완료 작업

- [x] 예약 시스템 백엔드 연동 (Google Spreadsheet) - 완료
- [x] 실제 콘텐츠 반영 및 최적화 - 완료
- [ ] SEO 및 성능 최적화
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
- [ ] Pretendard 폰트 적용 (현재 Geist 사용 중, 선택사항)

---

## Phase 3: SEO 및 메타데이터 최적화

### 3.1 메타 태그 강화

- [ ] `app/layout.tsx`의 metadata 개선
  - Open Graph 이미지 추가
  - Twitter Card 설정
  - 구조화된 데이터 (JSON-LD) 추가

### 3.2 사이트맵 및 robots.txt

- [ ] `app/sitemap.ts` 생성
- [ ] `app/robots.ts` 생성

### 3.3 Schema.org 마크업

- [ ] LocalBusiness 스키마 추가
- [ ] Review 스키마 추가 (리뷰 섹션용)

---

## Phase 4: 분석 도구 연동

### 4.1 Google Analytics 4

- [ ] GA4 설정 및 이벤트 추적 구현
  - 예약 버튼 클릭 이벤트
  - 예약 폼 제출 이벤트
  - 섹션별 스크롤 추적
- [ ] 파일: `lib/analytics.ts`

### 4.2 Facebook Pixel (선택사항)

- [ ] Facebook Pixel 스크립트 추가
- [ ] 전환 이벤트 설정

### 4.3 검색 엔진 등록

- [ ] Google Search Console 연동
- [ ] 네이버 사이트 등록

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
- [ ] `actions/send-booking-notification.ts` (선택): 예약 알림 발송
- [ ] `lib/analytics.ts`: Google Analytics 이벤트 추적
- [ ] `app/sitemap.ts`: 사이트맵 생성
- [ ] `app/robots.ts`: robots.txt 생성

### 환경 변수 추가 (.env)

- `GOOGLE_SHEETS_SPREADSHEET_ID`: Google Spreadsheet ID
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: 서비스 계정 이메일
- `GOOGLE_PRIVATE_KEY`: 서비스 계정 개인 키

### 수정 완료 파일

- [x] `components/booking-modal.tsx`: Server Action 연동, UX 개선 완료
- [x] `app/layout.tsx`: Toaster 컴포넌트 추가 완료

### 수정 예정 파일

- `app/layout.tsx`: SEO 메타데이터 강화 (추가 작업)
- `app/globals.css`: 디자인 시스템 컬러 반영
- `components/services.tsx`: 콘텐츠 보강
- `components/team.tsx`: 실제 정보 반영
- `components/reviews.tsx`: 실제 리뷰 데이터 추가
- `components/faq.tsx`: FAQ 내용 보강

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
