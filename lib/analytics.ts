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
  // 환경 변수가 있으면 사용하고, 없으면 기본값 사용
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-6JMZGXLWT6'
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

  // GA4 이벤트 전송 (디버그 모드 포함)
  try {
    window.gtag!('event', eventName, {
      ...(eventParams || {}),
      debug_mode: true, // 디버그 모드 활성화
    })
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
    console.group('[GA4 PageView]')
    console.log('Path:', pagePath)
    console.log('Title:', pageTitle || document.title || '')
    console.log('Measurement ID:', measurementId)
    console.log('Debug Mode: Enabled')
    console.groupEnd()
  }

  // GA4가 활성화되어 있지 않으면 종료
  if (!isGAEnabled()) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[GA4] GA4 is not enabled. Measurement ID:', measurementId)
    }
    return
  }

  try {
    window.gtag!('config', measurementId, {
      page_path: pagePath,
      page_title: pageTitle || document.title || '',
      debug_mode: true, // 디버그 모드 활성화
    })
  } catch (error) {
    console.error('[GA4] Error tracking page view:', error)
  }
}

/**
 * 예약 버튼 클릭 이벤트 추적 (자세한 위치 정보 포함)
 *
 * @param buttonLocation - 버튼 위치 (예: 'header', 'hero', 'cta')
 * @param pageSection - 현재 페이지 섹션 (선택사항)
 * @param buttonElement - 버튼 DOM 요소 (선택사항, 위치 정보 수집용)
 */
export const trackBookingButtonClick = (
  buttonLocation: string,
  pageSection?: string,
  buttonElement?: HTMLElement | null
): void => {
  const positionDetails = getButtonPositionDetails(buttonElement || null)
  const sectionInfo = getCurrentSectionInfo()

  trackEvent('booking_button_click', {
    button_location: buttonLocation,
    page_section: pageSection || sectionInfo.current_section,
    // 자세한 위치 정보
    viewport_x: positionDetails.viewport_x,
    viewport_y: positionDetails.viewport_y,
    viewport_center_x: positionDetails.viewport_center_x,
    viewport_center_y: positionDetails.viewport_center_y,
    scroll_y: positionDetails.scroll_y,
    scroll_percentage: positionDetails.scroll_percentage,
    is_visible: positionDetails.is_visible,
    button_width: positionDetails.button_width,
    button_height: positionDetails.button_height,
    // 섹션 정보
    current_section: sectionInfo.current_section,
    sections_visible: sectionInfo.sections_visible,
    // 추가 정보
    viewport_width: typeof window !== 'undefined' ? window.innerWidth : 0,
    viewport_height: typeof window !== 'undefined' ? window.innerHeight : 0,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  })
}

/**
 * 예약 CTA 클릭 시 컬렉션 뷰 이벤트 추적
 *
 * @param buttonLocation - 버튼 위치
 * @param pageSection - 페이지 섹션
 */
