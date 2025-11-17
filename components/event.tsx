'use client'

import BookingButton from './booking-button'
import { Zap } from 'lucide-react'

export default function Event() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Zap className="text-primary" size={120} />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="inline-block mb-4 px-3 py-1 bg-primary/10 rounded-full">
              <p className="text-sm font-semibold text-primary">🎉 오픈 이벤트</p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight text-balance">
              UNIHAIR 오픈 기념 특별 이벤트
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              신규 고객 대상으로 첫 방문 시술 30% 할인을 드립니다!
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <span className="mt-1 w-5 h-5 bg-primary rounded-full flex-shrink-0"></span>
                <span className="text-foreground">첫 시술 시 30% 할인 (11월 30일까지)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-5 h-5 bg-primary rounded-full flex-shrink-0"></span>
                <span className="text-foreground">헤어팩 무료 증정</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-5 h-5 bg-primary rounded-full flex-shrink-0"></span>
                <span className="text-foreground">친구 추천 시 양쪽 모두 10% 추가 할인</span>
              </li>
            </ul>

            <BookingButton className="w-full sm:w-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
