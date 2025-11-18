'use client'

import BookingButton from './booking-button'
import ConsultationButton from './consultation-button'
import { Phone } from 'lucide-react'

export default function ConsultationCTA() {
  return (
    <section id="consultation" className="py-16 sm:py-24 bg-gradient-to-r from-primary to-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            무료 상담을 받아보세요
          </h2>
          <p className="text-lg text-foreground/90 mb-8 max-w-2xl mx-auto">
            현재 헤어 고민이 있으신가요? UNIHAIR의 전문가와 함께 완벽한 해결책을 찾아보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookingButton className="bg-foreground text-background hover:bg-foreground/90" location="consultation_cta" />
            <ConsultationButton className="bg-foreground/10 text-foreground border-foreground hover:bg-foreground/20" location="consultation_cta" action="call" />
          </div>
        </div>
      </div>
    </section>
  )
}
