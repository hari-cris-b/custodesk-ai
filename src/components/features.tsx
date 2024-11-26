'use client'

import { Bot, Brain, Clock, MessageCircle, Shield, Zap } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    name: "24/7 Availability",
    description: "Provide instant support to your customers around the clock with our AI-powered system.",
    icon: Clock,
  },
  {
    name: "Natural Language Understanding",
    description: "Advanced AI that understands context and nuance in customer inquiries.",
    icon: Brain,
  },
  {
    name: "Instant Response Time",
    description: "Eliminate wait times with immediate, accurate responses to customer queries.",
    icon: Zap,
  },
  {
    name: "Multi-Channel Support",
    description: "Seamlessly integrate with various communication channels for unified support.",
    icon: MessageCircle,
  },
  {
    name: "Secure & Reliable",
    description: "Enterprise-grade security with end-to-end encryption and data protection.",
    icon: Shield,
  },
  {
    name: "AI Learning & Adaptation",
    description: "Continuously improves through machine learning from customer interactions.",
    icon: Bot,
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

export default function Features() {
  return (
    <section id="features" className="relative py-24 px-6 bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-transparent opacity-40" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Powerful Features for Modern Support
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Experience the future of customer service with our comprehensive suite of AI-powered features.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.name}
              variants={item}
              className="group"
            >
              <div className="relative h-full overflow-hidden rounded-2xl border border-zinc-800 bg-black/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-purple-600/50 hover:shadow-2xl hover:shadow-purple-600/10">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-violet-600/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-purple-600/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-purple-500 group-hover:text-violet-400 transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white group-hover:text-white/90 transition-colors duration-300">
                    {feature.name}
                  </h3>
                  
                  <p className="mt-2 text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
