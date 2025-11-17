'use client'

import { useAtom } from 'jotai'
import { bookingModalOpen } from '@/lib/atoms'

interface BookingButtonProps {
  className?: string
}

export default function BookingButton({ className = '' }: BookingButtonProps) {
  const [, setOpen] = useAtom(bookingModalOpen)

  return (
    <button
      onClick={() => setOpen(true)}
      className={`px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition ${className}`}
    >
      지금 예약하기
    </button>
  )
}
