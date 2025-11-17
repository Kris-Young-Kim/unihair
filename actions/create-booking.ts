/**
 * @file create-booking.ts
 * @description 예약 생성 Server Action
 *
 * 이 파일은 예약 폼에서 제출된 데이터를 검증하고 Google Spreadsheet에 저장하는 Server Action입니다.
 *
 * 주요 기능:
 * 1. Zod 스키마를 사용한 데이터 검증
 * 2. Google Spreadsheet에 예약 데이터 저장
 * 3. 에러 처리 및 로깅
 *
 * 핵심 구현 로직:
 * - Server Action으로 구현 (Next.js 15 권장 방식)
 * - Zod를 사용한 런타임 검증
 * - 한국 전화번호 형식 검증 (010-0000-0000)
 * - 미래 날짜만 허용
 * - Google Sheets API를 통한 데이터 저장
 *
 * @dependencies
 * - zod: 데이터 검증 라이브러리
 * - lib/google-sheets: Google Sheets API 클라이언트
 *
 * @see {@link components/booking-modal.tsx} - 이 Server Action을 사용하는 컴포넌트
 */

'use server'

import { z } from 'zod'
import { appendBookingRow } from '@/lib/google-sheets'

// 서비스 타입 정의
const ServiceType = z.enum(['haircut', 'color', 'perm', 'treatment'], {
  errorMap: () => ({ message: '올바른 서비스를 선택해주세요.' }),
})

// 예약 폼 데이터 검증 스키마
const bookingSchema = z.object({
  name: z
    .string()
    .min(2, '이름은 최소 2자 이상이어야 합니다.')
    .max(50, '이름은 최대 50자까지 입력 가능합니다.')
    .trim(),
  phone: z
    .string()
    .regex(
      /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/,
      '올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)'
    )
    .transform((val) => val.replace(/-/g, '-')), // 하이픈 정규화
  service: ServiceType,
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, '올바른 날짜 형식이 아닙니다. (YYYY-MM-DD)')
    .refine(
      (date) => {
        const selectedDate = new Date(date)
        const today = new Date()
        today.setHours(0, 0, 0, 0) // 오늘 날짜의 시간을 00:00:00으로 설정
        return selectedDate >= today
      },
      {
        message: '예약일은 오늘 이후 날짜만 선택 가능합니다.',
      }
    ),
  time: z
    .string()
    .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, '올바른 시간 형식이 아닙니다. (HH:mm)'),
})

// Server Action 반환 타입
export type BookingResult =
  | { success: true; message: string }
  | { success: false; error: string }

/**
 * 예약 데이터를 검증하고 Google Spreadsheet에 저장하는 Server Action
 *
 * @param {FormData | Object} formData - 예약 폼 데이터
 * @returns {Promise<BookingResult>} 저장 결과
 */
export async function createBooking(
  formData: FormData | {
    name: string
    phone: string
    service: string
    date: string
    time: string
  }
): Promise<BookingResult> {
  try {
    // FormData인 경우 객체로 변환
    let data: {
      name: string
      phone: string
      service: string
      date: string
      time: string
    }

    if (formData instanceof FormData) {
      data = {
        name: formData.get('name') as string,
        phone: formData.get('phone') as string,
        service: formData.get('service') as string,
        date: formData.get('date') as string,
        time: formData.get('time') as string,
      }
    } else {
      data = formData
    }

    console.group('[예약 생성] 요청 시작')
    console.log('입력 데이터:', data)

    // Zod 스키마로 데이터 검증
    const validatedData = bookingSchema.parse(data)

    console.log('검증 완료:', validatedData)

    // Google Spreadsheet에 데이터 저장
    const result = await appendBookingRow({
      name: validatedData.name,
      phone: validatedData.phone,
      service: validatedData.service,
      date: validatedData.date,
      time: validatedData.time,
    })

    if (result.success) {
      console.log('[예약 생성] 성공:', validatedData)
      console.groupEnd()
      return {
        success: true,
        message: '예약이 성공적으로 신청되었습니다. 곧 확인 전화를 드리겠습니다!',
      }
    } else {
      console.error('[예약 생성] 저장 실패:', result.error)
      console.groupEnd()
      return {
        success: false,
        error: result.error || '예약 저장 중 오류가 발생했습니다.',
      }
    }
  } catch (error) {
    console.error('[예약 생성] 오류 발생:', error)

    // Zod 검증 에러 처리
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0]
      console.error('[예약 생성] 검증 실패:', firstError)
      return {
        success: false,
        error: firstError.message || '입력 데이터가 올바르지 않습니다.',
      }
    }

    // 기타 에러 처리
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message || '예약 처리 중 오류가 발생했습니다.',
      }
    }

    return {
      success: false,
      error: '예약 처리 중 알 수 없는 오류가 발생했습니다.',
    }
  }
}

