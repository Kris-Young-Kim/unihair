'use client'

import { useRef } from 'react'
import { useAtom } from 'jotai'
import { bookingModalOpen } from '@/lib/atoms'
import {
  trackBookingButtonClick,
  trackBookingModalOpen,
  trackViewCollections,
} from '@/lib/analytics'

interface BookingButtonProps {
  className?: string
  location?: string
}

export default function BookingButton({ className = '', location = 'hero' }: BookingButtonProps) {
  const [, setOpen] = useAtom(bookingModalOpen)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // GA4 이벤트 추적 (자세한 위치 정보 포함)
    const buttonElement = buttonRef.current || (e.currentTarget as HTMLElement)
    
    console.group('[Booking Button Click]')
    console.log('Location:', location)
    console.log('Button Element:', buttonElement)
    console.log('Time:', new Date().toISOString())
    console.groupEnd()

    trackBookingButtonClick(location, location, buttonElement)
    trackViewCollections(location, location)
    trackBookingModalOpen(location)
    setOpen(true)
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition ${className}`}
    >
      지금 예약하기
    </button>
  )
}
