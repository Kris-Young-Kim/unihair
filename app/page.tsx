import dynamic from 'next/dynamic'
import Header from '@/components/header'
import Hero from '@/components/hero'
import ScrollDepthTracker from '@/components/scroll-depth-tracker'

const Services = dynamic(() => import('@/components/services'), {
  loading: () => <SectionFallback title="서비스 정보를 준비중입니다." />,
})

const ConsultationCTA = dynamic(() => import('@/components/consultation-cta'), {
  loading: () => <SectionFallback title="상담 안내를 불러오는 중입니다." />,
})

const Reviews = dynamic(() => import('@/components/reviews'), {
  loading: () => <SectionFallback title="고객 후기를 불러오는 중입니다." />,
})

const Team = dynamic(() => import('@/components/team'), {
  loading: () => <SectionFallback title="스타일리스트 정보를 준비중입니다." />,
})

const FAQ = dynamic(() => import('@/components/faq'), {
  loading: () => <SectionFallback title="FAQ를 불러오는 중입니다." />,
})

const Event = dynamic(() => import('@/components/event'), {
  loading: () => <SectionFallback title="이벤트 정보를 불러오는 중입니다." />,
})

const Location = dynamic(() => import('@/components/location'), {
  loading: () => <SectionFallback title="매장 위치 정보를 불러오는 중입니다." />,
})

const Footer = dynamic(() => import('@/components/footer'), {
  loading: () => <SectionFallback title="푸터를 로딩 중입니다." />,
})

const BookingFloatingButton = dynamic(
  () => import('@/components/booking-floating-button')
)

const BookingModal = dynamic(() => import('@/components/booking-modal'))

export default function Home() {
  return (
    <div className="min-h-screen">
      <ScrollDepthTracker thresholds={[25, 50, 75, 90, 100]} trackFooter={true} />
      <Header />
      <BookingFloatingButton />
      <Hero />
      <Services />
      <ConsultationCTA />
      <Reviews />
      <Team />
      <FAQ />
      <Event />
      <Location />
      <Footer />
      <BookingModal />
    </div>
  )
}

function SectionFallback({ title }: { title: string }) {
  return (
    <section className="py-16 sm:py-24 bg-muted/30 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        {title}
      </div>
    </section>
  )
}
