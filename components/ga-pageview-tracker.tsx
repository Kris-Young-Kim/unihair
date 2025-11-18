/**
 * @file components/ga-pageview-tracker.tsx
 * @description GA4 페이지뷰 자동 추적 컴포넌트
 *
 * Next.js App Router에서 라우트 변경 시 자동으로 GA4 pageview를 추적합니다.
 * 디버그 모드가 활성화되어 있어 모든 pageview가 GA4 DebugView에 표시됩니다.
 *
 * 주요 기능:
 * 1. 초기 페이지 로드 시 pageview 추적
 * 2. 라우트 변경 시 자동으로 pageview 추적
 * 3. 디버그 정보를 콘솔에 출력
 *
 * @dependencies
 * - next/navigation: usePathname 훅
 * - lib/analytics: trackPageView 함수
 */

'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView } from '@/lib/analytics'

export default function GAPageViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // 페이지 제목 가져오기
    const pageTitle = document.title || 'UNIHAIR'

    // GA4 pageview 추적
    console.group('[GA4 PageView Tracker]')
    console.log('Path:', pathname)
    console.log('Title:', pageTitle)
    console.log('Time:', new Date().toISOString())
    console.groupEnd()

    trackPageView(pathname, pageTitle)
  }, [pathname])

  // 이 컴포넌트는 UI를 렌더링하지 않음
  return null
}

