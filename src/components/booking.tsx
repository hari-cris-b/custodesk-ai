'use client'

import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export default function Booking() {
  const openCalendly = () => {
    const url = "https://calendly.com/haricrisbfreelancer/custodesk-ai-consultation-call";
    window.open(url, '_blank');
  };

  return (
    <section id="demo" className="relative py-24 px-6 bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-violet-800 to-transparent opacity-40" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="max-w-7xl mx-auto text-center relative">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
          Got Questions?
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Schedule your consultation with CustoDesk AI today.
          </p>
        </div>
        <div className="mt-12">
          <Button
            onClick={openCalendly}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 group"
          >
            <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Schedule a Demo
          </Button>
        </div>
      </div>
    </section>
  )
}