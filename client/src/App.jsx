import { useCallback, useRef, useState } from 'react'
import { Header } from './components/Header/Header.jsx'
import { Hero } from './components/Hero/Hero.jsx'
import { Stats } from './components/Stats/Stats.jsx'
import { WhyUs } from './components/WhyUs/WhyUs.jsx'
import { Services } from './components/Services/Services.jsx'
import { Doctors } from './components/Doctors/Doctors.jsx'
import { Technology } from './components/Technology/Technology.jsx'
import { Pricing } from './components/Pricing/Pricing.jsx'
import { BeforeAfter } from './components/BeforeAfter/BeforeAfter.jsx'
import { Testimonials } from './components/Testimonials/Testimonials.jsx'
import { FAQ } from './components/FAQ/FAQ.jsx'
import { BookingForm } from './components/BookingForm/BookingForm.jsx'
import { ContactMap } from './components/ContactMap/ContactMap.jsx'
import { Footer } from './components/Footer/Footer.jsx'
import { FloatingCTA } from './components/FloatingCTA/FloatingCTA.jsx'
import { Grain } from './components/ui/Grain.jsx'

function App() {
  const [selectedServiceId, setSelectedServiceId] = useState('')
  const bookingRef = useRef(null)

  const scrollToBooking = useCallback(() => {
    bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleSelectService = useCallback(
    (serviceId) => {
      setSelectedServiceId(serviceId)
      scrollToBooking()
    },
    [scrollToBooking],
  )

  return (
    <div className="relative pb-[72px] lg:pb-0">
      <Grain />
      <Header onBookClick={scrollToBooking} />
      <main>
        <Hero onBookClick={scrollToBooking} />
        <Stats />
        <WhyUs />
        <Services onSelectService={handleSelectService} />
        <Doctors />
        <BeforeAfter />
        <Technology />
        <Pricing onBookClick={scrollToBooking} />
        <Testimonials />
        <FAQ />
        <BookingForm selectedServiceId={selectedServiceId} formRef={bookingRef} />
        <ContactMap />
      </main>
      <Footer />
      <FloatingCTA onBookClick={scrollToBooking} />
    </div>
  )
}

export default App
