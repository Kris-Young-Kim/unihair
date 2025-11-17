import Header from '@/components/header'
import Hero from '@/components/hero'
import Services from '@/components/services'
import BookingFloatingButton from '@/components/booking-floating-button'
import ConsultationCTA from '@/components/consultation-cta'
import Reviews from '@/components/reviews'
import Team from '@/components/team'
import FAQ from '@/components/faq'
import Event from '@/components/event'
import Location from '@/components/location'
import Footer from '@/components/footer'
import BookingModal from '@/components/booking-modal'

export default function Home() {
  return (
    <div className="min-h-screen">
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
