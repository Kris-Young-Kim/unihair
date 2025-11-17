'use client'

import { useAtom } from 'jotai'
import { bookingModalOpen } from '@/lib/atoms'
import { Calendar } from 'lucide-react'

export default function BookingFloatingButton() {
  const [, setOpen] = useAtom(bookingModalOpen)

  return (
    <button
      onClick={() => setOpen(true)}
      className="fixed top-20 right-4 sm:right-8 z-30 flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-semibold rounded-full shadow-lg hover:shadow-xl hover:bg-primary/90 transition"
    >
      <Calendar size={20} />
      <span className="hidden sm:inline">예약</span>
    </button>
  )
}
