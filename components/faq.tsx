'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useScrollTracking } from '@/hooks/use-scroll-tracking'

const faqs = [
  {
    question: '첫 방문 시 예약이 필수인가요?',
    answer: '네, 모든 시술은 예약 시스템으로 운영됩니다. 온라인 예약이나 전화로 예약해주시면 됩니다.',
    category: '예약',
  },
  {
    question: '헤어컷은 얼마나 오래 지속되나요?',
    answer: '일반적으로 4-6주 정도 지속됩니다. 개인의 머리 성장 속도에 따라 다를 수 있습니다.',
    category: '시술',
  },
  {
    question: '각 시술의 소요시간은 얼마나 되나요?',
    answer: '헤어컷은 약 60-90분, 컬러는 약 120-180분, 펌/매직은 약 120-150분, 케어는 약 60-90분 소요됩니다. 시술 내용에 따라 시간이 달라질 수 있습니다.',
    category: '시술',
  },
  {
    question: '펌/매직은 손상이 적나요?',
    answer: '저희는 고급 시술제를 사용하고 시술 후 영양 관리를 해드립니다. 정기적인 케어가 중요합니다.',
    category: '시술',
  },
  {
    question: '컬러 후 관리는 어떻게 하나요?',
    answer: '컬러 후 3일간은 샴푸를 피해주시고, 컬러 전용 샴푸와 트리트먼트를 사용하시면 발색이 더 오래갑니다.',
    category: '시술',
  },
  {
    question: '사용하는 제품이나 브랜드는 무엇인가요?',
    answer: '저희는 손상 최소화를 위해 고급 헤어케어 제품을 사용합니다. 시술 전 상담 시 사용 제품에 대해 자세히 안내해드립니다.',
    category: '제품',
  },
  {
    question: '예약 변경이나 취소는 어떻게 하나요?',
    answer: '예약 변경이나 취소는 최소 하루 전까지 연락주시면 됩니다. 당일 취소 시 취소 수수료가 발생할 수 있습니다.',
    category: '예약',
  },
  {
    question: '매장 위치와 주차는 어떻게 되나요?',
    answer: '매장 위치와 주차 안내는 하단 지도 섹션에서 확인하실 수 있습니다. 주차 공간이 제한적이니 대중교통 이용을 권장드립니다.',
    category: '매장',
  },
  {
    question: '영업시간은 어떻게 되나요?',
    answer: '평일 오전 10시부터 오후 8시까지, 토요일은 오전 10시부터 오후 7시까지 운영합니다. 일요일은 휴무입니다.',
    category: '매장',
  },
  {
    question: '아이도 시술 가능한가요?',
    answer: '네, 아이 헤어컷도 가능합니다. 미용사 선택 시 미리 말씀해주시면 아이 담당 스타일리스트를 배정해드립니다.',
    category: '시술',
  },
  {
    question: '결제 방법은 무엇이 있나요?',
    answer: '현금, 카드, 계좌이체 모두 가능합니다. 간편결제(카카오페이, 네이버페이 등)도 이용하실 수 있습니다.',
    category: '결제',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const sectionRef = useScrollTracking('faq')

  return (
    <section ref={sectionRef} id="faq" className="py-16 sm:py-24 bg-secondary/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            자주 묻는 질문
          </h2>
          <p className="text-lg text-muted-foreground">
            UNIHAIR에 대해 자주 하는 질문을 모았습니다
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full p-6 flex items-center justify-between bg-white hover:bg-secondary/5 transition"
              >
                <h3 className="font-semibold text-foreground text-left">{faq.question}</h3>
                <ChevronDown
                  size={20}
                  className={`text-primary flex-shrink-0 transition-transform ${
                    open === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {open === index && (
                <div className="px-6 py-4 bg-secondary/5 border-t border-border">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
