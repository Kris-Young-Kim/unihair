'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: '첫 방문 시 예약이 필수인가요?',
    answer: '네, 모든 시술은 예약 시스템으로 운영됩니다. 온라인 예약이나 전화로 예약해주시면 됩니다.',
  },
  {
    question: '헤어컷은 얼마나 오래 지속되나요?',
    answer: '일반적으로 4-6주 정도 지속됩니다. 개인의 머리 성장 속도에 따라 다를 수 있습니다.',
  },
  {
    question: '펌/매직은 손상이 적나요?',
    answer: '저희는 고급 시술제를 사용하고 시술 후 영양 관리를 해드립니다. 정기적인 케어가 중요합니다.',
  },
  {
    question: '컬러 후 관리는 어떻게 하나요?',
    answer: '컬러 후 3일간은 샴푸를 피해주시고, 컬러 전용 샴푸와 트리트먼트를 사용하시면 발색이 더 오래갑니다.',
  },
  {
    question: '아이도 시술 가능한가요?',
    answer: '네, 아이 헤어컷도 가능합니다. 미용사 선택 시 미리 말씀해주시면 아이 담당 스타일리스트를 배정해드립니다.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-16 sm:py-24 bg-secondary/10">
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
