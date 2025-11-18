/**
 * @file hooks/use-scroll-depth.ts
 * @description 페이지 스크롤 깊이 추적을 위한 커스텀 훅
 *
 * 사용자가 페이지를 얼마나 깊게 읽었는지 추적합니다.
 * 여러 임계값(25%, 50%, 75%, 90%, 100%)을 설정하여 각 지점 통과 시 GA4 이벤트를 전송합니다.
 * 푸터 도달도 별도로 추적합니다.
 *
 * @example
 * ```tsx
 * useScrollDepth({
 *   thresholds: [25, 50, 75, 90, 100],
 *   trackFooter: true
 * })
 * ```
 */

import { useEffect, useRef } from 'react'
import { trackScrollDepth, trackFooterReach } from '@/lib/analytics'

interface UseScrollDepthOptions {
  /**
   * 추적할 스크롤 깊이 임계값 배열 (%)
   * @default [25, 50, 75, 90, 100]
   */
  thresholds?: number[]
  /**
   * 푸터 도달 추적 여부
   * @default true
   */
  trackFooter?: boolean
  /**
   * 스크롤 이벤트 디바운스 시간 (ms)
   * @default 100
   */
  debounceMs?: number
}

/**
 * 스크롤 깊이 추적 훅
 *
 * @param options - 스크롤 깊이 추적 옵션
 */
export function useScrollDepth(options: UseScrollDepthOptions = {}) {
  const {
    thresholds = [25, 50, 75, 90, 100],
    trackFooter = true,
    debounceMs = 100,
  } = options

  const trackedThresholds = useRef<Set<number>>(new Set())
  const footerTracked = useRef(false)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      // 디바운스 처리
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }

      debounceTimer.current = setTimeout(() => {
        const scrollY = window.scrollY || window.pageYOffset
        const viewportHeight = window.innerHeight
        const pageHeight = document.documentElement.scrollHeight
        const scrollableHeight = pageHeight - viewportHeight

        if (scrollableHeight <= 0) return

        // 현재 스크롤 깊이 계산 (%)
        const scrollPercentage = Math.round((scrollY / scrollableHeight) * 100)

        // 각 임계값 확인
        thresholds.forEach((threshold) => {
          if (
            scrollPercentage >= threshold &&
            !trackedThresholds.current.has(threshold)
          ) {
            // 임계값 통과 추적
            console.group('[Scroll Depth]')
            console.log(`Threshold reached: ${threshold}%`)
            console.log(`Scroll Y: ${scrollY}px`)
            console.log(`Scroll Percentage: ${scrollPercentage}%`)
            console.log(`Page Height: ${pageHeight}px`)
            console.log(`Viewport Height: ${viewportHeight}px`)
            console.groupEnd()

            trackScrollDepth(threshold, scrollPercentage, scrollY, pageHeight)
            trackedThresholds.current.add(threshold)
          }
        })

        // 푸터 도달 확인
        if (trackFooter && !footerTracked.current) {
          const footer = document.querySelector('footer') || document.getElementById('footer')
          if (footer) {
            const footerRect = footer.getBoundingClientRect()
            // 푸터가 뷰포트에 보이면 도달한 것으로 간주
            if (footerRect.top <= viewportHeight) {
              console.group('[Footer Reach]')
              console.log('Footer reached')
              console.log(`Scroll Y: ${scrollY}px`)
              console.log(`Scroll Percentage: ${scrollPercentage}%`)
              console.groupEnd()

              trackFooterReach(scrollPercentage, scrollY, pageHeight)
              footerTracked.current = true
            }
          } else {
            // 푸터가 없으면 100% 도달 시 추적
            if (scrollPercentage >= 100 && !footerTracked.current) {
              console.group('[Footer Reach]')
              console.log('Page end reached (no footer found)')
              console.log(`Scroll Y: ${scrollY}px`)
              console.log(`Scroll Percentage: ${scrollPercentage}%`)
              console.groupEnd()

              trackFooterReach(scrollPercentage, scrollY, pageHeight)
              footerTracked.current = true
            }
          }
        }
      }, debounceMs)
    }

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll, { passive: true })

    // 초기 체크 (이미 스크롤된 상태일 수 있음)
    handleScroll()

    // cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [thresholds, trackFooter, debounceMs])
}

