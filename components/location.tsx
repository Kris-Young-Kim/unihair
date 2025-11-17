'use client'

import { MapPin, Phone, Clock, MapIcon } from 'lucide-react'
import { useScrollTracking } from '@/hooks/use-scroll-tracking'

export default function Location() {
  const sectionRef = useScrollTracking('location')

  return (
    <section ref={sectionRef} id="location" className="py-16 sm:py-24 bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            매장 위치
          </h2>
          <p className="text-lg text-muted-foreground">
            편하게 방문해주세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Map */}
          <div className="relative h-96 rounded-xl overflow-hidden shadow-lg bg-muted">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.8252788633497!2d127.0276!3d37.4979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3a12a2a2a2b%3A0x123456789!2sSample%20Location!5e0!3m2!1sko!2skr"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-3 bg-primary/10 rounded-lg">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">주소</h3>
                  <p className="text-muted-foreground">서울시 강남구 테헤란로 123</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 p-3 bg-primary/10 rounded-lg">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">전화</h3>
                  <a href="tel:02-1234-5678" className="text-primary hover:underline">
                    02-1234-5678
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 p-3 bg-primary/10 rounded-lg">
                  <Clock className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">운영시간</h3>
                  <p className="text-muted-foreground">월-금: 10:00 - 20:00</p>
                  <p className="text-muted-foreground">토: 10:00 - 19:00</p>
                  <p className="text-muted-foreground">일요일: 휴무</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 p-3 bg-primary/10 rounded-lg">
                  <MapIcon className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">주변 편의</h3>
                  <p className="text-muted-foreground">강남역 3번 출구 도보 5분</p>
                  <p className="text-muted-foreground">주차장 완비</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
