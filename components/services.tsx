'use client'

import { Scissors, Sparkles, Waves, Heart } from 'lucide-react'
import BookingButton from './booking-button'

const services = [
  {
    icon: Scissors,
    title: '헤어컷',
    description: '당신의 얼굴형과 분위기에 맞는 트렌디한 헤어컷으로 이미지를 완성하세요.',
    details: '전문 스타일리스트의 1:1 맞춤 상담을 통해 최적의 헤어스타일을 제안해드립니다.',
    duration: '약 60-90분',
  },
  {
    icon: Sparkles,
    title: '헤어 컬러',
    description: '고급 헤어 염료로 생생한 발색과 건강한 머리결을 동시에 만족시킵니다.',
    details: '자연스러운 톤온톤부터 볼드한 컬러까지, 원하시는 스타일을 완벽하게 구현합니다.',
    duration: '약 120-180분',
  },
  {
    icon: Waves,
    title: '매직/펌',
    description: '당신의 헤어타입에 맞는 매직과 펌으로 자연스러운 스타일을 구현합니다.',
    details: '손상 최소화 제품을 사용하여 건강한 머리결을 유지하면서 원하는 스타일을 연출합니다.',
    duration: '약 120-150분',
  },
  {
    icon: Heart,
    title: '헤어 케어',
    description: '전문적인 트리트먼트와 케어로 건강하고 윤기 있는 머리결을 관리해드립니다.',
    details: '두피 진단부터 맞춤 케어까지, 머리카락과 두피 건강을 종합적으로 관리합니다.',
    duration: '약 60-90분',
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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
                <p className="text-muted-foreground leading-relaxed mb-3">
                  {service.description}
                </p>
                {service.details && (
                  <p className="text-sm text-muted-foreground/80 leading-relaxed mb-3">
                    {service.details}
                  </p>
                )}
                {service.duration && (
                  <p className="text-xs text-primary font-semibold mt-4">
                    소요시간: {service.duration}
                  </p>
                )}
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
