/**
 * @file lib/analytics.ts
 * @description Google Analytics 4 (GA4) 이벤트 추적 유틸리티
 *
 * GA4 이벤트 추적을 위한 유틸리티 함수들을 제공합니다.
 * 개발 환경에서는 콘솔에 로그를 출력하고,
 * 프로덕션 환경에서만 실제 GA4로 이벤트를 전송합니다.
 *
 * @see https://developers.google.com/analytics/devguides/collection/ga4
 */

// gtag 함수 타입 정의
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
    dataLayer?: any[]
  }
}

/**
 * GA4 측정 ID 가져오기
 */
export const getGAMeasurementId = (): string | undefined => {
  if (typeof window === 'undefined') return undefined
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
}

/**
 * GA4가 사용 가능한지 확인
 */
export const isGAEnabled = (): boolean => {
  return typeof window !== 'undefined' && !!window.gtag && !!getGAMeasurementId()
}

/**
 * GA4 이벤트 추적
 *
 * @param eventName - 이벤트 이름 (예: 'booking_button_click')
 * @param eventParams - 이벤트 파라미터 (선택사항)
 *
 * @example
 * trackEvent('booking_button_click', {
 *   button_location: 'header',
 *   page_section: 'hero'
 * })
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
): void => {
  // 개발 환경에서 콘솔 출력
  if (process.env.NODE_ENV === 'development') {
    console.group('[GA4 Event]', eventName)
    console.log('Parameters:', eventParams || {})
    console.groupEnd()
  }

  // GA4가 활성화되어 있지 않으면 종료
  if (!isGAEnabled()) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[GA4] GA4 is not enabled. Measurement ID:', getGAMeasurementId())
    }
    return
  }

  // GA4 이벤트 전송
  try {
    window.gtag!('event', eventName, eventParams || {})
  } catch (error) {
    console.error('[GA4] Error tracking event:', error)
  }
}

/**
 * GA4 페이지뷰 추적
 *
 * @param pagePath - 페이지 경로 (예: '/', '/about')
 * @param pageTitle - 페이지 제목 (선택사항)
 *
 * @example
 * trackPageView('/booking', '예약하기')
 */
export const trackPageView = (pagePath: string, pageTitle?: string): void => {
  const measurementId = getGAMeasurementId()
  if (!measurementId) return

  // 개발 환경에서 콘솔 출력
  if (process.env.NODE_ENV === 'development') {
    console.log('[GA4 PageView]', pagePath, pageTitle || '')
  }

  // GA4가 활성화되어 있지 않으면 종료
  if (!isGAEnabled()) return

  try {
    window.gtag!('config', measurementId, {
      page_path: pagePath,
      page_title: pageTitle,
    })
  } catch (error) {
    console.error('[GA4] Error tracking page view:', error)
  }
}

/**
 * 예약 버튼 클릭 이벤트 추적
 *
 * @param buttonLocation - 버튼 위치 (예: 'header', 'hero', 'cta')
 * @param pageSection - 현재 페이지 섹션 (선택사항)
 */
export const trackBookingButtonClick = (
  buttonLocation: string,
  pageSection?: string
): void => {
  trackEvent('booking_button_click', {
    button_location: buttonLocation,
    page_section: pageSection,
  })
}

/**
 * 예약 모달 열기 이벤트 추적
 *
 * @param triggerSource - 모달을 연 버튼 위치
 */
export const trackBookingModalOpen = (triggerSource: string): void => {
  trackEvent('booking_modal_open', {
    trigger_source: triggerSource,
  })
}

/**
 * 예약 폼 제출 이벤트 추적
 *
 * @param serviceType - 선택한 서비스
 * @param bookingDate - 예약 날짜
 * @param bookingTime - 예약 시간
 */
export const trackBookingFormSubmit = (
  serviceType: string,
  bookingDate: string,
  bookingTime: string
): void => {
  trackEvent('booking_form_submit', {
    service_type: serviceType,
    booking_date: bookingDate,
    booking_time: bookingTime,
  })
}

/**
 * 예약 폼 제출 성공 이벤트 추적 (전환 이벤트)
 *
 * @param serviceType - 선택한 서비스
 * @param bookingDate - 예약 날짜
 * @param bookingTime - 예약 시간
 * @param value - 예약 가치 (선택사항, 전환 가치 분석용)
 */
export const trackBookingFormSubmitSuccess = (
  serviceType: string,
  bookingDate: string,
  bookingTime: string,
  value?: number
): void => {
  trackEvent('booking_form_submit_success', {
    service_type: serviceType,
    booking_date: bookingDate,
    booking_time: bookingTime,
    value: value || 1, // 기본값 1 (전환 횟수로 계산)
    currency: 'KRW', // 통화 단위
  })
}

/**
 * 예약 폼 제출 실패 이벤트 추적
 *
 * @param errorMessage - 에러 메시지
 * @param serviceType - 선택한 서비스 (선택사항)
 */
export const trackBookingFormSubmitError = (
  errorMessage: string,
  serviceType?: string
): void => {
  trackEvent('booking_form_submit_error', {
    error_message: errorMessage,
    service_type: serviceType,
  })
}

/**
 * 섹션 뷰 이벤트 추적
 *
 * @param sectionName - 섹션 이름 (예: 'hero', 'services', 'team')
 * @param scrollDepth - 스크롤 깊이 (%)
 */
export const trackSectionView = (
  sectionName: string,
  scrollDepth?: number
): void => {
  trackEvent('section_view', {
    section_name: sectionName,
    scroll_depth: scrollDepth,
  })
}

