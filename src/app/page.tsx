import Nav from "@/components/nav"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Process from "@/components/process"
import Booking from "@/components/booking"
import Footer from "@/components/footer"
import FloatingChat from '@/components/floating-chat'

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />
      <Hero />
      <Features />
      <Process />
      <Booking />
      <Footer />
      <FloatingChat />
    </main>
  )
}
