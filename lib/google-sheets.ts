/**
 * @file google-sheets.ts
 * @description Google Sheets API 클라이언트 설정 및 예약 데이터 저장 함수
 *
 * 이 파일은 Google Sheets API를 사용하여 예약 데이터를 Google Spreadsheet에 저장하는 기능을 제공합니다.
 *
 * 주요 기능:
 * 1. 서비스 계정을 사용한 Google Sheets API 인증
 * 2. 예약 데이터를 Spreadsheet에 추가 (append)
 *
 * 핵심 구현 로직:
 * - googleapis 라이브러리를 사용한 서비스 계정 인증 (JWT 방식)
 * - 환경 변수에서 Spreadsheet ID 및 인증 정보 읽기
 * - spreadsheets.values.append 메서드를 사용한 데이터 추가
 *
 * @dependencies
 * - googleapis: Google APIs 클라이언트 라이브러리
 *
 * @see {@link https://developers.google.com/sheets/api} - Google Sheets API 문서
 */

import { google } from 'googleapis'

// 환경 변수 확인
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY

// 시트 이름 (환경 변수로 설정 가능하거나 기본값 사용)
const SHEET_NAME = process.env.GOOGLE_SHEETS_SHEET_NAME || '예약'

/**
 * Google Sheets API 클라이언트를 생성하고 반환합니다.
 * 서비스 계정을 사용한 JWT 인증 방식을 사용합니다.
 *
 * @returns {Promise<google.sheets_v4.Sheets>} 인증된 Google Sheets 클라이언트
 * @throws {Error} 환경 변수가 설정되지 않은 경우
 */
export async function getSheetsClient() {
  // 환경 변수 검증
  if (!SPREADSHEET_ID) {
    throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID 환경 변수가 설정되지 않았습니다.')
  }

  if (!SERVICE_ACCOUNT_EMAIL) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_EMAIL 환경 변수가 설정되지 않았습니다.')
  }

  if (!PRIVATE_KEY) {
    throw new Error('GOOGLE_PRIVATE_KEY 환경 변수가 설정되지 않았습니다.')
  }

  // JWT 클라이언트 생성
  const auth = new google.auth.JWT({
    email: SERVICE_ACCOUNT_EMAIL,
    key: PRIVATE_KEY.replace(/\\n/g, '\n'), // 환경 변수에서 \n을 실제 줄바꿈으로 변환
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  // Google Sheets API 클라이언트 생성
  const sheets = google.sheets({ version: 'v4', auth })

  return sheets
}

/**
 * 예약 데이터를 Google Spreadsheet에 추가합니다.
 *
 * @param {Object} bookingData - 예약 데이터
 * @param {string} bookingData.name - 고객 이름
 * @param {string} bookingData.phone - 연락처
 * @param {string} bookingData.service - 서비스 종류
 * @param {string} bookingData.date - 예약일 (YYYY-MM-DD)
 * @param {string} bookingData.time - 예약시간 (HH:mm)
 * @returns {Promise<{success: boolean, message?: string, error?: string}>} 저장 결과
 */
export async function appendBookingRow(bookingData: {
  name: string
  phone: string
  service: string
  date: string
  time: string
}) {
  try {
    const sheets = await getSheetsClient()

    // 현재 날짜/시간 생성 (한국 시간 기준)
    const now = new Date()
    const koreaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }))
    const createdAt = koreaTime.toISOString().replace('T', ' ').substring(0, 19)

    // 상태 기본값: '대기중'
    const status = '대기중'

    // Spreadsheet에 추가할 데이터 행
    // 헤더 순서: 이름 | 연락처 | 서비스 | 예약일 | 예약시간 | 상태 | 생성일시
    const values = [
      [
        bookingData.name,
        bookingData.phone,
        bookingData.service,
        bookingData.date,
        bookingData.time,
        status,
        createdAt,
      ],
    ]

    // 데이터 추가 요청
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:G`, // A열부터 G열까지
      valueInputOption: 'USER_ENTERED', // 사용자가 입력한 형식 그대로 저장 (날짜 자동 변환)
      insertDataOption: 'INSERT_ROWS', // 새 행 삽입
      requestBody: {
        values,
      },
    })

    console.log('[Google Sheets] 예약 데이터 저장 성공:', {
      updatedCells: response.data.updates?.updatedCells,
      updatedRange: response.data.updates?.updatedRange,
      bookingData,
    })

    return {
      success: true,
      message: '예약이 성공적으로 저장되었습니다.',
    }
  } catch (error) {
    console.error('[Google Sheets] 예약 데이터 저장 실패:', error)

    // 에러 타입에 따라 다른 메시지 반환
    if (error instanceof Error) {
      // 인증 관련 에러
      if (error.message.includes('GOOGLE_') || error.message.includes('환경 변수')) {
        return {
          success: false,
          error: '서버 설정 오류가 발생했습니다. 관리자에게 문의해주세요.',
        }
      }

      // API 호출 실패
      if (error.message.includes('permission') || error.message.includes('권한')) {
        return {
          success: false,
          error: 'Spreadsheet 접근 권한이 없습니다. 관리자에게 문의해주세요.',
        }
      }

      return {
        success: false,
        error: error.message || '예약 저장 중 오류가 발생했습니다.',
      }
    }

    return {
      success: false,
      error: '예약 저장 중 알 수 없는 오류가 발생했습니다.',
    }
  }
}

