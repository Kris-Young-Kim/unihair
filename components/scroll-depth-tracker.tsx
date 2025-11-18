/**
 * @file components/scroll-depth-tracker.tsx
 * @description 스크롤 깊이 추적 컴포넌트
 *
 * 페이지 스크롤 깊이를 자동으로 추적하여 GA4 이벤트를 전송합니다.
 * 여러 임계값(25%, 50%, 75%, 90%, 100%) 통과 시 이벤트를 추적하고,
 * 푸터 도달도 별도로 추적합니다.
 *
 * 주요 기능:
 * 1. 설정 가능한 스크롤 깊이 임계값 추적
 * 2. 푸터 도달 감지 및 추적
 * 3. 중복 추적 방지 (각 임계값당 한 번만 추적)
 * 4. 디바운스 처리로 성능 최적화
 *
 * @dependencies
 * - hooks/use-scroll-depth: 스크롤 깊이 추적 훅
 */

'use client'

import { useScrollDepth } from '@/hooks/use-scroll-depth'

interface ScrollDepthTrackerProps {
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
}

export default function ScrollDepthTracker({
  thresholds = [25, 50, 75, 90, 100],
  trackFooter = true,
}: ScrollDepthTrackerProps) {
  // 스크롤 깊이 추적 시작
  useScrollDepth({ thresholds, trackFooter })

  // 이 컴포넌트는 UI를 렌더링하지 않음
  return null
}

