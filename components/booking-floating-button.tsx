'use client'

import { useRef } from 'react'
import { useAtom } from 'jotai'
import { bookingModalOpen } from '@/lib/atoms'
import { Calendar } from 'lucide-react'
import {
  trackBookingButtonClick,
  trackBookingModalOpen,
  trackViewCollections,
} from '@/lib/analytics'

export default function BookingFloatingButton() {
  const [, setOpen] = useAtom(bookingModalOpen)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // GA4 이벤트 추적 (자세한 위치 정보 포함)
    const buttonElement = buttonRef.current || (e.currentTarget as HTMLElement)
    
    console.group('[Floating Booking Button Click]')
    console.log('Location: floating_button')
    console.log('Button Element:', buttonElement)
    console.log('Time:', new Date().toISOString())
    console.groupEnd()

    trackBookingButtonClick('floating_button', 'any', buttonElement)
    trackViewCollections('floating_button', 'any')
    trackBookingModalOpen('floating_button')
    setOpen(true)
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="fixed top-20 right-4 sm:right-8 z-30 flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-semibold rounded-full shadow-lg hover:shadow-xl hover:bg-primary/90 transition"
    >
      <Calendar size={20} />
      <span className="hidden sm:inline">예약</span>
    </button>
  )
}
