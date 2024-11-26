'use client'

import { Button } from "@/components/ui/button"
import { Calendar, Lightbulb, Rocket } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    id: 1,
    name: 'Intro Call',
    description: 'Schedule a call to explore our compatibility and discuss how our services can enhance your business. We aim to learn about your current operations and identify ways to add value.',
    icon: Calendar,
  },
  {
    id: 2,
    name: 'Strategy',
    description: 'After understanding your needs, we\'ll set up a follow-up call to present our proposal. This will cover the expected deliverables, implementation strategy, timelines and pricing details.',
    icon: Lightbulb,
  },
  {
    id: 3,
    name: 'Implementation',
    description: 'After receiving your go-ahead, our team will start the process, ensuring you\'re updated throughout and maintaining close collaboration via communication.',
    icon: Rocket,
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Process() {
  const openCalendly = () => {
    const url = "https://calendly.com/haricrisbfreelancer/custodesk-ai-consultation-call";
    window.open(url, "_blank");
  };

  return (
    <section id="process" className="relative py-24 px-6 bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-black opacity-40" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Our Process
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Enjoy a streamlined start with us, ditching traditional complex agency onboarding.
          </p>
          <div className="mt-8">
            <Button
              onClick={openCalendly}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 group"
            >
              <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Book a Call
            </Button>
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-12 md:grid-cols-3 mt-16"
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={item}
              className="relative group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-purple-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-purple-500 group-hover:text-violet-400 transition-colors duration-300" />
                  </div>
                  {step.id !== steps.length && (
                    <div className="absolute top-8 left-full w-full border-t border-dashed border-zinc-800 -translate-y-1/2 hidden md:block" />
                  )}
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600/10 flex items-center justify-center text-sm font-semibold text-purple-500">
                    {step.id}
                  </span>
                  <h3 className="text-xl font-semibold text-white">
                    {step.name}
                  </h3>
                </div>
                
                <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