export const trackViewCollections = (
  buttonLocation: string,
  pageSection?: string
): void => {
  trackEvent('view_collections', {
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

/**
 * 스크롤 깊이 이벤트 추적
 *
 * 사용자가 페이지의 특정 깊이(임계값)에 도달했을 때 추적합니다.
 *
 * @param threshold - 도달한 임계값 (%)
 * @param scrollPercentage - 현재 스크롤 깊이 (%)
 * @param scrollY - 현재 스크롤 위치 (픽셀)
 * @param pageHeight - 전체 페이지 높이 (픽셀)
 *
 * @example
 * trackScrollDepth(50, 52, 1200, 5000) // 50% 임계값 도달
 */
export const trackScrollDepth = (
  threshold: number,
  scrollPercentage: number,
  scrollY: number,
  pageHeight: number
): void => {
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 0

  trackEvent('scroll_depth', {
    threshold: threshold,
    scroll_percentage: scrollPercentage,
    scroll_y: Math.round(scrollY),
    page_height: pageHeight,
    viewport_height: viewportHeight,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    // 추가 정보
    threshold_label: `${threshold}%`,
    is_midpoint: threshold === 50,
    is_almost_end: threshold >= 90,
    is_end: threshold === 100,
  })
}

/**
 * 푸터 도달 이벤트 추적
 *
 * 사용자가 페이지 끝(푸터)까지 스크롤했을 때 추적합니다.
 *
 * @param scrollPercentage - 현재 스크롤 깊이 (%)
 * @param scrollY - 현재 스크롤 위치 (픽셀)
 * @param pageHeight - 전체 페이지 높이 (픽셀)
 *
 * @example
 * trackFooterReach(98, 4800, 5000) // 푸터 도달
 */
export const trackFooterReach = (
  scrollPercentage: number,
  scrollY: number,
  pageHeight: number
): void => {
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 0

  trackEvent('footer_reach', {
    scroll_percentage: scrollPercentage,
    scroll_y: Math.round(scrollY),
    page_height: pageHeight,
    viewport_height: viewportHeight,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    // 추가 정보
    is_complete_read: scrollPercentage >= 90,
    time_to_footer: Date.now(), // 타임스탬프 (나중에 계산 가능)
  })
}

/**
 * 버튼의 자세한 위치 정보 수집
 *
 * @param buttonElement - 버튼 DOM 요소
 * @returns 버튼 위치 정보 객체
 */
export const getButtonPositionDetails = (buttonElement: HTMLElement | null) => {
  if (!buttonElement || typeof window === 'undefined') {
    return {
      viewport_x: 0,
      viewport_y: 0,
      viewport_center_x: 0,
      viewport_center_y: 0,
      scroll_y: 0,
      page_height: 0,
      scroll_percentage: 0,
      is_visible: false,
      button_width: 0,
      button_height: 0,
    }
  }

  const rect = buttonElement.getBoundingClientRect()
  const scrollY = window.scrollY || window.pageYOffset
  const pageHeight = document.documentElement.scrollHeight
  const viewportHeight = window.innerHeight
  const scrollPercentage = Math.round((scrollY / (pageHeight - viewportHeight)) * 100)

  // 버튼 중심점 계산
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  // 뷰포트 내 위치 비율 (0-100)
  const viewportXPercent = Math.round((centerX / window.innerWidth) * 100)
  const viewportYPercent = Math.round((centerY / window.innerHeight) * 100)

  // 버튼이 뷰포트에 보이는지 확인
  const isVisible =
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= viewportHeight &&
    rect.right <= window.innerWidth

  return {
    viewport_x: Math.round(rect.left),
    viewport_y: Math.round(rect.top),
    viewport_center_x: viewportXPercent,
    viewport_center_y: viewportYPercent,
    scroll_y: Math.round(scrollY),
    page_height: pageHeight,
    scroll_percentage: scrollPercentage,
    is_visible: isVisible,
    button_width: Math.round(rect.width),
    button_height: Math.round(rect.height),
  }
}

/**
 * 현재 페이지 섹션 정보 수집
 *
 * @returns 현재 보이는 섹션 정보
 */
export const getCurrentSectionInfo = () => {
  if (typeof window === 'undefined') {
    return {
      current_section: 'unknown',
      sections_visible: [],
    }
  }

  const sections = ['hero', 'services', 'consultation', 'reviews', 'team', 'faq', 'event', 'location']
  const visibleSections: string[] = []
  const scrollY = window.scrollY || window.pageYOffset
  const viewportHeight = window.innerHeight

  sections.forEach((sectionId) => {
    const element = document.getElementById(sectionId) || document.querySelector(`[id*="${sectionId}"]`)
    if (element) {
      const rect = element.getBoundingClientRect()
      // 섹션이 뷰포트에 일부라도 보이는지 확인
      if (rect.top < viewportHeight && rect.bottom > 0) {
        visibleSections.push(sectionId)
      }
    }
  })

  // 가장 많이 보이는 섹션 찾기
  let currentSection = 'unknown'
  let maxVisibleArea = 0

  visibleSections.forEach((sectionId) => {
    const element = document.getElementById(sectionId) || document.querySelector(`[id*="${sectionId}"]`)
    if (element) {
      const rect = element.getBoundingClientRect()
      const visibleTop = Math.max(0, rect.top)
      const visibleBottom = Math.min(viewportHeight, rect.bottom)
      const visibleArea = visibleBottom - visibleTop

      if (visibleArea > maxVisibleArea) {
        maxVisibleArea = visibleArea
        currentSection = sectionId
      }
    }
  })

  return {
    current_section: currentSection,
    sections_visible: visibleSections.join(','),
  }
}

/**
 * 상담하기 버튼 클릭 이벤트 추적 (자세한 위치 정보 포함)
 *
 * @param buttonLocation - 버튼 위치 (예: 'header', 'hero', 'cta')
 * @param action - 액션 타입 ('scroll' | 'call')
 * @param buttonElement - 버튼 DOM 요소 (선택사항, 위치 정보 수집용)
 */
export const trackConsultationButtonClick = (
  buttonLocation: string,
  action: 'scroll' | 'call' = 'scroll',
  buttonElement?: HTMLElement | null
): void => {
  const positionDetails = getButtonPositionDetails(buttonElement || null)
  const sectionInfo = getCurrentSectionInfo()

  trackEvent('consultation_button_click', {
    button_location: buttonLocation,
    action_type: action,
    // 자세한 위치 정보
    viewport_x: positionDetails.viewport_x,
    viewport_y: positionDetails.viewport_y,
    viewport_center_x: positionDetails.viewport_center_x,
    viewport_center_y: positionDetails.viewport_center_y,
    scroll_y: positionDetails.scroll_y,
    scroll_percentage: positionDetails.scroll_percentage,
    is_visible: positionDetails.is_visible,
    button_width: positionDetails.button_width,
    button_height: positionDetails.button_height,
    // 섹션 정보
    current_section: sectionInfo.current_section,
    sections_visible: sectionInfo.sections_visible,
    // 추가 정보
    viewport_width: typeof window !== 'undefined' ? window.innerWidth : 0,
    viewport_height: typeof window !== 'undefined' ? window.innerHeight : 0,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  })
}

