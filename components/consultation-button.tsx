/**
 * @file components/consultation-button.tsx
 * @description 상담하기 버튼 컴포넌트
 *
 * GA4 이벤트 추적이 포함된 상담하기 버튼입니다.
 * 클릭 시 상담 섹션으로 스크롤하거나 전화 연결을 수행합니다.
 *
 * 주요 기능:
 * 1. 상담하기 버튼 클릭 이벤트 GA4 추적
 * 2. 상담 섹션으로 스크롤 또는 전화 연결
 * 3. 버튼 위치별 이벤트 파라미터 추적
 *
 * @dependencies
 * - lib/analytics: trackConsultationButtonClick 함수
 */

'use client'

import { useRef } from 'react'
import { trackConsultationButtonClick } from '@/lib/analytics'

interface ConsultationButtonProps {
  className?: string
  location?: string
  action?: 'scroll' | 'call'
  phoneNumber?: string
}

export default function ConsultationButton({
  className = '',
  location = 'hero',
  action = 'scroll',
  phoneNumber = '02-1234-5678',
}: ConsultationButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // GA4 이벤트 추적 (자세한 위치 정보 포함)
    const buttonElement = buttonRef.current || (e.currentTarget as HTMLElement)
    
    console.group('[Consultation Button Click]')
    console.log('Location:', location)
    console.log('Action:', action)
    console.log('Button Element:', buttonElement)
    console.log('Time:', new Date().toISOString())
    console.groupEnd()

    trackConsultationButtonClick(location, action, buttonElement)

    if (action === 'call') {
      // 전화 연결
      window.location.href = `tel:${phoneNumber}`
    } else {
      // 상담 섹션으로 스크롤
      const consultationSection = document.getElementById('consultation')
      if (consultationSection) {
        consultationSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        // 상담 섹션이 없으면 consultation-cta 섹션으로 이동
        const ctaSection = document.querySelector('[id*="consultation"], .consultation-cta')
        if (ctaSection) {
          ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition ${className}`}
    >
      상담하기
    </button>
  )
}

