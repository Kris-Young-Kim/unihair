'use client'

import BookingButton from './booking-button'
import { Phone } from 'lucide-react'

export default function ConsultationCTA() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-r from-primary to-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4 text-balance">
            무료 상담을 받아보세요
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            현재 헤어 고민이 있으신가요? UNIHAIR의 전문가와 함께 완벽한 해결책을 찾아보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookingButton className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" />
            <a
              href="tel:02-1234-5678"
              className="flex items-center justify-center gap-2 px-8 py-3 border-2 border-primary-foreground text-primary-foreground font-semibold rounded-lg hover:bg-primary-foreground/10 transition"
            >
              <Phone size={20} />
              전화 상담
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
