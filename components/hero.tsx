'use client'

import { useState } from 'react'
import Image from 'next/image'
import BookingButton from './booking-button'

export default function Hero() {
  return (
    <section className="pt-20 pb-12 bg-gradient-to-b from-white to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Content */}
          <div className="flex flex-col justify-center">
            <div className="mb-2 inline-block w-fit px-3 py-1 bg-primary/10 rounded-full">
              <p className="text-sm font-semibold text-primary">프리미엄 헤어살롱</p>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight text-balance">
              당신의 새로운 스타일을 완성하다
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
              UNIHAIR는 트렌디한 헤어스타일과 전문적인 시술로 당신의 매력을 더해줍니다. 숙련된 스타일리스트와 함께 1:1 맞춤상담으로 완벽한 이미지를 만들어보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <BookingButton className="w-full sm:w-auto" />
              <button className="w-full sm:w-auto px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition">
                더 알아보기
              </button>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/luxury-hair-salon-interior-modern-bright.jpg"
              alt="UNIHAIR 매장 전경"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
