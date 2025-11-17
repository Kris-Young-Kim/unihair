'use client'

import { Scissors, Sparkles, Waves } from 'lucide-react'
import BookingButton from './booking-button'

const services = [
  {
    icon: Scissors,
    title: '헤어컷',
    description: '당신의 얼굴형과 분위기에 맞는 트렌디한 헤어컷으로 이미지를 완성하세요.',
  },
  {
    icon: Sparkles,
    title: '헤어 컬러',
    description: '고급 헤어 염료로 생생한 발색과 건강한 머리결을 동시에 만족시킵니다.',
  },
  {
    icon: Waves,
    title: '매직/펌',
    description: '당신의 헤어타입에 맞는 매직과 펌으로 자연스러운 스타일을 구현합니다.',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            주요 시술 서비스
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            UNIHAIR의 프리미엄 서비스로 당신의 새로운 모습을 만나보세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="p-8 bg-secondary/30 rounded-xl hover:shadow-lg transition"
              >
                <div className="mb-4 inline-block p-3 bg-primary/10 rounded-lg">
                  <Icon className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">1:1 맞춤상담</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            당신의 헤어타입, 라이프스타일, 이미지를 고려한 전문가의 상담을 받아보세요. 가장 어울리는 스타일을 함께 만들어갑니다.
          </p>
          <BookingButton />
        </div>
      </div>
    </section>
  )
}
