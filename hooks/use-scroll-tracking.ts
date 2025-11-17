/**
 * @file hooks/use-scroll-tracking.ts
 * @description 섹션별 스크롤 추적을 위한 커스텀 훅
 *
 * Intersection Observer API를 사용하여 섹션이 뷰포트에 들어올 때
 * GA4 이벤트를 자동으로 추적합니다.
 * 각 섹션당 한 번만 추적하도록 중복 방지 로직이 포함되어 있습니다.
 *
 * @example
 * ```tsx
 * const sectionRef = useScrollTracking('hero')
 * return <section ref={sectionRef}>...</section>
 * ```
 */

import { useEffect, useRef, useState } from 'react'
import { trackSectionView } from '@/lib/analytics'

interface UseScrollTrackingOptions {
  /**
   * 섹션이 뷰포트에 들어왔다고 판단할 임계값 (0-1)
   * @default 0.5 (50%)
   */
  threshold?: number
  /**
   * 루트 마진 (예: '100px' 또는 '-100px')
   */
  rootMargin?: string
}

/**
 * 섹션별 스크롤 추적 훅
 *
 * @param sectionName - 섹션 이름 (예: 'hero', 'services', 'team')
 * @param options - Intersection Observer 옵션
 * @returns 섹션에 연결할 ref
 */
export function useScrollTracking(
  sectionName: string,
  options: UseScrollTrackingOptions = {}
): React.RefObject<HTMLElement> {
  const sectionRef = useRef<HTMLElement>(null)
  const [hasTracked, setHasTracked] = useState(false)
  const { threshold = 0.5, rootMargin = '0px' } = options

  useEffect(() => {
    // 이미 추적했으면 종료
    if (hasTracked) return

    const element = sectionRef.current
    if (!element) return

    // Intersection Observer 생성
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 섹션이 뷰포트에 50% 이상 보이면 추적
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            // 스크롤 깊이 계산 (대략적인 값)
            const scrollDepth = Math.round(entry.intersectionRatio * 100)

            // GA4 이벤트 추적
            trackSectionView(sectionName, scrollDepth)

            // 추적 완료 표시
            setHasTracked(true)

            // 관찰 중단
            observer.disconnect()
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    // 섹션 관찰 시작
    observer.observe(element)

    // cleanup
    return () => {
      observer.disconnect()
    }
  }, [sectionName, threshold, rootMargin, hasTracked])

  return sectionRef
}

