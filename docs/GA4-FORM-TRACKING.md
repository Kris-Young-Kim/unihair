# GA4 폼 제출 추적 가이드

이 문서는 UNIHAIR 웹사이트의 폼 제출 추적 기능에 대한 가이드입니다.

## 추적되는 폼 타입

### 1. 예약 폼 (Booking Form)

**이벤트명:**
- `booking_form_submit`: 예약 폼 제출 시도
- `booking_form_submit_success`: 예약 완료 (전환 이벤트)
- `booking_form_submit_error`: 예약 실패

**추적 파라미터:**
- `service_type`: 선택한 서비스 (haircut, color, perm, treatment)
- `booking_date`: 예약 날짜
- `booking_time`: 예약 시간
- `value`: 전환 가치 (기본값: 1)
- `currency`: 통화 단위 (KRW)

### 2. 일반 폼 (확장 가능)

**이벤트명:**
- `form_submit`: 폼 제출 시도
- `form_submit_success`: 폼 제출 완료 (전환 이벤트)
- `form_submit_error`: 폼 제출 실패

**추적 파라미터:**
- `form_type`: 폼 타입 (booking, consultation, inquiry 등)
- `value`: 전환 가치
- `currency`: 통화 단위 (KRW)
- 기타 폼별 커스텀 파라미터

## 사용 예시

### 예약 폼 추적 (기존)

```typescript
import {
  trackBookingFormSubmit,
  trackBookingFormSubmitSuccess,
  trackBookingFormSubmitError,
} from '@/lib/analytics'

// 폼 제출 시도
trackBookingFormSubmit('haircut', '2025-01-15', '14:00')

// 폼 제출 성공
trackBookingFormSubmitSuccess('haircut', '2025-01-15', '14:00', 1)

// 폼 제출 실패
trackBookingFormSubmitError('예약 처리 중 오류가 발생했습니다.', 'haircut')
```

### 일반 폼 추적 (새로 추가)

```typescript
import {
  trackFormSubmit,
  trackFormSubmitSuccess,
  trackFormSubmitError,
} from '@/lib/analytics'

// 1:1 문의하기 폼 제출
trackFormSubmit('inquiry', {
  inquiry_type: 'service',
  subject: '서비스 문의',
})

// 1:1 문의하기 폼 제출 완료
trackFormSubmitSuccess('inquiry', {
  inquiry_type: 'service',
  subject: '서비스 문의',
}, 1)

// 1:1 문의하기 폼 제출 실패
trackFormSubmitError('inquiry', '제출 중 오류가 발생했습니다.', {
  inquiry_type: 'service',
})
```

## GA4에서 확인 방법

### 1. 실시간 보고서

1. Google Analytics 대시보드 접속
2. **보고서** → **실시간** 선택
3. 이벤트 목록에서 다음 이벤트 확인:
   - `booking_form_submit`
   - `booking_form_submit_success` (전환)
   - `form_submit`
   - `form_submit_success` (전환)

### 2. DebugView

1. **보고서** → **실시간** → **DebugView** 선택
2. 폼 제출 시 실시간으로 이벤트 확인
3. 모든 파라미터 값 확인 가능

### 3. 전환 이벤트 설정

`booking_form_submit_success`와 `form_submit_success`는 전환 이벤트로 설정해야 합니다:

1. **관리** → **속성** → **이벤트** 선택
2. 해당 이벤트 찾기
3. **전환으로 표시** 토글 활성화

## 전환율 계산

**예약 전환율:**
```
전환율 = (booking_form_submit_success / booking_form_submit) × 100
```

**목표:**
- PRD 기준: **12% 이상** 달성

## 주요 추적 이벤트 요약

| 이벤트명 | 설명 | 전환 여부 |
|---------|------|----------|
| `booking_form_submit` | 예약 폼 제출 시도 | ❌ |
| `booking_form_submit_success` | 예약 완료 | ✅ **전환** |
| `booking_form_submit_error` | 예약 실패 | ❌ |
| `form_submit` | 일반 폼 제출 시도 | ❌ |
| `form_submit_success` | 일반 폼 제출 완료 | ✅ **전환** |
| `form_submit_error` | 일반 폼 제출 실패 | ❌ |

## 향후 확장 가능한 폼 타입

- `consultation`: 상담 신청 폼
- `inquiry`: 1:1 문의하기 폼
- `newsletter`: 뉴스레터 구독 폼
- `contact`: 연락처 폼

각 폼 타입은 `trackFormSubmit`, `trackFormSubmitSuccess`, `trackFormSubmitError` 함수를 사용하여 일관된 방식으로 추적할 수 있습니다.

