'use client'

import BookingButton from './booking-button'
import { Zap, Gift } from 'lucide-react'

// 이벤트 정보 (이벤트가 없을 경우 null로 설정)
const currentEvent = {
  title: 'UNIHAIR 오픈 기념 특별 이벤트',
  badge: '🎉 오픈 이벤트',
  description: '신규 고객 대상으로 첫 방문 시술 30% 할인을 드립니다!',
  startDate: '2024-11-01',
  endDate: '2024-12-31',
  benefits: [
    '첫 시술 시 30% 할인',
    '헤어팩 무료 증정',
    '친구 추천 시 양쪽 모두 10% 추가 할인',
  ],
  active: true, // 이벤트 활성화 여부
}

export default function Event() {
  // 이벤트가 없거나 비활성화된 경우 섹션 숨김
  if (!currentEvent || !currentEvent.active) {
    return null
  }

  // 이벤트 기간 확인
  const today = new Date()
  const endDate = new Date(currentEvent.endDate)
  const isEventActive = today <= endDate

  if (!isEventActive) {
    return null
  }

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Gift className="text-primary" size={120} />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="inline-block mb-4 px-3 py-1 bg-primary/10 rounded-full">
              <p className="text-sm font-semibold text-primary">{currentEvent.badge}</p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight text-balance">
              {currentEvent.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {currentEvent.description}
            </p>

            <ul className="space-y-3 mb-6">
              {currentEvent.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 bg-primary rounded-full flex-shrink-0"></span>
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm text-muted-foreground mb-8">
              이벤트 기간: {currentEvent.startDate} ~ {currentEvent.endDate}
            </p>

            <BookingButton className="w-full sm:w-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
