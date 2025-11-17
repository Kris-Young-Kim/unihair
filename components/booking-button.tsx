'use client'

import { useAtom } from 'jotai'
import { bookingModalOpen } from '@/lib/atoms'
import { trackBookingButtonClick, trackBookingModalOpen } from '@/lib/analytics'

interface BookingButtonProps {
  className?: string
  location?: string
}

export default function BookingButton({ className = '', location = 'hero' }: BookingButtonProps) {
  const [, setOpen] = useAtom(bookingModalOpen)

  const handleClick = () => {
    // GA4 이벤트 추적
    trackBookingButtonClick(location, location)
    trackBookingModalOpen(location)
    setOpen(true)
  }

  return (
    <button
      onClick={handleClick}
      className={`px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition ${className}`}
    >
      지금 예약하기
    </button>
  )
}
