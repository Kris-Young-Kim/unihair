'use client'

import { useAtom } from 'jotai'
import { bookingModalOpen } from '@/lib/atoms'
import { useState, useEffect } from 'react'
import { X, Loader2 } from 'lucide-react'
import { createBooking } from '@/actions/create-booking'
import { useToast } from '@/hooks/use-toast'
import {
  trackBookingModalOpen,
  trackBookingFormSubmit,
  trackBookingFormSubmitSuccess,
  trackBookingFormSubmitError,
} from '@/lib/analytics'

export default function BookingModal() {
  const [isOpen, setIsOpen] = useAtom(bookingModalOpen)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [triggerSource, setTriggerSource] = useState<string>('unknown')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'haircut',
    date: '',
    time: '',
  })

  // 모달이 열릴 때 이벤트 추적
  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 trigger_source는 이미 설정되어 있어야 함
      // 하지만 현재 구조상 모달이 열릴 때마다 추적
      trackBookingModalOpen(triggerSource)
    }
  }, [isOpen, triggerSource])

  const services = [
    { id: 'haircut', name: '헤어컷' },
    { id: 'color', name: '헤어 컬러' },
    { id: 'perm', name: '매직/펌' },
    { id: 'treatment', name: '매직스트레이트 + 매직펌' },
  ]

  const times = [
    '10:00', '10:30', '11:00', '11:30', '12:00',
    '14:00', '14:30', '15:00', '15:30', '16:00',
    '16:30', '17:00', '17:30', '18:00', '18:30', '19:00',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 중복 제출 방지
    if (isSubmitting) return

    setIsSubmitting(true)

    // GA4: 폼 제출 이벤트 추적
    trackBookingFormSubmit(formData.service, formData.date, formData.time)

    try {
      console.group('[예약 모달] 폼 제출 시작')
      console.log('제출 데이터:', formData)

      // Server Action 호출
      const result = await createBooking(formData)

      if (result.success) {
        console.log('[예약 모달] 예약 성공')
        console.groupEnd()

        // GA4: 폼 제출 성공 이벤트 추적
        trackBookingFormSubmitSuccess(formData.service, formData.date, formData.time)

        // 성공 Toast 표시
        toast({
          title: '예약 신청 완료',
          description: result.message,
          variant: 'default',
        })

        // 폼 초기화 및 모달 닫기
        setFormData({
          name: '',
          phone: '',
          service: 'haircut',
          date: '',
          time: '',
        })
        setIsOpen(false)
      } else {
        console.error('[예약 모달] 예약 실패:', result.error)
        console.groupEnd()

        // GA4: 폼 제출 실패 이벤트 추적
        trackBookingFormSubmitError(
          result.error || '예약 처리 중 오류가 발생했습니다.',
          formData.service
        )

        // 실패 Toast 표시
        toast({
          title: '예약 실패',
          description: result.error || '예약 처리 중 오류가 발생했습니다.',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('[예약 모달] 예외 발생:', error)
      console.groupEnd()

      // GA4: 폼 제출 실패 이벤트 추적
      const errorMessage = error instanceof Error ? error.message : '예상치 못한 오류가 발생했습니다.'
      trackBookingFormSubmitError(errorMessage, formData.service)

      // 예외 발생 시 Toast 표시
      toast({
        title: '오류 발생',
        description: '예약 처리 중 예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-white">
          <h2 className="text-2xl font-bold text-foreground">예약하기</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-secondary rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              이름 *
            </label>
            <input
              type="text"
              required
              disabled={isSubmitting}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="이름을 입력해주세요"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              연락처 *
            </label>
            <input
              type="tel"
              required
              disabled={isSubmitting}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="010-0000-0000"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Service */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              서비스 선택 *
            </label>
            <select
              required
              disabled={isSubmitting}
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              예약일 *
            </label>
            <input
              type="date"
              required
              disabled={isSubmitting}
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              예약시간 *
            </label>
            <select
              required
              disabled={isSubmitting}
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">시간을 선택해주세요</option>
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>처리 중...</span>
              </>
            ) : (
              '예약 신청'
            )}
          </button>

          <p className="text-xs text-muted-foreground text-center">
            예약 신청 후 확인 전화를 드리겠습니다.
          </p>
        </form>
      </div>
    </div>
  )
}
